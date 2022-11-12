//URL

	urlParams = new URLSearchParams(window.location.search);

//Objects

	//getKeyByValue code by SO UncleLaz: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
	//CC-BY-SA-4.0
	function getKeyByValue(object, value) {
	  return Object.keys(object).find(key => object[key] === value);
	};

//RNG

	//Random integer from 0 to n
	function randomIntegerFromZeroToValue(value) {
		var absoluteValuePlusOne = Math.abs(value) + 1;
		if(value >= 0) { //Positive case
			return Math.floor(Math.random() * absoluteValuePlusOne)
		} else { //Negative case: flip sign
			return 0 - Math.floor(Math.random() * absoluteValuePlusOne)
		};
	};

	//Random thing from array
	function randomChoice(array) {
		if(array.length === 0) { throw new Error(`The array ${array} is empty`) };
		var length = array.length;
		var randomIndex = randomIntegerFromZeroToValue(length - 1);
		return array[randomIndex];
	};

	//Random integer from m to n
	function randomIntegerBetweenTwoValues(min,max) {
		if(min > max) {
			var temp = max; //the need of a temporary space has always annoyed me
			max = min;
			min = temp;
		};
		return Math.floor(Math.random() * (max - min + 1)) + min
	};

//Arrays

	//Shallow array comparer by SO Tim Down: https://stackoverflow.com/a/10260204
	//CC-BY-SA-3.0
	function arraysIdentical(arr1, arr2) {
		var i = arr1.length;
		if (i !== arr2.length) {
			return false;
		};
		while (i--) {
			if (arr1[i] !== arr2[i]) {
				return false;
			};
		};
		return true;
	};

	function indexOf(arr, val, comparer) {
		for (var i = 0, len = arr.length; i < len; ++i) {
			if ( i in arr && comparer(arr[i], val) ) {
				return i;
			};
		};
		return -1;
	};

	function averageNumericArray(array) {
		var total = array.reduce(addTwoNumbers,0)
		return total / array.length
	};

	//Function to check if an array includes a given array by SO Johnny Tisdale: https://stackoverflow.com/a/60922255
	//CC-BY-SA-4.0
	function includesArray(parentArray, testArray) {
		for (let i = 0; i < parentArray.length; i++) {
			if (parentArray[i].every(function(value, index) { return value === testArray[index]})) {
				return true;
			};
		};
		return false;
	};

//Checks

	//Element exists in the elements object
	function elementExists(elementName) {
		return typeof(elements[elementName]) === "object";
	};

	//Check if pixel of given element exists at given location
	function hasPixel(x,y,elementInput) {
		if(isEmpty(x,y,true)) { //if empty, it can't have a pixel
			return false;
		} else {
			if(elementInput.includes(",")) { //CSTA
				elementInput = elementInput.split(",");
			};
			if(Array.isArray(elementInput)) { //if element list
				for(i = 0; i < elementInput.length; i++) { if(!elementExists(elementInput[i])) { console.log(`hasPixel: Element "${elementInput[i]}" doesn't exist`) } };
				return elementInput.includes(pixelMap[x][y].element);
			} else { //if single element
				if(!elementExists(elementInput)) { console.log(`hasPixel: Element "${elementInput}" doesn't exist`) };
				return pixelMap[x][y].element === elementInput;
			};
		};		
	};

//Math(s)

	//Distance between points
	function pyth(xA,yA,xB,yB) {
		var a = Math.abs(xB - xA);
		var b = Math.abs(yB - yA);
		var c = Math.sqrt(a**2 + b**2);
		return c;
	};

	//Limit number to [min, max]
	function bound(number,lowerBound,upperBound) {
		return Math.min(upperBound,Math.max(lowerBound,number));
	};

	function addTwoNumbers(number1,number2) { //reducer
		return number1 + number2
	}

//Color

	function rgbStringToUnvalidatedObject(string) { //turns rgb() to {r,g,b} with no bounds checking
		//console.log("Splitting string into object");
		string = string.split(",");
		var red = parseFloat(string[0].substring(4));
		var green = parseFloat(string[1]);
		var blue = parseFloat(string[2].slice(0,-1));
		//console.log("String split: outputs " + red + ", " + green + ", " + blue + ".");
		return {r: red, g: green, b: blue};
	};

	function rgbStringToObject(string,doRounding=true,doBounding=true) { //turns rgb() to {r,g,b}
			//console.log("Splitting string into object");
		string = string.split(",");
		if( (!string[0].startsWith("rgb(")) || (!string[2].endsWith(")")) ) {
			throw new Error("Color must start with \"rgb(\" and end with \")\"");
		};
		var red = parseFloat(string[0].substring(4));
		var green = parseFloat(string[1]);
		var blue = parseFloat(string[2].slice(0,-1));
			//console.log(`Colors loaded (${red}, ${green}, ${blue})`);
		//NaN checking
			var redNaN = isNaN(red);
			var greenNaN = isNaN(green);
			var blueNaN = isNaN(blue);
			var NanErrorString = "One or more colors are NaN:"
			if(redNaN) { NanErrorString += " red" };
			if(greenNaN) { NanErrorString += " green" };
			if(blueNaN) { NanErrorString += " blue" };
			if(redNaN || greenNaN || blueNaN) { throw new Error(NanErrorString) };
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

	function hslColorStringToObject(color) {
		if(!color.startsWith("hsl(") || !color.endsWith(")")) {
			throw new Error(`The color ${color} is not a valid hsl() color`)
		};
		var colorTempArray = color.split(",")
		if(colorTempArray.length !== 3) {
			throw new Error(`The color ${color} is not a valid hsl() color`)
		};
		if(!colorTempArray[1].endsWith("%")) { console.log(`hslColorStringToObject: Saturation in color ${color} was missing a %`); colorTempArray[1] += "%"; }
		if(!colorTempArray[2].endsWith("%)")) { console.log(`hslColorStringToObject: Lightness in color ${color} was missing a %`); colorTempArray[2] = [colorTempArray[2].slice(0, colorTempArray[2].length - 1), "%", colorTempArray[2].slice(colorTempArray[2].length - 1)].join(''); }
		var hue = parseFloat(colorTempArray[0].substring(4));
		var saturation = parseFloat(colorTempArray[1].slice(0,-1))
		var lightness = parseFloat(colorTempArray[2].slice(0,-2));
		//NaN checking
            var hueNaN,saturationNaN,lightnessNaN;
			isNaN(hue) ? hueNaN = true : hueNaN = false;
			isNaN(saturation) ? saturationNaN = true : saturationNaN = false;
			isNaN(lightness) ? lightnessNaN = true : lightnessNaN = false;
			var NanErrorString = "One or more colors are NaN:"
			if(hueNaN) { NanErrorString += " hue" };
			if(saturationNaN) { NanErrorString += " saturation" };
			if(lightnessNaN) { NanErrorString += " lightness" };
			if(hueNaN || saturationNaN || lightnessNaN) { throw new Error(NanErrorString) };
		return {h: hue, s: saturation, l: lightness};
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
			color = rgbStringToUnvalidatedObject(color);
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

	function linearBlendTwoColorObjects(color1,color2,weight1=0.5) { /*third argument is for color1 and expects a float from 0
																  to 1, where 0 means "all color2" and 1 means "all color1"*/
		var w1 = Math.min(Math.max(weight1,0),1);
		var red1 = color1.r;
		var green1 = color1.g;
		var blue1 = color1.b;
		var red2 = color2.r;
		var green2 = color2.g;
		var blue2 = color2.b;
		var red3 = (red1 * w1) + (red2 * (1 - w1));
		var green3 = (green1 * w1) + (green2 * (1 - w1));
		var blue3 = (blue1 * w1) + (blue2 * (1 - w1));
		return {r: red3, g: green3, b: blue3};
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
	
	function rgbHexCatcher(color) { //Hex triplet to rgb(), while rgb() is untouched
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

	function averageColorObjects(color1,color2,weight1=0.5) { /*third argument is for color1 and expects a float from 0
																  to 1, where 0 means "all color2" and 1 means "all color1"*/
		var w1 = Math.min(Math.max(weight1,0),1)
		var red1 = color1.r
		var green1 = color1.g
		var blue1 = color1.b
		var red2 = color2.r
		var green2 = color2.g
		var blue2 = color2.b
		var red3 = (red1 * w1) + (red2 * (1 - w1))
		var green3 = (green1 * w1) + (green2 * (1 - w1))
		var blue3 = (blue1 * w1) + (blue2 * (1 - w1))
		return {r: red3, g: green3, b: blue3}
	};

	function multiplyColors(color1,color2,outputType="rgb") {
		//normalize rgb()/hex by turning any hex into rgb() and then rgb()s to {r,g,b}
		if(typeof(color1) !== "object") {
			color1 = rgbHexCatcher(color1);
			color1 = rgbStringToObject(color1);
		};
		if(typeof(color2) !== "object") {
			color2 = rgbHexCatcher(color2);
			color2 = rgbStringToObject(color2);
		};
		var finalR = Math.round(color1.r * (color2.r/255));
		var finalG = Math.round(color1.g * (color2.g/255));
		var finalB = Math.round(color1.b * (color2.b/255));
		var finalColor = {r: finalR, g: finalG, b: finalB};
		switch(outputType.toLowerCase()) {
			case "rgb":
				return `rgb(${finalColor.r},${finalColor.g},${finalColor.b})`;
				break;
			case "hex":
				return rgbToHex(finalColor);
				break;
			case "json":
				return finalColor;
				break;
			default:
				throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
		};
	};

	function divideColors(color1,color2,outputType="rgb") { //color2 is the divisor and color1 the dividend (base/original color)
		//normalize rgb()/hex by turning any hex into rgb() and then rgb()s to {r,g,b}
		if(typeof(color1) !== "object") {
			color1 = rgbHexCatcher(color1);
			color1 = rgbStringToObject(color1);
		};
		if(typeof(color2) !== "object") {
			color2 = rgbHexCatcher(color2);
			color2 = rgbStringToObject(color2);
		};
		var finalR = bound(Math.round(255 / (color2.r / color1.r)),0,255);
		var finalG = bound(Math.round(255 / (color2.g / color1.g)),0,255);
		var finalB = bound(Math.round(255 / (color2.b / color1.b)),0,255);
		if(isNaN(finalR)) { finalR = 255 };
		if(isNaN(finalG)) { finalG = 255 };
		if(isNaN(finalB)) { finalB = 255 };
		var finalColor = {r: finalR, g: finalG, b: finalB};
		switch(outputType.toLowerCase()) {
			case "rgb":
				return `rgb(${finalColor.r},${finalColor.g},${finalColor.b})`;
				break;
			case "hex":
				return rgbToHex(finalColor);
				break;
			case "json":
				return finalColor;
				break;
			default:
				throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
		};
	};

	function addColors(color1,color2,outputType="rgb") {
		//normalize rgb()/hex by turning any hex into rgb() and then rgb()s to {r,g,b}
		if(typeof(color1) !== "object") {
			color1 = rgbHexCatcher(color1);
			color1 = rgbStringToObject(color1);
		};
		if(typeof(color2) !== "object") {
			color2 = rgbHexCatcher(color2);
			color2 = rgbStringToObject(color2);
		}; 
		var finalR = bound(Math.round(color1.r + color2.r),0,255)
		var finalG = bound(Math.round(color1.g + color2.b),0,255)
		var finalB = bound(Math.round(color1.b + color2.b),0,255)
		var finalColor = {r: finalR, g: finalG, b: finalB};
		switch(outputType.toLowerCase()) {
			case "rgb":
				return `rgb(${finalColor.r},${finalColor.g},${finalColor.b})`;
				break;
			case "hex":
				return rgbToHex(finalColor);
				break;
			case "json":
				return finalColor;
				break;
			default:
				throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
		};
	};

	function subtractColors(color1,color2,outputType="rgb") {
		//normalize rgb()/hex by turning any hex into rgb() and then rgb()s to {r,g,b}
		if(typeof(color1) !== "object") {
			color1 = rgbHexCatcher(color1);
			color1 = rgbStringToObject(color1);
		};
		if(typeof(color2) !== "object") {
			color2 = rgbHexCatcher(color2);
			color2 = rgbStringToObject(color2);
		}; 
		var finalR = bound(Math.round(color1.r - color2.r),0,255)
		var finalG = bound(Math.round(color1.g - color2.b),0,255)
		var finalB = bound(Math.round(color1.b - color2.b),0,255)
		var finalColor = {r: finalR, g: finalG, b: finalB};
		switch(outputType.toLowerCase()) {
			case "rgb":
				return `rgb(${finalColor.r},${finalColor.g},${finalColor.b})`;
				break;
			case "hex":
				return rgbToHex(finalColor);
				break;
			case "json":
				return finalColor;
				break;
			default:
				throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
		};
	};

// Pixels

	function exposedToAir(pixel) {	
		return (isEmpty(pixel.x+1,pixel.y) || isEmpty(pixel.x-1,pixel.y) || isEmpty(pixel.x,pixel.y+1) || isEmpty(pixel.x,pixel.y-1));
	};

	function tryTarnish(pixel,element,chance) {
		if(exposedToAir(pixel)) {
			if(Array.isArray(element)) {
				if(Math.random() < chance) {
					changePixel(pixel,randomChoice(element));
				};
			} else {
				if(Math.random() < chance) {
					changePixel(pixel,element);
				};
			};
		};
	};

	//Try to create a pixel, return true if it could be created and false if it couldn't
	function tryCreatePixel(elementInput,x,y) {
		//array handling
		if(elementInput.includes(",")) { //CSTA
			elementInput = elementInput.split(",");
		};
		if(Array.isArray(elementInput)) { //if element list
			elementInput = elementInput.filter(function(e) {
				return elementExists(e);
			});
			if(elementInput.length === 0) { throw new Error("elementInput has no existing elements") };
			elementInput = randomChoice(elementInput);
		};

		//existence check
		if(!elementExists(elementInput)) {
			throw new Error("Element " + _element + " doesn't exist!");
		};

		//actual creation check
		if(isEmpty(x,y)) {
			createPixel(element,x,y);
			return true;
		} else {
			return false;
		};
	};

	function breakPixel(pixel,changetemp=false) {
		var info = elements[pixel.element];
		if(typeof(info.breakInto) === "undefined") {
			return false;
		};
		var breakIntoElement = info.breakInto;
		if(Array.isArray(breakIntoElement)) {
			breakIntoElement = breakIntoElement[Math.floor(Math.random() * breakIntoElement.length)]
		};
		changePixel(pixel,breakIntoElement,changetemp)
	};

//Logic

	function xor(c1,c2) {
		if(!!c1 && !c2) {
			return true;
		} else if(!c1 && !!c2) {
			return true;
		} else {
			return false;
		};
	};
