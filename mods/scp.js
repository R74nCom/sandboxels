window.addEventListener("load", () => { 
    document.getElementById("elementButton-mask_head")?.remove()
})

window.addEventListener("load", () => { 
    document.getElementById("elementButton-mask_body")?.remove()
})

window.addEventListener("load", () => { 
    document.getElementById("elementButton-zombie")?.remove()
})

window.addEventListener("load", () => { 
    document.getElementById("elementButton-z_head")?.remove()
})

window.addEventListener("load", () => { 
    document.getElementById("elementButton-z_body")?.remove()
})

window.addEventListener("load", () => { 
    document.getElementById("elementButton-REDACTED")?.remove()
})

window.addEventListener("load", () => { 
    document.getElementById("elementButton-hyper_tickle_monster")?.remove()
})

window.addEventListener("load", () => { 
    document.getElementById("elementButton-calm_682")?.remove()
})

window.addEventListener("load", () => { 
    document.getElementById("elementButton-mad_682")?.remove()
})

// Coding junk past this point

// also hi jonny ray 

elements.anomalous_essence = {
    hidden: true,
    color: "#f7ead0",
    behavior: behaviors.GAS,
    category: "scp",
    state: "gas",
    density: 0.50,
}; 

elements.SCP_008 = {
    color: "#11111f",
    behavior: [
        "M2|M1|M2",
        "M1|XX|M1",
        "M2|M1|M2",
    ],
    reactions: {
        "head": { elem1:null, elem2:"z_head" , chance:0.5 },
        "body": { elem1:null, elem2:"z_body" , chance:0.5 },
        "frog": { elem2:"SCP_008" , chance:0.5 },
        "ant": { elem2:"SCP_008" , chance:0.5 },
        "bee": { elem2:"SCP_008" , chance:0.5 },
        "fish": { elem2:"SCP_008" , chance:0.5 },
        "firefly": { elem2:"SCP_008" , chance:0.5 },
        "chlorine": { elem1: [null,null,null,null,"anomalous_essence"] , chance:0.01 },
        "liquid_chlorine": { elem1: [null,null,null,null,"anomalous_essence"] , chance:0.01 },
        "light": { elem1: [null,null,null,null,"anomalous_essence"] , chance:0.01 },
    },
    tempHigh: 1000,
    stateHigh: [null,null,null,null,"anomalous_essence"],
    tempLow: -100,
    stateLow: "frozen_008",
    category: "scp",
    state: "gas",
    density: 100,
},

elements.frozen_008 = {
    color: "#242424",
    behavior: [
        "XX|XX|XX",
        "XX|DL%0.001|X",
        "M2%1.0|M1%1.0|M2%1.0",
    ],
    reactions: {
        "head": { elem1:null, elem2:"z_head" , chance:0.4 },
        "body": { elem1:null, elem2:"z_body" , chance:0.4 },
        "chlorine": { elem1: [null,null,null,null,"anomalous_essence"] , chance:0.01 },
        "liquid_chlorine": { elem1: [null,null,null,null,"anomalous_essence"] , chance:0.01 },
        "light": { elem1: [null,null,null,null,"anomalous_essence"] , chance:0.01 },
    },
    temp: -50,
    tempHigh: 0,
    stateHigh: "SCP_008",
    category: "scp",
    state: "solid",
    density: 95,
},

elements.possessive_mask = {
	color: ["#f7ead0","#faf9f6","#e9e6db"],
    category: "scp",
    behavior: [
        "CR:black_acid%0.1|CR:black_acid%0.5|CR:black_acid%0.1",
        "CR:black_acid%0.5|XX|CR:black_acid%0.5",
        "CR:black_acid%0.1|CR:black_acid%0.5 AND M1|CR:black_acid%0.1",
    ],
	breakInto: ["porcelain_shard","porcelain_shard","black_acid","black_acid"],
    density: 800,
    state: "solid",
    tempHigh: 3500,
    stateHigh: "porcelain_shard",
    reactions: {
        "head": { elem1:null, elem2: "mask_head" , chance:0.2 },
        "body": { elem1:null, elem2: "mask_body" , chance:0.1 },
        "z_head": { elem1:null, elem2: "mask_head" , chance:0.1 },
        "z_body": { elem1:null, elem2: "mask_body" , chance:0.05 },
    },
},

elements.mask_body = {
    color: ["#242424","#069469","#047e99","#7f5fb0"],
    category: "scp",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["black_acid","rotten_meat","bone"],
    reactions: {
        "cancer": { elem1:"cancer", chance:0.005 },
        "egg": { elem2:"yolk", chance:0.5, oneway:true },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "mask_head") {
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
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "mask_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") { // If head is not mask head, make it one
            var head = pixelMap[pixel.x][pixel.y-1];
            changePixel(head,"mask_head");
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
        }
        else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "z_head") { // If head is not mask head, make it one
            var head = pixelMap[pixel.x][pixel.y-1];
            changePixel(head,"mask_head");
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
            // create black acid if decapitated 10% chance
            if (Math.random() < 0.1 && !pixel.charge) {
                createPixel("black_acid", pixel.x, pixel.y-1);
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
        }

    }
},

elements.mask_head = {
    color: ["#f7ead0","#faf9f6","#e9e6db"],
    category: "scp",
    hidden: true,
    density: 2280,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 250,
    stateHigh: "possessive_mask",
    tempLow: -30,
    stateLow: "possessive_mask",
    burn: 10,
    burnTime: 250,
    burnInto: "possessive_mask",
    breakInto: "possessive_mask",
    forceSaveColor: true,
    reactions: {
        "cancer": { elem1: "possessive_mask", chance:0.05 },
        "tea": { elem2:null, chance:0.2 },
        "alcohol": { elem2:null, chance:0.2 },
    },
    properties: {
        dead: false
    },
    behavior: [
        "CR:black_acid%0.1|CR:black_acid%0.5|CR:black_acid%0.1",
        "CR:black_acid%0.5|XX|CR:black_acid%0.5",
        "CR:black_acid%0.1|CR:black_acid%0.5 AND M1|CR:black_acid%0.1",
    ],
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into the mask if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"possessive_mask");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "mask_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") { // If body is not mask body, make it one
            var body = pixelMap[pixel.x][pixel.y+1];
            changePixel(body,"mask_body");
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "z_body") { // If body is not mask body, make it one
            var body = pixelMap[pixel.x][pixel.y+1];
            changePixel(body,"mask_body");
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("black_acid", pixel.x, pixel.y+1);
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
},

elements.black_acid = {
    hidden: true,
    color: ["#00000f","#111111","#242424"],
    behavior: [
        "XX|DB%5|XX",
        "DB%6 AND M2%10|XX|DB%6 AND M2%10",
        "DB%6 AND M2%10|DB%11 AND M1|DB%6 AND M2%10",
    ],
    ignore: [/*"SCP_804"*/"shy_head","shy_body","SCP_055","head","body","z_body","z_head","possessive_mask","mask_body","mask_head","glass_shard","porcelain_shard","rad_shard","color_sand","sand","iron","steel","glass","rad_glass","stained_glass","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","oxygen","ozone","gold_coin","silver","nickel","calcium"],
    reactions: {
        "caustic_potash": { elem1:null, elem2:"potassium_salt" },
        "water": { elem1:null, elem2:"dirty_water" },
        "salt_water": { elem1:null, elem2:"water" },
        "sugar_water": { elem1:null, elem2:"water" },
        "pool_water": { elem1:null, elem2:"water" },
        "plant": { elem1:null, elem2:"dead_plant" },
        "tree_branch": { elem1:null, elem2:"wood" },
        "charcoal": { elem1:null, elem2:"carbon_dioxide" },
        "rock": { elem1:null, elem2:"sand", chance:0.05 },
        "baking_soda": { elem1:null, elem2:["carbon_dioxide","foam"] },
        "calcium": { elem1:null, elem2:"hydrogen", chance:0.01 },
        "zinc": { elem1:null, elem2:null, chance:0.03 },
        "sugar": { elem1:null, elem2:"carbon_dioxide" },
        "glass": { elem1:null, elem2: null , chance:0.01 },
        "rad_glass": { elem1:null, elem2: null , chance:0.01 },
        "stained_glass": { elem1:null, elem2: null , chance:0.01 },
        "glass_shard": { elem1:null, elem2: null , chance:0.015 },
        "rad_shard": { elem1:null, elem2: null , chance:0.015 },
        "porcelain_shard": { elem1:null, elem2: null , chance:0.015 },
        "copper": { elem1:null, elem2: null , chance:0.02 },
        "gold": { elem1:null, elem2: null , chance:0.02 },
        "porcelain": { elem1:null, elem2: null , chance:0.01 },
        "plastic": { elem1:null, elem2: null , chance:0.01 },
        "molten_plastic": { elem1:null, elem2: null , chance:0.02 },
        "gold_coin": { elem1:null, elem2: "gold" , chance:0.1 },
        "silver": { elem1:null, elem2: null , chance:0.02 },
        "nickel": { elem1:null, elem2: null , chance:0.02 },
        "calcium": { elem1:null, elem2: null , chance:0.02 },
        "iron": { elem1:null, elem2: null , chance:0.02 },
        "steel": { elem1:null, elem2: null , chance:0.02 },
        "concrete": { elem1:null, elem2: null , chance:0.05 },
        "rock": { elem1:null, elem2: null , chance:0.04 },
        "dirt": { elem1:null, elem2: null , chance:0.05 },
        "sand": { elem1:null, elem2: null , chance:0.015 },
        "color_sand": { elem1:null, elem2: null , chance:0.015 },
        "mask_head": { elem1:null, elem2: "possessive_mask" , chance:0.001},
        "mask_body": { elem1:null, elem2: null , chance:0.001 },
        "head": { elem1:null, elem2: null , chance:0.01 },
        "body": { elem1:null, elem2: null , chance:0.01 },
        "z_head": { elem1:null, elem2: null , chance:0.02 },
        "z_body": { elem1:null, elem2: null , chance:0.02 },
        /*"SCP_804": { elem1:null, elem2: null , chance:0.02 },*/
    },
    category: "scp",
    tempHigh: 1000,
    stateHigh: null,
    tempLow: -58.88,
    burn: 30,
    burnTime: 10,
    burnInto: ["fire","fire","fire","fire","fire","fire","fire","fire","ash","ash","anomalous_essence"],
    fireColor: "#111111",
    state: "liquid",
    density: 1105,
    stain: 0.5,
},

elements.SCP_055 = {
    color: "#00000f",
    excludeRandom: true,
    behavior: [
        ["XX","XX","XX"],
        ["XX","CH:REDACTED","XX"],
        ["XX","XX","XX"]
    ],
    category: "scp",
    state: "solid",
    tempHigh: 55055055055,
    stateHigh: ["metal_scrap","smoke","smoke","anomalous_essence"],
},

elements.REDACTED = {
    hidden: true,
    color: "#00000f",
    excludeRandom: true,
    behavior: [
        ["XX","xx","XX"],
        ["XX","EX","XX"],
        ["XX","XX","XX"]
    ],
    category: "scp",
    state: "solid",
},

elements.plague_doctor = {
    category: "scp",
	color: ["#f7ead0","#faf9f6","#e9e6db"],
    category: "scp",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("doc_body", pixel.x, pixel.y+1);
            pixel.element = "doc_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("doc_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "doc_body";
        }   
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["doc_body","doc_head"],
    cooldown: defaultCooldown
},

elements.doc_head = {
    hidden: true,
	color: ["#f7ead0","#faf9f6","#e9e6db"],
    category: "scp",
	breakInto: ["rotten_meat","bone","bone","blood","anomalous_essence"],
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
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "doc_body") {
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
    },
    density: 1100,
    state: "solid",
    conduct: .05,
    tempHigh: 350,
    stateHigh: "rotten_meat",
    burn: .01,
    burnTime: 300,
    burnInto: "rotten_meat",
    reactions: {
		"alcohol": { elem2 : null , chance:0.5 },
    },
},

elements.doc_body = {
    hidden: true,
	color: ["#11111f","#242424"],
    category: "scp",
	 breakInto: ["rotten_meat","rotten_meat","bone","blood","anomalous_essence"],
	 properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "doc_head") {
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
                changePixel(pixel,"bone");
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "doc_head") {
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

    },
    density: 1100,
    state: "solid",
    conduct: .005,
    tempHigh: 350,
    stateHigh: "rotten_meat",
    burn: .01,
    burnTime: 300,
    burnInto: "rotten_meat",
    forceSaveColor: true,
    reactions: {
		"head": { elem2 : "z_head" , chance:0.3},
        "body": { elem2 : "z_body" , chance:0.3},
    },
},

elements.zombie = {
	color: ["#75816B","#4D6B53"],
    category: "scp",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
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
    hidden: true,
	color: ["#75816B","#4D6B53"],
    category: "scp",
	breakInto: ["rotten_meat","bone","bone","blood","anomalous_essence"],
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
    },
},

elements.z_body = {
    hidden: true,
	color: ["#11111f","#069469","#047e99","#7f5fb0"],
    category: "scp",
	 breakInto: ["rotten_meat","rotten_meat","bone","blood","anomalous_essence"],
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
    },
},

elements.shy_guy = {
    category: "scp",
	color: ["#f7ead0","#faf9f6","#e9e6db"],
    category: "scp",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("shy_body", pixel.x, pixel.y+1);
            pixel.element = "shy_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("shy_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "shy_body";
            pixel.color = pixelColorPick(pixel)
        }   
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["shy_body","shy_head"],
    cooldown: defaultCooldown
},

elements.shy_head = {
    hidden: true,
	color: ["#f7ead0","#faf9f6","#e9e6db"],
    category: "scp",
	breakInto: ["bone","bone","blood","bone","bone","blood","anomalous_essence"],
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
                changePixel(pixel,"bone");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "shy_body") {
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
    },
    density: 1070,
    state: "solid",
    conduct: .05,
    tempHigh: 3500,
    stateHigh: "bone",
    burn: .01,
    burnTime: 3000,
    burnInto: "bone",
    reactions: {
		"homunculus": { elem2 : ["blood","slime","blood","slime","rotten_meat",null] },
		"head": { elem2 : ["blood","blood","blood","bone",null] },
		"body": { elem2: ["blood","blood","meat","bone",null] },
        "rat": { elem2: ["infection","rotten_meat",null]},
        "frog": { elem2: ["slime",null] },
        "cell": { elem2: ["dna","water",null] },
        "cancer": { elem2: ["dna","dirty_water",null], },
        "blood": { elem2: null, chance:0.2 },
        "bone": { elem2: null, chance:0.2 },
        "meat": { elem2: [null,null,null,null,null,null,"rotten_meat"], chance:0.15 },
        "dna": { elem2: null, chance:0.2 },
        "water": { elem2: "dirty_water", chance:0.01 },
        "slime": { elem2: ["dirty_water",null], chance:0.2 },
    },
},

elements.shy_body = {
    hidden: true,
	color: ["#f7ead0","#faf9f6","#e9e6db"],
    category: "scp",
	 breakInto: ["bone","bone","blood","bone","bone","blood","anomalous_essence"],
	 properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "shy_head") {
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
                changePixel(pixel,"bone");
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "shy_head") {
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

    },
    density: 1080,
    state: "solid",
    conduct: .005,
    tempHigh: 3500,
    stateHigh: "bone",
    burn: .01,
    burnTime: 3000,
    burnInto: "bone",
    forceSaveColor: true,
    reactions: {
		"homunculus": { elem2 : ["blood","slime","blood","slime","rotten_meat",null] },
		"head": { elem2 : ["blood","blood","blood","meat","bone",null] },
		"body": { elem2: ["blood","blood","meat","bone",null] },
        "rat": { elem2: ["infection","rotten_meat"]},
        "frog": { elem2: "slime" },
        "cell": { elem2: ["dna","water",null] },
        "cancer": { elem2: ["dna","dirty_water"] },
        "water": { elem2: "dirty_water", chance:0.01 },
    },
},

elements.SCP_682 = {
    color: ["#424242","#75816B","#4D6B53"],
    behavior: [
        "M2%0.5|M2%0.3|M2%0.5",
        "M1%10|XX|M1%10",
        "XX|M1|XX",
    ],
    category: "scp",
    density: 7500,
    reactions: {
        "head": { elem2 : ["bone","blood",null] , chance:10 },
        "body": { elem1 : "mad_682" , elem2 : ["meat","blood",null] , chance:10 },
        "z_head": { elem2 : ["bone","infection",null] , chance:10 },
        "z_body": { elem1 : "mad_682" , elem2 : ["rotten_meat","infection",null] , chance:10 },
        "homunculus": { elem2 : ["slime","blood",null] , chance:10 },
        "frog": { elem2 : ["slime","blood",null] , chance:10 },
        "bird": { elem2 : ["feather","blood",null] , chance:10 },
        "meat": { elem2 : null , chance:0.2 },
        "cooked_meat": { elem2 : null , chance:0.3 },
        "tickle_monster": { elem1 : "calm_682" , chance:0.1 },
        "acid": { elem1 : "calm_682" , chance:0.2 },
        "rotten_meat": { elem2 : null , chance:0.1 },
        "blood": { elem2 : null , chance:0.2 },
        "bone": { elem2 : ["blood",null,null] , chance:0.1 },
        "bone_marrow": { elem2 : ["blood",null] , chance:0.1 },
        "aluminum": { elem2 : "metal_scrap" , chance:0.07 },
        "steel": { elem2 : "metal_scrap" , chance:0.05 },
        "iron": { elem2 : "metal_scrap" , chance:0.08 },
        "glass": { elem2 : "glass_shard" , chance:0.1 },
        "wood": { elem2 : "sawdust" , chance:0.1 },
        "concrete": { elem2 : "dust" , chance:0.05 },
        "dust": { elem2 : null , chance:0.1 },
    },
    state: "solid",
    hardness: 1,
    conduct: .1,
},

elements.calm_682 = {
    color: ["#424242","#75816B","#4D6B53"],
    behavior: [
        "M2%0.5|M2%0.3|M2%0.5",
        "M1%10|CH:mad_682%0.5|M1%10",
        "XX|M1|XX",
    ],
    category: "scp",
    density: 7350,
    excludeRandom: true,
    reactions: {
        "meat": { elem2 : null , chance:0.2 },
        "bone": { elem2 : null , chance:0.1 },
        "blood": { elem2 : null , chance:0.1 },
        "cooked_meat": { elem2 : null , chance:0.3 },
        "acid": { elem1 : "calm_682" , chance:0.05 },
        "tickle_monster": { elem1 : "calm_682" , chance:99.9 },
    },
    hidden: true,
    state: "solid",
    hardness: 1,
    conduct: .1,
},

elements.mad_682 = {
    color: ["#424242","#75816B","#4D6B53"],
    behavior: [
        "M2%0.5|M2%0.3|M2%0.5",
        "M1%10 AND CH:concrete>dust AND DL:dust|CH:SCP_682%0.3|M1%10 AND CH:concrete>dust AND DL:dust",
        "XX|M1|XX",
    ],
    category: "scp",
    density: 8000,
    excludeRandom: true,
    reactions: {
        "head": { elem2 : ["bone","blood",null] },
        "body": { elem2 : ["meat","blood",null] },
        "homunculus": { elem2 : ["slime","blood",null] },
        "frog": { elem2 : ["slime","blood",null] },
        "bird": { elem2 : ["feather","blood",null] },
        "meat": { elem2 : null , chance:0.5 },
        "cooked_meat": { elem2 : null , chance:0.5 },
        "rotten_meat": { elem2 : null , chance:0.2 },
        "blood": { elem2 : null , chance:0.5 },
        "bone": { elem2 : ["blood",null,null] , chance:0.2 },
        "bone_marrow": { elem2 : ["blood",null] , chance:0.2 },
        "aluminum": { elem2 : "metal_scrap" , chance:1.0 },
        "steel": { elem2 : "metal_scrap" , chance:0.2 },
        "iron": { elem2 : "metal_scrap" , chance:0.3 },
        "lead": { elem2 : ["metal_scrap","metal_scrap","radiation"] , chance:0.3 },
        "glass": { elem2 : "glass_shard" },
        "wood": { elem2 : "sawdust" },
        "concrete": { elem2 : "dust" , chance:0.1 },
        "dust": { elem2 : null , chance:0.1 },
    },
    hidden: true,
    state: "solid",
    hardness: 1,
    conduct: .1,
},

// SCP-804 WIP template
/* 
elements.SCP_804 = {
    color:"#beigeish",
    category: "scp",
    excludeRandom: true,
    state: "solid",
},
*/

elements.tickle_monster = {
    color: "#FFA500",
    behavior: [
        "M2%0.5|M2%0.3 AND CR:fragrance%0.05|M2%0.5",
        "M1%10|XX|M1%10",
        "XX|M1|XX",
    ],
    category: "scp",
    density: 550,
    reactions: {
        "sugar_water": { elem2 : "water" , chance:0.2 },
        "dirty_water": { elem2 : "water" , chance:0.2 },
		"candy": { elem2 : null },
		"sugar": { elem2 : null },
        "sauce": { elem2 : null },
        "salt": { elem2 : null , chance:0.2 },
        "cheese": { elem2 : null , chance:0.2 },
        "melted_cheese": { elem2 : null },
        "baked_potato": { elem2 : null , chance:0.2 },
        "mashed_potato": { elem2 : null , chance:0.2 },
        "bread": { elem2 : null , chance:0.2 },
        "toast": { elem2 : null , chance:0.2 },
        "jelly": { elem2 : null },
        "nut_butter": { elem2 : null },
        "grape": { elem2 : null , chance:0.2 },
        "ice_cream": { elem2 : null },
        "juice": { elem2 : null },
        "milk": { elem2 : null },
        "gingerbread": { elem2 : null , chance:0.2 },
        "crumb": { elem2 : null , chance:0.2 },
        "cream": { elem2 : null },
        "baked_batter": { elem2 : null },
        "frozen_yogurt": { elem2 : null },
        "yogurt": { elem2 : null },
        "popcorn": { elem2 : null , chance:0.2 },
        "chocolate": { elem2 : null },
        "chocolate_milk": { elem2 : null },
        "melted_chocolate": { elem2 : null },
        "caramel": { elem2 : null },
        "ash": { elem2 : null , chance:0.2 },
        "dust": { elem2 : null , chance:0.2 },
        "alchohol": { elem1 : "hyper_tickle_monster", elem2 : null },
        "pilk": { elem1 : "hyper_tickle_monster", elem2 : null },
        "coffee_bean": { elem1 : "hyper_tickle_monster", elem2 : null },
        "coffee_ground": { elem1 : "hyper_tickle_monster", elem2 : null },
		"soda": { elem1 : "hyper_tickle_monster", elem2 : null },
        "coffee": { elem1 : "hyper_tickle_monster", elem2 : null },
        "seltzer": { elem1 : "hyper_tickle_monster", elem2 : null },
    },
    state: "liquid",
    conduct: .5,
    temp: 20,
    tempHigh: 350,
    stateHigh: ["smoke","smoke","smoke","slime","anomalous_essence"],
    burn: .1,
    burnTime: 300,
    burnInto: ["smoke","smoke","smoke","slime","anomalous_essence"],
    stain: 0.03,
},

elements.hyper_tickle_monster = {
    color: "#FFA500",
    hidden: true,
    behavior: [
        "XX|XX|XX",
        "XX|CH:tickle_monster%1.0|XX",
        "XX|XX|XX",
    ],
    tick: behaviors.BOUNCY,
    category: "scp",
    density: 575,
    reactions: {
        "sugar_water": { elem2 : "water" },
        "dirty_water": { elem2 : "water" },
		"candy": { elem2 : null },
		"sugar": { elem2 : null },
        "sauce": { elem2 : null },
        "salt": { elem2 : null },
        "cheese": { elem2 : null },
        "melted_cheese": { elem2 : null },
        "baked_potato": { elem2 : null },
        "mashed_potato": { elem2 : null },
        "bread": { elem2 : null },
        "toast": { elem2 : null },
        "jelly": { elem2 : null },
        "nut_butter": { elem2 : null },
        "grape": { elem2 : null },
        "ice_cream": { elem2 : null },
        "juice": { elem2 : null },
        "milk": { elem2 : null },
        "gingerbread": { elem2 : null },
        "crumb": { elem2 : null },
        "cream": { elem2 : null },
        "baked_batter": { elem2 : null },
        "frozen_yogurt": { elem2 : null },
        "yogurt": { elem2 : null },
        "popcorn": { elem2 : null },
        "chocolate": { elem2 : null },
        "chocolate_milk": { elem2 : null },
        "melted_chocolate": { elem2 : null },
        "alchohol": { elem2 : null },
        "pilk": { elem2 : null },
		"soda": { elem2 : null },
        "coffee": { elem2 : null },
        "seltzer": { elem2 : null },
    },
    state: "liquid",
    conduct: .5,
    temp: 20,
    tempHigh: 350,
    stateHigh: ["smoke","smoke","smoke","slime","anomalous_essence"],
    burn: .1,
    burnTime: 300,
    burnInto: ["smoke","smoke","smoke","slime","anomalous_essence"],
    stain: 0.08,
};

// SCPs with ID over 999 here