elements.knife = {
    color: ["#cbcdcd","#bdbdbd"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1 AND SM%0.005|XX",
    ],
    reactions: {
        "head": { elem2:["brain","bone"], chance:0.5 },
        "body": { elem2:["heart","bone"], chance:0.5 },
        "decapitated_head": { elem2:["brain","bone"], chance:0.8 },
        "human_corpse": { elem2:["heart","bone"], chance:0.8 },
        "water": { elem1:"rust", chance:0.0025 },
        "salt_water": { elem1:"rust", chance:0.005 },
        "dirty_water": { elem1:"rust", chance:0.04 },
        "pool_water": { elem1:"rust", chance:0.04 },
        "sugar_water": { elem1:"rust", chance:0.0035 },
        "seltzer": { elem1:"rust", chance:0.006 },
        "salt": { elem1:"rust", chance:0.004 },
        "blood": { elem1:"rust", chance:0.003 },
        "infection": { elem1:"rust", chance:0.003 },
        "antibody": { elem1:"rust", chance:0.003 },
        "fire": { elem1:"rust", chance:0.0025 },
        "coffee": { elem1:"rust", chance:0.0003 },
        "tea": { elem1:"rust", chance:0.0003 },
        "broth": { elem1:"rust", chance:0.0003 },
        "juice": { elem1:"rust", chance:0.0003 },
        "nut_milk": { elem1:"rust", chance:0.0003 },
    },
    tempHigh: 1200,
    stateHigh: ["molten_steel","molten_steel","ash","charcoal"],
    category: "weapons",
    density: 2500,
    conduct: 0.15,
    hardness: 0.2,
    darkText: true
}

elements.brain = {
		color: ["#deb6c5","#F5CED5","#e87b8f"],
		behavior: [
			"XX|XX|XX",
			"XX|CH:rotten_human_flesh%0.00005|XX",
			"M2%75|M1|M2%75",
		],
		reactions: {
		"dirty_water": { "elem1":"rotten_human_flesh", "chance":0.1 },
		"fly": { "elem1":"rotten_human_flesh", "chance":0.2 },
		"dioxin": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.1 },
		"uranium": { "elem1":"rotten_human_flesh", "chance":0.1 },
		"cancer": { "elem1":"rotten_human_flesh", "chance":0.1 },
		"plague": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.3 },
		"ant": { "elem1":"rotten_human_flesh", "chance":0.1 },
		"worm": { "elem1":"rotten_human_flesh", "chance":0.1 },
		"rat": { "elem1":"rotten_human_flesh", "chance":0.3 },
		"mushroom_spore": { "elem1":"rotten_human_flesh", "chance":0.1 },
		"mushroom_stalk": { "elem1":"rotten_human_flesh", "chance":0.1 },
		"mercury": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.2 },
		"mercury_gas": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.1 },
		"virus": { "elem1":"rotten_human_flesh", "chance":0.1 },
		"poison": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.5 },
		"infection": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.1 },
		"ink": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.1 },
		"acid": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.5 },
		"acid_gas": { "elem1":"rotten_human_flesh", "chance":0.4 },
		"cyanide": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.5 },
    },
	tempHigh: 100,
    stateHigh: "cooked_brain",
	tempLow: -18,
    stateLow: "frozen_human_flesh",
    category:"life",
    hidden: true,
    breakInto: ["human_flesh", "blood"],
	burn:10,
	burnTime:200,
	burnInto:["cooked_brain","cooked_brain","cooked_brain","steam","salt"],
	state: "solid",
	density: 1081,
	conduct: 1,
};

elements.heart = {
    color: ["#e31b23","#98002e","#6f1200","#551900","#e31b23","#98002e","#6f1200","#551900","#e31b23","#98002e","#6f1200","#551900","#532e63"],
    behavior: [
        "CR:blood%0.01|CR:blood%0.02|CR:blood%0.01",
        "CR:blood%0.01|CH:rotten_human_flesh%0.00005|CR:blood%0.01",
        "M2%75 AND CR:blood%0.02|M1 AND CR:blood%0.05|M2%75AND CR:blood%0.02",
    ],
    reactions: {
    "dirty_water": { "elem1":"rotten_human_flesh", "chance":0.1 },
    "fly": { "elem1":"rotten_human_flesh", "chance":0.2 },
    "dioxin": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.1 },
    "uranium": { "elem1":"rotten_human_flesh", "chance":0.1 },
    "cancer": { "elem1":"rotten_human_flesh", "chance":0.1 },
    "plague": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.3 },
    "ant": { "elem1":"rotten_human_flesh", "chance":0.1 },
    "worm": { "elem1":"rotten_human_flesh", "chance":0.1 },
    "rat": { "elem1":"rotten_human_flesh", "chance":0.3 },
    "mushroom_spore": { "elem1":"rotten_human_flesh", "chance":0.1 },
    "mushroom_stalk": { "elem1":"rotten_human_flesh", "chance":0.1 },
    "mercury": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.2 },
    "mercury_gas": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.1 },
    "virus": { "elem1":"rotten_human_flesh", "chance":0.1 },
    "poison": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.5 },
    "infection": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.1 },
    "ink": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.1 },
    "acid": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.5 },
    "acid_gas": { "elem1":"rotten_human_flesh", "chance":0.4 },
    "cyanide": { "elem1":"rotten_human_flesh", "elem2":null, "chance":0.5 },
},
tempHigh: 110,
stateHigh: "cooked_heart",
tempLow: -18,
stateLow: "frozen_human_flesh",
category:"life",
hidden: true,
breakInto: ["human_flesh","blood","blood"],
burn:10,
burnTime:200,
burnInto:["cooked_heart","cooked_heart","cooked_heart","blood"],
state: "solid",
density: 1075,
conduct: 1,
};

elements.sweet_blood = {
    color: "#ff4040",
    behavior: behaviors.LIQUID,
    reactions: {
        "yeast": { elem1:"alcohol", chance:0.005 },
        "plague": { elem1:"infection", elem2:null },
        "rotten_meat": { elem1:"infection" },
        "rotten_cheese": { elem1:"infection" },
        "virus": { elem1:"infection", elem2:null },
        "cancer": { elem1:"infection" },
        "cyanide": { elem1:"infection", elem2:null },
        "cyanide_gas": { elem1:"infection", elem2:null },
        "mushroom_spore": { elem1:"infection", elem2:null },
        "mushroom_gill": { elem1:"infection" },
        "dirty_water": { elem1:"infection", elem2:null },
        "rad_steam": { elem1:"infection" },
        "rad_glass": { elem1:"infection" },
        "rad_shard": { elem1:"infection" },
        "rad_cloud": { elem1:"infection" },
        "fallout": { elem1:"infection" },
        "rust": { elem1:"infection", chance:0.05 },
        "oxidized_copper": { elem1:"infection", chance:0.05 },
        "rat": { elem1:"infection", chance:0.075 },
        "flea": { elem1:"infection", chance:0.03 },
        "worm": { elem1:"infection", chance:0.03 },
        "mercury": { elem1:"infection", elem2:null, chance:0.05 },
        "lead": { elem1:"infection", elem2:null, chance:0.01 },
        "oxygen": { elem2:null, chance:0.05 },
        "carbon_dioxide": { elem2:null, chance:0.05 },
        "alcohol": { elem1:[null,"sugar","dna"], chance:0.02 }
    },
    viscosity: 12,
    tempHigh: 120,
    stateHigh: ["steam","sugar","oxygen","steam","sugar","oxygen","steam","salt","oxygen"],
    tempLow: -5,
    stateLow: "candy",
    category:"food",
    state: "liquid",
    density: 1080,
    stain: 0.05,
    isFood: true,
    hidden: true
}

elements.mellified_man = {
    color: ["#f4f8db","#f8fbd0","#fbebba","#e8ce96","#b18f56","#936d43","#715234","#4b422a"],
    behavior: [
        "XX|CR:honey%0.0001|XX",
        "CR:honey%0.0001|XX|CR:honey%0.0001",
        "XX|M1 AND CR:honey%0.0001|XX",
    ],
    reactions: {
        "water": { elem2:"sugar_water", tempMin:70, color2:"#d7db69" },
        "salt_water": { elem2:"sugar_water", tempMin:70, color2:"#d7db69"},
        "sugar_water": { elem2:"sugar_water", tempMin:70, color2:"#d7db69" },
        "seltzer": { elem2:"sugar_water", tempMin:70, color2:"#d7db69" },
    },
    tempHigh: 200,
    stateHigh: ["cooked_human","cooked_human","honey",],
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:["cooked_human","cooked_human","honey",],
    breakInto: ["blood","human_flesh","bone","honey","human_flesh","bone"],
    state: "solid",
    density: 1020,
    conduct: 0.1,
    isFood: true,
    hidden: true
}

elements.human_flesh = {
    color: ["#9e4839","#ba6449","#d2856c","#a14940"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    reactions: {
        "honey": { elem1:"mellified_man", elem2:["honey","honey",null], chance:0.0001 },
        "dirty_water": { elem1:"rotten_human_flesh", chance:0.1 },
        "fly": { elem1:"rotten_human_flesh", chance:0.2 },
        "dioxin": { elem1:"rotten_human_flesh", elem2:null, chance:0.1 },
        "uranium": { elem1:"rotten_human_flesh", chance:0.1 },
        "cancer": { elem1:"rotten_human_flesh", chance:0.1 },
        "plague": { elem1:"rotten_human_flesh", elem2:null, chance:0.3 },
        "ant": { elem1:"rotten_human_flesh", chance:0.1 },
        "worm": { elem1:"rotten_human_flesh", chance:0.1 },
        "rat": { elem1:"rotten_human_flesh", chance:0.3 },
        "mushroom_spore": { elem1:"rotten_human_flesh", chance:0.1 },
        "mushroom_stalk": { elem1:"rotten_human_flesh", chance:0.1 },
        "mycelium": { elem1:"rotten_human_flesh", chance:0.1 },
        "hyphae": { elem1:"rotten_human_flesh", chance:0.1 },
        "mercury": { elem1:"rotten_human_flesh", elem2:null, chance:0.2 },
        "mercury_gas": { elem1:"rotten_human_flesh", elem2:null, chance:0.1 },
        "virus": { elem1:"rotten_human_flesh", chance:0.1 },
        "poison": { elem1:"rotten_human_flesh", elem2:null, chance:0.5 },
        "infection": { elem1:"rotten_human_flesh", elem2:null, chance:0.1 },
        "ink": { elem1:"rotten_human_flesh", elem2:null, chance:0.1 },
        "acid": { elem1:"rotten_human_flesh", elem2:null, chance:0.5 },
        "acid_gas": { elem1:"rotten_human_flesh", chance:0.4 },
        "cyanide": { elem1:"rotten_human_flesh", elem2:null, chance:0.5 },
        "cyanide_gas": { elem1:"rotten_human_flesh", elem2:null, chance:0.5 },
        "rotten_cheese": { elem1:"rotten_human_flesh", chance:0.02 },
        "fallout": { elem1:"rotten_human_flesh", chance:0.2 },
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
        "salt": { elem1:"cured_human_flesh" },
        "vinegar": { elem1:"cured_human_flesh", chance:0.1 },
    },
    tempHigh: 100,
    stateHigh: "cooked_human",
    tempLow: -18,
    stateLow: "frozen_human_flesh",
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:"cooked_human",
    state: "solid",
    density: 1050,
    conduct: 0.2,
    isFood: true,
    hidden: true
}

elements.cooked_brain = {
    color: ["#C37C6E","#B77269","#AE625C"],
    behavior: behaviors.STURDYPOWDER,
    tick: function(pixel) {
        if (pixel.temp > 100 && Math.random() < 0.0025 && isEmpty(pixel.x,pixel.y-1)) {
            changePixel(pixel,"grease")
        }
    },
    reactions: {
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "dirty_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "seltzer": { elem2:"broth", tempMin:70 }
    },
    tempHigh: 300,
    stateHigh: "ash",
    category:"food",
    hidden:true,
    burn:10,
    burnTime:200,
    burnInto: "ash",
    state: "solid",
    density: 1005,
    isFood: true
}

elements.cooked_heart = {
    color: ["#A44447","#9A4546","#8A2A30"],
    behavior: behaviors.STURDYPOWDER,
    tick: function(pixel) {
        if (pixel.temp > 100 && Math.random() < 0.0025 && isEmpty(pixel.x,pixel.y-1)) {
            changePixel(pixel,"grease")
        }
    },
    reactions: {
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "dirty_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "seltzer": { elem2:"broth", tempMin:70 }
    },
    tempHigh: 300,
    stateHigh: "ash",
    category:"food",
    hidden:true,
    burn:10,
    burnTime:200,
    burnInto: "ash",
    state: "solid",
    density: 1005,
    isFood: true
}

elements.cooked_human = {
    color: ["#ae7d5b","#9b6d54","#7e4d31"],
    behavior: behaviors.STURDYPOWDER,
    tick: function(pixel) {
        if (pixel.temp > 100 && Math.random() < 0.0025 && isEmpty(pixel.x,pixel.y-1)) {
            changePixel(pixel,"grease")
        }
    },
    reactions: {
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "dirty_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "seltzer": { elem2:"broth", tempMin:70 }
    },
    tempHigh: 300,
    stateHigh: "ash",
    category:"food",
    hidden:true,
    burn:10,
    burnTime:200,
    burnInto: "ash",
    state: "solid",
    density: 1005,
    isFood: true
}

elements.frozen_human_flesh = {
    color: ["#399e8f","#49baa9","#6cd2c6","#40a197"],
    behavior: behaviors.STURDYPOWDER,
    temp: -18,
    tempHigh: 0,
    stateHigh: "human_flesh",
    category:"food",
    hidden:true,
    state: "solid",
    density: 1070,
    isFood: true
}

elements.rotten_human_flesh = {
    color: ["#b8b165","#b89765"],
    behavior: [
        "XX|CR:plague,stench,stench,stench,fly%0.25 AND CH:meat>rotten_meat%1 AND CH:human_flesh>rotten_human_flesh%1|XX",
        "SP%99 AND CH:meat>rotten_meat%1 AND CH:human_flesh>rotten_human_flesh%1|XX|SP%99 AND CH:meat>rotten_meat%1 AND CH:human_flesh>rotten_human_flesh%1",
        "XX|M1 AND CH:meat>rotten_meat%1 AND CH:human_flesh>rotten_human_flesh%1|XX",
    ],
    reactions: {
        "water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "salt_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "sugar_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "dirty_water": { elem2:"broth", tempMin:70, color2:"#d7db69" },
        "seltzer": { elem2:"broth", tempMin:70, color2:"#d7db69" }
    },
    tempHigh: 300,
    stateHigh: ["plague","ash","ammonia"],
    category:"food",
    hidden: true,
    burn:12,
    burnTime:200,
    burnInto:["plague","ash","ammonia"],
    state: "solid",
    density: 1005,
    conduct: 0.1,
    isFood: true
}

elements.cured_human_flesh = {
    name: "cured_meat",
    color: ["#be5c4b","#c8846f","#dda592","#bc6157"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    reactions: {
        "honey": { elem1:"mellified_man", elem2:["honey","honey",null], chance:0.0001 },
        "water": { elem2:"broth", tempMin:70 },
        "salt_water": { elem2:"broth", tempMin:70 },
        "sugar_water": { elem2:"broth", tempMin:70 },
        "seltzer": { elem2:"broth", tempMin:70 },
    },
    tempHigh: 100,
    stateHigh: "cooked_human",
    category:"food",
    burn:15,
    burnTime:200,
    burnInto:"cooked_human",
    state: "solid",
    density: 1019.5,
    conduct: 0.3,
    isFood: true,
    hidden: true
}

elements.human_corpse = {
    color: ["#069469","#047e99","#7f5fb0"],
    behavior: [
        "XX|XX|XX",
        "XX|CH:rotten_human_flesh%0.0001|XX",
        "XX|M1|XX",
    ],
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y-1)) {
            if (Math.random() < 0.01 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y-1);
            }
        }
    },
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 200,
    stateHigh: "cooked_human",
    tempLow: -30,
    stateLow: "frozen_human_flesh",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_human",
    breakInto: ["blood","human_flesh","bone"],
    forceSaveColor: true,
    reactions: {
        "honey": { elem1:"mellified_man", elem2:["honey","honey",null], chance:0.0005 },
        "cancer": { elem1:"cancer", chance:0.005 },
        "radiation": { elem1:["ash","human_flesh","rotten_human_flesh","cooked_human"], chance:0.4 },
        "neutron": { elem1:["ash","human_flesh","rotten_human_flesh","cooked_human"], chance:0.01 },
        "fallout": { elem1:["ash","human_flesh","rotten_human_flesh","cooked_human"], chance:0.01 },
        "plague": { elem1:["plague","plague","rotten_human_flesh"], chance:0.05 },
        "stink_bug": { elem2:"stench", oneway:true },
        "sun": { elem1:"cooked_human" },
    },
}

elements.decapitated_head = {
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    behavior: [
        "XX|XX|XX",
        "XX|CH:rotten_human_flesh%0.0001|XX",
        "M2%90|M1|M2%90",
    ],
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (isEmpty(pixel.x, pixel.y+1) && Math.random() < 0.01) {
                createPixel("blood", pixel.x, pixel.y+1);
            }
        }
    },
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 200,
    stateHigh: "cooked_human",
    tempLow: -30,
    stateLow: "frozen_human_flesh",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_human",
    breakInto: ["blood","human_flesh","bone"],
    forceSaveColor: true,
    reactions: {
        "honey": { elem1:"mellified_man", elem2:["honey","honey",null], chance:0.0005 },
        "cancer": { elem1:"cancer", chance:0.005 },
        "radiation": { elem1:["ash","human_flesh","rotten_human_flesh","cooked_human"], chance:0.4 },
        "neutron": { elem1:["ash","human_flesh","rotten_human_flesh","cooked_human"], chance:0.03 },
        "fallout": { elem1:["ash","human_flesh","rotten_human_flesh","cooked_human"], chance:0.03 },
        "plague": { elem1:"plague", chance:0.05 },
        "sun": { elem1:"cooked_human" },
        "light": { stain1:"#825043" },
    },
}

elements.head.tick = function(pixel) {
    doHeat(pixel);
    doBurning(pixel);
    doElectricity(pixel);
    if (pixel.dead) {
        // Turn into rotten_meat if pixelTicks-dead > 500
        if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
            pixel.element = "decapitated_head";
            return
        }
    }

    // Find the body
    if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
        var body = pixelMap[pixel.x][pixel.y+1];
        if (body.dead) { // If body is dead, kill head
            pixel.dead = body.dead;
        }
    }
    else { var body = null }

    if (tryMove(pixel, pixel.x, pixel.y+1)) {
        // create blood if severed 10% chance
        if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
            createPixel("blood", pixel.x, pixel.y+1);
            // set dead to true 15% chance
            if (Math.random() < 0.15) {
                pixel.dead = pixelTicks;
            }
        }
    }
    // homeostasis
    if (pixel.temp > 37) { pixel.temp -= 1; }
    else if (pixel.temp < 37) { pixel.temp += 1; }
}

elements.body.tick = function(pixel) {
    if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
        if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
            var headpixel = pixelMap[pixel.x][pixel.y-2];
            if (headpixel.element == "head") {
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
        // Turn into rotten_meat if pixelTicks-dead > 500
        if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
            pixel.element = "human_corpse";
        }
        return
    }

    // Find the head
    if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
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
            createPixel("blood", pixel.x, pixel.y-1);
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
}

elements.body.stateHigh = "cooked_human"
elements.head.stateHigh = "cooked_human"

elements.body.breakInto = ["blood","human_flesh","bone","blood","human_flesh","bone","blood","heart","bone",]
elements.head.breakInto = ["blood","brain","bone"]

elements.body.stateLow = "frozen_human_flesh"
elements.head.stateLow = "frozen_human_flesh"

if (!elements.blood.reactions) { elements.blood.reactions = {} }
    elements.blood.reactions.caramel = { "elem1": "sweet_blood", "elem2": null, chance:0.001 };
    elements.blood.reactions.sugar = { "elem1": "sweet_blood", "elem2": null, chance:0.0005};

if (!elements.head.reactions) { elements.head.reactions = {} }
    elements.head.reactions.human_flesh = { "elem2": null, chance:0.01 };
    elements.head.reactions.cooked_human = { "elem2": null, chance:0.05 };
    elements.head.reactions.cooked_brain = { "elem2": null, chance:0.03 };
    elements.head.reactions.cooked_heart = { "elem2": null, chance:0.04 };

