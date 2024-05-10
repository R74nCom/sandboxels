// 1.0 update
// adds dragon breath
// adds frostbite
// adds pulsium
// adds pulsium bar
// adds goblins delight
// adds pheonix
// adds pheonix ash
// adds baby pheonix
// adds ice pheonix

// 1.1 update
// adds dragon scale
// adds mystic runes
// adds enchanted wood
// adds quartzium
// adds quartz
// adds moonite

// 1.2 update
// fixed visibility bug and some errors
// adds faustium
// adds nebulaflare
// adds flaro
// adds aurorium
// adds glimmerium
// adds ozmoz
// adds goblin
// adds fenzium
// adds sceptrium
// adds sceptrium dust

// 1.3.2 fantasy_elements.js mod
// added changelog
// adds plode a bomb

// 1.4 the golem mod
// frostbite turns pheonx into ice
// adds plode maximus
// adds fire golem
// added snow golem
// added slush golem
// added water golem
// added plasma golem
// iced pheonix at 700 degrees becomes pheonix
// added blood golem

// 1.5 update
// corrected the 'phoenix' wrong spelling mistake to pheonix
// added grethe
// added grothea

elements.dragon_breath = {
    color: "#f94e4e",
    behavior: behaviors.GAS,
    category: "fantasy",
    state: "gas",
    density: 0.1,
    weight: 1,
    update: function(x, y) {
        // Update the element's behavior
    },
    reactions: {
        "oxygen": { elem1: "fire", elem2: "fire" },
		"frostbite": { elem1: "pulsium", elem2: "pulsium" },
    }
};

elements.frostbite = {
    color: "#0000ff",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 1.5,
    weight: 100,
    update: function(x, y) {
        // Update the element's behavior
    },
    reactions: {
        "water": { elem1: "ice", elem2: "ice" },
		"dragon_breath": { elem1: "pulsium", elem2: "pulsium" },
        "pheonix": { elem1: "ice", elem2: "ice" },
    }
};

elements.pulsium = {
    color: "#ffff00",
    behavior: behaviors.LIQUID,
    category: "fantasy",
    state: "liquid",
    density: 1923,
    weight: 100,
    update: function(x, y) {
        // Update the element's behavior
    },
	reactions: {
        "molten_iron": { elem1: "pulsium_bar", elem2: "pulsium_bar" },
		"molten_tin": { elem1: "pulsium_bar", elem2: "pulsium_bar" },
		"water": { elem1: "sap", elem2: "sap" },
		"magma": { elem1: "pulsium_bar", elem2: "pulsium_bar" },
    }
};

elements.pulsium_bar = {
    color: "#ffd700",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 1700,
    weight: 100,
    update: function(x, y) {
        // Update the element's behavior
    }
};

elements.goblins_delight = {
    color: "#00ff00",
    behavior: behaviors.LIQUID,
    category: "fantasy",
    state: "solid",
    density: 0.5,
    weight: 50,
    reactions: {
        "liquid_light": { elem1: "water", elem2: "oil" },
		"radiation": { elem1: "sauce", elem2: "sauce" },
    }
};

elements.pheonix = {
    color: ["#ff0000"],
    tick: behaviors.FLY,
    reactions: {        "fire": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
        "salt": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"pulsium_bar": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"pulsium": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
		"dragon_breath": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL },
    },
    foodNeed: 5,
    tempHigh: 999999,
    stateHigh: "ash",
    tempLow: 0,
    category:"fantasy",
    burn:100,
    burnTime:19,
    state: "solid",
    density: 850,
    conduct: 1,
    baby: "baby_pheonix",
};

elements.pheonix_ash = {
    color: "#a8a8a5",
    behavior: behaviors.POWDER,
    category: "fantasy",
    state: "solid",
    density: 1.5,
    weight: 100,
    reactions: {
        "water": { elem1: "pheonix", elem2: "pheonix" },
    }
};

elements.baby_pheonix = {
    color: ["#ffdd00"],
    tick: behaviors.FLY,
    foodNeed: 5,
    tempHigh: 999999,
    stateHigh: "ash",
    tempLow: 0,
    category:"fantasy",
    burn:100,
    burnTime:19,
    state: "solid",
	stateLow: "iced_pheonix",
    breakInto: "pheonix_ash",
    density: 850,
    conduct: 1,
};

elements.iced_pheonix = {
    color: "#34baeb",
    behavior: behaviors.SOLID,
    temp: -999,
    tempHigh: 700,
    stateHigh: "pheonix",
    category: "fantasy",
    state: "solid",
	breakInto: "ice",
    density: 1.5,
    weight: 100,
    update: function(x, y) {
        // Update the element's behavior
    },
};

// placed both sceptrium and sceptrium_dust here -part of 1.3 update-
// -open-
elements.sceptrium = {
    color: "#add8e6",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 1500,
    weight: 100,
    reactions: {
        "water": { elem1: "sceptrium", elem2: "sceptrium_dust" },
        "fire": { elem1: "sceptrium", elem2: "sceptrium_dust" },
        "plasma": { elem1: "sceptrium", elem2: "sceptrium_dust" },
        "laser": { elem1: "sceptrium", elem2: "sceptrium_dust" },
        "explosion": { elem1: "sceptrium", elem2: "sceptrium_dust" },
    },
};

elements.sceptrium_dust = {
    color: ["#87ceeb", "#add8e6", "#b0e0e6"],
    behavior: behaviors.POWDER,
    category: "fantasy",
    state: "solid",
    density: 0.5,
    weight: 1,
    reactions: {
        "water": { elem1: "sceptrium_dust", elem2: "sceptrium_dust" },
        "fire": { elem1: "sceptrium_dust", elem2: "sceptrium_dust" },
        "plasma": { elem1: "sceptrium_dust", elem2: "sceptrium_dust" },
        "laser": { elem1: "sceptrium_dust", elem2: "sceptrium_dust" },
        "explosion": { elem1: "sceptrium_dust", elem2: "sceptrium_dust" },
    },
};
// -end-

// New Fantasy Elements with Updated Reactions
elements.dragon_scale = {
    color: "#8B4513",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 0.8,
    weight: 60,
    update: function(x, y) {
        // Update the element's behavior
    },
    reactions: {
        "fire": { elem1: null, elem2: "dragon_breath" },
        "plasma": { elem1: null, elem2: "dragon_breath" },
		"incinerate": { elem1: null, elem2: "ash" },
        "goblins_delight": { elem1: "dragon_breath", elem2: null },
        "pulsium": { elem1: "dragon_breath", elem2: null },
        "oil": { elem1: null, elem2: "dragon_breath" },
        "salt": { elem1: "dragon_breath", elem2: null },
        "sap": { elem1: "dragon_breath", elem2: null },
        "water": { elem1: "dragon_breath", elem2: null },
        "laser": { elem1: null, elem2: "dragon_breath" },
        "oxygen": { elem1: null, elem2: "dragon_breath" },
        "wall": { elem1: "dragon_breath", elem2: null },
        "glass": { elem1: null, elem2: "dragon_breath" },
        "wood": { elem1: null, elem2: "dragon_breath" },
        "charcoal": { elem1: null, elem2: "dragon_breath" },
    },
};

elements.mystic_runes = {
    color: "#9932CC",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 0.8,
    weight: 60,
    update: function(x, y) {
        // Update the element's behavior
    },
    reactions: {
        "heat_ray": { elem1: "mystic_runes", elem2: "mystic_runes" },
        "god_ray": { elem1: "dragon_scale", elem2: "dragon_scale" },
        "laser": { elem1: "mystic_runes", elem2: "mystic_runes" },
        "helium": { elem1: null, elem2: "mystic_runes" },
        "oxygen": { elem1: null, elem2: "mystic_runes" },
        "sugar": { elem1: null, elem2: "mystic_runes" },
        "wall": { elem1: "mystic_runes", elem2: null },
        "glass": { elem1: null, elem2: "mystic_runes" },
        "wood": { elem1: null, elem2: "mystic_runes" },
        "charcoal": { elem1: null, elem2: "mystic_runes" },
        "diamond": { elem1: null, elem2: "mystic_runes" },
    },
};

elements.enchanted_wood = {
    color: "#923B70",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 0.8,
    weight: 60,
    reactions: {
        "fire": { elem1: null, elem2: "mystic_runes" },
        "plasma": { elem1: null, elem2: "charcoal" },
        "water": { elem1: null, elem2: "mystic_runes" },
    },
};

// update 1.1 below
// adds 3 more extra elements
// by pixelegend4
// main game by R74N called sandboxels

elements.quartzium = {
    color: "#51484f",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 1065, 
    weight: 100,
    reactions: {
        "fire": { elem1: "quartz", elem2: "quartz" },
		"plasma": { elem1: "quartz", elem2: "quartz" },
    },
};
elements.quartz = {
    color: "#ebedeb",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 8076,
    weight: 100,
};

elements.moonite = {
    color: "#e6e6e6",
    behavior: behaviors.SUPERFLUID,
    category: "fantasy",
    state: "solid",
    density: 8076,
    weight: 100,
};
elements.faustium = {
    color: "#8B008B",
    behavior: behaviors.SUPERFLUID,
    category: "fantasy",
    state: "liquid",
    density: 800,
    viscosity: 0.01,
	weight: 300,
	reactions: {
        "water": { elem1: "moonite", elem2: "moonite" },
    },
};

// update 1.2
// adds more below
// added faustium reaction

elements.nebulaflare = {
    color: ["#7500FF", "#00FFFB", "#FF00FC"],
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.1,
    weight: 0.1,
    category: "fantasy",
	reactions: {
        "fire": { elem1: "moonite", elem2: "moonite" },
		"moonite": { elem1: "quartzium", elem2: "quartzium" },

    },
};

elements.flaro = {
    color: ["#ff4d4d", "#ff9933", "#ffd11a", "#ff9933", "#ff4d4d"],
    behavior: behaviors.GAS,
    category: "fantasy",
    state: "gas",
    density: 8076,
    weight: 100,
};

elements.aurorium = {
    color: ["#75c0e0", "#00ff00", "#ffffff", "#00ff00", "#75c0e0"],
    behavior: behaviors.GAS,
    category: "fantasy",
    state: "gas",
    density: 55,
    weight: 1,
    reactions: {
        "plasma": { elem1: "explosion", elem2: "explosion" },
		"flaro": { elem1: "nebulaflare", elem2: "nebulaflare" },

    }
};

elements.glimmerium = {
    color: ["#ff3333", "#ff6666", "#ff9999", "#ffcc99", "#ff6633"],
    behavior: behaviors.LIGHT,
    category: "fantasy",
    state: "gas",
    density: 0.01,
    weight: 0.5,
    temperature: 3000,
	reactions: {
        "aurorium": { elem1: "sodium", elem2: "sodium" },
		"flaro": { elem1: "nebulaflare", elem2: "nebulaflare" },
		"pulsium": { elem1: "water", elem2: "water" },
    }
};


elements.osmoz = {
    color: "#1ff099",
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 5000,
    weight: 300,
	reactions: {
        "fire": { elem1: "nebulaflare", elem2: "nebulaflare" },
    }
};

elements.goblin = {
    "color": "#2ae856",
	"state": "solid",
    "behavior": [
        "XX|XX|DL",
        "XX|FX%0.5|M2%3 AND DL",
        "XX|M1|XX",
    ],
    "category":"fantasy",
	reactions: {
        "goblins_delight": { elem2:null, chance:0.9 },
        "plasma": { elem2: "goblin_soul", elem2: "goblin_soul" },
        "fire": { elem2: "goblin_soul", elem2: "goblin_soul" },
        "incinerate": { elem2: "goblin_soul", elem2: "goblin_soul" },
        "heat_ray": { elem2: "goblin_soul", elem2: "goblin_soul" },



    },
};

elements.fenzium = {
    color: ["#D16587", "#FF1493"],
    behavior: behaviors.GAS,
    category: "fantasy",
    state: "gas",
    density: 99,
    weight: 60,
    reactions: {
		"uranium": { elem1: "explosion", elem2: "explosion" },
    }
};

elements.goblin_feeder = {
    color: ["#307D7E", "#98FF98"],
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "soid",
    density: 1000,
    viscosity: 1,
    weight: 300,
    temperature: 20,
    reactions: {
        "fire": { elem1: "pulsium_bar", elem2: null },
    },
    tick: function(pixel) {
        if (Math.random() < 0.05) {
            createPixel("goblins_delight", pixel.x, pixel.y);
        }
    },
};

// fantasy_elements.js version 1.3

elements.thanosium = {
    color: ["#8803fc", "#db03fc", "#ad03fc", "#cf03fc"],
    behavior: behaviors.SOLID,
    category: "fantasy",
    state: "solid",
    density: 1900,
    breakInto: "thanosium_dust",
    weight: 100,
};

elements.thanosium_dust = {
    color: ["#8803fc", "#ad03fc", "#cf03fc", "#b12ee6", "#d62ee6", "#a8329d"],
    behavior: behaviors.POWDER,
    category: "fantasy",
    state: "powder",
    density: 1900,
    weight: 100,
    reactions: {
  "diamond": { func: function(pixel1, pixel2){
      autoResizeCanvas();
    }
  }
}
};

elements.exterminator_bomb = {
    color: ["#23969e", "#28aeb8", "#2ec6d1", "#34deeb"],
    behavior: [
        "XX|EX:90>uranium,plasma,H_bomb,nuke,fire|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:90>plasma,plasma,ember,fire,fire|M2",
    ],
    category: "fantasyweapons",
    state: "solid",
    density: 2000,
    excludeRandom: true,
};

elements.heat_bomb = {
    color: ["#ff7700", "#ffbf00"],
    behavior: [
        "XX|EX:90>heat_ray,heat_ray,heat_ray,heat_ray,heat_ray|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:90>heat_ray,heat_ray,heat_ray,heat_ray,heat_ray|M2",
    ],
    category: "fantasyweapons",
    state: "solid",
    density: 2000,
    excludeRandom: true,
};
elements.goblin_soul = {
	color: ["#9fff05","#92e807","#56fc03","#4fe007","#07e03a","#19e649","#19e6b6"],
	behavior: behaviors.FLY,
	category: "fantasy",
	state: "gas",
    density: 1000,
};

elements.rainbow_flash = {
    color: ["#ff0800","#ffae00","#ffe100","#51ff00","#005eff","#a200ff"],
    tick: function(pixel) {
        if (Math.random() < 3 && pixelTicks - pixel.start > 4) {
            deletePixel(pixel.x, pixel.y)
        }
    },
    reactions: {
        "fire": { elem1:"rainbow_bomb" },
    },
    category: "fantasy",
    temp: 40,
    state: "gas",
    density: 1,
    tempLow: -270,
    stateLow: "light",
};
elements.rainbow_bomb = {
    color: ["#ff0800","#ffae00","#ffe100","#51ff00","#005eff","#a200ff"],
    behavior: [
        "XX|EX:90>rainbow_flash,rainbow_flash,rainbow_flash,rainbow_flash,rainbow_flash|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:90>rainbow_flash,rainbow_flash,rainbow_flash,rainbow_flash,rainbow_flash|M2",
    ],
    category: "fantasyweapons",
    state: "solid",
    density: 2500,
    excludeRandom: true,
};
elements.cryptoberry = {
    color: ["#34d8eb","#34e6fa","#24d9ed"],
    behavior: behaviors.POWDER,
    category: "fantasy",
    state: "solid",
    density: 800,
	breakInto: "cryptoberry_juice",
    isFood: true,
};
elements.cryptoberry_juice = {
    color: ["#34c9eb","#34d5eb","#34b7eb"],
    behavior: behaviors.LIQUID,
    category: "fantasy",
    state: "solid",
    density: 800,
    isFood: true,
};

// adds more reactions to existing elements -part if 1.3 update-
// -open-
elements.water.reactions.cryptoberry_juice = {elem2: "shadowberry_juice", tempMin: 80}
// -close-
elements.shadowberry = {
    color: "#ab34eb",
    behavior: behaviors.POWDER,
    category: "fantasy",
    state: "solid",
    density: 800,
	breakInto: "shadowberry_juice",
    isFood: true,
};
elements.shadowberry_juice = {
    color: "#a600ff",
    behavior: behaviors.LIQUID,
    category: "fantasy",
    state: "solid",
    density: 800,
    isFood: true,
	reactions: {
        "human": { elem1: "radiation", elem2: "radiation" },
    },
};
elements.Frostberry = {
    color: "#25f5cf",
    behavior: behaviors.POWDER,
    category: "fantasy",
    state: "solid",
    density: 800,
	breakInto: "Frostberry_juice",
    isFood: true,
};
elements.Frostberry_juice = {
    color: "#25f5e0",
    behavior: behaviors.LIQUID,
    category: "fantasy",
    state: "solid",
    density: 800,
    isFood: true,
	reactions: {
        "human": { elem1: "snow", elem2: "snow" },
    },
};
elements.abyssberry = {
    color: "#676b68",
    behavior: behaviors.POWDER,
    category: "fantasy",
    state: "solid",
    density: 800,
	breakInto: "abyssberry_juice",
};
elements.abyssberry_juice = {
    color: "#818a84",
    behavior: behaviors.LIQUID,
    category: "fantasy",
    state: "solid",
    density: 800,
    isFood: true,
	reactions: {
        "shadowberry_juice": { elem1: "snow", elem2: "snow" },
    },
};

//1.3.1 minor update
// below

elements.cicium = {
	color: "#4287f5",
	behavior: behaviors.WALL,
	category: "fantasy",
	state: "solid",
};

elements.Verdantium = {
	color: ["#00c8f0", "#00bcf0","#00d8f0","#27b4e3","#0aaaf5"],
	behavior: behaviors.LIQUID,
	category: "fantasy",
	state: "solid",
	isFood: false,
};

elements.nebulaflare_wall = {
    color: ["#7500FF", "#00FFFB", "#FF00FC"],
    behavior: behaviors.WALL,
    state: "solid",
    density: 0.1,
    category: "fantasy",
	reactions: {
        "water": { elem1: "nebulaflare", elem2: "nebulaflare" },
    },
};
// end, chanelog moves to top

elements.plode = {
    color: "#7f03fc",
    behavior: [
        "XX|EX:90>plasma,heat_ray,plasma,fire,fire|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:90>fire,plasma,fire,fire,heat_ray,fire|M2",
    ],
    category: "fantasyweapons",
    state: "solid",
    density: 2500,
    excludeRandom: true,
};
elements.plode_maximus = {
    color: "#7f03fc",
    behavior: [
        "XX|EX:200>plasma,heat_ray,plasma,fire,fire,plasma,heat_ray,plasma,fire,fire,plasma,heat_ray,plasma,fire,fire,plasma,heat_ray,plasma,fire,fire,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,fire,fire,fire,fire,fire,fire|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:200>fire,plasma,fire,fire,heat_ray,fire,fire,plasma,fire,fire,heat_ray,fire,fire,plasma,fire,fire,heat_ray,fire,fire,plasma,fire,fire,heat_ray,fire,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,fire,fire,fire,fire,fire|M2",
    ],
    category: "fantasyweapons",
    state: "solid",
    density: 2500,
    excludeRandom: true,
};

elements.fire_golem= {
    "color": "#fc5a03",
    "state": "solid",
    "behavior": [
        "XX|CR:fire|DL",
        "XX|FX%0.5|M2%3 AND DL",
        "XX|M1|XX",
    ],
    "category":"fantasy",
    "temp": 600,
};

elements.snow_golem= {
    "color": "#b6ccd4",
    "state": "solid",
    "behavior": [
        "XX|CR:snow|DL",
        "XX|FX%0.5|M2%3 AND DL",
        "XX|M1|XX",
    ],
    "category":"fantasy",
    "temp": -70,
};

elements.water_golem= {
    "color": "#4ad2ff",
    "state": "solid",
    "behavior": [
        "XX|CR:water|DL",
        "XX|FX%0.5|M2%3 AND DL",
        "XX|M1|XX",
    ],
    "category":"fantasy",
    "temp": 15,
};

elements.slush_golem= {
    "color": "#a7dff2",
    "state": "solid",
    "behavior": [
        "XX|CR:slush|DL",
        "XX|FX%0.5|M2%3 AND DL",
        "XX|M1|XX",
    ],
    "category":"fantasy",
    "temp": 15,
};

elements.plasma_golem= {
    "color": "#891af0",
    "state": "solid",
    "behavior": [
        "XX|CR:plasma|DL",
        "XX|FX%0.5|M2%3 AND DL",
        "XX|M1|XX",
    ],
    "category":"fantasy",
    "temp": Infinity,
};

elements.cold_golem= {
    "color": ["#00ccff","#0091ff","#00a2ff"],
    "state": "solid",
    "behavior": [
        "XX|CR:cold_fire|DL",
        "XX|FX%0.5|M2%3 AND DL",
        "XX|M1|XX",
    ],
    "category":"fantasy",
    "temp": -999,
    "templow": -999,
    "alias": "don't put me out!",
};

elements.blood_golem= {
    "color": "#ff0000",
    "state": "solid",
    "behavior": [
        "XX|CR:blood|DL",
        "XX|FX%0.5|M2%3 AND DL",
        "XX|M1|XX",
    ],
    "category":"fantasy",
    "temp": 10,
};

elements.grethe = {
	color: "#51f542",
	"behavior": [
        "XX|XX|DL",
        "SA|XX|M2",
        "XX|M1|XX",
    ],
	category: "fantasy",
	state: "solid",
};

elements.grothea = {
	color: ["#d742f5","#c246db","#772987"],
	"behavior": [
        "M2|XX|XX",
        "SA|M1|XX",
        "XX|XX|DL",
    ],
	category: "fantasy",
	state: "solid",
};
