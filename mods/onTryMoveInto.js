elements.on_try_move_into_test = {
	color: "#ffffff",
	properties: {
		ticks: 0,
		attemptedMovesIntoPixel: 0,
	},	
	behavior: behaviors.POWDER,
	reactions: {
		"dirt": { elem1: "diamond" },
	},
	state: "solid",
	hidden: true,
	excludeRandom: true,
	category: "special",
	density: 1000,
	tick: function(pixel) {
		pixel.ticks++;
	},
	onTryMoveInto: function(pixel,otherPixel) {
		pixel.attemptedMovesIntoPixel++;
		var otherElement = otherPixel.element;
		if(otherElement === "ash") {
		console.log(`This is a test of potentially undesired multiplicate running. (tick: ${pixelTicks}, move attempts: ${pixel.attemptedMovesIntoPixel})`);
			//if(deletePixel(pixel.x,pixel.y)) {
			//	console.log("This pixel has been deleted.");
			//};
		};
	},
	desc: "Try burying this pixel and see what happens. (Use Debug)\n\nonTryMoveInto is run as part of tryMove, <em>before reactions</em>, while tick functions are run as part of pixelDraw.\n<span style='color:red;'>In some circumstances, such as a pixel being buried under a pile of anything that isn't a sturdy powder, this function may run multiple times per tick.</span> For example, bury this pixel in ash and look in the console.\n\nTo use this function, include in your element definition the \"onTryMoveInto\" key with a function value, similarly to tick functions. This function takes two arguments; \"otherPixel\" is the pixel that is trying to move and \"pixel\" is the pixel whose position otherPixel is trying to move into.",
	related: ["debug", "ash"],
}

function tryMove(pixel,nx,ny,leaveBehind,force) {
	if (pixel.drag && !force) { return true; }
	var info = elements[pixel.element];
	var oob = outOfBounds(nx,ny);
	if (isEmpty(nx,ny,false,oob)) { // If coords is empty, move to coords
		//console.log(`Moving ${pixel.element} (${pixel.x},${pixel.y}) to (${nx},${ny})`);
		movePixel(pixel,nx,ny,leaveBehind);
		return true;
	}
	else if (!oob) {
		//console.log(`Moving ${pixel.element} (${pixel.x},${pixel.y}) to (${nx},${ny})`);
		// Reactions
		newPixel = pixelMap[nx][ny];
		var newInfo = elements[newPixel.element];
		var returnVal = false;
		if(newInfo.onTryMoveInto !== undefined) {
			newInfo.onTryMoveInto(newPixel,pixel);
			if(!pixel || pixel.del) {
				return "deleted";
			};
			returnVal = true;
		}
		var rr1 = false;
		if (info.reactions !== undefined && info.reactions[newPixel.element] !== undefined) {
			rr1 = reactPixels(pixel,newPixel)
			if (rr1) {
				return true;
			}
		}
		if (!rr1 && elements[newPixel.element].reactions !== undefined && elements[newPixel.element].reactions[pixel.element] !== undefined && !elements[newPixel.element].reactions[pixel.element].oneway) {
			if (reactPixels(newPixel,pixel)) {
				return true;
			}
		}
		// Density
		if (elements[pixel.element].id !== elements[newPixel.element].id) {
			if (info.density !== undefined && elements[newPixel.element].density !== undefined) {
				// if the pixel's state + ">" + newPixel's state is in validDensitySwaps, and the pixel's density is larger than the newPixel's density, swap the pixels
				if (validDensitySwaps[info.state][elements[newPixel.element].state] && info.density >= elements[newPixel.element].density) {
					// chance depending on the difference in density
					if (Math.random() < (info.density - elements[newPixel.element].density)/(info.density + elements[newPixel.element].density)) {
						swapPixels(pixel,newPixel);
						return true;
					}
				}
			}
		}
		if(returnVal) {
			return true;
		}
	}
	return false;
}
