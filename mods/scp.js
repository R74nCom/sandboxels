/* mod by nekonico aka doobienecoarc */

window.addEventListener("load", () => { 
    document.getElementById("elementButton-mask_head")?.remove()
})
window.addEventListener("load", () => { 
    document.getElementById("elementButton-mask_body")?.remove()
})
window.addEventListener("load", () => { 
    document.getElementById("elementButton-infected_skin")?.remove()
})
window.addEventListener("load", () => { 
    document.getElementById("elementButton-infected_meat")?.remove()
})
window.addEventListener("load", () => { 
    document.getElementById("elementButton-frozen_infected_meat")?.remove()
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

// Coding junk above this point

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
	    "skin": { elem1:null, elem2: ["infected_skin","infected_skin","infected_meat"] , chance:0.3 },
	    "blood": { elem1:null, elem2:"infection" , chance:0.6 },
	    "meat": { elem1:null, elem2:"infected_meat" , chance:0.4 },
	    "rotten_meat": { elem1:null, elem2:"infected_meat" , chance:0.5 },
	    "frozen_meat": { elem1:null, elem2:"frozen_infected_meat" , chance:0.3 },
        "frog": { elem2:"SCP_008" , chance:0.5 },
        "ant": { elem2:"SCP_008" , chance:0.5 },
        "bee": { elem2:"SCP_008" , chance:0.5 },
        "fish": { elem2:"SCP_008" , chance:0.5 },
        "firefly": { elem2:"SCP_008" , chance:0.5 },
        "chlorine": { elem1: null , chance:0.01 },
        "liquid_chlorine": { elem1: null , chance:0.01 },
        "light": { elem1: null , chance:0.01 },
    },
    tempHigh: 750,
    stateHigh: null,
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
        "M2%0.001|DL%0.001|M2%0.001",
        "M2%0.01|M1%1.0|M2%0.01",
    ],
    reactions: {
        "head": { elem1:null, elem2:"z_head" , chance:0.4 },
        "body": { elem1:null, elem2:"z_body" , chance:0.4 },
	    "skin": { elem1:null, elem2:"frozen_infected_meat" , chance:0.4 },
	    "blood": { elem1:null, elem2:"infection" , chance:0.6 },
	    "meat": { elem1:null, elem2:"frozen_infected_meat" , chance:0.4 },
	    "rotten_meat": { elem1:null, elem2:"frozen_infected_meat" , chance:0.5 },
	    "frozen_meat": { elem1:null, elem2:"frozen_infected_meat" , chance:0.4 },
        "chlorine": { elem1: null , chance:0.01 },
        "liquid_chlorine": { elem1: null , chance:0.01 },
        "light": { elem1: null , chance:0.01 },
    },
    temp: -50,
    tempHigh: 0,
    stateHigh: "SCP_008",
    category: "scp",
    state: "solid",
    density: 95,
},
	
elements.infected_skin = {
    color: ["#75816B","#4D6B53"],
    singleColor: true,
    behavior: [
        "XX|CR:stench,stench,stench,SCP_008,fly%0.05 AND CH:skin>infected_skin%25|XX",
        "CH:skin>infected_skin%25|CH:infected_meat%0.5|CH:skin>infected_skin%25",
        "M2%1|M1%1.0 AND CH:skin>infected_skin%25|M2%1",
    ],
    tick: function(pixel) {
        if (pixel.temp > 40 && Math.random() < 0.003) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (isEmpty(x,y)) {
                    pixel.temp -= 20;
                    createPixel("infection",x,y)
                    break;
                }
            }
        }
        if (pixel.temp < 36 && Math.random() < 0.1) {
            pixel.temp += 1;
        }
        doDefaults(pixel);
    },
    reactions: {
        "cell": { chance:0.01, func:function(pixel1,pixel2){
            changePixel(pixel2,"infected_skin");
            pixel2.color = pixelColorPick(pixel2,RGBToHex(pixel1.color.match(/\d+/g)))
            if (pixel1.origColor) { pixel2.origColor = pixel1.origColor }
        } },
	    "water": { elem2:"dirty_water" },
        "salt_water": { elem2:"dirty_water" , chance:0.5 },
        "sugar_water": { elem2:"dirty_water" },
        "seltzer": { elem2:"dirty_water" },
        "meat": { elem2:"infected_meat", chance:0.5 },
        "rotten_meat": { elem2:"infected_meat", chance:0.5 },
        "frozen_meat": { elem2:"frozen_infected_meat", chance:0.5 },
	    "fly": { elem2: ["dead_bug","dead_bug","SCP_008"] , chance:0.2},
	    "blood": { elem2:"infection" , chance:0.6 },
	    "skin": { elem2:"infected_skin" , chance:0.6 },
        "acid": { elem1:"infection" },
        "soap": { elem1:null, elem2:null, chance:0.005 },
        "light": { stain1:"#825043" },
        "poison": { stain1:"#cc564b" },
        "poison_gas": { stain1:"#cc564b" },
        "infection": { stain1:"#cc564b" },
        "pollen": { stain1:"#cc564b" },
        "dust": { stain1:"#cc564b" },
        "flea": { stain1:"#cc564b" },
        "mushroom_spore": { stain1:"#cc564b" },
        "mushroom_stalk": { stain1:"#cc564b" },
        "chlorine": { stain1:"#cc564b" },
        "quicklime": { stain1:"#cc564b" },
    },
    category:"solids",
    breakInto: [null,null,"SCP_008","infection","dust"],
    temp: 37,
    tempHigh: 200,
    stateHigh: ["cooked_meat","cooked_meat","cooked_meat","SCP_008"],
    tempLow: -18,
    stateLow: "frozen_008_meat",
    burn:5,
    burnTime:400,
    burnInto: ["cooked_meat","cooked_meat","SCP_008"],
    state: "solid",
    density: 1010,
    conduct: 0.04,
    movable: false,
},
	    
elements.infected_meat = {
    color: ["#b8b165","#b89765"],
    behavior: [
        "XX|CR:stench,stench,stench,SCP_008,fly%0.25 AND CH:skin>infected_skin%1|XX",
        "SP%25 AND CH:skin>infected_skin%1|XX|SP%25 AND CH:skin>infected_skin%1",
        "M2%0.5|M1 AND CH:meat>infected_meat%1|M2%0.5",
    ],
    reactions: {
        "water": { elem2:"dirty_water" },
        "salt_water": { elem2:"dirty_water" , chance:0.5 },
        "sugar_water": { elem2:"dirty_water" },
        "seltzer": { elem2:"dirty_water" },
        "meat": { elem2:"infected_meat", chance:0.5 },
        "rotten_meat": { elem2:"infected_meat", chance:0.5 },
        "frozen_meat": { elem2:"frozen_infected_meat", chance:0.5 },
	    "fly": { elem2: ["dead_bug","dead_bug","SCP_008"] , chance:0.2},
	    "blood": { elem2:"infection" , chance:0.6 },
	    "skin": { elem2:"infected_skin" , chance:0.6 },
    },
    tempHigh: 300,
    stateHigh: ["SCP_008","ash","ammonia"],
    tempLow: -20,
    stateLow: "frozen_infected_meat",
    category:"scp",
    hidden: true,
    burn:12,
    burnTime:200,
    burnInto:["SCP_008","ash","ammonia"],
    state: "solid",
    density: 1005,
    conduct: 0.1,
    isFood: true
},

elements.frozen_infected_meat = {
    color: ["#82AEC0","#80808F","#9CAC98"],
    behavior: [
        "XX|XX|XX",
        "SP%95|XX|SP%95",
        "XX|M1 AND CH:frozen_meat,meat>frozen_infected_meat%1|XX",
    ],
    reactions: {
        "water": { elem2:"dirty_water" },
        "salt_water": { elem1:"infected_meat",elem2:"dirty_water" , chance:0.5 },
        "sugar_water": { elem2:"dirty_water" },
        "seltzer": { elem2:"dirty_water" },
        "meat": { elem2:"frozen_infected_meat", chance:0.5 },
        "rotten_meat": { elem2:"frozen_infected_meat", chance:0.5 },
        "frozen_meat": { elem2:"frozen_infected_meat", chance:0.5 },
	    "fly": { elem2: ["dead_bug","dead_bug","SCP_008"] , chance:0.2},
	    "blood": { elem2:"infection" , chance:0.6 },
    },
    temp: -20,
    tempHigh: 10,
    stateHigh: "infected_meat",
    category:"scp",
    hidden: true,
    state: "solid",
    density: 1005,
    conduct: 0.05,
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
    burnInto: ["fire","fire","fire","fire","fire","fire","fire","fire","ash","ash","fire","fire","fire","fire","ash","ash"],
    fireColor: "#111111",
    state: "liquid",
    density: 1105,
    stain: 0.5,
},

elements.SCP_055 = {
    color: "#00000f",
    excludeRandom: true,
    behavior: [
        "XX","XX","XX",
        "XX","CH:REDACTED","XX",
        "XX","XX","XX"
    ],
    category: "scp",
    state: "solid",
    tempHigh: 55055055055,
    stateHigh: ["metal_scrap","metal_scrap","smoke","smoke","smoke","smoke","smoke","smoke","smoke",null],
},

elements.REDACTED = {
    hidden: true,
    color: "#00000f",
    excludeRandom: true,
    behavior: [
        "EX|CL|EX",
        "CL|EX:99999999999999999999999>REDACTED|CL",
        "EX|CL|EX",
    ],
    category: "scp",
    state: "solid",
    movable: false,
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
            pixel.color = pixelColorPick(pixel)
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
    },
},

elements.z_body = {
    hidden: true,
	color: ["#11111f","#069469","#047e99","#7f5fb0"],
    category: "scp",
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
	hardness: 1,
	breakInto: ["rotten_meat","bone","bone","blood","bone","bone","blood","bone","bone","blood","bone","bone","blood"],
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
	"z_head": { elem2 : ["infection","infection","infection","bone",null] },
	"z_body": { elem2: ["infection","infection","rotten_meat","bone",null] },
        "rat": { elem2: ["infection","rotten_meat",null]},
        "frog": { elem2: ["slime",null] },
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
	 breakInto: ["rotten_meat","bone","blood","bone","bone","blood","bone","bone","blood","bone","bone","blood"],
	hardness: 1,
	 properties: {
        dead: false,
        dir: 1,
        panic: 0,
        anger: 0
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
        if (pixel.dir == 1) {
            if (!isEmpty(pixel.x+2, pixel.y-1, true) && pixelMap[pixel.x+2][pixel.y-1].element == "head") {
                pixel.panic += 0.2;
            }
            else if (!isEmpty(pixel.x+3, pixel.y-1, true) && pixelMap[pixel.x+2][pixel.y-1].element == "head") {
                pixel.panic += 0.2;
            }
            else if (!isEmpty(pixel.x+4, pixel.y-1, true) && pixelMap[pixel.x+4][pixel.y-1].element == "head") {
                pixel.panic += 0.2;
            }
            else if (!isEmpty(pixel.x+5, pixel.y-1, true) && pixelMap[pixel.x+5][pixel.y-1].element == "head") {
                pixel.panic += 0.2;
            }
            else if (!isEmpty(pixel.x+5, pixel.y-1, true) && pixelMap[pixel.x+5][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
            else if (!isEmpty(pixel.x+6, pixel.y-1, true) && pixelMap[pixel.x+6][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
            else if (!isEmpty(pixel.x+7, pixel.y-1, true) && pixelMap[pixel.x+7][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
            else if (!isEmpty(pixel.x+8, pixel.y-1, true) && pixelMap[pixel.x+8][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
            else if (!isEmpty(pixel.x+9, pixel.y-1, true) && pixelMap[pixel.x+9][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
	    else if (!isEmpty(pixel.x+10, pixel.y-1, true) && pixelMap[pixel.x+10][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
	    else if (!isEmpty(pixel.x+11, pixel.y-1, true) && pixelMap[pixel.x+11][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
	    else if (!isEmpty(pixel.x+12, pixel.y-1, true) && pixelMap[pixel.x+12][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
        }
        else if (pixel.dir == -1) {
            if (!isEmpty(pixel.x-2, pixel.y-1, true) && pixelMap[pixel.x-2][pixel.y-1].element == "head") {
                pixel.panic += 0.2;
            }
            else if (!isEmpty(pixel.x-3, pixel.y-1, true) && pixelMap[pixel.x-3][pixel.y-1].element == "head") {
                pixel.panic += 0.2;
            }
            else if (!isEmpty(pixel.x-4, pixel.y-1, true) && pixelMap[pixel.x-4][pixel.y-1].element == "head") {
                pixel.panic += 0.2;
            }
            else if (!isEmpty(pixel.x-5, pixel.y-1, true) && pixelMap[pixel.x-5][pixel.y-1].element == "head") {
                pixel.panic += 0.2;
            }
            else if (!isEmpty(pixel.x-5, pixel.y-1, true) && pixelMap[pixel.x-5][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
            else if (!isEmpty(pixel.x-6, pixel.y-1, true) && pixelMap[pixel.x-6][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
            else if (!isEmpty(pixel.x-7, pixel.y-1, true) && pixelMap[pixel.x-7][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
            else if (!isEmpty(pixel.x-8, pixel.y-1, true) && pixelMap[pixel.x-8][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
	    else if (!isEmpty(pixel.x-9, pixel.y-1, true) && pixelMap[pixel.x-9][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
	    else if (!isEmpty(pixel.x-10, pixel.y-1, true) && pixelMap[pixel.x-10][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
	    else if (!isEmpty(pixel.x-11, pixel.y-1, true) && pixelMap[pixel.x-11][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
            else if (!isEmpty(pixel.x-12, pixel.y-1, true) && pixelMap[pixel.x-12][pixel.y-1].element == "head") {
                pixel.panic += 0.1;
            }
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
	"head": { elem2 : ["blood","blood","blood","bone",null] },
	"body": { elem2: ["blood","blood","meat","bone",null] },
	"z_head": { elem2 : ["infection","infection","infection","bone",null] },
	"z_body": { elem2: ["infection","infection","rotten_meat","bone",null] },
	"rat": { elem2: ["infection","infection","plague"] },
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
        "M2%10|XX|M2%10",
        "XX|M1|XX",
    ],
    category: "scp",
    density: 7500,
    reactions: {
        "head": { elem2 : ["bone","blood",null] , chance:50 },
        "body": { elem1 : "mad_682" , elem2 : ["meat","blood",null] , chance:50 },
        "z_head": { elem2 : ["infection","infection","infection","bone",null] , chance:50 },
	"z_body": { elem1 : "mad_682" , elem2: ["infection","infection","rotten_meat","bone",null] , chance:50 },  
	"homunculus": { elem2 : ["slime","blood",null] , chance:10 },
	"rat": { elem2: ["infection","infection","plague"] },
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
        "M2%10|CH:SCP_682%0.3|M2%10",
        "XX|M1|XX",
    ],
    category: "scp",
    density: 8000,
    excludeRandom: true,
    reactions: {
        "head": { elem2 : ["bone","blood",null] },
        "body": { elem2 : ["meat","blood",null] },
	"z_head": { elem2 : ["bone","infection",null] },
        "z_body": { elem2 : ["meat","infection",null] },
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
        "concrete": { elem2 : "dust" , chance:10 },
        "dust": { elem2 : null , chance:10 },
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
    stateHigh: ["smoke","smoke","smoke","slime"],
    burn: .1,
    burnTime: 300,
    burnInto: ["smoke","smoke","smoke","slime"],
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
    stateHigh: ["smoke","smoke","smoke","slime"],
    burn: .1,
    burnTime: 300,
    burnInto: ["smoke","smoke","smoke","slime"],
    stain: 0.08,
};

// SCPs with ID over 999 here
