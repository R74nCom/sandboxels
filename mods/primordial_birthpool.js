runAfterLoad(function() {
	if(enabledMods.includes("mods/fey_and_more.js")) {
		elements.primordial_birthpool = {
			color:["#5E7453","#5E745D","#5E744B","#6C7C50","#6C7C59","#6C7C47"],
			state: "solid",
			behavior: [
				"CR:foam%1|CR:sapling,wheat_seed,flower_seed,algae,cell,mushroom_spore,lichen,yeast,antibody,cellulose%0.5 AND CR:foam%2|CR:foam%1",
				"M2|XX|M2",
				"M1|M1|M1",
			],
			reactions: {
				"cancer": { "elem1":["toxic_mistake","dirty_water"] },
				"cyanide": { "elem1":["toxic_mistake","dirty_water"] },
				"infection": { "elem1":["toxic_mistake","dirty_water"] },
				"plague": { "elem1":["toxic_mistake","dirty_water"] },
				"ammonia": { "elem1":["algae","cell","mushroom_spore","lichen","yeast","antibody"], "chance":0.05 },
				"radiation": { "elem1":["algae","cell","mushroom_spore","lichen","yeast","antibody"], "chance":0.15 },
				"light": { "elem1":["algae","cell","mushroom_spore","lichen","yeast","antibody"], "chance":0.5 },
				"oxygen": { "elem1":["algae","cell","mushroom_spore","lichen","yeast","antibody"], "chance":0.02 },
			},
			density: 1110,
			tempHigh: 100,
			stateHigh: "steam",
			conduct: 0.33,
			category: "liquids",
			hidden: true,
			reactions: {
				concoction: { "elem1": ["primordial_soup", "birthpool", "primordial_birthpool"], "elem2": ["primordial_soup", "birthpool", "primordial_birthpool"], "chance":0.0045},
			},
		};

		if(!elements.birthpool.reactions) {
			elements.birthpool.reactions = {}
		}

		elements.birthpool.reactions.primordial_soup = { "elem1":"primordial_birthpool", "elem2":"primordial_birthpool" }
	};
});
