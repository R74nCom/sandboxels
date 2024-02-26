/*

Also checkout sbstuff.js by sb! Without it, this mod wouldn't be possible!

Discords of people that helped me:
usecit - UseCit.psd
nousernamefound - nousernamefound

Credits:
Saschas - Waterpowder idea


*/

elements.sweetwater = {
  color: "#8ae7eb",
  behavior: behaviors.LIQUID,
  category: "liquids",
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
  category: "food",
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
  category: "food",
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
  category: null,
  state: "liquid",
  tempHigh: 80,
  stateHigh: "orangesoda",
};

elements.orange = {
  color: "#eda813",
  behavior: behaviors.POWDER,
  category: "food",
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
  category: "life",
  state: "liquid",
  breakInto: "blood",
  reactions: {
    "flydna": { elem1: "blood", elem2: "flyingcreature"},
    "antdna": { elem1: "blood", elem2: "creature"},
    "alcohol": { elem1: "cancer", elem2: "antiartificialjuice"}
  },
};

elements.creature = {
  color: "#d073d9",
  behavior: behaviors.CRAWLER,
  category: "life",
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
  category: "life",
  state: "fly",
  tempHigh: 175,
  stateHigh: "deadflyingcreature",
  breakInto: "deadflyingcreature",
  reactions: {
    "antiartificialjuice": { elem1: "deadflyingcreature", elem2: null },
    "fly": { elem2: "meat" },
    "meat": { elem2: "flyingcreature" },
    "artificialmeat": { elem2: "cell" },
    "syrup": { elem2: "flyingcreature" },
    "cell": { elem2: "flyingcreature" },
  },
};

elements.deadcreature = {
  color: "#86428c",
  behavior: behaviors.POWDER,
  category: null,
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
  category: null,
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
  category: "food",
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
  category: "life",
  state: "liquid",
  tempHigh: 215,
  stateHigh: "smoke",
  reactions: {
    "flyingcreature": { elem1: "alcohol", elem2: "deadflyingcreature" },
    "creature": { elem1: "alcohol", elem2: "deadcreature" },
  },
};

elements.antiartificialspray = {
  color: "#b38a5f",
  behavior: behaviors.DGAS,
  category: "life",
  state: "gas",
  tempHigh: 215,
  density: 4000,
  stateHigh: "smoke",
  reactions: {
    "flyingcreature": { elem1: "alcohol", elem2: "deadflyingcreature" },
    "creature": { elem1: "alcohol", elem2: "deadcreature" },
  },
};

elements.antdna = {
  color: "#b38a5f",
  behavior: behaviors.POWDER,
  category: "life",
  state: "powder",
  tempHigh: 215,
  stateHigh: "smoke",
};

elements.flydna = {
  color: "#b38a5f",
  behavior: behaviors.POWDER,
  category: "life",
  state: "powder",
  tempHigh: 215,
  stateHigh: "smoke",
};

elements.waterpowder = {
  color: elements.water.color,
  behavior: behaviors.POWDER,
  category: "powders",
  state: "powder",
  tempHigh: 40,
  stateHigh: "water",
};

elements.waterpowderer = {
  color: "#e3e1dc",
  behavior: behaviors.POWDER,
  category: "powders",
  state: "powder",
  reactions: {
    "water": { elem1: null, elem2: "waterpowder" }
  }
};

elements.ant.breakInto = "antdna"
elements.fly.breakInto = "flydna"
elements.water.reactions["sugar"] = { elem1: null, elem2: "sweetwater" };
elements.water.reactions["deadflyingcreature"] = { elem1: "dirty_water"};
elements.water.reactions["deadcreature"] = { elem1: "dirty_water"};
elements.water.reactions["dirty_water"] = { elem1: "dirty_water"};