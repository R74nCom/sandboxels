//update 0: Variety Mod!
//update 1: First Update!
//update 2: Moss Update
//update 3: hello_world
//Update 4: Fly Update
//update 5: Maggots and Eggs Update
//update 6: Disinfectant Update
//update 7: hello_world_2
//update 8: Infested Meat Update (scrapped)
//update 9: Zombie Update
//update 10: Bananas Update! (scrapped)
//update 11: Garbage Update (scrapped)
//update 12: Strange Update
//update 12.5: Strange Fix
//update 13: Big Update
//update 14: Garbage and Flies!
//update 15: Compilation (scrapped)
//update 16: Fruit and Flies
//update 17: Mold
//update 18: Updated Flies!
//update 19: Creepy Crawlies AND Rot
//update 20: Chess in Sandboxels?
var chess = ["chess_knight","chess_pawn","chess_rook","chess_queen","chess_bishop"];
elements.moss = {
    //debut: update 2
    color: ["#6B7A1A", "#60742E", "#5E823C"],
	excludeRandom: false,
    behavior: [
    ["XX","SA","XX"],
    ["SA AND CL%0.2","XX","SA AND CL%0.2"],
    ["CL%0.2","M1 AND SA","CL%0.2"]
],
category: "variety_mod",
state: "solid",
tempHigh: 55,
stateHigh: "grass",
tempLow: -20,
stateLow: "ice"
},

elements.hello_world = {
	//debut: update 3
    color: "#ff0000",
    desc:"If you see this, just know the upload worked, and you can use the Variety Mod!",
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["SP","CH:random%0.1","SP"],["M1","M1","M1"]],
	category: "land",
	state: "solid",
	reactions: {
		"water": { elem1: "male_fly", elem2: "female_fly", elem3: "fly_egg", elem4: "fly_larva" },
	}
},

elements.female_fly = {
	//debut: update 4
    alias: "Lucilia sericata",
    color: "#474f48",
	excludeRandom: false,
	behavior: [["M1%20 AND ST:web","XX","M1%20 AND ST:web"],["M1%20 AND ST:web","CH:female_fly>dead_insect%0.01 AND CH:crawl_female_fly%0.06","M1%20 AND ST:web"],["M1%20 AND ST:web","CR:fly_egg%0.06 AND ST:web AND CH:meat,rotten_meat,fat,broth,grease>undefined,fly_egg%0.1","M1%20 AND ST:web"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "dead_insect",
	reactions: {
		"disinfectant": { elem1: "dead_insect", elem2: "ammonia", elem3: "stench"},
	},
    density:35,
    burn: .01,
    burnTime: 150,
    burnInto: ["dead_insect","dirt"],
	tempHigh: 100,
	stateHigh:"dead_insect",
	tempLow: 10,
	stateLow: "ice",
},

elements.male_fly = {
	//debut: update 14
    alias: "Lucilia sericata",
    color: "#4B4B4B",
	excludeRandom: false,
	behavior: [["M1 AND ST:web","M2 AND ST:web","M1 AND ST:web"],["M2 AND ST:web","CH:dead_insect%0.01 AND CH:crawl_male_fly%0.06","M2 AND ST:web"],["M1 AND ST:web","M2 AND ST:web AND CH:meat,rotten_meat,fat,broth,grease>undefined","M1 AND ST:web"]],
	category: "variety_mod",
    breakInto:"slime",
    breakIntoColor: "#D4A930",
	state: "solid",
    density: 30,
    burn: .01,
    burnTime: 150,
    burnInto: ["dead_insect","dirt"],
	reactions: {
		"disinfectant": { elem1: "dead_insect", elem2: "dead_insect"},
	}
},

elements.fly_egg = {
	//debut: update 5
    color: "#E2EAF4",
	excludeRandom: false,
	behavior: [["XX","ST","XX"],["ST","CH:fly_larva%0.036","ST"],["M1","M1 AND ST","M1"]],
	category: "variety_mod",
	state: "solid",
	breakInto: ["slime","fly_larva","female_fly"],
		reactions: {
		"disinfectant": { elem1: "dead_insect", elem2: "ammonia", elem3: "stench"},
		"growth_Serum": { elem1: "fly_larva", elem2: "female_fly", elem3: "female_fly"}
	}
},

elements.fly_larva = {
	//debut:update 16
    color: "#F0EEE8",
    alias: "Lucilia sericata Larva",
	excludeRandom: false,
	behavior: [["M2%10 AND SA%50","SA%50 AND SW: fly_larva,fly_egg,meat,rotten_meat,infested_meat%0.1","M2%10 AND SA%50"],["M2%50 AND CH:meat,rotten_meat,infested_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,garbage_juice,banana,mashed_banana,rotten_banana>stench,stench,stench,plague%0.1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","CC: #F9E6D4%0.08 AND CH:fly_pupae%0.05,CR:stench%10","M2%50 AND CH:meat,rotten_meat,infested_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,banana,mashed_banana,rotten_banana>stench,plaque%0.1 AND CH:meat,rotten_meat,fat,broth,grease>undefined"],["M1 AND CH:meat>rotten_meat%1","M1 AND CH:meat,rotten_meat,infested_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,>stench,plaque AND CH:cheese,cheese_powder,melted_cheese>rotten_cheese AND CH:meat,rotten_meat,fat,broth,grease>undefined","M1"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "slime",
    breakIntoColor: "#f1efe9",
    density: 150,
	tempHigh: 80,
	stateHigh: "female_fly",
	reactions: {
		"disinfectant": { elem1: "stench", elem2: "ammonia", elem3: "stench"},
		"growth_Serum": {elem1: "female_fly", elem2: "female_fly"}
	}
},

elements.fly_pupae = {
    //debut:update 18
    alias: "Lucilia sericata pupae",
	color: "#B1834D",
    breakInto:"slime",
    breakIntoColor: "#D4A930",
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["SP","CH:crawl_male_fly,crawl_female_fly%0.006 AND CC:#5D5247%0.01","SP"],["M1","M1","M1"]],
	category: "variety_mod",
    density: 80,
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_insect", elem3:"dirt"}
    }
},

elements.crawl_male_fly = {
    //update 19
    alias: "Lucilia sericata",
	color: "#5D5247",
	excludeRandom: false,
	behavior: [["M2%0.5 AND ST:web","XX","M2%0.5 AND ST:web"],["M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","CH:male_fly%0.06","M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined"],["ST:web","M1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","ST:web"]],
	category: "variety_mod",
    breakInto:"slime",
    breakIntoColor: "#D4A930",
    density:30,
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_insect", elem3:"dirt"}
    }
},

elements.crawl_female_fly = {
    //update 19
    alias: "Lucilia sericata",
	color: "#5D5247",
	excludeRandom: false,
	behavior: [["M2%0.5 AND ST:web","XX","M2%0.5 AND ST:web"],["M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined AND CR:fly_egg%0.01","CH:female_fly%0.06","M2%1 AND CH:meat,rotten_meat,fat,broth,grease>undefined AND CR:fly_egg%0.1"],["ST:web","M1 AND CH:meat,rotten_meat,fat,broth,grease>undefined","ST:web"]],
	category: "variety_mod",
    breakInto:"slime",
    breakIntoColor: "#D4A930",
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_insect", elem3:"dirt"}
    }
},
elements.female_fruitfly = {
//debut: update 16
    color: "#EEC758",
    alias: "Drosophila Melanogaster",
	excludeRandom: false,
	behavior: [["M1%20","SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana,dirt,mold%10","M1%20"],["M1%20","CH:female_fruitfly>dead_insect%0.01","M1%20"],["M1%20","CR:fruitfly_egg%0.06","M1%20"]],
	category: "variety_mod",
	state: "solid",
	breakInto: ["dead_insect","fruitfly_egg"],
	reactions: {
		"disinfectant": { elem1: "dead_insect", elem2: "dead_insect", elem3: "stench"},
	},
    burn: .01,
    burnTime: 10,
    burnInto:["dead_insect","dirt"],
	tempHigh: 100,
	stateHigh:"dead_insect",
	tempLow: 10,
	stateLow: "ice",
},

elements.male_fruitfly = {
	//debut: update 16
    color: "#D4A930",
    alias: "Drosophila Melanogaster",
	excludeRandom: false,
	behavior: [["M1","M2 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana,dirt,mold"%10,"M1"],["M2","CH:dead_insect%0.01","M2"],["M1","M2","M1"]],
	category: "variety_mod",
    breakInto:"dead_bug",
    burn: .01,
    burnTime: 10,
    burnInto:["dead_insect","dirt"],
	state: "solid",
	reactions: {
		"disinfectant": { elem1: "dead_insect", elem2: "dead_insect"},
	}
},

elements.fruitfly_egg = {
	//debut: update 16
    color: "#E2EAF4",
    alias: "Drosophila Melanogaster Egg",
	excludeRandom: false,
	behavior: [["XX","ST","XX"],["ST","CH:fruitfly_larva%0.018","ST"],["M1","M1 AND ST","M1"]],
	category: "variety_mod",
	state: "solid",
	breakInto: ["slime","fly_larva","female_fruitfly"],
		reactions: {
		"disinfectant": { elem1: "plague", elem2: "slime", elem3: "stench"},
		"growth_Serum": { elem1: "fruitfly_larva", elem2: "female_fruitfly", elem3: "female_fruitfly"}
	}
},

elements.fruitfly_larva = {
	//debut:update 16
    color: "#F0EEE8",
    alias: "Drosophila Melanogaster Larva",
	excludeRandom: false,
	behavior: [["M2%10 AND SA%50 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana%10","SA%50","M2%10 AND SA%50 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana"],["M2%50 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana,mashed_banana,rotten_banana>stench,stench,stench,plague%0.1","CH:fruitfly_pupae%0.05,CR:stench%10","M2%50 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana>stench,plaque%0.1"],["M1 AND CH:banana>rotten_banana%1 AND SW:grape,juice,banana,mashed_banana,rotten_banana","M1 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana>stench,plaque%0.1 AND CH:cheese,cheese_powder,melted_cheese>rotten_cheese AND CH:banana>rotten_banana,mashed_banana%0.01","M1 AND SW:grape,juice,banana,mashed_banana,rotten_banana"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "slime",
    breakIntoColor: "#f8f6f0",
	tempHigh: 80,
	stateHigh: "female_fruitfly",
	reactions: {
		"disinfectant": { elem1: "stench", elem2: "plague", elem3: "stench"},
		"growth_Serum": {elem1: "female_fruitfly", elem2: "female_fruitfly"}
	}
},

elements.fruitfly_pupae = {
    //update 18
	color: "#CBAD91",
    alias: "Drosophila Melanogaster pupae",
    breakInto:"slime",
    breakIntoColor: "#D4A930",
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["SP","CH:crawl_fly%0.006 AND CC:#5D5247%0.01","SP"],["M1","M1","M1"]],
	category: "variety_mod",
	state: "solid"
},

elements.crawl_fruitfly = {
    //update 18
    alias: "Drosophila Melanogaster",
	color: "#64571c",
    breakInto:"slime",
    breakIntoColor: "#D4A930",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["M2%2","CH:male_fly,female_fly%0.004","M2%2"],["M1","M1","M1"]],
	category: "variety_mod",
	state: "solid",

},

elements.dead_insect = {
    //debut: update 16
	color: "#4B4A4B",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["XX","CH:dirt%0.1","XX"],["M1","M1 AND SA","M1"]],
	category: "variety_mod",
	state: "solid",
    density: 90,
	reactions: {
		"disinfectant": { elem1: "dirt"},
	}
},



elements.disinfectant = {
	//debut: update 6
    color: "#E2EAF4",
	excludeRandom: false,
	behavior: behaviors.FOAM,
	category: "variety_mod",
	state: "gas",
	stain: -1,
    density: 80,
	reactions: {
		"water": { elem1: "water", elem2: "seltzer"}
	}
};

elements.infested_meat = {
    //update1 19
    color: ["#c5b880","#b8b165","#b89765"], 
	excludeRandom: false,
	desc:"I HATE ROTTEN_MEAT ITS JUST A MESS!!! JUST USE INFESTED_MEAT INSTEADDD!!!! ITS NOT MESSY AT ALLLLLL!!!!11",
    behavior: [["XX","SP AND CR:mushroom_spore,mushroom_gill,mold,mold,mold,mushroom_spore%0.0175 AND CR:male_fly,fly_larva,fly_pupa%0.0047","XX"],["SP","CH:mushroom_spore,fly_larva,fly_egg%0.01","SP"],["XX","M1","XX"]],
	category: "variety_mod",
	state: "solid",
	reactions: {
		"disinfectant": { elem1: "mushroom_spore", elem2: "female_fly", elem3: "mold", elem4: "dirt", elem5: "rot" },
	}
},

elements.rot = {
	//debut: update 19
    color: ["#637865","#6AB066","#3EA346"],
	excludeRandom: false,
	behavior: [["M1 AND CH:head,body>blood,antibody,infection,rotten_meat,cooked_meat,infested_meat,zombie,bone,bone_marrow,skin,plague,stench,liquid_stench AND CH:skin,head,bodyrat,bird,fish,meat,rotten_meat,cured_meat,cooked_meat>infested_meat,mold,mushroom_spore AND CH:banana,mashed_banana>rotten_banana,mold AND CH: cheese,melted_cheese,cheese_powder>rotten_cheese,mold,dirt AND CH:water,salt_water,sugar_water,seltzer,acid,neutral_acid>neutral_acid,stench,plaque,liquid_stench,liquid_stench,liquid_stench,liquid_stench AND CH:fly>crawl_male_fly, crawl_female_fly","M1 AND CH:head,body>blood,antibody,infection,rotten_meat,cooked_meat,infested_meat,zombie,bone,bone_marrow,skin,plague,stench,liquid_stench AND CH:skin,head,bodyrat,bird,fish,meat,rotten_meat,cured_meat,cooked_meat>infested_meat,mold,mushroom_spore AND CH:banana,mashed_banana>rotten_banana,mold AND CH: cheese,melted_cheese,cheese_powder>rotten_cheese,mold,dirt AND CH:water,salt_water,sugar_water,seltzer,acid,neutral_acid>neutral_acid,stench,plaque,liquid_stench,liquid_stench,liquid_stench,liquid_stench AND CH:fly>crawl_male_fly, crawl_female_fly","M1 AND CH:head,body>blood,antibody,infection,rotten_meat,cooked_meat,infested_meat,zombie,bone,bone_marrow,skin,plague,stench,liquid_stench AND CH:skin,head,bodyrat,bird,fish,meat,rotten_meat,cured_meat,cooked_meat>infested_meat,mold,mushroom_spore AND CH:banana,mashed_banana>rotten_banana,mold AND CH: cheese,melted_cheese,cheese_powder>rotten_cheese,mold,dirt AND CH:water,salt_water,sugar_water,seltzer,acid,neutral_acid>neutral_acid,stench,plaque,liquid_stench,liquid_stench,liquid_stench,liquid_stench AND CH:fly>crawl_male_fly, crawl_female_fly"],["M1 AND CH:head,body>blood,antibody,infection,rotten_meat,cooked_meat,infested_meat,zombie,bone,bone_marrow,skin,plague,stench,liquid_stench AND CH:skin,head,bodyrat,bird,fish,meat,rotten_meat,cured_meat,cooked_meat>infested_meat,mold,mushroom_spore AND CH:banana,mashed_banana>rotten_banana,mold AND CH: cheese,melted_cheese,cheese_powder>rotten_cheese,mold,dirt AND CH:water,salt_water,sugar_water,seltzer,acid,neutral_acid>neutral_acid,stench,plaque,liquid_stench,liquid_stench,liquid_stench,liquid_stench AND CH:fly>crawl_male_fly, crawl_female_fly","DE%0.01","M1 AND CH:head,body>blood,antibody,infection,rotten_meat,cooked_meat,infested_meat,zombie,bone,bone_marrow,skin,plague,stench,liquid_stench AND CH:skin,head,bodyrat,bird,fish,meat,rotten_meat,cured_meat,cooked_meat>infested_meat,mold,mushroom_spore AND CH:banana,mashed_banana>rotten_banana,mold AND CH: cheese,melted_cheese,cheese_powder>rotten_cheese,mold,dirt AND CH:water,salt_water,sugar_water,seltzer,acid,neutral_acid>neutral_acid,stench,plaque,liquid_stench,liquid_stench,liquid_stench,liquid_stench AND CH:fly>crawl_male_fly, crawl_female_fly"],["M1 AND CH:head,body>blood,antibody,infection,rotten_meat,cooked_meat,infested_meat,zombie,bone,bone_marrow,skin,plague,stench,liquid_stench AND CH:skin,head,bodyrat,bird,fish,meat,rotten_meat,cured_meat,cooked_meat>infested_meat,mold,mushroom_spore AND CH:banana,mashed_banana>rotten_banana,mold AND CH: cheese,melted_cheese,cheese_powder>rotten_cheese,mold,dirt AND CH:water,salt_water,sugar_water,seltzer,acid,neutral_acid>neutral_acid,stench,plaque,liquid_stench,liquid_stench,liquid_stench,liquid_stench AND CH:fly>crawl_male_fly, crawl_female_fly","M1 AND CH:head,body>blood,antibody,infection,rotten_meat,cooked_meat,infested_meat,zombie,bone,bone_marrow,skin,plague,stench,liquid_stench AND CH:skin,head,bodyrat,bird,fish,meat,rotten_meat,cured_meat,cooked_meat>infested_meat,mold,mushroom_spore AND CH:banana,mashed_banana>rotten_banana,mold AND CH: cheese,melted_cheese,cheese_powder>rotten_cheese,mold,dirt AND CH:water,salt_water,sugar_water,seltzer,acid,neutral_acid>neutral_acid,stench,plaque,liquid_stench,liquid_stench,liquid_stench,liquid_stench AND CH:fly>crawl_male_fly, crawl_female_fly","M1 AND CH:head,body>blood,antibody,infection,rotten_meat,cooked_meat,infested_meat,zombie,bone,bone_marrow,skin,plague,stench,liquid_stench AND CH:skin,head,bodyrat,bird,fish,meat,rotten_meat,cured_meat,cooked_meat>infested_meat,mold,mushroom_spore AND CH:banana,mashed_banana>rotten_banana,mold AND CH: cheese,melted_cheese,cheese_powder>rotten_cheese,mold,dirt AND CH:water,salt_water,sugar_water,seltzer,acid,neutral_acid>neutral_acid,stench,plaque,liquid_stench,liquid_stench,liquid_stench,liquid_stench AND CH:fly>crawl_male_fly, crawl_female_fly"]],
	category: "variety_mod",
	state: "gas",
	stain: -1,
    density: 80,
	reactions: {
		"water": { elem1: "stench", elem2: "liquid_stench"}
	}
};

elements.stench_nuke = {
	color: "#548984",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["XX","EX:8>stench,liquid_stench,rad_cloud,rot%0.01","XX"],["XX","M1 AND EX:8>stench,liquid_stench,rad_cloud,rot","XX"]],
	category: "variety_mod",
	state: "solid",
	reactions: {
		"water": { elem1: "liquid_stench", elem2: "acid", elem3: "neutral_acid", elem4: "stench" },
	}
},

elements.garbage_bag = {
	//debut: update 14(failed debut: update 11)
    color: "#4B4B4B",
	excludeRandom: false,
	behavior: [["XX","CH:meat,rotten_meat,frozen_meat,salt,sugar,flour,egg,hard_yolk,rotten_cheese,cheese_powder,grape,herb,lettuce,pickle,banana,mashed_banana,rotten_banana,dirt,mud,juice,dead_bug,>stench","XX"],["XX","XX","XX"],["M1","M1","M1"]],
	category: "variety_mod",
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
    //debut: update 14(failed debut: update 11)
	color: "#4B4A4B",
	excludeRandom: false,
	behavior: [["XX","CR:stench%0.1","XX"],["SP%20 AND CR:garbage_juice%0.1 AND CH:water>dirty_water,garbage_juice%1","CH:fly_larva%0.007","SP%20 AND CR:garbage_juice%0.1 AND CH:water>dirty_water,garbage_juice%1"],["M1","M1","M1"]],
	breakInto:"fly_larva",
    category: "variety_mod",
	state: "solid",
    burn: .01,
    burnTime: 300,
    burnInto: "ash",
	reactions: {
		"fire": { elem1: "ash", elem2: "female_fly", elem3: "fly_larva", elem4: "fly_egg" },
	}
},

elements.garbage_juice = {
    //debut: update 14(failed debut: update 11)
	color: ["#6B7A1A", "#60742E", "#5E823C"],
	excludeRandom: false,
	behavior: behaviors.LIQUID,
    stain:0.125,
    density: 977,
    conduct: 0.8,
    category: "variety_mod",
	state: "liquid",
    reactions: {
		"disinfectant": { elem1: "dirty_water", elem2: "stench"},
	}
},

elements.banana = {
    //debut:update 16
	color: ["#FCE47D","#EEC758"],
	excludeRandom: false,
	behavior: [["XX","ST:vine","XX"],["ST:vine","CH:rotten_banana%0.005","ST:vine"],["M2 AND ","M1","M2"]],
	category: "variety_mod",
    breakInto:["mashed_banana","juice"],
    breakIntoColor: "#D4A930",
    isFood: true,
	state: "solid",
	reactions: {
		"dirty_water": { elem1: "rotten_banana" },
	}
},

elements.mashed_banana = {
    //debut:update 16
	color: ["#FCE47D","#D4A930"],
	excludeRandom: false,
	behavior: [["XX","CR:juice%0.01","XX"],["ST%75 AND M1%20","Ch:mold%0.015","ST%75 AND M1%20"],["M1","M1","M1"]],
	category: "variety_mod",
	state: "solid",
    isFood:true,
    reactions: {
        "yogurt": { elem1: "yogurt" },
        "milk": {elem1: "fruit_milk"},
    }
},

elements.rotten_banana = {
    //debut:update16
	color: ["#7e7c29","#64571c","#4a3e16"],
	excludeRandom: false,
	behavior: [["XX","ST:vine AND CR:juice%0.01 AND CR:fly_egg,fruitfly_egg%0.0085 AND SP","XX"],["ST:vine AND SP","CH:dirt%0.1","ST:vine AND SP"],["M2","M1","M2"]],
	category: "variety_mod",
    breakInto:"mashed_banana",
	state: "solid",
    isFood:true,
	reactions: {
		"disinfectant": { elem1: "mold" },
        "worm": { elem1: "dirt", elem2: "mold"},
        "fly_larva": { elem1: "dirt", elem2: "mold"},
        "fruitfly_larva": { elem1: "dirt", elem2: "mold"},
	}
},

elements.mold = {
    //debut:update 17
	color: ["#6B7A1A", "#60742E", "#5E823C"],
	excludeRandom: false,
	behavior: [["CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07","SP","CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07"],["CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07","CH:dirt%0.001","CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07"],["M1 AND CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07","M1","M1 AND CH:rotten_meat,rotten_cheese,rotten_banana>mold%0.07"]],
	category: "variety_mod",
	state: "solid",
	reactions: {
		"disinfectant": { elem1: "dirt", elem2: "fruitfly_egg", elem3: "stench", elem4: "fruitfly_larva", elem5: "mold", elem6: "mold" },
	}
},

elements.zombie = {
    //debut: update 9
	hidden: false,
    color: ["#75816B","#4D6B53"],
    category: "variety_mod",
    properties: {
        dead: false,
        dir: 1,
        panic: 1
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("z_body", pixel.x, pixel.y+1);
            pixel.element = "z_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("z_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "z_body";
        }   
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["z_body","z_head"],
    cooldown: defaultCooldown
},

elements.z_head = {
    //debut: update 9
    hidden: true,
	color: ["#75816B","#4D6B53"],
    category: "variety_mod",
	breakInto: ["rotten_meat","bone","bone","blood"],
	properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "z_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("infection", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1; }
        else if (pixel.temp < 37) { pixel.temp += 1; }
    },
    density: 1030,
    state: "solid",
    conduct: .05,
    tempHigh: 250,
    stateHigh: "rotten_meat",
    burn: .01,
    burnTime: 200,
    burnInto: "rotten_meat",
    reactions: {
		"head": { elem2 : "z_head" , chance:1.0 },
        "body": { elem2 : "z_body" , chance:1.0 },
		"disinfectant": {elem1:"head"},
    },
},

elements.z_body = {
    //debut: update 9
    hidden: true,
	color: ["#5DE2E7","#047e99","#7f5fb0"],
    category: "variety_mod",
	 breakInto: ["rotten_meat","rotten_meat","bone","blood"],
	 properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "z_head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into bone if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "z_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else { var head = null }
        if (pixel.burning) {
            pixel.panic += 0.1;
            if (head && pixelTicks-pixel.burnStart > 240) {
                pixel.color = head.color;
            }
        }
        else if (pixel.panic > 0) {
            pixel.panic -= 0.1;
        }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1 && !pixel.charge) {
                createPixel("infection", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    var origx = pixel.x+move[0];
                    var origy = pixel.y+move[1];
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
            // homeostasis
            if (pixel.temp > 37) { pixel.temp -= 1; }
            else if (pixel.temp < 37) { pixel.temp += 1; }
        }

    },
    density: 1035,
    state: "solid",
    conduct: .05,
    tempHigh: 250,
    stateHigh: "rotten_meat",
    burn: .01,
    burnTime: 300,
    burnInto: "rotten_meat",
    forceSaveColor: true,
    reactions: {
        "head": { elem2 : "z_head" , chance:1.0 },
        "body": { elem2 : "z_body" , chance:1.0 },
		"disinfectant": {elem1:"body"},
    },
},

elements.growth_Serum = {
    //debut: update 13
	color: "#d1b74f",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["M2","DL%1","M2"],["M1","M1","M1"]],
	category: "variety_mod",
	state: "liquid",
	reactions: {
		"water": { elem1: "disinfectant"},
	}
};

elements.strange_Cell = { 
    //debut: update 12
	color: "#b150d4",
	excludeRandom: false,
	behavior: [["M1%5","ST%5 AND M1%5 AND EX:9>random","M1%5"],["SP","LB:random%0.05 AND RT:1%10","SP"],["M1%5","SW AND SH AND M1%5 AND EX:9>variety_mod%1","M1%5"]],
	category: "variety_mod",
	state: "solid",
	tempHigh: 3000,
	stateHigh:"loopy",
	reactions: {
		"gray_goo": { elem1: "loopy", elem2: "explosion"},
	}
},

elements.variety_mod = {
	//debut: update 15
    color: "#ff0000",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["XX","CH:moss,hello_world,female_fly,male_fly,fly_egg,fly_larva,disinfectant,garbage_bag,garbage,garbage_juice,zombie,growth_Serum,strange_Cell","XX"],["XX","XX","XX"]],
	category: "variety_mod",
	state: "solid",
    related: ["moss","hello_world","female_fly","male_fly","fly_egg","fly_larva","fruitfly_egg","banana","mold","disinfectant","garbage_bag","garbage","garbage_juice","zombie","growth_Serum","strange_Cell"],
    cooldown: defaultCooldown

};

elements.chess_knight = {
    //update 20
	color: "#4f2c0c",
	excludeRandom: false,
	behavior: [
        `XX|M1 AND SW:"+chess" AND DE:"+chess"|XX|M1 AND SW:"+chess" AND DE:"+chess"|XX`,
        `M1 AND SW:"+chess" AND DE:"+chess"|XX|XX|XX|M1 AND SW:"+chess" AND DE:"+chess"`,
        `XX|XX|LB:wall|XX|XX`,
        `M1 AND SW:"+chess" AND DE:"+chess"|XX|XX|XX|M1 AND SW:"+chess" AND DE:"+chess"`,
        `XX|M1 AND SW:"+chess" AND DE:"+chess"|XX|M1 AND SW:"+chess" AND DE:"+chess"|XX`
],
	category: "variety_mod",
	state: "solid",
};

elements.bug = {
	color: "#FFFFFF",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["XX","CH:male_fly, crawl_male_fly, female_fly, crawl_female_fly, fly_pupa","XX"],["XX","XX","XX"]],
	category: "variety_mod",
	state: "solid",
	
},

worldgentypes.insect_ecosystem = {
    layers: [
        [0.95, "grass"],
        [0.50, "dirt"],
        [0.05, "rock"],
        [0, "basalt"],
    ],
    decor: [ // [element, chance, distance from top]
        ["ant", 0.08],
        ["bug", 0.08],
        ["bird", 0.025, 10],
        ["mushroom_spore", 0.012, 10],
        [["sapling","pinecone"], 0.02, 10]
    ],
    baseHeight: 0.25,
}
