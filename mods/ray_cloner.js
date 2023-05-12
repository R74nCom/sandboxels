var modName = "mods/ray_cloner.js";
var libraryMod = "mods/code_library.js";
var propMod = "mods/prop.js";
var variablesMod = "mods/prop and prompt variables.js";
if(enabledMods.includes(libraryMod) && enabledMods.includes(propMod) && enabledMods.includes(variablesMod)) {
	function placeRegularlySpacedPixels(element,startX,startY,xSpacing,ySpacing,overwrite=false,stopAt=null,rayIgnore=[],spawnTemp=null,limit=1000) {
		if(element.includes(",")) { element = element.split(",") };
		var newElement = element;
		if(isNaN(xSpacing) || isNaN(ySpacing)) {
			throw new Error("Missing xSpacing or ySpacing");
		};
		if(xSpacing == 0 && ySpacing == 0) {
			//pixel.color = convertColorFormats("#5F5F5F","rgb");
			return false;
		};
		if(outOfBounds(startX,startY) /*|| (!overwrite && !isEmpty(startX,startY,false))*/) {
			return false;
		};	
		var posX = startX;
		var posY = startY;
		var pixelsPlaced = 0;
		//var tries = 0;
		while(!outOfBounds(posX,posY) /*&& tries < 100*/) {
			//tries++;
			if(newElement instanceof Array) { newElement = newElement[Math.floor(Math.random() * newElement.length)] };
			if(!elements[newElement]) {
				//pixel.color = convertColorFormats("#FF5F5F","rgb");
				console.error(`Nonexistent element ${newElement}`);
				return false;
			};
			if(isEmpty(posX,posY,true)) {
				createPixel(newElement,posX,posY);
				if(spawnTemp !== null) { pixelMap[posX][posY].temp = spawnTemp };
				pixelsPlaced++;
			} else {
				if(outOfBounds(posX,posY)) {
					break;
				} else {
					if(!isEmpty(posX,posY,true)) {
						var otherElement = pixelMap[posX][posY].element;
						//console.log(tries,"tries");
						//console.log("ri",rayIgnore);
						if(rayIgnore) {
							/*console.log(
								rayIgnore instanceof Array,
								otherElement,
								otherElement == rayIgnore || rayIgnore.includes(otherElement)
							);*/
							if(rayIgnore instanceof Array) {
								if(rayIgnore.includes(otherElement)) {
									posX += xSpacing;
									posY += ySpacing;
									//console.log(posX, posY);
									continue;
								};
							} else {
								if(otherElement == rayIgnore) {
									posX += xSpacing;
									posY += ySpacing;
									//console.log(posX,posY);
									continue;
								};
							};
						};
						if(stopAt) {
							if(stopAt instanceof Array) {
								if(stopAt.includes(otherElement)) { break };
							} else {
								if(otherElement == stopAt) { break };
							};
						};
						if(overwrite) {
							changePixel(pixelMap[posX][posY],newElement)
							if(spawnTemp !== null) {
								pixelMap[posX][posY].temp = spawnTemp;
							};
							pixelsPlaced++
						} else { break };
					};
				};
			};
			posX += xSpacing;
			posY += ySpacing;
			if(limit !== null && pixelsPlaced >= limit) {
				return true;
			};
		};
		return true;
	};

	elements.ray_cloner = {
		properties: {
			xSpacing: 0,
			ySpacing: 0,
			overwrite: false,
			stopAt: null,
			rayIgnore: [],
			spawnAtPixelTemp: false,
			maxPixels: 1000,
			/*clone: "plasma",
			xSpacing: 0,
			ySpacing: 1,
			overwrite: false,
			stopAt: null,
			rayIgnoreSelf: true,
			spawnAtPixelTemp: true,
			maxPixels: 1000,*/
		},
		//temp: 100000,
		tick: function(pixel) {
			storeFirstTouchingElement(pixel,"clone",true,true);
			if(pixel.clone && pixel.charge) {
					placeRegularlySpacedPixels(
					pixel.clone,
					pixel.x+pixel.xSpacing,
					pixel.y+pixel.ySpacing,
					pixel.xSpacing,
					pixel.ySpacing,
					pixel.overwrite,
					pixel.stopAt,
					pixel.rayIgnore,
					pixel.spawnAtPixelTemp ? pixel.temp : null,
					pixel.maxPixels
				);
				pixel.charge = 0
			};
		},
		conduct: 1,
		category: "machines",
		state: "solid",
		density: 3000,
		insulate: true,
		hardness: 0.8,
		color: "#FFFF7F",
		desc: `clone: Which element to place. Cannot be an array or comma-separated string, and will be chosen from the first pixel to touch it.<br/>
	xSpacing and ySpacing: Horizontal and vertical spacing between x pixels. Note that blocking is only checked at these intervals. An xSpacing of 0 with a ySpacing of 1 would give a straight line going down; xS1 and yS0 would give a line to the right.<br/>
	overwrite (default false): Whether to replace pixels the line goes into.<br/>
	stopAt (default null): Elements the line to stop at if it hits. Also applies to overwrite, and has no effect if set to null. Can be a string or an array.<br/>
	spawnAtPixelTemp (default false): Whether to place new pixels at the same temperature as this pixel.<br/>
	maxPixels (default 1000): Maximum amount of pixels/changes (if xSpacing and ySpacing are both less than 2, this corresponds to the pixel length of the line).

	<em>prop.js is highly recommended to set pixel properties</em>`,
	};
} else {
	if(!enabledMods.includes(libraryMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	if(!enabledMods.includes(propMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,propMod) };
	if(!enabledMods.includes(variablesMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,variablesMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${libraryMod}", "${propMod}", and "${variablesMod}" mods are all required and have been automatically inserted (reload for this to take effect).`);
};
