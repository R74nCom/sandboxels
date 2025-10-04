/* by nekonico */

window.addEventListener("load", () => { 
    document.getElementById("elementButton-head_008")?.remove()
    document.getElementById("elementButton-body_008")?.remove()
    document.getElementById("elementButton-head_012_1")?.remove()
    document.getElementById("elementButton-body_012_1")?.remove()
    document.getElementById("elementButton-complete_012")?.remove()
    document.getElementById("elementButton-head_035")?.remove()
    document.getElementById("elementButton-body_035")?.remove()
    document.getElementById("elementButton-head_049")?.remove()
    document.getElementById("elementButton-body_049")?.remove()
    document.getElementById("elementButton-head_049_1")?.remove()
    document.getElementById("elementButton-body_049_1")?.remove()
    document.getElementById("elementButton-head_173")?.remove()
    document.getElementById("elementButton-body_173")?.remove()
    document.getElementById("elementButton-scp_229")?.remove()
	document.getElementById("elementButton-head_457")?.remove()
    document.getElementById("elementButton-body_457")?.remove()
	document.getElementById("elementButton-head_1000")?.remove()
    document.getElementById("elementButton-body_1000")?.remove()
    document.getElementById("elementButton-head_1015")?.remove()
    document.getElementById("elementButton-body_1015")?.remove()
    document.getElementById("elementButton-penny_converter")?.remove()
    document.getElementById("elementButton-scp_1600_1")?.remove()
    document.getElementById("elementButton-infected_blood")?.remove()
    document.getElementById("elementButton-infected_meat")?.remove()
    document.getElementById("elementButton-frozen_infected_meat")?.remove()
    document.getElementById("elementButton-red_snow")?.remove()
    document.getElementById("elementButton-packed_red_snow")?.remove()
    document.getElementById("elementButton-red_snow_cloud")?.remove()
    document.getElementById("elementButton-red_plant")?.remove()
    document.getElementById("elementButton-scp_009_meat")?.remove()
    document.getElementById("elementButton-scp_009_plant")?.remove()
    document.getElementById("elementButton-red_cloud")?.remove()
    document.getElementById("elementButton-red_rain")?.remove()
    document.getElementById("elementButton-shy_head")?.remove()
    document.getElementById("elementButton-shy_body")?.remove()
    document.getElementById("elementButton-REDACTED")?.remove()
}) 

async function _scpAskPrompt(message, defaultValue = "") { 
    return new Promise(resolve => {
        promptInput(message, (result) => {
            resolve(result);
        }, "Awaiting credentials...", defaultValue);
    })
}

hex_is_light = function(color) {
    hex = color.replace('#', '');
    c_r = parseInt(hex.substring(0, 0 + 2), 16);
    c_g = parseInt(hex.substring(2, 2 + 2), 16);
    c_b = parseInt(hex.substring(4, 4 + 2), 16);
    brightness = ((c_r * 334) + (c_g * 334) + (c_b * 332)) / 1000;
    if (brightness > 127.5) {
        return true
    }
    else {
        return false
    }
}

if (!elements.human.reactions) { elements.human.reactions = {}; }
elements.human.reactions.scp_055 = { attr1:{panic:5000} }
elements.human.reactions.scp_682 = { attr1:{panic:5} }
elements.human.reactions.body_008 = { attr1:{panic:5} }
elements.human.reactions.head_008 = { attr1:{panic:5} }
elements.human.reactions.body_049_1 = { attr1:{panic:5} }
elements.human.reactions.head_049_1 = { attr1:{panic:5} }
elements.human.reactions.scp_096 = { attr1:{panic:5} }
elements.human.reactions.scp_229 = { attr1:{panic:5} }
elements.human.reactions.scp_999 = { attr1:{panic:0} }
elements.human.reactions.black_acid = { attr1:{panic:1} }

if (!elements.water.reactions) { elements.water.reactions = {}; }
elements.water.reactions.access_door = { elem1:null, elem2:"rust", chance:0.000125 }

if (!elements.body.reactions) { elements.body.reactions = {}; }
elements.body.reactions.level_0 = { chance:0.3, func:function(pixel1,pixel2){
	if (!pixel1.level || pixel1.level > pixel2.level) {
		pixel1.level = pixel2.level
		deletePixel(pixel2.x,pixel2.y)
	}
} },
elements.body.reactions.level_1 = { chance:0.5, func:function(pixel1,pixel2){
	if (!pixel1.level || pixel1.level > pixel2.level) {
		pixel1.level = pixel2.level
		deletePixel(pixel2.x,pixel2.y)
	}
} },
elements.body.reactions.level_2 = { chance:0.5, func:function(pixel1,pixel2){
	if (!pixel1.level || pixel1.level > pixel2.level) {
		pixel1.level = pixel2.level
		deletePixel(pixel2.x,pixel2.y)
	}
} },
elements.body.reactions.level_3 = { chance:0.5, func:function(pixel1,pixel2){
	if (!pixel1.level || pixel1.level > pixel2.level) {
		pixel1.level = pixel2.level
		deletePixel(pixel2.x,pixel2.y)
	}
} },
elements.body.reactions.level_4 = { chance:0.5, func:function(pixel1,pixel2){
	if (!pixel1.level || pixel1.level > pixel2.level) {
		pixel1.level = pixel2.level
		deletePixel(pixel2.x,pixel2.y)
	}
} },
elements.body.reactions.level_5 = { chance:0.5, func:function(pixel1,pixel2){
	if (!pixel1.level || pixel1.level > pixel2.level) {
		pixel1.level = pixel2.level
		deletePixel(pixel2.x,pixel2.y)
	}
} },

hyperCoords = [
	[0,1],
    [0,1],
	[1,-1],
    [-1,-1],
	[1,0],
	[-1,0],
    [1,0],
	[-1,0]
];

destroyCoords = [
	[0,1],
	[0,-1],
    [0,-1],
	[1,0],
	[1,0],
    [-1,0],
	[-1,0]
];

elements.metanarrative_ontokinetic_hume_stabilizing_anomaly_neutralizing_all_powerful_eraser = {
	color: ["#FDB5FF","#FDB5FF","#D397D5","#A979AA","#7F5B80","#543C55","#2A1E2B","#000000","#000000"],
	behavior: [
		"DL|DL|DL",
		"DL|DL|DL",
		"DL|DL|DL",
	],
	tool: function(pixel) {
		pixel.del = true
	},
	category: "tools",
	canPlace: false,
	desc: "Use on something to truly delete it.",
    hidden: true,
}

currentLevel = 0
elements.keycard_terminal = {
	color: "#C6B589",
	onSelect: async function() {
        currentLevel = await _scpAskPrompt("Please input the desired level requirement of this terminal as a number 0 through 5.", (currentLevel||undefined))
    },
	onPlace: function(pixel) {
        if (!pixel.levelReq){
			pixel.levelReq = currentLevel;
			pixel.clone = pixel.levelReq;
		}
    },
	tick: function(pixel) {
		if (!pixel.levelReq){
			pixel.levelReq = currentLevel;
			pixel.clone = pixel.levelReq;
		}
		if (!pixel.clone){
			pixel.clone = pixel.levelReq;
		}
		if (!isEmpty(pixel.x, pixel.y-1, true)){
			if (pixel.levelReq && elements[pixelMap[pixel.x][pixel.y-1].element].level < pixel.levelReq) {}
			else if (pixelMap[pixel.x][pixel.y-1].level >= pixel.levelReq && (pixelMap[pixel.x][pixel.y-1].element == "body" || pixelMap[pixel.x][pixel.y-1].element == "bead" || elements[pixelMap[pixel.x][pixel.y-1].element].keycard == true)|| pixelMap[pixel.x][pixel.y-1].on) {
				pixel.on = true;
				var coordsToShock = [
					[pixel.x, pixel.y+1],
					[pixel.x+1, pixel.y],
					[pixel.x-1, pixel.y],
				]
				for (var i = 0; i < coordsToShock.length; i++) {
					var x = coordsToShock[i][0];
					var y = coordsToShock[i][1];
					if (!isEmpty(x,y,true)) {
						var newpixel = pixelMap[x][y];
						if (elements[newpixel.element].conduct) {
							newpixel.charge = 1;
						}
					}
				}
			}
		}
		else if (pixel.on) {
			pixel.on = false;
		}
		doDefaults(pixel);
	},
	category: "scp",
	state: "solid",
	density: 6394.4
}

elements.access_door = {
	color: "#515151",
	onSelect: async function() {
        currentLevel = await _scpAskPrompt("Please input the desired level requirement of this door as a number 0 through 5.", (currentLevel||undefined))
    },
	onPlace: function(pixel) {
        if (!pixel.levelReq){
			pixel.levelReq = currentLevel;
			pixel.clone = pixel.levelReq;
		}
    },
	tick: function(pixel) {
		if (pixel.level){
			pixel.levelReq = pixel.level;
			pixel.clone = pixel.level;
			delete pixel.level
		}
		else if (!pixel.levelReq){
			pixel.levelReq = currentLevel;
			pixel.clone = pixel.levelReq;
		}
		if (!pixel.clone){
			pixel.clone = pixel.levelReq;
		}
		if (!isEmpty(pixel.x-1, pixel.y, true) && !outOfBounds(pixel.x-1, pixel.y) && Math.random() > 0.9){
			let neighbor = pixelMap[pixel.x-1][pixel.y]
			if (pixel.levelReq && elements[neighbor.element].level < pixel.levelReq) {}
			else if (neighbor.level >= pixel.levelReq && (neighbor.element == "body" || neighbor.element == "body_1000" || neighbor.element == "body_008" || neighbor.element == "body_1015" || neighbor.element == "body_035" || neighbor.element == "body_012_1")) {
				if (neighbor.dir == 1 && !isEmpty(neighbor.x,neighbor.y-1) && !outOfBounds(neighbor.x,neighbor.y-1)) {
					if (isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x+1,pixel.y-1)) {
						if (tryMove(pixelMap[neighbor.x][neighbor.y-1],pixel.x+1,pixel.y-1)) {
							movePixel(neighbor,pixel.x+1,pixel.y)
						}
					}
					else if (isEmpty(pixel.x+1,pixel.y-1) && isEmpty(pixel.x+1,pixel.y-2)) {
						if (tryMove(pixelMap[neighbor.x][neighbor.y-1],pixel.x+1,pixel.y-2)) {
							movePixel(neighbor,pixel.x+1,pixel.y-1)
						}
					}
					else if (isEmpty(pixel.x+1,pixel.y+1) && isEmpty(pixel.x+1,pixel.y)) {
						if (tryMove(pixelMap[neighbor.x][neighbor.y-1],pixel.x+1,pixel.y)) {
							movePixel(neighbor,pixel.x+1,pixel.y+1)
						}
					}
					else if (!isEmpty(pixel.x+1,pixel.y) && !isEmpty(pixel.x+1,pixel.y-1) && isEmpty(pixel.x+2,pixel.y+1) && isEmpty(pixel.x+2,pixel.y)) {
						let doorB = pixelMap[pixel.x+1][pixel.y]
						let doorH = pixelMap[pixel.x+1][pixel.y-1]
						if (doorB.levelReq <= pixel.levelReq && doorH.levelReq <= pixel.levelReq) {
							if (tryMove(pixelMap[neighbor.x][neighbor.y-1],pixel.x+2,pixel.y-1)) {
								movePixel(neighbor,pixel.x+2,pixel.y)
							}
						}
					}
				}
			}
		}
		else if (!isEmpty(pixel.x+1, pixel.y, true) && !outOfBounds(pixel.x+1, pixel.y) && Math.random() > 0.9){
			let neighbor = pixelMap[pixel.x+1][pixel.y]
			if (pixel.levelReq && elements[neighbor.element].level < pixel.levelReq) {}
			else if (neighbor.level >= pixel.levelReq && (neighbor.element == "body" || neighbor.element == "body_1000" || neighbor.element == "body_008" || neighbor.element == "body_1015" || neighbor.element == "body_035" || neighbor.element == "body_012_1")) {
				if (neighbor.dir == -1 && !isEmpty(neighbor.x,neighbor.y-1) && !outOfBounds(neighbor.x,neighbor.y-1)) {
					if (isEmpty(pixel.x-1,pixel.y) && isEmpty(pixel.x-1,pixel.y-1)) {
						if (tryMove(pixelMap[neighbor.x][neighbor.y-1],pixel.x-1,pixel.y-1)) {
							movePixel(neighbor,pixel.x-1,pixel.y)
						}
					}
					else if (isEmpty(pixel.x-1,pixel.y-1) && isEmpty(pixel.x-1,pixel.y-2)) {
						if (tryMove(pixelMap[neighbor.x][neighbor.y-1],pixel.x-1,pixel.y-2)) {
							movePixel(neighbor,pixel.x-1,pixel.y-1)
						}
					}
					else if (isEmpty(pixel.x-1,pixel.y+1) && isEmpty(pixel.x-1,pixel.y)) {
						if (tryMove(pixelMap[neighbor.x][neighbor.y-1],pixel.x-1,pixel.y)) {
							movePixel(neighbor,pixel.x-1,pixel.y+1)
						}
					}
					else if (!isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x-1,pixel.y-1)) {
						let doorB = pixelMap[pixel.x-1][pixel.y]
						let doorH = pixelMap[pixel.x-1][pixel.y-1]
						if (doorB.levelReq <= pixel.levelReq && doorH.levelReq <= pixel.levelReq && isEmpty(pixel.x-2,pixel.y+1) && isEmpty(pixel.x-2,pixel.y)) {
							if (tryMove(pixelMap[neighbor.x][neighbor.y-1],pixel.x-2,pixel.y-1)) {
								movePixel(neighbor,pixel.x-2,pixel.y)
							}
						}
					}
				}
			}
		}
		tryMove(pixel, pixel.x, pixel.y+1);
		doDefaults(pixel);
	},
	grain: 0.5,
	behavior: behaviors.WALL,
	tempHigh: 1200,
	stateHigh: "molten_galvanized_steel",
	stateHighColorMultiplier: 0.86,
	conduct: 0.475,
	hardness: 0.8,
	breakInto: "galvanized_steel",
	breakIntoColorMultiplier: [1.1,1,0.86],
	category: "scp",
	state: "solid",
	density: 7850,
}

elements.level_0 = {
	color: ["#635957","#AB9D9C","#D3CCCC"],
	name: "Level 0 Keycard",
	behavior: behaviors.STURDYPOWDER,
	keycard: true,
	tick: function(pixel) {
		if (!pixel.level){
			pixel.level = 0;
		}
		doDefaults(pixel);
	},
	category: "scp",
	tempHigh: 185,
	stateHigh: "molten_plastic",
	burn: 10,
	burnTime: 400,
	burnInto: "dioxin",
	state: "solid",
	density: 1052,
}
elements.level_1 = {
	color: ["#8C7D0D","#FDE507","#FCF081"],
	name: "Level 1 Keycard",
	behavior: behaviors.STURDYPOWDER,
	keycard: true,
	tick: function(pixel) {
		if (!pixel.level){
			pixel.level = 1;
		}
		doDefaults(pixel);
	},
	category: "scp",
	tempHigh: 185,
	stateHigh: "molten_plastic",
	burn: 10,
	burnTime: 400,
	burnInto: "dioxin",
	state: "solid",
	density: 1052,
}
elements.level_2 = {
	color: ["#8C710B","#FDCC03","#FCE47F"],
	name: "Level 2 Keycard",
	behavior: behaviors.STURDYPOWDER,
	keycard: true,
	tick: function(pixel) {
		if (!pixel.level){
			pixel.level = 2;
		}
		doDefaults(pixel);
	},
	category: "scp",
	tempHigh: 190,
	stateHigh: ["molten_plastic","molten_plastic","glue"],
	burn: 10,
	burnTime: 400,
	burnInto: "dioxin",
	state: "solid",
	density: 1052,
}
elements.level_3 = {
	color: ["#885C28","#F6A33D","#F9CF9C"],
	name: "Level 3 Keycard",
	behavior: behaviors.STURDYPOWDER,
	keycard: true,
	tick: function(pixel) {
		if (!pixel.level){
			pixel.level = 3;
		}
		doDefaults(pixel);
	},
	category: "scp",
	tempHigh: 190,
	stateHigh: ["molten_plastic","molten_plastic","molten_plastic","glue"],
	burn: 5,
	burnTime: 400,
	burnInto: "dioxin",
	state: "solid",
	density: 1057,
}
elements.level_4 = {
	color: ["#87371D","#F35828","#F7AA92"],
	name: "Level 4 Keycard",
	behavior: behaviors.STURDYPOWDER,
	keycard: true,
	tick: function(pixel) {
		if (!pixel.level){
			pixel.level = 4;
		}
		doDefaults(pixel);
	},
	category: "scp",
	tempHigh: 660.3,
	density: 2600,
	conduct: 0.73,
	hardness: 0.05,
	breakInto: "metal_scrap",
	stateHigh:"molten_aluminum",
	superconductAt: -271.95,
	state: "solid",
}
elements.level_5 = {
	color: ["#831924","#EB1C36","#F38C99"],
	name: "Level 5 Keycard",
	behavior: behaviors.STURDYPOWDER,
	keycard: true,
	tick: function(pixel) {
		if (!pixel.level){
			pixel.level = 5;
		}
		doDefaults(pixel);
	},
	category: "scp",
	tempHigh: 927,
	density: 8330,
	conduct: 0.52,
	hardness: 0.275,
	stateHigh: "molten_tungsten",
	state: "solid",
}

elements.site_nuke = {
	color: "#815E2B",
	behavior: behaviors.WALL,
	behaviorOn: [
		"XX|XX|XX",
		"XX|EX:300>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,radiation,radiation,radiation,rad_steam,electric,electric,electric|XX",
		"M2|M1|M2",
	],
	conduct: 1,
	category: "scp",
	state: "solid",
	density: 1500,
	excludeRandom: true,
}

elements.d_class = {
	// color: ["#f5eac6","#d4c594","#a89160","#7a5733","#523018","#361e0e"],
    color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
	buttonColor: ["#A36A19","#BA7613","#C67B0F"],
	name: "D-Class",
	category: "scp",
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	onPlace: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("body", pixel.x, pixel.y+1);
            pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1], elements.d_class.buttonColor)
			var color = pixel.color;
			changePixel(pixel,"head");
			pixel.color = color;
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			changePixel(pixel,"body");
            pixel.color = pixelColorPick(pixel, elements.d_class.buttonColor);
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
		"fire": { attr1:{panic:5} },
		"plasma": { attr1:{panic:5} },
		"cold_fire": { attr1:{panic:5} },
		"electric": { attr1:{panic:5} },
		"blood": { attr1:{panic:1} },
		"infection": { attr1:{panic:2} },
		"cancer": { attr1:{panic:3} },
		"plague": { attr1:{panic:5} },
		"radiation": { attr1:{panic:5} },
		"tnt": { attr1:{panic:5} },
		"dynamite": { attr1:{panic:5} },
		"c4": { attr1:{panic:5} },
		"grenade": { attr1:{panic:5} },
		"gunpowder": { attr1:{panic:5} },
		"acid": { attr1:{panic:5} },
		"acid_gas": { attr1:{panic:5} },
		"stench": { attr1:{panic:2} }
	},
	related: ["body","head"],
	cooldown: defaultCooldown,
	forceSaveColor: true,
}

elements.scientist = {
	// color: ["#f5eac6","#d4c594","#a89160","#7a5733","#523018","#361e0e"],
	color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    buttonColor: ["#EDEEF7","#D9D9E7","#F8F7FC","#C6C8DC","#D0DCF1"],
	name: "Researcher",
	category: "scp",
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	onPlace: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("body", pixel.x, pixel.y+1);
            pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1], elements.scientist.buttonColor)
			pixelMap[pixel.x][pixel.y+1].level = 2
			var color = pixel.color;
			changePixel(pixel,"head");
			pixel.color = color;
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			changePixel(pixel,"body");
            pixel.color = pixelColorPick(pixel, elements.scientist.buttonColor);
			pixel.level = 2
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
		"fire": { attr1:{panic:5} },
		"plasma": { attr1:{panic:5} },
		"cold_fire": { attr1:{panic:5} },
		"electric": { attr1:{panic:5} },
		"blood": { attr1:{panic:1} },
		"infection": { attr1:{panic:2} },
		"cancer": { attr1:{panic:3} },
		"plague": { attr1:{panic:5} },
		"radiation": { attr1:{panic:5} },
		"tnt": { attr1:{panic:5} },
		"dynamite": { attr1:{panic:5} },
		"c4": { attr1:{panic:5} },
		"grenade": { attr1:{panic:5} },
		"gunpowder": { attr1:{panic:5} },
		"acid": { attr1:{panic:5} },
		"acid_gas": { attr1:{panic:5} },
		"stench": { attr1:{panic:2} }
	},
	related: ["body","head"],
	cooldown: defaultCooldown,
	forceSaveColor: true,
}

elements.guard = {
	// color: ["#f5eac6","#d4c594","#a89160","#7a5733","#523018","#361e0e"],
	color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    buttonColor: ["#848692","#2B2A30","#515159","#3A393F"],
	name: "Security Officer",
	category: "scp",
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	onPlace: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("body", pixel.x, pixel.y+1);
            pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1], elements.guard.buttonColor)
			pixelMap[pixel.x][pixel.y+1].level = 2
			var color = pixel.color;
			changePixel(pixel,"head");
			pixel.color = color;
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			changePixel(pixel,"body");
            pixel.color = pixelColorPick(pixel, elements.guard.buttonColor);
			pixel.level = 2
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
		"fire": { attr1:{panic:5} },
		"plasma": { attr1:{panic:5} },
		"cold_fire": { attr1:{panic:5} },
		"electric": { attr1:{panic:5} },
		"blood": { attr1:{panic:1} },
		"infection": { attr1:{panic:2} },
		"cancer": { attr1:{panic:3} },
		"plague": { attr1:{panic:5} },
		"radiation": { attr1:{panic:5} },
		"tnt": { attr1:{panic:5} },
		"dynamite": { attr1:{panic:5} },
		"c4": { attr1:{panic:5} },
		"grenade": { attr1:{panic:5} },
		"gunpowder": { attr1:{panic:5} },
		"acid": { attr1:{panic:5} },
		"acid_gas": { attr1:{panic:5} },
		"stench": { attr1:{panic:2} }
	},
	related: ["body","head"],
	cooldown: defaultCooldown,
	forceSaveColor: true,
}

elements.director = {
	// color: ["#f5eac6","#d4c594","#a89160","#7a5733","#523018","#361e0e"],
	color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    buttonColor: ["#2B2A30","#848692","#2B2A30","#515159","#919092","#069469","#047e99","#7f5fb0","#069469","#047e99","#7f5fb0","#EDEEF7","#D9D9E7","#F8F7FC","#C6C8DC","#D0DCF1"],
	name: "Site Director",
	category: "scp",
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	onPlace: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("body", pixel.x, pixel.y+1);
            pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1], elements.director.buttonColor)
			pixelMap[pixel.x][pixel.y+1].level = 4
			var color = pixel.color;
			changePixel(pixel,"head");
			pixel.color = color;
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			changePixel(pixel,"body");
            pixel.color = pixelColorPick(pixel, elements.director.buttonColor);
			pixel.level = 4
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
		"fire": { attr1:{panic:5} },
		"plasma": { attr1:{panic:5} },
		"cold_fire": { attr1:{panic:5} },
		"electric": { attr1:{panic:5} },
		"blood": { attr1:{panic:1} },
		"infection": { attr1:{panic:2} },
		"cancer": { attr1:{panic:3} },
		"plague": { attr1:{panic:5} },
		"radiation": { attr1:{panic:5} },
		"tnt": { attr1:{panic:5} },
		"dynamite": { attr1:{panic:5} },
		"c4": { attr1:{panic:5} },
		"grenade": { attr1:{panic:5} },
		"gunpowder": { attr1:{panic:5} },
		"acid": { attr1:{panic:5} },
		"acid_gas": { attr1:{panic:5} },
		"stench": { attr1:{panic:2} }
	},
	related: ["body","head"],
	cooldown: defaultCooldown,
	forceSaveColor: true,
}

elements.scp_008 = {
	name: "SCP-008",
    color: "#11111f",
    behavior: [
        "M2|M1|M2",
        "M1|XX|M1",
        "M2|M1|M2",
    ],
    reactions: {
        "head": { elem1:null, elem2:"head_008" , chance:0.5 },
        "cactus": { elem1:null, elem2:["dead_plant","dead_plant","scp_008"], chance:0.2 },
        "kelp": { elem1:null, elem2:["dead_plant","dead_plant","scp_008"], chance:0.2 },
        "algae": { elem1:null, elem2:["dead_plant","dead_plant","scp_008"], chance:0.2 },
        "pistil": { elem1:null, elem2:["dead_plant","dead_plant","scp_008"], chance:0.2 },
        "sapling": { elem1:null, elem2:["dead_plant","dead_plant","scp_008"], chance:0.2 },
        "lichen": { elem1:null, elem2:["dead_plant","dead_plant","scp_008"], chance:0.2 },
        "vine": { elem1:null, elem2:["dead_plant","dead_plant","scp_008"], chance:0.4 },
        "plant": { elem1:null, elem2:["dead_plant","dead_plant","scp_008"], chance:0.4 },
        "grass": { elem1:null, elem2:["dead_plant","dead_plant","scp_008"], chance:0.4 },
        "evergreen": { elem1:null, elem2:["dead_plant","dead_plant","scp_008"], chance:0.4 },
        "tree_branch": { elem1:null, elem2:["wood","wood","wood","wood","wood","wood","dead_plant","dead_plant","scp_008"], chance:0.4 },
	    "skin": { elem1:null, elem2: "infected_meat", chance:0.3 },
	    "blood": { elem1:null, elem2:"infected_blood" , chance:0.6 },
	    "meat": { elem1:null, elem2:"infected_meat" , chance:0.4 },
	    "rotten_meat": { elem1:null, elem2:"infected_meat" , chance:0.5 },
	    "frozen_meat": { elem1:null, elem2:"frozen_infected_meat" , chance:0.3 },
        "frog": { elem2:["scp_008","infected_meat","infected_meat"], chance:0.5 },
        "bird": { elem2:["scp_008","infected_meat","infected_meat","feather"], chance:0.5 },
        "ant": { elem2:["scp_008","dead_bug","dead_bug"], chance:0.5 },
        "fly": { elem2:["scp_008","dead_bug","dead_bug"], chance:0.5 },
        "spider": { elem2:["scp_008","dead_bug","dead_bug"], chance:0.5 },
        "worm": { elem2:["scp_008","dead_bug","slime"], chance:0.5 },
        "bee": { elem2:["scp_008","dead_bug","dead_bug"], chance:0.5 },
        "fish": { elem2:["scp_008","infected_meat","infected_meat"], chance:0.5 },
        "rat": { elem2:["scp_008","infected_meat","infected_meat","infected_meat"], chance:0.5 },
        "firefly": { elem2:["scp_008","dead_bug","dead_bug"], chance:0.5 },
        "dead_bug": { elem2:["scp_008","scp_008","calcium"], chance:0.0025 },
        "chlorine": { elem1: null , chance:0.001 },
        "liquid_chlorine": { elem1: null , chance:0.001 },
        "light": { elem1: null , chance:0.001 },
    },
    tempHigh: 750,
    stateHigh: null,
    tempLow: -100,
    stateLow: "frozen_008",
    category: "scp",
    state: "gas",
    density: 100,
}

elements.frozen_008 = {
	name: "frozen SCP-008",
    color: "#242424",
    behavior: [
        "XX|XX|XX",
        "M2%0.001|DL%0.001|M2%0.001",
        "M2%0.01|M1%1.0|M2%0.01",
    ],
    reactions: {
        "head": { elem1:null, elem2:"head_008" , chance:0.5 },
	    "skin": { elem1:null, elem2:"frozen_infected_meat" , chance:0.4 },
	    "blood": { elem1:null, elem2:"infected_blood" , chance:0.6 },
	    "meat": { elem1:null, elem2:"frozen_infected_meat" , chance:0.4 },
	    "rotten_meat": { elem1:null, elem2:"frozen_infected_meat" , chance:0.5 },
	    "frozen_meat": { elem1:null, elem2:"frozen_infected_meat" , chance:0.4 },
        "chlorine": { elem1: null , chance:0.01 },
        "liquid_chlorine": { elem1: null , chance:0.01 },
        "light": { elem1: null , chance:0.01 },
    },
    temp: -50,
    tempHigh: 0,
    stateHigh: "scp_008",
    category: "scp",
    state: "solid",
    density: 95,
}

elements.body_008 = {
	name: "SCP-008-1",
	color: ["#069469","#047e99","#7f5fb0"],
	category: "life",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "infected_meat",
	tempLow: -30,
	stateLow: "frozen_infected_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "infected_meat",
	breakInto: ["infected_blood","infected_meat","bone"],
	forceSaveColor: true,
	pickElement: "human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","infected_meat","infected_meat","infected_meat"], chance:0.4 },
		"neutron": { elem1:["ash","infected_meat","infected_meat","infected_meat"], chance:0.01 },
		"fallout": { elem1:["ash","infected_meat","infected_meat","infected_meat"], chance:0.01 },
		"plague": { elem1:"plague", chance:0.05 },
		"egg": { elem2:"yolk", chance:0.5, oneway:true },
		"grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
		"ant": { elem2:"dead_bug", chance:0.05, oneway:true },
		"spider": { elem2:"dead_bug", oneway:true },
		"fly": { elem2:"dead_bug", oneway:true },
		"firefly": { elem2:"dead_bug", oneway:true },
		"bee": { elem2:"dead_bug", oneway:true },
		"flea": { elem2:"dead_bug", oneway:true },
		"termite": { elem2:"dead_bug", oneway:true },
		"worm": { elem2:"slime", chance:0.05, oneway:true },
		"stink_bug": { elem2:"stench", oneway:true },
		"grass_seed": { elem2:null, chance:0.05 },
		"gold_coin": { elem2:null, chance:0.05 },
		"diamond": { elem2:null, chance:0.05 },
		"sun": { elem1:"infected_meat" },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} },
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "head_008") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"infected_meat");
			}
			return
		}

        if (!pixel.zStart) {
            pixel.zStart = pixelTicks
        }
        if ((pixel.zStart + 1000) < pixelTicks) {
            pixel.dead = pixelTicks
        }

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_008") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				delete head.panic;
			}
		}
        else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
			var head = pixelMap[pixel.x][pixel.y-1];
			changePixel(head,"head_008")
		}
		else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_1000") {
			var head = pixelMap[pixel.x][pixel.y-1];
			changePixel(head,"head_008")
		}
		else { var head = null }
        if (head && Math.random() < 0.5) {
			let y = Math.random() < 0.5 ? 0 : -1;
            let xDir = Math.random() < 0.5 ? 1 : -1;
			for (let x = 1; x < 20; x++) {
				let x2 = pixel.x+(x*xDir);
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements[seenPixel.element].id == elements.head.id) {
                        if (pixel.dir != 1 && pixelMap[x2][y2].x > pixel.x) {
                            pixel.dir = 1
                        }
                        else if (pixel.dir != -1 && pixelMap[x2][y2].x < pixel.x) {
                            pixel.dir = -1
                        }
		    		}
                    if (elements[seenPixel.element].id != elements.glass.id && elements[seenPixel.element].id != elements.stained_glass.id && elements[seenPixel.element].id != elements.glass_shard.id) {
		    			break;
		    		}
				}
			}
		}

		if (pixel.panic > 0) {
			pixel.panic -= 0.1;
			if (pixel.panic < 0) { pixel.panic = 0; }
			else if (pixel.panic > 50) { pixel.panic = 50; }
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1 && !pixel.charge) {
				createPixel("infected_blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (Math.random() < 0.2) { // Move 20% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if (hitPixel.element === "body" || hitPixel.element === "head") {
						// interact with other human
						hitPixel.panic += 1
					}
				}
			}
			// 10% chance to change direction
			if (Math.random() < 0.1 || !moved) {
				pixel.dir *= -1;
			}
		}

	}
}

elements.head_008 = {
	color: ["#75816B","#4D6B53"],
    name: "SCP-008-1",
	category: "life",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "infected_meat",
	tempLow: -30,
	stateLow: "frozen_infected_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "infected_meat",
	breakInto: ["infected_blood","infected_meat","bone"],
	forceSaveColor: true,
	pickElement: "human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","infected_meat","infected_meat","infected_meat"], chance:0.4 },
		"neutron": { elem1:["ash","infected_meat","infected_meat","infected_meat"], chance:0.03 },
		"fallout": { elem1:["ash","infected_meat","infected_meat","infected_meat"], chance:0.03 },
		"plague": { elem1:"plague", chance:0.05 },
		"oxygen": { elem2:["carbon_dioxide","carbon_dioxide","scp_008"], chance:0.5 },
		"beans": { elem2:[null,null,null,null,null,null,null,null,"stench","scp_008"], chance:0.2 },
		"sun": { elem1:"infected_meat" },
		"light": { stain1:"#825043" },
		"bee": { stain1:"#cc564b", chance:0.2 },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
		"salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
		"pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} }
	},
	properties: {
		dead: false,
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"infected_meat");
				return
			}
		}

        if (isEmpty(pixel.x, pixel.y-1, true) && Math.random() < 0.005) {
			createPixel("scp_008",pixel.x,pixel.y)
		}
        if (isEmpty(pixel.x+1, pixel.y, true) && Math.random() < 0.01) {
			createPixel("scp_008",pixel.x+1,pixel.y)
		}
        if (isEmpty(pixel.x-1, pixel.y, true) && Math.random() < 0.01) {
			createPixel("scp_008",pixel.x-1,pixel.y)
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_008") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
        else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			body.element = "body_008"
		}
		else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_1000") {
			var body = pixelMap[pixel.x][pixel.y+1];
			body.element = "body_008"
			body.color == pixelColorPick(body,elements.head_008.color)
		}
		else { var body = null }

		// check for eating food
		if (body && !pixel.dead && Math.random() < 0.1) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].isFood) {
					deletePixel(x,y);
					break;
				}
                else if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].id == elements.head.id) {
					pixelMap[x][y+1].element = "body_008"
                    changePixel(pixelMap[x][y],"head_008")
					break;
				}
                else if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].id == elements.body.id) {
					pixelMap[x][y].element = "body_008"
                    changePixel(pixelMap[x][y-1],"head_008")
					break;
				}
				else if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].id == elements.head_1000.id) {
					pixelMap[x][y+1].element = "body_008"
					pixelMap[x][y+1].color == pixelColorPick(pixelMap[x][y+1],elements.head_008.color)
                    changePixel(pixelMap[x][y],"head_008")
					break;
				}
                else if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].id == elements.body_1000.id) {
					pixelMap[x][y].element = "body_008"
					pixelMap[x][y].color == pixelColorPick(pixelMap[x][y],elements.head_008.color)
                    changePixel(pixelMap[x][y-1],"head_008")
					break;
				}
			}
		}

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
				createPixel("infected_blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
	},
}
	    
elements.infected_meat = {
    color: ["#b8b165","#b89765"],
    name: "meat",
    behavior: [
        "XX|CR:stench,stench,stench,scp_008,fly%0.25 AND CH:meat,skin>infected_meat%1|XX",
        "SP%25 AND CH:meat,skin>infected_meat%1|XX|SP%25 AND CH:meat,skin>infected_meat%1",
        "M2%0.5|M1 AND CH:meat,skin>infected_meat%1|M2%0.5",
    ],
    reactions: {
        "head": { elem1:null, elem2:"head_008" , chance:0.75 },
        "body": { elem1:null, elem2:"body_008" , chance:0.05 },
        "water": { elem2:"dirty_water" },
        "salt_water": { elem2:"dirty_water" , chance:0.5 },
        "sugar_water": { elem2:"dirty_water" },
        "seltzer": { elem2:"dirty_water" },
        "meat": { elem2:"infected_meat", chance:0.5 },
        "rotten_meat": { elem2:"infected_meat", chance:0.5 },
        "frozen_meat": { elem2:"frozen_infected_meat", chance:0.5 },
	    "fly": { elem2: ["dead_bug","dead_bug","scp_008"] , chance:0.2},
	    "blood": { elem2:"infected_blood" , chance:0.6 },
	    "skin": { elem2:"infected_meat" , chance:0.6 },
    },
    tempHigh: 300,
    stateHigh: ["scp_008","ash","ammonia"],
    tempLow: -20,
    stateLow: "frozen_infected_meat",
    category:"scp",
    hidden: true,
    burn:12,
    burnTime:200,
    burnInto:["scp_008","ash","ammonia"],
    state: "solid",
    density: 1005,
    conduct: 0.1,
    isFood: true
},

elements.frozen_infected_meat = {
    color: ["#82AEC0","#80808F","#9CAC98"],
    name: "frozen_meat",
    behavior: [
        "XX|XX|XX",
        "SP%95|XX|SP%95",
        "XX|M1 AND CH:frozen_meat,meat>frozen_infected_meat%1|XX",
    ],
    reactions: {
        "head": { elem1:null, elem2:"head_008" , chance:0.5 },
        "water": { elem2:"dirty_water" },
        "salt_water": { elem1:"infected_meat",elem2:"dirty_water" , chance:0.5 },
        "sugar_water": { elem2:"dirty_water" },
        "seltzer": { elem2:"dirty_water" },
        "meat": { elem2:"frozen_infected_meat", chance:0.5 },
        "rotten_meat": { elem2:"frozen_infected_meat", chance:0.5 },
        "frozen_meat": { elem2:"frozen_infected_meat", chance:0.5 },
	    "fly": { elem2: ["dead_bug","dead_bug","frozen_008"] , chance:0.2},
	    "blood": { elem2:"infected_blood" , chance:0.6 },
    },
    temp: -20,
    tempHigh: 10,
    stateHigh: "infected_meat",
    category:"scp",
    hidden: true,
    state: "solid",
    density: 1005,
    conduct: 0.05,
}

elements.infected_blood = {
	color: ["#cf005d","#be004c"],
    name: "infection",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		if (Math.random() < 0.001) { releaseElement(pixel,"scp_008"); }
	},
	reactions: {
        "head": { elem1:null, elem2:"head_008" , chance:0.75 },
        "body": { elem1:null, elem2:"body_008" , chance:0.05 },
		"blood": { elem2:"infected_blood", chance:0.02 },
        "infection": { elem2:"infected_blood", chance:0.025 },
		"frog": { elem2:"infected_meat", chance:0.005 },
		"fish": { elem2:"infected_meat", chance:0.005 },
		"meat": { elem2:"infected_meat", chance:0.005 },
        "rotten_meat": { elem2:"infected_meat", chance:0.05 },
		"alcohol": { elem1:"infection", chance:0.2 },
		"epsom_salt": { elem1:"infection", chance:0.3 }
	},
	viscosity: 15,
	tempHigh: 124.55,
	stateHigh: ["scp_008","scp_008","scp_008","salt","oxygen"],
	tempLow: 0,
    stateLow: ["scp_008","infection"],
	category:"liquids",
	hidden: true,
	state: "liquid",
	density: 1060,
	stain: 0.05
}

elements.scp_009 = {
    color: "#D2042D",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"scp_009", chance:0.25},
        "sugar_ice":{elem2:"scp_009", chance:0.25},
        "juice_ice":{elem2:"scp_009", chance:0.25},
        "dirty_ice":{elem2:"scp_009", chance:0.25},
        "ice":{elem2:"scp_009", chance:0.25},
        "water":{elem2:"scp_009", chance:0.25},
        "steam":{elem2:"scp_009", chance:0.15},
        "blood":{elem2:"scp_009", chance:0.25},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009", chance:0.25},
        "salt_water":{elem2:"scp_009", chance:0.25},
        "sugar_water":{elem2:"scp_009", chance:0.25},
        "dirty_water":{elem2:"scp_009", chance:0.25},
        "pool_water":{elem2:"scp_009", chance:0.25},
        "slush":{elem2:"scp_009", chance:0.25},
        "seltzer":{elem2:"scp_009", chance:0.25},
        "juice":{elem2:"scp_009", chance:0.25},
        "soda":{elem2:"scp_009", chance:0.25},
        "milk":{elem2:"scp_009", chance:0.25},
        "slime":{elem2:"scp_009", chance:0.25},
        "tea":{elem2:"scp_009", chance:0.25},
        "coffee":{elem2:"scp_009", chance:0.25},
        "neutral_acid":{elem2:"scp_009", chance:0.25},
        "infection":{elem2:"scp_009", chance:0.25},
        "meat":{elem2:"scp_009_meat", chance:0.15},
        "skin":{elem2:"scp_009_meat", chance:0.075},
        "body":{elem2:"scp_009_meat", chance:0.04},
        "head":{elem2:"scp_009_meat", chance:0.05},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.15},
        "fish":{elem2:"scp_009_meat", chance:0.15},
        "bird":{elem2:"scp_009_meat", chance:0.15},
        "frog":{elem2:"scp_009_meat", chance:0.15},
        "tadpole":{elem2:"scp_009_meat", chance:0.15},
    },
    breakInto: "red_snow",
    tempLow: 0,
    stateLow: "red_water",
    category: "scp",
    state: "solid",
    density: 917,
}

elements.red_snow = {
    color: "#D64765",
    name: "SCP-009",
    behavior: behaviors.POWDER,
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"scp_009", chance:0.25},
        "sugar_ice":{elem2:"scp_009", chance:0.25},
        "juice_ice":{elem2:"scp_009", chance:0.25},
        "dirty_ice":{elem2:"scp_009", chance:0.25},
        "ice":{elem2:"scp_009", chance:0.25},
        "water":{elem2:"scp_009", chance:0.25},
        "steam":{elem2:"scp_009", chance:0.15},
        "blood":{elem2:"scp_009", chance:0.25},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009", chance:0.25},
        "salt_water":{elem2:"scp_009", chance:0.25},
        "sugar_water":{elem2:"scp_009", chance:0.25},
        "dirty_water":{elem2:"scp_009", chance:0.25},
        "pool_water":{elem2:"scp_009", chance:0.25},
        "slush":{elem2:"scp_009", chance:0.25},
        "seltzer":{elem2:"scp_009", chance:0.25},
        "juice":{elem2:"scp_009", chance:0.25},
        "soda":{elem2:"scp_009", chance:0.25},
        "milk":{elem2:"scp_009", chance:0.25},
        "slime":{elem2:"scp_009", chance:0.25},
        "tea":{elem2:"scp_009", chance:0.25},
        "coffee":{elem2:"scp_009", chance:0.25},
        "neutral_acid":{elem2:"scp_009", chance:0.25},
        "infection":{elem2:"scp_009", chance:0.25},
        "meat":{elem2:"scp_009_meat", chance:0.15},
        "skin":{elem2:"scp_009_meat", chance:0.075},
        "body":{elem2:"scp_009_meat", chance:0.04},
        "head":{elem2:"scp_009_meat", chance:0.05},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.15},
        "fish":{elem2:"scp_009_meat", chance:0.15},
        "bird":{elem2:"scp_009_meat", chance:0.15},
        "frog":{elem2:"scp_009_meat", chance:0.15},
        "tadpole":{elem2:"scp_009_meat", chance:0.15},
    },
    temp: 5,
    tempLow: -18,
    tempHigh: 100,
    stateHigh: "packed_red_snow",
    stateLow: "red_water",
    category: "scp",
    state: "solid",
    density: 100,
    hidden: true,
}

elements.packed_red_snow = {
    color: "#CC3F5F",
    name: "SCP-009",
    behavior: behaviors.SUPPORTPOWDER,
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"scp_009", chance:0.25},
        "sugar_ice":{elem2:"scp_009", chance:0.25},
        "juice_ice":{elem2:"scp_009", chance:0.25},
        "dirty_ice":{elem2:"scp_009", chance:0.25},
        "ice":{elem2:"scp_009", chance:0.25},
        "water":{elem2:"scp_009", chance:0.25},
        "steam":{elem2:"scp_009", chance:0.15},
        "blood":{elem2:"scp_009", chance:0.25},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009", chance:0.25},
        "salt_water":{elem2:"scp_009", chance:0.25},
        "sugar_water":{elem2:"scp_009", chance:0.25},
        "dirty_water":{elem2:"scp_009", chance:0.25},
        "pool_water":{elem2:"scp_009", chance:0.25},
        "slush":{elem2:"scp_009", chance:0.25},
        "seltzer":{elem2:"scp_009", chance:0.25},
        "juice":{elem2:"scp_009", chance:0.25},
        "soda":{elem2:"scp_009", chance:0.25},
        "milk":{elem2:"scp_009", chance:0.25},
        "slime":{elem2:"scp_009", chance:0.25},
        "tea":{elem2:"scp_009", chance:0.25},
        "coffee":{elem2:"scp_009", chance:0.25},
        "neutral_acid":{elem2:"scp_009", chance:0.25},
        "infection":{elem2:"scp_009", chance:0.25},
        "meat":{elem2:"scp_009_meat", chance:0.15},
        "skin":{elem2:"scp_009_meat", chance:0.075},
        "body":{elem2:"scp_009_meat", chance:0.04},
        "head":{elem2:"scp_009_meat", chance:0.05},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.15},
        "fish":{elem2:"scp_009_meat", chance:0.15},
        "bird":{elem2:"scp_009_meat", chance:0.15},
        "frog":{elem2:"scp_009_meat", chance:0.15},
        "tadpole":{elem2:"scp_009_meat", chance:0.15},
    },
    temp: 5,
    tempLow: -20,
    tempHigh: 200,
    stateHigh: "scp_009",
    stateLow: "red_water",
    breakInto: "red_snow",
    category: "scp",
    state: "solid",
    density: 400,
    hidden: true
}

elements.scp_009_meat = {
	name: "SCP-009 meat",
    color: "#AC3536",
    behavior: [
        "XX|CH:frozen_meat,meat>scp_009_meat%1|XX",
        "CH:frozen_meat,meat>scp_009_meat%1|XX|CH:frozen_meat,meat>scp_009_meat%1",
        "XX|M1 AND CH:frozen_meat,meat>scp_009_meat%1|XX",
    ],
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"scp_009", chance:0.25},
        "sugar_ice":{elem2:"scp_009", chance:0.25},
        "juice_ice":{elem2:"scp_009", chance:0.25},
        "dirty_ice":{elem2:"scp_009", chance:0.25},
        "ice":{elem2:"scp_009", chance:0.25},
        "water":{elem2:"scp_009", chance:0.025},
        "steam":{elem2:"scp_009", chance:0.015},
        "blood":{elem2:"scp_009", chance:0.025},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009", chance:0.025},
        "salt_water":{elem2:"scp_009", chance:0.025},
        "sugar_water":{elem2:"scp_009", chance:0.025},
        "dirty_water":{elem2:"scp_009", chance:0.025},
        "pool_water":{elem2:"scp_009", chance:0.025},
        "slush":{elem2:"scp_009", chance:0.025},
        "seltzer":{elem2:"scp_009", chance:0.025},
        "juice":{elem2:"scp_009", chance:0.025},
        "soda":{elem2:"scp_009", chance:0.025},
        "milk":{elem2:"scp_009", chance:0.025},
        "slime":{elem2:"scp_009", chance:0.025},
        "tea":{elem2:"scp_009", chance:0.025},
        "coffee":{elem2:"scp_009", chance:0.025},
        "neutral_acid":{elem2:"scp_009", chance:0.025},
        "infection":{elem2:"scp_009", chance:0.025},
        "meat":{elem2:"scp_009_meat", chance:0.015},
        "skin":{elem2:"scp_009_meat", chance:0.0075},
        "body":{elem2:"scp_009_meat", chance:0.004},
        "head":{elem2:"scp_009_meat", chance:0.005},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.015},
        "fish":{elem2:"scp_009_meat", chance:0.015},
        "bird":{elem2:"scp_009_meat", chance:0.015},
        "frog":{elem2:"scp_009_meat", chance:0.015},
        "tadpole":{elem2:"scp_009_meat", chance:0.015},
    },
    tempLow: -100,
    stateLow: "meat",
    category:"scp",
    hidden:true,
    state: "solid",
    density: 1067.5,
    isFood: true
}

elements.scp_009_plant = {
	name: "SCP-009 plant",
    color: "#735958",
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"scp_009", chance:0.25},
        "sugar_ice":{elem2:"scp_009", chance:0.25},
        "juice_ice":{elem2:"scp_009", chance:0.25},
        "dirty_ice":{elem2:"scp_009", chance:0.25},
        "ice":{elem2:"scp_009", chance:0.25},
        "water":{elem2:"scp_009", chance:0.025},
        "steam":{elem2:"scp_009", chance:0.015},
        "blood":{elem2:"scp_009", chance:0.025},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009", chance:0.025},
        "salt_water":{elem2:"scp_009", chance:0.025},
        "sugar_water":{elem2:"scp_009", chance:0.025},
        "dirty_water":{elem2:"scp_009", chance:0.025},
        "pool_water":{elem2:"scp_009", chance:0.025},
        "slush":{elem2:"scp_009", chance:0.025},
        "seltzer":{elem2:"scp_009", chance:0.025},
        "juice":{elem2:"scp_009", chance:0.025},
        "soda":{elem2:"scp_009", chance:0.025},
        "milk":{elem2:"scp_009", chance:0.025},
        "slime":{elem2:"scp_009", chance:0.025},
        "tea":{elem2:"scp_009", chance:0.025},
        "coffee":{elem2:"scp_009", chance:0.025},
        "neutral_acid":{elem2:"scp_009", chance:0.025},
        "infection":{elem2:"scp_009", chance:0.025},
        "meat":{elem2:"scp_009_meat", chance:0.015},
        "skin":{elem2:"scp_009_meat", chance:0.0075},
        "body":{elem2:"scp_009_meat", chance:0.004},
        "head":{elem2:"scp_009_meat", chance:0.005},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.015},
        "fish":{elem2:"scp_009_meat", chance:0.015},
        "bird":{elem2:"scp_009_meat", chance:0.015},
        "frog":{elem2:"scp_009_meat", chance:0.015},
        "tadpole":{elem2:"scp_009_meat", chance:0.015},
    },
    behavior: behaviors.WALL,
    category:"scp",
    tempHigh: 300,
    stateHigh: "fire",
    burn:85,
    burnTime:45,
    temp: 2.66,
    tempLow: -7,
    stateLow: "red_plant",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.red_plant = {
    color: ["#AA3527","#AA3227","#AA2C27","#A11D1D"],
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"scp_009", chance:0.25},
        "sugar_ice":{elem2:"scp_009", chance:0.25},
        "juice_ice":{elem2:"scp_009", chance:0.25},
        "dirty_ice":{elem2:"scp_009", chance:0.25},
        "ice":{elem2:"scp_009", chance:0.25},
        "water":{elem2:"scp_009", chance:0.025},
        "steam":{elem2:"scp_009", chance:0.015},
        "blood":{elem2:"scp_009", chance:0.025},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009", chance:0.025},
        "salt_water":{elem2:"scp_009", chance:0.025},
        "sugar_water":{elem2:"scp_009", chance:0.025},
        "dirty_water":{elem2:"scp_009", chance:0.025},
        "pool_water":{elem2:"scp_009", chance:0.025},
        "slush":{elem2:"scp_009", chance:0.025},
        "seltzer":{elem2:"scp_009", chance:0.025},
        "juice":{elem2:"scp_009", chance:0.025},
        "soda":{elem2:"scp_009", chance:0.025},
        "milk":{elem2:"scp_009", chance:0.025},
        "slime":{elem2:"scp_009", chance:0.025},
        "tea":{elem2:"scp_009", chance:0.025},
        "coffee":{elem2:"scp_009", chance:0.025},
        "neutral_acid":{elem2:"scp_009", chance:0.025},
        "infection":{elem2:"scp_009", chance:0.025},
        "meat":{elem2:"scp_009_meat", chance:0.015},
        "skin":{elem2:"scp_009_meat", chance:0.0075},
        "body":{elem2:"scp_009_meat", chance:0.004},
        "head":{elem2:"scp_009_meat", chance:0.005},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.015},
        "fish":{elem2:"scp_009_meat", chance:0.015},
        "bird":{elem2:"scp_009_meat", chance:0.015},
        "frog":{elem2:"scp_009_meat", chance:0.015},
        "tadpole":{elem2:"scp_009_meat", chance:0.015},
    },
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    category:"scp",
    tempHigh: 2,
    stateHigh: "scp_009_plant",
    state: "solid",
    density: 1050,
    hidden: true,
}

elements.red_water = {
    color: "#880808",
    name: "liquid_SCP-009",
    behavior: behaviors.LIQUID,
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"scp_009", chance:0.25},
        "sugar_ice":{elem2:"scp_009", chance:0.25},
        "juice_ice":{elem2:"scp_009", chance:0.25},
        "dirty_ice":{elem2:"scp_009", chance:0.25},
        "ice":{elem2:"scp_009", chance:0.25},
        "water":{elem2:"scp_009"},
        "blood":{elem2:"scp_009"},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009"},
        "salt_water":{elem2:"scp_009"},
        "sugar_water":{elem2:"scp_009"},
        "dirty_water":{elem2:"scp_009"},
        "pool_water":{elem2:"scp_009"},
        "slush":{elem2:"scp_009"},
        "seltzer":{elem2:"scp_009"},
        "juice":{elem2:"scp_009"},
        "soda":{elem2:"scp_009"},
        "milk":{elem2:"scp_009"},
        "slime":{elem2:"scp_009"},
        "tea":{elem2:"scp_009"},
        "coffee":{elem2:"scp_009"},
        "neutral_acid":{elem2:"scp_009"},
        "infection":{elem2:"scp_009"},
        "meat":{elem2:"scp_009_meat", chance:0.015},
        "skin":{elem2:"scp_009_meat", chance:0.0075},
        "body":{elem2:"scp_009_meat", chance:0.004},
        "head":{elem2:"scp_009_meat", chance:0.005},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.015},
        "fish":{elem2:"scp_009_meat", chance:0.015},
        "bird":{elem2:"scp_009_meat", chance:0.015},
        "frog":{elem2:"scp_009_meat", chance:0.015},
        "tadpole":{elem2:"scp_009_meat", chance:0.015},
		"iron": { elem1:null, elem2:"rust", chance:0.025 },
		"steel": { elem1:null, elem2:"rust", chance:0.02 },
		"galvanized_steel": { elem1:null, elem2:"rust", chance:0.00025 },
		"access_door": { elem1:null, elem2:"rust", chance:0.00025 },
		"aluminum": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0025 },
		"zinc": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.015 },
		"steel": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
		"iron": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0125 },
		"tin": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.01 },
		"brass": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
		"bronze": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.001 },
		"copper": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
		"silver": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 },
		"gold": { elem1:["hydrogen","hydrogen","oxygen"], charged:true, chance:0.0075 }
    },
    tempLow: -100,
    stateLow: "red_steam",
    tempHigh: 0,
    stateHigh: "scp_009",
    category: "scp",
    state: "liquid",
    density: 997,
    conduct: 0.02,
    temp: -20,
    stain: -0.5,
    extinguish: true,
    hidden: true,
}

elements.red_steam = {
    color: "#F88379",
    name: "SCP-009_steam",
    behavior: behaviors.GAS,
    reactions: {
        "red_steam": { elem1: "red_cloud", elem2: "red_cloud", chance:0.05, "y":[0,15], "setting":"clouds" },
        "red_rain": { elem1: "red_rain", chance:0.4, "y":[0,12], "setting":"clouds" },
        "red_cloud": { elem1: "red_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
        "red_snow_cloud": { elem1: "red_rain_cloud", chance:0.4, "y":[0,12], "setting":"clouds" },
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "salt_ice":{elem2:"scp_009", chance:0.25},
        "sugar_ice":{elem2:"scp_009", chance:0.25},
        "juice_ice":{elem2:"scp_009", chance:0.25},
        "dirty_ice":{elem2:"scp_009", chance:0.25},
        "ice":{elem2:"scp_009", chance:0.25},
        "water":{elem2:"scp_009"},
        "blood":{elem2:"scp_009"},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009"},
        "salt_water":{elem2:"scp_009"},
        "sugar_water":{elem2:"scp_009"},
        "dirty_water":{elem2:"scp_009"},
        "pool_water":{elem2:"scp_009"},
        "slush":{elem2:"scp_009"},
        "seltzer":{elem2:"scp_009"},
        "juice":{elem2:"scp_009"},
        "soda":{elem2:"scp_009"},
        "milk":{elem2:"scp_009"},
        "slime":{elem2:"scp_009"},
        "tea":{elem2:"scp_009"},
        "coffee":{elem2:"scp_009"},
        "neutral_acid":{elem2:"scp_009"},
        "infection":{elem2:"scp_009"},
        "meat":{elem2:"scp_009_meat", chance:0.015},
        "skin":{elem2:"scp_009_meat", chance:0.0075},
        "body":{elem2:"scp_009_meat", chance:0.004},
        "head":{elem2:"scp_009_meat", chance:0.005},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.015},
        "fish":{elem2:"scp_009_meat", chance:0.015},
        "bird":{elem2:"scp_009_meat", chance:0.015},
        "frog":{elem2:"scp_009_meat", chance:0.015},
        "tadpole":{elem2:"scp_009_meat", chance:0.015},
    },
    temp: -150,
    tempHigh: -100,
    stateHigh: "red_water",
    category: "scp",
    state: "gas",
    density: 0.6,
    hidden: true,
}

elements.red_cloud = {
    color: "#E8ABAB",
    behavior: [
        "XX|XX|XX",
        "XX|CO:1%5|M1%2.5 AND BO",
        "XX|XX|XX",
    ],
    reactions: {
        "red_rain": { elem1:"red_rain", temp1: 20 },
        "red_cloud": { elem1:"red_rain", elem2:"red_rain", temp1:20, temp2:20, charged:true },
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "water":{elem2:"scp_009"},
        "blood":{elem2:"scp_009"},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009"},
        "salt_water":{elem2:"scp_009"},
        "sugar_water":{elem2:"scp_009"},
        "dirty_water":{elem2:"scp_009"},
        "pool_water":{elem2:"scp_009"},
        "slush":{elem2:"scp_009"},
        "seltzer":{elem2:"scp_009"},
        "juice":{elem2:"scp_009"},
        "soda":{elem2:"scp_009"},
        "milk":{elem2:"scp_009"},
        "slime":{elem2:"scp_009"},
        "tea":{elem2:"scp_009"},
        "coffee":{elem2:"scp_009"},
        "neutral_acid":{elem2:"scp_009"},
        "infection":{elem2:"scp_009"},
        "meat":{elem2:"scp_009_meat", chance:0.015},
        "skin":{elem2:"scp_009_meat", chance:0.0075},
        "body":{elem2:"scp_009_meat", chance:0.004},
        "head":{elem2:"scp_009_meat", chance:0.005},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.015},
        "fish":{elem2:"scp_009_meat", chance:0.015},
        "bird":{elem2:"scp_009_meat", chance:0.015},
        "frog":{elem2:"scp_009_meat", chance:0.015},
        "tadpole":{elem2:"scp_009_meat", chance:0.015},
    },
    category:"scp",
    temp: -110,
    tempHigh: -100,
    stateHigh: "red_rain",
    state: "gas",
    breakInto: "red_rain",
    density: 0.4,
    ignoreAir: true,
    conduct: 0.03,
    hidden: true,
}

elements.red_rain = {
    color: "#C27A79",
    behavior: [
        "XX|XX|XX",
        "XX|CH:red_water%0.05|M1%2.5 AND BO",
        "CR:electric%0.05|CR:electric%0.05|CR:electric%0.05",
    ],
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "water":{elem2:"scp_009"},
        "blood":{elem2:"scp_009"},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009"},
        "salt_water":{elem2:"scp_009"},
        "sugar_water":{elem2:"scp_009"},
        "dirty_water":{elem2:"scp_009"},
        "pool_water":{elem2:"scp_009"},
        "slush":{elem2:"scp_009"},
        "seltzer":{elem2:"scp_009"},
        "juice":{elem2:"scp_009"},
        "soda":{elem2:"scp_009"},
        "milk":{elem2:"scp_009"},
        "slime":{elem2:"scp_009"},
        "tea":{elem2:"scp_009"},
        "coffee":{elem2:"scp_009"},
        "neutral_acid":{elem2:"scp_009"},
        "infection":{elem2:"scp_009"},
        "meat":{elem2:"scp_009_meat", chance:0.015},
        "skin":{elem2:"scp_009_meat", chance:0.0075},
        "body":{elem2:"scp_009_meat", chance:0.004},
        "head":{elem2:"scp_009_meat", chance:0.005},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.015},
        "fish":{elem2:"scp_009_meat", chance:0.015},
        "bird":{elem2:"scp_009_meat", chance:0.015},
        "frog":{elem2:"scp_009_meat", chance:0.015},
        "tadpole":{elem2:"scp_009_meat", chance:0.015},
    },
    category:"scp",
    temp: -70,
    tempLow: -100,
    stateLow: "red_cloud",
    breakInto: "water",
    tempHigh: 0,
    stateHigh: "red_snow_cloud",
    state: "gas",
    density: 0.5,
    ignoreAir: true,
    conduct: 0.03,
    hidden: true,
}

elements.red_snow_cloud = {
    color: "#CC8482",
    behavior: [
        "XX|XX|XX",
        "XX|CH:red_snow%0.05|M1%2.5 AND BO",
        "XX|XX|XX",
    ],
    category:"scp",
    temp: 10,
    tempLow: -30,
    stateLow: "red_rain",
    state: "gas",
    density: 0.55,
    ignoreAir: true,
    conduct: 0.01,
    reactions: {
        "rain_cloud": { elem2: "red_rain", chance:0.4 },
        "cloud": { elem2: "red_cloud", chance:0.4, chance:0.4 },
        "snow_cloud": { elem2: "red_snow_cloud", chance:0.4 },
        "frozen_plant":{elem2:"scp_009_plant", chance:0.025},
        "dead_plant":{elem2:"red_plant", chance:0.025},
        "water":{elem2:"scp_009"},
        "blood":{elem2:"scp_009"},
        "blood_ice":{elem2:"scp_009", chance:0.25},
        "antibody":{elem2:"scp_009"},
        "salt_water":{elem2:"scp_009"},
        "sugar_water":{elem2:"scp_009"},
        "dirty_water":{elem2:"scp_009"},
        "pool_water":{elem2:"scp_009"},
        "slush":{elem2:"scp_009"},
        "seltzer":{elem2:"scp_009"},
        "juice":{elem2:"scp_009"},
        "soda":{elem2:"scp_009"},
        "milk":{elem2:"scp_009"},
        "slime":{elem2:"scp_009"},
        "tea":{elem2:"scp_009"},
        "coffee":{elem2:"scp_009"},
        "neutral_acid":{elem2:"scp_009"},
        "infection":{elem2:"scp_009"},
        "meat":{elem2:"scp_009_meat", chance:0.015},
        "skin":{elem2:"scp_009_meat", chance:0.0075},
        "body":{elem2:"scp_009_meat", chance:0.004},
        "head":{elem2:"scp_009_meat", chance:0.005},
        "frozen_meat":{elem2:"scp_009_meat", chance:0.015},
        "fish":{elem2:"scp_009_meat", chance:0.015},
        "bird":{elem2:"scp_009_meat", chance:0.015},
        "frog":{elem2:"scp_009_meat", chance:0.015},
        "tadpole":{elem2:"scp_009_meat", chance:0.015},
    },
    hidden: true,
}

elements.scp_012 = {
	name: "SCP-012",
	color: ["#b0996f","#a89163","#b0996f","#a89163","#9e804f","#7d5e2e","#81633b"],
    buttonColor: ["#b0996f","#a89163","#874B2B","#b0996f","#a89163","#ad6236","#9e804f","#7a1d05","#7d5e2e","#81633b"],
	behavior: [
		"XX|XX|XX",
		"XX|FX%0.25|XX",
		"M2%25|M1%25|M1%25",
	],
	tick: function(pixel) {
        if (Math.random() < 0.95) {
            let xDir = Math.random() < 0.5 ? 1 : -1;
			for (let x = 1; x < 20; x++) {
				let x2 = pixel.x+(x*xDir);
				let y2 = pixel.y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements[seenPixel.element].id == elements.body.id) {
						seenPixel.element = "body_012_1"
						break;
					}
                    else if (elements[seenPixel.element].id == elements.head.id) {
                        seenPixel.element = "head_012_1"
						pixelMap[seenPixel.x][seenPixel.y+1].element = "body_012_1"
						break;
					}
				}
			}
		}
        if (pixel.lines < 1 && isEmpty(pixel.x,pixel.y-1)) {
            releaseElement(pixel, "scp_012", 1, true)
            changePixel(pixel,"complete_012")
        }
        if (Math.random() < 0.5) {
			shuffleArray(squareCoordsShuffle);
			for (var i = 0; i < squareCoordsShuffle.length; i++) {
				var x = pixel.x+squareCoordsShuffle[i][0];
				var y = pixel.y+squareCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && (elements[pixelMap[x][y].element].id == elements.blood.id || elements[pixelMap[x][y].element].id == elements.infection.id || elements[pixelMap[x][y].element].id == elements.infected_blood.id)) {
					deletePixel(x,y);
                    pixel.lines -= 1
					break;
				}
			}
		}
	},
    properties: {
		lines: 585,
	},
	category: "scp",
	tempHigh: 278,
	stateHigh: ["ash","ash","ash","smoke","smoke","fire"],
	burn:15,
	burnTime:150,
	burnInto: ["ash","ash","ash","smoke","smoke","smoke"],
	state: "solid",
	density: 1201
}

elements.complete_012 = {
	color: ["#b0996f","#874B2B","#874B2B","#a89163","#ad6236","#ad6236","#9e804f","#7a1d05","#7a1d05","#81633b"],
    buttonColor: ["#b0996f","#a89163","#874B2B","#b0996f","#a89163","#ad6236","#9e804f","#7a1d05","#7d5e2e","#81633b"],
    name: "SCP-012",
	behavior: [
		"XX|XX|XX",
		"XX|FX%0.25|XX",
		"M2%25|M1%25|M1%25",
	],
	tick: function(pixel) {
        if (Math.random() < 0.95) {
            let xDir = Math.random() < 0.5 ? 1 : -1;
			for (let x = 1; x < 20; x++) {
				let x2 = pixel.x+(x*xDir);
				let y2 = pixel.y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements[seenPixel.element].id == elements.body.id) {
						seenPixel.element = "body_012_1"
						break;
					}
                    else if (elements[seenPixel.element].id == elements.head.id) {
                        seenPixel.element = "head_012_1"
						pixelMap[seenPixel.x][seenPixel.y+1].element = "body_012_1"
						break;
					}
				}
			}
		}
	},
    properties: {
		lines: 585
	},
	category: "scp",
	tempHigh: 278,
	stateHigh: ["ash","ash","ash","smoke","smoke","fire"],
	burn:15,
	burnTime:150,
	burnInto: ["ash","ash","ash","smoke","smoke","smoke"],
	state: "solid",
	density: 1201,
    hidden: true
}

elements.body_012_1 = {
	color: ["#069469","#047e99","#7f5fb0"],
    name: "body",
	category: "scp",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["blood","meat","bone"],
	forceSaveColor: true,
	pickElement: "human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"plague": { elem1:"plague", chance:0.05 },
		"egg": { elem2:"yolk", chance:0.5, oneway:true },
		"grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
		"ant": { elem2:"dead_bug", chance:0.05, oneway:true },
		"spider": { elem2:"dead_bug", oneway:true },
		"fly": { elem2:"dead_bug", oneway:true },
		"firefly": { elem2:"dead_bug", oneway:true },
		"bee": { elem2:"dead_bug", oneway:true },
		"flea": { elem2:"dead_bug", oneway:true },
		"termite": { elem2:"dead_bug", oneway:true },
		"worm": { elem2:"slime", chance:0.05, oneway:true },
		"stink_bug": { elem2:"stench", oneway:true },
		"grass_seed": { elem2:null, chance:0.05 },
		"gold_coin": { elem2:null, chance:0.05 },
		"diamond": { elem2:null, chance:0.05 },
		"sun": { elem1:"cooked_meat" },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} }
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "head_012_1") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_012_1") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				pixel.panic = head.panic;
				delete head.panic;
			}
		}
        else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
			var head = pixelMap[pixel.x][pixel.y-1];
			head.element = "head_012_1"
		}
		else { var head = null }
		if (head && Math.random() < 0.9) {
			let y = Math.random() < 0.5 ? 0 : -1;
            let xDir = Math.random() < 0.5 ? 1 : -1;
			for (let x = 1; x < 50; x++) {
				let x2 = pixel.x+(x*xDir);
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements[seenPixel.element].id == elements.scp_012.id) {
						if (pixel.x-1 > seenPixel.x && pixel.dir != -1) {
                            pixel.dir = -1
                        }
                        else if (pixel.x+1 < seenPixel.x && pixel.dir != 1) {
                            pixel.dir = 1
                        }
                        else if ((pixel.x-1 == seenPixel.x || pixel.x+1 == seenPixel.x) && pixel.dir != 0) {
                            pixel.dir = 0
                            if (pixel.x > seenPixel.x && pixel.face != -1) {
                                pixel.face = -1
                            }
                            else if (pixel.x < seenPixel.x && pixel.face != 1) {
                                pixel.face = 1
                            }
                        }
						break;
					}
				}
			}
		}
		if (pixel.burning) {
			pixel.panic += 0.1;
			if (head && pixelTicks-pixel.burnStart > 240) {
				pixel.color = head.color;
			}
		}
		else if (pixel.panic > 0) {
			pixel.panic -= 0.1;
			if (pixel.panic < 0) { pixel.panic = 0; }
			else if (pixel.panic > 50) { pixel.panic = 50; }
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head === null) { return }
		else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
			}
			// 5% chance to change direction
			if (Math.random() < 0.05 || !moved) {
				pixel.dir *= -1;
			}
			// homeostasis
			if (pixel.temp > 37) { pixel.temp -= 1; }
			else if (pixel.temp < 37) { pixel.temp += 1; }
		}

        if (pixel.dir == 0 && pixel.face) {
            if (isEmpty(pixel.x+pixel.face, pixel.y-1) && !isEmpty(pixel.x+pixel.face, pixel.y)) {
		    	// create blood 15% chance
		    	if (Math.random() < 0.15) {
		    		createPixel("blood", pixel.x+pixel.face, pixel.y-1);
		    		// set dead to true 2.5% chance
		    		if (Math.random() < 0.025) {
		    			pixel.dead = pixelTicks;
		    		}
		    	}
		    }
            else if (!isEmpty(pixel.x+pixel.face, pixel.y) && isEmpty(pixel.x+(-pixel.face), pixel.y-1)) {
		    	if (tryMove(pixel, pixel.x+(-pixel.face), pixel.y)) {
					movePixel(head, head.x+(-pixel.face), head.y);
				}
                else if (isEmpty(pixel.x+(-pixel.face), pixel.y-2)) {
					if (tryMove(pixel, pixel.x+(-pixel.face), pixel.y-1)) {
					    movePixel(head, head.x+(-pixel.face), head.y-2);
				    }
				}
		    }
        }
	}
}

elements.head_012_1 = {
	color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    name: "head",
	category: "scp",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["blood","meat","bone"],
	forceSaveColor: true,
	pickElement: "human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"plague": { elem1:"plague", chance:0.05 },
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 },
		"beans": { elem2:[null,null,null,null,null,null,null,null,"stench"], chance:0.2 },
		"sun": { elem1:"cooked_meat" },
		"light": { stain1:"#825043" },
		"bee": { stain1:"#cc564b", chance:0.2 },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
		"salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
		"pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} }
	},
	properties: {
		dead: false
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_012_1") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		// check for eating food
		if (body && !pixel.dead && Math.random() < 0.0025) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].isFood && pixelMap[x][y].panic === undefined) {
					deletePixel(x,y);
					break;
				}
			}
		}

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		// homeostasis
		if (pixel.temp > 37) { pixel.temp -= 1; }
		else if (pixel.temp < 37) { pixel.temp += 1; }
	},
	onChange: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	},
	onDelete: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	}
}

elements.scp_035 = {
	color: ["#f7ead0","#faf9f6","#e9e6db"],
    buttonColor: ["#11111f","#f7ead0","#f7ead0","#f7ead0","#f7ead0","#11111f","#faf9f6","#faf9f6","#faf9f6","#faf9f6","#11111f","#e9e6db","#e9e6db","#e9e6db","#e9e6db","#11111f"],
	name: "SCP-035",
    hardness: 0.9,
    category: "scp",
    behavior: [
        "CR:black_acid%0.05|CR:black_acid%0.25|CR:black_acid%0.05",
        "CR:black_acid%0.25|XX|CR:black_acid%0.25",
        "CR:black_acid%0.05|CR:black_acid%0.5 AND M1|CR:black_acid%0.05",
    ],
    properties: {
	},
	breakInto: ["scp_035","porcelain_shard","porcelain_shard","black_acid","black_acid"],
    density: 800,
    state: "solid",
    tempHigh: 3500,
    stateHigh: "porcelain_shard",
    tick: function(pixel) {
        for (var i = 0; i < squareCoords.length; i++) {
            var coords = squareCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (!isEmpty(x,y) && !outOfBounds(x,y) && Math.random() > 0.8) {
                var pixel2 = pixelMap[x][y]
                let old = pixel2.element;
                if (pixel2.element == "head_008" || pixel2.element == "head" || pixel2.element == "head_1000") {
		        	changePixel(pixel2,"head_035")
                    deletePixel(pixel.x,pixel.y)
		        }
                else if (pixel2.element == "body_008" || pixel2.element == "body" || pixel2.element == "body_1000") {
		        	pixel2.element = "body_035"
                    deletePixel(pixel.x,pixel.y)
		        }
            }
        }
	},
    reactions: {
        "head": { elem1:null, elem2: "head_035" , chance:0.2 },
        "head_008": { elem1:null, elem2: "head_035" , chance:0.1 },
    },
},

elements.body_035 = {
	color: ["#069469","#047e99","#7f5fb0"],
	name: "SCP-035-1",
	category: "life",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["blood","meat","bone"],
	forceSaveColor: true,
	pickElement: "human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"plague": { elem1:"plague", chance:0.05 },
		"egg": { elem2:"yolk", chance:0.5, oneway:true },
		"grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
		"ant": { elem2:"dead_bug", chance:0.05, oneway:true },
		"spider": { elem2:"dead_bug", oneway:true },
		"fly": { elem2:"dead_bug", oneway:true },
		"firefly": { elem2:"dead_bug", oneway:true },
		"bee": { elem2:"dead_bug", oneway:true },
		"flea": { elem2:"dead_bug", oneway:true },
		"termite": { elem2:"dead_bug", oneway:true },
		"worm": { elem2:"slime", chance:0.05, oneway:true },
		"stink_bug": { elem2:"stench", oneway:true },
		"grass_seed": { elem2:null, chance:0.05 },
		"gold_coin": { elem2:null, chance:0.05 },
		"diamond": { elem2:null, chance:0.05 },
		"sun": { elem1:"cooked_meat" },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} }
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "head_035") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_035") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				pixel.panic = head.panic;
				delete head.panic;
			}
		}
        else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
			var head = pixelMap[pixel.x][pixel.y-1];
			changePixel(head,"head_035")
		}
		else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_1000") {
			var head = pixelMap[pixel.x][pixel.y-1];
			changePixel(head,"head_035")
		}
        else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_008") {
			var head = pixelMap[pixel.x][pixel.y-1];
			changePixel(head,"head_035")
		}
		else { var head = null }

		if (pixel.burning) {
			pixel.panic += 0.05;
			if (head && pixelTicks-pixel.burnStart > 240) {
				pixel.color = "#232323";
			}
		}
		if (pixel.charge) {
			pixel.panic += 0.5;
		}
		else if (pixel.panic > 0) {
			pixel.panic -= 0.2;
			if (pixel.panic < 0) { pixel.panic = 0; }
			else if (pixel.panic > 50) { pixel.panic = 50; }
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1 && !pixel.charge) {
				createPixel("black_acid", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head === null) { return }
		else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if (hitPixel.element === "body" || hitPixel.element === "head") {
						// interact with human
						hitPixel.panic += 0.5
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved) {
				pixel.dir *= -1;
			}
			// homeostasis
			if (pixel.temp > 37) { pixel.temp -= 1; }
			else if (pixel.temp < 37) { pixel.temp += 1; }
		}

	}
}

elements.head_035 = {
	name: "SCP-035-1",
	color: ["#f7ead0","#faf9f6","#e9e6db"],
	category: "life",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["blood","meat","bone"],
	forceSaveColor: true,
	pickElement: "human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"plague": { elem1:"plague", chance:0.05 },
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 },
		"beans": { elem2:[null,null,null,null,null,null,null,null,"stench"], chance:0.2 },
		"sun": { elem1:"cooked_meat" },
		"light": { stain1:"#825043" },
		"bee": { stain1:"#cc564b", chance:0.2 },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
		"salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
		"pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} }
	},
	properties: {
		dead: false,
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (Math.random() < 0.0125) {
			releaseElement(pixel,"black_acid",4,true)
		}
		if (pixel.dead || (pixel.start+1000) , pixelTicks && Math.random() > 0.95) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_035") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
        else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			body.element = "body_035"
		}
		else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_1000") {
			var body = pixelMap[pixel.x][pixel.y+1];
			body.element = "body_035"
		}
        else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_008") {
			var body = pixelMap[pixel.x][pixel.y+1];
			body.element = "body_035"
		}
		else { var body = null }

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 5% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.05 && !pixel.charge) {
				createPixel("black_acid", pixel.x, pixel.y+1);
				// set dead to true 50% chance
				if (Math.random() < 0.5) {
					pixel.dead = pixelTicks;
				}
			}
		}
		// homeostasis
		if (pixel.temp > 37) { pixel.temp -= 1; }
		else if (pixel.temp < 37) { pixel.temp += 1; }
	},
	onChange: function(pixel) {
		releaseElement(pixel,"scp_035",1,true)
	},
	onDelete: function(pixel) {
		releaseElement(pixel,"scp_035",1,true)
	},
}

elements.black_acid = {
	name: "SCP-035_acid",
    hidden: true,
    color: ["#00000f","#111111","#242424"],
    behavior: [
        "XX|DB%2.5|XX",
        "DB%3 AND M2%10|DL%1|DB%3 AND M2%10",
        "DB%3 AND M2%10|DB%5.5 AND M1|DB%3 AND M2%10",
    ],
    ignore: [/*"scp_804"*/"shy_head","shy_body","scp_055","head","body","body_008","head_008","scp_035","body_035","head_035","glass_shard","porcelain_shard","rad_shard","color_sand","sand","iron","steel","glass","rad_glass","stained_glass","acid_gas","neutral_acid","acid_cloud","water","salt_water","sugar_water","dirty_water","copper","gold","porcelain","plastic","bead","microplastic","molten_plastic","pool_water","chlorine","hydrogen","oxygen","ozone","gold_coin","silver","nickel","calcium"],
    reactions: {
        "caustic_potash": { elem1:null, elem2:"potassium_salt" },
        "water": { elem1:null, elem2:"dirty_water" },
        "salt_water": { elem1:null, elem2:"water" },
        "sugar_water": { elem1:null, elem2:"water" },
        "pool_water": { elem1:null, elem2:"water" },
        "plant": { elem1:null, elem2:"dead_plant" },
        "tree_branch": { elem1:null, elem2:"wood" },
        "charcoal": { elem1:null, elem2:"carbon_dioxide" },
        "rock": { elem1:null, elem2:"sand", chance:0.05 },
        "baking_soda": { elem1:null, elem2:["carbon_dioxide","foam"] },
        "calcium": { elem1:null, elem2:"hydrogen", chance:0.01 },
        "zinc": { elem1:null, elem2:null, chance:0.03 },
        "sugar": { elem1:null, elem2:"carbon_dioxide" },
        "glass": { elem1:null, elem2: null , chance:0.005 },
        "rad_glass": { elem1:null, elem2: null , chance:0.0075 },
        "stained_glass": { elem1:null, elem2: null , chance:0.005 },
        "glass_shard": { elem1:null, elem2: null , chance:0.01 },
        "rad_shard": { elem1:null, elem2: null , chance:0.01 },
        "porcelain_shard": { elem1:null, elem2: null , chance:0.005 },
        "copper": { elem1:null, elem2: null , chance:0.02 },
        "gold": { elem1:null, elem2: null , chance:0.02 },
        "porcelain": { elem1:null, elem2: null , chance:0.0005 },
        "plastic": { elem1:null, elem2: null , chance:0.01 },
        "molten_plastic": { elem1:null, elem2: null , chance:0.02 },
        "gold_coin": { elem1:null, elem2: "gold" , chance:0.1 },
        "silver": { elem1:null, elem2: null , chance:0.02 },
        "nickel": { elem1:null, elem2: null , chance:0.02 },
        "calcium": { elem1:null, elem2: null , chance:0.02 },
        "iron": { elem1:null, elem2: null , chance:0.02 },
        "steel": { elem1:null, elem2: null , chance:0.02 },
        "concrete": { elem1:null, elem2: null , chance:0.05 },
        "rock": { elem1:null, elem2: null , chance:0.04 },
        "dirt": { elem1:null, elem2: null , chance:0.05 },
        "sand": { elem1:null, elem2: null , chance:0.015 },
        "color_sand": { elem1:null, elem2: null , chance:0.015 },
        "head_035": { elem1:null, elem2: "scp_035" , chance:0.001},
        "body_035": { elem1:null, elem2: null , chance:0.001 },
        "head": { elem1:null, elem2: null , chance:0.01 },
        "body": { elem1:null, elem2: null , chance:0.01 },
        "head_008": { elem1:null, elem2: null , chance:0.02 },
        "body_008": { elem1:null, elem2: null , chance:0.02 },
        /*"scp_804": { elem1:null, elem2: null , chance:0.02 },*/
    },
    category: "scp",
    tempHigh: 1000,
    stateHigh: null,
    tempLow: -58.88,
    burn: 30,
    burnTime: 10,
    burnInto: ["fire","fire","fire","fire","fire","fire","fire","fire","ash","ash","fire","fire","fire","fire","ash","ash"],
    fireColor: "#111111",
    state: "liquid",
    density: 1105,
    stain: 0.5,
}

elements.scp_049 = {
	name: "SCP-049",
	color: ["#f7ead0","#faf9f6","#e9e6db"],
    buttonColor: ["#f7ead0","#faf9f6","#e9e6db","#11111f","#242424","#11111f","#242424"],
	category: "scp",
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	onPlace: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("body_049", pixel.x, pixel.y+1);
			var color = pixel.color;
			changePixel(pixel,"head_049");
			pixel.color = color;
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("head_049", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			changePixel(pixel,"body_049");
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
		"fire": { attr1:{panic:2} },
		"plasma": { attr1:{panic:2} },
		"plague": { attr1:{panic:3} },
        "cancer": { attr1:{panic:4} },
        "virus": { attr1:{panic:8} },
        "scp_682": { attr1:{panic:4} },
        "scp_008": { attr1:{panic:8} },
        "scp_096": { attr1:{panic:4} },
	},
	related: ["body_049","head_049"],
	cooldown: defaultCooldown,
	forceSaveColor: true,
}

elements.body_049 = {
	name: "SCP-049",
	color: ["#11111f","#242424"],
	category: "scp",
	breakInto: ["rotten_meat","rotten_meat","bone","blood"],
	hidden: true,
	density: 1500,
	state: "solid",
	tempHigh: 250,
	stateHigh: ["rotten_meat","bone"],
	tempLow: -75,
	stateLow: ["rotten_meat","bone"],
	forceSaveColor: true,
	pickElement: "scp_049",
	reactions: {
		"cancer": { elem2:null, chance:0.05 },
		"plague": { elem2:null, chance:0.5 },
		"egg": { elem2:"yolk", chance:0.5, oneway:true },
		"grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
		"ant": { elem2:"dead_bug", chance:0.05, oneway:true },
		"spider": { elem2:"dead_bug", oneway:true },
		"fly": { elem2:"dead_bug", oneway:true },
		"firefly": { elem2:"dead_bug", oneway:true },
		"bee": { elem2:"dead_bug", oneway:true },
		"flea": { elem2:"dead_bug", oneway:true },
		"termite": { elem2:"dead_bug", oneway:true },
		"worm": { elem2:"slime", chance:0.05, oneway:true },
		"stink_bug": { elem2:"stench", oneway:true },
		"grass_seed": { elem2:null, chance:0.05 },
		"sun": { elem1:"cooked_meat" },
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "head_049") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_049") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				pixel.panic = head.panic;
				delete head.panic;
			}
		}
		else { var head = null }
		if (head && Math.random() < 0.25) {
			let y = Math.random() < 0.5 ? 0 : -1;
			for (let x = 1; x < 10; x++) {
				let x2 = pixel.x+(x*pixel.dir);
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements.scp_049.reactions[seenPixel.element] && elements.scp_049.reactions[seenPixel.element].attr1 && elements.scp_049.reactions[seenPixel.element].attr1.panic) {
						pixel.panic += elements.scp_049.reactions[seenPixel.element].attr1.panic;
						pixel.dir *= -1;
						break;
					}
					else if (seenPixel.dead || seenPixel.temp > 200) {
						pixel.panic += 5;
						pixel.dir *= -1;
						if (seenPixel.panic) delete seenPixel.panic;
						break;
					}
				}
			}
		}
		if (pixel.burning) {
			pixel.panic += 0.1;
			if (head && pixelTicks-pixel.burnStart > 240) {
				pixel.color = head.color;
			}
		}
		else if (pixel.panic > 0) {
			pixel.panic -= 1;
			if (pixel.panic < 0) { pixel.panic = 0; }
			else if (pixel.panic > 50) { pixel.panic = 50; }
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// bleed if decapitated 10% chance
			if (Math.random() < 0.1 && !pixel.charge) {
				createPixel("foam", pixel.x, pixel.y-1);
                pixelMap[pixel.x][pixel.y-1].color = "#666666"
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head === null) { return }
		else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if (hitPixel.element === "body" || hitPixel.element === "head" && hitPixel.panic < pixel.panic) {
						// interact with humans
						hitPixel.panic = pixel.panic;
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved) {
				pixel.dir *= -1;
			}
			// homeostasis
			if (pixel.temp > 37) { pixel.temp -= 1; }
			else if (pixel.temp < 37) { pixel.temp += 1; }
		}

        if (Math.random() < 0.95) {
		    	let y = Math.random() < 0.5 ? 0 : -1;
                let xDir = Math.random() < 0.5 ? 1 : -1;
		    	for (let x = 1; x < 150; x++) {
		    		let x2 = pixel.x+(x*xDir);
		    		let y2 = pixel.y+y;
		    		if (!isEmpty(x2,y2,true) && !outOfBounds(x2,y2)) {
		    			let seenPixel = pixelMap[x2][y2];
		    			if ((elements[seenPixel.element].id == elements.head.id || elements[seenPixel.element].id == elements.head_008.id) && seenPixel.pestilence == undefined) {
                            if (Math.random() > 0.07) {
                                seenPixel.pestilence = false
                            }
                            else {
                                seenPixel.pestilence = true
                            }
		    			}
                        if (elements[seenPixel.element].id != elements.glass.id && elements[seenPixel.element].id != elements.stained_glass.id && elements[seenPixel.element].id != elements.glass_shard.id) {
		    				break;
		    			}
		    		}
		    	}
		}
        for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y)) {
                    var pixel2 = pixelMap[x][y]
                    if ((pixel2.dead == true || pixel2.pestilence == true) && (elements[pixel2.element].id == elements.head.id || elements[pixel2.element].id == elements.head_008.id)) {
		            	changePixel(pixel2,"head_049_1")
		            }
                    else if ((pixel2.dead == true || pixel2.pestilence == true) && (elements[pixel2.element].id == elements.body.id || elements[pixel2.element].id == elements.body_008.id)) {
		            	changePixel(pixel2,"body_049_1")
		            }
                }
        }

	}
}

elements.head_049 = {
	name: "SCP-049",
	color: ["#f7ead0","#faf9f6","#e9e6db"],
	category: "scp",
	hidden: true,
	density: 1080,
	state: "solid",
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["rotten_meat","bone","bone","blood"],
	forceSaveColor: true,
	pickElement: "scp_049",
	reactions: {
		"cancer": { elem2:null, chance:0.05 },
		"plague": { elem2:null, chance:0.5 },
		"sun": { elem1:"cooked_meat" },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
		"salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
		"pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
	},
	properties: {
		dead: false,
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_049") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		// check for drinking
		if (body && !pixel.dead && Math.random() < 0.1) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].id == elements.alcohol.id) {
					deletePixel(x,y);
					break;
				}
			}
		}

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// bleed if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
				createPixel("foam", pixel.x, pixel.y+1);
                pixelMap[pixel.x][pixel.y+1].color = "#666666"
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		// homeostasis
		if (pixel.temp > 37) { pixel.temp -= 1; }
		else if (pixel.temp < 37) { pixel.temp += 1; }
	},
	onChange: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	},
	onDelete: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	}
}

elements.body_049_1 = {
	color: ["#069469","#047e99","#7f5fb0"],
    name: "SCP-049-1",
	category: "life",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["blood","meat","bone"],
	forceSaveColor: true,
	pickElement: "human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"plague": { elem1:"plague", chance:0.05 },
		"egg": { elem2:"yolk", chance:0.5, oneway:true },
		"grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
		"ant": { elem2:"dead_bug", chance:0.05, oneway:true },
		"spider": { elem2:"dead_bug", oneway:true },
		"fly": { elem2:"dead_bug", oneway:true },
		"firefly": { elem2:"dead_bug", oneway:true },
		"bee": { elem2:"dead_bug", oneway:true },
		"flea": { elem2:"dead_bug", oneway:true },
		"termite": { elem2:"dead_bug", oneway:true },
		"worm": { elem2:"slime", chance:0.05, oneway:true },
		"stink_bug": { elem2:"stench", oneway:true },
		"grass_seed": { elem2:null, chance:0.05 },
		"sun": { elem1:"cooked_meat" },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} },
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "head_049_1") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_049_1") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				delete head.panic;
			}
		}
        else if (!isEmpty(pixel.x, pixel.y-1, true) && (pixelMap[pixel.x][pixel.y-1].element == "head" || pixelMap[pixel.x][pixel.y-1].element == "head_008" )) {
			var head = pixelMap[pixel.x][pixel.y-1];
			changePixel(head,"head_049_1")
		}
		else { var head = null }
        if (head && Math.random() < 0.5) {
			let y = Math.random() < 0.5 ? 0 : -1;
            let xDir = Math.random() < 0.5 ? 1 : -1;
			for (let x = 1; x < 20; x++) {
				let x2 = pixel.x+(x*xDir);
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements[seenPixel.element].id == elements.head.id) {
                        if (pixel.dir != 1 && pixelMap[x2][y2].x > pixel.x) {
                            pixel.dir = 1
                        }
                        else if (pixel.dir != -1 && pixelMap[x2][y2].x < pixel.x) {
                            pixel.dir = -1
                        }
		    		}
                    if (elements[seenPixel.element].id != elements.glass.id && elements[seenPixel.element].id != elements.stained_glass.id && elements[seenPixel.element].id != elements.glass_shard.id) {
		    			break;
		    		}
				}
			}
		}

		if (pixel.panic > 0) {
			pixel.panic = 0;
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head === null) { return }
		else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.2 || !moved) {
				pixel.dir *= -1;
			}
		}

	}
}

elements.head_049_1 = {
	color: ["#75816B"],
    name: "SCP-049-1",
	category: "life",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["blood","meat","bone"],
	forceSaveColor: true,
	pickElement: "human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"plague": { elem1:"plague", chance:0.05 },
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 },
		"beans": { elem2:[null,null,null,null,null,null,null,null,"stench"], chance:0.2 },
		"sun": { elem1:"cooked_meat" },
		"light": { stain1:"#825043" },
		"bee": { stain1:"#cc564b", chance:0.2 },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
		"salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
		"pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} }
	},
	properties: {
		dead: false,
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_049_1") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
        else if (!isEmpty(pixel.x, pixel.y+1, true) && (pixelMap[pixel.x][pixel.y+1].element == "body" || pixelMap[pixel.x][pixel.y+1].element == "body_008")) {
			var body = pixelMap[pixel.x][pixel.y+1];
			body.element = "body_049_1"
		}
		else { var body = null }

		// check for eating food
		if (body && !pixel.dead && Math.random() < 0.1) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].isFood) {
					deletePixel(x,y);
					break;
				}
                else if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].id == elements.head.id) {
					pixelMap[x][y+1].element = "body_049_1"
                    changePixel(pixelMap[x][y],"head_049_1")
					break;
				}
                else if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].id == elements.body.id) {
					pixelMap[x][y].element = "body_049_1"
                    changePixel(pixelMap[x][y-1],"head_049_1")
					break;
				}
			}
		}

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
	},
}

elements.scp_055 = {
    color: "#000000",
	name: "SCP-055",
    grain: 0,
    excludeRandom: true,
    behavior: [
        "XX|XX|XX",
        "XX|CH:REDACTED|XX",
        "XX|XX|XX"
    ],
    category: "scp",
    state: "solid",
    tempHigh: 55055055055,
    stateHigh: ["random",null],
    breakInto: ["random",null],
    hardness: 0.99,
}

elements.REDACTED = {
    hidden: true,
    color: "#000000",
    grain: 0.1,
    excludeRandom: true,
    behavior: [
        "XX|CL|XX",
        "CL|EX|CL",
        "XX|CL|EX",
    ],
    category: "scp",
    state: "solid",
    movable: false,
}

elements.scp_063 = {
	color: ["#CAE8E9","#CCEAED","#A2CFD4","#A6D6D8","#8CCBD7"],
	name: "SCP-063",
	behavior: [
	    "XX|DL|XX",
	    "DL|XX|DL",
	    "M2%80 AND DL|M1 AND DL|M2%80 AND DL",
    ],
    ignore: ["scp_063","head_049","body_049","shy_head","shy_body","head_049_1","body_049_1","head_008_1","body_008_1","head_012_1","body_012_1","scp_999","scp_682","head","body","plant","grass","algae","cell","cancer","worm","flea","termite","ant","spider","fly","firefly","bee","stink_bug","human","bird","rat","frog","tadpole","fish","slug","snail","sapling","evergreen","cactus","kelp","coral","pistil","tree_branch","vine","bamboo_plant","mushroom_stalk","mushroom_gill","mushroom_cap","lichen","homunculus","root","hyphae","skin","porcelain"],
	category: "scp",
	tempHigh: 190,
	stateHigh: ["molten_plastic","molten_plastic","fire","dioxin"],
	burn: 10,
	burnTime: 300,
	burnInto: "dioxin",
	state: "solid",
	density: 1052,
	darkText: true
}

elements.scp_096 = {
	name: "SCP-096",
    category: "scp",
	color: ["#ddd2d6","#C9BCC2","#b6adb2"],
    buttonColor: ["#dcd3da","#ddd2d6","#dcd3da","#ddd2d6","#0b0706","#C9BCC2","#b6adb2","#ddd2d6","#C9BCC2","#b6adb2","#C9BCC2","#b6adb2","#ddd2d6","#C9BCC2","#b6adb2","#633134","#633134"],
    category: "scp",
    properties: {
        dead: false,
        dir: 1,
        panic: 0,
    },
    onPlace: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("shy_body", pixel.x, pixel.y+1);
            pixel.element = "shy_head";
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("shy_head", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            pixel.element = "shy_body";
            pixel.color = pixelColorPick(pixel)
        }   
        else {
            deletePixel(pixel.x, pixel.y);
        }
    },
    related: ["shy_body","shy_head"],
    cooldown: defaultCooldown
}

elements.shy_head = {
    hidden: true,
	name: "SCP-096",
	color: ["#ddd2d6","#C9BCC2","#b6adb2"],
    category: "scp",
	hardness: 0.99,
    pickElement: "scp_096",
	properties: {
        dead: false,
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 20 && Math.random() < 0.1) {
                changePixel(pixel,"bone");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "shy_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { 
            var body = null
            changePixel(pixel,"bone") 
        }

        // check for eating food
		if (body && !pixel.dead && Math.random() < 0.1) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && (elements[pixelMap[x][y].element].isFood || pixelMap[x][y].target == true)) {
					deletePixel(x,y);
					break;
				}
			}
		}

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
	}
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1; }
        else if (pixel.temp < 37) { pixel.temp += 1; }
    },
    density: 1070,
    state: "solid",
    conduct: .05,
    tempHigh: 35000,
    stateHigh: "bone",
    burn: .01,
    burnTime: 3000,
    burnInto: "bone",
    reactions: {
	    "homunculus": { elem2 : ["blood","slime","blood","slime","rotten_meat",null] },
	    "head": { elem2 : ["blood","blood","blood","bone",null] },
	    "body": { elem2: ["blood","blood","meat","bone",null] },
        "blood": { elem2 : null, chance: 0.5 },
        "infection": { elem2 : null, chance: 0.5 },
        "meat": { elem2 : ["blood",null], chance: 0.5 },
        "bone_marrow": { elem2 : ["blood",null], chance: 0.5 },
        "bone": { elem2 : ["bone_marrow","blood","quicklime"], chance: 0.5 },
        "rotten_meat": { elem2 : ["infection","stench",null], chance: 0.5 },
        "ground_meat": { elem2 : null, chance: 5 },
    },
},

elements.shy_body = {
	name: "SCP-096",
    hidden: true,
	color: ["#ddd2d6","#C9BCC2","#b6adb2"],
    category: "scp",
    pickElement: "scp_096",
	hardness: 1,
	properties: {
        dead: false,
        dir: 1,
        h: 0,
        panic: 0,
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "shy_head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "shy_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
        }
        else { var head = null }
        if (pixel.burning) {
            pixel.panic += 0.1;
            if (head && pixelTicks-pixel.burnStart > 240) {
                pixel.color = head.color;
            }
        }
        else if (pixel.panic > 0) {
            pixel.panic -= 0.1;
        }
        for (var i = 0; i <= width; i++) {
			for (var j = 0; j <= height; j++) {
			    	if (!isEmpty(i,j,true)) {
			    		if (pixelMap[i][j].target == true && (pixelMap[i][j].element == "body" || pixelMap[i][j].element == "head")) {
                            var targetExist = true
                            pixel.h = 1
                            if (pixel.dir != 1 && pixelMap[i][j].x > pixel.x) {
                                pixel.dir = 1
                            }
                            else if (pixel.dir != -1 && pixelMap[i][j].x < pixel.x) {
                                pixel.dir = -1
                            }
                            else if (pixel.dir != 0 && pixelMap[i][j].x == pixel.x) {
                                pixel.dir = 0
                            }
			    		}
                        if (pixelMap[i][j].target == true && pixelMap[i][j].element != "body" && pixelMap[i][j].element != "head") {
                            delete pixelMap[i][j].target
			    		}
			    	}
                    if (i >= width && j >= height && !targetExist && pixel.h != 0) {
                        pixel.h = 0
                    }
			}
		}
        if (pixel.h == 1) {
            if (Math.random() < 0.95) {
		    	let y = Math.random() < 0.5 ? 0 : -1;
                let xDir = Math.random() < 0.5 ? 1 : -1;
		    	for (let x = 1; x < 200; x++) {
		    		let x2 = pixel.x+(x*xDir);
		    		let y2 = pixel.y+y;
		    		if (!isEmpty(x2,y2,true) && !outOfBounds(x2,y2)) {
		    			let seenPixel = pixelMap[x2][y2];
		    			if (seenPixel.target == true) {
		    				if (pixel.dir != 1 && seenPixel.x > pixel.x+1) {
                                pixel.dir = 1
                            }
                            else if (pixel.dir != -1 && seenPixel.x < pixel.x-1) {
                                pixel.dir = -1
                            }
                            else if (seenPixel.x == pixel.x+1 || seenPixel.x == pixel.x-1 || seenPixel.x == pixel.x) {
                                pixel.dir = 0
                            }
                            break;
		    			}
		    		}
		    	}
		    }
            if (Math.random() < 0.95) {
		    	let y = Math.random() < 0.5 ? 0 : -1;
		    	for (let x = 1; x < width; x++) {
		    		let x2 = pixel.x+(x*pixel.dir);
		    		let y2 = pixel.y+y;
		    		if (!isEmpty(x2,y2,true) && !outOfBounds(x2,y2)) {
		    			let seenPixel = pixelMap[x2][y2];
                        if (elements[seenPixel.element].id == elements.head.id) {
		    				if (!seenPixel.target) {
                                seenPixel.target = true
                            }
		    			}
                        if (elements[seenPixel.element].id != elements.glass.id && elements[seenPixel.element].id != elements.stained_glass.id && elements[seenPixel.element].id != elements.glass_shard.id) {
		    				break;
		    			}
		    		}
		    	}
		    }
            if (Math.random() < 1) {
		    	let yDir = -1
		    	for (let y = 1; y < height; y++) {
		    		let x2 = pixel.x
		    		let y2 = pixel.y+(y*yDir);
		    		if (!isEmpty(x2,y2,true) && !outOfBounds(x2,y2)) {
		    			if (pixelMap[x2][y2].target == true) {
                            let seenPixel = pixelMap[x2][y2];
                            if (seenPixel.y < pixel.y) {
                                if (!isEmpty(pixel.x, pixel.y-1, true)) {
                                    var headpixel = pixelMap[pixel.x][pixel.y-1];
                                    if (headpixel.element == "shy_head") {
                                        if (isEmpty(pixel.x, pixel.y-3)) {
                                            tryMove(headpixel, pixel.x, pixel.y-3);
                                            if (isEmpty(pixel.x, pixel.y-2)) {
                                                tryMove(pixel, pixel.x, pixel.y-2)
                                            }
                                            else {
                                                swapPixels(pixel, pixelMap[pixel.x][pixel.y-2])
                                            }
                                        }
                                        else {
                                            swapPixels(headpixel, pixelMap[pixel.x][pixel.y-3])
                                            if (isEmpty(pixel.x, pixel.y-2)) {
                                                tryMove(pixel, pixel.x, pixel.y-2)
                                            }
                                            else {
                                                swapPixels(pixel, pixelMap[pixel.x][pixel.y-2])
                                            }
                                        }
                                    }
                                }
                            }
                            break;
		    			}
		    		}
		    	}
		    }
            if (Math.random() < 1) {
		    	let yDir = 1
		    	for (let y = 1; y < height; y++) {
		    		let x2 = pixel.x
		    		let y2 = pixel.y+(y*yDir);
		    		if (!isEmpty(x2,y2,true) && !outOfBounds(x2,y2)) {
		    			if (pixelMap[x2][y2].target == true) {
                            let seenPixel = pixelMap[x2][y2];
                            if (seenPixel.y > pixel.y) {
                                if (!isEmpty(pixel.x, pixel.y-1, true)) {
                                    var headpixel = pixelMap[pixel.x][pixel.y-1];
                                    if (headpixel.element == "shy_head") {
                                        if (isEmpty(pixel.x, pixel.y+1)) {
                                            tryMove(headpixel, pixel.x, pixel.y+1);
                                            if (isEmpty(pixel.x, pixel.y+2)) {
                                                tryMove(pixel, pixel.x, pixel.y+2)
                                            }
                                            else {
                                                swapPixels(pixel, pixelMap[pixel.x][pixel.y+2])
                                            }
                                        }
                                        else {
                                            swapPixels(headpixel, pixelMap[pixel.x][pixel.y+1])
                                            if (isEmpty(pixel.x, pixel.y+2)) {
                                                tryMove(pixel, pixel.x, pixel.y+2)
                                            }
                                            else {
                                                swapPixels(pixel, pixelMap[pixel.x][pixel.y+2])
                                            }
                                        }
                                    }
                                }
                            }
                            break;
		    			}
		    		}
		    	}
		    }
            if (isEmpty(pixel.x, pixel.y-1) || !isEmpty(pixel.x,pixel.y-1) && pixelMap[pixel.x][pixel.y-1].element != "shy_head") {
                // create blood if decapitated 5% chance
                if (Math.random() < 0.05 && !pixel.charge) {
                    createPixel("blood", pixel.x, pixel.y-1);
                }
                if (Math.random() < 0.9 && isEmpty(pixel.x,pixel.y-1)) {
                    createPixel("shy_head",pixel.x,pixel.y-1)
                }
                else if (Math.random() < 0.025 && !isEmpty(pixel.x,pixel.y-1,true) && !outOfBounds(pixel.x,pixel.y-1) ) {
                    changePixel(pixelMap[pixel.x][pixel.y-1],"shy_head")
                }
            }
            else if (head == null) { return }
            else if (isEmpty(pixel.x+pixel.dir, pixel.y) && !outOfBounds(pixel.x+pixel.dir, pixel.y) && isEmpty(pixel.x+pixel.dir, pixel.y-1) && !outOfBounds(pixel.x+pixel.dir, pixel.y-1)) {
                tryMove(head, pixel.x+pixel.dir, pixel.y-1)
                tryMove(pixel, pixel.x+pixel.dir, pixel.y)
            }
            else if (isEmpty(pixel.x+pixel.dir, pixel.y-1) && !outOfBounds(pixel.x+pixel.dir, pixel.y-1) && isEmpty(pixel.x+pixel.dir, pixel.y-2) && !outOfBounds(pixel.x+pixel.dir, pixel.y-2)) {
                tryMove(head, pixel.x+pixel.dir, pixel.y-2)
                tryMove(pixel, pixel.x+pixel.dir, pixel.y-1)
            }
            else if (isEmpty(pixel.x+pixel.dir, pixel.y-2) && !outOfBounds(pixel.x+pixel.dir, pixel.y-2) && isEmpty(pixel.x+pixel.dir, pixel.y-3) && !outOfBounds(pixel.x+pixel.dir, pixel.y-3)) {
                tryMove(head, pixel.x+pixel.dir, pixel.y-3)
                tryMove(pixel, pixel.x+pixel.dir, pixel.y-2)
            }
            else if (isEmpty(pixel.x+pixel.dir, pixel.y+1) && !outOfBounds(pixel.x+pixel.dir, pixel.y+1) && isEmpty(pixel.x+pixel.dir, pixel.y+2) && !outOfBounds(pixel.x+pixel.dir, pixel.y+2)) {
                tryMove(head, pixel.x+pixel.dir, pixel.y+1)
                tryMove(pixel, pixel.x+pixel.dir, pixel.y+2)
            }
            else if (isEmpty(pixel.x+pixel.dir, pixel.y+2) && !outOfBounds(pixel.x+pixel.dir, pixel.y+2) && isEmpty(pixel.x+pixel.dir, pixel.y+3) && !outOfBounds(pixel.x+pixel.dir, pixel.y+3)) {
                tryMove(head, pixel.x+pixel.dir, pixel.y+2)
                tryMove(pixel, pixel.x+pixel.dir, pixel.y+3)
            }
			else if (!isEmpty(pixel.x+pixel.dir, pixel.y) && !outOfBounds(pixel.x+pixel.dir, pixel.y) && isEmpty(pixel.x+pixel.dir, pixel.y-1) && !outOfBounds(pixel.x+pixel.dir, pixel.y-1)) {
                if (pixelMap[pixel.x+pixel.dir][pixel.y].target == true) {
                    changePixel(pixelMap[pixel.x+pixel.dir][pixel.y], "blood")
                }
                else {
                    tryMove(head, pixel.x+pixel.dir, pixel.y+2)
                    if (isBreakable(pixelMap[pixel.x+pixel.dir][pixel.y])) {
		            	breakPixel(pixelMap[pixel.x+pixel.dir][pixel.y]);
                        swapPixels(pixel, pixelMap[pixel.x+pixel.dir][pixel.y])
		            }
                    else if (elements[pixelMap[pixel.x+pixel.dir][pixel.y].element].movable == true) {
                        swapPixels(pixel, pixelMap[pixel.x+pixel.dir][pixel.y])
                    }
                    else if (elements[pixelMap[pixel.x+pixel.dir][pixel.y].element].hardness != 1 ) {
                        swapPixels(pixel, pixelMap[pixel.x+pixel.dir][pixel.y])
                    }
                }
            }
            else if (!isEmpty(pixel.x+pixel.dir, pixel.y) && !outOfBounds(pixel.x+pixel.dir, pixel.y) && !isEmpty(pixel.x+pixel.dir, pixel.y-1) && !outOfBounds(pixel.x+pixel.dir, pixel.y-1)) {
                if (pixelMap[pixel.x+pixel.dir][pixel.y].target == true) {
                    changePixel(pixelMap[pixel.x+pixel.dir][pixel.y], "blood")
                }
                else if (pixelMap[pixel.x+pixel.dir][pixel.y-1].target == true) {
                    changePixel(pixelMap[pixel.x+pixel.dir][pixel.y-1], "blood")
                }
                else {
                    if (isBreakable(pixelMap[pixel.x+pixel.dir][pixel.y-1])) {
		            	breakPixel(pixelMap[pixel.x+pixel.dir][pixel.y-1]);
                        swapPixels(head, pixelMap[pixel.x+pixel.dir][pixel.y-1])
		            }
                    else if (elements[pixelMap[pixel.x+pixel.dir][pixel.y-1].element].movable == true ) {
                        swapPixels(head, pixelMap[pixel.x+pixel.dir][pixel.y-1])
                    }
                    else if (elements[pixelMap[pixel.x+pixel.dir][pixel.y-1].element].hardness != 1 ) {
                        swapPixels(head, pixelMap[pixel.x+pixel.dir][pixel.y-1])
                    }
                    if (isBreakable(pixelMap[pixel.x+pixel.dir][pixel.y])) {
		            	breakPixel(pixelMap[pixel.x+pixel.dir][pixel.y]);
                        swapPixels(pixel, pixelMap[pixel.x+pixel.dir][pixel.y])
		            }
                    else if (elements[pixelMap[pixel.x+pixel.dir][pixel.y].element].movable == true) {
                        swapPixels(pixel, pixelMap[pixel.x+pixel.dir][pixel.y])
                    }
                    else if (elements[pixelMap[pixel.x+pixel.dir][pixel.y].element].hardness != 1 ) {
                        swapPixels(pixel, pixelMap[pixel.x+pixel.dir][pixel.y])
                    }
                }
            }
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y)) {
                    var pixel2 = pixelMap[x][y]
                    let old = pixel2.element;
                    if (isBreakable(pixel2)) {
		            	// times 0.25 if not shiftDown else 1
		            	if (Math.random() < (1.5-(elements[pixel.element].hardness || 0))) {
		            		breakPixel(pixel2);
		            	}
		            	// if (Math.random() > ((1-(elements[pixel.element].hardness || 1)) * (shiftDown ? 0.5 : 1))) {
		            }
                    else if (old === pixel2.element && elements[pixel2.element].movable && !isEmpty(pixel2.x,pixel2.y+1) && !paused && pixel2.element != "shy_head" && pixel2.element != "shy_body") {
		            	let x = 0; let y = 0;
		            	if (Math.random() < 0.66) x = Math.random() < 0.5 ? 1 : -1;
		            	if (Math.random() < 0.66) y = Math.random() < 0.5 ? 1 : -1;
		            	tryMove(pixel2,pixel2.x+x,pixel2.y+y)
		            }
                }
            }
        }
        else {
        if (isEmpty(pixel.x, pixel.y-1) || !isEmpty(pixel.x,pixel.y-1) && pixelMap[pixel.x][pixel.y-1].element != "shy_head") {
            // create blood if decapitated 5% chance
            if (Math.random() < 0.05 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y-1);
            }
            if (Math.random() < 0.2 && isEmpty(pixel.x,pixel.y-1)) {
                createPixel("shy_head",pixel.x,pixel.y-1)
            }
            else if (!isEmpty(pixel.x,pixel.y-1,true) && !outOfBounds(pixel.x,pixel.y-1) && (Math.random() < 0.1 || elements[pixelMap[pixel.x][pixel.y].element].state != "solid")) {
                changePixel(pixelMap[pixel.x][pixel.y-1],"shy_head")
            }
        }
        else if (head == null) { return }
        else if (Math.random() < 0.01) { // Move 1% chance
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    var origx = pixel.x+move[0];
                    var origy = pixel.y+move[1];
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
            // homeostasis
            if (pixel.temp > 37) { pixel.temp -= 1; }
            else if (pixel.temp < 37) { pixel.temp += 1; }
        }
        if (Math.random() < 0.95) {
		    	let y = Math.random() < 0.5 ? 0 : -1;
                let xDir = Math.random() < 0.5 ? 1 : -1;
		    	for (let x = 1; x < 150; x++) {
		    		let x2 = pixel.x+(x*xDir);
		    		let y2 = pixel.y+y;
		    		if (!isEmpty(x2,y2,true) && !outOfBounds(x2,y2)) {
		    			let seenPixel = pixelMap[x2][y2];
		    			if (elements[seenPixel.element].id == elements.head.id) {
		    				pixel.h = 1
                            seenPixel.target = true
		    			}
                        if (elements[seenPixel.element].id != elements.glass.id && elements[seenPixel.element].id != elements.stained_glass.id && elements[seenPixel.element].id != elements.glass_shard.id) {
		    				break;
		    			}
		    		}
		    	}
		}
        for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y)) {
                    var pixel2 = pixelMap[x][y]
                    let old = pixel2.element;
                    if (isBreakable(pixel2) && pixel2.target) {
		            	// times 0.25 if not shiftDown else 1
		            	if (Math.random() < (1.5-(elements[pixel.element].hardness || 0)) && Math.random() > 0.5) {
		            		breakPixel(pixel2);
		            	}
		            	// if (Math.random() > ((1-(elements[pixel.element].hardness || 1)) * (shiftDown ? 0.5 : 1))) {
		            }
                }
        }
        }
    },
    density: 1090,
    state: "solid",
    conduct: .005,
    forceSaveColor: true,
    reactions: {
	    "homunculus": { elem2 : ["blood","slime","blood","slime","rotten_meat",null] },
	    "head": { elem2 : ["blood","blood","blood","bone",null] },
	    "body": { elem2: ["blood","blood","meat","bone",null] },
        "blood": { elem2 : null, chance: 0.5 },
        "infection": { elem2 : null, chance: 0.5 },
        "meat": { elem2 : ["blood",null], chance: 0.5 },
        "bone_marrow": { elem2 : ["blood",null], chance: 0.5 },
        "bone": { elem2 : ["bone_marrow","blood","quicklime"], chance: 0.5 },
        "rotten_meat": { elem2 : ["infection","stench",null], chance: 0.5 },
        "ground_meat": { elem2 : null, chance: 5 },
    },
}

elements.scp_173 = {
	name: "SCP-173",
    color: ["#ababab","#ae551c","#AC3846","#AC3846","#698348","#444240","#E5BA9B","#AC3846","#AC3846","#698348","#444240","#E5BA9B","#AC3846","#AC3846","#698348","#444240","#E5BA9B"],
	buttonColor: ["#AC3846","#AC3846","#698348","#444240","#E5BA9B","#ababab","#ababab","#ababab","#ababab","#ae551c","#bc6e39","#71797e","#AC3846","#AC3846","#698348","#444240","#E5BA9B"],
	category: "scp",
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	onPlace: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("body_173", pixel.x, pixel.y+1);
			var color = pixel.color;
			changePixel(pixel,"head_173");
			pixel.color = color;
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("head_173", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			changePixel(pixel,"body_173");
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
	},
	related: ["body_173","head_173"],
	cooldown: defaultCooldown,
	forceSaveColor: true,
}

elements.body_173 = {
	name: "SCP-173",
	color: ["#ababab","#ababab","#ababab","#ababab","#ababab","#ababab","#ababab","#ae551c","#bc6e39","#71797e","#71797e"],
	category: "scp",
	hidden: true,
	density: 2400,
	state: "solid",
	conduct: .025,
	tempHigh: 15050,
	hardness: 1,
	stateHigh: ["magma","magma","magma","magma","rust","rust","rust","magma","magma","magma","magma","rust","rust","rust","spray_paint"],
	breakInto: ["concrete","concrete","concrete","concrete","rust","rust","rust","concrete","concrete","concrete","concrete","rust","rust","rust","spray_paint"],
	forceSaveColor: true,
	pickElement: "scp_173",
	reactions: {
		"egg": { elem2:"yolk", chance:0.5, oneway:true },
		"grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
		"ant": { elem2:"dead_bug", chance:0.05, oneway:true },
		"spider": { elem2:"dead_bug", oneway:true },
		"fly": { elem2:"dead_bug", oneway:true },
		"firefly": { elem2:"dead_bug", oneway:true },
		"bee": { elem2:"dead_bug", oneway:true },
		"flea": { elem2:"dead_bug", oneway:true },
		"termite": { elem2:"dead_bug", oneway:true },
		"worm": { elem2:"slime", chance:0.05, oneway:true },
		"stink_bug": { elem2:"stench", oneway:true },
		"grass_seed": { elem2:null, chance:0.05 },
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
        frozen1: true,
        frozen2: true
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "head_173") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				pixel.element = "concrete"
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_173") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				pixel.panic = head.panic;
				delete head.panic;
			}
		}
		else { var head = null }
		if (pixel.panic > 0) {
			pixel.panic -= 0.1;
			if (pixel.panic < 0) { pixel.panic = 0; }
			else if (pixel.panic > 50) { pixel.panic = 50; }
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.0025 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y-1);
			}
            if (Math.random() < 0.05) {
				pixel.dead = pixelTicks;
			}
		}
		else if (head === null) { return }
        if (pixel.frozen1 == false && pixel.frozen2 == false) {
            if (Math.random() < 1) {
			let y = Math.random() < 0.5 ? 0 : -1;
			for (let x = 1; x < 100; x++) {
				let x2 = pixel.x+x
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (seenPixel.element == "head" && seenPixel.dead == false) {
						if (!isEmpty(seenPixel.x,seenPixel.y+1) && !outOfBounds(seenPixel.x,seenPixel.y+1)) {
                            let bodyP = pixelMap[seenPixel.x][seenPixel.y+1]
                            if (bodyP.x > pixel.x && bodyP.dir == -1) {
                                pixel.frozen1 = true;
                                break;
                            }
                            else if (bodyP.x < pixel.x && bodyP.dir == 1) {
                                pixel.frozen1 = true;
                                break;
                            }
                            if (isEmpty(bodyP.x+(-bodyP.dir),bodyP.y) && isEmpty(bodyP.x+(-bodyP.dir),bodyP.y-1) && (bodyP.x < pixel.x && bodyP.dir == -1 || bodyP.x > pixel.x && bodyP.dir == 1)) {
                                tryMove(pixelMap[pixel.x][pixel.y-1],bodyP.x+(-bodyP.dir),bodyP.y-1)
                                tryMove(pixel,bodyP.x+(-bodyP.dir),bodyP.y)
                                bodyP.dead = pixelTicks
                            }
                        }
					}
                    else if (seenPixel.element == "body" && seenPixel.dead == false) {
						if (seenPixel.x > pixel.x && seenPixel.dir == -1) {
                            pixel.frozen1 = true;
                            break;
                        }
                        else if (seenPixel.x < pixel.x && seenPixel.dir == 1) {
                            pixel.frozen1 = true;
                            break;
                        }
                        if (isEmpty(seenPixel.x+(-seenPixel.dir),seenPixel.y) && isEmpty(seenPixel.x+(-seenPixel.dir),seenPixel.y-1) && (seenPixel.x < pixel.x && seenPixel.dir == -1 || seenPixel.x > pixel.x && seenPixel.dir == 1)) {
                            tryMove(pixelMap[pixel.x][pixel.y-1],seenPixel.x+(-seenPixel.dir),seenPixel.y-1)
                            tryMove(pixel,seenPixel.x+(-seenPixel.dir),seenPixel.y)
                            seenPixel.dead = pixelTicks
                        }
					}
					break;
				}
			}
		}
        if (Math.random() < 1) {
			let y = Math.random() < 0.5 ? 0 : -1;
			for (let x = -1; x > -100; x--) {
				let x2 = pixel.x+x
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (seenPixel.element == "head" && seenPixel.dead == false) {
						if (!isEmpty(seenPixel.x,seenPixel.y+1) && !outOfBounds(seenPixel.x,seenPixel.y+1)) {
                            let bodyP = pixelMap[seenPixel.x][seenPixel.y+1]
                            if (bodyP.x > pixel.x && bodyP.dir == -1) {
                                pixel.frozen2 = true
                                break;
                            }
                            else if (bodyP.x < pixel.x && bodyP.dir == 1) {
                                pixel.frozen2 = true
                                break;
                            }
                            if (isEmpty(bodyP.x+(-bodyP.dir),bodyP.y) && isEmpty(bodyP.x+(-bodyP.dir),bodyP.y-1) && (bodyP.x < pixel.x && bodyP.dir == -1 || bodyP.x > pixel.x && bodyP.dir == 1)) {
                                tryMove(pixelMap[pixel.x][pixel.y-1],bodyP.x+(-bodyP.dir),bodyP.y-1)
                                tryMove(pixel,bodyP.x+(-bodyP.dir),bodyP.y)
                                bodyP.dead = pixelTicks
                            }
                        }
					}
                    else if (seenPixel.element == "body" && seenPixel.dead == false) {
						if (seenPixel.x > pixel.x && seenPixel.dir == -1) {
                            pixel.frozen2 = true
                            break;
                        }
                        else if (seenPixel.x < pixel.x && seenPixel.dir == 1) {
                            pixel.frozen2 = true
                            break;
                        }
                        if (isEmpty(seenPixel.x+(-seenPixel.dir),seenPixel.y) && isEmpty(seenPixel.x+(-seenPixel.dir),seenPixel.y-1) && (seenPixel.x < pixel.x && seenPixel.dir == -1 || seenPixel.x > pixel.x && seenPixel.dir == 1)) {
                            tryMove(pixelMap[pixel.x][pixel.y-1],seenPixel.x+(-seenPixel.dir),seenPixel.y-1)
                            tryMove(pixel,seenPixel.x+(-seenPixel.dir),seenPixel.y)
                            seenPixel.dead = pixelTicks
                        }
					}
					break;
				}
			}
		}
		if (Math.random() < 0.5*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 50% chance
			var movesToTry = [
				[1*pixel.dir,0],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if (hitPixel.element === "body" || hitPixel.element === "head") {
						hitPixel.dead = pixelTicks
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved) {
				pixel.dir *= -1;
			}
		}
        }
        else if (pixel.frozen1 == true || pixel.frozen2 == true) {
        if (Math.random() < 0.9) {
			let y = Math.random() < 0.5 ? 0 : -1;
			for (let x = 1; x < 100; x++) {
				let x2 = pixel.x+x
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (seenPixel.element == "head") {
						if (!isEmpty(seenPixel.x,seenPixel.y+1) && !outOfBounds(seenPixel.x,seenPixel.y+1)) {
                            let bodyP = pixelMap[seenPixel.x][seenPixel.y+1]
                            if (bodyP.x > pixel.x && bodyP.dir == -1) {
                                break;
                            }
                            else if (bodyP.x < pixel.x && bodyP.dir == 1) {
                                break;
                            }
                        }
					}
                    else if (seenPixel.element == "body") {
						if (seenPixel.x > pixel.x && seenPixel.dir == -1) {
                            break;
                        }
                        else if (seenPixel.x < pixel.x && seenPixel.dir == 1) {
                            break;
                        }
					}
					pixel.frozen1 = false
					break;
				}
                if (x >= 99) {
                    pixel.frozen1 = false
                }
			}
		}
        if (Math.random() < 0.9) {
			let y = Math.random() < 0.5 ? 0 : -1;
			for (let x = -1; x > -100; x--) {
				let x2 = pixel.x+x
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (seenPixel.element == "head") {
						if (!isEmpty(seenPixel.x,seenPixel.y+1) && !outOfBounds(seenPixel.x,seenPixel.y+1)) {
                            let bodyP = pixelMap[seenPixel.x][seenPixel.y+1]
                            if (bodyP.x > pixel.x && bodyP.dir == -1) {
                                break;
                            }
                            else if (bodyP.x < pixel.x && bodyP.dir == 1) {
                                break;
                            }
                        }
					}
                    else if (seenPixel.element == "body") {
						if (seenPixel.x > pixel.x && seenPixel.dir == -1) {
                            break;
                        }
                        else if (seenPixel.x < pixel.x && seenPixel.dir == 1) {
                            break;
                        }
					}
					pixel.frozen2 = false
					break;
				}
                if (x <= -99) {
                    pixel.frozen2 = false
                }
			}
		}
        }
	}
}

elements.head_173 = {
	name: "SCP-173",
	color: ["#ababab","#ae551c","#AC3846","#AC3846","#698348","#444240","#E5BA9B","#AC3846","#AC3846","#698348","#444240","#E5BA9B","#AC3846","#AC3846","#698348","#444240","#E5BA9B"],
	category: "scp",
	hidden: true,
	density: 2400,
	state: "solid",
	conduct: .025,
	tempHigh: 15050,
	hardness: 1,
	stateHigh: ["magma","magma","magma","magma","rust","rust","rust","magma","magma","magma","magma","rust","rust","rust","spray_paint"],
	breakInto: ["concrete","concrete","concrete","concrete","rust","rust","rust","concrete","concrete","concrete","concrete","rust","rust","rust","spray_paint"],
	forceSaveColor: true,
	pickElement: "scp_173",
	reactions: {
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
		"salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
		"pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
	},
	properties: {
		dead: false
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				pixel.element = "concrete"
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_173") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.025 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
			}
            if (Math.random() < 0.05) {
					pixel.dead = pixelTicks;
				}
		}
	},
}

elements.scp_229_seed = {
    name: "SCP-229",
	color: "#9c6c25",
    buttonColor:["#4d0a03","#4d0a03","#4d0a03","#4d0a03","#4d0a03","#4d0a03","#a95232","#be4322","#BD2D2D","#EDEDE5","#F2D243","#FFF0E6","#908F84","#908F84","#E47A3E","#DBC0AC","#DBC0AC","#a95232","#be4322","#BD2D2D","#0C1D24","#0C1D24","#0C1D24","#0C1D24","#0C1D24","#0C1D24"],
	behavior: [
		"XX|M2%1.5|XX",
		"XX|L2:copper AND C2:scp_229%50|XX",
		"XX|M1|XX",
	],
	behaviorOn: [
		"SH%5|XX|SH%5",
		"XX|CH:scp_229%50|XX",
		"SH%5|M1|SH%5",
	],
	tempHigh: 1750,
    stateHigh: ["metal_scrap","metal_scrap","metal_scrap","metal_scrap","molten_glass","molten_plastic","molten_plastic"],
	conduct: 1,
	tick: behaviors.SEEDRISE,
	breakInto: "metal_scrap",
	category:"scp",
	state: "solid",
	density: 1700,
	cooldown: defaultCooldown,
    excludeRandom: true,
}

elements.scp_229 = {
	name: "SCP-229",
	color:["#a95232","#be4322","#4d0a03","#0C1D24","#908F84","#BD2D2D","#31BA90","#1B5BB2","#EDEDE5","#F2D243","#FFF0E6","#908F84","#E47A3E","#DBC0AC"],
	colorPattern: [
		"rVoooVwVVVVbVVVyVVvrvvvvvVVVVVVVVCrVVVVVVVVrrrrr",
		"vrvvvovwvvvvbvvyvvrVVVVVVvvvvvvvvvrcvggrrrrvvtvv",
		"VVrVVVorrVVVVbbbrrvvvvvvvVVVVVVVVVrggtrtVVVVtVVV",
		"vvvrrrrvwrvvvggrggggVcCCcCoooogggggrrrvvtvvvtvvv",
		"VVVVVVVVVwrrrrrCbcccgoooooVVVgVVVVVtVVVVVtttVVVV",
		"vvvvvvvvvcwgccvvbvVVoggVVvvggvvvvvvtvtttvvvvvvvv",
		"VVVVVccCCVgwVVVVVbvvvovggggVVVVVVVVVtVbbtVVVVVVV",
		"vvccCvvvvgwvvvvvvvbVVVooVvvvvvvvvvvvbtttvvvvvvvv",
		"cCVVVVVVgwVVVVVVVybvvvvvooooVVVVVVVbVVVVtVVVVVVV",
		"vvvvvvwwgvvvvvvvvyVbbbVVVvvvooovbbbvvvvvvtvvvvvc",
		"VVVwwwVVgVVVVVVVyVvvvvbbbVVVVbbboooVVVVVVVtVVVCV",
		"vvwvggggbvvvvvvvyvVVVVVVVbbbbvvvvvvooovvvvvtwcvv",
		"VVwgVVVVbVVVVVVyVVvvvvvvvVVVVVrVVVVVVVooocCctwVV",
		"vvgwvvvwbvvvvvvyvvVVVVrrrvvvvrvrvvvvvCcCCoootvww",
		"wgwwVVwVVbVVVVyVVVvvvrvvvrrrrVVVrVCCCVVVVVVVotoV",
		"govvvvwvvvbvvvyvvvVVrVVVVvvvvvvvcrvvvvvvvvvvvtvo",/* my design
		"oyyyvvorvywvoyvo",
		"VooyyvoVVywwoyvo",
		"VrVoyvorrywyoyvo",
		"VrVvyvorrywyoyvo",
		"ooooyooVVywyoywo",
		"rrrryrrrvywyoyyr",
		"wvvvyyvryywyoyyy",
		"ywvvoyyyyowyooyy",
		"yoovvoooovwyoooy",
		"yrowvvvrvvwyrrro",
		"yvoywvvrvvwyvvvv",
		"yvovywooooooovvv",
		"yoovvyorrrrrovvo",
		"yrrVVVowvvyyyvvo",
		"yrrrrroywyyoyyvo",
		"yyVVVVoryyovoyvo", nousers design */ 
	],
	colorKey: {
		"C":"#a95232",
		"c":"#be4322",
		"V":"#4d0a03",
		"v":"#0C1D24",
		"g":"#908F84",
		"r":"#BD2D2D",
		"t":"#31BA90",
		"b":"#1B5BB2",
		"W":"#EDEDE5",
		"w":"#DBC0AC",
		"y":"#F2D243",
		"o":"#E47A3E",
	},
	behavior: [
		"XX|SH%5|XX",
		"SH%5|XX|SH%5",
		"XX|SH%5|XX",
	],
	category: "scp",
    hardness: 0.25,
    breakInto: "metal_scrap",
    tempHigh: 1250,
    stateHigh: ["metal_scrap","metal_scrap","metal_scrap","metal_scrap","molten_glass","molten_plastic","molten_plastic"],
    properties: {
		radius: 10,
        nodes: 2,
	},
    tick: function(pixel) {
        if (pixel.nCD) {
				pixel.nCD -= 1;
				if (pixel.nCD <= 0) {
					// delete pixel.chargeCD;
					pixel.nCD = undefined;
				}
		}
        if (!isEmpty(pixel.x-1,pixel.y+1) && !isEmpty(pixel.x+1,pixel.y+1) && !isEmpty(pixel.x-1,pixel.y-1) && !isEmpty(pixel.x+1,pixel.y-1) && !isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x,pixel.y+1) && !isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.5) {
		    pixel.radius = 0
            pixel.nodes = 0
	    }
        if ((isEmpty(pixel.x,pixel.y-1) || isEmpty(pixel.x,pixel.y+1) || isEmpty(pixel.x-1,pixel.y) || isEmpty(pixel.x+1,pixel.y)) && Math.random() > 0.5 && pixel.radius == 0 && pixel.nodes == 0) {
		    pixel.radius = 10
            pixel.nodes = 1
	    }
        if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.9 && Math.random() > 0.9 && pixel.radius > 0 && pixel.nodes > 1 && pixel.nCD == undefined) {
		    createPixel("electric",pixel.x,pixel.y+1)
	    }
        if (pixel.radius > 0 && pixel.nodes > 0 && pixel.nCD == undefined) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.radius);
			for (var i = 0; i < coords.length; i++) {
				if (!isEmpty(coords[i].x,coords[i].y) && !outOfBounds(coords[i].x,coords[i].y)) {
					var electric = pixelMap[coords[i].x][coords[i].y]
                    if (elements[electric.element].category == "nervous system" && Math.random() > 0.5 || electric.element == "thunder_cloud" || electric.charge || electric.element == "access_door" && Math.random() > 0.75 || electric.element == "keycard_terminal" || electric.element == "level_5" || electric.element == "scp_804" && electric.active == true || elements[electric.element].category == "logic"  || electric.element == "brain" || electric.element == "fish" || electric.element == "frog" || electric.element == "rat" || electric.element == "bird" || electric.element == "head" || electric.element == "head_1000" || electric.element == "head_035" || electric.element == "head_008" || electric.element == "battery" || electric.element == "electric" || electric.element == "lightning" || electric.element == "malware" || electric.element == "gray_goo") {
                        if (electric.y > pixel.y && electric.x > pixel.x && isEmpty(pixel.x+1,pixel.y+1)) {
                            createPixel("scp_229",pixel.x+1,pixel.y+1)
							var electric2 = pixelMap[pixel.x+1][pixel.y+1]
                            pixel.nodes--
                            electric2.nodes = 1
                            electric2.nCD = 10
                            pixel.nCD = 50
                        }
                        else if (electric.y < pixel.y && electric.x < pixel.x && isEmpty(pixel.x-1,pixel.y-1)) {
                            createPixel("scp_229",pixel.x-1,pixel.y-1)
							var electric2 = pixelMap[pixel.x-1][pixel.y-1]
                            pixel.nodes--
                            electric2.nodes = 1
                            electric2.nCD = 10
                            pixel.nCD = 50
                        }
                        else if (electric.y < pixel.y && electric.x > pixel.x && isEmpty(pixel.x+1,pixel.y-1)) {
                            createPixel("scp_229",pixel.x+1,pixel.y-1)
							var electric2 = pixelMap[pixel.x+1][pixel.y-1]
                            pixel.nodes--
                            electric2.nodes = 1
                            electric2.nCD = 10
                            pixel.nCD = 50
                        }
                        else if (electric.y > pixel.y && electric.x < pixel.x && isEmpty(pixel.x-1,pixel.y+1)) {
                            createPixel("scp_229",pixel.x-1,pixel.y+1)
							var electric2 = pixelMap[pixel.x-1][pixel.y+1]
                            pixel.nodes--
                            electric2.nodes = 1
                            electric2.nCD = 10
                            pixel.nCD = 50
                        }
                        else if (electric.x > pixel.x && (isEmpty(pixel.x+1,pixel.y) || Math.random() < (1-(elements[pixelMap[pixel.x+1][pixel.y].element].hardness || 0)) / 4)) {
							if (!isEmpty(pixel.x+1,pixel.y)) {
								deletePixel(pixel.x+1,pixel.y)
							}
                            createPixel("scp_229",pixel.x+1,pixel.y)
							var electric2 = pixelMap[pixel.x+1][pixel.y]
                            pixel.nodes--
                            electric2.nodes = 1
                            electric2.nCD = 10
                            pixel.nCD = 50
                        }
                        else if (electric.x < pixel.x && (isEmpty(pixel.x-1,pixel.y) || Math.random() < (1-(elements[pixelMap[pixel.x-1][pixel.y].element].hardness || 0)) / 4)) {
							if (!isEmpty(pixel.x-1,pixel.y)) {
								deletePixel(pixel.x-1,pixel.y)
							}
                            createPixel("scp_229",pixel.x-1,pixel.y)
							var electric2 = pixelMap[pixel.x-1][pixel.y]
                            pixel.nodes--
                            electric2.nodes = 1
                            electric2.nCD = 10
                            pixel.nCD = 50
                        }
                        else if (electric.y > pixel.y && (isEmpty(pixel.x,pixel.y+1) || Math.random() < (1-(elements[pixelMap[pixel.x][pixel.y+1].element].hardness || 0)) / 4)) {
							if (!isEmpty(pixel.x,pixel.y+1)) {
								deletePixel(pixel.x,pixel.y+1)
							}
                            createPixel("scp_229",pixel.x,pixel.y+1)
							var electric2 = pixelMap[pixel.x][pixel.y+1]
                            pixel.nodes--
                            electric2.nodes = 1
                            electric2.nCD = 10
                            pixel.nCD = 50
                        }
                        else if (electric.y < pixel.y && (isEmpty(pixel.x,pixel.y-1) || Math.random() < (1-(elements[pixelMap[pixel.x][pixel.y-1].element].hardness || 0)) / 4)) {
							if (!isEmpty(pixel.x,pixel.y-1)) {
								deletePixel(pixel.x,pixel.y-1)
							}
                            createPixel("scp_229",pixel.x,pixel.y-1)
							var electric2 = pixelMap[pixel.x][pixel.y-1]
                            pixel.nodes--
                            electric2.nodes = 1
                            electric2.nCD = 10
                            pixel.nCD = 50
                        }
                    }
				}
			}
        }
        for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y) && pixel.nCD == undefined) {
                    var electric = pixelMap[x][y]
                    let old = electric.element;
                    if (electric.element == "brain" || electric.element == "access_door" || electric.element == "keycard_terminal" || electric.element == "level_4" || electric.element == "level_5" || electric.element == "thunder_cloud" || electric.element == "scp_804" && electric.active == true || elements[electric.element].category == "logic" || elements[electric.element].category == "nervous system" && Math.random() > 0.5 || electric.element == "fish" || electric.element == "frog" || electric.element == "rat" || electric.element == "bird" || electric.element == "head" || electric.element == "head_035" || electric.element == "head_1000" || electric.element == "head_008" || elements[electric.element].category == "machines" && Math.random() > 0.5 || electric.element == "battery" || electric.element == "electric" || electric.element == "lightning" || electric.element == "malware" || electric.element == "gray_goo") {
                        deletePixel(electric.x,electric.y)
                        createPixel("scp_229",electric.x,electric.y)
						electric = pixelMap[electric.x][electric.y]
                        pixel.nodes--
                        electric.nCD = 10
                        pixel.nCD = 50
                    }
					else if (electric.element == "glass" || electric.element == "rad_glass" || electric.element == "stained_glass") {
						electric.element = "glass_shard"
						pixel.nCD = 2
                    }
					else if (electric.element == "site_nuke") {
						explodeAt(electric.x,electric.y,300,["plasma","plasma","plasma","plasma","plasma","plasma","plasma","radiation","radiation","radiation","radiation","rad_steam","electric","electric"])
						pixel.nCD = 2
                    }
                    else if (electric.charge) {
						deletePixel(electric.x,electric.y)
                        createPixel("scp_229",electric.x,electric.y)
						electric = pixelMap[electric.x][electric.y]
						if (Math.random() > 0.45) {
                        	electric.nodes = 1
						}
                        pixel.nodes--
                        electric.nCD = 15
                        pixel.nCD = 60
                    }
                }
        }
        doDefaults(pixel)
    },
    movable: false,
    excludeRandom: true,
    state: "solid",
    hidden: true,
}

elements.scp_236 = {
	name: "SCP-236",
    color: "#bc5a4c",
    properties: {
        mimic: "meat",
        mimicColor: "#a0522d",
        hide: false,
        dir: 1,
    },
    tick: function(pixel) {
		doDefaults(pixel)
        if (Math.random() < 0.2) {
            pixel.dir = Math.random() < 0.5 ? 1 : -1
        }
        if (pixel.hide == true) {
            if (pixel.color != pixel.mimicColor) {
                pixel.color = pixel.mimicColor
            }
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y)) {
                    var pixel2 = pixelMap[x][y]
                    let old = pixel2.element;
                    if (Math.random() < 0.0125 && (elements[pixel2.element].category == "life" || elements[pixel2.element].category == "food" || pixel2.element == "wood" || pixel2.element == "straw" || pixel2.element == "paper" || pixel2.element == "cloth" || pixel2.element == "sponge" || pixel2.element == "bamboo" || pixel2.element == "amber" || pixel2.element == "skin" || pixel2.element == "particleboard" || pixel2.element == "hair" || pixel2.element == "udder")) {
                        if (Math.random() < (1-(elements[pixel2.element].hardness || 0)) / 4 || Math.random() > 0.5) {
                            pixel2.mimic = pixel2.element
                            pixel2.mimicColor = pixel2.color
                            pixel2.element = "scp_236"
                            pixel2.hide = true
                            pixel2.dir = pixel.dir
		            	}
                    }
                    else if (pixel2.element == "scp_236" && pixel2.hide != true && Math.random() > 0.75 && (pixel2.awakeStart + 5) < pixelTicks) {
                        pixel2.hide = true
                    }
                }
            }
            if (Math.random() < 0.75) {
		    	let y = Math.random() < 0.5 ? 0 : -1;
                let xDir = Math.random() < 0.5 ? 1 : -1;
		    	for (let x = 1; x < 10; x++) {
		    		let x2 = pixel.x+(x*xDir);
		    		let y2 = pixel.y+y;
		    		if (!isEmpty(x2,y2,true) && !outOfBounds(x2,y2)) {
		    			let seenPixel = pixelMap[x2][y2];
		    			if (elements[seenPixel.element].id == elements.head.id || elements[seenPixel.element].id == elements.body.id || elements[seenPixel.element].id == elements.light.id) {
		    				pixel.hide = false
		    			}
                        break;
		    		}
		    	}
		    }
            if (elements[pixel.mimic].movable == true || (isEmpty(pixel.x,pixel.y-4) || isEmpty(pixel.x,pixel.y-3) || isEmpty(pixel.x,pixel.y-2) || isEmpty(pixel.x,pixel.y-1)) && (isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x-1,pixel.y) || isEmpty(pixel.x-2,pixel.y) && isEmpty(pixel.x+2,pixel.y) || isEmpty(pixel.x-1,pixel.y) && isEmpty(pixel.x-2,pixel.y) && isEmpty(pixel.x+1,pixel.y) && isEmpty(pixel.x+2,pixel.y))) {
                tryMove(pixel,pixel.x,pixel.y+1)
            }
        }
        if (pixel.hide != true) {
            if (!pixel.awakeStart) {
                pixel.awakeStart = pixelTicks
            }
            if (pixel.color == pixel.mimicColor) {
                pixel.color = pixelColorPick(pixel,"#bc5a4c")
            }
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coords = adjacentCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y)) {
                    var pixel2 = pixelMap[x][y]
                    let old = pixel2.element;
                    if ((elements[pixel2.element].category == "life" || elements[pixel2.element].category == "food") && Math.random() < 0.025) {
                        if (Math.random() < (1-(elements[pixel2.element].hardness || 0)) / 4 || Math.random() > 0.5) {
                            pixel2.mimic = pixel2.element
                            pixel2.mimicColor = pixel2.color
                            pixel2.element = "scp_236"
                            pixel2.hide = false
                            pixel2.dir = pixel.dir
		            	}
                    }
                    else if (elements[pixel2.element].isFood == true && Math.random() < 0.025) {
                        deletePixel(pixel2.x,pixel2.y)
                    }
                    else if (pixel2.element == "scp_236" && pixel2.hide == true && Math.random() > 0.85) {
                        pixel2.hide = false
                    }
                }
            }
            if (elements[pixel.mimic].movable != true && Math.random() > 0.75 && !tryMove(pixel,pixel.x,pixel.y+1) || elements[pixel.mimic].movable == true && !tryMove(pixel,pixel.x,pixel.y+1)) {
                if (!tryMove(pixel,pixel.x+pixel.dir,pixel.y)) {
                    let ydir = Math.random() < 0.5 ? 1 : -1
                    tryMove(pixel,pixel.x+pixel.dir,pixel.y+ydir)
                }
            }
            if (Math.random() < 0.05 && (pixel.awakeStart + 100) < pixelTicks) {
                delete pixel.awakeStart
                pixel.hide = true
            }
        }
    },
    temp: 20,
    tempHigh: 250,
    stateHigh: "meat",
    onStateHigh(pixel) {
        if (Math.random() < 0.9) {
            changePixel(pixel, pixel.mimic)
        }
        else {
            explodeAt(pixel.x,pixel.y,5,"fire")
        }
    },
    tempLow: -30,
    stateLow: "meat",
    onStateLow(pixel) {
        changePixel(pixel, pixel.mimic)
    },
    category:"scp",
    hardness: 0.15,
    onBreak(pixel) {
        if (Math.random() < 0.9) {
            changePixel(pixel, pixel.mimic)
        }
        else {
            explodeAt(pixel.x,pixel.y,5,"fire")
        }
    },
    state: "solid",
    density: 963.7,
    conduct: 0.2,
}

elements.scp_391 = {
	name: "SCP-391",
	color: ["#D7D0CA","#D7BFB5","#B49171","#986536","#B49171","#623613"],
	properties: { "phase": 2, "rising":0 },
	tick: function(pixel) {
		if (Math.random() < 0.0000035 && isEmpty(pixel.x,pixel.y+1)) {
			createPixel("diamond",pixel.x,pixel.y+1);
		}
		var newX = pixel.x;
		var newY = pixel.y;
		if (pixel.phase === 1) { // Landing
			newX += pixel.flipX ? -1 : 1;
			newY += Math.random() < 0.5 ? 0 : 1;
			if (!tryMove(pixel, newX, newY)) {
				if (outOfBounds(newX, newY)) { pixel.phase = 0 }
				else {
					var newPixel = pixelMap[newX][newY];
					if (elements[newPixel.element].state !== "solid") { pixel.phase = 3; }
					else if (newPixel.element === "bird") {
						pixel.phase = 3;
						newPixel.phase = 3;
					}
					else { pixel.phase = 0; }
				}
			} // Stop landing
		}
		else if (pixel.phase === 2) { // Gliding
			newX += pixel.flipX ? -1 : 1;
			newY += Math.random() < 0.9 ? 0 : 1;
			if (Math.random() < 0.025) { pixel.phase = 1 } // Start landing
			if (!tryMove(pixel, newX, newY)) {
				pixel.flipX = !pixel.flipX;
				if (!outOfBounds(newX, newY) && pixelMap[newX][newY].element !== "bird") {
					pixel.phase = 3;
				}
			}
		}
		else if (pixel.phase === 0) { // Standing
			if (Math.random() < 0.05) { newX += pixel.flipX ? -1 : 1; }
			newY ++;
			if (Math.random() < 0.02) { pixel.phase = 3 } // Start rising
			if (!tryMove(pixel, newX, newY)) {
				if (!outOfBounds(newX, newY) && pixelMap[newX][newY].element === "bird") {
					pixel.phase = 3;
					pixelMap[newX][newY].phase = 3;
				}
			}
		}
		else if (pixel.phase === 3) { // Rising
			newX += pixel.flipX ? -1 : 1;
			newY --;
			if (!tryMove(pixel, newX, newY) || (pixel.rising > 5 && Math.random() < 0.05)) { pixel.phase = 2; pixel.rising = 0; } // Start gliding
			else { pixel.rising ++; }
		}
		doHeat(pixel);
		doElectricity(pixel);
		doBurning(pixel);
	},
	flippableX: true,
	reactions: {
        "rat": { elem2:null, chance:0.25, func:behaviors.FEEDPIXEL },
        "bird": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "meat": { elem2:null, chance:0.125, func:behaviors.FEEDPIXEL },
        "cured_meat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
        "cooked_meat": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL },
		"fly": { elem2:null, chance:0.0625, func:behaviors.FEEDPIXEL },
		"firefly": { elem2:null, chance:0.075, func:behaviors.FEEDPIXEL },
		"bee": { elem2:null, chance:0.00625, func:behaviors.FEEDPIXEL },
		"worm": { elem2:null, chance:0.0625, func:behaviors.FEEDPIXEL },
		"ant": { elem2:null, chance:0.00625, func:behaviors.FEEDPIXEL },
		"stink_bug": { elem2:"stench", chance:0.00625, func:behaviors.FEEDPIXEL },
		"dead_bug": { elem2:null, chance:0.005, func:behaviors.FEEDPIXEL },
		"spider": { elem2:null, chance:0.025, func:behaviors.FEEDPIXEL },
		"web": { elem2:null, chance:0.05 },
		"plague": { elem1:"plague", chance:0.0225 },
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 }
	},
	foodNeed: 5,
    egg: "gold_coin",
	temp: 41,
	tempHigh: 120,
	stateHigh: "cooked_meat",
	stateHighColor: "#E4CFB9",
	tempLow: -18,
	stateLow: "frozen_meat",
	category:"scp",
	burn:2,
	burnTime:100,
	breakInto: ["feather","blood","feather","blood","feather","blood","feather","blood","feather","blood","diamond","gold_coin","gold_coin","feather","blood","feather","blood","feather","blood","feather","blood","feather","blood","feather","blood","gold_coin","feather","blood","feather","blood","feather","blood","feather","blood","feather","blood","feather","blood","gold_coin",],
	state: "solid",
	density: 400,
	cooldown: defaultCooldown,
	conduct: 0.5
}

if (!elements.magma.reactions) { elements.magma.reactions = {}; }
elements.magma.reactions.molten_quartz = { elem1:"molten_granite", elem2:"molten_granite"}

elements.molten_granite = {
    color: ['#ffd956', '#ffae56', '#ff8200', '#ffff70', '#ffff70', '#ffa000', '#ff7e24', '#ff5e00'],
	reactions: {
		"molten_slag": { elem2:"molten_granite", chance:0.22 },
        "molten_quartz": { elem2:"molten_granite", chance:0.66 },
        "magma": { elem2:"molten_granite", chance:0.66 },
	},
	grain: 0.25
},

elements.granite = {
	color: ["#F5EDF8","#8B8381","#B8AEAC","#DCD6E0","#847E7E","#1B1A1E","#F5EDF8","#8B8381","#B8AEAC","#DCD6E0","#847E7E"],
    grain: 1.25,
	behavior: behaviors.WALL,
	tempHigh: 1237.5,
	category: "land",
	state: "solid",
	density: 2700,
	hardness: 0.4,
	breakInto: ["rock","sand"],
    breakIntoColor: ["#DCD6E0","#b1aba3","#8B8381","#DCD6E0","#b1aba3","#F5EDF8","#DCD6E0","#b1aba3","#8B8381","#DCD6E0","#b1aba3","#F5EDF8","#1B1A1E"],
}

elements.quartz = {
	color: ["#EEF0EF","#ECEEED"],
	behavior: behaviors.WALL,
	canPlace: true,
    grain: 0.1,
	reactions: {
	},
    tempHigh: 1650,
    hardness: 0.07,
    breakInto: "quartz_crystal",
	density: 2650,
	state: "solid",
	category:"solids",
}

elements.quartz_crystal = {
	color: ["#EEF0EF","#ECEEED","#F3F3F3"],
	behavior: behaviors.POWDER,
	canPlace: true,
	reactions: {
	},
    tempHigh: 1650,
    stateHigh: "molten_quartz",
	density: 2650,
	state: "solid",
	category:"powders",
    hidden: true
}

elements.scp_409 = {
	name: "SCP-409",
	color: ["#EEF0EF","#ECEEED"],
    grain: 0.5,
	tick: function(pixel) {
	if (pixel.start === pixelTicks) {return}
	if (pixel.charge && elements[pixel.element].behaviorOn) {
		pixelTick(pixel);
		return;
	}
	if (!tryMove(pixel, pixel.x, pixel.y+1)) {
		if (Math.random() < 0.5) {
			if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
				tryMove(pixel, pixel.x-1, pixel.y+1);
			}
		} else if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
			tryMove(pixel, pixel.x+1, pixel.y+1);
		}
	}
	doDefaults(pixel);
    if (!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
        if (elements[pixelMap[pixel.x][pixel.y-1].element].state != "liquid" && elements[pixelMap[pixel.x][pixel.y-1].element].state != "gas") {
            tryMove(pixel,pixel.x,pixel.y-1)
        }
    }
    },
	onCollide: function(pixelOG,pixel) {
		if (elements[pixel.element].id === elements.scp_409.id) { return; }
        if (elements.scp_409.ignore.indexOf(pixel.element) !== -1) return;
		if (Math.random() < (elements[pixel.element].hardness || 0.25)) { return; }
		if (elements[pixel.element].state !== "liquid" && elements[pixel.element].state !== "gas" && Math.random() > 0.1) {
            if (elements[pixel.element].category !== "life" && elements[pixel.element].category !== "food" && pixel.element !== "wood" && pixel.element !== "bamboo" && pixel.element !== "skin" && Math.random() > 0.75) {
                if (Math.random() < 0.85) {
                    changePixel(pixel,"quartz_crystal")
                }
                else if (Math.random() < 0.5 && elements[pixel.element].movable == false) {
                    changePixel(pixel,"quartz")
                }
                else {
                    changePixel(pixel,"scp_409")
                }
            }
            else if (Math.random() > 0.75) {
                changePixel(pixel,"scp_409")
                if (Math.random() > 0.95) {
                    explodeAt(pixel.x,pixel.y,10,["scp_409","quartz_crystal","quartz_crystal","quartz_crystal",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null])
                }
            }
		}
	},
    ignore: ["granite","quartz","quartz_crystal","magma","molten_glass","molten_quartz","molten_granite"],
	canPlace: true,
	reactions: {
	},
	density: 2650,
	state: "solid",
	category:"scp",
	cooldown: defaultCooldown,
}

elements.scp_457 = {
	name: "SCP-457",
	color: "#000000",
	buttonColor: ["#ff6b21","#ffa600","#ff4000","#000000","#000000","#000000","#ff6b21","#ffa600","#ff4000"],
	category: "scp",
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
	},
	onPlace: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("body_457", pixel.x, pixel.y+1);
			var color = pixel.color;
			changePixel(pixel,"head_457");
			pixel.color = color;
			pixel.alpha = 0;
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("head_457", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			pixelMap[pixel.x][pixel.y-1].alpha = 0;
			changePixel(pixel,"body_457");
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
		"steam": { attr1:{panic:50} },
		"water": { attr1:{panic:50} },
		"ice": { attr1:{panic:50} },
		"salt_water": { attr1:{panic:50} },
		"sugar_water": { attr1:{panic:50} },
		"seltzer": { attr1:{panic:50} },
		"foam": { attr1:{panic:50} },
		"pool_water": { attr1:{panic:50} },
		"dirty_water": { attr1:{panic:50} },
		"cold_fire": { attr1:{panic:50} },
	},
	related: ["body","head"],
	cooldown: defaultCooldown,
	forceSaveColor: true,
}

elements.body_457 = {
	name: "SCP-457",
	color: "#000000",
	tempLow:-50,
	stateLow: "smoke",
	tempHigh: 7000,
	stateHigh: "plasma",
	category: "scp",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: .05,
	temp: 600,
	forceSaveColor: true,
	pickElement: "scp_457",
	reactions: {
		"ash": { elem2:[null,"smoke"], chance:0.05 },
		"glass": { elem2:"glass_shard", chance:0.05 },
		"rad_glass": { elem2:"rad_shard", chance:0.05 },
		"stained_glass": { elem2:"color_sand", chance:0.05 },
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
		fuel: 500,
		alpha: 0,
	},
	renderer: function(pixel,ctx) {
		drawDefault(ctx,pixel);
		if (!viewInfo[view].colorEffects) { return }
		if (pixel.fuel > 1) {
			drawPlus(ctx,"#ff6b21",pixel.x,pixel.y,undefined,Math.min(1,pixel.fuel/8));
			drawPlus(ctx,"#ffa600",pixel.x,pixel.y-1,undefined,Math.min(1,pixel.fuel/9));
		}
		drawSquare(ctx,settings.bg,pixel.x,pixel.y);
		drawSquare(ctx,settings.bg,pixel.x,pixel.y-1);
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "head_457") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead || pixel.fuel < 0) {
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"fire");
				changePixel(pixelMap[pixel.x][pixel.y-1],"fire");
			}
			return
		}

		if (Math.random() > 0.8 && Math.random() > 0.8) {
			if (isEmpty(pixel.x, pixel.y-2) && Math.random() > 0.8) {
				releaseElement(pixelMap[pixel.x][pixel.y-1],"fire")
			}	
			pixel.fuel--
		}

		if (pixel.fuel > 1000) {
			if ((isEmpty(pixel.x, pixel.y-2) || isEmpty(pixel.x-1, pixel.y-2) || isEmpty(pixel.x+1, pixel.y)) && Math.random() > 0.8) {
				releaseElement(pixel,"scp_457",1,true)
				pixel.fuel = 500
			}	
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_457") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				pixel.panic = head.panic;
				delete head.panic;
			}
			if (head.fuel != 0 && head.fuel > 0) {
				pixel.fuel += head.fuel;
				head.fuel = 0;
			}
		}
		else { var head = null }
		if (head && Math.random() < 0.25) {
			let y = Math.random() < 0.5 ? 0 : -1;
			for (let x = 1; x < 10; x++) {
				let x2 = pixel.x+(x*pixel.dir);
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements.scp_457.reactions[seenPixel.element] && elements.scp_457.reactions[seenPixel.element].attr1 && elements.scp_457.reactions[seenPixel.element].attr1.panic) {
						pixel.panic += elements.scp_457.reactions[seenPixel.element].attr1.panic;
						pixel.dir *= -1;
						break;
					}
					else if (elements[seenPixel.element].extinguish == true) {
						pixel.panic += 5;
						pixel.dir *= -1;
						break;
					}
					else if (seenPixel.temp < 5) {
						pixel.panic += 5;
						pixel.dir *= -1;
						break;
					}
				}
			}
		}
		if (!pixel.dead && Math.random() < 0.75) {
			shuffleArray(squareCoordsShuffle);
			for (var i = 0; i < squareCoordsShuffle.length; i++) {
				var x = pixel.x+squareCoordsShuffle[i][0];
				var y = pixel.y+squareCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].burnTime && pixelMap[x][y].element != "fire") {
					var fuel = elements[pixelMap[x][y].element].burnTime
					if (elements[pixelMap[x][y].element].burnInto && Math.random() > 0.5) {
						if (elements[pixelMap[x][y].element].burnInto instanceof Array) {
							var burnInto = elements[pixelMap[x][y].element].burnInto[Math.floor(Math.random()*elements[pixelMap[x][y].element].burnInto.length)];
						}
						else {
							var burnInto = elements[pixelMap[x][y].element].burnInto
						}
						if (burnInto == undefined) {
							changePixel(pixelMap[x][y],"fire");
						}
						else {
							changePixel(pixelMap[x][y],burnInto)
						}
					} 
					else {
						changePixel(pixelMap[x][y],"fire");
					}
					pixel.fuel += fuel
					break;
				}
			}
		}
		if (pixel.fuel < 20) {
			pixel.panic += 10;
		}
		else if (pixel.panic > 0) {
			pixel.panic -= 1;
			if (pixel.panic < 0) { pixel.panic = 0; }
			else if (pixel.panic > 500) { pixel.panic = 500; }
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1 && !pixel.charge) {
				createPixel("fire", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head === null) { return }
		else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved) {
				pixel.dir *= -1;
			}
			// homeostasis
			if (pixel.temp < 600) { 
				pixel.temp += 10; 
				pixel.fuel--
			}
			else if (pixel.temp > 2000) { 
				pixel.temp -= 10; 
				pixel.fuel++
			}
		}
	},
	onCollide: function(pixel1,pixel2) {
		if (elements[pixel2.element].extinguish == true) {
			if (Math.random() < 0.9) {
				pixel1.fuel--
				if (Math.random() < 0.25) {
					deletePixel(pixel2.x,pixel2.y)
				}
			}
		}
	}
}

elements.head_457 = {
	name: "SCP-457",
	tempLow:-50,
	stateLow: "smoke",
	tempHigh: 7000,
	stateHigh: "plasma",
	color: "#000000",
	category: "scp",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: .05,
	temp: 600,
	forceSaveColor: true,
	pickElement: "scp_457",
	reactions: {
		"water": { elem1:["fire","smoke"], chance:0.00025 },
		"ash": { elem2:[null,"smoke"], chance:0.5 },
		"glass": { elem2:"glass_shard", chance:0.05 },
		"rad_glass": { elem2:"rad_shard", chance:0.05 },
		"stained_glass": { elem2:"color_sand", chance:0.05 },
	},
	properties: {
		dead: false,
		fuel: 0,
		alpha: 0,
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"fire");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_457") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element != "body_457") {
			pixel.dead = pixelTicks
		}
		else { var body = null }

		// check for eating food
		if (body && !pixel.dead && Math.random() < 0.1) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].burnTime && pixelMap[x][y].element != "fire" && Math.random() > 0.75) {
					var fuel = elements[pixelMap[x][y].element].burnTime
					if (elements[pixelMap[x][y].element].burnInto && elements[pixelMap[x][y].element].burnInto != undefined && Math.random() > 0.75) {
						if (elements[pixelMap[x][y].element].burnInto instanceof Array) {
							var burnInto = elements[pixelMap[x][y].element].burnInto[Math.floor(Math.random()*elements[pixelMap[x][y].element].burnInto.length)];
						}
						else {
							var burnInto = elements[pixelMap[x][y].element].burnInto
						}
						if (burnInto == undefined) {
							changePixel(pixelMap[x][y],"fire");
						}
						else {
							changePixel(pixelMap[x][y],burnInto)
						}
					} 
					else {
						changePixel(pixelMap[x][y],"fire");
					}
					pixel.fuel += fuel
					break;
				}
			}
		}

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
				createPixel("fire", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead || !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element != "body_457") {
			if (Math.random() < 0.15) {
				pixel.dead = pixelTicks;
			}
		}
	},
	onCollide: function(pixel1,pixel2) {
		if (elements[pixel2.element].extinguish == true) {
			if (Math.random() < 0.0025) {
				pixel1.dead = true
			}
		}
	}
}

elements.scp_682 = {
	name: "SCP-682",
    color: ["#424242","#75816B","#4D6B53"],
    onChange: function(pixel) {
		var x = Math.floor(Math.random()*(width))+1;
		var y = Math.floor(Math.random()*(height))+1;
		if (isEmpty(x,y)) {
			createPixel("scp_682",x,y)
		}
        else if (!isEmpty(x,y) && !outOfBounds(x,y) && pixelMap[x][y].element != "scp_682") {
            changePixel(pixelMap[x][y], "scp_682")
        }
	},
    onDelete: function(pixel) {
		var x = Math.floor(Math.random()*(width))+1;
		var y = Math.floor(Math.random()*(height))+1;
		if (isEmpty(x,y)) {
			createPixel("scp_682",x,y)
		}
        else if (!isEmpty(x,y) && !outOfBounds(x,y)) {
            changePixel(pixelMap[x][y], "scp_682")
        }
	},
    properties: {
		h: 1,
        dir: 1,
	},
    tick: function(pixel) {
        if (pixel.h == 1) {
            if (tryMove(pixel, pixel.x, pixel.y+1)) {} // Fall
		    doDefaults(pixel);
            if (Math.random() < 0.5) { // Move 50% chance
			    var movesToTry = [
			    	[1*pixel.dir,0],
			    	[1*pixel.dir,-1],
			    ];
			    let moved = false;
			    // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
    			while (movesToTry.length > 0) {
    				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
    				if (isEmpty(pixel.x+move[0], pixel.y+move[1])) {
    					var origx = pixel.x+move[0];
    					var origy = pixel.y+move[1];
    					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
    						moved = true;
    						break;
    					}
    				}
			    }
			    // 15% chance to change direction
			    if (Math.random() < 0.15 || !moved) {
			    	pixel.dir *= -1;
			    }
		    }
            if (Math.random() < 0.95) {
		    	let y = Math.random() < 0.5 ? 0 : -1;
                let xDir = Math.random() < 0.5 ? 1 : -1;
		    	for (let x = 1; x < 50; x++) {
		    		let x2 = pixel.x+(x*xDir);
		    		let y2 = pixel.y+y;
		    		if (!isEmpty(x2,y2,true) && !outOfBounds(x2,y2)) {
		    			let seenPixel = pixelMap[x2][y2];
		    			if (elements[seenPixel.element].id == elements.head.id || elements[seenPixel.element].id == elements.body.id) {
		    				pixel.h = 3
		    				break;
		    			}
		    		}
		    	}
		    }
            for (var i = 0; i < squareCoords.length; i++) {
                var coords = squareCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y)) {
                    var pixel2 = pixelMap[x][y]
                    let old = pixel2.element;
                    if (isBreakable(pixel2) && (elements[pixel2.element].category == "life" || elements[pixel2.element].category == "food")) {
		            	// times 0.25 if not shiftDown else 1
		            	if (Math.random() < (1-(elements[pixel2.element].hardness || 0)) / 4 && Math.random() > 0.5) {
		            		breakPixel(pixel2);
		            	}
		            	// if (Math.random() > ((1-(elements[pixel.element].hardness || 1)) * (shiftDown ? 0.5 : 1))) {
		            }
		            else if (old === pixel2.element && elements[pixel2.element].movable && !isEmpty(pixel2.x,pixel2.y+1) && !paused && Math.random() > 0.75 && (elements[pixel2.element].category == "life" || elements[pixel2.element].category == "food")) {
		            	let x = 0; let y = 0;
		            	if (Math.random() < 0.66) x = Math.random() < 0.5 ? 1 : -1;
		            	if (Math.random() < 0.66) y = Math.random() < 0.5 ? 1 : -1;
		            	tryMove(pixel2,pixel2.x+x,pixel2.y+y)
		            }
                    if (elements[pixel2.element].isFood == true) {
                        if (Math.random() < (1-(elements[pixel2.element].hardness || 0)) / 4 || Math.random() > 0.5) {
		            		deletePixel(pixel2.x,pixel2.y)
		            	}
                    }
                }
            }
            for (var i = 0; i < destroyCoords.length; i++) {
                var coords = destroyCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y)) {
                    var pixel2 = pixelMap[x][y]
                    let old = pixel2.element;
                    if (old === pixel2.element && elements[pixel2.element].movable && !isEmpty(pixel2.x,pixel2.y+1) && !paused && Math.random() > 0.95) {
		            	let x = 0; let y = 0;
		            	if (Math.random() < 0.66) x = Math.random() < 0.5 ? 1 : -1;
		            	if (Math.random() < 0.66) y = Math.random() < 0.5 ? 1 : -1;
		            	tryMove(pixel2,pixel2.x+x,pixel2.y+y)
		            }
                    if (elements[pixel2.element].isFood == true) {
                        if (Math.random() < (1-(elements[pixel2.element].hardness || 0)) / 4 || Math.random() > 0.5) {
		            		deletePixel(pixel2.x,pixel2.y)
		            	}
                    }
                }
            }
        }
        else if (pixel.h == 2) {
            if (!pixel.hStart) {
                pixel.hStart = pixelTicks
            }
            if (tryMove(pixel, pixel.x, pixel.y+1)) {} // Fall
		    doDefaults(pixel);
            if (Math.random() < 0.1) { // Move 10% chance
			    var movesToTry = [
			    	[1*pixel.dir,0],
			    	[1*pixel.dir,-1],
			    ];
			    let moved = false;
			    // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
    			while (movesToTry.length > 0) {
    				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
    				if (isEmpty(pixel.x+move[0], pixel.y+move[1])) {
    					var origx = pixel.x+move[0];
    					var origy = pixel.y+move[1];
    					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
    						moved = true;
    						break;
    					}
    				}
			    }
			    // 15% chance to change direction
			    if (Math.random() < 0.15 || !moved) {
			    	pixel.dir *= -1;
			    }
		    }
            if (Math.random() < 0.05 && (pixel.hStart + 500) < pixelTicks) {
			    pixel.h = 3
                delete pixel.hStart
			}
            if (Math.random() < 0.25) {
		    	let y = Math.random() < 0.5 ? 0 : -1;
		    	for (let x = 1; x < 15; x++) {
		    		let x2 = pixel.x+(x*pixel.dir);
		    		let y2 = pixel.y+y;
		    		if (!isEmpty(x2,y2,true) && !outOfBounds(x2,y2)) {
		    			let seenPixel = pixelMap[x2][y2];
		    			if (elements[seenPixel.element].id == elements.head.id || elements[seenPixel.element].id == elements.body.id) {
		    				pixel.h = 3
		    				break;
		    			}
		    			else if (elements[seenPixel.element].category == "life" && Math.random() > 0.995) {
		    				pixel.h = 1
                            break;
		    			}
		    		}
		    	}
		    }
            for (var i = 0; i < destroyCoords.length; i++) {
                var coords = destroyCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y)) {
                    var pixel2 = pixelMap[x][y]
                    let old = pixel2.element;
                    if (elements[pixel2.element].isFood == true) {
                        if (Math.random() < (1-(elements[pixel2.element].hardness || 0)) / 4 || Math.random() > 0.5) {
		            		deletePixel(pixel2.x,pixel2.y)
		            	}
                    }
                }
            }
        }
        else {
            if (tryMove(pixel, pixel.x, pixel.y+1)) {} // Fall
		    doDefaults(pixel);
            if (Math.random() < 0.9) { // Move 90% chance
			    var movesToTry = [
			    	[1*pixel.dir,0],
			    	[1*pixel.dir,-1],
			    ];
			    let moved = false;
			    // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
    			while (movesToTry.length > 0) {
    				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
    				if (isEmpty(pixel.x+move[0], pixel.y+move[1])) {
    					var origx = pixel.x+move[0];
    					var origy = pixel.y+move[1];
    					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
    						moved = true;
    						break;
    					}
                        else if (Math.random() > 0.25) {
                            tryMove(pixel, pixel.x, pixel.y-1);
    						break;
                        }
    				}
			    }
			    // 5% chance to change direction
			    if (Math.random() < 0.05 || !moved) {
			    	pixel.dir *= -1;
			    }
		    }
            if (Math.random() < 0.95) {
		    	let y = Math.random() < 0.5 ? 0 : -1;
                let xDir = Math.random() < 0.5 ? 1 : -1;
		    	for (let x = 1; x < 55; x++) {
		    		let x2 = pixel.x+(x*xDir);
		    		let y2 = pixel.y+y;
		    		if (!isEmpty(x2,y2,true) && !outOfBounds(x2,y2)) {
		    			let seenPixel = pixelMap[x2][y2];
		    			if (elements[seenPixel.element].id == elements.head.id || elements[seenPixel.element].id == elements.body.id) {
		    				if (pixel.dir != 1 && seenPixel.x > pixel.x) {
                                pixel.dir = 1
                            }
                            else if (pixel.dir != -1 && seenPixel.x < pixel.x) {
                                pixel.dir = -1
                            }
		    				break;
		    			}
		    			else if (elements[seenPixel.element].category == "life" && Math.random() > 0.995) {
		    				if (pixel.dir != 1 && seenPixel.x > pixel.x) {
                                pixel.dir = 1
                            }
                            else if (pixel.dir != -1 && seenPixel.x < pixel.x) {
                                pixel.dir = -1
                            }
                            break;
		    			}
		    		}
		    	}
		    }
            for (var i = 0; i < destroyCoords.length; i++) {
                var coords = destroyCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y)) {
                    var pixel2 = pixelMap[x][y]
                    let old = pixel2.element;
                    if (isBreakable(pixel2)) {
		            	// times 0.25 if not shiftDown else 1
		            	if (Math.random() < (1.5-(elements[pixel.element].hardness || 0)) && Math.random() > 0.5) {
		            		breakPixel(pixel2);
		            	}
		            	// if (Math.random() > ((1-(elements[pixel.element].hardness || 1)) * (shiftDown ? 0.5 : 1))) {
		            }
		            else if (old === pixel.element && elements[pixel.element].movable && !isEmpty(pixel.x,pixel.y+1) && !paused && Math.random() > 0.75) {
		            	let x = 0; let y = 0;
		            	if (Math.random() < 0.66) x = Math.random() < 0.5 ? 1 : -1;
		            	if (Math.random() < 0.66) y = Math.random() < 0.5 ? 1 : -1;
		            	tryMove(pixel2,pixel2.x+x,pixel2.y+y)
		            }
                }
            }
            if (Math.random() < 0.015) {
			    pixel.h = 1
			}
        }
    },
    category: "scp",
    density: 7500,
    reactions: {
        "head": { attr1:{h:3}, elem2:["blood","meat","bone"],},
        "body": { attr1:{h:3}, elem2:["blood","meat","bone"], },
        "neutral_acid": { attr1:{h:2}, elem2:null, chance: 0.5 },
        "acid": { attr1:{h:2}, elem2:[null,"acid","acid","acid","acid","acid","acid","acid","acid","acid","acid","acid","acid","acid","neutral_acid","neutral_acid"], chance: 0.5 },
        "grass": { elem2: "dead_plant", chance:0.2 },
        "plant": { elem2: "dead_plant", chance:0.2 },
        "dead_plant": { elem2: null, chance:0.2 },
        "dna": { elem2: null, chance:0.2 },
        "meat": { elem2: null, chance:0.2 },
        "ground_meat": { elem2: null, chance:0.2 },
        "cooked_meat": { elem2: null, chance:0.3 },
        "rotten_meat": { elem2: null, chance:0.1 },
        "ground_rotten_meat": { elem2: null, chance:0.15 },
        "blood": { attr1:{h:3}, elem2: null },
        "infection": { elem2: null },
        "bone": { elem2: ["blood",null,null], chance:0.1 },
        "bone_marrow": { elem2: ["blood",null], chance:0.1 },
    },
    state: "solid",
    hardness: 1,
    conduct: .1,
	cooldown: defaultCooldown,
}

elements.scp_804 = {
	name: "SCP-804",
    color:["#C49F4F","#F2D18E","#A59F8F","#7FA097","#7FA097","#405584","#8E7A45","#96814C"],
    category: "scp",
    hardness: 0.65,
    breakInto: ["glass_shard","glass_shard","snow","metal_scrap","metal_scrap","glass_shard","glass_shard","snow","metal_scrap","metal_scrap","dust"],
    tempHigh: 1750,
    stateHigh: ["glass_shard","glass_shard","snow","metal_scrap","metal_scrap","glass_shard","glass_shard","snow","metal_scrap","metal_scrap","dust"],
    conduct: 1,
    properties: {
		radius: 50,
        active: false,
	},
    tick: function(pixel) {
        tryMove(pixel,pixel.x,pixel.y+1)
        if (pixel.charge && pixel.active != true) {
            pixel.active = true
        }
        if (pixel.repair < 3 && pixel.active != false) {
            pixel.active = false
        }
        doDefaults(pixel)
        if (pixel.radius > 0 && (!pixel.repair || pixel.repair > 2) && pixel.active == true) {
            var coords = circleCoords(pixel.x,pixel.y,pixel.radius);
			for (var i = 0; i < coords.length; i++) {
				if (!isEmpty(coords[i].x,coords[i].y) && !outOfBounds(coords[i].x,coords[i].y)) {
					var manmade = pixelMap[coords[i].x][coords[i].y]
                    if (manmade.element == "scp_804") {
                        if (!manmade.repair) {
                            manmade.repair = 75
                        }
                        if (Math.random() < 0.05) {
                            manmade.repair --
                        }
                        if (manmade.repair < 1) {
                            if (Math.random() > 0.95) {
                                changePixel(manmade, "metal_scrap")
                            }
                            else {
                                deletePixel(manmade.x,manmade.y)
                            }
                        }
                    }
                    else if (manmade.element == "skin" || manmade.element == "hair" || manmade.element == "body" || manmade.element == "head" || manmade.element == "body_012_1" || manmade.element == "head_012_1" || manmade.element == "body_008" || manmade.element == "head_008" || manmade.element == "body_035" || manmade.element == "head_035" || manmade.element == "body_049" || manmade.element == "head_049" || manmade.element == "body_049_1" || manmade.element == "head_049_1") {
                        if (!manmade.repair) {
                            manmade.repair = 25
                        }
                        if (Math.random() < 0.05) {
                            manmade.repair --
                        }
                        if (manmade.repair < 18 && manmade.element == "body" && !manmade.naked) {
                            if (!isEmpty(manmade.x,manmade.y-1) && Math.random() > 0.75) {
				                manmade.color = pixelMap[manmade.x][manmade.y-1].color;
                                manmade.naked = true
                                manmade.panic ++
			                }
                        }
                        if (manmade.repair < 1) {
                            if (Math.random() > 0.95) {
                                changePixel(manmade, "blood")
                                manmade.man = true
                            }
                            else {
                                deletePixel(manmade.x,manmade.y)
                            }
                        }
                    }
                    else if (elements[manmade.element].category == "weapons" || manmade.element == "tin" || manmade.element == "lead" || manmade.element == "gallium" || manmade.element == "mercury" || manmade.element == "tungsten" || manmade.element == "nickel" || manmade.element == "zinc" || manmade.element == "gold" || manmade.element == "silver" || manmade.element == "iron" || manmade.element == "copper" || manmade.element == "aluminum") {
                        if (!manmade.repair) {
                            manmade.repair = 20
                        }
                        if (Math.random() < 0.25) {
                            manmade.repair --
                        }
                        if (manmade.repair < 1) {
                            if (Math.random() > 0.65) {
                                changePixel(manmade, "rust")
                            }
                            else {
                                deletePixel(manmade.x,manmade.y)
                            }
                        }
                    }
                    else if (manmade.element == "unknown" || manmade.element == "site_nuke" || manmade.element == "scp_035" || manmade.element == "access_door" || manmade.element == "keycard_terminal" || manmade.element == "scp_229" || elements[manmade.element].category == "machines" || elements[manmade.element].category == "logic" || manmade.element == "metal_scrap" || manmade.element == "solid_mercury" || manmade.element == "molten_gallium" || manmade.element == "steel" || manmade.element == "galvanized_steel" || manmade.element == "brass" || manmade.element == "bronze" || manmade.element == "invar" || manmade.element == "sterling" || manmade.element == "rose_gold" || manmade.element == "purple_gold" || manmade.element == "blue_gold" || manmade.element == "electrum" || manmade.element == "solder" || manmade.element == "particleboard") {
                        if (!manmade.repair) {
                            manmade.repair = 15
                        }
                        if (Math.random() < 0.25) {
                            manmade.repair --
                        }
                        if (manmade.repair < 1) {
                            if (Math.random() > 0.75) {
                                changePixel(manmade, "rust")
                            }
                            else if (Math.random > 0.5) {
                                changePixel(manmade, "dust")
                            }
                            else {
                                deletePixel(manmade.x,manmade.y)
                            }
                        }
                    }
                    else if (manmade.element == "rust" || manmade.element == "oxidized_copper" || manmade.element == "concrete" || manmade.element == "brick" || manmade.element == "adobe" || manmade.element == "slag" || manmade.element == "amalgam" || manmade.element == "thermite" || manmade.element == "copper_sulfate" || manmade.element == "glass" || manmade.element == "glass_shard" || manmade.element == "rad_glass" || manmade.element == "rad_shard" || manmade.element == "stained_glass" || manmade.element == "color_sand" || manmade.element == "brick_rubble" || manmade.element == "clay_shard" || manmade.element == "porcelain" || manmade.element == "porcelain_shard") {
                        if (!manmade.repair) {
                            manmade.repair = 10
                        }
                        if (Math.random() < 0.25) {
                            manmade.repair --
                        }
                        if (manmade.repair < 1) {
                            if (Math.random() > 0.85) {
                                changePixel(manmade, "dust")
                            }
                            else {
                                deletePixel(manmade.x,manmade.y)
                            }
                        }
                    }
                    else if (!manmade.lc && !manmade.wc && manmade.element == "wood" || manmade.element == "tinder" || manmade.element == "scp_063" || manmade.element == "scp_012" || manmade.element == "dust" || manmade.element == "insulation" || manmade.element == "cloth" || manmade.element == "plastic" || elements[manmade.element].keycard == true || manmade.element == "bead" || manmade.element == "glitter" || manmade.element == "confetti" || manmade.element == "paper" || manmade.element == "cement" || manmade.element == "acid" || manmade.element == "black_acid" || manmade.element == "alcohol" || manmade.element == "wax" || manmade.element == "poison" || manmade.element == "incense" || manmade.element == "gold_coin" || manmade.element == "borax" || manmade.element == "spray_paint" || manmade.element == "anesthesia" || manmade.element == "acid_gas" || manmade.element == "ball" || manmade.element == "potassium_salt" || manmade.element == "epsom_salt" || manmade.element == "sodium_acetate") {
                        if (!manmade.repair) {
                            manmade.repair = 6
                        }
                        if (Math.random() < 0.25) {
                            manmade.repair --
                        }
                        if (manmade.repair < 1) {
                            if (Math.random() > 0.75) {
                                changePixel(manmade, "foam")
                            }
                            else {
                                deletePixel(manmade.x,manmade.y)
                            }
                        }
                    }
                    else if (manmade.panic && manmade.element == "bone" || elements[manmade.element].category == "medicine" || manmade.panic && manmade.element == "quicklime" || manmade.panic && manmade.element == "rotten_meat" || manmade.panic && manmade.element == "meat" || manmade.element == "cooked_meat" || manmade.element == "blood" || manmade.element == "infection" || manmade.element == "infected_blood" || manmade.element == "seltzer" || Math.random() > 0.9 && manmade.element == "dirty_water" || manmade.element == "pool_water" || manmade.element == "lamp_oil" || manmade.element == "neutral_acid" || manmade.element == "glue" || manmade.element == "soda" || manmade.element == "melted_wax" || manmade.element == "chocolate_milk" || manmade.element == "fruit_milk" || manmade.element == "pilk" || manmade.element == "eggnog" || manmade.element == "cream" || manmade.element == "nut_milk" || manmade.element == "vinegar" || manmade.element == "soap" || manmade.element == "bleach" || manmade.element == "dye" || manmade.element == "ink" || manmade.element == "vaccine" || manmade.element == "antidote" || manmade.element == "tea" || manmade.element == "coffee" || manmade.element == "caramel" || manmade.element == "molasses" || manmade.element == "ketchup"  || manmade.element == "sauce" || manmade.element == "mayo" || manmade.element == "cyanide") {
                        if (!manmade.repair) {
                            manmade.repair = 3
                        }
                        if (Math.random() < 0.25) {
                            manmade.repair --
                        }
                        if (manmade.repair < 1) {
                            if (Math.random() > 0.5) {
                                changePixel(manmade, "water")
                            }
                            else {
                                deletePixel(manmade.x,manmade.y)
                            }
                        }
                    }
                    if (manmade.temp > 600) {
                        manmade.temp -= 10
                    }
                    else if (manmade.temp > 93.9) {
                        manmade.temp -= 1
                    }
                    else if (manmade.temp > 56.7) {
                        manmade.temp -= 0.1
                    }
				}
			}
            if (Math.random() > 0.9) {
                pixel.radius++
            }
        }
    },
    excludeRandom: true,
    state: "solid",
	cooldown: defaultCooldown,
}

elements.scp_999 = {
	name: "SCP-999",
    color: "#FFA500",
    properties: {
		h: false,
	},
    tick: function(pixel) {
        if (pixel.h == true) {
            if (!pixel.hStart) {
                pixel.hStart = pixelTicks
            }
            if (pixel.start === pixelTicks) {return}
	        if (pixel.charge && elements[pixel.element].behaviorOn) {
	        	pixelTick(pixel);
	        	return;
	        }
        	let move1Spots = hyperCoords.slice(0);
        	var moved = false;
        	for (var i = 0; i < move1Spots.length; i++) {
        		const j = Math.random()*move1Spots.length | 0;
        		const coords = move1Spots[j];
        		if (tryMove(pixel, pixel.x+coords[0], pixel.y+coords[1])) { moved = true; break; }
        		move1Spots.splice(j, 1);
        	}
        	if (moved === false) {
        		let move2Spots = diagonalCoords.slice(0);
        		for (var i = 0; i < move2Spots.length; i++) {
        			const j = Math.random()*move2Spots.length | 0;
        			const coords = move2Spots[j];
        			if (tryMove(pixel, pixel.x+coords[0], pixel.y+coords[1])) { break; }
        			move2Spots.splice(j, 1);
        		}
        	}
        	doDefaults(pixel);
            if ((pixel.hStart + 50) < pixelTicks) {
                pixel.h = false
                delete pixel.hStart
            }
        }
        else {
            if (pixel.start === pixelTicks) {return}
    	    if (pixel.charge && elements[pixel.element].behaviorOn) {
    	    	pixelTick(pixel);
    	    	return;
    	    }
    	    var viscMove = true;
    	    viscMove = (Math.random()*100) < 100 / Math.pow(1000, 0.25);
    	    if (!viscMove) {
    	    	var move1Spots = [
    	    		0
    	    	]
    	    }
    	    else {
    	    	var move1Spots = [
    	    		1,0,-1
    	    	]
    	    }
    	    var moved = false;
    	    for (var i = 0; i < move1Spots.length; i++) {
    	    	const j = Math.random()*move1Spots.length | 0;
    	    	const coord = move1Spots[j];
    	    	if (tryMove(pixel, pixel.x+coord, pixel.y+1)) { moved = true; break; }
    	    	move1Spots.splice(j, 1);
    	    }
    	    if (!moved) {
    	    	if (viscMove || Math.random > 0.5) {
    	    		if (Math.random() < 0.5) {
    	    			if (!tryMove(pixel, pixel.x+1, pixel.y)) {
    	    				tryMove(pixel, pixel.x-1, pixel.y);
    	    			}
    	    		} else {
    	    			if (!tryMove(pixel, pixel.x-1, pixel.y)) {
    	    				tryMove(pixel, pixel.x+1, pixel.y);
    	    			}
    	    		}
    	    	}
    	    }
    	    doDefaults(pixel);
        }
    },
    category: "scp",
    density: 550,
    reactions: {
        "sugar_water": { elem2 : "water" , chance:0.2 },
        "dirty_water": { elem2 : "water" , chance:0.2 },
		"candy": { elem2 : null },
		"sugar": { elem2 : null },
        "sauce": { elem2 : null },
        "salt": { elem2 : null , chance:0.2 },
        "cheese": { elem2 : null , chance:0.2 },
        "melted_cheese": { elem2 : null },
        "baked_potato": { elem2 : null , chance:0.2 },
        "mashed_potato": { elem2 : null , chance:0.2 },
        "bread": { elem2 : null , chance:0.2 },
        "toast": { elem2 : null , chance:0.2 },
        "jelly": { elem2 : null },
        "nut_butter": { elem2 : null },
        "grape": { elem2 : null , chance:0.2 },
        "ice_cream": { elem2 : null },
        "juice": { elem2 : null },
        "milk": { elem2 : null },
        "gingerbread": { elem2 : null , chance:0.2 },
        "crumb": { elem2 : null , chance:0.2 },
        "cream": { elem2 : null },
        "baked_batter": { elem2 : null },
        "frozen_yogurt": { elem2 : null },
        "yogurt": { elem2 : null },
        "popcorn": { elem2 : null , chance:0.2 },
        "chocolate": { elem2 : null },
        "chocolate_milk": { elem2 : null },
        "melted_chocolate": { elem2 : null },
        "caramel": { elem2 : null },
        "ash": { elem2 : null , chance:0.2 },
        "dust": { elem2 : null , chance:0.2 },
        "alchohol": { attr1:{h:true}, elem2 : null },
        "pilk": { attr1:{h:true}, elem2 : null },
        "coffee_bean": { attr1:{h:true}, elem2 : null },
        "coffee_ground": { attr1:{h:true}, elem2 : null },
		"soda": { attr1:{h:true}, elem2 : null },
        "coffee": { attr1:{h:true}, elem2 : null },
        "seltzer": { attr1:{h:true}, elem2 : null },
    },
    state: "liquid",
    conduct: .5,
    temp: 37,
    extinguish: true,
    stain: -0.03,
	cooldown: defaultCooldown,
}

// scps with ID over 999 here

elements.scp_1000 = {
	name: "SCP-1000",
	color: ["#a49d9c","#6a4420","#101c31","#90052A","#ffeed5","#90052A","#101c31","#6a4420","#a49d9c"],
	buttonColor: ["#a49d9c","#6a4420","#6a4420","#101c31","#90052A","#ffeed5"],
	category: "scp",
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	onPlace: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("body_1000", pixel.x, pixel.y+1);
			var color = pixel.color;
			changePixel(pixel,"head_1000");
			pixel.color = color;
			pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1],color);
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			var color = pixel.color;
			createPixel("head_1000", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = color;
			changePixel(pixel,"body_1000");
			pixel.color = pixelColorPick(pixel,color);
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
		"fire": { attr1:{panic:5} },
		"plasma": { attr1:{panic:5} },
		"cold_fire": { attr1:{panic:5} },
		"electric": { attr1:{panic:5} },
		"blood": { attr1:{panic:1} },
		"infection": { attr1:{panic:2} },
		"cancer": { attr1:{panic:3} },
		"plague": { attr1:{panic:5} },
		"radiation": { attr1:{panic:5} },
		"tnt": { attr1:{panic:5} },
		"dynamite": { attr1:{panic:5} },
		"c4": { attr1:{panic:5} },
		"grenade": { attr1:{panic:5} },
		"gunpowder": { attr1:{panic:5} },
		"acid": { attr1:{panic:5} },
		"acid_gas": { attr1:{panic:5} },
		"stench": { attr1:{panic:2} },
		"head": { attr1:{panic:3} },
		"body": { attr1:{panic:3} },
	},
	related: ["body_1000","head_1000"],
	cooldown: defaultCooldown,
	forceSaveColor: true,
}

elements.body_1000 = {
	color: ["#a49d9c","#6a4420","#101c31","#90052A","#ffeed5","#a49d9c","#6a4420","#101c31","#90052A","#ffeed5"],
	name: "SCP-1000",
	category: "scp",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 155,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 15,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["blood","meat","bone","blood","meat","bone","blood","meat","bone","blood","meat","bone","dust"],
	forceSaveColor: true,
	pickElement: "scp_1000",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"plague": { elem1:"plague", chance:0.05 },
		"egg": { elem2:"yolk", chance:0.5, oneway:true },
		"grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
		"ant": { elem2:"dead_bug", chance:0.05, oneway:true },
		"spider": { elem2:"dead_bug", oneway:true },
		"fly": { elem2:"dead_bug", oneway:true },
		"firefly": { elem2:"dead_bug", oneway:true },
		"bee": { elem2:"dead_bug", oneway:true },
		"flea": { elem2:"dead_bug", oneway:true },
		"termite": { elem2:"dead_bug", oneway:true },
		"worm": { elem2:"slime", chance:0.05, oneway:true },
		"stink_bug": { elem2:"stench", oneway:true },
		"grass_seed": { elem2:null, chance:0.05 },
		"gold_coin": { elem2:null, chance:0.05 },
		"diamond": { elem2:null, chance:0.05 },
		"sun": { elem1:"cooked_meat" },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} }
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "head_1000") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_1000") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				pixel.panic = head.panic;
				delete head.panic;
			}
		}
		else { var head = null }
		if (head && Math.random() < 0.25) {
			let y = Math.random() < 0.5 ? 0 : -1;
			for (let x = 1; x < 10; x++) {
				let x2 = pixel.x+(x*pixel.dir);
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements.scp_1000.reactions[seenPixel.element] && elements.scp_1000.reactions[seenPixel.element].attr1 && elements.scp_1000.reactions[seenPixel.element].attr1.panic) {
						pixel.panic += elements.scp_1000.reactions[seenPixel.element].attr1.panic;
						pixel.dir *= -1;
						break;
					}
					else if (seenPixel.dead || seenPixel.temp > 200) {
						pixel.panic += 5;
						pixel.dir *= -1;
						if (seenPixel.panic) delete seenPixel.panic;
						break;
					}
				}
			}
		}
		if (pixel.burning) {
			pixel.panic += 0.1;
			if (head && pixelTicks-pixel.burnStart > 240) {
				pixel.color = head.color;
			}
		}
		if (pixel.charge) {
			pixel.panic += 1;
		}
		else if (pixel.panic > 0) {
			pixel.panic -= 0.1;
			if (pixel.panic < 0) { pixel.panic = 0; }
			else if (pixel.panic > 50) { pixel.panic = 50; }
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head === null) { return }
		else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if (hitPixel.element === "body_1000" || hitPixel.element === "head_1000" && hitPixel.panic < pixel.panic) {
						// interact with other human
						hitPixel.panic = pixel.panic;
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved) {
				pixel.dir *= -1;
			}
			// homeostasis
			if (pixel.temp > 37) { pixel.temp -= 1; }
			else if (pixel.temp < 37) { pixel.temp += 1; }
		}

	}
}

elements.head_1000 = {
	color: ["#a49d9c","#6a4420","#101c31","#90052A","#ffeed5","#a49d9c","#6a4420","#101c31","#90052A","#ffeed5"],
	name: "SCP-1000",
	category: "scp",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 15,
	burnTime: 255,
	burnInto: "cooked_meat",
	breakInto: ["blood","meat","bone","blood","meat","bone","blood","meat","bone","blood","meat","bone","dust"],
	forceSaveColor: true,
	pickElement: "scp_1000",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"plague": { elem1:"plague", chance:0.05 },
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 },
		"beans": { elem2:[null,null,null,null,null,null,null,null,"stench"], chance:0.2 },
		"sun": { elem1:"cooked_meat" },
		"light": { stain1:"#825043" },
		"bee": { stain1:"#cc564b", chance:0.2 },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
		"salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
		"pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} }
	},
	properties: {
		dead: false
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_1000") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		// check for eating food
		if (body && !pixel.dead && Math.random() < 0.1) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].isFood && pixelMap[x][y].panic === undefined) {
					deletePixel(x,y);
					break;
				}
			}
		}

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		// homeostasis
		if (pixel.temp > 37) { pixel.temp -= 1; }
		else if (pixel.temp < 37) { pixel.temp += 1; }
	},
	onChange: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	},
	onDelete: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	}
}

elements.penny = {
	color: ["#F49858","#DE882C","#D9752C","#B15D23","#C16522","#B75C24","#B05B28","#AF6720"],
	behavior: behaviors.POWDER,
	category: "powders",
	tempHigh: 1085,
	stateHigh: "molten_copper",
	state: "solid",
	density: 8960,
	conduct: 0.85,
	hardness: 0.3,
}

elements.scp_1015 = {
	name: "SCP-1015",
	color: ["#F49858","#DE882C","#D9752C","#B15D23","#C16522","#B75C24","#B05B28","#AF6720"],
	behavior: behaviors.POWDER,
	tick: function(pixel) {
        for (var i = 0; i < destroyCoords.length; i++) {
                var coords = destroyCoords[i];
                var x = pixel.x + coords[0];
                var y = pixel.y + coords[1];
                if (!isEmpty(x,y) && !outOfBounds(x,y) && Math.random() < 0.05) {
                    var pixel2 = pixelMap[x][y]
                    let old = pixel2.element;
                    if (elements[pixel2.element].id == elements.body.id) {
						pixel2.element = "body_1015"
                        deletePixel(pixel.x,pixel.y)
						break;
					}
                    else if (elements[pixel2.element].id == elements.head.id) {
                        pixel2.element = "head_1015"
						pixelMap[pixel2.x][pixel2.y+1].element = "body_1015"
                        deletePixel(pixel.x,pixel.y)
						break;
					}
                }
        }
	},
    tempHigh: 10850,
	stateHigh: "molten_copper",
    temp: 20,
    insulate: true,
	category: "scp",
	state: "solid",
	density: 8960,
	conduct: 0.85,
	hardness: 1,
}

elements.body_1015 = {
	color: ["#069469","#047e99","#7f5fb0"],
    name: "SCP-1015-1",
	category: "scp",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["blood","meat","bone"],
	forceSaveColor: true,
	pickElement: "human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.01 },
		"plague": { elem1:"plague", chance:0.05 },
		"egg": { elem2:"yolk", chance:0.5, oneway:true },
		"grape": { elem2:"juice", chance:0.5, color2:"#291824", oneway:true },
		"ant": { elem2:"dead_bug", chance:0.05, oneway:true },
		"spider": { elem2:"dead_bug", oneway:true },
		"fly": { elem2:"dead_bug", oneway:true },
		"firefly": { elem2:"dead_bug", oneway:true },
		"bee": { elem2:"dead_bug", oneway:true },
		"flea": { elem2:"dead_bug", oneway:true },
		"termite": { elem2:"dead_bug", oneway:true },
		"worm": { elem2:"slime", chance:0.05, oneway:true },
		"stink_bug": { elem2:"stench", oneway:true },
		"grass_seed": { elem2:null, chance:0.05 },
		"gold_coin": { elem2:null, chance:0.05 },
		"diamond": { elem2:null, chance:0.05 },
		"sun": { elem1:"cooked_meat" },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} }
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
        pennySize: 1,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "head_1015") {
					if (isEmpty(pixel.x, pixel.y-1)) {
						movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
					}
					else {
						swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
					}
				}
			}
		}
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
			}
			return
		}

		if (Math.random() < 0.25 && !isEmpty(pixel.x-1,pixel.y+1) && !isEmpty(pixel.x+1,pixel.y+1) && !isEmpty(pixel.x-1,pixel.y-1) && !isEmpty(pixel.x+1,pixel.y-1) && !isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x,pixel.y+1) && !isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.5) {
		    changePixel(pixel,"scp_1015")
            releaseElement(pixel,"blood",4,true)
	    }
		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head_1015") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
			else if (head.panic > 0) {
				pixel.panic = head.panic;
				delete head.panic;
			}
		}
        else if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
			var head = pixelMap[pixel.x][pixel.y-1];
			head.element = "head_1015"
		}
		else { var head = null }
		if (head && Math.random() < 0.25) {
			let y = Math.random() < 0.5 ? 0 : -1;
			for (let x = 1; x < 10; x++) {
				let x2 = pixel.x+(x*pixel.dir);
				let y2 = pixel.y+y;
				if (!isEmpty(x2,y2,true)) {
					let seenPixel = pixelMap[x2][y2];
					if (elements.human.reactions[seenPixel.element] && elements.human.reactions[seenPixel.element].attr1 && elements.human.reactions[seenPixel.element].attr1.panic) {
						pixel.panic += elements.human.reactions[seenPixel.element].attr1.panic;
						pixel.dir *= -1;
						break;
					}
					else if (seenPixel.dead || seenPixel.temp > 200) {
						pixel.panic += 5;
						pixel.dir *= -1;
						if (seenPixel.panic) delete seenPixel.panic;
						break;
					}
				}
			}
		}
		if (pixel.burning) {
			pixel.panic += 0.1;
			if (head && pixelTicks-pixel.burnStart > 240) {
				pixel.color = head.color;
			}
		}
		if (pixel.charge) {
			pixel.panic += 1;
		}
		else if (pixel.panic > 0) {
			pixel.panic -= 0.1;
			if (pixel.panic < 0) { pixel.panic = 0; }
			else if (pixel.panic > 50) { pixel.panic = 50; }
		}

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head === null) { return }
		else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			let moved = false;
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						moved = true;
						break;
					}
				}
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if ((hitPixel.element === "body" || hitPixel.element === "head") && pixel.pennySize > 10) {
						if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
                        releaseElement(pixel,"blood")
					}
                    else if ((hitPixel.element === "body" || hitPixel.element === "head") && hitPixel.panic < pixel.panic) {
						// interact with other human
						hitPixel.panic = pixel.panic;
					}
                    else if (elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 5 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        pixel.elemP = hitPixel.element
                        hitPixel.element = "penny_converter"
                        hitPixel.origElem = pixel.elemP
                        hitPixel.pennySize = pixel.pennySize
                        delete pixel.elemP
					}
                    else if (elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 3 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
					}
                    else if (elements[hitPixel.element].movable == true && elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 1 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
					}
                    else if (Math.random() > 0.9 && elements[hitPixel.element].movable == true && elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 0 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
					}
				}
			}
            if (!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1) && Math.random() < 0.25) {
                    var hitPixel = pixelMap[pixel.x][pixel.y+1];
					if ((hitPixel.element === "body" || hitPixel.element === "head") && pixel.pennySize > 10) {
                        if (!isEmpty(hitPixel.x,hitPixel.y-1) && !outOfBounds(hitPixel.x,hitPixel.y-1) && Math.random() > 0.5 && hitPixel.element == "body") {
                            if (Math.random() < 0.0005) {
                                changePixel(pixelMap[hitPixel.x][hitPixel.y-1],"scp_1015")
                            }
                            else {
						        changePixel(pixelMap[hitPixel.x][hitPixel.y-1],"penny")
                            }
                        }
                        if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
                        releaseElement(pixel,"blood",2)
					}
                    else if (elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 5 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        pixel.elemP = hitPixel.element
                        hitPixel.element = "penny_converter"
                        hitPixel.origElem = pixel.elemP
                        hitPixel.pennySize = pixel.pennySize
                        delete pixel.elemP
					}
                    else if (elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 3 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
					}
                    else if (elements[hitPixel.element].movable == true && elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 1 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
					}
                    else if (Math.random() > 0.9 && elements[hitPixel.element].movable == true && elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 0 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
					}
            }
            if (!isEmpty(pixel.x,pixel.y-2) && !outOfBounds(pixel.x,pixel.y-2) && Math.random() < 0.5) {
                    var hitPixel = pixelMap[pixel.x][pixel.y+1];
					if ((hitPixel.element === "body" || hitPixel.element === "head") && pixel.pennySize > 10) {
						if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
                        releaseElement(pixel,"blood")
					}
                    else if (elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 5 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        pixel.elemP = hitPixel.element
                        hitPixel.element = "penny_converter"
                        hitPixel.origElem = pixel.elemP
                        hitPixel.pennySize = pixel.pennySize
                        delete pixel.elemP
					}
                    else if (Math.random() > 0.5 && elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 3 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
					}
                    else if (elements[hitPixel.element].movable == true && elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 1 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
					}
                    else if (Math.random() > 0.5 && elements[hitPixel.element].movable == true && elements[hitPixel.element].state != "gas" && elements[hitPixel.element].state != "liquid" && pixel.pennySize > 0 && hitPixel.element != "head_1015" && hitPixel.element != "body" && hitPixel.element != "body" && hitPixel.element != "head" && hitPixel.element != "penny" && hitPixel.element != "scp_1015" && hitPixel.element != "penny_converter") {
                        if (Math.random() < 0.0005) {
                            changePixel(hitPixel,"scp_1015")
                        }
                        else {
						    changePixel(hitPixel,"penny")
                        }
					}
            }
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved) {
				pixel.dir *= -1;
			}
			// homeostasis
			if (pixel.temp > 37) { pixel.temp -= 1; }
			else if (pixel.temp < 37) { pixel.temp += 1; }
            if (pixel.elemP) {
                delete pixel.elemP
            }
            if (Math.random() < 0.05) {
                if (!pixel.pennySize) {
                    pixel.pennySize = 0.5
                }
                else {
                    pixel.pennySize *= 1.1
                }
            }
		}
    },
    onChange: function(pixel) {
		releaseElement(pixel,"scp_1015",1,true)
	},
	onDelete: function(pixel) {
		releaseElement(pixel,"scp_1015",1,true)
	},
}

elements.head_1015 = {
	color: ["#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a"],
    name: "SCP-1015-1",
	category: "scp",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: .05,
	temp: 37,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: ["blood","meat","bone"],
	forceSaveColor: true,
	pickElement: "human",
	reactions: {
		"cancer": { elem1:"cancer", chance:0.005 },
		"radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
		"neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
		"plague": { elem1:"plague", chance:0.05 },
		"oxygen": { elem2:"carbon_dioxide", chance:0.5 },
		"beans": { elem2:[null,null,null,null,null,null,null,null,"stench"], chance:0.2 },
		"sun": { elem1:"cooked_meat" },
		"light": { stain1:"#825043" },
		"bee": { stain1:"#cc564b", chance:0.2 },
		"water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
		"salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
		"pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
		"alcohol": { chance:0.2, attr1:{"panic":0} },
		"anesthesia": { attr1:{"panic":0} },
		"alcohol_gas": { chance:0.2, attr1:{"panic":0} }
	},
	properties: {
		dead: false
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body_1015") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		// check for eating food
		if (body && !pixel.dead && Math.random() < 0.0025) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].isFood && pixelMap[x][y].panic === undefined) {
					deletePixel(x,y);
					break;
				}
			}
		}

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		// homeostasis
		if (pixel.temp > 37) { pixel.temp -= 1; }
		else if (pixel.temp < 37) { pixel.temp += 1; }
	},
	onChange: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	},
	onDelete: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coord = adjacentCoords[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
				pixelMap[x][y].panic += 20;
			}
		}
	}
}

elements.penny_converter = {
	color: ["#F49858","#DE882C","#D9752C","#B15D23","#C16522","#B75C24","#B05B28","#AF6720"],
    name: "penny",
	tick: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coords = adjacentCoords[i];
			var x = pixel.x + coords[0];
			var y = pixel.y + coords[1];
			if (!isEmpty(x,y,true)) {
				var newPixel = pixelMap[x][y]
				if (elements[newPixel.element].id !== elements.penny.id && elements[newPixel.element].id !== elements.scp_1015.id && newPixel.element == pixel.origElem && pixel.pennySize > 1) {
					changePixel(newPixel,"penny_converter")
                    newPixel.origElem = pixel.origElem
                    newPixel.pennySize = (pixel.pennySize-1)
                    if (Math.random() < 0.0005) {
                        changePixel(pixel,"scp_1015")
                    }
                    else {
					    changePixel(pixel,"penny")
                    }
				}
			}
		}
        if (!pixel.pennySize || !pixel.origElem || pixel.pennySize < 2 || (pixel.start + 20) < pixelTicks) {
                    if (Math.random() < 0.0005) {
                        changePixel(pixel,"scp_1015")
                    }
                    else {
					    changePixel(pixel,"penny")
                    }
        }
	},
	category: "special",
	state: "solid",
	density: 600,
	excludeRandom: true
}
/*
elements.scp_1147_1 = {
    color: "#a32d2d",
    behavior: [
		"ST:scp_1147_branch|ST:scp_1147_branch|ST:scp_1147_branch",
		"ST:scp_1147_branch|XX|ST:scp_1147_branch",
		"ST:scp_1147_branch AND M2|ST:scp_1147_branch AND M1|ST:scp_1147_branch AND M2",
	],
    reactions: {
	},
    category:"scp",
    tempHigh: 256,
	stateHigh: "scp_1147_1",
    breakInto: "scp_1147_1",
    state: "solid",
    density: 1050,
}

elements.scp_1147_1 = {
    color: "#291d07",
	burn:50,
	burnTime:20,
	category:"scp",
	state: "solid",
	density: 1400,
	cooldown: defaultCooldown,
	seed: true,
    tick: function(pixel) {
		if (!tryMove(pixel,pixel.x,pixel.y+1)) {
			if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100 && isEmpty(pixel.x, pixel.y-1)) {
				changePixel(pixel,"scp_1147_branch")
                createPixel("scp_1147_branch",pixel.x, pixel.y-1)
                if (isEmpty(pixel.x, pixel.y-2)) {
                    createPixel("scp_1147_branch",pixel.x, pixel.y-2)
                }
			}
			else if (pixel.age > 1000 && Math.random() < 0.05) {
				changePixel(pixel,"scp_1147_branch");
				pixel.color = pixelColorPick(pixel, pixel.wc);
			}
			pixel.age++;
		}
		doDefaults(pixel);
	},
	properties: {
		"age":0
	},
}

elements.scp_1147_branch = {
	name: "scp_1147",
    color: "#a0522d",
	behavior: behaviors.WALL,
	movable: false,
	category: "scp",
	hidden: true,
	state: "solid",
	density: 1500,
	hardness: 0.15,
	seed: "scp_1147_1",
	forceSaveColor: true,
    tick: function(pixel) {
		if (!pixel.burning) {
			if (!pixel.lc) { pixel.lc = "#00bf00" }
			if (!pixel.wc) { pixel.wc = "#a0522d" }
			if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.5) {
                    if (Math.random() > 0.7) {
					    createPixel("scp_1147_1",pixel.x-1,pixel.y-1);
				    }
                    else {
					    createPixel("scp_1147_leaf",pixel.x-1,pixel.y-1);
					    pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("scp_1147_branch",pixel.x-1,pixel.y-1);
					pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x-1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x-1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x+1,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.5) {
                    if (Math.random() > 0.7) {
					    createPixel("scp_1147_1",pixel.x+1,pixel.y-1);
				    }
                    else {
					    createPixel("scp_1147_leaf",pixel.x+1,pixel.y-1);
					    pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("scp_1147_branch",pixel.x+1,pixel.y-1);
					pixelMap[pixel.x+1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x+1][pixel.y-1], pixel.wc);
					pixelMap[pixel.x+1][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x+1][pixel.y-1].lc = pixel.lc;
				}
			}
			if (isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.02) {
				if (Math.random() < 0.75) {
                    if (Math.random() > 0.8) {
					    createPixel("scp_1147_1",pixel.x,pixel.y-1);
				    }
                    else {
					    createPixel("scp_1147_leaf",pixel.x,pixel.y-1);
					    pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.lc);
                    }
				}
				else {
					createPixel("scp_1147_branch",pixel.x,pixel.y-1);
					pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1], pixel.wc);
					pixelMap[pixel.x][pixel.y-1].wc = pixel.wc;
					pixelMap[pixel.x][pixel.y-1].lc = pixel.lc;
				}
			}
		}
		doDefaults(pixel);
	},
}

elements.scp_1147_leaf = {
	name: "scp_1147",
	color: "#00bf00",
	behavior: behaviors.WALL,
	reactions: {
	},
	category:"scp",
	state: "solid",
	density: 1050,
	forceSaveColor: true
} */

elements.scp_1424 = {
	name: "SCP-1424",
    color: ["#E7E7E5","#DCD9D4","#ACACAC"],
    temp: -23,
    properties: {
        dir: 1,
	},
    tick: function(pixel) {
            if (tryMove(pixel, pixel.x, pixel.y+1)) {} // Fall
		    doDefaults(pixel);
            if (Math.random() < 0.05) { // Move 5% chance
			    var movesToTry = [
			    	[1*pixel.dir,0],
			    	[1*pixel.dir,-1],
			    ];
			    let moved = false;
			    // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
    			while (movesToTry.length > 0) {
    				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
    				if (isEmpty(pixel.x+move[0], pixel.y+move[1])) {
    					var origx = pixel.x+move[0];
    					var origy = pixel.y+move[1];
    					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
    						moved = true;
    						break;
    					}
    				}
			    }
			    // 10% chance to change direction
			    if (Math.random() < 0.1 || !moved) {
			    	pixel.dir *= -1;
			    }
		    }
			if (Math.random() > 0.9 && Math.random() > 0.9) {
				releaseElement(pixel,"ammonia",1,true)
			}
			if (pixel.temp > -17) { pixel.temp -= 1; }
			else if (pixel.temp < -22) { pixel.temp += 1; }
    },
    category: "scp",
    density: 1580,
    state: "solid",
    conduct: .025,
	cooldown: defaultCooldown,
}

elements.scp_1600 = {
	name: "SCP-1600-1",
	color: "#D6CE02",
	tick: function(pixel) {
	if (pixel.start === pixelTicks) {return}
	if (pixel.charge && elements[pixel.element].behaviorOn) {
		pixelTick(pixel);
		return;
	}
	var viscMove = true;
	if (elements[pixel.element].viscosity) {
		viscMove = (Math.random()*100) < 100 / Math.pow(elements[pixel.element].viscosity, 0.25);
	}
	if (!viscMove) {
		var move1Spots = [
			0
		]
	}
	else {
		var move1Spots = [
			1,0,-1
		]
	}
	var moved = false;
	for (var i = 0; i < move1Spots.length; i++) {
		const j = Math.random()*move1Spots.length | 0;
		const coord = move1Spots[j];
		if (tryMove(pixel, pixel.x+coord, pixel.y+1)) { moved = true; break; }
		move1Spots.splice(j, 1);
	}
	if (!moved) {
		if (viscMove) {
			if (Math.random() < 0.5) {
				if (!tryMove(pixel, pixel.x+1, pixel.y)) {
					tryMove(pixel, pixel.x-1, pixel.y);
				}
			} else {
				if (!tryMove(pixel, pixel.x-1, pixel.y)) {
					tryMove(pixel, pixel.x+1, pixel.y);
				}
			}
		}
	}
    if (!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
        if (elements[pixelMap[pixel.x][pixel.y-1].element].state != "liquid" && elements[pixelMap[pixel.x][pixel.y-1].element].state != "gas") {
            tryMove(pixel,pixel.x,pixel.y-1)
        }
    }
	doDefaults(pixel);
    },
	onCollide: function(pixelOG,pixel) {
		if (elements[pixel.element].id === elements.scp_1600.id) { return; }
		if (elements.scp_1600.reactions[pixel.element]) { return; }
        if (elements.scp_1600.ignore.indexOf(pixel.element) !== -1) return;
		if (Math.random() < (elements[pixel.element].hardness || 0.25)) { return; }
		if (elements[pixel.element].state !== "liquid" && elements[pixel.element].state !== "gas") {
            var rgb1 = pixel.color.match(/\d+/g);
            var hex1 = RGBToHex(rgb1)
			// average the colors
            if (hex_is_light(hex1) == false) {
                var rgb2 = elements.scp_1600_1.color[1].match(/\d+/g);
            }
            else {
                var rgb2 = elements.scp_1600_1.color[0].match(/\d+/g);
            }
			var avg = [];
			for (var j = 0; j < rgb1.length; j++) {
				avg[j] = Math.floor((rgb1[j]*(1-0.4)) + (rgb2[j]*0.6));
			}
            changePixel(pixel,"scp_1600_1")
			pixel.color = "rgb("+avg.join(",")+")";
		}
	},
    ignore: ["scp_1600_1","gallium","brass","zinc","sulfur","body_173","head_173","shy_body","shy_head","body_049","head_049","scp_035","scp_1015","scp_999","scp_063","scp_055"],
	canPlace: true,
	reactions: {
        "scp_682":{ stain2:"#CA8E2F", chance:0.05,}, 
		"cheese":{ elem2:"scp_1600_1", color2:"#CA8E2F"}, 
        "melted_cheese":{ elem2:"scp_1600_1", color2:"#CA8E2F"},
        "gold":{ elem2:"scp_1600_1", color2:"#FEDF5E"}, 
        "gold_coin":{ elem2:"scp_1600_1", color2:"#FEDF5E"}, 
        "molten_gold":{ elem2:"scp_1600_1", color2:"#FEDF5E"}, 
        "rotten_cheese":{ elem2:"scp_1600_1", color2:["#B6B746","#B6B746","#BBA950","#BBA950","#CE9F4B"]}, 
        "rotten_meat":{ elem2:"scp_1600_1", color2:["#B6B746","#B6B746","#C2995D","#C2995D","#CB7C8E"]}, 
        "mercury":{ elem2:"scp_1600_1", color2:"#393430"}, 
        "solid_mercury":{ elem2:"scp_1600_1", color2:"#393430"},  
        "meat":{ elem2:"scp_1600_1", color2:"#D5975F"}, 
        "skin":{ elem2:"scp_1600_1", color2:"#D5975F"}, 
        "head":{ elem2:"scp_1600_1", color2:"#D5975F"}, 
        "cured_meat":{ elem2:"scp_1600_1", color2:"#D9A256"}, 
        "blood":{ elem2:"scp_1600_1", color2:"#D36324"}, 
        "infection":{ elem2:"scp_1600_1", color2:"#CE4B4A"}, 
	},
	density: 466.51,
	state: "liquid",
	category:"scp",
}

elements.scp_1600_1 = {
    name: "SCP-1600-2",
	color: ["#D8A43C","#A57426"],
	behavior: behaviors.STURDYPOWDER,
	reactions: {
	},
	breakInto: "cheese_powder",
	breakIntoColorMultiplier: [1.1,1,0.86],
	category: "scp",
	state: "solid",
	density: 666.51,
	isFood: true
}
