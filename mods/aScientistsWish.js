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
         tempHigh: -190,
         temp: -192,
         tempLow: -199,
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
        "cell": { elem2:"cancer"},
    }
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
}
