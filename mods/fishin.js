document.onkeydown = function(ki)/*keyboard_input*/ {
    //a
    if (ki.keyCode == 65) {
        KA = true;
        //vX ++;
    }
    //d
    if (ki.keyCode == 68) {
        KD = true;
        //vX ++;
    }
    //w
    if (ki.keyCode == 81) {
        KQ = true;
        //vY ++;
    }
    //s
    if (ki.keyCode == 83) {
        KS = true;
        //vY ++;
    }
    if (ki.keyCode == 66) {
        KB = true;
    }
}
document.onkeyup = function(i2)/*keyboard_input*/ {
    //a
    if (i2.keyCode == 65) {
        KA = false;
        //vX --;
    }
    //d
    if (i2.keyCode == 68) {
        KD = false;
       //vX --;
    }
    //w
    if (i2.keyCode == 81) {
        KQ = false;
        //vY = 0;
    }
    //s
    if (i2.keyCode == 83) {
        KS = false;
        //vY = 0;
    }
    if (i2.keyCode == 66) {
        KB = false;

    }
}
var money = 0;
var stringAmount = 15;
var deployed = false;
var reelIn = false;
var KA = false;
var KD = false;
var KQ = false;
var KS = false;
var vX = 1;
var vY = 1;
elements.fishing_rod = {
    tick: function(pixel) {
    /*if (vX === 3) {
            vX --;
        }
    if (vY === 3) {
            vY --;
        }*/
    if (KA === true && deployed === false) {
        if (isEmpty(pixel.x-vX,pixel.y)) {
            createPixel("fishing_string",pixel.x-vX,pixel.y)
        }
    }
    if (KD === true && deployed === false) {
        if (isEmpty(pixel.x+vX,pixel.y)) {
            createPixel("fishing_string",pixel.x+vX,pixel.y)
        }
    }
    if (KS === true && deployed === false) {
        if (isEmpty(pixel.x,pixel.y+vY)) {
            createPixel("fishing_string",pixel.x,pixel.y+vX)
        }
    }
    if (KQ === true && deployed === true) {
        reelIn = true
    }
    if (KB === true) {
        alert(`You have $${money}.`)
        KB = false
    }
    },
    color: "#a0522d",
    renderer: renderPresets.WOODCHAR,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    forceSaveColor: true,
    category: "fishin",
    movable: false,
}

elements.fishing_string = {
    color: ["#F7F7F7","#F1F1F1"],
    tick: function(pixel) {
        if (pixel.value === undefined) {
            pixel.value = stringAmount
        }
        if (isEmpty(pixel.x,pixel.y+vY) && pixel.value > 0 && reelIn === false) {
            createPixel("fishing_string",pixel.x,pixel.y+vX)
            pixelMap[pixel.x][pixel.y+vX].value = (pixel.value - 1)
        }
        else if (!isEmpty(pixel.x,pixel.y+vY,true) && pixel.value > 0 && reelIn === false) {
            var nextString = pixelMap[pixel.x][pixel.y+vX]
            if (elements[nextString.element].state === "liquid") {
                changePixel(nextString,"fishing_string")
                nextString.value = (pixel.value - 1)
            }
        }
        if (isEmpty(pixel.x,pixel.y+vY) && pixel.value === 0 && reelIn === false) {
            createPixel("hook",pixel.x,pixel.y+vX)
            deployed = true
        }
        else if (!isEmpty(pixel.x,pixel.y+vY,true) && pixel.value === 0 && reelIn === false) {
            var nextString = pixelMap[pixel.x][pixel.y+vX]
            if (elements[nextString.element].state === "liquid") {
                changePixel(nextString,"hook")
                deployed = true
            }
        }
    },
    tempHigh: 412,
    stateHigh: "fire",
    burn: 5,
    burnTime: 350,
    burnInto: ["smoke","smoke","smoke","smoke","ash"],
    category: "fishin",
    state: "solid",
    breakInto: "dust",
    movable:false,
    isString: true
}

elements.hook = {
    color: "#71797e",
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y-1,true) && reelIn === true) {
            if (elements[pixelMap[pixel.x][pixel.y-1].element].isString === true || elements[pixelMap[pixel.x][pixel.y-1].element].id === elements.fish.id) {
                deletePixel(pixel.x,pixel.y-1)
                tryMove(pixel, pixel.x, pixel.y-1);
            }
            else if (elements[pixelMap[pixel.x][pixel.y-1].element].id === elements.fishing_rod.id) {
                deletePixel(pixel.x,pixel.y)
                reelIn = false
                deployed = false
                if (pixel.fishCaught) {
                    if (pixel.fishCaught === "fish") {
                        money += 1
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "salmon") {
                        money += 1
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "rainbow_trout") {
                        money += 2
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "bluefin_tuna") {
                        money += 2
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "albacore") {
                        money += 3
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "crab") {
                        money += 3
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                }
            }
        }
        else if (!isEmpty(pixel.x+1,pixel.y,true) && reelIn === true) {
            if (elements[pixelMap[pixel.x+1][pixel.y].element].id === elements.fishing_rod.id) {
                deletePixel(pixel.x,pixel.y)
                reelIn = false
                deployed = false
                if (pixel.fishCaught) {
                    if (pixel.fishCaught === "fish") {
                        money += 1
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "salmon") {
                        money += 1
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "rainbow_trout") {
                        money += 2
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "bluefin_tuna") {
                        money += 2
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "albacore") {
                        money += 3
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "crab") {
                        money += 3
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                }
            }
        }
        else if (!isEmpty(pixel.x-1,pixel.y,true) && reelIn === true) {
            if (elements[pixelMap[pixel.x-1][pixel.y].element].id === elements.fishing_rod.id) {
                deletePixel(pixel.x,pixel.y)
                reelIn = false
                deployed = false
                if (pixel.fishCaught) {
                    if (pixel.fishCaught === "fish") {
                        money += 1
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "salmon") {
                        money += 1
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "rainbow_trout") {
                        money += 2
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "bluefin_tuna") {
                        money += 2
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "albacore") {
                        money += 3
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                    else if (pixel.fishCaught === "crab") {
                        money += 3
                        alert(`Wow! You caught a ${pixel.fishCaught}!`)
                    }
                }
            }
        }
    },
    reactions: {
        "fish": { elem2:null, attr1:{"fishCaught":"fish"}, chance:0.4, func: function(pixel){if (reelIn === false) { reelIn = true }}},
        "salmon": { elem2:null, attr1:{"fishCaught":"salmon"}, chance:0.4, func: function(pixel){if (reelIn === false) { reelIn = true }}},
        "bluefin_tuna": { elem2:null, attr1:{"fishCaught":"tuna"}, chance:0.4, func: function(pixel){if (reelIn === false) { reelIn = true }}},
        "albacore": { elem2:null, attr1:{"fishCaught":"tuna"}, chance:0.4, func: function(pixel){if (reelIn === false) { reelIn = true }}},
        "crab": { elem2:null, attr1:{"fishCaught":"crab"}, chance:0.4, func: function(pixel){if (reelIn === false) { reelIn = true }}},
    },
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    category: "fishin",
    density: 7850,
    conduct: 0.42,
    hardness: 0.8,
    movable: false,
}

elements.salmon = {
    color: ["#C0C3CF", "#B7BAC3", "#ADB0B8"],
    behavior: [
        "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "XX|FX%0.5|BO",
        "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%8",
    ],
    category: "fishin",
    state: "solid",
    conduct: 0.2,
    eggColor: ["#e8961c","#faa82d"],
    breakInto: "blood",
    burn:20,
    burnTime:200,
    temp: 20,
    tempHigh: 120,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_fish",
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "kelp": { elem2:"water", chance:0.025, func:behaviors.FEEDPIXEL  },
        "plant": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "fly": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.6, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "dead_bug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "broth": { elem2:"water", chance:0.2, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cell": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
    },
    desc: "Salmo salar"
}

elements.rainbow_trout = {
    color: ["#D5A2B2", "#DDBBAB"],
    behavior: [
        "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "XX|FX%0.5|BO",
        "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%7",
    ],
    category: "fishin",
    state: "solid",
    conduct: 0.2,
    eggColor: ["#e8961c","#faa82d"],
    breakInto: "blood",
    burn:20,
    burnTime:200,
    temp: 20,
    tempHigh: 120,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_fish",
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "kelp": { elem2:"water", chance:0.025, func:behaviors.FEEDPIXEL  },
        "plant": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "fly": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.6, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "dead_bug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "broth": { elem2:"water", chance:0.2, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cell": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
    },
    desc: "Salmo salar"
}

elements.bluefin_tuna = {
    color: ["#3D74BA", "#4A6FB1", "#4A6FB1", "#dadbdc"],
    behavior: [
        "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "XX|FX%0.5|BO",
        "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%8",
    ],
    category: "fishin",
    state: "solid",
    conduct: 0.2,
    eggColor: ["#211316","#2C1A1D","#503734"],
    breakInto: "blood",
    burn:20,
    burnTime:200,
    temp: 20,
    tempHigh: 120,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_fish",
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "kelp": { elem2:"water", chance:0.025, func:behaviors.FEEDPIXEL  },
        "plant": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "fly": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.6, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "dead_bug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "broth": { elem2:"water", chance:0.2, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cell": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
    },
    desc: "Thunnus thynnus"
}

elements.albacore = {
    color: ["#dadbdc", "#b5b6b8", "#6b6d71"],
    behavior: [
        "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "XX|FX%0.5|BO",
        "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%8",
    ],
    category: "fishin",
    state: "solid",
    conduct: 0.2,
    eggColor: ["#211316","#2C1A1D","#503734"],
    breakInto: "blood",
    burn:20,
    burnTime:200,
    temp: 20,
    tempHigh: 120,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_fish",
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "kelp": { elem2:"water", chance:0.025, func:behaviors.FEEDPIXEL  },
        "plant": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "fly": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.6, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "dead_bug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "broth": { elem2:"water", chance:0.2, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "rotten_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cell": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
    },
    desc: "Thunnus alalunga"
}

elements.crab = {
    color: "#bc5a4c",
    behavior: [
        "XX|XX|SW:sand,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand%1 AND M2%5",
        "XX|XX|SW:sand,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand%3 AND M2%10 AND BO",
        "XX|M1|SW:sand,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand%4",
    ],
    reactions: {
        "algae": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "kelp": { elem2:"water", chance:0.025, func:behaviors.FEEDPIXEL  },
        "plant": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "fly": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.6, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "tadpole": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "spider": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "dead_bug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "broth": { elem2:"water", chance:0.2, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "herb": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lettuce": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "dead_plant": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "yeast": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "yogurt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "yolk": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "cell": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "alcohol": { elem1:"meat", chance:0.001 },
        "water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001, oneway:true },
        "salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001, oneway:true },
        "pool_water": { elem1:"meat", chance:0.001 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "vinegar": { elem1:"meat", chance:0.001 },
    },
    foodNeed: 20,
    temp: 20,
    tempHigh: 120,
    stateHigh: "meat",
    tempLow: -20,
    stateLow: ["frozen_meat","frozen_meat","frozen_meat","frozen_fish"],
    category:"fishin",
    breakInto: "blood",
    burn:20,
    burnTime:200,
    state: "solid",
    density: 963.7,
    conduct: 0.2,
    eggColor: "#d4b98f",
    desc: "Carcinus maenas"
}

elements.fish.desc = "Gadus harenae"
elements.fish.category = "fishin"