//This mod was made by Alex the transfem, https://discord.com/users/778753696804765696 on discord and https://www.tiktok.com/@alextheagenenby?_t=8hoCVI3NRhu&_r=1 on tiktok.
function pixelInRange(pixel, range){
  let i = 0;
  while (i < range.length) {
    if (pixel.x === range[i][0] && pixel.y === range[i][1]) {
      i++;
      return true;
    } else {
        i++;
      }

    }
    return false;

}

function customExplosion(pixel1, pixel2, radius, list) {
  let x = pixel1.x;
  let y = pixel1.y;
  deletePixel(x, y);
  deletePixel(pixel2.x, pixel2.y);
  explodeAt(x, y, radius, list);
};
function reactPixels(pixel1,pixel2) {
    var r = elements[pixel1.element].reactions[pixel2.element];
    if (r.setting && settings[r.setting]===0) {
        return false;
    }
    // r has the attribute "y" which is a range between two y values
    // r.y example: [10,30]
    // return false if y is defined and pixel1's y is not in the range
    if (r.tempMin !== undefined && pixel1.temp < r.tempMin) {
        return false;
    }
    if (r.tempMax !== undefined && pixel1.temp > r.tempMax) {
        return false;
    }
    if (r.burning1 !== undefined && Boolean(pixel1.burning) !== r.burning1) {
        return false;
    }
    if (r.burning2 !== undefined && Boolean(pixel2.burning) !== r.burning2) {
        return false;
    }
    if (r.charged && !pixel.charge) {
        return false;
    }
    if (r.chance !== undefined && Math.random() > r.chance) {
        return false;
    }
    if (r.y !== undefined && (pixel1.y < r.y[0] || pixel1.y > r.y[1])) {
        return false;
    }
    if (r.explosion !== undefined){
      if (r.radius !== undefined){
        let radius = r.radius;
        let list = r.explosion.split(",");
        customExplosion(pixel1, pixel2, radius, list);
      }
    }
    if (r.elem1 !== undefined) {
        // if r.elem1 is an array, set elem1 to a random element from the array, otherwise set it to r.elem1
        if (Array.isArray(r.elem1)) {
            var elem1 = r.elem1[Math.floor(Math.random() * r.elem1.length)];
        } else { var elem1 = r.elem1; }

        if (elem1 == null) {
            deletePixel(pixel1.x,pixel1.y);
        }
        else {
            changePixel(pixel1,elem1);
        }
    }
    if (r.charge1) { pixel1.charge = r.charge1; }
    if (r.temp1) { pixel1.temp += r.temp1; pixelTempCheck(pixel1); }
    if (r.color1) { // if it's a list, use a random color from the list, else use the color1 attribute
        pixel1.color = pixelColorPick(pixel1, Array.isArray(r.color1) ? r.color1[Math.floor(Math.random() * r.color1.length)] : r.color1);
    }
    if (r.attr1) { // add each attribute to pixel1
        for (var key in r.attr1) {
            pixel1[key] = r.attr1[key];
        }
    }
    if (r.elem2 !== undefined) {
        // if r.elem2 is an array, set elem2 to a random element from the array, otherwise set it to r.elem2
        if (Array.isArray(r.elem2)) {
            var elem2 = r.elem2[Math.floor(Math.random() * r.elem2.length)];
        } else { var elem2 = r.elem2; }

        if (elem2 == null) {
            deletePixel(pixel2.x,pixel2.y);
        }
        else {
            changePixel(pixel2,elem2);
        }
    }
    if (r.charge2) { pixel2.charge = r.charge2; }
    if (r.temp2) { pixel2.temp += r.temp2; pixelTempCheck(pixel2); }
    if (r.color2) { // if it's a list, use a random color from the list, else use the color2 attribute
        pixel2.color = pixelColorPick(pixel2, Array.isArray(r.color2) ? r.color2[Math.floor(Math.random() * r.color2.length)] : r.color2);
    }
    if (r.attr2) { // add each attribute to pixel2
        for (var key in r.attr2) {
            pixel2[key] = r.attr2[key];
        }
    }
    if (r.func) { r.func(pixel1,pixel2); }
    return r.elem1!==undefined || r.elem2!==undefined;
}
function customExplosion(pixel1, pixel2, radius, list) {
  let x = pixel1.x;
  let y = pixel1.y;
  deletePixel(x, y);
  deletePixel(pixel2.x, pixel2.y);
  explodeAt(x, y, radius, list);
};
let obj = {};
obj.items = "";
elements.sodiumhydroxide = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "acid": { "elem2":"water", },
        "acid": { "elem2":"smoke", },
        "acid": { "elem2":"fire", },
        "acid": { "elem2":"fire", },
        "acid": { "elem2":"fire", },
        "acid_gas": { "elem2":"water", },
        "acid_gas": { "elem2":"smoke", },
        "acid_gas": { "elem2":"fire", },
        "acid_gas": { "elem2":"fire", },
        "acid_gas": { "elem2":"fire", },
        "vinegar": { "elem1": ["sodium_acetate", "water"], },
        "aqua_regia": { "elem1": null, "elem2": ["fire", "fire", "hydrogen"], },
        "acidic_water": { "elem1": null, "elem2": ["water", "pop"], },
        "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "hydrogen"], },
        "chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "fire", "pop"], },
    },
    viscosity: 0.56,
    //tempHigh: 64.7,
    fireColor: "#fba600",
    category: "liquids",
    state: "liquid",
    density: 1.525,
    stain: -0.25,
    name: "SodiumHydroxide",
    stateHigh: "sodiumhydroxidecrystals",
    tempHigh: "1388",
}
elements.sodiumhydroxidecrystals = {
    color: "#c9c5b1",
    behavior: behaviors.POWDER,
    reactions: {
        "acid": { "elem2":"smoke", },
        "acid": { "elem2":"fire", },
        "acid": { "elem2":"fire", },
        "acid": { "elem2":"fire", },
        "acid_gas": { "elem2":"smoke", },
        "acid_gas": { "elem2":"pop", },
        "acid_gas": { "elem2":"fire", },
        "acid_gas": { "elem2":"fire", },
        "water": { "elem1": null, "elem2": "sodiumhydroxide", },
        "vinegar": { "elem1": null, "elem2": "sodium_acetate", },
        "aqua_regia": { "elem1": null, "elem2": ["fire", "fire", "hydrogen"], },
        "acidic_water": { "elem1": null, "elem2": ["water", "pop"], },
        "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "hydrogen"], },
        "chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "fire", "pop"], },
    },
    //tempHigh: 64.7,
    fireColor: "#fba600",
    category: "powders",
    state: "powder",
    density: 2130,
    name: "SodiumHydroxideCrystals",
}

elements.sodium.reactions = {
  "chlorine": {
      "elem1": "salt",
      "elem2": "pop"
  },
  "vinegar": {
      "elem1": "sodium_acetate",
      "elem2": [
          null,
          null,
          null,
          "hydrogen"
      ],
      "attr1": {
          "foam": 15
      }
  },
  "water": {
      "elem1": [
          "sodiumhydroxide"
      ],
      "chance": 1,
      "temp2": 299.6
  },
  "salt_water": {
      "elem1": [
          "sodiumhydroxide",
          "salt"
      ],
      "chance": 1,
      "temp2": 299.6
  },
  "sugar_water": {
      "elem1": [
          "sodiumhydroxide",
          "sugar"
      ],
      "chance": 1,
      "temp2": 299.6
  },
  "acid": {
    "elem1": "explosion",
  },
  "aqua_regia": { "elem1": null, "elem2": ["fire", "pop", "fire", "fire", "hydrogen"], },
  "acidic_water": { "elem1": null, "elem2": ["water", "pop", "pop"], },
  "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "pop", "hydrogen"], },
  "chloroauric_acid": { "elem1": "gold", "elem2": ["fire", "fire", "pop"], },
};
elements.magnesium = {
  color: "#e6e6e6",
  reactions: {
    "acid": { "elem1": "hydrogen", "chance": 0.02, },
    "aqua_regia": { "elem1": "hydrogen", "chance": 0.2, "elem2": "pop", },

  },
  behavior: behaviors.POWDER,
  fireColor: "#ffffff",
  category: "powders",
  state: "solid",
  density: 1740,
  burnTime: 500,
  name: "Magnesium",
  stateHigh: "molten_magnesium",
  tempHigh: "650",
  burn: 50,
  density: 1738,
}
elements.molten_magnesium = {
  color: ["#fab298", "#f78157", "#ff9169", "#ff9e7a"],
  behavior: behaviors.MOLTEN,
  fireColor: "#ffffff",
  category: "states",
  state: "liquid",
  density: 1740,
  name: "MoltenMagnesium",
  temp: 650,
  stateLow: "magnesium",
  tempLow: 600,
  density: 1460,
}
elements.acidic_water = {
  burn: 0,
  behavior: behaviors.LIQUID,
  reactions: {
    "quicklime": {"elem2": ["hydrogen", "water", "water", "water", "water"], "elem1": null, },
    "slaked_lime": {"elem2": ["hydrogen", "water", "water", "water", "water"], "elem1": null, },
    "calcium": {"elem2": ["hydrogen", "fire", "water", "water", "water"], "elem1": null, },
    "sodium": {"elem2": ["hydrogen", "fire", "fire", "pop", "fire"], "elem1": null, },
    "sodiumhydroxide": {"elem2": ["hydrogen", "fire", "pop", "pop", "water"], "elem1": null, },
    "sodiumhydroxidecrystals": {"elem2": ["hydrogen", "pop", "water", "water"], "elem1": null, },
  },
    category: "liquids",
    state: "liquid",
    density: 1000,
    name: "AcidWater",
  density: 1100,
}
elements.acid.ignore.push("magnesium");
elements.acid.ignore.push("sodiumhydroxide");
elements.acid.ignore.push("sodiumhydroxidecrystals");
elements.acid.ignore.push("rubidiumhydroxide");
elements.acid.ignore.push("rubidiumhydroxidecrystals");
elements.acid.ignore.push("rubidiumsalt");
elements.acid.ignore.push("rubidium");
elements.acid.ignore.push("moltenrubidium");
elements.acid.ignore.push("potassium");
elements.acid.ignore.push("MoltenPotassium");
elements.acid.ignore.push("potassiumhydroxide");
elements.acid.ignore.push("potassiumhydroxidecrystals");
elements.acid.ignore.push("water");
elements.acid.ignore.push("acidic_water");
elements.acid.ignore.push("gold");
elements.acid.ignore.push("chloroauric_acid");
elements.acid.ignore.push("nitric_acid");
elements.acid.ignore.push("aqua_regia");
elements.cwall = {
      "color": "rgb(128,128,128)",
      "name": "Conductive Wall",
      "behavior": [["XX", "XX", "XX"], ["XX", "XX", "XX"], ["XX", "XX", "XX"]],
      "category": "solids",
      "insulate": false,
      "hardness": 1,
      "noMix": true,
      "colorObject": {
          "r": 128,
          "g": 128,
          "b": 128
      },
  }
elements.acid.reactions = {
    "ash": {
        "elem1": "neutral_acid",
        "elem2": null
    },
    "limestone": {
        "elem1": "neutral_acid",
        "elem2": null
    },
    "quicklime": {
        "elem1": "neutral_acid",
        "elem2": null
    },
    "slaked_lime": {
        "elem1": "neutral_acid",
        "elem2": null
    },
    "borax": {
        "elem1": "neutral_acid",
        "elem2": null
    },
    "ammonia": {
        "elem1": "neutral_acid",
        "elem2": null
    },
    "bleach": {
        "elem1": "neutral_acid",
        "elem2": null
    },
    "water": {
        "elem1": "acidic_water",
    },
    "salt_water": {
        "elem1": null,
        "elem2": "water"
    },
    "sugar_water": {
        "elem1": null,
        "elem2": "water"
    },
    "charcoal": {
        "elem1": null,
        "elem2": "carbon_dioxide"
    },
    "rock": {
        "elem1": null,
        "elem2": "sand",
        "chance": 0.05
    },
    "baking_soda": {
        "elem1": "salt_water",
        "elem2": [
            "carbon_dioxide",
            "foam"
        ]
    },
    "zinc": { "elem1": null, "elem2": "zinc_chloride", },
    "iron": { "elem1": null, "elem2": "iron_chloride", },
    "aluminum": { "elem1": null, "elem2": "aluminum_chloride", },
}
elements.chloroauric_acid = {
  behavior: behaviors.POWDER,
  category: "powders",
  state: "solid",
  name: "ChloroauricAcid",
  color: "#ba7b00",
  tempHigh: 60,
  stateHigh: "liquid_chloroauric_acid",
  density: 4400,
}
elements.liquid_chloroauric_acid = {
  behavior: behaviors.LIQUID,
  category: "states",
  state: "liquid",
  name: "LiquidChloroauricAcid",
  color: "#ba7b00",
  reactions: {
    "sodiumhydroxide": { "elem2": "gold", "elem1": ["water", "pop", "pop", "fire", "fire"], },
    "sodiumhydroxidecrystals": { "elem2": "gold", "elem1": ["water", "pop", "pop", "fire", "fire"], },
    "sodium": { "elem2": "gold", "elem1": ["fire", "pop", "pop", "fire", "fire"], },
    "calcium": { "elem2": "gold", "elem1": ["water", "pop", "water", "fire"], },
  },
  tempLow: 59,
  stateLow: "chloroauric_acid",
  tempHigh: 115,
  stateHigh: "gold",
  density: 2500,
}
elements.nitrogen_oxide = {
  behavior: behaviors.GAS,
  category: "gases",
  state: "gas",
  name: "NitrogenOxide",
  color: "#961400",
  reactions: {
    "water": { "elem1": null, "elem2": "nitric_acid", },
  },
  density: 2.62,
}
elements.nitric_acid = {
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  name: "NitricAcid",
  color: "#ffffff",
  reactions: { "acid": { "elem1": null, "elem2": "aqua_regia",}, },
  density: 1.51,
}
elements.aqua_regia = {
      "behavior": [
          [
              "XX",
              "DB%5",
              "XX"
          ],
          [
              "DB%5 AND M2",
              "XX",
              "DB%5 AND M2"
          ],
          [
              "DB%5 AND M2",
              "DB%10 AND M1",
              "DB%5 AND M2"
          ]
      ],
      "ignore": [
          "glass",
          "rad_glass",
          "glass_shard",
          "rad_shard",
          "stained_glass",
          "baked_clay",
          "acid_gas",
          "neutral_acid",
          "acid_cloud",
          "water",
          "salt_water",
          "sugar_water",
          "dirty_water",
          "copper",
          "gold",
          "porcelain",
          "plastic",
          "bead",
          "microplastic",
          "molten_plastic",
          "pool_water",
          "chlorine",
          "hydrogen",
          "magnesium",
          "sodiumhydroxide",
          "sodiumhydroxidecrystals",
          "water",
          "acidic_water",
          "gold",
          "chloroauric_acid",
          "acid_ice",
          "acid",
          "nitric_acid",
          "NaK",
      ],
      "reactions": {
          "ash": {
              "elem1": "neutral_acid",
              "elem2": null
          },
          "limestone": {
              "elem1": "neutral_acid",
              "elem2": null
          },
          "quicklime": {
              "elem1": "neutral_acid",
              "elem2": null
          },
          "slaked_lime": {
              "elem1": "neutral_acid",
              "elem2": null
          },
          "borax": {
              "elem1": "neutral_acid",
              "elem2": null
          },
          "ammonia": {
              "elem1": "neutral_acid",
              "elem2": null
          },
          "bleach": {
              "elem1": "neutral_acid",
              "elem2": null
          },
          "water": {
              "elem1": "acidic_water"
          },
          "salt_water": {
              "elem1": null,
              "elem2": "water"
          },
          "sugar_water": {
              "elem1": null,
              "elem2": "water"
          },
          "charcoal": {
              "elem1": null,
              "elem2": "carbon_dioxide"
          },
          "rock": {
              "elem1": null,
              "elem2": "sand",
              "chance": 0.05
          },
          "baking_soda": {
              "elem1": "salt_water",
              "elem2": [
                  "carbon_dioxide",
                  "foam"
              ]
          },
          "gold": {
              "elem1": null, "elem2": "chloroauric_acid", "temp2": 20,
          },
          "gold_coin": {
              "elem1": null, "elem2": "chloroauric_acid", "temp2": 20,
          },
      },
      "category": "liquids",
      "state": "liquid",
      "density": 1049,
      "stain": -0.1,
      name: "AquaRegia",
      "alias": "HCl + HN03",
      "movable": true,
      "color": "#ffdd9b",
  density: 1.3,
  }
elements.potassium = {
  behavior: behaviors.POWDER,
  color: ["#545454", "#737373", "#7d7d7d", "#8f8f8f"],
  "category": "powders",
  "state": "powder",
  "alias": "K",
  tempHigh: 63.65,
  stateHigh: "MoltenPotassium",
  reactions: {
    "water": { "elem1": "potassiumhydroxide", "elem2": ["fire", "fire", "pop", "water"], },
    "acid": { "elem1": null, "elem2": ["water", "smoke", "fire"], },
    "acid": { "elem2":"fire", },
    "acid": { "elem2":"fire", },
    "acid_gas": { "elem1": null, "elem2": ["water", "smoke", "fire"], },
    "acid_gas": { "elem2":"fire", },
    "acid_gas": { "elem2":"fire", },
    "aqua_regia": { "elem1": null, "elem2": ["fire", "pop", "pop", "fire", "fire", "hydrogen"], },
    "acidic_water": { "elem1": null, "elem2": ["water", "pop", "pop"], },
    "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "fire", "pop", "hydrogen"], },
    "chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "fire", "pop", "pop"], },
    "liquid_chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "fire", "pop", "pop"], },
  },
  density: 862,
}
elements.MoltenPotassium = {
  behavior: behaviors.LIQUID,
  color: ["#9c9c9c", "#8c8b8b", "#7d7d7d", "#999797"],
  state: "liquid",
  name: "MoltenPotassium",
  viscosity: 0.55,
  reactions: {
    water: { explosion: "fire,potassiumhydroxide,potassiumhydroxide,potassiumhydroxide,hydrogen,hydrogen,pop", radius: 3 },
    molten_sodium: { elem1: null, elem2: "NaK" },
    acid: { explosion: "fire,fire,hydrogen,pop,pop,hydrogen", radius: 5 },
    chloroauric_acid: { elem1: "gold", explosion: "fire,fire,gold_coin,hydrogen,hydrogen,pop", radius: 6},
    liquid_chloroauric_acid: { elem1: "gold", explosion: "fire,fire,gold_coin,hydrogen,hydrogen,pop", radius: 6
    },
    aqua_regia: { explosion: "fire,fire,fire,fire,hydrogen,pop,hydrogen,pop", radius: 7},
    nitric_acid: { explosion: "fire,fire,fire,hydrogen,pop", radius: 6},
    acidic_water: { explosion: "fire,potassiumhydroxide,hydrogen,hydrogen", radius: 4 },
  },
  temp: 70,
  tempLow: 63.65,
  stateLow: "potassium",
  density: 862,
}
elements.potassiumhydroxide = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "acid": { "elem1": null, "elem2": ["water", "smoke", "fire"], },
        "acid": { "elem2":"fire", },
        "acid": { "elem2":"fire", },
        "acid_gas": { "elem1": null, "elem2": ["water", "smoke", "fire"], },
        "acid_gas": { "elem2":"fire", },
        "acid_gas": { "elem2":"fire", },
        "aqua_regia": { "elem1": null, "elem2": ["fire", "pop", "pop", "fire", "fire", "hydrogen"], },
        "acidic_water": { "elem1": null, "elem2": ["water", "pop", "pop"], },
        "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "fire", "pop", "hydrogen"], },
        "chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "pop"], }
    },
    viscosity: 0.56,
    //tempHigh: 64.7,
    fireColor: "#fba600",
    category: "liquids",
    state: "liquid",
    density: 2.12,
    stain: -0.25,
    name: "PotassiumHydroxide",
    stateHigh: "potassiumhydroxidecrystals",
    tempHigh: "1388",
}
elements.potassiumhydroxidecrystals = {
    color: "#c9c5b1",
    behavior: behaviors.POWDER,
    reactions: {
        "acid": { "elem2":"smoke", },
        "acid": { "elem2":"fire", },
        "acid": { "elem2":"fire", },
        "acid": { "elem2":"fire", },
        "acid_gas": { "elem2":"smoke", },
        "acid_gas": { "elem2":"pop", },
        "acid_gas": { "elem2":"fire", },
        "acid_gas": { "elem2":"fire", },
        "water": { "elem1": null, "elem2": "potassiumhydroxide", },
        "vinegar": { "elem1": null, "elem2": "sodium_acetate", },
        "aqua_regia": { "elem1": null, "elem2": ["fire", "pop", "pop", "fire", "fire", "hydrogen"], },
        "acidic_water": { "elem1": null, "elem2": ["water", "pop", "pop"], },
        "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "fire", "pop", "hydrogen"], },
        "chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "fire", "pop", "pop"], },
    },
    //tempHigh: 64.7,
    fireColor: "#fba600",
    category: "powders",
    state: "powder",
    density: 2040,
    name: "PotassiumHydroxideCrystals",
}
elements.supercooler = {
  name: "SuperCooler",
  category: "machines"
}
elements.supercooler.behavior = [["XX","CO:10","XX"],["CO:10","XX","CO:10"],["XX","CO:10","XX"]]
elements.iron_chloride = {
  color: ["#010014", "#a2ff94"],
  reactions: {
    "dirty_water": { "elem1": "water", },
    "aluminum": { "elem1": "aluminum_chloride", "elem2": "iron" },
  },
  behavior: behaviors.POWDER,
  category: "powders",
  state: "solid",
  density: 1740,
  burnTime: 500,
  name: "IronChloride",
  density: 2900,
}
elements.aluminum_chloride = {
  color: ["#faff61", "#f7f7e4", "#ffffb5"],
  reactions: {
    "dirty_water": { "elem1": "water", },
  },
  behavior: behaviors.POWDER,
  category: "powders",
  state: "solid",
  density: 1740,
  burnTime: 500,
  name: "AluminumChloride",
  density: 2440,
}

elements.zinc_chloride = {
  color: ["#faff61", "#f7f7e4", "#ffffb5"],
  reactions: {
    "dirty_water": { "elem1": "water", },
    "water": { "elem1": null, "chance": 0.2 },
  },
  behavior: behaviors.POWDER,
  category: "powders",
  state: "solid",
  density: 1740,
  burnTime: 500,
  name: "ZincChloride",
  density: 2910,
}
elements.acid.ignore.push("zinc");
elements.acid.ignore.push("iron");
elements.acid.ignore.push("aluminum");
elements.acid.ignore.push("zinc_chloride");
elements.acid.ignore.push("iron_chloride");
elements.acid.ignore.push("aluminum_chloride");
elements.kilonova = {
  name: "Kilonova",
  category: "energy",
  maxSize: 1,
  temp: 100000000,
}
elements.supernova.behavior = [ ["XX", "XX", "XX"], [ "XX", "EX:80>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,oxygen,molten_sodium,sulfur_gas,neon,chlorine,molten_calcium,molten_nickel,molten_copper,molten_zinc,gallium_gas,hydrogen,hydrogen,hydrogen,hydrogen,helium,helium,helium AND CH:NeutronStar", "XX" ], ["XX", "XX", "XX"] ]
elements.kilonova.behavior = [ ["XX", "XX", "XX"], [ "XX", "EX:200>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead,oxygen,molten_sodium,molten_gold,molten_tungsten,sulfur_gas,neon,chlorine,molten_calcium,molten_nickel,molten_copper,molten_zinc,gallium_gas,hydrogen,hydrogen,hydrogen,hydrogen,hydrogen,helium,helium,helium,helium AND CH:void", "XX" ], ["XX", "XX", "XX"] ]
elements.NeutronStar = {
  behavior: [["XX", "XX", "XX"], ["CR:light", "XX", "CR:light"], ["XX", "XX", "XX"]],
  name: "NeutronStar",
  category: "energy",
  maxSize: 1,
  color: "#ffffff",
  temp: 1000000000,
  tempLow: -100,
  insulate: true,
  noMix: true,
  movable: false,
  stateLow: "kilonova",
  reactions: {
    "NeutronStar": { "elem1": "kilonova", "temp1": 100000000, },
  },
  density: 10**17,
}
elements.acid.ignore.push("pipe");
elements.acid.ignore.push("gold");
elements.acid.ignore.push("gold_coin");
if(enabledMods.includes("mods/nousersthings.js")) {
  elements.acid.ignore.push("filter");
}
elements.acid.ignore.push("NaK");
elements.NaK = {
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  alias: "Sodium-Potassium alloy",
  color: "#848484",
  viscosity: 9.4,
  reactions: {
    "water": {
      func: function (pixel1, pixel2) {customExplosion(pixel1, pixel2, 5, ["fire", "fire", "pop", "hydrogen", "sodiumhydroxide", "potassiumhydroxide","sodiumhydroxide", "potassiumhydroxide","sodiumhydroxide", "potassiumhydroxide"])}
      },
    acid: {
      func: function (pixel1, pixel2) {customExplosion(pixel1, pixel2, 6, ["fire", "pop", "hydrogen", "water", "pop", "hydrogen", "hydrogen"])}
    },
    acidic_water: {
      func: function (pixel1, pel2) {customExplosion(pixel1, pixel2, 3, ["pop", "hydrogen", "hydrogen", "water","sodiumhyixdroxide", "potassiumhydroxide"])}
    },
    chloroauric_acid: { elem1: "gold",
      func: function (pixel1, pixel2) {customExplosion(pixel1, pixel2, 7, ["fire", "fire", "pop", "hydrogen", "gold_coin", "hydrogen", "pop"])}
    },
    liquid_chloroauric_acid: { elem1: "gold",
      func: function (pixel1, pixel2) {customExplosion(pixel1, pixel2, 7, ["fire", "fire", "pop", "hydrogen", "gold_coin", "hydrogen", "hydrogen", "pop"])}
    },
    nitric_acid:{
      func: function (pixel1, pixel2) {customExplosion(pixel1, pixel2, 6, ["fire", "fire", "pop", "hydrogen", "hydrogen", "pop"])}
    },
    aqua_regia: {
      func: function (pixel1, pixel2) {customExplosion(pixel1, pixel2, 9, ["fire", "fire", "pop", "hydrogen", "fire", "fire", "hydrogen", "pop", "flash"])}
    },
  },
  density: 868,
};
elements.rubidium = {
  behavior: behaviors.POWDER,
  category: "powders",
  name: "Rubidium",
  color: ["#9e9e9e", "#ababab", "#bababa", "#adadad"],
  tempHigh: 39.5,
  stateHigh: "moltenrubidium",
  reactions: {
    chlorine: { elem1: "rubidiumsalt" },
    acid: { explosion: "fire,rubidiumsalt,water", radius: 7, },
    aqua_regia: { explosion: "fire,rubidiumsalt,fire,water", radius: 8, },
    acidic_water: { explosion: "water,water,water,rubidiumsalt", radius: 3, },
    nitric_acid: { explosion: "fire,fire,hydrogen", radius: 7 },
    chloroauric_acid: { explosion: "fire,fire,hydrogen,gold_coin", radius: 7, },
    liquid_chloroauric_acid: { explosion: "fire,fire,hydrogen,gold_coin", radius: 7, },
    water: { explosion: "fire,rubidiumhydroxide", radius: 6 },
    },
  density: 1532,
  fireColor: "#d91e1e",
  tick: function(pixel) {
    pixel.burning = true;
  },
}
elements.moltenrubidium = {
  density: 1532,
  behavior: behaviors.LIQUID,
  viscosity: 8,
  name: "MoltenRubidium",
  category: "liquids",
  color: ["#adacac", "#adadad", "#c2c2c2", "#b8b8b8"],
  reactions: {
    chlorine: { elem1: "rubidiumsalt" },
    acid: { explosion: "fire,rubidiumsalt,water", radius: 7, },
    aqua_regia: { explosion: "fire,rubidiumsalt,fire,water", radius: 8, },
    acidic_water: { explosion: "water,water,water,rubidiumsalt", radius: 3, },
    nitric_acid: { explosion: "fire,fire,hydrogen", radius: 7 },
    chloroauric_acid: { explosion: "fire,fire,hydrogen,gold_coin", radius: 7, },
    liquid_chloroauric_acid: { explosion: "fire,fire,hydrogen,gold_coin", radius: 7, },
    water: { explosion: "fire,rubidiumhydroxide", radius: 6 },

    },
  fireColor: "#d91e1e",
  tick: function(pixel) {
    pixel.burning = true;
  },
  tempLow: 38,
  stateLow: "rubidium",
}

elements.rubidiumsalt = {
  state: "powder",
  name: "RubidiumSalt",
  alias: "Rubidium Chloride or RbCl",
  color: ["#e6e6e6", "#f5f5f5", "#fafafa", "#f0f0f0"],
  behavior: behaviors.POWDER,
  category: "powders",
  density: 2800,
}

elements.irradiate = {
      "color": "rgb(25,150,25)",
      "temp": 2,
      "category": "tools",
      "canPlace": false,
      "desc": "Use on irradiatable pixels to turn them radioactive.",
      "colorObject": {
          "r": 25,
          "g": 150,
          "b": 25
      },
  tool: function(pixel) {
        if (pixel.element == "lead") {
            changePixel(pixel, "uranium");
        } else if(pixel.element == "glass"){
          changePixel(pixel, "rad_glass");
        } else if (pixel.element == "steam"){
          changePixel(pixel, "rad_steam");
        }  else if (pixel.element == "cloud" || pixel.element == "rain_cloud"){
          changePixel(pixel, "rad_cloud");
        } else if (pixel.element == "water"){
          changePixel(pixel, "fallout");
        }
    },
  }
elements.deradiate = {
  name: "DE-radiate",
    "color": "rgb(255,255,255)",
    "temp": 2,
    "category": "tools",
    "canPlace": false,
    "desc": "Use on irradiatable pixels to turn them radioactive.",
    "colorObject": {
        "r": 25,
        "g": 150,
        "b": 25
    },
tool: function(pixel) {
      if (pixel.element == "uranium") {
          changePixel(pixel, "lead");
      } else if (pixel.element == "rad_glass") {
        changePixel(pixel, "glass");
      } else if (pixel.element == "rad_steam"){
        changePixel(pixel, "steam");
      } else if (pixel.element == "rad_cloud"){
        changePixel(pixel, "cloud");
      } else if (pixel.element == "fallout"){
        changePixel(pixel, "water");
      } else if (pixel.element == "radiation"){
        deletePixel(pixel.x, pixel.y);
      }
    },
};
elements.rubidiumhydroxide = {
  burn: 50,
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
  reactions: {
    chlorine: { elem1: "rubidiumsalt" },
    acid: { explosion: "fire,rubidiumsalt,water", radius: 7, },
    aqua_regia: { explosion: "fire,rubidiumsalt,fire,water", radius: 8, },
    acidic_water: { explosion: "water,water,water,rubidiumsalt", radius: 3, },
    nitric_acid: { explosion: "fire,fire,hydrogen", radius: 7 },
    chloroauric_acid: { explosion: "fire,fire,hydrogen,gold_coin", radius: 7, },
    liquid_chloroauric_acid: { explosion: "fire,fire,hydrogen,gold_coin", radius: 7, },
    },
    viscosity: 0.56,
    //tempHigh: 64.7,
    fireColor: "#d91e1e",
    category: "liquids",
    state: "liquid",
    density: 2.12,
    name: "RubidiumHydroxide",
    stateHigh: "rubidiumhydroxidecrystals",
    tempHigh: "1388",
}
elements.rubidiumhydroxidecrystals = {
  burn: 50,
  color: "#c9c5b1",
  behavior: behaviors.POWDER,
  reactions: {
    water: { elem1: null, elem2: "rubidiumhydroxide", },
    chlorine: { elem1: "rubidiumsalt" },
    acid: { explosion: "fire,rubidiumsalt,water", radius: 7, },
    aqua_regia: { explosion: "fire,rubidiumsalt,fire,water", radius: 8, },
    acidic_water: { explosion: "water,water,water,rubidiumsalt", radius: 3, },
    nitric_acid: { explosion: "fire,fire,hydrogen", radius: 7 },
    chloroauric_acid: { explosion: "fire,fire,hydrogen,gold_coin", radius: 7, },
    liquid_chloroauric_acid: { explosion: "fire,fire,hydrogen,gold_coin", radius: 7, },
    },
  fireColor: "#d91e1e",
  category: "powders",
  state: "powder",
  density: 2.12,
  name: "RubidiumHydroxideCrystals",
}
elements.esuperheater = {
  conduct: 1,
  color: '#dd1111',
  colorObject: {
        "r": 221,
        "g": 17,
        "b": 17
    },
  behavior: behaviors.WALL,
  behaviorOn: [
        [
            "XX",
            "HT:10",
            "XX"
        ],
        [
            "HT:10",
            "XX",
            "HT:10"
        ],
        [
            "XX",
            "HT:10",
            "XX"
        ]
    ],
  category: "machines",
  name: "e-superheater",
},
  elements.efreezer = {
    conduct: 1,
    color: '#ffffff',
    colorObject: {
          "r": 255,
          "g": 255,
          "b": 255
      },
    behavior: behaviors.WALL,
    behaviorOn: [
          [
              "XX",
              "CO:10",
              "XX"
          ],
          [
              "CO:10",
              "XX",
              "CO:10"
          ],
          [
              "XX",
              "CO:10",
              "XX"
          ]
      ],
    category: "machines",
    name: "e-freezer",
}
let num = 0;
elements.morechemmixer = {
    name: "MoreChemMixer",
    behavior: behaviors.WALL,
    category: "machines",
    noMix: true,
  onSelect: function(pixel) {
    let item = prompt("enter range for mixing.");
    if(/^\d+$/.test(item)){
      num = parseInt(item);
    } else {
      alert("that is not an integer.");
    }
  },
    tick: function(pixel) {
      if(pixel.start == pixelTicks) {
        pixel.range = num;
      }
      let range = mouseRange(pixel.x, pixel.y, pixel.range);
      mix(range);
    }
  }
let num1 = 0;
elements.morechemsmasher = {
    name: "MoreChemSmasher",
    behavior: behaviors.WALL,
    category: "machines",
    noMix: true,
  onSelect: function(pixel) {
    let item = prompt("enter range for smashing.");
    if(/^\d+$/.test(item)){
      num1 = parseInt(item);
    } else {
      alert("that is not an integer.");
    }
  },
    tick: function(pixel) {
      if(pixel.start == pixelTicks) {
        pixel.range = num1;
      }
      let range = mouseRange(pixel.x, pixel.y, pixel.range);
      smash(range);
    }
  }
let num2 = 0;
let exclude = [];
elements.specialsmasher = {
    name: "SpecialSmasher",
    behavior: behaviors.WALL,
    category: "machines",
    noMix: true,
  onSelect: function(pixel) {
    let item = prompt("enter range for smashing.");
    exclude = prompt("Enter elements to exclude, seperate them with commas.").replace(/\s/g, "").split(",");
    if(/^\d+$/.test(item)){
      num2 = parseInt(item);
    } else {
      alert("that is not an integer.");
    }
  },
    tick: function(pixel) {
      if(pixel.start == pixelTicks) {
        pixel.range = num2;
      }
      let range = mouseRange(pixel.x, pixel.y, pixel.range);
      smash(range, exclude);
    }
  }
let num3 = 0;
let exclude1 = [];
elements.specialmixer = {
    name: "SpecialMixer",
    behavior: behaviors.WALL,
    category: "machines",
    noMix: true,
  onSelect: function(pixel) {
    let item = prompt("enter range for mixing.");
    exclude = prompt("Enter elements to exclude, seperate them with commas.").replace(/\s/g, "").split(",");
    if(/^\d+$/.test(item)){
      num3 = parseInt(item);
    } else {
      alert("that is not an integer.");
    }
  },
    tick: function(pixel) {
      if(pixel.start == pixelTicks) {
        pixel.range = num3;
      }
      let range = mouseRange(pixel.x, pixel.y, pixel.range);
      mix(range, exclude);
    }
  }
let num4 = 0;
let exclude2 = [];
let property1 = "";
let value2 = "";
elements.propmachine = {
    name: "PropMachine",
    behavior: behaviors.WALL,
    category: "machines",
    noMix: true,
  onSelect: function(pixel) {
    let item = prompt("enter range for prop changing.");
    if(/^\d+$/.test(item)){
      num4 = parseInt(item);
    } else {
      alert("that is not an integer.");
    }
    exclude2 = prompt("Enter elements to exclude, seperate them with commas.").replace(/\s/g, "").split(",");
    exclude2.push("propmachine");
    var answer1 = prompt("Warning - This tool may break the simulator if used incorrectly.\n\nEnter a pixel attribute to modify:",(currentProp||undefined));
    if (!answer1) { return }
    var answer2 = prompt("Now, enter a value for "+answer1+":",(currentPropValue||undefined));
    if (!answer2) { return }
    var valueL = answer2.toLowerCase();
    if (valueL === "true") { answer2 = true }
    else if (valueL === "false") { answer2 = false }
    else if (valueL === "null") { answer2 = null }
    else if (valueL === "undefined") { answer2 = undefined }
    else if (answer1 === "color" && valueL[0] === "#") {
        var rgb = hexToRGB(valueL);
        answer2 = "rgb("+rgb.r+","+rgb.g+","+rgb.b+")";
    }
    currentProp = answer1;
    var num = parseFloat(answer2);
    if (!isNaN(num)) { answer2 = num }
    currentPropValue = answer2;
    logMessage("Prop: "+currentProp);
    logMessage("Value: "+currentPropValue);
  },
    tick: function(pixel) {
      if(pixel.start == pixelTicks) {
        pixel.range = num4;
      }
      let range = mouseRange(pixel.x, pixel.y, pixel.range);
      prop({ property: property1, value: value2 },range, exclude2);
    }
  }
let item = "";
elements.improvedsensor = {
  behavior: behaviors.WALL,
      color: "#bebfa3",
      onSelect: function(){
        item = prompt("what item should it detect?");
      },
      tick: function(pixel) {
        if(pixel.start == pixelTicks){
          pixel.clone = item;
        }

          for (var i = 0; i < adjacentCoords.length; i++) {
              var coords = adjacentCoords[i];
              var x = pixel.x + coords[0];
              var y = pixel.y + coords[1];
              if (!isEmpty(x,y,true)) {
                  var sensed = pixelMap[x][y];
                  if (sensed.element == pixel.clone) {
                      pixel.charge = 5;
                      break;
                  }
              }
          }
          doDefaults(pixel);
      },
      conduct: 1,
      movable: false,
      category:"machines",
      darkText: true,
  hardness: 1,

  };

elements.eincinerator = {
  conduct: 1,
  color: 'rgb(255, 70, 0)',
  colorObject: {
        "r": 240,
        "g": 10,
        "b": 0
    },
  behavior: behaviors.WALL,
  behaviorOn: [
        [
            "XX",
            "HT:100000",
            "XX"
        ],
        [
            "HT:100000",
            "XX",
            "HT:100000"
        ],
        [
            "XX",
            "HT:100000",
            "XX"
        ]
    ],
  category: "machines",
  name: "E-Incinerator",
  noMix: true,
}
elements.incinerator = {

  behavior: [
        [
            "XX",
            "HT:100000",
            "XX"
        ],
        [
            "HT:100000",
            "XX",
            "HT:100000"
        ],
        [
            "XX",
            "HT:100000",
            "XX"
        ]
    ],
  name: "Incinerator",
  category: "machines",
  colorObject: {
      "r": 255,
      "g": 50,
      "b": 0
  },
  color: 'rgb(255, 50, 0)',
  noMix: true,
}
function prop(obj, range, exclude = []){
  for (var i = 0; i < range.length; i++) {
  if (!isEmpty(range[i][0], range[i][1], true)) {
    var pixel = pixelMap[range[i][0]][range[i][1]];
    if (!exclude.includes(pixel.element)){
      if(/^\d+$/.test(obj.value)){
        obj.value = parseInt(obj.value);
      }
      if (!currentProp) { return }
      if (pixel[currentProp] !== undefined && typeof pixel[currentProp] !== typeof currentPropValue) {
          logMessage("Error: "+currentProp+" type is "+typeof pixel[currentProp]+", not "+typeof currentPropValue+".");
          currentProp = null;
          currentPropValue = null;
          return;
        }
      if (currentProp === "element") {
          changePixel(pixel, currentPropValue);
          return;
      }
      if (currentProp === "burning" && currentPropValue === "true") {
          pixel.burnStart = pixelTicks;
          return;
      }
        pixel[currentProp] = currentPropValue;
      }
    }
  }
}
function mix(range, exclude = []){
  let mixlist = [];
  for (var i = 0; i < range.length; i++) {
  var x = range[i][0];
  var y = range[i][1];
      if (!isEmpty(x,y,true)) {
          var pixel = pixelMap[x][y];
          if (elements[pixel.element].noMix !== true) {
              mixlist.push(pixel);
          }
      }
  }
  for (var i = 0; i < mixlist.length; i++) {
    var pixel1 = mixlist[Math.floor(Math.random()*mixlist.length)];
    var pixel2 = mixlist[Math.floor(Math.random()*mixlist.length)];
    if (exclude.includes(pixel1.element) || exclude.includes(pixel2.element)){
      mixlist.splice(mixlist.indexOf(pixel1),1);
      mixlist.splice(mixlist.indexOf(pixel2),1);
    } else {
      swapPixels(pixel1,pixel2);
      mixlist.splice(mixlist.indexOf(pixel1),1);
      mixlist.splice(mixlist.indexOf(pixel2),1);
      if (elements[pixel1.element].onMix) {
        elements[pixel1.element].onMix(pixel1,pixel2);
      }
      if (elements[pixel2.element].onMix ) {
        elements[pixel2.element].onMix(pixel2,pixel1);
      }
    }
  }
}
function smash(range, exclude = []){
  let smashlist = [];
  for (var i = 0; i < range.length; i++) {
  var x = range[i][0];
  var y = range[i][1];
      if (!isEmpty(x,y,true)) {
          var pixel = pixelMap[x][y];
          if (elements[pixel.element].noMix !== true) {
              smashlist.push(pixel);
          }
      }
  }
  for (var i = 0; i < smashlist.length; i++) {
    var pixel1 = smashlist[Math.floor(Math.random()*smashlist.length)];
    smashlist.splice(smashlist.indexOf(pixel1),1);
    if (elements[pixel1.element].breakInto && !exclude.includes(pixel1.element)) {
      if (Array.isArray(elements[pixel1.element].breakInto)){
        changePixel(pixelMap[pixel1.x][pixel1.y], elements[pixel1.element].breakInto[Math.floor(Math.random()*elements[pixel1.element].breakInto.length)])
      } else {
        changePixel(pixelMap[pixel1.x][pixel1.y], elements[pixel1.element].breakInto)
      }
    }
  }
}
function pull(range, pixel1, include = []){
  let pulllist = [];
  for (var i = 0; i < range.length; i++) {
  var x = range[i][0];
  var y = range[i][1];
      if (!isEmpty(x,y,true)) {
          var pixel = pixelMap[x][y];
          if (elements[pixel.element].noMix !== true) {
              pulllist.push(pixel);
          }
      }
  }
  for (var i = 0; i < pulllist.length; i++) {
    var pixel = pulllist[Math.floor(Math.random()*pulllist.length)];
    pulllist.splice(pulllist.indexOf(pixel),1);
    if (elements[pixel.element].movable != false && include.includes(pixel.element)) {
        for (var i = 0; i < pulllist.length; i++) {
            if (pixelInRange(pulllist[i], range)) {
              let Xdistance = pixel1.x - pixel.x;
              let Ydistance = pixel1.y - pixel.y;
              let newX = (Xdistance > pixel.x ? pixel.x + 3 : pixel.x + 1);
              let newY = (Ydistance > pixel.y ? pixel.y + 3 : pixel.y + 1);
              tryMove(pixel, newX, newY, undefined, false);
            }
          }
      }
    }
  }
