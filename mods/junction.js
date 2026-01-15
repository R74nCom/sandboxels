// Junction.js

const connectedPairs = [
	[[-1, 0], [1, 0]], // Horizontal
	[[0, -1], [0, 1]]  // Vertical
];

let isRisingEdge = (current, prev) => current === 2 && prev !== 2;
let isFallingEdge = (current, prev) => current !== 2 && prev === 2;

elements.junction = {
	color: "#9db8b5",
	category: "logic",
	state: "solid",
	behavior: behaviors.WALL,
	tick: function (pixel) {
		if (pixel.start === pixelTicks)
			pixel.prevStateMap = {};

		for (const pair of connectedPairs) {
			let pixelA = pixelMap[pixel.x + pair[0][0]]?.[pixel.y + pair[0][1]];
			let pixelB = pixelMap[pixel.x + pair[1][0]]?.[pixel.y + pair[1][1]];

			if (!pixelA) continue;
			if (!pixelB) continue;
			if (pixelA.element !== "logic_wire") continue;
			if (pixelB.element !== "logic_wire") continue;

			let stateA = pixelA.lstate;
			let stateB = pixelB.lstate;
			let prevStateA = pixel.prevStateMap[[pixelA.x, pixelA.y]];
			let prevStateB = pixel.prevStateMap[[pixelB.x, pixelB.y]];

			// console.log("A:", stateA, "->", prevStateA);
			// console.log("B:", stateB, "->", prevStateB);

			// Set previous lstate to current lstate
			pixel.prevStateMap[[pixelA.x, pixelA.y]] = pixelA.lstate;
			pixel.prevStateMap[[pixelB.x, pixelB.y]] = pixelB.lstate;

			// Rising edge
			if (isRisingEdge(stateA, prevStateA)) pixelB.lstate = 2;
			if (isRisingEdge(stateB, prevStateB)) pixelA.lstate = 2;

			// Falling edge
			if (isFallingEdge(stateA, prevStateA)) pixelB.lstate = -2;
			if (isFallingEdge(stateB, prevStateB)) pixelA.lstate = -2;
		}
	}
};
