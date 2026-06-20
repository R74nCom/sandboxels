// 🌎 Main element  1�7 Brazil Dust
elements.brazil_dust = {
  category: "Powders",
  desc: "A vibrant powder with the colors of Brazil.",
  color: ["#56a832", "#e6ed09", "#3258a8", "#e6ed09", "#56a832"],
  behavior: behaviors.POWDER,
  state: "solid",
  density: 1100,

  // Reacts with water to create the liquid version
  reactions: {
    water: { elem1: "brazil_liquid" },
  },

  // Thermal transformations
  tempLow: -10,
  stateLow: "brazil_dust_frozen",
  stateLowColor: "#56a832", // Cold green tint
  tempHigh: 200,
  stateHigh: "brazil_dust_molten",
  stateHighColor: "#e6ed09", // Warm yellow tint
};

// ❄️ Frozen Brazil Dust
elements.brazil_dust_frozen = {
  category: "State",
  desc: "Frozen version of Brazil dust, firm and static.",
  color: ["#56a832", "#e6ed09", "#3258a8", "#e6ed09", "#56a832"],
  behavior: behaviors.WALL,
  state: "solid",
  density: 1100,
  hidden: true,
  temp: -20,
  tempHigh: -9,
  stateHigh: "brazil_dust",
  stateHighColor: "#e6ed09", // Returns to bright yellow when heated
};

// 🔥 Molten Brazil Dust
elements.brazil_dust_molten = {
  category: "State",
  desc: "Molten form of Brazil dust.",
  color: ["#56a832", "#e6ed09", "#3258a8", "#e6ed09", "#56a832"],
  behavior: behaviors.MOLTEN,
  state: "liquid",
  density: 1100,
  hidden: true,
  temp: 500,
  tempLow: 199,
  stateLow: "brazil_dust",
  stateLowColor: "#56a832", // Green on cooling

  // Reaction: molten Brazil with molten iron
  reactions: {
    "molten_iron": { elem1: "molten_brazil_iron" },
  },
};

// ⚙️ Molten Brazil Iron
elements.molten_brazil_iron = {
  category: "State",
  desc: "A fusion of molten Brazil and molten iron, extremely conductive.",
  color: ["#56a832", "#e6ed09", "#3258a8", "#e6ed09", "#56a832"],
  behavior: behaviors.MOLTEN,
  state: "liquid",
  density: 7900,
  hidden: true,
  temp: 20000,
  conduct: 1,
  tempLow: 9999,
  stateLow: "brazil_iron",
  stateLowColor: "#56a832", // Solidified green tone
  stateHighColor: "#e6ed09", // Bright molten yellow tone
};

// 🧱 Solid Brazil Iron
elements.brazil_iron = {
  category: "Mix",
  desc: "Solidified version of Brazil iron alloy. Conducts energy perfectly.",
  color: ["#56a832", "#e6ed09", "#3258a8", "#e6ed09", "#56a832"],
  behavior: behaviors.WALL,
  state: "solid",
  density: 7800,
  hidden: true,
  conduct: 1,
  tempHigh: 10000,
  stateHigh: "molten_brazil_iron",
  stateLowColor: "#56a832",
  stateHighColor: "#e6ed09",
};

// 💧 Liquid Brazil
elements.brazil_liquid = {
  category: "Mix",
  desc: "A colorful liquid version of Brazil.",
  color: ["#56a832", "#e6ed09", "#3258a8", "#e6ed09", "#56a832"],
  behavior: behaviors.LIQUID,
  state: "liquid",
  density: 1050,
  viscosity: 0.8,
  hidden: true,
  tempLow: 0,
  stateLow: "brazil_ice",
  stateLowColor: "#3258a8", // Cool blue
  tempHigh: 150,
  stateHigh: "brazil_vapor",
  stateHighColor: "#e6ed09", // Warm yellow vapor
};

// 🧊 Brazil Ice
elements.brazil_ice = {
  category: "State",
  desc: "Frozen form of Brazil liquid.",
  color: ["#56a832", "#e6ed09", "#3258a8", "#e6ed09", "#56a832"],
  behavior: behaviors.WALL,
  state: "solid",
  density: 920,
  hidden: true,
  tempLow: -100,
  tempHigh: 1,
  stateHigh: "brazil_liquid",
  stateHighColor: "#56a832", // Green on melting
};

// ☁️ Brazil Vapor
elements.brazil_vapor = {
  category: "State",
  desc: "Gaseous, colorful form of Brazil that condenses when extremely cooled.",
  color: ["#56a832", "#e6ed09", "#3258a8", "#e6ed09", "#56a832"],
  behavior: behaviors.GAS,
  state: "gas",
  density: 0.8,
  hidden: true,
  tempLow: 248,
  stateLow: "brazil_liquid",
  stateLowColor: "#56a832", // Returns to greenish tone when condensed
  tempHigh: 250,
  stateHigh: "brazil_vapor",
  stateHighColor: "#e6ed09", // Retains bright yellow tone when hot
};