var modName = "mods/random_liquids.js";
var libraryMod = "mods/code_library.js";

dependOn("code_library.js", function(){
	if(urlParams.get('liquidAmount') != null) { //null check
		liquidAmount = urlParams.get('liquidAmount')
		if(isNaN(liquidAmount) || liquidAmount === "" || liquidAmount === null) { //NaN check
			 liquidAmount = 10
		}
		liquidAmount = parseInt(liquidAmount)
		if(liquidAmount > 10000) {
			alert("Maximum amount of liquids is 10000.\nOnly 10000 liquids were added.")
		} else if(liquidAmount < 1) {
			alert("Minimum amount of liquids is 1.\n1 liquid was added.")
		}
		liquidAmount = Math.min(10000,Math.max(liquidAmount,1))
	} else {
		liquidAmount = 10
	}

	if(urlParams.get('makeLiquidString') !== null) { //if the variable exists at all
		makeLiquidString = true
	} else { //if it doesn't (and it returns null)
		makeLiquidString = false
	}

	//arbitrarily picked
		const initialArrayL = ["m","n","p","t","ch","k","b","d","j","g","f","th","s","sh","h","l","r","y","w","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","sl","fl","fr","pl","pr","tl","tr","kl","kr","shr","fl","fr","thr"] //:eggTF:
		const vowelArrayL = ["a","e","i","o","u","ay","ee","ie","oa","ew","oo","oi","ow"] //:eggTF:
		const medialArrayL = ["m","n","p","t","k","b","d","g","f","th","s","sh","h","l","r","y","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","sl","fl","fr","pl","pr","tl","tr","kl","kr","shr","fl","fr","thr"] //:eggTF:
		const finalArrayL = ["m","n","p","t","k","b","d","g","f","th","s","sh","l","r","y","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","pl","pr","tl","tr","bl","vr"] //:eggTF:

	function generateName() {
		//these are picked arbitrarily
		
		//console.log("getting random type")
		var randomInt1 = randomIntegerFromZeroToValue(6)

		//console.log("generating type " + randomInt1)
		if(randomInt1 == 0) {
			var randomName = randomChoice(initialArrayL) + randomChoice(vowelArrayL) + randomChoice(finalArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 1) {
			var randomName = randomChoice(initialArrayL) + randomChoice(vowelArrayL) + randomChoice(medialArrayL) + randomChoice(vowelArrayL) + randomChoice(finalArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 2) {
			var randomName = randomChoice(initialArrayL) + randomChoice(vowelArrayL) + randomChoice(finalArrayL) + "e"
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 3) {
			var randomName = randomChoice(initialArrayL) + randomChoice(vowelArrayL) + randomChoice(medialArrayL) + randomChoice(vowelArrayL) + randomChoice(medialArrayL) +     randomChoice(finalArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 4) {
			var randomName = randomChoice(vowelArrayL) + randomChoice(initialArrayL) + randomChoice(vowelArrayL) + randomChoice(finalArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 5) {
			var randomName = randomChoice(initialArrayL) + randomChoice(vowelArrayL) + randomChoice(medialArrayL) + randomChoice(vowelArrayL) + randomChoice(medialArrayL) + randomChoice(vowelArrayL)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 6) {
			var randomName = randomChoice(initialArrayL) + randomChoice(vowelArrayL) + randomChoice(medialArrayL) + randomChoice(vowelArrayL)
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

	function generateColors() {
		var randomR = randomIntegerFromZeroToValue(255)
		var randomG = randomIntegerFromZeroToValue(255)
		var randomB = randomIntegerFromZeroToValue(255)
		var randomColor = {r: randomR, g: randomG, b: randomB}
		var newLiquidColor = averageColorObjects(whiteColor,randomColor,weight1=0.1)
		var newSolidColor = averageColorObjects(whiteColor,randomColor,weight1=0.4)
		var newGasColor = averageColorObjects(whiteColor,randomColor,weight1=0.7)
		var newLiquidColor = rgbToHex(newLiquidColor)
		var newSolidColor = rgbToHex(newSolidColor)
		var newGasColor = rgbToHex(newGasColor)
		return [newLiquidColor, newSolidColor, newGasColor]
	}

	function _generateAveragedRandoms() {
		return averageNumericArray([Math.random(),Math.random(),Math.random()])
	}

	function avgRndToMult() {
		return 1 + (0.55 - _generateAveragedRandoms())
	}


	if(makeLiquidString == true) {
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
			name = name + randomChoice(vowelArrayL) + randomChoice(finalArrayL);
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

		if(makeLiquidString == true) {
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

	if(makeLiquidString == true) {
		console.log(`Liquids added to liquidString (length ${liquidString.length})`)
	}
}, true);