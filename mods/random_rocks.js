urlParams = new URLSearchParams(window.location.search);

if(urlParams.get('rockAmount') != null) { //null check
    rockAmount = urlParams.get('rockAmount')
    if(isNaN(rockAmount) || rockAmount === "" || rockAmount === null) { //NaN check
         rockAmount = 10
    }
    rockAmount = parseInt(rockAmount)
    rockAmount = Math.min(10000,Math.max(rockAmount,1))
} else {
    rockAmount = 10
}

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

//arbitrarily picked
const initialArrayR = ["m","n","p","t","ch","k","b","d","j","g","f","th","s","sh","h","l","r","y","w","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","sl","fl","fr","pl","pr","tl","tr","kl","kr","shr","fl","fr","thr"] //:eggTF:
const vowelArrayR = ["a","e","i","o","u","ay","ee","ie","oa","ew","oo","oi","ow"] //:eggTF:
const medialArrayR = ["m","n","p","t","k","b","d","g","f","th","s","sh","h","l","r","y","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","sl","fl","fr","pl","pr","tl","tr","kl","kr","shr","fl","fr","thr"] //:eggTF:
const finalArrayR = ["m","n","p","t","k","b","d","g","f","th","s","sh","l","r","y","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","pl","pr","tl","tr","bl","vr"] //:eggTF:

enabledMods.includes("mods/log_rocks.js") ? logRocks = true : logRocks = false
//This is intended for people who want to copy their rocks from the console to a file for some reason. Technically, the empty enabler script doesn't even have to exist, but I'll make it just so that index.html doesn't spit out an ERR_FILE_NOT_FOUND.

function generateName() {
    //these are picked arbitrarily
    
    //console.log("getting random type")
    var randomInt1 = _randomInt(6)

    //console.log("generating type " + randomInt1)
    if(randomInt1 == 0) {
        var randomName = _randomArrayChoice(initialArrayR) + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(finalArrayR)
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 1) {
        var randomName = _randomArrayChoice(initialArrayR) + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(medialArrayR) + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(finalArrayR)
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 2) {
        var randomName = _randomArrayChoice(initialArrayR) + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(finalArrayR) + "e"
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 3) {
        var randomName = _randomArrayChoice(initialArrayR) + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(medialArrayR) + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(medialArrayR) +     _randomArrayChoice(finalArrayR)
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 4) {
        var randomName = _randomArrayChoice(vowelArrayR) + _randomArrayChoice(initialArrayR) + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(finalArrayR)
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 5) {
        var randomName = _randomArrayChoice(initialArrayR) + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(medialArrayR) + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(medialArrayR) + _randomArrayChoice(vowelArrayR)
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 6) {
        var randomName = _randomArrayChoice(initialArrayR) + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(medialArrayR) + _randomArrayChoice(vowelArrayR)
        //console.log("generated T" + randomInt1 + " name")
    } else {
        var randomName = randomArrayChoice(vowelArrayR) + randomArrayChoice(medialArrayR) + randomArrayChoice(vowelArrayR) + randomArrayChoice(finalArrayR)
        //console.log("warning: type was above 6 somehow")
    }
    //console.log(randomName)
    return randomName
}

const rockColor1 = {r: 128, g: 128, b: 128}
const rockColor2 = {r: 79, g: 79, b: 79}
const rockColor3 = {r: 148, g: 148, b: 148}
const gravelColor1 = {r: 227, g: 224, b: 223}
const gravelColor2 = {r: 177, g: 171, b: 163}
const gravelColor3 = {r: 116, g: 115, b: 109}
const gravelColor4 = {r: 82, g: 75, b: 71}

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
    } else if(typeof(color) == "string") { //Expects string like "rgb(20,137,4)".
        //console.log("Splitting string")
        color = color.split(",");
        //console.log("Getting R");
        var red = parseFloat(color[0].substring(4))
        //console.log("Getting G");
        var green = parseFloat(color[1])
        //console.log("Getting B");
        var blue = parseFloat(color[2].slice(0,-1)) 
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

function _multiplyColorObjects(color1,color2,weight1=0.5) { /*third argument is for color1 and expects a float from 0
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
}

function generateColors() {
    var randomR = _randomInt(255)
    var randomG = _randomInt(255)
    var randomB = _randomInt(255)
    var randomColor = {r: randomR, g: randomG, b: randomB}
    var newRockColor1 = _multiplyColorObjects(rockColor1,randomColor,weight1=0.65)
    var newRockColor2 = _multiplyColorObjects(rockColor2,randomColor,weight1=0.65)
    var newRockColor3 = _multiplyColorObjects(rockColor3,randomColor,weight1=0.65)
    var newGravelColor1 = _multiplyColorObjects(gravelColor1,randomColor,weight1=0.675)
    var newGravelColor2 = _multiplyColorObjects(gravelColor2,randomColor,weight1=0.675)
    var newGravelColor3 = _multiplyColorObjects(gravelColor3,randomColor,weight1=0.675)
    var newGravelColor4 = _multiplyColorObjects(gravelColor4,randomColor,weight1=0.675)
    var newRockColor1 = _rgbToHex(newRockColor1)
    var newRockColor2 = _rgbToHex(newRockColor2)
    var newRockColor3 = _rgbToHex(newRockColor3)
    var newGravelColor1 = _rgbToHex(newGravelColor1)
    var newGravelColor2 = _rgbToHex(newGravelColor2)
    var newGravelColor3 = _rgbToHex(newGravelColor3)
    var newGravelColor4 = _rgbToHex(newGravelColor4)
    return [newRockColor1, newRockColor2, newRockColor3, newGravelColor1, newGravelColor2, newGravelColor3, newGravelColor4]
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

elements.gravel.breakInto = "dust"

if(logRocks == true) {
    rockString = ""
}

for(i = 0; i < rockAmount; i++) {
    var name = generateName()
    var meltingAdjustment = avgRndToMult()
    var densityAdjustment = avgRndToMult()
    var hardnessAdjustment = avgRndToMult()
    var colors = generateColors()
    if(typeof(elements[name]) != "undefined") {
        name = name + _randomArrayChoice(vowelArrayR) + _randomArrayChoice(finalArrayR)
    }
    elements[name] = {
        name: name,
        color: [colors[0], colors[1], colors[2]],
        behavior: behaviors.POWDER,
        tempHigh: 950 * meltingAdjustment,
        category: "random rocks",
        state: "solid",
        density: 2550 * densityAdjustment,
        hardness: 0.5 * hardnessAdjustment,
        breakInto: ["dust",`${name}_gravel`],
    }
    
    if(logRocks == true) {
        rockString = rockString + `elements.${name} = {\n    name: \"${name}\",\n    color: [\"${colors[0]}\", \"${colors[1]}\", \"${colors[2]}\"],\n    behavior: behaviors.POWDER,\n    tempHigh: ${950 * meltingAdjustment},\n    category: \"random rocks\",\n    state: \"solid\",\n    density: ${2550 * densityAdjustment},\n    hardness: ${0.5 * hardnessAdjustment},\n    breakInto: [\"dust\",\"${name}_gravel\"],\n};\n\n`
    }

    elements[`${name}_gravel`] = {
        name: `${name} gravel`,
        color: [colors[3], colors[4], colors[5], colors[6]],
        behavior: behaviors.POWDER,
        tempHigh: 950 * meltingAdjustment,
        stateHigh: name,
        category: "random rocks",
        state: "solid",
        density: 1680 * densityAdjustment,
        hardness: 0.2 * (hardnessAdjustment ** (2/3)),
        breakInto: "dust",
    }

    if(logRocks == true) {
        rockString = rockString + `elements.${name}_gravel = {\n    name: \"${name} gravel\",\n    color: [\"${colors[3]}\", \"${colors[4]}\", \"${colors[5]}\", \"${colors[6]}\"],\n    behavior: behaviors.POWDER,\n    tempHigh: ${950 * meltingAdjustment},\n    stateHigh: \"${name}\",\n    category: \"random rocks\",\n    state: \"solid\",\n    density: ${1680 * densityAdjustment},\n    hardness: ${0.2 * (hardnessAdjustment ** (2/3))},\n    breakInto: \"dust\",\n};\n\n`
    }

}

if(logRocks == true) {
    console.log(`Rocks added to rockString (length ${rockString.length})`)
}
