elements.carbon_monoxide = {
      color: "#b5b5b5",
      behavior: behaviors.GAS,
      behaviorOn: [
        "XX|XX|XX",
        "XX|CH:fire|XX",
        "XX|XX|XX",
    ],
      category: "gases",
      state: "gas",
      density: 1.14,
      burn: 75,
      tempHigh: 609,
      stateHigh: "fire",
      tempLow: -192,
      stateLow: "liquid_carbon_monoxide",
      burntime: 5,
      darkText: true,
      fireColor: "#ebba34",
      reactions: {
                    "head": { elem1:"rotten_meat", chance:0.5 },
                    "body": { elem1:"rotten_meat", chance:0.5 },
                    "human": { elem1:"rotten_meat", chance:0.5 },
                 }
};
elements.liquid_carbon_monoxide = {
         color: "#b5b5b5",
         behavior: behaviors.LIQUID,
         category: "liquids",
         state: "liquid",
         density: 1.14,
         darkText: true,
         tempHigh: -190,
         temp: -192,
         tempLow: -199,
         hidden: true,
         stateLow: "ice_carbon_monoxide",
         stateHigh: "carbon_monoxide", 
};
elements.ice_carbon_monoxide = {
         color: "#b5b5b5",
         behavior: behaviors.WALL,
         category: "solids",
         state: "solid",
         temp: -199,
         density: 1.14,
         tempHigh: -192,
         darkText: true,
         stateHigh: "liquid_carbon_monoxide", 
};
elements.carbon_monoxide_detector = {
      behavior: behaviors.WALL,
      desc: "give red light and electric when found Carbon Monoxide touch",
      color: "#ffffff",
      reactions: {
      "carbon_monoxide": {"charge1":1},   
      },
      conduct: 1,
      tempHigh: 1550,
      stateHigh: ["molten_metal_scrap","electric","molten_plastic"],
      colorOn: "#ff0000",
      movable: false,
      insulate: true,
      noMix: true,
      category:"machines",
      darkText: true,
      hardness: 1,
};
elements.cpu = {
         color: "#575757",
         behavior: behaviors.SOLID,
         category: "machines",
         state: "solid",
         insulate: true,
         movable: false,
         noMix: true,
         density: 75,
         tempHigh: 1414,
         stateHigh: ["explosion","metal_scrap"],
reactions: {
                    "virus": { elem1 : null , elem2:"malware", chance:0.9 },
                    "metal_scrap": { elem2:"computer" },
                    
                 }
};
elements.computer = {
         color: "#2b2b2a",
         behavior: behaviors.SOLID,
         category: "machines",
         state: "solid",
         density: 8908,
         insulate: true,
         noMix: true,
         movable: false,
         tempHigh: 1414,
         stateHigh: ["explosion","metal_scrap"],
reactions: {
                    "virus": { elem1 : null , elem2:"malware", chance:0.9 },
                    "water": { elem1: null , elem2: "electric" },                    
                 }
}
elements.electrons = {
    color: "#b80606",
    behavior: [
        "XX|SH|XX", // shocks (adds charge)
        "SH|DL%0.25|SH",
        "XX|SH|XX",
    ],
    tick: behaviors.BOUNCY,
    reactions: {},
    temp: 20,
    category: "energy",
    state: "gas",
    density: 0.000003,
    ignoreAir: true,
};
elements.gelatin = {
         behavior: behaviors.SOLID,
         category: "food",
         state: "solid",
         color: "#faf8ca",
         breakInto: "gelatin_powder",
         ignoreAir: true,
         isFood: true,
};
elements.gelatin_powder = {
         behavior: behaviors.POWDER,
         category: "food",
         state: "powder",
         color: "#edeb9f",
         hidden: true,
         ignoreAir: true,
         isFood: true,
};
elements.blueberries = {
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    color: ["#464196","#2e2b64"],
    breakInto: "blueberries_juice",
    ignoreAir: true,
    isFood: true,
    reactions: {
    "sugar": { elem1: "blueberries_jam" },
    },
};
elements.blueberries_juice = {
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    color: "#1f1c42",
    hidden: true,
    tempHigh: 170,
    stateHigh: ["steam","sugar"],
    reactions: {
    ignoreAir: true,
    isFood: true,
    "gelatin": { elem1: "blueberries_jelly", elem2: null },
    "gelatin_powder": { elem1: "blueberries_jelly", elem2: null },
    },
};
elements.blueberries_jam = {
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 5000,
    state: "liquid",
    tempHigh: 200,
    stateHigh: ["smoke","sugar"],
    color: "#080629",
    hidden: true,
    ignoreAir: true,
    isFood: true,
};
elements.blueberries_jelly = {
    behavior: behaviors.LIQUID,
    category: "food",
    viscosity: 200000,
    state: "liquid",
    color: "#59559e",
    hidden: true,
    tempHigh: 200,
    stateHigh: ["smoke","sugar"],
    tempLow: -5,
    stateLow: ["sugar_ice","sugar_ice","juice_ice"],
    ignoreAir: true,
    isFood: true,
};
elements.fallout_drum = {
 behavior: behaviors.WALL,
 category: "radiated",
 state: "solid",
 density: 9000,
 color: "#e3cc34",
 tempHigh: 2500,
 stateHigh: ["aluminum","radiated_water","radiated_water","fallout"],
 breakInto: ["fallout","fallout"],
 reactions: { 
 "water": { elem1:"fallout_drum", elem2:"radiated_water" },
  }
};

elements.radiated_water = {
   behavior: behaviors.LIQUID,
   category: "radiated",
   state:"liquid",
   density :1300,
   color: ["#23d959","#29d65d"],
   hidden: true,
   tempHigh: 140,
   stateHigh: "polluted_air",
   tempLow: -6,
   stateLow: "rad_ice",
   reactions: {
   "human": { elem2:"rotten_meat" },
   "body": { elem2:"rotten_meat" },
   "head": { elem2:"ash" },
   "bird": { elem2:"rotten_meat"},
   "cell": { elem2:"cancer"},  
  }
};

elements.polluted_air = {
    behavior: behaviors.GAS,
    category: "radiated",
    state:"gas",
    density :10,
    color: ["#60f53b","#65ba50"],
    reactions: {
        "body": { elem2:"rotten_meat" },
        "head": { elem2:"rotten_meat" },
        "human": { elem2:"rotten_meat" },
        "bird": { elem2:"rotten_meat" },
        "cell": { elem2:"cancer" },
        "water": { elem1: null, elem2: "radiated_water" },
        "worm": { elem2: ["ash","cancer"] },
        "flea": { elem2: "ash" },
        "seed": {elem2: "dead_plant" },
        "plant": {elem1: null, chance:0.5, elem2: "dead_plant", chance:0.5 },
    },
};

elements.siren = {
    desc: "Detecting Nuclear Radiation Residues",
    behavior: behaviors.WALL,
    category: "machines",
    state:"solid",
    density :500,
    color: "#808080",
    reactions: {
        "fallout": {"charge1":1},
        "radiated_water": {"charge1":1},
        "polluted_air": {"charge1":1},
    }
};

elements.radiated_metal = {
   behavior: behaviors.WALL,
   category: "radiated",
   state:"solid",
   density :2045,
   color: ["#5e705a","#83ab7b","#474747"],
   tempHigh: 1440,
   stateHigh: ["molten_nickel","molten_iron","molten_tin","fallout"],
   reactions: {
       "water": { elem2:"radiated_water", chance:0.7 }, 
       "foam": { elem1:["tin","nickel","iron"] },
    }
};

elements.rad_ice = {
    behavior: behaviors.WALL,
    category: "radiated",
    state:"solid",
    density: 1905,
    color: ["#81d79c","#68b899","#68abb8"],
    hidden: true,
    temp: -6,
    tempHigh: 5,
    stateHigh: ["radiated_water","water"],
    reactions: {
        "snow": { elem2:"dirty_water" },
        "water": { elem2:"radiated_water" },
 }
}

elements.rad_snow = {
    behavior: behaviors.POWDER,
    category: "radiated",
    state:"powder",
    density: 1500,
    color: ["#9effe4","#b5fffd","#d4fff1"],
    temp: -2,
    tempHigh: 21,
    stateHigh: "radiated_water",
};

elements.rad_rock = {
    behavior: behaviors.POWDER,
    category: "land",
    state: "powder",
    density: 2790,
    color: ["#34382d","#3f4633","#595a4d"],
    tempHigh: 1200,
    stateHigh: ["magma","fallout"],
    reactions: {
        "water": { elem2:"dirty_water" },
        "salt_water": { elem2:"dirty_water" },
        "sugar_water": { elem2:"dirty_water" },
        "seltzer": { elem2:"dirty_water" },
        "bleach": {elem2: "rock", chance:0.1 },
        "rad_cleaner": { elem1:"rock" },
        "foam": { elem1:"rock" },
        "juice": { elem2: null },
        "blood": { elem2:"infection" },
        "grass": { elem2:"dead_plant" },
        "plant": { elem2:"dead_plant" },
        "cell": { elem2:"cancer" },
        "worm": { elem2:"ash" },
        "glass": { elem2:"rad_glass"},
        "glass_shard": { elem2:"rad_shard" },
    }
};

elements.rad_cleaner = {
    behavior: behaviors.WALL,
    category: "machines",
    state: "solid",
    density: 2500,
    color: ["#383838","#212220"],
    desc: "clean radiated elements",
    tempHigh: 1250,
    stateHigh: ["fallout","molten_plastic","steam"],
    reactions: {
        "radiated_water": {elem2:"water" },
        "polluted_air": {elem2: "oxygen"},
        "rad_snow": {elem2: "snow"},
        "rad_rock": {elem2: "rock"},
    }
 };


elements.rad_meat = {
  behavior: behaviors.STURDYPOWDER,
  category: "food",
  state: "solid",
  density: 1500,
  color: ["#e8fc03","#f0b446","#92f046"],
  tempHigh: 120,
  stateHigh: ["rotten_meat","fallout"],
  tempLow:-12,
  stateLow: ["frozen_meat","radiation"],
  reactions: {
      "water": {elem2: "radiated_water", chance:0.4},
      "salt_water": { elem2: "radiated_water" },
  }
};

elements.lemon = {
  behavior: behaviors.POWDER,
  category: "food",
  state: "powder",
  density: 800,
  color: ["#f9f934", "#f1ee20",],
  tempHigh: 90,
  stateHigh: "hot_lemon",
  tempLow: -2,
  stateLow: "wrinkled_lemon",
  burn: 120,
  burntime: 600,
  burnInto: "ash",
  breakInto: [ "lemon_water", "lemon_zest", ],
  reactions: {
      "water": { elem2: "lemon_water", chance:0.2},
      "salt_water": { elem2: [ "lemon_water", "water",] },
      "dirty_water": { elem1: "rotten_lemon", },
      "soda": { elem2: "lemon_soda", },
      "head": { elem1: "saliva", chance:0.75}, 
      "milk": { elem2: "lemon_milk", },
      "tea": { elem2: "lemon_tea", },
      "poison": { elem2: "rotten_lemon", },
  }                                                      
};

elements.hot_lemon = {
  behavior: behaviors.POWDER,
  state: "powder",
  category: "food",
  hidden: true,
  density: 820,
  color: ["#8a6d1e","#70661a",],
  hidden: true,
  temp: 90,
  tempHigh: 200,
  stateHigh: "fire",
  tempLow: 30,
  stateLow: "wrinkled_lemon",
  burn: 120,
  burntime: 600,
  burnInto: "ash",
  reactions: {
      "water": { elem2: "lemon_water", },
  }
};

elements.leather = {
    behavior: behaviors.SUPPORTPOWDER,
    color: ["#3f261d","#664f40",],
    state: "powder",
    category: "powders",
    tempHigh: 200,
    stateHigh: "fire",
    breakInto: "dust", 
    burn: 20,
    burntime: 200,
    burnInto: "ash", 
};

elements.wrinkled_lemon = {
  behavior: behaviors.POWDER,
  color: ["#999543","#a6a03a",],
  state: "powder",
  category: "food",
  tempHigh: 90,
  stateHigh: "hot_lemon",
  hidden: true,
  burn: 120,
  burntime: 600,
  burnInto: "ash",
  reactions: {
    "water": { elem2: "lemon_water", chance: 0.2,
  }
 }
};

elements.coolant = {
  color: "#0eebeb",
  behavior: [
        "XX|CO:4|XX",
        "CO:4|HT:1|CO:4",
        "XX|CO:4|XX",
    ],
  category: "liquids",
  state: "liquid",
  insulate: true,
  density: 1000,
  darkText: false,
  tempHigh: 500,
  hidden: true,
  stateHigh: "steam", 
};

elements.arkycite = {
  color: "#46ab63",
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  density: 997,
  darkText: false,
  tempHigh: 400,
  hidden: true,
  burn: 40,
  stateHigh: "fire", 
  burntime: 500,
};

elements.lemon_water = {
  color: ["#faec52","#faee69",],
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  density: 900,
  tempHigh: 100,
  stateHigh: ["steam","fragrance",],
  hidden: true,
  tempLow: -10,
  stateLow: "lemon_ice",
  reactions: {
    "balloon": { elem2: "helium", chance: 0.5, },
    "head": { elem1: "saliva", chance: 0.2, },
  }
};

elements.lemon_zest = {
  color: ["#ded254","#ccc03d",],
  behavior: behaviors.POWDER,
  category: "trashes",
  state: "powder",
  density: 1000,
  hidden: true,
  tempHigh: 350,
  stateHigh: "fire",
  breakInto: "lemon_water",
  burn: 60,
  burntime: 200,
  burnInto: "smoke"
};

elements.saliva = {
  color: ["#a6f5f0","#b6f0ec",],
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  density: 1280,
  tempHigh: 105,
  stateHigh: ["steam","fragrance"],
  tempLow: -5,
  stateHigh: "saliva_ice",
  reactions: {
    "water": { elem1: null, chance: 0.5, elem2: "dirty_water", chance: 0.5,
    }
 }
};

elements.lemon_milk = {
  color: ["#f5f2c4","#f7f4b2",],
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  density: 1002,
  tempHigh: 500,
  stateHigh: "smoke",
  tempLow: -2,
  stateLow: "frozen_yogurt",
  stateLowColor: ["#f5f3cb","#f7f5bc"],
  reactions: {
    "bacteria": { elem1: "yogurt", },
  }
};

elements.lemon_soda = {
  color: ["#f5c842","#edcc68",],
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  density: 1240,
  tempHigh: 140,
  stateHigh: ["carbon_dioxide", "smoke",],
  reactions: {
    "poison": { elem1: null, }
  }
};

elements.saliva_ice = {
  color: ["#97fcfb","#bcf7f6",],
  behavior: behaviors.SOLID,
  category: "states",
  state: "solid",
  density: 1300,
  tempHigh: 5,
  stateHigh: "saliva",
};

elements.lemon_tea = {
  color: ["#dec85b","#edd351",],
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  density: 1580,
  tempHigh: 280,
  stateHigh: ["fragrance","smoke","smoke",],
  tempLow: -2,
  stateLowColor: ["#e8cf8b","#f0dca5",],
  stateLow: "tea_ice",
  reactions: {
    "sugar": { elem2: null, },
  }
};

elements.rotten_lemon = {
  color: ["#e3f283","#cdcf6b"],
  behavior: behaviors.POWDER,
  category: "food",
  state: "powder",
  density: 1890,
  tempHigh: 200,
  stateHigh: ["stench","ash",],
  reactions: {
    "water": { elem2: "dirty_water" },
  }
}
