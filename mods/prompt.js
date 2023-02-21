var modName = "mods/prompt.js";
var variablesMod = "mods/prop and prompt variables.js";

if(enabledMods.includes(variablesMod)) {
	commandHelpObject = {
		"set": "Sets properties for every pixel of a given type.\nUsage: set [property] [element] [value] <type>\nDon't include framing characters []<>.\nThe element can be \"all\" to set the property for every pixel.\nNote: Strings can't have spaces because spaces are the separator used in the parsing split().\nArguments in [brackets] are required and ones in <angle brackets> are optional.",
		"test": "Test.",
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
		
		switch(firstItem) {
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
			case "fill":
				if(inputAsArray.length < 3) {
					alertIfError(alertError,"Usage: fill [overwrite (should be a bool)] [element] <additional elements>.\nDon't include framing characters []<>.\nArguments in [brackets] are required and ones in <angle brackets> are optional.");
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
										createPixelReturn("sun",i,j).temp = randomIntegerBetweenTwoValues(1800,3300);
									} else if(value < 0.55) {
										createPixelReturn("sun",i,j).temp = randomIntegerBetweenTwoValues(3300,5500);
									} else if(value < 0.70) {
										createPixelReturn("sun",i,j).temp = randomIntegerBetweenTwoValues(5500,8000);
									} else if(value < 0.8) {
										createPixelReturn("sun",i,j).temp = randomIntegerBetweenTwoValues(8000,13000);
									} else if(value < 0.85) {
										createPixelReturn("sun",i,j).temp = randomIntegerBetweenTwoValues(13000,35000);
									} else if(value < 0.88) {
										createPixelReturn("sun",i,j).temp = randomIntegerBetweenTwoValues(35000,90000);
									} else { //other stuff
										var value2 = randomFunction();
										if(value2 < 0.5) { //giant stars
											var value3 = randomFunction();
											if(value3 < 0.6) { //favor red giants
												var sunPixels = fillCircleReturn("sun",i,j,randomIntegerBetweenTwoValues(3,4));
												var randTemp = randomIntegerBetweenTwoValues(1800,3300)
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else if(value3 < 0.9) { //blue giants are rarer
												var sunPixels = fillCircleReturn("sun",i,j,randomIntegerBetweenTwoValues(2,3));
												var randTemp = randomIntegerBetweenTwoValues(20000,80000)
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else { //yellows are even rarer
												var sunPixels = fillCircleReturn("sun",i,j,randomIntegerBetweenTwoValues(2,3));
												var randTemp = randomIntegerBetweenTwoValues(6000,11000)
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											};
										} else if(value2 < 0.6) { //supergiants
											var value3 = randomFunction();
											if(value3 < 0.6) {
												var sunPixels = fillCircleReturn("sun",i,j,randomIntegerBetweenTwoValues(6,8));
												var randTemp = randomIntegerBetweenTwoValues(1700,3200)
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else if(value3 < 0.9) {
												var sunPixels = fillCircleReturn("sun",i,j,randomIntegerBetweenTwoValues(5,7));
												var randTemp = randomIntegerBetweenTwoValues(19000,83000)
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else {
												var sunPixels = fillCircleReturn("sun",i,j,randomIntegerBetweenTwoValues(5,6));
												var randTemp = randomIntegerBetweenTwoValues(5500,10500)
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											};
										} else if(value2 < 0.65) { //hypergiants
											var value3 = randomFunction();
											if(value3 < 0.6) {
												var sunPixels = fillCircleReturn("sun",i,j,randomIntegerBetweenTwoValues(9,12));
												var randTemp = randomIntegerBetweenTwoValues(1600,3100)
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else if(value3 < 0.94) {
												var sunPixels = fillCircleReturn("sun",i,j,randomIntegerBetweenTwoValues(8,11));
												var randTemp = randomIntegerBetweenTwoValues(18000,84000)
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											} else {
												var sunPixels = fillCircleReturn("sun",i,j,randomIntegerBetweenTwoValues(8,11));
												var randTemp = randomIntegerBetweenTwoValues(5000,10000)
												for(pixel in sunPixels) {
													sunPixels[pixel].temp = randTemp;
												};
											};
										} else if(value2 < 0.8) { //white dwarfs/neutron stars
											if(randomFunction() < 0.8) { //favor white dwarfs
												createPixelReturn("sun",i,j).temp = randomIntegerBetweenTwoValues(100000,300000);
											} else {
												elements.neutron_star ? createPixelReturn("neutron_star",i,j).temp = randomIntegerBetweenTwoValues(100000,10000000) : createPixelReturn("sun",i,j).temp = randomIntegerBetweenTwoValues(100000,300000);
											};
										} else { //brown dwarfs
											createPixelReturn("sun",i,j).temp = randomIntegerBetweenTwoValues(100,800);
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
