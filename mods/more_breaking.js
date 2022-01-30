elements.loose_straw = {
	color: ["#F9E3A1","#93734E","#C7AA83"],
	behavior: behaviors.POWDER,
	tempHigh: 380,
	stateHigh: "fire",
	burn: 80,
	burnTime: 30,
	category: "powders",
	state: "solid",
	density: 47.5,
},

elements.plastic_scrap = {
	color: "#c3cccc",
	behavior: behaviors.POWDER,
	category: "powders",
	tempHigh: 200,
	stateHigh: "molten_plastic",
	burn: 15,
	burnTime: 350,
	burnInto: "dioxin",
	state: "solid",
	density: 952,
},

//insulation

elements.iron_scrap = {
	color: ["#dbdddd","#cdcdcd","#bbbdbd","#adadad","#cbcdcd","#bdbdbd"],
	behavior: behaviors.POWDER,
	reactions: {
		"water": { "elem1":"rust", chance:0.0035 },
		"salt_water": { "elem1":"rust", chance:0.006 },
		"dirty_water": { "elem1":"rust", chance:0.045 },
		"sugar_water": { "elem1":"rust", chance:0.0045 },
	},
	tempHigh: 1538,
	stateHigh: "molten_iron",
	category: "powders",
	density: 4860,
	state: "solid",
	conduct: 0.43,
},

elements.copper_scrap = {
	color: ["#B96242","#CE5332","#D77045","#994222","#AE3312","#B75025","#A95232","#BE4322","#C76035"],
	behavior: [
		"XX|XX|XX",
		"XX|CH:oxidized_copper%0.005|XX",
		"M2|M1|M2",
	],
	reactions: {
		"water": { "elem1":"oxidized_copper", chance:0.0035 },
		"salt_water": { "elem1":"oxidized_copper", chance:0.006 },
		"dirty_water": { "elem1":"oxidized_copper", chance:0.045 },
		"sugar_water": { "elem1":"oxidized_copper", chance:0.0045 },
	},
	category: "powders",
	tempHigh: 1085,
	stateHigh: "molten_copper",
	density: 5960,
	conduct: 0.90,
},
elements.oxidized_copper_scrap = {
	color: ["#507565","#52665A","#618374","#305545","#32463A","#416354","#406555","#42564A","#517364"],
	behavior: behaviors.POWDER,
	category: "powders",
	hidden: true,
	tempHigh: 1085,
	stateHigh: "molten_copper",
	density: 5960,
	conduct: 0.80,
},

elements.zinc_scrap = {
	color: ["#8C8A8B","#ADADAF","#FFFFFF","#7C7A7B","#9D9D9F","#F8F8F3","#6C6A6B","#8D8D8F","#E8E8E3"],
	behavior: behaviors.POWDER,
	category: "powders",
	tempHigh: 419.53,
	stateHigh: "molten_zinc",
	density: 4068,
	conduct: 0.43,
},

elements.tin_scrap = {
	color: ["#AEADA8","#BEBDB4","#9E9D98","#AEADA4","#8E8D88","#9E9D94"],
	behavior: behaviors.POWDER,
	tempHigh: 231.9,
	stateHigh: "molten_tin",
	category: "powders",
	density: 4260,
	conduct: 0.35,
},

elements.nickel_scrap = {
	color: ["#828482","#727472","#626462"],
	behavior: behaviors.POWDER,
	tempHigh: 1455,
	stateHigh: "molten_nickel",
	category: "powders",
	density: 5900,
	conduct: 0.41,
},

elements.silver_scrap = {
	color: ["#DADADA","#CACACA","#BABABA"],
	behavior: behaviors.POWDER,
	tempHigh: 961.8,
	stateHigh: "molten_silver",
	category: "powders",
	density: 7497,
	conduct: 0.89,
}

//gold

elements.straw.breakInto = ["ash","loose_straw"]
elements.plastic.breakInto = ["plastic_scrap","dioxin"]
elements.insulation.breakInto = ["plastic_scrap","dioxin","glass_shard"]
elements.iron.breakInto = "iron_scrap"
elements.copper.breakInto = ["copper_scrap","copper_scrap","copper_scrap","copper_scrap","copper_scrap","oxidized_copper_scrap"]
elements.zinc.breakInto = "zinc_scrap"
elements.tin.breakInto = "tin_scrap"
elements.nickel.breakInto = "nickel_scrap"
elements.silver.breakInto = "silver_scrap"
elements.gold.breakInto = "gold_coin"
