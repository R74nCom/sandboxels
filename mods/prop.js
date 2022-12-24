var modName = "mods/prop.js";
var variablesMod = "mods/prop and prompt variables.js";

if(enabledMods.includes(variablesMod)) {
	propProperty = "element";
	propValue = "sand";
	propType = "string";
	numberAdjusterProperty = "temp";
	numberAdjusterValue = 1;
	numberAdjusterMode = "add";
	numberAdjusterVerb = "adding";
	numberAdjusterPreposition = "to";
	numberAdjusterReverseOrder = false;

	function rgbStringToUnvalidatedObject(string) {
		string = string.split(",");
		var red = parseFloat(string[0].substring(4));
		var green = parseFloat(string[1]);
		var blue = parseFloat(string[2].slice(0,-1));
		return {r: red, g: green, b: blue};
	};
	function hslStringToUnvalidatedObject(string) {
		string = string.split(",");
		var hue = parseFloat(string[0].substring(4));
		var saturation = parseFloat(string[1].slice(0,-1));
		var lightness = parseFloat(string[2].slice(0,-2));
		return {h: hue, s: saturation, l: lightness};
	};


	document.addEventListener("keydown", function(e) { //prop prompt listener
		// , = propPrompt()
		if (e.keyCode == 188) {
			e.preventDefault();
			shiftDown ? numberAdjusterPrompt() : propPrompt();
		};
	});

	function propPrompt() {
		propProperty = prompt("Enter the property you want to set");
		
		propValue = prompt("Enter the value you want to set to");

		//special check: element
		if(propProperty === "element") {
			//empty string
			if(propValue === "") {
				alert("No element was specified!");
				return false;
			};
			// replace spaces with underscores
			propValue = propValue.replace(/ /g, "_");
			var propValueS = mostSimilarElement(propValue);
			if (propValueS === null || propValueS === undefined) {
				alert("Element \"" + value + "\" not found! Defaulting to sand.");
				propValue = "sand";
			} else {
				propValue = propValueS;
			};
		};

		//special check: color
		if(propProperty === "color") {
			//empty string
			if(propValue === "") {
				alert("No color was specified!");
				return false;
			};
			var splitValue = propValue.split(",");
			if(!propValue.startsWith("rgb(")) { //if not RGB
				if(propValue.startsWith("hsl(")) { //if HSL
					if(!(splitValue[1].endsWith('%')) || !(splitValue[2].endsWith('%)'))) { //if missing percent symbols
						alert(colorInvalidError);
						return false;
					};
				} else { //if not RGB and not HSL
					alert(colorInvalidError);
					return false;
				};
			};
			if(propValue.split(",").length !== 3) { //if too short or long
				alert(colorInvalidError);
				return false;
			}
			if(propValue.startsWith("rgb(")) { //if RGB
				var checkedColorObject = rgbStringToUnvalidatedObject(propValue); //RGB NaN checking
				if(isNaN(checkedColorObject.r) || isNaN(checkedColorObject.g) || isNaN(checkedColorObject.b)) {
					//console.log(checkedColorObject);
					alert("One or more color values are invalid!");
					return false;
				};
			} else if(propValue.startsWith("hsl(")) { //if HSL
				var checkedColorObject = hslStringToUnvalidatedObject(propValue); //HSL NaN checking
				if(isNaN(checkedColorObject.h) || isNaN(checkedColorObject.s) || isNaN(checkedColorObject.l)) {
					//console.log(checkedColorObject);
					alert("One or more color values are invalid!");
					return false;
				};
			} else { //if neither
				alert(colorInvalidError);
				return false;
			};
		};

		//special check: x
		if(propProperty === "x") {
			//empty string
			if(!propValue.isInteger) {
				alert("X values must be integers!");
			};
		};


		if(defaultNumberTypeValues.includes(propProperty.toLowerCase())) {
			propType = "number";
		} else if(defaultBooleanTypeValues.includes(propProperty.toLowerCase())) {
			propType = "boolean";
		} else if(defaultStringTypeValues.includes(propProperty.toLowerCase())) {
			propType = "string";
		} else if(defaultArrayTypeValues.includes(propProperty.toLowerCase())) {
			propType = "array";
		} else {
			propType = prompt("Enter the type of the value");
			if(stringSynonyms.includes(propType)) {
				propType = "string";
			} else if(numberSynonyms.includes(propType)) {
				propType = "number"; //Infinity (case-sensitively) is a *number*.
			} else if(booleanSynonyms.includes(propType)) {
				propType = "boolean";
			} else if(objectSynonyms.includes(propType)) {
				propType = "object"; //null (case-sensitively) is an *object*.
			} else if(arraySynonyms.includes(propType)) {
				propType = "array"; //offset coords use arrays a lot
			};
		};
		
		//Conversion
		if(propType === "number") {
			propValue = parseFloat(propValue);
			if(isNaN(propValue)) {
				alert("Value is not a number!");
				return false;
			};
		} else if(propType === "boolean") {
			if(synonymsOfTrue.includes(propValue.toLowerCase())) {
				propValue = true;
			} else if(synonymsOfFalse.includes(propValue.toLowerCase())) {
				propValue = false;
			} else {
				alert("Unrecognized boolean value: " + propValue + ".");
				return false;
			};
		} else if(propType === "object") {
			try {
				propValue = JSON.parse(propValue);
			} catch (error) {
				alert("JSON is invalid! Note that it requires quotes around keys as well as those curly {} parentheses.");
				return false;
			};
		} else if(propType === "array") {
			array = propValue.split(",");
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
			propValue = array;
		} else if(propType !== "string") {
			alert("Unrecognized or unsupported type!");
			return false;
		};
		updatePropDescription();
		currentElement = "prop";
	};

	elements.prop = {
		color: "#ff7f00",
		tool: function(pixel) {
			if(propProperty === "element") {
				pixel[propProperty] = propValue;
				pixel.temp = (elements[propValue].temp || pixel.temp);
			} else {
				pixel[propProperty] = propValue;
			};
			pixelTempCheck(pixel);
		},
		category: "tools",
		desc: `Sets properties of pixels.<br/>Currently setting ${propProperty} to ${propValue} (${propType}).<br/><span onclick=propPrompt() style=\"color: #ff00ff;\";>Press [,] or click here</span> to open the property tool prompt.`,
	};

	function updatePropDescription() {
		elements.prop.desc = `Sets properties of pixels.<br/>Currently setting ${propProperty} to ${propValue} (${propType}).<br/><span onclick=propPrompt() style=\"color: #ff00ff;\";>Press [,] or click here</span> to open the property tool prompt.`;
	};

	function numberAdjusterPrompt() {
		var oldProperty = numberAdjusterProperty;
		if(oldProperty === null) {
			oldProperty = "temp";
		};
		numberAdjusterProperty = prompt("Enter the property you want to change");
		if(numberAdjusterProperty === null) {
			numberAdjusterProperty = oldProperty;
			return false;
		};
		numberAdjusterValue = prompt("Enter the value you want to use");
		numberAdjusterMode = prompt("Enter the operation you want to use");

		//property check
		if(numberAdjusterProperty === "") {
			alert("No property was specified! Defaulting to temp.");
			numberAdjusterProperty = "temp";
		};

		//value check
		if(isNaN(parseFloat(numberAdjusterValue))) {
			if(numberAdjusterValue === "" || numberAdjusterValue === null) {
				//console.log("Null value path");
				alert("No value was specified! Defaulting to 1");
				numberAdjusterValue = 1;
				//console.log(numberAdjusterValue);
			} else {
				//console.log("NaN value path");
				alert("Invalid value! The value must be a number (defaulting to 1)");
				numberAdjusterValue = 1;
				//console.log(numberAdjusterValue);
			};
		};
		numberAdjusterValue = parseFloat(numberAdjusterValue);
		//console.log("Value: " + numberAdjusterValue);

		//mode check
		
		if(numberAdjusterMode === null) {
			alert("No operation was specified! Defaulting to add.");
			numberAdjusterMode = "add";
		};

		numberAdjusterMode = numberAdjusterMode.toLowerCase();

		var opNames = ["+", "add", "addition", "plus", "increase", "increment", "-", "subtract", "subtraction", "minus", "take away", "takeaway", "decrease", "decrement", "*", "x", "×", "multiply", "multiplication", "times", "by", "/", "÷", "divide", "division", "divided by", "%", "mod", "modulo", "modulus", "modulo by", "=", "set", "equals", "assign", "assignment", ">", ">=", "min", "minimum", "<", "<=", "max", "maximum", "^", "**", "exp", "exponent", "exponentiate", "raise", "raise to", "raised to"];

		switch(numberAdjusterMode) {
			case "+":
			case "add":
			case "addition":
			case "plus":
			case "increase":
			case "increment":
				numberAdjusterVerb = "adding";
				numberAdjusterPreposition = "to";
				numberAdjusterReverseOrder = false;
				break;
			case "-":
			case "subtract":
			case "subtraction":
			case "minus":
			case "take away":
			case "takeaway":
			case "decrease":
			case "decrement":
				numberAdjusterVerb = "subtracting";
				numberAdjusterPreposition = "from";
				numberAdjusterReverseOrder = false;
				break;
			case "*":
			case "x":
			case "×":
			case "multiply":
			case "multiplication":
			case "times":
			case "by":
				numberAdjusterVerb = "multiplying";
				numberAdjusterPreposition = "by";
				numberAdjusterReverseOrder = true;
				break;
			case "/":
			case "÷":
			case "divide":
			case "division":
			case "divided by":
				numberAdjusterVerb = "dividing";
				numberAdjusterPreposition = "by";
				numberAdjusterReverseOrder = true;
				break;
			case "%":
			case "mod":
			case "modulo":
			case "modulus":
			case "modulo by":
				numberAdjusterVerb = "reducing";
				numberAdjusterPreposition = "modulo";
				numberAdjusterReverseOrder = true;
				break;
			case "=":
			case "set":
			case "equals":
			case "assign":
			case "assignment":
				numberAdjusterVerb = "setting";
				numberAdjusterPreposition = "to";
				numberAdjusterReverseOrder = true;
				break;
			case ">": //lower-bounds the color
			case ">=":
			case "min":
			case "minimum":
				numberAdjusterVerb = "lower-bounding";
				numberAdjusterPreposition = "to";
				numberAdjusterReverseOrder = true;
				break;
			case "<":
			case "<=":
			case "max": //upper-bounds the color
			case "maximum":
				numberAdjusterVerb = "limiting";
				numberAdjusterPreposition = "to";
				numberAdjusterReverseOrder = true;
				break;
			case "^":
			case "**":
			case "exp":
			case "exponent":
			case "exponentiate":
			case "raise":
			case "raise to":
			case "raised to":
				numberAdjusterVerb = "raising";
				numberAdjusterPreposition = "to";
				numberAdjusterReverseOrder = true;
				break;
			default:
				alert(`Invalid operation (defaulting to "add")!`);
				numberAdjusterMode = "add";
				numberAdjusterVerb = "adding";
				numberAdjusterPreposition = "to";
				numberAdjusterReverseOrder = false;
				break;
		};
		updateNumberAdjusterDescription();
		currentElement = "number_adjuster";
	};

	elements.number_adjuster = {
		color: "#7fff00",
		tool: function(pixel) {
			if(typeof(pixel[numberAdjusterProperty]) === "undefined") {
				pixel[numberAdjusterProperty] = 0;
			};
			if(typeof(pixel[numberAdjusterProperty]) === "number") {
				switch(numberAdjusterMode.toLowerCase()) {
					case "+":
					case "add":
					case "addition":
					case "plus":
					case "increase":
					case "increment":
						pixel[numberAdjusterProperty] += numberAdjusterValue;
						break;
					case "-":
					case "subtract":
					case "subtraction":
					case "minus":
					case "take away":
					case "takeaway":
					case "decrease":
					case "decrement":
						pixel[numberAdjusterProperty] -= numberAdjusterValue;
						break;
					case "*":
					case "x":
					case "×":
					case "multiply":
					case "multiplication":
					case "times":
					case "by":
						pixel[numberAdjusterProperty] *= numberAdjusterValue;
						break;
					case "/":
					case "÷":
					case "divide":
					case "division":
					case "divided by":
						pixel[numberAdjusterProperty] /= numberAdjusterValue;
						break;
					case "%":
					case "mod":
					case "modulo":
					case "modulus":
					case "modulo by":
						pixel[numberAdjusterProperty] %= numberAdjusterValue;
						break;
					case "=":
					case "set":
					case "equals":
					case "assign":
					case "assignment":
						pixel[numberAdjusterProperty] = numberAdjusterValue;
						break;
					case ">": //lower-bounds the color
					case ">=":
					case "min":
					case "minimum":
						pixel[numberAdjusterProperty] = Math.max(numberAdjusterValue,pixel[numberAdjusterProperty]);
						break;
					case "<":
					case "<=":
					case "max": //upper-bounds the color
					case "maximum":
						pixel[numberAdjusterProperty] = Math.min(numberAdjusterValue,pixel[numberAdjusterProperty]);
						break;
					case "^":
					case "**":
					case "exp":
					case "exponent":
					case "exponentiate":
					case "raise":
					case "raise to":
					case "raised to":
						pixel[numberAdjusterProperty] = pixel[numberAdjusterProperty] ** numberAdjusterValue;
						break;
					default:
						pixel[numberAdjusterProperty] += numberAdjusterValue;
				};
				pixelTempCheck(pixel);
			};
		},
		category: "tools",
		desc: `Changes properties of pixels.<br/>Currently ${numberAdjusterVerb} ${numberAdjusterValue} ${numberAdjusterPreposition} ${numberAdjusterProperty}.<br/><span onclick=numberAdjusterPrompt() style=\"color: #ff00ff;\";>Press [Shift+,] or click here</span> to open the adjuster tool prompt.`,
	};

	function updateNumberAdjusterDescription() {
		elements.number_adjuster.desc = numberAdjusterReverseOrder ? `Changes numeric properties of pixels.<br/>Currently ${numberAdjusterVerb} ${numberAdjusterProperty} ${numberAdjusterPreposition} ${numberAdjusterValue}.<br/><span onclick=numberAdjusterPrompt() style=\"color: #ff00ff;\";>Press [Shift+,] or click here</span> to open the adjuster tool prompt.` : `Changes numeric properties of pixels.<br/>Currently ${numberAdjusterVerb} ${numberAdjusterValue} ${numberAdjusterPreposition} ${numberAdjusterProperty}.<br/><span onclick=numberAdjusterPrompt() style=\"color: #ff00ff;\";>Press [Shift+,] or click here</span> to open the adjuster tool prompt.`;
	};
} else {
	alert(`The ${variablesMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	enabledMods.splice(enabledMods.indexOf(modName),0,variablesMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
