function _randomInt(max) {
    if(max >= 0) {
        return Math.floor(Math.random() * (max + 1))
    } else {
        return 0 - Math.floor(Math.random() * (Math.abs(max) + 1))
    }
}

function _randomArrayChoice(array) {
    return array[_randomInt(array.length - 1)]
}

function generateName() {
    //these are picked arbitrarily
	
	//console.log("defining arrays")
    var initialArray = ["m","n","p","t","ch","k","b","d","j","g","f","th","s","sh","h","l","r","y","w"]
    var vowelArray = ["a","e","i","o","u","oo","ee","oa"]
    var medialArray = ["m","n","p","t","k","b","d","g","f","th","s","sh","h","l","r","y"]
    var finalArray = ["m","n","p","t","k","b","d","g","f","th","s","sh","l","r","y"]

	//console.log("getting random type")
    var randomInt1 = _randomInt(5)

	//console.log("generating type " + randomInt1)
    if(randomInt1 == 0) {
        var randomName = _randomArrayChoice(initialArray) + _randomArrayChoice(vowelArray) + _randomArrayChoice(finalArray)
		//console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 1) {
        var randomName = _randomArrayChoice(initialArray) + _randomArrayChoice(vowelArray) + _randomArrayChoice(medialArray) + _randomArrayChoice(vowelArray) + _randomArrayChoice(finalArray)
		//console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 2) {
        var randomName = _randomArrayChoice(initialArray) + _randomArrayChoice(vowelArray) + _randomArrayChoice(finalArray) + "e"
		//console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 3) {
        var randomName = _randomArrayChoice(initialArray) + _randomArrayChoice(vowelArray) + _randomArrayChoice(medialArray) + _randomArrayChoice(vowelArray) + _randomArrayChoice(medialArray) +     _randomArrayChoice(finalArray)
		//console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 4) {
        var randomName = _randomArrayChoice(vowelArray) + _randomArrayChoice(initialArray) + _randomArrayChoice(vowelArray) + _randomArrayChoice(finalArray)
		//console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 5) {
        var randomName = _randomArrayChoice(initialArray) + _randomArrayChoice(vowelArray) + _randomArrayChoice(medialArray) + _randomArrayChoice(vowelArray) + _randomArrayChoice(medialArray) + _randomArrayChoice(vowelArray)
		//console.log("generated T" + randomInt1 + " name")
    } else {
        var randomName = randomArrayChoice(vowelArray) + randomArrayChoice(initialArray) + randomArrayChoice(vowelArray) + randomArrayChoice(finalArray)
		//console.log("warning: type was above 5 somehow")
    }
	//console.log(randomName)
    return randomName
}

const rockColor1 = {r: 128, g: 128, b: 128}
const rockColor2 = {r: 79, g: 79, b: 79}
const rockColor3 = {r: 148, g: 148, b: 148}

function _rgbToHex(color) {
	if(typeof(color) == "object") { //Expects object like "{r: 172, g: 11, b: 34}"
		//console.log("Loading colors");
		//console.log("Loading R");
		var red = color.r;
		//console.log("Loading G");
		var green = color.g;
		//console.log("Loading B");
		var blue = color.b;
		//console.log("Rounding R");
		red = Math.round(red);
		//console.log("Rounding G");
		green = Math.round(green);
		//console.log("Rounding B");
		blue = Math.round(blue);
		//console.log("Bounding R");
		red = Math.min(255,Math.max(0,red));
		//console.log("Bounding G");
		green = Math.min(255,Math.max(0,green));
		//console.log("Bounding B");
		blue = Math.min(255,Math.max(0,blue));
		//console.log("Converting R");
		red = red.toString(16);
		//console.log("Converting G");
		green = green.toString(16);
		//console.log("Converting B");
		blue = blue.toString(16);
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
		//console.log("Concatenating");
		return "#" + red + green + blue;
	} else if(typeof(color) == "string") { //Expects string like "rgb(20,137,4)". Also doesn't round properly for some reason...
		//console.log("Splitting string")
		color = color.split(",");
		//console.log("Getting R");
		var red = parseInt(color[0].substring(4))
		//console.log("Getting G");
		var green = parseInt(color[1])
		//console.log("Getting B");
		var blue = parseInt(color[2].slice(0,-1)) 
		//console.log("Rounding R");
		red = Math.round(red);
		//console.log("Rounding G");
		green = Math.round(green);
		//console.log("Rounding B");
		blue = Math.round(blue);
		//console.log("Bounding R");
		red = Math.min(255,Math.max(0,red));
		//console.log("Bounding G");
		green = Math.min(255,Math.max(0,green));
		//console.log("Bounding B");
		blue = Math.min(255,Math.max(0,blue));
		//console.log("Converting R");
		red = red.toString(16);
		//console.log("Converting G");
		green = green.toString(16);
		//console.log("Converting B");
		blue = blue.toString(16);
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
		//console.log("Concatenating");
		return "#" + red + green + blue;
		} else {
		throw "error: Only objects and strings are supported."
	};
};

function _multiplyColorObjects(color1,color2,weight1=0.5) { //third argument is for color1 and expects a float from 0 to 0.5
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
}

function generateColors() {
	var randomR = _randomInt(255)
	var randomG = _randomInt(255)
	var randomB = _randomInt(255)
	var randomColor = {r: randomR, g: randomG, b: randomB}
	var newRockColor1 = _multiplyColorObjects(rockColor1,randomColor,weight1=0.65)
	var newRockColor2 = _multiplyColorObjects(rockColor2,randomColor,weight1=0.65)
	var newRockColor3 = _multiplyColorObjects(rockColor3,randomColor,weight1=0.65)
	var newRockColor1 = _rgbToHex(newRockColor1)
	var newRockColor2 = _rgbToHex(newRockColor2)
	var newRockColor3 = _rgbToHex(newRockColor3)
	return [newRockColor1, newRockColor2, newRockColor3]
}

function _add2(number1,number2) {
	return number1 + number2
}

function _arrayAverage(array) {
	var total = array.reduce(_add2,0)
	return total / array.length
}

function _generateAveragedRandoms() {
	return _arrayAverage([Math.random(),Math.random(),Math.random()])
}

function avgRndToMult() {
	return 1 + (0.55 - _generateAveragedRandoms())
}

for(i = 0; i < 10; i++) {
	var name = generateName()
	while(typeof(elements[name]) != "undefined") {
		name = generateName()
	}
	elements[name] = {
		color: generateColors(),
		behavior: behaviors.POWDER,
		tempHigh: 950 * avgRndToMult(),
		category: "random rocks",
		state: "solid",
		density: 2550 * avgRndToMult(),
		hardness: 0.5 * avgRndToMult(),
		breakInto: ["sand","gravel"], //might auto-generate soon, maybe not
	}
}