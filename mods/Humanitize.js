/* mod by nekonico, do not steal without credit */

behaviors.BODY_DELETE = function(pixel) {
    if (pixel.willbuildhouse == true) {
        HouseBuilder = false;
    }
},

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

HouseBuilder = false

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
            var bodypixel = pixelMap[pixel.x][pixel.y+1];
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
    maxSize: 1,
    cooldown: 10,
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
        "pickaxe": { func:function(pixel,pickaxe){ if (pixel.pickaxe == false) {changePixel(pickaxe,"easy_way_out"), (pixel.pickaxe = true),(pixel.willbuildmine = true);} }, chance:0.5 },
        "cancer": { elem1:"cancer", chance:0.0005 },
        "poison": { attr1:{"dead":true}, chance:0.4 },
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
            if (pixel.basket == true) {(pixel.meatcount += 2), changePixel(meat,"easy_way_out");}
        }, chance:0.5},
        "bread": { func:function(pixel,bread){
            if (pixel.basket == true) {(pixel.breadcount += 1), changePixel(bread,"easy_way_out");}
            else if (pixel.basket == false && pixel.breadcount < 1) {(pixel.breadcount = 1), changePixel(bread,"easy_way_out");}
        }, chance:0.5},
        "toast": { func:function(pixel,bread){
            if (pixel.basket == true) {(pixel.breadcount += 2), changePixel(bread,"easy_way_out");}
            else if (pixel.basket == false && pixel.breadcount < 1) {(pixel.breadcount = 1), changePixel(bread,"easy_way_out");}
        }, chance:0.4},
        "baked_batter": { func:function(pixel,bread){
            if (pixel.basket == true) {(pixel.breadcount += 5), changePixel(bread,"easy_way_out");}
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
        "grass_seed": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.05},
        "petal": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.01},
        "metal_scrap": { func:function(pixel,trinket){
            if (pixel.basket == true) {(pixel.trinketscount += 1), changePixel(trinket,"easy_way_out");}
        }, chance:0.01},
        "housefloor1": { func:function(pixel,station){
            if (pixel.woodcount > 4) {(pixel.woodcount -= 5), changePixel(station,"workbench");}
        }, chance:0.01},
        "housefloor2": { func:function(pixel,station){
            if (pixel.rockcount > 7) {(pixel.rockcount -= 8), changePixel(station,"furnace");}
        }, chance:0.01},
        "workbench": { func:function(pixel,station){
            if (pixel.rockcount > 2 && pixel.woodcount > 1 && pixel.hasstraw == true && pixel.pickaxe == false) {(pixel.pickaxe = true),(pixel.willbuildmine = true),(pixel.rockcount -= 2),(pixel.woodcount -= 1),(pixel.hasstraw = false);}
        }, chance:0.01},
        "furnace": { func:function(pixel,oven){
            if (pixel.meatcount > 0) {(pixel.cookedmeatcount += 1),(pixel.meatcount -= 1);}
            else if (pixel.doughcount > 0) {(pixel.breadcount += 1),(pixel.doughcount -= 1);}
        }, chance:0.01},
        "oven": { func:function(pixel,oven){
            if (pixel.meatcount > 0) {(pixel.cookedmeatcount += 1),(pixel.meatcount -= 1);}
            else if (pixel.doughcount > 0) {(pixel.breadcount += 1),(pixel.doughcount -= 1);}
        }, chance:0.02},
        "allpurposestation": { func:function(pixel,station){
            if (pixel.rockcount > 2 && pixel.woodcount > 1 && pixel.hasstraw == true) {(pixel.pickaxe = true),(pixel.rockcount -= 2),(pixel.woodcount -= 1),(pixel.hasstraw = false);}
            else if (pixel.meatcount > 0) {(pixel.cookedmeatcount += 1),(pixel.meatcount -= 1);}
            else if (pixel.doughcount > 0) {(pixel.breadcount += 1),(pixel.doughcount -= 1);}
            else if (pixel.eggcount > 1 && pixel.flourcount > 1) {(pixel.eggcount -= 1),(pixel.flourcount -= 1),(pixel.breadcount += 10);}
        }, chance:0.1},
        "loose_straw": { func:function(pixel,straw){
            if (pixel.hasstraw == false) {(pixel.hasstraw = true), changePixel(straw,"easy_way_out");}
        }, chance:0.01},
        "water": { func:function(pixel,water){
            if (pixel.flourcount > 1) {(pixel.flourcount -= 1), (pixel.doughcount += 1), changePixel(water,["easy_way_out","easy_way_out","water"]);}
        }, chance:0.5},
        "straw": { elem2:"loose_straw", oneway:true, chance:0.5 },
        "grass": { func:function(pixel,grass){
            if (pixel.hasstraw == false && grass.h == 2) {(pixel.hasstraw = true), changePixel(grass,"easy_way_out");}
        }, chance:0.01},
        "rock": { func:function(pixel,rock){
            if (pixel.basket == true && pixel.rockcount < 3) {(pixel.rockcount += 1), changePixel(rock,"easy_way_out");}
            else if (pixel.pickaxe == true && pixel.basket == true && pixel.willbuildmine == true) {changePixel(rock,"mine_hole"), (pixel.willbuildmine = false);}
        }, chance:0.01},
        "mine_hole": { func:function(pixel,mine){
            if (pixel.pickaxe == true && pixel.basket == true) {(pixel.rockcount += 1);}
        }, chance:0.01},
        "grape": { func:function(pixel,grape){
            if (pixel.basket == true) {(pixel.foodcount += 0.25), changePixel(grape,"easy_way_out");}
            else {changePixel(grape,"juice"), grape.color = pixelColorPick(grape,"#291824");}
        }, oneway:true, chance:0.05},
        "cheese": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.50), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "nut": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.25), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "nut_meat": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.25), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "baked_potato": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.75), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "hard_yolk": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.50), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "chocolate": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.50), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "mashed_potato": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.75), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "pickle": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.75), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "ice_cream": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.50), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "lettuce": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.25), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "tomato": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.50), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "potato": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.50), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "popcorn": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.25), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "corn": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.50), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "candy": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.50), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "caramel": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.50), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "herb": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.25), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "pumpkin_seed": { func:function(pixel,food){
            if (pixel.basket == true) {(pixel.foodcount += 0.25), changePixel(food,"easy_way_out");}
        }, oneway:true, chance:0.05},
        "ant": { elem2:"dead_bug", chance:0.05, oneway:true },
        "fly": { elem2:"dead_bug", oneway:true },
        "firefly": { elem2:"dead_bug", oneway:true },
        "bee": { elem2:"dead_bug", oneway:true },
        "flea": { elem2:"dead_bug", oneway:true },
        "termite": { elem2:"dead_bug", oneway:true },
        "worm": { elem2:"slime", chance:0.05, oneway:true },
        "stink_bug": { elem2:"stench", oneway:true },
        "tax_bill": { elem2:null, func:(pixel,tax) => { (pixel.moneycount *= 0.75) }, chance:0.01 },
        "money": { elem2:null, func:(pixel,money) => { (pixel.moneycount += 1) }, chance:0.03 },
        "gold_coin": { elem2:null, func:(pixel,money) => { (pixel.moneycount += 1000) }, chance:0.04 },
        "diamond": { elem2:null, func:(pixel,money) => { (pixel.moneycount += 50000) }, chance:0.05 },
        "sun": { elem1:"cooked_meat" },
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
        hungry: false,
        greedy: false,
        basket: false,
        pickaxe: false,
        hasstraw: false,
        willbuildhouse: false,
        willbuildmine: false,
        moneycount: 0,
        eggcount: 0,
        flourcount: 0,
        doughcount: 0,
        meatcount: 0,
        cookedmeatcount: 0,
        breadcount: 0,
        foodcount: 0,
        trinketscount: 0,
        woodcount: 0,
        rockcount: 0,
    },
    onDelete: behaviors.BODY_DELETE,
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
        if (pixel.dead) { // by nekonico
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"rotten_meat");
                if (pixel.willbuildhouse == true) {
                    HouseBuilder = false;
                }
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

        if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.woodcount > 15 && pixel.willbuildhouse == true) {
            deletePixel(pixel.x-3, pixel.y+1); // clear any floor obstructions
            deletePixel(pixel.x-2, pixel.y+1); 
            deletePixel(pixel.x-1, pixel.y+1);
            deletePixel(pixel.x, pixel.y+1);
            deletePixel(pixel.x+1, pixel.y+1);
            deletePixel(pixel.x+2, pixel.y+1); 
            deletePixel(pixel.x+3, pixel.y+1); 
            createPixel("wood", pixel.x-3, pixel.y-3); // door 1
            createPixel("wood", pixel.x-3, pixel.y-2);
            createPixel("wood", pixel.x-3, pixel.y+1);
            createPixel("wood", pixel.x-2, pixel.y-3); // roof
            createPixel("wood", pixel.x-1, pixel.y-3);
            createPixel("wood", pixel.x, pixel.y-3);
            createPixel("wood", pixel.x+1, pixel.y-3); 
            createPixel("wood", pixel.x+2, pixel.y-3);
            createPixel("wood", pixel.x+3, pixel.y-3); // door 2
            createPixel("wood", pixel.x+3, pixel.y-2);
            createPixel("wood", pixel.x+3, pixel.y+1); 
            createPixel("wood", pixel.x-2, pixel.y+1); // floor
            createPixel("housefloor1", pixel.x-1, pixel.y+1);
            createPixel("wood", pixel.x, pixel.y+1);
            createPixel("housefloor2", pixel.x+1, pixel.y+1);
            createPixel("wood", pixel.x+2, pixel.y+1); 
            pixel.willbuildhouse = false;
            pixel.woodcount -= 16
        }

        if (pixel.moneycount > 17999) {
            pixel.color = pixelColorPick(pixel,"#ffd700");
        }

        if (pixel.breadcount < 1 && pixel.cookedmeatcount < 1 && pixel.foodcount < 0.25 && Math.random() < 0.005) { //hunger mechanic
            pixel.hungry = true
        }

        if (pixel.foodcount > 0 && pixel.hungry == true) {
            pixel.hungry = false, pixel.foodcount -= 0.25
        }
        else if (pixel.breadcount > 0.9 && pixel.hungry == true) {
            pixel.hungry = false, pixel.breadcount -= 1
        }
        else if (pixel.cookedmeatcount > 0 && pixel.hungry == true) {
            pixel.hungry = false, pixel.cookedmeatcount -= 1
        }

        if (pixel.foodcount > 0 && Math.random() < 0.0005) {
            pixel.hungry = false, pixel.foodcount -= 0.25
        }

        if (pixel.breadcount > 0.9 && Math.random() < 0.0005) {
            pixel.hungry = false, pixel.breadcount -= 1
        }

        if (pixel.cookedmeatcount > 0 && Math.random() < 0.0005) {
            pixel.hungry = false, pixel.cookedmeatcount -= 1
        }

        if (pixel.trinketscount < 1 && Math.random() < 0.001) { //trinket desire mechanic
            pixel.greedy = true
        }
        else if (pixel.trinketscount > 1 && Math.random() < 0.01) {
            pixel.greedy = false
        }

        if (pixel.breadcount > 1.9 && pixel.cookedmeatcount > 0 && Math.random() < 0.005 && pixel.foodcount < 5) { //make a sandwich
            pixel.foodcount += 1, pixel.breadcount -= 2, pixel.cookedmeatcount -= 1
        }

        if (pixel.hasstraw == true && Math.random() < 0.005 && pixel.basket == false) { //make a basket
            pixel.basket = true, pixel.hasstraw = false
        }

        if (!isEmpty(pixel.x+1, pixel.y-1, true) && pixel.basket == true && pixelMap[pixel.x+1][pixel.y-1].element == "tree_branch") { // harvest branch
            var wood = pixelMap[pixel.x+1][pixel.y-1];
            if (wood.element == "tree_branch") {changePixel(wood,"branchless_tree"), pixel.woodcount += 1}
        }
        else if (!isEmpty(pixel.x-1, pixel.y-1, true) && pixel.basket == true && pixelMap[pixel.x-1][pixel.y-1].element == "tree_branch") { 
            var wood = pixelMap[pixel.x-1][pixel.y-1];
            if (wood.element == "tree_branch") {changePixel(wood,"branchless_tree"), pixel.woodcount += 1}
        }

        if (!isEmpty(pixel.x+1, pixel.y-1, true) && pixel.basket == true && pixelMap[pixel.x+1][pixel.y-1].element == "plant" && Math.random() < 0.05) { // harvest fruit
            var plant = pixelMap[pixel.x+1][pixel.y-1];
            if (plant.element == "plant") {pixel.foodcount += 0.25}
        }
        else if (!isEmpty(pixel.x-1, pixel.y-1, true) && pixel.basket == true && pixelMap[pixel.x-1][pixel.y-1].element == "plant" && Math.random() < 0.05) { 
            var plant = pixelMap[pixel.x-1][pixel.y-1];
            if (plant.element == "plant") {pixel.foodcount += 0.25}
        }

        if (pixel.woodcount > 15 && Math.random() < 0.001 && HouseBuilder == false) { 
            pixel.willbuildhouse = true, HouseBuilder = true
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
                if (seller.hasstraw == true && pixel.hasstraw == false && Math.random() < 0.1) {
                    seller.hasstraw = false, seller.moneycount += 1, pixel.moneycount -= 1, pixel.hasstraw = true;
                }
                if (seller.foodcount > 0.75 && Math.random() < 0.1) {
                    seller.foodcount -= 1, seller.moneycount += 5, pixel.moneycount -= 5, pixel.foodcount += 1;
                }
                if (seller.cookedmeatcount > 0 && pixel.cookedmeatcount < 5) {
                    seller.cookedmeatcount -= 1, seller.moneycount += 3, pixel.moneycount -= 3, pixel.cookedmeatcount += 1;
                }
                if (seller.meatcount > 0 && pixel.meatcount == 0 && Math.random() > 0.1) {
                    seller.meatcount -= 1, seller.moneycount += 2, pixel.moneycount -= 2, pixel.meatcount += 1;
                }
                if (seller.breadcount > 0.9 && pixel.breadcount < 5) {
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
        "cancer": { elem1:"cancer", attr1:{"dead":true}, chance:0.005 },
        "poison": { attr1:{"dead":true}, chance:0.4 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], color1:["#75816B","#4D6B53"], chance:0.4 },
        "neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
        "fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], color1:["#75816B","#4D6B53"], chance:0.03 },
        "plague": { elem1:["rotten_meat","rotten_meat","rotten_meat","c_head","plague",], color1:["#75816B","#4D6B53"],  attr1:{"dead":true}, chance:0.05 },
        "oxygen": { func:function(pixel,air){pixel.drowning -= 1}, elem2:"carbon_dioxide", chance:0.5 },
        "carbon_dioxide": { func:function(pixel,air){pixel.drowning += 1}, elem2:"carbon_dioxide", chance:0.1 },
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

elements.loose_straw = {
    hidden: true,
	color: ["#F9E3A1","#93734E","#C7AA83"],
	behavior: behaviors.POWDER,
	tempHigh: 380,
	stateHigh: "fire",
	burn: 80,
	burnTime: 200,
	category: "powders",
	state: "solid",
	density: 45
},

elements.basket = {
    hidden:true,
    color: ["#88665d","#bcaa99"],
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 400,
    stateHigh: "fire",
    burn: 55,
    burnTime: 210,
    burnInto: ["smoke","smoke","smoke","smoke","ash"],
    breakInto: "loose_straw",
    category: "human",
    state: "solid",
    density: 70
},

elements.pickaxe = {
    hidden:true,
    color: ["#71797e","#D8B589"],
    behavior: behaviors.STURDYPOWDER,
    colorKey: {
        "A":"#607d8b",
        "H":"#91754d",
        "B":"#a0522d"
    },
    colorPattern: [
        "BBBBBB",
        "BAABHB",
        "BBBABB",
        "BBHBAB",
        "BHBBAB",
        "HBBBBB"
    ],
    reactions: {
        "mine_hole": { func:function(pixel,mine){
            if (isEmpty(pixel.x, pixel.y-1)) {(createPixel("rock", pixel.x, pixel.y-1));}
            else if (isEmpty(pixel.x-1, pixel.y)) {(createPixel("rock", pixel.x-1, pixel.y));}
            else if (isEmpty(pixel.x+1, pixel.y)) {(createPixel("rock", pixel.x+1, pixel.y));}
        }, chance:0.05},
    },
    tempHigh: 400,
    stateHigh: ["rock","rock","ash","charcoal",],
    burn: 55,
    burnTime: 210,
    burnInto: ["rock","rock","rock","rock","ash","charcoal","charcoal","smoke"],
    breakInto: ["rock","rock","wood","sawdust",],
    category: "human",
    state: "solid",
    density: 70
},

elements.workbench = {
    hidden:true,
    color: ["#a0522d"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "loose_straw": { elem2:"basket", chance:0.25 },
        "rock": { elem2:"pickaxe", chance:0.1 },
        "oven": { elem1:"allpurposestation", elem2:null, chance:0.5 },
    },// by
    temp:40, //neko
    tempHigh: 1000, //nico
    stateHigh: "magma",
    category: "human",
    state: "solid",
    density: 2550,
    hardness: 0.2,
    breakInto: ["sand","gravel","charcoal","ash"]
},

elements.furnace = {
    hidden:true,
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
    hidden:true,
    color: ["#4f4f4f","#71797e"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "workbench": { elem1:"allpurposestation", elem2:null, chance:0.5 },
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
},

elements.allpurposestation = {
    hidden:true,
    name: "workshop_station",
    color: ["#a0522d","#4f4f4f","#71797e"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "rock": { elem2:"pickaxe", chance:0.5 },
        "loose_straw": { elem2:"basket", chance:0.5 },
        "meat": { elem2:"cooked_meat", chance:0.1 },
        "yolk": { elem2:"hard_yolk", chance:0.1 },
        "egg": { elem2:"hard_yolk", chance:0.1 },
        "batter": { elem2:"baked_batter", chance:0.1 },
        "dough": { elem2:"bread", chance:0.1 },
        "bread": { elem2:"toast", chance:0.05 },
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

elements.branchless_tree = {
    name: "wood",
    color: "#a59965",
    behavior: behaviors.WALL,
    renderer: renderPresets.WOODCHAR,
    tick: function(pixel) {
        if (Math.random() < 0.02 && pixel.age > 35) {
            changePixel(pixel,"tree_branch")
        }
        else if (pixel.age > 1000 && Math.random() < 0.05) {
            changePixel(pixel,"wood");
            pixel.color = pixelColorPick(pixel, pixel.wc);
        }
        pixel.age++;
    },
    properties: {
        "age":0
    },
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
};

elements.mine_hole = {
    hidden:true,
    color: "#363636",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 950,
    stateHigh: "magma",
    category: "land",
    state: "solid",
    density: 2550,
    hardness: 0.5,
    breakInto: ["sand","gravel"]
},

elements.housefloor1 = {
    name: "wood",
    color: "#a0522d",
    behavior: behaviors.WALL,
    renderer: renderPresets.WOODCHAR,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
};

elements.housefloor2 = {
    name: "wood",
    color: "#a0522d",
    behavior: behaviors.WALL,
    renderer: renderPresets.WOODCHAR,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
};

elements.straw.breakInto = "loose_straw"

elements.human.name = "dummy"

elements.head.name = "brainless_head"

elements.body.name = "dumb_body"

elements.grass.properties.h = 1

elements.rotten_meat.density = 1200

/* yo, thanks for scrolling to the end. If you have any ideas to add to this mod, or wanna contact me in general, you can DM my discord account "nekonico" or just ping me in the r74n discord 
peace 
 ^ ^
(*w*) /     
*/ 
