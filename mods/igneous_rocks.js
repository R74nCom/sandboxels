//Phaneritic

    //Felsic: granite
elements.granite = {
    color: ["#F3C3AD", "#F0AB75", "#DDA888", "#BD927E", "#998473", "#5C5E53", "#BD8366"],
    behavior: behaviors.WALL,
    category: "land",
    tempHigh: 1215,
    stateHigh: "felsic_magma",
    density: 2691,
    hardness: 0.75,
    breakInto: "granite_gravel",
};

elements.granite_gravel = {
    color: ["#E3B39D", "#E09B65", "#CD9878", "#AD826E", "#897463", "#4C4E43", "#AD7356", "#F3C3AD", "#F0AB75", "#DDA888", "#BD927E", "#998473", "#5C5E53", "#BD8366", "#FFD3BD", "#FFBB85", "#EDB898", "#CDA28E", "#A99483", "#6C6E63", "#CD9376"],
    behavior: behaviors.POWDER,
    category: "land",
    tempHigh: 1215,
    stateHigh: "felsic_magma",
    density: 1320,
};

elements.felsic_magma = {
  "reactions": {
    "magma": { "elem1": "intermediate_magma", "elem2": "intermediate_magma" },
    "ash": { "elem1": null, "elem2": "molten_slag" },
    "dust": { "elem1": null, "elem2": "molten_slag" },
  },
  "name": "felsic magma",
  "color": ["#FFF457", "#FF9257", "#FF9200", "#FFD63B", "#FFAB3B", "#FF8000", "#FFD244", "#FFA844", "#FF7E00", "#FFB73F", "#FF923F", "#FF6E00", "#FFA53A", "#FF843A", "#FF6300", "#B8762A", "#B85E2A", "#B84700", "#FFA433", "#FF8333", "#FF6200"],
  "behavior": behaviors.MOLTEN,
  "temp": 1215,
  "tempLow": 800,
  "stateLow": ["rhyolite","rhyolite","rhyolite","granite"],
  "viscosity": 10000,
  "hidden": true,
  "state": "liquid",
  "category": "molten",
  "density": 2421.9
};

    //Intermediate: diorite
elements.diorite = {
    color: ["#E1E1E1","#B0A696","#707271","#434459","#242424"], //Extracted from image and blended
    //By Michael C. Rygel - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=31124755
    behavior: behaviors.WALL,
    category: "land",
    tempHigh: 1300,
    stateHigh: "intermediate_magma",
    density: 2822, //last 2 digits made up.
    hardness: 0.70, //bs'd from MH rel to granite
    breakInto: "diorite_gravel",
};

elements.diorite_gravel = {
    color: ["#F1F1F1","#E1E1E1","#D1D1D1","#C0B6A6","#B0A696","#A09686","#808281","#707271","#606261","#535469","#434459","#333449","#343434","#242424","#141414"],
    behavior: behaviors.POWDER,
    category: "land",
    tempHigh: 1260,
    stateHigh: "intermediate_magma",
    density: 1717, //approximated from granite values
};

elements.intermediate_magma = {
    "reactions": {
        "ash": { "elem1": null, "elem2": "molten_slag" },
        "dust": { "elem1": null, "elem2": "molten_slag" },
    },
    "name": "intermediate magma",
    "color": ["#FFFF70", "#FFE170", "#FFA800", "#FFCF4B", "#FFA64B", "#FF7C00", "#E08E38", "#E07238", "#E05500", "#86552C", "#86442C", "#863300", "#482D12", "#482412", "#481B00"],
    "behavior": behaviors.MOLTEN,
    "temp": 1215,
    "tempLow": 1115,
    "stateLow": ["andesite", "andesite", "andesite", "diorite"],
    "viscosity": 10000,
    "hidden": true,
    "state": "liquid",
    "category": "molten",
    "density": 2450,
}

    //Mafic: gabbro
elements.magma.name = "mafic magma" //because it cools into basalt
elements.rock.name = "gabbro" //based on it melting into mostly basalt, I am assuming that this is mafic magma cooling quickly, and thus assuming that the remainder is magma cooling more slowly into a phaneritic rock, and that woudld be gabbro
elements.magma.density = 2650

    //Ultramafic: peridotite
elements.peridotite = {
    color: ["#908557","#A29E78","#7F8044","#C6BC87","#8C8656","#7C7C40","#837840","#8B8B69"],
    behavior: behaviors.WALL,
    category: "land",
    tempHigh: 1400,
    stateHigh: "ultramafic_magma",
    density: 3347, //appr from https://agupubs.onlinelibrary.wiley.com/doi/abs/10.1029/GL003i009p00509#:~:text=Abstract,and%20the%20bulk%20rock%20analyses.
    hardness: 0.76,
    breakInto: "peridotite_gravel",
};

elements.peridotite_gravel = {
    color: ["#807547","#928e68","#6f7034","#b6ac77","#7c7646","#6c6c30","#736830","#7b7b59","#908557","#a29e78","#7f8044","#c6bc87","#8c8656","#7c7c40","#837840","#8b8b69","#a09567","#b2ae88","#8f9054","#d6cc97","#9c9666","#8c8c50","#938850","#9b9b79"],
    behavior: behaviors.POWDER,
    category: "land",
    tempHigh: 1400,
    stateHigh: "ultramafic_magma",
    density: 1681,
};

elements.ultramafic_magma = {
  "reactions": {
    "magma": { "elem1": "intermediate_magma", "elem2": "intermediate_magma" },
    "ash": { "elem1": null, "elem2": "molten_slag" },
    "dust": { "elem1": null, "elem2": "molten_slag" },
  },
  "name": "ultramafic magma",
  "color": ["#ffa62b","#ff852b","#ff6300","#ffc53c","#ff9e3c","#ff7600","#fea022","#fe8022","#fe6000","#ffeb43","#ffbc43","#ff8d00","#ffa72b","#ff862b","#ff6400","#f89b20","#f87c20","#f85d00","#ff9620","#ff7820","#ff5a00","#ffad34","#ff8b34","#ff6800"],
  "behavior": behaviors.MOLTEN,
  "temp": 1500,
  "tempLow": 1390,
  "stateLow": ["peridotite","komatiite","komatiite","komatiite"],
  "viscosity": 100, //its viscosity is really ******* low for magma
  "hidden": true,
  "state": "liquid",
  "category": "molten",
  "density": 2800
};

//Aphanitic

    //Felsic: rhyolite
elements.rhyolite = {
    color: ["#A67153","#BF967E","#D9B5A0","#8C533E","#C99F86","#C5997E","#BB8A69"],
    // also from one of Michael C. Rygel's images
    behavior: behaviors.WALL,
    category: "land",
    tempHigh: 800,
    stateHigh: "felsic_magma",
    density: 2555, //very wide range
    hardness: 0.75,
    breakInto: "rhyolite_gravel",
};

elements.rhyolite_gravel = {
    color: ["#B68163","#A67153","#966143","#CFA68E","#BF967E","#AF866E","#E9C5B0","#D9B5A0","#C9A590","#9C634E","#8C533E","#7C432E","#D9AF96","#C99F86","#B98F76","#D5A98E","#C5997E","#B5896E","#CB9A79","#BB8A69","#DB7A59"],
    behavior: behaviors.POWDER,
    category: "land",
    tempHigh: 800,
    stateHigh: "felsic_magma",
    density: 1254, //approximated from granite values
};

    //Intermediate: andesite
elements.andesite = {
    color: ["#6F7575", "#C5C9CB", "#818787", "#797F7F", "#B5B9BA", "#6D7371", "#909696"],
    behavior: behaviors.WALL,
    category: "land",
    tempHigh: 1215,
    stateHigh: "intermediate_magma",
    density: 2474, //it varies very widely, so I made the last 2 digits up.
    hardness: 0.75,
    breakInto: "andesite_gravel",
};

elements.andesite_gravel = {
    color: ['#5f6565', '#b5b9bb', '#717777', '#696f6f', '#a5a9aa', '#5d6361', '#808686', '#6f7575', '#c5c9cb', '#818787', '#797f7f', '#b5b9ba', '#6d7371', '#909696', '#7f8585', '#d5d9db', '#919797', '#898f8f', '#c5c9ca', '#7d8381', '#a0a6a6'],
    behavior: behaviors.POWDER,
    category: "land",
    tempHigh: 1260,
    stateHigh: "intermediate_magma",
    density: 1214, //approximated from granite values
};

    //Mafic: basalt
//No changes from vanilla

    //Ultramafic: komatiite
elements.komatiite = {
    color: ["#AEB5AE","#A9B8B5","#7B8881","#858B87","#949F97","#505B55"],
    behavior: behaviors.WALL,
    category: "land",
    tempHigh: 1600,
    stateHigh: "ultramafic_magma",
    density: 3100, //approximate density extrapolated from intermediate and mafic density
    //the magma's density is more well-known but there's nothing on the solid rock
    hardness: 0.75,
    breakInto: "komatiite_gravel",
};

elements.komatiite_gravel = {
    color: ["#9ea59e","#99a8a5","#6b7871","#757b77","#848f87","#404b45","#aeb5ae","#a9b8b5","#7b8881","#858b87","#949f97","#505b55","#bec5be","#b9c8c5","#8b9891","#959b97","#a4afa7","#606b65"],
    behavior: behaviors.POWDER,
    category: "land",
    tempHigh: 1600,
    stateHigh: "ultramafic_magma",
    density: 1650, //approximated from granite values
};

//Vesicular

    //Felsic: pumice
//Pumice

    //Intermediate: scoria
//Scoria

    //Mafic: still scoria
//Also scoria

    //Ultramafic: ???
//???

//Glassy

    //Felsic: obsidian
//Obsidian

    //Intermediate: ???
//???

    //Mafic: ???
//???

    //Ultramafic: ???
//???
