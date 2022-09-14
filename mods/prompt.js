colorInvalidError = "Color must be in the form \"rgb(red,green,blue)\" or \"hsl(hue,saturation%,lightness%)\" (without quotes)!";
stringSynonyms = [ "string", "str", "st", "s" ];
numberSynonyms = [ "number", "num", "nm", "nu", "nb", "integer", "int", "i", "it", "float",
				   "flt", "ft", "fl", "f", "wholenumber", "decimalnumber", "wn", "dn", "w",
				   "d", "deeznuts" ]; /*The purpose of these blatant lies is, through a 
				   reference to the Alice series of software, have an excuse to include deez
				   nuts.*/
																						//Passing "Infinity" through parseFloat returns Infinity. 
booleanSynonyms = [ "boolean", "bool", "boole", "boo", "bo", "bl", "b" ];
trueSynonyms = ["true", "t", "1", "yes"];
falseSynonyms = ["false", "f", "0", "no"];
defaultStringTypeValues = ["element","color","clone","changeTo","void"];
defaultNumberTypeValues = ["x","y","temp","start","vx","vy","chargeCD","start","burnStart","dir","panic","r"];
defaultBooleanTypeValues = ["burning","charge","dead"];
commandHelpObject = {
	"set": "Sets properties for every pixel of a given type.\nUsage: set [property] [element] [value] <type>\nDon't include framing characters []<>.\nThe element can be \"all\" to set the property for every pixel.\nNote: Strings can't have spaces because spaces are the separator used in the parsing split().\nArguments in [brackets] are required and ones in <angle brackets> are optional.",
	"test": "Test.",
	"fill": "Fills the screen with the given pixel(s). Usage: fill [Overwrite pixels? (should be a bool)] [element] <additional elements>.\nDon't include framing characters []<>.\nArguments in [brackets] are required and ones in <angle brackets> are optional.\nAdditional elements are separated by spaces.",
	"randomfill": "Fills the screen with pixels from randomChoices. Usage: randomfill <overwrite pixels? (should be a bool) (default: true)>\nDon't include framing characters []<>.\nArguments in <angle brackets> are optional.",
	"count": "Tells you the amount of a specified pixel on the screen. Usage: count [element]\nDon't include framing characters []<>.\nArguments in [brackets] are required.",
	"countall": "Logs to console a list of all elements on screen and their amounts. Usage: countall.",
	"help": "Usage: help <command>\nDon't include framing characters []<>.\nArguments in <angle brackets> are optional."
}

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
			} /*else if(arraySynonyms.includes(type.toLowerCase())) { //I have no plans to implement these.
				type = "array";
			} else if(objectSynonyms.includes(type.toLowerCase())) {
				type = "object";
			}*/ else {
				alertIfError(alertError,"Unrecognized type: \"" + type + "\".");
				return false;
			};
			
			if(type === null) {
				if(defaultStringTypeValues.includes(property)) {
					type = "string";
				} else if(defaultNumberTypeValues.includes(property)) {
					type = "number";
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
				if(trueSynonyms.includes(value.toLowerCase())) {
					value = true;
				} else if(falseSynonyms.includes(value.toLowerCase())) {
					value = false;
				} else {
					alertIfError(alertError,"Unrecognized boolean value: " + value + ".");
					return false;
				}
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
			
			if(trueSynonyms.includes(doOverwrite.toLowerCase())) {
				doOverwrite = true;
			} else if(falseSynonyms.includes(doOverwrite.toLowerCase())) {
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
				if(trueSynonyms.includes(doOverwrite.toLowerCase())) {
					doOverwrite = true;
				} else if(falseSynonyms.includes(doOverwrite.toLowerCase())) {
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
		case "help":
			if(inputAsArray.length < 1) { //somehow
				alertIfError(alertError,"Usage: help <command>\nDon't include framing characters []<>.\nArguments in <angle brackets> are optional.");
				return false;
			};
			if(inputAsArray.length < 2) {
				alertOutput ? alertIfOutput(alertOutput,"Commands: \nset\ntest\nfill\nrandomfill\ncount\ncountall\nhelp") : console.log("Commands:  set, test, fill, randomfill, count, countall, help");
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

