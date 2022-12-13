var modName = "mods/wirelike_test.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
	//The CMYK is symbolic
	elements.start_test = {
		color: "#dddddd",
		category: "test",
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		conduct: 1,
		tick: function(pixel) {
			if(pixel.charge) {
				for(i = 0; i < adjacentCoords.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x + adjacentCoords[i][0];
					var nY = pixel.y + adjacentCoords[i][1];

					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
				};
			};
		},
	};

	elements.end_test = {
		color: "#888888",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			if(pixel.value === 1) {
				for(i = 0; i < adjacentCoords.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x + adjacentCoords[i][0];
					var nY = pixel.y + adjacentCoords[i][1];

					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						if(newInfo.conduct) {
							//console.log(`cond ${nX} ${nY}`)
							if(!newPixel.chargeCD) {
								//console.log(`noCD ${nX} ${nY}`)
								if(Math.random() < newInfo.conduct) {
									//console.log(`rolled ${nX} ${nY}`)
									if(isNaN(newPixel.charge) || newPixel.charge <= 1) {
										//console.log(`dead ${nX} ${nY}`)
										newPixel.charge = 1
									}/* else {
										console.log(`maybe if you had stanned loona ${nX} ${nY}`)
									}*/;
								};
							};
						};
					};
				};
				pixel.value = 0;
			};
		},
	};

	elements.right_test = {
		color: "#dddd22",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffset = [1, 0];
			var pX = pixel.x;
			var pY = pixel.y;
			var nX = pixel.x+newPixelCoordOffset[0];
			var nY = pixel.y+newPixelCoordOffset[1];
			
			if(pixel.value === 1) {
				if(!isEmpty(nX,nY,true)) {
					var newPixel = pixelMap[nX][nY];
					var newInfo = elements[newPixel.element];
					var newCategory = newInfo.category;
					if(newCategory == elements[pixel.element].category) {
						newPixel.value = 1;
					};
				};
				pixel.value = 0;
			};
		},
	};

	elements.left_test = {
		color: "#dd22dd",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffset = [-1, 0];
			var pX = pixel.x;
			var pY = pixel.y;
			var nX = pixel.x+newPixelCoordOffset[0];
			var nY = pixel.y+newPixelCoordOffset[1];
			
			if(pixel.value === 1) {
				if(!isEmpty(nX,nY,true)) {
					var newPixel = pixelMap[nX][nY];
					var newInfo = elements[newPixel.element];
					var newCategory = newInfo.category;
					if(newCategory == elements[pixel.element].category) {
						newPixel.value = 1;
					};
				};
				pixel.value = 0;
			};
		},
	};

	elements.down_test = {
		color: "#222222",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffset = [0, 1];
			var pX = pixel.x;
			var pY = pixel.y;
			var nX = pixel.x+newPixelCoordOffset[0];
			var nY = pixel.y+newPixelCoordOffset[1];
			
			if(pixel.value === 1) {
				if(!isEmpty(nX,nY,true)) {
					var newPixel = pixelMap[nX][nY];
					var newInfo = elements[newPixel.element];
					var newCategory = newInfo.category;
					if(newCategory == elements[pixel.element].category) {
						newPixel.value = 1;
					};
				};
				pixel.value = 0;
			};
		},
	};

	elements.up_test = {
		color: "#22dddd",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffset = [0, -1];
			var pX = pixel.x;
			var pY = pixel.y;
			var nX = pixel.x+newPixelCoordOffset[0];
			var nY = pixel.y+newPixelCoordOffset[1];
			
			if(pixel.value === 1) {
				if(!isEmpty(nX,nY,true)) {
					var newPixel = pixelMap[nX][nY];
					var newInfo = elements[newPixel.element];
					var newCategory = newInfo.category;
					if(newCategory == elements[pixel.element].category) {
						newPixel.value = 1;
					};
				};
				pixel.value = 0;
			};
		},
	};

	elements.up_left_test = {
		color: "#2222dd",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[0, -1], [-1, 0]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};

	elements.up_left_test = {
		color: "#2222dd",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[0, -1], [-1, 0]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};

	elements.up_right_test = {
		color: "#22dd22",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[0, -1], [1, 0]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};

	elements.up_down_test = {
		color: "#228888",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[0, -1], [0, 1]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};


	elements.left_right_test = {
		color: "#dd2222",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[-1, 0], [1, 0]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};

	elements.left_down_test = {
		color: "#882288",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[-1, 0], [0, 1]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};


	elements.right_down_test = {
		color: "#888822",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[1, 0], [0, 1]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};

	elements.up_left_right_test = {
		color: "#454545",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[0, -1], [-1, 0], [1, 0]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};

	elements.left_right_down_test = {
		color: "#882222",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[-1, 0], [1, 0], [0, 1]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};

	elements.up_right_down_test = {
		color: "#228822",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[0, -1], [1, 0], [0, 1]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};

	elements.up_left_down_test = {
		color: "#222288",
		category: "test",
		properties: {
			value: 0,
			offColor: null,
			onColor: null,
		},
		behavior: behaviors.WALL,
		insulate: true,
		hardness: 1,
		tick: function(pixel) {
			if(pixel.offColor === null) {
				pixel.offColor = _rgbHexCatcher(pixel.color)
			};
			pixel.onColor = lightenColor(pixel.offColor,32,"rgb");
			pixel.color = (pixel.value > 0 ? pixel.onColor : pixel.offColor);

			var newPixelCoordOffsets = [[0, -1], [-1, 0], [0, 1]];
			
			if(pixel.value === 1) {
				for(i = 0; i < newPixelCoordOffsets.length; i++) {
					var pX = pixel.x;
					var pY = pixel.y;
					var nX = pixel.x+newPixelCoordOffsets[i][0];
					var nY = pixel.y+newPixelCoordOffsets[i][1];
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newInfo = elements[newPixel.element];
						var newCategory = newInfo.category;
						if(newCategory == elements[pixel.element].category) {
							newPixel.value = 1;
						};
					};
					pixel.value = 0;
				};
			};
		},
	};
} else {
	alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
