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
	hidden: true,
},

elements.straw.breakInto = ["ash","loose_straw"]

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
	hidden: true,
},

elements.plastic.breakInto = ["plastic_scrap","dioxin"]

elements.insulation.breakInto = ["plastic_scrap","dioxin","glass_shard"]

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
	hidden: true,
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
	hidden: true,
}

elements.copper.breakInto = ["copper_scrap","copper_scrap","copper_scrap","copper_scrap","copper_scrap","oxidized_copper_scrap"]

elements.dry_ice.breakInto = "carbon_dioxide"

regularShinyThingArray = ["iron", "zinc", "tin", "nickel", "silver", "aluminum", "lead", "tungsten", "brass", "bronze", "sterling", "steel", "rose_gold", "solder", "gold", "pyrite"]
//pyrite is a mineral

runAfterLoad(function() {
	if(enabledMods.includes("mods/Neutronium Mod.js")) {
		regularShinyThingArray.push("mythril")
		regularShinyThingArray.push("mithril_mythril_alloy")
		regularShinyThingArray.push("titanium")
		regularShinyThingArray.push("ilitium")
	}
	if(enabledMods.includes("mods/fey_and_more.js")) {
		regularShinyThingArray.push("mithril")
	}
	if(enabledMods.includes("mods/metals.js")) {
		regularShinyThingArray.push("beryllium")
		regularShinyThingArray.push("boron")
		regularShinyThingArray.push("ruthenium")
		regularShinyThingArray.push("rhodium")
		regularShinyThingArray.push("palladium")
		regularShinyThingArray.push("rhenium")
		regularShinyThingArray.push("osmium")
		regularShinyThingArray.push("iridium")
		regularShinyThingArray.push("platinum")
		regularShinyThingArray.push("frozen_mercury")
		regularShinyThingArray.push("lithium")
		regularShinyThingArray.push("niobium")
		if(elements.mercury) {
			elements.mercury.breakInto = "mercury_gas"
		}
	}

	if(enabledMods.includes("mods/ketchup_mod.js")) {
		regularShinyThingArray.push("ketchup_metal")
		regularShinyThingArray.push("ketchup_gold")
		elements.frozen_ketchup.breakInto = "ketchup_snow"
		elements.frozen_poisoned_ketchup.breakInto = "poisoned_ketchup_snow"
	}

	if(enabledMods.includes("mods/randomness.js")) {
		regularShinyThingArray.push("tungstensteel")
		regularShinyThingArray.push("densinium")
	}

	if(enabledMods.includes("mods/fey_and_more.js")) {
		regularShinyThingArray.push("mithril")
	}

	if(enabledMods.includes("mods/some_tf_liquids.js")) {
		regularShinyThingArray.push("signalum")
	}

	if(enabledMods.includes("mods/laetium.js")) {
		regularShinyThingArray.push("laetium")
	}

	elements.nitrogen_snow = {
		color: "#efefef",
		behavior: behaviors.POWDER,
		category: "solids",
		temp: -259.86,
		tempHigh: -209.86,
		stateHigh: "liquid_nitrogen",
		state: "solid",
		density: 850,
		hidden: true,
	}

	elements.nitrogen_ice.breakInto = "nitrogen_snow"

	runAfterLoad(function() {
		for(i = 0; i < regularShinyThingArray.length; i++) {
			var thing = regularShinyThingArray[i];
			if(elements[thing]) {
				elements[`${thing}_scrap`] = {
					color: elements[thing].color,
					behavior: behaviors.POWDER,
					tempHigh: elements[thing].tempHigh,
					stateHigh: thing,
					category: "powders",
					hidden: true,
					density: elements[thing].density * 0.09,
					conduct: elements[thing].conduct * 0.4,
					movable: true,
				};
				if(elements[thing].reactions) {
					elements[`${thing}_scrap`].reactions = elements[thing].reactions;
				};
				elements[thing].breakInto = `${thing}_scrap`;
			};
		};
	if(enabledMods.includes("mods/randomness.js")) {
		elements.acid.ignore.push("densinium_scrap")
		elements.densinium_scrap.hardness = 0.99
	}
	if(enabledMods.includes("mods/metals.js")) {
		elements.lithium_scrap.tick = function(pixel) {
			tryTarnish(pixel,"lithium_oxide",0.021) 
			if(pixel.temp >= 178) {
				pixel.burning = true; 
				pixel.burnStart = pixelTicks; 
			};
		};
	};
	if(enabledMods.includes("mods/laetium.js")) {
		elements.laetium_scrap.tick = function(pixel) {
			neighbors = [[-1,0],[0,-1],[1,0],[0,1]]
			for(i = 0; i < neighbors.length; i++) {
				if(!isEmpty(pixel.x+neighbors[i][0],pixel.y+neighbors[i][1],true)) {
					if(elements[pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element].category) {
						if(elements[pixelMap[pixel.x+neighbors[i][0]][pixel.y+neighbors[i][1]].element].category == "cum") {
							pixel.temp += 7
						};
					};
				};
			};
		};
	};
	});
});
