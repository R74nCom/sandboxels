urlParams = new URLSearchParams(window.location.search);

if(urlParams.get('liquidAmount') != null) { //null check
    liquidAmount = urlParams.get('liquidAmount')
    if(isNaN(liquidAmount) || liquidAmount === "" || liquidAmount === null) { //NaN check
         liquidAmount = 10
    }
    liquidAmount = parseInt(liquidAmount)
    liquidAmount = Math.min(10000,Math.max(liquidAmount,1))
} else {
    liquidAmount = 10
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
    const initialArrayL = ["m","n","p","t","ch","k","b","d","j","g","f","th","s","sh","h","l","r","y","w","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","sl","fl","fr","pl","pr","tl","tr","kl","kr","shr","fl","fr","thr"] //:eggTF:
    const vowelArrayL = ["a","e","i","o","u","ay","ee","ie","oa","ew","oo","oi","ow"] //:eggTF:
    const medialArrayL = ["m","n","p","t","k","b","d","g","f","th","s","sh","h","l","r","y","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","sl","fl","fr","pl","pr","tl","tr","kl","kr","shr","fl","fr","thr"] //:eggTF:
    const finalArrayL = ["m","n","p","t","k","b","d","g","f","th","s","sh","l","r","y","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","pl","pr","tl","tr","bl","vr"] //:eggTF:

enabledMods.includes("mods/log_liquids.js") ? logLiquids = true : logLiquids = false
//This is intended for people who want to copy their liquids from the console to a file for some reason. Technically, the empty enabler script doesn't even have to exist, but I'll make it just so that index.html doesn't spit out an ERR_FILE_NOT_FOUND.

function generateName() {
    //these are picked arbitrarily
    
    //console.log("getting random type")
    var randomInt1 = _randomInt(6)

    //console.log("generating type " + randomInt1)
    if(randomInt1 == 0) {
        var randomName = _randomArrayChoice(initialArrayL) + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(finalArrayL)
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 1) {
        var randomName = _randomArrayChoice(initialArrayL) + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(medialArrayL) + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(finalArrayL)
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 2) {
        var randomName = _randomArrayChoice(initialArrayL) + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(finalArrayL) + "e"
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 3) {
        var randomName = _randomArrayChoice(initialArrayL) + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(medialArrayL) + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(medialArrayL) +     _randomArrayChoice(finalArrayL)
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 4) {
        var randomName = _randomArrayChoice(vowelArrayL) + _randomArrayChoice(initialArrayL) + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(finalArrayL)
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 5) {
        var randomName = _randomArrayChoice(initialArrayL) + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(medialArrayL) + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(medialArrayL) + _randomArrayChoice(vowelArrayL)
        //console.log("generated T" + randomInt1 + " name")
    } else if(randomInt1 == 6) {
        var randomName = _randomArrayChoice(initialArrayL) + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(medialArrayL) + _randomArrayChoice(vowelArrayL)
        //console.log("generated T" + randomInt1 + " name")
    } else {
        var randomName = randomArrayChoice(vowelArrayL) + randomArrayChoice(medialArrayL) + randomArrayChoice(vowelArrayL) + randomArrayChoice(finalArrayL)
        //console.log("warning: type was above 6 somehow")
    }
    //console.log(randomName)
    return randomName
}

const whiteColor = {r: 255, g: 255, b: 255}
const blackColor = {r: 0, g: 0, b: 0}

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
    var newLiquidColor = _multiplyColorObjects(whiteColor,randomColor,weight1=0.1)
    var newSolidColor = _multiplyColorObjects(whiteColor,randomColor,weight1=0.4)
    var newGasColor = _multiplyColorObjects(whiteColor,randomColor,weight1=0.7)
    var newLiquidColor = _rgbToHex(newLiquidColor)
    var newSolidColor = _rgbToHex(newSolidColor)
    var newGasColor = _rgbToHex(newGasColor)
    return [newLiquidColor, newSolidColor, newGasColor]
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


if(logLiquids == true) {
    liquidString = ""
}

for(i = 0; i < liquidAmount; i++) {
    var name = generateName();
    var meltingAdjustment = avgRndToMult();
    var densityAdjustment = avgRndToMult();
    var hardnessAdjustment = avgRndToMult();
    var conductivity = Math.random() ** 1.8;
    var conductivityEnabled = Math.random();
    var conducts = null;
    conductivityEnabled < 1/3 ? conducts = true : conducts = false;
    var burn = (Math.random() ** 2) * 100;
    var burnTime = 10 ** ((0.5 + Math.random()) ** 3);
    var burningEnabled = Math.random();
    var burns = null;
    burningEnabled < 1/3 ? burns = true : burns = false;
    var colors = generateColors();
    var viscosity = (1 + Math.random()) ** 10;
    var solidDensityMultiplier = 1+(Math.abs(1-avgRndToMult()));
    var solidDensityRelationRandomizer = Math.random();
    var solidIsLessDense = null;
    var solidDensity = null;
    solidDensityRelationRandomizer < 0.1 ? solidIsLessDense = true : solidIsLessDense = false;
    solidIsLessDense == true ? solidDensity = (1000 / solidDensityMultiplier) * densityAdjustment : solidDensity = (1000 * solidDensityMultiplier) * densityAdjustment;
    var freezingPoint = (273 * (meltingAdjustment ** 10)) - 273;
    var boilingPoint = freezingPoint + Math.abs((273 * (avgRndToMult() ** 9)) - 273);
    var gasDensity = 0.00143 * avgRndToMult() * 1000 * densityAdjustment;
    if(typeof(elements[name]) != "undefined") {
        name = name + _randomArrayChoice(vowelArrayL) + _randomArrayChoice(finalArrayL);
    };
    liquidConductivityAdjust = 0.5 * Math.sqrt(avgRndToMult());

    elements[name] = {
        name: name,
        color: colors[0],
        behavior: behaviors.LIQUID,
        tempLow: freezingPoint,
        temp: freezingPoint + 20,
        tempHigh: boilingPoint,
        stateLow: `${name}_ice`,
        stateHigh: `${name}_gas`,
        category: "random liquids",
        state: "liquid",
        density: 1000 * densityAdjustment,
        //conduct: goes here
        //burn and burnTime go here
        hardness: 0.3 * hardnessAdjustment,
        viscosity: viscosity,
        breakInto: `${name}_gas`,
    };

    elements[`${name}_ice`] = {
        name: `${name} ice`,
        color: colors[1],
        behavior: behaviors.WALL,
        tempHigh: freezingPoint,
        temp: freezingPoint - 20,
        stateHigh: name,
        category: "random solids",
        state: "solid",
        density: solidDensity,
        //conduct: goes here
        //burn and burnTime go here
        hardness: 0.6 * hardnessAdjustment,
        breakInto: name,
    };

    elements[`${name}_gas`] = {
        name: `${name} gas`,
        color: colors[2],
        behavior: behaviors.GAS,
        tempLow: boilingPoint,
        temp: boilingPoint + 20,
        stateLow: name,
        category: "random gases",
        state: "gas",
        density: gasDensity,
        //burn and burnTime go here
        hardness: 1,
    };

    if(burns == true) {
        elements[name].burn = burn
        elements[name].burnTime = burnTime
        elements[`${name}_ice`].burn = burn
        elements[`${name}_ice`].burnTime = burnTime
        elements[`${name}_gas`].burn = burn
        elements[`${name}_gas`].burnTime = burnTime
    }

    if(conducts == true) {
        elements[name].conduct = conductivity * liquidConductivityAdjust
        elements[`${name}_ice`].conduct = conductivity
    }

    if(logLiquids == true) {
        //Append moddable code for the liquid state to liquidString
        liquidString = liquidString + `elements.${name} = {\n    name: \"${name}\",\n    color: \"${colors[0]}\",\n    behavior: behaviors.LIQUID,\n    tempLow: ${freezingPoint},\n    temp: ${freezingPoint + 20},\n    tempHigh: ${boilingPoint},\n    stateLow: \"${name}_ice\",\n    stateHigh: \"${name}_gas\",\n    category: \"random liquids\",\n    state: \"liquid\",\n    density: ${1000 * densityAdjustment},\n    `
        if(conducts == true) { liquidString = liquidString + `conduct: ${conductivity * liquidConductivityAdjust},\n    ` }
        if(burns == true) { liquidString = liquidString + `burn: ${burn},\n    burnTime: ${burnTime},\n    ` }
        liquidString = liquidString + `hardness: ${0.3 * hardnessAdjustment},\n    viscosity: ${viscosity},\n    breakInto: \"${name}_gas\",\n};\n\n`

        //Append moddable code for the solid state to liquidString
        liquidString = liquidString + `elements.${name}_ice = {\n    name: \"${name} ice\",\n    color: \"${colors[1]}\",\n    behavior: behaviors.WALL,\n    tempHigh: ${freezingPoint},\n    temp: ${freezingPoint - 20},\n    stateHigh: \"${name}\",\n    category: \"random solids\",\n    state: \"solid\",\n    density: ${solidDensity},\n    `
        if(conducts == true) { liquidString = liquidString + `conduct: ${conductivity},\n    ` }
        if(burns == true) { liquidString = liquidString + `burn: ${burn},\n    burnTime: ${burnTime},\n    ` }
        liquidString = liquidString + `hardness: ${0.6 * hardnessAdjustment},\n    breakInto: \"${name}\",\n};\n\n`

        //Append moddable code for the gaseous state to liquidString
        liquidString = liquidString + `elements.${name}_gas = {\n    name: \"${name} gas\",\n    color: \"${colors[2]}\",\n    behavior: behaviors.GAS,\n    tempLow: ${boilingPoint},\n    temp: ${boilingPoint + 20},\n    stateLow: \"${name}\",\n    category: \"random gases\",\n    state: \"solid\",\n    density: ${gasDensity},\n    `
        if(burns == true) { liquidString = liquidString + `burn: ${burn},\n    burnTime: ${burnTime},\n    ` }
        liquidString = liquidString + `hardness: 1,\n};\n\n`
    }

}

if(logLiquids == true) {
    console.log(`Liquids added to liquidString (length ${liquidString.length})`)
}
