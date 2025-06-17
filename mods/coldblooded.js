/* changelog 
v 0.1 added snake
v 0.11 "axolotl" eats fish
v 0.2 crocodiles scales and axolotls actually eat fish now

thats it for now
*/

// Only run this if the human, head, and body elements exist
if (elements.human && elements.head && elements.body) {
  // Human
  const oldHumanTick = elements.human.tick;
  elements.human.tick = function (pixel) {
    if (oldHumanTick) oldHumanTick(pixel);
    if (pixel.poisoned !== undefined) {
      pixel.poisoned--;
      if (pixel.poisoned <= 0) {
        deletePixel(pixel.x, pixel.y);
        return;
      }
    }
  };

  // Head
  const oldHeadTick = elements.head.tick;
  elements.head.tick = function (pixel) {
    if (oldHeadTick) oldHeadTick(pixel);
    if (pixel.poisoned !== undefined) {
      pixel.poisoned--;
      if (pixel.poisoned <= 0) {
        deletePixel(pixel.x, pixel.y);
        return;
      }
    }
  };

  // Body
  const oldBodyTick = elements.body.tick;
  elements.body.tick = function (pixel) {
    if (oldBodyTick) oldBodyTick(pixel);
    if (pixel.poisoned !== undefined) {
      pixel.poisoned--;
      if (pixel.poisoned <= 0) {
        deletePixel(pixel.x, pixel.y);
        return;
      }
    }
  };
}


function eatBee(pixel1, pixel2) {
  pixel1.color = "#5c138a";
  pixel1.poisoned ??= 30;
}

function poisonOther(pixel1, pixel2) {
  if (!pixel2) return;
  pixel2.color = "#5c138a";
  pixel2.poisoned ??= 30;
}

elements.human.reactions.snake =
  { attr1: { panic: 5 } }

elements.fish.reactions.toad_tadpole =
  { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },

  elements.glue.reactions.scale =
  { elem1: null, elem2: "scale_plate" },

  elements.lizard = {
    color: ["#00ff1a", "#038f11"],
    behavior: [
      ["XX", "XX", "M2%1"],
      ["XX", "FX%5", "M1%15"],
      ["M2", "M1", "M2"],
    ],
    category: "life",
    state: "solid",
    reactions: {
      "fly": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.5 },
      "ant": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.3 },
      "termite": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.3 },
      "worm": { elem2: null, func: behaviors.FEEDPIXEL },
      "bee": { elem2: null, func: eatBee, chance: 0.05 },
      "firefly": { elem2: null, func: eatBee, chance: 0.4 },
      "fish": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.5 },
      "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
      "pool_water": { chance: 0.001, elem1: "rotten_meat" },
      "dirty_water": { chance: 0.0001, elem1: "rotten_meat" },
      "radiation": { elem1: ["ash", "meat", "cooked_meat", "rotten_meat", "snake", "crocodile", null], chance: 0.4 },
      "mercury": { elem1: "rotten_meat", chance: 0.1 },
      "bleach": { elem1: "rotten_meat", chance: 0.1 },
      "infection": { elem1: "rotten_meat", chance: 0.025 },
      "uranium": { elem1: "rotten_meat", chance: 0.1 },
      "cyanide": { elem1: "rotten_meat", chance: 0.1 },
      "chlorine": { elem1: "meat", chance: 0.1 },
      "alcohol": { elem1: "meat", chance: 0.025 },
      "vinegar": { elem1: "rotten_meat", chance: 0.001 },
      "poison": { elem1: "rotten_meat", elem2: null }
    },
    foodNeed: 5,
    temp: 20,
    tempHigh: 120,
    stateHigh: ["cooked_meat", "scale"],
    tempLow: -20,
    stateLow: "frozen_meat",
    breakInto: ["blood", "scale"],
    density: 1050,
    eggColor: "#ffffff",
    tick: function (pixel) {
      if (pixel.poisoned !== undefined) {
        pixel.poisoned--;
        if (pixel.poisoned <= 0) {
          deletePixel(pixel.x, pixel.y);
          return;
        }
      }
    },
  };



elements.toad = {
  color: ["#693800", "#945a18"],
  behavior: [
    ["XX", "XX", "M2%3 AND SW:water, salt_water, dirty_water, pool_water, seltzer%5"],
    ["XX", "FX%25", "M2%6 AND SW:water, salt_water, dirty_water, pool_water, seltzer%8"],
    ["M2", "M1 AND SW:water, salt_water, dirty_water, pool_water, seltzer%8", "M2 AND SW:water, salt_water, dirty_water, pool_water, seltzer%8"],
  ],

  category: "life",
  state: "solid",
  reactions: {
    "fly": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.5 },
    "ant": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.5 },
    "termite": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.5 },
    "worm": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.5 },
    "spider": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "dead_bug": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL },
    "bee": { elem2: null, func: eatBee, chance: 0.1 },
    "firefly": { elem2: null, func: eatBee, chance: 0.4 },
    "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
    "algae": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
    "kelp": { elem2: "water", chance: 0.1, func: behaviors.FEEDPIXEL },
    "snail": { elem2: "limestone", func: behaviors.FEEDPIXEL, chance: 0.05 },
    "slug": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "pool_water": { chance: 0.005, elem1: "rotten_meat" },
    "dirty_water": { chance: 0.0001, elem1: "rotten_meat" },
    "radiation": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat", "toad_tadpole", "tadpole", "frog", null], chance: 0.4 },
    "mercury": { elem1: "rotten_meat", chance: 0.1 },
    "bleach": { elem1: "rotten_meat", chance: 0.1 },
    "infection": { elem1: "rotten_meat", chance: 0.025 },
    "uranium": { elem1: "rotten_meat", chance: 0.1 },
    "cyanide": { elem1: "rotten_meat", chance: 0.1 },
    "chlorine": { elem1: "meat", chance: 0.1 },
    "alcohol": { elem1: "meat", chance: 0.025 },
    "vinegar": { elem1: "rotten_meat", chance: 0.001 },
    "poison": { elem1: "rotten_meat", elem2: null }
  },
  foodNeed: 10,
  baby: "toad_tadpole",
  temp: 18,
  tempHigh: 100,
  stateHigh: "cooked_meat",
  tempLow: -20,
  stateLow: "frozen_meat",
  breakInto: "slime",
  density: 1200,
  tick: function (pixel) {
    if (pixel.poisoned !== undefined) {
      pixel.poisoned--;
      if (pixel.poisoned <= 0) {
        deletePixel(pixel.x, pixel.y);
        return;
      }
    }
  },
};


elements.toad_tadpole = {
  color: "#87b574",
  behavior: [
    "XX|XX|M2%25 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
    "XX|FX%0.5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
    "M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
  ],
  reactions: {
    "algae": { elem2: null, chance: 0.25 },
    "kelp": { elem2: "water", chance: 0.25 },
    "pool_water": { chance: 0.70, elem1: null },
    "dirty_water": { chance: 0.70, elem1: null },
    "bleach": { elem1: null, chance: 0.05 },
    "poison": { elem1: null },
    "radiation": { elem1: ["toad", "toad", "frog", "worm", null], chance: 0.4 },
  },
  tempHigh: 100,
  stateHigh: "steam",
  tempLow: -10,
  stateLow: "ice",
  breakInto: ["slime", null],
  category: "life",
  hidden: true,
  state: "solid",
  density: 1450,
  conduct: 0.2,
  tick: function (pixel) {

    if (pixelTicks - pixel.start > 500 && Math.random() <= 0.05) {
      changePixel(pixel, "toad");
    }
  }
},

  elements.newt = {
    color: ["#db8727", "#945a18"],
    behavior: [
      ["XX", "XX", "SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%15"],
      ["XX", "FX%5", "M2%25 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%15"],
      ["M2", "M1 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%15", "M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%15"],
    ],
    category: "life",
    state: "solid",
    reactions: {
      "fly": { elem2: null, func: behaviors.FEEDPIXEL },
      "termite": { elem2: null, func: behaviors.FEEDPIXEL },
      "ant": { elem2: null, func: behaviors.FEEDPIXEL },
      "worm": { elem2: null, func: behaviors.FEEDPIXEL },
      "slug": { elem2: null, func: behaviors.FEEDPIXEL },
      "snail": { elem2: "limestone", func: behaviors.FEEDPIXEL },
      "pool_water": { chance: 0.70, elem1: null },
      "dirty_water": { chance: 0.70, elem1: null },
      "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
      "radiation": { elem1: ["ash", "meat", "cooked_meat", "rotten_meat", "axolotl", null], chance: 0.4 },
      "mercury": { elem1: "rotten_meat", chance: 0.1 },
      "bleach": { elem1: "rotten_meat", chance: 0.1 },
      "infection": { elem1: "rotten_meat", chance: 0.025 },
      "uranium": { elem1: "rotten_meat", chance: 0.1 },
      "cyanide": { elem1: "rotten_meat", chance: 0.1 },
      "chlorine": { elem1: "meat", chance: 0.1 },
      "alcohol": { elem1: "meat", chance: 0.025 },
      "vinegar": { elem1: "rotten_meat", chance: 0.001 }
    },
    foodNeed: 10,
    temp: 18,
    tempHigh: 100,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    breakInto: "slime",
    density: 1200,
    eggColor: "#ffeeab",
  };

elements.axolotl = {
  color: ["#ff99ff", "#ffe100", "#785705"],
  behavior: [
    ["XX", "XX", "SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%10"],
    ["XX", "FX", "M2%15 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%10"],
    ["M2", "M1", "M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%10"],
  ],
  category: "life",
  state: "solid",
  reactions: {
    "fly": { elem2: null, func: behaviors.FEEDPIXEL },
    "termite": { elem2: null, func: behaviors.FEEDPIXEL },
    "ant": { elem2: null, func: behaviors.FEEDPIXEL },
    "worm": { elem2: null, func: behaviors.FEEDPIXEL },
    "slug": { elem2: null, func: behaviors.FEEDPIXEL },
    "snail": { elem2: "limestone", func: behaviors.FEEDPIXEL },
    "fish": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.5 },
    "pool_water": { chance: 0.70, elem1: null },
    "dirty_water": { chance: 0.70, elem1: null },
    "radiation": { elem1: ["ash", "meat", "cooked_meat", "rotten_meat", "newt"], chance: 0.4 },
    "mercury": { elem1: "rotten_meat", chance: 0.1 },
    "bleach": { elem1: "rotten_meat", chance: 0.1 },
    "infection": { elem1: "rotten_meat", chance: 0.025 },
    "uranium": { elem1: "rotten_meat", chance: 0.1 },
    "cyanide": { elem1: "rotten_meat", chance: 0.1 },
    "chlorine": { elem1: "meat", chance: 0.1 },
    "alcohol": { elem1: "meat", chance: 0.025 },
    "vinegar": { elem1: "rotten_meat", chance: 0.001 },
    "oxygen": { elem2: "carbon_dioxide", chance: 0.5 }
  },
  foodNeed: 20,
  temp: 18,
  tempHigh: 90,
  stateHigh: "cooked_meat",
  tempLow: -20,
  stateLow: "frozen_meat",
  breakInto: ["slime", "blood"],
  density: 1000,
  eggColor: ["#dcdcdc", "#a9a9a9", "#2b2b2b"],
  tick: function (pixel) {
    pixel.lifetime ??= 900;

    let up = pixel.y > 0 ? pixelMap[pixel.x][pixel.y - 1] : null;
    let down = pixel.y < pixelMap[0].length - 1 ? pixelMap[pixel.x][pixel.y + 1] : null;
    let left = pixel.x > 0 ? pixelMap[pixel.x - 1][pixel.y] : null;
    let right = pixel.x < pixelMap.length - 1 ? pixelMap[pixel.x + 1][pixel.y] : null;

    if (
      (up && up.element === "water") ||
      (down && down.element === "water") ||
      (left && left.element === "water") ||
      (right && right.element === "water")) {
      pixel.lifetime = 900;
    } else {
      pixel.lifetime--;
      if (pixel.lifetime <= 0 && Math.random() <= 0.1) {
        deletePixel(pixel.x, pixel.y);
        createPixel("meat", pixel.x, pixel.y);
      }
    }
  }
};

elements.snake = {
  color: ["#006400", "#90ee90", "#00ff00"],
  behavior: [
    ["XX", "XX", "XX"],
    ["XX", "FX%15", "M2%10"],
    ["M2", "M1", "M1"],
  ],
  reactions: {
    "frog": { elem2: null, func: behaviors.FEEDPIXEL },
    "toad": { elem2: null, func: behaviors.FEEDPIXEL },
    "lizard": { elem2: null, func: behaviors.FEEDPIXEL },
    "worm": { elem2: null, func: behaviors.FEEDPIXEL },
    "slug": { elem2: null, func: behaviors.FEEDPIXEL },
    "snail": { elem2: "limestone", func: behaviors.FEEDPIXEL },
    "egg": {
      elem2: "egg",
      func: function (pixel1, pixel2) {
        if (pixel2.animal === "snake") return; // Don't eat own egg
        behaviors.FEEDPIXEL(pixel1, pixel2);
      }
    },
    "radiation": { elem1: ["ash", "meat", "cooked_meat", "rotten_meat", "lizard", "crocodile", null], chance: 0.4 },
    "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
    "mercury": { elem1: "rotten_meat", chance: 0.1 },
    "bleach": { elem1: "rotten_meat", chance: 0.1 },
    "infection": { elem1: "rotten_meat", chance: 0.025 },
    "uranium": { elem1: "rotten_meat", chance: 0.1 },
    "cyanide": { elem1: "rotten_meat", chance: 0.1 },
    "chlorine": { elem1: "meat", chance: 0.1 },
    "alcohol": { elem1: "meat", chance: 0.025 },
    "vinegar": { elem1: "rotten_meat", chance: 0.001 },
    "poison": { elem1: null }
  },
  category: "life",
  state: "solid",
  density: 1050,
  temp: 20,
  tempHigh: 120,
  stateHigh: "cooked_meat",
  tempLow: -10,
  stateLow: "frozen_meat",
  breakInto: "blood",

  tick: function (pixel) {
    const directions = [
      [0, -1], [-1, -1], [1, -1],
      [-1, 0], [1, 0],
      [0, 1], [-1, 1], [1, 1]
    ];

    for (let [dx, dy] of directions) {
      let x = pixel.x + dx;
      let y = pixel.y + dy;
      if (!isEmpty(x, y)) {
        let other = pixelMap[x]?.[y];
        if (other && (other.element === "head" || other.element === "body" || other.element === "crocodile") && Math.random() <= 0.5) {
          poisonOther(pixel, other);
        }
      }
    }
  }
};

elements.crocodile = {
  color: ["#065e13", "#0c751c"],
  behavior: [
    ["XX", "XX", "XX AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%5"],
    ["XX", "FX%10", "M2%15 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%5"],
    ["M2", "M1", "M1 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%5"],
  ],
  category: 'life',
  state: 'solid',
  foodNeed: 10,
  reactions: {
    "fish": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "bird": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "rat": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.5 },
    "frog": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "toad": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "snake": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.4 },
    "axolotl": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "lizard": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "newt": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "body": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "head": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "human": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "slug": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "snail": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "bone": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.1 },
    "bone_marrow": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.4 },
    "homonculus": { elem2: null, func: behaviors.FEEDPIXEL, chance: 0.2 },
    "radiation": { elem1: ["ash", "meat", "cooked_meat", "rotten_meat", "lizard", "snake", null], chance: 0.4 },
    "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
    "mercury": { elem1: "rotten_meat", chance: 0.1 },
    "bleach": { elem1: "rotten_meat", chance: 0.1 },
    "infection": { elem1: "rotten_meat", chance: 0.025 },
    "uranium": { elem1: "rotten_meat", chance: 0.1 },
    "cyanide": { elem1: "rotten_meat", chance: 0.1 },
    "chlorine": { elem1: "meat", chance: 0.1 },
    "alcohol": { elem1: "meat", chance: 0.025 },
    "vinegar": { elem1: "rotten_meat", chance: 0.001 },
    "poison": { elem1: null }
  },
  temp: 18,
  tempHigh: 100,
  stateHigh: ["cooked_meat", "scale"],
  tempLow: -10,
  stateLow: "frozen_meat",
  breakInto: ["blood", "scale"],
  density: 1100
}

elements.scale = {
  category: "powders",
  color: ['#076607', '#1cb01c', '#0ef00e'],
  behavior: behaviors.POWDER,
  tempHigh: 900,
  stateHigh: ["ash", "ash", "ash", "smoke", "stench", "stench", "stench"],
  breakInto: "dust",
  hardness: 0.3,
  reactions: {
    "glue": {
      elem1: "scale_plate", elem2: null,
    }
  }
}

elements.scale_plate = {
  category: "solids",
    color: ['#044404', '#137a13', '#0aa00a'],
    hardness: 0.8,
    breakInto: "scale",
    tick: function (pixel) {
      // 2 temp highs
      const hot = ["scale", "dioxin", "cyanide_gas"];
      const hotter = ["ash", "ash", "ash", "smoke", "stench", "stench", "stench", "dioxin", "cyanide_gas"];
      if (pixel.temp >= 475 && pixel.temp <= 900) {
        let chosen = hot[Math.floor(Math.random() * hot.length)];
        changePixel(pixel, chosen);
      }
      if (pixel.temp >= 900) {
        let chosen = hotter[Math.floor(Math.random() * hotter.length)];
        changePixel(pixel, chosen);
      }
    }
  }
