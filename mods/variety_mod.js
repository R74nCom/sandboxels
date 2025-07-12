//update 0: 
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
//update 15: Compilation
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
	excludeRandom: false,
	behavior: [["XX","SP","XX"],["SP","CH:random%0.1","SP"],["M1","M1","M1"]],
	category: "land",
	state: "solid",
	reactions: {
		"water": { elem1: "fly", elem2: "female_fly", elem3: "fly_egg", elem4: "maggot" },
	}
},

elements.female_fly = {
	//debut: update 4
    color: "#4B4B4B",
	excludeRandom: false,
	behavior: [["M1%20","XX","M1%20"],["M1%20","CH:female_fly>dead_bug%0.01","M1%20"],["M1%20","CR:fly_egg%0.06","M1%20"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "dead_bug",
	reactions: {
		"disinfectant": { elem1: "dead_bug", elem2: "ammonia", elem3: "stench"},
	},
	tempHigh: 100,
	stateHigh:"dead_bug",
	tempLow: 20,
	stateLow: "ice",
},

elements.male_fly = {
	//debut: update 14
    color: "#4B4B4B",
	excludeRandom: false,
	behavior: [["M1","M2","M1"],["M2","CH:dead_bug%0.01","M2"],["M1","M2","M1"]],
	category: "variety_mod",
	state: "solid",
	reactions: {
		"disinfectant": { elem1: "dead_bug", elem2: "dirty_water"},
	}
},

elements.fly_egg = {
	//debut: update 5
    color: "#E2EAF4",
	excludeRandom: false,
	behavior: [["XX","ST","XX"],["ST","CH:maggot%0.018","ST"],["M1","M1 AND ST","M1"]],
	category: "variety_mod",
	state: "solid",
	breakInto: "slime,maggot,female_fly",
		reactions: {
		"disinfectant": { elem1: "dead_bug", elem2: "ammonia", elem3: "stench"},
		"growth_Fluid": { elem1: "maggot", elem2: "female_fly", elem3: "female_fly"}
	}
},

elements.maggot = {
	//debut:update 5
    color: "#E8E8E8",
	excludeRandom: false,
	behavior: [["M2%10 AND SA%50","SA%50","M2%10 AND SA%50"],["M2%50 AND CH:meat,rotten_meat,cooked_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,>stench,stench,stench,plague","CH:male_fly,female_fly,female_fly%0.05,CR:stench%10","M2%50 AND CH:meat,rotten_meat,cooked_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,>stench,plaque"],["M1 AND CH:meat>rotten_meat%1","M1 AND CH:meat,rotten_meat,cooked_meat,cheese,melted_cheese,cheese_powder,rotten_cheese,bread,crumb,toast,>stench,plaque AND CH:cheese,cheese_powder,melted_cheese>rotten_cheese","M1"]],
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
	behavior: [["XX","CH:meat,rotten_meat,frozen_meat,salt,sugar,flour,egg,hard_yolk,rotten_cheese,cheese_powder,grape,herb,lettuce,pickle>stench","XX"],["XX","XX","XX"],["M1","M1","M1"]],
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
	behavior: [["M1%5","ST%5 AND M1%5 AND EX:9>random","M1%5"],["SP","LB:random%0.05 AND RT:1%10","SP"],["M1%5","SW AND SH AND M1%5 AND EX:9>random%1","M1%5"]],
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
    related: ["moss","hello_world","female_fly","male_fly","fly_egg","maggot","disinfectant","garbage_bag","garbage","garbage_juice","zombie","growth_Fluid","strange_Cell"],
    cooldown: defaultCooldown

};
//credits to "Nekonico" for human friendly design
elements.human.tick = function(pixel) {
    if (isEmpty(pixel.x, pixel.y+1)) {
        createPixel("body", pixel.x, pixel.y+1);
        var color = pixel.color;
        changePixel(pixel,"head");
        pixel.color = color;
        if (pixel.bodyColor) {
            pixelMap[pixel.x][pixel.y+1].color = pixel.bodyColor;
        }
    }
    else if (isEmpty(pixel.x, pixel.y-1)) {
        createPixel("head", pixel.x, pixel.y-1);
        pixelMap[pixel.x][pixel.y-1].color = pixel.color;
        changePixel(pixel,"body");
        if (pixel.bodyColor) {
            pixel.color = pixel.bodyColor;
        }
    }
}

elements.body.tick = function(pixel) {
    if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
        if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
            var headpixel = pixelMap[pixel.x][pixel.y-2];
            if (headpixel.element === "head") {
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
            changePixel(pixel,"rotten_meat");
        }
        return
    }

    // Find the head
    if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
        var head = pixelMap[pixel.x][pixel.y-1];
        if (head.dead) { // If head is dead, kill body
            pixel.dead = head.dead;
        }
        else if (head.panic > 0) {
            pixel.panic = head.panic;
            delete head.panic;
        }
    }
    else { var head = null }
    if (head && Math.random() < 0.25) {
        let y = Math.random() < 0.5 ? 0 : -1;
        for (let x = 1; x < 10; x++) {
            let x2 = pixel.x+(x*pixel.dir);
            let y2 = pixel.y+y;
            if (!isEmpty(x2,y2,true)) {
                let seenPixel = pixelMap[x2][y2];
                if (elements.human.reactions[seenPixel.element] && elements.human.reactions[seenPixel.element].attr1 && elements.human.reactions[seenPixel.element].attr1.panic) {
                    pixel.panic += elements.human.reactions[seenPixel.element].attr1.panic;
                    pixel.dir *= -1;
                    break;
                }
                else if (seenPixel.dead || seenPixel.temp > 200) {
                    pixel.panic += 5;
                    pixel.dir *= -1;
                    if (seenPixel.panic) delete seenPixel.panic;
                    break;
                }
            }
        }
    }
    if (pixel.burning) {
        pixel.panic += 0.1;
        if (head && pixelTicks-pixel.burnStart > 240) {
            pixel.color = head.color;
        }
    }
    if (pixel.charge) {
        pixel.panic += 1;
    }
    else if (pixel.panic > 0) {
        pixel.panic -= 0.1;
        if (pixel.panic < 0) { pixel.panic = 0; }
        else if (pixel.panic > 50) { pixel.panic = 50; }
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
    else if (head === null) { return }
    else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
        var movesToTry = [
            [1*pixel.dir,0],
            [1*pixel.dir,-1],
        ];
        let moved = false;
        // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
        while (movesToTry.length > 0) {
            var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
            if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                var origx = pixel.x+move[0];
                var origy = pixel.y+move[1];
                if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                    movePixel(head, head.x+move[0], head.y+move[1]);
                    moved = true;
                    break;
                }
            }
            else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
                var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
                if (hitPixel.element === "body" || hitPixel.element === "head" && hitPixel.panic < pixel.panic) {
                    // interact with other human
                    hitPixel.panic = pixel.panic;
                }
            }
        }
        // 15% chance to change direction
        if (Math.random() < 0.15 || !moved) {
            pixel.dir *= -1;
        }
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1; }
        else if (pixel.temp < 37) { pixel.temp += 1; }
    }

}

elements.portal_in.tick = function(pixel) {
    // if (Math.random() > 0.1) return;
    if (!ticktemp.portal_out) ticktemp.portal_out = {};
    let channel = parseInt(pixel.channel) || 0;
    if (!ticktemp.portal_out[channel]) {
        ticktemp.portal_out[channel] = currentPixels.filter((p) => {
            return elements[p.element].id === elements.portal_out.id && (
                isEmpty(p.x,p.y+1) || isEmpty(p.x,p.y-1) ||
                isEmpty(p.x+1,p.y) || isEmpty(p.x-1,p.y)
            ) &&
                (parseInt(p.channel) || 0) === parseInt(channel)
        });
    }
    if (ticktemp.portal_out[channel].length) {
        shuffleArray(squareCoordsShuffle);
        let r;
        for (var i = 0; i < squareCoordsShuffle.length; i++) {
            var coord = squareCoordsShuffle[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
                r = pixelMap[x][y];
                break;
            }
        }
        if (r !== undefined || pixel.charge) {
            let portal_out = choose(ticktemp.portal_out[channel]);
            if (portal_out.del) return;
            if (r !== undefined) {
                shuffleArray(squareCoordsShuffle);
                for (var j = 0; j < squareCoordsShuffle.length; j++) {
                    var coord2 = squareCoordsShuffle[j];
                    var x2 = portal_out.x+coord2[0];
                    var y2 = portal_out.y+coord2[1];
                    if (isEmpty(x2,y2) && r.element !== "head" && r.element !== "body") {
                        tryMove(r,x2,y2);
                    }
                    else if (isEmpty(x2,y2) && (r.element === "head" || r.element === "body")) {
                        if (r.element === "head" && !isEmpty(r.x,r.y+1)) {
                            if (pixelMap[r.x][r.y+1].element === "body") {
                                r.element = "human"
                                r.bodyColor = pixelMap[r.x][r.y+1].color
                                deletePixel(r.x,r.y+1)
                                tryMove(r,x2,y2);
                            }
                            else {
                                tryMove(r,x2,y2);
                            }
                        }
                        else if (r.element === "body" && !isEmpty(r.x,r.y-1)) {
                            if (pixelMap[r.x][r.y-1].element === "head") {
                                r.element = "human"
                                r.bodyColor = r.color
                                r.color = pixelMap[r.x][r.y-1].color
                                deletePixel(r.x,r.y-1)
                                tryMove(r,x2,y2);
                            }
                            else {
                                tryMove(r,x2,y2);
                            }
                        }
                    }
                    break;
                }
            }
            if (pixel.charge && !portal_out.charge && !portal_out.chargeCD) {
                portal_out.charge = pixel.charge;
            }
        }
    };
    doElectricity(pixel);
}

elements.pipe.tick = function(pixel) {
    if (!pixel.stage && pixelTicks-pixel.start > 60) {
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
                deletePixel(x,y)
            }
            if (isEmpty(x,y)) {
                createPixel("pipe_wall",x,y);
            }
        }
        pixel.stage = 1;
    }
    else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = adjacentCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x,y)) {
                pixel.stage = 2; //blue
                pixel.color = pixelColorPick(pixel,"#000036");
                break;
            }
        }
    }
    else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true) && pixelMap[x][y].element === "pipe") {
                var newPixel = pixelMap[x][y];
                if (newPixel.stage === 1) {
                    var newColor;
                    switch (pixel.stage) {
                        case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
                        case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
                        case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
                    }
                    newPixel.color = pixelColorPick(newPixel,newColor);
                }
            }
        }
        var moved = false;
        shuffleArray(squareCoordsShuffle);
        for (var i = 0; i < squareCoordsShuffle.length; i++) {
            var coord = squareCoordsShuffle[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true)) {
                var newPixel = pixelMap[x][y];
                if (newPixel.element === "pipe") {
                    var nextStage;
                    switch (pixel.stage) {
                        case 2: nextStage = 4; break; //green
                        case 3: nextStage = 2; break; //red
                        case 4: nextStage = 3; break; //blue
                    }
                    if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
                        newPixel.con = pixel.con;
                        newPixel.con.x = newPixel.x;
                        newPixel.con.y = newPixel.y;
                        pixel.con = null;
                        moved = true;
                        break;
                    }
                }
                else if (!pixel.con && elements[newPixel.element].movable && newPixel.element !== "head" && newPixel.element !== "body") { //suck up pixel
                    pixel.con = newPixel;
                    deletePixel(newPixel.x,newPixel.y);
                    pixel.con.x = pixel.x;
                    pixel.con.y = pixel.y;
                    pixel.con.del;
                    moved = true;
                    break;
                }
                else if (!pixel.con && elements[newPixel.element].movable && (newPixel.element === "head" || newPixel.element === "body")) {
                    if (newPixel.element === "head") {
                        if (!isEmpty(newPixel.x,newPixel.y+1)) {
                        if (pixelMap[newPixel.x][newPixel.y+1].element === "body") {
                            newPixel.element = "human"
                            newPixel.bodyColor = pixelMap[newPixel.x][newPixel.y+1].color
                            deletePixel(newPixel.x,newPixel.y+1)
                            pixel.con = newPixel;
                            deletePixel(newPixel.x,newPixel.y);
                            pixel.con.x = pixel.x;
                            pixel.con.y = pixel.y;
                            pixel.con.del;
                            moved = true;
                            break;
                        }
                        else {
                            pixel.con = newPixel;
                            deletePixel(newPixel.x,newPixel.y);
                            pixel.con.x = pixel.x;
                            pixel.con.y = pixel.y;
                            pixel.con.del;
                            moved = true;
                            break;
                        }
                        }
                        else {
                            pixel.con = newPixel;
                            deletePixel(newPixel.x,newPixel.y);
                            pixel.con.x = pixel.x;
                            pixel.con.y = pixel.y;
                            pixel.con.del;
                            moved = true;
                            break;
                        }
                    }
                    else if (newPixel.element === "body") {
                        if (!isEmpty(newPixel.x,newPixel.y-1)) {
                        if (pixelMap[newPixel.x][newPixel.y-1].element === "head") {
                            newPixel.element = "human"
                            newPixel.bodyColor = newPixel.color
                            newPixel.color = pixelMap[newPixel.x][newPixel.y-1].color
                            deletePixel(newPixel.x,newPixel.y-1)
                            pixel.con = newPixel;
                            deletePixel(newPixel.x,newPixel.y);
                            pixel.con.x = pixel.x;
                            pixel.con.y = pixel.y;
                            pixel.con.del;
                            moved = true;
                            break;
                        }
                        else {
                            pixel.con = newPixel;
                            deletePixel(newPixel.x,newPixel.y);
                            pixel.con.x = pixel.x;
                            pixel.con.y = pixel.y;
                            pixel.con.del;
                            moved = true;
                            break;
                        }
                        }
                        else {
                            pixel.con = newPixel;
                            deletePixel(newPixel.x,newPixel.y);
                            pixel.con.x = pixel.x;
                            pixel.con.y = pixel.y;
                            pixel.con.del;
                            moved = true;
                            break;
                        }
                    }
                    else {
                        pixel.con = newPixel;
                        deletePixel(newPixel.x,newPixel.y);
                        pixel.con.x = pixel.x;
                        pixel.con.y = pixel.y;
                        pixel.con.del;
                        moved = true;
                        break;
                    }
                }
            }
        }
        if (pixel.con && !moved) { // move to same stage if none other
            for (var i = 0; i < squareCoordsShuffle.length; i++) {
                var coord = squareCoordsShuffle[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
                    delete pixel.con.del;
                    pixel.con.x = x;
                    pixel.con.y = y;
                    pixelMap[x][y] = pixel.con;
                    currentPixels.push(pixel.con);
                    pixel.con = null;
                    break;
                }
                if (!isEmpty(x,y,true) && pixelMap[x][y].element === "pipe") {
                    var newPixel = pixelMap[x][y];
                    if (pixel.con && !newPixel.con && newPixel.stage === pixel.stage) {
                        newPixel.con = pixel.con;
                        newPixel.con.x = newPixel.x;
                        newPixel.con.y = newPixel.y;
                        pixel.con = null;
                        break;
                    }
                }
            }
        }
    }
    doDefaults(pixel);
}

elements.drag.tool = function(pixel) {
    if (dragStart === null) {
        dragStart = pixelTicks;
        draggingPixels = [];
    }
    if (pixelTicks === dragStart && !pixel.drag && (elements[pixel.element].movable || shiftDown) && pixel.element !== "head") {
        pixel.drag = true;
        draggingPixels.push(pixel);
    }
}

elements.drag.perTick = function() {
    if (!draggingPixels) { return; }
    for (var j = 0; j < (shiftDown ? 3 : 1); j++) {
    for (var i = 0; i < draggingPixels.length; i++) {
        var pixel = draggingPixels[i];
        if (pixel.del) { continue }
        const x = pixel.x;
        const y = pixel.y;
        const [mX, mY] = [mousePos.x, mousePos.y];
        const empty = checkForEmptyPixels(x, y);
        let bestVal = Math.sqrt(Math.pow(mX - x, 2) + Math.pow(mY - y, 2));
        let best = null;
        for (const pixelPair of empty) {
            const x_ = x + pixelPair[0];
            const y_ = y + pixelPair[1];
            const c = Math.sqrt(Math.pow(mX - x_, 2) + Math.pow(mY - y_, 2));
            if (c < bestVal) {
                bestVal = c;
                best = pixelPair;
            }
        }
        if (best) {
            if (pixel.element !== "body") {
                tryMove(pixel, x + best[0], y + best[1], undefined, true);
            }
            else if (pixel.element === "body") {
                if (!isEmpty(pixel.x,pixel.y-1)) {
                    var headPixel = pixelMap[pixel.x][pixel.y-1]
                    if (headPixel.element === "head") {
                        if (isEmpty(x + best[0], y + best[1] - 1)) {
                            tryMove(headPixel, x + best[0], y + best[1] - 1, undefined, true);
                            tryMove(pixel, x + best[0], y + best[1], undefined, true);
                        }
                    }
                }
                else {tryMove(pixel, x + best[0], y + best[1], undefined, true);}
            }
        }
    }
    }
}

mouse1Action = function(e,mouseX=undefined,mouseY=undefined,startPos) {
    if (currentElement === "erase") { mouse2Action(e,mouseX,mouseY,startPos); return; }
    else if (currentElement === "pick") { mouseMiddleAction(e,mouseX,mouseY); return; }
    // If x and y are undefined, get the mouse position
    if (mouseX === undefined && mouseY === undefined) {
        // var canvas = document.getElementById("game");
        // var ctx = canvas.getContext("2d");
        lastPos = mousePos;
        mousePos = getMousePos(canvas, e);
        var mouseX = mousePos.x;
        var mouseY = mousePos.y;
    }
    var cooldowned = false;
    if (mouseSize===1 && elements[currentElement].cooldown && !paused) {
        if (pixelTicks-lastPlace < elements[currentElement].cooldown) {
            return;
        }
        cooldowned = true;
    }
    lastPlace = pixelTicks;
    if (cooldowned && !startPos) {
        var coords = mouseRange(mouseX,mouseY);
    }
    else {
        startPos = startPos || lastPos
        var coords = lineCoords(startPos.x,startPos.y,mouseX,mouseY);
    }
    // if (!((cooldowned && startPos.x===lastPos.x && startPos.y===lastPos.y) || ((elements[currentElement].tool || elements[currentElement].category==="tools") && !elements[currentElement].canPlace))) {
    // }
    // else { var coords = mouseRange(mouseX,mouseY); }
    var element = elements[currentElement];
    var mixList = [];
    // For each x,y in coords
    var done = {};
    for (var i = 0; i < coords.length; i++) {
        var x = coords[i][0];
        var y = coords[i][1];
        if (!done[x]) {
            done[x] = {}
        }
        if (done[x][y]) { continue; }
        done[x][y] = true;

        if (mode === "replace" && (!elements[currentElement].tool || elements[currentElement].canPlace)) {
            if (outOfBounds(x,y)) {
                continue;
            }
            // Remove pixel at position from currentPixels
            if (!isEmpty(x,y,true)) {
                if (!(currentElement === pixelMap[x][y].element && pixelMap[x][y].start === pixelTicks-1)) {
                    deletePixel(x,y);
                }
            }
        }

        if (currentElement === "mix") {
            if (!isEmpty(x,y,true)) {
                var pixel = pixelMap[x][y];
                if (!(elements[pixel.element].movable !== true || elements[pixel.element].noMix === true) || shiftDown) {
                    mixList.push(pixel);
                }
            }
            continue;
        }
        else if (elements[currentElement].tool && !(elements[currentElement].canPlace && isEmpty(x,y))) {
            // run the tool function on the pixel
            if (!isEmpty(x,y,true)) {
                var pixel = pixelMap[x][y];
                // if the current element has an ignore property and the pixel's element is in the ignore property, don't do anything
                if (elements[currentElement].ignore && elements[currentElement].ignore.indexOf(pixel.element) !== -1) {
                    continue;
                }
                elements[currentElement].tool(pixel);
            }
            continue;
        }
        if (isEmpty(x, y)) {
            if (currentPixels.length < maxPixelCount) {
                createPixel(currentElement,x,y);
                if (pixelMap[x][y] && currentElement === pixelMap[x][y].element && (elements[currentElement].customColor || elements[currentElement].singleColor)) {
                    pixelMap[x][y].color = pixelColorPick(pixelMap[x][y],currentColorMap[currentElement]);
                }
                if (currentElementProp) {
                    for (var key in currentElementProp) {
                        pixelMap[x][y][key] = currentElementProp[key]
                    }
                }
            }
        }
        else if (!outOfBounds(x,y)) {
            if (elements[currentElement].extinguish) {
                var pixel = pixelMap[x][y];
                if (pixel.burning && elements[pixel.element].burning !== true) {
                    delete pixel.burning;
                    delete pixel.burnStart;
                }
            }
        }
    }
    if (currentElement === "mix") {
        // 1. repeat for each pixel in mixList
        // 2. choose 2 random pixels and swap their x and y
        // 3. remove pixel from mixList
        for (var i = 0; i < mixList.length; i++) {
            var pixel1 = mixList[Math.floor(Math.random()*mixList.length)];
            var pixel2 = mixList[Math.floor(Math.random()*mixList.length)];
            if (pixel1.element !== "head" && pixel2.element !== "head" && pixel1.element !== "body" && pixel2.element !== "body") {
                swapPixels(pixel1,pixel2);
            }
            else if (pixel1.element !== "head" && pixel2.element !== "head" && (pixel1.element === "body" || pixel2.element === "body")) {
                if (pixel1.element === "body") {
                    if (!isEmpty(pixel1.x,pixel1.y-1, true)) {
                        var headPixel1 = pixelMap[pixel1.x][pixel1.y-1]
                        if (headPixel1.element === "head") {
                            if (!isEmpty(pixel2.x,pixel2.y-1, true)) {
                                var headPixel2 = pixelMap[pixel2.x][pixel2.y-1]
                                if (headPixel2.element !== "body" && !(elements[headPixel2.element].movable !== true || elements[headPixel2.element].noMix === true)) {
                                    swapPixels(pixel1,pixel2);
                                    swapPixels(headPixel1,headPixel2);
                                }
                            }
                            else if (isEmpty(pixel2.x,pixel2.y-1)) {
                                swapPixels(pixel1,pixel2)
                                tryMove(headPixel1, pixel1.x, pixel1.y-1)
                            }
                        }
                    }
                }
                else if (pixel2.element === "body") {
                    if (!isEmpty(pixel2.x,pixel2.y-1, true)) {
                        var headPixel1 = pixelMap[pixel2.x][pixel2.y-1]
                        if (headPixel1.element === "head") {
                            if (!isEmpty(pixel1.x,pixel1.y-1, true)) {
                                var headPixel2 = pixelMap[pixel1.x][pixel1.y-1]
                                if (headPixel2.element !== "body" && !(elements[headPixel2.element].movable !== true || elements[headPixel2.element].noMix === true)) {
                                    swapPixels(pixel1,pixel2);
                                    swapPixels(headPixel1,headPixel2);
                                }
                            }
                            else if (isEmpty(pixel1.x,pixel1.y-1)) {
                                swapPixels(pixel1,pixel2);
                                tryMove(headPixel1, pixel2.x,pixel2.y-1)
                            }
                        }
                    }
                }
            }
            mixList.splice(mixList.indexOf(pixel1),1);
            mixList.splice(mixList.indexOf(pixel2),1);
            if (elements[pixel1.element].onMix) {
                elements[pixel1.element].onMix(pixel1,pixel2);
            }
            if (elements[pixel2.element].onMix) {
                elements[pixel2.element].onMix(pixel2,pixel1);
            }
        }

    }
}

pixelTick = function(pixel,custom=null) {
    if (pixel.start === pixelTicks) {return}
    btemp = {};
    if (elements[pixel.element] === undefined) {
        pixel.invalidElement = pixel.element;
        changePixel(pixel,"unknown");
        return;
    }
    var info = elements[pixel.element];
    btemp.info = info;
    btemp.pixel = pixel;
    if (custom) { var behavior = custom; }
    else if (pixel.charge && info.behaviorOn) { var behavior = info.behaviorOn; }
    else { var behavior = info.behavior; }
    if (pixel.flipX) { behavior = flipBehavior(behavior,"x"); }
    if (pixel.flipY) { behavior = flipBehavior(behavior,"y"); }
    if (pixel.r) { behavior = rotateBehavior(behavior,pixel.r); }
    var x = pixel.x;
    var y = pixel.y;
    var move1Spots = []; btemp.move1Spots = move1Spots;
    var move2Spots = []; btemp.move2Spots = move2Spots;
    var supportSpots = []; btemp.supportSpots = supportSpots;
    var swapSpots = []; btemp.swapSpots = swapSpots;
    btemp.mixSpots = [];
    btemp.move = true;
    // Parse behavior
var height = behavior.length;
for (var by = 0; by < behavior.length; by++) {
var behaviorby = behavior[by];
var width = behaviorby.length;
for (var bx = 0; bx < behaviorby.length; bx++) {
    var b0 = behaviorby[bx];
    if (b0 === "XX") {continue}
    //if (b.includes(" OR ")) {
    //    b = b.split(" OR ")[Math.floor(Math.random()*b.split(" OR ").length)];
    //}
    // Loop through b0.split(" AND ")
    if (b0.indexOf(" AND ") !== -1) { var andsplit = b0.split(" AND "); }
    else { var andsplit = [b0]; }
    for (var i = 0; i < andsplit.length; i++) {
        var b = andsplit[i];
        if (b.indexOf(":") !== -1) {
            var arg = b.split(":")[1].split(/[\:\%]/)[0];
            if (b.indexOf("%") === -1) {
                b = b.split(/[\:\%]/)[0];
            }
        }
        else { var arg = null;}
        btemp.arg = arg;
        // If b has "%" followed by a number in it, it's a chance to move
        if (b.indexOf("%") !== -1) {
            // Split the string at the "%" and use the second half as the chance (float)
            var chance = parseFloat(b.split("%")[1]);
            //console.log(b+": "+(Math.random()*100 < chance));
            b = b.split(/[\:\%]/)[0];
        }
        else { var chance = 100; }
        if (chance===100 || Math.random()*100 < chance) {
            var newCoords = behaviorCoords(x,y,bx,by,width,height);
            btemp.newCoords = newCoords;
            if (behaviorRules[b]) {
                behaviorRules[b]();
                continue;
            }
        }
    }
    }
    }
    if (btemp.deleted) {return;}
    if (supportSpots.length > 0) {
        var supportCount = 0;
        var allEmpty = true;
        for (var i = 0; i < supportSpots.length; i++) {
            var bx = supportSpots[i].x;
            var by = supportSpots[i].y;
            var arg = supportSpots[i].arg;
            if (!isEmpty(bx,by,true)) {
                if (info.ignore && info.ignore.indexOf(pixelMap[bx][by].element) !== -1) {continue;}
                if ((arg === null && !validDensitySwaps[info.state][elements[pixelMap[bx][by].element].state]) || pixelMap[bx][by].element == arg) {
                    supportCount++;
                }
            }
        }
        if (supportCount == supportSpots.length) {
            btemp.move = false;
        }
    }
    
    var moved = false;

    if (swapSpots.length > 0) {
        var coords = swapSpots[Math.floor(Math.random()*swapSpots.length)];
        if (pixelMap[coords.x][coords.y] !== undefined) {
            swapPixels(pixel,pixelMap[coords.x][coords.y]);
            btemp.move = false;
            moved = true;
        }
    }

    if (btemp.mixSpots.length > 0) {
        for (var i = 0; i < btemp.mixSpots.length; i++) {
            var coord1 = choose(btemp.mixSpots);
            var coord2 = choose(btemp.mixSpots);
            var exists1 = !isEmpty(coord1.x,coord1.y,true);
            var exists2 = !isEmpty(coord2.x,coord2.y,true);
            if (isEmpty(coord1.x,coord1.y) && exists2) {
                var pixel1 = pixelMap[coord2.x][coord2.y]
                if (pixel1.element !== "head" && pixel1.element !== "body") {
                    tryMove(pixel1,coord1.x,coord1.y);
                }
                else if (pixel1.element !== "head" && pixel1.element === "body") {
                        if (!isEmpty(pixel1.x,pixel1.y-1, true)) {
                            var headPixel1 = pixelMap[pixel1.x][pixel1.y-1]
                            if (headPixel1.element === "head") {
                                if (!isEmpty(coord1.x,coord1.y-1, true)) {
                                    var headPixel2 = pixelMap[coord1.x][coord1.y-1]
                                    if (headPixel2.element !== "body" && !(elements[headPixel2.element].movable !== true || elements[headPixel2.element].noMix === true)) {
                                        tryMove(pixel1,coord1.x,coord1.y);
                                        swapPixels(headPixel1,headPixel2);
                                    }
                                }
                                else if (isEmpty(coord1.x,coord1.y-1)) {
                                    tryMove(pixel1,coord1.x,coord1.y);
                                    tryMove(headPixel1, pixel1.x, pixel1.y-1)
                                }
                            }
                        }
                }
            }
            else if (exists1 && isEmpty(coord2.x,coord2.y)) {
                var pixel1 = pixelMap[coord1.x][coord1.y]
                if (pixel1.element !== "head" && pixel1.element !== "body") {
                    tryMove(pixel1,coord2.x,coord2.y);
                }
                else if (pixel1.element !== "head" && pixel1.element === "body") {
                        if (!isEmpty(pixel1.x,pixel1.y-1, true)) {
                            var headPixel1 = pixelMap[pixel1.x][pixel1.y-1]
                            if (headPixel1.element === "head") {
                                if (!isEmpty(coord2.x,coord2.y-1, true)) {
                                    var headPixel2 = pixelMap[coord2.x][coord2.y-1]
                                    if (headPixel2.element !== "body" && !(elements[headPixel2.element].movable !== true || elements[headPixel2.element].noMix === true)) {
                                        tryMove(pixel1,coord2.x,coord2.y);
                                        swapPixels(headPixel1,headPixel2);
                                    }
                                }
                                else if (isEmpty(coord2.x,coord2.y-1)) {
                                    tryMove(pixel1,coord2.x,coord2.y);
                                    tryMove(headPixel1, pixel1.x, pixel1.y-1)
                                }
                            }
                        }
                }
            }
            else if (exists1 && exists2) {
                var pixel1 = pixelMap[coord1.x][coord1.y];
                var pixel2 = pixelMap[coord2.x][coord2.y];
                if (pixel1.element !== "head" && pixel2.element !== "head" && pixel1.element !== "body" && pixel2.element !== "body") {
                    swapPixels(pixel1,pixel2);
                }
                else if (pixel1.element !== "head" && pixel2.element !== "head" && (pixel1.element === "body" || pixel2.element === "body")) {
                    if (pixel1.element === "body") {
                        if (!isEmpty(pixel1.x,pixel1.y-1, true)) {
                            var headPixel1 = pixelMap[pixel1.x][pixel1.y-1]
                            if (headPixel1.element === "head") {
                                if (!isEmpty(pixel2.x,pixel2.y-1, true)) {
                                    var headPixel2 = pixelMap[pixel2.x][pixel2.y-1]
                                    if (headPixel2.element !== "body" && !(elements[headPixel2.element].movable !== true || elements[headPixel2.element].noMix === true)) {
                                        swapPixels(pixel1,pixel2);
                                        swapPixels(headPixel1,headPixel2);
                                    }
                                }
                                else if (isEmpty(pixel2.x,pixel2.y-1)) {
                                    swapPixels(pixel1,pixel2)
                                    tryMove(headPixel1, pixel1.x, pixel1.y-1)
                                }
                            }
                        }
                    }
                    else if (pixel2.element === "body") {
                        if (!isEmpty(pixel2.x,pixel2.y-1, true)) {
                            var headPixel1 = pixelMap[pixel2.x][pixel2.y-1]
                            if (headPixel1.element === "head") {
                                if (!isEmpty(pixel1.x,pixel1.y-1, true)) {
                                    var headPixel2 = pixelMap[pixel1.x][pixel1.y-1]
                                    if (headPixel2.element !== "body" && !(elements[headPixel2.element].movable !== true || elements[headPixel2.element].noMix === true)) {
                                        swapPixels(pixel1,pixel2);
                                        swapPixels(headPixel1,headPixel2);
                                    }
                                }
                                else if (isEmpty(pixel1.x,pixel1.y-1)) {
                                    swapPixels(pixel1,pixel2);
                                    tryMove(headPixel1, pixel2.x,pixel2.y-1)
                                }
                            }
                        }
                    }
                }
                if (elements[pixel1.element].onMix) {
                    elements[pixel1.element].onMix(pixel1,pixel2);
                }
                if (elements[pixel2.element].onMix) {
                    elements[pixel2.element].onMix(pixel2,pixel1);
                }
            }
        }
    }

    if (btemp.sticking) {
        btemp.move = false;
    }
    
    // Move First Priority
    if (btemp.move) {
        if (move1Spots.length > 0) {
            // While move1Spots is not empty
            while (move1Spots.length > 0) {
                // coords = random item of move1Spots
                var j = Math.floor(Math.random()*move1Spots.length);
                var coords = move1Spots[j];
                var nx = coords.x;
                var ny = coords.y;
                moved = tryMove(pixel,nx,ny,btemp.leaveBehind1 || btemp.leaveBehind);
                if (moved) {
                    break;
                }
                else {
                    // remove coords from move1Spots
                    move1Spots.splice(j,1);
                }

                
            }
        }
        // Move Second Priority
        if (!moved && move2Spots.length > 0) {
            // While move2Spots is not empty
            while (move2Spots.length > 0) {
                // coords = random item of move2Spots
                var j = Math.floor(Math.random()*move2Spots.length);
                var coords = move2Spots[j];
                var nx = coords.x;
                var ny = coords.y;
                moved = tryMove(pixel,nx,ny,btemp.leaveBehind2 || btemp.leaveBehind);
                if (moved) {
                    if (btemp.C2 && elements[btemp.C2]) {
                        changePixel(pixel,btemp.C2);
                    }
                    break;
                }
                else {
                    // remove coords from move2Spots
                    move2Spots.splice(j,1);
                }
            }
        }
    }
    doAirDensity(pixel);


    // Change tempearture if needed (unused)
    /*if (info.tempChange != undefined) {
        pixel.temp += info.tempChange;
        pixelTempCheck(pixel);
    }*/

    // Burning
    doBurning(pixel);

    // Heat Transfer
    if (info.insulate !== true) {
        doHeat(pixel);
    }

    // Electricity Transfer
    doElectricity(pixel);

    // Staining
    if (info.stain) {
        doStaining(pixel);
    }

}
