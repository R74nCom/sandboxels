var modName = "mods/special_property_library.js";
var libraryMod = "mods/code_library.js";
var libHookTickMod = "mods/libhooktick.js";

if(enabledMods.includes(libraryMod) && enabledMods.includes(libHookTickMod)) {
	specialProperties = {
		/*red: {
			specialFunction: function(pixel) { pixel.color = "rgb(255,0,0)" }
		},*/
	};

	//I hate overwriting drawPixels
	function drawPixels(forceTick=false) {
		// newCurrentPixels = shuffled currentPixels
		var newCurrentPixels = currentPixels.slice();
		var pixelsFirst = [];
		var pixelsLast = [];
		if (!paused || forceTick) {
			shuffleArray(newCurrentPixels);
		}
		/*{newCurrentPixels.sort(function(p) { // shuffle the pixels but keep elements[p.element].isGas last
			return 0.5 - Math.random();
		})} // shuffle the pixels if not paused*/
		for (var i = 0; i < newCurrentPixels.length; i++) {
			pixel = newCurrentPixels[i];
			//if (pixelMap[pixel.x][pixel.y] == undefined || currentPixels.indexOf(pixel) == -1) {continue}
			if (pixel.del) {continue}
			if (!paused || forceTick) {
				if (elements[pixel.element].tick) { // Run tick function if it exists
					elements[pixel.element].tick(pixel);
				}
				if (pixel.del) {continue}
				if (elements[pixel.element].behavior) { // Parse behavior if it exists
					pixelTick(pixel);
				}
			};
			if (elements[pixel.element].isGas) {
				pixelsLast.push(pixel);
			}
			else {
				pixelsFirst.push(pixel);
			}
		}
		// Draw the current pixels
		var canvas = document.getElementById("game");
		var ctx = canvas.getContext("2d");
		var pixelDrawList = pixelsFirst.concat(pixelsLast);
		for (var i = 0; i < pixelDrawList.length; i++) {
			pixel = pixelDrawList[i];
			if (pixelMap[pixel.x][pixel.y] == undefined) {continue}
			if (view===null || view===3) {
				var colorOut = pixel.color;
				for(var imsorryaboutthelagthiswillcause in specialProperties) {
					if(pixel[imsorryaboutthelagthiswillcause] !== undefined && specialProperties[imsorryaboutthelagthiswillcause].specialColorFunction) {
						colorOut = specialProperties[imsorryaboutthelagthiswillcause].specialColorFunction(pixel,oldColor=colorOut)
					}
				}
				ctx.fillStyle = colorOut;
			}
			else if (view === 2) { // thermal view
				// set the color to pixel.temp, from hottest at 0 hue to coldest 225 hue, with the minimum being -273, max being 6000
				var temp = pixel.temp;
				if (temp < -273) {temp = -273}
				if (temp > 6000) {temp = 6000}
				var hue = 225 - (temp/6000)*225;
				if (hue < 0) {hue = 0}
				if (hue > 225) {hue = 225}
				ctx.fillStyle = "hsl("+hue+",100%,50%)";
			}
			else if (view === 4) { // smooth view, average of surrounding pixels
				// E/N: i'm too scared to do smooth view
				var colorlist = [];
				// check adjacent coords on the pixelMap, add the color to the list if the pixel is not empty and the color indexOf "rgb" is not -1
				for (var j = 0; j < biCoords.length; j++) {
					var x = pixel.x + biCoords[j][0];
					var y = pixel.y + biCoords[j][1];
					if (isEmpty(x,y,true) || elements[pixelMap[x][y].element].state !== elements[pixel.element].state) {continue}
					var color = pixelMap[x][y].color;
					if (color.indexOf("rgb") !== -1) {
						colorlist.push(color.match(/\d+/g));
					}
				}
				if (colorlist.length === 0) {
					ctx.fillStyle = pixel.color;
				}
				else {
					ctx.fillStyle = averageRGB(colorlist);
				}
			}
			if (ctx.globalAlpha < 1 && !elements[pixel.element].isGas) {
				ctx.globalAlpha = 1;
			}
			if ((view === null || view === 4) && elements[pixel.element].isGas) {
				if (ctx.globalAlpha!==0.5) { ctx.globalAlpha = 0.5; }
				ctx.fillRect((pixel.x-1)*pixelSize, (pixel.y)*pixelSize, pixelSize*3, pixelSize);
				ctx.fillRect((pixel.x)*pixelSize, (pixel.y-1)*pixelSize, pixelSize, pixelSize*3);
			}
			else { // draw the pixel (default)
				ctx.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize, pixelSize);
			}
			if (pixel.charge && view !== 2) { // Yellow glow on charge
				if (!elements[pixel.element].colorOn) {
					ctx.fillStyle = "rgba(255,255,0,0.5)";
					ctx.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize, pixelSize);
				}
			}
		}
		if (ctx.globalAlpha < 1) {
			ctx.globalAlpha = 1;
		}

		if (elements[currentElement].maxSize < mouseSize) {
			var mouseOffset = Math.trunc(elements[currentElement].maxSize/2);
		}
		else {
			var mouseOffset = Math.trunc(mouseSize/2);
		}
		var topLeft = [mousePos.x-mouseOffset,mousePos.y-mouseOffset];
		var bottomRight = [mousePos.x+mouseOffset,mousePos.y+mouseOffset];
		// Draw a square around the mouse
		ctx.strokeStyle = "white";
		ctx.strokeRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
		// draw one transparent pixel in the center
		if (settings.precision) {
			ctx.fillStyle = "rgba(255,255,255,0.5)";
			ctx.fillRect(mousePos.x*pixelSize,mousePos.y*pixelSize,pixelSize,pixelSize);
		}
		if ((!paused) || forceTick) {pixelTicks++};
	}
	//I hate overwriting drawPixels
	
	runAfterLoad(function() {
		console.log(everyTick(function() {
			if(paused) { return };
			for(var propName in specialProperties) {
				//thanks, I hate not being able to pass arguments to filter functions
				var _filterFunction = function(pixel) {
					return pixel.hasOwnProperty(propName)
				};
				var pixelsWithProp = currentPixels.filter(_filterFunction);
				//console.log(pixelsWithProp.map(p => [p.x,p.y,propName,p[propName]].join(",")).join("\n"));
				for(var i in pixelsWithProp) {
					var propPixel = pixelsWithProp[i];
					if(!propPixel || propPixel.del) { continue };
					specialProperties[propName]?.specialFunction?.(propPixel);
				};
			}
		}),"Property handler tick callback set")
	});
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod);
	enabledMods.splice(enabledMods.indexOf(modName),0,libHookTickMod);
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The ${libraryMod} and ${libHookTickMod} mods are required and have been automatically inserted (reload for this to take effect).`);
};
