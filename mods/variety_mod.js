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
		"water": { elem1: "male_fly", elem2: "female_fly", elem3: "fly_egg", elem4: "maggot" },
	}
},

elements.female_fly = {
	//debut: update 4
    color: "#4B4B4B",
	excludeRandom: false,
	behavior: [["M1%20","XX","M1%20"],["M1%20","CH:female_fly>dead_fly%0.01","M1%20"],["M1%20","CR:fly_egg%0.06","M1%20"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "dead_fly",
	reactions: {
		"disinfectant": { elem1: "dead_fly", elem2: "ammonia", elem3: "stench"},
	},
	tempHigh: 100,
	stateHigh:"dead_fly",
	tempLow: 10,
	stateLow: "ice",
},

elements.male_fly = {
	//debut: update 14
    color: "#4B4B4B",
	excludeRandom: false,
	behavior: [["M1","M2","M1"],["M2","CH:dead_fly%0.01","M2"],["M1","M2","M1"]],
	category: "variety_mod",
	state: "solid",
	reactions: {
		"disinfectant": { elem1: "dead_fly", elem2: "dead_fly"},
	}
},

elements.fly_egg = {
	//debut: update 5
    color: "#E2EAF4",
	excludeRandom: false,
	behavior: [["XX","ST","XX"],["ST","CH:maggot%0.036","ST"],["M1","M1 AND ST","M1"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "slime,maggot,female_fly",
		reactions: {
		"disinfectant": { elem1: "dead_fly", elem2: "ammonia", elem3: "stench"},
		"growth_Fluid": { elem1: "maggot", elem2: "female_fly", elem3: "female_fly"}
	}
},

elements.maggot = {
	//debut:update 16
    color: "#F0EEE8",
	excludeRandom: false,
	behavior: [["M2%10 AND SA%50","SA%50 AND SW: maggot,fly_egg,meat,rotten_meat,cooked_meat","M2%10 AND SA%50"],["M2%50 AND CH:meat,rotten_meat,cooked_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,garbage_juice,banana,mashed_banana,rotten_banana>stench,stench,stench,plague%0.1","CC: #F9E6D4%0.08 AND CH:fly_pupa%0.05,CR:stench%10","M2%50 AND CH:meat,rotten_meat,cooked_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,banana,mashed_banana,rotten_banana>stench,plaque%0.1"],["M1 AND CH:meat>rotten_meat%1","M1 AND CH:meat,rotten_meat,cooked_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,>stench,plaque AND CH:cheese,cheese_powder,melted_cheese>rotten_cheese","M1"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "slime",
	tempHigh: 80,
	stateHigh: "female_fly",
	reactions: {
		"disinfectant": { elem1: "stench", elem2: "ammonia", elem3: "stench"},
		"growth_Fluid": {elem1: "female_fly", elem2: "female_fly"}
	}
},

elements.fly_pupa = {
    //debut:update 18
	color: "#B1834D",
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["SP","CH:crawl_fly%0.006 AND CC:#5D5247%0.01","SP"],["M1","M1","M1"]],
	category: "variety_mod",
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_fly", elem3:"dirt"}
    }
},

elements.crawl_fly = {
    //update 18
	color: "#5D5247",
	excludeRandom: false,
	behavior: [["M2%0.5","XX","M2%0.5"],["M2%1","CH:male_fly,female_fly%0.06","M2%1"],["XX","M1","XX"]],
	category: "variety_mod",
	state: "solid",
    reactions:{
        "disinfectant": {elem1:"mold", elem2:"dead_fly", elem3:"dirt"}
    }
},

elements.female_fruitfly = {
//debut: update 16
    color: "#EEC758",
	excludeRandom: false,
	behavior: [["M1%20","SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana,dirt,mold%10","M1%20"],["M1%20","CH:female_fruitfly>dead_fly%0.01","M1%20"],["M1%20","CR:fruitfly_egg%0.06","M1%20"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "dead_fly",
	reactions: {
		"disinfectant": { elem1: "dead_fly", elem2: "dead_fly", elem3: "stench"},
	},
	tempHigh: 100,
	stateHigh:"dead_fly",
	tempLow: 10,
	stateLow: "ice",
},

elements.male_fruitfly = {
	//debut: update 16
    color: "#D4A930",
	excludeRandom: false,
	behavior: [["M1","M2 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana,dirt,mold"%10,"M1"],["M2","CH:dead_fly%0.01","M2"],["M1","M2","M1"]],
	category: "variety_mod",
    breakInto:"dead_bug",
	state: "solid",
	reactions: {
		"disinfectant": { elem1: "dead_fly", elem2: "dead_fly"},
	}
},

elements.fruitfly_egg = {
	//debut: update 16
    color: "#E2EAF4",
	excludeRandom: false,
	behavior: [["XX","ST","XX"],["ST","CH:fruitfly_maggot%0.018","ST"],["M1","M1 AND ST","M1"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "slime,maggot,female_fruitfly",
		reactions: {
		"disinfectant": { elem1: "plague", elem2: "slime", elem3: "stench"},
		"growth_Fluid": { elem1: "fruitfly_maggot", elem2: "female_fruitfly", elem3: "female_fruitfly"}
	}
},

elements.fruitfly_maggot = {
	//debut:update 16
    color: "#F0EEE8",
	excludeRandom: false,
	behavior: [["M2%10 AND SA%50 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana%10","SA%50","M2%10 AND SA%50 AND SW:grape,juice,fruit_milk,banana,mashed_banana,rotten_banana"],["M2%50 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana,mashed_banana,rotten_banana>stench,stench,stench,plague%0.1","CH:fruitfly_pupa%0.05,CR:stench%10","M2%50 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana>stench,plaque%0.1"],["M1 AND CH:banana>rotten_banana%1 AND SW:grape,juice,banana,mashed_banana,rotten_banana","M1 AND CH:cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,grape,banana>stench,plaque%0.1 AND CH:cheese,cheese_powder,melted_cheese>rotten_cheese AND CH:banana>rotten_banana,mashed_banana%0.01","M1 AND SW:grape,juice,banana,mashed_banana,rotten_banana"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "slime",
	tempHigh: 80,
	stateHigh: "female_fruitfly",
	reactions: {
		"disinfectant": { elem1: "stench", elem2: "plague", elem3: "stench"},
		"growth_Fluid": {elem1: "female_fruitfly", elem2: "female_fruitfly"}
	}
},

elements.fruitfly_pupa = {
    //update 18
	color: "#CBAD91",
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["SP","CH:crawl_fly%0.006 AND CC:#5D5247%0.01","SP"],["M1","M1","M1"]],
	category: "variety_mod",
	state: "solid"
},

elements.crawl_fruitfly = {
    //update 18
	color: "#64571c",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["M2%2","CH:male_fly,female_fly%0.004","M2%2"],["M1","M1","M1"]],
	category: "variety_mod",
	state: "solid",
},

elements.dead_fly = {
    //debut: update 16
	color: "#4B4A4B",
	excludeRandom: false,
	behavior: [["XX","XX","XX"],["XX","CH:dirt%0.1","XX"],["M1","M1 AND SA","M1"]],
	category: "variety_mod",
	state: "solid",
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
	reactions: {
		"water": { elem1: "water", elem2: "seltzer"}
	}
};

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
	behavior: [["XX","CR:stench%0.1","XX"],["SP%20 AND CR:garbage_juice%0.1 AND CH:water>dirty_water,garbage_juice%1","CH:maggot%0.007","SP%20 AND CR:garbage_juice%0.1 AND CH:water>dirty_water,garbage_juice%1"],["M1","M1","M1"]],
	breakInto:"maggot",
    category: "variety_mod",
	state: "solid",
    burn: .01,
    burnTime: 300,
    burnInto: "ash",
	reactions: {
		"fire": { elem1: "ash", elem2: "female_fly", elem3: "maggot", elem4: "fly_egg" },
	}
},

elements.garbage_juice = {
    //debut: update 14(failed debut: update 11)
	color: ["#6B7A1A", "#60742E", "#5E823C"],
	excludeRandom: false,
	behavior: behaviors.LIQUID,
    stain:0.0025,
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
	state: "solid",
	reactions: {
		"dirty_water": { elem1: "rotten_banana" },
	}
},

elements.mashed_banana = {
    //debut:update 16
	color: ["#FCE47D","#D4A930"],
	excludeRandom: false,
	behavior: [["XX","CR:juice%0.01","XX"],["ST%75","Ch:mold%0.015","ST%75"],["M1","M1","M1"]],
	category: "variety_mod",
	state: "solid",
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
	reactions: {
		"disinfectant": { elem1: "mold" },
        "worm": { elem1: "dirt", elem2: "mold"},
        "maggot": { elem1: "dirt", elem2: "mold"},
        "fruitfly_maggot": { elem1: "dirt", elem2: "mold"},
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
		"disinfectant": { elem1: "dirt", elem2: "fruitfly_egg", elem3: "stench", elem4: "fruitfly_maggot", elem5: "mold", elem6: "mold" },
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

elements.growth_Fluid = {
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
	behavior: [["XX","XX","XX"],["XX","CH:moss,hello_world,female_fly,male_fly,fly_egg,maggot,disinfectant,garbage_bag,garbage,garbage_juice,zombie,growth_Fluid,strange_Cell","XX"],["XX","XX","XX"]],
	category: "variety_mod",
	state: "solid",
    related: ["moss","hello_world","female_fly","male_fly","fly_egg","maggot","fruitfly_egg","banana","mold","disinfectant","garbage_bag","garbage","garbage_juice","zombie","growth_Fluid","strange_Cell"],
    cooldown: defaultCooldown

};
