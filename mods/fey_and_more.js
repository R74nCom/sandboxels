// Sandboxels: Fey & More, v2.1.2
// Author: MelecieDiancie

/*
=== CHANGELOG ===
2.1.2 Version
- Removed liquid light and all related elements due to another being in vanilla
~ Yes, I know it's been so long! 3.0, a complete rewrite (and rename) is coming soon(tm)

2.1.1 Version
- Removed regular clouds
~ Update by ryan

2.1 Version
+ New fairies: Radiated, Spirit, Corrupt
+ Liquid light through concoction and magic
+ Toxic and unstable mistake variants
+ Celie mix
+ Cloud Cotton, and rain/snow variants
+ Corrupt Rock
+ Peark, Ivory, and Sky growth crystals
~ Unhid concoction
~ Slowed down poison- and pure water spreading to others
~ Bugfix: thunder, light, mushroom, and magic fairies now die to iron and silver
~ Bugfix: saplings now make birthpool when mixed with concoction
- Removed everfire dust being created from magic

2.0 Version
+ Updated to Mod Manager format
+ Essence and spirits
+ Mix mana with essence to create concoction: incredibly reactive, but tends to make mistakes.
+ New concoctions: birthpool, firesea, lektre
+ New fairies: Thunder, Light, Mushroom, and Magic!
+ Electric Focus
+ Corrupt land and withery trees, obtained through gloomwind
+ Enchanted Ketchup
~ Renamed a secret element
~ Creatures now move more naturally
- Removed chicken-related elements. They'll be back!
- Moved virus back to Special category

1.1 Version
+ Updated to Sandboxels 0.7.2
+ Celie trees!
+ New fairies: nature, earth, and rain!
+ Mythril
+ Bleakstone, nearly black
+ Poisonwater, a dangerous substance produced through gloomwind that kills creatures
+ Added two further states to Pyrestone
+ Chickens and eggs! Which came first?
~ Added virus to corruption category
~ Fairies now transform through interacting with magma, ice, petals, mud, and rainclouds instead of heat/cold.
~ Fire and ice fairies can now be selected in the inventory
~ Fire and ice fairies now drop stardust
~ Pure and Chilly Water now have all Water reactions that do not transform them
~ Pure Water now spreads through water
~ Soap now restores all Corruption creatures but Gloomfly back to meat/bone
~ Mystic fire made to spread more due to the changes to Plasma
~ Prevented pure water from removing mushroom-related elements as well as gray goo and gloomwind
~ Liquid light now burns instead of disappearing
~ Moved everfire dust to Energy category
~ Bug fix: green dye now produces yellow dye when put on top of red dye
- Removed pure ice's ability to kill impure objects

1.0 Version
+ Fairies! as well as temperature-affected variants
+ Fairy dust, produced by regular fairies and can be mixed with water to create mana
+ Fairy eggs (placeholder name), produced in mana
+ Mana and frozen mana
+ Liquid light, dustlight, and solid light
+ Pure water, ice, and steam
+ Chilly water that can't be frozen
+ Gloomwind, gloomflies, and beasts produced from animal remains
+ Pyrestone, has four stages of heating
+ Stardust
+ Dyes that change a color of any pixel of any element while retaining their qualities
+ Dye cleaner to clean off dyes (although can't remove colors from colored elements)
+ Everfire dust, burns for a long time
+ Mystic fire, an attempt to replicate pre-0.7 plasma
+ Frostwind
+ Magic. For some reason I forgot to put this of all features to the changelog
~ Iron and steel now kill fairies
~ Plague moved to corruption category

*/

// New lists
eLists.FAIRY = ["fairy","fairy_egg","fire_fairy","ice_fairy","nature_fairy","earth_fairy","rain_fairy","thunder_fairy","light_fairy","mushroom_fairy","magic_fairy","radiated_fairy","spirit_fairy","corrupt_fairy"],
eLists.DYE =["red_dye","green_dye","blue_dye","yellow_dye","cyan_dye","magenta_dye"],
eLists.IMPURITY = ["flea","fly","bone","blood","worm","termite","rat","plague","virus","bone_marrow","rotten_meat","mushroom_spore","gloomfly","meat_monster","rotten_ravager","bone_beast","poisonwater","corrupt_land","poisoned_ketchup"],
eLists.WOOD = ["bamboo","bamboo_plant","sapling","wood","tree_branch","celie_seed","celie_wood","celie_branch"]
eLists.PLANT = ["grass","plant","grass_seed","wheat","wheat_seed","flower_seed","pistil","petal","vine","potato_seed","potato","corn_seed","corn","celie_leaves","dry_celie_leaves"]

// New behavior templates
behaviors.FAIRYKILL = [
    "XX|DL:"+eLists.FAIRY+"|XX",
    "DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
    "XX|DL:"+eLists.FAIRY+"|XX"
];

// Changing vanilla elements
elements.iron.behavior = behaviors.FAIRYKILL;
elements.silver.behavior = behaviors.FAIRYKILL;

elements.plague.category = "corruption";

// New elements
elements.fairy = {
	name: "fairy",
    color: ["#9051a8","#e193e6","#7a58b8"],
    behavior: [
    "XX|M1|M1",
    "XX|FX%5|XX",
    "XX|CR:fairy_dust%0.005 AND M1|M1",
	],
	state: "solid",
    category: "fey",
	reactions: {
		"fire": { "elem1": "fire_fairy",},
		"magma": { "elem1": "fire_fairy",},
		"snow": { "elem1": "ice_fairy",},
		"ice": { "elem1": "ice_fairy",},
		"petal": { "elem1": "nature_fairy",},
		"dirt": { "elem1": "earth_fairy",},
		"mud": { "elem1": "earth_fairy",},
		"rain_cloud": { "elem1": "rain_fairy",},
		"electric": { "elem1": "thunder_fairy",},
		"little_star": { "elem1": "stellar_fairy",},
		"moonrock": { "elem1": "lunar_fairy",},
		"liquid_light": { "elem1": "light_fairy",},
		"mushroom_cap": { "elem1": "mushroom_fairy",},
		"magic": { "elem1": "magic_fairy",},
		"radiation": { "elem1": "radiated_fairy",},
		"uranium": { "elem1": "radiated_fairy",},
		"essence": { "elem1": "spirit_fairy",},
		"liquid_essence": { "elem1": "spirit_fairy",},
		"gloomwind": { "elem1": "corrupt_fairy",},
		"gloomfly": { "elem1": "corrupt_fairy",},
	},
};
elements.fire_fairy = {
    name: "fire fairy",
    color: ["#c99373","#d9b882","#db7972"],
	temp:150,
	state: "solid",
	behavior: [
		"XX|CR:smoke%1 AND M1|M1",
		"XX|FX%5|XX",
		"XX|CR:magma%0.1 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    category: "fey",
};	
elements.ice_fairy = {
    "name": "ice fairy",
    "color": ["#a3fff9","#abe0f7","#b3b6ff"],
    "temp":-150,
	"state": "solid",
    "behavior": [
		"XX|M1|M1",
		"XX|FX%5|XX",
        "XX|CR:snow%0.1 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
}; 	
elements.nature_fairy = {
    "name": "nature fairy",
    "color": ["#baffa8","#bdffc3","#a8ffcb"],
	"state": "solid",
    "behavior": [
        "XX|M1|M1",
        "XX|FX%5|XX",
        "XX|CR:sapling%0.01 AND CR:flower_seed%0.01 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
}; 
elements.earth_fairy = {
    "name": "earth fairy",
    "color": ["#9c8b7b","#9c907b","#c9baad"],
	"state": "solid",
    "behavior": [
        "XX|M1|M1",
        "XX|FX%5|XX",
        "XX|CR:dirt%0.1 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
};
elements.rain_fairy = {
    "name": "rain fairy",
    "color": ["#b8b4d4","#cecce0","#a8b2e6"],
	"state": "solid",
    "behavior": [
		"XX|M1|M1",
        "XX|FX%5|XX",
        "XX|CR:water%0.1 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
}; 
elements.stellar_fairy = {
    "color": ["#fff6a6","#fffdeb","#ffe2b8"],
	"state": "solid",
    "behavior": [
        "XX|M1|M1",
        "XX|FX%5|XX",
        "XX|CR:stardust%0.1 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
	"hidden": true,
};
elements.lunar_fairy = {
    "color": ["#969bb5","#908fa8","#b6b7db"],
	"state": "solid",
    "behavior": [
        "XX|M1|M1",
        "XX|FX%5|XX",
        "XX|CR:moonrock%0.1 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
	"hidden": true,
};
elements.thunder_fairy = {
    "color": ["#ffec96","#ffd980","#ffedc2"],
	"state": "solid",
    "behavior": [
        "XX|M1|M1",
        "XX|FX%5|XX",
        "XX|CR:electric%0.5 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
};
elements.light_fairy = {
    "color": ["#fffed1","#e3e2c3","#fff4ba"],
	"state": "solid",
    "behavior": [
        "XX|CR:light%0.1 AND M1|M1",
        "CR:light%0.1|FX%5|CR:light%0.1",
        "XX|CR:light%0.1 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
};
elements.mushroom_fairy = {
    "color": ["#ffc7c2","#c9a7a7","#ffc7d4"],
	"state": "solid",
    "behavior": [
        "XX|M1|M1",
        "XX|FX%5|XX",
        "XX|CR:mushroom_spore%0.1 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
}; 
elements.magic_fairy = {
    "color": ["#c1aed4","#917ca6","#ad98d4"],
	"state": "solid",
    "behavior": [
        "XX|CR:magic%1 AND M1|M1",
        "CR:magic%1|FX%5|CR:magic%1",
        "XX|CR:magic%1 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
}; 
elements.radiated_fairy = {
    "color": ["#40703d","#718f6f","#40703d"],
	"state": "solid",
    "behavior": [
        "XX|M1|M1",
        "XX|FX%5|XX",
        "XX|CR:uranium%0.1s AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
}; 
elements.spirit_fairy = {
    "color": ["#6d7da3","#8b95ad","#6d7da3"],
	"state": "solid",
    "behavior": [
        "XX|CR:spirit%0.5 AND M1|M1",
        "XX|FX%5|XX",
        "XX|CR:spirit_tear%0.5 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
}; 
elements.corrupt_fairy = {
    "color": ["#635678","#857999","#635678"],
	"state": "solid",
    "behavior": [
        "XX|CR:gloomwind%1 AND M1|M1",
        "CR:gloomwind%1|FX%5|CR:gloomwind%1",
        "XX|CR:gloomwind%1 AND CR:fairy_dust%0.005 AND M1|M1",
    ],
    "category": "fey",
}; 
elements.fairy_dust = {
                "name": "fairy dust",
                "color": ["#ba97f0","#fae3ff","#ffffe6"],
				"state": "solid",
                "behavior": behaviors.POWDER,
                "category": "fey",
				"density": 310,
				"reactions": {
                    "water": {
                        "elem1": null,
                        "elem2": "mana",
                    },
                    "ice": {
                        "elem1": null,
                        "elem2": "frozen_mana",
                    },
				},
				
			},
elements.mana = {
    "name": "mana",
    "color": ["#4f90ff","#428aff","#52b7ff"],
	"state": "liquid",
    "behavior": [
		"XX|CR:mana_bubble%0.1 AND CR:fairy_egg%0.005|XX",
		"M2|XX|M2",
		"M1|M1|M1",
	],
    "tempLow": 0,
    "stateLow": "frozen_mana",
    "density": 252,
    "viscosity": 0,
    "category": "fey",
};
elements.mana_bubble = {
    "name": "mana bubble",
    "color": ["#c7e8ff","#abcbff"],
	"state": "gas",
    "behavior": [
		"M2|M1|M2",
		"M1|DL%2|M1",
		"M2|M1%10|M2",
    ],
    "density": 0.6,
    "category": "fey",
    "hidden": true,
};
elements.frozen_mana = {
    "name": "frozen mana",
    "color": ["#abcaff","#5a85cc","#6fbff7"],
	"state": "solid",
    "behavior": behaviors.WALL,
    "density": 252,
    "temp": -10,
    "tempHigh": 10,
    "stateHigh": "mana",
    "category": "fey",
};
elements.fairy_egg = {
    "name": "fairy egg",
    "color": ["#f8e8ff","#efe8ff","#efe8ff"],
	"state": "solid",
    "behavior": [
        "XX|XX|XX",
        "XX|CH:fairy%0.05|XX",
        "XX|M1|XX",
    ],
	"tempHigh": 100,
    "stateHigh": "fire",
    "category": "fey",
    "burn":65,
    "burnTime":50,
};
elements.pure_water = {
    "name": "pure water",
    "color": "#8099ff",
	"state": "liquid",
    "behavior": [
    "DL:"+eLists.IMPURITY+"|DL:"+eLists.IMPURITY+"|DL:"+eLists.IMPURITY+"",
    "DL:"+eLists.IMPURITY+" AND M2|XX|DL:"+eLists.IMPURITY+" AND M2",
    "DL:"+eLists.IMPURITY+" AND M1|DL:"+eLists.IMPURITY+" AND M1|DL:"+eLists.IMPURITY+" AND M1",
	],
    "density": 997,
    "tempHigh": 100,
    "stateHigh": "pure_steam",
    "tempLow": 0,
    "stateLow": "pure_ice",
    "viscosity": 1,
    "category": "liquids",
    "reactions": {
        "dirt": { "elem1": null, "elem2": "mud", },
        "sand": { "elem1": null, "elem2": "wet_sand", },
        "quicklime": { "elem1": null, "elem2": "slaked_lime", },
		"water": { "elem1": "pure_water", "elem2": "pure_water", "chance": 0.05 },
		"salt_water": { "elem1": "pure_water", "elem2": "pure_water", "chance": 0.05 },
		"sugar_water": { "elem1": "pure_water", "elem2": "pure_water", "chance": 0.05 },
		"chilly_water": { "elem1": "pure_water", "elem2": "pure_water", "chance": 0.05 },
		"swamp_water": { "elem1": "pure_water", "elem2": "pure_water", "chance": 0.05 },
    },
};			
elements.pure_ice = {
    "color": "#f0fdff",
    "behavior": behaviors.WALL,
    "temp": 0,
    "tempHigh": 5,
    "stateHigh": "pure_water",
    "category": "solids",
    "state": "solid",
    "density": 917,
};			
elements.pure_steam = {
        "color": "#e3f1ff",
        "behavior": [
        "M2 AND DL:"+eLists.IMPURITY+"|M1 AND DL:"+eLists.IMPURITY+"|M2 AND DL:"+eLists.IMPURITY+"",
        "M1 AND DL:"+eLists.IMPURITY+"|XX|M1 AND DL:"+eLists.IMPURITY+"",
        "M2 AND DL:"+eLists.IMPURITY+"|M1 AND DL:"+eLists.IMPURITY+"|M2 AND DL:"+eLists.IMPURITY+"",
    ],
    "temp": 100,
    "tempLow": 95,
    "stateLow": "pure_water",
    "category": "gases",
    "state": "gas",
    "density": 0.6,
};			
elements.chilly_water = {
	"mod": "Fey & More",
    "name": "chilly water",
    "color": "#4b78db",
	"state": "liquid",
    "behavior": behaviors.LIQUID,
    "density": 997,
	"temp":-50,
    "tempHigh": 100,
    "stateHigh": "steam",
    "viscosity": 1,
    "category": "liquids",
    "reactions": {
		"dirt": { "elem1": null, "elem2": "mud", },
		"sand": { "elem1": null, "elem2": "wet_sand", },
		"quicklime": { "elem1": null, "elem2": "slaked_lime", },
    },
};

/*
elements.liquid_light = {
    "name": "liquid light",
    "color": "#fffdde",
    "behavior": behaviors.LIQUID,
    "density": 1210,
    "temp": 100,
    "tempLow": -10,
    "stateLow": "dustlight",
    "viscosity": 1000,
    "burn": 300,
    "burnTime": 250,
	"burnInto": "light",
    "fireColor": ["#ffffe3","#fffdf7"],
    "category": "liquids",
	"state": "liquid",
};
elements.dustlight = {
    "name": "dustlight",
    "color": "#fff1b3",
    "behavior": behaviors.POWDER,
	"density": 2800,
	"tempHigh": 10,
    "stateHigh": "liquid_light",
    "tempLow": -100,
    "stateLow": "solid_light",
    "category": "land",
	"state": "solid",
    "hidden": true,
};
elements.solid_light = {
    "name": "solid light",
    "color": "#ffd375",
	"density": 2800,
	"state": "solid",
    "behavior": behaviors.WALL,
    "category": "solids",
	"tempHigh": 100,
    "stateHigh": "liquid_light"
};
*/

elements.gloomwind = {
    "name": "gloomwind",
    "color": "#1d1530",
	"state": "gas",
    "behavior": [
    "M2|M1 AND CR:gloomfly%0.01|M2",
    "M1 AND CR:gloomfly%0.01|DL%10|M1 AND CR:gloomfly%0.01",
    "M2|M1 AND CR:gloomfly%0.01|M2",
	],
	"density": 1,
    "category": "corruption",
	"reactions": {
        "meat": { "elem1": null, "elem2": "meat_monster", },
        "rotten_meat": { "elem1": null, "elem2": "rotten_ravager", },
        "bone": { "elem1": null, "elem2": "bone_beast", },
		"water": { "elem1": null, "elem2": "poisonwater", "chance": 0.05 },
		"water": { "elem1": null, "elem2": "poisonwater", "chance": 0.05 },
		"salt_water": { "elem1": null, "elem2": "poisonwater", "chance": 0.05 },
		"sugar_water": { "elem1": null, "elem2": "poisonwater", "chance": 0.05 },
		"chilly_water": { "elem1": null, "elem2": "poisonwater", "chance": 0.05 },
		"wood": { "elem1": null, "elem2": "withery", },
		"tree_branch": { "elem1": null, "elem2": "withery", },
		"sapling": { "elem1": null, "elem2": "withery", },
		"bamboo": { "elem1": null, "elem2": "withery", },
		"bamboo_plant": { "elem1": null, "elem2": "withery", },
		"celie_seed": { "elem1": null, "elem2": "withery", },
		"celie_wood": { "elem1": null, "elem2": "withery", },
		"celie_branch": { "elem1": null, "elem2": "withery", },
		"root": { "elem1": null, "elem2": "withery", },
		"grass": { "elem1": null, "elem2": "withery_plant", },
		"plant": { "elem1": null, "elem2": "withery_plant", },
		"grass_seed": { "elem1": null, "elem2": "withery_plant", },
		"wheat": { "elem1": null, "elem2": "withery_plant", },
		"wheat_seed": { "elem1": null, "elem2": "withery_plant", },
		"flower": { "elem1": null, "elem2": "withery_plant", },
		"pistil": { "elem1": null, "elem2": "withery_plant", },
		"petal": { "elem1": null, "elem2": "withery_plant", },
		"corn": { "elem1": null, "elem2": "withery_plant", },
		"corn_seed": { "elem1": null, "elem2": "withery_plant", },
		"potato_seed": { "elem1": null, "elem2": "withery_plant", },
		"potato": { "elem1": null, "elem2": "withery_plant", },
		"celie_leaves": { "elem1": null, "elem2": "withery_plant", },
		"old_celie_leaves": { "elem1": null, "elem2": "withery_plant", },
		"vine": { "elem1": null, "elem2": "withery_plant", },
		"dirt": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"mud": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"mudstone": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"sand": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"wet_sand": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"packed_sand": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"clay": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"clay_soil": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"mycelium": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"rock": { "elem1": "corrupt_rock", "elem2": "corrupt_rock", "chance": 0.05},
		"gravel": { "elem1": "corrupt_rock", "elem2": "corrupt_rock", "chance": 0.05},
		"limestone": { "elem1": "corrupt_rock", "elem2": "corrupt_rock", "chance": 0.05},
		"quickline": { "elem1": "corrupt_rock", "elem2": "corrupt_rock", "chance": 0.05},
		"basalt": { "elem1": "corrupt_rock", "elem2": "corrupt_rock", "chance": 0.05},
	},
};
elements.gloomfly = {
    "name": "gloomfly",
    "color": "#463e57",
	"state": "solid",
    "behavior": [
        "XX|M2|M1",
        "XX|FX%5|XX",
        "XX|M2|M1",
    ],
    "tempHigh": 47,
    "stateHigh": "ash",
    "category":"corruption",
    "burn":125,
    "burnTime":50,
    "hidden": true,
	"reactions": {
        "fly": { "elem1": "gloomfly", "elem2": "gloomfly", "chance": 0.5 },
		"firefly": { "elem1": "gloomfly", "elem2": "gloomfly", "chance": 0.5 },
		"bee": { "elem1": "gloomfly", "elem2": "gloomfly", "chance": 0.5 },
		"bat": { "elem1": "gloomfly", "elem2": "gloomfly", "chance": 0.5 },
		"vampire_bat": { "elem1": "gloomfly", "elem2": "gloomfly", "chance": 0.5 },
		"hummingbird": { "elem1": "gloomfly", "elem2": "gloomfly", "chance": 0.5 },
		"butterfly": { "elem1": "gloomfly", "elem2": "gloomfly", "chance": 0.5 },
	},
};
elements.meat_monster = {
    "name": "meat monster",
    "color": "#4a2222",
	"state": "solid",
    "behavior": [
        "XX|XX|M2%1",
        "XX|FX%3|M2%10 AND DL:"+eLists.CLEANANIMAL+"",
        "XX|M1|XX",
    ],
    "tempHigh": 47,
    "stateHigh": "ash",
    "category":"corruption",
    "burn":125,
    "burnTime":50,
    "hidden": true,
};
elements.rotten_ravager = {
    "name": "rotten ravager",
    "color": ["#617d31","#948e48","#85683d"],
	"state": "solid",
    "behavior": [
        "XX|CR:plague%0.25|M2%0.6",
        "XX|FX%1|M2%6 AND DL:"+eLists.CLEANANIMAL+"",
        "XX|M1|XX",
    ],
    "tempHigh": 47,
    "stateHigh": "ash",
    "category":"corruption",
    "burn":125,
    "burnTime":50,
    "hidden": true,
};
elements.bone_beast = {
    "name": "bone beast",
    "color": "#a8a59b",
	"state": "solid",
    "behavior": [
        "XX|XX|DL:"+eLists.CLEANANIMAL+"",
        "XX|FX%0.5|M2%3 AND DL:"+eLists.CLEANANIMAL+"",
        "XX|M1|XX",
    ],
    "category":"corruption",
    "hidden": true,
};
elements.unignited_pyrestone = {
    "name": "pyrestone",
    "color": "#706964",
	"temp":50,
	"state": "solid",
    "behavior": behaviors.POWDER,
	"density": 2600,
    "category": "solids",
	"tempHigh": 100,
    "stateHigh": "ignited_pyrestone",
};
elements.ignited_pyrestone = {
    "name": "ignited pyrestone",
    "color": "#8c6142",
	"temp":150,
	"state": "solid",
    "behavior": behaviors.POWDER,
	"density": 2600,
    "category": "solids",
	"tempHigh": 300,
    "stateHigh": "heated_pyrestone",
    "hidden": true,
};
elements.heated_pyrestone = {
	"name": "heated pyrestone",
    "color": "#803713",
	"temp":400,
	"state": "solid",
    "behavior": [
		"HT:3|HT:3|HT:3",
        "HT:3|XX|HT:3",
        "M2 AND HT:3|M1 AND HT:3|M2 AND HT:3",
    ],
	"density": 2600,
    "category": "solids",
	"tempHigh": 650,
    "stateHigh": "burning_pyrestone",
    "hidden": true,
};
elements.burning_pyrestone = {
	"mod": "Fey & More",
    "name": "burning pyrestone",
    "color": "#7d2900",
	"temp":750,
	"state": "solid",
     "behavior": [
        "HT:6|HT:8 AND CR:fire%1|HT:6",
        "HT:6|XX|HT:6",
        "M2 AND HT:6|M1 AND HT:6|M2 AND HT:6",
    ],
	"density": 2600,
    "category": "solids",
	"tempHigh": 1500,
    "stateHigh": "blazing_pyrestone",
    "hidden": true,
};	
elements.blazing_pyrestone = {
	"mod": "Fey & More",
    "name": "blazing pyrestone",
    "color": "#612000",
	"temp":1850,
	"state": "solid",
    "behavior": [
		"HT:8|HT:8 AND CR:fire%3|HT:8",
		"HT:8|XX|HT:8",
		"M2 AND HT:8|M1 AND HT:8|M2 AND HT:8",
    ],
	"density": 2600,
    "category": "solids",
	"tempHigh": 2850,
    "stateHigh": "fiery_pyrestone",
    "hidden": true,
};
elements.fiery_pyrestone = {
	"mod": "Fey & More",
    "name": "fiery pyrestone",
    "color": "#300b00",
	"temp":3000,
	"state": "solid",
    "behavior": [
		"HT:12|HT:12 AND CR:fire%6|HT:12",
		"HT:12|XX|HT:12",
		"M2 AND HT:12|M1 AND HT:12|M2 AND HT:12",
    ],
	"density": 2600,
    "category": "solids",
    "hidden": true,
};
elements.stardust = {
    "name": "stardust",
    "color": ["#8e76b8","#dcc7ff","#7876b8"],
	"state": "solid",
    "behavior": behaviors.POWDER,
	"tempHigh": 2000,
    "stateHigh": "little_star",
    "category": "land",
	"density": 310,
};
elements.little_star = {
    "name": "little star",
    "color": ["#ffd7a3","#ffefdb"],
	"temp":2500,
	"state": "gas",
	"behavior": [
		"M1%1 AND CR:fire%0.1|M1%1AND CR:fire%0.1|M1%1AND CR:fire%0.1",
		"M1%1AND CR:fire%0.1|XX|M1%1AND CR:fire%0.1",
		"M1%1AND CR:fire%0.1|M1%1AND CR:fire%0.1|M1%1AND CR:fire%0.1",
	],
	"density": 0.1,
    "category": "special",
    "hidden": true,
};
elements.red_dye = {
    "name": "red dye",
    "color": "#bb0000",
	"state": "solid",
    "behavior": [
        "CC:#ff0000|XX|CC:#ff0000",
        "CC:#ff0000|CC:#bb0000|CC:#ff0000",
        "M2 AND CC:#ff0000|M1 AND CC:#ff0000|M2 AND CC:#ff0000",
    ],
	"density": 100,
    "category": "dyes",
	"reactions": {
        "green_dye": { "elem1": "yellow_dye", "elem2": "yellow_dye", },
		"blue_dye": { "elem1": "magenta_dye", "elem2": "magenta_dye", }, 
		},
};
elements.green_dye = {
    "name": "green dye",
    "color": "#00bb00",
	"state": "solid",
    "behavior": [
		"XX|XX|XX",
		"CC:#00ff00|CC:#00bb00|CC:#00ff00",
        "M2 AND CC:#00ff00|M1 AND CC:#00ff00|M2 AND CC:#00ff00",
    ],
	"density": 100,
    "category": "dyes",
	"reactions": {
		"red_dye": { "elem1": "yellow_dye", "elem2": "yellow_dye", },
		"blue_dye": { "elem1": "cyan_dye", "elem2": "cyan_dye", },
	},
};
elements.blue_dye = {
    "name": "blue dye",
    "color": "#0000bb",
	"state": "solid",
    "behavior": [
        "XX|XX|XX",
        "CC:#0000ff|CC:#0000bb|CC:#0000ff",
        "M2 AND CC:#0000ff|M1 AND CC:#0000ff|M2 AND CC:#0000ff",
    ],
	"density": 100,
    "category": "dyes",
};
elements.yellow_dye = {
    "name": "yellow dye",
    "color": "#bbbb00",
	"state": "solid",
    "behavior": [
        "XX|XX|XX",
        "CC:#ffff00|CC:#bbbb00|CC:#ffff00",
        "M2 AND CC:#ffff00|M1 AND CC:#ffff00|M2 AND CC:#ffff00",
    ],
	"density": 100,
    "category": "dyes",
};
elements.cyan_dye = {
    "name": "cyan dye",
    "color": "#00bbbb",
	"state": "solid",
    "behavior": [
		"XX|XX|XX",
		"CC:#00ffff|CC:#00bbbb|CC:#00ffff",
		"M2 AND CC:#00ffff|M1 AND CC:#00ffff|M2 AND CC:#00ffff",
    ],
	"density": 100,
    "category": "dyes",
};
elements.magenta_dye = {
    "name": "magenta dye",
    "color": "#bb00bb",
	"state": "solid",
    "behavior": [
        "XX|XX|XX",
        "CC:#ff00ff|CC:#bb00bb|CC:#ff00ff",
        "M2 AND CC:#ff00ff|M1 AND CC:#ff00ff|M2 AND CC:#ff00ff",
    ],
	"density": 100,
    "category": "dyes",
};
elements.dye_cleaner = {
    "name": "dye cleaner",
    "color": "#bababa",
	"state": "liquid",
    "behavior": [
        "XX|XX|XX",
        "M2 AND DL:"+eLists.DYE+"|CC:#bababa AND DL%1|M2 AND DL:"+eLists.DYE+"",
        "M1 AND DL:"+eLists.DYE+"|M1 AND DL:"+eLists.DYE+"|M1 AND DL:"+eLists.DYE+"",
    ],
	"density": 99,
    "category": "dyes",
    "hidden": false,
};
elements.everfire_dust = {
    "name": "everfire dust",
    "color": "#06142b",
	"state": "solid",
    "behavior": behaviors.POWDER,
	"density": 1490,
    "burn": 100,
    "burnTime": 2000,
	"burnInto": "extinguished_everfire_dust",
	"category": "energy",
    "fireColor": ["#0041a8","#8ab7ff"],
};
elements.extinguished_everfire_dust = {
    "name": "extinguished everfire dust",
    "color": "#242d3b",
	"state": "solid",
    "behavior": behaviors.POWDER,
	"density": 1490,
    "fireColor": ["#0041a8","#8ab7ff"],
	"category": "energy",
    "hidden": true,
};
elements.magic = {
	"name": "magic",
    "color": ["#a270ff","#f2d9ff"],
	"state": "energy",
    "behavior": [
        "M2|M1|M2",
        "M1|DL%10|M1",
        "M2|M1|M2",
	],
	"density": 1,
    "category": "energy",
	"reactions": {
        "water": { "elem1": null, "elem2": "pure_water", },
        "little_star": { "elem1": "mystic_fire", "elem2": "mystic_fire", },
        "cheese": { "elem1": null, "elem2": "moonrock", },
		"sapling": { "elem1": null, "elem2": "celie_seed", },
		"old_celie_leaves": { "elem1": null, "elem2": "celie_leaves", },
		"ketchup": { "elem1": null, "elem2": "enchanted_ketchup", },
		"tomato_sauce": { "elem1": null, "elem2": "enchanted_ketchup", },
		"rain_cloud": { "elem1": null, "elem2": "raincloud_cotton", },
		"snow_cloud": { "elem1": null, "elem2": "snowcloud_cotton", },
		"cloud": { "elem1": null, "elem2": "cloud_cotton", },
	},
};
elements.mystic_fire = {
    "name": "mystic fire",
    "color": ["#5454ff","#2020d4","#5800c4"],
    "behavior": [
        "M2|M1 AND CR:mystic_fire%10|M2",
        "M1 AND CR:mystic_fire%5|EX:15>mystic_fire%0.1|M1 AND CR:mystic_fire%5",
        "M2|M2|M2",
    ],
    "temp":8500,
    "tempChange":-100,
    "tempLow":8000,
    "stateLow": "fire",
    "category": "energy",
    "burning": true,
};	
elements.frostwind = {
	"mod": "Fey & More",
    "name": "frostwind",
    "color": ["#ccfffe","#bdedff","#a1cdff"],
	"state": "gas",
	"behavior": [
        "M2 AND CO:8|M1 AND CO:8|M2 AND CO:8",
        "M1 AND CO:8|DL%10|M1 AND CO:8",
        "M2 AND CO:8|M1 AND CO:8|M2 AND CO:8",
	],
	"density": 1,
    "temp":-100,
    "category": "gases",
};		
elements.magic_focus = {
    "name": "magic focus",
    "color": "#1f0042",
	"state": "solid",
	"behavior": [
        "XX|CR:magic%25|XX",
        "CR:magic%25|XX|CR:magic%25",
        "XX|CR:magic%25|XX",
	],
	"density": 1,
    "category": "special",
};	
elements.electric_focus = {
    "color": "#37094f",
	colorOn: "#671b8f",
	"state": "solid",
	"behavior": behaviors.WALL,
	"behaviorOn": [
        "XX|CR:magic%40|XX",
        "CR:magic%40|XX|CR:magic%40",
        "XX|CR:magic%40|XX",
	],
	"density": 1,
    "category": "special",
	conduct: 1,
};	
elements.moonrock = {
	"mod": "Fey & More",
    "name": "moonrock",
    "color": ["#4e5361","#6d748a"],
	"state": "solid",
	"behavior": [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1%25|XX",
	],
	"density": 1550,
    "category": "land",
    "hidden": true,
};
elements.celie_seed = {
    "color": "#74ad97",
	"state": "solid",
	"behavior": [
        "XX|M2%2|XX",
        "XX|L2:celie_wood,celie_branch AND CH:celie_branch%0.25|XX",
        "XX|M1|XX",
	],
    "tempHigh": 400,
    "stateHigh": "fire",
    "burn": 40,
    "burnTime": 50,
    "burnInto": ["ash","charcoal","fire"],
	"density": 1400,
    "category": "life",
	
};	  
elements.celie_branch = {
    "color": "#a3764e",
    "behavior": [
        "CR:celie_leaves,celie_branch%2|CR:celie_leaves,celie_leaves,celie_leaves,celie_branch%2|CR:celie_leaves,celie_branch%2",
        "XX|CH:celie_wood%0.1|XX",
        "XX|CR:vine%0.005|XX",
    ],
    "tempHigh": 400,
    "stateHigh": "fire",
    "category": "solids",
    "burn": 40,
    "burnTime": 50,
    "burnInto": ["ash","charcoal","fire"],
    "hidden": true,
    "state": "solid",
    "density": 1500,
};
elements.celie_wood = {
    "color": "#a3764e",
    "behavior": [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:vine%0.005|XX",
    ],
    "tempHigh": 400,
    "stateHigh": "fire",
    "category": "solids",
    "burn": 40,
    "burnTime": 50,
    "burnInto": ["ash","charcoal","fire"],
    "hidden": true,
    "state": "solid",
    "density": 1500,
};
elements.celie_leaves = {	
	"color": ["#a4dbc7","#afe3c3","#95bfa5"],
    "behavior": [
		"XX|XX|XX",
		"XX|CH:old_celie_leaves%0.07 AND CH:celie_berry%0.005|XX",
        "XX|CR:vine%0.005|XX",
    ],
    "category":"life",
    "tempHigh": 300,
    "stateHigh": "fire",
    "burn":65,
    "burnTime":50,
    "hidden": true,
};
elements.old_celie_leaves = {
    "color": ["#cbd6d0","#cce3de","#9aada5"],
    "behavior": [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    "category":"life",
    "tempHigh": 300,
    "stateHigh": "fire",
    "burn":65,
    "burnTime":50,
    "hidden": true,
};
elements.celie_berry = {
	"mod": "Fey & More",
     "color": ["#ffe7a3","#f0c69c"],
    "behavior": [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    "category":"life",
    "tempHigh": 300,
    "stateHigh": "fire",
    "burn":65,
    "burnTime":50,
    "density": 1000,
    "hidden": true,
	"reactions": {
		"yeast": { "elem2": "alcohol" },
		"water": { "elem1": null, "elem2": "celie_mix" },
    },
};
elements.bleakstone = {
    "color": "#020202",
    "tempHigh": 1000,
    "behavior": behaviors.WALL,
    "category": "solids",
    "density": 20000,
};
elements.mithril = {
    "color": "#bac1c2",
    "behavior": [
    "XX|XX|XX",
    "XX|CC:bac1c2,bac1c2,bac1c2,bac1c2,bac1c2,bac1c2,f7fafa%1|XX",
    "XX|XX|XX",
    ],
    "tempHigh": 1450,
    "category": "solids",
    "density": 1100,
	conduct: 1,
};
elements.poisonwater = {
    "name": "poisonwater",
    "color": "#402f61",
	"state": "liquid",
    "behavior": [
		"XX|DL:"+eLists.ANIMAL+"|XX",
        "M2 AND DL:"+eLists.ANIMAL+"|XX|M2 AND DL:"+eLists.ANIMAL+"",
        "M1 AND DL:"+eLists.ANIMAL+"|M1 AND DL:"+eLists.ANIMAL+"|M1 AND DL:"+eLists.ANIMAL+"",
	],
    "tempLow": -10,
    "stateLow": "poisoned_ice",
    "tempHigh": 110,
    "stateHigh": "poisoned_gas",
    "density": 252,
    "viscosity": 0,
    "category": "corruption",
	"reactions": {
		"water": { "elem1": "poisonwater", "elem2": "poisonwater", "chance": 0.05},
		"salt_water": { "elem1": "poisonwater", "elem2": "poisonwater", "chance": 0.05 },
		"sugar_water": { "elem1": "poisonwater", "elem2": "poisonwater", "chance": 0.05 },
		"chilly_water": { "elem1": "poisonwater", "elem2": "poisonwater", "chance": 0.05 },
		"swamp_water": { "elem1": "poisonwater", "elem2": "poisonwater", "chance": 0.05 },
	},
};
elements.poisoned_ice = {
    "color": "#716882",
    "behavior": [
		"XX|DL:"+eLists.ANIMAL+"|XX",
		"DL:"+eLists.ANIMAL+"|XX|DL:"+eLists.ANIMAL+"",
		"DL:"+eLists.ANIMAL+"|DL:"+eLists.ANIMAL+"|DL:"+eLists.ANIMAL+"",
	],
    "temp": 0,
    "tempHigh": 5,
    "stateHigh": "poisonwater",
    "category": "corruption",
    "state": "solid",
    "density": 917,
};
elements.poisoned_gas = {
    "color": "#b2a7c7",
    "behavior": behaviors.GAS,
    "temp": 100,
    "tempLow": 95,
    "stateLow": "poisonwater",
    "category": "corruption",
    "state": "gas",
    "density": 0.6,
};
elements.essence = {
    "color": ["#e0dfeb", "#e6ccdd", "#ebcdc5"],
	"state": "solid",
    "behavior": [
        "XX||XX",
        "XX|CH:spirit%0.25 AND DL%0.5|XX",
        "M2|M1|M2",
    ],
	"density": 1490,
	"category": "energy",
	"tempHigh": 40,
    "stateHigh": "liquid_essence",
	"reactions": {
		"mana": { "elem1": null, "elem2": "concoction", },
		}
};
elements.liquid_essence = {
    "color": ["#9c9ab8", "#ab8aa0", "#a3847c"],
	"state": "liquid",
    "behavior": [
        "XX||XX",
        "M2|CH:spirit%0.1 AND DL%0.2|M2",
        "M1|M1|M1",
    ],
	"density": 1024,
	"category": "energy",
	"tempLow": 20,
    "stateLow": "essence",
	hidden: true,
	
	"reactions": {
		"mana": { "elem1": null, "elem2": "concoction", },
		},
	    "burn": 100,
    "burnTime": 100,
	"burnInto": "furious_spirit",
    "fireColor": "#f7ebff",
};
elements.concoction = {
    "color": ["#6d6ec2", "#5556ad", "#6b55ad"],
	"state": "solid",
    "behavior": [
		"XX|CR:mana_bubble%0.1|XX",
        "M2|XX|M2",
        "M1|M1|M1",
	],
	"density": 1250,
	"category": "energy",
	"burn": 200,
    "burnTime": 200,
	"fireColor": ["#968fff", "#af8fff"],
	"burnInto": "mana_bubble",
	"reactions": {
		// reactions go nyoom. most of these create mistakes
		"sand": { "elem1": "mistake", "elem2": null, },
		"wet_sand": { "elem1": "mistake", "elem2": null, },
		"packed_sand": { "elem1": "mistake", "elem2": null, },
		"dirt": { "elem1": "mistake", "elem2": null, },
		"mud": { "elem1": "mistake", "elem2": null, },
		"mudstone": { "elem1": "mistake", "elem2": null, },
		"snow": { "elem1": "chilly_water", "elem2": null, }, //chilly water
		"packed_snow": { "elem1": "chilly_water", "elem2": null, }, //chilly water
		"rock": { "elem1": "mistake", "elem2": null, },
		"gravel": { "elem1": "mistake", "elem2": null, },
		"clay": { "elem1": "mistake", "elem2": null, },
		"permafrost": { "elem1": "mistake", "elem2": null, },
		"basalt": { "elem1": "mistake", "elem2": null, },
		"limestone": { "elem1": "mistake", "elem2": null, },
		"quicklime": { "elem1": "mistake", "elem2": null, },
		"salt_water": { "elem1": "mistake", "elem2": null, },
		"sugar_water": { "elem1": "sweetsauce", "elem2": null, }, //sweetsauce
		"dirty_water": { "elem1": "mistake", "elem2": null, },
		"magma": { "elem1": "mistake", "elem2": null, },
		"slime": { "elem1": "mistake", "elem2": null, },
		"oil": { "elem1": "mistake", "elem2": null, },
		"lamp_oil": { "elem1": "mistake", "elem2": null, },
		"acid": { "elem1": "mistake", "elem2": null, },
		"glue": { "elem1": "mistake", "elem2": null, },
		"milk": { "elem1": "mistake", "elem2": null, },
		"vinegar": { "elem1": "mistake", "elem2": null, },
		"alcohol": { "elem1": "mistake", "elem2": null, },
		"soap": { "elem1": "pure_water", "elem2": null, }, // pure water
		"blood": { "elem1": "mistake", "elem2": null, },
		"honey": { "elem1": "mistake", "elem2": null, },
		"ketchup": { "elem1": "enchanted_ketchup", "elem2": null, }, // enchanted ketchup
		"molasses": { "elem1": "sweetsauce", "elem2": null, }, //sweetsauce
		"chocolate_syrup": { "elem1": "mistake", "elem2": null, },
		"liquid_hydrogen": { "elem1": "mistake", "elem2": null, },
		"liquid_oxygen": { "elem1": "mistake", "elem2": null, },
		"liquid_nitrogen": { "elem1": "mistake", "elem2": null, },
		"bamboo_plant": { "elem1": "mistake", "elem2": null, },
		"potato_seed": { "elem1": "birthpool", "elem2": null, }, // birthpool
		"grass_seed": { "elem1": "birthpool", "elem2": null, }, // birthpool
		"wheat_seed": { "elem1": "birthpool", "elem2": null, }, // birthpool
		"flower_seed": { "elem1": "birthpool", "elem2": null, }, // birthpool
		"corn": { "elem1": "mistake", "elem2": null, },
		"corn_seed": { "elem1": "birthpool", "elem2": null, }, // birthpool
		"potato": { "elem1": "mistake", "elem2": null, },
		"potato_seed": { "elem1": "birthpool", "elem2": null, }, // birthpool
		"yeast": { "elem1": "mistake", "elem2": null, },
		"lichen": { "elem1": "mistake", "elem2": null, },
		"celie_seed": { "elem1": "birthpool", "elem2": null, }, // birthpool
		"fire": { "elem1": "firesea", "elem2": null, }, // firesea
		"plasma": { "elem1": "firesea", "elem2": null, }, // firesea
		"ash": { "elem1": "firesea", "elem2": "everfire_dust", }, // firesea + everfire dust
		"charcoal": { "elem1": "mistake", "elem2": null, },
		"tinder": { "elem1": "mistake", "elem2": null, },
		"straw": { "elem1": "mistake", "elem2": null, },
		"fireball": { "elem1": "firesea", "elem2": null, },
		"borax": { "elem1": "mistake", "elem2": null, },
		"dust": { "elem1": "firesea", "elem2": "everfire_dust", }, // firesea + everfire dust
		"chocolate": { "elem1": "mistake", "elem2": null, },
		"cheese": { "elem1": "mistake", "elem2": null, },
		"bead": { "elem1": "mistake", "elem2": null, },
		"epsom_salt": { "elem1": "mistake", "elem2": null, },
		"potassium_salt": { "elem1": "mistake", "elem2": null, },
		"gold_coin": { "elem1": "mistake", "elem2": null, },
		"yogurt": { "elem1": "mistake", "elem2": null, },
		"baking_soda": { "elem1": "sweetsauce", "elem2": null, }, //sweetsauce
		"flour": { "elem1": "sweetsauce", "elem2": null, }, //sweetsauce
		"sugar": { "elem1": "sweetsauce", "elem2": null, }, //sweetsauce
		"popcorn": { "elem1": "mistake", "elem2": null, },
		"bread": { "elem1": "mistake", "elem2": null, },
		"toast": { "elem1": "mistake", "elem2": null, },
		"flour": { "elem1": "mistake", "elem2": null, },
		"dough": { "elem1": "mistake", "elem2": null, },
		"salt": { "elem1": "mistake", "elem2": null, },
		"caramel": { "elem1": "mistake", "elem2": null, },
		"candy": { "elem1": "mistake", "elem2": null, },
		"calcium": { "elem1": "mistake", "elem2": null, },
		"sulfur": { "elem1": "mistake", "elem2": null, },
		"diamond": { "elem1": "mistake", "elem2": null, },
		"glitter": { "elem1": "mistake", "elem2": null, },
		"radiation": { "elem1": "toxic_mistake", "elem2": null, }, // toxic mistake
		"uranium": { "elem1": "toxic_mistake", "elem2": null, }, // toxic mistake
		"fallout": { "elem1": "toxic_mistake", "elem2": null, }, // toxic mistake
		"mycelium": { "elem1": "mistake", "elem2": null, },
		"slag": { "elem1": "mistake", "elem2": null, },
		"neutral_acid": { "elem1": "mistake", "elem2": null, },
		"liquid_helium": { "elem1": "mistake", "elem2": null, },
		"sawdust": { "elem1": "mistake", "elem2": null, },
		"molten_iron": { "elem1": "lektre", "elem2": null, }, //lektre
		"molten_copper": { "elem1": "lektre", "elem2": null, }, //lektre
		"molten_silver": { "elem1": "lektre", "elem2": null, }, //lektre
		"molten_aluminum": { "elem1": "lektre", "elem2": null, }, //lektre
		"molten_bronze": { "elem1": "lektre", "elem2": null, }, //lektre
		"molten_steel": { "elem1": "lektre", "elem2": null, }, //lektre
		"molten_mithril": { "elem1": "lektre", "elem2": null, }, //lektre
		"electric": { "elem1": "lektre", "elem2": null, }, //lektre
		"uranium": { "elem1": "toxic_mistake", "elem2": null, }, //toxic mistake
		"radiation": { "elem1": "toxic_mistake", "elem2": null, }, //toxic mistake
		"light": { "elem1": "liquid_light", "elem2": null, }, // liquid light
		
		// Fey & More
		"mystic_fire": { "elem1": "firesea", "elem2": null, }, // firesea
		"fairy_dust": { "elem1": "mistake", "elem2": null, },
		"stardust": { "elem1": "mistake", "elem2": null, },
		"gloomwind": { "elem1": "mistake", "elem2": null, },
		"dustlight": { "elem1": "mistake", "elem2": null, },
		"poisonwater": { "elem1": "mistake", "elem2": null, },
		"red_dye": { "elem1": "mistake", "elem2": null, },
		"green_dye": { "elem1": "mistake", "elem2": null, },
		"blue_dye": { "elem1": "mistake", "elem2": null, },
		"yellow_dye": { "elem1": "mistake", "elem2": null, },
		"cyan_dye": { "elem1": "mistake", "elem2": null, },
		"magenta_dye": { "elem1": "mistake", "elem2": null, },
		"dye_cleaner": { "elem1": "mistake", "elem2": null, },
		"corrupt_land": { "elem1": "mistake", "elem2": null, },
		"spirit_tear": { "elem2": null, }, // absorbs tears
		"cloud_cotton": { "elem1": "mistake", "elem2": null, },
		"raincloud_cotton": { "elem1": "mistake", "elem2": null, },
		"snowcloud_cotton": { "elem1": "mistake", "elem2": null, },
		"swampland": { "elem1": "mistake", "elem2": null, },
		"swamp_water": { "elem1": "mistake", "elem2": null, },
		"celie_mix": { "elem1": "mistake", "elem2": null, },
		"celie_berry": { "elem1": "mistake", "elem2": null, },
		
		// Fantastic Creatures support
		"egg": { "elem1": "mistake", "elem2": null, },
		"golden_egg": { "elem1": "mistake", "elem2": null, },
		"silk": { "elem1": "mistake", "elem2": null, },
		
		// Ketchup Mod support
		"poisoned_ketchup": { "elem1": "enchanted_ketchup", "elem2": null, }, // enchanted ketchup
		"ketchup_snow": { "elem1": "mistake", "elem2": null, },
		"mayonnaise": { "elem1": "mistake", "elem2": null, },
		"mustard": { "elem1": "mistake", "elem2": null, },
		"fry_sauce": { "elem1": "mistake", "elem2": null, },
		"ketchup_powder": { "elem1": "mistake", "elem2": null, },
		"tomato": { "elem1": "enchanted_ketchup", "elem2": null, },
		"tomato_sauce": { "elem1": "enchanted_ketchup", "elem2": null, }, // enchanted ketchup
		"sugary_tomato_sauce": { "elem1": "enchanted_ketchup", "elem2": null, }, // enchanted ketchup
		"cumin": { "elem1": "mistake", "elem2": null, },
		
		// Neutronium Mod support
		"neutronium": { "elem1": "mistake", "elem2": null, },
		"liquid_hydrogen": { "elem1": "mistake", "elem2": null, },
		"liquid_tralphium": { "elem1": "mistake", "elem2": null, },
		"liquid_deuterium": { "elem1": "mistake", "elem2": null, },
		"liquid_tritium": { "elem1": "mistake", "elem2": null, },
		"radioactive_water": { "elem1": "toxic_mistake", "elem2": null, }, // toxic mistake
		"radioactive_snow": { "elem1": "toxic_mistake", "elem2": null, }, // toxic mistake
		"heavy_water": { "elem1": "mistake", "elem2": null, },
		"heavy_snow": { "elem1": "mistake", "elem2": null, },
		"coal": { "elem1": "firesea", "elem2": null, }, // firesea
		"coal_coke": { "elem1": "firesea", "elem2": null, }, // firesea
		"blast_furnace_fuel": { "elem1": "firesea", "elem2": null, }, // firesea
		"rutile": { "elem1": "mistake", "elem2": null, },
		"titanium_tetrachloride": { "elem1": "mistake", "elem2": null, },
		"liquid_chlorine": { "elem1": "mistake", "elem2": null, },
		"liquid_argon": { "elem1": "mistake", "elem2": null, },
		"berry_seed": { "elem1": "birthpool", "elem2": null, }, // birthpool
		"berry": { "elem1": "mistake", "elem2": null, },
		"juice": { "elem1": "mistake", "elem2": null, },
		"flamer": { "elem1": "firesea", "elem2": null, }, // firesea
		"hematite": { "elem1": "mistake", "elem2": null, },
					
		// Chalcopyrite Mod support
		"chalcopyrite_ore": { "elem1": "mistake", "elem2": null, },
		"chalcopyrite_dust": { "elem1": "mistake", "elem2": null, },
		"copper_concentrate": { "elem1": "mistake", "elem2": null, },
		"fluxed_copper_concentrate": { "elem1": "mistake", "elem2": null, },
		"tailings": { "elem1": "mistake", "elem2": null, },
		
		// Randomness Mod support
		"unnamed_powder": { "elem1": "mistake", "elem2": null, },
		
		// combinations spread to concoction
		"mana": { "elem1": "concoction", "elem2": "concoction", "chance":0.05},
		"mistake": { "elem1": "mistake", "elem2": "mistake", "chance":0.05},
		"birthpool": { "elem1": "birthpool", "elem2": "birthpool", "chance":0.05},
		"chilly_water": { "elem1": "chilly_water", "elem2": "chilly_water", "chance": 0.05},
		"lektre": { "elem1": "lektre", "elem2": "lektre", "chance": 0.05},
		"pure_water": { "elem1": "pure_water", "elem2": "pure_water", "chance": 0.05},
		"sweetsauce": { "elem1": "sweetsauce", "elem2": "sweetsauce", "chance": 0.05},
		"liquid_light": { "elem1": "liquid_light", "elem2": "liquid_light", "chance": 0.05},
		}
};
elements.mistake = {
    "color": ["#2d3240", "#2d2e40", "#312d40"],
	"state": "solid",
    "behavior": behaviors.LIQUID,
	"density": 1250,
	"category": "solids",
	"hidden": true,
	"burn": 200,
    "burnTime": 100,
	"fireColor": ["#968fff", "#af8fff"],
	"burnInto": "mana_bubble",
	"reactions": {
		"concoction": { "elem1": "mistake", "elem2": "mistake", "chance":0.05},
	}
};
elements.birthpool = {
    "color": ["#6bc982", "#6bc995", "#6bc971"],
	"state": "solid",
    "behavior": [
        "XX|CR:sapling%0.01 AND CR:wheat_seed%0.05 AND CR:flower_seed%0.05|XX",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
	"density": 1250,
	"category": "solids",
	"hidden": true,
	"reactions": {
	"concoction": { "elem1": "birthpool", "elem2": "birthpool", "chance":0.005},
    },
};
elements.firesea = {
    "color": ["#a16235", "#d4854c"],
	"state": "solid",
    "behavior": [
        "XX|XX|XX",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
	"density": 1250,
	"category": "solids",
	"burning": true,
	burnTime: 200,
	"hidden": true,
	"reactions": {
		"concoction": { "elem1": "firesea", "elem2": "firesea", "chance":0.005},
		"ash": { "elem2": "everfire_dust"},
		"dust": { "elem2": "everfire_dust"},
    },
};
elements.spirit = {
	color: ["#dbe9ff","#e0dbff","#b0abd4","#b0abd4"],
	behavior: [
		"XX|M1%10|M1%10",
		"XX|FX%1 AND DL%0.5|XX",
		"XX|CR:spirit_tear%0.05|XX",
		],
	category: "energy",
	state: "gas",
	hidden: true
};
elements.furious_spirit = {
	color: ["#36282f","#473239","#473532","#473532"],
	behavior: [
		"XX|M1%10|M1%10",
		"XX|FX%1 AND DL%0.5|XX",
		"XX|CR:magma%0.05|XX",
		],
	category: "energy",
	state: "gas",
	hidden: true
};
elements.spirit_tear = {
	color: ["#2f2769","#382e80","#4436ad"],
	behavior: behaviors.LIQUID,
	category: "liquids",
	state: "liquid",
	hidden: true,
	density: 105
};
elements.lektre = {
	color: ["#ffc74f","#bf9741"],
	behavior: [
		"XX|XX|XX",
		"M2 AND SH%5|XX|M2 AND SH%5",
		"M1 AND SH%5|M1 AND SH%5|M1 AND SH%5",
	],
	category: "liquids",
	state: "liquid",
	hidden: true,
	density: 1250,
	conduct: 0.8,
	viscosity: 100,
};
elements.corrupt_land = {
    color: ["#574954","#574954","#574954","#574954","#574954","#574954","#574954","#574954","#574954","#574954","#574954","#857381"],
    behavior: behaviors.POWDER,
    tempHigh: 1200,
    category: "corruption",
    state: "solid",
    density: 1220,
	reactions: {
		"dirt": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"mud": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"mudstone": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"sand": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"wet_sand": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"packed_sand": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"clay": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"clay_soil": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"mycelium": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"swampland": { "elem1": "corrupt_land", "elem2": "corrupt_land", "chance": 0.05},
		"rock": { "elem1": "corrupt_rock", "elem2": "corrupt_rock", "chance": 0.05},
		"gravel": { "elem1": "corrupt_rock", "elem2": "corrupt_rock", "chance": 0.05},
		"limestone": { "elem1": "corrupt_rock", "elem2": "corrupt_rock", "chance": 0.05},
		"quickline": { "elem1": "corrupt_rock", "elem2": "corrupt_rock", "chance": 0.05},
		"basalt": { "elem1": "corrupt_rock", "elem2": "corrupt_rock", "chance": 0.05},
	}
};
elements.corrupt_rock = {
    color: ["#514c78","#514c78","#2a264d","#2a264d","#514c78","#514c78"],
    behavior: behaviors.POWDER,
    tempHigh: 1200,
    category: "corruption",
    state: "solid",
    density: 1220,
	reactions: elements.corrupt_land.reactions
};
elements.withery = {
	color: ["#454a43","#474a43"],
	behavior: [
	"XX|XX|XX",
	"XX|XX|XX",
	"XX|XX|XX",
	],
	tempHigh: 400,
    stateHigh: "fire",
    category: "corruption",
    burn: 40,
    burnTime: 50,
    burnInto: ["ash","charcoal","fire"],
	hidden: true
};
elements.withery_plant = {
	color: ["#6f786c","#71786c"],
	behavior: [
	"XX|XX|XX",
	"XX|DL%0.1|XX",
	"XX|XX|XX",
	],
	tempHigh: 400,
    stateHigh: "fire",
    category: "corruption",
    burn: 40,
    burnTime: 50,
    burnInto: ["ash","charcoal","fire"],
	hidden: true
};
elements.enchanted_ketchup = {
    color: ["#ff2e69","#ff4d7f"],
    behavior: [
        "XX|CR:magic%1|XX",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
    viscosity: 50000,
    tempHigh: 260,
    stateHigh: ["vinegar","steam","salt","sugar"],
    category:"liquids",
    state: "liquid",
    density: 1235,
	hidden: true
};
elements.celie_mix = {
	color: ["#d9cb8d","#b8a658","#b89258", "#cfb082"],
    behavior: behaviors.LIQUID,
	viscosity: 50,
	state: "liquid",
    density: 1150,
    conduct: 0.02,
	category: "food",
	hidden: true,
};
elements.toxic_mistake = {
	color: ["#567855", "#254524"],
	behavior: [
		"XX|CR:radiation%1|XX",
        "M2|XX|M2",
        "M1|M1|M1",
	],
	state: "liquid",
	burn: 200,
    burnTime: 100,
	fireColor: "#a4d6a3",
	burnInto: ["mana_bubble", "radiation"],
	hidden: true,
},
elements.unstable_mistake = {
	color: ["#6b5248", "#7d645a"],
	behavior: [
		"XX|EX:5 AND EX:6>magic|XX",
        "M2|XX|M2",
        "M1|M1|M1",
	],
	state: "liquid",
	burn: 200,
    burnTime: 100,
	fireColor: "#a4d6a3",
	burnInto: ["mana_bubble"],
	hidden: true,
},
elements.cloud_cotton = {
	color: ["#d1dbf0", "#b3c3e6"],
	behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%10|M1%25|M2%10",
	],
	category: "powders",
	density: 750,
	reactions: {
		"water": { "elem1": "raincloud_cotton", "elem2": null },
		"snow": { "elem1": "snowcloud_cotton", "elem2": null },
	}
	
},
elements.raincloud_cotton = {
	color: ["#8b98b3", "#6d788f"],
	behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%10|M1%25|M2%10",
	],
	category: "powders",
	density: 750,
	temp: 60,
	tempHigh: 70,
	stateHigh: "rain_cloud",
},
elements.snowcloud_cotton = {
	color: ["#a1acc2", "#8090b0"],
	behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%10|M1%25|M2%10",
	],
	category: "powders",
	density: 750,
	temp: 0,
	tempLow: -10,
	stateLow: "snow_cloud",
},
elements.frostbomb = {
	color: "#72dfed",
    behavior: [
        "XX|XX|XX",
        "XX|EX:15>frostwind|XX",
        "XX|XX|XX",
    ],
	category: "energy"
}
elements.pearl_growth_crystal = {
	color: ["#e1a1f7","#e1a1f7","#d195e6","#f2cbf7"],
    behavior: [
        "XX|CR:pearl_growth_crystal%0.4|XX",
        "CR:pearl_growth_crystal%0.4|CH:pearl_crystal%0.8|CR:pearl_growth_crystal%0.4",
        "XX|CR:pearl_growth_crystal%0.8|XX",
    ],
	category: "land",
}
elements.pearl_crystal = {
	color: ["#d195e6","#d195e6","#d195e6","#d9b6de"],
    behavior: behaviors.WALL,
	category: "land",
	hidden: true,
}
elements.ivory_growth_crystal = {
	color: ["#d6c2ae","#d6c2ae","#d6c2ae","#edddcc"],
    behavior: [
        "XX|CR:ivory_growth_crystal%0.4|XX",
        "CR:ivory_growth_crystal%0.4|CH:ivory_crystal%0.8|CR:ivory_growth_crystal%0.4",
        "XX|CR:ivory_growth_crystal%0.8|XX",
    ],
	category: "land",
}
elements.ivory_crystal = {
	color: ["#bfad9b","#bfad9b","#bfad9b","#d6c8b8"],
    behavior: behaviors.WALL,
	category: "land",
	hidden: true,
}
elements.sky_growth_crystal = {
	color: ["#aec6e6","#aec6e6","#aec6e6","#d1def0"],
    behavior: [
        "XX|CR:sky_growth_crystal%0.4|XX",
        "CR:sky_growth_crystal%0.4|CH:sky_crystal%0.8|CR:sky_growth_crystal%0.4",
        "XX|CR:sky_growth_crystal%0.8|XX",
    ],
	category: "land",
}
elements.sky_crystal = {
	color: ["#95aac7","#95aac7","#95aac7","#b6c2d4"],
    behavior: behaviors.WALL,
	category: "land",
	hidden: true,
},
elements.swampland = {
	color: "#382a1c",
	behavior: [
	"XX|XX|XX",
	"XX|XX|XX",
	"XX|M1|XX",
	],
	category: "land",
	reactions: {
		//"light": { "elem2": "will_o_wisp" }
	},
},
elements.swamp_water = {
	color: "#524b44",
	behavior: [
	"XX|XX|XX",
	"M2|XX|M2",
	"M1|M1|M1",
	],
	category: "liquids",
	reactions: {
		//"light": { "elem2": "will_o_wisp" }
	},
},
/*elements.will_o_wisp = { // Element will be added when a related bug is fixed
	color: ["#f2eeb3","#f2e3b3"],
	behavior: [
	"XX|M1|XX",
	"XX|DL%1|XX",
	"XX|XX|XX",
	],
	rotatable: false,
	category: "energy",
	hidden: true,
},*/

elements.sweetsauce = { // placeholder for future feature i'm still working on
	color: ["#daedea", "#edeada"],
	behavior: [
        "XX|XX|XX",
        "XX|CH:mistake|XX",
        "XX|XX|XX",
    ],
	hidden: true,
	extraInfo: "This element is coming soon!"
}
