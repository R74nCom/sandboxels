//This mod was made by Alex the transfem, https://discord.com/users/778753696804765696 on discord and https://www.tiktok.com/@alextheagenenby?_t=8hoCVI3NRhu&_r=1 on tiktok.
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
    name: "Sodium Hydroxide",
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
    name: "Sodium Hydroxide Crystals",
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
  name: "Molten Magnesium",
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
    name: "Acid Water",
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
  name: "Chloroauric Acid",
  color: "#ba7b00",
  tempHigh: 60,
  stateHigh: "liquid_chloroauric_acid",
}
elements.liquid_chloroauric_acid = {
  behavior: behaviors.LIQUID,
  category: "states",
  state: "liquid",
  name: "Liquid Chloroauric Acid",
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
  name: "Nitrogen Oxide",
  color: "#961400",
  reactions: {
    "water": { "elem1": null, "elem2": "nitric_acid", },
  }
}
elements.nitric_acid = {
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  name: "Nitric Acid",
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
      name: "Aqua Regia",
      "alias": "HCl + HN03",
      "movable": true,
      "color": "#ffdd9b",
  }
elements.potassium = {
  behavior: behaviors.SOLID,
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
    name: "Potassium Hydroxide",
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
    name: "Potassium Hydroxide Crystals",
}
elements.supercooler = {
  name: "Super Cooler",
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
  name: "Iron Chloride",
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
  name: "Aluminum Chloride",
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
  name: "Zinc Chloride",
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
}
elements.kilonova.behavior = [ ["XX","XX","XX"],["XX","EX:80>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,explosion,explosion,explosion,molten_gold,molten_uranium,molten_lead,oxygen,molten_sodium,neon,chlorine,molten_calcium,molten_nickel,molten_copper,molten_zinc,gallium_gas,molten_silver,hydrogen,helium,nitrogen,nitrogen_oxide,water AND CH:void","XX"],["XX","XX","XX"]]
