colorInvalidError = "Color must be in the form \"rgb(red,green,blue)\" or \"hsl(hue,saturation%,lightness%)\" (without quotes)!";
stringSynonyms = ["string","str","st","s"];
numberSynonyms = ["number","num","nm","nu","n","integer","int","i","float","flt","f", //we will say integer but actually make it a float, how evil
						 "wholenumber","decimalnumber","wn","dn","w","d","deeznuts"]; //Alice (software) reference, and an excuse to include deez nuts
booleanSynonyms = ["boolean", "bool", "boo", "bo", "bl", "b"];
//arraySynonyms = ["array","arr","ar","a","list","lst","l"]; //why
//objectSynonyms = ["object","obj","ob","o","json"]; //I have no plans to implement these.
trueSynonyms = ["true", "t", "1", "yes"];
falseSynonyms = ["false", "f", "0", "no"];
defaultStringTypeValues = ["element","color"];
defaultNumberTypeValues = ["x","y","temp","start"];
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

function funniPrompt() {
	var inputText = prompt("Enter command");
	// replace spaces with underscores
	inputAsArray = inputText.split(" ");
	var firstItem = inputAsArray[0];
	
	switch(firstItem) {
		case "set":
			//alert("To do");
			if(inputAsArray.length < 4) {
				alert("Usage: set [property] [element] [value] <type>\nDon't include framing characters []<>.\nThe element can be \"all\" to set the property for every pixel.\nNote: Strings can't have spaces because spaces are the separator used in the parsing split().\nArguments in [brackets] are required and ones in <angle brackets> are optional.");
				break;
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
				alert("Unrecognized type: \"" + type + "\"");
				break;
			};
			
			if(type === null) {
				if(defaultStringTypeValues.includes(property)) {
					type = "string";
				} else if(defaultNumberTypeValues.includes(property)) {
					type = "number";
				} else {
					alert("Type could not be assumed from property. Please specify the type as a fourth argument.");
					break;
				}
			}
			
			if(type === "number") {
				value = parseFloat(value);
				if(isNaN(value)) {
					alert("Value is not a number!");
					break;
				};
			} else if(type === "boolean") {
				if(trueSynonyms.includes(value.toLowerCase())) {
					value = true;
				} else if(falseSynonyms.includes(value.toLowerCase())) {
					value = false;
				} else {
					alert("Unrecognized boolean value: " + value);
					break;
				}
			}
			//The values start out as strings when split from the array, so string is kind of the default form.
			
			//Special validation
			
			if(property === "element") {
				var originalInput = value; //for error display
				value = mostSimilarElement(value);
				if(!elements[value]) {
					alert("Element " + originalInput + " does not exist!");
					break;
				}
			};
			if(property === "x") {
				if(!Number.isSafeInteger(value)) {
					alert("X cannot be a decimal! And what are you doing trying to set position values anyway?");
					break;
				}
			};
			if(property === "color") {
				if(!value.startsWith("rgb(")) { //if not RGB
					if(value.startsWith("hsl(")) { //if HSL
						if(!(value.split(",")[1].endsWith('%')) && !(value.split(",")[2].endsWith('%)'))) { //if missing percent symbols
							alert("Color must be in the form \"rgb(red,green,blue)\" or \"hsl(hue,saturation%,lightness%)\"!");
							break;
						};
					} else { //if not RGB and not HSL
						alert("Color must be in the form \"rgb(red,green,blue)\" or \"hsl(hue,saturation%,lightness%)\"!");
						break;
					};
				}
				if(value.split(",").length !== 3) { //if too short or long
					alert("Color must be in the form \"rgb(red,green,blue)\" or \"hsl(hue,saturation%,lightness%)\"!");
					break;
				}
				if(value.startsWith("rgb(")) { //if RGB
					var checkedColorObject = rgbStringToUnvalidatedObject(value); //RGB NaN checking
					if(isNaN(checkedColorObject.r) || isNaN(checkedColorObject.g) || isNaN(checkedColorObject.b)) {
						//console.log(checkedColorObject);
						alert("One or more color values are invalid!");
						break;
					};
				} else if(value.startsWith("hsl(")) { //if HSL
					var checkedColorObject = hslStringToUnvalidatedObject(value); //HSL NaN checking
					if(isNaN(checkedColorObject.h) || isNaN(checkedColorObject.s) || isNaN(checkedColorObject.l)) {
						//console.log(checkedColorObject);
						alert("One or more color values are invalid!");
						break;
					};
				} else { //if neither
					alert("Color must be in the form \"rgb(red,green,blue)\" or \"hsl(hue,saturation%,lightness%)\"!");
					break;
				};
			};
			
			//Actual setting code;
			for (var i = 1; i < width; i++) {
				for (var j = 1; j < height; j++) {
					if (!isEmpty(i,j)) {
						//console.log("Pixel (" + i + "," + j + ") exists")
						if(pixelMap[i][j].element === inputElement || inputElement === "all") {
							//console.log("Element is a match: " + inputElement + ", " + pixelMap[i][j].element)
							pixelMap[i][j][property] = value;
						};
					};
				};
			};
			break;
		case "test":
			alert("pong");
			console.log("qwertyuiopasdfghjklzxcvbnm");
			break;
		case "fill":
			if(inputAsArray.length < 3) {
				alert("Usage: fill [overwrite (should be a bool)] [element] <additional elements>.\nDon't include framing characters []<>.\nArguments in [brackets] are required and ones in <angle brackets> are optional.");
				break;
			};
			
			var doOverwrite = inputAsArray[1];
			
			var elementList = inputAsArray.slice(2);
			//console.log(elementList);
			
			for(i = 0; i < elementList.length; i++) {
				var elementInConsideration = elementList[i]
				var originalElement = elementInConsideration; //also for error display
				elementInConsideration = mostSimilarElement(elementInConsideration);
				if(!elements[elementInConsideration]) {
					alert("Element " + originalElement + " does not exist!");
					break;
				}
				elementList[i] = elementInConsideration;
			};
			//console.log(elementList);
			
			if(trueSynonyms.includes(doOverwrite.toLowerCase())) {
				doOverwrite = true;
			} else if(falseSynonyms.includes(doOverwrite.toLowerCase())) {
				doOverwrite = false;
			} else {
				alert("Unrecognized boolean value: " + doOverwrite + "\n Note that for this command, the boolean value goes first.");
				break;
			}
			//console.log(doOverwrite);
			//console.log(elementList);
			
			//Fill code
			for (var i = 1; i < width; i++) {
				for (var j = 1; j < height; j++) {
					var randomElement = elementList[Math.floor(Math.random() * elementList.length)];
					if(doOverwrite) {
						if(!isEmpty(i,j,true)) { deletePixel(i,j) };
					};
					if (isEmpty(i,j,false)) {
						createPixel(randomElement,i,j);
					};
				};
			};
			break;
		case "randomfill":
			if(inputAsArray.length < 1) { //somehow?
				alert("Usage: randomfill <overwrite (should be a bool) (default: true)>\nDon't include framing characters []<>.\nArguments in <angle brackets> are optional.");
				break;
			};
			
			var doOverwrite = null;
			
			if(inputAsArray.length > 1) {
				var doOverwrite = inputAsArray[1];
				if(trueSynonyms.includes(doOverwrite.toLowerCase())) {
					doOverwrite = true;
				} else if(falseSynonyms.includes(doOverwrite.toLowerCase())) {
					doOverwrite = false;
				} else {
					alert("Unrecognized boolean value: " + value);
					break;
				};
			} else {
				doOverwrite = true;
			};
			
			var elementList = randomChoices;
			
			//Fill code
			for (var i = 1; i < width; i++) {
				for (var j = 1; j < height; j++) {
					var randomElement = elementList[Math.floor(Math.random() * elementList.length)];
					if(doOverwrite) {
						if(!isEmpty(i,j,true)) { deletePixel(i,j) };
					};
					if (isEmpty(i,j,false)) {
						createPixel(randomElement,i,j);
					};
				};
			};
			break;
		case "count":
			//alert("To do");
			if(inputAsArray.length < 2) {
				alert("Usage: count [element]\nDon't include framing characters []<>.\nNote: The element name can't have a space in it because spaces are the separator used in the parsing split().\nArguments in [brackets] are required.");
				break;
			};
			var inputElement = inputAsArray[1];
			//console.log("Element gotten: " + inputElement);

			var originalInput = inputElement; //for error display
			inputElement = mostSimilarElement(inputElement);
			//console.log("Element gotten: " + inputElement);
			if(typeof(elements[inputElement]) === "undefined") {
				alert("Element " + originalInput + " does not exist!");
				break;
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
			alert(`There are ${count} pixels of ${inputElement}`);
			break;
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
			
			alert("Elements counts logged to console");
			console.log(formattedList);
			break;
		case "help":
			if(inputAsArray.length < 1) { //somehow
				alert("Usage: help <command>\nDon't include framing characters []<>.\nArguments in <angle brackets> are optional.");
				break;
			};
			if(inputAsArray.length < 2) {
				alert("Commands: \nset\ntest\nfill\nrandomfill\ncount\ncountall\nhelp")
			} else {
				var command = inputAsArray[1];

				if(typeof(commandHelpObject[command]) === "undefined") {
					alert("Cound not find help for " + command + ".");
				} else {
					alert(commandHelpObject[command]);
				};
			};
			break;
		default:
			alert(`Command ${firstItem} not found!`);
	};
};

