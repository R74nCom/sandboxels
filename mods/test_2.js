alert("this requires code library and i am out of time to add a dependency if-block");

function defaultIonizationColorFormula(state) {
	return convertColorFormats({r: 255, g: 221 - ((state + 1) * 32), b: 255 - ((state + 1) * 8)},"hex");
};

function secondTestDefaultIonizationColorFormula(state) {
	return convertColorFormats({r: 221 - ((state + 1) * 32), g: 255, b: 255 - ((state + 1) * 8)},"hex");
};

function thirdTestDefaultIonizationColorFormula(state) {
	var lum = 17 + (state * 10);
	return convertColorFormats({r: lum, g: lum, b: lum},"hex");
};

scientificElements = {
	defaultium:		{	sublimates: false,		solidColor: "#EEEEEE",		solidDensity: 1000,		meltingPoint: 1200,	solidHardness: 0.8,
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

tupleAdverbs = ['Singly', 'Doubly', 'Triply', 'Quadruply', 'Quintuply', 'Sextuply', 'Septuply', 'Octuply', 'Nonuply', 'Decuply', 'Undecuply', 'Duodecuply', 'Tredecuply', 'Quattuordecuply', 'Quindecuply', 'Sexdecuply', 'Septendecuply', 'Octodecuply', 'Novemdecuply', 'Vigintuply', 'Unvigintuply', 'Duovigintuply', 'Trevigintuply', 'Quattuorvigintuply', 'Quinvigintuply', 'Sexvigintuply', 'Septenvigintuply', 'Octovigintuply', 'Novemvigintuply', 'Trigintuply'].map(x => x.toLowerCase());

for(element in scientificElements) {
	var elemInfo = scientificElements[element];

	if(!elemInfo.liquidColor) {
		elemInfo.liquidColor = makeMoltenColor(elemInfo.solidColor);
	};

	if(!elemInfo.gasColor) {
		elemInfo.gasColor = makeGasColor(elemInfo.solidColor);
	};

	var names = {
		solid: elemInfo.meltingPoint <= 0 ? element + "_ice" : "solid_" + element,
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
		elements[names.solid].temp = Math.min(20, elemInfo.meltingPoint * 1.1);
		elements[names.solid].tempHigh = elemInfo.meltingPoint;
		elements[names.solid].stateHigh = elemInfo.sublimates ? names.gas : names.liquid;
		elements[names.solid].behavior = behaviors.POWDER;
		elements[names.solid].category = "powders";
		elements[names.solid].state = "solid";
		elements[names.solid].hidden = true;

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
			var plasmaName = (tupleAdverbs[j] + "_ionized_" + element).replace("singly_","");
			var lastPlasmaName = (tupleAdverbs[j - 1] + "_ionized_" + element).replace("singly_","");
			var nextPlasmaName = (tupleAdverbs[j + 1] + "_ionized_" + element).replace("singly_","");
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
				//console.log(j,tupleAdverbs[j],nextPlasmaName);
				elements[plasmaName].stateHigh = nextPlasmaName;
			};
		};
	};
	
	elements[names[elemInfo.defaultState]].hidden = false;
};