//Math
	//Limit number to [min, max]
	function bound(number,lowerBound,upperBound) {
		return Math.min(upperBound,Math.max(lowerBound,number));
	};

//Color

	//for compatibility
	function rgbStringToUnvalidatedObject(string) { //turns rgb() to {r,g,b} with no bounds checking
		//console.log("Splitting string into object");
		string = string.split(",");
		var red = parseFloat(string[0].substring(4));
		var green = parseFloat(string[1]);
		var blue = parseFloat(string[2].slice(0,-1));
		//console.log("String split: outputs " + red + ", " + green + ", " + blue + ".");
		return {r: red, g: green, b: blue};
	};

	function rgbStringToObject(string,doRounding=true,doBounding=true) { //turns rgb() to {r,g,b} with no bounds/rounding/NaN checking
			//console.log("Splitting string into object");
		string = string.split(",");
		if( (!string[0].startsWith("rgb(")) || (!string[2].endsWith(")")) ) {
			throw new Error("Color must start with \"rgb(\" and end with \")\"");
		};
		var red = parseFloat(string[0].substring(4));
		var green = parseFloat(string[1]);
		var blue = parseFloat(string[2].slice(0,-1));
			//console.log(`Colors loaded (${red}, ${green}, ${blue})`);
		if(doRounding) {
			red = Math.round(red);
			green = Math.round(green);
			blue = Math.round(blue);
				//console.log(`Colors rounded to (${red}, ${green}, ${blue})`);
		};
		if(doBounding) {
			red = bound(red,0,255)
			green = bound(green,0,255)
			blue = bound(blue,0,255)
				//console.log(`Colors bounded to (${red}, ${green}, ${blue})`);
		};
			//console.log("String split: outputs " + red + ", " + green + ", " + blue + ".");
		return {r: red, g: green, b: blue};
	};

	function rgbToHex(color) {
		if(typeof(color) == "object") { //Expects object like "{r: 172, g: 11, b: 34}"
			var red = color.r;
			var green = color.g;
			var blue = color.b;
				//console.log(`Colors loaded (${red}, ${green}, ${blue})`);
			red = Math.round(red);
			green = Math.round(green);
			blue = Math.round(blue);
				//console.log(`Colors rounded to (${red}, ${green}, ${blue})`);
			red = bound(red,0,255)
			green = bound(green,0,255)
			blue = bound(blue,0,255)
				//console.log(`Colors bounded to (${red}, ${green}, ${blue})`);
			red = red.toString(16);
			green = green.toString(16);
			blue = blue.toString(16);
				//console.log(`Colors converted to (0x${red}, 0x${green}, 0x${blue})`);
			//console.log("Padding R");
			while(red.length < 2) {
				red = "0" + red;
			};
			//console.log("Padding G");
			while(green.length < 2) {
				green = "0" + green;
			};
			//console.log("Padding B");
			while(blue.length < 2) {
				blue = "0" + blue;
			};
				//console.log(`Colors padded to (0x${red}, 0x${green}, 0x${blue}), concatenating...`);
			return "#" + red + green + blue;
		} else if(typeof(color) == "string") { //Expects string like "rgb(20,137,4)". Also doesn't round properly for some reason...
				//console.log("Splitting string")
			color = rgbColorStringToUnvalidatedObject(color);
			red = color.r;
			green = color.g;
			blue = color.b;
				//console.log(`Colors loaded (${red}, ${green}, ${blue})`);
			red = Math.round(red);
			green = Math.round(green);
			blue = Math.round(blue);
				//console.log(`Colors rounded to (${red}, ${green}, ${blue})`);
			red = bound(red,0,255)
			green = bound(green,0,255)
			blue = bound(blue,0,255)
				//console.log(`Colors bounded to (${red}, ${green}, ${blue})`);
			red = red.toString(16);
			green = green.toString(16);
			blue = blue.toString(16);
				//console.log(`Colors converted to (0x${red}, 0x${green}, 0x${blue})`);
			//console.log("Padding R");
			while(red.length < 2) {
				red = "0" + red;
			};
			//console.log("Padding G");
			while(green.length < 2) {
				green = "0" + green;
			};
			//console.log("Padding B");
			while(blue.length < 2) {
				blue = "0" + blue;
			};
				//console.log(`Colors padded to (0x${red}, 0x${green}, 0x${blue}), concatenating...`);
			return "#" + red + green + blue;
			} else {
			throw new Error(`Received invalid color: ${color}`);
		};
	};

	function _rgbHexCatcher(color) { //Hex triplet to rgb(), while rgb() is untouched
			//console.log("Logged color for _rgbHexCatcher: " + color);
									 //I have no idea if this runs before or after parsing hex triplets to rgb() values, so I'm going to handle both (by making everything rgb() and then making it hex at the end)
		if(typeof(color) === "undefined") {
			//console.log("Warning: An element has an undefined color. Unfortunately, due to how the code is structured, I can't say which one.");
			color = "#FF00FF";
		};
		if(color.length < 10) {
			//console.log("Short string detected, likely a hex triplet");
			if(!color.startsWith("#")) {
				color = "#" + color;
			};
			var object = hexToRGB(color);
			return `rgb(${object.r},${object.g},${object.b})`
		} else {
			//console.log("Non-triplet detected");
			return color;
		};
	};

	function rgbColorStringToObject(color) {
		if(!color.startsWith("rgb(") || !color.endsWith(")")) {
			throw new Error(`The color ${color} is not a valid rgb() color`)
		};
		var colorTempArray = color.split(",")
		if(colorTempArray.length !== 3) {
			throw new Error(`The color ${color} is not a valid rgb() color`)
		};
		var red = parseFloat(colorTempArray[0].split(",")[0].substring(4))
		var green = parseFloat(colorTempArray[1])
		var blue = parseFloat(colorTempArray[2].slice(0,-1))
		//NaN checking
			var redNaN,greenNaN,blueNaN;
			isNaN(red) ? redNaN = true : redNaN = false;
			isNaN(green) ? greenNaN = true : greenNaN = false;
			isNaN(blue) ? blueNaN = true : blueNaN = false;
			var NanErrorString = "One or more colors are NaN:"
			if(redNaN) { NanErrorString += " red" };
			if(greenNaN) { NanErrorString += " green" };
			if(blueNaN) { NanErrorString += " blue" };
			if(redNaN || greenNaN || blueNaN) { throw new Error(NanErrorString) };
		return {r: red, g: green, b: blue};
	};

	function rgbObjectToString(color) {
		if(typeof(color) !== "object") {
			throw new Error("Input color is not an object");
		};
		var red = color.r;
		var green = color.g;
		var blue = color.b;
			//console.log(`Colors loaded (${red}, ${green}, ${blue})`);
		red = Math.round(red);
		green = Math.round(green);
		blue = Math.round(blue);
			//console.log(`Colors rounded to (${red}, ${green}, ${blue})`);
		red = bound(red,0,255)
		green = bound(green,0,255)
		blue = bound(blue,0,255)
			//console.log(`Colors bounded to (${red}, ${green}, ${blue})`);
		return `rgb(${red},${green},${blue})`
	};
	

		function lightenColor(color,offset,outputType="rgb") {
		if(typeof(color) === "string") {
			if(color.length < 10) {
			//console.log(`detected as hex: ${color}`);
				//catch missing octothorpes
				if(!color.startsWith("#")) {
					color = "#" + color;
				};
			//console.log(`octothorpe checked: ${color}`);

				offset = parseFloat(offset);
				if(isNaN(offset)) {
					throw new Error("Offset is NaN");
				};
				
				color = hexToRGB(color);
				if(color === null) {
					throw new Error("hexToRGB(color) was null (maybe it's an invalid hex triplet?)");
				};
				
			//console.log("converted color: " + JSON.stringify(color));
				var red = color.r + offset;
				var green = color.g + offset;
				var blue = color.b + offset;
			//console.log(`altered color: rgb(${red},${green},${blue})`);
				
				//rounding and bounding
				red = Math.round(red);
				green = Math.round(green);
				blue = Math.round(blue);
			//console.log(`rounded color: rgb(${red},${green},${blue})`);
				red = bound(red,0,255)
				green = bound(green,0,255)
				blue = bound(blue,0,255)
			//console.log(`bounded color: rgb(${red},${green},${blue})`);

				color = {r: red, g: green, b: blue};

				switch(outputType.toLowerCase()) {
					case "rgb":
						return `rgb(${red},${green},${blue})`;
						break;
					case "hex":
						return rgbToHex(color);
						break;
					case "json":
						return color;
						break;
					default:
						throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
				};
			} else {
				if(color.startsWith("rgb(")) {
					color = rgbStringToObject(color,false,false); //object conversion
				//console.log(`color converted to object: ${JSON.stringify(color)}`);

					offset = parseFloat(offset);
					if(isNaN(offset)) {
						throw new Error("Offset is NaN");
					};
					
					var red = color.r + offset;
					var green = color.g + offset;
					var blue = color.b + offset;
				//console.log(`altered color: rgb(${red},${green},${blue})`);
					
					//rounding and bounding
					red = Math.round(red);
					green = Math.round(green);
					blue = Math.round(blue);
				//console.log(`rounded color: rgb(${red},${green},${blue})`);
					red = bound(red,0,255)
					green = bound(green,0,255)
					blue = bound(blue,0,255)
				//console.log(`bounded color: rgb(${red},${green},${blue})`);

					color = {r: red, g: green, b: blue};

					switch(outputType.toLowerCase()) {
						case "rgb":
							return `rgb(${red},${green},${blue})`;
							break;
						case "hex":
							return rgbToHex(color);
							break;
						case "json":
							return color;
							break;
						default:
							throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
					};
				} /*else if(color.startsWith("hsl")) {
					throw new Error("HSL is not implemented yet");
				}*/ else {
					throw new Error('Color must be of the type "rgb(red,green,blue)"'/* or "hsl(hue,saturation%,luminance%)"*/);
				};
			};
		} else if(typeof(color) === "object") {
			if(!color.r || !color.g || !color.b) {
				throw new Error("Color must be of the form {r: red, g: green, b: blue}");
			};
			
		//console.log("received color: " + JSON.stringify(color));
			var red = color.r + offset;
			var green = color.g + offset;
			var blue = color.b + offset;
		//console.log(`altered color: rgb(${red},${green},${blue})`);
			
			//rounding and bounding
			red = Math.round(red);
			green = Math.round(green);
			blue = Math.round(blue);
		//console.log(`rounded color: rgb(${red},${green},${blue})`);
			red = bound(red,0,255)
			green = bound(green,0,255)
			blue = bound(blue,0,255)
		//console.log(`bounded color: rgb(${red},${green},${blue})`);

			color = {r: red, g: green, b: blue};

			switch(outputType.toLowerCase()) {
				case "rgb":
					return `rgb(${red},${green},${blue})`;
					break;
				case "hex":
					return rgbToHex(color);
					break;
				case "json":
					return color;
					break;
				default:
					throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
			};
		};
	};

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