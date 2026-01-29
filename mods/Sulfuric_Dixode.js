if (typeof elements === "undefined") {
  var elements = {};
}
if (typeof behaviors === "undefined") {
  var behaviors = {};
}
if (typeof pixelMap === "undefined") {
  var pixelMap = [];
}
if (typeof adjacentCoords === "undefined") {
  var adjacentCoords = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
  ];
}
if (typeof changePixel === "undefined") {
  var changePixel = function (pixel, elemName) {
    pixel.element = elemName;
  };
}

elements.sulfuric_acid = {
  name: "Sulfuric Acid",
  color: ["#c8e0ff", "#d4e8ff", "#b8d4ff"],
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  density: 1840,
  tempHigh: 337,
  stateHigh: "sulfuric_acid_gas",
  tempLow: 10,
  stateLow: "frozen_sulfuric_acid",
  conduct: 1,
  stain: 0.4,
  viscosity: 0.02,
  desc: "A highly corrosive, dense mineral acid. Reacts violently with water and metals.",
  reactions: {
    water: { elem1: "steam", elem2: "sulfuric_acid", chance: 0.6, temp1: 80 },
    ice: { elem1: "water", elem2: "sulfuric_acid", chance: 0.7, temp1: 40 },
    iron: { elem1: "hydrogen", elem2: "rust", chance: 0.4 },
    steel: { elem1: "hydrogen", elem2: "corroded_steel", chance: 0.4 },
    aluminum: { elem1: "hydrogen", elem2: "corroded_aluminum", chance: 0.4 },
    wood: { elem1: "carbon", elem2: "sulfuric_acid", chance: 0.5 },
    plant: { elem1: "carbon", elem2: "sulfuric_acid", chance: 0.5 },
    flesh: { elem1: "carbon", elem2: "sulfuric_acid", chance: 0.5 },
  },
  tick: function (pixel) {
    if (Math.random() < 0.05) {
      var coord =
        adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
      var x = pixel.x + coord.x;
      var y = pixel.y + coord.y;
      if (pixelMap[x] && pixelMap[x][y]) {
        var other = pixelMap[x][y];
        var elemDef = elements[other.element];
        if (!elemDef) {
          return;
        }
        if (elemDef.state === "solid" && !elemDef.acid_resistant) {
          if (Math.random() < 0.1) {
            changePixel(other, "corroded_matter");
          }
        }
      }
    }
  },
};

elements.sulfuric_acid_gas = {
  name: "Sulfuric Acid Gas",
  color: ["#e0f0ff", "#d0e4ff"],
  behavior: behaviors.GAS,
  category: "gases",
  state: "gas",
  density: 2,
  desc: "Vaporized sulfuric acid.",
};

elements.frozen_sulfuric_acid = {
  name: "Frozen Sulfuric Acid",
  color: ["#9fb8e0", "#8fa8d0"],
  behavior: behaviors.WALL,
  category: "solids",
  state: "solid",
  density: 1900,
  tempHigh: 10,
  stateHigh: "sulfuric_acid",
  desc: "Solidified sulfuric acid.",
};

elements.corroded_matter = {
  name: "Corroded Matter",
  color: ["#3a3a3a", "#2e2e2e", "#444444"],
  behavior: behaviors.POWDER,
  category: "powders",
  state: "solid",
  density: 1500,
  desc: "Generic material heavily corroded by acid.",
};

elements.corroded_steel = {
  name: "Corroded Steel",
  color: ["#4b4b4b", "#555555", "#3f3f3f"],
  behavior: behaviors.POWDER,
  category: "powders",
  state: "solid",
  density: 7700,
  desc: "Steel degraded by sulfuric acid.",
};

elements.corroded_aluminum = {
  name: "Corroded Aluminum",
  color: ["#6f6f6f", "#7a7a7a", "#656565"],
  behavior: behaviors.POWDER,
  category: "powders",
  state: "solid",
  density: 2600,
  desc: "Aluminum degraded by sulfuric acid.",
};
