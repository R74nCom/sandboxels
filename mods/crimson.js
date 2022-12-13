/*
TODO:
	Blood Crawler?
	Tweak Vicious Goldfish heavily
	Face Monster
	Crimera
	Herpling
	Crimslime
	Blood Jelly
	Blood Feeder
	Blood Mummy
	Deathweed
	Some drops
		Loot items could be implemented as useless powders.
	Crimsandstone
	Fishing loot fish (as Fish copies)
Not doing:
	Mob spawning
	Game-like world generation
	Crafting stations
	Hardmode-exclusive behavior (WoF would be a nightmare to add)
	Biome keys
Might not be possible:
	Thorny bushes (their breaking behavior would require a way for a pixel to detect when another pixel tryMove'd into its position)
	Powders and clentamination (those would require a means of moving through pixels without falsely occupied pixels or other glitches)
	Blood crawlers crawling on background walls
	Brain of Cthulhu (without the rest of the progression)
		*(would be pretty pointless)
		Crimson Hearts are probably possible but would be useless without this
	Actually usable weapons
	Game-like fishing system
	Crates breaking into multiple items
	Tree shaking behavior
	Deadland Comes Alive painting
	Floaty Gross, Crimson Axe, Crimson Pigron (same issue as powders)
Probably possible but far beyond my skill level:
	Enemy pathfinding
	Music boxes
	Crimera variants
	Multi-pixel enemies other than Face Monsters (which would copy human code)
*/

function includesArray(parentArray, testArray) {
    for (let i = 0; i < parentArray.length; i++) {
        if (parentArray[i].every(function(value, index) { return value === testArray[index]})) {
            return true;
        }
    }
    return false;
}

crimRate = 0.002

function grassSpread(pixel,dirt,grass,chance) {
	pixel.dirtArray = [] //initialize dirt neighbor list
	for (i = -2; i < 3; i++) { //iterate around
		for (j = -2; j < 3; j++) {
			if (!isEmpty(pixel.x+i,pixel.y+j,true)) { //check for a pixel to see if it's dirt
				if(Array.isArray(dirt)) {
					if(dirt.includes(pixelMap[pixel.x+i][pixel.y+j].element)) { //see if it's dirt
						if(!includesArray(pixel.dirtArray,[i,j])) { //avoid duplicate dirt entry
							pixel.dirtArray.push([i,j]) //store dirt
						}
					}
				} else {
					if(pixelMap[pixel.x+i][pixel.y+j].element == dirt) { //see if it's dirt
						if(!includesArray(pixel.dirtArray,[i,j])) { //avoid duplicate dirt entry
							pixel.dirtArray.push([i,j]) //store dirt
						}
					}
				}
			}
		}
	}
	for (k = 0; k < pixel.dirtArray.length; k++) { //iterate through dirt list
		if(Math.random() < chance) { //random chance
			if(isEmpty(pixel.x+pixel.dirtArray[k][0],pixel.y+pixel.dirtArray[k][1]-1)) { //check for empty space to grow grass
				createPixel(grass,pixel.x+pixel.dirtArray[k][0],pixel.y+pixel.dirtArray[k][1]-1) //place grass above dirt
			}
		}
	}
}



crimsonObject = {
	grass: "crimson_grass",
	rock: "crimstone",
	sand: "crimsand",
	ice: "red_ice",
	gravel: "crimgravel",
	water: "crimwater",
	snow: "crimsnow",
	packed_snow: "crimsnow",
	wet_sand: "crimsand",
	mud: "dirt",
	permafrost: "dirt",
	vine: "crimson_vine",
	fish: "vicious_goldfish",
	sapling: "shadewood_sapling"
};

function crimSpread(pixel) {
	for (let i = -2; i < 3; i++) {
		for (let j = -2; j < 3; j++) {
			if (!isEmpty(pixel.x+j,pixel.y+i,true)) {
				var destPixel = pixelMap[pixel.x+j][pixel.y+i];
				var elementToCheck = destPixel.element;
				if(Math.random() < crimRate) {
					if(crimsonObject[elementToCheck]) {
						changePixel(destPixel,crimsonObject[elementToCheck]);
					};
					grassSpread(pixel,"dirt","crimson_grass",0.5);
				};
			};
		};
	};
};

eLists.WHL = "water,salt_water,sugar_water,dirty_water,swamp_water,heavy_water,radioactive_water,crimwater,pure_water,chilly_water,honey,magma"

elements.crimson_grass = {
    color: ["#e82535","#cc471f","#d6153c","#c20e29","#b81a2c"],
    behavior: [
        "XX|CR:vicious_mushroom%0.01|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    tick: function(pixel) {
        crimSpread(pixel)
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn:50,
    burnTime:20,
    category:"life",
    state: "solid",
    density: 1400,
}

elements.crimstone = {
	color: ["#cb4444", "#953333", "#611c1c", "#b43434", "#752424"],
	behavior: behaviors.POWDER,
    tick: function(pixel) {
        crimSpread(pixel)
    },
	tempHigh: 950,
	stateHigh: "magma",
	category: "land",
	state: "solid",
	density: 2550,
	hardness: 0.5,
	breakInto: ["crimsand","crimgravel"],
}

elements.crimsand = {
	color: ["#4c4c44", "#6c645c", "#5c544c", "#847c6c", "#24241c", "#4c4c44", "#6c645c", "#5c544c", "#847c6c", "#24241c", "#3c140c", "#842c24"],
	behavior: behaviors.POWDER,
    tick: function(pixel) {
        crimSpread(pixel)
    },
	tempHigh: 1700,
	stateHigh: "molten_glass",
	category: "land",
	state: "solid",
	density: 1602,
}

elements.red_ice = {
	color: ["#f0ccc5", "#f7d8d2", "#eba39b"],
	behavior: behaviors.WALL,
    tick: function(pixel) {
        crimSpread(pixel)
    },
	temp: 0,
	tempHigh: 5,
	stateHigh: "crimwater",
	category: "solids",
	state: "solid",
	density: 917,
	breakInto: "crimsnow",
}

elements.crimgravel = { //break from canon for crimstone breakInto
	color: ["#c4533f", "#de6957", "#b84639", "#cf4634", "#db6758", "#d17366", "#ab2b2b"],
	behavior: behaviors.POWDER,
    tick: function(pixel) {
        crimSpread(pixel)
    },
	category:"land",
	tempHigh: 950,
	stateHigh: "magma",
	state: "solid",
	density: 1680,
	hardness: 0.2,
},

elements.crimwater = { //you shouldn't be able to purify ice by melting it
	color: "#e45c7c",
	behavior: behaviors.LIQUID,
    tick: function(pixel) {
        crimSpread(pixel)
    },
	tempLow: 0,
	stateLow: "red_ice",
	tempHigh: 100,
	stateHigh: "steam",
	viscosity: 1,
	category: "liquids",
	reactions: {
		"quicklime": { "elem1": null, "elem2": "slaked_lime", },
		"ruins": { "elem2": "rock", "chance": 0.00035 },
	},
	state: "liquid",
	density: 997,
	conduct: 0.02,
	stain: 0.02,
}

elements.crimsnow = { //BIG break from canon but you shouldn't be able to purify ice by grinding it either
	color: "#fce1e4",
	behavior: behaviors.POWDER,
    tick: function(pixel) {
        crimSpread(pixel)
    },
	temp: 0,
	tempHigh: 5,
	stateHigh: "crimwater",
	category: "land",
	state: "solid",
	density: 100,
}

elements.vicious_mushroom = {
	color: "#e36554",
	behavior: behaviors.POWDER,
    tick: function(pixel) {
        crimSpread(pixel)
    },
	category: "life",
	hidden: true,
	tempHigh: 225,
	stateHigh: "fire",
	burn: 10,
	burnTime: 65,
	state: "solid",
	density: 90.445,
}

elements.crimtane_ore = {
	color: ["#d83a3b", "#85242c", "#5d5d5d", "#540c14"],
	behavior: behaviors.POWDER,
	category: "land",
	tempHigh: 1552, //using palladium's melting point as an upper bound
	stateHigh: ["molten_slag","molten_slag","molten_crimtane"], //:sunglasses: can't turn things into slag if you're already slag
	state: "solid",
	density: 5854, //arbitrarily chosen, average of ((average of gold and palladium densities) + (crimstone density) + (crimstone density))
}

elements.crimtane = {
	color: ["#fc141e", "#C62A2F", "#903f3f", "#752E2E", "#5a1c1c", "#5B3C3C", "#5c5c5c"],
	behavior: behaviors.SOLID,
	category: "solids",
	tempHigh: 1200, //i want a behaviors.WALL form of crimtane... and I'm letting the game autogenerate molten_crimtane because I'm going to use it.
	//just pretend it got sintered somehow
	state: "solid",
	hidden: true,
	density: 15661,
}

elements.shadewood_tree_branch = {
	color: "#677a8f",
	behavior: [
		"CR:crimson_leaf,shadewood_tree_branch%2|CR:crimson_leaf,crimson_leaf,crimson_leaf,shadewood_tree_branch%2|CR:crimson_leaf,shadewood_tree_branch%2",
		"XX|XX|XX",
		"XX|XX|XX",
	],
	tempHigh: 400,
	stateHigh: ["fire","sap"],
	tempLow: -30,
	stateLow: "wood",
	category: "solids",
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
elements.crimson_vine = {
	color: "#de3323",
	behavior: [
		"XX|SP|XX",
		"XX|XX|XX",
		"XX|CL%1 AND M1|XX",
	],
    tick: function(pixel) {
        crimSpread(pixel)
    },
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -2,
	stateLow: "frozen_plant",
	burn: 35,
	burnTime: 100,
	category: "life",
	state: "solid",
	density: 1050,
}

elements.shadewood = {
	color: "#677a8f",
	behavior: behaviors.WALL,
	tempHigh: 400,
	stateHigh: ["ember","charcoal","fire","fire","fire"],
	category: "solids",
	burn: 5,
	burnTime: 300,
	burnInto: ["ember","charcoal","fire"],
	state: "solid",
	hardness: 0.15,
	breakInto: "shadewood_sawdust",
	density: 930, //used tigerwood
}

elements.shadewood_sapling = {
	color: ["#e64029", "#d43b26"],
	behavior: [
		"XX|M2%2|XX",
		"XX|L2:shadewood,shadewood_tree_branch%80|XX",
		"XX|M1|XX",
	],
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -2,
	stateLow: "frozen_plant",
	burn: 65,
	burnTime: 15,
	category: "life",
	state: "solid",
	density: 1500,
}

elements.shadewood_sawdust = {
	color: ["#95abcf","#8190a3"],
	behavior: behaviors.POWDER,
	tempHigh: 400,
	stateHigh: "fire",
	category: "powders",
	burn: 25,
	burnTime: 150,
	burnInto: ["ash","fire","fire","fire"],
	state: "solid",
	density: 493,
	hidden: true,
}

elements.crimson_leaf = {
	color: "#de3323",
	behavior: behaviors.WALL,
	category:"life",
	tempHigh: 100,
	stateHigh: "dead_plant",
	tempLow: -1.66,
	stateLow: "frozen_plant",
	burn:65,
	burnTime:60,
	burnInto: "dead_plant",
	state: "solid",
	density: 500,
	hidden: true,
}

elements.ichor = {
	color: ["#ffec70", "#ffcb52"],
	behavior: behaviors.LIQUID,
	reactions: {
		"head": { "elem2":"meat" }, //sb has no defense to reduce so i just made it deadly
		"body": { "elem2":"meat" },
	},
	category: "liquids",
	viscosity: 1,
	state: "liquid",
	density: 1010,
	stain: 0.02,
}

elements.vicious_goldfish = {
	color: "#e64230",
	behavior: [
		"SW:"+eLists.WHL+",blood%2|M2%5 AND SW:"+eLists.WHL+",blood%1|XX", //this is where M3 would have been useful
		"SW:"+eLists.WHL+",blood%40|FX%0.01|BO%1", //i have no idea what i'm doing
		"SW:"+eLists.WHL+",blood%2 AND M2|M1|XX",
	],
	reactions: {
		"algae": { "elem2":null, chance:0.5 },
		"plant": { "elem2":null, chance:0.125 },
		"fly": { "elem2":null, chance:0.5 },
		"firefly": { "elem2":null, chance:0.5 },
		"worm": { "elem2":null, chance:0.25 },
		"head": { "elem2":[null,"blood"], chance:0.25 },
		"body": { "elem2":[null,"blood"], chance:0.25 },
		"oxygen": { "elem2":"carbon_dioxide", chance:0.5 },
	},
	tick: function(pixel) {
		pixel.color = pixelColorPick(pixel)
	},
	temp: 20,
	tempHigh: 42,
	stateHigh: "meat",
	tempLow: -20,
	stateLow: "frozen_meat",
	category:"life",
	burn:40,
	burnTime:100,
	state: "solid",
	density: 1080,
	conduct: 0.2,
}
