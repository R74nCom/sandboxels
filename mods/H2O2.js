// made by Glitchernox. youtube.com/@Glitchernox for my youtube
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

elements.hydrogen_peroxide = {
  name: "Hydrogen Peroxide",
  color: ["#364e6c", "#d4e8ff", "#050f1e"],
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  density: 1450,
  tempHigh: 150.2,
  stateHigh: "steam, oxygen",
  tempLow: -0.46,
  stateLow: "solid_hydrogen_peroxide",
  conduct: 0.0046,
  stain: 0,
  viscosity: 1.245,
  desc: "An very weak acid mostly used to clean stains or for medicine. Also known as H2O2",
  reactions: {
  water: { elem1: "water", elem2: "oxygen", chance: 0.05 },
iron: { elem1: "rust", elem2: "oxygen", chance: 0.3 },
copper: { elem1: "oxidized_copper", elem2: "oxygen", chance: 0.25 },
silver: { elem1: "silver_oxide", elem2: "oxygen", chance: 0.2 },
blood: { elem1: "water", elem2: "oxygen", chance: 0.8 },
yeast: { elem1: "water", elem2: "oxygen", chance: 0.9 },
manganese_dioxide: { elem1: "water", elem2: "oxygen", chance: 1.0 },
charcoal: { elem1: "fire", elem2: "carbon_dioxide", chance: 0.1 },
wood: { elem1: "wet_wood", elem2: "oxygen", chance: 0.15 },
meat: { elem1: "rotten_meat", elem2: "oxygen", chance: 0.2 },
plant: { elem1: "dead_plant", elem2: "oxygen", chance: 0.15 },
sulfur: { elem1: "sulfur_dioxide", elem2: "water", chance: 0.2 },
milk: { elem1: "water", elem2: "oxygen", chance: 0.4 },
dirt: { elem1: "mud", elem2: "oxygen", chance: 0.05 }
  },
tick: function(pixel) {

    // Slowly decompose on its own
    if (Math.random() < 0.002) {
        changePixel(pixel, "water");

        var coord = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
        var x = pixel.x + coord.x;
        var y = pixel.y + coord.y;

        if (isEmpty(x,y)) {
            createPixel("oxygen", x, y);
        }
    }

    // Faster decomposition near catalysts
    if (Math.random() < 0.05) {
        var coord = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
        var x = pixel.x + coord.x;
        var y = pixel.y + coord.y;

        if (pixelMap[x] && pixelMap[x][y]) {
            var other = pixelMap[x][y];

            if (["iron","copper","blood","yeast"].includes(other.element)) {
                changePixel(pixel, "water");

                if (isEmpty(x,y)) {
                    createPixel("oxygen", x, y);
                }
            }
        }
    }
},
};
elements.solid_hydrogen_peroxide = {
    name: "Solid Hydrogen Peroxide",
    color: ["#e8f4ff", "#d6ebff", "#f7fbff"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 1600,
    tempHigh: -0.46,
    stateHigh: "hydrogen_peroxide",
    conduct: 0.001,
    desc: "Solidified H2O2. More useful when liquid.",
    tick: function(pixel) {

        // Very slow decomposition while frozen
        if (Math.random() < 0.0002) {
            changePixel(pixel, "water");

            var coord = adjacentCoords[
                Math.floor(Math.random() * adjacentCoords.length)
            ];

            var x = pixel.x + coord.x;
            var y = pixel.y + coord.y;

            if (isEmpty(x,y)) {
                createPixel("oxygen", x, y);
            }
        }
    }
};