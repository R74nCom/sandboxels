elements.zogron = {
    color: ["#ebde34", "#34dbeb", "#ebe834"],
    colorPattern: [
        "00055400",
        "01111120",
        "02111210",
        "41152110",
        "01121110",
        "01211410",
        "02151113",
        "00000000",
    ],
    colorKey: {
        "0": "#ebde34",
        "1": "#dbeb34",
        "2": "#ebe834",
        "3": "#3d34eb",
        "4": "#34dbeb",
        "5": "#34ebb7",
    },
    behavior: behaviors.WALL,
    category: "Blocks",
}

elements.roro = {
    color: ["#000000", "#F00000"],
    colorPattern: [
        "10000001",
        "01111000", 
        "00111100",
        "00011110",
        "00001111",
        "00011110",
        "00111100",  
        "01111000",
    ],
    colorKey: {
        "0": "#000000",
        "1": "#F00000" 
    },
    behavior: behaviors.WALL,
    category: "Blocks",
}

elements.foldtos = {
    color: ["#00FF00", "#0000FF"],
    colorPattern: [
      "00100010",
      "00100010",
      "01111110",
      "00100010", 
      "00100010",
      "00100010",
      "01111110",
      "00100010"
    ],
    colorKey: {
      "0": "#00FF00",
      "1": "#0000FF"
    },
    behavior: behaviors.WALL,
    category: "Blocks"
  };

  elements.toyus = {
    color: ["#FFFF00", "#00FF00", "#FFA500"],  
    colorPattern: [
      "02101210",
      "01210102",
      "02101210", 
      "00120210",
      "01201012",
      "01021021",
      "02101210",
      "00120210"
    ],
    colorKey: {
      "0": "#FFFF00", 
      "1": "#00FF00",
      "2": "#FFA500"
    },
    behavior: behaviors.WALL,
    category: "Blocks"
  };

  elements.slingus = {
    color: ["#800080", "#0000FF", "#ADD8E6", "#FF69B4"],
    colorPattern: [
      "01233210",  
      "12310213",
      "23012301",
      "30121230",
      "12302312",
      "23101203",
      "30120123",
      "01233210"
    ],  
    colorKey: {
      "0": "#800080",
      "1": "#0000FF", 
      "2": "#ADD8E6",
      "3": "#FF69B4"
    },
    behavior: behaviors.WALL,
    category: "Blocks"
  };

  elements.slingus_maximus = {
    color: ["#800080", "#0000FF", "#ADD8E6", "#FF69B4"],
    colorPattern: [
      "11111223",  
      "11112233",
      "11122233",
      "11222233",
      "12222333",
      "22223333",
      "22233333",
      "22333333"
    ],  
    colorKey: {
      "0": "#800080",
      "1": "#0000FF", 
      "2": "#ADD8E6",
      "3": "#FF69B4"
    },
    behavior: behaviors.WALL,
    category: "Blocks"
  };

  elements.slinkusy = {
    color: ["#4B0082", "#0000FF", "#6495ED", "#FF1493"],
    colorPattern: [
        "01223201",
        "01223102",
        "01022301",
        "01022301",
        "01223102",
        "01223201",
        "01223201",
        "01223102" 
    ],
    colorKey: {
      "0": "#4B0082",
      "1": "#0000FF",
      "2": "#6495ED",
      "3": "#FF1493"
    },
    behavior: behaviors.WALL,
    category: "Blocks"
  };

  worldgentypes.Mixy_blocks1 = {
    layers: [
        [0.75, "slinkusy"],
        [0.15, "toyus"],
        [0.05, "foldtos"],
        [0.0, "roro"],
    ],
    decor: [
        ["zogron", 0.04, 20],
        ["slingus_maximus", 0.25, 30],
    ],
    baseHeight: 0.25
}