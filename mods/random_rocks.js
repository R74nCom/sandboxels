var modName = "mods/random_rocks.js";
var libraryMod = "mods/code_library.js";

dependOn("code_library.js", function(){
	if(urlParams.get('rockAmount') != null) { //null check
		rockAmount = urlParams.get('rockAmount')
		if(isNaN(rockAmount) || rockAmount === "" || rockAmount === null) { //NaN check
			 rockAmount = 10
		}
		rockAmount = parseInt(rockAmount)
		if(rockAmount > 10000) {
			alert("Maximum amount of rocks is 10000.\nOnly 10000 rocks were added.")
		} else if(rockAmount < 1) {
			alert("Minimum amount of rocks is 1.\n1 rock was added.")
		}
		rockAmount = Math.min(10000,Math.max(rockAmount,1))
	} else {
		rockAmount = 10
	}

	if(urlParams.get('makeRockString') !== null) { //if the variable exists at all
		makeRockString = true
	} else { //if it doesn't (and it returns null)
		makeRockString = false
	}

	//arbitrarily picked
		const initialArrayR = ["m","n","p","t","ch","k","b","d","j","g","f","th","s","sh","h","l","r","y","w","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","sl","fl","fr","pl","pr","tl","tr","kl","kr","shr","fl","fr","thr"] //:eggTF:
		const vowelArrayR = ["a","e","i","o","u","ay","ee","ie","oa","ew","oo","oi","ow"] //:eggTF:
		const medialArrayR = ["m","n","p","t","k","b","d","g","f","th","s","sh","h","l","r","y","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","sl","fl","fr","pl","pr","tl","tr","kl","kr","shr","fl","fr","thr"] //:eggTF:
		const finalArrayR = ["m","n","p","t","k","b","d","g","f","th","s","sh","l","r","y","z","sp","st","sk","sl","spl","stl","skl","sr","spr","str","skr","pl","pr","tl","tr","bl","vr"] //:eggTF:

	function generateName() {
		//these are picked arbitrarily
		
		//console.log("getting random type")
		var randomInt1 = randomIntegerFromZeroToValue(6)

		//console.log("generating type " + randomInt1)
		if(randomInt1 == 0) {
			var randomName = randomChoice(initialArrayR) + randomChoice(vowelArrayR) + randomChoice(finalArrayR)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 1) {
			var randomName = randomChoice(initialArrayR) + randomChoice(vowelArrayR) + randomChoice(medialArrayR) + randomChoice(vowelArrayR) + randomChoice(finalArrayR)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 2) {
			var randomName = randomChoice(initialArrayR) + randomChoice(vowelArrayR) + randomChoice(finalArrayR) + "e"
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 3) {
			var randomName = randomChoice(initialArrayR) + randomChoice(vowelArrayR) + randomChoice(medialArrayR) + randomChoice(vowelArrayR) + randomChoice(medialArrayR) +     randomChoice(finalArrayR)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 4) {
			var randomName = randomChoice(vowelArrayR) + randomChoice(initialArrayR) + randomChoice(vowelArrayR) + randomChoice(finalArrayR)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 5) {
			var randomName = randomChoice(initialArrayR) + randomChoice(vowelArrayR) + randomChoice(medialArrayR) + randomChoice(vowelArrayR) + randomChoice(medialArrayR) + randomChoice(vowelArrayR)
			//console.log("generated T" + randomInt1 + " name")
		} else if(randomInt1 == 6) {
			var randomName = randomChoice(initialArrayR) + randomChoice(vowelArrayR) + randomChoice(medialArrayR) + randomChoice(vowelArrayR)
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

	function generateColors() {
		var randomR = randomIntegerFromZeroToValue(255)
		var randomG = randomIntegerFromZeroToValue(255)
		var randomB = randomIntegerFromZeroToValue(255)
		var randomColor = {r: randomR, g: randomG, b: randomB}
		var newRockColor1 = averageColorObjects(rockColor1,randomColor,weight1=0.65)
		var newRockColor2 = averageColorObjects(rockColor2,randomColor,weight1=0.65)
		var newRockColor3 = averageColorObjects(rockColor3,randomColor,weight1=0.65)
		var newGravelColor1 = averageColorObjects(gravelColor1,randomColor,weight1=0.675)
		var newGravelColor2 = averageColorObjects(gravelColor2,randomColor,weight1=0.675)
		var newGravelColor3 = averageColorObjects(gravelColor3,randomColor,weight1=0.675)
		var newGravelColor4 = averageColorObjects(gravelColor4,randomColor,weight1=0.675)
		var newRockColor1 = rgbToHex(newRockColor1)
		var newRockColor2 = rgbToHex(newRockColor2)
		var newRockColor3 = rgbToHex(newRockColor3)
		var newGravelColor1 = rgbToHex(newGravelColor1)
		var newGravelColor2 = rgbToHex(newGravelColor2)
		var newGravelColor3 = rgbToHex(newGravelColor3)
		var newGravelColor4 = rgbToHex(newGravelColor4)
		return [newRockColor1, newRockColor2, newRockColor3, newGravelColor1, newGravelColor2, newGravelColor3, newGravelColor4]
	}

	function _generateAveragedRandoms() {
		return averageNumericArray([Math.random(),Math.random(),Math.random()])
	}

	function avgRndToMult() {
		return 1 + (0.55 - _generateAveragedRandoms())
	}

	elements.gravel.breakInto = "dust"

	if(makeRockString == true) {
		rockString = ""
	}

	for(i = 0; i < rockAmount; i++) {
		var name = generateName()
		var meltingAdjustment = avgRndToMult()
		var densityAdjustment = avgRndToMult()
		var hardnessAdjustment = avgRndToMult()
		var colors = generateColors()
		if(typeof(elements[name]) != "undefined") {
			name = name + randomChoice(vowelArrayR) + randomChoice(finalArrayR)
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
		
		if(makeRockString == true) {
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

		if(makeRockString == true) {
			rockString = rockString + `elements.${name}_gravel = {\n    name: \"${name} gravel\",\n    color: [\"${colors[3]}\", \"${colors[4]}\", \"${colors[5]}\", \"${colors[6]}\"],\n    behavior: behaviors.POWDER,\n    tempHigh: ${950 * meltingAdjustment},\n    stateHigh: \"${name}\",\n    category: \"random rocks\",\n    state: \"solid\",\n    density: ${1680 * densityAdjustment},\n    hardness: ${0.2 * (hardnessAdjustment ** (2/3))},\n    breakInto: \"dust\",\n};\n\n`
		}

	}

	if(makeRockString == true) {
		console.log(`Rocks added to rockString (length ${rockString.length})`)
	}
}, true);