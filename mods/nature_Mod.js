
//P.S. I had to study A LOT to find this information, so please credit me if you include any code from this mod.
//mod includes code by a-ReaL-EngInEer, do not steal without this text.
elements.fly.behavior = [["XX","XX","XX"], ["XX","CH:female_green_bottle_fly,male_green_bottle_fly,crawl_fruitfly","XX"], ["XX","XX","XX"]];
elements.hyphae.behavior = [["CH:dirt>hyphae,hyphae,mycelium%0.05","CR:fungi%0.5,","CH:dirt>hyphae,hyphae,mycelium%0.05"], ["CH:dirt>hyphae,hyphae,mycelium%0.05","CH:dirt%0.05","CH:dirt>hyphae,hyphae,mycelium%0.05"], ["CH:dirt>hyphae,hyphae,mycelium%0.05","CH:dirt>hyphae,hyphae,mycelium%0.05","CH:dirt>hyphae,hyphae,mycelium%0.05"]];
elements.rotten_meat.behavior = [["XX","XX","XX"], ["XX","CH:infested_meat","XX"], ["XX","XX","XX"]];
elements.tornado.category = "gases"
elements.mushroom_gill.breakInto = "fungi"
elements.slime.stain = 0
elements.rock_wall.hardness = 0.95
elements.dead_bug.behavior = [["XX","XX","XX"], ["XX","CH:dead_arthropod","XX"], ["XX","XX","XX"]];
elements.meat.behavior = [["XX","XX","XX"], ["SP","CH:rotten_meat%0.5","SP"], ["XX","M1","XX"]];
elements.ant.behavior = [["XX","XX","XX"], ["XX","CH:worker_leafcutter_ant,queen_leafcutter_ant","XX"], ["XX","XX","XX"]];
elements.primordial_soup.behavior = [["XX","CR:foam%2","XX"], ["M2%50","CH:algae,cell,mushroom_spore,fungi,giant_puffball_mushroom_cap,bold_jumping_spider_eggsac,ant,bug,meadow_mushroom_spore,lichen,yeast,moss,green_bottle_fly_larva,antibody,cellulose,seltzer,oxygen%0.0075","M2%50"], ["M1","M1","M1"]];
//XX|CR:foam%2|XX;M2|CH:algae,cell,mushroom_spore,lichen,yeast,antibody,cellulose,seltzer,oxygen%0.005|M2;M1|M1|M1
var food = ["meat","rotten_meat","cooked_meat","salt","sugar","flour","broth","yolk","hard_yolk","dough","batter","butter","cheese","rotten_cheese","cheese_powder","chocolate","chocolate_powder","grape","herb","lettuce","pickle","tomato","sauce","pumpkin","corn","popcorn","potato","baked_potato","mashed_potato"];



elements.weather = {
	color: "#7A9CE1",
	excludeRandom: false,
	behavior: [["M1","M2 AND CR:flash,electric,water%0.05 AND CR:cloud,rain_cloud,snow_cloud,steam%0.07 AND CR:thunder_cloud,hail_cloud,tornado%0.03","M1"],["M2","XX","M2"],["M1%0.1","M2","M1%0.1"]],
	category: "ecosystem",
	state: "gas",
},

elements.moss = {
    color: ["#6B7A1A", "#60742E", "#5E823C"],
	excludeRandom: false,
    behavior: [
    ["XX","SA","XX"],
    ["SA AND CL%0.2","XX","SA AND CL%0.2"],
    ["M1","M1 AND SA","M1"]
],
category: "ecosystem",
state: "solid",
tempHigh: 55,
stateHigh: "grass",
tempLow: -20,
stateLow: "ice"
},

elements.female_green_bottle_fly = {
    alias: "Lucilia sericata",
    color: "#474f48",
	excludeRandom: false,
	behavior: [["M1%20 AND ST:web","XX","M1%20 AND ST:web"],["M1%20 AND ST:web","CH:female_green_bottle_fly>dead_arthropod%0.01 AND CH:crawl_female_green_bottle_fly%0.06","M1%20 AND ST:web"],["M1%20 AND ST:web","ST:web AND CH:food>undefined,green_bottle_fly_egg%0.1","M1%20 AND ST:web"]],
	category: "ecosystem",
	state: "solid",
	breakInto: "injured_female_green_bottle_fly",
	reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "ammonia", elem3: "stench"},
        "web": { elem1:"dead_arthropod"}
	},
    density:35,
    burn: .01,
    burnTime: 150,
    burnInto: ["dead_arthropod","dirt"],
	tempHigh: 100,
	stateHigh:"dead_arthropod",
	tempLow: 10,
	stateLow: "ice",
},

elements.male_green_bottle_fly = {
    alias: "Lucilia sericata",
    color: "#4B4B4B",
	excludeRandom: false,
	behavior: [["M1 AND ST:web","M2 AND ST:web","M1 AND ST:web"],["M2 AND ST:web","CH:dead_arthropod%0.01 AND CH:crawl_male_green_bottle_fly%0.06","M2 AND ST:web"],["M1 AND ST:web","M2 AND ST:web AND CH:food>undefined","M1 AND ST:web"]],
	category: "ecosystem",
    breakInto:"injured_male_green_bottle_fly",
	state: "solid",
    density: 30,
    burn: .01,
    burnTime: 150,
    burnInto: ["dead_arthropod","dirt"],
	reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "dead_arthropod"},
        "web": { elem1:"dead_arthropod"}
	}
},

elements.green_bottle_fly_egg = {
    color: "#E2EAF4",
	excludeRandom: false,
	behavior: [["XX","ST","XX"],["ST","CH:green_bottle_fly_larva%0.036","ST"],["M1","M1 AND ST","M1"]],
	category: "ecosystem",
	state: "solid",
	breakInto: ["slime","green_bottle_fly_larva","female_green_bottle_fly"],
		reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "ammonia", elem3: "stench"},
	}
},

elements.green_bottle_fly_larva = {
    color: "#F0EEE8",
    alias: "Lucilia sericata Larva",
	excludeRandom: false,
	behavior: [["M2%10 AND SA%50","SA%50 AND SW: green_bottle_fly_larva,green_bottle_fly_egg,meat,rotten_meat,infested_meat%0.1","M2%10 AND SA%50"],["M2%50 AND CH:food,garbage_juice,banana,mashed_banana,rotten_banana>stench,stench,stench,plague%0.1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","CC: #F9E6D4%0.08 AND CH:green_bottle_fly_pupae%0.05,CR:stench%10","M2%50 AND CH:meat,rotten_meat,infested_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,banana,mashed_banana,rotten_banana>stench,plaque%0.1 AND CH:meat,rotten_meat,fat,broth,grease>undefined"],["M1%1 AND CH:meat>rotten_meat%1","M1 AND CH:meat,rotten_meat,infested_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,>stench,plaque AND CH:cheese,cheese_powder,melted_cheese>rotten_cheese AND CH:meat,rotten_meat,fat,broth,grease>undefined","M1%1"]],
	category: "ecosystem",
	state: "solid",
	breakInto: "slime",
    breakIntoColor: "#f1efe9",
    density: 150,
	tempHigh: 80,
	stateHigh: "female_green_bottle_fly",
	reactions: {
		"disinfectant": { elem1: "stench", elem2: "ammonia", elem3: "stench"},
	}
},

elements.green_bottle_fly_pupae = {
    alias: "Lucilia sericata pupae",
	color: "#B1834D",
    breakInto:"slime",
    breakIntoColor: "#D4A930",
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["SP","CH:crawl_male_green_bottle_fly,crawl_female_green_bottle_fly%0.006 AND CC:#5D5247%0.01","SP"],["M1","M1","M1"]],
	category: "ecosystem",
    density: 80,
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_arthropod", elem3:"dirt"}
    }
},

elements.crawl_male_green_bottle_fly = {
    alias: "Lucilia sericata",
	color: "#5D5247",
	excludeRandom: false,
	behavior: [["M2%0.5 AND ST:web","XX","M2%0.5 AND ST:web"],["M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","CH:male_green_bottle_fly%0.06","M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined"],["ST:web","M1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","ST:web"]],
	category: "ecosystem",
    breakInto:"injured_male_green_bottle_fly",
    density:30,
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_arthropod", elem3:"dirt"}
    }
},

elements.crawl_female_green_bottle_fly = {
    alias: "Lucilia sericata",
	color: "#5D5247",
	excludeRandom: false,
	behavior: [["M2%0.5 AND ST:web","XX","M2%0.5 AND ST:web"],["M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined AND CR:green_bottle_fly_egg%0.05","CH:female_green_bottle_fly%0.06","M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined AND CR:green_bottle_fly_egg%0.1"],["ST:web","M1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","ST:web"]],
	category: "ecosystem",
    breakInto:"injured_female_green_bottle_fly",
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_arthropod", elem3:"dirt"}
    }
},

elements.injured_male_green_bottle_fly = {
    alias: "Lucilia sericata",
	color: "#5D5247",
	excludeRandom: false,
	behavior: [["M2%0.5 AND ST:web","XX","M2%0.5 AND ST:web"],["M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","CH:dead_arthropod%0.01","M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined"],["ST:web","M1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","ST:web"]],
	category: "ecosystem",
    breakInto:"slime",
    breakIntoColor: "#D4A930",
    density:30,
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_arthropod", elem3:"dirt"}
    }
},

elements.injured_female_green_bottle_fly = {
    alias: "Lucilia sericata",
	color: "#5D5247",
	excludeRandom: false,
	behavior: [["M2%0.5 AND ST:web","XX","M2%0.5 AND ST:web"],["CR:green_bottle_fly_egg%1 AND M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","CH:dead_arthropod%0.01","M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined AND CR:green_bottle_fly_egg%1"],["ST:web","M1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","ST:web"]],
	category: "ecosystem",
    breakInto:"green_bottle_fly_egg",
    breakIntoColor: "#D4A930",
    density:30,
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_arthropod", elem3:"dirt"}
    }
},

elements.female_fruitfly = {
    color: "#EEC758",
    alias: "Drosophila Melanogaster",
	excludeRandom: false,
	behavior: [["M1%20","SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana,dirt,mold%10","M1%20"],["M1%20","CH:female_fruitfly>dead_arthropod%0.01","M1%20"],["M1%20","CR:fruitfly_egg%0.06","M1%20"]],
	category: "ecosystem",
	state: "solid",
	breakInto: ["dead_arthropod","fruitfly_egg"],
	reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "dead_arthropod", elem3: "stench"},
	},
    burn: .01,
    burnTime: 10,
    burnInto:["dead_arthropod","dirt"],
	tempHigh: 100,
	stateHigh:"dead_arthropod",
	tempLow: 10,
	stateLow: "ice",
},

elements.male_fruitfly = {
    color: "#D4A930",
    alias: "Drosophila Melanogaster",
	excludeRandom: false,
	behavior: [["M1","M2 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana,dirt,mold%10","M1"],["M2","CH:dead_arthropod%0.01","M2"],["M1","M2","M1"]],
	category: "ecosystem",
    breakInto:"dead_bug",
    burn: .01,
    burnTime: 10,
    burnInto:["dead_arthropod","dirt"],
	state: "solid",
	reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "dead_arthropod"},
	}
},

elements.fruitfly_egg = {
    color: "#E2EAF4",
    alias: "Drosophila Melanogaster Egg",
	excludeRandom: false,
	behavior: [["XX","ST","XX"],["ST","CH:fruitfly_larva%0.018","ST"],["M1","M1 AND ST","M1"]],
	category: "ecosystem",
	state: "solid",
	breakInto: ["slime","green_bottle_fly_larva","female_fruitfly"],
		reactions: {
		"disinfectant": { elem1: "plague", elem2: "slime", elem3: "stench"},
	}
},

elements.fruitfly_larva = {
    color: "#F0EEE8",
    alias: "Drosophila Melanogaster Larva",
	excludeRandom: false,
	behavior: [["M2%10 AND SA%50 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana%10","SA%50","M2%10 AND SA%50 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana"],["M2%50 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana,mashed_banana,rotten_banana>stench,stench,stench,plague%0.1","CH:fruitfly_pupae%0.05,CR:stench%10","M2%50 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana>stench,plaque%0.1"],["M1 AND CH:banana>rotten_banana%1 AND SW:grape,juice,banana,mashed_banana,rotten_banana","M1 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana>stench,plaque%0.1 AND CH:cheese,cheese_powder,melted_cheese>rotten_cheese AND CH:banana>rotten_banana,mashed_banana%0.01","M1 AND SW:grape,juice,banana,mashed_banana,rotten_banana"]],
	category: "ecosystem",
	state: "solid",
    stain:0.2,
	breakInto: "slime",
    breakIntoColor: "#f8f6f0",
	tempHigh: 80,
	stateHigh: "female_fruitfly",
	reactions: {
		"disinfectant": { elem1: "stench", elem2: "plague", elem3: "stench"},
	}
},

elements.fruitfly_pupae = {
	color: "#CBAD91",
    alias: "Drosophila Melanogaster pupae",
    breakInto:"slime",
    breakIntoColor: "#D4A930",
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["SP","CH:crawl_fruitfly%0.06 AND CH:dead_arthropod%0.006 AND CC:#5D5247%0.01","SP"],["M1","M1","M1"]],
	category: "ecosystem",
	state: "solid"
},

elements.crawl_fruitfly = {
    alias: "Drosophila Melanogaster",
	color: "#64571c",
    breakInto:"slime",
    breakIntoColor: "#D4A930",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["M2%2","CH:male_fruitfly,female_fruitfly%0.004","M2%2"],["M1","M1","M1"]],
	category: "ecosystem",
	state: "solid",

},

elements.worker_leafcutter_ant = {
    alias: "Atta Cephalotes",
	color: "#7b370c",
    desc:"This species of ant is special because it can farm mushrooms and leaves, and turn them into ant bread.",
	excludeRandom: false,
	behavior: [["ST:web","SW:ant_wall%5 AND M2%5","ST:web"],["M2 AND CH:grape,banana,mashed_banana,rotten_banana,juice,yeast>undefined%2%2 AND SW:dirt,sand,ant_wall%2 AND CH:dirt,sand>mushroom_spore%0.01","CH:dead_arthropod%0.006","M2 AND Ch:dirt,sand>mushroom_spore%0.1 AND CH:grape,banana,mashed_banana,rotten_banana,juice,yeast>undefined%2%2 AND SW:ant_wall%5"],["ST:web AND M2%75 AND Ch:dirt,sand,ant_wall,ant_wall,ant_wall>sand,sand,ant_wall AND CH:plant,mushroom_spore,mushroom_stalk,mushroom_gill,mushroom_cap,hyphae,lichen,mycelium,corn_seed,flower_seed,grass_seed,pumpkin_seed,wheat_seed,potato_seed,yeast,fertilized_banana_seed>bread,crumb,undefined,yeast","M1 AND CH:meat,rotten_meat,fat,broth,grease>undefined AND CH:dirt,sand>undefined,ant_wall,ant_wall AND CH:plant,mushroom_spore,mushroom_stalk,mushroom_gill,mushroom_cap,hyphae,lichen,mycelium,corn_seed,flower_seed,grass_seed,pumpkin_seed,wheat_seed,potato_seed>bread,crumb,undefined AND SW:ant_wall%5","ST:M2%75 AND CH:dirt,sand>undefined,ant_wall,ant_wall AND CH:mushroom_spore,mushroom_stalk,mushroom_gill,mushroom_cap,hyphae,lichen,mycelium,corn_seed,flower_seed,grass_seed,pumpkin_seed,wheat_seed,potato_seed>bread,crumb,undefined"]],
	category: "ecosystem",
    breakInto:"dead_arthropod",
    density:30,
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_arthropod", elem3:"dirt"}
    }
},

elements.queen_leafcutter_ant = {
    alias: "Atta Cephalotes",
	color: "#9f3e06",
    desc:"This species of ant is special because it can farm mushrooms and leaves, and turn them into ant bread.",
	excludeRandom: false,
	behavior: [["ST:web","SW:ant_wall%5 AND M2%5","ST:web"],["M2%2 AND CH:grape,banana,mashed_banana,rotten_banana,juice,yeast>undefined%2 AND SW:dirt,sand,ant_wall%2","CH:dead_arthropod%0.006 AND SW:ant_wall%5","M2%2 AND CH:grape,banana,mashed_banana,rotten_banana,juice,yeast>undefined%2 AND SW:ant_wall%5"],["ST:web AND M2%75 AND CH:plant,mushroom_spore,mushroom_stalk,mushroom_gill,mushroom_cap,hyphae,lichen,mycelium,corn_seed,flower_seed,grass_seed,pumpkin_seed,wheat_seed,potato_seed,yeast,fertilized_banana_seed>bread,crumb,undefined,yeast","M1 AND CH:meat,rotten_meat,fat,broth,grease>undefined AND CH:plant,mushroom_spore,mushroom_stalk,mushroom_gill,mushroom_cap,hyphae,lichen,mycelium,corn_seed,flower_seed,grass_seed,pumpkin_seed,wheat_seed,potato_seed>bread,crumb,undefined AND CH:bread,crumb,yeast>leafcutter_ant_egg AND SW:ant_wall%5","ST:M2%75 AND CH:mushroom_spore,mushroom_stalk,mushroom_gill,mushroom_cap,hyphae,lichen,mycelium,corn_seed,flower_seed,grass_seed,pumpkin_seed,wheat_seed,potato_seed>bread,crumb,undefined"]],
	category: "ecosystem",
    breakInto:"dead_arthropod",
    density:30,
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_arthropod", elem3:"dirt"}
    }
},

elements.leafcutter_ant_egg = {
    color: "#E2EAF4",
    alias: "Atta Cephalotes Egg",
	excludeRandom: false,
	behavior: [["XX","ST","XX"],["ST","CH:leafcutter_ant_larva%0.018","ST"],["M1","M1 AND ST","M1"]],
	category: "ecosystem",
	state: "solid",
	breakInto: ["slime","green_bottle_fly_larva","female_fruitfly"],
		reactions: {
		"disinfectant": { elem1: "plague", elem2: "stench", elem3: "stench"},
	},
},

elements.leafcutter_ant_larva = {
    color: "#FAEFE9",
    alias: "Atta Cephalotes Larva",
	excludeRandom: false,
	behavior: [["M2%10 AND SA%50 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana,ant_wall%10","SA%50","M2%10 AND SA%50 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana,ant_wall"],["M2%50 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana,mashed_banana,rotten_banana>stench,stench,plague%0.1 AND CH:plant,mushroom_spore,mushroom_stalk,mushroom_gill,mushroom_cap,hyphae,lichen,mycelium,corn_seed,flower_seed,grass_seed,pumpkin_seed,wheat_seed,potato_seed,yeast,fertilized_banana_seed>bread,crumb,undefined,yeast","CH:leafcutter_ant_pupae%0.05,CR:stench%10","M2%50 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana>stench,plaque%0.1 AND CH:plant,mushroom_spore,mushroom_stalk,mushroom_gill,mushroom_cap,hyphae,lichen,mycelium,corn_seed,flower_seed,grass_seed,pumpkin_seed,wheat_seed,potato_seed,yeast,fertilized_banana_seed>bread,crumb,undefined,yeast"],["M1%1 AND CH:banana>undefined%1 AND CH:plant,mushroom_spore,mushroom_stalk,mushroom_gill,mushroom_cap,hyphae,lichen,mycelium,corn_seed,flower_seed,grass_seed,pumpkin_seed,wheat_seed,potato_seed,yeast,fertilized_banana_seed>bread,crumb,undefined,yeast AND CH:bread,yeast>undefined%10 AND SW:grape,juice,banana,mashed_banana,rotten_banana","M1 AND CH:bread,yeast>undefined%10 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana>stench,plaque%0.1 AND CH:plant,mushroom_spore,mushroom_stalk,mushroom_gill,mushroom_cap,hyphae,lichen,mycelium,corn_seed,flower_seed,grass_seed,pumpkin_seed,wheat_seed,potato_seed,yeast,fertilized_banana_seed>bread,crumb,undefined,yeast AND CH:cheese,cheese_powder,melted_cheese>rotten_cheese AND CH:banana>rotten_banana,mashed_banana%0.01","M1%1 AND CH:bread,yeast>undefined%10 AND SW:grape,juice,banana,mashed_banana,rotten_banana"]],
	category: "ecosystem",
	state: "solid",
	breakInto: "slime",
    breakIntoColor: "#f8f6f0",
	tempHigh: 80,
	stateHigh: "worker_leafcutter_ant",
	reactions: {
		"disinfectant": { elem1: "stench", elem2: "plague", elem3: "stench"},
	}
},

elements.leafcutter_ant_pupae = {
	color: "#b95c3d",
    alias: "Atta Cephalotes pupae",
    breakInto:"slime",
    breakIntoColor: "#d46f30ff",
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["SP","CH:worker_leafcutter_ant%0.006 AND CC:#903e22%0.01","SP"],["M1","M1","M1"]],
	category: "ecosystem",
	state: "solid"
},

elements.female_ladybird_beetle = {
    alias: ["Coccinellidae"],
    color: ["#AA4936","#711D0D","#851C00"],
	excludeRandom: false,
	behavior: [["M1%20 AND ST:web","XX","M1%20 AND ST:web"],["M1%20 AND ST:web","CH:female_ladybird_beetle>dead_arthropod%0.01 AND CH:crawl_female_ladybird_beetle%0.06","M1%20 AND ST:web"],["M1%20 AND ST:web","CR:ladybird_beetle_egg%0.06 AND ST:web AND CH:pollen>undefined,ladybird_beetle_egg%0.1","M1%20 AND ST:web"]],
	category: "ecosystem",
	state: "solid",
	breakInto: "dead_arthropod",
	breakIntoColor:"#ba4933",
	reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "ammonia", elem3: "stench"},
        "web": { elem1:"dead_arthropod"}
	},
    density:35,
    burn: .01,
    burnTime: 150,
    burnInto: ["dead_arthropod","dirt"],
	tempHigh: 100,
	stateHigh:"dead_arthropod",
	tempLow: 10,
	stateLow: "ice",
},

elements.male_ladybird_beetle = {
    alias: ["Coccinellidae"],
    color: ["#AA4936","#711D0D","#851C00"],
	excludeRandom: false,
	behavior: [["M1 AND ST:web","XX","M1 AND ST:web"],["M1%20 AND ST:web","CH:male_ladybird_beetle>dead_arthropod%0.01 AND CH:crawl_male_ladybird_beetle%0.06","M1%20 AND ST:web"],["M1% AND ST:web","ST:web AND CH:meat,rotten_meat,fat,broth,grease>undefined,dirt%0.1","M1 AND ST:web"]],
	category: "ecosystem",
	state: "solid",
	breakInto: "dead_arthropod",
	breakIntoColor:"#ba4933",
	reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "ammonia", elem3: "stench"},
        "web": { elem1:"dead_arthropod"}
	},
    density:35,
    burn: .01,
    burnTime: 150,
    burnInto: ["dead_arthropod","dirt"],
	tempHigh: 100,
	stateHigh:"dead_arthropod",
	tempLow: 10,
	stateLow: "ice",
},

elements.crawl_male_ladybird_beetle = {
    alias: ["Coccinellidae"],
    color: ["#AA4936","#711D0D","#851C00"],
	excludeRandom: false,
	behavior: [["M2%1 AND ST:web","XX","M2%1 AND ST:web"],["M2%1 AND ST:web","CH:crawl_male_ladybird_beetle>male_ladybird_beetle%0.01 AND CH:crawl_male_ladybird_beetle%0.06","M2%1 AND ST:web"],["M1%10 AND ST:web","M1 AND ST:web AND CH:meat,rotten_meat,fat,broth,grease>undefined,dirt%0.1","M1%10 AND ST:web"]],
	category: "ecosystem",
	state: "solid",
	breakInto: "dead_arthropod",
	breakIntoColor:"#ba4933",
	reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "ammonia", elem3: "stench"},
        "web": { elem1:"dead_arthropod"}
	},
    density:35,
    burn: .01,
    burnTime: 150,
    burnInto: ["dead_arthropod","dirt"],
	tempHigh: 100,
	stateHigh:"dead_arthropod",
	tempLow: 10,
	stateLow: "ice",
},

elements.crawl_female_ladybird_beetle = {
    alias: ["Coccinellidae"],
    color: ["#AA4936","#711D0D","#851C00"],
	excludeRandom: false,
	behavior: [["M2%1 AND ST:web","XX","M2%1 AND ST:web"],["M2%1 AND ST:web","CH:crawl_female_ladybird_beetle>female_ladybird_beetle%0.01 AND CH:crawl_male_ladybird_beetle%0.06","M2%1 AND ST:web"],["M1%10 AND ST:web","M1 AND ST:web AND CH:meat,rotten_meat,fat,broth,grease>undefined,dirt%0.1","M1%10 AND ST:web"]],
	category: "ecosystem",
	state: "solid",
	breakInto: "dead_arthropod",
	breakIntoColor:"#ba4933",
	reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "ammonia", elem3: "stench"},
        "web": { elem1:"dead_arthropod"}
	},
    density:35,
    burn: .01,
    burnTime: 150,
    burnInto: ["dead_arthropod","dirt"],
	tempHigh: 100,
	stateHigh:"dead_arthropod",
	tempLow: 10,
	stateLow: "ice",
},

elements.male_springtail = {
    alias: ["Orchesella cincta"],
    color: ["#533A4E","#635964","#696280"],
	excludeRandom: false,
	behavior: [["M2%1 AND ST:web AND SW:dirt,leaf_litter,hyphae,mycelium,fiber%5 AND CH:dirt,leaf_litter,hyphae,mycelium,fiber>dirt","XX","M2%1 AND ST:web AND SW:dirt,leaf_litter,hyphae,mycelium,fiber%5 AND CH:dirt,leaf_litter,hyphae,mycelium,fiber>dirt"],["M2%1 AND ST:web","CH:male_springtail>dead_arthropod%0.01","M2%1 AND ST:web"],["M1%10 AND ST:web AND SW:dirt,leaf_litter,hyphae,mycelium,fiber %5 AND CH:dirt,leaf_litter,hyphae,mycelium,fiber>dirt","M1 AND ST:web AND CH:mold,dead_arthropod>undefined,dirt%0.1","M1%10 AND ST:web AND SW:dirt,leaf_litter,hyphae,mycelium,fiber%5 AND CH:dirt,leaf_litter,hyphae,mycelium,fiber>dirt"]],
	category: "ecosystem",
	state: "solid",
	breakInto: "dead_arthropod",
	breakIntoColor:"#676797",
	reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "ammonia", elem3: "stench"},
        "web": { elem1:"dead_arthropod"}
	},
    density:35,
    burn: .01,
    burnTime: 150,
    burnInto: ["dead_arthropod","dirt"],
	tempHigh: 100,
	stateHigh:"dead_arthropod",
	tempLow: 0,
	stateLow: "dead_arthropod",
},

elements.female_springtail = {
    alias: ["Orchesella cincta"],
    color: ["#533A4E","#635964","#696280"],
	excludeRandom: false,
	behavior: [["M2%1 AND ST:web AND SW:dirt,leaf_litter,hyphae,mycelium,fiber%5 AND CH:dirt,leaf_litter,hyphae,mycelium,fiber>undefined,springtail_egg%5","XX","M2%1 AND ST:web AND SW:dirt,leaf_litter,hyphae,mycelium,fiber%5 AND CH:dirt,leaf_litter,hyphae,mycelium,fiber>undefined,springtail_egg%5"],["M2%1 AND ST:web","CH:male_springtail>dead_arthropod%0.01","M2%1 AND ST:web"],["M1%10 AND ST:web AND SW:dirt,leaf_litter,hyphae,mycelium,fiber %5 AND CH:dirt,leaf_litter,hyphae,mycelium,fiber>undefined,springtail_egg %5","M1 AND ST:web AND CH:mold,dead_arthropod>undefined,dirt%0.1","M1%10 AND ST:web AND SW:dirt,leaf_litter,hyphae,mycelium,fiber %5 AND CH:dirt,leaf_litter,hyphae,mycelium,fiber>undefined,springtail_egg%5"]],
	category: "ecosystem",
	state: "solid",
	breakInto: "dead_arthropod",
	breakIntoColor:"#676797",
	reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "ammonia", elem3: "stench"},
        "web": { elem1:"dead_arthropod"}
	},
    density:35,
    burn: .01,
    burnTime: 150,
    burnInto: ["dead_arthropod","dirt"],
	tempHigh: 100,
	stateHigh:"dead_arthropod",
	tempLow: 0,
	stateLow: "dead_arthropod",
},

elements.springtail_egg = {
    color: "#8b5b23",
	excludeRandom: false,
	behavior: [["XX","ST","XX"],["ST","CH:springtail_larva%0.036","ST"],["M1","M1 AND ST","M1"]],
	category: "ecosystem",
	state: "solid",
	breakInto: ["slime","springtail_larva"],
	breakIntoColor:"#efe4dc",
		reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "ammonia", elem3: "stench"},
	}
},

elements.springtail_larva = {
    color: "#b1890f",
    alias: "Orchesella cincta Larva",
	excludeRandom: false,
	behavior: [["M2%10 AND SA%50 SW:dirt,sand%0.1","SA%50 AND SW: springtail_larva,springtail_egg,leaf_litter%0.1","M2%10 AND SA%50 AND SW:dirt,sand%0.1"],["M2%50 AND CH:leaf_litter>undefined,dirt%0.1 AND CH:hyphae,leaf_litter,mycelium>undefined","CC: #F9E6D4%0.08 AND CH:springtail_pupae%0.05,","M2%50 AND CH:meat,rotten_meat,fat,broth,grease>undefined"],["M1%1 AND CH:meat>rotten_meat%1 AND SW:dirt,sand%0.1","M1 AND CH:meat,rotten_meat,infested_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,>stench,plaque AND CH:cheese,cheese_powder,melted_cheese>rotten_cheese AND CH:meat,rotten_meat,fat,broth,grease>undefined","M1%1 AND SW:dirt,sand%0.1"]],
	category: "ecosystem",
	state: "solid",
	breakInto: "dirt",
    density: 150,
	tempHigh: 80,
	stateHigh: "female_green_bottle_fly",
	reactions: {
		"disinfectant": { elem1: "stench", elem2: "ammonia", elem3: "stench"},
	}
},

elements.springtail_pupae = {
    alias: "Orchesella cincta pupae",
	color: "#fadbb7",
    breakInto:"dirt",
    breakIntoColor: "#ebaf0a",
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["SP","CH:male_springtail,female_springtail%0.006 AND CC:#5D5247%0.01","SP"],["M1","M1","M1"]],
	category: "ecosystem",
    density: 80,
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_arthropod", elem3:"dirt"}
    }
},

elements.bold_jumping_spider_eggsac = {
    color: "#637b99",
	excludeRandom: false,
	behavior: [["XX","ST","XX"],["ST","CH:bold_jumping_spiderling%0.07","ST"],["XX","M1 AND ST","XX"]],
	category: "ecosystem",
	state: "solid",
		reactions: {
		"disinfectant": { elem1: "dead_arthropod", elem2: "oxygen"},
	}
},

elements.bold_jumping_spiderling = {
	color: ["#224045","#393114","#252410"],
	excludeRandom: false,
	behavior: [
        `XX|M2%1|M2%1|M2%1|XX`,
        `XX|M2%20|XX|M2%20|XX`,
        `XX|M2%50 AND SW:web%10 AND DE:dead_arthropod,protein,crawl_female_green_bottle_fly,crawl_fruitfly,crawl_female_ladybird_beetle|CH:streamlining_bold_jumping_spider%5 AND L2:molt%0.15 AND C2:male_bold_jumping_spider,female_bold_jumping_spider%0.1|M2%50 AND SW:web%10 AND DE:dead_arthropod,crawl_female_green_bottle_fly,crawl_fruitfly,crawl_female_ladybird_beetle|XX`,
        `XX|XX|M1|XX|XX`,
        `XX|XX|XX|XX|XX`
    ],
	density: 90,
	category: "ecosystem",
	state: "solid",
    breakInto:"dead_arthropod",
	reactions: {
		"disinfectant": { elem1: "streamlining_bold_jumping_spider", elem2: "dead_arthropod", elem3: "bold_jumping_spiderling", elem4: "bold_jumping_spiderling" },
	}
},

elements.streamlining_bold_jumping_spider = {
	color: ["#224539","#393114","#252410"],
	name:"bold_jumping_spider",
	excludeRandom: false,
	behavior: [
        `XX|XX|XX|XX|M1`,
        `XX|XX|BO|M1|M1`,
        `XX|XX|CH:male_bold_jumping_spider,female_bold_jumping_spider%0.1 AND FY%2|M1 AND BO AND FX:0.1|BO`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`
    ],
	density: 90,
	category: "ecosystem",
	state: "solid",
    breakInto:"dead_arthropod",
},

elements.male_bold_jumping_spider = {
	color: ["#224045","#143934","#252410"],
	excludeRandom: false,
	behavior: [
        `XX|M2%1|M2%1|M2%1|XX`,
        `XX|M2%20|XX|M2%20|XX`,
        `XX|M2%50 AND SW:web%10 AND DE:dead_arthropod,protein,crawl_female_green_bottle_fly,crawl_fruitfly,crawl_female_ladybird_beetle|r:1 AND L2:web,molt%1 AND CH:dead_arthropod%0.01|M2%50 AND SW:web%10 AND DE:dead_arthropod,crawl_female_green_bottle_fly,crawl_fruitfly,crawl_female_ladybird_beetle|XX`,
        `XX|XX|M1 AND DE:giant_puffball_cap%5|XX|XX`,
        `XX|XX|XX|XX|XX`
    ],
	density: 90,
	category: "ecosystem",
	state: "solid",
    breakInto:"dead_arthropod",
},

elements.female_bold_jumping_spider = {
	color: ["#224045","#603c19","#252410"],
	excludeRandom: false,
	behavior: [
        `XX|M2%1|M2%1|M2%1|XX`,
        `XX|M2%20|XX|M2%20|XX`,
        `XX|M2%50 AND SW:web%10|L2:bold_jumping_spider_eggsac%0.07 AND L2:web,molt,bold_jumping_spider_eggsac%1 AND CH:dead_arthropod%0.01 AND r:1|M2%50 AND SW:web%10 AND DE:dead_arthropod,crawl_female_green_bottle_fly,crawl_fruitfly,crawl_female_ladybird_beetle|XX`,
        `XX|XX|M1 AND DE:giant_puffball_cap%5|XX|XX`,
        `XX|XX|XX|XX|XX`
    ],
	density: 90,
	category: "ecosystem",
	state: "solid",
    breakInto:"dead_arthropod",
},



elements.dead_arthropod = {
	alias:["Dead Bug"],
	color: "#4B4A4B",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["XX","CH:dirt,protein%0.1","XX"],["M1","M1 AND SA","M1"]],
	category: "ecosystem",
	breakInto:"protein",
	state: "solid",
	burnInto:["ash","dirt"],
    density: 90,
	reactions: {
		"disinfectant": { elem1: "dirt"},
	}
},

elements.protein = {
	color: ["#bbd3ce","#c3cdaf",],
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["SP%20","CH:dirt%0.1 AND DE:2","SP%20"],["M1","M2","M1"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "salt_water", elem2: "water", chance:1}, 
	}
},

elements.molt = {
	color: ["#bbd3ce","#c3cdaf",],
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["SP%20","CH:dirt,protein%0.1 AND DE%2","SP%20"],["M1","M2","M1"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "dirt", elem2: "mud", elem3:"primordial_soup", chance:0.1}, 
	}
},

elements.leaf_litter = {
	color: ["#684841","#3D5B07","#2d4814","#006300","#584011","#7a640f","#914732"],
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["SP%20","CH:dirt%0.03 AND DE%0.09","SP%20"],["M1","M2","M1"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "dirt", elem2: "mud", elem3:"primordial_soup", chance:0.1}, 
	}
},

elements.wood_anemone_seed = {
	alias:"Anemonoides nemorosa",
	color: ["#A1BA0C","#ACC11C","#bedd20","#a9be0e"],
	excludeRandom: false,
	cooldown:defaultCooldown,
	behavior: [["XX","M2%2","XX"],["XX","L2:wood_anemone_stem AND C2:wood_anemone_sepal%33","XX"],["XX","M1","XX"]],
	category: "ecosystem",
	state: "solid",
},
elements.wood_anemone_stem = {
	alias:"Anemonoides nemorosa",
	color: ["#A1BA0C","#ACC11C","#5F6D1B","#6B7800"],
	excludeRandom: false,
	behavior: [["XX","ST:wood_anemone_stem,wood_anemone_sepal","XX"],["XX","DE:0.05","XX"],["XX","M1 AND CH:dirt,leaf_litter>root","XX"]],
	category: "ecosystem",
	breakInto:"fragrance",
	state: "solid",
},

elements.wood_anemone_sepal = {
	alias:"Anemonoides nemorosa",
	color: ["#A1BA0C","#ACC11C","#5F6D1B","#6B7800"],
	excludeRandom: false,
	breakInto:"fragrance",
	behavior: [["CR:wood_anemone_petal","ST:wood_anemone_stem,wood_anemone_sepal AND CR:wood_anemone_sepal%0.07 AND CR:wood_anemone_pistil","CR:wood_anemone_petal"],["ST:wood_anemone_stem,wood_anemone_sepal","DE:0.05 AND CH:leaf_litter%0.05","ST:wood_anemone_stem,wood_anemone_sepal"],["XX","M1 AND ST:wood_anemone_stem,wood_anemone_sepal","XX"]],
	category: "ecosystem",
	state: "solid",
},

elements.wood_anemone_pistil = {
	alias:"Anemonoides nemorosa",
	color: ["#DAB227","#C1A127","#A19C06"],
	breakInto:"wood_anemone_seed",
	excludeRandom: false,
	behavior: [["CR:wood_anemone_petal","CR:pollen,fragrance%0.1","CR:wood_anemone_petal"],["ST:wood_anemone_petal,wood_anemone_sepal","DE:0.05 AND CH:leaf_litter%0.05","ST:wood_anemone_petal,wood_anemone_sepal"],["XX","M1 AND ST:wood_anemone_stem,wood_anemone_sepal","XX"]],
	category: "ecosystem",
	state: "solid",
},

elements.wood_anemone_petal = {
	alias:"Anemonoides nemorosa",
	color: ["#EAE3DE","#BCB197","#D6CFC9","#FFFBF6","#EAE3DE","#BEB5AD"],
	excludeRandom: false,
	breakInto:"fragrance",
	behavior: [["XX","ST:wood_anemone_pistil","XX"],["ST:wood_anemone_pistil","DE:0.05 AND CH:leaf_litter%0.05","ST:wood_anemone_pistil"],["ST:wood_anemone_pistil","M1 AND ST:wood_anemone_stem,wood_anemone_pistil","ST:wood_anemone_pistil"]],
	category: "ecosystem",
	state: "solid",
},

elements.conecap_mushroom_spore = {
	alias:"Conocybe tenera",
	color: "#B1762D",
	excludeRandom: false,
	behavior: [["XX","M2%1.5","XX"],["XX","L2:conecap_mushroom_stalk AND C2:conecap_mushroom_gill","XX"],["M1","M1","M1"]],
	category: "ecosystem",
	cooldown: defaultCooldown,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
	
},

elements.conecap_mushroom_stalk = {
	alias:"Conocybe tenera",
	color: "#E0D3A7",
	excludeRandom: false,
    breakInto:"mycelium",
	behavior: [["XX","SP","XX"],["XX","XX","XX"],["XX","M1 AND CH:dirt,leaf_litter,infested_meat,meat,mud,moss>hyphae%1 AND SP","XX"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.conecap_mushroom_gill = {
	alias:"Conocybe tenera",
	color: ["#d2c28f","#A98256"],
	excludeRandom: false,
    breakInto:"mycelium",
	behavior: [["XX","CR:conecap_mushroom_cap%5 AND CR:conecap_mushroom_gill%1","XX"],["SA AND CR:conecap_mushroom_cap%5 AND CR:conecap_mushroom_gill%1","XX","SA AND CR:conecap_mushroom_cap%5 AND CR:conecap_mushroom_gill%1"],["CR:dirty_water%0.05","M1 AND SP","CR:dirty_water%0.05"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.conecap_mushroom_cap = {
	alias:"Conocybe tenera",
	color: ["#8D4A38","#EF7B19"],
	excludeRandom: false,
    breakInto:"mycelium",
	behavior: [["XX","XX","XX"],["SA","XX","SA"],["XX","M1","XX"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.green_spored_parasol_spore = {
	alias:"Chlorophyllum molybdites",
	color: "#59605A",
	excludeRandom: false,
	behavior: [["XX","M2%1.5","XX"],["XX","L2:green_spored_parasol_stalk,green_spored_parasol_stalk,green_spored_parasol_stalk,green_spored_parasol_ring AND C2:green_spored_parasol_gill%25","XX"],["XX","M1","XX"]],
	category: "ecosystem",
	cooldown: defaultCooldown,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.green_spored_parasol_stalk = {
	alias:"Chlorophyllum molybdites",
	color: "#897B5E",
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["XX","CH:dirt,leaf_litter%0.007","XX"],["XX","M1 AND CH:dirt,leaf_litter,mud,moss,water,dirty_water,infested_meat,meat,poison>hyphae%1 AND SP","XX"]],
	category: "ecosystem",
	state: "solid",
    breakInto:"mycelium",
    reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", chance:0.1}, 
		"disinfectant": { elem1: "stench", elem2: "stench", elem3: "mold", elem4: "dirt", elem5: "plague" },
	}
},

elements.green_spored_parasol_ring = {
	alias:"Chlorophyllum molybdites",
	color: ["#ABB5B6","#897B5E","#908D77","#59605A"],
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["CR:green_spored_parasol_cap%5 AND CR:green_spored_parasol_ring%1 AND SA","CH:dirt,leaf_litter%0.01","CR:green_spored_parasol_cap%5 AND CR:green_spored_parasol_ring%1 AND SA"],["CR:dirty_water%0.05","M1 AND SP","CR:dirty_water%0.05"]],
	category: "ecosystem",
	state: "solid",
    breakInto:"mycelium",
    reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", chance:0.1}, 
		"disinfectant": { elem1: "stench", elem2: "stench", elem3: "mold", elem4: "dirt", elem5: "green_spored_parasol_spore" },
	}
},

elements.green_spored_parasol_gill = {
	alias:"Chlorophyllum molybdites",
	color: ["#ABB5B6","#59605A","#908D77","#bbcbc2"],
	excludeRandom: false,
	behavior: [["XX","CR:green_spored_parasol_cap%2 AND CR:green_spored_parasol_gill%0.5","XX"],["SA AND CR:green_spored_parasol_gill%0.5 AND CR:green_spored_parasol_cap%2.5","CH:dirt,leaf_litter%0.01","SA AND CR:green_spored_parasol_gill%0.5 AND CR:green_spored_parasol_cap%2.5"],["CR:dirty_water,poison%0.05","M1 AND SP","CR:dirty_water,poison%0.05"]],
	category: "ecosystem",
    breakInto:"mycelium",
	state: "solid",
    reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", chance:0.1}, 
		"disinfectant": { elem1: "stench", elem2: "stench", elem3: "mold", elem4: "dirt", elem5: "plague" },
	}
},

elements.green_spored_parasol_cap = {
	alias:"Chlorophyllum molybdites",
	color: ["#D3CCBF","#BA9F8A"],
	excludeRandom: false,
    breakInto:"leaf_litter",
	behavior: [["XX","XX","XX"],["SA","CC:768b7b%1 AND CH:dirt,leaf_litter%0.01","SA"],["XX","M1","XX"]],
	category: "ecosystem",
	state: "solid",
    reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", chance:0.1}, 
		"disinfectant": { elem1: "stench", elem2: "stench", elem3: "mold", elem4: "dirt", elem5: "plague" },
	}
},

elements.meadow_mushroom_spore = {
	alias:"Agaricus campestris",
	color: "#817C86",
	excludeRandom: false,
	behavior: [["XX","M2%1.5","XX"],["XX","L2:meadow_mushroom_stalk AND C2:meadow_mushroom_gill%80","XX"],["XX","M1","XX"]],
	category: "ecosystem",
	isFood:true,
	cooldown: defaultCooldown,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.meadow_mushroom_stalk = {
	alias:"Agaricus campestris",
	color: "#CFD8E7",
	excludeRandom: false,
    breakInto:"mycelium",
	behavior: [["XX","SP","XX"],["XX","XX","XX"],["XX","M1 AND CH:dirt,leaf_litter,mud,moss>hyphae%1 AND SP","XX"]],
	category: "ecosystem",
	isFood:true,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.meadow_mushroom_gill = {
	alias:"Agaricus campestris",
	color: ["#623A34","#553736"],
    breakInto:"mycelium",
	excludeRandom: false,
	behavior: [["XX","CR:meadow_mushroom_cap%5 AND CR:meadow_mushroom_gill%1","XX"],["SA AND CR:meadow_mushroom_cap%5 AND CR:meadow_mushroom_gill%1","XX","SA AND CR:meadow_mushroom_cap%5 AND CR:meadow_mushroom_gill%1"],["CR:sugar%0.05","M1 AND SP","CR:sugar%0.05"]],
	category: "ecosystem",
	isFood:true,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.meadow_mushroom_cap = {
	alias:"Agaricus campestris",
	color: ["#ACC2E2","#8C96A2","#8A949F"],
	excludeRandom: false,
    breakInto:"leaf_litter",
	behavior: [["XX","CR:fragrance%0.1","XX"],["SA","XX","SA"],["XX","M1","XX"]],
	category: "ecosystem",
	isFood:true,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.amanita_muscaria_spore = {
	alias:"Amanita muscaria",
	color: "#FFAA85",
	excludeRandom: false,
	behavior: [["XX","M2%1.5","XX"],["XX","L2:amanita_muscaria_stalk AND C2:amanita_muscaria_gill","XX"],["M1","M1","M1"]],
	category: "ecosystem",
	cooldown: defaultCooldown,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.amanita_muscaria_stalk = {
	alias:"Amanita muscaria",
	color: "#CCB4A4",
	excludeRandom: false,
    breakInto:"mycelium",
	behavior: [["XX","SP","XX"],["XX","XX","XX"],["XX","M1 AND CH:dirt,leaf_litter,mud,infested_meat,meat,moss>hyphae%1 AND SP","XX"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.amanita_muscaria_gill = {
	alias:"Amanita muscaria",
	color: ["#e7cf80","#f3bf83"],
	excludeRandom: false,
    breakInto:"mycelium",
	behavior: [["XX","CR:amanita_muscaria_cap%5 AND CR:amanita_muscaria_gill%1","XX"],["SA AND CR:amanita_muscaria_cap%5 AND CR:amanita_muscaria_gill%1","XX","SA AND CR:amanita_muscaria_cap%5 AND CR:amanita_muscaria_gill%1"],["CR:dirty_water,dirty_water,dirty_water,poison%0.05","M1 AND SP","CR:dirty_water,dirty_water,dirty_water,poison%0.05"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.amanita_muscaria_cap = {
	alias:"Amanita muscaria",
	color: ["#CC2D00","#7E0400","#E9F0A3"],
	excludeRandom: false,
    breakInto:"mycelium",
	behavior: [["XX","XX","XX"],["SA","XX","SA"],["XX","M1","XX"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.amanita_parcivolvata_spore = {
	alias:"amanita parcivolvata",
	color: "#FFAA85",
	excludeRandom: false,
	behavior: [["XX","M2%1.5","XX"],["XX","L2:amanita_parcivolvata_stalk AND C2:amanita_parcivolvata_gill","XX"],["M1","M1","M1"]],
	category: "ecosystem",
	cooldown: defaultCooldown,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.amanita_parcivolvata_stalk = {
	alias:"amanita parcivolvata",
	color: "#CCB4A4",
	excludeRandom: false,
    breakInto:"mycelium",
	behavior: [["XX","SP","XX"],["XX","XX","XX"],["XX","M1 AND CH:dirt,leaf_litter,mud,moss,infested_meat,meat>hyphae%1 AND SP","XX"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.amanita_parcivolvata_gill = {
	alias:"amanita parcivolvata",
	color: ["#e7cf80","#f3bf83"],
	excludeRandom: false,
    breakInto:"mycelium",
	behavior: [["XX","CR:amanita_parcivolvata_cap%5 AND CR:amanita_parcivolvata_gill%1","XX"],["SA AND CR:amanita_parcivolvata_cap%5 AND CR:amanita_parcivolvata_gill%1","XX","SA AND CR:amanita_parcivolvata_cap%5 AND CR:amanita_parcivolvata_gill%1"],["CR:dirty_water,dirty_water,dirty_water,poison%0.05","M1 AND SP","CR:dirty_water,dirty_water,dirty_water,poison%0.05"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.amanita_parcivolvata_cap = {
	alias:"amanita parcivolvata",
	color: ["#CC2D00","#7E0400","#8D3E5A","#CB0F1C","#E9F0A3"],
	excludeRandom: false,
    breakInto:["mycelium","dirty_water","poison"],
	behavior: [["XX","XX","XX"],["SA","XX","SA"],["XX","M1","XX"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.giant_puffball_mushroom_spore = {
	alias:"Calvatia gigantea",
	color: "#817C86",
	excludeRandom: false,
	behavior: [["XX","M2%1.5","XX"],["XX","L2:giant_puffball_mushroom_ring AND C2:giant_puffball_mushroom_gill%80","XX"],["XX","M1","XX"]],
	category: "ecosystem",
	isFood:true,
	cooldown: defaultCooldown,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", chance:0.1}, 
	}
},

elements.giant_puffball_mushroom_gill = {
	alias:"Calvatia gigantea",
	color: ["#623A34","#553736"],
    breakInto:"mycelium",
	excludeRandom: false,
	behavior: [["XX","CR:giant_puffball_mushroom_cap%5 AND CR:giant_puffball_mushroom_gill%1","XX"],["SA AND CR:giant_puffball_mushroom_cap%5 AND CR:giant_puffball_mushroom_gill%1","XX","SA AND CR:giant_puffball_mushroom_cap%5 AND CR:giant_puffball_mushroom_gill%1"],["CR:sugar%0.05","M1 AND SP","CR:sugar%0.05"]],
	category: "ecosystem",
	isFood:true,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", chance:0.1}, 
	}
},

elements.giant_puffball_mushroom_ring = {
	alias:"Calvatia gigantea",
	color: ["#ABB5B6","#897B5E","#908D77","#59605A"],
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["CR:giant_puffball_mushroom_cap%5 AND CR:giant_puffball_mushroom_ring%1","XX","CR:giant_puffball_mushroom_cap%5 AND CR:giant_puffball_mushroom_ring%1"],["CR:fragrance%0.05","M1 AND SP","CR:dirty_water%0.05"]],
	category: "ecosystem",
	state: "solid",
    isFood:true,
    breakInto:"mycelium",
    reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", chance:0.1}, 
		"disinfectant": { elem1: "stench", elem2: "stench", elem3: "mold", elem4: "dirt", elem5: "green_spored_parasol_spore" },
	}
},

elements.giant_puffball_mushroom_cap = {
	alias:"Calvatia gigantea",
	color: ["#ACC2E2","#8C96A2","#8A949F"],
	excludeRandom: false,
    breakInto:"mycelium",
	behavior: [["XX","CR:fragrance%0.1","XX"],["SA","XX","SA"],["XX","M1","XX"]],
	category: "ecosystem",
	isFood:true,
	state: "solid",
	reactions: {
		"water": { elem1: "broth", elem2: "primordial_soup", elem3: "dirty_water", temp:80, chance:0.1}, 
	}
},

elements.disinfectant = {
    color: "#E2EAF4",
	excludeRandom: false,
	behavior: behaviors.FOAM,
	category: "ecosystem",
	state: "gas",
	stain: -1,
    density: 80,
	reactions: {
		"water": { elem1: "water", elem2: "seltzer"}
	}
};

elements.infested_meat = {
    color: ["#c5b880","#b8b165","#b89765"], 
	excludeRandom: false,
    behavior: [["XX","SP AND CR:fungi,mold,mold,mold,mushroom_spore%0.0175 AND CR:male_green_bottle_fly,green_bottle_fly_larva,green_bottle_fly_pupa%0.0047","XX"],["SP","CH:fungi,green_bottle_fly_larva,green_bottle_fly_egg%0.01","SP"],["XX","M1","XX"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"disinfectant": { elem1: "mushroom_spore", elem2: "female_green_bottle_fly", elem3: "mold", elem4: "dirt", elem5: "plague" },
	}
},

elements.garbage_bag = {
    color: "#4B4B4B",
	excludeRandom: false,
	behavior: [["XX","CH:meat,rotten_meat,frozen_meat,salt,sugar,flour,egg,hard_yolk,rotten_cheese,cheese_powder,grape,herb,lettuce,pickle,banana,mashed_banana,rotten_banana,dirt,mud,juice,dead_bug,>stench","XX"],["XX","XX","XX"],["M1","M1","M1"]],
	category: "ecosystem",
	state: "solid",
    burn: .01,
    burnTime: 300,
    burnInto: "molten_plastic",
	reactions: {
		"meat": { elem1: "garbage" },
        "rotten_meat": { elem1: "garbage" },
        "frozen_meat": { elem1: "garbage" },
        "infested_meat": {elem1: "garbage"},
        "salt": { elem1: "garbage" },
        "sugar": { elem1: "garbage" },
        "flour": { elem1: "garbage" },
        "egg": { elem1: "garbage" },
        "hard_yolk": { elem1: "garbage" },
        "rotten_cheese": { elem1: "garbage" },
        "cheese_powder": { elem1: "garbage" },
        "grape": { elem1: "garbage" },
        "herb": { elem1: "garbage" },
        "lettuce": { elem1: "garbage" },
        "pickle": { elem1: "garbage" },
	}
},

elements.garbage = {
	color: "#4B4A4B",
	excludeRandom: false,
	behavior: [["XX","CR:stench%0.1","XX"],["SP%20 AND CR:garbage_juice%0.1 AND CH:water>dirty_water,garbage_juice%1","CH:green_bottle_fly_larva%0.007","SP%20 AND CR:garbage_juice%0.1 AND CH:water>dirty_water,garbage_juice%1"],["M1%0.1","M1","M1%0.1"]],
	breakInto:"green_bottle_fly_larva",
    category: "ecosystem",
	state: "solid",
    burn: .01,
    burnTime: 300,
    burnInto: "ash",
	reactions: {
		"fire": { elem1: "ash", elem2: "female_green_bottle_fly", elem3: "green_bottle_fly_larva", elem4: "green_bottle_fly_egg" },
	}
},

elements.garbage_juice = {
	color: ["#6B7A1A", "#60742E", "#5E823C"],
	excludeRandom: false,
	behavior: behaviors.LIQUID,
    stain:0.125,
    density: 977,
    conduct: 0.8,
    category: "ecosystem",
	state: "liquid",
    reactions: {
		"disinfectant": { elem1: "dirty_water", elem2: "stench"},
	}
},



elements.banana = {
	color: ["#FCE47D","#EEC758"],
	excludeRandom: false,
	behavior: [["ST:banana_leaf,banana_penducle_2,banana_peduncle_1%70","ST:banana_leaf,banana_penducle_2,banana_peduncle_1","ST:banana_leaf,banana_penducle_2,banana_peduncle_1"],["ST:banana_leaf,banana_penducle_2,banana_peduncle_1","CH:rotten_banana%0.005","ST:banana_leaf,banana_penducle_2,banana_peduncle_1"],["M2","M1","M2"]],
	category: "ecosystem",
    breakInto:["mashed_banana","juice","fertilized_banana_seed"],
    breakIntoColor: "#D4A930", 
    isFood: true,
	state: "solid",
	reactions: {
		"dirty_water": { elem1: "rotten_banana" },
	}
},

elements.mashed_banana = {
	color: ["#FCE47D","#D4A930"],
	excludeRandom: false,
	behavior: [["XX","CR:juice%0.01","XX"],["ST%75 AND M1%20","Ch:mold%0.015","ST%75 AND M1%20"],["M1","M1","M1"]],
	category: "ecosystem",
	state: "solid",
    isFood:true,
    reactions: {
        "yogurt": { elem1: "yogurt" },
        "milk": {elem1: "fruit_milk"},
    }
},

elements.rotten_banana = {
	color: ["#7e7c29","#64571c","#4a3e16"],
	excludeRandom: false,
	behavior: [["XX","ST:vine AND CR:juice%0.01 AND CR:green_bottle_fly_egg,fruitfly_egg%0.0085 AND SP","XX"],["ST:vine AND SP","CH:dirt%0.1","ST:vine AND SP"],["M2","M1","M2"]],
	category: "ecosystem",
    breakInto:"mashed_banana",
	state: "solid",
    isFood:true,
	reactions: {
		"disinfectant": { elem1: "fertilized_banana_seed" },
        "worm": { elem1: "fertilized_banana_seed", elem2: "mold"},
        "green_bottle_fly_larva": { elem1: "dirt", elem2: "mold"},
        "fruitfly_larva": { elem1: "dirt", elem2: "mold"},
	}
},

elements.banana_seed = {
	color: ["#5f5d53","#423924"],
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["XX","CH:banana_seed>mold,fertilized_banana_seed%0.1","XX"],["M2%1","M1","M2%1"]],
	category: "ecosystem",
	state: "solid",
    isFood:true,
    reactions: {
        "milk": {elem1: "fruit_milk", chance:3},
    }
},

elements.fertilized_banana_seed = {
	color: "#4d4a3b",
	excludeRandom: false,
	behavior: [
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|SW:banana_pseudostem AND CR:banana_pseudostem%1|XX|XX`,
        `XX|XX|LB:banana_pseudostem,banana_pseudostem_2 AND CH:banana_plant_top%0.05|XX|XX`,
        `XX|XX|CH:dirt>root,fiber|XX|XX`,
        `XX|XX|CH:dirt>root,fiber|XX|XX`,
        `XX|CH:dirt>root,fiber|CH:dirt>root,fiber|CH:dirt>root,fiber|XX`
    ],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"water": { elem1: "fertilized_banana_seed", elem2: "fertilized_banana_seed", elem3: "mold", elem4: "fertilized_banana_seed" },
	}
},

elements.banana_pseudostem = {
	color: ["#afb845","#a7dc6b","#b4be44"],
	excludeRandom: false,
	behavior: [
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|CR:banana_peduncle_1%0.5|CH:dirt%0.001|CR:banana_peduncle_1%0.5|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`
    ],
	category: "ecosystem",
	state: "solid",
    breakInto:"sap",
    breakIntoColor:"#f2e477",
},

elements.banana_pseudostem_2 = {
    name: "banana_pseudostem",
	color: ["#afb845","#a7dc6b","#b4be44"],
	excludeRandom: false,
	behavior: [
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|CR:banana_peduncle_1%0.5|CH:dirt%0.001|CR:banana_peduncle_1%0.5|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`
    ],
	category: "ecosystem",
	state: "solid",
    breakInto:"sap",
    breakIntoColor:"#f2e477",
},

elements.banana_plant_top = {
	color: ["#e5f56c"],
	excludeRandom: false,
	behavior: [
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|CR:banana_leaf%0.5|CH:dirt%0.001|CR:banana_leaf%0.5|XX`,
        `CR:banana_leaf%0.5|CR:banana%0.01|XX|CR:banana0.01|CR:banana_leaf%0.5`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`
    ],
	category: "ecosystem",
	state: "solid",
    breakInto:"sap",
    breakIntoColor:"#f2e477",
},

elements.banana_leaf = {
	color: ["#8cb845","#addc6b","#a0be44"],
	excludeRandom: false,
	behavior: [
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|SA:banana_leaf|XX|SA:banana_leaf|XX`,
        `XX|SA:banana_leaf|CH:fertilized_banana_seed%0.001|SA:banana_leaf|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`
    ],
	category: "ecosystem",
	state: "solid",
    breakInto:"sap",
    breakIntoColor:"#f2e477",
	reactions: {
		"water": { elem1: "fertilized_banana_seed", elem2: "fertilized_banana_seed", elem3: "mold", elem4: "fertilized_banana_seed" },
	}
},

elements.banana_peduncle_1 = {
	color: ["#d7eb42","#e5f56c","#a0be44"],
    name:"banana_peduncle-offshoot",
	excludeRandom: false,
	behavior: [
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|CR:banana_peduncle_1%0.0022 AND CH:banana_peduncle_2%0.5|CH:dirt%0.001|CR:banana_peduncle_1,banana_peduncle_2%0.5|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`
    ],
	category: "ecosystem",
	state: "solid",
    breakInto:"sap",
    breakIntoColor:"#f2e477",
},

elements.banana_peduncle_2 = {
	color: ["#8cb845","#addc6b","#a0be44"],
    name:"banana_peduncle-hanging",
	excludeRandom: false,
	behavior: [
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|CR:banana%0.5|CH:dirt,fertilized_banana_seed%0.001|CR:banana%0.5|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`,
        `XX|XX|XX|XX|XX`
    ],
	category: "ecosystem",
	state: "solid",
    breakInto:"fertilized_banana_seed",
    breakIntoColor:"#f2e477",
	reactions: {
		"water": { elem1: "fertilized_banana_seed", elem2: "fertilized_banana_seed", elem3: "mold", elem4: "fertilized_banana_seed" },
	}
},

elements.mold = {
	color: ["#6B7A1A", "#60742E", "#5E823C"],
	excludeRandom: false,
	behavior: [["CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07","SP","CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07"],["CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07","CH:dirt%0.001","CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07"],["M1 AND CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07","M1","M1 AND CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07"]],
	category: "ecosystem",
	state: "solid",
	reactions: {
		"disinfectant": { elem1: "dirt", elem2: "fruitfly_egg", elem3: "stench", elem4: "fruitfly_larva", elem5: "mold", elem6: "mold" },
	}
},

elements.bug = {
	color: "#FFFFFF",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["XX","CH:male_green_bottle_fly,crawl_male_green_bottle_fly,female_green_bottle_fly,male_fruitfly,crawl_female_green_bottle_fly,green_bottle_fly_pupa,female_fruitfly,worker_leafcutter_ant,queen_leafcuttter_ant,female_ladybird_beetle,male_ladybird_beetle,female_springtail,male_springtail,bold_jumping_spiderling,male_bold_jumping_spiderling,female_bold_jumping_spiderling,","XX"],["XX","XX","XX"]],
	category: "ecosystem",
	cooldown: defaultCooldown,
	state: "solid",
	
},

elements.fungi = {
	color: "#FFFFFF",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["XX","CH:mushroom_spore,conecap_mushroom_spore,green_spored_parasol_spore,meadow_mushroom_spore,meadow_mushroom_spore,meadow_mushroom_spore,giant_puffball_mushroom_spore,amanita_muscaria_spore,amanita_parcivolvata_spore","XX"],["XX","XX","XX"]],
	category: "ecosystem",
	cooldown: defaultCooldown,
	state: "solid",
	
},

worldgentypes.fungi_ecosystem = {
    layers: [
        [0.50, "dirt"],
        [0.25, "rock"],
        [0.10, "basalt"],
    ],
    decor: [ // [element, chance, distance from top]
        ["female_springtail", 0.08],
        ["ant", 0.08],
        ["tuff", 0],
		["leaf_litter", 0],
		["fungi", 0.067, 10]
    ],
    baseHeight: 0.5,
},
worldgentypes.insect_ecosystem = {
    layers: [
        [0.95, "grass"],
        [0.50, "dirt"],
        [0.05, "rock"],
        [0, "basalt"],
    ],
    decor: [ // [element, chance, distance from top]
        ["bee", 0.08],
        ["bug", 0.08],
        ["bird", 0.025, 10],
        ["mushroom_spore", 0.02, 10],
        ["banana_seed", 0.02, 10],
        ["flower_seed", 0.02, 10],
        ["tuff", 0],
		["leaf_litter", 0],
		["fungi",0]
    ],
    baseHeight: 0.5,
}


