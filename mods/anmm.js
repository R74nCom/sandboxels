urlParams = new URLSearchParams(window.location.search);

function elementExists(elementName) {
	return typeof(elements[elementName]) === "object";
};

function randomIntegerFromZeroToValue(value) {
	var absoluteValuePlusOne = Math.abs(value) + 1;
	if(value >= 0) { //Positive case
		return Math.floor(Math.random() * absoluteValuePlusOne)
	} else { //Negative case: flip sign
		return 0 - Math.floor(Math.random() * absoluteValuePlusOne)
	};
};

function randomChoice(array) {
	if(!array) { throw new Error("randomChoice: Array is undefined or missing!") }
	if(array.length === 0) { throw new Error(`The array ${array} is empty`) };
	var length = array.length;
	var randomIndex = randomIntegerFromZeroToValue(length - 1);
	return array[randomIndex];
};

window.addEventListener("load",function() {
	currentElement = urlParams.get("currentElement") ?? "sand";
	if(!elementExists(currentElement)) {
		currentElement = "sand"
	};
	selectElement(currentElement);

	var size = urlParams.get("mouseSize") ?? 5;
	if(isNaN(size)) {
		size = 5;
	};
	mouseSize = size

	var _tps = urlParams.get("tps") ?? "30";
	if(isNaN(parseInt(_tps))) {
		_tps = 30;
	};
	tps = parseInt(_tps);
	if(tps !== 30) {
		resetInterval(tps)
	};

	if(enabledMods.includes("mods/cursor_shapes.js")) {
		var shape = urlParams.get("currentShape") ?? "square";
		if(shapeOrder.indexOf(shape) == -1) {
			shape = "square"
		};
		currentShape = shape
	};

	/*if(urlParams.get("pause") !== null) {
		paused = true;
		document.getElementById("pauseButton").setAttribute("on","true")
	};*/
});

function getEmptyVonNeumannNeighbors(pixel,returnOffsets=false) {
	var neighbors = [];
	var x = pixel.x;
	var y = pixel.y;
	for(var i = 0; i < adjacentCoords.length; i++) {
		var offsetX = adjacentCoords[i][0];
		var offsetY = adjacentCoords[i][1];
		var finalX = pixel.x + offsetX;
		var finalY = pixel.y + offsetY;
		if(isEmpty(finalX,finalY,false)) {
			neighbors.push(returnOffsets ? [offsetX,offsetY] : [finalX,finalY])
		};
	};
	return neighbors
};

mooreDonutCoords = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]; //Moore neighborhood (includes corners) minus center, as opposed to the von Neumann neighborhood which is the + shape.

function getPixelMooreNeighbors(pixel) {
	var coordsToCheck = mooreDonutCoords.map(function(offsets) { return {x: offsets[0]+pixel.x, y: offsets[1]+pixel.y} } );
	var neighbors = [];
	for(var i = 0; i < coordsToCheck.length; i++) {
		var coords = coordsToCheck[i];
		if(outOfBounds(coords.x,coords.y)) {
			continue
		};
		if(isEmpty(coords.x,coords.y,true)) {
			continue
		};
		if(!pixelMap[coords.x]?.[coords.y]) {
			continue
		};
		neighbors.push(pixelMap[coords.x][coords.y])
	};
	return neighbors
};

function getEmptyMooreNeighbors(pixel,returnOffsets=false) {
	var neighbors = [];
	var x = pixel.x;
	var y = pixel.y;
	for(var i = 0; i < mooreDonutCoords.length; i++) {
		var offsetX = mooreDonutCoords[i][0];
		var offsetY = mooreDonutCoords[i][1];
		var finalX = pixel.x + offsetX;
		var finalY = pixel.y + offsetY;
		if(isEmpty(finalX,finalY,false)) {
			neighbors.push(returnOffsets ? [offsetX,offsetY] : [finalX,finalY])
		};
	};
	return neighbors
};

function createPixelReturn(elementIn,x,y) { //sugar
	var element = elementIn; while(element instanceof Array) { element = randomChoice(element) };
	var newPixel = new Pixel(x, y, element);
	currentPixels.push(newPixel);
	checkUnlock(element);
	return newPixel;
};

var dw = "dirty_water";
elements.mud.reactions.water = {elem1: ["mud","mud","mud","muddy_water"], elem2: "muddy_water", chance: 0.01 };
elements.muddy_water = {
    color: "#2D468B",
    behavior: behaviors.LIQUID,
    tempHigh: 100,
    stateHigh: ["steam","steam","steam","steam","mudstone"],
    tempLow: 0,
    stateLow: ["ice","ice","ice","ice","permafrost"],
    category: "liquids",
    heatCapacity: 4.184,
    reactions: {
		"muddy_water": {elem1: ["water","water","water","water","mud"], elem2: ["water","water","water","water","mud"], chance: 0.0005},
		//everything else
        "dust": { elem1: dw, elem2: null },
        "ash": { elem1: dw, elem2: null },
        "cyanide": { elem1: dw, elem2: null },
        "cyanide_gas": { elem1: dw, elem2: null },
        "sulfur": { elem1: dw, elem2: null },
        "rat": { elem1: dw, chance:0.005 },
        "plague": { elem1: dw, elem2: null },
        "rust": { elem1: dw, chance:0.005 },
        "lead": { elem1: dw, chance:0.005 },
        "solder": { elem1: dw, chance:0.005 },
        "fallout": { elem1: dw, chance:0.25 },
        "radiation": { elem1: dw, chance:0.25 },
        "uranium": { elem1: dw, chance:0.25 },
        "rad_steam": { elem1: dw, chance:0.02 },
        "rad_glass": { elem1: dw, chance:0.005 },
        "rad_shard": { elem1: dw, chance:0.01 },
        "rotten_meat": { elem1: dw, chance:0.25 },
        "rotten_cheese": { elem1: dw, chance:0.25 },
        "cancer": { elem1: dw, chance:0.25 },
        "oil": { elem1: dw, chance:0.005 },
        "dioxin": { elem1: dw, chance:0.1 },
        "rock": { elem2: "wet_sand", chance: 0.00035 },
        "limestone": { elem2: "wet_sand", chance: 0.00035 },
        "tuff": { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 },
        "ruins": { elem2: "rock", chance: 0.00035 },
        "mudstone": { elem2: "mud", chance: 0.00015 },
        "methane": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
        "ammonia": { elem1:"primordial_soup", elem2:"primordial_soup", tempMin:60, charged:true },
        "fly": { elem2:"dead_bug", chance:0.125, oneway:true },
        "firefly": { elem2:"dead_bug", chance:0.125, oneway:true },
        "bee": { elem2:"dead_bug", chance:0.0625, oneway:true },
        "stink_bug": { elem2:"dead_bug", chance:0.125, oneway:true },
        "cured_meat": { elem1:"dirty_water", elem2:"meat" },
		//can't bubble because that would require arrays to work on attr2
    },
    state: "liquid",
    density: 1100,
    conduct: 0.02,
    stain: -0.5,
    extinguish: true
}

elements.glass_shard.reactions ??= {};
elements.rad_shard.reactions ??= {};
elements.glass_shard.reactions.body = {elem2: ["meat","meat","meat","meat","blood"], chance: 0.05};
elements.rad_shard.reactions.body = {elem2: ["meat","meat","cooked_meat","ash","blood","cancer"], chance: 0.05};
elements.glass_shard.reactions.head = {elem2: ["meat","meat","bone","meat","bone","blood"], chance: 0.025};
elements.rad_shard.reactions.head = {elem2: ["meat","meat","bone","cooked_meat","ash","blood","bone","cancer"], chance: 0.025};

var hasArgon = (elementExists("argon") && elementExists("liquid_argon"));

var nitrogenChance = ((1.204 * 0.7808) / elements.liquid_nitrogen.density);
var oxygenChance = ((1.204 * 0.2095) / elements.liquid_oxygen.density);
var snowChance = (0.00933 / elements.snow.density); //based on New York City in May https://www.omnicalculator.com/physics/absolute-humidity https://weather-and-climate.com/average-monthly-Humidity-perc,New-York,United-States-of-America https://weather-and-climate.com/average-monthly-min-max-Temperature,New-York,United-States-of-America
var argonChance; if(hasArgon == true) { argonChance = ((1.204 * 0.0093) / elements.liquid_argon?.density) } else { argonChance = 0 }; // is it just me or has JavaScript almost entirely restricted the use of ternary operators?

var condensationMultiplierScaling = Math.abs(-273.15 - (-190));

function glaciliteBase(pixel,coolingAmount,maximumTemperature,cmsScaling=1.5) {
	if(pixel.temp > maximumTemperature) {
		if(pixel.temp - coolingAmount <= maximumTemperature) {
			pixel.temp = maximumTemperature
		} else {
			pixel.temp = pixel.temp - coolingAmount;
		}
	};
	
	var condensationMultiplier = 1;
	if(pixel.temp < -190) { //NOT scaled to maximum temperature OR absolute zero
		var distanceFromNegative190 = Math.abs((-190) - pixel.temp);
		condensationMultiplier = Math.max(6,1 + (distanceFromNegative190 / (condensationMultiplierScaling / cmsScaling)));
	}
	
	var emptyNeighbors = getEmptyVonNeumannNeighbors(pixel);
	if(emptyNeighbors.length > 0) {
		if((pixel.temp < elements.nitrogen.tempLow) && (Math.random() < (nitrogenChance * condensationMultiplier))) {
			var randomEmptySpace = randomChoice(emptyNeighbors);
			let np = createPixel("liquid_nitrogen",...randomEmptySpace); if(np) { np.temp = pixel.temp };
			emptyNeighbors = getEmptyVonNeumannNeighbors(pixel)
		}
	};
	if(emptyNeighbors.length > 0) {
		if((pixel.temp < elements.oxygen.tempLow) && (Math.random() < (oxygenChance * condensationMultiplier))) {
			var randomEmptySpace = randomChoice(emptyNeighbors);
			let np = createPixelReturn("liquid_oxygen",...randomEmptySpace); if(np) { np.temp = pixel.temp };
			emptyNeighbors = getEmptyVonNeumannNeighbors(pixel)
		}
	};
	if((emptyNeighbors.length > 0)) {
		if((pixel.temp < elements.water.tempLow) && (Math.random() < (snowChance * condensationMultiplier))) {
			var randomEmptySpace = randomChoice(emptyNeighbors);
			let np = createPixelReturn("snow",...randomEmptySpace); if(np) { np.temp = pixel.temp };
			emptyNeighbors = getEmptyVonNeumannNeighbors(pixel)
		}
	}
	if(hasArgon && (emptyNeighbors.length > 0)) {
		if((pixel.temp < elements.argon.tempLow) && (Math.random() < (argonChance * condensationMultiplier))) {
			var randomEmptySpace = randomChoice(emptyNeighbors);
			let np = createPixelReturn("liquid_argon",...randomEmptySpace); if(np) { np.temp = pixel.temp };
			emptyNeighbors = getEmptyVonNeumannNeighbors(pixel)
		}
	}
}

elements.glacilite = {
	behavior: behaviors.WALL,
	state: "solid",
	category: "solids",
	density: 7228,
	hardness: 0.32,
	temp: -190,
	breakInto: "glacilite_shard",
	color: ["#17BBF6","#70A4FE","#6ADCEE","#8EA9FF"],
	tempHigh: 1200,
	stateHigh: "liquified_glacilite",
	tick: function(pixel) {
		glaciliteBase(pixel,5,-190)
	}
}

elements.glacilite_shard = {
	behavior: behaviors.POWDER,
	state: "solid",
	category: "powders",
	hidden: true,
	density: 3819,
	hardness: 0.89,
	temp: -190,
	color: ["#17BBF6","#70A4FE","#6ADCEE","#8EA9FF"],
	tempHigh: 1200,
	stateHigh: "liquified_glacilite",
	tick: function(pixel) {
		glaciliteBase(pixel,5,-190)
	}
}

elements.liquified_glacilite = {
	behavior: behaviors.LIQUID,
	state: "liquid",
	category: "liquids",
	hidden: true,
	density: 4171,
	temp: -260,
	hardness: 0.99,
	color: ["#01BFE1","#2404C3","#0763DB","#04308F","#3AF0F3"],
	tempHigh: 1200,
	stateHigh: "liquified_glacilite",
	tick: function(pixel) {
		var maximumTemperature = (settings.abszero ?? -273.15);
		var coolingAmount = 14;
		var cmsScaling = 3.5;
		if(pixel.temp > maximumTemperature) {
			if(pixel.temp - coolingAmount <= maximumTemperature) {
				pixel.temp = maximumTemperature
			} else {
				pixel.temp = pixel.temp - coolingAmount;
			}
		};
		
		var condensationMultiplier = 1;
		if(pixel.temp < -150) { //NOT scaled to maximum temperature OR absolute zero
			var distanceFromNegative190 = Math.abs((-190) - pixel.temp);
			condensationMultiplier = Math.max(6,1 + (distanceFromNegative190 / (condensationMultiplierScaling / cmsScaling)));
		};

		var mooreNeighbors = getPixelMooreNeighbors(pixel);
		for(let i = 0; i < mooreNeighbors.length; i++) {
			if(Math.random() < (0.02 * condensationMultiplier)) {
				let otherPixel = mooreNeighbors[i];
				let otherElem = otherPixel.element;
				let otherData = elements[otherElem];
				let otherTL = otherData.tempLow;
				let otherSL = otherData.stateLow;
				if((otherTL == undefined) || (otherSL == undefined)) {
					otherPixel.temp = pixel.temp;
				} else if((typeof(otherTL) == "number") && (typeof(elements[otherSL]) == "string")) {
					changePixel(otherPixel,otherSL,true);
					otherPixel.temp = Math.min(pixel.temp,otherTL - 5);
					pixelTempCheck(pixel);
				}
			}
		};

		var emptyNeighbors = getEmptyMooreNeighbors(pixel);
		if(emptyNeighbors.length > 0) {
			if((pixel.temp < elements.nitrogen.tempLow) && (Math.random() < (nitrogenChance * condensationMultiplier))) {
				var randomEmptySpace = randomChoice(emptyNeighbors);
				let np = createPixel("liquid_nitrogen",...randomEmptySpace); if(np) { np.temp = pixel.temp };
				emptyNeighbors = getEmptyMooreNeighbors(pixel)
			}
		};
		if(emptyNeighbors.length > 0) {
			if((pixel.temp < elements.oxygen.tempLow) && (Math.random() < (oxygenChance * condensationMultiplier))) {
				var randomEmptySpace = randomChoice(emptyNeighbors);
				let np = createPixelReturn("liquid_oxygen",...randomEmptySpace); if(np) { np.temp = pixel.temp };
				emptyNeighbors = getEmptyMooreNeighbors(pixel)
			}
		};
		if((emptyNeighbors.length > 0)) {
			if((pixel.temp < elements.water.tempLow) && (Math.random() < (snowChance * condensationMultiplier))) {
				var randomEmptySpace = randomChoice(emptyNeighbors);
				let np = createPixelReturn("snow",...randomEmptySpace); if(np) { np.temp = pixel.temp };
				emptyNeighbors = getEmptyMooreNeighbors(pixel)
			}
		}
		if(hasArgon && (emptyNeighbors.length > 0)) {
			if((pixel.temp < elements.argon.tempLow) && (Math.random() < (argonChance * condensationMultiplier))) {
				var randomEmptySpace = randomChoice(emptyNeighbors);
				let np = createPixelReturn("liquid_argon",...randomEmptySpace); if(np) { np.temp = pixel.temp };
				emptyNeighbors = getEmptyMooreNeighbors(pixel)
			}
		}
	}
}

function igniscidBase(pixel,heatingAmount,minimumTemperature,nerfExponent) {
	if(pixel.temp < minimumTemperature) {
		if(pixel.temp + heatingAmount >= minimumTemperature) {
			pixel.temp = minimumTemperature
		} else {
			pixel.temp = pixel.temp + heatingAmount;
		}
	};
	
	var nerfFactor = 1;
	if(pixel.temp > minimumTemperature) { nerfFactor = 1 / (Math.log10((pixel.temp - (minimumTemperature - 1))) + 1) ** nerfExponent };
	if(Math.random() < (0.04 * nerfFactor)) { pixel.temp += heatingAmount };
	
	var emptyNeighbors = getEmptyVonNeumannNeighbors(pixel,true);
	var element = "fire";
	var temp = pixel.temp;
	if(pixel.temp >= 7000) {
		element = "plasma";
		temp = Math.max(temp,5000);
	} else if(pixel.temp < 100) {
		element = "smoke";
		pixel.temp += 1.5;
	};
	for(var i = 0; i < emptyNeighbors.length; i++) {
		var coords = emptyNeighbors[i];
		var distance = coords.map(x => Math.abs(x)).reduce((a,b) => a + b);
		coords = [coords[0]+pixel.x,coords[1]+pixel.y];
		var chance = 1/distance;
		var newPixel = createPixelReturn(element,...coords);
		if(newPixel && (newPixel.temp < pixel.temp)) {
			newPixel.temp = temp
		}
	}
}

elements.igniscid = {
	behavior: behaviors.WALL,
	state: "solid",
	category: "solids",
	density: 3300,
	hardness: 0.44,
	temp: 1200,
	breakInto: "igniscid_shard",
	color: ["#f68317","#f6b317","#eeea6a","#ffa38e"],
	tempHigh: 11000,
	stateHigh: "liquified_igniscid",
	tick: function(pixel) {
		igniscidBase(pixel,4,1200,1.2)
	}
}

elements.igniscid_shard = {
	behavior: behaviors.POWDER,
	state: "solid",
	category: "powders",
	hidden: true,
	density: 3100,
	hardness: 0.89,
	temp: 1200,
	color: ["#f68317","#f6b317","#eeea6a","#ffa38e"],
	tempHigh: 11000,
	stateHigh: "liquified_igniscid",
	tick: function(pixel) {
		igniscidBase(pixel,4,1200,1.2)
	}
}

elements.liquified_igniscid = {
	behavior: behaviors.LIQUID,
	state: "liquid",
	category: "liquids",
	hidden: true,
	density: 2790,
	temp: 12000,
	hardness: 0.99,
	color: ["#f77b0f","#e0410b","#db4a07","#f5ac7f","#f3593a"],
	tick: function(pixel) {
		igniscidBase(pixel,12,100000,0.5)
	}
}

elements.frozen_fertilizer = {
    color: ["#4d341d","#40301c","#3d2814"],
    behavior: [
		"CR:stench,stench,methane%0.25|CR:stench,stench,methane%0.5|CR:stench,stench,methane%0.25",
		"CR:stench,stench,methane%0.5|XX|CR:stench,stench,methane%0.5",
		"CR:stench,stench,methane%0.25|CR:stench,stench,methane%0.5|CR:stench,stench,methane%0.25"
	],
    behavior: behaviors.WALL,
    tempHigh: 0,
	stateHigh: "fertilizer",
    category: "solids",
	hardness: 0.35,
	breakInto: "fertilizer",
    state: "solid",
    density: 1060,
    stain: 0.01,
	hidden: true,
},

elements.fertilizer = {
    color: ["#451f0a","#542b07","#593317"],
    behavior: [
		"CR:stench,stench,methane%0.25|CR:stench,stench,methane%0.5|CR:stench,stench,methane%0.25",
		"M2 AND CR:stench,stench,methane%0.5|XX|M2 AND CR:stench,stench,methane%0.5",
		"M1|M1|M1"
	],
    viscosity: 8000,
    tempHigh: 40,
    stateHigh: ["poison","stench","methane","dried_fertilizer","dried_fertilizer","dried_fertilizer","dried_fertilizer","dried_fertilizer","dried_fertilizer","dried_fertilizer","dried_fertilizer"],
    tempLow: 0,
	stateLow: "frozen_fertilizer",
    category: "solids",
    state: "solid",
    density: 1060,
    stain: 0.07
},

elements.dried_fertilizer = {
    color: ["#4f382b","#66462b","#704a2b"],
    behavior: [
		"CR:stench,stench,methane%0.15|CR:stench,stench,methane%0.3|CR:stench,stench,methane%0.15",
		"CR:stench,stench,methane%0.3|XX|CR:stench,stench,methane%0.3",
		"M2|M1|M2"
	],
    tempHigh: 100,
    stateHigh: ["steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","steam","stench","poison","stench","poison","methane","methane","cooked_fertilizer","cooked_fertilizer","cooked_fertilizer","cooked_fertilizer","cooked_fertilizer","cooked_fertilizer","cooked_fertilizer","cooked_fertilizer","cooked_fertilizer","cooked_fertilizer","cooked_fertilizer","cooked_fertilizer",],
    category: "solids",
    state: "solid",
    density: 1100,
    stain: 0.045,
	hidden: true
},

elements.cooked_fertilizer = {
    color: ["#473931","#594636","#4f3621"],
    behavior: [
		"CR:stench,stench,methane%0.1|CR:stench,stench,methane%0.2|CR:stench,stench,methane%0.1",
		"CR:stench,stench,methane%0.2|XX|CR:stench,stench,methane%0.2",
		"M2|M1|M2"
	],
    tempHigh: 550,
    stateHigh: ["charcoal","hydrogen","oxygen","nitrogen","sulfur_gas","metal_scrap","calcium","stench","poison_gas","steam","dust"],
    category: "solids",
    state: "solid",
    density: 1240,
	burn: 3,
	burnTime: 260,
	fireElement: ["stench","smoke","carbon_dioxide","poison_gas","fire","fire","fire","fire"],
	burnInto: ["charcoal","hydrogen","oxygen","nitrogen","molten_sulfur","metal_scrap","calcium","stench","poison_gas","steam","dust","stench","poison_gas","smoke"],
	hidden: true
},

elements.fartium = {
	behavior: behaviors.LIQUID,
	state: "liquid",
	category: "liquids",
	density: elements.water.density,
	hardness: 0.4,
	breakInto: ["fire","pop","stench","sulfur_gas"],
	color: ["#9B8E66","#699941","#869637"],
	tempHigh: 800,
	stateHigh: ["fire","explosion","fire","stench","stench"],
	burn: 0.8,
	burnTime: 150,
	burnInto: ["stench","stench","stench","stench","fire","fire","fire","fire","liquified_sulfur","explosion"],
	tick: function(pixel) {
		var chanceModifier = Math.min(0.22,(pixel.temp - 20) / 750);
		if(chanceModifier < 0) { chanceModifier *= 2 };
		chanceModifier = Math.max(-0.055,chanceModifier);

		if(Math.random() < (0.06 + chanceModifier)) {
			var emptyNeighbors = getEmptyMooreNeighbors(pixel);
			var amountDecider = Math.random();
			var amount;
			if(amountDecider < 0.2) {
				amount = 0
			} else if(amountDecider < 0.3) {
				amount = 1
			} else if(amountDecider < 0.5) {
				amount = 2
			} else if(amountDecider < 0.75) {
				amount = 3
			} else if(amountDecider < 0.85) {
				amount = 4
			} else if(amountDecider < 0.95) {
				amount = 5
			} else {
				amount = 6
			};
			for(let i = 0; i < amount; i++) {
				var typeDecider = Math.random();
				var type;
				if(typeDecider < 0.8) {
					type = "methane"
				} else if(typeDecider < 0.995) {
					type = "stench"
				} else if(typeDecider < 0.998) {
					type = Math.random() < 0.8 ? "mud" : "fertilizer";
				} else {
					type = "sulfur"
				}

				if(emptyNeighbors.length > 0) {
					var randomEmptySpace = randomChoice(emptyNeighbors);
					let np = createPixel(type,...randomEmptySpace); if(np) {
						np.temp = pixel.temp; pixelTempCheck(np);
						if(type == "fertilizer") { pixelColorPick(np,elements.mud.color) };
					}
					emptyNeighbors = getEmptyMooreNeighbors(pixel);
					if(emptyNeighbors.length == 0) { break };
				}
			}
		}
	}
}

