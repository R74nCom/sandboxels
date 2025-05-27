
function eatBee(pixel1, pixel2) {
  pixel1.color = "#5c138a";        
  pixel1.poisoned ??= 30;    
}


elements.lizard = {
  color: ["#00ff1a", "#038f11"],
  behavior: [
    ["M2%2", "XX", "M2%2"],
    ["M1%10", "XX", "M1%10"],
    ["M2", "M1", "M2"],
  ],
  category: "life",
  state: "solid",
  reactions: {
    "fly":     { elem2: null, func:behaviors.FEEDPIXEL },
    "ant":     { elem2: null, func: behaviors.FEEDPIXEL },
    "termite": { elem2: null, func: behaviors.FEEDPIXEL },
    "worm":    { elem2: null, func: behaviors.FEEDPIXEL },
    "bee":     { elem2: null, func: eatBee },  
	"firefly": { elem2: null, func: eatBee },  
  },
  foodNeed: 5,
  temp: 20,
  tempHigh: 120,
  stateHigh: "cooked_meat",
  tempLow: -20,
  stateLow: "frozen_meat",
  breakInto: "blood",
  density: 1050,
  eggColor: "#ffffff",
  tick: function(pixel) {
    if (pixel.poisoned !== undefined) {
      pixel.poisoned--;
      if (pixel.poisoned <= 0) {
        deletePixel(pixel.x, pixel.y);
        return;
      }
    }
  },
};



elements.toad = {
	color: ["#693800","#945a18"],
	behavior: [
  ["XX", "XX", "M2%3 AND SW:water, salt_water, dirty_water, pool_water, seltzer%5"],
  ["XX", "FX%25", "M2%6 AND SW:water, salt_water, dirty_water, pool_water, seltzer%8"],
  ["M2", "M1 AND SW:water, salt_water, dirty_water, pool_water, seltzer%8", "M2 AND SW:water, salt_water, dirty_water, pool_water, seltzer%8"],
],

	category: "life",
  state: "solid",
  reactions: {
    "fly":     { elem2: null, func: behaviors.FEEDPIXEL },
    "ant":     { elem2: null, func: behaviors.FEEDPIXEL },
    "termite": { elem2: null, func: behaviors.FEEDPIXEL },
    "worm":    { elem2: null, func: behaviors.FEEDPIXEL },
	"spider":    { elem2: null, func: behaviors.FEEDPIXEL },
    "bee":     { elem2: null, func: eatBee },  
	"firefly": { elem2: null, func: eatBee },  
  "snail": { elem2: "limestone", func: behaviors.FEEDPIXEL },  
  "slug":    { elem2: null, func: behaviors.FEEDPIXEL },
  "pool_water": {chance: 0.70, elem1: null},
  "dirty_water": {chance: 0.70, elem1: null},
  },
  foodNeed: 10,
  baby: "toad_tadpole",
  temp: 18,
  tempHigh: 100,
  stateHigh: "cooked_meat",
  tempLow: -20,
  stateLow: "frozen_meat",
  breakInto: "slime",
  density: 1200,
 tick: function(pixel) {
    if (pixel.poisoned !== undefined) {
      pixel.poisoned--;
      if (pixel.poisoned <= 0) {
        deletePixel(pixel.x, pixel.y);
        return;
      }
    }
  },
};


elements.toad_tadpole = {
	color: "#87b574",
	behavior: [
		"XX|XX|M2%25 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
		"XX|FX%0.5|SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
		"M2|M1|M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%14",
	],
	reactions: {
		"algae": { elem2:null, chance:0.25 },
		"kelp": { elem2:"water", chance:0.25 },
    "pool_water": {chance: 0.70, elem1: null},
    "dirty_water": {chance: 0.70, elem1: null},
	},
	tempHigh: 100,
	stateHigh: "steam",
	tempLow: -10,
	stateLow: "ice",
	breakInto: ["slime",null],
	category:"life",
	hidden: true,
	state: "solid",
	density: 1450,
	conduct: 0.2,
  tick: function(pixel) {

if (pixelTicks-pixel.start > 500) {
			changePixel(pixel,"toad");
		}

  pixel.lifetime ??= 30

    let up = pixel.y > 0 ? pixelMap[pixel.x][pixel.y - 1] : null;
let down = pixel.y < pixelMap[0].length - 1 ? pixelMap[pixel.x][pixel.y + 1] : null;
let left = pixel.x > 0 ? pixelMap[pixel.x - 1][pixel.y] : null;
let right = pixel.x < pixelMap.length - 1 ? pixelMap[pixel.x + 1][pixel.y] : null;

  if(
  (up && up.element === "water") ||
  (down && down.element === "water") ||
  (left && left.element === "water") ||
  (right && right.element === "water"))
  {
    pixel.lifetime = 30;
  } else {
     pixel.lifetime--;
    if (pixel.lifetime <= 0 && Math.random() <= 0.1) {
      deletePixel(pixel.x, pixel.y);
      createPixel("slime", pixel.x, pixel.y);
    }
  }
  }
},

elements.newt = {
	color: ["#db8727","#945a18"],
	behavior:[
    ["XX","XX","SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%15"],
    ["XX","FX%25","M2%15 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%15"],
	["M2","M1 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%15","M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%15"],
	],
	category: "life",
	state: "solid",
	reactions: {
		"fly": {elem2: null, func:behaviors.FEEDPIXEL },
    "termite": {elem2: null, func:behaviors.FEEDPIXEL },
    "ant": {elem2: null, func:behaviors.FEEDPIXEL },
    "worm": {elem2: null, func:behaviors.FEEDPIXEL },
    "slug": {elem2: null, func:behaviors.FEEDPIXEL },
    "snail": {elem2: "limestone", func:behaviors.FEEDPIXEL },
    "pool_water": {chance: 0.70, elem1: null},
    "dirty_water": {chance: 0.70, elem1: null},
  },
  foodNeed: 10,
  temp: 18,
  tempHigh: 100,
  stateHigh: "cooked_meat",
  tempLow: -20,
  stateLow: "frozen_meat",
  breakInto: "slime",
  density: 1200,
  eggColor: "#ffeeab",
};

//finish the stuff
elements.axolotl= {
color: ["#ff99ff", "#ffe100", "#785705"],
behavior: [
  ["XX", "XX", "SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%10"],
  ["XX", "FX", "M2%15 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%10"],
  ["M2", "M1", "M2 AND SW:water,salt_water,sugar_water,dirty_water,seltzer,pool_water%10"],
],
category: "life",
state: "solid",
reactions: {
		"fly": {elem2: null, func:behaviors.FEEDPIXEL },
    "termite": {elem2: null, func:behaviors.FEEDPIXEL },
    "ant": {elem2: null, func:behaviors.FEEDPIXEL },
    "worm": {elem2: null, func:behaviors.FEEDPIXEL },
    "slug": {elem2: null, func:behaviors.FEEDPIXEL },
    "snail": {elem2: "limestone", func:behaviors.FEEDPIXEL },
    "pool_water": {chance: 0.70, elem1: null},
    "dirty_water": {chance: 0.70, elem1: null},
},
foodNeed: 20,
temp: 18,
tempHigh: 90,
stateHigh: "cooked_meat",
tempLow: -20,
stateLow: "frozen_meat",
breakInto: ["slime", "blood"],
density: 1000,
eggColor: ["#dcdcdc", "#a9a9a9", "#2b2b2b"],
tick: function(pixel) {
  pixel.lifetime ??= 900;

let up = pixel.y > 0 ? pixelMap[pixel.x][pixel.y - 1] : null;
let down = pixel.y < pixelMap[0].length - 1 ? pixelMap[pixel.x][pixel.y + 1] : null;
let left = pixel.x > 0 ? pixelMap[pixel.x - 1][pixel.y] : null;
let right = pixel.x < pixelMap.length - 1 ? pixelMap[pixel.x + 1][pixel.y] : null;

  if(
  (up && up.element === "water") ||
  (down && down.element === "water") ||
  (left && left.element === "water") ||
  (right && right.element === "water"))
  {
    pixel.lifetime = 900;
  } else {
     pixel.lifetime--;
    if (pixel.lifetime <= 0 && Math.random() <= 0.1) {
      deletePixel(pixel.x, pixel.y);
      createPixel("meat", pixel.x, pixel.y);
    }
  }
}
};