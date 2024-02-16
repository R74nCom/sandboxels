//This mod was made by Adora the transfem, https://discord.com/users/778753696804765696 on discord and https://www.tiktok.com/@alextheagenenby?_t=8hoCVI3NRhu&_r=1 on tiktok.
let fruits = ["plum", "peach", "pear", "orange", "apple", "cherry", "mango"];
let vineExclude = ["tomato", "grape", "fruit_vine", "kiwi"];
let vines = ['tomato', 'grape', 'kiwi'];
let bushes = ["blackberry", "blueberry", "raspberry"];
let allFruits = fruits.concat(vines, bushes)
function interpolateRgb(rgb1, rgb2, ratio) {
  const interpolatedRgb = {
    r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio),
    g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio),
    b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio),
  };
  return interpolatedRgb;
}

elements.fruit_branch = {
    color: elements.tree_branch.color,
    behavior: [
        "CR:fruit_leaves,fruit_branch%2|CR:fruit_leaves,fruit_leaves,fruit_leaves,fruit_branch%2|CR:fruit_leaves,fruit_branch%2",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    tempHigh: 100,
    stateHigh: "wood",
    tempLow: -30,
    stateLow: "wood",
    category: "life",
    burn: 40,
    burnTime: 50,
    burnInto: ["sap","ember","charcoal"],
    hidden: true,
    state: "solid",
    density: 1500,
    hardness: 0.15,
    breakInto: ["sap","sawdust"],
    seed: "apple_seed",
  tick: function(pixel){
    for(var i = 0; i < adjacentCoords.length; i++){
      let x = pixel.x+adjacentCoords[i][0];
      let y = pixel.y+adjacentCoords[i][1];
      if(isEmpty(x, y) || outOfBounds(x, y)) { continue; }
      let pixel2 = pixelMap[x][y];
      if(pixel2.element == "fruit_branch" || pixel2.element == "fruit_leaves" || pixel2.element == "wood"){
        if(pixel.fruit && !pixel2.fruit){
          pixel2.fruit = pixel.fruit;
        } else if (!pixel.fruit && pixel2.fruit){
          pixel.fruit = pixel2.fruit;
        }
      }
    }
  }
}
elements.fruit_leaves = {
    color: elements.plant.color,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 }
    },
    category:"life",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:65,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    hidden: true,
    tick: function(pixel){
      if(pixelTicks == pixel.start + 1 && pixel.blooming == undefined){
        if(Math.floor(Math.random() * 3) == 2){
          pixel.blooming = true;
          pixel.color = "#FFE2E2";
        } else {
          pixel.blooming = false;
        }
      }
      for(var i = 0; i < adjacentCoords.length; i++){
        let x = pixel.x+adjacentCoords[i][0];
        let y = pixel.y+adjacentCoords[i][1];
        if(isEmpty(x, y) || outOfBounds(x, y)) { continue; }
        let pixel2 = pixelMap[x][y];
        if(pixel2.element == "fruit_branch" || pixel2.element == "fruit_leaves" || pixel2.element == "wood" || (elements[pixel2.element].properties && elements[pixel2.element].properties.type == "fruit")){
            if(pixel.fruit && !pixel2.fruit){
              pixel2.fruit = pixel.fruit;
            } else if (!pixel.fruit && pixel2.fruit){
              pixel.fruit = pixel2.fruit;
          }
        }
      }
      if(pixel.blooming){
        if(pixelTicks > pixel.start + 150){
          if(Math.floor(Math.random() * 400) == 3){
            if(pixel.fruit){
              if(pixel.fruit == "random"){
                changePixel(pixel, fruits[Math.floor(Math.random() * fruits.length)]);
              } else {
                changePixel(pixel, pixel.fruit);
              }
            }
          }
        }
      }
  }
}

elements.apple_seed = {
    color: "#1A0E00",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves" || pixelMap[pixel.x][pixel.y+1].element == "wood"){
                      pixelMap[pixel.x][pixel.y+1].fruit = "apple";
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
      fruit:"apple"
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
};
elements.apple = {
  behavior: [["XX", "ST:fruit_leaves AND ST:fruit_branch", "XX"],["ST:fruit_leaves AND ST:fruit_branch", "XX", "ST:fruit_leaves AND ST:fruit_branch"],["M2", "ST:fruit_leaves AND ST:fruit_branch AND M1", "M2"]],
  color: "#ff0004",
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#FF4747",
  isFood: true,
  properties: {
    fruit: "apple",
    type: "fruit",
  }
}
elements.pear_seed = {
    color: "#1A0E00",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves"){
                      pixelMap[pixel.x][pixel.y+1].fruit = "pear";
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
      fruit:"pear"
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
};
elements.pear = {
  behavior: [["XX", "ST:fruit_leaves AND ST:fruit_branch", "XX"],["ST:fruit_leaves AND ST:fruit_branch", "XX", "ST:fruit_leaves AND ST:fruit_branch"],["M2", "ST:fruit_leaves AND ST:fruit_branch AND M1", "M2"]],
  color: "#97FF43",
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#ABFF8D",
  isFood: true,
  properties: {
    fruit: "pear",
    type: "fruit",
  }
}
elements.cherry_seed = {
    color: "#b56233",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves"){
                      pixelMap[pixel.x][pixel.y+1].fruit = "cherry";
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
      fruit:"cherry"
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
};
elements.cherry = {
  behavior: [["XX", "ST:fruit_leaves AND ST:fruit_branch", "XX"],["ST:fruit_leaves AND ST:fruit_branch", "XX", "ST:fruit_leaves AND ST:fruit_branch"],["M2", "ST:fruit_leaves AND ST:fruit_branch AND M1", "M2"]],
  color: "#750000",
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#8a0000",
  isFood: true,
  properties: {
    fruit: "cherry",
    type: "fruit",
  }
}
elements.milk = {
  color: "#fafafa",
  behavior: behaviors.LIQUID,
  onMix: function(milk1, milk2) {
    if (shiftDown && Math.random() < 0.01) {
        changePixel(milk1,"butter")
    }
  },
  reactions: {
    "melted_chocolate": { elem1:"chocolate_milk", elem2:null },
    "chocolate": { elem1:"chocolate_milk", elem2:"melted_chocolate", chance:0.05 },
    "coffee_ground": { elem1:"chocolate_milk", chance:0.05 },
    "juice": { elem1:"fruit_milk", elem2:null, chance:0.05, func: function(pixel1, pixel2){
      let newrgb = interpolateRgb(getRGB('rgb(250,250,250)'), getRGB(pixel2.color), 0.25);
      pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
    }},
    "soda": { elem1:"pilk", elem2:null, chance:0.1 },
    "yolk": { elem1:"eggnog", elem2:null, chance:0.1 },
    "dirt": { elem1: null, elem2: "mud" },
    "sand": { elem1: null, elem2: "wet_sand" },
    "clay_soil": { elem1: null, elem2: "clay" },
    "caramel": { color1:"#C8B39A", elem2:null, chance:0.05 },
    "sugar": { elem2:null, chance:0.005},
  },
  tempLow: 0,
  stateLow: "ice_cream",
  stateLowColorMultiplier: [0.97,0.93,0.87],
  tempHigh: 93,
  stateHigh: "yogurt",
  viscosity: 1.5,
  category: "liquids",
  state: "liquid",
  density: 1036.86,
  isFood: true
}
elements.cream = {
  color: "#f7f7f7",
  behavior: behaviors.LIQUID,
  onMix: function(milk1, milk2) {
      if ((shiftDown && Math.random() < 0.01) || (elements[milk2.element].id === elements.milk.id && Math.random() < 0.00025)) {
          changePixel(milk1,"butter")
      }
  },
  reactions: {
      "dirt": { elem1: null, elem2: "mud" },
      "sand": { elem1: null, elem2: "wet_sand" },
      "clay_soil": { elem1: null, elem2: "clay" },
      "melted_chocolate": { color1:"#664934", elem2:null },
      "chocolate": { color1:"#664934", elem2:"melted_chocolate", chance:0.05 },
      "juice": { elem1:"fruit_milk", elem2:null, chance:0.05, func: function(pixel1, pixel2){
                 let newrgb = interpolateRgb(getRGB('rgb(250,250,250)'), getRGB(pixel2.color), 0.25);
                 pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
               }},
      "soda": { elem1:"pilk", elem2:null, chance:0.1 },
      "yolk": { elem1:"#eggnog", elem2:null, chance:0.1 },
      "caramel": { color1:"#C8B39A", chance:0.05 },
      "sugar": { elem2:null, chance:0.005},
  },
  viscosity: 1.5,
  tempHigh: 1000,
  stateHigh: ["smoke","smoke","smoke","steam","steam","calcium"],
  tempLow: 0,
  stateLow: "ice_cream",
  stateLowColorMultiplier: 0.97,
  category: "liquids",
  hidden: true,
  isFood: true,
  state: "liquid",
  density: 959.97,
}
function getRGB(rgb){
  let rgb2 = rgb.replace(")", "").replace("rgb(", "").replace(/,/g, "r").split("r")
  return { r: parseInt(rgb2[0]), g: parseInt(rgb2[1]), b: parseInt(rgb2[2]) };
}
elements.peach = {
  behavior: [["XX", "ST:fruit_leaves AND ST:fruit_branch", "XX"],["ST:fruit_leaves AND ST:fruit_branch", "XX", "ST:fruit_leaves AND ST:fruit_branch"],["M2", "ST:fruit_leaves AND ST:fruit_branch AND M1", "M2"]],
  color: ["#ffb485", "#ffa770", "#ff7b61", "#ff512e", "#ff350d"],
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#ffa74f",
  isFood: true,
  properties: {
    fruit: "peach",
    type: "fruit",
  }
}
elements.peach_seed = {
    color: "#240c00",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves"){
                      pixelMap[pixel.x][pixel.y+1].fruit = "peach";
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
      fruit:"peach"
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
};
elements.plum = {
  behavior: [["XX", "ST:fruit_leaves AND ST:fruit_branch", "XX"],["ST:fruit_leaves AND ST:fruit_branch", "XX", "ST:fruit_leaves AND ST:fruit_branch"],["M2", "ST:fruit_leaves AND ST:fruit_branch AND M1", "M2"]],
  color: "#1c0030",
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#d2880a",
  isFood: true,
  properties: {
    fruit: "plum",
    type: "fruit",
  }
}
elements.plum_seed = {
    color: "#240c00",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves"){
                      pixelMap[pixel.x][pixel.y+1].fruit = "plum";
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
      fruit:"plum"
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
};
elements.juice.reactions.juice = {
  func: function(pixel1, pixel2){
    if(pixel1.color != pixel2.color){
      if(Math.floor(Math.random() * 1000) == 1){
      let newrgb = interpolateRgb(getRGB(pixel1.color), getRGB(pixel2.color), 0.5);
      pixel1.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
      pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
      }
    }
  }
}
elements.juice.onMix = function(pixel){
    let num = Math.floor(Math.random() * 4);
    let x = pixel.x + adjacentCoords[num][0];
    let y = pixel.y + adjacentCoords[num][1];
    if(!isEmpty(x,y) && !outOfBounds(x,y)){
      let pixel2 = pixelMap[x][y];
      if(pixel.color != pixel2.color && pixel2.element == "juice"){
        let condition;
        if(shiftDown == 0){
          condition = (Math.floor(Math.random() * 2) == 1); 
        } else {
          condition = true; 
        }
        if(condition){
          let newrgb = interpolateRgb(getRGB(pixel.color), getRGB(pixel2.color), 0.5);
          pixel.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
          pixel2.color = `rgb(${parseInt(newrgb.r)},${parseInt(newrgb.g)},${parseInt(newrgb.b)})`;
        }
      }
    }
  }
elements.vine.behavior = [["XX", "ST:vine", "XX"],["ST:vine", "XX", "ST:vine"],["XX", "ST:vine AND M1", "XX"]]
elements.apricot = {
  behavior: [["XX", "ST:fruit_leaves AND ST:fruit_branch", "XX"],["ST:fruit_leaves AND ST:fruit_branch", "XX", "ST:fruit_leaves AND ST:fruit_branch"],["M2", "ST:fruit_leaves AND ST:fruit_branch AND M1", "M2"]],
  color: ["#ffa100", "#FF5D00", "#FF7A00", "#FF9700"],
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#ffa836",
  isFood: true,
  properties: {
    fruit: "apricot",
    type: "fruit",
  }
}
elements.apricot_seed = {
    color: "#291300",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves"){
                      pixelMap[pixel.x][pixel.y+1].fruit = "apricot";
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
      fruit:"apricot"
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
};
elements.orange = {
  behavior: [["XX", "ST:fruit_leaves AND ST:fruit_branch", "XX"],["ST:fruit_leaves AND ST:fruit_branch", "XX", "ST:fruit_leaves AND ST:fruit_branch"],["M2", "ST:fruit_leaves AND ST:fruit_branch AND M1", "M2"]],
  color: "#FFB400",
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#FFDB00",
  isFood: true,
  properties: {
    fruit: "orange",
    type: "fruit",
  }
}
elements.orange_seed = {
    color: "#291300",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves"){
                      pixelMap[pixel.x][pixel.y+1].fruit = "orange";
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
      fruit:"orange"
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
};
elements.random_seed = {
    color: "#291300",
    tick: function(pixel) {
      if(pixel.start == pixelTicks){
        pixel.fruit = fruits[Math.floor(Math.random() * fruits.length)];
      }
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves"){
                      pixelMap[pixel.x][pixel.y+1].fruit = pixel.fruit;
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
};
elements.multi_seed = {
    color: "#291300",
    tick: function(pixel) {
      pixel.fruit = fruits[Math.floor(Math.random() * fruits.length)]
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves"){
                      pixelMap[pixel.x][pixel.y+1].fruit = "random";
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
};
elements.fruit_vine = {
  category: "life",
  color: elements.plant.color,
  behavior: [["XX", "ST:fruit_vine AND ST:wood", "XX"], ["ST:fruit_vine AND ST:wood", "XX", "ST:fruit_vine AND ST:wood"], ["XX", "ST:fruit_vine AND M1 AND ST:wood", "XX"]],
  properties: {
    age: 0,
  },
  tick: function(pixel){
    if(Math.floor(Math.random() * 100) == 1 && pixel.age > 25 && pixel.age < 500){
      for(var i = 0; i < squareCoords.length; i++){
        let x1 = pixel.x + squareCoords[i][0];
        let y1 = pixel.y + squareCoords[i][1];
        if(!isEmpty(x1,y1) && !outOfBounds(x1,y1) && !vineExclude.includes(pixelMap[x1][y1].element)){
          let randomNum = Math.floor(Math.random() * 4);
          let x2 = x1 + squareCoords[randomNum][0];
          let y2 = y1 + squareCoords[randomNum][1];
          if(isEmpty(x2,y2) && !outOfBounds(x2,y2)){
            createPixel("fruit_vine", x2, y2);
            pixelMap[x2][y2].fruit = pixel.fruit;
          }
        }
      }
    }
    pixel.age += 1;
    if(pixel.fruit){
      for(var i = 0; i < adjacentCoords.length; i++){
        let x = pixel.x + adjacentCoords[i][0];
        let y = pixel.y + adjacentCoords[i][1];
        if(isEmpty(x,y) && !outOfBounds(x,y) && Math.floor(Math.random() * 1000) == 5){
          createPixel(pixel.fruit, x, y);
        }
      }
    }
    if(!pixel.fruit){
      for(var i = 0; i < squareCoords.length; i++){
        let x = pixel.x + squareCoords[i][0];
        let y = pixel.y + squareCoords[i][1];
        if(isEmpty(x,y) || outOfBounds(x,y)){ continue; }
        let pixel2 = pixelMap[x][y];
        if(pixel2.fruit){
          pixel.fruit = pixel2.fruit;
        } else { continue; }
      }
    }
  }
}
elements.grape.behavior = [["XX", "ST:fruit_vine", "XX"], ["ST:fruit_vine", "XX", "ST:fruit_vine"], ["M2", "ST:fruit_vine AND M1", "M2"]];
elements.tomato.behavior = elements.grape.behavior;
elements.tomato_seed = {
  color: "#FFFAAD",
  category: "life",
  behavior: behaviors.POWDER,
  tick: function(pixel){
    if(pixel.age > 40){
      changePixel(pixel, "fruit_vine");
      pixel.fruit = "tomato";
    }
    pixel.age += 1;
  },
  properties: {
    age: 0,
  },
}
elements.grape_seed = {
  color: "#231A00",
  category: "life",
  behavior: behaviors.POWDER,
  tick: function(pixel){
    if(pixel.age > 40){
      changePixel(pixel, "fruit_vine");
      pixel.fruit = "grape";
    }
    pixel.age += 1;
  },
  properties: {
    age: 0,
  },
}
elements.kiwi = {
  behavior: elements.grape.behavior,
  color: "#403000",
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#21A800",
  isFood: true,
  properties: {
    type: "fruit",
  }
}
elements.kiwi_seed = {
  color: "#231A00",
  category: "life",
  behavior: behaviors.POWDER,
  tick: function(pixel){
    if(pixel.age > 40){
      changePixel(pixel, "fruit_vine");
      pixel.fruit = "kiwi";
    }
    pixel.age += 1;
  },
  properties: {
    age: 0,
  },
}
elements.bush_base = {
  color: elements.wood.color,
  behavior: [
    ["CR:bush_cane%25", "XX", "CR:bush_cane%25"],
    ["XX", "XX", "XX"],
    ["XX", "XX", "XX"]
  ],
  tempHigh: 100,
  stateHigh: "dead_plant",
  tempLow: -40,
  stateLow: "frozen_plant",
  burn: 65,
  burnTime: 15,
  category: "life",
  state: "solid",
  tick: function(pixel){
    let caneCoords = [[-1,-1],[1,-1]];
    for(var i = 0; i < caneCoords.length; i++){
      let x = pixel.x + caneCoords[i][0];
      let y = pixel.y + caneCoords[i][1];
      if(!isEmpty(x,y) && !outOfBounds(x,y)){
        let pixel2 = pixelMap[x][y];
        if(pixel2.element == "bush_cane" && !pixel2.fruit){
          pixel2.fruit = pixel.fruit;
        }
      } 
    }
  }
};
elements.bush_cane = {
  color: elements.wood.color,
  tick: function(pixel){
    if(pixel.age < 200 && Math.floor(Math.random() * 40) == 1){
      if(!outOfBounds(pixel.x,pixel.y-1)){
        if(isEmpty(pixel.x,pixel.y-1)){
          createPixel("bush_cane",pixel.x,pixel.y-1);
          if(pixel.fruit){
            let pixel2  = pixelMap[pixel.x][pixel.y-1];
            pixel2.fruit = pixel.fruit;
            pixel2.age = pixel.age;
          }
        }
      }
    }
    if(pixel.fruit && Math.floor(Math.random() * 400) == 1 && pixel.age > 200){
      for(var i = 0; i < adjacentCoords.length; i++){
        let x = pixel.x + adjacentCoords[i][0];
        let y = pixel.y + adjacentCoords[i][1];
        if(isEmpty(x,y) && !outOfBounds(x,y)){
          createPixel("fruit_leaves", x, y);
          pixelMap[x][y].fruit = pixel.fruit;
          pixel.blooming = trueFalse(1, 1)[Math.floor(Math.random() * 2)];
        }
      }
    }
    pixel.age += 1;
  },
  properties: {
    age: 0,
  },
  category: "life",
  tempLow: -2,
  stateLow: "frozen_plant",
}
function trueFalse(numTrue, numFalse){
  let list = [];
  for(var i = 0; i < numTrue; i++){
    list.push(true);
  }
  for(var i = 0; i < numFalse; i++){
    list.push(false);
  }
  return list;
}
elements.raspberry_seed = {
  color: "#ffe099",
  behavior: behaviors.STURDYPOWDER,
  category: "life",
  properties: {
    age: 0,
  },
  tick: function(pixel){
    if(pixel.age > 40){
      let x1 = pixel.x - 1;
      let y = pixel.y;
      let x2 = pixel.x + 1;
      if(isEmpty(x1,y) && !outOfBounds(x1,y)){
        createPixel("bush_base", x1, y);
        pixelMap[x1][y].fruit = "raspberry";
      }
      if(isEmpty(x2,y) && !outOfBounds(x2,y)){
        createPixel("bush_base", x2, y);
        pixelMap[x2][y].fruit = "raspberry";
      }
      if(!isEmpty(x1, y) && !isEmpty(x2, y)){
        deletePixel(pixel.x, pixel.y);
      }
    }
     pixel.age += 1;
  }
}
elements.raspberry = {
  behavior: [["XX", "ST:bush_cane", "XX"],["ST:bush_cane", "XX", "ST:bush_cane"],["M2", "ST:bush_cane AND M1", "M2"]],
  color: ["#b00009", "#bf000a", "#d10812", "#db1822"],
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#ff2b36",
  isFood: true,
  properties: {
    fruit: "raspberry",
    type: "fruit",
  }
}
elements.blueberry_seed = {
  color: "#ffe099",
  behavior: behaviors.STURDYPOWDER,
  category: "life",
  properties: {
    age: 0,
  },
  tick: function(pixel){
    if(pixel.age > 40){
      let x1 = pixel.x - 1;
      let y = pixel.y;
      let x2 = pixel.x + 1;
      if(isEmpty(x1,y) && !outOfBounds(x1,y)){
        createPixel("bush_base", x1, y);
        pixelMap[x1][y].fruit = "blueberry";
      }
      if(isEmpty(x2,y) && !outOfBounds(x2,y)){
        createPixel("bush_base", x2, y);
        pixelMap[x2][y].fruit = "blueberry";
      }
      if(!isEmpty(x1, y) && !isEmpty(x2, y)){
        deletePixel(pixel.x, pixel.y);
      }
    }
     pixel.age += 1;
  }
}
elements.blueberry = {
  behavior: [["XX", "ST:bush_cane", "XX"],["ST:bush_cane", "XX", "ST:bush_cane"],["M2", "ST:bush_cane AND M1", "M2"]],
  color: ["#01082b", "#060e3d", "#111b52", "#1e2866"],
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#726778",
  isFood: true,
  properties: {
    fruit: "blueberry",
    type: "fruit",
  }
}
elements.blackberry_seed = {
  color: "#ffe099",
  behavior: behaviors.STURDYPOWDER,
  category: "life",
  properties: {
    age: 0,
  },
  tick: function(pixel){
    if(pixel.age > 40){
      let x1 = pixel.x - 1;
      let y = pixel.y;
      let x2 = pixel.x + 1;
      if(isEmpty(x1,y) && !outOfBounds(x1,y)){
        createPixel("bush_base", x1, y);
        pixelMap[x1][y].fruit = "blackberry";
      }
      if(isEmpty(x2,y) && !outOfBounds(x2,y)){
        createPixel("bush_base", x2, y);
        pixelMap[x2][y].fruit = "blackberry";
      }
      if(!isEmpty(x1, y) && !isEmpty(x2, y)){
        deletePixel(pixel.x, pixel.y);
      }
    }
     pixel.age += 1;
  }
}
elements.blackberry = {
  behavior: [["XX", "ST:bush_cane", "XX"],["ST:bush_cane", "XX", "ST:bush_cane"],["M2", "ST:bush_cane AND M1", "M2"]],
  color: ["#0c0021", "#070014", "#080017", "#09001a"],
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#2e0000",
  isFood: true,
  properties: {
    fruit: "blackberry",
    type: "fruit",
  }
}
elements.mango = {
  behavior: [["XX", "ST:fruit_leaves AND ST:fruit_branch", "XX"],["ST:fruit_leaves AND ST:fruit_branch", "XX", "ST:fruit_leaves AND ST:fruit_branch"],["M2", "ST:fruit_leaves AND ST:fruit_branch AND M1", "M2"]],
  color: ["#d63a45", "#e97341", "#9d9f3e", "#e4791b"],
  category: "food",
  breakInto: "juice",
  breakIntoColor: "#ffa300",
  isFood: true,
  properties: {
    fruit: "mango",
    type: "fruit",
  }
}
elements.mango_seed = {
    color: "#240c00",
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (dirtPixel.element === "dirt" || dirtPixel.element === "mud" || dirtPixel.element === "sand" || dirtPixel.element === "wet_sand" || dirtPixel.element === "clay_soil" || dirtPixel.element === "mycelium") {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves"){
                      pixelMap[pixel.x][pixel.y+1].fruit = "mango";
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    },
    properties: {
        "age":0,
      fruit:"mango"
    },
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -2,
    stateLow: "frozen_plant",
    burn: 65,
    burnTime: 15,
    category: "life",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true,
};
elements.seed_maker = {
  category: "machines",
  behavior: behaviors.WALL,
  tick: function(pixel){
    for(var i = 0; i < adjacentCoords.length; i++){
      let x = pixel.x + adjacentCoords[i][0];
      let y = pixel.y + adjacentCoords[i][1]
      if(!isEmpty(x,y) && !outOfBounds(x,y)){
        let pixel2 = pixelMap[x][y];
        if(allFruits.includes(pixel2.element)){
          changePixel(pixel2, `${pixel2.element}_seed`)
        }
      }
    }
  }
}
