// CreateTree function made by nousernamefound.
function createTree(treeName, leafColor, woodName){
    let woodColor = elements[woodName].color
    elements[treeName + "_sapling"] = {
        color: leafColor,
        tick: function(pixel) {
            if (!tryMove(pixel,pixel.x,pixel.y+1)) {
                if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                    if (!outOfBounds(pixel.x,pixel.y+1)) {
                        var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                        if (dirtPixel && (eLists.SOIL.indexOf(dirtPixel.element) !== -1 || dirtPixel.element === "grass")) {
                            changePixel(dirtPixel,"root");
                        }
                    }
                    if (isEmpty(pixel.x,pixel.y-1)) {
                        if (!pixel.wc) {
                            pixel.wc = woodColor;
                            pixel.lc = leafColor;
                        }
                        movePixel(pixel,pixel.x,pixel.y-1);
                        createPixel(Math.random() > 0.5 ? woodName : (treeName + "_branch"),pixel.x,pixel.y+1);
                        pixelMap[pixel.x][pixel.y+1].wc = pixel.wc;
                        pixelMap[pixel.x][pixel.y+1].lc = pixel.lc;
                        pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1], pixel.wc);
                    }
                }
                else if (pixel.age > 1000 && Math.random() < 0.05) {
                    changePixel(pixel,woodName);
                    pixel.color = pixelColorPick(pixel, pixel.wc);
                }
                pixel.age++;
            }
            doDefaults(pixel);
        },
        properties: {
            "age":0
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
    }
    elements[treeName + "_branch"] = {
      color: woodColor,
      tick: function(pixel) {
          if (!pixel.burning) {
              if (!pixel.lc) { pixel.lc = leafColor }
              if (!pixel.wc) { pixel.wc = woodColor }
              if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.02) {
                  if (Math.random() < 0.5) {
                      createPixel("plant",pixel.x-1,pixel.y-1);
                      pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.lc);
                  }
                  else {
                      createPixel(treeName + "_branch",pixel.x-1,pixel.y-1);
                      pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.wc);
                      pixelMap[pixel.x-1][pixel.y-1].wc = pixel.wc;
                      pixelMap[pixel.x-1][pixel.y-1].lc = pixel.lc;
                  }
              }
              if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.02) {
                  if (Math.random() < 0.5) {
                      createPixel("plant",pixel.x+1,pixel.y-1);
                      pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.lc);
                  }
                  else {
                      createPixel(treeName + "_branch",pixel.x+1,pixel.y-1);
                      pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.wc);
                      pixelMap[pixel.x+1][pixel.y-1].wc = pixel.wc;
                      pixelMap[pixel.x+1][pixel.y-1].lc = pixel.lc;
                  }
              }
              if (isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.02) {
                  if (Math.random() < 0.75) {
                      createPixel("plant",pixel.x,pixel.y-1);
                      pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.lc);
                  }
                  else {
                      createPixel(treeName + "_branch",pixel.x,pixel.y-1);
                      pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.wc);
                      pixelMap[pixel.x][pixel.y-1].wc = pixel.wc;
                      pixelMap[pixel.x][pixel.y-1].lc = pixel.lc;
                  }
              }
          }
          doDefaults(pixel);
      },
      movable: false,
      tempHigh: 100,
      stateHigh: woodName,
      tempLow: -30,
      stateLow: woodName,
      category: "life",
      burn: 2,
      burnTime: 300,
      burnInto: ["sap","ember","charcoal","smoke"],
      hidden: true,
      state: "solid",
      density: 1500,
      hardness: 0.15,
      breakInto: ["sap","sawdust"],
      seed: treeName + "_sapling",
      forceSaveColor: true
    }
  }

elements.red_wood = {
    density: 450,
    burnTime: 100,
    burn: 15,
    color: "#D4381E",
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.7, // A highly durable wood
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.pine_wood = {
    density: 550,
    burnTime: 125,
    burn: 20,
    color: ["#D59F71", "#BC7852", "B46F4C", "#D59F71"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.4, // Medium hardness
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.oak = {
    density: 700,
    burnTime: 150,
    burn: 30,
    color: ["#ECCCAC", "C2965F", "D29A67", "B07C4F", "CAA06E"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.8, // Exceptionally hard and durable
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.birch = {
    density: 670,
    burnTime: 175,
    burn: 25,
    color: ["#FFFFFF", "#000000", "#FFFFFF"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.6, // Relatively hard
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.cherry_wood = {
    density: 400,
    burnTime: 100,
    burn: 10,
    color: ["#8E3D27", "#A44B2B", "#883B29"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.3, // Relatively soft
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.maple_wood = {
    density: 600,
    burnTime: 175,
    burn: 25,
    color: ["#DAA520", "#C68E17", "#FFD700"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.7, // Durable and dense
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.walnut_wood = {
    density: 750,
    burnTime: 225,
    burn: 30,
    color: ["#5A4522", "#3E2E1F", "#8B5A2B"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.9, // Extremely hard and dense
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.mahogany = {
    density: 800,
    burnTime: 250,
    burn: 35,
    color: ["#C04000", "#7B3F00", "#88441C"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.85, // Very hard and resistant to decay
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.cedar = {
    density: 480,
    burnTime: 150,
    burn: 20,
    color: ["#B8860B", "#CD853F", "#8B4513"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.5, // Moderately hard and lightweight
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.ash_wood = {
    density: 620,
    burnTime: 100,
    burn: 25,
    color: ["#A52A2A", "#D2691E", "#8B4513"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.6, // Hardwood with good shock resistance
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.poplar_wood = {
    density: 420,
    burnTime: 120,
    burn: 15,
    color: ["#9E8040", "#BEBD7F", "#D7D4BB"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.4, // Softwood with low density
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.fir_wood = {
    density: 560,
    burnTime: 130,
    burn: 20,
    color: ["#B4CDCD", "#8B9CA9", "#CED1D9"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.5, // Medium hardness and lightweight
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.teak = {
    density: 660,
    burnTime: 180,
    burn: 30,
    color: ["#B5651D", "#704214", "#8B4513"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.7, // High natural oil content and durability
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.spruce = {
    density: 480,
    burnTime: 110,
    burn: 15,
    color: ["#8B4513", "#B8860B", "#CD853F"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.5, // Moderately hard and lightweight
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.cypress_wood = {
    density: 520,
    burnTime: 140,
    burn: 20,
    color: ["#827A68", "#6B4226", "#A0522D"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.6, // Medium hardness with good decay resistance
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.beech_wood = {
    density: 670,
    burnTime: 160,
    burn: 25,
    color: ["#F0DC82", "#C0C0C0", "#9C661F"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.7, // Hardwood with good strength and wear resistance
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.sapele = {
    density: 670,
    burnTime: 150,
    burn: 25,
    color: ["#8B4513", "#FF4500", "#CD853F"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.8, // Hardwood with good stability and workability
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.pear_wood = {
    density: 670,
    burnTime: 160,
    burn: 20,
    color: ["#FFD700", "#CD853F", "#FF6347"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.6, // Hardwood with fine grain and smooth texture
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.hickory = {
    density: 800,
    burnTime: 200,
    burn: 30,
    color: ["#664C28", "#8B6914", "#8B4513"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.9, // Extremely hard and dense
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.sycamore = {
    density: 530,
    burnTime: 140,
    burn: 20,
    color: ["#F4A460", "#F0E68C", "#A0522D"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.5, // Medium hardness and lightweight
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.willow_wood = {
    density: 380,
    burnTime: 100,
    burn: 10,
    color: ["#C19A6B", "#8B4513", "#CD853F"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.3, // Softwood with low density
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.zebra_wood = {
    density: 800,
    burnTime: 220,
    burn: 30,
    color: ["#F0DC82", "#8B4513", "#FFD700"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.9, // Extremely hard and dense
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.basswood = {
    density: 410,
    burnTime: 110,
    burn: 15,
    color: ["#D2B48C", "#DEB887", "#F5F5DC"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.4, // Softwood with low density
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.larch_wood = {
    density: 590,
    burnTime: 130,
    burn: 20,
    color: ["#C9AE5D", "#E0C49D", "#9C661F"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.6, // Medium hardness with good durability
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.silver_maple = {
    density: 560,
    burnTime: 140,
    burn: 25,
    color: ["#C0C0C0", "#D3D3D3", "#BEBEBE"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.5, // Moderate hardness and lightweight
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.balsam_fir = {
    density: 460,
    burnTime: 120,
    burn: 15,
    color: ["#B4CDCD", "#8B9CA9", "#CED1D9"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.4, // Softwood with moderate hardness
    breakInto: "sawdust",
    burnInto: "ash"
};

elements.elm_wood = {
    density: 560,
    burnTime: 140,
    burn: 20,
    color: ["#8B4513", "#228B22", "#CD5C5C"],
    category: "solids",
    behavior: behaviors.WALL,
    state: "solid",
    hardness: 0.6, // Medium hardness and lightweight
    breakInto: "sawdust",
    burnInto: "ash",
};

createTree("red_wood", "#2E6E4E", "red_wood");
createTree("pine", "#D59F71", "pine_wood");
createTree("oak", "#ECCCAC", "oak");
createTree("birch", "#FFFFFF", "birch");
createTree("cherry_blossom", "#8E3D27", "cherry_wood");
createTree("maple", "#DAA520", "maple_wood");
createTree("walnut", "#5A4522", "walnut_wood");
createTree("mahogany", "#C04000", "mahogany");
createTree("cedar", "#B8860B", "cedar");
createTree("ash_wood", "#A52A2A", "ash_wood");
createTree("poplar_wood", "#9E8040", "poplar_wood");
createTree("fir_wood", "#B4CDCD", "fir_wood");
createTree("teak", "#B5651D", "teak");
createTree("spruce", "#8B4513", "spruce");
createTree("cypress", "#827A68", "cypress_wood");
createTree("beech", "#F0DC82", "beech_wood");
createTree("sapele", "#8B4513", "sapele");
createTree("pear", "#FFD700", "pear_wood");
createTree("hickory", "#664C28", "hickory");
createTree("sycamore", "#F4A460", "sycamore");
createTree("willow", "#C19A6B", "willow_wood");
createTree("zebra_wood", "#F0DC82", "zebra_wood");
createTree("basswood", "#D2B48C", "basswood");
createTree("larch", "#C9AE5D", "larch_wood");
createTree("silver_maple", "#C0C0C0", "silver_maple");
createTree("balsam_fir", "#B4CDCD", "balsam_fir");
createTree("elm", "#8B4513", "elm_wood");
