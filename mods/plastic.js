
// created by Rain :o 20/8 2024

elements.water_bottle = {
	color: "#a8d2e3",
	behavior: behaviors.STURDYPOWDER,
	category: "powders",
	state: "solid",
	density: 800,
	breakInto: ["water_everywhere", "water_everywhere", "water_everywhere", "water_everywhere", "microplastic"],
	tempHigh: 250,
	stateHigh: ["molten_plastic", "water_everywhere", "water_everywhere"],
};
elements.head.reactions.water_bottle = { elem2: ["plastic", "water", null, null, null], chance: 0.1 };
elements.body.reactions.water_bottle = { elem2: ["plastic", "water", null, null, null], chance: 0.1 };

elements.water_everywhere = {
	color: "#8882e3",
	behavior: [
		"CR:water_everywhere%20 AND CR:water|CR:water_everywhere%20 AND CR:water|CR:water_everywhere%20 AND CR:water",
		"CR:water_everywhere%20 AND CR:water|XX%20 AND CH:water|CR:water_everywhere%20 AND CR:water",
		"CR:water_everywhere%20 AND CR:water|CR:water_everywhere%20 AND CR:water|CR:water_everywhere%20 AND CR:water",
	],
	category: "liquids",
	state: "solid",
	density: 800,
	hidden: true,
};
elements.microplastic = {
	color: ["#adc7c9", "#cadadb", "#6cbda8", "#62d5d4", "#b3b47b"],
	behavior: [
		"XX|XX|XX",
		"XX|XX|XX",
		"M2%25|M1%50|M2%25",
	],
	category: "powders",
	state: "solid",
	density: 700,
	tempHigh: 250,
	stateHigh: "molten_plastic",
	reactions: {
		"fish": { elem1: null, elem2: "meat", chance: 0.01 },
		"glue": { elem1: "bead", elem2: null, chance: 0.03 },
	},
};
elements.plastic.breakInto = "microplastic";

elements.cellulose.reactions.vinegar = { elem1: "bioplastic", elem2: null, tempMin: 40, chance: 0.1};

elements.bioplastic = {
	color: "#eeeeaa",
	behavior: behaviors.WALL,
	category: "solids",
	tempHigh: 180,
	stateHigh: "molten_bioplastic",
	breakInto: "bioplastic_crumbs",
	alias: "Cellulose acetate",
	desc: "It's biodegradable :)",
};
elements.bioplastic_crumbs = {
	color: ["#dfd499", "#c0e8a0", "#dfab87"],
	hidden: true,
	behavior: behaviors.POWDER,
	category: "powders",
	tempHigh: 180,
	stateHigh: "molten_bioplastic",
	desc: "small pieces of cellulose acetate"
};

elements.worm.reactions.bioplastic = { elem2: ["carbon_dioxide", null, null], chance: 0.05, func: behaviors.FEEDPIXEL };
elements.worm.reactions.bioplastic_crumbs = { elem2: ["carbon_dioxide", null, null], chance: 0.05, func: behaviors.FEEDPIXEL };
elements.worm.behavior = [
		"SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand,bioplastic%3|XX|SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand,bioplastic,bioplastic_crumbs%3",
		"M2%10|XX|M2%10",
		"SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand,bioplastic%3|M1|SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand,bioplastic,bioplastic_crumbs%3",
];
elements.cell.reactions.bioplastic = { elem2: ["carbon_dioxide", null, null], chance: 0.02, func: behaviors.FEEDPIXEL };
elements.cell.reactions.bioplastic_crumbs = { elem2: ["carbon_dioxide", null, null], chance: 0.02, func: behaviors.FEEDPIXEL };

elements.molten_bioplastic = {
	color: "#ccccac",
	behavior: behaviors.LIQUID,
	viscosity: 300,
	category: "states",
	state: "liquid",
	tempLow: 150,
	stateLow: "bioplastic",
	temp: 160,
	density: 1300,
	hidden: true,
};


