// Meat Rockets 1.0
// Author: Melecie

meat_rocket_funcs = {
	rocketCreator(rElem, rColor, rName) {
		if (typeof(rName) == "undefined") { rName = rElem + "_rocket" }
		
		elements[rName] = {
			color: rColor,
			state: "solid",
			behavior: behaviors.ITEM_ROCKET,
			properties: { launching: false },
			rocketItem: rElem,
			density: 1024,
			hardness: 0.90,
			burn: 100,
			burnTime: 8192,
			category: "special",
		}
	}
}


behaviors.ITEM_ROCKET = function(pixel) {
	if (pixel.launching) {
		pixel.burning = false;
		
		// launching rocket
		let nextX = pixel.x + (pixel.flipX ? -1:1);
		let nextY = pixel.y-1;
		let rocketItem = elements[pixel.element].rocketItem;
		
		// flip, occasionally explode
		if (Math.random() < 0.1) {
			pixel.flipX = !pixel.flipX;
			if (Math.random() < 0.05) {
				explodeAt(pixel.x, pixel.y-1, 3, [rocketItem, "smoke"]);
			}
		} else if (Math.random() < 0.1) {
			createPixel(pixel.x, pixel.y-1, "smoke")
		}
		
		// movement code
		if (outOfBounds(nextX, nextY)) {
			explodeAt(pixel.x, pixel.y, 10, [rocketItem, "smoke", "smoke"]);
			deletePixel(pixel.x, pixel.y);
		} else if (canMove(pixel, nextX, nextY)) {
			tryMove(pixel, nextX, nextY);
		} else if ( elements[pixelMap[nextX][nextY].element].state == "gas" || pixelMap[nextX][nextY].element == rocketItem ) {
			let otherPixel = pixelMap[nextX][nextY];
			swapPixels(pixel, otherPixel);
		} else if ( pixelMap[nextX][nextY].element == pixel.element ) {
			
		} else {
			explodeAt(pixel.x, pixel.y, 10, [rocketItem, "smoke", "smoke"]);
			deletePixel(pixel.x, pixel.y);
		}
	} else {
		// hasn't started yet
		behaviors.POWDER(pixel);
		if (pixel.burning == true) {
			pixel.launching = true;
		}
	}
	
	doDefaults(pixel);
}

meat_rocket_funcs.rocketCreator("meat", ["#d36e7d", "#a85c4b"])
elements.meat.reactions.fallout = { elem1: "meat_rocket", chance: 0.2 }