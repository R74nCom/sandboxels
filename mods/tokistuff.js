elements.cooked_rice = {
	viscosity: 1000,
	tempMin: 20,
	stateMin: "rice",
	tempHigh: 500,
	stateHigh: ["ash", "charcoal"],
	density: 699,
	color: "#c2b6b6",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
	reactions: {
		"water": { elem1: null, elem2: "dirty_water" }
	}
};

elements.rice = {
	breakInto: "flour",
	viscosity: 10000,
	isFood: true,
	density: 696,
	tempHigh: 232,
	stateHigh: "cooked_rice",
	color: "#c8c8c8",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.cotton_candy = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	density: 1000,
	color: "#b6c7e3",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
	reactions: {
		"water": { elem1: "sugar", elem2: null },
	}
};

elements.cherry_cotton_candy = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	density: 1000,
	color: "#edd1e6",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
	hidden: true,
	reactions: {
		"water": { elem1: "sugar", elem2: null },
	}
};

elements.maple_syrup = {
	viscosity: 10000,
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#9c6000",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.boiled_egg = {
	isFood: true,
	density: 700,
	breakInto: "yolk",
	tempHigh: 500,
	stateHigh: "ash",
	color: "#fff9d1",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.avocado = {
	isFood: true,
	tempHigh: 500,
	breakInto: "guacamole",
	stateHigh: "ash",
	color: "#254a22",
	behavior: behaviors.SUPPORTPOWDER,
	category: "food",
	state: "liquid",
};

elements.guacamole = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#a2e09d",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
};

elements.watermelon = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	breakInto: "watermelon_flesh",
	color: "#40993f",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.melon = { //this one is kind of boring ngl it looks like a sponge but its food
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#c4bf1f",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.watermelon_flesh = {
	hidden: true,
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#ff5d47",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.nachos = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#bd7b26",
	behavior: behaviors.SUPPORTPOWDER,
	category: "food",
	state: "solid",
};

elements.cherry = {
	isFood: true,
	breakInto: "juice",
	breakIntoColor: "#a60000",
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ff0f0f",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	reactions: {
		"cotton_candy": { elem1: null, elem2: "cherry_cotton_candy", tempMin: 0 },
};

elements.garlic = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ffebbd",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	reactions: {
		"bread": { elem1: null, elem2: "garlic_bread" },
	}
};

elements.garlic_bread = {
	isFood: true,
	breakInto: "crumb",
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#db9b56", "#288a0c", "#db9b56", "#db9b56", "#db9b56", "#db9b56"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.kiwi = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#0f4700", "#0f4700", "#0f4700", "#0f4700", "#0f4700", "#0f4700", "#0f4700", "#0f4700", "#0f4700", "#210a00"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.lemon = {
	breakInto: "lemonade",
	tempHigh: 500,
	stateHigh: "steam",
	color: "#c9c22a",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
	reactions: {
        "juice": {elem1: "lemonade", elem2: null},
    }
};

elements.lemonade = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#fff41c",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.marshmallow = {
	isFood: true,
	tempHigh: 50,
	stateHigh: "cooked_marshmallow",
	color: "#ffe4e3",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.cooked_marshmallow = {
	hidden: true,
	isFood: true,
	tempHigh: 150,
	stateHigh: "burnt_marshmallow",
	color: "#d49e9d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.burnt_marshmallow = {
	hidden: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#1c1212",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.spaghetti = {
	isFood: true,
	tempHigh: 90,
	stateHigh: "cooked_ramen",
	color: "#fae34d",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.cooked_spaghetti = {
	hidden: true,
	density: 800,
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ada24e",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.cereal = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#ba3425", "#baa31e", "#26ba1e", "#1e9dba", "#6f1eba"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.sushi = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#020802", "#fff0eb", "#ff6524", "#35ab26"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.coca_cola = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#381e13",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.pastry = {
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#ba6727",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.expired_milk = {
	tempHigh: 500,
	stateHigh: "ash",
	color: "#b8c2b4",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
		"dirty_water": { elem1: "milk", elem2: "expired_milk" },
		"milk": { elem1: "expired_milk", elem2: "milk" },
		"water": { elem1: "milk", elem2: "dirty_water" },
	}
};

elements.pea = {
	isFood: true,
	breakInto: "mashed_pea",
	tempHigh: 500,
	stateHigh: "ash",
	color: "#3cbf2a",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
};

elements.mashed_pea = {
	hidden: true,
	isFood: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: "#97f578",
	behavior: behaviors.POWDER,
	category: "food",
	state: "liquid",
};

elements.burnt_beans = {
	tempHigh: 500,
	stateHigh: "ash",
	isFood: true,
	viscosity: 10000,
	density: 721,
	hardness: 1,
	color: "#1a0d04",
	category: "food",
	behavior: behaviors.LIQUID,
	state: "liquid",
};


elements.dragon_fruit = {
	breakInto: "mashed_dragon_fruit",
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#ff006f", "#ff006f", "#ff006f", "#036300", "#ff006f", "#ff006f", "#ff006f", "#ff006f"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.mashed_dragon_fruit = {
	hidden: true,
	tempHigh: 500,
	stateHigh: "ash",
	color: ["#e3e3e3", "#e3e3e3", "#0f0f0f", "#e3e3e3", "#e3e3e3", "#e3e3e3"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.barbecue_sauce = {
	viscosity: 3000,
	density: 1800,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#420400",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.vanilla = {
	hardness: 1,
	tempHigh: 300,
	stateHigh: "steam",
	color: "#e3e3e3",
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
	reactions: {
		"cream": { elem1: null, elem2: "vanilla_cream" },
		"ice_cream": { elem1: null, elem2: "vanilla_ice_cream" },
		"yolk": { elem1: null, elem2: "vanilla_pudding" },
	}
};

elements.vanilla_cream = {
	hardness: 1,
	hidden: true,
	tempHigh: 300,
	stateHigh: "steam",
	color: "#d6d6d6",
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
};

elements.vanilla_ice_cream = {
	hardness: 1,
	hidden: true,
	tempHigh: 200,
	stateHigh: "steam",
	color: "#f7f7f7",
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
	reactions: {
		"chocolate": { elem1: null, elem2: "chocolate_vanilla_ice_cream", tempMin: 0 },
		"melted_chocolate": { elem1: null, elem2: "chocolate_vanilla_ice_cream", tempMin: 0 },
	}
};

elements.strawberry_ice_cream = {
	hardness: 1,
	hidden: true,
	tempHigh: 200,
	stateHigh: "steam",
	color: "#ffa8d2",
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
};

elements.chocolate_vanilla_ice_cream = {
	hardness: 1,
	hidden: true,
	tempHigh: 200,
	stateHigh: "steam",
	color: ["#dbdbdb", "#915936"],
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
};

elements.vanilla_pudding = {
	hardness: 1,
	hidden: true,
	tempHigh: 300,
	stateHigh: "steam",
	color: "#d4c4ba",
	behavior: behaviors.FOAM,
	category: "food",
	state: "liquid",
};

elements.cinnamon = {
	tempHigh: 500,
	stateHigh: "ash",
	color: "#3d1409",
	behavior: behaviors.POWDER,
	category: "powders",
	state: "liquid",
};

elements.porridge = {
	temp: 30,
	viscosity: 3000,
	density: 500,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#b8a254",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.sprinkles = {
	tempHigh: 200,
	stateHigh: "ash",
	cooldown: 0.2,
	color: ["#ff5e5e", "#ffea5e", "#73ff5e", "#5efcff", "#995eff", "#ff5ed1"],
	behavior: behaviors.STURDYPOWDER,
	category: "powders",
	state: "liquid",
	maxSize: 1,
};

elements.cocoa = {
	breakInto: "cocoa_seeds",
	tempHigh: 300,
	stateHigh: "ash",
	color: "#912f1d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
	reactions: {
	"milk": { elem1: null, elem2:"hot_chocolate" tempMin: 70} },
};

elements.cocoa_seeds = {
	breakInto: "chocolate",
	hidden: true,
	tempHigh: 80,
	stateHigh: "melted_chocolate",
	color: "#cfc7ab",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.pineapple = {
	tempHigh: 200,
	stateHigh: "steam",
	color: "#ccbe3b",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.broccoli = {
	viscosity: 100000,
	tempHigh: 300,
	stateHigh: "ash",
	color: "#073804",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.pepperoni = {
	tempHigh: 300,
	stateHigh: "ash",
	color: "#8f2e11",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.pancake = {
	viscosity: 100000,
	tempHigh: 300,
	stateHigh: "ash",
	color: "#073804",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "solid",
};

elements.blueberry = {
	density: 626,
	viscosity: 10000,
	breakInto: "juice",
	breakIntoColor: "#0e2773",
	tempHigh: 200,
	stateHigh: "steam",
	color: "#192f73",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.cucumber = {
	tempHigh: 200,
	stateHigh: "steam",
	color: "#235214",
	behavior: behaviors.SUPPORT,
	category: "food",
	state: "solid",
};

elements.olive = {
	viscosity: 10000,
	tempHigh: 200,
	stateHigh: "steam",
	color: "#0d0806",
	behavior: behaviors.LIQUID,
	category: "food",
	state: "liquid",
};

elements.mushroom = {
	tempHigh: 200,
	stateHigh: "steam",
	color: "#96847d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.onion = {
	tempHigh: 300,
	stateHigh: "steam",
	color: "#460063",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.bacon = {
	tempHigh: 90,
	stateHigh: "cooked_bacon",
	color: ["#a1392d", "#edb4ad"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.cooked_bacon = {
	hidden: true,
	tempHigh: 300,
	stateHigh: "ash",
	color: ["#70211d", "#783b38"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "liquid",
};

elements.strawberry = {
	breakInto: "strawberry_juice",
	viscosity: 10000,
	density: 754,
	tempHigh: 200,
	stateHigh: "steam",
	color: "#db564d",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	
};

elements.beer = {
    tempHigh: 300,
    stateHigh: "steam",
    color: "#b39329",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
};

elements.strawberry_juice = {
	viscosity: 3000,
	density: 500,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#ff9ec2",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
	reactions: {
		"milk": { elem1: null, elem2: "strawberry_milk" },
		"ice_cream": { elem1: null, elem2: "strawberry_ice_cream" },
};	 

elements.carrot = {
	tempHigh: 500,
    stateHigh: "ash",
    color: "#f06c0e",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "liquid",
};

elements.strawberry_milk = {
	viscosity: 3000,
	density: 500,
	tempHigh: 500,
	stateHigh: "steam",
	color: "#ffc4da",
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
};

elements.wine = {
	tempHigh: 400,
    stateHigh: "steam",
    color: "#2e0206",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
};

elements.caviar = {
	viscosity: 10000,
	tempHigh: 500,
    stateHigh: "steam",
    color: "#1f1b18",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
};

elements.blood_orange = {
	hidden: true,
	tempHigh: 300,
	stateHigh: ["ash", "steam"],
    color: ["#f06c0e", "#bd1000"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "liquid",
};

elements.orange = {
    tempHigh: 300,
    stateHigh: "steam",
    color: "#f06c0e",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "liquid",
	reactions: {
		"blood": { elem1: null, elem2: "blood_orange", chance: 0.01 },
	}
};

elements.cranberry = {
	viscosity: 10000,
	hidden: true,
    tempHigh: 300,
    stateHigh: "steam",
    color: "#ad2a1d",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
};

elements.banana = {
	tempHigh: 300,
	stateHigh: "ash",
    color: "#f06c0e",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "liquid",
};

elements.beans.tempHigh = 349,
elements.beans.stateHigh = "burnt_beans"


if (!elements.egg.reactions) elements.egg.reactions = {};
elements.egg.reactions.water = {elem1: "boiled_egg", tempMin: 100},
elements.egg.reactions.steam = {elem1: "boiled_egg", tempMin: 100},
elements.egg.reactions.melted_chocolate = {elem1: "chocolate_egg"},
elements.egg.reactions.chocolate = {elem1: "chocolate_egg", chance: 0.1}


if (!elements.water.reactions) elements.water.reactions = {};
elements.water.reactions.seasoning = { elem1: "season_water", elem2: null }

if (!elements.dough.reactions) elements.dough.reactions = {};
elements.dough.reactions.yolk = {elem1: null, elem2: "spaghetti", tempMin: 25}

/*
elements.test = {
    //other needed properties
    cutInto: "elem"
}
*/

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
        changePixel(pixel, cutInto)
    },
    category:"tools",
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
    hidden: true,
};

if (!elements.broth.reactions) elements.broth.reactions = {};
elements.broth.reactions.water = { elem1: "soup", elem2: "soup" }

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
};

elements.season_water = {
    color: "#735a47",
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
    hidden: true,
};

if (!elements.batter.reactions) elements.batter.reactions = {};
elements.batter.reactions.water = {elem2: "noodles", tempMin: 70}
elements.batter.reactions.sugar = {elem2: "pancake", tempMin: 70}
elements.batter.reactions.cocoa = {elem2: "brownie", tempMin: 70}

elements.brownie = {
    color: "#301f00f",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    hidden: true,
    isFood:true,
};

if (!elements.dough.reactions) elements.dough.reactions = {};
elements.dough.reactions.chocolate = { elem2: "cookie_dough" }

elements.cookie_dough = {
    color: ["#5e420d","#ffe1a8"],
    behavior: behaviors.LIQUID,
    category: "food",
    state: "solid",
    hidden: true,
    isFood:true,
    reactions: {
        "butter": {elem1: "cookie", tempMin: 70}
    },
};

elements.cookie = {
    color: ["#2b1e05","#fff0d4"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    hidden: true,
    isFood:true,

};	

elements.pasta = {
    color: "#d1c06b",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    isFood:true,
	
};

elements.saucy_cheese = {
    color: ["#f7e172","#7a1c0b"],
    behavior: behaviors.LIQUID,
    category: "food",
    state: "solid",
    hidden: true,
    isFood:true,
    reactions: {
        "pasta": { elem1: "lasanga", elem2: null },
        "dough": { elem1: "pizza", elem2: null },

    },
};

if (!elements.cheese.reactions) elements.cheese.reactions = {};
elements.cheese.reactions.sauce = { elem2: "sauce_cheese" }

elements.lasanga = {
    color: ["#b39320","#f7e945"],
    behavior: behaviors.LIQUID,
    category: "food",
    state: "solid",
    hidden: true,
    isFood:true,
};

elements.pizza = {
    color: ["#f5d79f","#fafa87"],
    behavior: behaviors.LIQUID,
    category: "food",
    state: "solid",
    hidden: true,
    isFood:true,
};

elements.chicken = {
    color: ["#ffa6fb", "#fccfe4"],
    behavior: [
        "M2%1|M2%2|M2%1",
        "M2%10|XX|M2%10",
        "XX|M1%33|XX",
    ],
    category:"life",
	state: "solid",
    reactions: {
        "meat": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "egg": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL },
        "grass": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
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
    },
    temp: 40,
    tempHigh: 75,
    stateHigh: "cooked_sausage",
    tempLow: -18,
    stateLow: "frozen_sausage",
    breakInto: "sausage",
    burn:85,
    burnTime:450,
    state: "solid",
    density: 1117,
    conduct: 0.3,
};

elements.battered_raw_chicken = {
    color: ["#eacfa9", "#ecd2af"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash","smoke"],
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
    burnInto: "cook_chicken",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    reactions: {
        "batter": { elem1: "battered_raw_chicken", elem2: null },
        "smoke": {elem1: "smoked_chicken"},
        "steam": {elem1: "steamed_chicken"},
        "water": {elem1: "boiled_chicken", tempMin: 70},
        "cooking_oil": {elem1: "fried_chicken", tempMin: 70}
    },
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
};

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
};

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
        "cooking_oil": {elem1: "chicken_nugget", tempMin: 70}
    },
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

elements.cooked_sausage = {
    color: ["#330a05", "#1c0b09"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: 40,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    tempLow: -20,
    stateLow: "frozen_sausage",
    isFood: true,
    density: 100,
    hidden: true,
};
    
};

elements.sausage = {
    color: ["#d14330", "#994a3c", "#a32f1a", "#c7341a"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    burnInto: "cooked_sausage",
    temp:25,
    tempHigh: 600,
    stateHigh: ["ash", "smoke"],
    hidden: true,
    reactions: {
        "cooking_oil": {elem1: "chicken_nugget", tempMin: 70}
    },   
};

elements.frozen_sausage = {
    color: ["#67a9c7", "#994a3c"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    temp: -20,
    tempHigh: 40,
    stateHigh: "sausage",
    isFood: false,
    density: 100,
    hidden: true,
};

elements.olive = {
    color: ["#6e8b3d","#7c9d45"],
    behavior: behaviors.POWDER,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "rock": { elem1:"cooking_oil", elem2:"rock", chance:0.035 },
    },
    category:"food",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "cooking_oil",
    state: "solid",
    density: 1050,
    isFood: false
};

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
    },
};

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
};

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
};

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
        "cooking_oil": { elem1: "fried_potato", tempMin: 70 }
    },
};

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
};

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
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "apple_juice",
    cutInto: "apple_slice",
    state: "solid",
    density: 1050,
};

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
};

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
    tempHigh: 400,
    stateHigh: "fire",
    burn: 70,
    burnTime: 300,
    burnInto: ["steam", "smoke"],
    state: "liquid",
    density: 825,
    hidden: true,
    temp: 30,
    reactions: {
        "sugar": { elem1:"apple_jam", elem2:null, chance:0.35 }
    },
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
    hidden: true,
    density: 1036.86,
    isFood: true
};

elements.icing = {
    color: "#fefefb",
    behavior: behaviors.STURDYPOWDER,
    onMix: function(icing_sugar1, icing_sugar2) {
        if ((shiftDown && Math.random() < 0.2) || (elements[icing_sugar2.element].id === elements.icing_sugar.id && Math.random() < 0.25)) {
            changePixel(icing_sugar1,"icing")
        }
    },
    viscosity: 1.5,
    tempHigh: 1000,
    stateHigh: ["smoke","smoke","smoke","steam","steam","calcium"],
    stateLowColorMultiplier: 0.97,
    category: "food",
    isFood: true,
    state: "solid",
    density: 959.97,
};

elements.cream.reactions.baked_batter = {elem2: "cake" }

elements.sugar.breakInto = {elem1: "icing_sugar"}

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

elements.mentos = {
	color: "#a9fff9",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
		reactions: {
		"soda": { elem1: "foam", elem2: "foam" },
		"sprite": { elem1: "foam", elem2: "foam" } ,
	}
		};
		
		elements.sprite = {
	color: "#b2f3ad",
    behavior: elements.soda.behavior,
	category: "food",
	state: "liquid",
		};
		
		elements.fanta = {
	color: "#ffd500",
    behavior: elements.soda.behavior,
	category: "food",
	state: "liquid",
		};

elements.lime = {
	color: "#b4ff15",
    behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	    reactions: {
        "seltzer": { elem1: null, elem2: "sprite" },
    },
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

elements.fries = {
	color: ["#f4c63e","#f6d165","#f8dd8b"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	hidden: "TRUE",
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
        "pitaya": { elem1: null, elem2: "fruit_slushy" },
        "coconut": { elem1: null, elem2: "fruit_slushy" },
        "pear": { elem1: null, elem2: "fruit_slushy" },
        "pomegranate": { elem1: null, elem2: "fruit_slushy" },
        "guava": { elem1: null, elem2: "fruit_slushy" },
        "raspberry": { elem1: null, elem2: "fruit_slushy" },
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


elements.pear = {
	color: ["#669900","#669933","#9ec419"],
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#c8e39e","#99cc99"],
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

elements.olive = {
	color: ["#445626","#52682d","#6e8b3d"],
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
	breakInto: "juice",
	breakIntoColor: ["#d1ef71","#c1d64d"],
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

elements.oreo = {
	color: "#120600",
	behavior: behaviors.STURDYPOWDER,
	category: "food",
	state: "solid",
	reactions: {
		"toothpaste": { elem1: "poison_oreo", elem2: null },
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


elements.toothpaste = {
	color: ["#31ffe0","#65ffe8","#97ffef","#c9fff7","#f3fffd"],
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "solid",
	reactions: {
		"juice": { elem1: "poison", elem2: null },
	}
};

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

elements.herb.breakInto = "seasoning"

elements.chocolate.breakInto = "chocolate_sauce"

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

//dev notes area below
/*
ok this is not actually a mod i just used other mods and made it into this i can mess with stuff 
*/
