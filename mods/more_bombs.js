urlParams = new URLSearchParams(window.location.search);

if(urlParams.get('bombAmount') != null) { //null check
    bombAmount = urlParams.get('bombAmount')
    if(isNaN(bombAmount) || bombAmount === "" || bombAmount === null) { //NaN check
         bombAmount = 10
    }
    bombAmount = parseInt(bombAmount)
	if(bombAmount > 50) {
		alert("Maximum amount of additional bomb/anti-bomb pairs is 50.\nOnly 50 were added.")
	} else if(bombAmount < 1) {
		alert("Minimum amount of additional bomb/anti-bomb pairs is 1.\n1 pair was added.")
	}
    bombAmount = Math.min(50,Math.max(bombAmount,1))
} else {
    bombAmount = 10
}

if(typeof(runAfterAutogen) === "function") {
	runAfterAutogen(function() {
		if(typeof(elements.vaporized_rock) === "object") {
			elements.molten_dirt.tempHigh = 3000;
			elements.molten_dirt.stateHigh = "vaporized_rock";
		};
	});
};

function explodeAtPlus(x,y,radius,fire="fire",smoke="smoke",beforeFunction=null,afterFunction=null,changeTemp=true) {
	// if fire contains , split it into an array
	if (fire.indexOf(",") !== -1) {
		fire = fire.split(",");
	};
	if (smoke.indexOf(",") !== -1) {
		smoke = smoke.split(",");
	};
	var coords = circleCoords(x,y,radius);
	var power = radius/10;
	//for (var p = 0; p < Math.round(radius/10+1); p++) {
	for (var i = 0; i < coords.length; i++) {
		// damage value is based on distance from x and y
		var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
		// invert
		damage = 1 - damage;
		if (damage < 0) { damage = 0; }
		damage *= power;
		if (isEmpty(coords[i].x,coords[i].y)) {
			// create smoke or fire depending on the damage if empty
			if (damage < 0.02) { } // do nothing
			else if (damage < 0.2) {
				// if smoke is an array, choose a random item
				if (Array.isArray(smoke)) {
					createPixel(smoke[Math.floor(Math.random() * smoke.length)],coords[i].x,coords[i].y);
				}
				else {
					createPixel(smoke,coords[i].x,coords[i].y);
				}
			}
			else {
				// if fire is an array, choose a random item
				if (Array.isArray(fire)) {
					createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
				}
				else {
					createPixel(fire,coords[i].x,coords[i].y);
				}
			}
		}
		else if (!outOfBounds(coords[i].x,coords[i].y)) {
			// damage the pixel
			var pixel = pixelMap[coords[i].x][coords[i].y];
			var info = elements[pixel.element];
			if(typeof(beforeFunction) === "function") {
				beforeFunction(pixel,x,y,radius,fire,smoke,power,damage);
			};
			if (info.hardness) { // lower damage depending on hardness(0-1)
				if (info.hardness < 1) {
					damage = damage * ((1 - info.hardness)*10);
				}
				else { damage = 0; }
			}
			if (damage > 0.9) {
				if (Array.isArray(fire)) {
					var newfire = fire[Math.floor(Math.random() * fire.length)];
				}
				else {
					var newfire = fire;
				}
				changePixel(pixel,newfire,changeTemp);
				continue;
			}
			else if (damage > 0.25) {
				if (info.breakInto) {
					// if it is an array, choose a random item, else just use the value
					if (Array.isArray(info.breakInto)) {
						var result = info.breakInto[Math.floor(Math.random() * info.breakInto.length)];
					}
					else {
						var result = info.breakInto;
					}
					// change the pixel to the result
					changePixel(pixel,result,changeTemp);
					continue;
				}
				else {
					if (Array.isArray(fire)) {
						var newfire = fire[Math.floor(Math.random() * fire.length)];
					}
					else {
						var newfire = fire;
					}
					changePixel(pixel,newfire,changeTemp);
					continue;
				}
			}
			if (damage > 0.75 && info.burn) {
				pixel.burning = true;
				pixel.burnStart = pixelTicks;
			}
			pixel.temp += damage*radius*power;
			pixelTempCheck(pixel);
			if(typeof(afterFunction) === "function") {
				//console.log(`running afterFunction ${afterFunction}`)
				//console.log(`arguments: ${pixel}, ${x}, ${y}, ${radius}, ${fire}, ${smoke}, ${power}, ${damage}`)
				afterFunction(pixel,x,y,radius,fire,smoke,power,damage);
			};
		};
	};
};

function hotterBomb(pixel,x,y,radius,fire,smoke,power,damage) {
	//console.log(`Radius: ${radius}\nPower: ${power}\nPixel: (${pixel.x},${pixel.y})\nDamage: ${damage}`);
	//console.log(`Expected temperature increase for pixel at (${pixel.x},${pixel.y}): ${800 * ((1 + (7 * damage)) ** 2) * ((power ** 2) * 1.5)}`);
    pixel.temp += (800 * ((1 + (7 * damage)) ** 2) * ((power ** 2) * 1.5));
};

elements.cluster_nuke = {
    color: "#e3f636",
    behavior: [
        "CR:radiation%5|EX:90>plasma,plasma,plasma,nuke,nuke,nuke,radiation,radiation,radiation,rad_steam,rad_steam,radiation,rad_steam AND CR:radiation%5|CR:radiation%5",
        "CR:radiation%5|XX|CR:radiation%5",
        "M2 AND CR:radiation%5|M1 AND EX:90>plasma,plasma,plasma,nuke,nuke,nuke,radiation,radiation,radiation,rad_steam,rad_steam,radiation,rad_steam AND CR:radiation%5|M2 AND CR:radiation%5",
    ],
    category: "weapons",
    state: "solid",
    density: 1500,
    excludeRandom: true,
};

elements.anti_bomb = {
    color: "#525c61",
    behavior: [
        "M2|M1 AND EX:10|M2",
        "XX|XX|XX",
        "XX|EX:10|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
};

elements.electric_bomblet = {
	color: "#ffffff",
	behavior: [
	    "SH%50|EX:8>electric AND SH%50|SH%50",
	    "SH%50|EX:9>electric%0.5|SH%50",
	    "M2 AND SH%50|M1 AND SH%50 AND EX:8>electric AND SW:electric|M2 AND SH%50",
	],
	category: "weapons",
	state: "solid",
	density: 1200,
	hidden: true,
	excludeRandom: true,
	hardness: 0.3,
};

elements.electric_cluster_bomb = {
	color: "#ffffff",
	behavior: [
	    "SH%50|EX:8>electric_bomblet AND SH%50|SH%50",
	    "SH%50|XX|SH%50",
	    "M2 AND SH%50|M1 AND SH%50 AND EX:8>electric_bomblet AND SW:electric|M2 AND SH%50",
	],
	category: "weapons",
	state: "solid",
	density: 1800,
	hidden: true,
	excludeRandom: true,
	hardness: 0.3,
};

elements.radioactive_popper = {
	color: "#d6ce72",
	behavior: [
		"XX|EX:7>radiation|XX",
		"XX|XX|XX",
		"M2|M1 AND EX:7>radiation|M2",
	],
	category: "weapons",
	state: "solid",
	density: 1200,
	hidden: true,
	excludeRandom: true,
	hardness: 0.3,
	cooldown: 3,
};

elements.acid_bomb = {
    color: "#7d8a63",
    behavior: [
        "XX|EX:15>acid_gas|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:15>acid_gas|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1400,
    excludeRandom: true,
	cooldown: defaultCooldown,
};

amalgamatedBombFire = "plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,smoke,plasma,plasma,fire,smoke,fire,smoke,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,acid,acid,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,plasma,smoke,plasma,plasma,fire,smoke,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,flash,flash,flash,flash,flash,acid_gas,acid_gas,acid_gas,acid,oil,oil,oil,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,acid,acid,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,plasma,smoke,plasma,plasma,fire,smoke,plasma,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,metal_scrap,electric_cluster_bomb,electric_cluster_bomb,flash,flash,flash,flash,flash,acid_gas,acid_gas,acid_gas,acid,oil,oil,oil,oil,oil,oil,oil,oil,oil,oil,plasma,plasma,plasma,plasma,plague,plague,plague,plague,plague,plague,radiation,radiation,radiation,radiation,radiation,radiation,radiation,radiation,uranium,uranium,uranium,uranium,uranium,uranium,greek_fire,greek_fire,greek_fire,greek_fire,greek_fire,antimatter,antimatter,antimatter,antimatter,antimatter,smoke_grenade,antimatter,smoke_grenade,fireball,flash,acid_gas,acid_gas,acid_gas,plague,plague,plague,plague,plague,plague,radiation,radiation,radiation,radiation,radiation,radiation,radiation,radiation,uranium,uranium,uranium,uranium,uranium,uranium,greek_fire,greek_fire,greek_fire,greek_fire,greek_fire,antimatter,antimatter,antimatter,antimatter,antimatter,smoke_grenade,antimatter,flash,acid_gas,acid_gas,acid_gas,radiation,radiation,radiation,radiation,plague,acid_gas,acid_gas,acid_gas,chlorine,chlorine,chlorine"

elements.amalgamated_bomb = {
    color: ["#FF0000","#FF0000","#FFFF00","#FFFF00","#00FF00","#00FF00","#0000FF","#0000FF"],
	tick: function(pixel) {
		doDefaults(pixel);
		if(!isEmpty(pixel.x,pixel.y-1,true)) { //[0][1] EX (ignore bounds)
			var newPixel = pixelMap[pixel.x][pixel.y-1];
			var newElement = newPixel.element;
			var newInfo = elements[newElement];
			if(newInfo.state !== "gas" && newElement !== pixel.element) {
				explodeAtPlus(pixel.x,pixel.y,70,amalgamatedBombFire,amalgamatedBombFire);
			};
		};
		if(!isEmpty(pixel.x,pixel.y+1,true)) { //[2][1] EX (don't ignore bounds, non-bound case)
			var newPixel = pixelMap[pixel.x][pixel.y+1];
			var newElement = newPixel.element;
			var newInfo = elements[newElement];
			if(newInfo.state !== "gas" && newElement !== pixel.element) {
				explodeAtPlus(pixel.x,pixel.y,70,amalgamatedBombFire,amalgamatedBombFire);
			};
		};
		if(outOfBounds(pixel.x,pixel.y+1)) { //[2][1] EX (don't ignore bounds, bound case)
			explodeAtPlus(pixel.x,pixel.y,70,amalgamatedBombFire,amalgamatedBombFire);
		};
		if(!tryMove(pixel,pixel.x,pixel.y+1)) { //behaviors.POWDER
			Math.random() < 0.5 ? tryMove(pixel,pixel.x-1,pixel.y+1) : tryMove(pixel,pixel.x+1,pixel.y+1);
		};
	},
    category: "weapons",
    state: "solid",
    temp: 7065,
    density: 158000,
    excludeRandom: true,
};

elements.op_hottester_bomb = {
    color: "#cc436e",
	properties: {
		radius: 15, //just so people can edit it per pixel to be stupidly high
	},
	tick: function(pixel) {
		doDefaults(pixel);
		if(!isEmpty(pixel.x,pixel.y-1,true)) { //[0][1] EX (ignore bounds)
			var newPixel = pixelMap[pixel.x][pixel.y-1];
			var newElement = newPixel.element;
			var newInfo = elements[newElement];
			if(newInfo.state !== "gas" && newElement !== pixel.element) {
				explodeAtPlus(pixel.x,pixel.y,pixel.radius,"plasma","plasma",hotterBomb,hotterBomb,false);
			};
		};
		if(!isEmpty(pixel.x,pixel.y+1,true)) { //[2][1] EX (don't ignore bounds, non-bound case)
			var newPixel = pixelMap[pixel.x][pixel.y+1];
			var newElement = newPixel.element;
			var newInfo = elements[newElement];
			if(newInfo.state !== "gas" && newElement !== pixel.element) {
				explodeAtPlus(pixel.x,pixel.y,pixel.radius,"plasma","plasma",hotterBomb,hotterBomb,false);
			};
		};
		if(outOfBounds(pixel.x,pixel.y+1)) { //[2][1] EX (don't ignore bounds, bound case)
			explodeAtPlus(pixel.x,pixel.y,pixel.radius,"plasma","plasma",hotterBomb,hotterBomb,false);
		};
		if(!tryMove(pixel,pixel.x,pixel.y+1)) { //behaviors.POWDER
			Math.random() < 0.5 ? tryMove(pixel,pixel.x-1,pixel.y+1) : tryMove(pixel,pixel.x+1,pixel.y+1);
		};
	},
    category: "weapons",
    state: "solid",
    temp: 7065,
    density: 1900,
    excludeRandom: true,
};

for (var i = 2; i <= bombAmount + 1; i++) {
	elements[`bomb_${i}`] = {
		name: `bomb ${i}`,
		color: "#624c41",
		behavior: [
			`XX|EX:${5*(i+1)}>fire|XX`,
			"XX|XX|XX",
			`M2|M1 AND EX:${5*(i+1)}>fire|M2`,
		],
		state: "solid",
		density: 1300 * 8**((i-1)/2),
		excludeRandom:true,
		category: "weapons",
		desc: `${5*(i+1)/10} times the radius of the regular bomb`,
		cooldown: defaultCooldown,
	};
};

elements.anti_bomb = {
	color: "#625c71",
	behavior: [
		"M2|M1 AND EX:10|M2",
		"XX|XX|XX",
		"XX|EX:10|XX",
	],
	category: "weapons",
	state: "solid",
	density: 1300,
	excludeRandom: true,
	cooldown: defaultCooldown,
};

for (var i = 2; i <= bombAmount + 1; i++) {
	elements[`anti_bomb_${i}`] = {
		color: "#625c71",
		behavior: [
			`M2|M1 AND EX:${5*(i+1)}>fire|M2`,
			"XX|XX|XX",
			`XX|EX:${5*(i+1)}>fire|XX`,
		],
		state: "solid",
		density: 1300 * 8**((i-1)/2),
		excludeRandom:true,
		category: "weapons",
		desc: `${5*(i+1)/10} times the radius of the regular anti-bomb`,
		cooldown: defaultCooldown,
	};
};

runAfterLoad(function() {
  if(enabledMods.includes("mods/fey_and_more.js")) {
    elements.lower_color_copy.breakInto.push("magic")
    amalgamatedBombFire += ",poisonwater".repeat(8);
    amalgamatedBombFire += ",mystic_fire".repeat(4);
    amalgamatedBombFire += ",firesea".repeat(6);
    amalgamatedBombFire += ",lektre".repeat(6);
  };
  if(enabledMods.includes("mods/Neutronium Mod.js")) {
    amalgamatedBombFire += ",flamer".repeat(3);
    amalgamatedBombFire += ",flamebomb".repeat(3);
    amalgamatedBombFire += ",toxin".repeat(3);
  };
  if(enabledMods.includes("mods/randomness.js")) {
    amalgamatedBombFire += ",burning_unnamed_gas".repeat(4);
    amalgamatedBombFire += ",warp".repeat(6);
    amalgamatedBombFire += ",bomb_3".repeat(3);
    amalgamatedBombFire += ",op_hottester_bomb".repeat(3);
  };
  if(enabledMods.includes("mods/glenn_gases.js")) {
    amalgamatedBombFire += ",electric_gas".repeat(3);
    amalgamatedBombFire += ",corrosive_gas".repeat(3);
    amalgamatedBombFire += ",iocalfaeus_gas".repeat(3);
    amalgamatedBombFire += ",ignited_gas".repeat(3);
    amalgamatedBombFire += ",finine".repeat(3);
    amalgamatedBombFire += ",acidic_vapour".repeat(3);
    amalgamatedBombFire += ",nitrous_gas".repeat(3);
    amalgamatedBombFire += ",void_gas".repeat(3);
    amalgamatedBombFire += ",black_damp".repeat(3);
  };
  if(enabledMods.includes("mods/some_tf_liquids.js")) {
    amalgamatedBombFire += ",blazing_pyrotheum".repeat(5);
    amalgamatedBombFire += ",tectonic_petrotheum".repeat(7);
    amalgamatedBombFire += ",resonant_ender".repeat(5);
  };
  if(enabledMods.includes("mods/chem.js")) {
    amalgamatedBombFire += ",FOOF".repeat(8);
  };
  if(enabledMods.includes("mods/the_ground.js")) {
    amalgamatedBombFire += ",liquid_irradium".repeat(7);
  };
  if(enabledMods.includes("mods/bioooze.js")) {
    amalgamatedBombFire += ",bioooze".repeat(8);
  };
});
