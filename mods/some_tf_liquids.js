//signalum doesn't require tick function fuckery

elements.destabilized_redstone = {
	color: ["#9e0303", "#98061a", "#b80704", "#c4020c", "#f70008", "#9e0303", "#98061a", "#b80704", "#e3020a", "#8c0303", "#8c0303"],
	behavior: [
		"XX|SH|XX",
		"M2 AND SH|XX|M2 AND SH",
		"M1|M1 AND SH|M1",
	],
	viscosity: 1.5,
	category: "liquids",
	density:1200,
},

elements.signalum = {
	color: "#ff9321",
	behavior: behaviors.WALL,
	category: "solids",
	density: 10500,
	conduct: 1,
	tempHigh: 550,
	stateHigh: "molten_signalum",
},

elements.molten_sterling = {
	reactions: { 
		"destabilized_redstone": { "elem1": null, "elem2": "molten_signalum" },
	}
},

elements.molten_signalum = {
	color: "#f17414",
	behavior: behaviors.MOLTEN,
	density: 10500*0.9,
	conduct: 0.30,
	temp:600,
	tempLow: 550,
	stateLow: "signalum",
	category: "liquids",
	hidden: true,
},

//pyrotheum

elements.blazing_pyrotheum = {
	color: "#ffdd55",
	tick: function(pixel) {
		ddd = Math.random()
		eee = Math.random()
		doHeat(pixel);
		if(ddd < 1/3 && !((Math.random()*100) < 100 / ((pixel.viscosity) ** 0.25))) { //"bottom M1|M1|M1" and viscosity copied from M1 code
			if(tryMove(pixel, pixel.x-1, pixel.y+1)) { mOne = true } else { mOne = false } //left M1
		} else if(ddd < 2/3 && !((Math.random()*100) < 100 / ((pixel.viscosity) ** 0.25))) {
			if(tryMove(pixel, pixel.x, pixel.y+1)) { mOne = true } else { mOne = false }  //middle M1
		} else if(ddd < 3/3 && !((Math.random()*100) < 100 / ((pixel.viscosity) ** 0.25))) {
			if(tryMove(pixel, pixel.x+1, pixel.y+1)) { mOne = true } else { mOne = false }  //right M1
		}
		if(!mOne) { //"middle M2|XX|M2"
			if(eee < 1/2  && !((Math.random()*100) < 100 / ((pixel.viscosity) ** 0.25))) {
				if(tryMove(pixel, pixel.x+1, pixel.y)) { mTwo = true } else { mTwo = false } //left M2
			} else if(eee < 2/2  && !((Math.random()*100) < 100 / ((pixel.viscosity) ** 0.25))) {
				if(tryMove(pixel, pixel.x-1, pixel.y)) { mTwo = true } else { mTwo = false } //right M2
			}
		}
		if(pixel.temp >= -273 && pixel.temp <= 3707) { //temperature minimum of 3727
			pixel.temp += 20
		} else if(pixel.temp > 3717 && pixel.temp < 3727) {
			pixel.temp = 3727
		}
		if(Math.random() < 0.025 && isEmpty(pixel.x,pixel.y-1)) { //"XX|CR:fire%2.5|XX","CR:fire%2.5|XX|CR:fire%2.5","XX|CR:fire%2.5|XX"
			createPixel("fire",pixel.x,pixel.y-1)
		}
		if(Math.random() < 0.025 && isEmpty(pixel.x+1,pixel.y)) {
			createPixel("fire",pixel.x+1,pixel.y)
		}
		if(Math.random() < 0.025 && isEmpty(pixel.x-1,pixel.y)) {
			createPixel("fire",pixel.x-1,pixel.y)
		}
		if(Math.random() < 0.025 && isEmpty(pixel.x,pixel.y+1)) {
			createPixel("fire",pixel.x-1,pixel.y)
		}
		for (let i = -1; i < 2; i++) { //HT:10%2 on whole grid
			for (let j = -1; j < 2; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if(Math.random() < 0.02) {
						pixelMap[pixel.x+j][pixel.y+i].temp += 10
					}
				}
			}
		}
		if(!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if((pixelMap[pixel.x][pixel.y+1]).element == "fire") { //manual swap down with fire since density wouldn't work
				swapPixels(pixelMap[pixel.x][pixel.y],pixelMap[pixel.x][pixel.y+1])
			}
		}
	},
	viscosity: 1.2,
	category: "liquids",
	density:1994,
	insulate:false,
	temp: 3727,
},

elements.gelid_cryotheum = {
	color: "#00ddff",
	tick: function(pixel) {
		ddd = Math.random()
		eee = Math.random()
		doHeat(pixel);
		if(ddd < 1/3 && !((Math.random()*100) < 100 / ((pixel.viscosity) ** 0.25))) { //"bottom M1|M1|M1" and viscosity copied from M1 code
			if(tryMove(pixel, pixel.x-1, pixel.y+1)) { mOne = true } else { mOne = false } //left M1
		} else if(ddd < 2/3 && !((Math.random()*100) < 100 / ((pixel.viscosity) ** 0.25))) {
			if(tryMove(pixel, pixel.x, pixel.y+1)) { mOne = true } else { mOne = false }  //middle M1
		} else if(ddd < 3/3 && !((Math.random()*100) < 100 / ((pixel.viscosity) ** 0.25))) {
			if(tryMove(pixel, pixel.x+1, pixel.y+1)) { mOne = true } else { mOne = false }  //right M1
		}
		if(!mOne) { //"middle M2|XX|M2"
			if(eee < 1/2  && !((Math.random()*100) < 100 / ((pixel.viscosity) ** 0.25))) {
				if(tryMove(pixel, pixel.x+1, pixel.y)) { mTwo = true } else { mTwo = false } //left M2
			} else if(eee < 2/2  && !((Math.random()*100) < 100 / ((pixel.viscosity) ** 0.25))) {
				if(tryMove(pixel, pixel.x-1, pixel.y)) { mTwo = true } else { mTwo = false } //right M2
			}
		}
		if(pixel.temp >= -243) { //temperature maximum of -223
			pixel.temp -= 20
		} else if(pixel.temp > -223 && pixel.temp < -243) {
			pixel.temp = -223
		}
		if(Math.random() < 0.01 && isEmpty(pixel.x-1,pixel.y-1)) { //"CR:snow%1|XX|CR:snow%0.35","CR:snow%0.35|XX|CR:snow%0.35","XX|CR:snow%0.35|XX"
			createPixel("snow",pixel.x-1,pixel.y-1)
		}
		if(Math.random() < 0.0035 && isEmpty(pixel.x+1,pixel.y-1)) {
			createPixel("snow",pixel.x+1,pixel.y-1)
		}
		if(Math.random() < 0.0035 && isEmpty(pixel.x-1,pixel.y)) { //
			createPixel("snow",pixel.x-1,pixel.y)
		}
		if(Math.random() < 0.0035 && isEmpty(pixel.x+1,pixel.y)) {
			createPixel("snow",pixel.x+1,pixel.y)
		}
		if(Math.random() < 0.0035 && isEmpty(pixel.x,pixel.y+1)) {
			createPixel("snow",pixel.x+1,pixel.y)
		}
		for (let i = -1; i < 2; i++) { //CO:10%2 on whole grid
			for (let j = -1; j < 2; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if(Math.random() < 0.02) {
						pixelMap[pixel.x+j][pixel.y+i].temp -= 10
					}
				}
			}
		}
		if(!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
			if((pixelMap[pixel.x][pixel.y-1]).element == "snow") { //manual swap up with snow
				swapPixels(pixelMap[pixel.x][pixel.y],pixelMap[pixel.x][pixel.y-1])
			}
		}
	},
	viscosity: 3,
	category: "liquids",
	density:3988,
	insulate:false,
	temp: -223,
},

elements.tectonic_petrotheum = {
	color: ["#342414","#3C2414","#2C1C14","#543424","#643C28","#74442C"],
	behavior: [
		"XX|XX|XX",
		"M2|XX|M2",
		"M1|M1|M1",
	],
	reactions: {
		"rock": { "elem2": "gravel" },
		"mudstone": { "elem2": "mud" },     //i took creative liberties with what it breaks :eggTF:
		"packed_sand": { "elem2": "sand" }, //stone->gravel is explicitly shown and chalcopyrite_ore->
		"ice": { "elem2": "snow" },         //chalcopyrite_dust is implied, the rest of this section
		"packed_snow": { "elem2": "snow" }, //isn't thermal foundation canon*/
		"basalt": { "elem2": "basalt_gravel" },
		"limestone": { "elem2": "limestone_gravel" },
		"concrete": { "elem2": "dust" },
		"brick": { "elem2": "brick_rubble" },
		"wood": { "elem2": "sawdust" },
		"glass": { "elem2": "glass_shard" },
		"ruins": { "elem2": "dust" },
		"chalcopyrite_ore": { "elem2": "chalcopyrite_dust" }
	},
	temp: 120,
	viscosity: 1.5,
	category: "liquids",
	density:3988,
	insulate:false,
},

elements.basalt_gravel = {
	color: ["#4d4c4c", "#42403f", "#333130", "#36322f"],
	behavior: behaviors.POWDER,
	tempHigh: 1262.5,
	stateHigh: "magma",
	category: "land",
	state: "solid",
	density: 1975,
	hardness: 0.26,
},

elements.limestone_gravel = {
	color: ["#c7baa1", "#e8d8b7", "#fcf3d7", "#fffce6"],
	behavior: behaviors.POWDER,
    tempHigh: 825,
    stateHigh: "quicklime",
    category: "land",
    state: "solid",
    density: 1380,
    hardness: 0.16,
    breakInto: ["quicklime","calcium","dust"],
}

if(!Array.isArray(elements.basalt.breakInto)) {
	tempArray = []
	tempArray.push(elements.basalt.breakInto)
	elements.basalt.breakInto = tempArray
}

elements.basalt.breakInto.push("basalt_gravel")
elements.limestone.breakInto.push("limestone_gravel")
elements.limestone.breakInto.push("limestone_gravel")

elements.worm.reactions.limestone_gravel = { "elem2":"calcium", "chance":0.1 },
elements.acid.reactions.limestone_gravel = { "elem1":"neutral_acid", "elem2":null },

elements.zephyrean_aerotheum = {
	color: ["#FFFCD9","#FEFFFC","#FDFFDB","#FFFFE8","#FBF6D3","#F1EDD0"],
	behavior: behaviors.AGLIQUID,
	viscosity: 0.1,
	category: "liquids",
	density:-797.6,
	insulate:false,
},

elements.energized_glowstone = {
	color: ["#fbb204", "#fcf605", "#fce704", "#f8c414", "#f8e814"],
	behavior: [
		"M1 AND SW:light|M1 AND CR:light%40 AND SW:light|M1 AND SW:light",
		"M2 AND CR:light%40|XX|M2 AND CR:light%40",
		"XX|CR:light%40|XX",
	],
	viscosity: 0.1,
	category: "liquids",
	density:-797.6,
	insulate:false,
}

//no resonant ender (yet?)