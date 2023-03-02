var lategenOptions = [];

var mainMod = "mods/generative_mods.js";
var singularityMod = "mods/neutronium_compressor.js";
if(enabledMods.includes(mainMod)) {
	lategenOptions.push("creeper");
	lategenOptions.push("spout");
	lategenOptions.push("fairy");
	lategenOptions.push("cloud");
	lategenOptions.push("bomb");
};
if(enabledMods.includes(singularityMod)) {
	lategenOptions.push("singularity");
};
lgoDisplayString = lategenOptions.join(", ");
if(lgoDisplayString === "") {
	lgoDisplayString: "[None. This requires at least one element-generating mod!: generative_mods.js or neutronium_compressor.js]";
};

document.addEventListener("keydown", function(e) { //prop prompt listener
	// , = propPrompt()
	if (e.keyCode == 71) { //G
		if(shiftDown) { generatorPrompt() };
	};
});

function generatorPrompt() {
	var type = prompt(`Enter what kind of thing you want to generate
	Valid options: ${lgoDisplayString}`);
	var elements, typePlural;
	if(type === null) {
		return false;
	};
	if(!lategenOptions.includes(type)) {
		alert("Type is not valid!");
		return false;
	} else {
		if(type === "fairy") {
			typePlural = "fairies"
		} else {
			typePlural = type + "s";
		};
		elements = prompt(`Enter the element(s) you want to generate ${typePlural} for.
		Elements are separated by commas; to use a combination of elements, the elements are separated by plus signs (like "gold_coin+diamond").`);
		elements = parseForLateGenerationParameter(elements);
		try {
			var amount = 0;
			switch(type) {
				case "creeper":
					amount += generateCreeper(elements,true).length;
					break;
				case "spout":
					amount += generateSpout(elements,true).length;
					break;
				case "fairy":
					amount += generateFairy(elements,true).length;
					break;
				case "cloud":
					var number = prompt(`Enter a cloud number between 0 and 5 (default: 0)
					A higher number means a rainier cloud.`);
					if(number !== "*") { isNaN(parseFloat(number)) ? number = 0 : number = parseFloat(number) };
					amount += generateCloud(elements,number,true).length;
					break;
				case "singularity":
					amount += generateSingularity(elements,true).length;
					break;
				case "bomb":
					var number = prompt(`Enter a bomb number (default: 1)
					1 corresponds to radius 10, 2 corresponds to radius 15, etc.`);
					isNaN(parseFloat(number)) ? number = 0 : number = parseFloat(number);
					amount += generateBomb(elements,true,number).length;
					break;
				default:
					alert("An invalid type made it past the if statement. You shouldn't ever see this error.");
					throw new Error("An invalid type made it through the if statement.");
			};
			alert(`Generated ${amount} ${amount == 1 ? "element" : "elements"}`);
		} catch (error) {
			var errorString = error.toString();
			var errorText = "";
			if(errorString.includes("Cannot read properties of undefined")) {
				errorText += "\r\n(This is most likely from a nonexistent or misspelled element)";
			};
			alert("There was an error!\r\n" + error.toString() + errorText);
			throw error; //for console
		};
	};
};

elements.generator_prompt = {
	color: ["#000000","#666666","#886622","#558800"],
	behavior: behaviors.SELFDELETE,
	desc: "<span style='color:#FF00FF;' onClick=generatorPrompt()>Click here or press Shift+G to open the generator prompt.</span>",
	category:"special",
};

function parseForLateGenerationParameter(input) {
	if(input.startsWith("*")) {
		var elemList = Object.keys(elements);
		input = input.toLowerCase().substring(1);
		if(input === "all") {
			return elemList;
		} else {
			input = input.split(" "); //'*nocreeper nofairy' to ['nocreeper' 'nofairy']
			//include no auto elements
			if(input.includes("noauto")) {
				return Object.keys(elements).filter(function(name) { return elements[name].autoType === undefined });
			};


			var filteredList = elemList;

			//include only auto elements
			if(input.includes("auto")) {
				filteredList = filteredList.filter(function(name) { return elements[name].autoType !== undefined });
				//console.log("limit to autogens", filteredList.length);
			};
			//exclude fairies
			if(input.includes("nofairy") || input.includes("nofairies")) {
				filteredList = filteredList.filter(function(name) { return elements[name].autoType !== "fairy" });
				//console.log("remove fairies", filteredList.length);
			};
			//exclude spouts
			if(input.includes("nospout") || input.includes("nospouts")) {
				filteredList = filteredList.filter(function(name) { return elements[name].autoType !== "spout" });
				//console.log("remove spouts", filteredList.length);
			};
			//exclude creepers
			if(input.includes("nocreeper") || input.includes("nocreepers")) {
				filteredList = filteredList.filter(function(name) { return elements[name].autoType !== "creeper" });
				//console.log("remove creepers", filteredList.length);
			};
			//exclude clouds
			if(input.includes("nocloud") || input.includes("noclouds")) {
				filteredList = filteredList.filter(function(name) { return elements[name].autoType !== "cloud" });
				//console.log("remove clouds", filteredList.length);
			};
			//exclude bombs
			if(input.includes("nobomb") || input.includes("nobombs")) {
				filteredList = filteredList.filter(function(name) { return elements[name].autoType !== "bomb" });
				//console.log("remove bombs", filteredList.length);
			};
			
			//console.log(input);
			return filteredList;
		};
	};
	if(typeof(input) === "string") { //it should be an array, so string check
		input = input.replace(/ /g,"_");
		//console.log("String detected");
		if(input.includes(",")) { //comma-separated string?
			//console.log("Splitting string to array");
			input = input.split(","); //,SS to array
		} else {
			//console.log("Wrapping string in array");
			input = [input]; //single string to array 
		};
	};
	for(i = 0; i < input.length; i++) {
		input[i] = input[i].replace(/ /g,"_");
		if(input[i].includes("+")) {
			input[i] = input[i].split("+")
		};
	};
	return input;
};
