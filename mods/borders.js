let isMachine = {"machines":true}

elements.static.border = false;
elements.mixer.border = false;
elements.grinder.border = false;

window.addEventListener("load", () => {
	let oldPreRenderer = viewInfo[1].pre;
	let oldPixelRenderer = viewInfo[1].pixel;
	viewInfo[1].pre = function(ctx) {
		if (oldPreRenderer) oldPreRenderer(ctx);
		currentPixels.forEach(pixel => {
			if ((elements[pixel.element].movable !== true && isMachine[elements[pixel.element].category] === undefined) || elements[pixel.element].isGas === true) return;
			if (elements[pixel.element].border === false) return;
			if (pixel.alpha === 0) return;
			let edge = false;
			for (var i = 0; i < adjacentCoords.length; i++) {
				var coords = adjacentCoords[i];
				var x = pixel.x + coords[0];
				var y = pixel.y + coords[1];
				if (isEmpty(x,y, true)) {
					// if (elements[pixelMap[x][y].element].id !== elements[pixel.element].id || elements[pixelMap[x][y].element].state !== elements[pixel.element].id) continue
					edge = true;
					break;
				}
			}
			if (edge) drawSquare(ctx,"rgb(0,0,0)",pixel.x-1,pixel.y-1,3);
		})
	}
	
	viewInfo[1].pixel = function(pixel, ctx) {
		if (elements[pixel.element].movable || isMachine[elements[pixel.element].category] === true) return oldPixelRenderer(pixel, ctx);
		if (pixel.alpha === 0) return;
		let edge = false;
		if (elements[pixel.element].border !== false) {
			for (var i = 0; i < adjacentCoords.length; i++) {
				var coords = adjacentCoords[i];
				var x = pixel.x + coords[0];
				var y = pixel.y + coords[1];
				if (isEmpty(x,y) || (!outOfBounds(x,y) &&
					elements[pixelMap[x][y].element].movable
				)) {
					// if (elements[pixelMap[x][y].element].id !== elements[pixel.element].id || elements[pixelMap[x][y].element].state !== elements[pixel.element].id) continue
					edge = true;
					break;
				}
			}
		};
		if (edge) drawSquare(ctx,"rgb(0,0,0)",pixel.x,pixel.y);
		else oldPixelRenderer(pixel, ctx);
	}
	
	// viewInfo[1].post = function(ctx) {
	// 	currentPixels.forEach(pixel => {
	// 		let edge = false;
	// 		for (var i = 0; i < adjacentCoords.length; i++) {
	// 			var coords = adjacentCoords[i];
	// 			var x = pixel.x + coords[0];
	// 			var y = pixel.y + coords[1];
	// 			if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable !== elements[pixel.element].movable) {
	// 				// if (elements[pixelMap[x][y].element].id !== elements[pixel.element].id || elements[pixelMap[x][y].element].state !== elements[pixel.element].id) continue
	// 				edge = true;
	// 				break;
	// 			}
	// 		}
	// 		if (edge) drawSquare(ctx,"rgb(0,0,0)",pixel.x-0.5,pixel.y-0.5,2);
	// 	})
	// }

})	

