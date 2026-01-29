/*addMod("mossstuff.js");
removeMod("pizzasstuff.js");

reload(); */

// alert("THIS MOD IS NO LONGER SUPPORTED!\nThe mod 'pizzasstuff.s' and all of its contents have been moved to mossstuff.js.\nPlease install mossstuff.js to continue getting updates.");


elements.freeze_ray = {
	color: ["#8cf9ff","#5c59ff"],
    tick: function(pixel) {
        var x = pixel.x;
        for (var y = pixel.y; y < height; y++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.05) { continue }
                createPixel("flash", x, y);
                pixelMap[x][y].color = "#96b6ff";
                pixelMap[x][y].temp = -257;
            }
            else {
                if (elements[pixelMap[x][y].element].isGas) { continue }
                if (elements[pixelMap[x][y].element].id === elements.heat_ray.id) { break }
                pixelMap[x][y].temp -= 100;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: -257,
    category: "energy",
    state: "gas",
    excludeRandom: true,
    noMix: true
};

elements.devil_ray = {
	color: ["#ba0000","#8f0000"],
    tick: function(pixel) {
        var x = pixel.x;
        for (var y = pixel.y+1; y < height; y++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.1) { continue }
                createPixel("flash", x, y);
				pixelMap[x][y].color = ["#990000"];
            }
            else {
                if (elements[pixelMap[x][y].element].id === elements.flash.id) { continue }
                if (elements[pixelMap[x][y].element].id === elements.god_ray.id) { break }
                if (!elements[pixelMap[x][y].element].isGas && isEmpty(x, y-1)) {
                    createPixel("curse", x, y-1);
                }
                if (Math.random() > 0.1) { continue }
                elements.bless.tool(pixelMap[x][y])
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    category: "energy",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
};

elements.beer = {
	color: ["#ffc43d","#ffc43d"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 100,
    stateHigh: ["fire","steam","steam"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.root_beer = {
	color: ["#8b2f02","#732803"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    tempHigh: 100,
    stateHigh: ["fire","steam","steam"],
    isFood: true,
};

elements.fruit_slushy = {
	color: ["#d43968","#ec5885","#f57ca1","#fba9c2","#ffe3eb"],
	stateLowColorMultiplier: 1.3,
	stateLow: "slushy_ice",
	tempLow: "-50",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 100,
    stateHigh: ["fire","steam","steam"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.mold = {
	color: ["#b6d7a8","#6d9d5c","#ad8d6f"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
};

elements.chocolate_slushy = {
	color: ["#c3ae9a","#ae967f","#977b5f","#876b4f","#816346"],
	stateLowColorMultiplier: 1.3,
	tempLow: "-50",
	stateLow: "slushy_ice",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 100,
    stateHigh: ["fire","steam","steam"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.chocolate_sauce = {
	color: ["#491904","#54240b","#5e2d0b","#69371b","#764636"],
	density: 10,
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.chocolate_ice_cream = {
	color: ["#a47551","#523a28"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 1096,
	tempHigh: 15,
	stateHigh: "cream",
	temp: 0,
    isFood: true,
};

elements.fruit_ice_cream = {
	color: ["#f8d8d8","#f6c1c1","#e39898"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 1096,
	tempHigh: 15,
	stateHigh: "cream",
	temp: 0,
    isFood: true,
};

elements.snow_cone = {
	color: ["#ebfeed","#f4fff5","#fefaff","#fff3fe","#fcf2fb"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 1096,
	tempHigh: 15,
	stateHigh: "smashed_ice",
	temp: 0,
    isFood: true,
};

elements.mint_ice_cream = {

	color: ["#ebfdff","#d5fff7","#ceffe9","#dfffde","#daffd5"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 1096,
	tempHigh: 15,
	stateHigh: "cream",
	temp: 0,
    isFood: true,
	reactions: {
        "chocolate": { elem1: "mint_chocolate_ice_cream", elem2: null },
	}
};

elements.mint_chocolate_ice_cream = {
	color: ["#311e08","#d5fff7","#ceffe9","#dfffde","#daffd5",],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 1096,
	tempHigh: 15,
	stateHigh: "cream",
	temp: 0,
    isFood: true,
};


elements.chocolate_yogurt = {
	color: ["#a87848","#a57e57","#c1a07f","#e2c5ac","#efd0b1"],
	stateLowColorMultiplier: 1.3,
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempLow: 0,
	stateHigh: ["fire","steam","steam"],
	tempHigh: 450,
	stateLow: "frozen_chocolate_yogurt",
    isFood: true,
};

elements.fruit_yogurt = {
	color: ["#ffc3d8","#ffabd6","#ff96c5","#ff84c2","#ff5daf"],
	stateLowColorMultiplier: 1.3,
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempLow: 0,
	stateLow: "frozen_fruit_yogurt",
    isFood: true,
	stateHigh: ["fire","steam","steam"],
	tempHigh: 450,
};

elements.frozen_fruit_yogurt = {
	color: ["#ffdfdf","#ffc0c0","#ff9b9b"],
	stateHighColorMultiplier: 0.7,
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 902,
	tempHigh: 0,
	stateHigh: "fruit_yogurt",
	temp: 0,
    isFood: true,
};

elements.frozen_chocolate_yogurt = {
	color: ["#a87848","#a57e57","#c1a07f","#e2c5ac","#efd0b1"],
	stateHighColorMultiplier: 0.7,
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 902,
	tempHigh: 0,
	stateHigh: "chocolate_yogurt",
	temp: 0,
    isFood: true,
};

elements.frying_oil = {
	color: "#c4ab4f",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
        "meat": { elem1: null, elem2: "chicken_nuggets" },
		"potato": { elem1: null, elem2: "fries" },
		"advanced_dough": { elem1: null, elem2: "churros" },
		"snow": { elem1: null, elem2: "fried_snow" },
	},
    tempHigh: 350,
    stateHigh: ["fire","steam","steam"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.chicken_nuggets = {
	color: ["#8f411c","#a35935"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.advanced_dough = {
	color: ["#f3e6c6","#f9e8a2","#ebd27b","#dba94e","#c08932"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempHigh: 94,
	stateHigh: "croissant",
	reactions: {
        "electric": { elem1: "steampunk_pancakes", elem2: null },
	}
};

elements.fries = {
	color: ["#f4c63e","#f6d165","#f8dd8b"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
};

elements.fried_snow = {
	color: ["#f6c66a","#d29829","#905c1b"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.battery_acid = {
	color: ["#8fff00","#1de446"],
	behavior: behaviors.LIQUID,
	category: "machines",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["steam","dioxin","stench"],
    burn:3,
    burnTime:500,
    burnInto: ["steam","dioxin","stench"],
    isFood: true,
};


elements.steampunk_pancakes = {
	color: "#252a33",
	behavior: behaviors.POWDER,
	category: "machines",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
	//I have no idea why i added this, but when i removed it and started the mod, the mod removed itself. Words can't explain my fucking confusion.
};


elements.churros = {
	color: ["#ce9958","#b8732d","#9f633b"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
	reactions: {
		"chocolate": { elem1: "chocolate_churros", elem2: null },
		"chocolate_sauce": { elem1: "chocolate_churros", elem2: null },
	}
};

elements.chocolate_churros = {
	color: ["#9f6204","#875200","#764100","#582c00","#492100"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
};

/*elements.color_pick = {
	color: ["#ff0000","#ffd100","#00ff4b","#0005ff"],
    behavior: [
        "CF|CF|CF",
        "CF|DL%5|CF",
        "CF|CF|CF",
    ],
    category: "tools",
    maxSize: 0,
    darkText: true,
    canPlace: false,
    desc: "Use on a pixel to select its element."
};*/

elements.croissant = {
	color: ["#c68028","#ad7023","#905c1b","#794d16","#674112"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	breakInto: "crumb",
	tempHigh: 550,
	stateHigh: "ash",
	burnInto: "smoke"
};

elements.eggy_dough = {
	color: ["#df8c43","#e5a369","#ecba8e","#f2d1b4","#f9e8d9"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 75,
	stateHigh: "french_toast",
	burnInto: "smoke"
};

elements.french_toast = {
	color: ["#a77644","#af7b4b","#af7f57"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "crumb",
	tempHigh: 550,
	stateHigh: "ash",
	burnInto: "smoke"
};

elements.rose_sauce = {
	color: ["#db2300","#e24f33"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.seasoning = {
	color: ["#945239","#896251"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.parmesan = {
	color: ["#ffffdd","#ffffe4","#ffffeb","#fffff1","#fffff8"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.baking_powder = {
	color: "#fffaed",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	reactions: {
        "flour": { elem1: null, elem2: "advanced_dough" },
    },
    tempHigh: 350,
    stateHigh: ["fire","fire","ash"],
    burn:3,
    burnTime:500,
    burnInto: ["fire","smoke","smoke","steam","ash"],
    isFood: true,
};

elements.smashed_ice = {
	color: ["#e3fdff","#d1f7ff","#c0f7ff"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	 reactions: {
        "grape": { elem1: null, elem2: "fruit_slushy" },
        "blood_orange": { elem1: null, elem2: "fruit_slushy" },
        "canary_melon": { elem1: null, elem2: "fruit_slushy" },
        "honeydew_melon": { elem1: null, elem2: "fruit_slushy" },
        "cranberry": { elem1: null, elem2: "fruit_slushy" },
        "pitaya": { elem1: null, elem2: "fruit_slushy" },
        "coconut": { elem1: null, elem2: "fruit_slushy" },
        "cloudberry": { elem1: null, elem2: "fruit_slushy" },
        "crabapple": { elem1: null, elem2: "fruit_slushy" },
        "cactus_pear": { elem1: null, elem2: "fruit_slushy" },
        "pear": { elem1: null, elem2: "fruit_slushy" },
        "purpleberry": { elem1: null, elem2: "fruit_slushy" },
        "yellowberry": { elem1: null, elem2: "fruit_slushy" },
        "pomegranate": { elem1: null, elem2: "fruit_slushy" },
        "guava": { elem1: null, elem2: "fruit_slushy" },
        "raspberry": { elem1: null, elem2: "fruit_slushy" },
        "gooseberry": { elem1: null, elem2: "fruit_slushy" },
        "fig": { elem1: null, elem2: "fruit_slushy" },
        "durian": { elem1: null, elem2: "fruit_slushy" },
		"passionfruit": { elem1: null, elem2: "fruit_slushy" },
		"starfruit": { elem1: null, elem2: "fruit_slushy" },
		"rambutan": { elem1: null, elem2: "fruit_slushy" },
		"nance": { elem1: null, elem2: "fruit_slushy" },
		"nectarine": { elem1: null, elem2: "fruit_slushy" },
		"loganberry": { elem1: null, elem2: "fruit_slushy" },
		"currant": { elem1: null, elem2: "fruit_slushy" },
		"banana": { elem1: null, elem2: "fruit_slushy" },
		"blackberry": { elem1: null, elem2: "fruit_slushy" },
		"blueberry": { elem1: null, elem2: "fruit_slushy" },
		"green_apple": { elem1: null, elem2: "fruit_slushy" },
		"lemon": { elem1: null, elem2: "fruit_slushy" },
		"green_grape": { elem1: null, elem2: "fruit_slushy" },
		"cherry": { elem1: null, elem2: "fruit_slushy" },
		"apple": { elem1: null, elem2: "fruit_slushy" },
		"orange": { elem1: null, elem2: "fruit_slushy" },
		"kiwi": { elem1: null, elem2: "fruit_slushy" },
		"strawberry": { elem1: null, elem2: "fruit_slushy"},
		"chocolate": { elem1: null, elem2: "chocolate_slushy" },
		"chocolate_sauce": { elem1: null, elem2: "chocolate_slushy" },
    },
	density: 100,
	tempHigh: 25,
	stateHigh: "water",
	tempLow: -100,
	stateLow: "snow_cone",
};

elements.anti_torch = {
	color: "#d68542",
    behavior: [
        "XX|CR:cold_fire|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    reactions: {
        "water": { elem1:"wood" },
        "sugar_water": { elem1:"wood" },
        "salt_water": { elem1:"wood" },
        "seltzer": { elem1:"wood" },
        "dirty_water": { elem1:"wood" },
        "pool_water": { elem1:"wood" },
        "steam": { elem1:"wood" },
        "smog": { elem1:"wood" },
        "rain_cloud": { elem1:"wood" },
        "cloud": { elem1:"wood" },
        "snow_cloud": { elem1:"wood" },
        "hail_cloud": { elem1:"wood" },
        "thunder_cloud": { elem1:"wood" },
        "ice_nine": { elem1:"wood" }
    },
    temp:-250,
    category: "special",
    breakInto: "sawdust",
	insulate: true,
};

elements.moss = {
	color: ["#355438","#416044","#4c7450","#68946c","#81a984"],
	behavior: behaviors.STURDYPOWDER,
	category: "life",
	state: "solid",
	burn: 5,
	burnTime: 15,
	density: 1400,
	breakInto: "dead_plant",
	tempHigh: 120,
	stateHigh: "dead_plant",
	tempLow: -4,
	stateLow: "frozen_plant",
	alias: "mercedes benz",
	reactions: {
        "dna": { elem1: "moth", elem2: null },
	}
	
};

elements.moth = {
	color: ["#df8830","#e9b477","#a1591a","#a87a46","#4e3212"],
	behavior: behaviors.FLY,
	category: "life",
	state: "solid",
	burn: 95,
	burnTime: 25,
	density: 600,
	breakInto: "dead_bug",
	tempHigh: 100,
	stateHigh: "ash",
	tempLow: 0,
	stateLow: "dead_bug",
};

elements.holy_fire = {
	color: ["#FEFFF8","#FFF0CE","#FFE792"],
    behavior: [
        "M1|M1|M1",
        "M2|CH:bless%8|M2",
        "XX|M2|XX",
    ],
    reactions: {
        "fire": { elem1: "bless", elem2: "bless" },
        "plasma": { elem1: "light", elem2: "light" }
    },
    temp:750,
    tempLow:200,
	tempHigh:1200,
	stateLow: "bless",
    stateHigh: "bless",
    category: "energy",
    state: "gas",
    density: 0.1,
    ignoreAir: true
};

elements.curse = {
	color: ["#d27979","#bf4040","#752727"],
    tool: function(pixel) {
        if (elements.bless.ignore.indexOf(pixel.element) !== -1) { return; }
        if (pixel.burning) { // stop burning
            delete pixel.burning;
            delete pixel.burnStart;
        }
        if (pixel.temp > 100) {
            pixel.temp = (pixel.temp+100)/2;
            pixelTempCheck(pixel);
            if (pixel.del) {return}
        }
        if (pixel.temp < -200) {
            pixel.temp = (pixel.temp-200)/2;
            pixelTempCheck(pixel);
            if (pixel.del) {return}
        }
        if (pixel.origColor) {
            pixel.color = "rgb("+pixel.origColor.join(",")+")";
            delete pixel.origColor;
        }
        if (pixel.charge) {
            delete pixel.charge;
            pixel.chargeCD = 16;
        }
        if (elements.bless.reactions[pixel.element] && Math.random()<0.25) {
            var r = elements.bless.reactions[pixel.element];
            var elem2 = r.elem2;
            if (elem2 !== undefined) {
                if (Array.isArray(elem2)) { elem2 = elem2[Math.floor(Math.random()*elem2.length)]; }
                if (elem2 === null) { deletePixel(pixel.x,pixel.y) }
                else { changePixel(pixel, elem2); }
            }
            if (r.func) { r.func(pixel,pixel) }
        }
    },
    ignore: ["sun"],
    behavior: [
        "M2|M1|M2",
        "M1|DL%25|M1",
        "M2|M1|M2",
    ],
    reactions: {
        "cell": { elem2: "cancer" },
        "iron": { elem2: "rust" },
        "copper": { elem2: "oxidized_copper" },
        "antibody": { elem2:["blood",null] },
        "antibody_ice": { elem2:"blood_ice" },
        "dirty_water": { elem2: "water" },
        "dna": { elem2: "plague" },
        "antibody": { elem2: ["infection",null] },
        "infection": { elem2: ["infection",null] },
        "antidote": { elem2: "poison" },
        "meat": { elem2: "rotten_meat" },
        "cheese": { elem2: "rotten_cheese" },
        "oxygen": { elem2: "carbon_dioxide" },
        "hydrogen": { elem2: "acid_gas" },
        "cloud": { elem2: "fire_cloud" },
        "perfume": { elem2: "liquid_stench" },
        "fragrance": { elem2: "stench" },
        "seltzer": { elem2: "soda" },
        "cloud": { elem2: "smog" },
        "water": { elem2: "broth" },
        "bless": { elem2: "plasma" },
        "metal_scrap": { elem2: "grenade" },
        "smoke": { elem2: "greek_fire" },
        "rock": { elem2: "uranium", chance: 0.01},
        "magma": { elem2: "molten_uranium", chance: 0.01},
        "ice": { elem2: "ice_nine", chance: 0.01},
        "frog": { elem2: "frozen_frog" },
        "worm": { elem2: "frozen_worm" },
        "rock": { elem2: "molten_thermite", chance: 0.01},
        "glass": { elem2: "rad_glass", chance: 0.2 },
        "shard": { elem2: "rad_shard", chance: 0.2 },
        "steam": { elem2: "rad_steam", chance: 0.2 },
        "rain_cloud": { elem2: "rad_cloud", chance: 0.2 },
        "ball": { elem2: "ball", chance: 0.2 },
        "bone": { elem2: "bone_marrow", chance: 0.2 },
        "plant": { elem2: "dead_plant" },
        "rock": { elem2: "rock", chance: 0.01 },
        "magma": { elem2: "molten_slag", chance: 0.01 },
        "light": { elem2: "laser", chance: 0.2 },
        "flash": { elem2: "light", chance: 0.2 },
        "wood": { elem2: "torch", chance: 0.01 },
        "gold": { elem2: "lead", chance: 0.2 },
        "molten_gold": { elem2: "molten_lead", chance: 0.2 },
        "grass": { elem2: null },
        "rainbow": { elem2: "static" },
    },
    temp:20,
    state: "gas",
    density: 0.001,
    canPlace: true,
    category: "energy",
    stain: -0.5
};

elements.parrot = {
	color: ["#234d20","#36802d","#77ab59","#c9df8a","#f0f7da","#f90f0b","#f7ab4d","#fdfc0d","#0564b2","#60a3e6"],
	behavior: behaviors.FLY,
	category: "life",
	state: "solid",
	burn: 40,
	burnTime: 100,
	density: 400,
	breakInto: ["feather","blood"],
	tempHigh: 120,
	stateHigh: "cooked_meat",
	tempLow: -18,
	stateLow: "frozen_meat",
	reactions: {
        "fly": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "firefly": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL },
        "bee": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "worm": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "ant": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "dead_bug": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "lichen": { elem2:null, chance:0.04, func:behaviors.FEEDPIXEL },
        "termite": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "flea": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "mushroom_cap": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "mushroom_gill": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "seeds": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "flower_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "wheat_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "corn_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "corn": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "potato_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "grass_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "crumb": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "pumpkin": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "plague": { elem1:"plague", chance:0.05 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 }
    },
    foodNeed: 20,
    temp: 41,
    tempHigh: 120,
    stateHigh: "cooked_meat",
    stateHighColor: "#E4CFB9",
    tempLow: -18,
    stateLow: "frozen_meat",
    category:"life",
    burn:50,
    burnTime:100,
    breakInto: ["feather","blood"],
    state: "solid",
    density: 400,
    conduct: 0.5
};

elements.cherry = {
	color: ["#ff0000","#e30202","#c00000","#9c0101"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: "#450008",
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#bf4545","#982828"] },
	}
};

elements.strawberry = {
	color: ["#fb2943","#ff0033"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#bf0147","#c61548","#cc2857","#c62354","#c11848"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#a82953","#941540"] },
	}
};

elements.apple = {
	color: ["#fc3434","#f91515","#d30404","#9f0606","#aa0404"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ffda69","#ffdb84"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#f4ff49","#ffec2f"] },
	}
};

elements.green_apple = {
	color: ["#a8da61","#66cc00","#66cc33","#00cc00","#009900"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ffda69","#ffdb84"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#f4ff49","#ffec2f"] },
	}
};

elements.orange = {
	color: ["#ff9a00","#ffc100","#ff8100"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffc659","#ffb646","#ffa700","#ff8d00"],
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#fbd808","#ff9005"] },
	}
};

elements.kiwi = {
	color: ["#a9c77e","#61ab5a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#a9c77e","#bad98f"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#a5d04c","#bbdc79"] },
	}
};

elements.blueberry = {
	color: ["#3e476f","#49598c","#5076b0","#5086c1","#8aa4ff"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#8abeee","#8aacf4","#9591ee","#787fdb","#7c74ce"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#5086c1","#5076b0"] },
	}
};

elements.plum = {
	color: ["#b62d82","#951661","#7c1249","#52001e","#360011"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#bf66c9","#d499db","#eacced"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#d8b2d8","#b266b2"] },
	}
};

elements.blackberry = {
	color: ["#2b0521","#3e0930","#4f123e","#601a4c","#6b2356"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#a941a1","#ba59b2","#c570bf"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ba59b2","#c570bf"] },
	}
};

elements.peach = {
	color: ["#f6a192","#f6b092","#f6c492","#f6cf92","#f6d992"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#fce5b8","#fcdab8","#fccfb8"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ffe7dc","#ffdac8"] },
	}
};

elements.lemon = {
	color: ["#ffaa1d","#ffd300","#ffdf00","#ffff00","#fff44f"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#f8ff80","#f6ff6c","#f5ff57","#f3ff39","#f0ff00"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ffffd8","#fffecf"] },
	}
};

elements.green_grape = {
	color: ["#b6f271","#a1f02f","#97d60c","#65ba14","#8bc33a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#5f8536","#7ba84a"],
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ecffdc","#c3ffa8"] },
	}
};
elements.banana = {
	color: ["#ffb400","#ffc100","#ffdb00","#ffe700","#f0ff00"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: "#f0f060",
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#fdf8d6","#f9efa6"] },
	}
};

elements.blood_orange = {
	color: ["#db4437","#fc3d39","#e5302d","#f6602d","#f65026"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ff4600","#ff8353"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ffc7b4","#ffa485"] },
	}
};

elements.canary_melon = {
	color: ["#e9ff0c","#e9ff0c","#ffed0c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ffff9e","#fffcaa"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#e5ffb3","#ecff9c"] },
	}
};

elements.honeydew_melon = {
	color: ["#b9ffa3","#c9ffa3","#d9ffa3"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#e9ffa3","#f9ffa3"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#e8ffc9","#e8ffc8"] },
	}
};

elements.cranberry = {
	color: ["#471016","#7a1927","#69202f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "sauce",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ba4242","#7a1717"],
	reactions: {
        "soda": { elem1: null, elem2: "sprite_cranberry" },
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ffc0c5","#ff8f99"] },
	}
};

elements.pitaya = {
	color: ["#f6a9d8","#d4306e","#6ab81f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ff84ae","#ffafca"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ffd4e3","#ffafca"] },
	}
};

elements.coconut = {
	color: ["#6b3314","#583203","#673e1c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "milk",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#f7e5d8","#fdefe5","#fff7f1"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#fff2db","#ffefd4"] },
	}
};

elements.cloudberry = {
	color: ["#ff9636","#ffb169","#ffc896"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ffe1c7","#fff9f3"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ffd7ab","#ffcb93"] },
	}
};

elements.crabapple = {
	color: ["#850b0b","#a32d2d","#ab4545"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ff8fcf","#ffb2de"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ffd2ec","#ffb2de"] },
	}
};

elements.cactus_fruit = {
	color: ["#ff95b0","#ff80a0","#ff7489"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#75d802","#72d202"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#bbffc1","#84ff90"] },
	}
};

elements.pear = {
	color: ["#669900","#669933","#9ec419"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#c8e39e","#99cc99"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#c3ff9c","#bcff92"] },
	}
};

elements.purpleberry = {
	color: ["#8b04a8","#a236b9","#b968cb"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#c08cc3","#e49cc2"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#fee6e4","#fbc3c4"] },
	}
};

elements.yellowberry = {
	color: ["#ffe505","#fffb05","#fdfa72"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#fffec8","#fffdaf"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#fffec8","#fffdaf"] },
	}
};

elements.pomegranate = {
	color: ["#950000","#c93434","#df5555","#8f163f","#6d0606"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ee717f","#e94254"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#f4a1a9","#ee717f"] },
	}
};

elements.guava = {
	color: ["#1ae132","#44e788","#0a7a22"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ff5a76","#ff8fa2"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#f6c8cd","#f2acb5"] },
	}
};

elements.raspberry = {
	color: ["#f90064","#980036","#60081a"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#f23a72","#fb79a0"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ffb1f4","#ff91ce"] },
	}
};

elements.gooseberry = {
	color: ["#63041c","#760024","#81052a"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#8b0031","#920436"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#f1ffdb","#e3ffb7"] },
	}
};

elements.fig = {
	color: ["#1d1d3b","#2a2854","#402459"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ff4a4a","#ea3838"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ff8d8d","#ffabab"] },
	}
};

elements.durian = {
	color: ["#b07939","#c09461","#d0af88"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#faffaf","#fbffbf"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#feffe7","#f9ffb3"] },
	}
};

elements.passionfruit = {
	color: ["#9d3385","#b15c9d","#c485b6"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ffdede","#ffe4e4"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#d8adce","#c485b6"] },
	}
};

elements.starfruit = {
	color: ["#d5eb00","#ddef33","#e6f366"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#f2d553","#f5dd75"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#faeeba","#f7e698"] },
	}
};

elements.rambutan = {
	color: ["#ff4a4a","#ea3838"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#faffaf","#fbffbf"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#fde0e0","#f4c1c1"] },
	}
};

elements.nance = {
	color: ["#ffff00","#ffff33"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ffff66","#ffff99"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#fffee0","#fffec8"] },
	}
};

elements.nectarine = {
	color: ["#c92c0f","#cc4c58","#ea6161"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ffbd8b","#ffdbc0"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#ffc3ad","#ffa584"] },
	}
};

elements.loganberry = {
	color: ["#db1515","#e53939","#fd5f5f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ff8f8f","#ffb7b7"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#9c91a5","#bdb5c3"] },
	}
};

elements.currant = {
	color: ["#ff1828","#ff505c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#ff878f","#ffbcc0"],
	reactions: {
		"sugar": { elem1: "jelly", elem2: null, tempMin: 100, color1: ["#cc6b69","#bb3a37"] },
	}
};

elements.sprite_cranberry = {
	color: ["#65000f","#89001c","#b40024"],
	behavior: [
        "XX|CR:foam%2|XX",
        "M2|XX|M2",
        "M2|M1|M2",
    ],
	category: "liquids",
	state: "solid",
};

elements.mint = {
	color: ["#72e88d","#53bd6c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	reactions: {
        "cream": { elem1: null, elem2: "toorhpaste" },
		"ice_cream": { elem1: null, elem2: "mint_ice_cream" },
	}
};

elements.broccoli = {
	color: ["#004909","#046b00","#0b8500"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#00b215","#0b8500"],
};

elements.broccoli_seed = {
    color: "#b6c981",
    behavior: [
        "XX|M2%0.25|XX",
        "XX|L2:broccoli AND C2:broccoli%30|XX",
        "XX|M1|XX",
    ],
    tempHigh: 400,
    stateHigh: "fire",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 50,
    burnTime: 20,
    breakInto: null,
    category: "life",
    state: "solid",
    density: 769,
    hidden: true,
    cooldown: defaultCooldown,
    seed: true,
};

elements.hot_pepper = {
	color: ["#ffd013","#fb8a24","#ff5c3a","#d61439","#81032d"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	reactions: {
        "sauce": { elem1: null, elem2: "hot_sauce" },
	}
};

elements.hot_sauce = {
	color: ["#ff0000","#f00000","#d20000","#c50000","#b00000"],
	behavior: behaviors.LIQUID,
	density: 10,
	category: "food",
	state: "solid",
};

elements.squash = {
	color: ["#f2ab15","#f5bc44","#f7cd73"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#efbe79","#ffd599"],
};

elements.zuchinni = {
	color: ["#375822","#58704a","#73816a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	breakIntoColor: ["#80a568","#a3c88c"],
};

elements.olive = {
	color: ["#445626","#52682d","#6e8b3d"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "olive_oil",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.eggplant = {
	color: ["#490b43","#30093a","#23033a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#674ea7","#351c75"],
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.onion = {
	color: ["#62121b","#a92940","#c04b65","#d8699e"],
	behavior: 
	[
		["XX","CH:onion>stench","XX"],
		["XX","XX","XX"],
		["XX","M1","XX"]
	],
	category: "food",
	state: "solid",
	breakInto: ["stench", null, null, null, null],
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.cinnamon = {
	color: ["#cda67a","#986544","#6a462f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.garlic = {
	color: ["#f7f3e1","#f6f3c3","#f0e6bd"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "garlic_clove",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.garlic_clove = {
	color: ["#b8b17f","#6b5628"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.carrot = {
	color: ["#ea820b","#e89116","#e8a32b","#efb538"],
	density: 675,
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	burnInto: "ash",
	burn: 10,
	burnTime: 300,
	breakInto: "juice",
	breakIntoColor: "#f1b956",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.asparagus = {
	color: ["#77ab56","#92bc78","#adcd9a"],
	density: 675,
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 173,
	stateHigh: "roasted_asparagus",
	burnInto: "ash",
	burn: 10,
	burnTime: 300,
	breakInto: "juice",
	breakIntoColor: "#c9ddbb",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.roasted_asparagus = {
	color: ["#849273","#9aa58d","#c0cbb3"],
	density: 675,
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	breakInto: "juice",
	breakIntoColor: ["#849273","#9aa58d","#c0cbb3"],
	tempHigh: 400,
	stateHigh: "ash",
	burnInto: "ash",
	burn: 20,
	burnTime: 300,
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.oreo = {
	color: "#120600",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
	reactions: {
		"toorhpaste": { elem1: "poison_oreo", elem2: null },
	}
};

elements.poison_oreo = {
	color: "#001112",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.sprinkles = {
	color: ["#fbfa8f","#c5ecbd","#7ac7bf","#f29fa9","#e1848e"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.whipped_cream = {
	color: ["#fffff0","#fffff3","#fffff6","#fffff9","#fffffc"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempHigh: 130,
	stateHigh: "steam",
	isFood: true,
};

elements.olive_oil = {
	color: ["#efcc3f","#efd672","#f1e09a"],
	density: 675,
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
	burn: 10,
	burnTime: 300,
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.seafoam = {
	color: ["#a3c1ad","#a0d6b4","#5f9ea0","#317873","#49796b"],
	behavior: behaviors.LIQUID,
	category: "life",
	state: "solid",
};

elements.pipis = {
	color: ["#00BFFF","#0085B0"],
	behavior: behaviors.POWDER,
	category: "life",
	state: "solid",
	tempHigh: 256,
	stateHigh: "steam",
	isFood: true,
};

elements.frog_bomb = {	
    color: ["#0f2105","#274e13","#6aa84f"],
    behavior: [
        "XX|EX:10>frog|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>frog|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    cooldown: defaultCooldown
},

elements.cash_bomb = {	
    color: ["#e69138","#f1c232","#f6b26b"],
    behavior: [
        "XX|EX:10>gold_coin|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>gold_coin|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    cooldown: defaultCooldown
},

elements.pi_pis = {	
    color: ["#0b5394","#073763","#3d85c6"],
    behavior: [
        "XX|EX:10>pipis|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>pipis|M2",
    ],
    behaviorOn: [
        "XX|XX|XX",
        "XX|EX:6>metal_scrap,fire,fire,fire%1|XX",
        "XX|XX|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    conduct: 1,
    cooldown: defaultCooldown,
    nocheer: true
},

elements.holy_hand_grenade = {	
    color: ["#ffd966","#ffc000","#fff2cc"],
    behavior: [
		"XX|EX:20>bless,holy_fire%1|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:20>bless,holy_fire%1|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "bless",
    excludeRandom: true,
    cooldown: defaultCooldown
},

elements.unholy_feet_bomb = {	
    color: ["#661a0e","#6b1f13","#803226"],
    behavior: [
		"XX|EX:20>curse,fire%1|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:20>curse,fire%1|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "curse",
    excludeRandom: true,
    cooldown: defaultCooldown,
},

//for(i = 1, i++, i>10){
 
//}
/*
for (let i = 0; i < 100; i++) {
	if(unholy_feet_bomb.hidden == false) {
		if(curse.hidden == false) {
			if(holy_hand_grenade.hidden == false) {
				unholy_feet_bomb.hidden = false;
			}
		}
	}
	i = 0;
  }
  */


elements.chocolate_fountain = {
    color: "#3e1d07",
    behavior: [
        "XX|CR:melted_chocolate|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    category:"special",
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    conduct: 0.42,
	state: "solid",
};

elements.legacy_rocket = {
	color: "#ff0000",
    behavior: [
        "XX|M1|XX",
        "XX|DL%1|XX",
        "CR:smoke|CR:fire|CR:smoke",
    ],
    category: "legacy",
    hidden:true,
    state: "solid",
    temp:700,
    density: 7300,
    conduct: 0.73,
    tempHigh: 1455.5,
    stateHigh: "molten_steel"
};

elements.legacy_dough = {
	color: "#bfac91",
    behavior: behaviors.STURDYPOWDER,
    onMix: function(dough,ingredient) {
        if (elements[ingredient.element].isFood && elements[ingredient.element].id !== elements.dough.id && elements[ingredient.element].id !== elements.flour.id && elements[ingredient.element].id !== elements.batter.id && elements[ingredient.element].id !== elements.bread.id) {
            var rgb1 = dough.color.match(/\d+/g);
            var rgb2 = ingredient.color.match(/\d+/g);
            // average the colors
            var rgb = [
                Math.round((parseInt(rgb1[0])+parseInt(rgb2[0]))/2),
                Math.round((parseInt(rgb1[1])+parseInt(rgb2[1]))/2),
                Math.round((parseInt(rgb1[2])+parseInt(rgb2[2]))/2)
            ];
            changePixel(ingredient, "dough")
            // convert rgb to hex
            var hex = RGBToHex(rgb);
            dough.color = pixelColorPick(dough, hex);
            // 50% change to delete ingredient
            if (Math.random() < 0.5) { deletePixel(ingredient.x, ingredient.y); }
            else {
                ingredient.color = pixelColorPick(ingredient, hex);
            }
        }
    },
    reactions: {
        "milk": { elem2:"broth", color2:"#ECC891", tempMin:70 },
        "cream": { elem2:"broth", color2:"#ECC891", tempMin:70 },
    },
    category: "legacy",
    tempHigh: 94,
    stateHigh: "bread",
    //stateHighColorMultiplier: 0.9,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true
};

elements.legacy_batter = {
	color: "#d4bc85",
    behavior: behaviors.LIQUID,
    onMix: function(batter,ingredient) {
        if (elements[ingredient.element].isFood && elements[ingredient.element].id !== elements.batter.id && elements[ingredient.element].id !== elements.flour.id && elements[ingredient.element].id !== elements.yolk.id && elements[ingredient.element].id !== elements.dough.id && elements[ingredient.element].id !== elements.baked_batter.id) {
            var rgb1 = batter.color.match(/\d+/g);
            var rgb2 = ingredient.color.match(/\d+/g);
            // average the colors
            var rgb = [
                Math.round((parseInt(rgb1[0])+parseInt(rgb2[0]))/2),
                Math.round((parseInt(rgb1[1])+parseInt(rgb2[1]))/2),
                Math.round((parseInt(rgb1[2])+parseInt(rgb2[2]))/2)
            ];
            changePixel(ingredient, "batter")
            // convert rgb to hex
            var hex = RGBToHex(rgb);
            batter.color = pixelColorPick(batter, hex);
            // 50% change to delete ingredient
            if (Math.random() < 0.5) { deletePixel(ingredient.x, ingredient.y); }
            else {
                ingredient.color = pixelColorPick(ingredient, hex);
            }
        }
    },
    category: "legacy",
    tempHigh: 94,
    stateHigh: "baked_batter",
    stateHighColorMultiplier: 0.9,
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "liquid",
    viscosity: 10000,
    density: 1001,
    hidden: true,
    isFood: true
};

elements.legacy_lattice = {
	color: "#cb4cd9",
    behavior: [
        "CL|XX|CL",
        "XX|XX|XX",
        "CL|XX|CL",
    ],
    hidden: true,
    category:"legacy",
    excludeRandom: true
};

elements.top_lattice = {
	color: "#cb4cd9",
    behavior: [
        "CL|XX|CL",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    hidden: true,
    category:"special",
    excludeRandom: true
};

elements.bottom_lattice = {
	color: "#cb4cd9",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "CL|XX|CL",
    ],
    hidden: true,
    category:"special",
    excludeRandom: true
};

elements.right_lattice = {
	color: "#cb4cd9",
    behavior: [
        "XX|XX|CL",
        "XX|XX|XX",
        "XX|XX|CL",
    ],
    hidden: true,
    category:"special",
    excludeRandom: true
};

elements.left_lattice = {
	color: "#cb4cd9",
    behavior: [
        "CL|XX|XX",
        "XX|XX|XX",
        "CL|XX|XX",
    ],
    hidden: true,
    category:"special",
    excludeRandom: true
};

elements.amethyst = {
	color: ["#9868e0","#482888","#7848b8","#c898f0","#a878f0"],
    behavior: behaviors.POWDER,
    hidden: true,
    category: "powders",
};

elements.quartz = {
	color: ["#f6fff9","#f3f9f9","#f6fcf9","#fefefe","#fdfffe"],
    behavior: behaviors.POWDER,
    hidden: true,
    category: "powders",
	tempHigh: 1900,
	stateHigh: "magma",
	reactions: {
		"molten_iron": { elem1: "amethyst", elem2: null },
	}
};

elements.ruby = {
	color: ["#850014","#ae001a","#e10531","#a50727","#6b0015"],
    behavior: behaviors.POWDER,
    category: "powders",
    tempHigh: 900,
    stateHigh: "carbon_dioxide",
    state: "solid",
    density: 3515,
    hardness: 1,
	alias: "Lamp Oil, Rope, Bombs, you want it? It's yours my friend, as long as you have enough rubies.",
};

elements.slushy_ice = {
	color: ["#f6fff9","#f3f9f9","#f6fcf9","#fefefe","#fdfffe"],
    behavior: behaviors.WALL,
    temp: -5,
    tempHigh: 5,
    stateHigh: "smashed_ice",
    category: "states",
    state: "solid",
    density: 917,
    breakInto: "smashed_ice",
	isFood: true,
};

elements.toorhpaste = {
	color: ["#31ffe0","#65ffe8","#97ffef","#c9fff7","#f3fffd"],
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
		"juice": { elem1: "poison", elem2: null },
	},
	tempHigh: 170,
	stateHigh: "steam",
	isFood: true,
};

if (!elements.lettuce.reactions) elements.lettuce.reactions = {};
elements.lettuce.reactions.ice_cream = { elem1: "moss", elem2: null }

if (!elements.advanced_dough.reactions) elements.advanced_dough.reactions = {};
elements.advanced_dough.reactions.yolk = { elem1: "eggy_dough", elem2: null }

if (!elements.yeast.reactions) elements.yeast.reactions = {};
elements.yeast.reactions.flour = { elem1: "beer", elem2: null }

if (!elements.beer.reactions) elements.beer.reactions = {};
elements.beer.reactions.fiber = { elem1: "root_beer", elem2: null }

if (!elements.cheese.reactions) elements.cheese.reactions = {};
elements.cheese.reactions.seasoning = { elem1: "parmesan", elem2: null }

if (!elements.sodium.reactions) elements.sodium.reactions = {};
elements.sodium.reactions.neutral_acid = { elem1: "baking_powder", elem2: null }

if (!elements.toast.reactions) elements.toast.reactions = {};
elements.toast.reactions.chocolate = { elem1: "oreo", elem2: null }

if (!elements.ketchup.reactions) elements.ketchup.reactions = {};
elements.ketchup.reactions.mayo = { elem1: "rose_sauce", elem2: null }

if (!elements.bread.reactions) elements.bread.reactions = {};
elements.bread.reactions.rotten_cheese = { elem1: "mold", elem2: null }

if (!elements.bread.reactions) elements.bread.reactions = {};
elements.bread.reactions.dirty_water = { elem1: "mold", elem2: null }

if (!elements.toast.reactions) elements.toast.reactions = {};
elements.toast.reactions.rotten_cheese = { elem1: "mold", elem2: null }

if (!elements.toast.reactions) elements.toast.reactions = {};
elements.toast.reactions.dirty_water = { elem1: "mold", elem2: null }

if (!elements.baked_batter.reactions) elements.baked_batter.reactions = {};
elements.baked_batter.reactions.rotten_cheese = { elem1: "mold", elem2: null }

if (!elements.baked_batter.reactions) elements.baked_batter.reactions = {};
elements.baked_batter.reactions.dirty_water = { elem1: "mold", elem2: null }

if (!elements.bread.reactions) elements.bread.reactions = {};
elements.bread.reactions.worm = { elem1: "mold", elem2: null }

if (!elements.bread.reactions) elements.bread.reactions = {};
elements.bread.reactions.mud = { elem1: "mold", elem2: null }

if (!elements.toast.reactions) elements.toast.reactions = {};
elements.toast.reactions.worm = { elem1: "mold", elem2: null }

if (!elements.toast.reactions) elements.toast.reactions = {};
elements.toast.reactions.mud = { elem1: "mold", elem2: null }

if (!elements.baked_batter.reactions) elements.baked_batter.reactions = {};
elements.baked_batter.reactions.worm = { elem1: "mold", elem2: null }

if (!elements.baked_batter.reactions) elements.baked_batter.reactions = {};
elements.baked_batter.reactions.mud = { elem1: "mold", elem2: null }

elements.sugar_ice.breakInto = "smashed_ice"

elements.algae.breakInto = "seafoam"

elements.battery.breakInto = "battery_acid"

elements.art.burn = 5
elements.art.burnTime = 300
elements.art.burnInto = ["ember","charcoal","fire"]


elements.herb.breakInto = "seasoning"

elements.chocolate.breakInto = "chocolate_sauce"

elements.magma.stateLow = ["basalt","basalt","basalt","basalt","basalt","basalt","basalt","rock","quartz"]

if (!elements.bless.reactions) elements.bless.reactions = {};
elements.bless.reactions.mold = { elem2: null }

if (!elements.vinegar.reactions) elements.vinegar.reactions = {};
elements.vinegar.reactions.broccoli = { elem1: null, elem2: "pickle" }

if (!elements.vinegar.reactions) elements.vinegar.reactions = {};
elements.vinegar.reactions.squash = { elem1: null, elem2: "pickle" }

if (!elements.vinegar.reactions) elements.vinegar.reactions = {};
elements.vinegar.reactions.zuchinni = { elem1: null, elem2: "pickle" }

if (!elements.vinegar.reactions) elements.vinegar.reactions = {};
elements.vinegar.reactions.olive = { elem1: null, elem2: "pickle" }

if (!elements.vinegar.reactions) elements.vinegar.reactions = {};
elements.vinegar.reactions.eggplant = { elem1: null, elem2: "pickle" }

if (!elements.vinegar.reactions) elements.vinegar.reactions = {};
elements.vinegar.reactions.onion = { elem1: null, elem2: "pickle" }

if (!elements.vinegar.reactions) elements.vinegar.reactions = {};
elements.vinegar.reactions.garlic = { elem1: null, elem2: "pickle" }

if (!elements.vinegar.reactions) elements.vinegar.reactions = {};
elements.vinegar.reactions.garlic_clove = { elem1: null, elem2: "pickle" }

if (!elements.vinegar.reactions) elements.vinegar.reactions = {};
elements.vinegar.reactions.asparagus = { elem1: null, elem2: "pickle" }

if (!elements.vinegar.reactions) elements.vinegar.reactions = {};
elements.vinegar.reactions.asparagus = { elem1: null, elem2: "pickle" }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.grape = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.jelly = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.cherry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.orange = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.kiwi = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.green_grape = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.blood_orange = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.canary_melon = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.honeydew_melon = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.cranberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.pitaya = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.coconut = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.cloudberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.crabapple = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.cactus_fruit = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.pear = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.purpleberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.yellowberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.pomegranate = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.guava = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.raspberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.gooseberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.fig = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.durian = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.passionfruit = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.starfruit = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.rambutan = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.nance = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.nectarine = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.loganberry = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.currant = { elem1: "fruit_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.chocolate = { elem1: "chocolate_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.chocolate_sauce = { elem1: "chocolate_ice_cream", elem2: null }

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.melted_chocolate = { elem1: "chocolate_ice_cream", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.grape = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.green_grape = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.cherry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.kiwi = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.orange = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.jelly = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.chocolate = { elem1: "chocolate_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.chocolate_sauce = { elem1: "chocolate_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.melted_chocolate = { elem1: "chocolate_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.blood_orange = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.canary_melon = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.honeydew_melon = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.cranberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.pitaya = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.coconut = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.cloudberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.crabapple = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.cactus_fruit = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.pear = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.purpleberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.yellowberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.pomegranate = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.guava = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.raspberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.gooseberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.fig = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.durian = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.passionfruit = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.starfruit = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.rambutan = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.nance = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.nectarine = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.loganberry = { elem1: "fruit_yogurt", elem2: null }

if (!elements.yogurt.reactions) elements.yogurt.reactions = {};
elements.yogurt.reactions.currant = { elem1: "fruit_yogurt", elem2: null }


//dev notes area below
/*
uhhhh i just finished changing every color in the mod and now i have enough hex codes for a lifetime
oh god i added like 2 million new fruits
*/
