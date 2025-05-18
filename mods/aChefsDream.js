// created by SquareScreamYT
// https://github.com/SquareScreamYT/aChefsDream.js

runAfterLoad(function() {
    console.log("Thanks for using aChefsDream.js! -sqec")
    console.log("aChefsDream is hosted at https://github.com/SquareScreamYT/aChefsDream.js")
})

function interpolateRgb(rgb1, rgb2, ratio) {
    const interpolatedRgb = {
      r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio),
      g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio),
      b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio),
    };
    return interpolatedRgb;
}
function getRGB(rgb){
    let rgb2 = rgb.replace(")", "").replace("rgb(", "").replace(/,/g, "r").split("r")
    return { r: parseInt(rgb2[0]), g: parseInt(rgb2[1]), b: parseInt(rgb2[2]) };
}
function findMostFrequent(arr) {
    let freqMap = {};
    
    if (arr) {
        if (arr.length === 0) {
            return "water";
        } else if (arr.length === 1) {
            return arr[0]
        } else {
            arr.forEach(item => {
            if(!freqMap[item]) {
                freqMap[item] = 0;
            }
            freqMap[item]++;
            });
        
            let max = 0;
            let mostFrequent = [];
        
            for (let item in freqMap) {
            if (freqMap[item] > max) {
                max = freqMap[item];
                mostFrequent = [item];
            } else if (freqMap[item] === max) {
                mostFrequent.push(item);
            }
            }
            return mostFrequent.join(', '); 
        }  
    }
}
behaviors.STURDYPOWDER2 = [
    "XX|XX|XX",
    "XX|XX|XX",
    "M2%30|M1|M2%30",
],

elements.knife = {
    color: "#adb5bd",
    // other needed properties
    tool: (pixel) => {
        //store cutInto as a variable for legibility
        var cutInto = elements[pixel.element].cutInto;
        //if there’s no cutInto, it should equal undefined, which is falsey and !undefined = true
        if (!cutInto) { return };
        //if cutInto is an array, randomly pick one of its elements
        if(cutInto instanceof Array) { cutInto = cutInto[Math.floor(Math.random() * cutInto.length)] };
        //change pixel into the (chosen) element      
        //changePixel(pixel, cutInto)
        if (shiftDown) {
            if (Math.random() < 0.5) {
                var thiselement = pixel.element;
                changePixel(pixel, cutInto)
                pixelTempCheck(pixel);
                if (elements[thiselement].cutIntoColor) {
                    pixel.color = pixelColorPick(pixel, elements[thiselement].cutIntoColor);
                }
            }
        }
        else if (!shiftDown) {
            if (Math.random() < 0.1) {
                var thiselement = pixel.element;
                changePixel(pixel, cutInto)
                pixelTempCheck(pixel);
                if (elements[thiselement].cutIntoColor) {
                    pixel.color = pixelColorPick(pixel, elements[thiselement].cutIntoColor);
                }
            }
        }
    },
    category:"tools",
    canPlace: false,
    desc: "Use on pixels to cut them, if possible."
}
elements.whisk = {
    color: ["#a4a7b0","#a4a7b0","#a4a7b0","#bfc2c9","#e9eaf0","#bfc2c9","#a4a7b0"],
    // other needed properties
    tool: (pixel) => {
        //store whiskInto as a variable for legibility
        var whiskInto = elements[pixel.element].whiskInto;
        //if there’s no whiskInto, it should equal undefined, which is falsey and !undefined = true
        if (!whiskInto) { return };
        //if whiskInto is an array, randomly pick one of its elements
        if(whiskInto instanceof Array) {whiskInto = whiskInto[Math.floor(Math.random() * whiskInto.length)] };
        //change pixel into the (chosen) element      
        //changePixel(pixel, whiskInto)
        if (shiftDown) {
            if (Math.random() < 0.5) {
                changePixel(pixel, whiskInto)
            }
        }
        else if (!shiftDown) {
            if (Math.random() < 0.1) {
                changePixel(pixel, whiskInto)
            }
        }
    },
    category:"tools",
    canPlace: false,
    desc: "Use on pixels to whisk them, if possible."
}
elements.freeze_dry = {
    color: "#3a65b5",
    tool: function(pixel) {
        if (elements[pixel.element].freezeDryInto !== undefined) {
            if (Math.random() < 0.2) {
                var freezeDryInto = elements[pixel.element].freezeDryInto;
                if (Array.isArray(freezeDryInto)) {
                    freezeDryInto = freezeDryInto[Math.floor(Math.random() * freezeDryInto.length)];
                }
                if (freezeDryInto === null) {
                    deletePixel(pixel.x,pixel.y);
                    return;
                }
                var previouselement = pixel.element;
                changePixel(pixel,freezeDryInto);
                pixelTempCheck(pixel);
                if (elements[previouselement].freezeDryIntoColor) {
                    pixel.color = pixelColorPick(pixel, elements[previouselement].freezeDryIntoColor);
                }
            }
        }
    },
    category: "tools",
    excludeRandom: true,
    desc: "Use on pixels to freeze dry them, if possible."
}

elements.food_paint = {
    color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
    tool: function(pixel) {
        if (elements[pixel.element].isFood == true) {
            if (!shiftDown) {
                pixel.color = pixelColorPick(pixel,currentColor)
            }
            else {
                var rgb = currentColor.replace("#","").match(/.{1,2}/g);
                for (var i = 0; i < rgb.length; i++) {
                    rgb[i] = parseInt(rgb[i],16);
                }
                pixel.color = "rgb(" + rgb.join(",") + ")"
            }
            delete pixel.origColor;
        }
    },
    customColor: true,
    category: "tools",
    canPlace: false,
    desc: "Use on edible pixels to change color."
}

elements.eat = {
    color: ["#ffba79","#efff79"],
    tool: function(pixel) {
        if (elements[pixel.element].isFood || elements[pixel.element].category === "food" || eLists.JUICEMIXABLE.includes(pixel.element) || elements[pixel.element].id === elements.uranium.id || elements[pixel.element].id === elements.mercury.id) {
            deletePixel(pixel.x, pixel.y);
        }
    },
    category: "tools",
    desc: "Eats pixels."
}
elements.drink = {
    color: ["#03c6fc","#03a1fc"],
    tool: function(pixel) {
        if (elements[pixel.element].state === "liquid") {
            deletePixel(pixel.x, pixel.y);
        }
    },
    category: "tools",
    desc: "Drinks pixels."
}

eLists.JUICEMIXABLE = ["juice"];

elements.chicken = {
    color: ["#c29046", "#f5d271", "#d4bd7d"],
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|XX|M2%10",
        "XX|M1%33|XX",
    ],
    category:"life",
	state: "solid",
    reactions: {
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "chicken_nugget": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "worm": { elem2: "crushed_worm", chance:0.3},
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "rat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "snail": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "frog": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.32, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    },
    egg: "chicken_egg",
    foodNeed: 10,
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_chicken",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "raw_chicken",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 1117,
    conduct: 0.3,
    cutInto: "raw_chicken",
};

elements.chicken_egg = {
    color: ["#e0d3ab","#d9cdb5"],
    behavior: behaviors.STURDYPOWDER2,
    tick: function(pixel) {
        if (Math.random() < 0.1 && pixel.temp > 20 && pixel.temp < 35) {
            changePixel(pixel,"chick")
        }
    doDefaults(pixel);
    },
    category: "food",
    state: "solid",
    temp: 20,
    tempLow: -18,
    stateLow: "frozen_chicken_egg",
    breakInto: ["yolk"],
    tempHigh: 400,
    stateHigh: ["calcium", "ash"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    reactions: {
        "water": { elem2:null, elem1:"hard_boiled_egg", chance:10, tempMin:80 }
    }
};
elements.water.reactions.egg = { elem1:null, elem2:"hard_boiled_egg", chance:10, tempMin:80 }
elements.frozen_chicken_egg = {
    color: ["#e0d3cf","#d9cdd3"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    temp: -20,
    tempHigh: 10,
    stateHigh: "chicken_egg",
    breakInto: ["calcium", "hard_yolk"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    hidden: true,
};

elements.hard_boiled_egg = {
	color: ["#e0d3ab","#d9cdb5","#e4d4b4","#f3f3ef"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 1000,
    stateHigh: ["ash", "smoke"],
    density: 820.33,
    isFood: true,
    hidden: true,
};

elements.chick = {
    color: ["#ffdf85", "#ffef5c"],
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|FX%5 AND CH:chicken%0.1|M2%10",
        "XX|M1%33|XX",
    ],
    category: "life",
    state: "solid",
    egg: "chicken_egg",
    foodNeed: 20,
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "blood",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    reactions: {
        "crushed_worm": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL},
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "chicken_nugget": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "worm": { elem2: "crushed_worm", chance:0.3},
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "rat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "snail": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "frog": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.32, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    }
};

elements.barbecued_chicken = {
    color:["#bf743b", "#b57026","#8f5e29","#a87b11"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}
elements.barbecue_sauce = {
    color: "#571e1A",
    behavior: behaviors.LIQUID,
    viscosity: 50000,
    tempHigh: 260,
    stateHigh: ["carbon_dioxide","methane","steam","salt","sugar"],
    category:"food",
    state: "liquid",
    density: 1235,
    stain: 0.05,
    isFood: true,
}
if (!elements.ketchup.reactions) { elements.ketchup.reactions = {}; }
elements.ketchup.reactions.molasses = { elem1:"barbecue_sauce", elem2:"barbecue_sauce" }

elements.mustard = {
    color: "#e1ad01",
    behavior: behaviors.LIQUID,
    viscosity: 50000,
    tempHigh: 260,
    stateHigh: ["carbon_dioxide","methane","steam","sugar"],
    category:"food",
    state: "liquid",
    density: 1235,
    stain: 0.05,
    isFood: true
}

elements.soup = {
    color: "#fbd189",
    behavior: behaviors.LIQUID,
    tempHigh: 130,
    stateHigh: ["steam","steam","steam","fragrance"],
    tempLow: 0,
    category: "food",
    state: "liquid",
    density: 1052,
    conduct: 0.03,
    stain: -0.01,
    isFood: true,
    //thanks to nouser
    onMix: function(soup,ingredient) {
        if (elements[ingredient.element].id !== elements.soup.id && elements[ingredient.element].id !== elements.broth.id && ingredient.temp > 40) {
            if (elements[ingredient.element].isFood || elements[ingredient.element].category === "food" || elements[ingredient.element].category === "liquids") {
                var rgb1 = soup.color.match(/\d+/g);
                var rgb2 = ingredient.color.match(/\d+/g);
                // average the colors
                var rgb = [
                    Math.round((parseInt(rgb1[0])+parseInt(rgb2[0]))/2),
                    Math.round((parseInt(rgb1[1])+parseInt(rgb2[1]))/2),
                    Math.round((parseInt(rgb1[2])+parseInt(rgb2[2]))/2)
                ];
				if (!soup.elemlist){
				    soup.elemlist = [];
				}
				    soup.decidedHigh = soup.elemlist[Math.floor(Math.random()*soup.elemlist.length)];
				    soup.elemlist.push(ingredient.element)
				    soup.stateHigh = soup.elemlist;
                changePixel(ingredient, "soup");
                var hex = RGBToHex(rgb);
                soup.color = pixelColorPick(soup, hex);
                if (Math.random() < 0.5) { deletePixel(ingredient.x, ingredient.y); }
                else {
                    ingredient.color = pixelColorPick(ingredient, hex);
                    if (!ingredient.elemlist){
                        ingredient.elemlist = [];
                    }
                    ingredient.elemlist.push(soup.elemlist[Math.floor(Math.random() * soup.elemlist.length)])
                }
            }
		}
	},
    tick: function(pixel) {
		if (!pixel.decidedHigh){
			pixel.decidedHigh = "steam";
		}
		if (pixel.temp > 100){
			if (Math.random() < 0.5) {
				changePixel(pixel, "steam");
		    }
            else {
			    changePixel(pixel, pixel.decidedHigh)
		    }
		}
	},
    hoverStat: function(soup, ingredient) {
        if (findMostFrequent(soup.elemlist) == undefined) {
            return "Ingredients:None"
        } else {
            return "Ingredients:"+findMostFrequent(soup.elemlist)
        }
    },
}

if (!elements.broth.reactions) elements.broth.reactions = {};
elements.broth.reactions.water = { elem1: "soup", elem2: "soup", tempMin: 70 }

elements.noodles = {
    desc: "whatever noodles",
    color: ["#F3BA4F", "#F7D161"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    temp: 30,
    breakInto: ["crumb"],
    tempHigh: 130,
    stateHigh: ["toast"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    hidden: true,
};

if (!elements.batter.reactions) elements.batter.reactions = {};
elements.batter.reactions.water = {elem1: "noodles", tempMin: 70}

elements.battered_raw_chicken = {
    color: ["#eacfa9", "#ecd2af"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:25,
    tempHigh: 125,
    stateHigh: "cooked_chicken",
    reactions: {
        "crumb": { elem1: "raw_chicken_nugget", elem2: null },
    },
    hidden: true,
};

elements.steamed_chicken = {
    color:["#cfba8f", "#d2b788"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:50,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}

elements.smoked_chicken = {
    color:["#AF4523", "#AC481F"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}

elements.crushed_worm = {
    color: ["#e56932", "#c0714e"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 20,
    tempHigh: 50,
    stateHigh: ["ash", "smoke"],
    tempLow: -4,
    stateLow: "frozen_crushed_worm",
    density: 200.33,
    isFood: true,
    hidden: true,
};

elements.worm.reactions.rock = { elem1: "crushed_worm" }
elements.worm.breakInto = "crushed_worm"

elements.frozen_crushed_worm = {
    color: ["#2fcbae", "#3edabd", "#b2d5d9"],  
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: -4,
    tempHigh: 20,
    stateHigh: "crushed_worm",
    density: 200.33,
    isFood: false,
    hidden: true,
};

elements.cooked_chicken = {
    color: ["#c17c20", "#ebad2b", "#f7b846"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
};

elements.raw_chicken = {
    color: ["#dfc8bd", "#e2cdc0", "#b9a195"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "cooked_chicken",
    temp:25,
    tempHigh: 600,
    stateHigh: ["cooked_chicken"],
    reactions: {
        "batter": { elem1: "battered_raw_chicken", elem2: null },
        "smoke": {elem1: "smoked_chicken"},
        "steam": {elem1: "steamed_chicken"},
        "water": {elem1: "boiled_chicken", tempMin: 70},
        "nut_oil": {elem1: "fried_chicken", tempMin: 70},
        "charcoal": {elem1: "barbecued_chicken", tempMin: 70},
        "fire": {elem1: "barbecued_chicken"}
    }
};

elements.boiled_chicken = {
    color: ["#F9CC84", "#EDCE89", "#F8CB78"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 65,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
}

elements.fried_chicken = {
    color: ["#E87D1A", "#E77106", "#E77106"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 90,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
}

elements.raw_chicken_nugget = {
    color: ["#d6bc7e", "#d2b47a", "#c7a969"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "chicken_nugget",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
    reactions: {
        "nut_oil": {elem1: "chicken_nugget", tempMin: 70}
    }
};

elements.chicken_nugget = {
    color: ["#D77105", "#D77105", "#EB8C2C", "#EB8C2C"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    tempLow: -20,
    stateLow: "frozen_chicken_nugget",
    isFood: true,
    density: 100,
    hidden: true,
};

elements.frozen_chicken_nugget = {
    color: ["#45a69c", "#73d9cd", "#3f9f95", "#389d8e"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: -20,
    tempHigh: 40,
    stateHigh: "chicken_nugget",
    isFood: false,
    density: 100,
    hidden: true,
};

elements.olive_wood = {
    color: "#632e1f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
}
elements.olive_branch = {
    color: "#632e1f",
    behavior: [
        "CR:olive_leaves,olive_branch%2|CR:olive_leaves,olive_leaves,olive_leaves,olive_branch%2|CR:olive_leaves,olive_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "olive_wood",
    tempLow: -30,
    stateLow: "olive_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
    hidden: true,
}
elements.olive_leaves = {
    color: ["#407603","#376502","#2e5502"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:olive%0.15|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "olive_seed",
    hidden: true
}
elements.olive = {
    color: ["#6e8b3d","#7c9d45"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "rock": { elem1:"nut_oil", elem2:"rock", chance:0.035, color1: "#ffc844" },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "nut_oil",
    breakIntoColor: "#ffc844",
    density: 1050,
    isFood: false
}

elements.olive_seed = {
    color: "#854610",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "olive_wood" : "olive_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"olive_wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};
/*
elements.cooking_oil = {
    color: "#ffc844",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 400,
    stateHigh: "fire",
    burn: 70,
    burnTime: 300,
    burnInto: ["carbon_dioxide","fire"],
    viscosity: 250,
    state: "liquid",
    density: 825,
    temp: 30,
    reactions: {
        "peeled_potato": {elem2: "fried_potato", tempMin: 70}
    }
},
*/
elements.pepper = {
    color: ["#1f190a", "#2b200d", "#362712", "#3b2211"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

elements.potato.cutInto = ["peeled_potato","peeled_potato","peeled_potato","potato_skin"]//{elem1: ["potato_skin","peeled_potato"] }

elements.potato_skin = {
    color: ["#DC8A5A", "#A86C36", "#DC9A59", "#A76B35"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    density: 1100,
    tempHigh: 250,
    stateHigh: ["ash", "smoke"],
}

elements.peeled_potato = {
    color: ["#D6C39F", "#D1C09D", "#D1C09D", "#CDBF9E"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 20,
    hidden: true,
    breakInto: "mashed_potato",
    tempHigh: 176,
    stateHigh: "baked_potato",
    density: 1100,
    reactions: {
        "nut_oil": { elem1: "fried_potato", tempMin: 70 }
    }
}

elements.fried_potato = {
    color: ["#DD7908", "#D57206", "#CA6801", "#D68001"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 35,
    hidden: true,
    tempHigh: 600,
    density: 1110,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.applewood = {
    color: "#632e1f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.apple_branch = {
    color: "#632e1f",
    behavior: [
        "CR:apple_leaves,apple_branch%2|CR:apple_leaves,apple_branch%2|CR:apple_leaves,apple_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "applewood",
    tempLow: -30,
    stateLow: "applewood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
}
elements.apple_leaves = {
    color: ["#00d404","#0ec911","#109e12"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:apple%0.15|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.apple = {
    color: ["#eb1a1a","#f22c2c","#d62020"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "apple_juice",
    cutInto: "apple_slice",
    state: "solid",
    density: 1050,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#cfc540",
}

elements.apple_slice = {
    color: "#f0af37",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "apple_juice",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.apple_seed = {
    color: "#854610",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "applewood" : "apple_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"applewood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

elements.apple_juice = {
    color: "#ffde55",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#ffde55")
            }
        }
    },
    reactions: {
        "sugar": { elem1:"apple_jam", elem2:null, chance:0.35 },
        "yeast": { elem1:"apple_cider_vinegar", elem2:null, chance:0.35 }
    },
    tempLow: 0
};
eLists.JUICEMIXABLE.push("apple_juice");

elements.apple_jam = {
    color: "#ebc034",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 400,
    stateHigh: ["sugar","smoke"],
    burn: 70,
    burnTime: 300,
    viscosity: 750,
    state: "liquid",
    density: 825,
    hidden: true
};

elements.cake = {
    color: ["#f2e5bf","#e8daba"],
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 550,
    stateHigh: "ash",
    category: "food",
    burn: 10,
    burnTime: 400,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    hidden: true,
    isFood: true
};

elements.icing_sugar = {
    color: "#f8f8f1",
    behavior: behaviors.POWDER,
    onMix: function(icing_sugar1, icing_sugar2) {
        if (shiftDown && Math.random() < 0.2) {
            changePixel(icing_sugar1,"icing")
        }
    },
    tempHigh: 186,
    stateHigh: "caramel",
    viscosity: 1.5,
    category: "food",
    state: "solid",
    density: 1036.86,
    isFood: true
};

elements.icing = {
    color: "#fefefb",
    behavior: behaviors.LIQUID,
    onMix: function(icing_sugar1, icing_sugar2) {
        if ((shiftDown && Math.random() < 0.2) || (elements[icing_sugar2.element].id === elements.icing_sugar.id && Math.random() < 0.25)) {
            changePixel(icing_sugar1,"icing")
        }
    },
    tempHigh: 45,
    stateHigh: ["dry_icing"],
    stateLowColorMultiplier: 0.97,
    category: "food",
    isFood: true,
    state: "solid",
    density: 959.97,
    viscosity: 9000,
    hidden: true
};

elements.dry_icing = {
    color: "#fffefa",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 1000,
    stateHigh: ["smoke","smoke","smoke","steam","steam","calcium"],
    stateLowColorMultiplier: 0.97,
    category: "food",
    isFood: true,
    state: "solid",
    density: 959.97,
    viscosity: 9000,
    hidden: true
};

elements.cream.reactions.baked_batter = {elem2: "cake" }

elements.sugar.breakInto = {elem1: "icing_sugar"}

elements.boiler = {
	color: "#73fff8",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < -230) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > 270) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < 95) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > 95) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
    temp: 110
};

elements.steamer = {
	color: "#45daff",
	behavior: [
        "CR:steam%90|CR:steam%90|CR:steam%90",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
    temp: 110
};

elements.smoker = {
	color: "#bfa797",
	behavior: [
        "CR:smoke%90|CR:smoke%90|CR:smoke%90",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
    temp: 110
};

elements.orange_wood = {
    color: "#a88c4a",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.orange_branch = {
    color: "#a88c4a",
    behavior: [
        "CR:orange_leaves,orange_branch%2|CR:orange_leaves,orange_branch%2|CR:orange_leaves,orange_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "orange_wood",
    tempLow: -30,
    stateLow: "orange_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
}
elements.orange_leaves = {
    color: ["#61c43d","#5ddb3d","#51d44c"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:orange%0.1|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.orange = {
    color: ["#eda137","#e39230","#d1882e"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "orange_juice",
    cutInto: ["orange_slice","orange_slice","orange_slice","orange_slice","orange_peels"],
    state: "solid",
    density: 1050,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#cf9f40",
}

elements.orange_slice = {
    color: "#f5b133",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "orange_juice",
    state: "solid",
    density: 1050,
    hidden: true,
    reactions: {
        "sugar": { elem1:"marmalade", elem2:null, chance:0.35 }
    },
}

elements.orange_seed = {
    color: "#695531",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "orange_wood" : "orange_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"orange_wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

elements.orange_juice = {
    color: "#ffb326",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#ffde55")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0
};
eLists.JUICEMIXABLE.push("orange_juice");

elements.orange_peels = {
    color: "#d69c31",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "orange_juice",
    state: "solid",
    density: 1050,
    hidden: true,
    reactions: {
        "sugar": { elem1:"marmalade", elem2:null, chance:0.35 }
    },
}

elements.marmalade = {
    color: "#fc9a38",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 400,
    stateHigh: ["sugar","smoke"],
    burn: 70,
    burnTime: 300,
    viscosity: 750,
    state: "liquid",
    density: 825,
    hidden: true
};

elements.tuna = {
    color: ["#3D74BA", "#4A6FB1", "#4A6FB1"],
    behavior: [
        "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "XX|FX%0.5|BO",
        "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%5",
    ],
    category: "life",
    state: "solid",
    cutInto: "raw_tuna",
    conduct: 0.2,
    eggColor: ["#211316","#2C1A1D","#503734"],
    breakInto: "blood",
    burn:20,
    burnTime:200,
    temp: 20,
    tempHigh: 120,
    stateHigh: "cooked_tuna",
    tempLow: -20,
    stateLow: "frozen_fish",
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
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
}

elements.salmon = {
    color: ["#C0C3CF", "#B7BAC3", "#ADB0B8"],
    behavior: [
        "XX|M2%5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "XX|FX%0.5|BO",
        "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%5",
    ],
    category: "life",
    state: "solid",
    conduct: 0.2,
    eggColor: ["#e8961c","#faa82d"],
    breakInto: "blood",
    burn:20,
    burnTime:200,
    temp: 20,
    tempHigh: 120,
    stateHigh: "cooked_salmon",
    tempLow: -20,
    stateLow: "frozen_fish",
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
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
    cutInto: "raw_salmon"
}

elements.raw_salmon = {
    color: ["#FD7E19", "#FE842F", "#FD8F45"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "cooked_salmon",
    temp:25,
    tempHigh: 80,
    stateHigh: "cooked_salmon",
    isFood: true,
    reactions: {
        "smoke": {elem1: "smoked_salmon"},
        "steam": {elem1: "steamed_salmon"},
        "water": {elem1: "boiled_salmon", tempMin: 70},
        "nut_oil": {elem1: "fried_salmon", tempMin: 70}
    }
}

elements.cooked_salmon = {
    color: ["#CB6132", "#D05D18", "#CC5926"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
    hidden: true,
}

elements.smoked_salmon = {
    color: ["#B64431", "#B24932"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
    isFood: true,
}

elements.steamed_salmon = {
    color: ["#BB7B4B", "#B07B54"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:60,
    tempHigh: 600,
    hidden: true,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.boiled_salmon = {
    color: ["#F9B080", "#FFB78D"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:70,
    tempHigh: 600,
    hidden: true,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.fried_salmon = {
    color: ["#E06643", "#ED774B"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:70,
    tempHigh: 600,
    hidden: true,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.raw_tuna = {
    color: ["#EF4A5C", "#F74F65", "#E83A53"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:25,
    burnInto: "cooked_tuna",
    tempHigh: 80,
    stateHigh: "cooked_tuna",
    isFood: true,
    reactions: {
        "smoke": {elem1: "smoked_tuna"},
        "steam": {elem1: "steamed_tuna"},
        "water": {elem1: "boiled_tuna", tempMin: 70},
        "nut_oil": {elem1: "fried_tuna", tempMin: 70}
    }
}

elements.cooked_tuna = {
    color: ["#B76C71", "#C2787C", "#A86265"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    hidden: true,
    temp:50,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.smoked_tuna = {
    color: ["#9D5C24", "#A4632A"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    hidden: true,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.steamed_tuna = {
    color: ["#CFA578", "#D4AC82"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:60,
    tempHigh: 600,
    hidden: true,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.boiled_tuna = {
    color: ["#C79F65", "#D9B075"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    hidden: true,
    temp:70,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.fried_tuna = {
    color: ["#BF8251", "#9F6031"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    hidden: true,
    temp:70,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    isFood: true,
}

elements.watermelon_seed = {
    color: "#2b2118",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.7) {
                    movePixel(pixel,pixel.x+1,pixel.y);
                    createPixel(Math.random() > 0.5 ? "watermelon_stem" : "watermelon_stem",pixel.x-1,pixel.y);
                }
                if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.7) {
                    movePixel(pixel,pixel.x-1,pixel.y);
                    createPixel(Math.random() > 0.5 ? "watermelon_stem" : "watermelon_stem",pixel.x+1,pixel.y);
                }
                if (!isEmpty(pixel.x+1,pixel.y) && !isEmpty(pixel.x-1,pixel.y) &&isEmpty(pixel.x+1,pixel.y-1) && Math.random() > 0.7) {
                    movePixel(pixel,pixel.x+1,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "watermelon_stem" : "watermelon_stem",pixel.x-1,pixel.y+1);
                }
                if (!isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x+1,pixel.y) &&isEmpty(pixel.x-1,pixel.y-1) && Math.random() > 0.7) {
                    movePixel(pixel,pixel.x-1,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "watermelon_stem" : "watermelon_stem",pixel.x+1,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"watermelon_stem");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%20|XX",
        "XX|M1|XX",
    ],
};

elements.watermelon_stem = {
    color: "#6ec938",
    behavior: [
        "ST:watermelon_stem|ST:watermelon_stem AND CR:watermelon%0.1|ST:watermelon_stem",
        "ST:watermelon_stem|XX|ST:watermelon_stem",
        "XX|XX|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
};

elements.watermelon = {
    color: ["#28b02d","#36bf3a"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "watermelon_juice",
    cutInto: "watermelon_flesh",
    state: "solid",
    density: 1050,
}

elements.watermelon_flesh = {
    color: "#f53527",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "watermelon_juice",
    state: "solid",
    density: 1050,
    hidden: true,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#c43f33",
}

elements.watermelon_juice = {
    color: "#eb4034",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#eb4034")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0
};
eLists.JUICEMIXABLE.push("watermelon_juice");

elements.grape.breakInto = "grape_juice",

elements.grape_juice = {
    color: "#291824",
    behavior: behaviors.LIQUID,
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel, "#291824")
            }
        }
    },
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "seltzer": { elem1: "soda", elem2: "foam" },
        "carbon_dioxide": { elem1: "soda", elem2: "foam" },
        "milk": { elem1: "fruit_milk", elem2: "fruit_milk" },
        "alcohol": { elem1: "wine", elem2: "wine" },
        "yeast": { elem1: ["wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","wine","cream_of_tartar"], elem2: null, chance:80 },
    },
    tempHigh: 160,
    stateHigh: ["steam","sugar"],
    tempLow: -10,
    stateLowColorMultiplier: 1.1,
    category: "liquids",
    state: "liquid",
    density: 1054,
    hidden: true,
    isFood: true
};
eLists.JUICEMIXABLE.push("grape_juice");

elements.cream_of_tartar = {
    color: ["#EFEFEF", "#EBEBEB", "#D8D8D6"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 1500,
    isFood: true,
    hidden: true,
    reactions: {
        "sugar_water": {elem2: "corn_syrup", elem1: null, tempMin: 80},
        "carbonic_acid": {elem1: null, elem2: "carbon_dioxide"}
    }
}

elements.corn_syrup = {
    color: ["#FFCD0C", "#E47F00", "#FEB003"],
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    tempHigh: 100,
    stateHigh: "caramel",
    isFood: true,
    hidden: true,
    viscosity: 10000
}

if (!elements.baking_soda.reactions) elements.baking_soda.reactions = {};
elements.baking_soda.reactions.water = { elem1: "carbonic_acid", elem2: "carbonic_acid" }

elements.carbonic_acid = {
    color: ["#E0DEA5", "#DFDB9C", "#EBE8BC"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    hidden: true,
}

elements.wine = {
    color: ["#6F0013", "#6D0112"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    /*onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel, "#6D0112")
            }
        }
    },*/
    tempHigh: 100,
    stateHigh: "steam",
    isFood: true,
    density: 1000,
    hidden: true,
    tempLow: 0
}
//eLists.JUICEMIXABLE.push("wine");

elements.shrimp = {
    color: ["#EE5422", "#E9683C", "#F3583F", "#EDA270"],
    behavior: [
        "SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14|M2%7.5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14|FX%20|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
        "M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%14",
    ],
    category: "life",
    state: "solid",
    cutInto: "raw_shrimp",
    conduct: 0.2,
    breakInto: "raw_shrimp",
    burn:20,
    burnTime:200,
    temp: 20,
    tempHigh: 120,
    stateHigh: "cooked_shrimp",
    tempLow: -20,
    stateLow: "frozen_meat",
    reactions: {
        "algae": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
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
}


elements.coconut_seed = {
    color: "#7a603d",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1) && pixel.height < 7) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "coconut_stem" : "coconut_stem",pixel.x,pixel.y+1);
                    
                    pixel.height++
                }
            }
            else if (pixel.age > 150 && pixel.height > 6 && Math.random() < 0.1) {
                changePixel(pixel,"coconut_tree_top");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "height": 0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};

elements.coconut_stem = {
    color: "#8f6c3f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.coconut_tree_top = {
    color: "#8f6c3f",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    properties:{
        "leftleaves": 0,
        "rightleaves": 0,
    },
    hidden: true,
    tick: function(pixel) {
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 0) {
            if (isEmpty(pixel.x+1,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x+1,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 1) {
            if (isEmpty(pixel.x+2,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x+2,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 2) {
            if (isEmpty(pixel.x+3,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x+3,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 3) {
            if (isEmpty(pixel.x+4,pixel.y+1)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x+4,pixel.y+1);

                pixel.rightleaves++
            }
        }


        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 0) {
            if (isEmpty(pixel.x-1,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x-1,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 1) {
            if (isEmpty(pixel.x-2,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x-2,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 2) {
            if (isEmpty(pixel.x-3,pixel.y)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x-3,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 3) {
            if (isEmpty(pixel.x-4,pixel.y+1)) {
                createPixel(Math.random() > 0.5 ? "coconut_leaves" : "coconut_leaves",pixel.x-4,pixel.y+1);

                pixel.leftleaves++
            }
        }


        if (Math.random() < 0.1 && pixel.age > 70 && pixel.temp < 100 && pixel.leftleaves > 0 && pixel.rightleaves > 0) {
            if (isEmpty(pixel.x+1,pixel.y+1)) {
                createPixel(Math.random() > 0.5 ? "coconut" : "coconut",pixel.x+1,pixel.y+1);
            }
        }
        if (Math.random() < 0.1 && pixel.age > 70 && pixel.temp < 100 && pixel.leftleaves > 0 && pixel.rightleaves > 0) {
            if (isEmpty(pixel.x-1,pixel.y+1)) {
                createPixel(Math.random() > 0.5 ? "coconut" : "coconut",pixel.x-1,pixel.y+1);
            }
        }
        pixel.age++;
    doDefaults(pixel);
},
}
elements.coconut_leaves = {
    color: ["#569923","#5ea12b"],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.coconut = {
    color: "#6e4621",
    behavior: [
        "ST:coconut_tree_top|ST:coconut_leaves|ST:coconut_tree_top",
        "ST:coconut_stem|XX|ST:coconut_stem",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "coconut_milk",
    cutInto: ["cut_coconut"],
    state: "solid",
    density: 1050,
}

elements.coconut_milk = {
    color: "#fffcf2",
    behavior: behaviors.LIQUID,
    reactions: {
        "melted_chocolate": { elem1:"chocolate_milk", elem2:null },
        "chocolate": { elem1:"chocolate_milk", elem2:"melted_chocolate", chance:0.05 },
        "juice": { elem1:"fruit_milk", elem2:null, chance:0.05 },
        "soda": { elem1:"pilk", elem2:null, chance:0.1 },
        "yolk": { elem1:"eggnog", elem2:null, chance:0.1 },
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "caramel": { color1:"#C8B39A", elem2:null, chance:0.05 },
        "sugar": { elem2:null, chance:0.005},
    },
    tempLow: 0,
    stateLow: "ice_cream",
    stateLowColorMultiplier: [0.97,0.93,0.87],
    tempHigh: 93,
    stateHigh: "yogurt",
    viscosity: 1.5,
    category: "liquids",
    state: "liquid",
    density: 825,
    isFood: true
}

elements.tea.reactions.coconut_milk = { elem2:null, color1:"#ad8955", chance:0.005}
elements.coffee.reactions.coconut_milk = { elem2:"foam", color1:"#856545", chance:0.005}

elements.cut_coconut = {
    color: "#fff2cf",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "coconut_juice",
    state: "solid",
    density: 1050,
    hidden: true,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#ede9b9",
}

elements.coconut_juice = {
    color: "#e9ebe4",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#e9ebe4")
            }
        }
    },
    behavior: behaviors.LIQUID,
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "caramel": { color1:"#C8B39A", elem2:null, chance:0.05 },
    },
    tempLow: 0,
    tempHigh: 93,
    stateHigh: ["sugar","steam"],
    viscosity: 1.5,
    category: "liquids",
    state: "liquid",
    density: 1036.86,
    hidden: true,
    isFood: true
}
eLists.JUICEMIXABLE.push("coconut_juice");

elements.lemon_wood = {
    color: "#786531",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
}
elements.lemon_branch = {
    color: "#786531",
    behavior: [
        "CR:lemon_leaves,lemon_branch%2|CR:lemon_leaves,lemon_leaves,lemon_leaves,lemon_branch%2|CR:lemon_leaves,lemon_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "lemon_wood",
    tempLow: -30,
    stateLow: "lemon_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
    hidden: true,
}
elements.lemon_leaves = {
    color: ["#42b336","#46a83b"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:lemon%0.15|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "lemon_seed",
    hidden: true
}
elements.lemon = {
    color: ["#dbd937","#e0dd28"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "sugar": { elem1:"marmalade", elem2:null, color1:"#e0bf2b", chance:0.35 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "lemon_juice",
    state: "solid",
    density: 1050,
    isFood: true,
    cutInto: ["lemon_zest","lemon_slice","lemon_slice","lemon_slice","lemon_slice"],
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#b8af4b",
}

elements.lemon_juice = {
    color: "#e0d358",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#e0d358")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    hidden: true,
    tempLow: 0,
    reactions: {
        "sugar": {elem1:"lemonade", elem2: "null", chance:0.35}
    }
};
eLists.JUICEMIXABLE.push("lemon_juice");

elements.lemonade = {
    color: "#fff378",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#fff378")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    hidden: true,
    tempLow: 0
};

eLists.JUICEMIXABLE.push("lemonade");

elements.lemon_zest = {
    color: "#dbc535",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true,
    reactions: {
        "sugar": { elem1:"marmalade", elem2:null, color1:"#e0bf2b", chance:0.35 }
    },
}

elements.lemon_slice = {
    color: "#ebe431",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "lemon_juice",
    state: "solid",
    density: 1050,
    hidden: true,
    reactions: {
        "sugar": { elem1:"marmalade", elem2:null, color1:"#e0bf2b", chance:0.35 }
    },
}

elements.lemon_seed = {
    color: "#854610",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "lemon_wood" : "lemon_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"lemon_wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};


elements.carrot_seed = {
    color: "#b08d35",
    tick: function (pixel) {
        if (isEmpty(pixel.x, pixel.y + 1)) {
            movePixel(pixel, pixel.x, pixel.y + 1);
        }
        else {
            if (Math.random() < 0.1 && pixel.age > 100 && pixel.temp < 100 && pixel.leafgrown == true && pixel.growthpixel == 0) {
                if (!outOfBounds(pixel.x, pixel.y + 1)) {
                    var randomNumber1 = Math.round(Math.random());
                    pixel.growthpixel = pixel.growthpixel + randomNumber1;
                    var dirtPixel = pixelMap[pixel.x][pixel.y + 1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        deletePixel(pixel.x, pixel.y + 1);
                        movePixel(pixel, pixel.x, pixel.y + 1);
                        createPixel("carrot_leaves", pixel.x, pixel.y - 1);
                        pixel.growthpixel++;
                    }
                }
            }
            if (Math.random() < 0.1 && pixel.age > 100 && pixel.temp < 100 && pixel.leafgrown == true && pixel.growthpixel > 0 && pixel.growthpixel < 4) {
                if (!outOfBounds(pixel.x, pixel.y + 1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y + 1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        deletePixel(pixel.x, pixel.y + 1);
                        movePixel(pixel, pixel.x, pixel.y + 1);
                        createPixel("carrot", pixel.x, pixel.y - 1);
                        pixel.growthpixel++;
                    }
                }
            }
            if (!isEmpty(pixel.x, pixel.y + 1) && Math.random() > 0.95 && isEmpty(pixel.x - 1, pixel.y - 1) && isEmpty(pixel.x + 1, pixel.y - 1) && pixel.leafgrown == false) {
                var dirtPixel = pixelMap[pixel.x][pixel.y + 1];
                if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                    createPixel("carrot_leaves", pixel.x - 1, pixel.y - 1);
                    createPixel("carrot_leaves", pixel.x + 1, pixel.y - 1);
                    pixel.leafgrown = true;
                }
            }
            else if (pixel.age > 150 && pixel.growthpixel == 4 && Math.random() < 0.1) {
                changePixel(pixel, "carrot");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age": 0,
        "growthpixel": 0,
        "leafgrown": false
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};

elements.carrot_leaves = {
    color: ["#61cc3d","#58c234"],
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "carrot_seed",
    hidden: true
}
elements.carrot = {
    color: "#e39919",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "carrot_juice",
    state: "solid",
    density: 1050,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#ba8125",
}

elements.carrot_juice = {
    color: "#f5a742",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#f5a742")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    tempLow: 0,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
};
eLists.JUICEMIXABLE.push("carrot_juice");

elements.apple_cider_vinegar = {
    color: "#fffe75",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#fffe75")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0
};
eLists.JUICEMIXABLE.push("apple_cider_vinegar");

elements.turnip_seed = {
    color: "#994828",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 100 && pixel.temp < 100 && pixel.leafgrown == true && pixel.growthpixel == 0) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        deletePixel(pixel.x,pixel.y+1);
                        movePixel(pixel,pixel.x,pixel.y+1);
                        createPixel("turnip_leaves",pixel.x,pixel.y-1);
                        pixel.growthpixel++;
                    }
                }
                
            }
            if (pixel.age > 100 && pixel.temp < 100 && pixel.leafgrown == true && pixel.growthpixel > 0 && pixel.growthpixel < 3) {
                if (!outOfBounds(pixel.x-1,pixel.y)) {
                    var pixelleft = pixelMap[pixel.x-1][pixel.y];
                    if (pixelleft.element === "dirt" || pixelleft.element === "mud" || pixelleft.element === "sand" || pixelleft.element === "wet_sand" || pixelleft.element === "clay_soil" || pixelleft.element === "mycelium") {
                        deletePixel(pixel.x-1,pixel.y);
                        createPixel("turnip",pixel.x-1,pixel.y);
                    }
                }
                if (!outOfBounds(pixel.x+1,pixel.y)) {
                    var pixelright = pixelMap[pixel.x+1][pixel.y];
                    if (pixelright.element === "dirt" || pixelright.element === "mud" || pixelright.element === "sand" || pixelright.element === "wet_sand" || pixelright.element === "clay_soil" || pixelright.element === "mycelium") {
                        deletePixel(pixel.x+1,pixel.y);
                        createPixel("turnip",pixel.x+1,pixel.y);
                    }
                }
            }
            if (Math.random() < 0.1 && pixel.age > 100 && pixel.temp < 100 && pixel.leafgrown == true && pixel.growthpixel > 0 && pixel.growthpixel < 3) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        deletePixel(pixel.x,pixel.y+1);
                        movePixel(pixel,pixel.x,pixel.y+1);
                        createPixel("turnip",pixel.x,pixel.y-1);
                        pixel.growthpixel++;
                    }
                }
                
            }
            if (!isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.95 && isEmpty(pixel.x-1,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1) && pixel.leafgrown == false) {
                var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                    createPixel("turnip_leaves",pixel.x-1,pixel.y-1);
                    createPixel("turnip_leaves",pixel.x+1,pixel.y-1);
                    pixel.leafgrown++
                }
            }
            else if (pixel.age > 150 && pixel.growthpixel == 3 && Math.random() < 0.1) {
                changePixel(pixel,"turnip");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "growthpixel": 0,
        "leafgrown": false
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.turnip_leaves = {
    color: ["#399431","#3b8c34"],
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035}
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    seed: "turnip_seed",
    hidden: true
}
elements.turnip = {
    color: ["#945bb3","#a05cbd","#a053b8","#b364c4"],
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "turnip_juice",
    state: "solid",
    density: 1050,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#79097d",
}

elements.turnip_juice = {
    color: "#700f5d",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#700f5d")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    tempLow: 0,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
};
eLists.JUICEMIXABLE.push("turnip_juice");

elements.corn.breakInto ="corn_starch"

elements.corn_starch = {
    color: ["#fcf2e1","#f2e7d3","#fcf3de"],
    behavior: behaviors.POWDER,
    name: "starch",
    reactions: {
        "water": { elem1: "dough", elem2: null },
        "salt_water": { elem1: "dough", elem2: null },
        "sugar_water": { elem1: "dough", elem2: null },
        "seltzer": { elem1: "dough", elem2: null },
        "pool_water": { elem1: "dough", elem2: null },
        "juice": { elem1: "dough", elem2: null },
        "yolk": { elem1: "cracker_dough", elem2: null, color1:"#dbd19a" },
        "yogurt": { elem1: "cracker_dough", elem2: null, color1:"#dbd19a" },
        "broth": { elem1:"dough", elem2:null },
        "soda": { elem1:"dough", elem2:null },
        "tea": { elem1:"dough", elem2:null },
        "blood": { elem1:"dough", elem2:null },
        "infection": { elem1:"dough", elem2:null },
        "antibody": { elem1:"dough", elem2:null },
        "milk": { elem1:"dough", elem2:null },
        "cream": { elem1:"dough", elem2:null },
        "melted_butter": { elem1:"sauce", elem2:null, color1:"#DF8D32" },
    },
    category: "food",
    tempHigh: 400,
    stateHigh: "fire",
    burn:40,
    burnTime:25,
    state: "solid",
    density: 600,
    isFood: true,
    alias:"starch"
}

elements.baking_powder = {
	color: "#fffaf0",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
    burn: 40,
    tempHigh: 400,
    stateHigh: ["salt","carbon_dioxide"],
    burnTime: 25,
    density: 600,
    isFood: true,
	reactions: {
        "flour": { elem1: "pancake_mix", elem2: null, color1: "#e8b77b"},
    },
};

if (!elements.baking_soda.reactions) elements.baking_soda.reactions = {};
elements.baking_soda.reactions.neutral_acid = { elem1: "baking_powder", elem2: null }

elements.pancake_mix = {
    color: ["#f2e9c7","#f7ebbe"],
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1: "pancake_batter", elem2: null },
    },
    category: "food",
    tempHigh: 400,
    stateHigh: "fire",
    burn:40,
    burnTime:25,
    state: "solid",
    density: 600,
    isFood: true
},

elements.pancake_batter = {
    color: "#e6da9e",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 70,
    stateHigh: "pancake",
    stateHighColorMultiplier: 0.9,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "liquid",
    viscosity: 10000,
    density: 1001,
    hidden: true,
    isFood: true
}
elements.sap.tempHigh = 104,
elements.sap.stateHigh = ["maple_syrup","maple_syrup","maple_syrup","sap"],
elements.maple_syrup = {
    color: ["#fabb34","#facc34","#fabb34"],
    behavior: behaviors.LIQUID,
    tempHigh: 170,
    stateHigh: ["sugar","smoke","smoke"],
    tempLow: -15,
    category:"liquids",
    state: "liquid",
    viscosity: 15,
    hidden: true,
    density: 1400
}
elements.pancake = {
    color: "#e0d080",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 95,
    stateHigh: "crispy_pancake",
    category: "food",
    burn: 10,
    burnTime: 400,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    hidden: true,
    isFood: true
}
elements.crispy_pancake = {
    color: "#c7a34a",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 150,
    stateHigh: "burnt_pancake",
    category: "food",
    burn: 10,
    burnTime: 400,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    hidden: true,
    isFood: true
}
elements.burnt_pancake = {
    color: "#332709",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 550,
    stateHigh: "ash",
    category: "food",
    burn: 10,
    burnTime: 400,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    hidden: true,
    isFood: true
}
elements.strawberry_seed = {
    color: "#7a7133",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(pixel,"strawberry_stem");
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    cooldown: defaultCooldown
}
elements.strawberry_stem = {
    color: "#419c2f",
    behavior: [
        "CR:strawberry_stem,strawberry_leaves,strawberry_leaves,strawberry_leaves,strawberry_leaves%3|CR:strawberry_stem,strawberry_leaves,strawberry_leaves,strawberry_leaves,strawberry_leaves%3|CR:strawberry_stem,strawberry_leaves,strawberry_leaves,strawberry_leaves,strawberry_leaves%3",
        "CR:strawberry_stem,strawberry_leaves,strawberry_leaves,strawberry_leaves,strawberry_leaves%3|XX|CR:strawberry_stem,strawberry_leaves,strawberry_leaves,strawberry_leaves,strawberry_leaves%3",
        "XX|M1|XX",
    ],
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    properties: {
        "age":0
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
}
elements.strawberry_leaves = {
    color: "#4bad37",
    behavior: [
        "XX|CR:strawberry%2|XX",
        "CR:strawberry%2|XX|CR:strawberry%2",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
}
elements.strawberry = {
    color: "#f04b3c",
    behavior: [
        "XX|ST:strawberry_stem,strawberry_leaves|XX",
        "ST:strawberry_stem,strawberry_leaves|XX|ST:strawberry_stem,strawberry_leaves",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "strawberry_juice",
    state: "solid",
    density: 1050,
    freezeDryInto: "freeze_dried_fruits",
}
elements.strawberry_juice = {
    color: "#e03a3a",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#e03a3a")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0,
    reactions: {
        "sugar": { elem1:"strawberry_jam", elem2:null, chance:0.35 },
        "milk": { elem1:"fruit_milk", elem2:null, chance:0.35, color1:"#f78888"},
    },
};
eLists.JUICEMIXABLE.push("strawberry_juice");

elements.cream.onMix = function(cream1, cream2) {
        if ((shiftDown && Math.random() < 0.01) || (elements[cream2.element].id === elements.cream.id && Math.random() < 0.1)) {
            changePixel(cream1,"whipped_cream")
        }
    }
elements.whipped_cream = {
    color: "#fafafa",
    behavior: behaviors.LIQUID,
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "melted_chocolate": { color1:"#664934", elem2:null },
        "chocolate": { color1:"#664934", elem2:"melted_chocolate", chance:0.05 },
        "juice": { elem1:"fruit_milk", elem2:null, chance:0.05 },
        "soda": { elem1:"pilk", elem2:null, chance:0.1 },
        "yolk": { elem1:"#eggnog", elem2:null, chance:0.1 },
        "caramel": { color1:"#C8B39A", chance:0.05 },
        "sugar": { elem2:null, chance:0.005},
    },
    viscosity: 1.5,
    tempHigh: 1000,
    stateHigh: ["smoke","smoke","smoke","steam","steam","calcium"],
    tempLow: 0,
    stateLow: "ice_cream",
    stateLowColorMultiplier: 0.97,
    category: "food",
    hidden: true,
    isFood: true,
    state: "liquid",
    density: 959.97,
    viscosity: 2500000
}

elements.ginger = {
    color: ["#b88f30","#d6a73a"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2 AND CH:dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand>ginger,fiber%0.5|M1 AND CH:dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand>ginger,fiber,fiber%0.5|M2 AND CH:dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand>ginger,fiber%0.5",
    ],
    reactions: {
        "flour": { elem1:"gingerbread", elem2:null },
        "bread": { elem1:"gingerbread", elem2:null },
    },
    tempHigh: 275,
    stateHigh: "dirt",
    tempLow: -50,
    stateLow: "fiber",
    burn: 20,
    burnTime: 60,
    burnInto: "dirt",
    breakInto: "ginger_juice",
    cutInto: "cut_ginger",
    category: "food",
    state: "solid",
    density: 1250,
    conduct: 0.1,
    hidden: true
}
elements.cut_ginger = {
    color: "#ffdd80",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    category:"food",
    tempHigh: 100,
    stateHigh: "steam",
    burn:15,
    burnTime:60,
    burnInto: "steam",
    breakInto: "juice",
    breakIntoColor:"#ffe396",
    state: "solid",
    density: 1050,
    hidden: true
}

elements.ginger_rhizome = {
    color: "#c7ad58",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"ginger");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel("ginger_pseudostem",pixel.x,pixel.y+1);
                }
                if (isEmpty(pixel.x+1,pixel.y) && Math.random() < 0.2) {
                    createPixel("ginger_leaves",pixel.x+1,pixel.y);
                }
                if (isEmpty(pixel.x-1,pixel.y) && Math.random() < 0.2) {
                    createPixel("ginger_leaves",pixel.x-1,pixel.y);
                }
            }
            else if (pixel.age > 250) {
                changePixel(pixel,"ginger_leaves");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    breakInto: "ginger_juice",
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
    reactions: {
        "flour": { elem1:"gingerbread", elem2:null },
        "bread": { elem1:"gingerbread", elem2:null },
    },
};

elements.ginger_pseudostem = {
    color: "#69a82d",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
}
elements.ginger_leaves = {
    color: "#52bd31",
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "carbon_dioxide": { elem2:"oxygen", chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
}
elements.ginger_juice = {
    color: "#ccc056",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#ccc056")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0,
    reactions: {
        "flour": { elem1:"gingerbread", elem2:null },
        "bread": { elem1:"gingerbread", elem2:null },
    },
};
eLists.JUICEMIXABLE.push("ginger_juice");


elements.blueberry_seed = {
    color: "#7a7133",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(pixel,"blueberry_stem");
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    cooldown: defaultCooldown
}
elements.blueberry_stem = {
    color: "#419c2f",
    behavior: [
        "CR:blueberry_stem,blueberry_leaves,blueberry_leaves,blueberry_leaves,blueberry_leaves%3|CR:blueberry_stem,blueberry_leaves,blueberry_leaves,blueberry_leaves,blueberry_leaves%3|CR:blueberry_stem,blueberry_leaves,blueberry_leaves,blueberry_leaves,blueberry_leaves%3",
        "CR:blueberry_stem,blueberry_leaves,blueberry_leaves,blueberry_leaves,blueberry_leaves%3|XX|CR:blueberry_stem,blueberry_leaves,blueberry_leaves,blueberry_leaves,blueberry_leaves%3",
        "XX|M1|XX",
    ],
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    properties: {
        "age":0
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
}
elements.blueberry_leaves = {
    color: "#4bad37",
    behavior: [
        "XX|CR:blueberry%2|XX",
        "CR:blueberry%2|XX|CR:blueberry%2",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
}
elements.blueberry = {
    color: "#5d4bc4",
    behavior: [
        "XX|ST:blueberry_stem,blueberry_leaves|XX",
        "ST:blueberry_stem,blueberry_leaves|XX|ST:blueberry_stem,blueberry_leaves",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "blueberry_juice",
    state: "solid",
    density: 1050,
    cutInto: "cut_blueberry",
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#33146e",
}
elements.blueberry_juice = {
    color: "#5030a1",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#5030a1")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0,
    reactions: {
        "sugar": { elem1:"blueberry_jam", elem2:null, chance:0.35 },
        "milk": { elem1:"fruit_milk", elem2:null, chance:0.35, color1: "#995fb3" },
    },
};

eLists.JUICEMIXABLE.push("blueberry_juice");
/*
elements.fruit_slushie = {
    color: "#ffcc54",
    behavior: behaviors.LIQUID,
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" }
    },
    temp: -5,
    tempHigh: 18,
    tempLow: -20,
    stateLow: "ice",
    stateHigh: "water",
    category: "food",
    state: "liquid",
    density: 95,
    viscosity: 100,
    hidden: true
}
*/

elements.strawberry_jam = {
    color: "#c73c3e",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 400,
    stateHigh: ["sugar","smoke"],
    burn: 70,
    burnTime: 300,
    viscosity: 750,
    state: "liquid",
    density: 825,
    hidden: true
};
elements.blueberry_jam = {
    color: "#281C4B",
    behavior: behaviors.LIQUID,
    category: "food",
    tempHigh: 400,
    stateHigh: ["sugar","smoke"],
    burn: 70,
    burnTime: 300,
    viscosity: 750,
    state: "liquid",
    density: 825,
    hidden: true
};
elements.cut_blueberry = {
    color: "#d4ed8a",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "juice",
    breakIntoColor:"#add69a",
    state: "solid",
    density: 1050,
    hidden: true
}

if (!elements.yeast.reactions) elements.yeast.reactions = {};
elements.yeast.reactions.flour = { elem1: "advanced_dough", elem2: null }

elements.advanced_dough = {
    color: "#c49f58",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "milk": { elem2:"broth", color2:"#ECC891", tempMin:70 },
        "cream": { elem2:"broth", color2:"#ECC891", tempMin:70 },
    },
    category: "food",
    tempHigh: 94,
    stateHigh: "bread",
    stateHighColorMultiplier: 0.9,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true,
    hidden: true
}

if (!elements.melted_chocolate.reactions) elements.melted_chocolate.reactions = {};
elements.melted_chocolate.reactions.flour = { elem1: "cookie_dough", elem2: null }

elements.cookie_dough = {
    color: ["#946826","#9e783f","#8a6d41","#614925"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    tempHigh: 94,
    stateHigh: "cookie",
    stateHighColorMultiplier: 1.1,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true,
    hidden: true
}

elements.cookie = {
    color: "#7d5f2e",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 605,
    stateHigh: "ash",
    category: "food",
    burn: 30,
    burnTime: 200,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    breakIntoColor: "#7d6216",
    state: "solid",
    density: 233.96,
    isFood: true
}

elements.nut_oil.name = "cooking_oil"

elements.bread.behavior = behaviors.SUPPORT

elements.toast.behavior = behaviors.SUPPORT

if (!elements.caramel.reactions) elements.caramel.reactions = {};
elements.caramel.reactions.corn_starch = { elem1: "boba_dough", elem2: null, chance: 0.35, tempMin: 70}

elements.boba_dough = {
    color: ["#4a2007","#2b1304"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    tempHigh: 400,
    stateHigh: "ash",
    stateHighColorMultiplier: 0.8,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    reactions: {
        "water": { elem1:"boba", tempMin:60},
    },
    isFood: true,
    hidden: true
}

elements.boba = {
    color: "#59290c",
    behavior: behaviors.POWDER,
    tempHigh: 300,
    stateHigh: "fire",
    category: "food",
    burn: 30,
    burnTime: 200,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakIntoColor: "#7d6216",
    state: "solid",
    density: 1500,
    isFood: true
}
elements.caramel.density = 1500
elements.freeze = {
    color: ["#42cbf5", "#42cbf5", "#42cbf5", "#75d3f0", "#42cbf5"],
    tool: function (pixel) {
        if (!shiftDown) {
            pixel.temp -= 0.2;
            pixelTempCheck(pixel);
        } else {
            pixel.temp -= 200;
            pixelTempCheck(pixel);
        }
    },
    category: "energy",
    canPlace: false,
    excludeRandom: true,
    desc: "Use on pixels to freeze them."
};
elements.warm = {
    color: ["#c7634a", "#c7634a", "#c7634a", "#e38f7b", "#c7634a"],
    tool: function (pixel) {
        if (!shiftDown) {
            pixel.temp += 0.2;
            pixelTempCheck(pixel);
        } else {
            pixel.temp += 200;
            pixelTempCheck(pixel);
        }
    },
    category: "energy",
    canPlace: false,
    excludeRandom: true,
    desc: "Use on pixels to warm them."
};
/*
elements.pineapple_seed = {
    color: "#695531",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (pixel.temp < 100 && pixel.temp > 20) {
                if (Math.random() < 0.02 && pixel.age > 50) {
                    if (!outOfBounds(pixel.x,pixel.y+1)) {
                        var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                        if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                            changePixel(dirtPixel,"root");
                            pixel.leaflength = pixel.leaflength+Math.round(Math.random())
                        }
                    }
                    if (isEmpty(pixel.x,pixel.y-1) && pixel.leafgrown==false) {
                        movePixel(pixel,pixel.x,pixel.y-1);
                        createPixel("pineapple_leaves",pixel.x,pixel.y+1);
                        if (isEmpty(pixel.x,pixel.y-1)) {
                            createPixel("pineapple",pixel.x,pixel.y-1);
                        }
                        if (isEmpty(pixel.x+1,pixel.y) && Math.random() < 0.5) {
                            createPixel("pineapple_leaves",pixel.x+1,pixel.y);
                            if (isEmpty(pixel.x+2,pixel.y-1) && Math.random() < 0.5) {
                                createPixel("pineapple_leaves",pixel.x+2,pixel.y-1);
                                if (pixel.leaflength == 4 && isEmpty(pixel.x+3,pixel.y-2) && Math.random() < 0.5) {
                                    createPixel("pineapple_leaves",pixel.x+3,pixel.y-2);
                                    pixel.leafgrown = true
                                }
                            }
                        }
                        if (isEmpty(pixel.x-1,pixel.y) && Math.random() < 0.5) {
                            createPixel("pineapple_leaves",pixel.x-1,pixel.y);
                            if (isEmpty(pixel.x-2,pixel.y-1) && Math.random() < 0.5) {
                                createPixel("pineapple_leaves",pixel.x-2,pixel.y-1);
                                if (pixel.leaflength = 3) {
                                    pixel.leafgrown = true
                                }
                                if (pixel.leaflength = 4 && isEmpty(pixel.x-3,pixel.y-2) && isEmpty(pixel.x+3,pixel.y-2) && Math.random() < 0.5) {
                                    createPixel("pineapple_leaves",pixel.x-3,pixel.y-2);
                                    createPixel("pineapple_leaves",pixel.x+3,pixel.y-2);
                                    pixel.leafgrown = true
                                }
                            }
                        }
                    }
                }
                else if (pixel.age > 500 && leafgrown == true && Math.random() < 0.1) {
                    changePixel(pixel,"pineapple_leaves");
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "leaflength":3,
        "leafgrown":false,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    temp:25,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};
*//*
function averageHexColor(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const avgRed = Math.floor((rgb1[0] + rgb2[0]) / 2);
    const avgGreen = Math.floor((rgb1[1] + rgb2[1]) / 2);
    const avgBlue = Math.floor((rgb1[2] + rgb2[2]) / 2);
    const avgHex = rgbToHex(avgRed, avgGreen, avgBlue);
    return avgHex;
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
}

function rgbToHex(r, g, b) {
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');
    return `${rHex}${gHex}${bHex}`;
}
*/
// test
//var color1 = "#FF0000";
//var color2 = "#0000FF";
//var averageColor = averageHexColor(color1, color2);
//console.log(averageColor)
/*
eLists.JUICEMIXABLE.forEach(function(element){
    elements[element].onMix = function(pixel1,pixel2) {
    if (shiftDown && eLists.JUICEMIXABLE.indexOf(pixel2.element) !== -1) {
        if (Math.random() < 0.2) {
            var hex1 = pixel1.color
            var hex2 = pixel2.color
            let rgb = pixel.color.replace("rgb(", "").replace(")", "").split(",");
            let rgbObj = { r: parseInt(rgb[0]), g: parseInt(rgb[1]), b: parseInt(rgb[2]) } //use this as one of the rgb objects
            var finalJuiceColor = interpolatedRgb(hex1,hex2,0.5)
            changePixel(pixel1,"juice")
            //pixel1.color = pixelColorPick(pixel,finalJuiceColor)
            pixel1.color = rgb(rgbObj)
        }
    }
}
})*/
elements.juice.onMix = function(pixel){
    let num = Math.floor(Math.random() * 4);
    let x = pixel.x + adjacentCoords[num][0];
    let y = pixel.y + adjacentCoords[num][1];
    if(!isEmpty(x,y) && !outOfBounds(x,y)){
      let pixel2 = pixelMap[x][y];
      if(pixel.color != pixel2.color && pixel2.element == "juice"){
        let condition;
        if(shiftDown == 0){
          condition = (Math.floor(Math.random() * 2) == 1); 
        } else {
          condition = true; 
        }
        if(condition){
          let newrgb = interpolateRgb(getRGB(pixel.color), getRGB(pixel2.color), 0.5);
          pixel.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
          pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        }
      }
    }
  }

elements.juice.stain = 0

elements.banana_seed = {
    color: "#594129",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1) && pixel.height < 7) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel("banana_stem",pixel.x,pixel.y+1);
                    
                    pixel.height++
                }
            }
            else if (pixel.age > 150 && pixel.height > 6 && Math.random() < 0.1) {
                changePixel(pixel,"banana_tree_top");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "height": 0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.banana_stem = {
    color: "#698215",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "life",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.banana_tree_top = {
    color: "#718a21",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "life",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    properties:{
        "leftleaves": 0,
        "rightleaves": 0,
    },
    hidden: true,
    tick: function(pixel) {
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 0) {
            if (isEmpty(pixel.x+1,pixel.y)) {
                createPixel("banana_leaves",pixel.x+1,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 1) {
            if (isEmpty(pixel.x+2,pixel.y)) {
                createPixel("banana_leaves",pixel.x+2,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 2) {
            if (isEmpty(pixel.x+3,pixel.y)) {
                createPixel("banana_leaves",pixel.x+3,pixel.y);

                pixel.rightleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rightleaves == 3) {
            if (isEmpty(pixel.x+4,pixel.y+1)) {
                createPixel("banana_leaves",pixel.x+4,pixel.y+1);

                pixel.rightleaves++
            }
        }


        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 0) {
            if (isEmpty(pixel.x-1,pixel.y)) {
                createPixel("banana_leaves",pixel.x-1,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 1) {
            if (isEmpty(pixel.x-2,pixel.y)) {
                createPixel("banana_leaves",pixel.x-2,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 2) {
            if (isEmpty(pixel.x-3,pixel.y)) {
                createPixel("banana_leaves",pixel.x-3,pixel.y);

                pixel.leftleaves++
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.leftleaves == 3) {
            if (isEmpty(pixel.x-4,pixel.y+1)) {
                createPixel("banana_leaves",pixel.x-4,pixel.y+1);

                pixel.leftleaves++
            }
        }


        if (Math.random() < 0.1 && pixel.age > 70 && pixel.temp < 100 && pixel.leftleaves > 0 && pixel.rightleaves > 0) {
            if (isEmpty(pixel.x+1,pixel.y+2)) {
                createPixel("banana_peduncle",pixel.x+1,pixel.y+2);
            }
        }
        if (Math.random() < 0.1 && pixel.age > 70 && pixel.temp < 100 && pixel.leftleaves > 0 && pixel.rightleaves > 0) {
            if (isEmpty(pixel.x-1,pixel.y+2)) {
                createPixel("banana_peduncle",pixel.x-1,pixel.y+2);
            }
        }
        pixel.age++;
    doDefaults(pixel);
    },
}
elements.banana_leaves = {
    color: ["#3da324","#3cbd1c"],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.banana_peduncle = {
    color: "#8bb81a",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "life",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    hidden: true,
    tick: function(pixel) {
        if (Math.random() < 0.1 && pixel.temp < 100) {
            if (isEmpty(pixel.x+1,pixel.y+1)) {
                createPixel("hanging_banana_peduncle",pixel.x+1,pixel.y+1);
            }
            if (isEmpty(pixel.x-1,pixel.y+1)) {
                createPixel("hanging_banana_peduncle",pixel.x-1,pixel.y+1);
            }
            if (isEmpty(pixel.x+1,pixel.y+2)) {
                createPixel("hanging_banana_peduncle",pixel.x+1,pixel.y+2);
            }
            if (isEmpty(pixel.x-1,pixel.y+2)) {
                createPixel("hanging_banana_peduncle",pixel.x-1,pixel.y+2);
            }
        }
        pixel.age++;
    doDefaults(pixel);
    },
}
elements.hanging_banana_peduncle = {
    color: "#8bb81a",
    behavior: [
        "XX|XX|XX",
        "CR:banana%0.2|XX|CR:banana%0.2",
        "XX|XX|XX",
    ],
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "life",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    hidden: true,
}
elements.banana = {
    color: "#ebd834",
    behavior: [
        "XX|XX|XX",
        "ST:hanging_banana_peduncle|XX|ST:hanging_banana_peduncle",
        "XX|M1|XX",
    ],
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "banana_juice",
    state: "solid",
    density: 1050,
    cutInto: "cut_banana",
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#c4b939",
}
elements.cut_banana = {
    color: "#f2e56b",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "banana_juice",
    state: "solid",
    density: 1050,
    hidden: true,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#c4b939",
}
elements.banana_juice = {
    color: "#dbc440",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#dbc440")
            }
        }
    },
    reactions: {
        "bread": { elem1:"banana_bread", elem2:null, chance:0.35 },
        "milk": { elem1: "fruit_milk", elem2: "fruit_milk", chance: 0.35, color1:"#ede59a", color2:"#ede59a"},
        "coconut_milk": { elem1: "fruit_milk", elem2: "fruit_milk", chance: 0.35, color1:"#ede59a", color2:"#ede59a"},
        "nut_milk": { elem1: "fruit_milk", elem2: "fruit_milk", chance: 0.35, color1:"#ede59a", color2:"#ede59a"}
    },
    tempLow: 0
};
eLists.JUICEMIXABLE.push("banana_juice");

elements.banana_bread = {
    color: "#c2782f",
    desc: "delicious banana bread",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 176,
    stateHigh: "toast",
    category: "food",
    burn: 30,
    burnTime: 200,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    isFood: true
}
elements.sprinkles = {
    color: ["#eb726a", "#ebca6a", "#88eb6a", "#6aaceb", "#eb6ade"],
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    desc: "colorful edible sand",
    hidden: false,
    isFood: true,
    burn: 30,
    burnTime: 200,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "sugar",
    breakIntoColor: ["#fb827a", "#fbda7a", "#98fb7a", "#7abcfb", "#fb7aee"],
    tempHigh: 176,
    stateHigh: "caramel",
    density: 277,
    cooldown: 2
}
elements.chocolate_chips = {
    color: "#6e4c1d",
    behavior: behaviors.POWDER,
    tempHigh: 31,
    stateHigh: "melted_chocolate",
    category: "food",
    state: "solid",
    density: 1325,
    isFood: true,
    desc: "chocolate chips yum",
    cooldown: 2
}
elements.chocolate.breakInto = "chocolate_chips"
//elements.fruit_milk.stateLowColorMultiplier = 0.9

elements.passion_fruit_vine = {
    color: "#00df00",
    behavior: [
        "ST:wood|ST:wood|ST:wood",
        "ST:wood AND CR:passion_fruit%0.02|XX|ST:wood AND CR:passion_fruit%0.02",
        "ST:wood|ST:wood AND M1|ST:wood",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "carbon_dioxide": { elem2:"oxygen", chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    breakInto: "dead_plant"
}
elements.passion_fruit_seed = {
    color: "#6b4f36",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    if (!isEmpty(pixel.x+1,pixel.y-1) || !isEmpty(pixel.x-1,pixel.y-1)) {
                        movePixel(pixel,pixel.x,pixel.y-1);
                        createPixel("passion_fruit_vine",pixel.x,pixel.y+1);
                    }
                }
                if (!isEmpty(pixel.x+2,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1)) {
                    movePixel(pixel,pixel.x+1,pixel.y-1);
                    createPixel("passion_fruit_vine",pixel.x-1,pixel.y+1);
                }
                if (!isEmpty(pixel.x-2,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-1)) {
                    movePixel(pixel,pixel.x-1,pixel.y-1);
                    createPixel("passion_fruit_vine",pixel.x+1,pixel.y+1);
                }
                if (!isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x+1,pixel.y-1)) {
                    movePixel(pixel,pixel.x+1,pixel.y-1);
                    createPixel("passion_fruit_vine",pixel.x-1,pixel.y+1);
                }
                if (!isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x-1,pixel.y) && isEmpty(pixel.x-1,pixel.y-1)) {
                    movePixel(pixel,pixel.x-1,pixel.y-1);
                    createPixel("passion_fruit_vine",pixel.x+1,pixel.y+1);
                }
                /*if (pixelMap[pixel.x+1][pixel.y-1].element !== "wood" && pixelMap[pixel.x-1][pixel.y-1].element !== "wood") {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel("passion_fruit_vine",pixel.x,pixel.y+1);
                    if (isEmpty(pixel.x+1,pixel.y-1) && pixelMap[pixel.x+2][pixel.y-1].element === "wood") {
                        movePixel(pixel,pixel.x+1,pixel.y-1);
                        createPixel("passion_fruit_vine",pixel.x-1,pixel.y+1);
                    }
                    if (isEmpty(pixel.x-1,pixel.y-1) && pixelMap[pixel.x-2][pixel.y-1].element === "wood") {
                        movePixel(pixel,pixel.x-1,pixel.y-1);
                        createPixel("passion_fruit_vine",pixel.x+1,pixel.y+1);
                    }
                }*/
            }
            else if (pixel.age > 400 && Math.random() < 0.1) {
                changePixel(pixel,"passion_fruit_vine");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "ST:wood,passion_fruit_vine|ST:wood,passion_fruit_vine|ST:wood,passion_fruit_vine",
        "ST:wood,passion_fruit_vine|XX|ST:wood,passion_fruit_vine",
        "ST:wood,passion_fruit_vine|M1|ST:wood,passion_fruit_vine",
    ],
};

elements.passion_fruit = {
    color: "#78236f",
    behavior: [
        "ST:passion_fruit_vine%95|ST:passion_fruit_vine%95|ST:passion_fruit_vine%95",
        "ST:passion_fruit_vine%95|XX|ST:passion_fruit_vine%95",
        "ST:passion_fruit_vine%95|M1|ST:passion_fruit_vine%95",
    ],
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: ["passion_fruit_juice","passion_fruit_juice",/*"passion_fruit_seed"*/],
    state: "solid",
    density: 1050,
    cutInto: "passion_fruit_flesh",
    temp:20,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#412e6b"
}
elements.passion_fruit_flesh = {
    color: "#ffe205",
    behavior: behaviors.LIQUID,
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    viscosity: 999,
    burnInto: "dead_plant",
    breakInto: ["passion_fruit_juice","passion_fruit_juice",/*"passion_fruit_seed"*/],
    state: "solid",
    density: 1050,
    hidden: true,
    temp: 20
}
elements.passion_fruit_juice = {
    color: "#d6bf2b",
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 20,
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#d6bf2b")
            }
        }
    },
    tempLow: 0
};
eLists.JUICEMIXABLE.push("passion_fruit_juice");

elements.mango_wood = {
    color: "#966435",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.mango_branch = {
    color: "#966435",
    behavior: [
        "CR:mango_leaves,mango_branch%2|CR:mango_leaves,mango_branch%2|CR:mango_leaves,mango_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "mango_wood",
    tempLow: -30,
    stateLow: "mango_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
}
elements.mango_leaves = {
    color: ["#61b535","#5fba2f"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:mango%0.1|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.mango = {
    color: ["#cc5b3f","#cc8a3f","#ccb93f","#abcc3f"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "mango_juice",
    cutInto: "cut_mango",
    state: "solid",
    density: 1050,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#ccb50a",
}

elements.cut_mango = {
    color: "#ebcb2d",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "mango_juice",
    state: "solid",
    density: 1050,
    hidden: true,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#ccb50a",
}

elements.mango_seed = {
    color: "#9e8951",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "mango_wood" : "mango_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"mango_wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

elements.mango_juice = {
    color: "#f0c348",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#f0c348")
            }
        }
    },
    reactions: {
        "milk": { elem1: "fruit_milk", elem2: "fruit_milk", chance: 0.35, color1:"#fada70", color2:"#fada70"},
        "coconut_milk": { elem1: "fruit_milk", elem2: "fruit_milk", chance: 0.35, color1:"#fada70", color2:"#fada70"},
        "nut_milk": { elem1: "fruit_milk", elem2: "fruit_milk", chance: 0.35, color1:"#fada70", color2:"#fada70"}
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0
};
eLists.JUICEMIXABLE.push("mango_juice");

elements.pineapple_leaves = {
    color: "#3aab11",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.pineapple = {
    color: "#e8bc38",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "pineapple_juice",
    state: "solid",
    density: 1050,
    temp:20,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#ccb90a",
}
elements.pineapple_seed = {
    color: "#695531",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (pixel.temp < 100 && pixel.temp > 20) {
                if (Math.random() < 0.02 && pixel.age > 50) {
                    if (!outOfBounds(pixel.x,pixel.y+1)) {
                        var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                        if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                            changePixel(dirtPixel,"root");
                            if (isEmpty(pixel.x,pixel.y-1) && pixel.leafgrown==false) {
                                movePixel(pixel,pixel.x,pixel.y-1);
                                createPixel("pineapple_leaves",pixel.x,pixel.y+1);
                                if (isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x-1,pixel.y)) {
                                    createPixel("pineapple_leaves",pixel.x+1,pixel.y);
                                    createPixel("pineapple_leaves",pixel.x-1,pixel.y);
                                    if (isEmpty(pixel.x-2,pixel.y-1) && isEmpty(pixel.x+2,pixel.y-1)) {
                                        createPixel("pineapple_leaves",pixel.x+2,pixel.y-1);
                                        createPixel("pineapple_leaves",pixel.x-2,pixel.y-1);
                                        if (isEmpty(pixel.x,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-1)) {
                                            createPixel("pineapple",pixel.x,pixel.y-1);
                                            createPixel("pineapple",pixel.x+1,pixel.y-1);
                                            createPixel("pineapple",pixel.x-1,pixel.y-1);
                                            if (isEmpty(pixel.x,pixel.y-2) && isEmpty(pixel.x+1,pixel.y-2) && isEmpty(pixel.x-1,pixel.y-2)) {
                                                createPixel("pineapple",pixel.x,pixel.y-2);
                                                createPixel("pineapple",pixel.x+1,pixel.y-2);
                                                createPixel("pineapple",pixel.x-1,pixel.y-2);
                                                if (isEmpty(pixel.x,pixel.y-3) && isEmpty(pixel.x+1,pixel.y-3) && isEmpty(pixel.x-1,pixel.y-3)) {
                                                    createPixel("pineapple",pixel.x,pixel.y-3);
                                                    createPixel("pineapple",pixel.x+1,pixel.y-3);
                                                    createPixel("pineapple",pixel.x-1,pixel.y-3);
                                                    if (isEmpty(pixel.x,pixel.y-4) && isEmpty(pixel.x+1,pixel.y-4) && isEmpty(pixel.x-1,pixel.y-4)) {
                                                        createPixel("pineapple",pixel.x,pixel.y-4);
                                                        createPixel("pineapple",pixel.x+1,pixel.y-4);
                                                        createPixel("pineapple",pixel.x-1,pixel.y-4);
                                                        if (isEmpty(pixel.x,pixel.y-5) && isEmpty(pixel.x+1,pixel.y-6) && isEmpty(pixel.x-1,pixel.y-6)) {
                                                            createPixel("pineapple_leaves",pixel.x,pixel.y-5);
                                                            createPixel("pineapple_leaves",pixel.x+1,pixel.y-6);
                                                            createPixel("pineapple_leaves",pixel.x-1,pixel.y-6);
                                                            pixel.leafgrown = true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if (pixel.age > 500 && pixel.leafgrown == true && Math.random() < 0.1) {
                    changePixel(pixel,"pineapple_leaves");
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "leafgrown":false,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    temp:25,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.pineapple_juice = {
    color: "#d9ba32",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#d9ba32")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    tempLow: 0
};
eLists.JUICEMIXABLE.push("pineapple_juice");

elements.lime = {
    color: ["#549c2d","#4d9c22"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
    },
    category:"food",
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#5eab24",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "lime_juice",
    state: "solid",
    density: 1050,
    isFood: true,
    cutInto: ["lime_zest","lime_slice","lime_slice","lime_slice","lime_slice"],
}

elements.lime_juice = {
    color: "#85d14b",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#85d14b")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    hidden: true,
    tempLow: 0,
};
eLists.JUICEMIXABLE.push("lime_juice");

elements.lime_zest = {
    color: "#4f9e13",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.lime_slice = {
    color: "#8acc33",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "lime_juice",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.snail.reactions.nut_oil = { elem1: "escargot", chance:30, tempMin:50 }

elements.escargot = {
    color: "#ab924d",
    behavior: behaviors.STURDYPOWDER2,
    tempHigh: 120,
    stateHigh: "steam",
    breakInto: "quicklime",
    category: "food",
    state: "solid",
    density: 1500,
    conduct: 0.16
}

elements.broccoli = {
    color: ["#49a82f","#429929"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "ST:broccoli_stem AND M2|ST:broccoli_stem AND M1|ST:broccoli_stem AND M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    isFood: true,
    density: 1050,
    cutInto: "cut_broccoli",
}
elements.broccoli_stem = {
    color: ["#51c431","#45ba25"],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    cutInto: "cut_broccoli",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.cut_broccoli = {
    color: "#75d65a",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: "steam",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.broccoli_seed = {
    color: "#9e8951",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.2 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-1)) {
                    changePixel(pixel,"broccoli_stem");
                    createPixel("broccoli",pixel.x,pixel.y-1);
                    createPixel("broccoli",pixel.x+1,pixel.y-1);
                    createPixel("broccoli",pixel.x-1,pixel.y-1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"broccoli");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.freeze_dried_fruits = {
    color: "#ab1f31",
    behavior: behaviors.POWDER,
    tempHigh: 550,
    stateHigh: "ash",
    category: "food",
    burn: 15,
    burnTime: 200,
    burnInto: ["smoke","smoke","smoke","ash"],
    state: "solid",
    density: 233.96,
    isFood: true,
}

elements.grape.freezeDryInto = "freeze_dried_fruits"
elements.grape.freezeDryIntoColor = "#5d156b"

elements.soapy_water = {
    color: "#72b8f2",
    behavior: [
        "XX|CR:bubble%0.25|XX",
        "M2%50|XX|M2%50",
        "M2%50|M1|M2%50",
    ],
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 0,
    category: "liquids",
    heatCapacity: 4.184,
    reactions: {
        "dirt": {elem1: null,elem2: "mud"},
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "salt": { elem1: "salt_water", elem2: null, temp1:-20 },
        "dust": { elem2: null, elem2: null },
        "plague": { elem2: null, elem2: null },
        "rust": { elem1: "iron", chance:0.005 },
        "fallout": {elem2: null, chance:0.25 },
        "radiation": { elem2: null, chance:0.25 },
        "uranium": { elem2: null, chance:0.25 },
        "rotten_meat": { elem2: "meat", chance:0.25 },
        "rotten_cheese": { elem2: "cheese", chance:0.25 },
        "cancer": { elem2: null, chance:0.25 },
        "oil": { elem2: null, chance:0.005 },
        "dioxin": { elem1: "dirty_water", chance:0.1 },
        "quicklime": { elem1: "slaked_lime", elem2: "slaked_lime", temp2:100, temp1:100, chance:0.05 },
        "rock": { elem2: "wet_sand", chance: 0.00035 },
        "limestone": { elem2: "wet_sand", chance: 0.00035 },
        "tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
        "mudstone": { elem2: "mud", chance: 0.00035 },
        "fly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.1, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.05, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.1, oneway:true },
        "cured_meat": {elem2:"meat" },
    },
    state: "liquid",
    density: 997,
    conduct: 0.02,
    stain: -1,
    extinguish: true
}

elements.soap.behavior = behaviors.STURDYPOWDER
elements.soap.state = "solid"
elements.soap.category = "powders"

elements.soap.reactions.water = {elem2: "soapy_water", elem1: null, chance: 10}
/*
if ([pixel.element].stain < 0 && [pixel.element] != "soap" && [pixel.element] != "soapy_water") {
    [pixel.element].stain = [pixel.element].stain/10
}
*/
elements.onion = {
    color: "#731066",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: "steam",
    burn:65,
    burnTime:60,
    burnInto: "steam",
    state: "solid",
    density: 1050,
    cutInto: "cut_onion",
    breakInto:"onion_powder",
    cutIntoEmit: "stench",
}
elements.cut_onion = {
    color: "#dcc5ed",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: "steam",
    burn:65,
    burnTime:60,
    burnInto: "steam",
    state: "solid",
    density: 1050,
    breakInto:"onion_powder",
    hidden: true,
    reactions:{ "nut_oil": {elem1:"fried_onion", tempMin: 70, chance:10}}
}
elements.fried_onion = {
    color: "#cf9344",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 500,
    stateHigh: "ash",
    burn:65,
    burnTime:60,
    burnInto: "ash",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.onion_seed = {
    color: "#1a0e02",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.2 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-2) && isEmpty(pixel.x,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-1) && isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x-1,pixel.y)) {
                    createPixel("onion",pixel.x,pixel.y-1);
                    createPixel("onion",pixel.x+1,pixel.y-1);
                    createPixel("onion",pixel.x-1,pixel.y-1);
                    createPixel("onion",pixel.x,pixel.y-2);
                    createPixel("onion",pixel.x+1,pixel.y);
                    createPixel("onion",pixel.x-1,pixel.y);
                    if (isEmpty(pixel.x+1,pixel.y-3) && isEmpty(pixel.x-1,pixel.y-3)) {
                        createPixel("spring_onion_leaves",pixel.x+1,pixel.y-3);
                        createPixel("spring_onion_leaves",pixel.x-1,pixel.y-3);
                        changePixel(pixel,"onion");
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
}
elements.onion_powder = {
    color: "#e6d8b8",
    reactions: {
        "stench": { elem2:null, chance:0.25 },
        "steam": { elem2:"fragrance", chance:0.1 },
        "flea": { elem2:null, chance:0.01 },
        "termite": { elem2:null, chance:0.01 },
        "fly": { elem2:null, chance:0.01 },
        "ant": { elem2:null, chance:0.01 },
        "stink_bug": { elem2:null, chance:0.01 },
    },
    behavior: behaviors.POWDER,
    tempHigh: 300,
    stateHigh: ["fire","smoke","smoke","smoke","ash"],
    burn:10,
    burnTime:300,
    burnInto: ["fire","smoke","smoke","smoke","smoke","smoke","smoke","fragrance"],
    category:"food",
    state: "solid",
    density: 1400,
    isFood: true,
}
elements.unhusked_rice = {
    color: ["#c99a42","#b08638","#deb15d"],
    behavior: [
        "XX|XX|XX",
        "ST:rice_panicle|XX|ST:rice_panicle",
        "ST:rice_plant AND M2|ST:rice_panicle AND M1|ST:rice_plant AND M2",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 65,
    stateHigh: "cooked_rice",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "flour",
    breakIntoColor: "#f7f1df",
    state: "solid",
    isFood: true,
    density: 1050,
    cutInto: "rice",
}
elements.rice = {
    color: "#eeeed2",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 65,
    stateHigh: "cooked_rice",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "rice_flour",
    state: "solid",
    isFood: true,
    density: 1050,
    reactions:{
        "water":{elem1:"porridge",elem2:"porridge",chance:3,tempMin:70},
        "nut_oil":{elem1:"fried_rice",elem2:null,chance:3,tempMin:60}
    }
}
elements.cooked_rice = {
    color: "#eddfb9",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 200,
    stateHigh: "burnt_rice",
    burn:65,
    breakInto: "rice_flour",
    state: "solid",
    isFood: true,
    density: 1050,reactions:{
        "water":{elem1:"porridge",elem2:"porridge",chance:3,tempMin:70},
        "nut_oil":{elem1:"fried_rice",elem2:null,chance:3,tempMin:60}
    },
    hidden:true
}
elements.porridge = {
    color: "#f2ecdc",
    behavior: behaviors.LIQUID,
    category:"food",
    tempHigh: 200,
    stateHigh: "steam",
    viscosity: 999,
    burn:65,
    state: "solid",
    isFood: true,
    density: 1050,
}
elements.fried_rice = {
    color: "#e8dda0",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 200,
    stateHigh: "burnt_rice",
    burn:65,
    burnTime:60,
    state: "solid",
    isFood: true,
    density: 1050,reactions:{
        "salt":{color1:"#ede5b9",elem2:null,chance:3},
        "monosodium_glutamate":{color1:"#ede5b9",elem2:null,chance:3}
    },
    hidden:true
}
elements.burnt_rice = {
    color: "#262217",
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 500,
    stateHigh: "ash",
    burn:65,
    burnTime:60,
    state: "solid",
    isFood: true,
    density: 1050,
    hidden: true
}
elements.rice_plant = {
    color: "#37a825",
    behavior: behaviors.WALL,
    category:"life",
    tempHigh: 100,
    stateHigh: "steam",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true,
    
}
elements.rice_seed = {
    color: "#997a23",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.2 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if(!isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x+1,pixel.y)){
                    if(pixelMap[pixel.x+1][pixel.y].element === "water" && pixelMap[pixel.x-1][pixel.y].element === "water"){
                        if (isEmpty(pixel.x,pixel.y-1)){
                            movePixel(pixel,pixel.x,pixel.y-1)
                            createPixel("rice_plant",pixel.x,pixel.y+1)
                            pixel.notinwater=true
                        }
                        else if (!isEmpty(pixel.x,pixel.y-1)){
                            if (pixelMap[pixel.x][pixel.y-1].element === "water") {
                                deletePixel(pixel.x,pixel.y-1)
                                movePixel(pixel,pixel.x,pixel.y-1)
                                createPixel("rice_plant",pixel.x,pixel.y+1)
                            }
                        }
                    }
                }
                if (Math.random() < 0.2 && pixel.age > 50 && pixel.temp < 100 && pixel.notinwater == true) {
                    if (isEmpty(pixel.x+1,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-1)&&isEmpty(pixel.x+2,pixel.y-2) && isEmpty(pixel.x-2,pixel.y-2)) {
                        createPixel("rice_plant",pixel.x+1,pixel.y-1);
                        createPixel("rice_plant",pixel.x-1,pixel.y-1);
                        createPixel("rice_plant",pixel.x+2,pixel.y-2);
                        createPixel("rice_plant",pixel.x-2,pixel.y-2);
                        pixel.leafgrown = true
                    }
                }
                if (Math.random() < 0.2 && pixel.age > 50 && pixel.temp < 100 && pixel.leafgrown == true) {
                    if (isEmpty(pixel.x,pixel.y-1) && isEmpty(pixel.x,pixel.y-2)&&isEmpty(pixel.x,pixel.y-3) && isEmpty(pixel.x,pixel.y-4)) {
                        movePixel(pixel,pixel.x,pixel.y-4)
                        createPixel("rice_plant",pixel.x,pixel.y+1);
                        createPixel("rice_plant",pixel.x,pixel.y+2);
                        createPixel("rice_plant",pixel.x,pixel.y+3);
                        createPixel("rice_plant",pixel.x,pixel.y+4);
                        changePixel(pixel,"rice_panicle")
                        pixel.grower = true
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"unhusked_rice");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "leafgrown":false,
        "notinwater":false,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 2500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.rice_panicle = {
    color: "#37a825",
    behavior: behaviors.WALL,
    category:"life",
    tempHigh: 100,
    stateHigh: "steam",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    tick: function(pixel) {
        if (Math.random() < 0.1) {
            if (isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x-1,pixel.y)) {
                createPixel("unhusked_rice",pixel.x+1,pixel.y);
                createPixel("unhusked_rice",pixel.x-1,pixel.y);
            }
            if (isEmpty(pixel.x+1,pixel.y+1) && isEmpty(pixel.x-1,pixel.y+1)) {
                createPixel("unhusked_rice",pixel.x+1,pixel.y+1);
                createPixel("unhusked_rice",pixel.x-1,pixel.y+1);
            }
            if (isEmpty(pixel.x,pixel.y-1)) {
                createPixel("unhusked_rice",pixel.x,pixel.y-1);
            }
        }
    },
    state: "solid",
    density: 1050,
    hidden: true,
    
}

elements.rice_flour = {
    color: "#f7f1df",
    behavior: behaviors.POWDER,
    reactions: {
        "water": { elem1: "mochi_dough", elem2: null },
        "salt_water": { elem1: "mochi_dough", elem2: null },
        "sugar_water": { elem1: "mochi_dough", elem2: null },
        "seltzer": { elem1: "mochi_dough", elem2: null },
        "yolk": { elem1: "batter", elem2: null },
        "yogurt": { elem1: "batter", elem2: null },
        "milk": { elem1:"dough", elem2:null },
        "cream": { elem1:"dough", elem2:null },
    },
    category: "food",
    tempHigh: 400,
    stateHigh: "fire",
    burn:40,
    burnTime:25,
    state: "solid",
    density: 600,
    isFood: true
},
elements.mochi_dough = {
    color: "#ebddae",
    behavior: behaviors.STURDYPOWDER,
    onMix: function(dough,ingredient) {
        if (elements[ingredient.element].isFood && elements[ingredient.element].id !== elements.dough.id && elements[ingredient.element].id !== elements.flour.id && elements[ingredient.element].id !== elements.batter.id && elements[ingredient.element].id !== elements.bread.id) {
            var rgb1 = dough.color.match(/\d+/g);
            var rgb2 = ingredient.color.match(/\d+/g);
            // average the colors
            var rgb = [
                Math.round((parseInt(rgb1[0])*10+parseInt(rgb2[0]))/11),
                Math.round((parseInt(rgb1[1])*10+parseInt(rgb2[1]))/11),
                Math.round((parseInt(rgb1[2])*10+parseInt(rgb2[2]))/11)
            ];
            // convert rgb to hex
            var hex = RGBToHex(rgb);
            dough.color = pixelColorPick(dough, hex);
        }
    },
    category: "food",
    tempHigh: 94,
    stateHigh: "mochi",
    //stateHighColorMultiplier: 0.9,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true,
    hidden:true
},
elements.mochi = {
    color: "#f2e2a7",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 400,
    stateHigh: ["ash","steam"],
    category: "food",
    burn: 30,
    burnTime: 200,
    burnInto: ["smoke","smoke","smoke","ash"],
    state: "solid",
    density: 233.96,
    isFood: true
},
elements.monosodium_glutamate = {
    color: "#eeeeee",
    behavior: behaviors.POWDER,
    reactions: {
        "ice": { elem1:null, elem2:"salt_water", chance:0.1 },
        "rime": { elem1:null, elem2:"salt_water", chance:0.075 },
        "snow": { elem1:null, elem2:"salt_water", chance:0.25 },
        "packed_snow": { elem1:null, elem2:"salt_water", chance:0.05 },
        "packed_ice": { elem1:null, elem2:"salt_water", chance:0.01 },
        "water": { elem2: "salt_water", elem1: null, temp2:-20 },
    },
    category: "food",
    tempHigh: 801,
    state: "solid",
    density: 2160,
    alias: "msg",
}
elements.seaweed_spore = {
    color: "#291f13",
    tick: function(pixel) {
        pixel.age++;
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else if (!isEmpty(pixel.x,pixel.y+1)){
            if (!outOfBounds(pixel.x,pixel.y+1)) {
                if (pixelMap[pixel.x][pixel.y+1].element === "water"){
                    swapPixels(pixel,pixelMap[pixel.x][pixel.y+1])
                }
            }
        }
        if (!outOfBounds(pixel.x,pixel.y+1)) {
            if (!isEmpty(pixel.x,pixel.y+1)){
                var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                    changePixel(dirtPixel,"root");
                    pixel.rooted = true
                }
            }
        }
        if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100 && pixel.rooted == true) {
            if(!isEmpty(pixel.x,pixel.y-1)){
                if(pixelMap[pixel.x][pixel.y-1].element === "water"){
                    //swapPixels(pixel,pixelMap[pixel.x][pixel.y-1])
                    //changePixel("seaweed_stem",pixel.x,pixel.y+1)
                    deletePixel(pixel.x,pixel.y-1)
                    movePixel(pixel,pixel.x,pixel.y-1)
                    createPixel("seaweed_stem",pixel.x,pixel.y+1)
                    if (!isEmpty(pixel.x-1,pixel.y+1) && !isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x+1,pixel.y) && Math.random() < 0.5){
                        if (pixelMap[pixel.x-1][pixel.y].element === "water" && pixelMap[pixel.x+1][pixel.y].element === "water" && pixelMap[pixel.x-1][pixel.y+1].element != "seaweed") {
                            deletePixel(pixel.x-1,pixel.y)
                            createPixel("seaweed",pixel.x-1,pixel.y)
                            deletePixel(pixel.x+1,pixel.y)
                            createPixel("seaweed",pixel.x+1,pixel.y)
                        }
                    }
                }
            }
            if (pixel.age > 500 || isEmpty(pixel.x,pixel.y-1)) {
                changePixel(pixel,"seaweed");
            }
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "rooted":false,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 2500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.seaweed_stem = {
    color: "#35702c",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "alcohol": { elem1:"agar", elem2:null, chance:0.035 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dried_seaweed",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
}
elements.seaweed = {
    color: ["#2e8021","#3e9031","#4ea041"],
    behavior: [
        "XX|XX|XX",
        "ST:seaweed_stem|XX|ST:seaweed_stem",
        "XX|M1|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "alcohol": { elem1:"agar", elem2:null, chance:0.035 },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dried_seaweed",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 997,
}
elements.dried_seaweed = {
    color: ["#142e13","#041e03"],
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 400,
    stateHigh: "fire",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
}
elements.grape_vine = {
    color: "#427a33",
    behavior: [
        "ST:wood|ST:wood|ST:wood",
        "ST:wood AND CR:grape%0.02|XX|ST:wood AND CR:grape%0.02",
        "ST:wood|ST:wood AND M1|ST:wood",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "carbon_dioxide": { elem2:"oxygen", chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    breakInto: "dead_plant"
}
elements.grape_seed = {
    color: "#7a6033",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    if (!isEmpty(pixel.x+1,pixel.y-1) || !isEmpty(pixel.x-1,pixel.y-1)) {
                        movePixel(pixel,pixel.x,pixel.y-1);
                        createPixel("grape_vine",pixel.x,pixel.y+1);
                    }
                }
                if (!isEmpty(pixel.x+2,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1)) {
                    movePixel(pixel,pixel.x+1,pixel.y-1);
                    createPixel("grape_vine",pixel.x-1,pixel.y+1);
                }
                if (!isEmpty(pixel.x-2,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-1)) {
                    movePixel(pixel,pixel.x-1,pixel.y-1);
                    createPixel("grape_vine",pixel.x+1,pixel.y+1);
                }
                if (!isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x+1,pixel.y-1)) {
                    movePixel(pixel,pixel.x+1,pixel.y-1);
                    createPixel("grape_vine",pixel.x-1,pixel.y+1);
                }
                if (!isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x-1,pixel.y) && isEmpty(pixel.x-1,pixel.y-1)) {
                    movePixel(pixel,pixel.x-1,pixel.y-1);
                    createPixel("grape_vine",pixel.x+1,pixel.y+1);
                }
            }
            else if (pixel.age > 400 && Math.random() < 0.1) {
                changePixel(pixel,"grape_vine");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "ST:wood,grape_vine|ST:wood,grape_vine|ST:wood,grape_vine",
        "ST:wood,grape_vine|XX|ST:wood,grape_vine",
        "ST:wood,grape_vine|M1|ST:wood,grape_vine",
    ],
};
elements.grape.behavior = [
    "ST:grape_vine%95|ST:grape_vine%95|ST:grape_vine%95",
    "ST:grape_vine%95|XX|ST:grape_vine%95",
    "M2 AND ST:grape_vine%95|M1|M2 AND ST:grape_vine%95",
]
elements.tomato_vine = {
    color: "#2e7d1d",
    behavior: [
        "ST:wood|ST:wood|ST:wood",
        "ST:wood AND CR:tomato%0.02|XX|ST:wood AND CR:tomato%0.02",
        "ST:wood|ST:wood AND M1|ST:wood",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "carbon_dioxide": { elem2:"oxygen", chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    breakInto: "dead_plant"
}
elements.tomato_seed = {
    color: "#945d26",
    tick: function(pixel) {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    if (!isEmpty(pixel.x+1,pixel.y-1) || !isEmpty(pixel.x-1,pixel.y-1)) {
                        movePixel(pixel,pixel.x,pixel.y-1);
                        createPixel("tomato_vine",pixel.x,pixel.y+1);
                    }
                }
                if (!isEmpty(pixel.x+2,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1)) {
                    movePixel(pixel,pixel.x+1,pixel.y-1);
                    createPixel("tomato_vine",pixel.x-1,pixel.y+1);
                }
                if (!isEmpty(pixel.x-2,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-1)) {
                    movePixel(pixel,pixel.x-1,pixel.y-1);
                    createPixel("tomato_vine",pixel.x+1,pixel.y+1);
                }
                if (!isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x+1,pixel.y-1)) {
                    movePixel(pixel,pixel.x+1,pixel.y-1);
                    createPixel("tomato_vine",pixel.x-1,pixel.y+1);
                }
                if (!isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x-1,pixel.y) && isEmpty(pixel.x-1,pixel.y-1)) {
                    movePixel(pixel,pixel.x-1,pixel.y-1);
                    createPixel("tomato_vine",pixel.x+1,pixel.y+1);
                }
            }
            else if (pixel.age > 400 && Math.random() < 0.1) {
                changePixel(pixel,"tomato_vine");
            }
            pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "age":0,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "ST:wood,tomato_vine|ST:wood,tomato_vine|ST:wood,tomato_vine",
        "ST:wood,tomato_vine|XX|ST:wood,tomato_vine",
        "ST:wood,tomato_vine|M1|ST:wood,tomato_vine",
    ],
};
elements.tomato.behavior = [
    "ST:tomato_vine%95|ST:tomato_vine%95|ST:tomato_vine%95",
    "ST:tomato_vine%95|XX|ST:tomato_vine%95",
    "ST:tomato_vine%95|M1|ST:tomato_vine%95",
]
elements.peppermint_stem = {
    color: "#2c9c3a",
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "carbon_dioxide": { elem2:"oxygen", chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    cutInto:"peppermint",
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    breakInto: "dead_plant",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1) && pixel.grower == false && pixel.leafgrower == false) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        if (pixel.grower == true) {
            // set limit to 3 + rounded math.random inside the function
            // check if left side has stem if no set direction to right
            if (!isEmpty(pixel.x-1,pixel.y) && pixel.direction == "undefined") {
                if (pixelMap[pixel.x-1][pixel.y].element == "peppermint_stem") {
                    pixel.direction = "right";
                    pixel.limit = 3+Math.round(Math.random());
                }
            }
            // same thing to set direction the left
            else if (!isEmpty(pixel.x+1,pixel.y) && pixel.direction == "undefined") {
                if (pixelMap[pixel.x+1][pixel.y].element == "peppermint_stem") {
                    pixel.direction = "left";
                    pixel.limit = 3+Math.round(Math.random());
                }
            }
        }
        if (pixel.grower == true && pixel.limit > 0) {
            // left
            if (pixel.direction == "left") {
                if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.1) {
                    createPixel("peppermint_leaves",pixel.x-1,pixel.y-1);
                    if (isEmpty(pixel.x-2,pixel.y-2) && Math.random() < 0.2) {
                        createPixel("peppermint_leaves",pixel.x-2,pixel.y-2);
                        if (isEmpty(pixel.x-3,pixel.y-3) && Math.random() < 0.4) {
                            createPixel("peppermint_leaves",pixel.x-3,pixel.y-3);
                            if (isEmpty(pixel.x-4,pixel.y-4) && Math.random() < 0.75 && pixel.limit == 4) {
                                createPixel("peppermint_leaves",pixel.x-4,pixel.y-4);
                            }
                        }
                    }
                }
            }
            // right
            else if (pixel.direction == "right") {
                if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.1) {
                    createPixel("peppermint_leaves",pixel.x+1,pixel.y-1);
                    if (isEmpty(pixel.x+2,pixel.y-2) && Math.random() < 0.2) {
                        createPixel("peppermint_leaves",pixel.x+2,pixel.y-2);
                        if (isEmpty(pixel.x+3,pixel.y-3) && Math.random() < 0.4) {
                            createPixel("peppermint_leaves",pixel.x+3,pixel.y-3);
                            if (isEmpty(pixel.x+4,pixel.y-4) && Math.random() < 0.75 && pixel.limit == 4) {
                                createPixel("peppermint_leaves",pixel.x+4,pixel.y-4);
                            }
                        }
                    }
                }
            }
        }
        pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "grower":false,
        "age":0,
        "direction":"undefined",
        "limit":0
    }
}
elements.peppermint_leaves = {
    color: "#36a845",
    reactions: {
        "water": { elem2:"peppermint_tea", tempMin:80 },
        "salt_water": { elem2:"peppermint_tea", tempMin:80 },
        "sugar_water": { elem2:"peppermint_tea", tempMin:80 },
        "seltzer": { elem2:"peppermint_tea", tempMin:80 },
        "stench": { elem2:null, chance:0.25 },
        "steam": { elem2:"fragrance", chance:0.1 },
        "flea": { elem2:null, chance:0.01 },
        "termite": { elem2:null, chance:0.01 },
        "fly": { elem2:null, chance:0.01 },
        "ant": { elem2:null, chance:0.01 },
        "stink_bug": { elem2:null, chance:0.01 },
        "yeast": {elem1:"tea", chance:0.01},
        "ice_cream": {elem1:null,color2:"#94e067",chance:0.3}
    },
    behavior: behaviors.WALL,
    tempHigh: 300,
    stateHigh: ["fire","smoke","smoke","smoke","ash"],
    tempLow: -2,
    stateLow: "frozen_plant",
    burn:10,
    burnTime:300,
    burnInto: ["fire","smoke","smoke","smoke","smoke","smoke","smoke","fragrance"],
    category:"food",
    state: "solid",
    density: 1400,
    isFood: true,
    cutInto: "peppermint"
},
elements.peppermint_seed = {
    color: "#6b5f4c",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel("peppermint_stem",pixel.x,pixel.y+1);
                    pixel.height++;
                }
                if (pixel.height < 12 && pixel.height > 2 && pixel.height == 3) {
                    if (isEmpty(pixel.x+1,pixel.y)) {
                        createPixel("peppermint_stem",pixel.x+1,pixel.y);
                        pixelMap[pixel.x+1][pixel.y].grower = true;
                    }
                }
                if (pixel.height < 12 && pixel.height > 2 && pixel.height == 9) {
                    if (isEmpty(pixel.x+1,pixel.y)) {
                        createPixel("peppermint_stem",pixel.x+1,pixel.y);
                        pixelMap[pixel.x+1][pixel.y].grower = true;
                    }
                }
                if (pixel.height < 12 && pixel.height > 2 && pixel.height == 6) {
                    if (isEmpty(pixel.x-1,pixel.y)) {
                        createPixel("peppermint_stem",pixel.x-1,pixel.y);
                        pixelMap[pixel.x-1][pixel.y].grower = true;
                    }
                }
                if (pixel.height > 11) {
                    if (isEmpty(pixel.x-1,pixel.y) && isEmpty(pixel.x+1,pixel.y)) {
                        createPixel("peppermint_stem",pixel.x-1,pixel.y);
                        pixelMap[pixel.x-1][pixel.y].grower = true;
                        createPixel("peppermint_stem",pixel.x+1,pixel.y);
                        pixelMap[pixel.x+1][pixel.y].grower = true;
                        deletePixel(pixel.x,pixel.y);
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "height":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.peppermint_tea = {
    color: "#687d1d",
    behavior: behaviors.LIQUID,
    reactions: {
        "stench": { elem2:null },
        "flea": { elem2:null, chance:0.01 },
        "oxygen": { elem2:"fragrance", chance:0.01 },
        "infection": { elem2:"blood", chance:0.005 },
        "plague": { elem2:null, chance:0.004 },
        "sugar": { elem2:null, color1:"#8f5a21", chance:0.005},
        "honey": { elem2:null, color1:"#8f5a21", chance:0.005},
        "milk": { elem2:null, color1:"#9c6c38", chance:0.005},
        "cream": { elem2:null, color1:"#9c6c38", chance:0.005},
        "ice_cream": { elem2:null, color1:"#9c6c38", chance:0.005},
        "honey": {color1:"#8d8f27",elem2:null,chance:0.3},
        "lemon_juice": {color1:"#8d8f27",elem2:null,chance:0.3},
        "lemonade": {color1:"#8d8f27",elem2:null,chance:0.3},
        "sugar": {color1:"#83963e",elem2:null,chance:0.3}
    },
    tempHigh: 125,
    stateHigh: ["steam","fragrance",null],
    temp: 50,
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    density: 1001,
    stain: -0.1,
    hidden: true,
    isFood: true
}
elements.peppermint = {
    color: ["#64a135","#559425"],
    reactions: {
        "water": { elem2:"peppermint_tea", tempMin:80 },
        "salt_water": { elem2:"peppermint_tea", tempMin:80 },
        "sugar_water": { elem2:"peppermint_tea", tempMin:80 },
        "seltzer": { elem2:"peppermint_tea", tempMin:80 },
        "stench": { elem2:null, chance:0.25 },
        "steam": { elem2:"fragrance", chance:0.1 },
        "flea": { elem2:null, chance:0.01 },
        "termite": { elem2:null, chance:0.01 },
        "fly": { elem2:null, chance:0.01 },
        "ant": { elem2:null, chance:0.01 },
        "stink_bug": { elem2:null, chance:0.01 },
        "ice_cream": {elem1:null,color2:"#94e067",chance:0.3},
    },
    behavior: behaviors.POWDER,
    tempHigh: 300,
    stateHigh: ["fire","smoke","smoke","smoke","ash"],
    burn:10,
    burnTime:300,
    burnInto: ["fire","smoke","smoke","smoke","smoke","smoke","smoke","fragrance"],
    category:"food",
    state: "solid",
    density: 1400,
    isFood: true,
}
//elements.candy.reactions.peppermint = {color1:["eeeddc","f5f267"],elem2:null,chance:3}
elements.vanilla_stem = {
    color: "#5d9c48",
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "carbon_dioxide": { elem2:"oxygen", chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true,
    breakInto: "dead_plant",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1) && pixel.grower == false && pixel.leafgrower == false) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        if (pixel.grower == true) {
            // check if left side has stem if no set direction to right
            if (!isEmpty(pixel.x-1,pixel.y) && pixel.direction == "undefined") {
                if (pixelMap[pixel.x-1][pixel.y].element == "vanilla_stem") {
                    pixel.direction = "right";
                }
            }
            // same thing to set direction the left
            else if (!isEmpty(pixel.x+1,pixel.y) && pixel.direction == "undefined") {
                if (pixelMap[pixel.x+1][pixel.y].element == "vanilla_stem") {
                    pixel.direction = "left";
                }
            }
        }
        if (pixel.grower == true) {
            // left
            if (pixel.direction == "left") {
                if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.1) {
                    createPixel("vanilla_leaves",pixel.x-1,pixel.y-1);
                    if (isEmpty(pixel.x-2,pixel.y-2) && Math.random() < 0.2) {
                        createPixel("vanilla_leaves",pixel.x-2,pixel.y-2);
                        if (isEmpty(pixel.x-3,pixel.y-3) && Math.random() < 0.4) {
                            createPixel("vanilla_leaves",pixel.x-3,pixel.y-3);
                        }
                    }
                }
            }
            // right
            else if (pixel.direction == "right") {
                if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.1) {
                    createPixel("vanilla_leaves",pixel.x+1,pixel.y-1);
                    if (isEmpty(pixel.x+2,pixel.y-2) && Math.random() < 0.2) {
                        createPixel("vanilla_leaves",pixel.x+2,pixel.y-2);
                        if (isEmpty(pixel.x+3,pixel.y-3) && Math.random() < 0.4) {
                            createPixel("vanilla_leaves",pixel.x+3,pixel.y-3);
                        }
                    }
                }
            }
        }
        pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "grower":false,
        "age":0,
        "direction":"undefined",
    }
}
elements.vanilla_leaves = {
    color: "#5d9c48",
    reactions: {
        "stench": { elem2:null, chance:0.25 },
        "steam": { elem2:"fragrance", chance:0.1 },
        "flea": { elem2:null, chance:0.01 },
        "termite": { elem2:null, chance:0.01 },
        "fly": { elem2:null, chance:0.01 },
        "ant": { elem2:null, chance:0.01 },
        "stink_bug": { elem2:null, chance:0.01 },
        "yeast": {elem1:"tea", chance:0.01},
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x-1,pixel.y-1) && !isEmpty(pixel.x+1,pixel.y+1) && Math.random() < 0.03) {
            createPixel("vanilla_flower",pixel.x-1,pixel.y-1);
        }
        if (isEmpty(pixel.x+1,pixel.y-1) && !isEmpty(pixel.x-1,pixel.y+1) && Math.random() < 0.03) {
            createPixel("vanilla_flower",pixel.x+1,pixel.y-1);
        }
        pixel.age++;
        doDefaults(pixel);
    },
    behavior: behaviors.WALL,
    tempHigh: 300,
    stateHigh: ["fire","smoke","smoke","smoke","ash"],
    tempLow: -2,
    stateLow: "frozen_plant",
    burn:10,
    burnTime:300,
    burnInto: ["fire","smoke","smoke","smoke","smoke","smoke","smoke","fragrance"],
    category:"life",
    state: "solid",
    density: 1400,
    isFood: true,
    hidden:true
},
elements.vanilla_seed = {
    color: "#806d3b",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel("vanilla_stem",pixel.x,pixel.y+1);
                    pixel.height++;
                }
                if (pixel.height < 12 && pixel.height > 2 && pixel.height == 3) {
                    if (isEmpty(pixel.x+1,pixel.y)) {
                        createPixel("vanilla_stem",pixel.x+1,pixel.y);
                        pixelMap[pixel.x+1][pixel.y].grower = true;
                    }
                }
                if (pixel.height < 12 && pixel.height > 2 && pixel.height == 9) {
                    if (isEmpty(pixel.x+1,pixel.y)) {
                        createPixel("vanilla_stem",pixel.x+1,pixel.y);
                        pixelMap[pixel.x+1][pixel.y].grower = true;
                    }
                }
                if (pixel.height < 12 && pixel.height > 2 && pixel.height == 6) {
                    if (isEmpty(pixel.x-1,pixel.y)) {
                        createPixel("vanilla_stem",pixel.x-1,pixel.y);
                        pixelMap[pixel.x-1][pixel.y].grower = true;
                    }
                }
                if (pixel.height > 11) {
                    if (isEmpty(pixel.x-1,pixel.y) && isEmpty(pixel.x+1,pixel.y)) {
                        createPixel("vanilla_stem",pixel.x-1,pixel.y);
                        pixelMap[pixel.x-1][pixel.y].grower = true;
                        createPixel("vanilla_stem",pixel.x+1,pixel.y);
                        pixelMap[pixel.x+1][pixel.y].grower = true;
                        deletePixel(pixel.x,pixel.y);
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "height":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.vanilla_flower = {
    color: "#f7f4e1",
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    tick: function(pixel) {
        if (pixel.age > 175 && pixel.pod == true) {
            changePixel(pixel,"vanilla_pod")
        }
        if (isEmpty(pixel.x,pixel.y+1) && Math.random() < 0.03 && pixel.pod == false && pixel.harvested == false) {
            createPixel("vanilla_flower",pixel.x,pixel.y+1);
            pixelMap[pixel.x][pixel.y+1].pod = true;
            if (Math.random < 0.5) {
                pixel.harvested = true;
            }
        }
        pixel.age++
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    properties: {
        "age":0,
        "pod":false,
        "harvested":false,
    }
}

elements.vanilla_pod = {
    color: "#36281d",
    behavior: [
        "XX|ST:vanilla_flower|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    reactions: {
        "alcohol": { elem1:"vanilla_essence", elem2:null, chance:0.035 },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
}
elements.ice_cream.reactions = {}
elements.ice_cream.reactions.vanilla_essence = {color1:"#fff7b6", elem2:null, chance:0.35}
elements.vanilla_essence = {
    color: "#9c7211",
    behavior: behaviors.LIQUID,
    tempHigh: 170,
    stateHigh: ["sugar","smoke","smoke"],
    tempLow: 0,
    category:"liquids",
    state: "liquid",
    density: 1400,
}

elements.candy.reactions = {}
elements.candy.reactions.peppermint = {elem1:"peppermint_candy", elem2:null, chance:0.35}
elements.peppermint_candy = {
    color: ["#fa5e3e","#fff5f5"],
    behavior: behaviors.WALL,
    tempHigh: 204.44,
    stateHigh: "smoke",
    category: "food",
    state: "solid",
    density: 850,
    isFood: true
}
elements.tapioca = {
    color: "#ded58e",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2 AND CH:dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand>tapioca,fiber%0.5|M1 AND CH:dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand>tapioca,fiber,fiber%0.5|M2 AND CH:dirt,mud,sand,wet_sand,clay_soil,clay,mycelium,grass,color_sand>tapioca,fiber%0.5",
    ],
    tempHigh: 275,
    stateHigh: "dirt",
    tempLow: -50,
    stateLow: "fiber",
    burn: 20,
    burnTime: 60,
    burnInto: "dirt",
    breakInto: "corn_starch",
    category: "food",
    state: "solid",
    density: 1250,
    conduct: 0.1,
    hidden: true,
    darkText: true,
    desc:'a wise icyking once said: \'state:"burn 100"\'',
    alias:["element that i made before icyking","burn 100 element"]
}

elements.tapioca_seed = {
    color: "#a78d38",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"tapioca");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel("tapioca_stem",pixel.x,pixel.y+1);
                }
                if (isEmpty(pixel.x+1,pixel.y) && Math.random() < 0.2) {
                    createPixel("tapioca_leaves",pixel.x+1,pixel.y);
                }
                if (isEmpty(pixel.x-1,pixel.y) && Math.random() < 0.2) {
                    createPixel("tapioca_leaves",pixel.x-1,pixel.y);
                }
            }
            else if (pixel.age > 250) {
                changePixel(pixel,"tapioca_leaves");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

elements.tapioca_stem = {
    color: "#358f35",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
}
elements.tapioca_leaves = {
    color: "#3e823e",
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "carbon_dioxide": { elem2:"oxygen", chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050
}
elements.sprinkle_bomb = {
    color: ["#eb726a", "#ebca6a", "#88eb6a", "#6aaceb", "#eb6ade"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1 AND EX:10>sprinkles|XX",
    ],
    category: "food",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.chilli_stem = {
    color: "#5d9c48",
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "stench": { elem2:null, chance:0.25 },
        "carbon_dioxide": { elem2:"oxygen", chance:0.25 },
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true,
    breakInto: "herb",
    breakIntoColor:"#245c1b",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1) && pixel.grower == false && pixel.leafgrower == false) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        if (pixel.grower == true) {
            // check if left side has stem if no set direction to right
            if (!isEmpty(pixel.x-1,pixel.y) && pixel.direction == "undefined") {
                if (pixelMap[pixel.x-1][pixel.y].element == "chilli_stem") {
                    pixel.direction = "right";
                }
            }
            // same thing to set direction the left
            else if (!isEmpty(pixel.x+1,pixel.y) && pixel.direction == "undefined") {
                if (pixelMap[pixel.x+1][pixel.y].element == "chilli_stem") {
                    pixel.direction = "left";
                }
            }
        }
        if (pixel.grower == true) {
            // left
            if (pixel.direction == "left") {
                if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.1) {
                    createPixel("chilli_leaves",pixel.x-1,pixel.y-1);
                    if (isEmpty(pixel.x-2,pixel.y-2) && Math.random() < 0.2) {
                        createPixel("chilli_leaves",pixel.x-2,pixel.y-2);
                        if (isEmpty(pixel.x-3,pixel.y-3) && Math.random() < 0.4) {
                            createPixel("chilli_leaves",pixel.x-3,pixel.y-3);
                        }
                    }
                }
            }
            // right
            else if (pixel.direction == "right") {
                if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.1) {
                    createPixel("chilli_leaves",pixel.x+1,pixel.y-1);
                    if (isEmpty(pixel.x+2,pixel.y-2) && Math.random() < 0.2) {
                        createPixel("chilli_leaves",pixel.x+2,pixel.y-2);
                        if (isEmpty(pixel.x+3,pixel.y-3) && Math.random() < 0.4) {
                            createPixel("chilli_leaves",pixel.x+3,pixel.y-3);
                        }
                    }
                }
            }
        }
        pixel.age++;
        doDefaults(pixel);
    },
    properties: {
        "grower":false,
        "age":0,
        "direction":"undefined",
    }
}
elements.chilli_leaves = {
    color: "#5d9c48",
    reactions: {
        "water": { elem2:"chilli_tea", tempMin:80 },
        "salt_water": { elem2:"chilli_tea", tempMin:80 },
        "sugar_water": { elem2:"chilli_tea", tempMin:80 },
        "seltzer": { elem2:"chilli_tea", tempMin:80 },
        "stench": { elem2:null, chance:0.25 },
        "steam": { elem2:"fragrance", chance:0.1 },
        "flea": { elem2:null, chance:0.01 },
        "termite": { elem2:null, chance:0.01 },
        "fly": { elem2:null, chance:0.01 },
        "ant": { elem2:null, chance:0.01 },
        "stink_bug": { elem2:null, chance:0.01 },
        "yeast": {elem1:"tea", chance:0.01},
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x-1,pixel.y-1) && !isEmpty(pixel.x+1,pixel.y+1) && Math.random() < 0.03) {
            createPixel("chilli",pixel.x-1,pixel.y-1);
        }
        if (isEmpty(pixel.x+1,pixel.y-1) && !isEmpty(pixel.x-1,pixel.y+1) && Math.random() < 0.03) {
            createPixel("chilli",pixel.x+1,pixel.y-1);
        }
        pixel.age++;
        doDefaults(pixel);
    },
    behavior: behaviors.WALL,
    tempHigh: 300,
    stateHigh: ["fire","smoke","smoke","smoke","ash"],
    tempLow: -2,
    stateLow: "frozen_plant",
    burn:10,
    burnTime:300,
    burnInto: ["fire","smoke","smoke","smoke","smoke","smoke","smoke","fragrance"],
    category:"life",
    state: "solid",
    density: 1400,
    isFood: true,
    hidden:true,
    breakInto: "herb",
    breakIntoColor:"#245c1b",
},
elements.chilli_seed = {
    color: "#806d3b",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.1 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel("chilli_stem",pixel.x,pixel.y+1);
                    pixel.height++;
                }
                if (pixel.height < 12 && pixel.height > 2 && pixel.height == 3) {
                    if (isEmpty(pixel.x+1,pixel.y)) {
                        createPixel("chilli_stem",pixel.x+1,pixel.y);
                        pixelMap[pixel.x+1][pixel.y].grower = true;
                    }
                }
                if (pixel.height < 12 && pixel.height > 2 && pixel.height == 9) {
                    if (isEmpty(pixel.x+1,pixel.y)) {
                        createPixel("chilli_stem",pixel.x+1,pixel.y);
                        pixelMap[pixel.x+1][pixel.y].grower = true;
                    }
                }
                if (pixel.height < 12 && pixel.height > 2 && pixel.height == 6) {
                    if (isEmpty(pixel.x-1,pixel.y)) {
                        createPixel("chilli_stem",pixel.x-1,pixel.y);
                        pixelMap[pixel.x-1][pixel.y].grower = true;
                    }
                }
                if (pixel.height > 11) {
                    if (isEmpty(pixel.x-1,pixel.y) && isEmpty(pixel.x+1,pixel.y)) {
                        createPixel("chilli_stem",pixel.x-1,pixel.y);
                        pixelMap[pixel.x-1][pixel.y].grower = true;
                        createPixel("chilli_stem",pixel.x+1,pixel.y);
                        pixelMap[pixel.x+1][pixel.y].grower = true;
                        deletePixel(pixel.x,pixel.y);
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
        "height":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
};
elements.chilli = {
    color: "#ba3030",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "ST:chilli_leaves|M1|ST:chilli_leaves",
    ],
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    breakInto: "chilli_powder",
    reactions: {
	"sauce": {elem1:null, elem2:"hot_sauce", chance:2}
    },
}
elements.chilli_powder = {
    color: "#a32121",
    reactions: {
        "stench": { elem2:null, chance:0.25 },
        "steam": { elem2:"fragrance", chance:0.1 },
        "flea": { elem2:null, chance:0.01 },
        "termite": { elem2:null, chance:0.01 },
        "fly": { elem2:null, chance:0.01 },
        "ant": { elem2:null, chance:0.01 },
        "stink_bug": { elem2:null, chance:0.01 },
	"sauce": {elem1:null, elem2:"hot_sauce", chance:2}
    },
    behavior: behaviors.POWDER,
    tempHigh: 300,
    stateHigh: ["fire","smoke","smoke","smoke","ash"],
    burn:10,
    burnTime:300,
    burnInto: ["fire","smoke","smoke","smoke","smoke","smoke","smoke","fragrance"],
    category:"food",
    state: "solid",
    density: 1400,
    isFood: true,
}
elements.hot_sauce = {
    color: "#a31414",
    behavior: behaviors.LIQUID,
    reactions: {
        "stench": { elem2:null },
    },
    viscosity: 2600,
    tempHigh: 260,
    stateHigh: ["steam","salt","fragrance"],
    tempLow: -2,
    category:"food",
    state: "liquid",
    density: 1031.33,
    stain: 0.01,
    isFood: true
}
elements.head.reactions.hot_sauce = {elem2:["smoke","fire",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null], chance:3}


elements.durian_wood = {
    color: "#5e4b23",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.durian_branch = {
    color: "#5e4b23",
    behavior: [
        "CR:durian_leaves,durian_branch%2|CR:durian_leaves,durian_branch%2|CR:durian_leaves,durian_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "durian_wood",
    tempLow: -30,
    stateLow: "durian_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
}
elements.durian_leaves = {
    color: ["#326b25","#2e751e"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:durian%0.1|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.durian = {
    color: ["#578524","#5b8f1f"],
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    cutInto: "cut_durian",
    state: "solid",
    density: 1050,
    breakInto: "durian_juice"
}

elements.cut_durian = {
    color: ["#e3e04b","#d1cf36"],
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    state: "solid",
    density: 1050,
    hidden: true,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#a19f3b",
    breakInto: "durian_juice"
}

elements.durian_seed = {
    color: "#a17d3b",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "durian_wood" : "durian_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"durian_wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

elements.durian_juice = {
    color: "#ebe06e",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#ebe06e")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    hidden: true,
    tempLow: 0,
};
eLists.JUICEMIXABLE.push("durian_juice");
elements.egg_white = {
    color: "#edece8",
    behavior: behaviors.LIQUID,
    tempHigh: 100,
    stateHigh: "hard_egg_white",
    tempLow: 0,
    stateLow: "hard_egg_white",
    category: "food",
    state: "liquid",
    density: 1027.5,
    viscosity: 270,
    isFood: true,
    whiskInto: "whisked_egg_white",
}
elements.hard_egg_white = {
    color: "#dedddc",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 400,
    stateHigh: "smoke",
    category: "food",
    hidden: true,
    isFood: true,
    state: "solid",
    density: 1031
}
elements.milk.whiskInto = "cream";
elements.cream.whiskInto = "whipped_cream";
elements.egg.breakInto = ["egg_white","egg_white","yolk"]

elements.whisked_egg_white ={
    color: "#fefefe",
    behavior: behaviors.LIQUID,
    reactions: {
        "corn_syrup": { elem1: "marshmallow", elem2: null, chance: 2 },
        "sugar": { elem1: "marshmallow", elem2: null, chance: 2 },
    },
    viscosity: 1.5,
    tempHigh: 1000,
    stateHigh: ["smoke","steam"],
    category: "food",
    hidden: true,
    isFood: true,
    state: "liquid",
    density: 959.97,
}
elements.marshmallow = {
    color: "#fafafa",
    behavior: [
        "XX|XX|XX",
        "ST:wood|XX|ST:wood",
        "XX|M1|XX",
    ],
    viscosity: 1.5,
    tempHigh: 70,
    stateHigh: "cooked_marshmallow",
    category: "food",
    isFood: true,
    state: "solid",
    density: 959.97,
}
elements.cooked_marshmallow = {
    color: "#f0dbb6",
    behavior: [
        "XX|XX|XX",
        "ST:wood|XX|ST:wood",
        "XX|M1|XX",
    ],
    viscosity: 1.5,
    tempHigh: 150,
    stateHigh: "burnt_marshmallow",
    category: "food",
    isFood: true,
    state: "solid",
    density: 959.97,
    hidden:true
}
elements.burnt_marshmallow = {
    color: "#29231a",
    behavior: [
        "XX|XX|XX",
        "ST:wood|XX|ST:wood",
        "XX|M1|XX",
    ],
    viscosity: 1.5,
    tempHigh: 1000,
    stateHigh: ["steam","caramel"],
    category: "food",
    isFood: true,
    state: "solid",
    density: 959.97,
    hidden:true
}
eLists.FOODCOLORINGIGNORE = ["glass", "porcelain", "wall","iron","steel","copper","silver","aluminum","tungsten","gold","plastic"];
elements.food_coloring = {
    color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    behavior: behaviors.LIQUID,
    customColor: true,
    stain: 0.5,
    tempHigh: 100,
    stateHigh: "steam",
    category: "food",
    state: "liquid",
    density: 998,
    stainSelf: true,
    ignore: ["glass", "porcelain", "wall","iron","steel","copper","silver","aluminum","tungsten","gold","plastic"],
    desc: "coloring for food. color may fade when diluting with water.",
    onMix: function (pixel) {
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x + coord[0];
            var y = pixel.y + coord[1];
            if (!isEmpty(x, y, true)) {
                if (pixelMap[x][y].element === "water" || pixelMap[x][y].element === "salt_water" || pixelMap[x][y].element === "sugar_water" || pixelMap[x][y].element === "seltzer" || pixelMap[x][y].element === "dirty_water" || pixelMap[x][y].element === "pool_water") {
                    changePixel(pixelMap[x][y], "food_coloring");
                    let newrgb = interpolateRgb(getRGB(pixel.color), getRGB(pixelMap[x][y].color), 0.5);
                    pixel.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
                    pixelMap[x][y].color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
                }
		    	else {
                    if (!outOfBounds(pixelMap[x][y])) {
                        if (!eLists.FOODCOLORINGIGNORE.includes(pixelMap[x][y].element) && pixelMap[x][y].element !== "glass" && pixelMap[x][y].element !== "porcelain" && pixelMap[x][y].element !== "wall" && pixelMap[x][y].element !== "plastic") {
                            let newrgb2 = interpolateRgb(getRGB(pixel.color), getRGB(pixelMap[x][y].color), 0.9);
                            pixelMap[x][y].color = `rgb(${parseInt(newrgb2.r)},${parseInt(newrgb2.g)},${parseInt(newrgb2.b)})`;
                            if (Math.random() < 0.002) {
                                deletePixel(pixel.x,pixel.y)
                            }
                        }
                    }
                }
            }
        }
    },
    onSelect: function () {
        logMessage("Tip: You can spread food coloring using water.");
    },
}

elements.cooked_meat.behavior = behaviors.SUPPORT;

elements.cake_batter = {
    color: "#d4bc85",
    behavior: behaviors.LIQUID,
    onMix: function(batter,ingredient) {
        if (elements[ingredient.element].isFood && elements[ingredient.element].id !== elements.batter.id && elements[ingredient.element].id !== elements.flour.id && elements[ingredient.element].id !== elements.yolk.id && elements[ingredient.element].id !== elements.dough.id && elements[ingredient.element].id !== elements.baked_batter.id && elements[ingredient.element].id !== elements.cake.id && elements[ingredient.element].id !== elements.cake_batter.id) {
            var rgb1 = batter.color.match(/\d+/g);
            var rgb2 = ingredient.color.match(/\d+/g);
            // average the colors
            var rgb = [
                Math.round((parseInt(rgb1[0])*10+parseInt(rgb2[0]))/11),
                Math.round((parseInt(rgb1[1])*10+parseInt(rgb2[1]))/11),
                Math.round((parseInt(rgb1[2])*10+parseInt(rgb2[2]))/11)
            ];
            // convert rgb to hex
            var hex = RGBToHex(rgb);
            batter.color = pixelColorPick(batter, hex);
            if ((elements[ingredient.element].density > elements.batter.density || shiftDown) && Math.random() < 0.05) {
                // 50% change to delete ingredient
                if (Math.random() < 0.5) { deletePixel(ingredient.x, ingredient.y); }
                else {
                    ingredient.color = pixelColorPick(ingredient, hex);
                }
            }
        }
    },
    reactions: {
        "cream": { elem2:"cake_batter", tempMin:40, chance:0.01 },
    },
    category: "food",
    tempHigh: 94,
    stateHigh: "cake",
    stateHighColorMultiplier: 0.9,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "liquid",
    viscosity: 10000,
    density: 1001,
    hidden: true,
    isFood: true
}
elements.batter.whiskInto = "cake_batter";
elements.milk.stateHigh = ["steam","steam","condensed_milk"];
elements.condensed_milk = {
    color: "#f2f0df",
    behavior: behaviors.LIQUID,
    reactions: {
        "cell": { elem1:"yogurt", chance:0.1 },
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "caramel": { color1:"#C8B39A", elem2:null, chance:0.05 },
        "sugar": { color1:"#fffbf0", elem2:null, chance:0.5},
    },
    tempLow: 0,
    stateLow: "ice_cream",
    stateLowColorMultiplier: [0.97,0.93,0.87],
    tempHigh: 500,
    stateHigh: ["smoke","smoke","smoke","quicklime"],
    viscosity: 1500,
    category: "food",
    state: "liquid",
    density: 1036.86,
    isFood: true,
    alias: "evaporated_milk"
}
elements.wasabi = {
    color: ["#82b55b","#6cad50","#7dcc5c"],
    behavior: behaviors.STURDYPOWDER2,
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "clay_soil": { elem1: null, elem2: "clay" },
        "melted_chocolate": { color1:"#664934", elem2:null },
        "chocolate": { color1:"#664934", elem2:"melted_chocolate", chance:0.05 },
        "juice": { elem1:"fruit_milk", elem2:null, chance:0.05 },
        "soda": { elem1:"pilk", elem2:null, chance:0.1 },
        "yolk": { elem1:"#eggnog", elem2:null, chance:0.1 },
        "caramel": { color1:"#C8B39A", chance:0.05 },
        "sugar": { elem2:null, chance:0.005},
    },
    viscosity: 1.5,
    tempHigh: 1000,
    stateHigh: ["smoke","smoke","smoke","steam","steam"],
    category: "food",
    isFood: true,
    state: "solid",
    density: 959.97,
}
// extremely confused part
elements.beans.name = "baked_beans";
elements.real_beans = {
    name: "beans",
    color: ["#e8dfc5","#d1c7ab"],
    behavior: behaviors.POWDER,
    category: "food",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    reactions: {
        "sauce": { elem1: "beans", elem2: "beans" },
        "yeast": { elem1: "fermented_beans", elem2: null, chance:0.5 }
    },
    state: "solid",
    density: 721,
    isFood: true,
    alias: "soy_beans"
}
elements.fermented_beans = {
    color:"#ada386",
    behavior: behaviors.POWDER,
    category: "food",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    state: "solid",
    density: 721,
    breakInto: "soy_sauce",
    isFood: true,
    alias: "natto"
}
elements.soy_sauce = {
    color: "#480601",
    behavior: behaviors.LIQUID,
    tempLow: -5,
    tempHigh: 105,
    stateHigh: ["steam","steam","salt"],
    state: "liquid",
    category:"food",
    density: 1200,
};
// end of confused part

elements.ice.breakInto = "slush";

elements.cracker_dough = {
    color: "#dbd19a",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    tempHigh: 94,
    stateHigh: "cracker",
    stateHighColorMultiplier: 1.1,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true,
    hidden: true
}

elements.cracker = {
    color: "#e0ddb8",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 605,
    stateHigh: "ash",
    category: "food",
    burn: 30,
    burnTime: 200,
    burnInto: ["smoke","smoke","smoke","ash"],
    breakInto: "crumb",
    state: "solid",
    density: 233.96,
    isFood: true
}

elements.agar = {
    color: "#e0e0e0",
    behavior: behaviors.POWDER,
    reactions: {
        "ice": { elem1:null, elem2:"salt_water", chance:0.1 },
        "rime": { elem1:null, elem2:"salt_water", chance:0.075 },
        "snow": { elem1:null, elem2:"salt_water", chance:0.25 },
        "packed_snow": { elem1:null, elem2:"salt_water", chance:0.05 },
        "packed_ice": { elem1:null, elem2:"salt_water", chance:0.01 }
    },
    category: "food",
    tempHigh: 801,
    state: "solid",
    density: 2160,
    alias: "gelatin"
}
// thanks to adora
elements.agar.reactions.juice = { elem1:"jelly", elem2:null, chance:0.05, func: function(pixel1, pixel2){
    let newrgb = interpolateRgb(getRGB('rgb(250,250,250)'), getRGB(pixel2.color), 0.7);
    pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
}}
elements.agar.reactions.water = {elem1:"jelly",elem2:null,color1:"#e0e0e0",chance:0.05}

elements.duck = {
    color: ["#826c4e", "#2b5927", "#d6d6d6", "#7d4a2c"],
    behavior: [
        "M2%1 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%1|M2%2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%50|M2%1 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water,primordial_soup%1",
        "M2%10|XX|M2%10",
        "XX|M1%33|XX",
    ],
    category:"life",
	state: "solid",
    reactions: {
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "chicken_nugget": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "worm": { elem2: "crushed_worm", chance:0.3},
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "rat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "snail": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "frog": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.32, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    },
    egg: "duck_egg",
    foodNeed: 10,
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_duck",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "raw_duck",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 1117,
    conduct: 0.3,
    cutInto: "raw_duck",
};

elements.duck_egg = {
    color: "#e0d3ab",
    behavior: behaviors.STURDYPOWDER2,
    tick: function(pixel) {
        if (Math.random() < 0.1 && pixel.temp > 20 && pixel.temp < 35) {
            changePixel(pixel,"duckling")
        }
    doDefaults(pixel);
    },
    category: "food",
    state: "solid",
    temp: 20,
    tempLow: -18,
    stateLow: "frozen_duck_egg",
    breakInto: ["yolk"],
    tempHigh: 400,
    stateHigh: ["calcium", "ash"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    reactions: {
        "water": { elem2:null, elem1:"hard_boiled_egg", chance:10, tempMin:80 }
    }
};
elements.frozen_duck_egg = {
    color: "#e0d3cf",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    temp: -20,
    tempHigh: 10,
    stateHigh: "duck_egg",
    breakInto: ["calcium", "hard_yolk"],
    burn:50,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    hidden: true,
};
elements.duckling = {
    color: ["#f0eba8", "#f0eba8"],
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|FX%5 AND CH:duck%0.1|M2%10",
        "XX|M1%33|XX",
    ],
    category: "life",
    state: "solid",
    egg: "duck_egg",
    foodNeed: 20,
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "blood",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    reactions: {
        "crushed_worm": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL},
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "chicken_nugget": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "worm": { elem2: "crushed_worm", chance:0.3},
        "cooked_meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "fish": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "rat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "snail": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "frog": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "slug": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.32, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.4, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.35, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    }
};

elements.barbecued_duck = {
    color:["#a67d2d","#9c721f"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}
elements.steamed_duck = {
    color:["#e8cb7b", "#d6bf7e"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:50,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}

elements.smoked_duck = {
    color:["#6b470e", "#8f5b09"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}
elements.cooked_duck = {
    color: ["#a38046", "#b39652"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
};

elements.raw_duck = {
    color: ["#d6a587", "#c99873"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "cooked_duck",
    temp:25,
    tempHigh: 600,
    stateHigh: ["cooked_duck"],
    reactions: {
        "smoke": {elem1: "smoked_duck"},
        "steam": {elem1: "steamed_duck"},
        "water": {elem1: "boiled_duck", tempMin: 70},
        "nut_oil": {elem1: "fried_duck", tempMin: 70},
        "charcoal": {elem1: "barbecued_duck", tempMin: 70},
        "fire": {elem1: "barbecued_duck"}
    }
};

elements.boiled_duck = {
    color: ["#e0d4a4", "#e0d4a4"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 65,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
}

elements.fried_duck = {
    color: ["#c49543", "#b88835", "#b07b20", "#996e23"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 90,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
}
// side note: i don't eat beef
elements.cow = {
    color: ["#292928", "#332b23", "#e0dfde", "#f0edeb"],
    behavior: [
        "M2%1|XX|M2%1",
        "M2%10|XX|M2%10",
        "XX|M1|XX",
    ],
    category:"life",
	state: "solid",
    reactions: {
        "petal": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    },
    egg: "calf",
    foodNeed: 10,
    temp: 40,
    tempHigh: 75,
    stateHigh: "steak",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "raw_beef",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 1117,
    conduct: 0.3,
    cutInto: "raw_beef",
};
elements.calf = {
    color: ["#363535", "#bdbdbd"],
    behavior: [
        "M2%1|XX|M2%1",
        "M2%10|FX%5 AND CH:cow%0.1|M2%10",
        "XX|M1|XX",
    ],
    category: "life",
    state: "solid",
    foodNeed: 20,
    temp: 40,
    tempHigh: 75,
    stateHigh: "steak",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "blood",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 900,
    conduct: 0.1,
    reactions: {
        "petal": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "grape": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "nut": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "mercury": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
    },
};

elements.barbecued_steak = {
    color:["#3b271a","#29180d"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}

elements.smoked_beef = {
    color:["#3b1911", "#3b2719"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}
elements.steak = {
    color: ["#a38046", "#b39652"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
    alias: "cooked_beef"
};

elements.raw_beef = {
    color: ["#ab5841", "#ab322e"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "steak",
    temp:25,
    tempHigh: 200,
    stateHigh: "steak",
    reactions: {
        "smoke": {elem1: "smoked_beef"},
        "charcoal": {elem1: "barbecued_beef", tempMin: 70},
        "fire": {elem1: "barbecued_beef"}
    }
};

elements.juice.reactions.milk = { elem1:"fruit_milk", elem2:null, chance:0.05, func: function(pixel1, pixel2){
    let newrgb = interpolateRgb(getRGB('rgb(250,250,250)'), getRGB(pixel2.color), 0.25);
    pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
}}
elements.juice.reactions.cream = { elem1:"fruit_milk", elem2:null, chance:0.05, func: function(pixel1, pixel2){
    let newrgb = interpolateRgb(getRGB('rgb(250,250,250)'), getRGB(pixel2.color), 0.25);
    pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
}}
elements.soda.reactions.soda = {
    func: function(pixel1, pixel2){
      if(pixel1.color != pixel2.color){
        if(Math.floor(Math.random() * 1000) == 1){
        let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.5);
        pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        }
      }
    }
  }
elements.juice.reactions.soda = {
    chance:70,
    func: function(pixel1, pixel2){
        if(pixel1.color != pixel2.color){
            if(Math.floor(Math.random() * 1000) == 1){
                let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.5);
                changePixel(pixelMap[pixel1.x][pixel1.y],"soda")
                pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
                pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
            }
        }
    }
}
if (!elements.orange_juice.reactions) { elements.orange_juice.reactions = {} }
elements.orange_juice.reactions.seltzer = { elem1:"soda", elem2:"foam", color1:"#ffb319"}
elements.orange_juice.reactions.carbon_dioxide = { elem1:"soda", elem2:"foam", color1:"#ffb319"}
elements.agar.reactions.soda = { elem1:"jelly", elem2:null, chance:0.05, func: function(pixel1, pixel2){
    let newrgb = interpolateRgb(getRGB('rgb(250,250,250)'), getRGB(pixel2.color), 0.7);
    pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
}}
elements.hard_jelly = {
    color: "#c372b8",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 200,
    stateHigh: ["smoke","sugar"],
    category: "food",
    state: "solid",
    density: 1245,
    isFood: true,
    hidden: true,
    temp: 0
}
elements.jelly.stateLow = "hard_jelly"
elements.jelly.stateLowColorMultiplier = 1.2
elements.jelly.temp = 0

elements.nut.name = "peanut";
elements.nut_meat.name = "peanut_meat";
elements.nut_butter.name = "peanut_butter";

elements.spring_onion_leaves = {
    color: "#519c2f",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "ST:onion|M1|ST:onion",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "herb",
    state: "solid",
    density: 1050,
    cutInto: "chopped_spring_onion",
}
elements.chopped_spring_onion = {
    color: ["#0f9912","#227d23"],
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    state: "solid",
    density: 1050,
    breakInto:"herb",
}


elements.spring_onion_seed = {
    color: "#1a0e02",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.2 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-2) && isEmpty(pixel.x,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-1) && isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x-1,pixel.y)) {
                    createPixel("onion",pixel.x,pixel.y-1);
                    createPixel("onion",pixel.x+1,pixel.y-1);
                    createPixel("onion",pixel.x-1,pixel.y-1);
                    createPixel("onion",pixel.x,pixel.y-2);
                    createPixel("onion",pixel.x+1,pixel.y);
                    createPixel("onion",pixel.x-1,pixel.y);
                    if (isEmpty(pixel.x+1,pixel.y-3) && isEmpty(pixel.x-1,pixel.y-3)) {
                        createPixel("spring_onion_leaves",pixel.x+1,pixel.y-3);
                        createPixel("spring_onion_leaves",pixel.x-1,pixel.y-3);
                        if (isEmpty(pixel.x+1,pixel.y-4) && isEmpty(pixel.x-1,pixel.y-4)) {
                            createPixel("spring_onion_leaves",pixel.x+1,pixel.y-4);
                            createPixel("spring_onion_leaves",pixel.x-1,pixel.y-4);
                            if (isEmpty(pixel.x+1,pixel.y-5) && isEmpty(pixel.x-1,pixel.y-5)) {
                                createPixel("spring_onion_leaves",pixel.x+1,pixel.y-5);
                                createPixel("spring_onion_leaves",pixel.x-1,pixel.y-5);
                            }
                        }
                        changePixel(pixel,"onion");
                    }
                }
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
}

elements.stainless_steel ={
    color: "#91999e",
    behavior: behaviors.WALL,
    tempHigh: 1455.5,
    category: "solids",
    density: 7850,
    conduct: 0.42,
    hardness: 0.8
} 

elements.rambutan_wood = {
    color: "#635418",
    behavior: behaviors.WALL,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "solids",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    breakIntoColor: ["#dba66e","#cc8a64"],
    hidden: true
}
elements.rambutan_branch = {
    color: "#635418",
    behavior: [
        "CR:rambutan_leaves,rambutan_branch%2|CR:rambutan_leaves,rambutan_branch%2|CR:rambutan_leaves,rambutan_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "rambutan_wood",
    tempLow: -30,
    stateLow: "rambutan_wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
}
elements.rambutan_leaves = {
    color: "#6fa611",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:unripe_rambutan%0.1|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true
}
elements.unripe_rambutan = {
    color: ["#87c718","#8ac91c","#94de1d"],
    behavior: [
        "XX|ST:rambutan_leaves|XX",
        "XX|CH:rambutan%1|XX",
        "M2|M1|M2",
    ],
    category:"food",
    tempHigh: 100,
    stateHigh: ["dead_plant","steam"],
    burn:65,
    burnTime:60,
    cutInto: "cut_rambutan",
    state: "solid",
    density: 1050,
    breakInto: "rambutan_juice"
}

elements.rambutan = {
    color: ["#d64242","#f23333","#cc3737","#b1db69"],
    behavior: behaviors.POWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    state: "solid",
    density: 1050,
    cutInto: "cut_rambutan",
    breakInto: "rambutan_juice"
}

elements.cut_rambutan = {
    color: "#f5f1bf",
    behavior: behaviors.STURDYPOWDER,
    category:"food",
    tempHigh: 100,
    stateHigh: ["sugar","steam"],
    burn:65,
    burnTime:60,
    state: "solid",
    density: 1050,
    hidden: true,
    freezeDryInto: "freeze_dried_fruits",
    freezeDryIntoColor: "#a19f3b",
    breakInto: "rambutan_juice"
}

elements.rambutan_seed = {
    color: "#2b1807",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "rambutan_wood" : "rambutan_branch",pixel.x,pixel.y+1);
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"rambutan_wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
    behavior: [
        "XX|XX|XX",
        "XX|FX%10|XX",
        "XX|M1|XX",
    ],
};

elements.rambutan_juice = {
    color: "#f7f4cb",
    onMix: function(pixel) {
        if (shiftDown) {
            if (Math.random() < 0.2) {
                changePixel(pixel,"juice")
                pixel.color = pixelColorPick(pixel,"#f7f4cb")
            }
        }
    },
    behavior: behaviors.LIQUID,
    category: "liquids",
    tempHigh: 100,
    stateHigh: ["steam","sugar"],
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    hidden: true,
    tempLow: 0,
};
eLists.JUICEMIXABLE.push("rambutan_juice");

elements.barbecued_shrimp = {
    color:["#bf743b", "#b57026","#8f5e29","#a87b11"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}
elements.steamed_shrimp = {
    color:["#e8dab2", "#e2cea6"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:50,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}
elements.smoked_shrimp = {
    color:["#78542e", "#6b4b26"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:55,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
    isFood: true,
    hidden: true,
}
elements.cooked_shrimp = {
    color:["#ff7f50", "#ffa07a", "#ffb3a7"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
};

elements.raw_shrimp = {
    color: ["#f0e0d6", "#e8d9ce", "#cdb7b5"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "cooked_shrimp",
    temp:25,
    tempHigh: 600,
    stateHigh: "cooked_shrimp",
    reactions: {
        "batter": { elem1: "battered_shrimp", elem2: null },
        "smoke": {elem1: "smoked_shrimp"},
        "steam": {elem1: "steamed_shrimp"},
        "water": {elem1: "boiled_shrimp", tempMin: 70},
        "nut_oil": {elem1: "fried_shrimp", tempMin: 70},
        "charcoal": {elem1: "barbecued_shrimp", tempMin: 70},
        "fire": {elem1: "barbecued_shrimp"}
    }
};

elements.boiled_shrimp = {
    color: ["#ffd180", "#ffc978", "#ffbe70"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood: true,
    temp: 65,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
}
elements.battered_shrimp = {
    color: ["#f2e7d5", "#eae0cd"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:25,
    tempHigh: 125,
    stateHigh: "cooked_shrimp",
    reactions: {
        "crumb": { color1: "#123456", elem2: null },
        "nut_oil": {elem1: "tempura", tempMin: 60}
    },
    hidden: true,
};
elements.tempura = {
    color: ["#ff8c00", "#ff8c00", "#ffab00", "#ffab00"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    breakInto: "crumb",
    isFood: true,
    density: 100,
    hidden: true,
};

elements.grape.stateHigh = "raisin"
elements.grape.tempHigh = 65

elements.raisin = {
    color: ["#522D68","#3B194D","#381845","2B194D"],
    behavior: [
        "XX|ST:vine|XX",
        "ST:vine|XX|ST:vine",
        "M2|M1|M2",
    ],
    reactions: {
        "radiation": { elem1:"explosion", chance:0.1, color1:"#291824" },
        "rock": { elem1:"juice", chance:0.1, color1:"#291824" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#291824" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#291824" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#291824" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#291824" },
        "water": { elem2:"juice", chance:0.005, color2:"#291824" },
        "sugar_water": { elem2:"juice", chance:0.025, color2:"#291824" },
        "acid": { elem1:"juice", color1:"#291824" },
        "acid_gas": { elem1:"juice", color1:"#291824" },
    },
    innerColor: "#cc7492",
    tempHigh: 256,
    stateHigh: ["steam","sugar"],
    category: "food",
    state: "solid",
    density: 1154,
    breakInto: "juice",
    breakIntoColor: "#291824",
    ignoreAir: true,
    isFood: true
}

elements.fruit_slush = {
    color: "#ed93a4",
    behavior: behaviors.LIQUID,
    reactions: {
        "dirt": { elem1: null, elem2: "mud" },
        "sand": { elem1: null, elem2: "wet_sand" },
        "uranium": { elem1:"dirty_water", chance:0.25 },
    },
    temp: -5,
    tempHigh: 18,
    tempLow: -20,
    stateLow: "juice_ice",
    stateHigh: "juice",
    category: "food",
    state: "liquid",
    density: 95,
    viscosity: 100,
    hidden: true
}

// things to mix: juice, water, seltzer, sugar water, soda, juice, milk, cream,
// juice, milk, chocolate milk, fruit milk, eggnog, nut milk, alcohol, wine, tea,
// tea, coffee, honey, caramel, vanilla essence, peppermint tea, sugar, yogurt, 
// whipped cream, chocolate, jam

// juice mixing
for (let juicei = 0; juicei < eLists.JUICEMIXABLE.length; juicei++) {
    elem = eLists.JUICEMIXABLE[juicei];
    // juice with juice
    for (let juicej = 0; juicej < eLists.JUICEMIXABLE.length; juicej++) {
        elem2 = eLists.JUICEMIXABLE[juicej];
        if (elem != elem2) {
            if (!elements[elem].reactions) { chance:1, elements[elem].reactions = {} }
            elements[elem].reactions[elem2] = { func: function(pixel1, pixel2){
                let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.5);
                changePixel(pixel1,"juice")
                pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
                pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
                // console.log("juice mixed")
            }}
        }
    }
    // juice with water
    if (!elements[elem].reactions) { elements[elem].reactions = {} }
    elements[elem].reactions.water = { chance:1, func: function(pixel1, pixel2){
        let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB("rgb(255,255,255)"), 0.2);
        if (((newrgb.r + newrgb.g + newrgb.b) / 3) > 215) {
            newrgb = getRGB(pixel1.color);
        }
        changePixel(pixel1,"juice")
        changePixel(pixel2,"juice")
        pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
    }}
    // juice with milk
    if (!elements[elem].reactions) { elements[elem].reactions = {} }
    elements[elem].reactions.milk = { chance:1, func: function(pixel1, pixel2){
        let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.2);
        changePixel(pixel1,"fruit_milk")
        changePixel(pixel2,"fruit_milk")
        pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
    }}
    // juice with coconut milk
    if (!elements[elem].reactions) { elements[elem].reactions = {} }
    elements[elem].reactions.coconut_milk = { chance:1, func: function(pixel1, pixel2){
        let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.2);
        changePixel(pixel1,"fruit_milk")
        changePixel(pixel2,"fruit_milk")
        pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
    }}
    // juice with nut milk
    if (!elements[elem].reactions) { elements[elem].reactions = {} }
    elements[elem].reactions.nut_milk = { chance:1, func: function(pixel1, pixel2){
        let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.2);
        changePixel(pixel1,"fruit_milk")
        changePixel(pixel2,"fruit_milk")
        pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
    }}
    // juice with cream
    if (!elements[elem].reactions) { elements[elem].reactions = {} }
    elements[elem].reactions.cream = { chance:1, func: function(pixel1, pixel2){
        let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.2);
        changePixel(pixel1,"fruit_milk")
        changePixel(pixel2,"fruit_milk")
        pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
    }}
    // juice with fruit milk
    if (!elements[elem].reactions) { elements[elem].reactions = {} }
    elements[elem].reactions.fruit_milk = { chance:1, func: function(pixel1, pixel2){
        let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.2);
        changePixel(pixel1,"fruit_milk")
        changePixel(pixel2,"fruit_milk")
        pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
    }}
}

iceelem = elem+"_ice"
// ice slush
elements[elem].stateLowColorMultiplier = 1.2;
elements[elem].tempLow = 10;
elements.fruit_slush.stateHighColorMultiplier = 0.83333333333;
elements.fruit_slush.stateLowColorMultiplier = 1.2;
elements.juice_ice.stateHighColorMultiplier = 0.83333333333;
elements.juice_ice.stateHigh = "fruit_slush"
elements.juice_ice.tempHigh = -20
if(elements[iceelem]) {
	elements[iceelem].stateHigh = "fruit_slush"
	elements[iceelem].tempHigh = -20
}

// fruit milk with milk
elements.fruit_milk.reactions ??= {}; elements.fruit_milk.reactions.milk = { chance:1, func: function(pixel1, pixel2){
    let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.2);
        if (((newrgb.r + newrgb.g + newrgb.b) / 3) < 230) {
            changePixel(pixel1,"fruit_milk")
            changePixel(pixel2,"fruit_milk")
            pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
            pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        } else if (Math.random() < 0.05) {
            changePixel(pixel1,"fruit_milk")
            changePixel(pixel2,"fruit_milk")
            pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
            pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        }
    }
}
// fruit milk with nut milk
elements.fruit_milk.reactions.nut_milk = { chance:1, func: function(pixel1, pixel2){
    let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.2);
        if (((newrgb.r + newrgb.g + newrgb.b) / 3) < 230) {
            changePixel(pixel1,"fruit_milk")
            changePixel(pixel2,"fruit_milk")
            pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
            pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        } else if (Math.random() < 0.05) {
            changePixel(pixel1,"fruit_milk")
            changePixel(pixel2,"fruit_milk")
            pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
            pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        }
    }
}
// fruit milk with coconut milk
elements.fruit_milk.reactions.coconut_milk = { chance:1, func: function(pixel1, pixel2){
    let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.2);
        if (((newrgb.r + newrgb.g + newrgb.b) / 3) < 230) {
            changePixel(pixel1,"fruit_milk")
            changePixel(pixel2,"fruit_milk")
            pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
            pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        } else if (Math.random() < 0.05) {
            changePixel(pixel1,"fruit_milk")
            changePixel(pixel2,"fruit_milk")
            pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
            pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        }
    }
}
// fruit milk with cream
elements.fruit_milk.reactions.cream = { chance:1, func: function(pixel1, pixel2){
    let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.2);
        if (((newrgb.r + newrgb.g + newrgb.b) / 3) < 230) {
            changePixel(pixel1,"fruit_milk")
            changePixel(pixel2,"fruit_milk")
            pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
            pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        } else if (Math.random() < 0.05) {
            changePixel(pixel1,"fruit_milk")
            changePixel(pixel2,"fruit_milk")
            pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
            pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        }
    }
}
// fruit milk with fruit milk
elements.fruit_milk.reactions.fruit_milk = { chance:1, func: function(pixel1, pixel2){
    let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.2);
        changePixel(pixel1,"fruit_milk")
        changePixel(pixel2,"fruit_milk")
        pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
    }
}
// fruit milk onMix
elements.fruit_milk.onMix = function(pixel){
    let num = Math.floor(Math.random() * 4);
    let x = pixel.x + adjacentCoords[num][0];
    let y = pixel.y + adjacentCoords[num][1];
    if(!isEmpty(x,y) && !outOfBounds(x,y)){
      let pixel2 = pixelMap[x][y];
      if(pixel.color != pixel2.color && pixel2.element == "fruit_milk"){
        let condition;
        if(shiftDown == 0){
          condition = (Math.floor(Math.random() * 2) == 1); 
        } else {
          condition = true; 
        }
        if(condition){
          let newrgb = interpolateRgb(getRGB(pixel.color), getRGB(pixel2.color), 0.5);
          pixel.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
          pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        }
      }
    }
  }
