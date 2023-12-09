//This mod was made by Alex the transfem, https://discord.com/users/778753696804765696 on discord and https://www.tiktok.com/@alextheagenenby?_t=8hoCVI3NRhu&_r=1 on tiktok.
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
    if (r.elem1 !== undefined) {
        // if r.elem1 is an array, set elem1 to a random element from the array, otherwise set it to r.elem1
        if (Array.isArray(r.elem1)) {
            var elem1 = r.elem1[Math.floor(Math.random() * r.elem1.length)];
            if(elem1 == "customExplosion"){
              if(r.items !== undefined){
                elements.customExplosion.rItems = r.items
              } else{
                return false;
              }
            }
        } else { 
          var elem1 = r.elem1;
          if(elem1 == "customExplosion"){
            if(r.items !== undefined){
              elements.customExplosion.rItems = r.items
            } else{
              return false;
            }
          }
        }

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
        "acid_water": { "elem1": null, "elem2": ["water", "pop"], },
        "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "hydrogen"], },
        "chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "fire", "pop"], },
    },
    viscosity: 0.56,
    //tempHigh: 64.7,
    fireColor: "#fba600",
    category: "liquids",
    state: "liquid",
    density: 2130,
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
        "acid_water": { "elem1": null, "elem2": ["water", "pop"], },
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
  "aqua_regia": { "elem1": null, "elem2": ["fire", "pop", "fire", "fire", "hydrogen"], },
  "acid_water": { "elem1": null, "elem2": ["water", "pop", "pop"], },
  "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "pop", "hydrogen"], },
  "chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "fire", "pop"], },
  }
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
  tempLow: 600
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
}
elements.acid.ignore.push("magnesium");
elements.acid.ignore.push("sodiumhydroxide");
elements.acid.ignore.push("sodiumhydroxidecrystals");
elements.acid.ignore.push("water");
elements.acid.ignore.push("acidic_water");
elements.acid.ignore.push("gold");
elements.acid.ignore.push("chloroauric_acid");
elements.acid.ignore.push("nitric_acid");
elements.acid.ignore.push("aqua_regia");
elements.cwall = {
      "color": "rgb(128,128,128)",
      "name": "Conductive Wall",
      "behavior": [
          [
              "XX",
              "XX",
              "XX"
          ],
          [
              "XX",
              "XX",
              "XX"
          ],
          [
              "XX",
              "XX",
              "XX"
          ]
      ],
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
}
elements.nitrogen_oxide = {
  behavior: behaviors.GAS,
  category: "gases",
  state: "gas",
  name: "NitrogenOxide",
  color: "#961400",
  reactions: {
    "water": { "elem1": null, "elem2": "nitric_acid", },
  }
}
elements.nitric_acid = {
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  name: "NitricAcid",
  color: "#ffffff",
  reactions: { "acid": { "elem1": null, "elem2": "aqua_regia",}, },
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
  }
elements.potassium = {
  behavior: behaviors.POWDER,
  color: ["#545454", "#737373", "#7d7d7d", "#8f8f8f"],
  "category": "solids",
  "state": "solid",
  "alias": "K",
  reactions: {
    "water": { "elem1": "potassiumhydroxide", "elem2": ["fire", "fire", "pop", "water"], },
    "acid": { "elem1": null, "elem2": ["water", "smoke", "fire"], },
    "acid": { "elem2":"fire", },
    "acid": { "elem2":"fire", },
    "acid_gas": { "elem1": null, "elem2": ["water", "smoke", "fire"], },
    "acid_gas": { "elem2":"fire", },
    "acid_gas": { "elem2":"fire", },
    "aqua_regia": { "elem1": null, "elem2": ["fire", "pop", "pop", "fire", "fire", "hydrogen"], },
    "acid_water": { "elem1": null, "elem2": ["water", "pop", "pop"], },
    "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "fire", "pop", "hydrogen"], },
    "chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "fire", "pop", "pop"], },
  },
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
        "acid_water": { "elem1": null, "elem2": ["water", "pop", "pop"], },
        "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "fire", "pop", "hydrogen"], },
        "chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "pop"], }
    },
    viscosity: 0.56,
    //tempHigh: 64.7,
    fireColor: "#fba600",
    category: "liquids",
    state: "liquid",
    density: 2130,
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
        "acid_water": { "elem1": null, "elem2": ["water", "pop", "pop"], },
        "nitric_acid": { "elem1": null, "elem2": ["fire", "pop", "fire", "pop", "hydrogen"], },
        "chloroauric_acid": {"elem1": "gold", "elem2": ["fire", "fire", "pop", "pop"], },
    },
    //tempHigh: 64.7,
    fireColor: "#fba600",
    category: "powders",
    state: "powder",
    density: 2130,
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
elements.supernova.behavior = [ ["XX", "XX", "XX"], [ "XX", "EX:80>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,oxygen,molten_sodium,sulfur_gas,neon,chlorine,molten_calcium,molten_nickel,molten_copper,molten_zinc,gallium_gas AND CH:NeutronStar", "XX" ], ["XX", "XX", "XX"] ]
elements.kilonova.behavior = [ ["XX", "XX", "XX"], [ "XX", "EX:200>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead,oxygen,molten_sodium,molten_gold,molten_tungsten,sulfur_gas,neon,chlorine,molten_calcium,molten_nickel,molten_copper,molten_zinc,gallium_gas AND CH:void", "XX" ], ["XX", "XX", "XX"] ]
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
}
elements.acid.ignore.push("pipe");
elements.acid.ignore.push("gold");
elements.acid.ignore.push("gold_coin");
if(enabledMods.includes("mods/nousersthings.js")) {
  elements.acid.ignore.push("filter");
}
if(!enabledMods.includes("mods/customexplosion.js")){
  alert("This mod needs customexplosion.js to work. Without enabling it you may run into some issues, Please enable it in the mods menu.");
}

elements.NaK = {
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  alias: "Sodium-Potassium alloy",
  color: "#848484",
  reactions: {
    "water": {
      elem1: "customExplosion", items: "EX:6>fire,fire,hydrogen,pop,sodiumhydroxide,potassiumhydroxide",
    }
  },
};
