var modName = "mods/test_2.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
	/*function defaultIonizationColorFormula(state) {
		return convertColorFormats({r: 255, g: 221 - ((state + 1) * 32), b: 255 - ((state + 1) * 8)},"hex");
	};

	function secondTestDefaultIonizationColorFormula(state) {
		return convertColorFormats({r: 221 - ((state + 1) * 32), g: 255, b: 255 - ((state + 1) * 8)},"hex");
	};

	function thirdTestDefaultIonizationColorFormula(state) {
		var lum = 17 + (state * 10);
		return convertColorFormats({r: lum, g: lum, b: lum},"hex");
	};

	function fourthTestDefaultIonizationColorFormula(state) {
		return convertColorFormats({r: 0x9f + (state * 4), g: 0xff - state, b: 0x7f - (state * 3)},"hex");
	};*/
	
	function iHeliumColorFunction(state) {
		return convertColorFormats({r: 128 - (state * 64), g: 0, b: 255},"hex")
	};
	
	function iCarbonColorFunction(state) {
		return convertColorFormats({r: 128, g: 128 + (state * 25.6), b: 128},"hex")
	};

	function iNitrogenColorFunction(state) {
		var fraction = 256/6;
		return convertColorFormats({r: (state * fraction), g: (state * fraction), b: 256 - (state * fraction)},"hex")
	};

	function iOxygenColorFunction(state) {
		return convertColorFormats({r: 255, g: 25, b: state * 24},"hex")
	};
	
	if(elements.carbon.reactions) {
		var TheReVeFestival_Finale = structuredClone(elements.carbon.reactions)
	};
	
	delete elements.carbon;

	scientificElementoids = {
		/*defaultium:	{	sublimates: false,		solidColor: "#EEEEEE",		solidDensity: 1000,		meltingPoint: 1200,	solidHardness: 0.8,
							liquidColor: "#FFFFFF",	liquidDensity: 850,			liquidViscosity: 4000,	boilingPoint: 2500,
							gasColor: "#FFDDFF",	gasDensity: 3.5,
							ionizationEnergies_eV: [15,30,45,60,100],			ionizationColorFormula: defaultIonizationColorFormula,	
							defaultState: "solid"
						},

		sublimatestium:	{	sublimates: true,		solidColor: "#FFFFCC",		solidDensity: 813,		meltingPoint: 1033,	solidHardness: 0.5,
							liquidColor: "#EEEEAA",	liquidDensity: 420,			liquidViscosity: 420,	boilingPoint: 42069,
							gasColor: "#FFFF96",	gasDensity: 3.2,
							ionizationEnergies_eV: [12,41,99],					ionizationColorFormula: secondTestDefaultIonizationColorFormula,	
							defaultState: "solid"
						},

		pneumagvnigium:	{	sublimates: false,		solidColor: "#100810",		solidDensity: 814,		meltingPoint: -191,	solidHardness: 0.7,
							liquidColor: "#131011",	liquidDensity: 1013,		liquidViscosity: 131,	boilingPoint: -83,
							gasColor: "#202020",	gasDensity: 14.6,
							ionizationEnergies_eV: [11,22,33,44,55,66,77,88,99,110,121,1337],
							ionizationColorFormula: thirdTestDefaultIonizationColorFormula,	
							defaultState: "gas"
						},*/

		hydrogen:		{	sublimates: false,		solidColor: "#e6e6ff",		solidDensity: 86,		meltingPoint: -259.2,	solidHardness: 0.3,
							liquidColor: "#97afcf",	liquidDensity: 70.85,		liquidViscosity: 0.013,	boilingPoint: -253,
							gasColor: "#558bcf",	gasDensity: 0.084,
							ionizationEnergies_eV: [13.59844],					ionizationColorFormula: function() { return "#FF00FF" },	
							defaultState: "gas"
						},

						//non-superfluid viscosity: https://royalsocietypublishing.org/doi/pdf/10.1098/rspa.1950.0181
		helium:			{	sublimates: false,		solidColor: "#faebeb",		solidDensity: 214,			meltingPoint: -Infinity,	solidHardness: 0.3,
							liquidColor: "#e3d3d3",	liquidDensity: 124.8,		liquidViscosity: 0.0033,	boilingPoint: -268.9,
							gasColor: "#a69494",	gasDensity: 0.138 * airDensity, //i used a relative density because i can't make sense  of the units in given liquid vs gas densities
							ionizationEnergies_eV: [24.587387936,54.41776311],					ionizationColorFormula: iHeliumColorFunction,	
							defaultState: "gas"
						},
		
		//lithium
		
		//beryllium
		
		//boron
		
		carbon:			{	sublimates: true,		solidColor: "#171717",		solidDensity: 3500,			meltingPoint: 3642,			solidHardness: 0.7,
							liquidColor: ["#ffae9f", "#ffba80", "#ff9c8f"],		liquidDensity: 1200,		liquidViscosity: 69,		boilingPoint: 3642,
							gasColor: ["#ffce9f", "#ffda80", "#ffbc8f"],		gasDensity: 2, //made-up due to insufficient science
							ionizationEnergies_eV: [11.26030,24.38332,47.8878,64.4939,392.087,489.99334],	ionizationColorFormula: iCarbonColorFunction,	
							defaultState: "solid"
						},
		
		nitrogen:		{	sublimates: false,		solidColor: "#e6e6e6",		solidDensity: 1026.5,			meltingPoint: -210,		solidHardness: 0.3,
							liquidColor: "#d3e1e3",	liquidDensity: 806.4,		liquidViscosity: 0.00545,		boilingPoint: -198.5,
							gasColor: "#b8d1d4",	gasDensity: 1.1606,
							ionizationEnergies_eV: [14.53414,29.6013,47.44924,77.4735,97.8902,552.0718,667.046],	ionizationColorFormula: iNitrogenColorFunction,	
							defaultState: "gas"
						},

		oxygen:			{	sublimates: false,		solidColor: "#00cfc6",		solidDensity: 214,				meltingPoint: -218,		solidHardness: 0.3,
							liquidColor: "#00ad99",	liquidDensity: 1141,		liquidViscosity: 0.2849,		boilingPoint: -189,
							gasColor: "#99c7ff",	gasDensity: 1.4291,
							ionizationEnergies_eV: [13.61806,35.11730,54.9355,77.41353,113.8990,138.1197,739.29,871.4101],	ionizationColorFormula: iOxygenColorFunction,	
							defaultState: "gas"
						}
		

	};

	behaviors.HOT_GAS = [
		"CR:fire%0.25 AND M2|M1|CR:fire%0.25 AND M2",
		"M1|XX|M1",
		"CR:fire%0.25 AND M2|M1|CR:fire%0.25 AND M2"
	],

	behaviors.SUPERHOT_GAS = [
		"CR:plasma%0.1 AND M2|M1|CR:plasma%0.1 AND M2",
		"M1|XX|M1",
		"CR:plasma%0.1 AND M2|M1|CR:plasma%0.1 AND M2"
	],

	first9 = [ "singly", "doubly", "triply", "quadruply", "quintuply", "sextuply", "septuply", "octuply", "nonuply", "ERROR" ];

	ones = ["", "un", "duo", "tre", "quattuor", "quin", "sex", "septen", "octo", "novem", "ERROR"];

	tens = ["", "dec", "vigint", "trigint", "quadragint", "quinquagint", "sexagint", "septuagint", "octogint", "nonagint", "ERROR"];

	hundreds = ["", "cent", "ducent", "trecent", "quadringent", "quingent", "sescent", "septingent", "octingent", "nongent", "ERROR"];

	thousands = ["", "mill", "dumill", "trimill", "quadrimill", "quinmill", "sexmill", "septimill", "octimill", "nonimill", "ERROR"];

	function getTupleAdverb(number) { //this code is horrendous
		if(number == "0") { return "nullly" };
		number--;
		if(number <= 8) {
			return first9[number];
		} else {
			number++;

			var onesPlace = Math.floor(number % 10);
			var tensPlace = Math.floor((number / 10) % 10);
			var hundredsPlace = Math.floor((number / 100) % 10);
			var thousandsPlace = Math.floor((number / 1000) % 10);
			
			var tupleOnes = ones[onesPlace];
			var tupleTens = tens[tensPlace];
			var tupleHundreds = hundreds[hundredsPlace];
			var tupleThousands = thousands[thousandsPlace];
				
			if(tupleOnes.endsWith("tre")) {
				if(!tupleTens.startsWith("d") && !tupleTens.startsWith("s")) { //tre is not tres before d, and not as many people double the S
					tupleOnes = "tres";
					//this entire code block is basically so we can use trescentuple for 103-uple and trecentuple for 300-uple
				};
			};
			
			if(number > 100 && tupleTens !== "") { //tens before something have an number after them
				tupleTens += "number";
			};
			
			if(number > 1000 && tupleHundreds !== "") { //hundreds before something have an number after them
				tupleHundreds += "number";
			};
			
			tuple = tupleOnes + tupleTens + tupleHundreds + tupleThousands + "uply";
			
			return tuple;
		};
	};

	function makeScrapColor(colorIn) {
		var colorInput = colorIn; //side effects?
		
		//make sure in is array
		if(!(colorInput instanceof Array)) {
			colorInput = [colorInput];
		};

		colorInput = colorInput.map(color => convertColorFormats(color,"hex"));

		//prepare final color
		var finalColor = [];

		var lumOffsets = [1.2,1,0.8];
		for(var i in colorInput) {
			for(var j in lumOffsets) {
				finalColor.push(changeLuminance(colorInput[i],lumOffsets[j],"multiply","hex"));
			};
		};
		
		return finalColor;
	};

	for(element in scientificElementoids) {
		var elemInfo = scientificElementoids[element];

		if(!elemInfo.liquidColor) {
			elemInfo.liquidColor = makeMoltenColor(elemInfo.solidColor);
		};

		if(!elemInfo.gasColor) {
			elemInfo.gasColor = makeGasColor(elemInfo.solidColor);
		};

		var names = {
			solid: elemInfo.meltingPoint <= 0 ? element + "_ice" : "solid_" + element,
			powder: elemInfo.meltingPoint <= 0 ? element + "_snow" : "powdered_" + element,
			liquid: (elemInfo.meltingPoint > 200 ? "molten_" : "liquid_") + element,
			gas: element + "_gas"
		};
		names[elemInfo.defaultState] = element; //"hydrogen" is not "hydrogen_gas", iron is not "solid_iron", etc.
		
		if(elemInfo.defaultState == "liquid" && elemInfo.sublimates) {
			throw new Error("A sublimating element can't have a liquid default state, idiot!");
		};
		
		var ionizationTemperatures = elemInfo.ionizationEnergies_eV.map(x => (x * 16021766340) / 1380649);
		var liquidIsHot = (elemInfo.meltingPoint > 600);
		var gasIsHot = (elemInfo.boilingPoint > 600);
		var solidIsCold = (elemInfo.meltingPoint < 0);

		//"nullish"-piecewise definition to preserve reactions
		elements[names.solid] ??= {};
			elements[names.solid].color = elemInfo.solidColor;
			elements[names.solid].density = elemInfo.solidDensity;
			elements[names.solid].hardness = elemInfo.solidHardness;
			elements[names.solid].breakInto = names.powder;
			elements[names.solid].temp = Math.min(20, elemInfo.meltingPoint * 1.1);
			elements[names.solid].tempHigh = elemInfo.meltingPoint;
			elements[names.solid].stateHigh = elemInfo.sublimates ? names.gas : names.liquid;
			elements[names.solid].behavior = behaviors.WALL;
			elements[names.solid].category = "powders";
			elements[names.solid].state = "solid";
			elements[names.solid].hidden = true;

		elements[names.powder] ??= {};
			elements[names.powder].color = makeScrapColor(elemInfo.solidColor);
			elements[names.powder].density = elemInfo.solidDensity * 0.7;
			elements[names.powder].hardness = elemInfo.solidHardness * 0.7;
			elements[names.powder].temp = Math.min(20, elemInfo.meltingPoint * 1.1);
			elements[names.powder].tempHigh = elemInfo.meltingPoint;
			elements[names.powder].stateHigh = elemInfo.sublimates ? names.gas : names.liquid;
			elements[names.powder].behavior = behaviors.POWDER;
			elements[names.powder].category = "powders";
			elements[names.powder].state = "powder";
			elements[names.powder].hidden = true;

		if(elemInfo.sublimates != true) {
			elements[names.liquid] ??= {};
				elements[names.liquid].color = elemInfo.liquidColor;
				elements[names.liquid].density = elemInfo.liquidDensity;
				elements[names.liquid].temp = (elemInfo.meltingPoint + elemInfo.boilingPoint) / 2;
				elements[names.liquid].tempHigh = elemInfo.boilingPoint;
				elements[names.liquid].stateHigh = names.gas;
				elements[names.liquid].tempLow = elemInfo.meltingPoint;
				elements[names.liquid].stateLow = names.solid;
				elements[names.liquid].viscosity = elemInfo.liquidViscosity;
				elements[names.liquid].behavior = liquidIsHot ? behaviors.MOLTEN : behaviors.LIQUID;
				elements[names.liquid].category = "liquids";
				elements[names.liquid].state = "liquid";
				elements[names.liquid].hidden = true;
		};

		elements[names.gas] ??= {}
			elements[names.gas].color = elemInfo.gasColor;
			elements[names.gas].density = elemInfo.gasDensity;
			elements[names.gas].temp = (elemInfo.sublimates ? elemInfo.meltingPoint : elemInfo.boilingPoint) * 1.1;
			elements[names.gas].tempLow = (elemInfo.sublimates ? elemInfo.meltingPoint : elemInfo.boilingPoint);
			elements[names.gas].stateLow = elemInfo.sublimates ? names.solid : names.liquid;
			elements[names.gas].behavior = gasIsHot ? behaviors.HOT_GAS : behaviors.GAS;
			elements[names.gas].category = "gases";
			elements[names.gas].state = "gas";
			elements[names.gas].hidden = true;

		if(elemInfo.ionizationEnergies_eV && elemInfo.ionizationEnergies_eV.length > 0 && elemInfo.ionizationColorFormula) {
			elements[names.gas].tempHigh = ionizationTemperatures[0];
			elements[names.gas].stateHigh = "ionized_" + element;
			
			var lastTempsIndex = ionizationTemperatures.length - 1;

			for(j in ionizationTemperatures) {
				j = parseInt(j); // for some reason JS is suddenly deciding to use strings for array iterators
				var plasmaName = (getTupleAdverb(j + 1) + "_ionized_" + element).replace("singly_","");
				var lastPlasmaName = (getTupleAdverb(j) + "_ionized_" + element).replace("singly_","");
				var nextPlasmaName = (getTupleAdverb(j + 2) + "_ionized_" + element).replace("singly_","");
				var plasmaTemp = ionizationTemperatures[j];

				elements[plasmaName] = {
					color: elemInfo.ionizationColorFormula(j),
					density: elemInfo.gasDensity * (0.99 ** (j + 1)),
					temp: (Math.ceil(plasmaTemp/10000)*10000) + 1000,
					tempLow: ionizationTemperatures[j],
					stateLow: j == 0 ? names.gas : lastPlasmaName,
					behavior: behaviors.SUPERHOT_GAS,
					category: "energy",
					state: "gas",
					hidden: true,
				};
				
				if(j < lastTempsIndex) {
					elements[plasmaName].tempHigh = ionizationTemperatures[j + 1];
					//console.log(j,getTupleAdverb(j),nextPlasmaName);
					elements[plasmaName].stateHigh = nextPlasmaName;
				};
			};
		};
		
		elements[names[elemInfo.defaultState]].hidden = false;
		elements[names[elemInfo.defaultState]].temp = 20;
	};

	//Manual work for diatomic gases and other shit
		elements.carbon_dioxide.tempHigh = 6275.6434478747902; //50% point
		elements.carbon_dioxide.stateHigh = ["carbon","oxygen","carbon_dioxide","carbon_dioxide"];
		if(typeof(TheReVeFestival_Finale) !== "undefined") {
			elements.carbon.reactions = TheReVeFestival_Finale;
		};
		elements.carbon.behavior = behaviors.POWDER;

		elements.monatomic_nitrogen = {
			temp: 13000,
			tempLow: 12345, //Number pulled entirely out of my ass due to acute literature deficiency (does nobody care?)
			stateLow: "nitrogen",
			behavior: behaviors.GAS,
			tempHigh: elements.nitrogen.tempHigh,
			stateHigh: "ionized_nitrogen",
			color: "#add2ff",
			category: "gases",
			state: "gas",
			density: 1
		};
		elements.nitrogen.tempHigh = 12345;
		elements.nitrogen.stateHigh = "monatomic_nitrogen";
		elements.ionized_nitrogen.tempLow = elements.monatomic_nitrogen.tempHigh;
		elements.ionized_nitrogen.stateLow = "monatomic_nitrogen";

		elements.monatomic_oxygen = {
			temp: 18000,
			tempLow: 16851,
			stateLow: "oxygen",
			behavior: behaviors.GAS,
			tempHigh: elements.oxygen.tempHigh,
			stateHigh: "ionized_oxygen",
			color: "#d2adff",
			category: "gases",
			state: "gas",
			density: 1
		};
		elements.oxygen.tempHigh = 16851;
		elements.oxygen.stateHigh = "monatomic_oxygen";
		elements.ionized_oxygen.tempLow = elements.monatomic_oxygen.tempHigh;
		elements.ionized_oxygen.stateLow = "monatomic_oxygen";
		
		var newSteamTick = function(pixel) {
			pixel.split ??= 0;
			if(pixel.split == 0 && pixel.temp >= 2200) {
				if(Math.random() < 0.03) {
					changePixel(pixel,Math.random() < 1/3 ? "oxygen" : "hydrogen",false)
				};
				pixel.split = 1
			} else if(pixel.split == 1 && pixel.temp >= 2600) { //made-up data point for smoothness
				if(Math.random() < 0.097) {
					changePixel(pixel,Math.random() < 1/3 ? "oxygen" : "hydrogen",false)
				};
				pixel.split = 2
			} else if(pixel.split == 2 && pixel.temp >= 3000) {
				if(Math.random() < 0.45) {
					changePixel(pixel,Math.random() < 1/3 ? "oxygen" : "hydrogen",false)
				};
				pixel.split = 3
			};
			if(pixel.split > 1 && Math.random() < 0.03) { pixel.split = 0 }
		};
		
		var tempkeys = {steam: 0, cloud: 0};
		for(var name in tempkeys) {
			if(typeof(elements[name].tick) == "function") {
				var tick1 = elements[name].tick;
				var tick2 = newSteamTick;
				elements[name].tick = function(pixel) {
					tick1(pixel);
					if(pixel && !(pixel.del)) {
						tick2(pixel)
					}
				}
			} else {
				elements[name].tick = newSteamTick;
			};
		};
		elements.hydrogen.reactions.oxygen.tempMax = 3000;

	} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
};
