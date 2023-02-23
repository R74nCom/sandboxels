var modName = "mods/prompt.js";
var variablesMod = "mods/prop and prompt variables.js";

if(enabledMods.includes(variablesMod)) {
	commandHelpObject = {
		"set": "Sets properties for every pixel of a given type.\nUsage: set [property] [element] [value] <type>\nDon't include framing characters []<>.\nThe element can be \"all\" to set the property for every pixel.\nNote: Strings can't have spaces because spaces are the separator used in the parsing split().\nArguments in [brackets] are required and ones in <angle brackets> are optional.",
		"test": "Test.",
		"setdimensions": "#This command clears the canvas#\nSets the width and height of the canvas and resets it to regenerate pixelMap.\nThis is offsetted so it doesn't count the OoB area on the top left; a 50x50 save will have a 50x50 usable area.\nUsage: setdimensions [width] [height] <pixel rendering size>.\nDon't include framing characters []<>.\nArguments in [brackets] are required and ones in <angle brackets> are optional.",
		"pixelsize": "Sets the size of the pixels on screen. If no size is given, it instead alerts the current pixel size. Usage: pixelsize <pixel rendering size>.\nDon't include framing characters <>.\nArguments in <angle brackets> are optional.",
		"dimensions": "Alerts the current dimensions. Usage: dimensions",
		"fill": "Fills the screen with the given pixel(s). Usage: fill [Overwrite pixels? (bool)] [element] <additional elements>.\nDon't include framing characters []<>.\nArguments in [brackets] are required and ones in <angle brackets> are optional.\nAdditional elements are separated by spaces.",
		"randomfill": "Fills the screen with pixels from randomChoices. Usage: randomfill <overwrite pixels? (bool, default: true)>\nDon't include framing characters []<>.\nArguments in <angle brackets> are optional.",
		"count": "Tells you the amount of a specified pixel on the screen. Usage: count [element]\nDon't include framing characters []<>.\nArguments in [brackets] are required.",
		"countall": "Logs to console a list of all elements on screen and their amounts. Usage: countall.",
		"help": "Usage: help <command>\nDon't include framing characters []<>.\nArguments in <angle brackets> are optional."
	};
	
	if(enabledMods.includes("mods/code_library.js")) {
		commandHelpObject.stars = "Clears the screen and replaces it with random stars. Usage: stars <density (number, default: 0.001)> <seed (string or number, no default value)>\nDon't include framing characters <>.\nArguments in <angle brackets> are optional."
		commandHelpObject.starseed = "Alerts the last used seed for stars. Usage: starseed";
		var lastStarSeed = "[None]";
		function seededCreateLargeStar(x,y,minRadius,maxRadius,minTemp,maxTemp,randomFunction) {
			//console.log("start");
			var sunPixels = fillCircleReturn("sun",x,y,seededRandBetween(minRadius,maxRadius,randomFunction),true);
			//console.log("filled");
			var randTemp = seededRandBetween(minTemp,maxTemp,randomFunction);
			//console.log("setting temps");
			for(pixelIndex = 0; pixelIndex < sunPixels.length; pixelIndex++) {
				//console.log("pixel " + pixelIndex, sunPixels[pixelIndex].element);
				sunPixels[pixelIndex].temp = randTemp;
			};
			//console.log(sunPixels.map(x => x.element));
			//console.log("finished");
			return true;
		};
		
			//G
		elements.red_giant = {
			color: "#f19898",
			behavior: behaviors.WALL,
			tick: function(pixel) {
				seededCreateLargeStar(pixel.x,pixel.y,3,4,1800,3300,Math.random);
			},
			category: "stars",
			state: "gas",
			excludeRandom: true,
			maxSize: 1,
			cooldown: defaultCooldown,
			density: 1000,
		};

		elements.blue_giant = {
			color: "#a085eb",
			behavior: behaviors.WALL,
			tick: function(pixel) {
				seededCreateLargeStar(pixel.x,pixel.y,2,3,20000,80000,Math.random);
			},
			category: "stars",
			state: "gas",
			excludeRandom: true,
			maxSize: 1,
			cooldown: defaultCooldown,
			density: 1000,
		};

		elements.yellow_giant = {
			color: "#fafad4",
			behavior: behaviors.WALL,
			tick: function(pixel) {
				seededCreateLargeStar(pixel.x,pixel.y,2,3,6000,11000,Math.random);
			},
			category: "stars",
			state: "gas",
			excludeRandom: true,
			maxSize: 1,
			cooldown: defaultCooldown,
			density: 1000,
		};

			//SG
		elements.red_supergiant = {
			color: "#f48585",
			behavior: behaviors.WALL,
			tick: function(pixel) {
				seededCreateLargeStar(pixel.x,pixel.y,6,8,1700,3200,Math.random);
			},
			category: "stars",
			state: "gas",
			excludeRandom: true,
			maxSize: 1,
			cooldown: defaultCooldown,
			density: 1000,
		};

		elements.blue_supergiant = {
			color: "#93b0ec",
			behavior: behaviors.WALL,
			tick: function(pixel) {
				seededCreateLargeStar(pixel.x,pixel.y,5,7,19000,83000,Math.random);
			},
			category: "stars",
			state: "gas",
			excludeRandom: true,
			maxSize: 1,
			cooldown: defaultCooldown,
			density: 1000,
		};

		elements.yellow_supergiant = {
			color: "#f4f9ae",
			behavior: behaviors.WALL,
			tick: function(pixel) {
				seededCreateLargeStar(pixel.x,pixel.y,5,7,5500,10500,Math.random);
			},
			category: "stars",
			state: "gas",
			excludeRandom: true,
			maxSize: 1,
			cooldown: defaultCooldown,
			density: 1000,
		};

			//HG
		elements.red_hypergiant = {
			color: "#ee5d5d",
			behavior: behaviors.WALL,
			tick: function(pixel) {
				seededCreateLargeStar(pixel.x,pixel.y,9,12,1600,3100,Math.random);
			},
			category: "stars",
			state: "gas",
			excludeRandom: true,
			maxSize: 1,
			cooldown: defaultCooldown,
			density: 1000,
		};

		elements.blue_hypergiant = {
			color: "#719df4",
			behavior: behaviors.WALL,
			tick: function(pixel) {
				seededCreateLargeStar(pixel.x,pixel.y,8,11,18000,84000,Math.random);
			},
			category: "stars",
			state: "gas",
			excludeRandom: true,
			maxSize: 1,
			cooldown: defaultCooldown,
			density: 1000,
		};

		elements.yellow_hypergiant = {
			color: "#f7f990",
			behavior: behaviors.WALL,
			tick: function(pixel) {
				seededCreateLargeStar(pixel.x,pixel.y,8,11,5000,10000,Math.random);
			},
			category: "stars",
			state: "gas",
			excludeRandom: true,
			maxSize: 1,
			cooldown: defaultCooldown,
			density: 1000,
		};
	};

	function rgbStringToUnvalidatedObject(string) {
		string = string.split(",");
		var red = parseFloat(string[0].substring(4));
		var green = parseFloat(string[1]);
		var blue = parseFloat(string[2].slice(0,-1));
		return {r: red, g: green, b: blue};
	}

	function hslStringToUnvalidatedObject(string) {
		string = string.split(",");
		var hue = parseFloat(string[0].substring(4));
		var saturation = parseFloat(string[1].slice(0,-1));
		var lightness = parseFloat(string[2].slice(0,-2));
		return {h: hue, s: saturation, l: lightness};
	}

	function alertIfError(alertError,text) {
		if(alertError) {
			alert(text);
			return(true);
		} else {
			return(false);
		}
	}

	function alertIfOutput(alertOutput,text) {
		if(alertOutput) { 
			alert(text);
			return(true);
		} else {
			return(false);
		}
	}

	function funniPrompt(argument=null,alertOutput=true,alertError=true) {
		argument === null ? inputText = prompt("Enter command") : inputText = argument;
		// replace spaces with underscores
		inputAsArray = inputText.split(" ");
		var firstItem = inputAsArray[0];
		
		switch(firstItem.toLowerCase()) {
			case "set":
				if(inputAsArray.length < 4) {
					alertIfError(alertError,"Usage: set [property] [element] [value] <type>\nDon't include framing characters []<>.\nThe element can be \"all\" to set the property for every pixel.\nNote: Strings can't have spaces because spaces are the separator used in the parsing split().\nArguments in [brackets] are required and ones in <angle brackets> are optional.");
					return false;
				};
				var property = inputAsArray[1];
				//console.log("Property gotten: " + property);
				var inputElement = inputAsArray[2];
				//console.log("Element gotten: " + inputElement);
				var value = inputAsArray[3];
				//console.log("Value gotten: " + value);
				var type = null; //dummy type for [value]-based assumption
				if(inputAsArray.length >= 5) {
					type = inputAsArray[4];
				};
				//console.log("Type gotten: " + type);
				
				if(type === null) {
					type = null; //catch null type
				} else if(numberSynonyms.includes(type.toLowerCase())) {
					type = "number";
				} else if(booleanSynonyms.includes(type.toLowerCase())) {
					type = "boolean";
				} else if(stringSynonyms.includes(type.toLowerCase())) {
					type = "string";
				} else if(arraySynonyms.includes(type.toLowerCase())) {
					type = "array";
				} else if(objectSynonyms.includes(type.toLowerCase())) {
					type = "object";
				};

				var typeWhitelist = [null,"string","number","boolean","array","object"];
				if(!typeWhitelist.includes(type)) {
					alertIfError(alertError,"Unrecognized type: \"" + type + "\".");
					return false;
				};
				
				if(type === null) {
					if(defaultStringTypeValues.includes(property)) {
						type = "string";
					} else if(defaultNumberTypeValues.includes(property)) {
						type = "number";
					} else if(defaultBooleanTypeValues.includes(property)) {
						type = "boolean";
					} else if(defaultArrayTypeValues.includes(property)) {
						type = "array";
					} else {
						alertIfError(alertError,"Type could not be assumed from property. Please specify the type as a fourth argument.");
						return false;
					}
				}
				
				if(type === "number") {
					value = parseFloat(value);
					if(isNaN(value)) {
						alertIfError(alertError,"Value is not a number!");
						return false;
					};
				} else if(type === "boolean") {
					if(synonymsOfTrue.includes(value.toLowerCase())) {
						value = true;
					} else if(synonymsOfFalse.includes(value.toLowerCase())) {
						value = false;
					} else {
						alertIfError(alertError,"Unrecognized boolean value: " + value + ".");
						return false;
					}
				} else if(type === "object") {
					try {
						value = JSON.parse(value);
					} catch (error) {
						alertIfError(alertError,"JSON is invalid! Note that it requires quotes around keys as well as those curly {} parentheses.");
						return false;
					};
				} else if(type === "array") {
					array = value.split(",");
					for(i = 0; i < array.length; i++) {
						if(array[i].startsWith("s")) { //String
							array[i] = array[i].substring(1);
						} else if(array[i].startsWith("n")) { //Number
							array[i] = array[i].substring(1);
							if(isNaN(parseFloat(array[i]))) {
								alert(array[i] + " is not a number!");
								return false;
							};
							array[i] = parseFloat(array[i]);
						} else if(array[i].startsWith("o")) { //Object
							array[i] = array[i].substring(1);
							try {
								array[i] = JSON.parse(array[i]);
							} catch (error) {
								alert(array[i] + " is not valid JSON!");
								return false;
							};
						} else if(array[i].startsWith("b")) { //Boolean
							array[i] = array[i].substring(1);
							if(synonymsOfTrue.includes(array[i].toLowerCase())) {
								array[i] = true;
							} else if(synonymsOfFalse.includes(array[i].toLowerCase())) {
								array[i] = false;
							} else {
								alert("Unrecognized boolean value: " + array[i] + ".");
								return false;
							};
						} else {
							alert(array[i] + ' must start with "s" for a string, "n" for a number, "o" for an object, or "b" for a boolean.');
							return false;
						};
					};
					value = array;
				}
				//The values start out as strings when split from the array, so string is kind of the default form.
				
				//Special validation
				
				if(property === "element") {
					var originalInput = value; //for error display
					value = mostSimilarElement(value);
					if(!elements[value]) {
						alertIfError(alertError,"Element " + originalInput + " does not exist!");
						return false;
					}
				};
				if(property === "x") {
					if(!Number.isSafeInteger(value)) {
						alertIfError(alertError,"X cannot be a decimal! And what are you doing trying to set position values anyway?");
						return false;
					}
				};
				if(property === "color") {
					if(!value.startsWith("rgb(")) { //if not RGB
						if(value.startsWith("hsl(")) { //if HSL
							if(!(value.split(",")[1].endsWith('%')) || !(value.split(",")[2].endsWith('%)'))) { //if missing percent symbols
								alertIfError(alertError,colorInvalidError);
								return false;
							};
						} else { //if not RGB and not HSL
							alertIfError(alertError,colorInvalidError);
							return false;
						};
					}
					if(value.split(",").length !== 3) { //if too short or long
						alertIfError(alertError,colorInvalidError);
						return false;
					}
					if(value.startsWith("rgb(")) { //if RGB
						var checkedColorObject = rgbStringToUnvalidatedObject(value); //RGB NaN checking
						if(isNaN(checkedColorObject.r) || isNaN(checkedColorObject.g) || isNaN(checkedColorObject.b)) {
							//console.log(checkedColorObject);
							alertIfError(alertError,"One or more color values are invalid!");
							return false;
						};
					} else if(value.startsWith("hsl(")) { //if HSL
						var checkedColorObject = hslStringToUnvalidatedObject(value); //HSL NaN checking
						if(isNaN(checkedColorObject.h) || isNaN(checkedColorObject.s) || isNaN(checkedColorObject.l)) {
							//console.log(checkedColorObject);
							alertIfError(alertError,"One or more color values are invalid!");
							return false;
						};
					} else { //if neither
						alertIfError(alertError,colorInvalidError);
						return false;
					};
				};
				
				//Actual setting code;
				var setCount = 0;
				for (var i = 1; i < width; i++) {
					for (var j = 1; j < height; j++) {
						if (!isEmpty(i,j)) {
							//console.log("Pixel (" + i + "," + j + ") exists")
							if(pixelMap[i][j].element === inputElement || inputElement === "all") {
								//console.log("Element is a match: " + inputElement + ", " + pixelMap[i][j].element)
								pixelMap[i][j][property] = value;
								if(property == "temp") { pixelTempCheck(pixelMap[i][j]) };
								setCount++;
							};
						};
					};
				};
				inputElement === "all" ? alertIfOutput(alertOutput,`Set ${property} of ${setCount} pixels to ${value}.`) : alertIfOutput(alertOutput,`Set ${property} of ${setCount} ${inputElement} pixels to ${value}.`)
				return true;
			case "test":
				alertIfOutput(alertOutput,"pong");
				console.log("qwertyuiopasdfghjklzxcvbnm");
				return true;
			case "setdimensions":
				if(inputAsArray.length < 3) {
					alertIfError(alertError,commandHelpObject.setdimensions);
					return false;
				};

				var argWidth = inputAsArray[1];

				var argHeight = inputAsArray[2];

				var argPixelSize = inputAsArray[3];
				
				if(argWidth == undefined) {
					alertIfError(alertError,commandHelpObject.setdimensions);
					return false;
				} else {
					argWidth = parseInt(argWidth);
					if(isNaN(argWidth)) {
						alert("Error: width was NaN");
						console.error("setdimensions: supplied width was NaN");
						return false;
					} else {
						if(argWidth < 1) {
							alert("Width must be greater than 0");
							console.error("setdimensions: supplied width was zero or negative");
							return false;
						};
					};
				};
				
				if(argHeight == undefined) {
					alertIfError(alertError,commandHelpObject.setdimensions);
					return false;
				} else {
					argHeight = parseInt(argHeight);
					if(isNaN(argHeight)) {
						alert("Error: height was NaN");
						console.error("setdimensions: supplied height was NaN");
						return false;
					} else {
						if(argHeight < 1) {
							alert("Height must be greater than 0");
							console.error("setdimensions: supplied height was zero or negative");
							return false;
						};
					};
				};
				
				if(argPixelSize == undefined) {
					argPixelSize = null;
				} else {
					argPixelSize = parseFloat(argPixelSize);
					if(isNaN(argPixelSize)) {
						argPixelSize = null;
						alert("pixelSize was NaN, ignoring");
						console.log("setdimensions: supplied pixelSize was NaN");
					} else {
						if(argPixelSize <= 0) {
							alert("Pixel size was non-positive, ignoring");
							console.error("setdimensions: supplied pixel size was zero or negative");
							argPixelSize = null;
						};
					};
				};
				
				width = argWidth + 1;
				
				height = argHeight + 1;
				
				if(typeof(argPixelSize) === "number" && argPixelSize !== null && !isNaN(argPixelSize)) {
					if(argPixelSize > 0) {
						pixelSize = argPixelSize;
					};
				};

				clearAll();

				return true;
			case "pixelsize":
				if(inputAsArray.length < 1) { //?
					alertIfError(alertError,commandHelpObject.setpixelsize);
					return false;
				};

				var argPixelSize = inputAsArray[1];
				
				if(argPixelSize == undefined) {
					argPixelSize = null;
				} else {
					argPixelSize = parseFloat(argPixelSize);
					if(isNaN(argPixelSize)) {
						alert("Error: size was NaN");
						console.error("setpixelsize: supplied pixel size was NaN");
						return false;
					};
				};
				
				if(typeof(argPixelSize) === "number" && argPixelSize !== null && !isNaN(argPixelSize)) {
					if(argPixelSize <= 0) {
						alert("Pixel size must be greater than 0");
						console.error("setpixelsize: supplied pixel size was zero or negative");
						return false;
					} else {
						pixelSize = argPixelSize;
					};
				} else {
					alert(pixelSize);
				};

				return pixelSize;
			case "dimensions":
				if(inputAsArray.length < 1) { //?
					alertIfError(alertError,commandHelpObject.dimensions);
					return false;
				};

alert(`width: ${width}
height: ${height}
(Usable area is 1 pixel less in both dimensions)`);

				return [width,height];
			case "fill":
				if(inputAsArray.length < 3) {
					alertIfError(alertError,commandHelpObject.fill);
					return false;
				};
				
				var doOverwrite = inputAsArray[1];
				
				var elementList = inputAsArray.slice(2);
				//console.log(elementList);
				
				for(i = 0; i < elementList.length; i++) {
					var elementInConsideration = elementList[i]
					var originalElement = elementInConsideration; //also for error display
					elementInConsideration = mostSimilarElement(elementInConsideration);
					if(!elements[elementInConsideration]) {
						alertIfError(alertError,"Element " + originalElement + " does not exist!");
						return false;
					}
					elementList[i] = elementInConsideration;
				};
				//console.log(elementList);
				
				if(synonymsOfTrue.includes(doOverwrite.toLowerCase())) {
					doOverwrite = true;
				} else if(synonymsOfFalse.includes(doOverwrite.toLowerCase())) {
					doOverwrite = false;
				} else {
					alertIfError(alertError,"Unrecognized boolean value: " + doOverwrite + "\n Note that for this command, the boolean value goes first.");
					return false;
				}
				//console.log(doOverwrite);
				//console.log(elementList);
				
				//Fill code
				var fillCount = 0;
				for (var i = 1; i < width; i++) {
					for (var j = 1; j < height; j++) {
						var randomElement = elementList[Math.floor(Math.random() * elementList.length)];
						if(doOverwrite) {
							if(!isEmpty(i,j,true)) { deletePixel(i,j) };
						};
						if (isEmpty(i,j,false)) {
							createPixel(randomElement,i,j);
							fillCount++;
						};
					};
				};
				alertIfOutput(alertOutput,`Placed ${fillCount} pixels`);
				return fillCount;
			case "randomfill":
				if(inputAsArray.length < 1) { //somehow?
					alertIfError(alertError,"Usage: randomfill <overwrite (should be a bool) (default: true)>\nDon't include framing characters []<>.\nArguments in <angle brackets> are optional.");
					return false;
				};
				
				var doOverwrite = null;
				
				if(inputAsArray.length > 1) {
					var doOverwrite = inputAsArray[1];
					if(synonymsOfTrue.includes(doOverwrite.toLowerCase())) {
						doOverwrite = true;
					} else if(synonymsOfFalse.includes(doOverwrite.toLowerCase())) {
						doOverwrite = false;
					} else {
						alertIfError(alertError,"Unrecognized boolean value: " + value);
						return false;
					};
				} else {
					doOverwrite = true;
				};
				
				var elementList = randomChoices;
				
				//Fill code
				var fillCount = 0;
				for (var i = 1; i < width; i++) {
					for (var j = 1; j < height; j++) {
						var randomElement = elementList[Math.floor(Math.random() * elementList.length)];
						if(doOverwrite) {
							if(!isEmpty(i,j,true)) { deletePixel(i,j) };
						};
						if (isEmpty(i,j,false)) {
							createPixel(randomElement,i,j);
							fillCount++;
						};
					};
				};
				alertIfOutput(alertOutput,`Placed ${fillCount} random pixels`);
				return fillCount;
			case "count":
				if(inputAsArray.length < 2) {
					alertIfError(alertError,"Usage: count [element]\nDon't include framing characters []<>.\nNote: The element name can't have a space in it because spaces are the separator used in the parsing split().\nArguments in [brackets] are required.");
					return false;
				};
				var inputElement = inputAsArray[1];
				//console.log("Element gotten: " + inputElement);

				var originalInput = inputElement; //for error display
				inputElement = mostSimilarElement(inputElement);
				//console.log("Element gotten: " + inputElement);
				if(typeof(elements[inputElement]) === "undefined") {
					alertIfError(alertError,"Element " + originalInput + " does not exist!");
					return false;
				}
				
				//Actual counting code;
				var count = 0;
				for (var i = 1; i < width; i++) {
					for (var j = 1; j < height; j++) {
						if (!isEmpty(i,j)) {
							//console.log("Pixel (" + i + "," + j + ") exists")
							if(pixelMap[i][j].element === inputElement) {
								//console.log("Element is a match: " + inputElement + ", " + pixelMap[i][j].element)
								count++;
							};
						};
					};
				};
				alertIfOutput(alertOutput,`There are ${count} pixels of ${inputElement}`);
				return count;
			case "countall":
				var listObject = {};

				//Listing code;
				for (var i = 1; i < width; i++) {
					for (var j = 1; j < height; j++) {
						if (!isEmpty(i,j)) {
							var pixel = pixelMap[i][j];
							var element = pixel.element;
							if(!listObject[pixel.element]) {
								listObject[pixel.element] = 1;
							} else {
								listObject[pixel.element]++;
							}
						};
					};
				};
				
				var formattedList = "";
				var zelements = Object.keys(listObject);
				for(k = 0; k < zelements.length; k++) {
					var elementName = zelements[k];
					var elementCount = listObject[elementName];
					formattedList += `${elementName}: ${elementCount}\n`;
				};
				
				alertIfOutput(alertOutput,"Elements counts logged to console");
				console.log(formattedList);
				return listObject;
			case "stars":
				var starDensity = inputAsArray[1];
				
				var seed = inputAsArray[2]; //〜カクセイ〜

				if(starDensity == undefined) {
					starDensity = 0.001
				} else {
					starDensity = parseFloat(starDensity);
					if(isNaN(starDensity)) {
						alert("starDensity was NaN, defaulting to 0.001");
						starDensity = 0.001;
					};
				};
				
				var stringSeed = false;
				var seedString = null;
				
				if(seed === undefined) {
					seed = Math.random();
					stringSeed = false;
				} else {
					if(isNaN(parseFloat(seed))) {
						stringSeed = true;
						seedString = seed;
						seed = cyrb128(seed)[2];
					} else {
						stringSeed = false;
						seed = parseFloat(seed);
					};
				};
				
				lastStarSeed = stringSeed ? seedString : seed;
				//console.log(stringSeed);
				//console.log(lastStarSeed);
				var randomFunction = mulberry32(seed);
				
				if(!enabledMods.includes("mods/code_library.js")) {
					alert("'stars' command requires 'code_library.js' mod!");
					return false;
				} else {
					clearAll();
					for(j = 1; j < height; j++) {
						for(i = 1; i < width; i++) {
							if(randomFunction() < starDensity) {
								if(isEmpty(i,j,false)) {
									var value = randomFunction() ** 4;

									if(value < 0.3) {
										createPixelReturn("sun",i,j).temp = seededRandBetween(1800,3300,randomFunction);
									} else if(value < 0.55) {
										createPixelReturn("sun",i,j).temp = seededRandBetween(3300,5500,randomFunction);
									} else if(value < 0.70) {
										createPixelReturn("sun",i,j).temp = seededRandBetween(5500,8000,randomFunction);
									} else if(value < 0.8) {
										createPixelReturn("sun",i,j).temp = seededRandBetween(8000,13000,randomFunction);
									} else if(value < 0.85) {
										createPixelReturn("sun",i,j).temp = seededRandBetween(13000,35000,randomFunction);
									} else if(value < 0.88) {
										createPixelReturn("sun",i,j).temp = seededRandBetween(35000,90000,randomFunction);
									} else { //other stuff
										var value2 = randomFunction();
										if(value2 < 0.5) { //giant stars
											var value3 = randomFunction();
											if(value3 < 0.6) { //favor red giants
												var sunPixels = fillCircleReturn("sun",i,j,seededRandBetween(3,4,randomFunction));
												var randTemp = seededRandBetween(1800,3300,randomFunction);
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else if(value3 < 0.9) { //blue giants are rarer
												var sunPixels = fillCircleReturn("sun",i,j,seededRandBetween(2,3,randomFunction));
												var randTemp = seededRandBetween(20000,80000,randomFunction);
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else { //yellows are even rarer
												var sunPixels = fillCircleReturn("sun",i,j,seededRandBetween(2,3,randomFunction));
												var randTemp = seededRandBetween(6000,11000,randomFunction);
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											};
										} else if(value2 < 0.6) { //supergiants
											var value3 = randomFunction();
											if(value3 < 0.6) {
												var sunPixels = fillCircleReturn("sun",i,j,seededRandBetween(6,8,randomFunction));
												var randTemp = seededRandBetween(1700,3200,randomFunction);
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else if(value3 < 0.9) {
												var sunPixels = fillCircleReturn("sun",i,j,seededRandBetween(5,7,randomFunction));
												var randTemp = seededRandBetween(19000,83000,randomFunction);
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else {
												var sunPixels = fillCircleReturn("sun",i,j,seededRandBetween(5,6,randomFunction));
												var randTemp = seededRandBetween(5500,10500,randomFunction);
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											};
										} else if(value2 < 0.65) { //hypergiants
											var value3 = randomFunction();
											if(value3 < 0.6) {
												var sunPixels = fillCircleReturn("sun",i,j,seededRandBetween(9,12,randomFunction));
												var randTemp = seededRandBetween(1600,3100,randomFunction);
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else if(value3 < 0.94) {
												var sunPixels = fillCircleReturn("sun",i,j,seededRandBetween(8,11,randomFunction));
												var randTemp = seededRandBetween(18000,84000,randomFunction);
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else {
												var sunPixels = fillCircleReturn("sun",i,j,seededRandBetween(8,11,randomFunction));
												var randTemp = seededRandBetween(5000,10000,randomFunction);
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											};
										} else if(value2 < 0.8) { //white dwarfs/neutron stars
											if(randomFunction() < 0.8) { //favor white dwarfs
												createPixelReturn("sun",i,j).temp = seededRandBetween(100000,300000,randomFunction);
											} else {
												if(!elements.neutron_star) {
													createPixelReturn("sun",i,j).temp = seededRandBetween(100000,300000,randomFunction);
												} else {
													createPixelReturn("neutron_star",i,j).temp = seededRandBetween(2000000,10000000,randomFunction);
												};
											};
										} else { //brown dwarfs
											createPixelReturn("sun",i,j).temp = seededRandBetween(100,800,randomFunction);
										};
									};
								};
							};
						};
					};
				};
				return true;
				break;
			case "kakusei":
			case "starseed":
				if(!enabledMods.includes("mods/code_library.js")) {
					alert("'starseed' command requires 'code_library.js' mod!");
					return false;
				};
				alertIfOutput(alertOutput,lastStarSeed);
				console.log(lastStarSeed);
				return lastStarSeed;
			case "help":
				if(inputAsArray.length < 1) { //somehow
					alertIfError(alertError,"Usage: help <command>\nDon't include framing characters []<>.\nArguments in <angle brackets> are optional.");
					return false;
				};
				if(inputAsArray.length < 2) {
					alertOutput ? alertIfOutput(alertOutput,"Commands: " + Object.keys(commandHelpObject).join("\n")) : console.log("Commands: " + Object.keys(commandHelpObject).join(", "));
				} else {
					var command = inputAsArray[1];

					if(typeof(commandHelpObject[command]) === "undefined") {
						alertIfError(alertError,"Cound not find help for " + command + ".");
						return false;
					} else {
						alertOutput ? alertIfOutput(alertOutput,commandHelpObject[command]) : console.log(commandHelpObject[command].replace(/\n/g, "        "));
						return true;
					};
				};
				return true;
			default:
				alertIfError(alertError,`Command ${firstItem} not found!`);
				return false;
		};
	};

	document.addEventListener("keydown", function(e) { //prop prompt listener
		// , = propPrompt()
		if (e.keyCode == 49) { //!
			if(shiftDown) { funniPrompt() };
		};
	});

	elements.funni_prompt = {
		color: ["#000000","#00ff00","#000000","#00ff00","#000000","#00ff00","#000000","#00ff00","#000000","#00ff00"],
		behavior: behaviors.SELFDELETE,
		desc: "<span style='color:#FF00FF;' onClick=funniPrompt()>Click here or press Shift+1 to open the command prompt.</span>",
		category:"special",
	};
} else {
	alert(`The ${variablesMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	enabledMods.splice(enabledMods.indexOf(modName),0,variablesMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
