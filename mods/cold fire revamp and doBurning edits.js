//Variable
fireSpawnBlacklist = ["fire","cold_fire"];

//doBurning
function doBurning(pixel) {
	if (pixel.burning) { // Burning
		var info = elements[pixel.element];
		var burnTempChange = info.burnTempChange
		if (burnTempChange == undefined) {
			burnTempChange = 1;
		};
		//move fire ahead so that cold burners don't light hot burners
		var fireIsCold;
		//Fire getter block
			var fire = info.fireElement;
			if (fire == undefined) {
				fire = 'fire';
			}
			else if(fire instanceof Array) {
				fire = fire[Math.floor(Math.random()*fire.length)];
			}
		//End fire getter block
		fireIsCold = (fire === "cold_fire");

		pixel.temp += burnTempChange;
		pixelTempCheck(pixel);
		for (var i = 0; i < adjacentCoords.length; i++) { // Burn adjacent pixels
			var x = pixel.x+adjacentCoords[i][0];
			var y = pixel.y+adjacentCoords[i][1];
			if (!isEmpty(x,y,true)) {
				var newPixel = pixelMap[x][y];
				var newInfo = elements[newPixel.element];
				var newFireIsCold;
				//Fire getter block
					var newFire = newInfo.fireElement;
					if (newFire == undefined) {
						newFire = 'fire';
					}
					else if(newFire instanceof Array) {
						newFire = newFire[Math.floor(Math.random()*newFire.length)];
					}
				//End fire getter block
				newFireIsCold = (newFire === "cold_fire");


				//console.log(`burning pixel ${pixel.element}: ${fire} (${fireIsCold}) / burned element ${newPixel.element}: ${newFire} (${newFireIsCold})`);
				if((!fireIsCold && !newFireIsCold) || (fireIsCold && newFireIsCold)) {
					if (elements[newPixel.element].burn && !newPixel.burning) {
						if (Math.floor(Math.random()*100) < elements[newPixel.element].burn) {
							newPixel.burning = true;
							newPixel.burnStart = pixelTicks;
						}
					}
				}
			}
		}

		if ((pixelTicks - pixel.burnStart > (info.burnTime || 200)) && Math.floor(Math.random()*100)<(info.burn || 10)) {
			var burnInto = info.burnInto;
			if (burnInto == undefined) {
				burnInto = 'fire';
			}
			else if (burnInto instanceof Array) {
				burnInto = burnInto[Math.floor(Math.random()*burnInto.length)];
			}
			changePixel(pixel,burnInto,(burnInto !== "smoke"));
			if (info.fireColor != undefined && burnInto == "fire") {
				pixel.color = pixelColorPick(pixel,info.fireColor);
			}
			else {
				pixel.color = pixelColorPick(pixel)
			}
		}
		else if (Math.floor(Math.random()*100)<10 && !fireSpawnBlacklist.includes(pixel.element)) { // Spawn fire
			if (isEmpty(pixel.x,pixel.y-1)) {
				createPixel(fire,pixel.x,pixel.y-1);
				pixelMap[pixel.x][pixel.y-1].temp = pixel.temp//+(pixelTicks - (pixel.burnStart || 0));
				if (info.fireColor != undefined) {
					pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1],info.fireColor);
				}
			}
			// same for below if top is blocked
			else if (isEmpty(pixel.x,pixel.y+1)) {
				createPixel(fire,pixel.x,pixel.y+1);
				pixelMap[pixel.x][pixel.y+1].temp = pixel.temp//+(pixelTicks - (pixel.burnStart || 0));
				if (info.fireColor != undefined) {
					pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1],info.fireColor);
				}
			}
		}
	}
}

//New elements

elements.cold_fire.burning = true;
elements.cold_fire.burnTempChange = -1;
elements.cold_fire.burnTime = 25;
elements.cold_fire.burnInto = "cold_smoke";
elements.cold_fire.fireElement = "cold_fire";
elements.cold_fire.behavior = [
	"M1|M1|M1",
	"M2|XX|M2",
	"XX|M2|XX"
],

elements.cold_smoke = {
	color: "#282848",
	behavior: behaviors.DGAS,
	reactions: {
		"steam": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
		"rain_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
		"cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
		"snow_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
		"hail_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
		"acid_cloud": { "elem1": "pyrocumulus", "chance":0.05, "y":[0,12], "setting":"clouds" },
		"fire_cloud": { "elem1": "pyrocumulus", "chance":0.05, "y":[0,12], "setting":"clouds" },
		"pyrocumulus": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,12], "setting":"clouds" },
	},
	temp: -100,
	tempHigh: 0,
	stateHigh: "smoke",
	tempLow: -114,
	stateLow: "cold_fire",
	category: "gases",
	state: "gas",
	density: 1280,
	stain: 0.075,
};

elements.cold_torch = {
	"color": "#4394d6",
	"behavior": [
		"XX|CR:cold_fire|XX",
		"XX|XX|XX",
		"XX|XX|XX"
	],
	"reactions": {
		"water": { "elem1": "wood" },
		"sugar_water": { "elem1": "wood" },
		"salt_water": { "elem1": "wood" },
		"seltzer": { "elem1": "wood" },
		"dirty_water": { "elem1": "wood" },
		"pool_water": { "elem1": "wood" },
		"steam": { "elem1": "wood" },
		"smog": { "elem1": "wood" },
		"rain_cloud": { "elem1": "wood" },
		"cloud": { "elem1": "wood" },
		"snow_cloud": { "elem1": "wood" },
		"hail_cloud": { "elem1": "wood" },
		"black_damp": { "elem1": "wood" }
	},
	"temp": -200,
	"category": "special",
	"breakInto": "sawdust",
	"tempHigh": 600,
	"stateHigh": "wood",
};

runAfterLoad(function() {
	if(eLists.spout) {
		eLists.spout.push("cold_torch");
	};

	if(enabledMods.includes("mods/liquid_energy.js")) {
		elements.liquid_fire = {
			color: ["#ff6b21","#ffa600","#ff4000"],
			behavior: [
			"XX|M2|XX",
			"M2|XX|M2",
			"M1|M1|M1",
			],
			reactions: {
				"water": { "elem1": "liquid_smoke" },
			},
			temp:600,
			tempLow:100,
			stateLow: "liquid_smoke",
			tempHigh: 7000,
			stateHigh: "liquid_plasma",
			category: "energy liquids",
			burning: true,
			burnTime: 500,
			burnTempChange: 2,
			burnInto: "liquid_smoke",
			state: "liquid",
			density: 21,
		};

		elements.liquid_cold_fire = {
			color: ["#21cbff","#006aff","#00ffff"],
			behavior: [
				"XX|M2|XX",
				"M2|XX|M2",
				"M1|M1|M1",
			],
			reactions: {
				"fire": { "elem1": "liquid_smoke", "elem2": "liquid_smoke" },
				"plasma": { "elem1": "le_liquid_light", "elem2": "le_liquid_light" }, //prefixed to avoid conflict with F&M liquid_light
			},
			temp:-200,
			tempHigh:0,
			stateHigh: "liquid_smoke",
			burning: true,
			burnTempChange: -2,
			burnTime: 500,
			burnInto: "liquid_smoke",
			fireElement: "cold_fire",
			category: "energy liquids",
			state: "liquid",
			density: 42,
		};
	};
	
	if(enabledMods.includes("mods/randomness.js")) {
		elements.unnamed_gas.burnTempChange = 10;
		elements.unnamed_gas.fireElement = "plasma";
		elements.unnamed_powder.burnTempChange = 20;
		elements.unnamed_powder.fireElement = "plasma";
		elements.burning_unnamed_gas.burnTempChange = 15;
		elements.burning_unnamed_gas.fireElement = "plasma";
		elements.burning_unnamed_powder.burnTempChange = 30;
		elements.burning_unnamed_powder.fireElement = "plasma";
	};
});
