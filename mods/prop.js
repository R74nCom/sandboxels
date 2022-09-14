propProperty = "element";
propValue = "sand";
propType = "string";

stringSynonyms = [ "string", "str", "st", "s" ];
numberSynonyms = [ "number", "num", "nm", "nu", "nb", "integer", "int", "i", "it", "float",
				   "flt", "ft", "fl", "f", "wholenumber", "decimalnumber", "wn", "dn", "w",
				   "d", "deeznuts" ]; /*The purpose of these blatant lies is, through a 
				   reference to the Alice series of software, have an excuse to include deez
				   nuts.*/
objectSynonyms = [ "object", "oj", "obj", "ob", "o", "json" ];
booleanSynonyms = [ "boolean", "bool", "boole", "boo", "bo", "bl", "b" ];

defaultStringTypeValues = ["element","color","clone","changeTo","void"];
defaultNumberTypeValues = ["x","y","temp","start","vx","vy","chargeCD","start","burnStart","dir","panic","r"];
defaultBooleanTypeValues = ["burning","charge","dead"];

trueSynonyms = ["true", "t", "1", "yes"];
falseSynonyms = ["false", "f", "0", "no"];
colorInvalidError = "Color must be in the form \"rgb(red,green,blue)\" or \"hsl(hue,saturation%,lightness%)\" (without quotes)!";
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
		propPrompt();
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
	} else {
		propType = prompt("Enter the type of the value");
		if(stringSynonyms.includes(propType)) {
			propType = "string"
		};
		if(numberSynonyms.includes(propType)) {
			propType = "number" //Infinity (case-sensitively) is a *number*.
		};
		if(booleanSynonyms.includes(propType)) {
			propType = "boolean"
		};
		if(objectSynonyms.includes(propType)) {
			propType = "object" //null (case-sensitively) is an *object*.
		}
	};
	
	//Conversion
	if(propType === "number") {
		propValue = parseFloat(propValue);
		if(isNaN(propValue)) {
			alert("Value is not a number!");
			return false;
		};
	} else if(propType === "boolean") {
		if(trueSynonyms.includes(propValue.toLowerCase())) {
			propValue = true;
		} else if(falseSynonyms.includes(propValue.toLowerCase())) {
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
	} else if(propType !== "string") {
		alert("Unrecognized or unsupported type!");
		return false;
	};
	updatePropDescription();
};

elements.prop = {
    color: "#ff7f00",
    tool: function(pixel) {
        pixel[propProperty] = propValue;
		pixelTempCheck(pixel);
    },
    category: "tools",
	desc: `Changes pixels of a specified type to another specified type.<br/>Currently setting ${propProperty} to ${propValue} (${propType}).<br/><span onclick=updateReplaceDescriptions() style=\"color: #ff00ff;\";>Press [\"] or click here</span> to open the replace prompt.`,
};

function updatePropDescription() {
	elements.prop.desc = `Changes pixels of a specified type to another specified type.<br/>Currently setting ${propProperty} to ${propValue} (${propType}).<br/><span onclick=updateReplaceDescriptions() style=\"color: #ff00ff;\";>Press [\"] or click here</span> to open the replace prompt.`;
};
