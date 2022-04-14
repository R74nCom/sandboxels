elements.granite = {
    color: ["#F3C3AD", "#F0AB75", "#DDA888", "#BD927E", "#998473", "#5C5E53", "#BD8366"],
    behavior: behaviors.WALL,
    category: "land",
    tempHigh: 1215,
    density: 2691,
    hardness: 0.75,
    breakInto: "granite_gravel",
};

elements.granite_gravel = {
    color: ["#E3B39D", "#E09B65", "#CD9878", "#AD826E", "#897463", "#4C4E43", "#AD7356", "#F3C3AD", "#F0AB75", "#DDA888", "#BD927E", "#998473", "#5C5E53", "#BD8366", "#FFD3BD", "#FFBB85", "#EDB898", "#CDA28E", "#A99483", "#6C6E63", "#CD9376"],
    behavior: behaviors.POWDER,
    category: "land",
    tempHigh: 1215,
    stateHigh: "molten_granite",
    density: 1320,
};

elements.molten_granite = {
  "reactions": {
    "magma": { "elem1": "molten_andesite", "elem2": "molten_andesite" },
    "ash": { "elem1": null, "elem2": "molten_slag" },
    "dust": { "elem1": null, "elem2": "molten_slag" },
  },
  "name": "granitic_magma",
  "color": ["#FFF457", "#FF9257", "#FF9200", "#FFD63B", "#FFAB3B", "#FF8000", "#FFD244", "#FFA844", "#FF7E00", "#FFB73F", "#FF923F", "#FF6E00", "#FFA53A", "#FF843A", "#FF6300", "#B8762A", "#B85E2A", "#B84700", "#FFA433", "#FF8333", "#FF6200"],
  "behavior": behaviors.MOLTEN,
  "temp": 1215,
  "tempLow": 1115,
  "stateLow": "granite",
  "viscosity": 10000,
  "hidden": true,
  "state": "liquid",
  "category": "molten",
  "density": 2421.9
};

elements.andesite = {
    color: ["#6F7575", "#C5C9CB", "#818787", "#797F7F", "#B5B9BA", "#6D7371", "#909696"],
    behavior: behaviors.WALL,
    category: "land",
    tempHigh: 1215,
    density: 2474, //it varies very widely, so I made the last 2 digits up.
    hardness: 0.75,
    breakInto: "andesite_gravel",
};

elements.andesite_gravel = {
    color: ['#5f6565', '#b5b9bb', '#717777', '#696f6f', '#a5a9aa', '#5d6361', '#808686', '#6f7575', '#c5c9cb', '#818787', '#797f7f', '#b5b9ba', '#6d7371', '#909696', '#7f8585', '#d5d9db', '#919797', '#898f8f', '#c5c9ca', '#7d8381', '#a0a6a6'],
    behavior: behaviors.POWDER,
    category: "land",
    tempHigh: 1260,
    stateHigh: "molten_andesite",
    density: 1214, //approximated from granite values
};

elements.molten_andesite = {
    "reactions": {
        "ash": { "elem1": null, "elem2": "molten_slag" },
        "dust": { "elem1": null, "elem2": "molten_slag" },
    },
    "name": "andesitic_magma",
    "color": ["#de923b", "#de753b", "#de5800", "#fffb66", "#ffc966", "#ff9700", "#ffa944", "#ff8744", "#ff6500", "#f29f40", "#f27f40", "#f25f00", "#ffe75d", "#ffb95d", "#ff8b00", "#da9039", "#da7339", "#da5600", "#ffbc4b", "#ff964b", "#ff7100"],
    "behavior": behaviors.MOLTEN,
    "temp": 1215,
    "tempLow": 1115,
    "stateLow": "andesite",
    "viscosity": 10000,
    "hidden": true,
    "state": "liquid",
    "category": "molten",
    "density": 2226.6
}

elements.magma.name = "basaltic_magma" //because it cools into basalt
