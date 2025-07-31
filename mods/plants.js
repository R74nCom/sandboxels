/*
Version 2.1.0
*/
let is2d = (arr)=>{
  return arr.some(item => Array.isArray(item));
}
let flowerExclude = ["pineapple"];
let vineGrow = ["wood", "rock_wall", "straw", "wall", "ewall", "bush_cane", "bush_base", "fruit_branch"];
let plants = {
	tree: [],
	vine: ["grape", "tomato"],
	bush: [],
    other: ["pineapple"],
	includes: function(target){
		for(item in this){
			if(this[item] && Array.isArray(this[item]) && this[item].includes(target)){return true;}
		}
		return false;
	}
}
let growthPatterns = {
    pineapple1: [[-1,-1],[-2,-2],[1,-1],[2,-2],[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[-1,-6],[1,-6],[-1,-5],[1,-5],[-1,-4],[1,-4],[-1,-3],[1,-3],[0,-7],[-1,-8],[1,-8]],
    pineapple2: [[[-1,-1],[1,-1]],[[-2,-2],[2,-2]], [0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[[-1,-6],[1,-6]],[[-1,-5],[1,-5]],[[-1,-4],[1,-4]],[[-1,-3],[1,-3]],[[-1,-2],[1,-2]],[0,-7],[-1,-8],[1,-8]],
    pineapple3: [[-1,0],[-2,-1],[-3,-2],[1,0],[2,-1],[-4,-3],[3,-2],[4,-3],[-5,-4],[5,-4],[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7],[0,-8],[0,-9],[0,-10],[-1,-10],[1,-10],[-1,-9],[1,-9],[-1,-8],[1,-8],[-1,-7],[1,-7],[-1,-6],[1,-6],[-1,-5],[1,-5],[-1,-4],[1,-4],[-2,-9],[2,-9],[-2,-8],[2,-8],[2,-7],[-2,-7],[-2,-6],[2,-6],[2,-5],[-2,-5],[0,-11],[-1,-12],[1,-12],[2,-13],[-2,-13]],
    melon_2x2: [[0,-1],[1,-2],[1,-1],[[1,0],[2,-1]],[2,0]],
    melon_3x3: [[0,-1],[0,-2],[1,-3],[2,-3],[2,-2],[[1,-2],[1,-1]],[2,-1],[2,0],[1,0],[3,0],[3,-1],[3,-2]],
    melon_4x4: [[0,-1],[0,-2],[0,-3],[1,-4],[2,-4],[3,-4],[3,-3],[2,-3],[2,-2],[3,-2],[1,-2],[1,-3],[1,-1],[2,-1],[3,-1],[1,0],[2,0],[3,0],[4,0],[4,-1],[4,-2],[4,-3]],
    melon_5x5: [[0,-1],[0,-2],[0,-3],[0,-4],[1,-5],[2,-5],[3,-5],[3,-4],[2,-4],[3,-3],[4,-4],[4,-3],[2,-3],[1,-4],[5,-4],[3,-2],[2,-2],[4,-2],[5,-2],[1,-2],[1,-3],[5,-3],[1,-1],[2,-1],[3,-1],[4,-1],[5,-1],[5,0],[4,0],[3,0],[2,0],[1,0]],
};
let growthElems = {
    pineapple1: ["fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","fruit_leaves","fruit_leaves","fruit_leaves"],
    pineapple2: ["fruit_leaves","fruit_leaves","fruit_leaves","flower","flower","flower","flower","flower","flower","flower","flower","flower","fruit_leaves","fruit_leaves","fruit_leaves"],
    pineapple3: ["fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves"],
    melon_2x2: ["fruit_leaves","fruit_leaves","flower","flower","flower","flower"],
    melon_3x3: ["fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","flower","flower","flower","flower","flower","flower","flower","flower","flower"],
    melon_4x4: ["fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower"],
    melon_5x5: ["fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","fruit_leaves","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower","flower"],
}
let ethyleneChance = {
	tomato: 0.000055,
	orange: 0.000005,
	strawberry: 0.000005,
	grape: 0.000005,
	blueberry: 0.000005,
	apple: 0.00005,
	avocado: 0.00005,
	plum: 0.00005,
	peach: 0.00005,
	apricot: 0.00005,
	pear: 0.00005,
	mango: 0.000005,
	kiwi: 0.000005,
	lemon: 0.000005,
	raspberry: 0.000005,
	blackberry: 0.000005,
	get: function(name){
		return this[name] || 0.00000035;
	}
}
elements.tomato.properties = {
    type: "fruit",
    fruit: "tomato",
};
elements.grape.properties = {
    type: "fruit",
    fruit: "grape",
};
class vineSeed {
    category = "life";
    behavior = behaviors.POWDER;
    tick = function(pixel){
      if(pixel.age > 40){
        changePixel(pixel, (elements[pixel.element].low) ? "low_fruit_vine" : "fruit_vine");
    }
    pixel.age += 1;
    };
    properties = {
      age: 0,
    };
    constructor(fruit, color, low = false){
        this.properties.fruit = fruit;
        this.color = color;
		this.low = low;
    };
}

class treeSeed {
    properties = {
        age: 0,
        fruit: "",
    };
    tick = function(pixel) {
        if (isEmpty(pixel.x,pixel.y+1)) {
            movePixel(pixel,pixel.x,pixel.y+1);
        }
        else {
            if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                if (!outOfBounds(pixel.x,pixel.y+1)) {
                    var dirtPixel = pixelMap[pixel.x][pixel.y+1];
                    if (["dirt", "mud", "sand", "wet_sand", "clay_soil", "mycelium"].includes(dirtPixel.element)) {
                        changePixel(dirtPixel,"root");
                    }
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    movePixel(pixel,pixel.x,pixel.y-1);
                    createPixel(Math.random() > 0.5 ? "wood" : "fruit_branch",pixel.x,pixel.y+1);
                    if (pixelMap[pixel.x][pixel.y+1].element == "fruit_branch" || pixelMap[pixel.x][pixel.y+1].element == "fruit_leaves" || pixelMap[pixel.x][pixel.y+1].element == "wood"){
                      pixelMap[pixel.x][pixel.y+1].fruit = pixel.fruit;
                        pixelMap[pixel.x][pixel.y+1].age = pixel.age;
                    }
                }
            }
            else if (pixel.age > 1000) {
                changePixel(pixel,"wood");
            }
            pixel.age++;
        }
        doDefaults(pixel);
    };
    breakInto = ["sawdust", "sap"];
    burnInto = ["charcoal", "sap", "ember"];
    tempHigh = 100;
    stateHigh = "dead_plant";
    tempLow = -40;
    stateLow = "frozen_plant";
    burn = 40;
    burnTime = 50;
    category = "life";
    seed = true;
    constructor(fruit, colours){
        this.properties.fruit = fruit;
        this.color = colours;
    }
}

class fruit {
    category = "food";
    behavior = [["XX", "ST:fruit_leaves AND ST:fruit_branch AND ST:wood", "XX"],["ST:fruit_leaves AND ST:fruit_branch AND ST:wood", "XX", "ST:fruit_leaves AND ST:fruit_branch AND ST:wood"],["M2", "ST:fruit_leaves AND ST:fruit_branch AND ST:wood AND M1", "M2"]];
    breakInto = "juice";
    properties = {
        type: "fruit",
    };
    isFood = true;
    constructor(name, colour, jColour, type = "tree", sColour = false, extract = false, low = false){
        this.properties.fruit = name;
        this.color = colour;
        this.breakIntoColor = jColour;
        this.extract = (extract == false) ? undefined : extract;
        if(type == "bush"){
            this.behavior = [["XX", "ST:bush_cane", "XX"],["ST:bush_cane", "XX", "ST:bush_cane"],["M2", "ST:bush_cane AND M1", "M2"]];
        } else if (type == "vine"){
			this.behavior = behaviors.VINEFRUIT;
		}
		plants[type].push(name);
		if(sColour != false){
			if(type == "bush"){
				elements[`${name}_seed`] = new bushSeed(name, sColour);
			} else if (type == "vine"){
				elements[`${name}_seed`] = new vineSeed(name, sColour, low);
			} else {
				elements[`${name}_seed`] = new treeSeed(name, sColour);
			}
		}
    };
	tick = function(pixel){
		let chance = ethyleneChance.get(pixel.fruit);
		for(let i = 0; i < squareCoords.length; i++){
			let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
			if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random() < chance){
				createPixel("ethylene", x, y); 
			}
		}
	}
}
elements.tomato.tick = function(pixel){
	let chance = ethyleneChance.get(pixel.fruit);
	for(let i = 0; i < squareCoords.length; i++){
		let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
		if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random() < chance){
			createPixel("ethylene", x, y); 
		}
	}
}
elements.grape.tick = function(pixel){
	let chance = ethyleneChance.get(pixel.fruit);
	for(let i = 0; i < squareCoords.length; i++){
		let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
		if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random() < chance){
			createPixel("ethylene", x, y); 
		}
	}
}
elements.wood.properties = {age: 0, fruit: ""};

elements.fruit_branch = {
    color: elements.tree_branch.color,
    behavior: [
        "XX|XX|XX",
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
	properties: {
		age: 0,
		fruit: "",
	},
  tick: function(pixel){
  let pos = [[-1, -1], [0, -1], [1, -1]];
  for(let i = 0; i < pos.length; i++){
    let x = pixel.x+pos[i][0], y = pixel.y+pos[i][1];
    if(isEmpty(x,y) && !outOfBounds(x,y)){
        if(Math.random() < 0.035){
            let elemArr = (pos[i][0] == 0) ? ["fruit_leaves","fruit_leaves","fruit_leaves","fruit_branch","fruit_branch"] : ["fruit_branch", "fruit_branch", "fruit_leaves", "fruit_leaves", "wood"];
            createPixel(elemArr[Math.round(Math.random()*elemArr.length)], x, y);
        }
    }
  }
    for(var i = 0; i < adjacentCoords.length; i++){
      let x = pixel.x+adjacentCoords[i][0];
      let y = pixel.y+adjacentCoords[i][1];
      if(isEmpty(x, y) || outOfBounds(x, y)) { continue; }
      let pixel2 = pixelMap[x][y];
      if(pixel2.element == "fruit_branch" || pixel2.element == "fruit_leaves" || pixel2.element == "wood"){
        if(pixel.fruit != "" && pixel2.fruit == ""){
          pixel2.fruit = pixel.fruit;
        } else if (pixel.fruit == "" && pixel2.fruit != ""){
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
	properties: {
		age: 0,
		fruit: "",
        growthStage: 0,
        dir: [1,1],
        bloomColor: "#FFE2E2",
	},
    tick: function(pixel){
      if(pixelTicks == pixel.start + 1 && pixel.blooming == undefined && !pixel.growthPattern && !pixel.noBloom){
        if(Math.floor(Math.random() * 3) == 2){
          pixel.blooming = true;
          pixel.color ="#FFE2E2";
        } else {
          pixel.blooming = false;
        }
      }
      if(pixel.blooming && elements[pixel.fruit] != undefined && elements[pixel.fruit].bloomColor != undefined && !elements[pixel.fruit].bloomColor.includes(pixel.bloomColor)){
          pixel.bloomColor = elements[pixel.fruit].bloomColor;
      }
      if(pixel.blooming && !pixel.bloomColor.includes(pixel.color)){
          let color = "";
          if(Array.isArray(pixel.bloomColor)){
              color = pixel.bloomColor[Math.round(Math.random()*pixel.bloomColor.length)];
          } else {
              color = pixel.bloomColor;
          }
          pixel.color = color;
      }
      for(var i = 0; i < adjacentCoords.length; i++){
        let x = pixel.x+adjacentCoords[i][0];
        let y = pixel.y+adjacentCoords[i][1];
        if(isEmpty(x, y) || outOfBounds(x, y)) { continue; }
        let pixel2 = pixelMap[x][y];
        if((["fruit_vine", "fruit_branch", "fruit_leaves", "low_fruit_vine", "wood"].includes(pixel2.element) || (pixel2.type && pixel2.type == "fruit")) && pixel2.fruit != "pineapple"){
            if(pixel.fruit && !pixel2.fruit){
              pixel2.fruit = pixel.fruit;
            } else if (!pixel.fruit && pixel2.fruit){
              pixel.fruit = pixel2.fruit;
            }
            if(pixel.age && !pixel2.age){
              pixel2.age = pixel.age;
            } else if (!pixel.age && pixel2.age){
              pixel.age = pixel2.age;
            }
        }
      }
      if(pixel.blooming && pixel.fruit == "pineapple" && Math.random() < 0.0035){
          let x = pixel.x, y = pixel.y;
          changePixel(pixel, "unripe_fruit");
          pixelMap[x][y].fruit = "pineapple";
      }
      if(pixel.blooming && !flowerExclude.includes(pixel.fruit)){
		  let chance = 0.0025;
		  for(let i = 0; i < squareCoords.length; i++){
			  let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
			  if(!isEmpty(x,y) && !outOfBounds(x,y)){
                  let p2 = pixelMap[x][y];
                  if(["ethylene","propylene"].includes(p2.element)){
				      chance = [0.01, 0.0035][["ethylene","propylene"].indexOf(p2.element)]  || chance;
                      
                  }
			  }
		  }
        if(pixelTicks > pixel.start + 150){
          if(Math.random() < chance){
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
      if(pixel.growthPattern == true){
        let chance = (pixel.age-150)/2500;
        chance = Math.max(Math.min(chance, 1), 0);
        if(Math.random() < chance){
            let value = growthPatterns[pixel.pattern][pixel.growthStage];
            if(pixel.growthStage < growthPatterns[pixel.pattern].length && is2d(value)){
                for(let coords of value){
                    let x = pixel.x+(coords[0]*pixel.dir[0]), y = pixel.y+(coords[1]*pixel.dir[1]);
                    if(isEmpty(x,y) && !outOfBounds(x,y)){
                        if(growthElems[pixel.pattern][pixel.growthStage] == "flower"){
                            createPixel("fruit_leaves", x, y);
                            pixelMap[x][y].blooming = true;
                            pixelMap[x][y].fruit = pixel.fruit;
                        } else {
                            createPixel((growthElems[pixel.pattern][pixel.growthStage] == undefined) ? growthElems[pixel.pattern][0] : growthElems[pixel.pattern][pixel.growthStage], x, y);
                            pixelMap[x][y].noBloom = true;
                        }
                    }
                }
            } else if(pixel.growthStage < growthPatterns[pixel.pattern].length) {
                let x = pixel.x+(value[0]*pixel.dir[0]), y = pixel.y+(value[1]*pixel.dir[1]);
                if(isEmpty(x,y) && !outOfBounds(x,y)){
                    if(growthElems[pixel.pattern][pixel.growthStage] == "flower"){
                        createPixel("fruit_leaves", x, y);
                        pixelMap[x][y].blooming = true;
                        pixelMap[x][y].fruit = pixel.fruit.split("_")[0];
                    } else {
                        createPixel((growthElems[pixel.pattern][pixel.growthStage] == undefined) ? growthElems[pixel.pattern][0] : growthElems[pixel.pattern][pixel.growthStage], x, y);
                        pixelMap[x][y].noBloom = true;
                    }
                }
            }
            pixel.growthStage += 1;
        }
    }
      pixel.age++;
  }
}



class bushSeed{
  behavior = behaviors.STURDYPOWDER;
  category = "life";
  properties = {
    age: 0,
  };
  tick = function(pixel){
    if(pixel.age > 40){
      let x1 = pixel.x - 1;
      let y = pixel.y;
      let x2 = pixel.x + 1;
      if(isEmpty(x1,y) && !outOfBounds(x1,y)){
        createPixel("bush_base", x1, y);
        pixelMap[x1][y].fruit = pixel.fruit;
      }
      if(isEmpty(x2,y) && !outOfBounds(x2,y)){
        createPixel("bush_base", x2, y);
        pixelMap[x2][y].fruit = pixel.fruit;
      }
      if(!isEmpty(x1, y) && !isEmpty(x2, y)){
        deletePixel(pixel.x, pixel.y);
      }
    }
     pixel.age += 1;
  };
    constructor(fruit, colour){
        this.properties.fruit = fruit;
        this.color = colour;
    }
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
          pixel.blooming = [true, false][Math.floor(Math.random() * 2)];
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


elements.low_fruit_vine = {
  color: elements.plant.color,
  behavior: behaviors.WALL,
  category: "life",
  properties: {
	  age: 0,
  },
  tick: function(pixel){
      if(isEmpty(pixel.x, pixel.y - 1) && !outOfBounds(pixel.x, pixel.y - 1) && Math.random() < ((pixel.age/50000 > 0.005) ? 0.005 : (pixel.age/50000)) && pixel.fruit && ![undefined, "watermelon", "pumpkin"].includes(pixel.fruit)){
        createPixel("fruit_leaves", pixel.x, pixel.y - 1);
		pixelMap[pixel.x][pixel.y - 1].blooming = true;
        pixelMap[pixel.x][pixel.y - 1].color = "#FFE2E2";
		pixelMap[pixel.x][pixel.y - 1].fruit = pixel.fruit;
      }
    if(Math.floor(Math.random() * 100) == 1 && !["watermelon", "pumpkin", undefined].includes(pixel.fruit)){
        let num = (Math.random() > 0.5) ? -1 : 1;
      if(isEmpty(pixel.x + num, pixel.y)){
        createPixel("low_fruit_vine", pixel.x + num, pixel.y);
        pixelMap[pixel.x + num][pixel.y].fruit = pixel.fruit;
      }
    }
	pixel.age++;
  }
}
let str = "";
for(let i = 0; i < vineGrow.length; i++){
    str += (i == vineGrow.length-1) ? `ST:${vineGrow[i]}` : `ST:${vineGrow[i]} AND `;
}
elements.fruit_vine = {
  category: "life",
  color: elements.plant.color,
  behavior: [["XX", str, "XX"], [str, "XX", str], ["XX", str + " AND M1", "XX"]],
  properties: {
    age: 0,
  },
  tick: function(pixel){
    if(Math.floor(Math.random() * 100) == 1 && pixel.age > 25 && pixel.age < 500){
      for(var i = 0; i < squareCoords.length; i++){
        let x1 = pixel.x + squareCoords[i][0];
        let y1 = pixel.y + squareCoords[i][1];
        if(!isEmpty(x1,y1) && !outOfBounds(x1,y1) && vineGrow.includes(pixelMap[x1][y1].element)){
		  //pixel.drag = true;
          let randomNum = Math.floor(Math.random() * 4);
          let x2 = x1 + squareCoords[randomNum][0];
          let y2 = y1 + squareCoords[randomNum][1];
          if(isEmpty(x2,y2) && !outOfBounds(x2,y2)){
            createPixel("fruit_vine", x2, y2);
            pixelMap[x2][y2].fruit = pixel.fruit;
          }
        } //else {pixel.drag = false;}
      }
    }
    pixel.age += 1;
    if(pixel.fruit){
      for(var i = 0; i < adjacentCoords.length; i++){
        let x = pixel.x + adjacentCoords[i][0];
        let y = pixel.y + adjacentCoords[i][1];
        if(isEmpty(x,y) && !outOfBounds(x,y) && Math.floor(Math.random() * 5000) == 5 && pixel.age > 650){
          createPixel("fruit_leaves", x, y);
          pixelMap[x][y].blooming = true;
          pixelMap[x][y].color = "#FFE2E2";
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

behaviors.VINEFRUIT = ["XX|ST:fruit_vine AND ST:low_fruit_vine|XX",
"ST:fruit_vine AND ST:low_fruit_vine|XX|ST:fruit_vine AND ST:low_fruit_vine",
"M2|M1|M2"];
elements.grape.behavior = behaviors.VINEFRUIT;
elements.tomato.behavior = behaviors.VINEFRUIT;
elements.grape_seed = new vineSeed("grape",["#281B01", "#2D1F06", "#2D1F06"]);
elements.tomato_seed = new vineSeed("tomato", ["#F8F5D1","#E7E5CF","#E3E1C5"]);
elements.apple = new fruit("apple", ["#FF0507", "#EC0A0D", "#F22426", "#DC2C2E"], ["#F9C497", "#EED3BB", "#EEDEBB"]);
elements.apple_seed = new treeSeed("apple", ["#3B1C01", "#3E2107", "#3A1C02"]);
function colorMix(p1, p2, bias = 0.5){
	p1.color = interpolateRgb(getRGB(p1.color), getRGB(p2.color), bias);
	p2.color = interpolateRgb(getRGB(p1.color), getRGB(p2.color), bias);
}
function interpolateRgb(rgb1, rgb2, ratio = 0.5) {
  const interpolatedRgb = {
    r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio),
    g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio),
    b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio),
  };
  return normalize(interpolatedRgb);
}
function getRGB(rgb){
  let rgb2 = rgb.replace(")", "").replace("rgb(", "").replace(/,/g, "r").split("r")
  return { r: parseInt(rgb2[0]), g: parseInt(rgb2[1]), b: parseInt(rgb2[2]) };
}

elements.juice.tick = function(pixel){
	for(let i = 0; i < squareCoords.length; i++){
		let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
		if(!isEmpty(x,y) && !outOfBounds(x,y) && pixelMap[x][y].element == pixel.element && Math.random() < 0.005){
			colorMix(pixel, pixelMap[x][y]);
		}
	}
}
elements.juice.onMix = function(pixel){
	for(let i = 0; i < squareCoords.length; i++){
		let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
		if(!isEmpty(x,y) && !outOfBounds(x,y) && pixelMap[x][y].element == pixel.element && Math.random() < 0.5){
			colorMix(pixel, pixelMap[x][y]);
		}
	}
}
elements.fruit_milk.tick = function(pixel){
	for(let i = 0; i < squareCoords.length; i++){
		let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
		if(!isEmpty(x,y) && !outOfBounds(x,y) && pixelMap[x][y].element == pixel.element && Math.random() < 0.005){
			colorMix(pixel, pixelMap[x][y]);
		}
	}
}
elements.fruit_milk.onMix = function(pixel){
	for(let i = 0; i < squareCoords.length; i++){
		let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
		if(!isEmpty(x,y) && !outOfBounds(x,y) && pixelMap[x][y].element == pixel.element && Math.random() < 0.5){
			colorMix(pixel, pixelMap[x][y]);
		}
	}
}
function normalize(obj){
	return `rgb(${obj.r},${obj.g},${obj.b})`;
}

elements.milk.reactions.juice = {func: function(p1, p2){
		let rgb = interpolateRgb(getRGB(p1.color), getRGB(p2.color), 0.25);
		changePixel(p1, "fruit_milk");
		changePixel(p2, "fruit_milk");
		p1.color = rgb;
		p2.color = rgb;
	}
};
elements.juice.reactions.carbon_dioxide = { func: function(p1,p2){
		let rgb = interpolateRgb(getRGB(p1.color), getRGB(elements.water.color), 0.2);
		changePixel(p1, "soda");
		changePixel(p2, "foam");
		p1.color = rgb;
		p2.color = rgb;
	}
}
elements.juice.reactions.seltzer = { func: function(p1,p2){
		let rgb = interpolateRgb(getRGB(p1.color), getRGB(p2.color), 0.5);
		changePixel(p1, "soda");
		changePixel(p2, "foam");
		p1.color = rgb;
		p2.color = rgb;
	}
}

elements.milk.reactions.soda = {
	func: function(p1,p2){
		let rgb = interpolateRgb(getRGB(p1.color), getRGB(p2.color), 0.5);
		changePixel(p1, "pilk");
		changePixel(p2, "pilk");
		p1.color = rgb;
		p2.color = rgb;
	}
}

elements.seed_maker = {
	behavior: behaviors.WALL,
	category: "machines",
	tick: function(pixel){
		for(let i = 0; i < squareCoords.length; i++){
			let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
			if((!isEmpty(x,y) && !outOfBounds(x,y)) && plants.includes(pixelMap[x][y].element)){
				changePixel(pixelMap[x][y], `${pixelMap[x][y].element}_seed`);
			}
		}
	}
}
let r;
if(settings.cleargases){
    if(settings.bg != undefined){
        r = interpolateRgb(hexToRGB("#E5EAEA"), hexToRGB(settings.bg), 0.85);
    } else {
        r = interpolateRgb(hexToRGB("#E5EAEA"), {r:0,g:0,b:0}, 0.85);
    }
};
elements.ethylene = {
	behavior: behaviors.GAS,
	category: "gases",
	reactionCatalysts: {
		gold: {e1: "water", product: "alcohol", chance: 0.025},
		copper: {e1: "oxygen", product: "vinegar", chance: 0.025}
	},
	reactions: {
		oxidized_copper: { elem1: "vinegar", elem2: "copper", chance: 0.025},
	},
    color: r || ["#fffffc", "#f7f7f2", "#eaebe6", "#ededed", "#f7f7f2", "#f2f2f2"],
    colorObject: (r != undefined) ? r.split("(")[1].split(")")[0].split(",") : undefined,
	state: "gas",
	burnInto: ["carbon_dioxide", "steam"],
	burn: 100,
	burnTime: 15,
	stateHigh: "fire",
	tempHigh: 425,
	tick: function(pixel){
		catalyse(pixel);
        if(settings.cleargases){
            let rgb;
            if(settings.bg != undefined){
                rgb = interpolateRgb(hexToRGB("#E5EAEA"), hexToRGB(settings.bg), 0.85);
            } else {
                rgb = interpolateRgb(hexToRGB("#E5EAEA"), {r:0,g:0,b:0}, 0.85);
            }
            pixel.color = rgb;
        }else if (!["#fffffc", "#f7f7f2", "#eaebe6", "#ededed", "#f7f7f2", "#f2f2f2"].includes(pixel.color)){
            pixel.color = ["#fffffc", "#f7f7f2", "#eaebe6", "#ededed", "#f7f7f2", "#f2f2f2"][Math.floor(Math.random()*6)];
        };
	},
}
elements.propylene = {
	behavior: behaviors.GAS,
	category: "gases", 
	reactionCatalysts: {
		nickel: {e1: "hydrogen", product: "propane", chance: 0.025},
	},
    color: r || ["#fffffc", "#f7f7f2", "#eaebe6", "#ededed", "#f7f7f2", "#f2f2f2"],
    colorObject: (r != undefined) ? r.split("(")[1].split(")")[0].split(",") : undefined,
	state: "gas",
	burnInto: ["carbon_dioxide", "steam"],
	burn: 100,
	burnTime: 15,
	stateHigh: "fire",
	tempHigh: 425,
	tick: function(pixel){
		catalyse(pixel);
        let rgb;
        if(settings.cleargases){
            if(settings.bg != undefined){
                rgb = interpolateRgb(hexToRGB("#E5EAEA"), hexToRGB(settings.bg), 0.85);
            } else {
                rgb = interpolateRgb(hexToRGB("#E5EAEA"), {r:0,g:0,b:0}, 0.85);
            }
            pixel.color = rgb;
        } else if (!["#fffffc", "#f7f7f2", "#eaebe6", "#ededed", "#f7f7f2", "#f2f2f2"].includes(pixel.color)){
            pixel.color = ["#fffffc", "#f7f7f2", "#eaebe6", "#ededed", "#f7f7f2", "#f2f2f2"][Math.floor(Math.random()*6)];
        };
	},
}
elements.propane.reactionCatalysts = {
    aluminum: {e2: "hydrogen", product: "propylene", chance: 0.035},
    gallium: {e2: "hydrogen", product: "propylene", chance: 0.025},
};
elements.propane.tick = function(pixel){
    catalyse(pixel);
}
function catalyse(pixel){
	let rC = elements[pixel.element].reactionCatalysts;
	let neighbors = [];
    let p = [];
	for(let i = 0; i < squareCoords.length; i++){
		let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
		if(!isEmpty(x,y) && !outOfBounds(x,y)){
			neighbors.push(pixelMap[x][y].element);
            p.push(pixelMap[x][y]);
		}
	}
	for(item in rC){
		if(neighbors.includes(item) && neighbors.includes(rC[item].e1) && Math.random() < rC[item].chance){
			changePixel(pixel, rC[item].product);
            if(rC[item].e2 != undefined){
                changePixel(p[neighbors.indexOf(rC[item].e1)], rC[item].e2);
            } else {
                let P = p[neighbors.indexOf(rC[item].e1)];
                deletePixel(P.x, P.y);
            }
		} else if (rC[item].e1 == undefined){
            if(neighbors.includes(item) && rC[item].e2 != undefined && Math.random() < rC[item].chance){
                for(let i = 0; i < squareCoords.length; i++){
                    let x = pixel.x+squareCoords[i][0], y = pixel.y+squareCoords[i][1];
                    if(isEmpty(x,y) && !outOfBounds(x,y)){
                        createPixel(rC[item].e2, x, y);
                        changePixel(pixel, rC[item].product);
                    }
                }
            }
        }
	}
}
elements.orange = new fruit("orange", ['#FA9A14', '#E88D0F', '#F0963D', '#F4810E'], ['#FFDA0B', '#FFEA09', '#FFD609', '#FCC921'], "tree");
elements.orange_seed = new treeSeed("orange", ['#EEE9C7', '#F4F1D0', '#E8E4C4', '#DBD5AF']);
elements.kiwi = new fruit("kiwi", ['#886002', '#7D5B0D', '#876412', '#97620F'], ['#7DB410', '#86BC1B', '#95CE22', '#91CF12'], "vine");
elements.kiwi_seed = new vineSeed("kiwi", ['#3E2A01', '#392804', '#473307', '#1E1500']);
elements.raspberry = new fruit("raspberry", ['#FF201C', '#EF3D3A', '#FA5350', '#DF3E3B'], ['#FF4450', '#F43643', '#DF2C38', '#E92344'], "bush");
elements.raspberry_seed = new bushSeed("raspberry", ['#572600', '#4C2506', '#592E0D', '#5E3211']);
elements.blueberry = new fruit("blueberry", ['#322954', '#3F3366', '#2B1B5E', '#4C3C81'], ['#51042C', '#550E33', '#420D28', '#520F32'], "bush", ['#78573A', '#72492D', '#7D5438', '#704F3A']);
elements.blackberry = new fruit("blackberry", ['#1A013A', '#1E073A', '#3D0A49', '#33043F'], ['#DC5F5F', '#D76D6D', '#BF6363', '#B05D5D'], "bush", ['#DA7878', '#C87B7B', '#AD6161', '#915656']);
elements.strawberry = new fruit("strawberry", ['#FE3030', '#E93030', '#DE1F1F', '#CE0B0B'], ['#EA5C46', '#E24B34', '#CE5A48', '#E7604B'], "vine", ['#B27F65', '#AA7358', '#A27553', '#AF8B62'], false, true);
elements.pear = new fruit("pear", ["#F1F8A7", "#DCE398", "#E3EE7E", "#D6E07F"], ["#F6F9D5", "#F6F9D5", "#E8ECC6", "#E8ECC0"], "tree", ["#3B1C01", "#3E2107", "#3A1C02"]);
elements.mango = new fruit("mango", ["#F74E3E", "#E95D51", "#EE853B", "#D77026", "#F8BF46", "#F8B524", "#95C408", "#A5CD2D"], ["#FFC905", "#FFD605", "#FFE205", "#FFF305", "#FCE118"], "tree", ["#E8EABB", "#E3E5BA", "#EAEDC0", "#E8EAB1", "#D8DBA5"]);
elements.lemon = new fruit("lemon", ["#FCF924", "#FCF924", "#EEEA1A", "#F6F212", "#FBF70B"], ["#F6F373", "#EEEC77", "#E3E267", "#F3F18B"], "tree", ["#F8F7B2", "#E9E9B1", "#E9E8A7", "#F1EFA4"]);
elements.plum = new fruit("plum", ["#67486E", "#705476", "#634A69", "#785281"], ["#D58D77", "#DC9984", "#CA8D7A", "#CF816A"], "tree", ["#A08C5D", "#907D50", "#9B8551", "#AA9563"]);
elements.peach = new fruit("peach", ["#F76856", "#EA5D4A", "#EA6D4A", "#E5785A", "#FE824A", "#EE7A45", "#FAA543", "#F59D39", "#FF744D"], ["#F86F1F", "#EC742F", "#EC832F", "#EC9A2F", "#ECA62F"], "tree", ["#735940", "#7B5C3D", "#7D5935"]);
elements.apricot = new fruit("apricot", ["#F5A61F", "#F5A61F", "#EA9B12", "#F8A109"], ["#F2B016", "#F2AD0C", "#FBB81E", "#FFB301"], "tree", ["#735940", "#7B5C3D", "#7D5935"]);
elements.avocado = new fruit("avocado", ["#3c9419", "#348514", "#367a1b", "#2f7d10"], ["#cff74a", "#caf244", "#c1e649", "#b3d640"], "tree", ["#4d290a", "#4d2b0d", "#63360f", "#572d09"]);
elements.avocado.breakInto = "guacamole";
elements.guacamole = {
    color: ["#cff74a", "#caf244", "#c1e649", "#b3d640"],
    behavior: behaviors.LIQUID,
    viscosity: 1350,
    category: "food",
    state: "liquid",
    isFood: true,
    onMix: function(pixel){
        for(let coords of squareCoords){
            let x = pixel.x+coords[0], y = pixel.y+coords[1];
            if(!isEmpty(x,y) && !outOfBounds(x,y) && elements[pixelMap[x][y].element].isFood && pixelMap[x][y].element != "quacamole"){
                let chance = (shiftDown) ? 1 : 0.5;
                if(Math.random() < chance){
                    let rgb = interpolateRgb(getRGB(pixel.color), getRGB(pixelMap[x][y].color), 0.8);
                    changePixel(pixelMap[x][y], "guacamole");
                    pixel.color = rgb;
                    pixelMap[x][y].color = rgb;
                }
            }
        }
    }
}
runAfterAutogen(()=>{settingsMenu.innerHTML += `
<span setting="cleargases" class="setting-span multisetting" title="Default: ON">
	<input type="button" value="Clear Gases" id="settingLabel-clearGases" class="toggleInput" onclick="toggleInput(this,'cleargases',false); r = undefined;" state="1">
</span>`;});
elements.cocoa = new fruit("cocoa", ["#b09533", "#ad9439", "#b39736", "#99732c", "#ab8338", "#ad8231"], ["#826a3e", "#634f28", "#634b1f", "#5c461c"], "tree", ["#826a3e", "#634f28", "#634b1f", "#5c461c"]);
elements.cocoa.breakInto = "cocoa_seed";
elements.cocoa_seed.name = "CocoaBean";
elements.cocoa_seed.breakInto = undefined;
elements.cocoa_seed.tempHigh = 125;
elements.cocoa_seed.stateHigh = "roasted_cocoa_bean";
elements.roasted_cocoa_bean = {
    category: "food",
    behavior: behaviors.POWDER,
    extract: "melted_cocoa_butter",
    color: ["#2b1b01", "#291a02", "#211503", "#211503"],
    breakInto: "cocoa_powder",
}
elements.cocoa_powder = {
    category: "food",
    behavior: behaviors.POWDER,
    color: ["#3b2604", "#332104", "#402802", "#301e01"],
}
elements.cocoa_butter = {
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 36,
    color: ["#feffe8", "#f4f5dc", "#fcfce1", "#feffed", "#feffd6"],
    category: "food",
    isFood: true,
    stateHigh: "melted_cocoa_butter",
}
elements.melted_cocoa_butter = {
    behavior: behaviors.LIQUID,
    color: ["#fff082", "#e3d676", "#f2e57e", "#fff07d"],
    tempLow: 35,
    stateLow: "cocoa_butter",
        reactions: {
        cocoa_powder: {elem1: "chocolate", elem2: "chocolate"}
    },
    category: "states",
    isFood: true,
    viscosity: 750,
    temp: 36,
};
elements.extractor = {
    category: "machines",
    behavior: behaviors.WALL,
    tick: function(pixel){
        for(let coords of squareCoords){
            let x = pixel.x+coords[0], y = pixel.y+coords[1];
            if(!isEmpty(x,y) && !outOfBounds(x,y) && elements[pixelMap[x][y].element].extract != undefined){
                changePixel(pixelMap[x][y], elements[pixelMap[x][y].element].extract);
            }
        }
    }, 
    movable: false,
}
elements.pineapple_seed = {
    behavior: behaviors.POWDER,
    color: ["#242000", "#1f1c00", "#1a1701", "#1f1c01"],
    category: "life",
    properties: {
        age: 0,
        fruit: "pineapple",
        growthPattern: true,
    },
    tick: function(pixel){
        let num = Math.round((Math.random()*0.75)*3)+1;
        chance = (pixel.age -140)/100;
        chance = Math.max(Math.min(chance, 1), 0);
        if(Math.random()<chance){
            let x = pixel.x, y = pixel.y, fruit = pixel.fruit;
            changePixel(pixel, "fruit_leaves");
            pixelMap[x][y].fruit = fruit;
            pixelMap[x][y].pattern = `pineapple${num}`;
            pixelMap[x][y].noBloom = true;
        }
        pixel.age++;
    }
}
elements.unripe_fruit = {
    category: "life",
    breakInto: ["poison", "sugar_water", "dirty_water"],
    color: ["#7ed934", "#78d42c", "#7cdb2e", "#7bde2a"],
    properties: {
        age: 0,
        fruit: "",
    },
    tick: function(pixel){
        let chance = (pixel.age-100)/250;
        if(Math.random() < chance){
            changePixel(pixel, pixel.fruit);
        }
        pixel.age++;
    }
}
elements.pineapple = {
    category: "food", 
    breakInto: "juice",
    color: ["#ffe712", "#f0d802", "#f2db05", "#d9c409"],
    breakIntoColor: ["#fafa2a", "#f2f23d", "#f7f748", "#eded26"],
    isFood: true,
}
elements.sugarcane = {
    category: "life",
    extract: "sugar_water",
    color: ["#60d10f", "#5abf11", "#66cc1d", "#78ed24"],
    properties: {
        age: 0,
        alive: false,
        hasBloomed: false,
    },
    tick: function(pixel){
        let chance = (pixel.age-350)/100;
        let x = pixel.x, y = pixel.y-1;
        if(isEmpty(x,y) && !outOfBounds(x,y) && pixel.alive){
            if(Math.random()<chance && !pixel.hasBloomed){
                createPixel("fruit_leaves", x, y);
                pixelMap[x][y].blooming = true;
                pixelMap[x][y].fruit = "sugarcane_seed";
                createPixel("fruit_leaves", x, y-1);
                pixelMap[x][y-1].blooming = true;
                pixelMap[x][y-1].fruit = "sugarcane_seed";
                createPixel("fruit_leaves", x, y-2);
                pixelMap[x][y-2].blooming = true;
                pixelMap[x][y-2].fruit = "sugarcane_seed";
                pixel.hasBloomed = true;
            } else if(Math.random() < 0.015 && !pixel.hasBloomed) {
                createPixel("sugarcane", x, y);
                pixelMap[x][y].age = pixel.age;
                pixelMap[x][y].alive = true;
            }
        }
        pixel.age++;
    }
}
elements.sugarcane_seed = {
    category: "life",
    behavior: behaviors.POWDER,
    color: ["#f0e07a", "#e0d277", "#e3ca71", "#d9ba77"],
    properties: {
        age: 0,
    },
    tick: function(pixel){
        let chance = (pixel.age-50)/100;
        if(Math.random()<chance){
            let x = pixel.x, y = pixel.y;
            changePixel(pixel, "sugarcane");
            pixelMap[x][y].alive = true;
        }
        pixel.age++;
    },
}
elements.watermelon = new fruit("watermelon", ["#0e6614", "#065c0c", "#03700b", "#109119", "#098f12"], ["#ff4242", "#ed2f2f", "#ff2e2e", "#ed2828"]);
elements.watermelon.behavior = behaviors.WALL;
elements.watermelon_seed = {
    behavior: behaviors.POWDER,
    color: ["#5e4a22", "#423417", "#241b0b", "#1f1709", "#120e05"],
    category: "life",
    properties: {
        age: 0,
        fruit: "watermelon",
        growthPattern: true,
    },
    tick: function(pixel){
        if(pixel.pattern == undefined){
            let num = Math.round((Math.random()*0.75)*4)+2;
            pixel.pattern = `melon_${num}x${num}`;
        }
        if(pixel.dir == undefined){
            let num = 0.5-Math.round(Math.random());
            pixel.dir = (num < 0) ? [-1, 1] : [1,1]; 
        }
        chance = (pixel.age -140)/100;
        chance = Math.max(Math.min(chance, 1), 0);
        if(Math.random()<chance){
            let x = pixel.x, y = pixel.y, fruit = pixel.fruit, pattern = pixel.pattern, dir = pixel.dir;
            changePixel(pixel, "fruit_leaves");
            pixelMap[x][y].fruit = fruit;
            pixelMap[x][y].pattern = pattern;
            pixelMap[x][y].dir = dir;
            pixelMap[x][y].noBloom = true;
        }
        pixel.age++;
    }
}
elements.tomato.bloomColor = ["#edd93e", "#fae334", "#e6dc22", "#f5ec3d"];
