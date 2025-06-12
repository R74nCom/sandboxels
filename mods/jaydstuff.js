//jaydstuff
//ooooo dependencies
if (!enabledMods.includes("mods/nousersthings.js")) { enabledMods.unshift("mods/nousersthings.js"); localStorage.setItem("enabledMods", JSON.stringify(enabledMods)); window.location.reload(); };
async function _jaydstuffjsprompt(message, defaultValue = "") {


    return new Promise(resolve => {


        promptInput(message, (result) => {


            resolve(result);


        }, "jaydstuff.js is asking you...", defaultValue);


    })
}
elements.super_raincloud = {
    color: "#0000ff",
    behavior: [
        "XX|M1%10|XX",
        "M1%5|XX|M1%5",
        "CR:water%40|CR:water%40|CR:water%40",
    ],
    category: "gases",
    state: "gas",
    density: 50,
},
elements.deuterium = {
    color: "#558bcf",
        behavior: behaviors.GAS,
          reactions: {
        "oxygen": { elem1:null, elem2:"heavy_steam", tempMin:500 },
        "tritium": { elem1:"neutron", elem2:"helium", tempMin:100000000, temp1:150000000, temp2:150000000 },
        "fire": { elem1:"explosion", chance:0.005 },
    },
    category: "gases",
    burn: 100,
    burnTime: 2,
    burnInto: ["fire","fire","fire","fire","fire","fire","fire","fire","fire","fire","fire","fire","heavy_steam"],
    tempLow: -253,
    stateLow: "liquid_deuterium",
    state: "gas",
    density: 0.180,
    conduct: 0.02,
    colorOn: "#d6462d"
},
elements.liquid_deuterium = {
    color: "#97afcf",
    behavior: behaviors.LIQUID,
    reactions: {
        "liquid_oxygen": { elem1:"heavy_ice", elem2:null },
        "oxygen": { elem1:"ice", elem2:null }
    },
    category: "states",
    burn: 100,
    burnTime: 2,
    temp: -255.879,
    tempHigh: -252.879,
    stateHigh: "hydrogen",
    tempLow: -259.2,
    state: "liquid",
    density: 163.83,
    hidden: true
},
elements.tritium = {
    color: "#558bcf",
        behavior: [
                "M2|M1 AND CR:radiation%0.125|M2",
                "M1|XX|M1",
                "M2|M1 AND CR:radiation%0.05125|M2",
            ],
          reactions: {
        "oxygen": { elem1:null, elem2:"tritiated_steam", tempMin:500 },
        "deuterium": { elem1:"neutron", elem2:"helium", tempMin:100000000, temp1:150000000, temp2:150000000 },
        "fire": { elem1:"explosion", chance:0.005 },
    },
    category: "gases",
    burn: 100,
    burnTime: 2,
    burnInto: ["fire","fire","fire","fire","fire","fire","fire","fire","fire","fire","fire","fire","steam"],
    tempLow: -253,
    stateLow: "liquid_tritium",
    state: "gas",
    density: 0.269,
    conduct: 0.02,
    colorOn: "#d6462d"
},
elements.liquid_tritium = {
    color: "#97afcf",
    behavior: [
        "XX|CR:radiation%0.125|XX",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
    reactions: {
        "liquid_oxygen": { elem1:"tritiated_ice", elem2:null },
        "oxygen": { elem1:"ice", elem2:null }
    },
    category: "states",
    burn: 100,
    burnTime: 2,
    temp: -255.879,
    tempHigh: -252.879,
    stateHigh: "tritium",
    tempLow: -259.2,
    state: "liquid",
    density: 213,
    hidden: true
},
elements.heavy_water = {
    color: "#2167ff",
    behavior: behaviors.LIQUID,
    tempHigh: 101.4,
    stateHigh: "heavy_steam",
    tempLow: 0,
    stateLow: "heavy_ice",
    category: "liquids",
    heatCapacity: 4.184,
    reactions: {
        // electrolysis:
        "aluminum": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0025 },
        "zinc": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.015 },
        "steel": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0125 },
        "iron": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0125 },
        "tin": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.01 },
        "brass": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.001 },
        "bronze": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.001 },
        "copper": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0075 },
        "silver": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0075 },
        "gold": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0075 },
    },
    state: "liquid",
    density: 1107,
    conduct: 0.02,
    stain: -0.5,
    extinguish: true
},
elements.heavy_steam = {
    color: "#abd6ff",
    behavior: behaviors.GAS,
    reactions: {
        "copper": { elem1:"oxygen", elem2:"oxidized_copper", chance:0.01 },
        "bronze": { elem1:"oxygen", elem2:"oxidized_copper", chance:0.005 },
        "iron": { elem1:"oxygen", elem2:"rust", chance:0.005 },
        "steel": { elem1:"oxygen", elem2:"rust", chance:0.004 },
    },
    temp: 150, 
    tempLow: 95,
    extraTempLow: {
        0: "heavy_rime"
    },
    stateLow: "heavy_water",
    category: "gases",
    state: "gas",
    density: 1,
    conduct: 0.002,
    stain: -0.05,
    alias: "heavy water vapor",
    extinguish: true
},
elements.heavy_ice = {
    color: "#b2daeb",
    behavior: behaviors.WALL,
    temp: -5,
    tempHigh: 5,
    stateHigh: "heavy_water",
    category: "solids",
    state: "solid",
    density: 1014.202,
    breakInto: "heavy_snow"
},
elements.tritiated_water = {
    color: "#2167ff",
    behavior: [
        "XX|CR:radiation%0.125|XX",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
    tempHigh: 101.4,
    stateHigh: "tritiated_steam",
    tempLow: 0,
    stateLow: "tritiated_ice",
    category: "liquids",
    heatCapacity: 4.184,
    reactions: {
        // electrolysis:
        "aluminum": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0025 },
        "zinc": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.015 },
        "steel": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0125 },
        "iron": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0125 },
        "tin": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.01 },
        "brass": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.001 },
        "bronze": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.001 },
        "copper": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0075 },
        "silver": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0075 },
        "gold": { elem1:["deuterium","deuterium","oxygen"], charged:true, chance:0.0075 },
    },
    state: "liquid",
    density: 1107,
    conduct: 0.02,
    stain: -0.5,
    extinguish: true
},
elements.tritiated_steam = {
    color: "#abd6ff",
    behavior: [
            "M2|M1 AND CR:radiation%0.125|M2",
            "M1|XX|M1",
            "M2|M1 AND CR:radiation%0.05125|M2",
        ],
    reactions: {
        "copper": { elem1:"oxygen", elem2:"oxidized_copper", chance:0.01 },
        "bronze": { elem1:"oxygen", elem2:"oxidized_copper", chance:0.005 },
        "iron": { elem1:"oxygen", elem2:"rust", chance:0.005 },
        "steel": { elem1:"oxygen", elem2:"rust", chance:0.004 },
    },
    temp: 150,
    tempLow: 95,
    extraTempLow: {
        0: "heavy_rime"
    },
    stateLow: "tritiated_water",
    category: "gases",
    state: "gas",
    density: 0.6,
    conduct: 0.002,
    stain: -0.05,
    alias: "tritiated water vapor",
    extinguish: true
},
elements.tritiated_ice = {
    color: "#b2daeb",
    behavior: [
        "XX|CR:radiation%0.125|XX",
        "CR:radiation%0.125|XX|CR:radiation%0.125",
        "XX|CR:radiation%0.125|XX",
    ],
    temp: -5,
    tempHigh: 5,
    stateHigh: "tritiated_water",
    category: "solids",
    state: "solid",
    density: 1014.202,
    breakInto: "tritiated_snow"
},
elements.fusion = {
    color: "#ffffff",
    tool: function(pixel) {
        pixel.temp = 100000000;
		pixelTempCheck(pixel)
    },
    category: "tools",
},
elements.meese = {
    color: "#996515",
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.25|M2%0.5 AND BO",
        "XX|M1|XX",
    ],
     category: "life"
},
elements.fluoroantimonic_acid = {
        color: ["#b5cf91","#a1ff5e","#288f2a"],
    behavior: [
        "XX|DB%5|XX",
        "DB%5 AND M2|XX|DB%5 AND M2",
        "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2",
    ],
    ignore: ["glass","rad_glass","glass_shard","rad_shard","stained_glass","baked_clay","acid_gas","neutral_acid","copper","gold","porcelain"],
    category: "liquids",
    state: "liquid",
    density: 2885,
    hidden: true,
    stain: -0.1,
},
elements.tritium_ice = {
    color: "#b5d2ff",
    behavior: [
        "XX|CR:radiation%0.125|XX",
        "CR:radiation%0.125|XX|CR:radiation%0.125",
        "XX|CR:radiation%0.125|XX",
    ],
    temp: -259,
    tempHigh: -256,
    stateHigh: "liquid_tritium",
    category: "states",
    state: "solid",
    density: 258,
},
elements.unstain = {
    category: "tools",
    stain: -1,
    tool: (pixel) => {
        doStaining({
            element: "unstain",
            x: pixel.x,
            y: pixel.y
        })
    }
},
elements.legacy_hydrogen = {
    color: "#558bcf",
    behavior: behaviors.GAS,
    reactions: {
        "oxygen": { elem1:null, elem2:"steam", tempMin:500 },
        "hydrogen": { elem1:"neutron", elem2:"helium", tempMin:10000, temp1:10000, temp2:10000 },
        "nitrogen": { elem1:null, elem2:"oxygen", tempMin:10000 },
        "sulphur": { elem1:null, elem2:"chlorine", tempMin:10000 },
        "neon": { elem1:null, elem2:"sodium", tempMin:10000 }
    },
    category: "gases",
    burn: 100,
    burnTime: 2,
    tempLow: -253,
    stateLow: "liquid_hydrogen",
    state: "gas",
    density: 0.08375,
    conduct: 0.02,
    colorOn: "#d6462d"
},
elements.ultimate_reset = {
    color: "#ff0000",
    behavior: [
        "XX|XX|XX",
        "XX|EX:1000000000000000000000000000000000000000000000000>ultimate_reset,flash AND CR:ultimate_reset|XX",
        "XX|XX|XX",
    ],
    category: "tools",
    state: "solid",
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.ultimate_reset_2 = {
    color: "#ff0000",
    onSelect: function() {
        for (let i = 0; i < 10e+20000000000000; i++) {
            console.log("hi");
        }
    },
    category: "tools",
    state: "solid",
    excludeRandom: true,
    cooldown: defaultCooldown
},/*
elements.ultimate_reset_3 = {
    color: "#ff0000",
    behavior: Array(1000).fill(Array(1000).fill("CC:#")),
    category: "tools",
    state: "solid",
    excludeRandom: true,
    cooldown: defaultCooldown
},*/
textures.transparency = [
    "wwwggg",
    "wwwggg",
    "wwwggg",
    "gggwww",
    "gggwww",
    "gggwww"
]
elements.Methionylthreonylthreonylglutaminylalrylglycylphenylalanylprolylvalylprolyylglycylarginylalanyllysylleucylthreonylglutamylleucylleucylvalyllysylalanutaminylvalylarginylvalylthreonylglycglutaminylglutamylglycylaspartylleucyylthreonylserylthreonylalanylglutamylglutaminylthreonylarginylisoleucylglunylglutaminylleucylprolylhistidyllysyylglutaminylserylprolylserylprolylisoonylserylprolylisoleucylarginylserylvtamylglycyltyrosylvalylalanylserylsercylarginyltyrosylglycylvalylglutaminyserylalanylseryltyrosylalanylalanylglulalanyllysylglutamylvalyllysylglutaminlanylalanylvalylalanylthreonylvalylvallalanylarginylvalylarginylglutamylproltamylglutaminylthreonylalanylglutaminyeonylalanylvalylhistidylisoleucylglutaglutaminylvalylarginyllysylglutamylalathreonyllysylvalylvalylvalylalanylalanlutaminylglutamylleucyllysylserylarginleucylthreonylthreonyllysylglutaminylgalylthreonylhistidylglutamylglutaminylylglutamyllysylthreonylphenylalanylvalylalanylalanyllysylalanyllysylglutamyloleucylserylglutamylglutamylisoleucylttaminylvalylthreonylglutaminylglutamylylthreonylarginyllysylthreonylvalylvalnylthreonylprolyllysylvalyllysylglutamlarginylglycylarginylglutamylglycylisolutamylglutaminylvalylglutaminylisoleuethionylarginyllysylglutamylalanylgluthreonylisoleucylalanylvalylalanylthreoutaminylglutamylthreonylisoleucylleucyonylmethionylalanylthreonylarginylglututaminylvalylthreonylhistidylglycyllyslalanylglutamylalanylvalylalanylthreonylglutaminylalanylarginylvalylarginylglycylhistidylleucylglutamylglutamylserthreonylthreonylleucylglutamyltyrosylgleucylserylalanylalanyllysylvalylalanynylprolylalanylserylglutamylprolylhistllysylprolylarginylvalylisoleucylglutanylhistidylisoleucyllysylthreonylthreohionylhistidylisoleucylserylserylglutaeonylaspartylleucylthreonylthreonylglulaspartyllysylarginylprolylarginylthrealanylthreonylvalylseryllysylisoleucylylhistidylglycyltyrosylglutamylalanylslisoleucylalanylthreonylleucylglutamineonylserylserylalanylglutaminyllysylisalanylprolylthreonylvalyllysylprolylsenylalanylglutamylprolylthreonylprolyllolylphenylalanylalanylaspartylthreonylerylglutamylalanylglycylvalylglutamylvlylserylisoleucylthreonylglycylthreonyylarginylphenylalanylglutamylvalylleucyllysylvalylthreonylglutamylthreonylalalylglutamylisoleucylprolylvalylthreonrylglycylleucyllysylasparaginylvalylthlutamylserylvalylthreonylleucylglutamycyltyrosylprolylserylprolylthreonylvallutamylaspartyltyrosylglutaminylisoleutylphenylalanylglutaminylisoleucylthreylisoleucylalanylarginylleucylmethionyylalanylalanylglutamylaspartylserylglyinylserylalanylvalylasparaginylglutamyonylserylcysteinyltyrosylleucylalanylvtamylphenylalanylglutamyllysylglutamylglutamyllysylphenylalanylthreonylthreoylalanylvalylglutamylserylarginylaspartylthreonylserylleucylthreonylglutamyllglycylglutamylprolylalanylalanylprolyyllysylprolylvalylvalylglutaminyllysyllvalylvalylphenylalanylglycylcysteinylnylprolyllysylprolylhistidylvalyltyroslylprolylleucylthreonylthreonylglycylttyrosylasparaginyllysylglutaminylthreoylvalylisoleucylserylmethionylthreonyllanylglycylglutamyltyrosylthreonylisolsylhistidylglycylglutamylthreonylseryllutamylglutamylalanylaspartyltyrosylglylglutaminylglutaminylglutamylmethionytaminylvalylthreonylalanylphenylalanylylvalylglycylglutamylthreonylalanylprorylglutamyltyrosylglutamyllysylglutamyinylalanylleucylisoleucylarginyllysylleonylvalylvalylvalylarginylthreonyltyrglutamylphenylalanylhistidylisoleucylsylarginylleucylisoleucyllysylglutamyliucylisoleucyllysylthreonylthreonylleucmylglutamylaspartylglycylglutamylglutalisoleucylserylglutamylserylglutamylallanylaspartylleucylarginylisoleucyllyslleucylglutamylglycylmethionylglycylvaeinyllysylmethionylserylglycyltyrosylpyltryptophyltyrosyllysylaspartylglycyllycylglutamylarginyltyrosylglutaminylmlutaminylaspartylglycylarginylalanylselvalylleucylprolylglutamylaspartylglutlanylphenylalanylalanylserylasparaginynylisoleucylcysteinylserylglycyllysyllylalanylprolylleucylglycylalanylprolylnylleucylglutamylprolylvalylserylarginrolylarginylserylvalylserylarginylseryylprolylalanylarginylmethionylserylprolalanylarginylmethionylserylprolylalanarginylarginylleucylglutamylglutamylthylleucylglutamylarginylleucyltyrosyllyyllysylprolylvalylserylphenylalanyllysylasparaginylcysteinylarginylphenylalacylarginylprolylmethionylprolylglutamyylalanylhistidylaspartylglycylglutaminylaspartyltyrosylthreonylhistidyllysylartylglycylthreonylglutaminylserylleucylthreonylprolylserylaspartylserylglyclylalanylglutaminylasparaginylarginylaylserylvalylisoleucylleucylthreonylvalylglutaminylvalyllysylprolylmethionylplysylasparaginylvalylasparaginylisoleueucylglutamylmethionyllysylvalylarginylylasparaginylprolylaspartylisoleucylvlserylaspartylisoleucylisoleucylvalylplisoleucylarginylisoleucylglutamylglycalanylleucyllysylisoleucylaspartylseryylserylalanyltryptophyltyrosylthreonylginyllysylalanylglycylarginylaspartyltlvalylasparaginylvalylglutamylvalylgluylglutamylprolylglutamylarginyllysylleglycylthreonyltyrosylarginylalanyllysylglutamylleucylglutamylprolylleucylhisaminylglutamylglutaminyltryptophylglutosylaspartyllysylglutamyllysylglutaminphenylalanyllysyllysyllysylleucylthreoinylphenylalanylglycylprolylalanylhistginylleucylthreonylprolylisoleucylseryylvalylglutamyltryptophylleucylhistidytamylalanylalanylasparaginylarginylleuinylglutamylphenylalanylglycyltyrosylclycylvalylalanyltyrosylserylarginylasphreonylcysteinylarginylalanylthreonylalaspartylhistidylthreonylserylalanylthrtylglutamyllysylserylleucylvalylglutalylglutamylglycylarginyllysylglycylleuylglutamylleucylglutamylarginylmethionlleucylthreonylglycylvalylthreonylthrelysylglutaminyllysylprolylaspartylisolylprolylvalylarginylvalylleucylglutamylphenylalanylarginylcysteinylarginylvaminylprolyllysylvalylasparaginyltryptolutaminylleucylisoleucylarginyllysylsealylarginyltyrosylaspartylglycylisoleuleucylvalylaspartylcysteinyllysylserylylvalyllysylvalylthreonylalanylglutamyylisoleucylglutamylhistidyllysylvalyllylglutaminylarginylglutamylaspartylpheinylarginylalanylprolylglutamylprolylatidylvalylhistidylglutamylprolylglycylutamylvalylglutaminyllysylvalylaspartythreonylglutamylthreonyllysylglutamylvnylglutamylarginylisoleucylthreonylhisylglutamylserylglutamylglutamylleucylaginylarginylthreonylglutamylglutamylglleucylthreonylalanylvalylglutamylleucylglutamylseryltyrosylglutamylglutamylllaspartylglutamylleucylleucylhistidyltlthreonylglutamylglutamylglutamyllysylamylglycyllysylisoleucylthreonylisoleurolylaspartyllysylisoleucylglutamylleulalanylprolyllysylisoleucylphenylalanyserylglutaminylthreonylvalylglycylglutidylphenylalanylarginylvalylarginylvallylglutamylcysteinylglutamyltryptophylysylisoleucylglutamylarginylserylasparltyrosyltryptophylprolylglutamylaspartleucylvalylisoleucylarginylaspartylvalylalanylserylisoleucylmethionylvalyllycylalanylglycylglutamylthreonylserylseleucylvalylglutaminylalanyllysylglutamanylthreonylglutaminylglutamylleucylglylglutamyllysylaspartylthreonylmethionlcysteinylglutamylthreonylserylglutamyysyltryptophyltyrosyllysylaspartylglyctamylglycylaspartyllysyltyrosylarginylyllysylvalylhistidylphenylalanylleucylylaspartylthreonylserylaspartylalanylglvalylleucylvalylglutamylaspartylglutaeonylalanyllysylleucylisoleucylvalylgllphenylalanylvalyllysylglutamylleucylgalylprolylglutamylseryltyrosylserylglysoleucylvalylserylprolylglutamylasparayptophyltyrosylhistidylasparaginylaspaparaginylglycyllysyltyrosylthreonylisoycylarginylglutaminylasparaginylleucylonyllysylglutamylaspartylglutaminylglyvalylisoleucylaspartylglycyllysyllysylllysylmethionyllysylprolylarginylprolyaminylglycylleucylserylaspartylglutamilaspartylisoleucylvalylglutaminylleucyglutamylserylvalylglutamylglycylvalyltylglutaminylglutamylvalylglutaminylprolisoleucylvalylisoleucylaspartyllysylgylleucylisoleucylglutamylaspartylmethianylglycylasparaginyltyrosylserylphenylleucylglycylleucylserylthreonylserylgerylvalylaspartylvalylisoleucylthreonyraginylvalylisoleucylglutamylglycylthrcysteinyllysylvalylserylvalylprolylaspyptophyltyrosylleucylasparaginylaspartrolylaspartylaspartylarginylvalylglutalthreonyllysylglutaminylarginylleucylvonylhistidylalanylserylaspartylglutamyeucylvalylglycylarginylvalylglutamylthylleucylserylvalylglutamyllysylisoleuccylleucylarginylaspartylleucylthreonylutaminylasparaginylvalylvalylphenylalahistidylserylglycylisoleucylaspartylvalalanyllysylaspartyllysylglutamylisoleyllysylisoleucylglutamylalanylhistidylcylthreonylvalylleucylasparaginylmethilutamylglycyllysyltyrosylthreonylphenysparaginylmethionylthreonylserylglycyllglycylalanylisoleucylseryllysylprolyleonylvalylalanylglutamylserylglutaminytamylcysteinylglutamylvalylalanylasparlglutamyltryptophylleucylarginylaspartucylthreonylasparaginylasparaginylisoltylglycylhistidyllysylarginylarginyllehreonyllysylleucylaspartylaspartylisolyrosyllysylvalylalanylthreonylseryllysylvalylglutamylalanylvalyllysylisoleucraginylleucylthreonylvalylthreonylglutlvalylphenylalanylthreonylvalylglutamyginylvalyllysylglycylvalylglutaminyltrycylvalylvalylleucylglutamylserylasparleucylserylvalyllysylglycylthreonylisoeucyllysylasparaginylcysteinylalanylislyltyrosylglycylphenylalanylarginylleuerylalanylarginylleucylhistidylvalylgloleucyllysyllysylprolyllysylaspartylvaraginylalanylthreonylvalylalanylphenylistidylaspartylthreonylvalylprolylvalyllysylserylvalylglutamylisoleucyllysylinylleucylvalylserylglutamylarginyllysleucylglutaminylasparaginylisoleucylselutamyltyrosylthreonylalanylvalylvalylinyllysylalanyllysylleucylphenylalanylisoleucylthreonyllysylthreonylmethionyalylprolylglutamylthreonyllysylthreonyteinylglutamylvalylserylhistidylphenylthionyltryptophylleucyllysylasparaginyylmethionylserylglutamyllysylphenylalaylglycyllysylleucylhistidylglutaminyllaraginylthreonylserylthreonylglutamylareonylphenylalanylvalylcysteinylglycylerylalanylthreonylleucylthreonylvalylteucylthreonylserylmethionylleucyllysyllutamylglutamyllysylaspartylthreonylisvalylthreonylvalylasparaginyltyrosylglsyltryptophylleucyllysylasparaginylglythreonylaspartyllysylcysteinylglutaminlleucylthreonylhistidylserylleucylaspaalylhistidylphenylalanylglycylaspartylphenylalanylvalylalanylglycyllysylalanylleucyltyrosylvalylglutamylalanylargilanylarginyllysylhistidylisoleucyllysylutamyllysyllysylarginylalanylmethionymylvalylserylglutamylprolylaspartylisophylmethionyllysylaspartylaspartylglutucylthreonylaspartylarginylisoleucyllylysyltyrosylvalylhistidylarginylleucylrginylmethionylserylaspartylalanylglycnylglycylglycylasparaginylvalylserylthvalylglutamylglycylarginylaspartylvalycyllysyllysylglutamylvalylglutaminylvaarginylalanylvalylvalylglutamylphenylaylaspartylaspartylvalylaspartylalanylhylglycylisoleucylglutamylisoleucylaspalutaminylglutamylarginylhistidyllysyltnylisoleucylhistidylarginylmethionylpheonylarginylglutaminylserylaspartylalanylalanylvalylalanylglycylarginylasparlleucyltyrosylvalylasparaginylalanylpralylleucylglutaminylglutamylleucylglutminylserylglycyllysylprolylalanylarginnylisoleucylserylglycylarginylprolylglyptophyltyrosyllysylglutamylglutamylglycylphenylalanyllysylcysteinyllysylpheylglutaminylglutamyltyrosylthreonylleunylphenylalanylprolylglutamylaspartylaeinylglutamylalanyllysylasparaginylaspylthreonylserylalanylserylleucylserylvlvalylserylprolylaspartylglutaminylglulylprolylalanylisoleucylisoleucylthreoreonylvalylthreonylserylglutamylglycylalanylglutaminylcysteinylarginylvalylsylvalylseryltryptophyltyrosylseryllysyolylserylarginylphenylalanylphenylalanlphenylalanylglutamylaspartylthreonyltucylalanylglutamylalanyltyrosylprolylgyltyrosylthreonylphenylalanylvalylalanglycylglutaminylvalylserylserylthreonyglutamylalanylprolylglutamylserylisoleoleucylglutamylglutaminylglutamylisolenyllysylglutamylphenylalanylserylseryllutamylglutamylglutamylglycylleucylhisminylleucylseryllysylisoleucylasparagiucylleucylserylglutamylserylprolylvalyanylaspartylserylglutamyllysylglutamylphenylalanylisoleucyllysylglutamylvalyeucylserylmethionylglycylaspartylvalylnylvalylisoleucylglycylisoleucylprolyltryptophylphenylalanylphenylalanylaspanylprolylserylalanylaspartyltyrosyllysrtylglycylaspartylaspartylhistidylseryylalanylthreonyllysylleucylglutamylasphreonylcysteinylmethionylalanylserylasthreonylisoleucylcysteinylserylalanyltylseryllysylglycylglutamylglycylhistidonylglutamylserylalanylvalylalanyllysyylglycylprolylcysteinylprolylprolylhislleucyllysylprolylisoleucylarginylcystolylalanylisoleucylphenylalanylglutamytamylprolylalanylprolylthreonylvalylthutamylasparaginyllysylglutaminylleucylyrosylthreonylisoleucylisoleucylhistidlserylglycylthreonylphenylalanylisoleuutaminylarginylglutamylaspartylserylgllysylalanylglutamylasparaginylmethionyysteinylalanylalanylglutamylleucylleucthreonylaspartylmethionylthreonylasparyllysylserylthreonylprolylglutamylalanlprolylglutaminylthreonylprolylleucyllalanylleucylaspartylserylglutamylglutalphenylalanylvalyllysylaspartylthreonyucylisoleucylthreonylglutamylglutamylalseryltyrosylglutamylhistidylisoleucyllleucylserylserylglutaminylleucylprolyylleucylglutaminylserylisoleucylleucylylthreonylprolylglutamylserylthreonylateinylisoleucylasparaginylglycylserylinylprolylleucyllysylglutamylprolylseryeucylglutaminylisoleucylvalylglutaminyalanylseryllysylglutamylglycylisoleucymylprolylglutamylthreonylglutaminylalaglutamyllysylisoleucylphenylalanylprollglutamylglutaminylisoleucylasparaginyolylleucyllysylthreonylleucylleucylalaraginyltyrosylprolylglutaminylserylserionylhistidylseryltyrosylleucylthreonylylleucylserylleucyllysylglutamyllysylsparaginylarginylglutamylglutaminylargsylglutaminylglutamylalanylglutaminylslglutaminylserylleucylalanylglutamylgllglutaminylserylprolylaspartylvalylmetasparaginyltyrosylglutamylprolylleucylylcysteinylthreonylglutamylglycylglycymylserylalanylasparaginylprolylleucylgminylaspartylserylalanylvalylarginyliserylleucylarginylphenylalanylprolylleulglutaminylvalylleucylleucyllysylglutaaraginylvalylvalylmethionylprolylprolyylglutamylseryllysylarginylglutamylprolylglutaminylglutamylvalylglutaminylglllysylglutamylserylleucylleucylserylglglutaminylarginylleucylasparaginylleuccysteinylarginylalanylleucylglutaminyllglutaminylprolylglycylleucylphenylalainylasparaginylisoleucylglutamyllysylvlasparaginylisoleucylthreonylglutaminyucylmethionylcysteinylmethionyltyrosylserylvalylthreonylglutamylglutamylvalylglutamylaspartylvalylaspartylprolylgleucyllysylmethionylglutamylleucylarginylisoleucylisoleucyltyrosylglutamylgluylthreonylalanylglutamylglycylprolylarlycylalanyllysylthreonylserylleucylgluartylserylphenylalanylserylglycylserylsoleucylthreonylglutamylprolylglutamyllisoleucylserylthreonylglutamylglutamyaginylvalylglutaminylserylarginylvalyleonylprolylvalylthreonyllysylglycylvalspartylglutamyllysylglutaminylaspartylglutamylglutamyllysylglutamylglutamylsreonylglutamylglutamylvalylalanylthreotamylalanylglutamylglycylglycylleucyliprolylmethionylisoleucylhistidylthreonvalylserylglutamylglutamylglycylaspartnylthreonylserylisoleucylthreonylasparaginyltryptophyltyrosylphenylalanylglulylserylaspartylglutamyllysylphenylalapartylglutaminylasparaginylthreonyltyrartyllysylvalylasparaginylthreonylglutlglutamyltyrosylvalylcysteinylglutamyllglycyllysylthreonylalanylthreonylseryllysylarginylalanylalanylprolylvalylisutamylprolylleucylglutamylvalylalanylllphenylalanylthreonylcysteinylglutamyllasparaginylvalylarginylphenylalanylglalanylglycylarginylglutamylisoleucyltyeinylserylisoleucylarginylserylseryllyglutamylisoleucylleucylarginylthreonylylglycylglutamyltyrosylthreonylcysteinyltyrosylglycylserylvalylserylcysteinyylvalylthreonylvalylprolylglycylglycylleucylleucylprolylglutamylarginyllysylutamylvalylvalylleucyllysylserylvalyllmylglutamylglutamylglutamylprolyllysylglutamyllysylvalyllysyllysylprolylalanolylprolyllysylprolylvalylglutamylglutlvalylthreonyllysylarginylglutamylargiylthreonyllysylvalylprolylglutamylisolylleucylprolylalanylprolylglutamylprolnylglutamylvalyllysylthreonylisoleucyllprolylglutamylprolylthreonylprolylisoylvalylprolylvalylvalylglycyllysyllysylyllysylglutamylglutamylalanylalanyllylysylglycylvalylprolyllysyllysylthreonlalanylglutamylarginylarginyllysylleuccylglutamyllysylprolylprolylaspartylglnyltyrosylglutaminylleucyllysylalanylvlyllysylglutamylisoleucyllysylaspartyltamylserylglutamylphenylalanylvalylglylanylglutamylcysteinylleucylvalylserylhreonylthreonyltryptophylmethionyllysyeucylarginylglutamylserylprolyllysylhilanylaspartylglycyllysylaspartylarginycylaspartylvalylglutaminylleucylserylahreonylcysteinylvalylleucylarginylleucylthreonylserylthreonylalanyllysylleucrolylvalylarginylphenylalanylvalyllysyamylvalylthreonylvalylvalyllysylglycylserylcysteinylglutamylleucylasparaginyalyltryptophylarginyllysylaspartylglycysylprolylglycylarginylisoleucylvalylpylmethionylarginylalanylleucylthreonylspartylaspartylthreonylaspartylalanylgreonylvalylglutamylasparaginylalanylasysteinylserylserylcysteinylvalyllysylvnylaspartyltryptophylleucylvalyllysylpinylhistidylvalyllysylprolyllysylglycylalanylcysteinylaspartylisoleucylalanyinylisoleucyllysyltryptophylphenylalanlisoleucylprolylalanylglutamylprolylasmylisoleucylleucylarginylaspartylglycyucyllysylisoleucyllysylasparaginylalanoleucylalanylglutamyltyrosylalanylvalyylarginyltyrosylprolylalanyllysylleucylglutamylvalylglutamylleucylleucyllysyylthreonylisoleucyltyrosylglutamyllysyylaspartylalanylglutamylisoleucylserylylglycylglutaminyltryptophyllysylleucyinylprolylserylprolylthreonylcysteinyllglycylglycyllysylarginylphenylalanyllyllysylleucylaspartylglutaminylalanylgaminylalanylleucylasparaginylalanylisoylleucylthreonylvalyllysylglutamylisolanylalanylvalylprolylleucyllysylaspartrginylarginylglutaminylalanylarginylphcylthreonylarginylglutamylalanylasparaysylglycylprolylaspartylisoleucylisolenylalanylaspartylisoleucylisoleucylalaisoleucylleucylvalylisoleucylasparaginylaspartylaspartylglutamylglycylvalyltutamylglycyllysyllysylthreonylserylalareonylglycylisoleucylarginylleucyllysyucylglutamylaspartylglutaminylthreonyleonylalanylthreonylphenylalanylvalylcylutamyllysylmethionylhistidylvalylvalyinylaspartylalanyllysylleucylhistidyltcylisoleucylserylserylglutamylglycyllymylmethionyllysylglutamylvalylthreonyllglutaminylisoleucyllysylalanylglutamiylthreonylalanylglutaminylleucyllysylvlyltyrosylphenylalanylthreonylvalyllysylalanylvalylglutamyllysylaspartylglutteinylglutamylvalylseryllysylaspartylvlalanyllysylaspartylglycylglutamylglutlysyltyrosylserylisoleucyllysylalanylaoleucylleucyllysylisoleucyllysyllysylaylglycylglutamyltyrosylvalylcysteinylatyllysylthreonyllysylalanylasparaginylinylleucylisoleucylglutamylvalylglutamylglutamylvalylphenylalanylvalylglycyllalanylglutamylisoleucylglutamylleucyltidylglycylglutaminyltryptophyllysylleylthreonylalanylserylprolylaspartylcystamylaspartylglycyllysyllysylhistidyliylasparaginylcysteinylglutaminylleucylylvalylserylphenylalanylglutaminylalanalanylalanylasparaginylleucyllysylvalyleucylphenylalanylisoleucylthreonylproylphenylalanylglutamyllysylaspartylglulcysteinylglutamylvalylserylarginylglularginyltryptophylleucyllysylglycylthreonylglycylaspartylaspartylarginylphenlaspartylglycylthreonyllysylhistidylselalanylalanylphenylalanylglutamylasparnylphenylalanylglutamylalanylglutamylaycyllysylleucylisoleucylisoleucylglutalphenylalanylleucylthreonylprolylleucysylglutamyllysylglutamylserylalanylvalleucylserylhistidylaspartylasparaginyllphenylalanyllysylasparaginylaspartylgnylthreonylarginylserylvalylserylmethillysylthreonylhistidylserylisoleucylthylserylisoleucylaspartylaspartylthreonlylglutamylalanylmethionylglycylmethiocylthreonylvalylleucylglutamylglycylasonylglycyllysylleucylglutaminylaspartylysylaspartylglutamylvalylisoleucylleuucylseryllysylalanylaspartylalanylprolysylaspartylglycyllysylglutamylisoleuclanylvalylisoleucyllysylthreonylasparteucylisoleucylleucyllysyllysylalanylleylglutaminyltyrosylthreonylcysteinylasyllysylthreonylserylglycyllysylleucylainylglutamylisoleucyllysylleucylvalylalglutamylvalylmethionylglutamylthreonylalanylglutamylthreonylglutamylisoleuceucylhistidylalanylasparaginyltryptophnylleucylleucylglutaminylthreonylprolylysylglutamylglutamylglycyllysylisoleustidylasparaginylcysteinylarginylleucyycylvalylaspartylphenylalanylglutaminyerylserylalanylhistidylleucylarginylvaglycylleucylleucylarginylprolylleucyllnylalanylglycylglutamylthreonylalanyltlglutamylleucylseryltyrosylglutamylaspyptophyltyrosylleucyllysylglycyllysyllyllysylvalylvalylprolylarginylserylgluylleucylthreonylleucylarginylaspartylvylglycylglutamylvalylglutaminylleucyltnyllysylthreonylhistidylalanylasparagiamylprolylprolylvalylglutamylphenylalalaspartylglutaminylthreonylvalylglutamlvalylleucylglutamylcysteinylglutamylvalanyllysylvalyllysyltryptophylphenylaglutamylisoleucylleucyllysylseryllysyllanylaspartylglycylarginylvalylarginylpartylcysteinylthreonylprolylglutamylalthreonylcysteinylaspartylalanyllysylaylcysteinylasparaginylleucylasparaginylglutamylphenylalanylleucylarginylprolminylvalylarginylglutamyllysylglutamyllutamylcysteinylglutamylleucylserylargalyllysyltryptophylphenylalanyllysylaslysyllysylglycyllysyllysyltyrosylasparylalanylvalylarginylisoleucylleucylvallleucylleucylaspartylaspartylglutamylalutamylvalylarginylthreonylalanylarginlthreonylvalylleucylglutamylglutamylglyllysylasparaginylleucylalanylasparagimylthreonylaspartylthreonylisoleucyllylseryllysylprolylglycylalanylglutamylvglycylaspartylglutamylglutamylisoleucyinyltyrosylglutamylisoleucylleucylthreylisoleucylleucylvalylisoleucylglutamilutamylaspartylalanylglycylasparaginyleucylprolylserylserylarginylthreonylastidylglutamylleucylalanylalanylglutamylylglutaminylasparaginylleucylglutamylyllysylalanylglutamylphenylalanylvalylutamylserylphenylalanylprolylvalylglutlaspartyllysylthreonylleucylglutamylseylvalylisoleucylalanylaspartylglycyllyllysylaspartylalanylthreonylleucylglutyltyrosylvalylvalylmethionylvalylglycynylhistidylleucylthreonylvalylisoleucylvalylvalylprolylleucyllysylaspartylthaminylglutaminylglutamylvalylvalylphenlvalylasparaginylthreonylglutamylglycyenylalanylarginylasparaginylglutamylglpartylserylseryllysyltyrosylisoleucyliylleucylvalyltyrosylthreonylleucylargistidylleucylaspartylaspartylglutaminylvalylserylleucylthreonylasparaginylhisylvalyllysylserylalanylalanylasparaginmylglutamylaspartylleucylarginylisoleupartylisoleucylglutamylthreonylmethionnylphenylalanyltryptophylcysteinyllysyaginylvalylthreonylleucyllysyltryptophtamylglutamylvalylprolylphenylalanylasyrosylarginylvalylaspartyllysyltyrosyllisoleucyllysylaspartylcysteinylglycyllycylglutamyltyrosylisoleucylvalylthreysylserylvalylalanylglutamylleucylleucrolylthreonylglutamylphenylalanylvalyltylglutaminylthreonylvalylthreonylglutnylvalylphenylalanylserylcysteinylglutylalanylasparaginylvalyllysyltryptophyinylglutamylisoleucyllysylglutamylglyclglutamyllysylaspartylglycylserylisolesoleucyllysylaspartylcysteinylarginyllnylglutamyltyrosylalanylcysteinylglycyerylarginylalanylarginylleucylphenylalrolylvalylglutamylisoleucylisoleucylarisoleucylleucylglutamylalanylprolylglyanylleucylalanylglutamylleucylasparagialylglutaminyltryptophylleucylarginylavalylvalylglutaminylglycylaspartyllysyylserylglutamylglycyllysylisoleucylhisylcysteinylaspartylisoleucyllysylprolytamyltyrosylarginylphenylalanylisoleuclanylarginylalanyllysylleucylglutamyllsoleucyllysylthreonylalanylaspartylglurtylvalylglycyllysylprolylleucylthreonspartylalanyltyrosylprolyllysylalanylgylalanyllysylglutamylasparaginylglutameonylisoleucylaspartylthreonylthreonylylphenylalanylarginylisoleucylleucylglllysylglycylarginyltyrosyllysylisoleucysylhistidylglycyllysylalanylglutamylgylleucyllysylvalylisoleucylaspartylvalaraginylleucylglutamylvalylthreonylgluycylglutamylvalylserylleucylalanyltryphreonylaspartylglycylglycylseryllysylivalylglutamylarginylarginylaspartylisotophylvalylleucylalanylthreonylaspartylglutamylphenylalanylthreonylvalylthreylglycylvalylglutamyltyrosylleucylphennylasparaginylarginylvalylglycylthreonthreonylaspartylasparaginylprolylvalylsylaspartylvalylprolylglycylprolylprolleucylthreonylaspartylvalylasparaginylleucylthreonyltryptophylglutamylprolylglycylalanylglutamylisoleucylthreonylaamylleucylarginylaspartyllysylthreonylrtylthreonylalanylmethionylthreonylvalylserylalanylthreonylvalylthreonylaspanylglutamyltyrosylserylphenylalanylargaraginylarginylisoleucylglycylvalylglyonylprolylphenylalanylvalyllysylvalylalarginylprolylserylprolylprolylvalylaspartylglutaminylthreonylglutaminylseryptophylglutamylprolylprolylleucyllysyleucylleucylglycyltyrosylisoleucylisolelglutamylglycyllysylaspartylasparaginylasparaginylmethionyllysylleucylvalylpysylvalylthreonylglycylleucylglutamyllucyltyrosylarginylvalylserylalanylglutylserylaspartylprolylserylglutamylisolylalanylaspartylaspartylalanylphenylalionylaspartylleucylserylalanylphenylalylvalylisoleucylvalylprolylasparaginylcylvalylprolylserylthreonylglycyltyrosthreonyltryptophylcysteinylphenylalanyamylthreonylglycylaspartylarginylvalylrylalanyltyrosylalanylglutamylleucylvalarginylserylaspartyllysylglycylisoleuglutamylasparaginylarginylvalyllysylthsoleucylaspartylvalylasparaginylvalylinylprolyllysylglutamylleucyllysylphenynyllysylaspartylserylvalylhistidylleucrolylaspartylaspartylaspartylglycylglyyrosylvalylvalylglutamyllysylarginylglltryptophylthreonyllysylvalylmethionylpartylleucylglutamylphenylalanylthreontaminylglycyllysylglutamyltyrosylleucynylarginylasparaginyllysylcysteinylglytyrosylvalylaspartylglutamylprolylvalyrolylalanylthreonylvalylprolylaspartylllysyltryptophylarginylaspartylarginylucylphenylalanylleucylthreonyltryptophnylaspartylglycylglycylserylarginylisolylglutamylarginylcysteinylprolylarginlvalylalanylcysteinylglycylglutamylpromethionylglutamylvalylthreonylglycylletophyltyrosylalanyltyrosylarginylvalylylglutaminylglycylalanylseryllysylprollglutamylisoleucylglutaminylalanylvalyalanylprolylglutamylisoleucylphenylalaucylalanylglycylleucylthreonylvalyllyslglutamylleucylprolylalanylthreonylvalprolyllysylisoleucylthreonyltryptophyllisoleucylleucyllysylglutaminylaspartyucylglutamylasparaginylvalylprolyllysyleucylvalylaspartylseryllysylarginylserosylisoleucylisoleucylglutamylalanylvarginylalanylthreonylalanylvalylvalylgspartyllysylprolylglycylprolylprolylalucylthreonylaspartylvalylthreonylaspareucylthreonyltryptophylasparaginylprolylglycylseryllysylisoleucylthreonylaspginylarginylalanylthreonylaspartylseryylleucylserylserylthreonylvalyllysylasyllysylalanylthreonyllysylleucylisoleurosylisoleucylphenylalanylarginylvalylionyltyrosylglycylalanylglycylglutamyllylisoleucylthreonylalanyllysyltyrosyllprolylglycylprolylprolylthreonylarginisoleucylthreonyllysylaspartylalanylvacysteinylglutamylprolylaspartylaspartyleucylthreonylglycyltyrosyltryptophylvolylaspartylthreonylaspartyllysyltryptyllysylmethionylprolylvalyllysylaspartyllysylglycylleucylthreonylasparaginylalanylarginylvalylleucylalanylglutamylglycyllysylprolylseryllysylserylthreoneucyllysylaspartylprolylisoleucylasparylglycyllysylprolylthreonylvalyllysylalvalylarginylleucylasparaginyltryptophylaspartylglycylglycylalanyllysylisolecylglutamylmethionylleucyllysylthreonytophylvalylarginylvalylalanylglutamylgtaminylhistidylleucylleucylprolylglycyminylglutamyltyrosylserylphenylalanylaginyllysylalanylglycylglutamylserylgluaspartylprolylvalylleucylcysteinylargiprolylserylprolylprolylarginyltryptophaginylisoleucylthreonyllysylasparaginyryptophylthreonylvalylprolylglutamyllysoleucylthreonylasparaginyltyrosylisoltylvalylarginylarginyllysylglycyltryptlthreonylthreonylvalyllysylaspartylthreonylprolylleucylthreonylglutamylglycylarginylvalylalanylalanylglutamylasparylserylaspartyltyrosylthreonylglutamylleucylalanyllysylaspartylthreonylphenyprolylprolyltyrosylalanylleucylalanylvarginylhistidylvalylaspartylleucyllysylasparaginylaspartylglycylglycylarginyrosylvalylisoleucylglutamyllysyllysylgrginyltryptophylvalyllysylalanylglycylrtylcysteinylasparaginylphenylalanylareucylglutamylglycylthreonylglutamylvalalylarginylalanylglutamylasparaginylglylprolylserylglutamylprolylthreonylglulutamylaspartylprolylthreonylserylprolrtylleucylhistidylvalylthreonylaspartyoleucylalanylisoleucylalanyltryptophylaginylglycylglycylserylprolylisoleucylglutamylmethionylcysteinylprolylvalylglmethionylarginylvalylasparaginylserylleucyllysylphenylalanyllysylvalylglutapartyllysylglutamyltyrosylvalylleucylaginylalanylisoleucylglycylvalylserylglerylglutamylasparaginylvalylvalylalanyyllysylprolylthreonylisoleucylaspartyltylisoleucylisoleucylvalylisoleucylgluisoleucylprolylvalylprolylphenylalanylthreonylvalylseryltryptophylhistidyllylysylalanylserylaspartylarginylleucyltartylhistidylisoleucylserylalanylhistirylvalylarginylalanylaspartylalanylglylthreonylleucylglutamylasparaginyllysynylserylisoleucylasparaginylvalyllysylcylprolylcysteinyllysylaspartylisoleucthreonyllysylserylserylcysteinyllysyllylprolylglutamylphenylalanylaspartylglucylhistidyltyrosylvalylleucylglutamylrginylarginylthreonyltyrosylisoleucylpmylasparaginyllysylleucylseryltryptophsoleucylprolylasparaginylglycylglutamyinylvalyllysylalanylvalylasparaginyllyyrosylisoleucylglutamylleucyllysylaspautaminylaspartylprolyllysylglutaminylplaspartylvalylglutamylvalylhistidylasplalanylmethionylthreonylisoleucylthreoltyrosylaspartylglycylglycylseryllysyleucylisoleucylglutamyllysylisoleucylalnyltryptophyllysylarginylcysteinylasparolylisoleucylleucylthreonyltyrosylthrlglutamylglycyllysylglutamyltyrosylglunylalanylglutamylasparaginylalanylalanlserylarginylalanylthreonylprolylprolyolylisoleucylaspartylalanylprolyllysylserylleucylglutamylvalyllysylarginylglleucylaspartylalanylserylisoleucylseryonylisoleucylthreonyltryptophylisoleucalylisoleucylvalylprolylglutamylglutamlanylprolylleucylvalylarginylarginylarinylglutamylglutamylglutamylprolylphenonylglutaminylarginylleucylserylisoleuylglycylglutamylserylglutaminylleucylaylarginylprolylaspartylhistidylglycyllvalylglutamylasparaginylaspartylhistidrolylcysteinylthreonylvalylserylvalyllolylprolylisoleucylasparaginylphenylalylisoleucylarginyllysylthreonylserylvautamylprolylprolylleucylaspartylaspartlisoleucylasparaginyltyrosylthreonyllethreonyllysylprolylaspartylserylglutamonylserylthreonylleucylarginylhistidylonyllysylleucylisoleucylglutamylglycylnylarginylvalylarginylalanylglutamylasrolylglycylprolylprolylcysteinylvalylsylaspartylprolylphenylalanylglycylprolllysylprolylisoleucylvalylglutamylasparylmethionylleucylvalyllysyltryptophyltylasparaginylglycylserylprolylisoleucylglutamyllysylarginylglutamylvalylaspphylserylarginylvalylasparaginyllysylsucyllysylalanylasparaginylvalylaspartyucylthreonyltyrosylvalylphenylalanylarparaginylalanylalanylglycylprolylglycyserylaspartylprolyllysylthreonylalanyllprolylprolylglycylprolylprolylisoleuclthreonylserylserylthreonylthreonylisohylglutamylprolylprolylalanylphenylalatamylisoleucylvalylglycyltyrosylphenyleucylvalylglycylthreonylasparaginyllysreonylglutamyllysylmethionylisoleucyllreonylvalyllysylglutamylisoleucylarginyllysylleucylarginylvalylserylalanylvatamylglycylprolylprolylglycylglutamyltlvalylalanylglutamylprolylglutaminylglylleucylaspartylvalylserylvalyllysylglcylmethionylalanylglycyllysylthreonylllylvalylthreonylglycylarginylprolylvallthreonyllysylglutamylglutamylglycylglginylvalylvalylisoleucylaspartylasparalutamylleucylisoleucylisoleucyllysylastylhistidylglycylarginyltyrosylvalylisginylserylcysteinylglycylseryllysylphealylglutamylvalylphenylalanylaspartylvpartylleucyllysylprolylvalylvalylthreocysteinylleucylleucylasparaginyltryptortylaspartylglycylglycylserylglutamylisoleucylisoleucylglutamylarginyllysylathreonyltryptophylarginylglutaminylprolarginylseryllysylcysteinylaspartylisotamylglycylglutaminylglutamyltyrosyllylalanyllysylasparaginyllysylphenylalanvalylglutamylisoleucylglycylprolylisollleucylglycylprolylprolylthreonylseryltyrosylthreonylglutamylarginylglutaminonylleucylaspartyltryptophyllysylglutacylglycylserylprolylisoleucylglutaminytamyllysylarginylarginylhistidylaspartutamylarginylvalylasparaginyllysylargieonylserylphenylalanylleucylvalylglutalhistidylglutaminylmethionyltyrosylglulanylvalylasparaginylglutamylisoleucylrylleucylprolylleucylasparaginylvalylvrtylglutamylvalylprolylprolylthreonyliylvalylarginylglycylaspartylthreonylitrampamylprolylvalylhistidylisoleucylprolleucylprolylmethionylprolyllysylisolearaginylglutamylthreonylvalylisoleucylalanylleucylglutaminylisoleucylthreonyinylserylglutamylalanyllysylthreonylglylalanylvalylarginylglutamylaspartyllyylthreonylalanylserylasparaginylarginyarginylasparaginylvalylhistidylvalylglolylserylprolylprolylarginylasparaginysoleucyllysylalanylglutamylserylcysteispartylalanylprolylleucylaspartylaspareucylthreonylhistidyltyrosylvalylisolenylserylarginyllysyllysylalanylglutamyeonylasparaginylthreonylalanylvalylgluucyltryptophyllysylleucylisoleucylprollglutamylphenylalanylarginylvalylarginlglycylisoleucylserylaspartylglutamylclvalylisoleucylglutaminylaspartylprolyolylprolylglycyllysylprolyllysylvalyllylserylmethionylleucylvalylseryltryptotylasparaginylglycylglycylserylprolyliphylleucylglutamyllysylarginylglutamylptophylserylarginylvalylserylarginylalylglycylleucyllysylglycylvalylglutamylrginylleucylleucylglutamylglycylvalyllginylalanylmethionylalanylisoleucylaspglycylprolylprolylserylglutamylprolylsylglycylaspartylprolylisoleucylphenylaserylcysteinylprolylglutamylvalyllysyllisoleucylserylleucylglycyltryptophyllglycylglycylserylprolylisoleucyllysylgethionylglutaminylglutamylglutamylglycllysylarginylvalylasparaginylglutamylpreonylthreonylcysteinylglutamylcysteinlysylglutamylleucylarginyllysyltyrosyllalanylvalylasparaginylglutamylalanylgylaspartylthreonylthreonylglycylglutamrtylisoleucylglutaminylglutamylglutamyleucylaspartylisoleucylglycylalanylglucysteinyllysylalanylglycylserylglutamilanylvalylisoleucyllysylglycylarginylpryptophylglutamylphenylalanylaspartylghionyllysylaspartylglycylvalylhistidylrtylalanylglutaminylleucylglutamylthreerylvalylisoleucylisoleucylisoleucylprrylhistidylthreonylglycyllysyltyrosylsaraginyllysylalanylglycylglutaminyllyslarginylvalyllysylvalylmethionylaspartlaspartylleucyllysylvalylserylaspartylcysteinylarginylleucylseryltryptophyllaspartylglycylglycylaspartylarginylisocylglutamyllysylarginylthreonylisoleucylthreonyllysylvalylasparaginylprolylathreonylphenylalanylvalylvalylprolylasaminylglutaminyltyrosylphenylalanylphelutamylasparaginylarginylphenylalanylgylglutamylthreonylisoleucylglutaminylaaspartylprolylisoleucyltyrosylprolylprsylleucyllysylisoleucylglycylleucylisonylvalylhistidylleucylseryltryptophyllartylglycylglycylserylprolylvalylthreotamylcysteinylleucylalanyltryptophylasysyllysylglutamylalanyltryptophylarginylarginylaspartylvalylglutamylglutamyllvalylglutamylaspartylleucylvalylglutamylphenylalanylarginylvalyllysylalanylalylseryllysylprolylserylalanylthreonycysteinylglutaminylarginylprolylaspartylaspartylleucyllysylglutamylphenylalautamylglycylthreonylasparaginylvalylassoleucyllysylglycylvalylprolylphenylalptophylphenylalanyllysylalanylprolylprinyllysylglutamylprolylvalylleucyltyroaraginyllysylleucylvalylvalylaspartylacylvalylisoleucylprolylglutaminylserylglycylleucyltyrosylthreonylisoleucylthinylleucylglycylthreonylalanylseryllysaraginylvalylleucylglycylarginylprolylisoleucyllysylphenylalanylglutamylserymethionylthreonylleucylseryltryptophylylaspartylglycylglycylseryllysylisoleusoleucylglutamyllysylarginylglutamylaltryptophylvalylhistidylvalylserylseryllthreonyltyrosylthreonylisoleucylprolytidylglutamyltyrosylvalylphenylalanylaminylasparaginyllysyltyrosylglycylisolrtylserylglutamylprolylglutamylthreonyylalanylserylvalylprolylglycylalanylprlserylserylvalylthreonylarginylasparagraginyltryptophylglutamylglutamylprolylserylprolylvalylthreonylglycyltyrosylsylaspartylthreonylthreonylseryllysylaparaginylarginylaspartylprolylisoleucyglycylvalylseryltyrosyllysylvalylthreocylserylaspartyltyrosylglutaminylphenyleucylasparaginylalanylalanylglycylvalylserylaspartylprolylalanylthreonylalaanylprolylprolylglycylprolylprolylphenartyltryptophylthreonyllysylserylserylhylserylprolylprolylleucyllysylaspartylglycyltyrosylisoleucylvalylglutamyltyylglutamylglutamyltryptophylglutamyllyvalylarginylglycylthreonyllysylleucylvlutamylglycylalanylphenylalanyltyrosyllanylvalylasparaginylisoleucylalanylglycylglutamylvalylthreonylaspartylvalylrtylarginylleucylvalylserylprolylasparanylserylvalylarginylaspartylarginylisylglycylvalylisoleucylarginylisoleucylcyllysylprolylprolylprolylthreonylvalyonylasparaginylglutamylarginylthreonyllthreonylisoleucylglutamylthreonylthreethionylvalylisoleucyllysylasparaginylidylglutaminylglycylvalyltyrosylseryllutamylalanylglycylglutamylarginyllysyllaspartylvalylleucylaspartylvalylprolylylphenylalanylleucylalanylhistidylasputamylserylcysteinyllysylleucylthreonylutamylaspartylaspartylglycylglycylserltyrosylvalylisoleucylglutamyllysylarginylalanyltryptophylthreonylprolylvalyylarginylglutaminylasparaginylalanyltholeucylglutaminylglycyllysylalanyltyrosoleucylalanylalanylglutamylasparaginylprolylphenylalanylvalylglutamylthreonleucylarginylglutamylprolylisoleucylthlylglutamylaspartylleucylglutamylvalylraginylthreonylvalylthreonylleucylthreyllysyltyrosylaspartylglycylglycylserynyltyrosylvalylleucylglutamylserylargitamyllysylphenylalanylhistidyllysylvalginylleucylleucylserylarginyllysyltyrosylglutamylglycylaspartylthreonyltyroslanylvalylasparaginylisoleucylvalylglyphenylalanylcysteinylthreonyllysylprolpartylglutamylleucylalanylprolylprolyllphenylalanylarginylaspartyllysylleucylglutamylalanylphenylalanylalanylleucylycyllysylprolyllysylprolyllysylvalylsrtylglutamylalanylaspartylvalylleucylgnylhistidylisoleucyllysylthreonylthreoleucylglutamyllysylisoleucyllysylalanyyllysyltyrosylcysteinylvalylvalylvalylcylserylarginyllysylglycylphenylalanylvalylvalylaspartylhistidylprolylglycylerylphenylalanylaspartylglutamylvalyltlvalylisoleucylseryltryptophyllysylproylglycylseryllysylisoleucylthreonylasputamyllysyllysylglutamylvalylglycyllysrolylvalylthreonylserylalanylserylalanylvalylseryllysylleucylleucylglutamylghenylalanylarginylisoleucylhistidylalaglycylisoleucylserylaspartylprolylleucysylalanyllysylaspartylarginylphenylallprolylaspartylglutaminylprolylisoleucllysylaspartylserylalanylleucylvalylthlylhistidylaspartylglycylglycyllysylprosylisoleucylleucylglutamyllysylarginylarginyltryptophylalanylarginylvalylthistidylprolyltyrosylthreonyllysylphenyucylleucylglutamylglycylcysteinylglutainylvalylserylalanylglutamylasparaginyycylaspartylprolylserylprolylprolylserllysylaspartylprolylisoleucylalanyllysaginylprolylglutamylalanylisoleucylaspaginylserylvalylaspartylleucylthreonylinylhistidylaspartylglycylglycylseryllleucylvalylglutamyltyrosylglutaminyllymyltryptophylarginylarginylalanylasparlserylcysteinylprolylglutamylthreonyllleucylarginylaspartylglycylglutaminyltnylvalylleucylalanylvalylasparaginylalylprolylalanylhistidylvalylprolylglutatylarginylleucylglutamylprolylprolylglalanylasparaginylmethionylalanylarginyllysylvalylglycylaspartylthreonylleucysoleucyllysylglycylvalylprolylphenylalhyllysyllysylglutamylaspartylarginylasylarginylisoleucylaspartylvalylthreonylutamylisoleucylarginylasparaginylalancylglycylisoleucyltyrosylserylleucylthlalanylglycylseryllysylthreonylvalylseaspartyllysylprolylglycylprolylprolylarylglutamylisoleucylarginyllysylaspartyltryptophyllysylglutamylprolylleucylaylisoleucylthreonylasparaginyltyrosylvrtylvalylalanylserylalanylglutaminyltrlthreonylseryllysyllysyllysylserylhistleucylasparaginylglutamylglycylasparaganylarginylvalylalanylalanylglutamylasinylglycylprolylphenylalanylvalylglutayllysylalanylleucylaspartylprolylleucyolyllysylaspartylleucylhistidylhistidyeonylglutamylvalylserylleucylvalyltryplarginylaspartylglycylglycylserylprolyylvalylglutamyltyrosylglutaminylglutamspartyltryptophylisoleucyllysylphenylaraginylleucylglutamylcysteinylvalylvaltaminylglycyllysylthreonyltyrosylarginylglutamylasparaginylisoleucylvalylglythreonylthreonylisoleucylprolylisoleucyllysylleucylvalylprolylprolylserylvaleucylisoleucylglutamylglycylleucylvalyonylvalylarginylphenylalanylprolylalanlylprolylvalylprolylthreonylalanyllysyglycylserylglutamylisoleucyllysylthreohreonylvalylglutamylthreonylaspartylaslleucylthreonylisoleucyllysylasparaginrtylthreonylglycylglutamyltyrosylglutaaraginylalanylalanylglycylseryllysylthlthreonylvalylleucylaspartylvalylprolyolylisoleucylasparaginylisoleucylleucylhistidylmethionylthreonylisoleucylserysylaspartylaspartylglycylglycylserylpylisoleucylvalylglutamyllysylglutaminyylthreonyltryptophylglycylvalylvalylseyllysylleucyllysylisoleucylprolylhistiinylglutamyltyrosylvalylphenylalanylarraginyllysylisoleucylglycylvalylglycylonylprolylthreonylvalylalanyllysylhistlylserylprolylprolylglycyllysylprolylvhreonylglutamylasparaginylalanylalanyllleucylprolyllysylserylaspartylglycylgycyltyrosyltyrosylmethionylglutamylargcyllysyltryptophylvalylarginylvalylasplalanylaspartylleucyllysylphenylalanylosylglutamylglycylasparaginylthreonyltlylphenylalanylalanylglutamylasparaginlprolylserylprolylserylserylaspartylprginylprolylisoleucyllysylprolylprolylgylprolyllysylleucyllysylaspartyllysylspartylleucylvalyltryptophylthreonyllysycylserylprolylisoleucylleucylglycyltytaminyllysylprolylglycylthreonylalanylnylisoleucylasparaginyllysylaspartylglnylcysteinylalanylphenylalanylarginylvamylglycylasparaginylglutamyltyrosylarsylalanylalanylasparaginylisoleucylvallarginylglutamylleucylalanylglutamylselisoleucylleucylhistidylprolylprolylgllylthreonylcysteinylarginylaspartylvallglycylglutaminylthreonylisoleucylargillysylglycylarginylprolylglutamylprolylthreonyllysylglutamylglycyllysylvalylnylvalylaspartylleucylisoleucylglutamiglutamylleucylglutaminylisoleucyllysylartylhistidylglycyllysyltyrosylisoleucnylserylserylglycylhistidylalanylglutalasparaginylvalylleucylaspartylarginylylasparaginylleucyllysylvalylthreonylalasparaginylcysteinylthreonylisoleucylrolylleucylaspartylasparaginylglycylglsparaginylphenylalanylisoleucylvalylglraginylglutaminyllysylglycyltryptophyltylvalylthreonyllysylarginylleucylisolucylalanylasparaginylasparaginylglutamvalylcysteinylalanylglutamylasparaginyhreonylisoleucylglutamylthreonyllysyltsoleucylasparaginylprolylisoleucylaspaylglutamylasparaginylleucylhistidylisolthreonylphenylalanylvalyltyrosylleucylaspartyltyrosylaspartylglycylglycylsesylhistidylvalylglutamylarginylarginyltyltryptophylglutamylarginylvalylhistiutamylthreonylhistidyltyrosylmethionyllutamylasparaginylglutaminylisoleucyltlylglutaminylthreonyllysylasparaginylgartyltryptophylvalyllysylthreonylglutaamylaspartylleucylglutaminyllysylprolyylserylglycylvalylleucylthreonylvalyllleucylarginylleucylglutamylalanylglycylalanylprolylglutamylvalylalanyltryptotylalanylthreonylaspartylleucylthreonylisoleucylaspartylthreonylarginylalanylserylleucylthreonyllysylalanyllysylartyrosylvalylvalylthreonylalanylthreonyylphenylalanylvalylalanyltyrosylalanylaspartyllysylprolylglycylprolylvalylarlvalylaspartylvalylserylserylaspartylayltryptophylaspartylprolylprolylglutaminylglutamylisoleucylglutaminylasparagysylcysteinylglutamylthreonyllysylargieonyltyrosylserylalanylthreonylvalylleeonylvalylthreonylarginylleucylisoleuctyrosylisoleucylphenylalanylarginylvalysylisoleucylglycylthreonylglycylprolyolylvalylisoleucylalanyllysylthreonylllarginylprolylaspartylprolylprolylglutylglutamylglutamylmethionylthreonylvalrolylglutamyltyrosylaspartylglycylglyctyrosylphenylalanylleucylglutamyllysylonylarginyltryptophylvalylprolylvalylaprolylglutamylarginylarginylmethionylllleucylprolylaspartylhistidylglutamyltvalyllysylalanylglutamylasparaginylgluglutamylprolylserylleucylprolylserylarartylprolylisoleucylglutamylprolylprolinylphenylalanylarginylvalylvalylasparylisoleucylthreonylleucylglycyltryptopartylglycylglycylalanylprolylisoleucyltamylmethionylarginylprolyllysylisoleuspartylglutamylglycyltryptophyllysylarylalanylglutaminylleucylvalylarginyllylthreonylserylleucylaspartylglutamylatrampamylphenylalanylarginylvalylcysteininylvalylglycylisoleucylglycylarginylpmylalanylisoleucyllysylprolyllysylglutolylglutamylisoleucylaspartylleucylaspylleucylvalylisoleucylvalylarginylalaninylleucylphenylalanylalanylisoleucylvlprolyllysylvalylthreonyltryptophylargylasparaginylvalylvalylarginyllysylglyylaspartylthreonylmethionylalanylphenyparaginylserylthreonylarginylaspartylaleucylthreonylleucylvalylasparaginylprvalylphenylalanylvalylasparaginylvalylrolylglycylprolylvalylserylaspartylleuonyllysylthreonylserylcysteinylhistidyolylglutamylasparaginylaspartylglycylgstidyltyrosylisoleucylvalylglutamyllysnyllysylthreonyltryptophylserylthreonysyllysylthreonylserylphenylalanylhistilylprolylglycylasparaginylglutamyltyrohreonylalanylvalylasparaginylglutamyltthreonylaspartylvalylprolyllysylprolyllleucylserylglutamylprolylaspartylprollanylthreonylglutamylmethionylthreonylleucylalanyltryptophylleucylprolylprolalanyllysylisoleucylaspartylglycyltyroginylglutamylglutamylglutamylglutaminyhylthreonylglutamyltyrosylserylvalylvalylvalylthreonylglycylleucyllysylglutaylalanylarginylvalylalanylalanylarginyerylleucylprolylarginylglutamylalanylganyllysylglutamylglutaminylleucylleucythionylprolylglutamylglutaminylisoleucllysyllysylleucylarginylisoleucylglutalysylprolylhistidylprolylthreonylcysteglutamylaspartylglutamylvalylvalylthrealylhistidyllysylalanylaspartylserylseleucyllysylaspartylvalylthreonylarginyosylserylleucylthreonylalanylglutamylaspartylthreonylglutaminyllysylisoleucytylalanylprolylglycylprolylprolylglutaylisoleucylserylaspartylisoleucylasparylleucylseryltryptophylhistidylisoleuclglycylserylasparaginylisoleucylthreonlutamyllysylcysteinylaspartylvalylseryylthreonylalanylleucylalanylserylvalylarginylvalylglycyllysylleucylisoleucylylisoleucylphenylalanylarginylvalylarglphenylalanylglycylisoleucylserylglutaysylmethionylvalylalanylglutaminylphenylprolylserylglutamylprolyllysylasparalvalylasparaginyllysylaspartylcysteinyyptophylaspartylarginylprolylaspartylsisoleucylisoleucylglycyltyrosylleucylilarginylasparaginylserylleucylleucyltraspartylthreonylleucylvalylarginylseryinylalanylglycylleucylvalylglutamylglyalanylarginylisoleucyltyrosylalanylleulserylprolylprolylseryllysylprolylthrenylarginylmethionylprolylvalylaspartylylvalylisoleucylaspartylvalylthreonylloleucyltryptophylalanylarginylprolyllyllysylisoleucylisoleucylglycyltyrosylpinyllysylleucylprolylglycylaspartyllysparaginylthreonylalanylprolylhistidylglutamylglutamyltyrosylthreonylalanylthysylalanylglutaminyltyrosylglutaminylpanylarginylthreonylalanylvalylasparagilutamylprolylserylaspartylprolylvalyltlasparaginylvalylprolylprolylarginylisylmethionyllysylserylleucylleucylthreoparaginylvalylcysteinylleucylaspartylallysylprolylmethionylprolylthreonylvalglycylthreonylleucylleucyllysylprolylathionylalanylmethionylglutaminylarginyleucylglutamylleucylphenylalanylserylvserylglycylaspartyltyrosylthreonylisolnylserylserylglycylseryllysylserylalanvalylleucylaspartyllysylprolylglycylpreucylasparaginyllysylmethionyltyrosylseucylseryltryptophylglutamylprolylprollserylglutamylisoleucylthreonylasparagsylarginylglutamylthreonylserylarginylutaminylvalylserylalanylthreonylvalylplserylvalylglutamyllysylleucylisoleucysylglutaminylphenylalanylarginylisoleuyllysyltyrosylglycylvalylglycylaspartytamylprolylalanylisoleucylalanyllysylaylprolylglycylarginylcysteinylaspartylraginylisoleucylthreonyllysylaspartylhryptophyllysylprolylprolylalanylaspartoleucylthreonylglycyltyrosylleucylleucnylglutaminylalanylvalylasparaginyltrylarginyllysylprolylisoleucylisoleucylganylthreonylglycylleucylglutaminylglututamylphenylalanylarginylvalylthreonylylglycylprolylglycyllysylprolylserylasyrosylalanylarginylaspartylprolylglutalprolylalanylphenylalanylprolyllysylvarginylserylserylvalylserylleucylseryltosylaspartylglycylglycylserylprolylisoalylglutamylvalyllysylarginylalanylaspphylvalylarginylcysteinylasparaginylleylglutaminyllysylthreonylarginylphenylucylmethionylglutamylaspartylthreonylgnylarginylvalyltyrosylalanylvalylasparrylaspartylprolylserylaspartylvalylproyllysylaspartylisoleucylleucylisoleucyhistidylaspartylalanylaspartylleucylarucylarginylalanylglycylvalylthreonylmelylvalyllysylglycylarginylprolylprolylhylseryllysylprolylasparaginylvalylasplisoleucylglycylleucylaspartylisoleucyanylaspartylthreonylphenylalanylleucylvalylasparaginyllysyltyrosylaspartylalylthreonylleucylglutamylasparaginylsertyrosylthreonylisoleucylvalylvalyllysylycylprolylprolylisoleucylasparaginylvucylseryllysylaspartylserylalanyltyrosolylprolylisoleucylisoleucylaspartylglucylasparaginyltyrosylvalylvalylglutammylarginyllysylseryltryptophylserylthrysteinylseryllysylthreonylserylphenylaeucylglutamylglutamylglycyllysylseryltylvalylphenylalanylalanylglutamylasparlglycylaspartylprolylglycylglutamylthrlalanylserylglutaminylthreonylprolylglysylvalylarginylserylvalylseryllysylseyltryptophyllysyllysylprolylhistidylseisoleucylisoleucylglycyltyrosylvalylvaylglutamylglutamylasparaginyllysyltrypyllysylserylleucylserylleucylglutaminycylthreonylglutamylglycyllysylglutamylalylserylalanylglutamylasparaginylglutthreonylprolylserylglutamylisoleucylthylaspartylvalylvalylalanylprolylaspartucylprolylaspartylleucylcysteinyltyrosnylserylasparaginylphenylalanylarginyllysylglycyllysylprolylalanylprolylseryylglutamylaspartylprolylleucylalanyltherylvalylglutamylserylserylalanylvalyloleucylvalyltyrosylaspartylcysteinylglcyllysyltyrosylthreonylisoleucylthreonglycylthreonyllysylglutamylglycylthreolvalylglycyllysylprolylglycylisoleucyllysylphenylalanylaspartylglutamylvalylylthreonylleucyllysyltryptophylalanylpcylglycylserylglutamylisoleucylthreonylutamyllysylarginylaspartylserylvalylalvalylthreonylcysteinylalanylserylalannylphenylalanylarginylvalylthreonylarghionylglutamyltyrosylthreonylphenylalasparaginyllysyltyrosylglycylvalylglycyamylprolylisoleucylvalylalanylarginylhlylprolylaspartylalanylprolylprolylprospartylvalylarginylhistidylaspartylserlthreonylaspartylprolyllysyllysylthreothreonylglycyltyrosylhistidylleucylgluylasparaginylserylleucylleucyltryptophlthreonylprolylisoleucylarginylmethionalylthreonylglycylleucylthreonylglutamylphenylalanylarginylvalylmethionylalaglycylvalylglycyllysylprolylserylleucylalanylleucylaspartylprolylisoleucylasglutamylvalylisoleucylasparaginylisolevalylthreonylleucylisoleucyltryptophylspartylglycylglycylhistidyllysylleucylglutamyllysylarginylaspartylleucylprolllysylalanylasparaginylhistidylvalylasylalanylphenylalanylthreonylvalylthreolglycyllysyltyrosylglutamylphenylalanyasparaginylthreonylalanylglycylalanylimylserylthreonylglutamylthreonylisoleulutamyltyrosylglutamylalanylprolylthrelylthreonylisoleucyllysylaspartylglycyglycylaspartylthreonylisoleucylvalylleisoleucylleucylglycyllysylprolylleucylllysylalanylglycyllysylaspartylisoleucylthreonylglutaminylisoleucylthreonylslmethionylleucylthreonylisoleucyllysylpartylalanylglycylglutamyltyrosylthreosparaginylprolylphenylalanylglycylthrelysylvalylthreonylvalylleucylaspartylvrolylvalylglutamylisoleucylserylasparalanylthreonylleucylthreonyltryptophyltpartylglycylglycylserylprolylisoleucyltamyllysylarginylglutamylthreonylserylylvalylvalylserylglutamylaspartylisolehistidylvalylalanylthreonyllysylleucyllglutamyltyrosylisoleucylphenylalanylanylhistidyltyrosylglycyllysylglycylgluamylprolylvalyllysylmethionylvalylaspaprolylglycylprolylprolylglutamyllysylpalylthreonyllysylasparaginylthreonylalylarginylprolylvalylaspartylaspartylgleonylglycyltyrosylhistidylvalylglutamyrylleucylarginyltryptophylvalylarginylalylserylaspartylleucylarginylcysteinyaminylglutamylglycylserylthreonyltyroserylalanylglutamylasparaginylarginylalylserylglutamylalanylserylaspartylserylanylalanyltyrosylprolylprolylglycylprtidylvalylthreonylaspartylthreonylthrelalanyltryptophylglycyllysylprolylhistylglutamylisoleucylthreonylglycyltyrosnyllysylvalylglycylaspartylglutamylalathreonylthreonylglycylthreonylalanyllenylphenylalanylvalylvalylprolylaspartymyllysyltyrosylasparaginylphenylalanyllasparaginylaspartylalanylglycylvalylgucylprolylaspartylvalylglutamylisoleuconylalanylprolylaspartylphenylalanylgleucylarginylarginylthreonylleucylvalylisoleucylarginylisoleucylphenylalanylvylprolylalanylprolylglutamylvalylthreosparaginylisoleucylasparaginylleucyllynylisoleucylglutamylasparaginylthreonyeucylleucylisoleucylisoleucylprolylgluosylaspartylthreonylglycyllysylphenylalglutamylasparaginylprolylalanylglycyllylasparaginylvalylarginylvalylleucylalylleucylasparaginylleucylarginylprolyysylaspartylserylvalylthreonylleucylhilleucylisoleucylaspartylglycylglycylsenyltyrosylisoleucylvalylglutamyllysylalysylseryltyrosylserylthreonylalanylthllysylcysteinylthreonyltyrosyllysylvalglycylcysteinylglutamyltyrosylphenylalylalanylglutamylasparaginylglutamyltyrolylthreonylglutamylthreonylthreonylglutamylalanylprolylserylprolylprolylasplmethionylaspartylisoleucylthreonyllysyltryptophylprolyllysylprolyllysylhistsoleucylthreonylglycyltyrosylvalylisolllysylglycylserylaspartylglutaminyltryeonylthreonylvalyllysylglycylleucylgluraginylleucylthreonylglutamylglycylglulanylglutaminylvalylmethionylalanylvalylserylalanylprolylarginylglutamylserysylglutamylglutaminylthreonylmethionyleucylarginylglycylisoleucyltyrosylglutyllysylalanylglycylaspartylasparaginyllprolylvalylleucylglycylarginylprolylltophyllysyllysylglycylaspartylglutamineonylglutaminylarginylvalylasparaginyllalanylthreonylserylthreonylisoleucylllglutamylcysteinylvalylarginylserylaspleucylthreonylalanylarginylasparaginylycylaspartylvalylisoleucylthreonylisollisoleucylprolylglycylprolylprolylthrelalanylaspartylglutamylvalylserylserylenylalanylseryltryptophylaspartylprolylycylglycylvalylprolylisoleucylserylasethionylarginylglutaminylthreonylasparalylglutamylleucylalanylthreonylthreononyltyrosyllysylalanylthreonylarginyllutamyltyrosylglutaminylphenylalanylargaginylarginyltyrosylglycylvalylglycylpanyltryptophylisoleucylvalylalanylaspaylvalylprolylglycylprolylprolylglycyltlalanylvalylthreonyllysylaspartylseryltophylhistidylglutamylprolylleucylseryleucylleucylglycyltyrosylhistidylvalylasparaginylglycylisoleucylleucyltryptoylalanylleucylvalylprolylglycylasparagserylglycylleucylthreonylaspartylglycyylalanylarginylvalylisoleucylalanylgluyllysylseryllysylprolylseryllysylprolyalanylleucylaspartylprolylisoleucylaspalylprolylleucylasparaginylisoleucylthhreonylleucyllysyltryptophylalanyllysylglycylphenylalanyllysylisoleucylthreoyllysylarginylaspartylleucylprolylaspallysylalanylasparaginylphenylalanylserlasparaginylglutamylphenylalanylthreontamylaspartylalanylalanyltyrosylglutamalanyllysylasparaginylalanylalanylglycerylglutamylprolylserylaspartylalanyliartylaspartylvalylglutamylalanylprolylyllysylphenylalanyllysylaspartylthreonycylglutamylalanylphenylalanylarginyllylglycylarginylprolylprolylprolylthreolysylaspartylglycyllysylglutamylleucylucylglutamylisoleucyllysylisoleucylalalasparaginylleucylvalylasparaginyllysylaspartylserylglycylalanyltyrosylthreoraginylprolylglycylglycylphenylalanylaanylasparaginylvalyllysylvalylleucylasylglutamylglycylprolylleucylalanylvalyglutamyllysylcysteinylvalylleucylseryleucylaspartylaspartylglycylglycylalanysylisoleucylvalylglutaminyllysylarginyalanyltryptophylthreonylasparaginylvallvalylthreonyllysylleucyllysylvalylthrparaginylglutamyltyrosylisoleucylphenyalylasparaginyllysyltyrosylglycylvalylerylglutamylprolylvalylleucylalanylvallylprolylaspartylprolylprolyllysylaspahreonylisoleucylthreonyllysylaspartylsptophylglycylhistidylprolylaspartylserisoleucylisoleucylasparaginyltyrosylisspartyllysylalanylglycylglutaminylargilasparaginyllysyllysylthreonylleucylthysylvalylserylglycylleucylthreonylglututamylphenylalanylarginylisoleucylmethlalanylglycylisoleucylserylalanylprolyylalanyltyrosyllysylalanylcysteinylaspprolylglycylprolylprolylglycylasparagithreonylserylarginylserylserylisoleucyraginyllysylprolylisoleucyltyrosylaspacylthreonylglycyltyrosylmethionylvalylglutamylglutamylaspartylglutamyltryptolprolylprolylalanylglycylleucyllysylalleucylthreonylglycylleucylthreonylglutrosyllysylisoleucylarginylisoleucyltyrglutamylglycylleucylglycylglutamylprolonylprolyllysylalanylglutamylaspartylautamylisoleucylglutamylleucylaspartylalvalylthreonylisoleucylarginylalanylcyylleucylphenylalanylvalylprolylisoleucrolylglutamylvalyllysyltryptophylalanymylserylleucylaspartyllysylalanylserylryltyrosylthreonylleucylleucylisoleucyinylarginylphenylalanylaspartylserylglonylvalylglutamylasparaginylserylserylanylvalylasparaginylvalylarginylvalyllolylprolylglutaminylaspartylleucyllysyylthreonylserylvalylthreonylleucylthreeucylleucylaspartylglycylglycylseryllyisoleucylvalylglutamyllysylarginylgluttyrosylserylthreonylvalylalanylthreonyhreonylseryltryptophyllysylvalylaspartlglycylcysteinylseryltyrosyltyrosylpheutamylasparaginylglutamyltyrosylglycylutamylthreonylalanylglutamylserylvalylylleucylprolylprolylglycyllysylisoleuclylthreonylarginylasparaginylserylvalylysylprolylglutamylhistidylaspartylglylglycyltyrosylisoleucylvalylglutamylmelserylaspartyllysyltryptophylalanylthrsylvalylthreonylglutamylalanylthreonylcylglutaminylglycylglutamylglutamyltyrrylalanylglutaminylasparaginylglutamylolylarginylglutaminylleucylserylvalylptylleucylvalylisoleucylprolylprolylalanylalanylasparaginylthreonylphenylalanutamylaspartylleucyllysylvalylaspartylcylarginylprolylthreonylprolylalanylvaspartylasparaginylvalylprolylleucyllysvalylasparaginylalanylglutamylserylthrserylleucylleucylthreonylisoleucyllysyamylaspartylvalylglycylhistidyltyrosylginylserylalanylglycylglutamylalanylisginylvalylisoleucylvalylleucylaspartylylglycylprolylvalyllysylmethionylaspartylserylisoleucylthreonylleucylseryltrsylaspartylglycylglycylserylserylisoleoleucylvalylglutamyllysylarginylaspartonyltryptophylglutaminylisoleucylvalylylthreonylthreonylisoleucyllysylalanylglycylcysteinylglutamyltyrosylglutaminlalanylglutamylasparaginylarginyltyrosucylasparaginylserylglutamylprolylthrelylphenylalanyllysylvalylprolylglycylplvalylthreonylleucylserylserylarginylalutaminyltryptophylasparaginylglutamyllycylserylarginylvalylisoleucylglycyltlysylglutamylarginylasparaginylserylisucylasparaginyllysylthreonylprolylisolhenylalanyllysylthreonylthreonylglycylutamyltyrosylglutamylphenylalanylarginylisoleucylvalylglycylisoleucylglycyllmylcysteinyltyrosylvalylalanylarginylalprolylglycylarginylprolylglutamylalanginylasparaginylserylvalylthreonylleuclylthreonyltyrosylaspartylglycylglycylrosylisoleucylvalylglutamyllysyllysylgginyltryptophylmethionyllysylalanylseroleucylisoleucylaspartylthreonylhistidglycylleucylvalylglutamylaspartylhistiylarginylvalylisoleucylalanylarginylasnylalanylserylglutamylprolylserylglutaylthreonylalanylarginylaspartylglutamyoleucylserylmethionylaspartylprolyllysucylvalylvalylhistidylalanylglycylglutrtylalanylaspartylisoleucyltyrosylglyclisoleucylglutaminyltryptophylisoleucymylleucylserylasparaginylthreonylalanylserylthreonylaspartylphenylalanylalanlaspartylalanylvalylarginylvalylasparteucylleucyllysylalanyllysylasparaginylylvalylthreonylvalylasparaginylvalyllyglycylprolylprolylglutamylglycylprolylthreonylalanylglutamyllysylcysteinyltholylprolylleucylglutaminylaspartylglycucylasparaginyltyrosylisoleucylvalylgllserylarginylleucylvalyltryptophylthreinylvalylglutaminylthreonylleucylserylcylleucylglutamylglycylasparaginylglutnylisoleucylmethionylalanylvalylasparalutamylprolylleucylglutamylserylglutamginylprolylphenylalanylvalylvalylprolylylglutamylvalylthreonylthreonylvalyltsoleucylvalylvalyltryptophylglutamylarlglycylserylglutamylisoleucylleucylglyrginylaspartyllysylglutamylglycylisolelcysteinylhistidyllysylarginylleucyliseucylarginylvalylthreonylglycylleucyliaspartyltyrosylglutamylphenylalanylarginylalanylalanylglycylleucylserylglutayltyrosylglutaminyllysylalanylcysteinylprolylglycylprolylprolylasparaginylasspartylisoleucylthreonylarginylserylsetophylseryllysylprolylisoleucyltyrosylylisoleucylglutaminylglycyltyrosylisolartylvalylasparaginylvalylglycylglutamnylthreonylprolylprolylthreonylglycyliaraginylisoleucylglutamylvalylglutamyldylglutamyltyrosylasparaginylphenylalasoleucylasparaginyllysylalanylglycylvartylvalylprolylglycylprolylisoleucylisucylglutamylalanylprolylaspartylisoleuamylleucylarginyllysylisoleucylisoleucglycylglycylserylleucylarginylleucylphglycylarginylprolylthreonylprolylglutaalylaspartylglycylglutamylisoleucylargoleucylaspartylvalylthreonylserylseryllleucylaspartylasparaginylvalylasparagyllysyltyrosylthreonylleucylthreonylleycylthreonyllysylserylalanylphenylalancylaspartylthreonylprolylserylprolylprlthreonylglutamylisoleucylthreonyllysyreonyltryptophylglutamylprolylprolyllelysylisoleucyllysylasparaginyltyrosyliutamylalanylthreonylarginyllysylseryltlasparaginylcysteinylhistidyllysylaspalaspartylglutaminylleucylglutaminylgluosylphenylalanylarginylvalylthreonylalsylglycylisoleucylglycylleucylprolylallprolylisoleucyllysylvalylalanylglutamglycyllysylisoleucylthreonylvalylasparraginylserylvalylserylleucylseryltrypttidylaspartylglycylglycylseryllysylisoleucylvalylglutamylmethionylglutaminylyltryptophylserylglutamylcysteinylalanminylalanylvalylisoleucylthreonylasparlglutamylglutamyltyrosylleucylphenylalaraginylglutamyllysylglycylarginylseryanylvalylprolylisoleucylvalylalanyllysmylprolylaspartylvalyllysylprolylalanyvalylglutaminylvalylglycylglutaminylasalylprolylisoleucylserylglycylarginylpreonyltryptophylthreonyllysylaspartylgnylthreonylthreonylarginylisoleucylaspeucylaspartylleucylthreonylthreonylleunylhistidyllysylaspartylaspartylglycylcylthreonylvalylalanylasparaginylvalyllanylserylisoleucylglutamylisoleucylvalaspartylprolylprolyllysylglycylprolyltylvalylserylalanylglutamylserylisoleuaraginylprolylprolylleucyltyrosylthreosoleucylthreonylasparaginyltyrosylisolartylthreonylthreonylthreonylthreonylvylalanylthreonylvalylalanylarginylthrellysylleucyllysylthreonylglycylthreonynylarginylisoleucylphenylalanylalanylgcylglutaminylserylphenylalanylalanylleeucylvalylalanylglutaminyltyrosylprolyolylprolylglycylthreonylprolylphenylalryllysylaspartylserylmethionylvalylisolutamylprolylvalylasparaginylasparaginucylglycyltyrosylhistidylleucylglutamyinylserylisoleucylleucyltryptophylthrenylisoleucylisoleucylhistidylaspartyltlanylglutaminylasparaginylleucylglutamrosylglutamylphenylalanylarginylvalylteucylvalylglycylvalylglycyllysylalanylysteinyltyrosylvalylalanylarginylasparlylglycylthreonylprolylglutamylprolylisparaginylglutamylisoleucylthreonylleulprolylvalyltyrosylaspartylglycylglycycyltyrosylisoleucylvalylglutamyllysylalycylarginyltryptophylmethionyllysylalginylvalylisoleucylglutamylthreonylgluylglycylleucylthreonylglutamylaspartylnylalanylarginylvalylisoleucylalanyllynylisoleucylseryllysylprolylserylasparylthreonylalanyllysylaspartylglutamylveucylserylmethionylaspartylprolyllysylisoleucylvalylvalylasparaginylalanylglinylleucylglutamylalanylaspartylvalylhlthreonylisoleucylglutamyltryptophyllemylisoleucylglutamylglutamylserylalanyysylasparaginylthreonylaspartylphenylaylvalyllysylaspartylalanylisoleucylargutaminyltyrosylisoleucylleucylarginylacylseryllysylserylphenylalanylprolylvaaspartylarginylprolylglycylprolylprolylvalylthreonylglycylvalylthreonylserylreonyltryptophylserylprolylprolylleucylaspartylisoleucylserylhistidyltyrosylmylthreonylserylarginylleucylalanyltrylglutamylvalylvalylthreonylasparaginyleucylleucylglutamylglycylasparaginylglylisoleucylmethionylalanylvalylasparagutamylprolylleucylglutamylserylalanylpaginylprolylphenylalanylvalylleucylproylglutamylvalylthreonylasparaginylisolnylthreonylvalylcysteinyltryptophylaspspartylglycylglycylserylglutamylisoleualylglutamyllysylarginylaspartylarginyhylisoleucyllysylcysteinylasparaginyllaspartylleucylarginylleucylarginylvalyylaspartylhistidylglutamyltyrosylglutanylglutamylasparaginylalanylalanylglyclylalanylthreonylvalyltyrosyltyrosyllyylphenylalanyllysylprolylglycylprolylpdylisoleucylvalylaspartylthreonylthreoreonylleucylalanyltryptophylglycyllysyylglycylserylglutamylisoleucylleucylglcylcysteinyllysylalanylaspartylglutamyylisoleucylvalylthreonylprolylglutaminhreonylarginylphenylalanylglutamylisolylhistidylglutaminylglutamyltyrosyllysnylleucylasparaginyllysylvalylglycylleylvalylprolylglycylthreonylvalyllysylptamylalanylprolylglutamylleucylaspartyrginyllysylglycylisoleucylvalylvalylarrginylisoleucylhistidylisoleucylprolyllmethionylprolylglutamylisoleucylthreoutamylglycylglutamylphenylalanylthreonucylglutamyllysylglycylvalylasparaginyylisoleucylaspartylasparaginylcysteinyalanylglycyllysyltyrosylisoleucylleucylserylglycylseryllysylserylalanylphenyleucylaspartylthreonylprolylglycylprolalanylvalyllysylglutamylvalylarginyllyeucylvalyltryptophylglutamylprolylprollycylalanyllysylvalyllysylasparaginyltginylglutamylserylthreonylarginyllysylserylseryllysylcysteinylseryllysylthreamylasparaginylleucylthreonylglutamylghenylalanylarginylvalylmethionylalanylanylglycylvalylglycylvalylprolylvalylgalyllysylalanylalanylglutamylprolylprolthreonylleucylthreonylaspartylvalylseylleucylmethionyltryptophylglutamyllyscylglycylserylarginylvalylleucylglycyllutaminylprolyllysylglycylthreonylglutlylalanylglutamylseryllysylvalylcysteinylglycylleucylserylserylglycylglutamilanylarginylvalyllysylalanyltyrosylaspylaspartylprolylarginylvalylleucylglycsylaspartylleucylthreonylisoleucylglutrolylphenylalanylasparaginylthreonyltyglycylglutamylaspartylleucyllysylisoleleucylglycylarginylprolylarginylprolylvalyllysylaspartylglycylglutamylprolylylarginylvalylasparaginylvalylglutamylthreonylvalylleucylhistidylisoleucyllypartylaspartylphenylalanylglycyllysyltreonylasparaginylserylalanylglycylthreylleucylserylvalylisoleucylvalylleucylylvalylglycylprolylvalylarginylphenylaylaspartylphenylalanylvalylvalylisoleulylalanyltyrosylthreonylglycylglycylcyraginyltyrosylisoleucylvalylglutamyllyhreonylthreonylthreonyltryptophylhistilvalylalanylarginylthreonylthreonylisoucyllysylthreonylglycylthreonylglutamyylisoleucylphenylalanylalanylglutamylaserylalanylprolylleucylaspartylseryllynyltyrosylprolylphenylalanyllysylglutareonylprolylphenylalanylvalylthreonylsaminylmethionylleucylvalylglutaminyltrasparaginylaspartylglycylglycylthreonyylhistidylleucylglutamylglutaminyllysyucylleucyltryptophylvalyllysylleucylasylglutaminylaspartylthreonyllysylphenyeucylaspartylglutamylglycylleucylglutavalylserylalanylglutamylasparaginylisoylprolylseryllysylvalylserylglutamylcyylaspartylprolylcysteinylaspartylprolylanylisoleucylvalylisoleucylthreonylareonylleucyllysyltryptophyllysyllysylprylseryllysylisoleucylthreonylglycyltyrlaspartylleucylprolylaspartylglycylargerylphenylalanylthreonylasparaginylvalnylalanylthreonylvalylserylglycylleucyinyltyrosylglutamylphenylalanylarginylnylalanylalanylglycylasparaginylphenyltylserylserylglycylalanylisoleucylthreoleucylaspartylalanylprolylasparaginylltyrosyllysylaspartylvalylisoleucylvalthreonylphenylalanylvalylleucylglutamyyllysylprolylisoleucylprolylaspartylvalglycyllysylglutamylleucylglutamylglutionylglutamylisoleucyllysylserylthreonhreonylleucylvalylvalyllysylaspartylcyrtylglycylglycylglutaminyltyrosylisoleylvalylglycylglycylthreonyllysylserylillysylvalylleucylaspartylarginylprolylylleucyllysylvalylthreonylglycylvalylttyrosylleucylalanyltryptophylasparagintylglycylglycylalanylasparaginylisoleuleucylglutamyllysylarginylglutamylthreylthreonylglutaminylvalylserylthreonylasparaginyltyrosyllysylvalylthreonyllynylglutamyltyrosylisoleucylphenylalanyparaginyllysyltyrosylglycylisoleucylglylglycylprolylvalylthreonylalanylcysteolylprolylglycylprolylprolylserylthreooleucylthreonyllysylaspartylserylmethinylarginylprolylvalylaspartylaspartylglglutamylglycyltyrosylisoleucylleucylgtamylglycylvalylarginyltryptophylthreosylthreonylleucylthreonylaspartylleucylycylleucylthreonylglutamylglycylhistiarginylvalylalanylalanylglutamylasparalutamylprolylserylglutamylprolylserylvlcysteinylaspartylalanylleucyltyrosylpsparaginylprolyllysylvalylthreonylaspaalylserylleucylalanyltryptophylseryllyycylglycylalanylprolylvalyllysylglycylglutamylalanylalanylalanylaspartylglutinylthreonylprolylprolylthreonylglycylylphenylalanylthreonylvalylthreonyllyseonylglutamyltyrosylasparaginylphenylalisoleucylasparaginylserylglutamylglycreonylleucylprolylglycylserylvalylvalyleucylglutamylprolylprolylglutamylisolpartylleucylarginyllysylvalylvalylvalyonylleucylarginylleucylphenylalanylvalylprolylglutamylprolylglutamylvalyllysamylglycylisoleucylleucylthreonylasparglutamylvalylthreonylserylserylphenylaoleucylaspartylasparaginylvalylthreonyycylarginyltyrosylasparaginylleucylthraginylserylglycylseryllysylthreonylalalarginylvalylleucylaspartylserylprolylucylthreonylisoleucylarginylglutamylvaonylleucylseryltryptophylglutamylprolylglycylalanyllysylisoleucylthreonylaspyllysylarginylglutamylthreonylthreonylonylisoleucylthreonylasparaginylasparathreonylphenylalanylarginylisoleucylglutamylglycylcysteinylseryltyrosyltyrosnylserylasparaginylglutamyltyrosylglycglutamylthreonylthreonylglutamylprolylrolylleucylprolylprolylglycylarginylvathreonylarginylasparaginylthreonylalanlutamyllysylprolylglutamylserylaspartyeonylglycyltyrosylvalylvalylglutamylmelserylglutamyllysyltryptophylserylthrellysylthreonylleucylglutamylalanylthrenylalanylglycylglutamylglutamyltyrosylalanylvalylasparaginylglutamyllysylglylglutaminylleucylglycylvalylprolylvalyeucylglutamylisoleucyllysylprolylserylylhistidylthreonylphenylalanylasparagilutaminylleucyllysylisoleucylaspartylvginylprolylglutaminylalanylthreonylvalaspartylglycylglutaminylthreonylleucyllvalylasparaginylvalylserylserylserylllserylisoleucyllysylglutamylalanylseryreonyltyrosylglutamylleucylcysteinylvalserylisoleucylthreonylvalylprolylisollleucylaspartylarginylprolylglycylprollisoleucylaspartylglutamylvalylserylcyylisoleucylseryltryptophylasparaginylplycylglycylcysteinylglutaminylisoleucylylglutamyllysyllysylglutamylthreonylthylhistidylisoleucylvalylserylglutaminerylisoleucyllysylisoleucylvalylarginylutamyltyrosylglutaminylphenylalanylarparaginylarginyltyrosylglycyllysylserylalanylvalylvalylalanylglutamyltyrosylglycylprolylprolylglycylthreonylprolylyllysylserylthreonylmethionylleucylvalprolylvalylasparaginylaspartylglycylglltyrosylhistidylleucylglutamyltyrosyllcylleucyltryptophylseryllysylalanylaspylalanylaspartylthreonylglutaminylvalylglutamylglycylleucylmethionyltyrosylganylglutamylasparaginylisoleucylalanylseryllysylserylcysteinylglutamylprolyllylcysteinylaspartylprolylprolylglycylylasparaginylisoleucylthreonylarginyllophylseryllysylprolylhistidyltyrosylascylthreonylglycyltyrosylisoleucylvalyllprolylaspartylglycylarginyltryptophylsylthreonylasparaginylisoleucylglutaminylglutamylvalylthreonylglutamylleucylrginyltyrosylglutamylphenylalanylarginaraginylalanylalanylaspartylserylvalylylthreonylglycylprolylisoleucylisoleucutamylprolylprolylarginylvalylmethionylanylarginylaspartylvalylisoleucylvalylleucyllysylisoleucylasparaginylalanyllprolylleucylprolylvalylisoleucylserylisoleucylglutamylisoleucylglutamylgluttamylisoleucylisoleucylserylthreonylasucylleucylthreonylvalyllysylaspartylcytylthreonylglycylglutaminyltyrosylvalyylvalylalanylglycylthreonylarginylseryyllysylvalylleucylaspartyllysylprolylgleucylglutamylisoleucylasparaginylglyccysteinylserylleucylseryltryptophylglyspartylglycylglycylalanylaspartylisolerginyllysyllysylarginylglutamylthreonylthreonylisoleucylcysteinylglutamylglylthreonylserylcysteinyllysylvalylthreoraginylglutamyltyrosylisoleucylphenylalasparaginyllysyltyrosylglycylvalylglylvalylalanylisoleucyllysylalanylleucylalylprolylserylprolylprolylthreonylserrylvalylthreonyllysylglutamylserylmethhylserylarginylprolylglutamylserylaspacylserylglycyltyrosylisoleucylisoleucylasparaginylserylleucylarginyltryptophlysylprolylvalyltyrosylaspartylleucylaleucylarginylglutamylglycylcysteinylglvalyltyrosylalanylglutamylasparaginylarolylserylglutamylthreonylserylprolyllaspartylprolylvalylphenylalanylleucylplyllysylisoleucylvalylaspartylserylglyreonylisoleucylalanyltryptophylvalyllyglycylglycylalanylprolylisoleucylthreoyltyrosyllysyllysylserylaspartylaspartreonylserylisoleucylglutaminylserylleuosylthreonylisoleucylserylglycylleucylltyrosylvalylphenylalanylarginylvalyllglycylalanylserylaspartylprolylserylasminylisoleucylalanyllysylglutamylargincylphenylalanylaspartylisoleucylaspartlthreonylleucylisoleucylvalyllysylalanonylmethionylthreonylvalylprolylphenylylprolylasparaginylvalylleucyltryptophspartylleucylarginylthreonylarginylalaonylaspartylserylarginylthreonylseryllaginylalanylasparaginylarginylasparagihreonylleucylthreonylisoleucylglutaminalanylserylleucylthreonylleucylvalylvaprolylglycylprolylprolylthreonylasparaylaspartylvalylthreonyllysylglutamylseaspartylvalylprolylglutamylasparaginylyllysylasparaginyltyrosylhistidylisolenylseryllysyllysylalanyltryptophylvalyaginylcysteinylasparaginylarginylleucyraginylleucylglutaminylglutamylglycylalanylarginylvalylserylglycylglutamylasvalylglycylisoleucylprolylalanylglutamysylisoleucylthreonylglutamyllysylprolcylglycylvalylthreonylserylisoleucylseylthreonyltryptophylleucyllysylprolylgserylarginylisoleucylvalylhistidyltyroutamyllysylglycylglutaminyllysylasparalanylvalylalanyllysylserylthreonylhistucylarginylglutamylasparaginylserylglularginylvalylphenylalanylalanylglutamyeucylserylaspartylprolylarginylglutamylisoleucyllysylglutamylglutaminylleucycylaspartylmethionyllysylasparaginylphylvalyltyrosylvalylarginylalanylglycylartylisoleucylprolylisoleucylserylglycthreonylleucylserylarginylaspartylglycnylmethionylarginylphenylalanylasparagylalanylglutamylasparaginylleucylthreolutamylserylvalylthreonylalanylaspartyisoleucylthreonylalanylalanylasparaginysylalanylphenylalanylisoleucylasparagylarginylprolylglycylprolylprolylthreoerylaspartylisoleucylthreonylglutamylgltryptophylglutamylprolylprolyllysyltyminylvalylthreonylasparaginyltyrosylisamylthreonylserylthreonylalanylvalyltrlanylthreonylvalylalanylarginylthreonynyllysylleucylthreonylthreonylglycylglylalanylarginylisoleucyllysylalanylgluglycylisoleucylserylaspartylhistidylisvalylthreonylvalyllysylleucylprolyltyrlylprolylserylthreonylprolyltryptophylylarginylglutamylserylisoleucylthreonymylprolylvalylserylasparaginylglycylglsylhistidylleucylglutamylmethionyllysyleucylleucyltryptophylglutaminyllysylaleucylarginylthreonylthreonylhistidylpylisoleucylserylalanylglycylleucylisolinylvalyltyrosylalanylglutamylasparagiylprolylserylhistidylprolylserylglutamspartylalanylcysteinylglutamylprolylprsoleucylthreonylaspartylisoleucylserylylseryltryptophylglutaminylglutaminylpylglycylseryllysylisoleucylthreonylglyinylarginylaspartylleucylprolylaspartyylalanylserylphenylalanylthreonylasparglutaminylphenylalanylthreonylisoleucylasparaginylserylglutaminyltyrosylglutlanylalanylarginylasparaginylalanylvalnylprolylserylglutamylvalylvalylglycylleucylaspartylseryltyrosylglycylglycylrolylleucylglutamyltyrosylthreonylglutanylglycylthreonylserylvalyllysylleucylycyllysylprolylalanylprolylthreonylisylaspartylaspartyllysylglutamylleucylgeucylvalylcysteinylvalylglutamylasparaalanylserylisoleucylleucylisoleucyllysylasparaginylserylglycylcysteinyltyrossparaginylalanylmethionylalanylserylalinylvalylglutaminylisoleucylleucylaspaycylglycylprolylisoleucylglutamylphenyanylglutamyllysylisoleucylthreonylleucylalanylaspartylaspartylglycylglycylalyrosylisoleucylvalylglutamyllysylarginvalyltryptophylserylmethionylvalylseryamylcysteinylisoleucylisoleucylthreonyeucyllysylglycylasparaginylglutamyltyrylarginylalanylvalylasparaginyllysyltyrolylleucylglutamylserylaspartylserylvylphenylalanylvalylthreonylprolylglycylutamylvalylthreonyllysylisoleucylthrehreonylvalylvalyltryptophylserylarginylglycylserylaspartylisoleucylserylglyclysylarginylaspartyllysyllysylserylleulvalylleucyllysylglutamylthreonylisolelutaminyllysylvalylthreonylglycylleucypartyltyrosylglutaminyltyrosylarginylvalanylalanylglycylglutaminylglycylprolrylglutamylphenylalanyltyrosyllysylalaartylprolylprolylglycylprolylprolylalaanylaspartylserylthreonyllysylserylsertophylseryllysylprolylvalyltyrosylaspaeonylglycyltyrosylvalylvalylglutamylismylglutamylglutamylglutamyltryptophyltsylglycylglutamylvalylarginylthreonyltylasparaginylleucyllysylprolylglycylvalanylarginylvalylserylalanylvalylasparylglycylglutamylprolylisoleucylglutamyvalylglutaminylalanyllysylaspartylisolamylisoleucylaspartylleucylaspartylvalalylisoleucylalanyllysylalanylglycylgleucylisoleucylprolylphenylalanyllysylgnylvalylthreonyltryptophylarginyllysylcylglycylserylaspartylalanylarginyltyrylthreonylaspartylserylserylserylleucyminylvalylthreonylarginylasparaginylasleucylleucylthreonylisoleucylglutamylaprolyllysylserylserylthreonylvalylserynylprolylalanylalanylcysteinylglutaminstidylvalylserylarginylglycylthreonylvspartylprolylprolylleucylisoleucylaspalisoleucylasparaginyltyrosylvalylisolenylthreonyllysylarginylthreonyltryptoplcysteinylserylserylthreonylserylphenyleucylserylglutamyllysylthreonylprolyllarginylvalylleucylalanylglutamylasparcylglycylglutamylprolylcysteinylglutamyllysylalanylalanylglutamylvalylprolyllleucylserylmethionyllysylaspartylseryleucylleucylseryltryptophylthreonyllyslglycylglycylserylvalylisoleucylthreonarginyllysylglycyllysylglycylglutamylgtidylalanylglycylisoleucylseryllysylthtamylvalylserylglutaminylleucyllysylgltamylphenylalanylarginylvalylphenylalasylglycylleucylserylaspartylprolylvalyucylthreonylvalyllysylglutamylleucylismylvalylaspartylleucylserylaspartylisoalylthreonylvalylarginylisoleucylglycyucylglutamylleucylprolyltyrosyllysylgleucylseryltryptophylleucyllysylaspartymylserylglutamylphenylalanylvalylargintamylasparaginyllysylisoleucylthreonyllalanyllysyllysylglutamylhistidylglycyleucylleucylaspartylasparaginylalanylvvalylprolylisoleucylthreonylvalylisolelseryllysylprolyllysylglycylprolylisoltamylisoleucyllysylalanylaspartylserylaspartylvalylprolylglutamylaspartylaspsoleucylthreonylcysteinyltyrosylserylilthreonylserylglutaminylthreonylasparaysteinylserylserylvalylalanylarginylthlprolylasparaginylleucylvalyllysylaspaphenylalanylarginylvalylarginylalanylgcylvalylserylglutaminylprolylleucylvalalanyllysylhistidylglutaminylphenylalaylprolylglycyllysylprolylvalylisoleucyylaspartylglycylmethionylserylleucylthlvalyltyrosylaspartylglycylglycylserylanylhistidylvalylglutamyllysyllysylgluylleucyltryptophylglutaminyllysylvalylucylserylglycylarginylglutamyltyrosylaylglutamylglycylleucylaspartyltyrosylgrosylalanylglutamylasparaginylserylalalaspartylprolylseryllysylphenylalanyltvalylaspartylprolylprolylglycylthreonyrtylvalylthreonylarginylglutamylthreonophylasparaginylprolylprolylleucylargioleucylvalylglycyltyrosylserylisoleucyylasparaginylglutamylarginyltryptophylnylalanylthreonylaspartylvalylserylgluonylvalylthreonylglycylleucylserylprolmylphenylalanylarginylisoleucylisoleucylglycylthreonylisoleucylserylprolylprisoleucylisoleucylmethionylthreonylarglprolylprolylisoleucylvalylglutamylphelphenylalanylaspartylglycylleucylisoleylserylleucylarginylisoleucyllysylalanlprolylvalylprolylarginylvalylthreonylglycylvalylglutamylisoleucylglutamyllyonylglutamylisoleucylthreonylasparaginylleucylphenylalanylvalylarginylaspartidylarginylglycylvalyltyrosylthreonylvlanylserylglycylserylalanyllysylalanylylglutaminylaspartylthreonylprolylglyccylarginylphenylalanylthreonylasparagiysylmethionylthreonylleucyltryptophyltasparaginylaspartylglycylcysteinylalanrosylisoleucylisoleucylglutamyllysylarucylalanyltryptophylalanylleucylisoleuutamylalanylglutaminylseryltyrosylthreucylasparaginylglycylasparaginylglutamnylvalylserylalanylvalylasparaginyllysnylprolylleucylaspartylserylaspartylprucylglutaminyltyrosylthreonylvalylprolylprolylglutamylprolylserylasparaginylerylisoleucylthreonylleucylthreonyltryerylaspartylglycylglycylserylglutamyliisoleucylleucylglutamylarginylarginylgyltryptophylvalyllysylvalylisoleucylseglutamylthreonylarginylphenylalanyllysglutamylglycylasparaginylglutamyltyrosmethionylalanylglutamylasparaginylalanylserylglycylisoleucylserylarginylleuctamylprolylvalylasparaginylprolylprolyyllysylvalylthreonylaspartylthreonylseeucylglutamyltryptophylseryllysylprolycylmethionylglutamylisoleucylisoleucylamylmethionylcysteinyllysylthreonylasphistidyllysylvalylasparaginylalanylglunylarginyltyrosylthreonylvalylthreonyllglutamylglutamyltyrosyllysylphenylalaasparaginylglycylalanylglycyllysylglycylthreonylglycylthreonylisoleucyllysyleonylalanylprolylglutamylleucylaspartyphenylalanyllysylglutaminylthreonylhislanylserylisoleucylarginylleucylphenylnylglycylarginylprolylthreonylprolylthylprolylaspartylserylasparaginylleucylleucylhistidylthreonylthreonylaspartyllthreonylvalylglutamylasparaginylcystepartylalanylglycyllysyltyrosylthreonylnylasparaginylserylglycylseryllysylseronylvalyllysylvalylleucylaspartylthreoolylisoleucylthreonylphenylalanyllysylerylalanylthreonylleucylmethionyltryptylaspartylglycylglycylalanylarginylisoalylglutamyllysylarginylglutamylalanyllutaminylvalylisoleucylserylglutamyllyylisoleucylphenylalanyllysylvalylasparlycylvalylprolyltyrosyltyrosylphenylalaraginylglutamyltyrosylglycylvalylglycionylprolylglutamylprolylisoleucylvalyolylalanylprolylprolylarginylarginyllenylseryllysylserylserylalanylvalylleucaspartylhistidylaspartylglycylglycylserosylleucylleucylglutamylmethionylargiylleucyltryptophylvalylglutamylalanylglleucylthreonylphenylalanylthreonylvalllysylthreonylglutamyltyrosylglutamylpysylasparaginylaspartylalanylglycyltyrmylalanylphenylalanylserylserylvalylisglutaminylisoleucylglutamylprolylthreoylisoleucylthreonylasparaginylglutaminysylalanylglycylserylprolylphenylalanyylisoleucylserylglycylarginylprolylalayllysylleucylglutamylglutamylmethionylspartylarginylvalylserylisoleucylthreoinylthreonylthreonylleucylthreonylvalyglycylaspartylserylglycylarginyltyrosyutamylasparaginylthreonylalanylglycylvalylthreonylvalylvalylvalylisoleucylglhreonylglycylprolylisoleucylglutamylvaylserylcysteinylvalylleucylseryltryptoylglycylglycylglycylthreonylglutamylisoleucylvalylglutamyllysylarginylglutamtryptophylglutaminylleucylvalylasparagonylglutaminylisoleucyllysylvalylthreoylmethionylglutamyltyrosylserylphenylaasparaginylarginylphenylalanylglycylvarylalanylprolylisoleucylisoleucylalanyvalylprolylprolylserylalanylprolylthreylhistidylvalylserylalanylasparaginylatryptophylglutamylglutamylprolyltyrosyysylisoleucylisoleucylglycyltyrosyltrymylarginylasparaginylthreonylisoleucylsparaginyllysylvalylprolylcysteinylleusyllysylvalylthreonylglycylleucylvalylglutaminylphenylalanylarginylthreonyltalanylglycylvalylseryllysylalanylserylleucylmethionylalanylglutaminylasparagglycylarginylprolylglutamylvalylthreonthreonylvalylserylleucylisoleucyltryptaspartylglycylglycylseryllysylvalylvalutamylarginyllysylprolylvalylserylglutltryptophylleucyllysylcysteinylasparagrylaspartylasparaginylphenylalanylphenleucylserylglutamylglycylaspartylthreoylvalylleucylalanyllysylasparaginylalaysylglycylserylglutamylserylthreonylglinylaspartylglutamyltyrosylalanylprolyartylalanylarginylleucylhistidylglycyllarginylalanylglycylserylaspartylleucyylglycylglycyllysylprolylglutamylprolyhreonyllysylglycylaspartyllysylglutamymyllysylvalylserylleucylglutaminyltyrothreonylalanylvalylisoleucyllysylphenylaspartylserylglycyllysyltyrosylthreonylalanylserylglycylthreonyllysylalanylalylleucylaspartylserylprolylglycylproylvalylserylarginylvalylthreonylglutameucylalanyltryptophylserylleucylprolylcylalanylglutamylisoleucylthreonylhistginylarginylglutamylthreonylserylarginsoleucylvalylglutamylglycylglutamylcyssylvalylvalylthreonylarginylleucylisoltamyltyrosylisoleucylphenylalanylarginllysyltyrosylglycylprolylglycylvalylprlisoleucylvalylalanylarginylasparaginyprolylserylprolylprolylglycylisoleucylreonylglycyllysylglutamylhistidylisoleptophylthreonyllysylprolylglutamylserytamylisoleucylserylasparaginyltyrosyllmyllysylglutamylserylleucylarginyltrypyllysylaspartyltyrosylvalylvalyltyrosyvalylthreonylserylleucylmethionylglutautaminylphenylalanylarginylvalylthreonlglycylasparaginylserylglutamylprolylsphenylalanylisoleucylserylcysteinylargnylprolylglycylprolylprolylserylalanylonylthreonyllysylhistidylserylisoleucyllysylprolylmethionyltyrosylaspartylglvalylglycyltyrosylvalylleucylglutamylmrtylthreonylaspartylglutaminyltryptophylasparaginylalanylthreonylisoleucylarnylalanylthreonylvalylprolylaspartylleysyltyrosylserylphenylalanylarginylvallysylglycylmethionylserylglutamyltyrosglutamylisoleucylglutamylprolylvalylglucylprolylaspartylleucylglutamylleucylsylthreonylvalylthreonylisoleucylarginnylleucylmethionylvalylserylvalylseryllisoleucylthreonyltryptophylseryllysylucylalanylserylarginylalanylisoleucylitamylseryltyrosylserylleucylleucylisolinylarginyltyrosylaspartylalanylglycylylalanylglutamylasparaginylglutaminylsonylvalylleucylvalyllysylvalyltyrosylasteinylprolylserylvalyllysylvalyllysylrylvalylthreonylisoleucylthreonyltryptlisoleucylaspartylglycylglycylalanylprtyrosylisoleucylvalylglutamyllysylargiinylalanylphenylalanyllysylthreonylvalyllysylthreonylleucyltyrosylarginylisolglycylthreonylmethionylhistidyltyrosyylglutamylasparaginylisoleucyltyrosylgysteinylglutamylthreonylserylaspartylaalylprolylleucylvalylprolylalanyllysylylthreonyllysylserylthreonylvalylthreosylprolylleucyltyrosylaspartylglycylglltyrosylvalylleucylglutamylalanylcysteylarginyltryptophylmethionyllysylvalylnylvalylleucylglutamylhistidylthreonylglutamylglycylglutamylglutaminyltyrosyarginylalanylglutaminylasparaginylglutolylarginylglutamylthreonylvalylthreonlaspartylleucylarginylvalylleucylprolyylthreonylmethionylprolylglutaminyllyslylalanylglycylarginylprolylvalylglutacylalanylglycylarginylprolylprolylprolalanylphenylalanylalanylglycylseryllyslarginylvalylthreonylvalylglutamylthrellysylleucylthreonylisoleucylarginylglnylaspartylthreonylglycylglutamyltyrosasparaginylvalylthreonylglycylthreonylcyllysylvalylisoleucylisoleucylleucylalthreonylglycylprolylisoleucyllysylisortylalanylthreonylserylisoleucylthreonrolylprolylglutamylleucylaspartylglycyltyrosylvalylvalylglutamylglutaminylarrolylglycyltryptophylleucylprolylvalylnylserylthreonylphenylalanyllysylphenylglutamylglycylasparaginylglutamyltyronylalanylthreonylasparaginylarginylphetyrosylleucylglutaminylserylglutamylvalserylserylisoleucylarginylisoleucylprnylleucylglutaminylisoleucylphenylalanglycylmethionylthreonylleucylthreonyltlaspartylaspartylglycylglycylserylglutleucylvalylglutamylarginyllysylglutamyryptophylvalylarginylvalylasparaginyllylthreonylarginyltyrosylarginylserylthlycylleucylglutamyltyrosylglutamylhistucylasparaginylalanylarginylglycylserylseryllysylprolylisoleucylvalylalanylmylprolylprolylglycyllysylprolylglutamieonylaspartylthreonylthreonylarginylthyptophylserylvalylprolylglutamylaspartylthreonylglycyltyrosylleucylisoleucylylaspartylglutaminylhistidylglutamyltraginylthreonylthreonylprolylthreonyllyhreonylleucylthreonylhistidylleucylprorosylarginylphenylalanylarginylvalyllelglycylglycylprolylglycylglutamylprolyeonylvalyllysylvalylthreonylglutamylmespartyltyrosylglutamylleucylaspartylglmylglycylisoleucylphenylalanylvalylargeucylarginylleucylthreonylisoleucylprohenylalanylprolylisoleucylcysteinyllysycylglutaminylaspartylisoleucylseryllylanylthreonylserylglutamylthreonylhisteucyllysylglutamylalanylaspartylarginyyrosylaspartylleucylvalylleucylglutamyyllysylalanylvalyltyrosylisoleucyllysyrylprolylasparaginylserylprolylglutamyspartylaspartylisoleucylglutaminylvalytryptophylarginylprolylprolylalanylasprtylisoleucylleucylglycyltyrosylisoleuamylvalylprolyllysylalanylalanyltryptolserylarginylvalylarginylglycylthreonyucyllysylglutamylasparaginylvalylglutaylvalylserylalanylglutamylasparaginylglseryllysylprolylleucyllysylserylglutallysylthreonylprolylleucylasparaginylplasparaginylprolylprolylglutamylvalylllserylvalylserylleucylseryltryptophylstylglycylglycylserylarginylvalylthreonamylarginyllysylglutamylthreonylseryltylhistidylasparaginyllysylthreonylglutonylmethionyltyrosylthreonylvalylthreolanylglutamyltyrosylglutaminylphenylalglutaminylasparaginylaspartylvalylglycrolylalanylserylglutamylprolylvalylvallalanylaspartyllysylprolylserylglutamiylisoleucylleucylserylisoleucylseryllyglutaminyltryptophylglutamyllysylprolycyllysylglutamylisoleucylleucylglycyltlarginylglutaminylserylglycylaspartylsasparaginyllysylglutamylarginylisoleuclalanylthreonylisoleucylglycylglycylletamyltyrosylglutamylphenylalanylarginyaraginylglutamylthreonylglycylleucylsenylalanylmethionylserylisoleucyllysyltylglutamylalanylprolylglycylisoleucylapartylvalylthreonylthreonyllysylleucyllleucylserylcysteinylglutaminylisoleuclylaspartylisoleucyllysyltryptophyltyrlutamylleucylisoleucylglutaminylserylaylserylaspartylglycylarginylthreonylhithionylthreonylglutamylglutamylglutamilyltyrosylthreonylcysteinylisoleucylallglycylglutamylvalylglutamylthreonylseaminylalanylthreonylprolylglutaminylphylprolylleucyllysylglutamyllysyltyrosylthreonylleucylarginylleucylhistidylvarginylprolylvalylprolylalanylmethionyldylglycylglutaminyllysylleucylleucylglaraginylisoleucylthreonylisoleucylglutidyltyrosylthreonylhistidylleucylvalylminylarginyllysylthreonylhistidylalanyinylleucylserylasparaginylvalylphenylanylisoleucylleucylaspartylvalylglutamyolylaspartyllysylprolylthreonylglycylplalanylleucylleucyllysylasparaginylseryllysylprolylprolylalanylaspartylasparucylthreonylasparaginyltyrosylvalylvalnyllysylglutamylglycylalanylglutamyltrerylalanylisoleucylserylvalylthreonyltylasparaginylleucylthreonylglutamylasphenylalanylarginylvalylserylalanylglutylglycylisoleucylserylaspartylprolylleylisoleucylisoleucyllysylserylprolylphalanylprolylglycyllysylprolylthreonylilysylaspartylserylcysteinylvalylvalylanylserylaspartylglycylglycylalanyllysytyrosylleucylglutamyllysylarginylglutaysyltryptophylisoleucylserylvalylthreolarginylglutamylthreonylvalylphenylalaisoleucylglutamylglycylleucylglutamyltlyllysylcysteinylglutamylasparaginylleyltryptophylserylglutamylisoleucylserylyllysylserylaspartylvalylprolylisoleuenylalanyllysylglutamylglutamylleucylaalylarginyltyrosylglutaminylserylaspareinyllysylvalylthreonylglycylhistidylptryptophyltyrosylarginylglutaminylglycanylaspartylglycylleucyllysyltyrosylarnylalanyllysylglycylglycyltyrosylhistiylalanylserylvalylthreonylaspartylaspasylglutaminylvalylarginylalanylthreonyerylvalylserylglycylthreonylalanylseryolylalanyllysylisoleucylhistidylleucylycylmethionylglycylalanylvalylhistidyllylvalylserylisoleucyllysylisoleucylprlylaspartylprolylvalylisoleucylthreonytaminylaspartylleucylisoleucylaspartylltyrosylglutaminylvalylisoleucylvalyltonylserylleucylvalylphenylalanylprolylyllysylaspartylalanylglycylphenylalanysylasparaginylarginylphenylalanylglycyreonylvalylglutamylleucylaspartylvalylolylprolylarginylglycylvalyllysylvalylrtylserylvalylasparaginylleucylthreonyanylserylaspartylglycylglycylseryllysylisoleucylvalylglutamyllysylcysteinylaarginyltryptophylleucylarginylvalylglyhreonylarginyltyrosylthreonylvalylisollycyllysylthreonylseryltyrosylglutaminalanylglutamylasparaginyllysylphenylalylglutamylprolylserylglutamylprolylthraspartyllysylthreonylarginylalanylmethamylglutamylvalylaspartylglutamylthreoylthreonyllysylalanylserylhistidylseryrosylglutamyllysyltyrosylmethionylisolycylarginylglycylglutamylphenylalanylgysteinylvalylglutamylthreonylserylseryalanyllysylphenylalanylvalyllysylvalylylvalylleucylvalyllysyllysylglutamylisnylisoleucylalanylarginylhistidylarginlleucylhistidylglutamylserylphenylalantamylleucylvalylmethionylisoleucylphenylserylglycylleucylaspartylisoleucylphsparaginylthreonylserylalanylphenylalalarginylglutamylisoleucylvalylseryltyrteinylglutamylalanylleucylglutaminylphylasparaginylisoleucylglycylhistidylphrolylglutamylasparaginylisoleucylisolelarginylserylserylthreonylisoleucyllyslanylglycylglutaminylalanylarginylglutylasparaginylphenylalanylarginylleucyllylglutamyltyrosyltyrosylalanylprolylgdylaspartylvalylvalylserylthreonylalanylserylleucylglycylthreonylleucylvalylisoleucylasparaginylprolylphenylalanylinylglutaminylglutaminylisoleucylisolehionylasparaginylalanylglutamyltyrosyllglutamylalanylphenylalanyllysylglutamanylmethionylaspartylphenylalanylvalylylglutamylarginyllysylserylarginylmethnylleucylglutaminylhistidylprolyltrypteucylglutamylarginylvalylserylthreonyleucyllysylhistidylarginylarginyltyrosyucyllysyllysylaspartylleucylasparaginyylarginylisoleucylserylcysteinylglycylutaminyllysylglycylvalylserylvalylalanoleucylglutamylisoleucylglycylprolylvathionylhistidylalanylvalylglycylglutamlysyltyrosylvalylcysteinyllysylisoleuclglutaminylserylthreonylglutaminylvalynylglycylvalylarginylglutaminylleucylgltyrosylglutamylisoleucylthreonyltyrosisoleucylleucyltyrosylvalyllysylasparttylaspartylglycylthreonyltyrosylarginylaspartyltyrosylglycylglutamylaspartylylphenylalanylvalyllysylglycylvalylargosyltyrosylcysteinylarginylarginylthreylarginylarginylthreonylaspartylthreonmylarginylprolylprolylglutamylphenylalylasparaginyllysylthreonylalanyltyrosylarginylphenylalanylglycylvalylthreonyylglutamylprolylhistidylvalylthreonylttaminyllysylisoleucyllysylprolylglycylyltyrosylthreonylphenylalanylglutamylslglutaminylleucylthreonylisoleucylaspapartylaspartylaspartylalanylglutamyltylasparaginyllysyltyrosylglycylglutamylsylleucylthreonylvalylthreonylleucylhiartylserylthreonylleucylarginylprolylmcylleucylalanylasparaginylalanylglutamglutaminylserylvalylcysteinylphenylalaylglycylisoleucylprolylprolylprolylthrysylaspartylglycylglutaminylprolylleuclisoleucylglutamylisoleucylisoleucylhiyrosyltyrosylalanylleucylhistidylisoleolylglutamylaspartylthreonylglycyltyrolthreonylasparaginylthreonylalanylglycinylalanylhistidylleucylglutaminylvalyllysyllysylglutaminylglutamylphenylalaistidylglutamylarginylhistidylvalylglurtyllysylthreonylleucylarginylmethionyglycylthreonylglutamylserylvalylprolyllysylglutamylalanylleucylarginylglutamylprolylalanylvalylserylthreonyllysyltylalanylarginylleucylglutamylisoleucyllutamylarginyllysylleucylarginylmethioglutamylprolylarginyllysyltyrosyllysylglutamylglutamylaspartylglutaminylargianylvalylprolylmethionylserylaspartylmlysylisoleucylarginylaspartylglutaminyyllysylleucylaspartylarginylvalylvalylginylisoleucylarginylleucylserylarginyalanyltyrosylvalylmethionylprolylleucyrtylglutaminyltyrosylarginylprolyllysysylleucylserylglutaminylaspartylaspartylprolylalanylarginylarginylarginylthrylaspartylphenylalanyltyrosyltyrosylarylleucylglycylaspartylisoleucylserylaseucylprolylisoleucylaspartylaspartyltynylthreonylglutamylglutamylglutamylargamylglutamylleucylglutamylleucylglycylrolylserylarginylserylprolylprolylhistserylleucylarginyltyrosylserylserylproylvalylglutamylglutamylthreonylarginyltyrosylserylthreonyltyrosylhistidylisoamylalanylserylthreonylseryltyrosylalainylhistidylalanylglutaminylalanylalanylglutaminylarginylglutaminylarginylisylglutamylaspartylglutamylglutamylleuchreonylthreonylglutaminylhistidylleucyamylleucylaspartylphenylalanylmethionyylarginyllysyllysylserylarginylarginylnylglutamylisoleucylthreonylglutamylissylglutamylisoleucylseryllysylhistidyllserylserylserylalanylserylarginylleuclserylleucylserylprolylthreonyltyrosylinylprolylvalylserylglutamylleucylisolminylprolylalanylglutamylglutamyltyrotrampamylarginylarginylserylprolylthreonnylprolylarginylserylprolylserylprolylleucylserylarginylphenylalanylglutamylylaspartylisoleucylphenylalanylserylarysylalanylalanylleucyllysylthreonylgluginyllysyltyrosylglutamylvalylleucylsealanylthreonylleucylaspartylhistidylaleucylarginylmethionylarginylserylhistilglutaminylasparaginylthreonylarginylpylvalylglutaminylseryllysylprolylthreoyltyrosylhistidylasparaginylglycylvalyrylseryllysylisoleucylhistidyltyrosyltylvalylleucylthreonylleucylglutamylisoylthreonylaspartylaspartylserylglycyltteinylthreonylasparaginyltyrosyllysylgosylalanylthreonylleucylaspartylvalylthreonylthreonyltyrosylalanylserylglutaglutamylvalylprolylarginylserylvalylphnylarginylthreonylglutamylalanyltyrosylysyllysylthreonylserylglutamylmethionlarginylglutamylvalyllysylserylglutamilarginylglutamylserylleucylserylseryltrylalanylglutamylmethionyllysylserylalylserylleucylglutamylglutamyllysylserycyllysylthreonylthreonylleucylalanylalysylprolylarginylserylmethionylthreonyserylalanylarginylphenylalanylserylcyslglutamylprolylvalylprolylthreonylvalyylglycylglutaminylvalylleucylserylthreminylvalylthreonylthreonylthreonyllysynylglutamylisoleucylserylserylvalylglulycylasparaginyltyrosylserylvalylvalylylglycyllysylglutaminylglutamylalanylgreonylisoleucylglutaminyllysylalanylarylvalylthreonylserylprolylprolylarginylarginylvalyllysylserylprolylglutamylanylvalyllysylserylprolylglutamylprolylserylprolylthreonylglutamylthreonyllysyllysylvalylglutaminylhistidylleucylprylisoleucylthreonylglutaminylphenylalaeryllysylglutamylisoleucylalanyllysylltamylserylserylvalylleucylarginylalanyyltyrosyllysylaspartylglycyllysyllysyllhistidylphenylalanylglutaminylphenylartylglycylthreonyltyrosylglutamylleucyylleucylthreonylglutamylserylaspartylgcysteinylglutamylisoleucylserylglycylgylthreonylasparaginylleucylglutaminylplalanylphenylalanyllysylserylisoleucyllisoleucylserylglutamylthreonyllysyllyonylthreonylglutamylserylthreonylvalyllprolyllysylalanylprolylglutamylprolylisoleucylvalylthreonylglycylleucylglutserylserylaspartylserylvalylalanyllysythreonylglycylglutamylprolylarginylprolthreonyllysylaspartylglycyllysylalanylycyllysyltyrosyllysylleucylserylglutalanylphenylalanylleucylglutamylisoleuconylserylaspartylserylglycylleucyltyrosylasparaginylserylalanylglycylserylvacylthreonylisoleucyllysylalanylisoleucylglutaminyllysylvalylserylthreonylgluoleucylthreonylprolylglutaminyllysyllyylglutamylisoleucylserylglutaminyllysyutamylisoleucyllysylmethionylserylglutmyllysylleucylalanylleucyllysylglutamylisoleucylserylglutamylglutamylvalyllyrylleucylglutamyllysylserylisoleucylvalthreonyllysylthreonylserylglutaminylanylthreonylhistidylalanylglutamylisoleeonylglutaminylmethionylserylisoleucylarginylleucylvalylleucyllysylalanylaspthreonylaspartylvalyllysyltryptophylvaamylleucylthreonylasparaginylserylglutycylvalylserylglycylserylaspartylglutallysylglutaminylalanylserylhistidylargleucylthreonylcysteinylisoleucylserylleucylvalyllysylcysteinylglutaminyltyrollysylglutamylleucylserylaspartylalanyerylglutaminylprolylarginylserylglutamglutamylglycylglutaminylasparaginylvalylglutamylisoleucylserylglycylglutamyllutamyltryptophylphenylalanyllysylaspaucylserylisoleucylserylserylasparaginyylarginylasparaginylvalyltyrosylseryllginylalanylserylvalylserylaspartylseryllysylalanyllysylasparaginylphenylalanerylalanylthreonylalanylserylleucylmetlutamylglutamylprolylserylarginylglutaerylglycylaspartylthreonylserylleucylgylserylglutaminylserylvalylglutaminylminylglutamylalanylserylphenylalanylsererylalanylserylserylmethionylthreonylganylserylmethionylserylalanylglutaminylutaminylglutamylserylphenylalanylvalyrylphenylalanylmethionylglycylisoleucylutaminylleucylglutamylserylserylthreoanylglycylisoleucylarginylglycylisoleuylalanylleucylprolylserylaspartylisolelycyllysylvalylleucylthreonylvalylalanylglycylglutamylprolylthreonylprolylglysteinylglycylglycylarginyllysylisoleulutaminylglycylarginylphenylalanylhisteonylaspartylaspartylleucylthreonylthrnylaspartylvalylglutaminyllysylglutamilthreonylleucylserylleucylglycylasparalaspartylserylalanylthreonylvalylasparinylserylisoleucine = {
    color: ["#ff00dc", "#010001"],
    colorPattern: textures.transparency,
    colorKey: {
        "g": "#ff00dc",
        "w": "#010001"
    },
    behavior: behaviors.LIQUID,
    category: "jaydstuff",
    state: "liquid"
},
elements.left_push = {
    color: ["#ffa500","#ff0000"],
    tick: function(pixel) {
        if (pixel.stage) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.stage);
            if (pixel.stage >= pixel.mag) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            coords.forEach(function(coord){
                var x = coord.x;
                var y = coord.y;
                if (!isEmpty(x,y,true)) {
                    var p = pixelMap[x][y];
                    if (elements[p.element].breakInto) {
                        if (Math.random() < (elements[p.element].hardness || 1) * 0.25) {
                            breakPixel(p);
                        }
                    }
                    tryMove(p,p.x-1,p.y);
                }
            })
            pixel.stage++;
        }
        else if (!tryMove(pixel,pixel.x-1,pixel.y)) {
            // random 10 to 20
            pixel.mag = Math.floor(Math.random() * 10) + 20;
            pixel.stage = 1;
        }
    },
    category: "weapons",
    state: "solid",
    density: 100000000,
    excludeRandom: true,
},
elements.right_push = {
    color: ["#ffa500","#ff0000"],
    tick: function(pixel) {
        if (pixel.stage) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.stage);
            if (pixel.stage >= pixel.mag) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            coords.forEach(function(coord){
                var x = coord.x;
                var y = coord.y;
                if (!isEmpty(x,y,true)) {
                    var p = pixelMap[x][y];
                    if (elements[p.element].breakInto) {
                        if (Math.random() < (elements[p.element].hardness || 1) * 0.25) {
                            breakPixel(p);
                        }
                    }
                    tryMove(p,p.x+1,p.y);
                }
            })
            pixel.stage++;
        }
        else if (!tryMove(pixel,pixel.x+1,pixel.y)) {
            // random 10 to 20
            pixel.mag = Math.floor(Math.random() * 10) + 20;
            pixel.stage = 1;
        }
    },
    category: "weapons",
    state: "solid",
    density: 100000000,
    excludeRandom: true,
},
elements.up_push = {
    color: ["#ffa500","#ff0000"],
    tick: function(pixel) {
        if (pixel.stage) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.stage);
            if (pixel.stage >= pixel.mag) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            coords.forEach(function(coord){
                var x = coord.x;
                var y = coord.y;
                if (!isEmpty(x,y,true)) {
                    var p = pixelMap[x][y];
                    if (elements[p.element].breakInto) {
                        if (Math.random() < (elements[p.element].hardness || 1) * 0.25) {
                            breakPixel(p);
                        }
                    }
                    tryMove(p,p.x,p.y-1);
                }
            })
            pixel.stage++;
        }
        else if (!tryMove(pixel,pixel.x,pixel.y-1)) {
            // random 10 to 20
            pixel.mag = Math.floor(Math.random() * 10) + 20;
            pixel.stage = 1;
        }
    },
    category: "weapons",
    state: "solid",
    density: 100000000,
    excludeRandom: true,
},
elements.down_push = {
    color: ["#ffa500","#ff0000"],
    tick: function(pixel) {
        if (pixel.stage) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.stage);
            if (pixel.stage >= pixel.mag) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            coords.forEach(function(coord){
                var x = coord.x;
                var y = coord.y;
                if (!isEmpty(x,y,true)) {
                    var p = pixelMap[x][y];
                    if (elements[p.element].breakInto) {
                        if (Math.random() < (elements[p.element].hardness || 1) * 0.25) {
                            breakPixel(p);
                        }
                    }
                    tryMove(p,p.x,p.y+1);
                }
            })
            pixel.stage++;
        }
        else if (!tryMove(pixel,pixel.x,pixel.y+1)) {
            // random 10 to 20
            pixel.mag = Math.floor(Math.random() * 10) + 20;
            pixel.stage = 1;
        }
    },
    category: "weapons",
    state: "solid",
    density: 100000000,
    excludeRandom: true,
},
elements.leftquake = {
    color: ["#bda791","#997756","#613d19"],
    tick: function(pixel) {
        if (pixel.stage) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.stage);
            if (pixel.stage >= pixel.mag) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            coords.forEach(function(coord){
                var x = coord.x;
                var y = coord.y;
                if (!isEmpty(x,y,true)) {
                    var p = pixelMap[x][y];
                    if (p.element === "leftquake") {
                        if (pixel !== p) {
                            pixel.mag += 3;
                            deletePixel(p.x,p.y);
                        }
                        return;
                    }
                    if (elements[p.element].breakInto) {
                        if (Math.random() < (elements[p.element].hardness || 1) * 0.25) {
                            breakPixel(p);
                        }
                    }
                    if (p.del || !elements[p.element].movable) { return }
                    tryMove(p,p.x+1,p.y);
                }
            })
            pixel.stage++;
        }
        else if (!tryMove(pixel,pixel.x-1,pixel.y)) {
            // random 10 to 20
            pixel.mag = Math.floor(Math.random() * 10) + 20;
            pixel.stage = 1;
        }
    },
    category: "weapons",
    state: "solid",
    density: 100000000,
    maxSize: 1,
    cooldown: defaultCooldown,
    excludeRandom: true,
},
elements.rightquake = {
    color: ["#bda791","#997756","#613d19"],
    tick: function(pixel) {
        if (pixel.stage) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.stage);
            if (pixel.stage >= pixel.mag) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            coords.forEach(function(coord){
                var x = coord.x;
                var y = coord.y;
                if (!isEmpty(x,y,true)) {
                    var p = pixelMap[x][y];
                    if (p.element === "rightquake") {
                        if (pixel !== p) {
                            pixel.mag += 3;
                            deletePixel(p.x,p.y);
                        }
                        return;
                    }
                    if (elements[p.element].breakInto) {
                        if (Math.random() < (elements[p.element].hardness || 1) * 0.25) {
                            breakPixel(p);
                        }
                    }
                    if (p.del || !elements[p.element].movable) { return }
                    tryMove(p,p.x-1,p.y);
                }
            })
            pixel.stage++;
        }
        else if (!tryMove(pixel,pixel.x+1,pixel.y)) {
            // random 10 to 20
            pixel.mag = Math.floor(Math.random() * 10) + 20;
            pixel.stage = 1;
        }
    },
    category: "weapons",
    state: "solid",
    density: 100000000,
    maxSize: 1,
    cooldown: defaultCooldown,
    excludeRandom: true,
},
elements.upquake = {
    color: ["#bda791","#997756","#613d19"],
    tick: function(pixel) {
        if (pixel.stage) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.stage);
            if (pixel.stage >= pixel.mag) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            coords.forEach(function(coord){
                var x = coord.x;
                var y = coord.y;
                if (!isEmpty(x,y,true)) {
                    var p = pixelMap[x][y];
                    if (p.element === "upquake") {
                        if (pixel !== p) {
                            pixel.mag += 3;
                            deletePixel(p.x,p.y);
                        }
                        return;
                    }
                    if (elements[p.element].breakInto) {
                        if (Math.random() < (elements[p.element].hardness || 1) * 0.25) {
                            breakPixel(p);
                        }
                    }
                    if (p.del || !elements[p.element].movable) { return }
                    tryMove(p,p.x,p.y+1);
                }
            })
            pixel.stage++;
        }
        else if (!tryMove(pixel,pixel.x,pixel.y-1)) {
            // random 10 to 20
            pixel.mag = Math.floor(Math.random() * 10) + 20;
            pixel.stage = 1;
        }
    },
    category: "weapons",
    state: "solid",
    density: 100000000,
    maxSize: 1,
    cooldown: defaultCooldown,
    excludeRandom: true,
},
elements.legacy_earthquake = {
    color: ["#bda791","#997756","#613d19"],
    tick: function(pixel) {
        if (pixel.stage) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.stage);
            if (pixel.stage >= pixel.mag) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            coords.forEach(function(coord){
                var x = coord.x;
                var y = coord.y;
                if (!isEmpty(x,y,true)) {
                    var p = pixelMap[x][y];
                    if (p.element === "legacy_earthquake") {
                        if (pixel !== p) {
                            pixel.mag += 3;
                            deletePixel(p.x,p.y);
                        }
                        return;
                    }
                    if (elements[p.element].breakInto) {
                        if (Math.random() < (elements[p.element].hardness || 1) * 0.25) {
                            breakPixel(p);
                        }
                    }
                    if (p.del || !elements[p.element].movable) { return }
                    tryMove(p,p.x,p.y-1);
                }
            })
            pixel.stage++;
        }
        else if (!tryMove(pixel,pixel.x,pixel.y+1)) {
            // random 10 to 20
            pixel.mag = Math.floor(Math.random() * 10) + 20;
            pixel.stage = 1;
        }
    },
    category: "weapons",
    state: "solid",
    density: 100000000,
    maxSize: 1,
    cooldown: defaultCooldown,
    excludeRandom: true,
},
// textures.rue = [
//     [8,8,0,0,0,0,0,0,0,0,0,0,0,0,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [8,9,8,0,0,0,0,0,0,0,0,0,14,7,8,7,14,14,14,14,0,0,0,0,0,0,0,0,0,0,0,0],
//     [9,10,9,8,0,9,10,9,9,9,8,14,7,8,9,8,14,14,14,14,14,14,14,0,0,0,0,0,0,0,0,0],
//     [8,9,10,9,8,10,10,9,9,9,9,7,8,9,8,7,14,14,14,14,14,14,14,14,14,0,0,0,0,0,0,0],
//     [8,8,9,10,8,9,9,9,9,9,9,7,9,8,7,7,13,13,13,13,13,13,13,14,14,13,0,0,0,0,0,0],
//     [8,8,9,10,8,8,9,9,9,9,7,7,9,8,7,7,13,13,13,13,13,13,13,13,13,14,13,0,0,0,0,0],
//     [8,9,10,9,8,8,8,8,8,8,7,7,8,9,8,7,13,13,13,13,13,13,13,13,13,13,14,12,0,0,0,0],
//     [9,10,9,8,14,8,8,8,8,7,7,13,7,8,9,8,13,13,13,13,13,13,13,13,13,13,13,12,11,0,0,0],
//     [8,9,8,14,14,14,14,13,13,13,13,13,1,7,8,7,13,13,13,13,13,13,1,1,13,13,13,13,12,17,0,0],
//     [8,8,14,14,14,14,13,13,13,13,13,1,1,1,7,7,13,13,13,13,13,13,1,1,1,13,13,13,12,17,0,0],
//     [0,14,14,14,14,13,13,13,13,13,1,1,1,13,13,13,13,13,13,13,13,13,13,1,1,1,13,13,13,12,17,0],
//     [0,14,14,14,14,13,13,13,1,1,1,1,13,13,13,13,13,13,13,13,13,13,13,13,1,1,1,1,13,12,17,0],
//     [0,14,14,14,13,13,13,13,1,1,1,13,13,13,13,13,13,13,13,13,13,13,13,13,13,1,1,1,13,12,17,0],
//     [14,14,14,14,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,12,17],
//     [14,14,14,14,13,13,13,13,13,1,1,1,1,1,13,13,13,13,13,13,13,13,1,1,1,1,1,13,13,13,12,17],
//     [14,14,14,14,13,13,13,13,1,1,1,1,16,16,2,13,13,13,13,13,13,1,1,1,1,16,16,2,13,13,12,17],
//     [14,14,14,13,13,13,1,16,14,14,14,1,1,1,16,16,1,13,13,1,16,14,14,14,1,1,1,16,16,1,12,17],
//     [14,14,14,13,13,13,1,14,14,14,13,1,1,1,16,16,1,13,13,1,14,14,14,13,1,1,1,16,16,1,12,17],
//     [14,14,14,14,13,13,1,1,14,13,1,1,1,1,16,16,1,13,13,1,1,14,13,1,1,1,1,16,16,1,12,17],
//     [14,14,14,14,13,13,1,1,1,1,1,16,14,1,16,16,1,13,13,1,1,1,1,1,16,14,1,16,16,1,12,17],
//     [0,14,14,14,13,13,1,1,1,1,1,14,12,2,16,16,1,13,13,1,1,1,1,1,14,12,2,16,16,1,17,0],
//     [0,14,14,14,13,13,1,1,1,1,1,1,1,16,16,16,1,13,13,1,1,1,1,1,1,1,16,16,16,1,17,0],
//     [0,14,14,14,14,13,13,1,1,1,1,2,16,16,16,16,1,13,13,1,1,1,1,1,2,16,16,16,16,1,17,0],
//     [0,0,14,14,14,14,13,1,16,16,16,16,16,16,16,1,13,13,13,13,1,16,16,16,16,16,16,16,1,17,0,0],
//     [0,0,14,14,14,14,13,13,1,16,16,16,16,16,1,13,13,13,13,13,13,1,16,16,16,16,16,1,12,17,0,0],
//     [0,0,0,13,14,14,14,14,13,1,1,1,1,1,13,13,13,13,13,13,13,13,1,1,1,1,1,12,17,0,0,0],
//     [0,0,0,0,13,14,14,14,14,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,12,17,0,0,0,0],
//     [0,0,0,0,0,12,12,13,13,14,14,14,13,13,13,13,13,13,1,13,13,13,13,13,13,12,17,0,0,0,0,0],
//     [0,0,0,0,0,0,12,12,12,13,13,13,14,14,14,13,13,1,13,1,13,13,13,12,12,17,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,11,11,12,12,12,13,13,13,13,13,13,13,13,12,12,12,17,17,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,17,17,17,12,12,12,12,12,12,12,12,17,17,17,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,17,17,17,17,17,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0],
    
// ]
// elements.rue = {
//     color: ["#000000","#111111","#333333","#555555","#777777","#999999","#bbbbbb","#dddddd","#ffffff"],
//     colorPattern: textures.rue,
//     colorKey: {
//         "0": "#000000",
//         "1": "#000000",
//         "2": "#111111",
//         "3": "#333333",
//         "4": "#444444",
//         "5": "#555555",
//         "6": "#666666",
//         "7": "#19bb20",
//         "8": "#19bebe",
//         "9": "#32d458",
//         "10": "#32d5c6",
//         "11": "#ddc231",
//         "12": "#ebcc28",
//         "13": "#ffe458",
//         "14": "#ffed91",
//         "15": "#f0f0f0",
//         "16": "#ffffff",
//         "17": "#cdb322",
//     },
// },

createAtXvar = 0;
createAtYvar = 0;
create1var = "";
elements.element_spawner = {
    color: "#71797E",
    onSelect: async function() {
        var answer1 = await _jaydstuffjsprompt("Please input the x value.",(createAtXvar||undefined));
        if (!answer1) {return}
        createAtXvar = parseInt(answer1);
        var answer2 = await _jaydstuffjsprompt("Please input the y value.",(createAtYvar||undefined));
        if (!answer2) {return}
        createAtYvar = parseInt(answer2);
        var answer3 = await _jaydstuffjsprompt("Please input what element should spawn.",(create1var||undefined));
        if (!answer3) {return}
        create1var = answer3;
    },
    tick: function(pixel) {
        if (pixel.charge){
            createPixel(create1var, createAtXvar, createAtYvar);
        }
        doDefaults(pixel);
    },
    density: 1,
    conduct: 1,
    state: "solid",
    category: "machines"
};
