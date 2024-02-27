/*

Also checkout sbstuff.js by sb! Without it, this mod wouldn't be possible!

Discords of people that helped me:
usecit - UseCit.psd
nousernamefound - nousernamefound
pixelegend4 - pixelegend4

Credits:
Saschas - Waterpowder idea
Fantasy Elements - Phoenix idea

*/

elements.sweetwater = {
  color: "#8ae7eb",
  behavior: behaviors.LIQUID,
  category: "kopal",
  state: "liquid",
  tempHigh: 100,
  stateHigh: "water",
  reactions: {
    "sugar": { elem1: null, elem2: "syrup" }
  },
};

elements.syrup = {
  color: "#d9d2c3",
  behavior: behaviors.LIQUID,
  category: "kopal",
  state: "liquid",
  tempHigh: 100,
  stateHigh: "fire",
  reactions: {
    "cell": {elem1: null, elem2: "incubationjuice"}
  }
};

elements.orangesoda = {
  color: "#b8820d",
  behavior: behaviors.LIQUID,
  category: "kopal",
  state: "liquid",
  tempHigh: 100,
  stateHigh: "water",
  reactions: {
    "deadflyingcreature": { elem1: "dirty_orangesoda" },
    "deadcreature": { elem1: "dirty_orangesoda" },
    "dirty_water": { elem1: "dirty_orangesoda" },
    "infection": { elem1: "dirty_orangesoda" },
    "dirty_orangesoda": { elem1: "dirty_orangesoda" },
  }
};

elements.dirty_orangesoda = {
  color: "#20991a",
  behavior: behaviors.LIQUID,
  category: "kopal",
  state: "liquid",
  tempHigh: 80,
  stateHigh: "orangesoda",
};

elements.orange = {
  color: "#eda813",
  behavior: behaviors.POWDER,
  category: "kopal",
  state: "powder",
  breakInto: "juice",
  tempHigh: 100,
  stateHigh: "charcoal",
  reactions: {
    "syrup": { elem1: null, elem2: "orangesoda" }
  },
};


elements.incubationjuice = {
  color: "#daf5ef",
  behavior: behaviors.LIQUID,
  category: "kopal",
  state: "liquid",
  breakInto: "blood",
  reactions: {
    "flydna": { elem1: "blood", elem2: "flyingcreature"},
    "antdna": { elem1: "blood", elem2: "creature"},
    "phoenixdna": { elem1: "blood", elem2: "artificialphoenix"},
    "alcohol": { elem1: "cancer", elem2: "antiartificialjuice"}
  },
};

elements.creature = {
  color: "#d073d9",
  behavior: behaviors.CRAWLER,
  category: "kopal",
  state: "crawler",
  tempHigh: 175,
  stateHigh: "deadcreature",
  breakInto: "deadcreature",
  reactions: {
    "ant": { elem2: "meat" },
    "meat": { elem2: "creature" },
    "artificialmeat": { elem2: "cell" },
    "syrup": { elem2: "creature" },
    "cell": { elem2: "creature" },
  },
};

elements.flyingcreature = {
  color: "#d073d9",
  behavior: behaviors.FLY,
  category: "kopal",
  state: "fly",
  tempHigh: 175,
  stateHigh: "deadflyingcreature",
  breakInto: "deadflyingcreature",
  reactions: {
    "fly": { elem2: "meat" },
    "meat": { elem2: "flyingcreature" },
    "artificialmeat": { elem2: "cell" },
    "syrup": { elem2: "flyingcreature" },
    "cell": { elem2: "flyingcreature" },
  },
};

elements.artificialphoenix = {
  color: "#c40052",
  behavior: behaviors.FLY,
  category: "kopal",
  state: "fly",
  temp: 149,
  breakInto: "deadflyingcreature",
  reactions: {
    "fly": { elem2: "artificialphoenix" },
    "flyingcreature": { elem2: "artificialphoenix" },
    "meat": { elem2: "artificialphoenix" },
    "artificialmeat": { elem2: "artificialphoenix" },
    "syrup": { elem2: "artificialphoenix" },
  },
};

elements.phoenix = {
  color: "#ff0000",
  behavior: behaviors.FLY,
  category: "kopal",
  state: "fly",
  temp: 999,
  breakInto: "phoenixdna",
  reactions: {
    "fly": { elem2: "meat" },
    "meat": { elem2: "phoenix" },
    "alcohol": { elem1: "blood" , elem2: "phoenixdna" },
  },
};

elements.deadcreature = {
  color: "#86428c",
  behavior: behaviors.POWDER,
  category: "kopal",
  state: "powder",
  tempHigh: 225,
  stateHigh: "smoke",
  breakInto: "artificialmeat",
  reactions: {
    "antiartificialjuice": { elem1: "artificialmeat", elem2: "dna" },
    "ant": { elem1: "artificialmeat" },
  },
};

elements.deadflyingcreature = {
  color: "#86428c",
  behavior: behaviors.POWDER,
  category: "kopal",
  state: "powder",
  tempHigh: 225,
  stateHigh: "smoke",
  breakInto: "artificialmeat",
  reactions: {
    "antiartificialjuice": { elem1: "artificialmeat", elem2: "dna" },
    "fly": { elem1: "artificialmeat" },
  },
};

elements.artificialmeat = {
  color: "#b38a5f",
  behavior: behaviors.POWDER,
  category: "kopal",
  state: "powder",
  tempHigh: 215,
  stateHigh: "smoke",
  reactions: {
    "antiartificialjuice": { elem1: null, elem2: null },
    "ant": { elem1: null },
    "rat": { elem1: null },
  },
};

elements.antiartificialjuice = {
  color: "#b38a5f",
  behavior: behaviors.LIQUID,
  category: "kopal",
  state: "liquid",
  tempHigh: 215,
  stateHigh: "smoke",
  reactions: {
    "flyingcreature": { elem1: "alcohol", elem2: "deadflyingcreature" },
    "creature": { elem1: "alcohol", elem2: "deadcreature" },
    "artificialphoenix": { elem1: "alcohol", elem2: "deadflyingcreature" },
  },
};

elements.antiartificialspray = {
  color: "#b38a5f",
  behavior: behaviors.DGAS,
  category: "kopal",
  state: "gas",
  tempHigh: 215,
  density: 4000,
  stateHigh: "smoke",
  reactions: {
    "flyingcreature": { elem1: "alcohol", elem2: "deadflyingcreature" },
    "creature": { elem1: "alcohol", elem2: "deadcreature" },
    "artificialphoenix": { elem1: "alcohol", elem2: "deadflyingcreature" },
  },
};

elements.antdna = {
  color: "#b38a5f",
  behavior: behaviors.POWDER,
  category: "kopal",
  state: "powder",
  tempHigh: 215,
  stateHigh: "smoke",
};

elements.phoenixdna = {
  color: "#a82a2a",
  behavior: behaviors.POWDER,
  category: "kopal",
  state: "powder",
};

elements.flydna = {
  color: "#b38a5f",
  behavior: behaviors.POWDER,
  category: "kopal",
  state: "powder",
  tempHigh: 215,
  stateHigh: "smoke",
};

elements.waterpowder = {
  color: elements.water.color,
  behavior: behaviors.POWDER,
  category: "kopal",
  state: "powder",
  tempHigh: 40,
  stateHigh: "water",
};

elements.waterpowderer = {
  color: "#e3e1dc",
  behavior: behaviors.POWDER,
  category: "kopal",
  state: "powder",
  reactions: {
    "water": { elem1: null, elem2: "waterpowder" }
  }
};

elements.antiartificialcancer = {
    color: "#b38a5f",
    behavior: [
        "XX|CL%1|XX",
        "CL%1|XX|CL%1",
        "M2%2|M1|M2%2",
    ],
    reactions: {
        "artificialmeat": { elem2:"antiartificialcancer", chance:0.05 },
        "creature": { elem2:"antiartificialcancer", chance:0.05 },
        "flyingcreature": { elem2:"antiartificialcancer", chance:0.05 },
        "artificialphoenix": { elem2:"antiartificialcancer", chance:0.05 },
        "cancer": { elem2:"antiartificialcancer", chance:0.5 },
    },
    tempHigh: 185,
    stateHigh: "smoke",
    tempLow: -10,
    stateLow: "syrup",
    state: "solid",
    density: 1000.2,
    category: "kopal",
};

elements.anticancer = {
  color: "#e3e1dc",
  behavior: behaviors.LIQUID,
  category: "kopal",
  state: "liquid",
  tempLow: -10,
  stateLow: "syrup",
  reactions: {
    "cancer": { elem1: null, elem2: "anticancer" },
    "antiartificialcancer": { elem1: null, elem2: "anticancer" }
  }
};

elements.fire_spirit =  {
  color: ["#fc5a03", "#fc2803", "#fc9d03"],
  behavior: behaviors.FLY,
  category: "spirits",
  state: "solid",
  temp: 50,

  reactions: {
    "air_spirit": { elem2: null},
    "cursed_spirit": { elem1: null},
    "earth_spirit": { elem1: null},
    "water_spirit": { elem2: null},
  }

};

elements.water_spirit =  {
  color: ["#0390fc", "#035afc", "#0318fc"],
  behavior: behaviors.FLY,
  category: "spirits",
  state: "solid",

  reactions: {
    "fire_spirit": { elem1: null},
    "cursed_spirit": { elem1: null},
    "earth_spirit": { elem2: null},
  }

};

elements.earth_spirit =  {
  color: ["#915a00", "#784b02", "#573602"],
  behavior: behaviors.FLY,
  category: "spirits",
  state: "solid",

  reactions: {
    "fire_spirit": { elem2: null},
    "cursed_spirit": { elem1: null},
    "water_spirit": { elem1: null},
  }

};

elements.air_spirit =  {
  color: ["#c7eded", "#99bdbd", "#6a9494"],
  behavior: behaviors.FLY,
  category: "spirits",
  state: "solid",

  reactions: {
    "fire_spirit": { elem1: null},
    "cursed_spirit": { elem2: null},
    "water_spirit": { elem1: null},
    "earth_spirit": { elem1: null},
  }

};

elements.cursed_spirit =  {
  color: ["#c404ae", "#aa04c4", "#7e04c4"],
  behavior: behaviors.FLY,
  category: "spirits",
  state: "solid",

  reactions: {
    "fire_spirit": { elem2: null},
    "air_spirit": { elem1: null},
    "water_spirit": { elem2: null},
    "earth_spirit": { elem2: null},
  }

};

elements.cursed_powder_lvl1 =  {
  color: ["#c404ae", "#aa04c4", "#7e04c4"],
  behavior: behaviors.POWDER,
  category: "spirits",
  state: "solid",

  reactions: {
    "cursed_spirit": { elem1: null},
  }

};

elements.cursed_powder_lvl2 =  {
  color: ["#c404ae", "#aa04c4", "#7e04c4"],
  behavior: behaviors.POWDER,
  category: "spirits",
  state: "solid",

  reactions: {
    "cursed_spirit": { elem2: null},
  }

};

elements.soul_spirit =  {
  color: ["#0af7e0", "#0ac8f7", "#0a9cf7"],
  behavior: behaviors.FLY,
  category: "spirits",
  state: "solid",

  reactions: {
    "fire_spirit": { elem2: null},
    "cursed_spirit": { elem2: null},
    "water_spirit": { elem2: null},
    "earth_spirit": { elem2: null},
    "air_spirit": { elem2: null},
  }

};

elements.soul_powder =  {
  color: "#2e363b",
  behavior: behaviors.POWDER,
  category: "spirits",
  state: "solid",

  reactions: {
    "awakening_powder": { elem1: "soul_spirit", elem2: null},
  }

};

elements.cursed_powder =  {
  color: "#2e363b",
  behavior: behaviors.POWDER,
  category: "spirits",
  state: "solid",

  reactions: {
    "awakening_powder": { elem1: "cursed_spirit", elem2: null},
  }

};

elements.air_powder =  {
  color: "#2e363b",
  behavior: behaviors.POWDER,
  category: "spirits",
  state: "solid",
  temp: -10,

  reactions: {
    "awakening_powder": { elem1: "air_spirit", elem2: null},
  }

};

elements.water_powder =  {
  color: "#2e363b",
  behavior: behaviors.POWDER,
  category: "spirits",
  state: "solid",

  reactions: {
    "awakening_powder": { elem1: "water_spirit", elem2: null},
  }

};

elements.fire_powder =  {
  color: "#2e363b",
  behavior: behaviors.POWDER,
  category: "spirits",
  state: "solid",

  reactions: {
    "awakening_powder": { elem1: "fire_spirit", elem2: null},
  }

};

elements.wandering_spirit = {
  color: "#b1b7ba",
  behavior: behaviors.FLY,
  category: "spirits",
  state: "solid",

  reactions: {
    "fire_spirit": { elem1: null},
    "cursed_spirit": { elem1: null},
    "water_spirit": { elem1: null},
    "earth_spirit": { elem1: null},
    "air_spirit": { elem1: null},
    "soul_spirit": { elem1: null},
  }

};

elements.unawaken_powder =  {
  color: "#696b6b",
  behavior: behaviors.POWDER,
  category: "spirits",
  state: "solid",

  reactions: {
    "fire_spirit": { elem1: null, elem2: "fire_powder" },
    "cursed_spirit": { elem1: null, elem2: "cursed_powder" },
    "water_spirit": { elem1: null, elem2: "water_powder" },
    "earth_spirit": { elem1: null, elem2: "earth_powder" },
    "air_spirit": { elem1: null, elem2: "air_powder" },
    "soul_spirit": { elem1: null, elem2: "soul_powder" },
  }

};

elements.awakening_powder =  {
  color: "#696b6b",
  behavior: behaviors.POWDER,
  category: "spirits",
  state: "solid",

  reactions: {
    "fire_powder": { elem1: null, elem2: "fire_spirit" },
    "cursed_powder": { elem1: null, elem2: "cursed_spirit" },
    "water_powder": { elem1: null, elem2: "water_spirit" },
    "earth_powder": { elem1: null, elem2: "earth_spirit" },
    "air_powder": { elem1: null, elem2: "air_spirit" },
    "soul_powder": { elem1: null, elem2: "soul_spirit" },
  }

};

elements.ant.breakInto = "antdna"
elements.fly.breakInto = "flydna"
elements.water.reactions["sugar"] = { elem1: null, elem2: "sweetwater" };
elements.water.reactions["deadflyingcreature"] = { elem1: "dirty_water"};
elements.water.reactions["deadcreature"] = { elem1: "dirty_water"};
elements.water.reactions["dirty_water"] = { elem1: "dirty_water"};
elements.ant.reactions["alcohol"] = { elem1: "antdna", elem2: null };
elements.fly.reactions["alcohol"] = { elem1: "flydna", elem2: null };
