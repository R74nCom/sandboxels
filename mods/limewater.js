// first time coding... like ever. so bare with me


elements.limewater = {
  color: "#3baaff",
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  density: 2211,
  tempHigh: 100,
  stateHigh: ["steam", "slaked_lime"],
  tempLow: 0,
  stateLow: "limewater_ice",
  reactions: {"carbon_dioxide": {elem1: "calcium_carbonate_solution", elem2: null },
             },
};
elements.limewater_ice = {
  color: "#def0ff",
  behavior: behaviors.WALL,
  category: "solids",
  state: "solid",
  density: 2211,
  temp: -5,
  tempHigh: 2,
  stateHigh: "limewater",
};
elements.calcium_carbonate_ice = {
  color: ["#fffefc", "#ffffff"], 
  behavior: behaviors.WALL,
  category: "solids",
  state: "solid",
  density: 2710,
  temp: -5,
  tempHigh: 2,
  stateHigh: "calcium_carbonate_solution",
};
elements.calcium_carbonate_solution = {
  color: "#ffffff",
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  density: 2710,
  tempHigh: 100,
  stateHigh: ["steam", "calcium_carbonate"],
};

elements.calcium_carbonate = {
  color: ["#ffffff", "#e3e3e3"],
  behavior: behaviors.POWDER,
  category: "liquids",
  state: "liquid",
  density: 2710,//in kg/cm^3
  temp: 20,
  tempHigh: 825,
  stateHigh: "molten_calcium_carbonate",
  reactions: {"water": {elem1: "calcium_carbonate_solution", elem2:"calcium_carbonate_solution", temp1: 60, temp2: 60 },
                       },
};

elements.molten_calcium_carbonate = {
    color: ["#f5190a", "#d4180b", "#f5190a", "#423f3e"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "solid",
    density: 2710,
    temp: 900,
    tempLow: 820,
    viscosity: 100,
    stateLow: "calcium_carbonate",
    reactions: {"water": {elem1: "steam", elem2:"calcium_carbonate"},
                        },
};

if (!elements.water.reactions) { elements.water.reactions = {} }
elements.water.reactions.slaked_lime = { "elem1":"limewater", "elem2": "limewater"};
