/* mod by nekonico aka doobienecoarc */

window.addEventListener("load", () => { 
    document.getElementById("elementButton-easy_way_out")?.remove()
})

elements.easy_way_out = {
    hidden: true,
    color: "#00000f",
    excludeRandom: true,
    onPlace: function(pixel) {
        deletePixel(pixel.x, pixel.y);
    },
    category: "special",
    state: "solid",
    movable: false,
},

elements.cultured_human = {
    name: "human",
    // color: ["#f5eac6","#d4c594","#a89160","#7a5733","#523018","#361e0e"],
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    category: "human",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    onPlace: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("c_body", pixel.x, pixel.y+1);
            createPixel("c_head", pixel.x, pixel.y);
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("c_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            createPixel("c_body", pixel.x, pixel.y);
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["c_body","c_head"],
    cooldown: defaultCooldown,
    forceSaveColor: true,
},

elements.c_body = {
    name: "body",
    color: ["#069469","#047e99","#7f5fb0"],
    forceSaveColor: true,
    category: "human",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","bone"],
    reactions: {
        "basket": { func:function(pixel,basket){ if (pixel.basket == false) {changePixel(basket,"easy_way_out"), (pixel.basket = true);} }, chance:0.5 },
        "cancer": { elem1:"cancer", chance:0.005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
        "neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
        "fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
        "plague": { elem1:"plague", chance:0.05 },
        "egg": { func:function(pixel,egg){
            if (pixel.basket == true) {(pixel.eggcount += 1), changePixel(egg,"easy_way_out");}
            else {changePixel(egg,"yolk");}
        }, chance:0.5},
        "flour": { func:function(pixel,flour){
            if (pixel.basket == true) {(pixel.flourcount += 1), changePixel(flour,"easy_way_out");}
        }, chance:0.5},
        "dough": { func:function(pixel,dough){
            if (pixel.basket == true) {(pixel.doughcount += 1), changePixel(dough,"easy_way_out");}
        }, chance:0.5},
        "meat": { func:function(pixel,meat){
            if (pixel.basket == true) {(pixel.meatcount += 1), changePixel(meat,"easy_way_out");}
        }, chance:0.4},
        "cured_meat": { func:function(pixel,meat){
            if (pixel.basket == true) {(pixel.meatcount += 1), changePixel(meat,"easy_way_out");}
        }, chance:0.5},
        "bread": { func:function(pixel,bread){
            if (pixel.basket == true) {(pixel.breadcount += 1), changePixel(bread,"easy_way_out");}
            else if (pixel.basket == false && pixel.breadcount < 1) {(pixel.breadcount = 1), changePixel(bread,"easy_way_out");}
        }, chance:0.5},
        "toast": { func:function(pixel,bread){
            if (pixel.basket == true) {(pixel.breadcount += 1), changePixel(bread,"easy_way_out");}
            else if (pixel.basket == false && pixel.breadcount < 1) {(pixel.breadcount = 1), changePixel(bread,"easy_way_out");}
        }, chance:0.4},
        "crumb": { func:function(pixel,bread){
            if (pixel.basket == true) {(pixel.breadcount += 0.1), changePixel(bread,"easy_way_out");}
        }, chance:0.1},
        "cooked_meat": { func:function(pixel,cooked_meat){
            if (pixel.basket == true) {(pixel.cookedmeatcount += 1), changePixel(cooked_meat,"easy_way_out");}
            else if (pixel.basket == true && pixel.cookedmeatcount < 1) {(pixel.cookedmeatcount = 1), changePixel(cooked_meat,"easy_way_out");}
        }, chance:0.5},
        "bead": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.1},
        "glitter": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.1},
        "copper_sulfate": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.05},
        "confetti": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.05},
        "color_sand": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.05},
        "incense": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.05},
        "pinecone": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.03},
        "feather": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.01},
        "glass_shard": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.01},
        "porcelain_shard": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.01},
        "flower_seed": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.01},
        "wheat_seed": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.05},
        "corn_seed": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.05},
        "potato_seed": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.05},
        "pumpkin_seed": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.05},
        "petal": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.01},
        "metal_scrap": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.01},
        "furnace": { func:function(pixel,oven){
            if (pixel.meatcount > 0) {(pixel.cookedmeatcount += 1),(pixel.meatcount -= 1),(oven.temp = 100);}
            else if (pixel.doughcount > 0) {(pixel.breadcount += 1),(pixel.doughcount -= 1),(oven.temp = 95);}
        }, chance:0.01},
        "oven": { func:function(pixel,oven){
            if (pixel.meatcount > 0) {(pixel.cookedmeatcount += 1),(pixel.meatcount -= 1),(oven.temp = 100);}
            else if (pixel.doughcount > 0) {(pixel.breadcount += 1),(pixel.doughcount -= 1),(oven.temp = 95);}
        }, chance:0.02},
        "grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
        "ant": { elem2:"dead_bug", chance:0.05, oneway:true },
        "fly": { elem2:"dead_bug", oneway:true },
        "firefly": { elem2:"dead_bug", oneway:true },
        "bee": { elem2:"dead_bug", oneway:true },
        "flea": { elem2:"dead_bug", oneway:true },
        "termite": { elem2:"dead_bug", oneway:true },
        "worm": { elem2:"slime", chance:0.05, oneway:true },
        "stink_bug": { elem2:"stench", oneway:true },
        "grass_seed": { elem2:null, chance:0.05 },
        "tax_bill": { elem2:null, func:(pixel,tax) => { (pixel.moneycount *= 0.75) }, chance:0.01 },
        "money": { elem2:null, func:(pixel,money) => { (pixel.moneycount += 1) }, chance:0.03 },
        "gold_coin": { elem2:null, func:(pixel,money) => { (pixel.moneycount += 100) }, chance:0.04 },
        "diamond": { elem2:null, func:(pixel,money) => { (pixel.moneycount += 5000) }, chance:0.05 },
        "sun": { elem1:"cooked_meat" },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
        hungry: false,
        greedy: false,
        basket: false,
        moneycount: 0,
        eggcount: 0,
        flourcount: 0,
        doughcount: 0,
        meatcount: 0,
        cookedmeatcount: 0,
        breadcount: 0,
        trinketscount: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "c_head") {
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
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "c_head") {
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
        if (pixel.moneycount > 17999) {
            pixel.color = pixelColorPick(pixel,"#ffd700");
        }
        if (pixel.breadcount < 1 && pixel.cookedmeatcount < 1 && Math.random() < 0.005) { //eating mechanic
            pixel.hungry = true
        }
        else if (pixel.breadcount > 0.5 && pixel.hungry == true) {
            pixel.hungry = false, pixel.breadcount -= 1
        }
        else if (pixel.cookedmeatcount > 0 && pixel.hungry == true) {
            pixel.hungry = false, pixel.cookedmeatcount -= 1
        }
        else if (pixel.breadcount > 0.5 && Math.random() < 0.005) {
            pixel.hungry = false, pixel.breadcount -= 1
        }
        else if (pixel.cookedmeatcount > 0 && Math.random() < 0.005) {
            pixel.hungry = false, pixel.cookedmeatcount -= 1
        }
        if (pixel.trinketscount < 1 && Math.random() < 0.001) { //trinket desire mechanic
            pixel.greedy = true
        }
        else if (pixel.trinketscount > 1 && Math.random() < 0.01) {
            pixel.greedy = false
        }
        if (!isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "c_body") {
            var seller = pixelMap[pixel.x-1][pixel.y];
            if (seller.dead) { // If seller is dead, stop trade
                var seller = null;
            }
            else { (seller.panic = -10), (pixel.panic = -10); 
                if (seller.trinketscount > 0 && pixel.greedy == true) {
                seller.trinketscount -= 1, seller.moneycount += 1, pixel.moneycount -= 1, pixel.trinketscount += 1;
                }
                if (seller.cookedmeatcount > 0 && pixel.cookedmeatcount < 5) {
                    seller.cookedmeatcount -= 1, seller.moneycount += 3, pixel.moneycount -= 3, pixel.cookedmeatcount += 1;
                }
                if (seller.breadcount > 0 && pixel.breadcount < 5) {
                    seller.breadcount -= 1, seller.moneycount += 2, pixel.moneycount -= 2, pixel.breadcount += 1;
                };
                (seller.panic = 0), (pixel.panic = 0)
            }
        }
        else { var seller = null }

    }
},

elements.c_head = {
    name: "head",
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    forceSaveColor: true,
    category: "human",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","bone"],
    forceSaveColor: true,
    reactions: {
        "cancer": { elem1:"cancer", chance:0.005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
        "neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
        "fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
        "plague": { elem1:"plague", chance:0.05 },
        "oxygen": { func:function(pixel,oxygen){pixel.drowning -= 1}, elem2:"carbon_dioxide", chance:0.5 },
        "carbon_dioxide": { func:function(pixel,oxygen){pixel.drowning += 1}, elem2:"carbon_dioxide", chance:0.1 },
        "meat": { elem2:null, chance:0.1 },
        "cooked_meat": { elem2:null, chance:0.1 },
        "cured_meat": { elem2:null, chance:0.1 },
        "sugar": { elem2:null, chance:0.1 },
        "broth": { elem2:null, chance:0.2 },
        "yolk": { elem2:null, chance:0.1 },
        "hard_yolk": { elem2:null, chance:0.1 },
        "dough": { elem2:null, chance:0.1 },
        "batter": { elem2:null, chance:0.2 },
        "butter": { elem2:null, chance:0.1 },
        "melted_butter": { elem2:null, chance:0.2 },
        "chocolate": { elem2:null, chance:0.2 },
        "melted_chocolate": { elem2:null, chance:0.3 },
        "grape": { elem2:null, chance:0.1 },
        "tomato": { elem2:null, chance:0.1 },
        "herb": { elem2:null, chance:0.1 },
        "lettuce": { elem2:null, chance:0.1 },
        "corn": { elem2:null, chance:0.1 },
        "popcorn": { elem2:null, chance:0.15 },
        "potato": { elem2:null, chance:0.1 },
        "baked_potato": { elem2:null, chance:0.15 },
        "bread": { elem2:null, chance:0.1 },
        "toast": { elem2:null, chance:0.1 },
        "gingerbread": { elem2:null, chance:0.1 },
        "baked_batter": { elem2:null, chance:0.2 },
        "wheat": { elem2:null, chance:0.1 },
        "candy": { elem2:null, chance:0.1 },
        "yogurt": { elem2:null, chance:0.2 },
        "frozen_yogurt": { elem2:null, chance:0.1 },
        "ice_cream": { elem2:null, chance:0.2 },
        "beans": { elem2:[null,null,null,null,null,null,null,null,"stench"], chance:0.2 },
        "tea": { elem2:null, chance:0.2 },
        "coffee": { elem2:null, chance:0.2 },
        "milk": { elem2:null, chance:0.2 },
        "cream": { elem2:null, chance:0.2 },
        "soda": { elem2:null, chance:0.2 },
        "chocolate_milk": { elem2:null, chance:0.2 },
        "fruit_milk": { elem2:null, chance:0.2 },
        "pilk": { elem2:null, chance:0.2 },
        "eggnog": { elem2:null, chance:0.2 },
        "juice": { elem2:null, chance:0.2 },
        "cheese": { elem2:null, chance:0.1 },
        "melted_cheese": { elem2:null, chance:0.2 },
        "alcohol": { elem2:null, chance:0.2 },
        "antidote": { elem2:null, chance:0.2 },
        "honey": { elem2:null, chance:0.2 },
        "caramel": { elem2:null, chance:0.2 },
        "molasses": { elem2:null, chance:0.05 },
        "ketchup": { elem2:null, chance:0.1 },
        "pumpkin_seed": { elem2:null, chance:0.1 },
        "nut": { elem2:null, chance:0.1 },
        "nut_meat": { elem2:null, chance:0.1 },
        "nut_butter": { elem2:null, chance:0.1 },
        "nut_milk": { elem2:null, chance:0.2 },
        "jelly": { elem2:null, chance:0.2 },
        "mayo": { elem2:null, chance:0.2 },
        "mashed_potato": { elem2:null, chance:0.2 },
        "sauce": { elem2:null, chance:0.2 },
        "pickle": { elem2:null, chance:0.1 },
        "sun": { elem1:"cooked_meat" },
        "light": { stain1:"#825043" },
        "bee": { stain1:"#cc564b", chance:0.2 },
        "water": { func:function(pixel,water){pixel.drowning += 1}, elem2:"bubble", attr2:{"clone":"water"}, chance:0.002 },
        "salt_water": { func:function(pixel,water){pixel.drowning += 2}, elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.002 },
        "sugar_water": { func:function(pixel,water){pixel.drowning += 2}, elem2:"bubble", attr2:{"clone":"sugar_water"}, chance:0.002 },
        "seltzer": { func:function(pixel,water){pixel.drowning += 4}, elem2:"bubble", attr2:{"clone":["seltzer","seltzer","carbon_dioxide"]}, chance:0.002 },
        "pool_water": { func:function(pixel,water){pixel.drowning += 1}, elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.002 },
        "dirty_water": { func:function(pixel,water){pixel.drowning += 4}, elem2:"bubble", color2:["#0e824e","#07755a","#0c6934"], attr2:{"clone":"dirty_water"}, chance:0.003 },
        "blood": { func:function(pixel,water){pixel.drowning += 5}, elem2:"bubble", color2:["#ff0000","#ee0000","#ff4040"], attr2:{"clone":"blood"}, chance:0.003 },
    },
    properties: {
        dead: false,
        drowning: 0
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
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "c_body") {
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

        // drowning
        if (pixel.drowning > 99.9) { pixel.dead = true }
    }
},

elements.money = {
    color: ["#85bb65","#5e8347","#65bb7d","#b2bb65","#dbffc4"],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1:"cellulose", elem2:null, chance:0.01 },
        "dirty_water": { elem1:"cellulose", elem2:null, chance:0.01 },
        "salt_water": { elem1:"cellulose", elem2:null, chance:0.01 },
        "sugar_water": { elem1:"cellulose", elem2:null, chance:0.01 },
        "seltzer": { elem1:"cellulose", elem2:null },
        "soda": { elem1:"cellulose", elem2:null, chance:0.01 },
        "blood": { elem1:"cellulose", elem2:null, chance:0.01 },
        "foam": { elem1:"cellulose", elem2:null, chance:0.01 },
        "bubble": { elem1:"cellulose", elem2:null, chance:0.01 },
        "oil": { elem1:"cellulose", elem2:null, chance:0.01 },
        "alcohol": { elem1:"cellulose", elem2:null, chance:0.01 },
        "vinegar": { elem1:"cellulose", elem2:null, chance:0.01 },
        "light": { stain1:"#ebdfa7" },
        "oxygen": { stain1:"#ebdfa7" }
    },
    tempHigh: 248,
    stateHigh: ["fire","fire","fire","fire","fire","ash"],
    burn: 70,
    burnTime: 300,
    burnInto: ["fire","fire","fire","fire","fire","ash"],
    category: "human",
    state: "solid",
    density: 1000,
    breakInto: "confetti",
    breakIntoColor: ["#85bb65","#65bb7d","#b2bb65","#85bb65"]
},

elements.tax_bill = {
    color: ["#f0f0f0","#f0f0f0","#f0f0f0","#f0f0f0","#f0f0f0","#ff0000","#171717",],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1:"cellulose", elem2:null, chance:0.01 },
        "dirty_water": { elem1:"cellulose", elem2:null, chance:0.01 },
        "salt_water": { elem1:"cellulose", elem2:null, chance:0.01 },
        "sugar_water": { elem1:"cellulose", elem2:null, chance:0.01 },
        "seltzer": { elem1:"cellulose", elem2:null, chance:0.01 },
        "soda": { elem1:"cellulose", elem2:null, chance:0.01 },
        "blood": { elem1:"cellulose", elem2:null, chance:0.01 },
        "foam": { elem1:"cellulose", elem2:null, chance:0.01 },
        "bubble": { elem1:"cellulose", elem2:null, chance:0.1 },
        "oil": { elem1:"cellulose", elem2:null, chance:0.01 },
        "alcohol": { elem1:"cellulose", elem2:null, chance:0.01 },
        "vinegar": { elem1:"cellulose", elem2:null, chance:0.01 },
        "light": { stain1:"#ebdfa7" },
        "oxygen": { stain1:"#ebdfa7" },
        "money": { elem1:null, elem2:null, chance:0.5},
        "gold_coin": { elem1:null, elem2:null, chance:0.4 }
    },
    tempHigh: 248,
    stateHigh: ["fire","fire","fire","fire","fire","ash"],
    burn: 70,
    burnTime: 300,
    burnInto: ["fire","fire","fire","fire","fire","ash"],
    category: "human",
    state: "solid",
    density: 1100,
    breakInto: "confetti",
    breakIntoColor: ["#ffffff","#e6e6e6","#dbdbdb","#ffffff","#e6e6e6","#dbdbdb","#ff0000","#171717",]
},

elements.basket = {
    color: ["#88665d","#bcaa99","#c2b97f"],
    behavior: behaviors.POWDER,
    tempHigh: 400,
    stateHigh: "fire",
    burn: 35,
    burnTime: 210,
    burnInto: ["smoke","smoke","smoke","smoke","ash"],
    breakInto: "straw",
    category: "human",
    state: "solid",
    density: 70
},

elements.furnace = {
    color: ["#808080","#4f4f4f","#949494"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "bird": { elem2:["cooked_meat","cooked_meat","feather"], chance:0.025 },
        "meat": { elem2:"cooked_meat", chance:0.1 },
        "yolk": { elem2:"hard_yolk", chance:0.1 },
        "egg": { elem2:"hard_yolk", chance:0.1 },
        "batter": { elem2:"baked_batter", chance:0.1 },
        "dough": { elem2:"bread", chance:0.1 },
        "bread": { elem2:"toast", chance:0.05 },
        "wood": { elem2:"charcoal", chance:0.005 },
        "metal_scrap": { elem1:"oven", elem2:null, chance:0.05 },
    },
    temp:40,
    tempHigh: 1000,
    stateHigh: "magma",
    category: "human",
    state: "solid",
    density: 2550,
    hardness: 0.2,
    breakInto: ["sand","gravel","charcoal","ash"]
},

elements.oven = {
    color: ["#4f4f4f","#71797e"],
    behavior: behaviors.WALL,
    reactions: {
        "bird": { elem2:["cooked_meat","cooked_meat","feather"], chance:0.025 },
        "meat": { elem2:"cooked_meat", chance:0.1 },
        "yolk": { elem2:"hard_yolk", chance:0.1 },
        "egg": { elem2:"hard_yolk", chance:0.1 },
        "batter": { elem2:"baked_batter", chance:0.1 },
        "dough": { elem2:"bread", chance:0.1 },
        "bread": { elem2:"toast", chance:0.05 },
    },
    temp:50,
    tempHigh: 1550,
    stateHigh: "molten_metal_scrap",
    category: "human",
    state: "solid",
    density: 2550,
    hardness: 0.5,
    breakInto: ["metal_scrap","metal_scrap","charcoal","ash"]
};

elements.human.name = "dummy"

elements.head.name = "brainless_head"

elements.body.name = "dumb_body"
