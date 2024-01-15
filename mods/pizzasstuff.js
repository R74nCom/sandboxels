elements.beer = {
	color: ["#ffc43d","#ffc43d"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.root_beer = {
	color: ["#8b2f02","#732803"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.fruit_slushy = {
	color: ["#d43968","#ec5885","#f57ca1","#fba9c2","#ffe3eb"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.mold = {
	color: ["#b6d7a8","#6d9d5c","#ad8d6f"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.chocolate_slushy = {
	color: ["#c3ae9a","#ae967f","#977b5f","#876b4f","#816346"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.chocolate_sauce = {
	color: ["#491904","#54240b","#5e2d0b","#69371b","#764636"],
	density: 10,
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
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
};


elements.chocolate_yogurt = {
	color: ["#654321","#71512b","#7e5f36","#8a6e42","#967d50"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempLow: 0,
	stateLow: "frozen_chocolate_yogurt",
};

elements.fruit_yogurt = {
	color: ["#ffc3d8","#ffabd6","#ff96c5","#ff84c2","#ff5daf"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempLow: 0,
	stateLow: "frozen_fruit_yogurt",
};

elements.frozen_fruit_yogurt = {
	color: ["#ffdfdf","#ffc0c0","#ff9b9b"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 902,
	tempHigh: 0,
	stateHigh: "fruit_yogurt",
	temp: 0,
};

elements.frozen_chocolate_yogurt = {
	color: ["#a87848","#a57e57","#c1a07f","#e2c5ac","#efd0b1"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	density: 902,
	tempHigh: 0,
	stateHigh: "chocolate_yogurt",
	temp: 0,
};

elements.cooking_oil = {
	color: "#c4ab4f",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
        "meat": { elem1: null, elem2: "chicken_nuggets" },
		"potato": { elem1: null, elem2: "fries" },
		"advanced_dough": { elem1: null, elem2: "churros" },
		"snow": { elem1: null, elem2: "fried_snow" },
	}
};

elements.chicken_nuggets = {
	color: ["#8f411c","#a35935"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
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
};

elements.fried_snow = {
	color: ["#f6c66a","#d29829","#905c1b"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.battery_acid = {
	color: ["#8fff00","#1de446"],
	behavior: behaviors.LIQUID,
	category: "machines",
	state: "solid",
	hidden: "TRUE",
};


elements.steampunk_pancakes = {
	color: "#252a33",
	behavior: behaviors.POWDER,
	category: "machines",
	state: "solid",
	hidden: "TRUE",
	//I have no idea why i added this, but when i removed it and started the mod, the mod removed itself. Words can't explain my fucking confusion.
};


elements.churros = {
	color: ["#ce9958","#b8732d","#9f633b"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
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
};

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
};

elements.seasoning = {
	color: ["#945239","#896251"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
};

elements.parmesan = {
	color: ["#ffffdd","#ffffe4","#ffffeb","#fffff1","#fffff8"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
};

elements.baking_powder = {
	color: "#fffaed",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	reactions: {
        "flour": { elem1: null, elem2: "advanced_dough" },
    },
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
		"juice": { elem1: null, elem2: "fruit_slushy" },
		"chocolate_sauce": { elem1: null, elem2: "chocolate_slushy" },
    },
	density: 100,
	tempHigh: 25,
	stateHigh: "water",
	tempLow: -100,
	stateLow: "snow",
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
	
	reactions: {
        "dna": { elem1: "moth", elem2: null },
	}
	
};

elements.moth = {
	color: "#665233",
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
	breakIntoColor: "#450008",
	reactionsColor: "#450008",
};

elements.strawberry = {
	color: ["#fb2943","#ff0033"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#bf0147","#c61548","#cc2857","#c62354","#c11848"],
};

elements.apple = {
	color: ["#fc3434","#f91515","#d30404","#9f0606","#aa0404"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#ffda69","#ffdb84"],
};

elements.green_apple = {
	color: ["#a8da61","#66cc00","#66cc33","#00cc00","#009900"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#ffda69","#ffdb84"],
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
};

elements.kiwi = {
	color: ["#a9c77e","#61ab5a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#a9c77e","#bad98f"],
};

elements.blueberry = {
	color: ["#3e476f","#49598c","#5076b0","#5086c1","#8aa4ff"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#8abeee","#8aacf4","#9591ee","#787fdb","#7c74ce"],
};

elements.plum = {
	color: ["#b62d82","#951661","#7c1249","#52001e","#360011"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#bf66c9","#d499db","#eacced"],
};

elements.blackberry = {
	color: ["#2b0521","#3e0930","#4f123e","#601a4c","#6b2356"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#a941a1","#ba59b2","#c570bf"],
};

elements.peach = {
	color: ["#f6a192","#f6b092","#f6c492","#f6cf92","#f6d992"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#fce5b8","#fcdab8","#fccfb8"],
};

elements.lemon = {
	color: ["#ffaa1d","#ffd300","#ffdf00","#ffff00","#fff44f"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	tempHigh: 256,
	stateHigh: "steam",
	breakIntoColor: ["#f8ff80","#f6ff6c","#f5ff57","#f3ff39","#f0ff00"],
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
};

elements.banana = {
	color: ["#ffb400","#ffc100","#ffdb00","#ffe700","#f0ff00"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: "#f0f060",
	reactions: {
        "steam": { elem1: "potassium", elem2: null },
	}
};

elements.blood_orange = {
	color: ["#db4437","#fc3d39","#e5302d","#f6602d","#f65026"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff4600","#ff8353"],
};

elements.canary_melon = {
	color: ["#e9ff0c","#e9ff0c","#ffed0c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffff9e","#fffcaa"],
};

elements.honeydew_melon = {
	color: ["#b9ffa3","#c9ffa3","#d9ffa3"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#e9ffa3","#f9ffa3"],
};

elements.cranberry = {
	color: ["#471016","#7a1927","#69202f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "sauce",
	breakIntoColor: ["#ba4242","#7a1717"],
	reactions: {
        "soda": { elem1: null, elem2: "sprite_cranberry" },
	}
};

elements.pitaya = {
	color: ["#f6a9d8","#d4306e","#6ab81f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff84ae","#ffafca"],
};

elements.coconut = {
	color: ["#6b3314","#583203","#673e1c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "milk",
	breakIntoColor: ["#f7e5d8","#fdefe5","#fff7f1"],
};

elements.cloudberry = {
	color: ["#ff9636","#ffb169","#ffc896"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffe1c7","#fff9f3"],
};

elements.crabapple = {
	color: ["#850b0b","#a32d2d","#ab4545"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff8fcf","#ffb2de"],
};

elements.cactus_fruit = {
	color: ["#ff95b0","#ff80a0","#ff7489"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#75d802","#72d202"],
};

elements.pear = {
	color: ["#669900","#669933","#9ec419"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#c8e39e","#99cc99"],
};

elements.purpleberry = {
	color: ["#8b04a8","#a236b9","#b968cb"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#c08cc3","#e49cc2"],
};

elements.yellowberry = {
	color: ["#ffe505","#fffb05","#fdfa72"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#fffec8","#fffdaf"],
};

elements.pomegranate = {
	color: ["#950000","#c93434","#df5555","#8f163f","#6d0606"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ee717f","#e94254"],
};

elements.guava = {
	color: ["#1ae132","#44e788","#0a7a22"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff5a76","#ff8fa2"],
};

elements.raspberry = {
	color: ["#f90064","#980036","#60081a"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#f23a72","#fb79a0"],
};

elements.gooseberry = {
	color: ["#63041c","#760024","#81052a"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#8b0031","#920436"],
};

elements.fig = {
	color: ["#1d1d3b","#2a2854","#402459"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff4a4a","#ea3838"],
};

elements.durian = {
	color: ["#b07939","#c09461","#d0af88"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#faffaf","#fbffbf"],
};

elements.passionfruit = {
	color: ["#9d3385","#b15c9d","#c485b6"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffdede","#ffe4e4"],
};

elements.starfruit = {
	color: ["#d5eb00","#ddef33","#e6f366"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#f2d553","#f5dd75"],
};

elements.rambutan = {
	color: ["#ff4a4a","#ea3838"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#faffaf","#fbffbf"],
};

elements.nance = {
	color: ["#ffff00","#ffff33"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffff66","#ffff99"],
};

elements.nectarine = {
	color: ["#c92c0f","#cc4c58","#ea6161"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ffbd8b","#ffdbc0"],
};

elements.loganberry = {
	color: ["#db1515","#e53939","#fd5f5f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff8f8f","#ffb7b7"],
};

elements.currant = {
	color: ["#ff1828","#ff505c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#ff878f","#ffbcc0"],
};

elements.sprite_cranberry = {
	color: ["#65000f","#89001c","#b40024"],
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
};

elements.mint = {
	color: ["#72e88d","#53bd6c"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
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
	breakIntoColor: ["#00b215","#0b8500"],
};

elements.squash = {
	color: ["#f2ab15","#f5bc44","#f7cd73"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#efbe79","#ffd599"],
};

elements.zuchinni = {
	color: ["#375822","#58704a","#73816a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#80a568","#a3c88c"],
};

elements.olive = {
	color: ["#445626","#52682d","#6e8b3d"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#d1ef71","#c1d64d"],
};

elements.eggplant = {
	color: ["#490b43","#30093a","#23033a"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#674ea7","#351c75"],
};

elements.potassium = {
	color: "#a3a333",
	behavior: behaviors.POWDER,
	category: "states",
	state: "solid",
	breakInto: "juice",
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
};

elements.cinnamon = {
	color: ["#cda67a","#986544","#6a462f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.garlic = {
	color: ["#f7f3e1","#f6f3c3","#f0e6bd"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "garlic_clove",
};

elements.garlic_clove = {
	color: ["#b8b17f","#6b5628"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
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
};

elements.oreo = {
	color: "#120600",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
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
};

elements.cream_coffee = {
	color: ["#dbc1ac","#967259","#634832"],
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
	hidden: "TRUE",
	tempLow: 0,
	stateLow: "coffee_ice",
	tempHigh: 130,
	stateHigh: ["steam","fragrance"],
};

elements.seafoam = {
	color: ["#a3c1ad","#a0d6b4","#5f9ea0","#317873","#49796b"],
	behavior: behaviors.LIQUID,
	category: "life",
	state: "solid",
};


elements.toorhpaste = {
	color: ["#31ffe0","#65ffe8","#97ffef","#c9fff7","#f3fffd"],
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
		"juice": { elem1: "poison", elem2: null },
	}
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

elements.herb.breakInto = "seasoning"

elements.chocolate.breakInto = "chocolate_sauce"

if (!elements.ice_cream.reactions) elements.ice_cream.reactions = {};
elements.ice_cream.reactions.juice = { elem1: "fruit_ice_cream", elem2: null }

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
elements.yogurt.reactions.juice = { elem1: "fruit_yogurt", elem2: null }

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
