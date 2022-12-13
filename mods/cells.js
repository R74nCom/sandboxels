goldObject = {
	gold: 1,
	gold_coin: 1,
	gold_fairy: 3
};

goldObjectNameArray = Object.keys(goldObject);

urlParams = new URLSearchParams(window.location.search);

if(urlParams.get('goldFairyAmount') != null) { //null check
    goldFairyAmount = urlParams.get('goldFairyAmount')
    if(isNaN(goldFairyAmount) || goldFairyAmount === "" || goldFairyAmount === null) { //NaN check
         goldFairyAmount = 10
    }
    goldFairyAmount = parseInt(goldFairyAmount)
	if(goldFairyAmount > 10000) {
		alert("Maximum amount of additional gold fairies is 10000.\nOnly 10000 fairies were added.")
	} else if(goldFairyAmount < 1) {
		alert("Minimum amount of additional gold fairies is 1.\n1 fairy was added.")
	}
    goldFairyAmount = Math.min(10000,Math.max(goldFairyAmount,1))
} else {
    goldFairyAmount = 10
}

elements.cell_1 = {
	color: ["#bbee00","#eeee00","#cfee00"],
	behavior: [
		"XX|CL%0.5|XX",
		"CL%0.5|HT:1%2|CL%0.5",
		"M2%10|M1|M2%10",
	],
	uwu: 0,
	properties: {
		uwu: 0
	},
	tick: function(pixel) {
		pixel.uwu = 0;
		for (let i = -1; i < 2; i++) { //neighbor count
			for (let j = -1; j < 2; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						pixel.uwu += 1;
					};
				};
			};
		};
		pixel.uwu -= 1; //exclude self

		var tempGrowthDecrease = null;
		if(pixel.temp < 70) {
			tempGrowthDecrease = 0;
		} else if(pixel.temp > 100) {
			tempGrowthDecrease = 70;
		} else {
			tempGrowthDecrease = pixel.temp - 70;
		}
		
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu)) {
			uwu = 0;
		} else {
			var tempGain = pixel.uwu / 48;
			var chanceGain = pixel.uwu / 96;
		};
		if(Math.random() < (  (2 + chanceGain) - (tempGrowthDecrease / 30)  )) {
			pixel.temp += tempGain;
		};
	},
	reactions: {
		"infection": { "elem1":"cancer", "chance":0.01 },
		"blood": { "elem1":"blood", "chance":0.01 },
		"antibody": { "elem1":"antibody", "chance":0.01 },
		"sugar": { "elem2":"cell", "chance":0.03 },
		"sugar_water": { "elem2":"cell", "chance":0.04 },
		"alcohol": { "elem1":[null,"dna"], "chance":0.02 },
		"poison": { "elem1":null, "chance":0.02 },
		"oxygen": { "elem2":"carbon_dioxide", "chance":0.05 },
		"ammonia": { "elem2":"nitrogen", "chance":0.05 },
	},
	tempHigh: 122,
	stateHigh: "steam",
	tempLow: -6,
	stateLow: "ice",
	state: "solid",
	density: 1000.2,
	category: "life",
	breakInto: ["water","dna","dna","dna"]
};

elements.cell_2 = {
	color: ["#32280b","#5a4711","#87660c"],
	behavior: [
		"XX|CL%1.8|XX",
		"CL%1.8|XX|CL%1.8",
		"M2%5|M1|M2%5",
	],
	reactions: {
		"cancer": { "elem2":"cell_2", "chance":0.035 },
		"cell": { "elem2":"cell_2", "chance":0.001 },
		"frog": { "elem2":"cell_2", "chance":0.001 },
		"fish": { "elem2":"cell_2", "chance":0.001 },
		"rat": { "elem2":"cell_2", "chance":0.001 },
		"bird": { "elem2":"cell_2", "chance":0.001 },
		"sugar": { "elem2":"cell_2", "chance":0.035 },
		"sugar_water": { "elem2":"cell_2", "chance":0.045 },
		"alcohol": { "elem1":[null,"dna"], "chance":0.012 },
		"poison": { "elem1":[null,null,"poison","poison","poison","dna","dirty_water"], "chance":0.03 },
		"proton": { "elem1":[null,"cancer"], "chance":0.04 },
	},
	tempHigh: 80,
	stateHigh: ["steam","plague"],
	state: "solid",
	density: 1000.17,
	category: "life",
	breakInto: ["dirty_water","dna","dna","dna","dna"]
};

elements.cell_3 = {
	color: ["#bbee00","#eeee00","#cfee00"],
	behavior: [
		"XX|CL%0.5|XX",
		"CL%0.5|HT:1%2|CL%0.5",
		"M2%10|M1|M2%10",
	],
	uwu: 0,
	properties: {
		uwu: 0
	},
	tick: function(pixel) {
		pixel.uwu = 0;
		for (let i = -1; i < 2; i++) { //neighbor count
			for (let j = -1; j < 2; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						pixel.uwu += 1;
					};
				};
			};
		};
		pixel.uwu -= 1; //exclude self

		var tempGrowthDecrease = null;
		if(pixel.temp < 70) {
			tempGrowthDecrease = 0;
		} else if(pixel.temp > 100) {
			tempGrowthDecrease = 70;
		} else {
			tempGrowthDecrease = pixel.temp - 70;
		}
		
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu)) {
			uwu = 0;
		} else {
			var tempGain = pixel.uwu / 48;
			var chanceGain = pixel.uwu / 96;
		};
		if(Math.random() < (  (2 + chanceGain) - (tempGrowthDecrease / 30)  )) {
			pixel.temp += tempGain;
		};
	},
	reactions: {
		"infection": { "elem1":"cancer", "chance":0.01 },
		"blood": { "elem1":"blood", "chance":0.01 },
		"antibody": { "elem1":"antibody", "chance":0.01 },
		"sugar": { "elem2":"cell", "chance":0.03 },
		"sugar_water": { "elem2":"cell", "chance":0.04 },
		"alcohol": { "elem1":[null,"dna"], "chance":0.02 },
		"poison": { "elem1":null, "chance":0.02 },
		"oxygen": { "elem2":"carbon_dioxide", "chance":0.05 },
		"ammonia": { "elem2":"nitrogen", "chance":0.05 },
	},
	tempHigh: 122,
	stateHigh: "steam",
	tempLow: -6,
	stateLow: "ice",
	state: "solid",
	density: 1000.2,
	category: "life",
	breakInto: ["water","dna","dna","dna"]
};

elements.cell_3 = {
	color: ["#eeee00","#eecc00","#dddd00"],
	behavior: [
		"XX|CL%0|XX", //CL%0 for display purposes
		"CL%0|XX|CL%0",
		"M2%10|M1|M2%10",
	],
	reactions: {
		"infection": { "elem1":"cancer", "chance":0.01 },
		"blood": { "elem1":"blood", "chance":0.01 },
		"antibody": { "elem1":"antibody", "chance":0.01 },
		"sugar": { "elem2":"cell", "chance":0.03 },
		"sugar_water": { "elem2":"cell", "chance":0.04 },
		"alcohol": { "elem1":[null,"dna"], "chance":0.02 },
		"poison": { "elem1":null, "chance":0.02 },
		"oxygen": { "elem2":"carbon_dioxide", "chance":0.05 },
		"ammonia": { "elem2":"nitrogen", "chance":0.05 },
	},
	tempHigh: 102,
	stateHigh: "steam",
	tempLow: -2,
	stateLow: "ice",
	state: "solid",
	density: 1000.1,
	category: "life",
	breakInto: ["water","dna","dna","dna"],
	gold: 0,
	properties: {
		gold: 0
	},
	tick: function(pixel) {
		var pX = pixel.x
		var pY = pixel.y
		var baseEatRate = 1;
		var eatRate = baseEatRate + (2 * pixel.gold * 0.01);
		if(Math.random() < eatRate/100) {
			var randomNeighborNumber = Math.floor(Math.random() * 4)
			var oX = adjacentCoords[randomNeighborNumber][0];
			var oY = adjacentCoords[randomNeighborNumber][1];
			var checkPosX = pX+oX;
			var checkPosY = pY+oY;
			
			if(!isEmpty(checkPosX,checkPosY,true)) {
				if(goldObjectNameArray.includes(pixelMap[checkPosX][checkPosY].element)) {
					pixel.gold += goldObject[pixelMap[checkPosX][checkPosY].element];
					deletePixel(checkPosX,checkPosY);
				};
			};
		};
		
		var baseGrowthRate = 0.5;
		var growthRate = baseGrowthRate + (pixel.gold * 0.025);
		
		if(pixel.gold > 150) {
			var chance = (pixel.gold - 150) / 20
			var baseRadius = 10
			var radius = Math.max(20,Math.round((baseRadius + (pixel.gold / 25))))
			if(Math.random() < (chance / 100)) {
				explodeAt(pX,pY,10,"gold_coin");
			};
		};
		
		if(Math.random() < growthRate/100) {
			var randomNeighborNumber = Math.floor(Math.random() * 4)
			var oX = adjacentCoords[randomNeighborNumber][0];
			var oY = adjacentCoords[randomNeighborNumber][1];
			var checkPosX = pX+oX;
			var checkPosY = pY+oY;
			
			if(isEmpty(checkPosX,checkPosY,false)) {
				var halfGold1 = pixel.gold / 2;
				var halfGold2 = pixel.gold / 2;
				if(halfGold1 % 1 == 0.5) {
					halfGold1 = Math.ceil(halfGold1);
					halfGold2 = Math.floor(halfGold2);
				};
				createPixel(pixel.element,checkPosX,checkPosY);
				newPixel = pixelMap[checkPosX][checkPosY];
				pixel.gold = halfGold1;
				newPixel.gold = halfGold2;
			};
		};

	},
	reactions: {
		"infection": { "elem1":"cancer", "chance":0.01 },
		"blood": { "elem1":"blood", "chance":0.01 },
		"antibody": { "elem1":"antibody", "chance":0.01 },
		"sugar": { "elem2":"cell", "chance":0.03 },
		"sugar_water": { "elem2":"cell", "chance":0.04 },
		"alcohol": { "elem1":[null,"dna"], "chance":0.02 },
		"poison": { "elem1":null, "chance":0.02 },
		"oxygen": { "elem2":"carbon_dioxide", "chance":0.05 },
		"ammonia": { "elem2":"nitrogen", "chance":0.05 },
	},
	tempHigh: 122,
	stateHigh: "steam",
	tempLow: -6,
	stateLow: "ice",
	state: "solid",
	density: 1000.2,
	category: "life",
	breakInto: ["water","dna","dna","dna"]
};

runAfterLoad(function() {
    if(enabledMods.includes("mods/fey_and_more.js")) {
	//old code {
		elements.gold_fairy = {
			name: "gold fairy",
			color: ["#cfa65b","#e6df63","#faf673"],
			behavior: [
				"XX|M1|M1",
				"XX|FX%5|XX",
				"XX|CR:gold_coin%0.25 AND CR:fairy_dust%0.005 AND M1|M1",
			],
			state: "solid",
			category: "fey"
		};

		elements.fairy.reactions.gold = { elem1: "gold_fairy", "elem2": null };
		elements.fairy.reactions.gold_coin = { elem1: "gold_fairy", "elem2": null };
		if(!elements.gold.reactions) {
			elements.gold.reactions = {};
		};
		if(!elements.gold_coin.reactions) {
			elements.gold_coin.reactions = {};
		};
		elements.gold.reactions.fairy = { elem1: null, elem2: "gold_fairy" };
		elements.gold_coin.reactions.fairy = { elem1: null,  elem2: "gold_fairy" };

		for (var i = 2; i <= goldFairyAmount + 1; i++) {
		  nameVar = `gold_${i-1}-fairy`
		  if(i === 2) {
			nameVar = "gold_fairy";
		  };
		  elements[`gold_${i}-fairy`] = {
			name: `gold_${i}-fairy`,
			color: ["#cfa65b","#e6df63","#faf673"],
			behavior: [
			  "XX|M1|M1",
			  "XX|FX%5|XX",
			  "XX|CR:" + nameVar + "%0.25 AND CR:fairy_dust%0.005 AND M1|M1",
			],
			reactions: {
			  "glitter": { "elem1": `gold_${i+1}-fairy`, "elem2": null }
			},
			state: "solid",
			excludeRandom:true,
			category: "fey",
			hidden: true,
		  }
		  goldObject[`gold_${i}-fairy`] = 3 * i;
		  if (i == goldFairyAmount) { elements[`gold_${i}-fairy`]["reactions"] = {}; }
		}
	//}
		
	//eList rebuilding {
		eLists.FAIRY.push("gold_fairy");
		for (var i = 2; i <= goldFairyAmount + 1; i++) {
			eLists.FAIRY.push(`gold_${i}-fairy`);
		}
		elements.iron.behavior = [
			"XX|DL:"+eLists.FAIRY+"|XX",
			"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
			"XX|DL:"+eLists.FAIRY+"|XX"
		];
		elements.silver.behavior = [
			"XX|DL:"+eLists.FAIRY+"|XX",
			"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
			"XX|DL:"+eLists.FAIRY+"|XX"
		];
	//}
	goldObjectNameArray = Object.keys(goldObject);
	};
    if(enabledMods.includes("mods/fey_and_more.js") && enabledMods.includes("mods/randomness.js")) {
		if(elements.tungstensteel && elements.molten_tungstensteel) {
			elements.tungstensteel.behavior = [
				"XX|DL:"+eLists.FAIRY+"|XX",
				"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
				"XX|DL:"+eLists.FAIRY+"|XX",
			],
			elements.molten_tungstensteel.behavior = [
				"XX|DL:"+eLists.FAIRY+" AND CR:fire%2.5|XX",
				"DL:"+eLists.FAIRY+" AND M2|XX|DL:"+eLists.FAIRY+" AND M2",
				"M1|DL:"+eLists.FAIRY+"|M1",
			]
		}
	};
	if(!elements.rainbow.reactions) {
		elements.rainbow.reactions = {}
	}
	elements.rainbow.reactions.gold_fairy = { "elem1": "gold_2-fairy", "elem2": null }
});
