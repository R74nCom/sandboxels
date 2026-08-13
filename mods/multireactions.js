(function () {
	const slotId = s => `${s.x},${s.y}`,
	isEmpty = v => v == "_" || v == "air",
	resolve = (value, pixel, slots) => typeof value == "function" ? value(pixel, slots.map(s => s.pixel || null)) : value;

	function tokenize(input) {
		const tokens = [];

		for (let i = 0; i < input.length;) {
			if (/\s/.test(input[i])) {
				i++;
				continue;
			}

			const op = input.slice(i, i + 2);

			if (op == "~&" || op == "~|" || op == "~^") {
				tokens.push({ type: "op", value: op });
				i += 2;
				continue;
			}

			if ("&|^~()".includes(input[i])) {
				tokens.push({type: "()".includes(input[i]) ? "paren" : "op", value: input[i++]});
				continue;
			}

			let j = i;
			while (j < input.length && !/\s/.test(input[j]) && !"&|^~()".includes(input[j])) j++;

			tokens.push({type: "ident", value: input.slice(i, j)});
			i = j;
		}

		return tokens;
	}

	function parse(input) {
		let tokens = tokenize(input),
		pos = 0,
		peek = _ => tokens[pos],
		take = _ => tokens[pos++];

		function primary() {
			const token = peek();

			if (!token) throw new Error("Unexpected end of reaction key");

			if (token.type == "ident") {
				take();
				return { type: "atom", value: token.value };
			}

			if (token.type == "paren" && token.value == "(") {
				take();
				const node = or(),
				close = peek();

				if (!close || close.type != "paren" || close.value != ")") throw new Error("Missing closing parenthesis");

				take();
				return node;
			}

			throw new Error(`Unexpected token: ${token.value}`);
		}

		function unary() {
			if (peek()?.value == "~") {
				take();
				return { type: "not", expr: unary() };
			}
			return primary();
		}

		function binary(next, ops) {
			let node = next();

			while (ops.includes(peek()?.value)) {
				const op = take().value;
				node = { type: "bin", op, left: node, right: next() };
			}

			return node;
		}

		const and = _ => binary(unary, ["&", "~&"]),
		xor = _ => binary(and, ["^", "~^"]),
		or = _ => binary(xor, ["|", "~|"]);

		const ast = or();

		if (pos < tokens.length) throw new Error(`Unexpected trailing token: ${tokens[pos].value}`);

		return ast;
	}

	function evalBool(node, presence) {
		switch (node.type) {
			case "atom": return !!presence[node.value];

			case "not": return !evalBool(node.expr, presence);

			case "bin": {
				const left = evalBool(node.left, presence),
				right = evalBool(node.right, presence);

				switch (node.op) {
					case "&": return left && right;
					case "|": return left || right;
					case "^": return left != right;
					case "~&": return !(left && right);
					case "~|": return !(left || right);
					case "~^": return left == right;
					default: return false;
				}
			}

			default: return false;
		}
	}

	function buildPresence(slots) {
		const presence = Object.create(null);

		for (const slot of slots) if (slot.pixel) presence[slot.pixel.element] = true;

		return presence;
	}

	function match(node, slots, used = new Set(), out = [], presence = buildPresence(slots)) {
		switch (node.type) {
			case "atom":
				for (const slot of slots) {
					const id = slotId(slot);
					if (used.has(id)) continue;
					if (isEmpty(node.value) ? slot.pixel : !slot.pixel || slot.pixel.element != node.value) continue;

					used.add(id);
					out.push(slot);
					return { ok: true, used, out };
				}

				return { ok: false, used, out };

			case "not": return evalBool(node.expr, presence) ? { ok: false, used, out } : { ok: true, used, out };

			case "bin": {
				const branch = child => match(child, slots, new Set(used), out.slice(), presence);

				switch (node.op) {
					case "&": {
						const left = match(node.left, slots, used, out, presence);
						return left.ok ? match(node.right, slots, left.used, left.out, presence) : left;
					}

					case "|": {
						const left = branch(node.left);
						return left.ok ? left : match(node.right, slots, used, out, presence);
					}

					case "^": {
						const left = branch(node.left),
						right = branch(node.right);

						if (left.ok && right.ok) return { ok: false, used, out };
						return left.ok ? left : right.ok ? right : { ok: false, used, out };
					}

					case "~&": {
						const left = branch(node.left),
						right = branch(node.right);

						if (left.ok && right.ok) return { ok: false, used, out };
						if (left.ok) return left;
						if (right.ok) return right;
						return { ok: true, used, out };
					}

					case "~|": {
						const left = branch(node.left),
						right = branch(node.right);
						return left.ok || right.ok ? { ok: false, used, out } : { ok: true, used, out };
					}

					case "~^": {
						const left = branch(node.left),
						right = branch(node.right);

						if (left.ok && right.ok) return { ok: true, used: new Set([...left.used, ...right.used]), out: [...left.out, ...right.out] };

						if (!left.ok && !right.ok) return { ok: true, used, out };
						return { ok: false, used, out };
					}

					default: return { ok: false, used, out };
				}
			}

			default: return { ok: false, used, out };
		}
	}

	function checkConditions(reaction, slots, pixel) {
		const pixels = slots.map(s => s.pixel).filter(Boolean),

		min = resolve(reaction.requiredTempMin, pixel, slots),
		max = resolve(reaction.requiredTempMax, pixel, slots),
		range = resolve(reaction.requiredTemp, pixel, slots);

		if (min != undefined && !pixels.some(p => p.temp >= min)) return false;
		if (max != undefined && !pixels.some(p => p.temp <= max)) return false;

		if (range != undefined) {
			const [low, high] = range;
			if (!pixels.some(p => p.temp >= low && p.temp <= high)) return false;
		}

		return true;
	}

	runPerPixel(pixel => {
		if (!pixel || !elements[pixel.element]?.reactions) return;

		const slots = [];
		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				if (!dx && !dy) continue;
				const x = pixel.x + dx,
				y = pixel.y + dy;
				slots.push({x, y, pixel: pixelMap[x]?.[y] || null});
			}
		}

		for (const [reactionKey, reaction] of Object.entries(elements[pixel.element].reactions)) {
			if (!/[&|^~()]/.test(reactionKey)) continue;

			let ast;
			try {
				ast = parse(reactionKey);
			} catch (error) {
				console.warn("Reaction key parse error:", reactionKey, error);
				continue;
			}

			const result = match(ast, slots);
			if (!result.ok) continue;

			const matched = [
				{ x: pixel.x, y: pixel.y, pixel },
				...result.out
			];

			if (!checkConditions(reaction, matched, pixel)) continue;

			let chance = resolve(reaction.chance, pixel, matched);

			if (chance != undefined) {
				chance = Math.max(0, Math.min(1, Number(chance)));
				if (!Number.isFinite(chance) || Math.random() > chance) continue;
			}

			const products = Array.from({ length: 9 }, (_, i) => resolve(reaction[`elem${i + 1}`], pixel, matched)),
			emptySlots = slots.filter(slot => !result.used.has(slotId(slot)) && !slot.pixel),
			targets = [...matched];

			while (targets.length < products.length && emptySlots.length) targets.push(emptySlots.shift());

			for (let i = 0; i < products.length; i++) {
				const target = targets[i],
				product = products[i];

				if (!target || product == undefined || product == "_") continue;

				target.pixel ? changePixel(target.pixel, product) : typeof createPixel == "function" ? createPixel(product, target.x, target.y) : null;
			}

			return;
		}
	});
})();
