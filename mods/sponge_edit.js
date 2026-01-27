var modName = "mods/sponge_edit.js";
// var onTryMoveIntoMod = "mods/onTryMoveInto.js";
var libraryMod = "mods/code_library.js";



dependOn("code_library.js", function(){
	elements.sponge.properties ??= {};
	elements.sponge.properties.maxAbsorb = 250;

	elements.sponge.tick = function(pixel) {
		pixel.absorbed ??= {};
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		shuffleArray(coordsToCheck);
		for (var i = 0; i < coordsToCheck.length; i++) {
			if(sumNumericArray(Object.values(pixel.absorbed)) >= pixel.maxAbsorb) {
				break;
			};
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].state === "liquid" && ((elements[newPixel.element].density || 0) < 2500)) {
					pixel.absorbed[newPixel.element] ??= 0;
					pixel.absorbed[newPixel.element]++;
					deletePixel(coord[0],coord[1]);
				};
			};
		};
		if((pixel.absorbed.water ?? 0) < 5) {
			doBurning(pixel);
		};
	};
	
	elements.sponge.onMoveInto = function(pixel,otherPixel) {
		var absorbedElements = Object.keys(pixel.absorbed);
		if(absorbedElements.length == 0) {
			return false;
		};
		var otherInfo = elements[otherPixel.element]
		if((otherInfo.state ?? "solid") == "solid" && (otherInfo.density ?? 1000) >= 200) {
			//console.log(otherPixel.element,otherInfo.state);
			var outputOffsets = [pixel.x - otherPixel.x, pixel.y - otherPixel.y];
			var twiceOffsets = outputOffsets.map(x => x * 2);
			var newCoords = [pixel.x + outputOffsets[0], pixel.y + outputOffsets[1]];
			var twiceCoords = [pixel.x + twiceOffsets[0], pixel.y + twiceOffsets[1]];
			if(!isEmpty(newCoords[0],newCoords[1],true)) {
				if(outOfBounds(newCoords[0],newCoords[1])) { //fail if OOB
					return false;
				};
				var newPixel = pixelMap[newCoords[0]][newCoords[1]];
				if((elements[newPixel.element].state ?? "solid") !== "gas") { //only displace gases
					return false;
				};
				if(!tryMove(newPixel,twiceCoords[0],twiceCoords[1])) { //if it can't push the gas out to the next pixel over
					return false; //then return false because perpendicular expulsion too complex and multifaceted to deal with
				};
			};
			if(isEmpty(pixel.x,pixel.y+1)) {
				var randomElement = randomChoice(absorbedElements);
				if(pixel.absorbed[randomElement] > 0) {
					if(tryCreatePixel(randomElement,newCoords[0],newCoords[1])) { pixel.absorbed[randomElement]-- };
				} else {
					delete pixel.absorbed[randomChoice]
				};
			};
		};
	};
}, true);