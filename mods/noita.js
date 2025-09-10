function isASecond(number) {
    if (number % 30 === 0 || number % 29 === 0 || number % 31 === 0) {
        return true;
    } else {
        return false;
    }
}

doNHeat = function(pixel) {
	// Check right and bottom adjacent pixels
	for (var i = 0; i < biCoords.length; i++) {
		var x = pixel.x+biCoords[i][0];
		var y = pixel.y+biCoords[i][1];
		if (!isEmpty(x,y,true)) {
			var newPixel = pixelMap[x][y];
			// Skip if both temperatures are the same
			if (pixel.temp === newPixel.temp || elements[newPixel.element].insulate === true) {
				continue;
			}
			// Set both pixel temperatures to their average
			var avg = (pixel.temp + newPixel.temp)/2;
			pixel.temp = avg;
			newPixel.temp = avg;
			pixelTempCheck(pixel);
			pixelTempCheck(newPixel);
		}
	}
}

doNBurning = function(pixel) {
    if (pixel.NBurning) { // Burning
        if (pixel.NBurnStart === undefined) { pixel.NBurnStart = pixelTicks }
        var info = elements[pixel.element];
        if (pixel.temp < -50) {
            pixel.NBurning = undefined;
            pixel.NBurnStart = undefined;
            return;
        }
        for (var i = 0; i < adjacentCoords.length; i++) { // Burn adjacent pixels
            var x = pixel.x+adjacentCoords[i][0];
            var y = pixel.y+adjacentCoords[i][1];
            if (!isEmpty(x,y,true)) {
				var newPixel = pixelMap[x][y]
				if (elements[newPixel.element].burnable === true && elements[newPixel.element].nburnTime === true && Math.random() > 0.8) {
					newPixel.NBurning = true
				}
				else if (elements[newPixel.element].burnableFast === true && Math.random() > 0.25) {
					changePixel(newPixel,"noita_fire")
					newPixel.NBurning = true
				}
            }
        }

        if ((pixelTicks - pixel.NBurnStart > (info.nburnTime || 200)) && Math.floor(Math.random()*100)<(info.nburn || 10) && !(info.nburnTime === undefined && info.hardness >= 1)) {
            if (elements[pixel.element].nburnInto !== undefined) {
				if (Math.random() > 0.5) {
					deletePixel(pixel.x,pixel.y)
				}
				else {
					changePixel(pixel,elements[pixel.element].nburnInto);
				}
			}
			else {
				changePixel(pixel,"noita_fire");
				pixel.NBurning = true;
			}
        }
        else if (Math.floor(Math.random()*100)<10 && info.id !== elements.noita_fire.id) { // Spawn fire
            if (isEmpty(pixel.x,pixel.y-1)) {
				createPixel(("noita_fire"),pixel.x,pixel.y-1);
				pixelMap[pixel.x][pixel.y-1].temp = pixel.temp//+(pixelTicks - (pixel.burnStart || 0));
				pixelMap[pixel.x][pixel.y-1].NBurning = true
			}
			// same for below if top is blocked
			else if (isEmpty(pixel.x,pixel.y+1)) {
				createPixel(("noita_fire"),pixel.x,pixel.y+1);
				pixelMap[pixel.x][pixel.y+1].temp = pixel.temp//+(pixelTicks - (pixel.burnStart || 0));
				pixelMap[pixel.x][pixel.y+1].NBurning = true
			}
        }

    }
}

NExplode = function(x,y,radius,damage,fire="noita_fire") {
			// if fire contains , split it into an array
			if (fire.indexOf(",") !== -1) {
				fire = fire.split(",");
			}
			var coords = circleCoords(x,y,radius);
			var power = radius/10;
			//for (var p = 0; p < Math.round(radius/10+1); p++) {
			for (var i = 0; i < coords.length; i++) {
				if (isEmpty(coords[i].x,coords[i].y)) {
					// if fire is an array, choose a random item
					if (Array.isArray(fire)) {
						createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
					}
					else {
						createPixel(fire,coords[i].x,coords[i].y);
					}
				}
				else if (!outOfBounds(coords[i].x,coords[i].y)) {
					// damage the pixel
					var pixel = pixelMap[coords[i].x][coords[i].y];
					var info = elements[pixel.element];
					if (pixel.hp) { // lower hp
						DoDamage(pixel,"explosion",damage)
						var damaged = true
					}
					if (info.hardness && damaged != true) { // lower damage depending on hardness(0-1)
						if (info.hardness < 1) {
							// more hardness = less damage, logarithmic
							damage *= Math.pow((1-info.hardness),info.hardness);
						}
						else { damage = 0; }
					}
					if (damage > 0.9 && damaged != true) {
						if (Array.isArray(fire)) {
							var newfire = fire[Math.floor(Math.random() * fire.length)];
						}
						else {
							var newfire = fire;
						}
						changePixel(pixel,newfire);
						continue;
					}
					else if (damage > 0.25 && damaged != true) {
						if (isBreakable(pixel)) {
							breakPixel(pixel);
							continue;
						}
						else {
							if (Array.isArray(fire)) {
								var newfire = fire[Math.floor(Math.random() * fire.length)];
							}
							else {
								var newfire = fire;
							}
							if (elements[pixel.element].onBreak !== undefined) {
								elements[pixel.element].onBreak(pixel);
							}
							changePixel(pixel,newfire);
							continue;
				}
			}
		}
	}
}

DoDamage = function(pixel,type,damage,damageMultiplier={ "melee": 1, "projectile": 1, "explosion": 1, "fire": 1, "electricity": 1, "drill": 1, "slice": 1, "ice": 1, "healing": 1, "radioactive": 1, "poison": 1, "curse": 1, "holy": 1, "material": 1 }) {
	if (pixel.immunities[type] != true) {
		pixel.hp = (pixel.hp - (damage * damageMultiplier[type]))
	}
}

DoNoitaCreature = function(pixel) {
	if (!pixel.stains) {
		pixel.stains = []
	}
	if (pixel.stains.wet && isASecond(pixelTicks)) { 
		if ((pixel.stains.wet[1] + pixel.stains.wet[0]) < pixelTicks) { 
			delete pixel.stains.wet
		}
	}
	if (pixel.stains.bloody && isASecond(pixelTicks)) { 
		if ((pixel.stains.bloody[1] + pixel.stains.bloody[0]) < pixelTicks) { 
			delete pixel.stains.bloody
		}
	}
	if (pixel.stains.onFire && isASecond(pixelTicks)) { 
		if (pixel.stains.wet || pixel.stains.bloody) {
			if (pixel.stains.onFire) {
				delete pixel.onFire
			}
			if (pixel.stains.wet[1]) {
				pixel.stains.wet[1] -= 10
			}
			else if (pixel.stains.bloody[1]) {
				pixel.stains.bloody[1] -= 10
			}
		}
		DoDamage(pixel,"fire",(Math.ceil(pixel.maxhp / 50)))
		pixel.panic++
		if ((pixel.stains.onFire[1] + pixel.stains.onFire[0]) < pixelTicks) { 
			delete pixel.stains.onFire
		}
	}
	if (pixel.stains.poisoned && isASecond(pixelTicks)) { 
		DoDamage(pixel,"poison",(Math.ceil(pixel.maxhp / 50)))
		pixel.panic++
		if ((pixel.stains.poisoned[1] + pixel.stains.poisoned[0]) < pixelTicks) { 
			delete pixel.stains.poisoned
		}
	}
	if (pixel.stains.teleportitis && isASecond(pixelTicks)) { 
		var x = Math.floor(Math.random()*(width))+1;
		var y = Math.floor(Math.random()*(height))+1;
		if (isEmpty(x,y)) {
			tryMove(pixel,x,y)
		}
		pixel.panic++
		if ((pixel.stains.teleportitis[1] + pixel.stains.teleportitis[0]) < pixelTicks) { 
			delete pixel.stains.teleportitis
		}
	}
	if (!pixel.immunities) {
		pixel.immunities = { "melee": false, "projectile": false, "explosion": false, "fire": false, "electricity": false, "drill": false, "slice": false, "ice": false, "healing": false, "radioactive": false, "poison": false, "curse": false, "holy": false, "material": false }
	}
}

DoNoitaHumanoid = function(pixel) {
	if (!pixel.stains) {
		pixel.stains = []
	}
	if (pixel.stains.wet && isASecond(pixelTicks)) { 
		if ((pixel.stains.wet[1] + pixel.stains.wet[0]) < pixelTicks) { 
			delete pixel.stains.wet
		}
	}
	if (pixel.stains.bloody && isASecond(pixelTicks)) { 
		if ((pixel.stains.bloody[1] + pixel.stains.bloody[0]) < pixelTicks) { 
			delete pixel.stains.bloody
		}
	}
	if (pixel.stains.onFire && isASecond(pixelTicks)) { 
		if (pixel.stains.wet || pixel.stains.bloody) {
			if (pixel.stains.onFire) {
				delete pixel.onFire
			}
			if (pixel.stains.wet[1]) {
				pixel.stains.wet[1] -= 10
			}
			else if (pixel.stains.bloody[1]) {
				pixel.stains.bloody[1] -= 10
			}
		}
		DoDamage(pixel,"fire",(Math.ceil(pixel.maxhp / 50)))
		pixel.panic++
		if ((pixel.stains.onFire[1] + pixel.stains.onFire[0]) < pixelTicks) { 
			delete pixel.stains.onFire
		}
	}
	if (pixel.stains.poisoned && isASecond(pixelTicks)) { 
		DoDamage(pixel,"poison",(Math.ceil(pixel.maxhp / 50)))
		pixel.panic++
		if ((pixel.stains.poisoned[1] + pixel.stains.poisoned[0]) < pixelTicks) { 
			delete pixel.stains.poisoned
		}
	}
	if (pixel.stains.teleportitis && isASecond(pixelTicks)) { 
		var x = Math.floor(Math.random()*(width))+1;
		var y = Math.floor(Math.random()*(height))+1;
		if (isEmpty(x,y) && isEmpty(x,y-1)) {
			tryMove(pixel,x,y)
			if (pixel.head)
			tryMove(pixel.head,x,y-1)
		}
		pixel.panic++
		if ((pixel.stains.teleportitis[1] + pixel.stains.teleportitis[0]) < pixelTicks) { 
			delete pixel.stains.teleportitis
		}
	}
	if (!pixel.immunities) {
		pixel.immunities = { "melee": false, "projectile": false, "explosion": false, "fire": false, "electricity": false, "drill": false, "slice": false, "ice": false, "healing": false, "radioactive": false, "poison": false, "curse": false, "holy": false, "material": false }
	}
}

DoNoitaStaining = function(pixel,damagePixel) {
	if (elements[damagePixel.element].id === elements.noita_acid.id) {
		DoDamage(pixel,"material",750)
	}
	else if (elements[damagePixel.element].id === elements.lava.id) {
		DoDamage(pixel,"material",450)
		if (!pixel.stains.onFire) {
			pixel.stains.onFire = [pixelTicks,1000]
		}
	}
	else if (elements[damagePixel.element].id === elements.noita_fire.id) {
		if (!pixel.stains.onFire) {
			pixel.stains.onFire = [pixelTicks,1000]
		}
	}
	else if (elements[damagePixel.element].id === elements.noita_poison.id) {
		if (!pixel.stains.poisoned) {
			pixel.stains.poisoned = [pixelTicks,1000]
		}
	}
	else if ((elements[damagePixel.element].id === elements.noita_mud.id || elements[damagePixel.element].id === elements.noita_water.id || elements[damagePixel.element].id === elements.brine.id)) {
		for (i = 0; i < pixel.stains.length; i++) {
			if (pixel.stains[i] != pixel.stains.wet) {
				delete pixel.stains[i]
			}
		}
		if (!pixel.stains.wet) {
			pixel.stains.wet = [pixelTicks,1000]
		}
	}
	else if (elements[damagePixel.element].id === elements.noita_blood.id) {
		if (!pixel.stains.bloody) {
			pixel.stains.bloody = [pixelTicks,1000]
		}
	}
	else if (elements[damagePixel.element].id === elements.healthium.id) {
		pixel.hp += 100
		if (!pixel.stains.regeneration) {
			pixel.stains.regeneration = [pixelTicks,1000]
		}
	}
	else if (elements[damagePixel.element].id === elements.teleportatium.id || elements[damagePixel.element].id === elements.unstable_teleportatium.id) {
		if (!pixel.stains.teleportitis) {
			pixel.stains.teleportitis = [pixelTicks,1000]
		}
	}
	if (elements[damagePixel.element].state === "liquid") {
		for (i = 0; i < pixel.stains.length; i++) {
			if (pixel.stains[i] == pixel.stains.onFire) {
				delete pixel.stains[i]
			}
		}
	}
}

requiresAir = function(pixel) {
	if (!isEmpty(pixel.x,pixel.y-1) && !isEmpty(pixel.x,pixel.y+1) && !isEmpty(pixel.x-1,pixel.y) && !isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.85) {
		var neighbors = getNeighbors(pixel)
		for (i = 0; i < neighbors.length; i++) {
			if (elements[neighbors[i].element].living) {
				var organism = true
			}
		}
		if (!organism) {
			changePixel(pixel,"soil")
		}
	}
}

textures.BRICKWORK = [ // bricky squary minecraftey
"ssssssssgsgwgsssgsssssswggggssss",
"gggsgggsgsgwgswwsgwwwwswggggswgg",
"sggsgggsggwwgswgswggggsgggggsgss",
"gwgsgggsgggggswwswggggssssgssgsw",
"gwggssssssssssssswggggswwwwwsgsw",
"wwgswwwwwgggggggswggggswwwwgsggw",
"gggswwwwwgggggggswggggsgwwwgsggg",
"sssssgssssssssssswggggsssssswsss",
"gggwgsggggggggggswggggsggggggggg",
"gggggsgwwgggggggsgggggsgggssssss",
"wggggsgwwggggggggsssssgwggsggggg",
"wggggsggggggggggsgggggsgggsggggg",
"wggggsggggggggggsgwgggsgggsggggg",
"wgssssssgssssssssgggggsgggsggggg",
"wgsgggggswggggggssssssgssggwwwww",
"ggsgggggsggwwggggsggggggsggggggg",
"sssssssssggwwggggsggggggsssgssss",
"wwwwswwwsggggggggswwggggwggswwsw",
"wwwwswwwsgggggsssgsssssssssswwsw",
"wwwwsgggsggggswwwwsgggggggggsssw",
"wwwwsgggsggggswwwwsggwwgggggggsw",
"wwwwsggssssssswwwwsggwwgggggggsw",
"ssssgssswggggswwwwsgggggggggggss",
"wggggggsgggggsssssssssssssssssss",
"gggggggsgggggsgwwwwwwwgsggggswgs",
"gggggggsgggggswggggggggsggggsggs",
"gggggggsggggsswggggggggsggggsggs",
"ggggggggsssssswggggggggsggggssss",
"gggggggswwwggswggggggggswgggswws",
"ggwgwwgsgssggswggggggggsssssswws",
"ggggwwgsgsgwgswgggggggsgwwwgswws",
"gggggggsgsgwgsggggggggswggggswws",
]

textures.ALTGROUND = [ // groundy and dirt alt
"Sgsssgssggssggg",
"ggsssgggggsggss",
"ggssSgggsggggsS",
"ssggggsggggsggg",
"sSggsgggssggggs",
"ggggggggsggssgg",
"ssgggssggggsSgg",
"ssgsgsSggsggggg",
"sSggggggggggssg",
"ggggssgsgssgsgg",
"ggsgsggggsggggg",
"gggggggggggggsg",
"ssgggsgsssgsggg",
"sggsgggsssggggs",
"ggggssgssSgssgs",
]

textures.GROUND = [ // groundy and dirt
	"sggggggggs",
	"ggsgssgggg",
	"ggggssgggg",
	"ssggggggsg",
	"ssgssggggg",
	"gggssggggg",
	"ggggggsggg",
	"gssggggggg",
	"gssggggggg",
	"gggggggggs",
]

textures.WOOD = [ // planks
	"gsgsgggggggggggggggggggggggggggggggggggggg",
	"gsgggggggggggggggggggggggggggggggggggggggg",
	"ssssssssssssssssssssssssssssssssssssssssss",
	"SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSsSSSSSSSSSSS",
	"gggggggggggggggggggggggggggsggsggggggggggg",
	"gggggggggggggggggggggggggggggssggggggggggg",
	"ssssssssssssssssssssssssssssssssssssssssss",
	"SSSSSSSSSSSSSSSSSssSSSSSSSSSSSSSSSSSSSSSSS",
	"gggggggggggggggggssggggggggggggggggggggggg",
	"ggggggggggggggggggsggggggggggggggggggggggg",
	"ssssssssssssssssssssssssssssssssssssssssss",
	"SSsSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
	"sgsggggggggggggggggggggggggggggggggggggggg",
	"ggsggggggggggggggggggsgggggggggggggggggggg",
	"ssssssssssssssssssssssssssssssssssssssssss",
	"ggggggggggggggggggsggggggggggggggggggsgggg",
	"ggggggggggggggggggsggggggggggggggggggsgggg",
	"ssssssssssssssssssssssssssssssssssssssssss",
	"SSSSSSSSSsSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
	"gggggggggsgggggggggggggggggggggggggggggggg",
	"gggggggggsgggggggggggggggggggggggggggggggg",
	"ssssssssssssssssssssssssssssssssssssssssss",
	"sssSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
	"gsgggggggggggggggggggggggggggggggggggggggg",
	"gsgggggggggggggggggggggggggggggggggggggggg",
	"ssssssssssssssssssssssssssssssssssssssssss",
	"SsSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
]

textures.STEEL = [ // boxy panels
	"ggwwgggggGgggwgsgggw",
	"wwgsgggggGgggggsgggw",
	"wgwggggggGgggggsgggg",
	"swwggggggGggwwgsgggg",
	"swwggggggGgggwgsgwgg",
	"wggggwgggGgggwgsgwgg",
	"wggggggggGggwwwsgwgg",
	"gggwgggggGggwwwsgwgg",
	"gwwwgggggGggwswswwwg",
	"gwgggggggGgwwwwswggg",
	"gggggggGgGggwgssgssg",
	"ggggggsggGggwgwsgssgg",
	"gggggggggGggwgwsgggg",
	"sssssssssgggggwsssss",
	"gggggggggggggswggggg",
	"wgggggggggggwwwggggg",
	"ggGGGGGGgggwwGGggggg",
	"gsgggggGgggwsgGggggg",
	"gsgggGgGggwgssgggggg",
	"gsgggggGggwwwggwgwgg",
	"gsgsgggGgwwgwggwwwgg",
	"gsgggggGgggwsggwwwgg",
	"gssssssgggwwggwgwggg",
	"ggggggggwwwwggwgwggg",
	"gggggswwwsgggggggggg",
	"GGGGGGGGGGggwwggGGGG",
	"gggggggggGgwwwgsggww",
]

textures.STATICSHINE = [ // diagonalish stripes
	"gwgssgGs",
	"sgwgssgG",
	"Gsgwgssg",
	"gGsgwgss",
	"sgGsgwgs",
	"ssgGsgwg",
	"gssgGsgw",
	"wgssgGsg",
]

elements.ground = {
	color: ["#464128","#464128","#5f5731","#464128"],
	colorPattern: textures.GROUND,
	colorKey: {
		"g": "#464128",
		"s": "#5f5731",
	},
	grain:0.25,
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "lava",
	category: "land",
	state: "solid",
	density: 10000,
	hardness: 0.5,
	breakInto: "noita_sand",
	corrodible: true,
	static: true,
	earth: true,
	meltableLava: true,
}

elements.noita_rock = {
	color: ["#27282d","#27282d","#3e4555","#27282d"],
	colorPattern: textures.GROUND,
	colorKey: {
		"g": "#27282d",
		"s": "#3e4555",
	},
	tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.99 && (pixel.start + 25) < pixelTicks) {
			createPixel("moss",pixel.x+1,pixel.y)
			pixelMap[pixel.x+1][pixel.y].settled = true
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.99 && (pixel.start + 25) < pixelTicks) {
			createPixel("moss",pixel.x-1,pixel.y)
			pixelMap[pixel.x-1][pixel.y].settled = true
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.99 && (pixel.start + 25) < pixelTicks) {
			createPixel("moss",pixel.x,pixel.y+1)
			pixelMap[pixel.x][pixel.y+1].settled = true
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.99 && (pixel.start + 25) < pixelTicks) {
			createPixel("moss",pixel.x,pixel.y-1)
			pixelMap[pixel.x][pixel.y-1].settled = true
		}
		doDefaults(pixel);
	},
	movable: false,
	grain:0.25,
	name: "rock",
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "lava",
	category: "land",
	state: "solid",
	density: 10000,
	hardness: 0.5,
	corrodible: true,
	static: true,
	earth: true,
	meltableLava: true,
}

elements.volcanic_rock = {
	color: ["#441e1f","#441e1f","#5f2621","#441e1f"],
	colorPattern: textures.ALTGROUND,
	colorKey: {
		"g": "#441e1f",
		"s": "#5f2621",
		"S": "#52201c",
	},
	grain:0.25,
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "lava",
	category: "land",
	state: "solid",
	density: 10000,
	hardness: 0.5,
	corrodible: true,
	static: true,
	earth: true,
	meltableLava: true,
}

elements.fools_gold = {
	color: ["#ffef42","#ffef42","#ffff86","#ffef42"],
	name: "fool's gold",
	colorPattern: textures.BRICKWORK,
	colorKey: {
		"g": "#ffef42",
		"s": "#ffb81b",
		"S": "#bb8632",
		"w": "#ffff86"
	},
	grain:0.1,
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "lava",
	category: "land",
	state: "solid",
	density: 10000,
	hardness: 0.5,
	corrodible: true,
	static: true,
	earth: true,
	meltableLava: true,
}

elements.glowing_matter = {
	color: ["#234630","#234630","#3b6e53","#234630"],
	colorPattern: textures.GROUND,
	colorKey: {
		"g": "#234630",
		"s": "#3b6e53",
	},
	tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.9 && (pixel.start + 25) < pixelTicks) {
			createPixel("green_slime",pixel.x+1,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.9 && (pixel.start + 25) < pixelTicks) {
			createPixel("green_slime",pixel.x-1,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.9 && (pixel.start + 25) < pixelTicks) {
			createPixel("green_slime",pixel.x,pixel.y+1)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.9 && (pixel.start + 25) < pixelTicks) {
			createPixel("green_slime",pixel.x,pixel.y-1)
		}
		doDefaults(pixel);
	},
	movable: false,
	grain:0.25,
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "lava",
	category: "land",
	state: "solid",
	density: 10000,
	hardness: 0.5,
	corrodible: true,
	static: true,
	earth: true,
	meltableLava: true,
}

elements.poisonous_rock = {
	color: ["#662e83","#662e83","#8b45ac","#662e83"],
	colorPattern: textures.GROUND,
	colorKey: {
		"g": "#662e83",
		"s": "#8b45ac",
	},
	grain:0.25,
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "lava",
	category: "land",
	state: "solid",
	density: 10000,
	hardness: 0.5,
	corrodible: true,
	static: true,
	earth: true,
	meltableLava: true,
}

elements.grey_rock = {
	color: ["#4e4e4e","#545454","#616161","#464646"],
	colorPattern: textures.GROUND,
	colorKey: {
		"g": "#4e4e4e",
		"s": "#616161",
	},
	grain:0.3,
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "lava",
	category: "land",
	state: "solid",
	density: 10000,
	hardness: 0.5,
	corrodible: true,
	static: true,
	earth: true,
	meltableLava: true,
}


elements.dense_rock = {
	color: ["#37221d","#37221d","#623b32","#37221d"],
	colorPattern: textures.GROUND,
	colorKey: {
		"g": "#37221d",
		"s": "#623b32",
	},
	grain:0.25,
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "lava",
	category: "land",
	state: "solid",
	density: 2550,
	hardness: 0.9,
	static: true,
	earth: true,
}

elements.extremely_dense_rock = {
	color: ["#251511","#251511","#40231c","#251511"],
	colorPattern: textures.GROUND,
	colorKey: {
		"g": "#251511",
		"s": "#40231c",
	},
	grain:0.25,
	behavior: behaviors.WALL,
	reactions: {
	},
	category: "land",
	state: "solid",
	density: 2550,
	hardness: 0.995,
	static: true,
	earth: true,
}

elements.brickwork = {
	color: ["#514a31","#514a31","#403a29","#514a31"],
	colorPattern: textures.BRICKWORK,
	colorKey: {
		"g": "#514a31",
		"s": "#403a29",
		"S": "#59533b",
		"w": "#59533b",
	},
	grain:0.15,
	behavior: behaviors.WALL,
	reactions: {
	},
	category: "solids",
	state: "solid",
	density: 2550,
	hardness: 0.95,
	static: true,
	earth: true,
	corrodible: true
}

elements.noita_wood = {
	color: ["#433821","#564832","#322b18","#473c23","#473c23","#473c23","#473c23","#564832","#433821"],
	colorPattern: textures.WOOD,
	colorKey: {
		"g": "#473c23",
		"s": "#322b18",
		"S": "#564832",
	},
	renderer: function(pixel,ctx) {
		if (!viewInfo[view].colorEffects) { drawDefault(ctx,pixel); return }
		if (pixel.alpha === 0) return;
		let edge1 = false;
		let edge2 = false;
		let edge3 = false;
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coords = adjacentCoords[i];
			var x = pixel.x + coords[0];
			var y = pixel.y;
			if (isEmpty(x,y) || (!outOfBounds(x,y) && elements[pixelMap[x][y].element].movable !== elements[pixel.element].movable)) {
				edge1 = true;
				break;
			}
		}
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coords = adjacentCoords[i];
			var x = pixel.x + coords[0];
			var y = pixel.y;
			if ((isEmpty(x-1,y) || isEmpty(x+1,y)) || (!outOfBounds(x-1,y) && elements[pixelMap[x-1][y].element].movable !== elements[pixel.element].movable) || (!outOfBounds(x+1,y) && elements[pixelMap[x+1][y].element].movable !== elements[pixel.element].movable)) {
				edge2 = true;
				break;
			}
		}
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coords = adjacentCoords[i];
			var x = pixel.x + coords[0];
			var y = pixel.y;
			if (isEmpty(x-2,y) || isEmpty(x+2,y) || (!outOfBounds(x-2,y) && elements[pixelMap[x-2][y].element].movable !== elements[pixel.element].movable) || (!outOfBounds(x+2,y) && elements[pixelMap[x+2][y].element].movable !== elements[pixel.element].movable)) {
				edge3 = true;
				break;
			}
		}
		if (edge1) { drawSquare(ctx,"#302917",pixel.x,pixel.y) }
		else if (edge2) { drawSquare(ctx,"#433821",pixel.x,pixel.y) }
		else if (edge3) { drawSquare(ctx,"#302917",pixel.x,pixel.y) }
		else { drawSquare(ctx,pixel.color,pixel.x,pixel.y) }
	},
	grain:0.5,
	name: "wood",
	behavior: behaviors.WALL,
	movable: false,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "noita_fire",
	category: "solids",
	burn: 5,
	burnTime: 300,
	burnInto: ["ember","charcoal","noita_fire"],
	burnable: true,
	nburnTime: 300,
	tick: function(pixel) {
        doNHeat(pixel)
        doNBurning(pixel)
	},
	state: "solid",
	hardness: 0.2,
	breakInto: "sawdust",
	forceSaveColor: true,
	corrodible: true,
	static: true,
}

elements.noita_sand = {
	color: ["#c4b999","#c0b287","#baa565","#b59843","#c7c1ad"],
	name: "sand",
	behavior: behaviors.POWDER,
	tempHigh: 1500,
	stateHigh: "lava",
	reactions: {
		"mystery_fungus": { elem2:"mystery_fungus", chance:0.45 },
	},
	category: "powders",
	state: "solid",
	density: 6000,
	hardness: 0.2,
	corrodible: true,
	sandGround: true,
	meltableLavaFast: true,
}

elements.noita_water = {
	color: "#366158",
    name: "water",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && (elements[pixelMap[x][y].element].fire === true)) {
                    changePixel(pixel,"noita_steam")
                }
				else if (!outOfBounds(x,y) && elements[pixelMap[x][y].element].id === elements.lava.id) {
                    changePixel(pixel,"noita_steam")
					changePixel(pixelMap[x][y],"noita_rock")
                }
			}
		}
	},
	tempHigh: 150,
	stateHigh: "noita_steam",
	tempLow: 0,
	stateLow: "noita_ice",
	category: "liquids",
	reactions: {
		"fire": { elem1: "noita_steam" },
		"noita_fire": { elem1: "noita_steam" },
	},
	state: "liquid",
	density: 4000,
	conduct: 0.02,
	stain: -0.5,
	extinguish: true,
	corrodible: true,
	water: true,
	freezable: true,
}

elements.peat = {
	color: ["#6e8c3b","#617d3c"],
	behavior: behaviors.LIQUID,
	burnable: true,
	nburnTime: 35,
	tick: function(pixel) {
        doNHeat(pixel)
        doNBurning(pixel)
		doDefaults(pixel)
	},
	viscosity: 100,
	tempHigh: 150,
	stateHigh: "noita_fire",
	category: "liquids",
	reactions: {
	},
	state: "liquid",
	density: 3400,
	extinguish: true,
	corrodible: true,
	impure: true,
	plant: true,
}

elements.swamp = {
	color: ["#2f2f0a","#272707"],
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && (elements[pixelMap[x][y].element].fire === true)) {
                    changePixel(pixel,"noita_steam")
                }
				else if (!outOfBounds(x,y) && elements[pixelMap[x][y].element].id === elements.lava.id) {
                    changePixel(pixel,"noita_steam")
					changePixel(pixelMap[x][y],"noita_rock")
                }
			}
		}
	},
	viscosity: 100,
	tempHigh: 150,
	stateHigh: "noita_steam",
	tempLow: 0,
	stateLow: "noita_ice",
	category: "liquids",
	reactions: {
		"fire": { elem1: "noita_steam" },
		"noita_fire": { elem1: "noita_steam" },
		"toxic_sludge": { elem2:"swamp_water", chance:0.15 },
		"noita_water": { elem2:"swamp_water", chance:0.01 },
	},
	state: "liquid",
	density: 3500,
	conduct: 0.02,
	stain: -0.5,
	meltableWater: true,
	extinguish: true,
	corrodible: true,
	water: true,
	freezable: true,
	soluble: true,
	impure: true,
}

elements.swamp_water = {
	color: "#2e542c",
    name: "swamp",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && (elements[pixelMap[x][y].element].fire === true)) {
                    changePixel(pixel,"noita_steam")
                }
				else if (!outOfBounds(x,y) && elements[pixelMap[x][y].element].id === elements.lava.id) {
                    changePixel(pixel,"noita_steam")
					changePixel(pixelMap[x][y],"noita_rock")
                }
			}
		}
		if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.94 && (pixel.start + 100) < pixelTicks) {
            changePixel(pixel, "peat")
        }
	},
	tempHigh: 150,
	stateHigh: "noita_steam",
	tempLow: 0,
	stateLow: "noita_ice",
	category: "liquids",
	reactions: {
		"fire": { elem1: "noita_steam" },
		"noita_fire": { elem1: "noita_steam" },
		"toxic_sludge": { elem2:"swamp_water", chance:0.17 },
	},
	state: "liquid",
	density: 3400,
	conduct: 0.02,
	stain: -0.5,
	extinguish: true,
	corrodible: true,
	water: true,
	impure: true,
}

elements.noita_steam = {
	color: ["#61617d","#61617d","#47475c","#47475c","#61617d"],
	name: "steam",
	behavior: behaviors.GAS,
	tick: function(pixel) {
        if (Math.random() > 0.95 && Math.random() > 0.95 && (pixel.start + 500) < pixelTicks) {
			changePixel(pixel,"noita_water")
		}
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && elements[pixelMap[x][y].element].static === true && Math.random() > 0.97) {
                    changePixel(pixel,"noita_water")
                }
			}
		}
		doDefaults(pixel);
	},
	reactions: {
	},
	tempLow: 10,
	stateLow: "noita_water",
	category: "gases",
	state: "gas",
	density: 0.6,
	conduct: 0.002,
	stain: -0.05,
	alias: "water vapor",
	extinguish: true
}

elements.noita_ice = {
	color: ["#4c8fb0","#4c8fb0","#4c8fb0","#55a7bf","#80b6d1","#55a7bf","#4c8fb0"],
    name: "ice",
	behavior: behaviors.WALL,
	tempHigh: 25,
	stateHigh: "noita_water",
	category: "solids",
	state: "solid",
	density: 917,
	breakInto: "noita_snow",
	corrodible: true,
	static: true,
	meltableWater: true,
	frozen: true,
}

elements.noita_snow = {
	color: ["#a6c2d8","#81b0d2"],
	name: "snow",
	behavior: behaviors.POWDER,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && elements[pixelMap[x][y].element].fire === true) {
                    changePixel(pixel,"noita_steam")
                }
			}
		}
	},
	reactions: {
		"fire": { elem1: "noita_steam" },
	},
	tempHigh: 25,
	tempLow: -100,
	stateLow: "noita_packed_snow",
	stateHigh: "noita_water",
	category: "land",
	state: "solid",
	density: 100,
	corrodible: true,
	static: true,
	frozen: true,
	meltableWater: true,
}

elements.noita_packed_snow = {
	color: ["#a6c2d8","#a6c2d8","#81b0d2","#a6c2d8"],
	name: "packed_snow",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && elements[pixelMap[x][y].element].fire === true) {
                    changePixel(pixel,"noita_steam")
                }
			}
		}
	},
	reactions: {
		"fire": { elem1: "noita_steam" },
	},
	tempHigh: 25,
	tempLow: -200,
	stateLow: "noita_ice",
	stateHigh: "noita_water",
	breakInto: "noita_snow",
	category: "land",
	state: "solid",
	density: 400,
	static: true,
	frozen: true,
	meltableWater: true,
}

elements.noita_poison = {
	color: "#cb42ff",
    name: "poison",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			createPixel("noita_poison_gas",pixel.x+1,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			createPixel("noita_poison_gas",pixel.x-1,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			createPixel("noita_poison_gas",pixel.x,pixel.y+1)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			createPixel("noita_poison_gas",pixel.x,pixel.y-1)
		}
		doDefaults(pixel);
	},
	tempHigh: 150,
	stateHigh: "noita_poison_gas",
	tempLow: 0,
	stateLow: "noita_poison_ice",
	category: "liquids",
	reactions: {
		"noita_blood": { elem1: "pink_slime",  elem2: "noita_smoke", chance:0.10 },
		"noita_meat": { elem2: "noita_rotten_meat", chance:0.50 },
		"noita_poison": { elem2: "poisonous_rock", elem1: "noita_poison_gas", chance:0.70 },
	},
	state: "liquid",
	density: 3000,
	conduct: 0.8,
	corrodible: true,
	water: true,
	impure: true,
	soluble: true,
}

elements.noita_poison_gas = {
	color: ["#59147d","#59147d","#59147d","#410b5c","#410b5c"],
	name: "poison_gas",
	behavior: behaviors.GAS,
	tick: function(pixel) {
        if (Math.random() > 0.9 && (pixel.start + 225) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	reactions: {
		"noita_blood": { elem1: "pink_slime",  elem2: "noita_smoke", chance:0.10 },
	},
	tempLow: 10,
	stateLow: "noita_poison",
	category: "gases",
	state: "gas",
	density: 2000,
	burnableFast: true,
}

elements.noita_poison_ice = {
	color: ["#4c8fb0","#4c8fb0","#4c8fb0","#55a7bf","#80b6d1","#55a7bf","#4c8fb0"],
    name: "ice",
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 25,
	stateHigh: "noita_poison",
	category: "solids",
	state: "solid",
	density: 10000,
	corrodible: true,
	static: true,
	meltablePoison: true,
	frozen: true,
}

elements.urine = {
	color: "#ffeb00",
	behavior: behaviors.LIQUID,
	tempHigh: 150,
	stateHigh: "noita_steam",
	tempLow: 0,
	stateLow: "noita_ice",
	category: "liquids",
	reactions: {
		"noita_snow": { elem1: "noita_water", elem2: "noita_steam", chance:0.20 },
		"lava": { elem1: "noita_steam", elem2: "fools_gold", chance:0.70 },
	},
	state: "liquid",
	density: 4000,
	conduct: 0.02,
	stain: -0.5,
	extinguish: true,
	corrodible: true,
	soluble: true,
}

elements.brine = {
	color: "#2e744b",
	behavior: behaviors.LIQUID,
	tempHigh: 150,
	stateHigh: "noita_steam",
	tempLow: 0,
	stateLow: "noita_ice",
	category: "liquids",
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && elements[pixelMap[x][y].element].fire === true) {
                    if (Math.random() > 0.5) {
                	    changePixel(pixel,"noita_steam")
                	}
					else {
                	    changePixel(pixel,"noita_salt")
                	}
                }
			}
		}
	},
	reactions: {
		"lava": { elem1: "noita_steam", elem2: "glowing_matter", chance:0.20 },
		"toxic_sludge": { elem2: "noita_water", chance:0.20 },
	},
	state: "liquid",
	density: 4000,
	conduct: 0.02,
	stain: -0.5,
	extinguish: true,
	corrodible: true,
	freezable: true,
	water: true,
}

elements.pink_slime = {
	color: ["#bb2f83","#942769"],
    name: "slime",
	behavior: behaviors.LIQUID,
	viscosity: 1000,
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: 0,
	category: "liquids",
	reactions: {
		"noita_water": { elem1: "slime_mist", chance:0.10  },
		"whiskey": { elem1: "noita_smoke", chance:0.30  },
		"lava": { elem1: "static_hell_slime", elem2: "static_hell_slime", chance:0.70  },
	},
	state: "liquid",
	density: 5000,
	conduct: 0.02,
	stain: -0.5,
	isFood: true,
	corrodible: true,
	meltableLava: true,
	slime: true,
}

elements.green_slime = {
	color: ["#6d8b3b","#607c3b"],
    name: "slime",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	viscosity: 1000,
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: 0,
	category: "liquids",
	reactions: {
		"lava": { elem1: "fungal_gas", elem1: "green_fungus", chance:0.70  },
	},
	state: "liquid",
	density: 5000,
	conduct: 0.02,
	stain: -0.5,
	isFood: true,
	corrodible: true,
	meltableLava: true,
	slime: true,
}

elements.yellow_slime = {
	color: ["#bec538","#92982c"],
    name: "slime",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.95 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	viscosity: 1000,
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: 0,
	category: "liquids",
	reactions: {
		"lava": { elem1: "fungal_gas", elem1: "yellow_fungus", chance:0.70  },
	},
	state: "liquid",
	density: 5000,
	conduct: 0.02,
	stain: -0.5,
	isFood: true,
	corrodible: true,
	meltableLava: true,
	slime: true,
}

elements.hell_slime = {
	color: ["#714242","#784747"],
	behavior: behaviors.LIQUID,
	viscosity: 1000,
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: 0,
	category: "liquids",
	reactions: {
	},
	state: "liquid",
	density: 4000,
	conduct: 0.02,
	stain: -0.5,
	isFood: true,
	earth: true,
	static: true,
	slime: true,
	corrodible: true,
}

elements.static_hell_slime = {
	color: ["#714242","#784747"],
    name: "hell_slime",
	behavior: behaviors.WALL,
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: 0,
	category: "liquids",
	reactions: {
	},
	state: "liquid",
	density: 5000,
	conduct: 0.02,
	stain: -0.5,
	isFood: true,
	static: true,
	slime: true,
	corrodible: true,
}

elements.pus = {
	color: ["#8d504b","#8f6046","#8d5249","#7d5044","#915449"],
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && (elements[pixelMap[x][y].element].fungus === true) && Math.random() > 0.60) {
                    changePixel(pixel,"weird_fungus")
					changePixel(pixelMap[x][y],"weird_fungus")
                }
				if (!outOfBounds(x,y) && (elements[pixelMap[x][y].element].sandMetal === true || elements[pixelMap[x][y].element].gold === true) && Math.random() > 0.80) {
					changePixel(pixelMap[x][y],"noita_smoke")
                }
			}
		}
	},
	viscosity: 1000,
	tempHigh: 150,
	stateHigh: "noita_steam",
	tempLow: 0,
	category: "liquids",
	reactions: {
		"noita_water": { elem2: "pus", chance:0.80  },
		"toxic_sludge": { elem2: "pus", chance:0.80  },
		"noita_aluminium": { elem2: "noita_smoke", chance:0.10  },
		"noita_grass": { elem2: "noita_smoke", chance:0.80  },
	},
	state: "liquid",
	density: 1243.4,
	conduct: 0.02,
	stain: -0.5,
	isFood: true,
	corrodible: true,
	impure: true,
	water: true,
}

elements.noita_oil = {
	color: "#3d3628",
    name: "oil",
	behavior: behaviors.LIQUID,
	burnable: true,
	nburnTime: 500,
	tick: function(pixel) {
        doNHeat(pixel)
        doNBurning(pixel)
	},
	tempHigh: 1000,
	category: "liquids",
	reactions: {
		"noita_meat": { func:function(pixel1,pixel2){ if (pixel1.NBurning === true && Math.random()> 0.9) {changePixel(pixel2,"lightly_cooked_meat");} } },
		"lightly_cooked_meat": { func:function(pixel1,pixel2){ if (pixel1.NBurning === true && ((pixel1.NBurnStart - pixelTicks) < -100) && Math.random()> 0.8) {changePixel(pixel2,"noita_cooked_meat");} } },
		"noita_cooked_meat": { func:function(pixel1,pixel2){ if (pixel1.NBurning === true && ((pixel1.NBurnStart - pixelTicks) < -225) && Math.random()> 0.9) {changePixel(pixel2,"fully_cooked_meat");} } },
		"fully_cooked_meat": { func:function(pixel1,pixel2){ if (pixel1.NBurning === true && ((pixel1.NBurnStart - pixelTicks) < -450) && Math.random()> 0.95) {changePixel(pixel2,"burned_meat");} } },
	},
	state: "liquid",
	density: 1000,
	corrodible: true,
	impure: true,
}

elements.noita_gold = {
	color: ["#ffd785","#f9bb50","#e18c68","#ffd785","#f9bb50","#e18c68","#ffffb5","#ffd785","#f9bb50","#e18c68","#ffffb5","#ffffff"],
	name: "gold",
	behavior: behaviors.POWDER,
	tempHigh: 1500,
	stateHigh: "noita_molten_gold",
	reactions: {
		"flummoxium": { elem1:"levitatium", elem2:"levitatium", chance:0.45 },
		"diminution": { elem1:"noita_silver" },
	},
	category: "powders",
	state: "solid",
	density: 8000,
	conduct: 0.8,
	hardness: 0.25,
	sandMetal: true,
	corrodible: true,
	meltableMetal: true,
}

elements.noita_molten_gold = {
	color: ["#ffd785","#f9bb50","#e18c68","#ffd785","#f9bb50","#e18c68","#ffffb5","#ffd785","#f9bb50","#e18c68","#ffffb5","#ffffff"],
	name: "molten_gold",
	behavior: behaviors.LIQUID,
	viscosity: 100,
	tempLow: 10,
	stateLow: "noita_gold",
	reactions: {
	},
	density: 3000,
	conduct: 0.8,
	corrodible: true,
	molten: true,
}

elements.metal_dust = {
	color: ["#606d70","#3e4555","#758582","#bec8c1"],
	behavior: behaviors.POWDER,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh:"molten_metal",
	category: "powders",
	density: 8000,
	state: "solid",
	conduct: 0.8,
	hardness: 0.25,
	sandMetal: true,
	corrodible: true,
	meltableMetal: true,
}

elements.molten_metal = {
	color: ["#7d8a8d","#dbe5de","#5b6272","#92a29f"],
	behavior: behaviors.LIQUID,
	viscosity: 100,
	tempLow: 10,
	stateLow: "metal_dust",
	reactions: {
	},
	density: 3000,
	conduct: 0.8,
	corrodible: true,
	molten: true,
}

elements.noita_brass = {
	color: ["#c7632e","#ae4a54","#d68b67","#f5dc99","#c7632e","#ae4a54","#d68b67","#f5dc99","#ffffff"],
	name:"brass",
	behavior: behaviors.POWDER,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && (elements[pixelMap[x][y].element].fungus === true)) {
                    changePixel(pixel,"funky_cloud")
					changePixel(pixelMap[x][y],"funky_cloud")
                }
			}
		}
	},
	reactions: {
		"noita_diamond": { elem1:"purifying_powder", elem2:"purifying_powder", chance:0.5, },
		"unstable_teleportatium": { elem2:"noita_smoke", elem1:"metal_dust", chance:0.50 },
		"pus": { elem1:"noita_smoke", chance:0.20 },
	},
	tempHigh: 1500,
	stateHigh:"noita_molten_brass",
	category: "powders",
	density: 8000,
	state: "solid",
	conduct: 0.8,
	hardness: 0.275,
	sandMetal: true,
	corrodible: true,
	meltableMetal: true,
}

elements.noita_molten_brass = {
	color: ["#ffffc1","#ff937c","#ffac56","#ffd48f","#ffffc1","#ff937c","#ffac56","#ffd48f","#ffffff"],
	name: "molten_brass",
	behavior: behaviors.LIQUID,
	viscosity: 100,
	tempLow: 10,
	stateLow: "noita_brass",
	reactions: {
	},
	density: 3000,
	conduct: 0.8,
	corrodible: true,
	molten: true,
}

elements.noita_copper = {
	color: ["#58444d","#915861","#b2947a","#cfbf9d"],
	name:"copper",
	behavior: behaviors.POWDER,
	reactions: {
		"teleportatium": { elem1:"noita_brass", elem2:"noita_smoke", chance:0.5, },
		"polymorphine": { elem1:"polymorphine_cloud", elem2:"polymorphine_cloud", chance:0.5, },
		"flummoxium": { elem1:"levitatium", elem2:"levitatium", chance:0.45, },
		"pus": { elem1:"noita_smoke", chance:0.20 },
	},
	tempHigh: 1500,
	stateHigh:"noita_molten_copper",
	category: "powders",
	density: 8000,
	state: "solid",
	conduct: 0.8,
	hardness: 0.3,
	sandMetal: true,
	corrodible: true,
	meltableMetal: true,
}

elements.noita_molten_copper = {
	color: ["#ad8d75","#ffffc5","#e6a189","#ffdda2"],
	name: "molten_copper",
	behavior: behaviors.LIQUID,
	viscosity: 100,
	tempLow: 10,
	stateLow: "noita_copper",
	reactions: {
	},
	density: 3000,
	conduct: 0.8,
	corrodible: true,
	molten: true,
}

elements.noita_silver = {
	color: ["#94938f","#f9f9f2","#c1c0bb","#ffffff"],
	name:"silver",
	behavior: behaviors.POWDER,
	reactions: {
		"polymorphine": { elem1:"noita_copper", elem2:"noita_smoke", chance:0.5, },
		"teleportatium": { elem1:"teleportatium_cloud", elem2:"teleportatium_cloud", chance:0.1, },
		"pus": { elem1:"noita_smoke", chance:0.20 },
	},
	tempHigh: 1500,
	stateHigh:"noita_molten_silver",
	category: "powders",
	density: 8000,
	state: "solid",
	conduct: 0.8,
	hardness: 0.25,
	sandMetal: true,
	corrodible: true,
	meltableMetal: true,
}

elements.noita_molten_silver = {
	color: ["#e0dbca","#b3ae9e","#ffffff"],
	name: "molten_silver",
	behavior: behaviors.LIQUID,
	viscosity: 100,
	tempLow: 10,
	stateLow: "noita_silver",
	reactions: {
	},
	density: 3000,
	conduct: 0.8,
	corrodible: true,
	molten: true,
}

elements.noita_steel = {
	color: ["#907e55","#4c4137","#695b4b","#695b4b","#695b4b","#6e5f4e","#5d5043","#84744e","#6e5f4e","#6e5f4e","#6e5f4e","#6e5f4e","#5d5043","#84744e","#4c4137","#907e55"],
	colorPattern: textures.STEEL,
	colorKey: {
		"g": "#6e5f4e",
		"s": "#5d5043",
		"G": "#84744e",
		"w": "#695b4b"
	},
	renderer: function(pixel,ctx) {
		if (!viewInfo[view].colorEffects) { drawDefault(ctx,pixel); return }
		if (pixel.alpha === 0) return;
		let edge1 = false;
		let edge2 = false;
		let edge3 = false;
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coords = adjacentCoords[i];
			var x = pixel.x + coords[0];
			var y = pixel.y + coords[1];
			if (isEmpty(x,y) || (!outOfBounds(x,y) && elements[pixelMap[x][y].element].movable !== elements[pixel.element].movable)) {
				edge1 = true;
				break;
			}
		}
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coords = adjacentCoords[i];
			var x = pixel.x + coords[0];
			var y = pixel.y + coords[1];
			if (isEmpty(x-1,y) || isEmpty(x,y-1) || isEmpty(x+1,y) || isEmpty(x,y+1) || (!outOfBounds(x-1,y) && elements[pixelMap[x-1][y].element].movable !== elements[pixel.element].movable) || (!outOfBounds(x+1,y) && elements[pixelMap[x+1][y].element].movable !== elements[pixel.element].movable) || (!outOfBounds(x,y-1) && elements[pixelMap[x][y-1].element].movable !== elements[pixel.element].movable) || (!outOfBounds(x,y+1) && elements[pixelMap[x][y+1].element].movable !== elements[pixel.element].movable)) {
				edge2 = true;
				break;
			}
		}
		for (var i = 0; i < adjacentCoords.length; i++) {
			var coords = adjacentCoords[i];
			var x = pixel.x + coords[0];
			var y = pixel.y + coords[1];
			if (isEmpty(x-2,y) || isEmpty(x,y-2) || isEmpty(x+2,y) || isEmpty(x,y+2) || (!outOfBounds(x-2,y) && elements[pixelMap[x-2][y].element].movable !== elements[pixel.element].movable) || (!outOfBounds(x+2,y) && elements[pixelMap[x+2][y].element].movable !== elements[pixel.element].movable) || (!outOfBounds(x,y-2) && elements[pixelMap[x][y-2].element].movable !== elements[pixel.element].movable) || (!outOfBounds(x,y+2) && elements[pixelMap[x][y+2].element].movable !== elements[pixel.element].movable)) {
				edge3 = true;
				break;
			}
		}
		if (edge1) { drawSquare(ctx,"#4c4137",pixel.x,pixel.y) }
		else if (edge2) { drawSquare(ctx,"#6e5f4e",pixel.x,pixel.y) }
		else if (edge3) { drawSquare(ctx,"#907e55",pixel.x,pixel.y) }
		else { drawSquare(ctx,pixel.color,pixel.x,pixel.y) }
	},
	grain: 0.1,
	name:"steel",
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh:"molten_metal",
	category: "solids",
	density: 8000,
	state: "solid",
	conduct: 0.8,
	hardness: 0.8,
	static: true,
	meltableMetalGeneric: true,
	corrodible: true,
	rust: true,
}

elements.noita_prop_steel = {
	color: ["#c1c8be","#606d70","#3e4555","#758582","#bec8c1","#25333b"],
	colorPattern: textures.STATICSHINE,
	colorKey: {
		"g": "#606d70",
		"s": "#3e4555",
		"G": "#758582",
		"w": "#bec8c1"
	},
	renderer: function(pixel,ctx) {
		if (!viewInfo[view].colorEffects) { drawDefault(ctx,pixel); return }
		if (pixel.alpha === 0) return;
		let edge1 = false;
		let edge2 = false;
		let edge3 = false;
		if ((isEmpty(pixel.x-1,pixel.y) || isEmpty(pixel.x,pixel.y-1)) && !isEmpty(pixel.x,pixel.y+1,true) && !isEmpty(pixel.x+1,pixel.y,true)) {
			edge1 = true;
		}
		else if ((isEmpty(pixel.x+1,pixel.y) || isEmpty(pixel.x,pixel.y+1)) && !isEmpty(pixel.x,pixel.y-1,true) && !isEmpty(pixel.x-1,pixel.y,true)) {
			edge2 = true;
		}
		else if ((isEmpty(pixel.x+1,pixel.y-1) || isEmpty(pixel.x-1,pixel.y+1)) && isEmpty(pixel.x-1,pixel.y-1) && isEmpty(pixel.x+1,pixel.y+1)) {
			edge3 = true;
		}
		if (edge1) { drawSquare(ctx,"#c1c8be",pixel.x,pixel.y) }
		else if (edge2) { drawSquare(ctx,"#25333b",pixel.x,pixel.y) }
		else if (edge3) { drawSquare(ctx,"#4f5eab",pixel.x,pixel.y) }
		else { drawSquare(ctx,pixel.color,pixel.x,pixel.y) }
	},
	name:"steel",
	behavior: behaviors.STURDYPOWDER,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh:"noita_molten_prop_steel",
	category: "solids",
	density: 8000,
	state: "solid",
	conduct: 0.8,
	hardness: 0.8,
	meltableMetal: true,
	corrodible: true,
	rust: true,
}

elements.noita_steel_sand = {
	color: ["#3e4555","#758582","#606d70","#bec8c1"],
	name:"steel",
	behavior: behaviors.POWDER,
	reactions: {
		"polymorphine": { elem1:"noita_copper", elem2:"noita_smoke", chance:0.5, },
		"teleportatium": { elem1:"teleportatium_cloud", elem2:"teleportatium_cloud", chance:0.1, },
		"pus": { elem1:"noita_smoke", chance:0.20 },
	},
	tempHigh: 1500,
	stateHigh:"noita_molten_steel",
	category: "powders",
	density: 8000,
	state: "solid",
	conduct: 0.8,
	hardness: 0.8,
	sandMetal: true,
	corrodible: true,
}

elements.noita_molten_prop_steel = {
	color: ["#b5b698","#ffffe9","#938e7d","#caceaa"],
	name: "molten metal",
	behavior: behaviors.LIQUID,
	viscosity: 100,
	tempLow: 10,
	stateLow: "noita_steel_sand",
	reactions: {
	},
	density: 2000,
	conduct: 0.8,
	corrodible: true,
	nmolten: true,
}

elements.noita_molten_steel = {
	color: ["#7a6d60","#867868","#a1916b","#7a6d60"],
	name: "molten steel",
	behavior: behaviors.LIQUID,
	viscosity: 100,
	tempLow: 10,
	stateLow: "metal_dust",
	reactions: {
	},
	density: 5000,
	conduct: 0.8,
	corrodible: true,
	moltenMetal: true,
	gold: true
}

elements.noita_aluminium = {
	color: ["#c1c8be","#606d70","#3e4555","#758582","#bec8c1","#25333b"],
	colorPattern: textures.STATICSHINE,
	colorKey: {
		"g": "#606d70",
		"s": "#3e4555",
		"G": "#758582",
		"w": "#bec8c1"
	},
	name:"aluminium",
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh:"noita_molten_prop_steel",
	category: "solids",
	density: 8000,
	state: "solid",
	conduct: 0.8,
	hardness: 0.8,
	earth: true,
	meltableMetal: true,
	corrodible: true,
	rustOxide: true,
}

elements.aluminium_oxide = {
	color: ["#d1d1d2","#c5c1b8","#bdb59c","#ccc49f"],
	name:"aluminium",
	behavior: behaviors.WALL,
	reactions: {
	},
	tempHigh: 1500,
	stateHigh:"noita_molten_prop_steel",
	category: "solids",
	density: 8000,
	state: "solid",
	conduct: 0.8,
	hardness: 0.8,
	earth: true,
	meltableMetal: true,
	corrodible: true,
	rustOxide: true,
}

elements.noita_diamond = {
	color: ["#97ebff","#97ebff","#ffffff","#c4ffff","#78b7d5","#78b7d5"],
	name:"diamond",
	behavior: behaviors.POWDER,
	reactions: {
		"noita_brass": { elem1:"purifying_powder", elem2:"purifying_powder", chance:0.5, },
		"chaotic_polymorphine": { elem1:"silver", elem2:"smoke", chance:0.5, },
		"noita_honey": { elem2:"ambrosia", elem1:"noita_poison", chance:0.5, },
		"flummoxium": { elem1:"levitatium", elem2:"levitatium", chance:0.45, },
		"diminution": { elem1:"toxic_sludge" },
	},
	category: "powders",
	state: "solid",
	density: 8000,
	hardness: 0.99,
	sandMetal: true,
}

elements.noita_glass = {
	color: ["#76bed1","#6aabc3","#83dbe2"],
	renderer: renderPresets.BORDER,
	name:"glass",
	behavior: behaviors.WALL,
	reactions: {
		"concentrated_mana": { elem1:"noita_steam", chance:0.25 },
	},
	tempHigh: 1500,
	stateHigh:"noita_molten_glass",
	category: "solids",
	density: 6000,
	state: "solid",
	hardness: 0.2,
	meltableMetal: true,
	static: true,
	earth: true,
}

elements.glass_broken = {
	color: ["#74bed0","#74bed0","#82dbe2","#69aac2"],
	name:"glass",
	behavior: behaviors.POWDER,
	reactions: {
		"concentrated_mana": { elem1:"noita_steam", chance:0.25 },
	},
	tempHigh: 1500,
	stateHigh:"noita_molten_glass",
	category: "powders",
	density: 6000,
	state: "solid",
	conduct: 0.8,
	hardness: 0.1,
	sandOther: true,
	meltableMetal: true,
	earth: true
}

elements.noita_molten_glass = {
	color: ["#d7ffff","#d7ffff","#bef4eb"],
	name: "molten_glass",
	behavior: behaviors.LIQUID,
	viscosity: 100,
	tempLow: 10,
	stateLow: "noita_glass",
	reactions: {
	},
	density: 5000,
	conduct: 0.8,
	molten: true,
	meltableLava: true,
	earth: true
}

elements.lava = {
	color: "#ff8100",
	behavior: behaviors.LIQUID,
	onCollide: function(pixel1,pixel2) {
		if (elements[pixel2.element].burnable === true && Math.random() < 0.08) {
			changePixel(pixel2,"noita_fire")
			pixel2.NBurning = true
		}
		else if (elements[pixel2.element].burnableFast === true && Math.random() < 0.8) {
			changePixel(pixel2,"noita_fire")
			pixel2.NBurning = true
		}
		else if (elements[pixel2.element].meltableLava === true && Math.random() < 0.03) {
			changePixel(pixel2,"noita_fire")
			pixel2.NBurning = true
			changePixel(pixel1,"noita_smoke")
		}
		else if (elements[pixel2.element].meltableLavaFast === true && Math.random() < 0.8) {
			changePixel(pixel2,"lava")
			changePixel(pixel1,"noita_smoke")
		}
		else if (elements[pixel2.element].meltableMetal === true && Math.random() < 0.8) {
			changePixel(pixel2,elements[pixel2.element].stateHigh)
		}
	},
	reactions: {
		"freezing_liquid": { elem1: "dense_rock", elem2: "freezing_vapour", chance:0.80 },
		"frozen_steel": { elem1: "volcanic_rock", elem2: "noita_steel", chance:0.80 },
		"noita_poison": { elem1: "poisonous_rock", elem2: "noita_poison_gas", chance:0.70 },
		"brine": { elem1: "glowing_matter", elem2: "noita_steam", chance:0.80 },
		"urine": { elem1: "fools_gold", elem2: "noita_steam", chance:0.70 },
		"noita_water": { elem1: "noita_rock", elem2: "noita_steam", chance:0.80 },
		"noita_mud": { elem1: "ground", elem2: "noita_steam", chance:0.80 },
		"noita_blood": { elem1: "volcanic_rock", elem2: "noita_steam", chance:0.70 },
		"noita_gunpowder": { elem2: "noita_fire", chance:0.70 },
		"teleportatium": { elem2:"teleportatium_cloud", chance:0.80 },
	},
	tempLow: 10,
	stateLow: "noita_rock",
	viscosity: 100,
	category: "liquids",
	state: "liquid",
	density: 6000,
}

elements.noita_fire = {
	color: "#ff9700",
	name: "fire",
	tick: function(pixel){
		if (!pixel.NBurning) {pixel.NBurning = true}
		if (pixel.start === pixelTicks) {return}
		let move1Spots = adjacentCoords.slice(0);
		let moved = false;
		for (var i = 0; i < move1Spots.length; i++) {
			const j = Math.random()*move1Spots.length | 0;
			const coords = move1Spots[j];
			const x = pixel.x+coords[0];
			const y = pixel.y+coords[1];
			if (tryMove(pixel, x, y)) { moved = true; break; }
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
		if (pixel.del !== true) {
			doNHeat(pixel);
			doAirDensity(pixel);
			doNBurning(pixel);
			if (settings.burn===0 && (pixelTicks-pixel.start > 70) && Math.random() < 0.1) { 
				changePixel(pixel,"noita_smoke") 
			}
		}
	},
	onCollide: function(pixel1,pixel2) {
		if (elements[pixel2.element].burnable === true) {
			pixel2.NBurning = true
		}
		else if (elements[pixel2.element].burnableFast === true) {
			changePixel(pixel2,"noita_fire")
		}
		if (pixel2.hp && !pixel2.stains.onFire) {
			pixel2.stains.onFire = [pixelTicks,1000]
		}
	},
	reactions: {
	},
	NBurning: true,
	nburnTime: 15,
	nburnInto: "noita_smoke",
	tempLow:10,
	stateLow: "noita_smoke",
	category: "energy",
	state: "gas",
	density: 0.1,
	noMix: true,
	fire: true,
	hot: true,
}

elements.spark = {
	color: "#ffee00",
	behavior: behaviors.GAS,
	tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.80 && (pixel.start + 3) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.80 && (pixel.start + 3) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.80 && (pixel.start + 3) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.80 && (pixel.start + 3) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	category: "energy",
	temp: 40,
	tempLow: -270,
	stateLow: ["liquid_light",null],
	state: "gas",
	density: 1000,
	hidden: true,
	noMix: true,
	fire: true,
	hot: true,
}

elements.electric_spark = {
	color: "#3dffff",
	behavior: behaviors.GAS,
	charge: 3,
	tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.80 && (pixel.start + 3) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.80 && (pixel.start + 3) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.80 && (pixel.start + 3) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.80 && (pixel.start + 3) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	category: "energy",
	temp: 40,
	tempLow: -270,
	stateLow: ["liquid_light",null],
	state: "gas",
	density: 1000,
	hidden: true,
	noMix: true,
	fire: true,
	hot: true,
}

elements.noita_smoke = {
	color: ["#414141","#414141","#313131","#313131","#414141",],
	name: "smoke",
	behavior: behaviors.GAS,
	tick: function(pixel) {
        if (Math.random() > 0.9 && (pixel.start + 175) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	reactions: {
	},
	tempHigh: 1000,
	stateHigh: "noita_fire",
	category: "gases",
	state: "gas",
	density: 0.1,
	stain: 0.075,
	noMix: true
}

elements.freezing_liquid = {
	color: ["#6681e5","#607ad7","#7290ff",],
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.80 && (pixel.start + 200) < pixelTicks) {
			changePixel(pixel,"freezing_vapour")
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.80 && (pixel.start + 200) < pixelTicks) {
			changePixel(pixel,"freezing_vapour")
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.80 && (pixel.start + 200) < pixelTicks) {
			changePixel(pixel,"freezing_vapour")
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.80 && (pixel.start + 200) < pixelTicks) {
			changePixel(pixel,"freezing_vapour")
		}
		doDefaults(pixel);
	},
	onCollide: function(pixel1,pixel2) {
		if (elements[pixel2.element].freezable === true) {
			changePixel(pixel2,"noita_ice")
		}
	},
	tempHigh: 150,
	stateHigh: "freezing_vapour",
	tempLow: -10,
	stateLow: "ice_cold",
	category: "liquids",
	reactions: {
		"worm_blood": { elem1: "worm_blood", chance:0.20 },
	},
	state: "liquid",
	density: 3000,
	conduct: 0.02,
	stain: -0.5,
	extinguish: true,
	corrodible: true,
	impure: true
}

elements.freezing_vapour = {
	color: ["#63a6de","#63a6de","#5691c4","#5691c4","#63a6de",],
	behavior: behaviors.GAS,
    tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.80 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.80 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.80 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.80 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	category: "gases",
	tempLow: -10,
	stateLow: "freezing_liquid",
	state: "gas",
	density: 2,
}

elements.ice_cold = {
	color: ["#8a9bdd","#8a9bdd","#788bd5","#788bd5","#a0b0e5","#a0b0e5","#8a9bdd"],
    name: "ice",
	behavior: behaviors.WALL,
	tempHigh: 25,
	stateHigh: "freezing_liquid",
	category: "solids",
	state: "solid",
	density: 917,
	corrodible: true,
	static: true,
}

elements.funky_cloud = {
	color: ["#ff68b1","#f75998","#ff5ea1","#c3487c","#b44373",],
	behavior: behaviors.GAS,
    tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	category: "gases",
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: -45,
	state: "gas",
	density: 2,
	alias: "gas"
}

elements.fungal_gas = {
	color: ["#710c55","#710c55","#710c55","#57053c","#57053c",],
	behavior: behaviors.GAS,
    tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.70 && (pixel.start + 225) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.70 && (pixel.start + 225) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.70 && (pixel.start + 225) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.70 && (pixel.start + 225) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	burnableFast: true,
	category: "gases",
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: -45,
	burn: 100,
	burnTime: 1,
	fireColor: ["#00ffff","#00ffdd"],
	state: "gas",
	density: 2,
	alias: "gas",
	fungus: true,
}

elements.weird_fungus = {
	color: ["#ff70bf","#ff6bb6","#ff7acf"],
	burnable: true,
	nburnTime: 25,
	tick: function(pixel) {
        doNHeat(pixel)
        doNBurning(pixel)
		if (pixel.start === pixelTicks) {return}
		if (pixel.settled != true) {
			if (!tryMove(pixel, pixel.x, pixel.y+1)) {
				if (Math.random() < 0.5) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
						if (!tryMove(pixel, pixel.x-1, pixel.y+1) && Math.random() > 0.95) {
							pixel.settled = true
						}
					}
				} else if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1) && Math.random() > 0.95) {
						pixel.settled = true
					}
				}
			}
			if (isEmpty(pixel.x, pixel.y-1)) {
				createPixel(pixel.element,pixel.x,pixel.y-1)
			}
			if (isEmpty(pixel.x, pixel.y+1)) {
				createPixel(pixel.element,pixel.x,pixel.y+1)
			}
		}	
		if (pixel.settled == true) {
			if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x-1, pixel.y) && isEmpty(pixel.x+1, pixel.y)) {
				tryMove(pixel, pixel.x, pixel.y+1)
			}
			if (!isEmpty(pixel.x, pixel.y-1, true) && !outOfBounds(pixel.x, pixel.y-1, true)) {
				if (elements[pixelMap[pixel.x][pixel.y-1].element].movable === true && (!pixelMap[pixel.x][pixel.y-1].settled || pixelMap[pixel.x][pixel.y-1].settled != true)) {
					pixel.settled = false
				}
			}
			if (isEmpty(pixel.x, pixel.y-1)) {
				createPixel(pixel.element,pixel.x,pixel.y-1)
				pixelMap[pixel.x][pixel.y-1].settled = true
			}
			if (isEmpty(pixel.x, pixel.y+1)) {
				createPixel(pixel.element,pixel.x,pixel.y+1)
				pixelMap[pixel.x][pixel.y+1].settled = true
			}
		}	
		doDefaults(pixel);
	},
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "noita_fire",
	category:"powders",
	state: "solid",
	density: 6000,
    corrodible: true,
	impure: true,
	earth: true,
	fungus: true,
	plant: true,
}

elements.green_fungus = {
	color: ["#89ff64","#96ff63"],
	burnable: true,
	nburnTime: 25,
	tick: function(pixel) {
        doNHeat(pixel)
        doNBurning(pixel)
		if (pixel.start === pixelTicks) {return}
		if (pixel.settled != true) {
			if (!tryMove(pixel, pixel.x, pixel.y+1)) {
				if (Math.random() < 0.5) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
						if (!tryMove(pixel, pixel.x-1, pixel.y+1) && Math.random() > 0.95) {
							pixel.settled = true
						}
					}
				} else if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1) && Math.random() > 0.95) {
						pixel.settled = true
					}
				}
			}
			if (isEmpty(pixel.x, pixel.y-1)) {
				createPixel(pixel.element,pixel.x,pixel.y-1)
			}
			if (isEmpty(pixel.x, pixel.y+1)) {
				createPixel(pixel.element,pixel.x,pixel.y+1)
			}
		}	
		if (pixel.settled == true) {
			if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x-1, pixel.y) && isEmpty(pixel.x+1, pixel.y)) {
				tryMove(pixel, pixel.x, pixel.y+1)
			}
			if (!isEmpty(pixel.x, pixel.y-1, true) && !outOfBounds(pixel.x, pixel.y-1, true)) {
				if (elements[pixelMap[pixel.x][pixel.y-1].element].movable === true && (!pixelMap[pixel.x][pixel.y-1].settled || pixelMap[pixel.x][pixel.y-1].settled != true)) {
					pixel.settled = false
				}
			}
			if (isEmpty(pixel.x, pixel.y-1)) {
				createPixel(pixel.element,pixel.x,pixel.y-1)
				pixelMap[pixel.x][pixel.y-1].settled = true
			}
			if (isEmpty(pixel.x, pixel.y+1)) {
				createPixel(pixel.element,pixel.x,pixel.y+1)
				pixelMap[pixel.x][pixel.y+1].settled = true
			}
		}	
		doDefaults(pixel);
	},
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "noita_fire",
	category:"powders",
	state: "solid",
	density: 6000,
    corrodible: true,
	impure: true,
	earth: true,
	fungus: true,
	plant: true,
}

elements.yellow_fungus = {
	color: ["#ffff59","#ffff51"],
	burnable: true,
	nburnTime: 25,
	tick: function(pixel) {
        doNHeat(pixel)
        doNBurning(pixel)
		if (pixel.start === pixelTicks) {return}
		if (pixel.settled != true) {
			if (!tryMove(pixel, pixel.x, pixel.y+1)) {
				if (Math.random() < 0.5) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
						if (!tryMove(pixel, pixel.x-1, pixel.y+1) && Math.random() > 0.95) {
							pixel.settled = true
						}
					}
				} else if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1) && Math.random() > 0.95) {
						pixel.settled = true
					}
				}
			}
			if (isEmpty(pixel.x, pixel.y-1)) {
				createPixel(pixel.element,pixel.x,pixel.y-1)
			}
			if (isEmpty(pixel.x, pixel.y+1)) {
				createPixel(pixel.element,pixel.x,pixel.y+1)
			}
		}	
		if (pixel.settled == true) {
			if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x-1, pixel.y) && isEmpty(pixel.x+1, pixel.y)) {
				tryMove(pixel, pixel.x, pixel.y+1)
			}
			if (!isEmpty(pixel.x, pixel.y-1, true) && !outOfBounds(pixel.x, pixel.y-1, true)) {
				if (elements[pixelMap[pixel.x][pixel.y-1].element].movable === true && (!pixelMap[pixel.x][pixel.y-1].settled || pixelMap[pixel.x][pixel.y-1].settled != true)) {
					pixel.settled = false
				}
			}
			if (isEmpty(pixel.x, pixel.y-1)) {
				createPixel(pixel.element,pixel.x,pixel.y-1)
				pixelMap[pixel.x][pixel.y-1].settled = true
			}
			if (isEmpty(pixel.x, pixel.y+1)) {
				createPixel(pixel.element,pixel.x,pixel.y+1)
				pixelMap[pixel.x][pixel.y+1].settled = true
			}
		}	
		doDefaults(pixel);
	},
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "noita_fire",
	category:"powders",
	state: "solid",
	density: 6000,
    corrodible: true,
	impure: true,
	earth: true,
	fungus: true,
	plant: true,
}

elements.corpse_fungus = {
	color: ["#933051","#a2355a","#bf3f6a"],
	name: "weird_fungus",
	behavior: behaviors.POWDER,
	burnable: true,
	nburnTime: 25,
	tick: function(pixel) {
        doNHeat(pixel)
        doNBurning(pixel)
	},
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "noita_fire",
	category:"solids",
	state: "solid",
	density: 6000,
    corrodible: true,
	earth: true,
	fungus: true,
}

elements.noita_grass = {
	color: ["#739c45","#84b53c"],
	name:"grass",
	behavior: behaviors.POWDER,
	burnable: true,
	nburnTime: 25,
	tick: function(pixel) {
		doNHeat(pixel)
        doNBurning(pixel)
        requiresAir(pixel);
		doDefaults(pixel);
	},
	reactions: {
		"pus": { elem1:"noita_smoke", chance:0.80 },
		"healthium": { elem1:"holy_grass", elem2: null, chance:0.80 },
	},
	tempHigh: 1000,
	stateHigh: "dry_grass",
	category:"powders",
	state: "solid",
	density: 6000,
    corrodible: true,
	impure: true,
	plant: true,
}

elements.holy_grass = {
	color: ["#aeff73","#bfff6a"],
	name:"divine_ground",
	behavior: behaviors.POWDER,
	burnable: true,
	nburnTime: 30,
	tick: function(pixel) {
		doNHeat(pixel)
        doNBurning(pixel)
        requiresAir(pixel);
		doDefaults(pixel);
	},
	reactions: {
		"urine": { elem1:"noita_grass", elem2:"healium", chance:0.80 },
	},
	tempHigh: 1000,
	stateHigh: "dry_grass",
	category:"powders",
	state: "solid",
	density: 6000,
    corrodible: true,
	plant: true,
}

elements.dry_grass = {
	color: ["#877836","#6b6638"],
	name:"grass",
	behavior: behaviors.POWDER,
	burnable: true,
	nburnTime: 20,
	tick: function(pixel) {
		doNHeat(pixel)
        doNBurning(pixel)
        requiresAir(pixel);
		doDefaults(pixel);
	},
	reactions: {
		"pus": { elem1:"noita_smoke", chance:0.80 },
	},
	tempHigh: 1500,
	stateHigh: "noita_fire",
	category:"powders",
	state: "solid",
	density: 6000,
    corrodible: true,
	impure: true,
	plant: true,
}

elements.frozen_grass = {
	color: ["#2a3c48","#36434a"],
	name:"ice",
	behavior: behaviors.POWDER,
	burnable: true,
	nburnTime: 30,
	tick: function(pixel) {
        doNHeat(pixel)
        doNBurning(pixel)
	},
	reactions: {
		"pus": { elem1:"noita_smoke", chance:0.80 },
	},
	tempHigh: 750,
	stateHigh: "noita_grass",
	category:"powders",
	state: "solid",
	density: 6000,
    corrodible: true,
	impure: true,
	plant: true,
}

elements.plant_material = {
	color: ["#84b53c","#739c45"],
	burnable: true,
	nburnTime: 25,
	tick: function(pixel) {
        doNHeat(pixel)
        doNBurning(pixel)
		if (pixel.start === pixelTicks) {return}
		if (pixel.settled != true) {
			if (!tryMove(pixel, pixel.x, pixel.y+1)) {
				if (Math.random() < 0.5) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
						if (!tryMove(pixel, pixel.x-1, pixel.y+1) && Math.random() > 0.95) {
							pixel.settled = true
						}
					}
				} else if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1) && Math.random() > 0.95) {
						pixel.settled = true
					}
				}
			}
		}	
		if (pixel.settled == true) {
			if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x-1, pixel.y) && isEmpty(pixel.x+1, pixel.y)) {
				tryMove(pixel, pixel.x, pixel.y+1)
			}
			if (!isEmpty(pixel.x, pixel.y-1, true) && !outOfBounds(pixel.x, pixel.y-1, true)) {
				if (elements[pixelMap[pixel.x][pixel.y-1].element].movable === true && (!pixelMap[pixel.x][pixel.y-1].settled || pixelMap[pixel.x][pixel.y-1].settled != true)) {
					pixel.settled = false
				}
			}
		}	
		requiresAir(pixel);
		doDefaults(pixel);
	},
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "noita_fire",
	category:"powders",
	state: "solid",
	density: 3400,
    corrodible: true,
	plant: true,
}

elements.moss = {
	color: ["#739c45","#84b53c"],
	burnable: true,
	nburnTime: 25,
	tick: function(pixel) {
        doNHeat(pixel)
        doNBurning(pixel)
		if (pixel.start === pixelTicks) {return}
		if (pixel.settled != true) {
			if (!tryMove(pixel, pixel.x, pixel.y+1)) {
				if (Math.random() < 0.5) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
						if (!tryMove(pixel, pixel.x-1, pixel.y+1) && Math.random() > 0.95) {
							pixel.settled = true
						}
					}
				} else if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
					if (!tryMove(pixel, pixel.x+1, pixel.y+1) && Math.random() > 0.95) {
						pixel.settled = true
					}
				}
			}
		}	
		if (pixel.settled == true) {
			if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x-1, pixel.y) && isEmpty(pixel.x+1, pixel.y)) {
				tryMove(pixel, pixel.x, pixel.y+1)
			}
			if (!isEmpty(pixel.x, pixel.y-1, true) && !outOfBounds(pixel.x, pixel.y-1, true)) {
				if (elements[pixelMap[pixel.x][pixel.y-1].element].movable === true && (!pixelMap[pixel.x][pixel.y-1].settled || pixelMap[pixel.x][pixel.y-1].settled != true)) {
					pixel.settled = false
				}
			}
		}	
		doDefaults(pixel);
	},
	reactions: {
	},
	tempHigh: 1500,
	stateHigh: "noita_fire",
	category:"powders",
	state: "solid",
	density: 3400,
    corrodible: true,
	impure: true,
	plant: true,
}

elements.noita_salt = {
	color: ["#a7b6c4","#9cc1ba","#adb0ae","#c4b5c4","#a2b6c3","#9daabc","#c4c4b1"],
	behavior: behaviors.POWDER,
	reactions: {
		"noita_water": { elem1: null, elem2:"brine", chance:0.05 },
		"chilly_water": { elem1: null, elem2:"brine", chance:0.05 },
		"diminution": { elem1: "noita_smoke" }
	},
	tempHigh: 1500,
	category:"powders",
	state: "solid",
	density: 6000,
    corrodible: true
}

elements.noita_honey = {
	color: ["#e8bd5a","#eac947","#e8bd5a","#eac947","#f0d99a"],
    name: "honey",
	behavior: behaviors.POWDER,
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: 0,
	category: "liquids",
	reactions: {
		"noita_fire": { elem1: "lava", elem2: "noita_smoke"  },
		"noita_diamond": { elem1: "ambrosia", elem2: "noita_poison", chance:0.50  },
	},
	state: "liquid",
	density: 10000,
	stain: -0.5,
	isFood: true,
	corrodible: true,
	meltableLavaFast: true,
}

elements.ambrosia = {
	color: "#ffcc34",
	behavior: behaviors.LIQUID,
	viscosity: 100,
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: 0,
	category: "liquids",
	reactions: {
		"diminution": { elem1: "noita_acid", elem2: "noita_smoke"  },
	},
	state: "liquid",
	density: 5120,
	conduct: 0.8,
	stain: -0.5,
	water: true,
	impure: true,
}

elements.frog.breakInto = ["slime","frog_meat"]

elements.frog_meat = {
	color: ["#cc4c4c","#b2588b","#c996e6","#cd7d8a","#c4a4a9","#8f4d53"],
	behavior: behaviors.STURDYPOWDER,
	onBreak: function(pixel) {
        if (Math.random() > 0.95) {
			changePixel(pixel,"frog_meat")
		}
		else if (Math.random() > 0.90) {
			changePixel(pixel,"noita_blood")
		}
	},
	burnable: true,
	reactions: {
        "whiskey": { elem2:"berserkium", chance:0.1 }
	},
    meat: true,
	tempHigh: 200,
	stateHigh: "cooked_meat",
	category:"food",
	burn:15,
	burnTime:200,
	burnInto:"cooked_meat",
	state: "solid",
	density: 6000,
	conduct: 0.2,
	isFood: true,
    corrodible: true
}

elements.ambiguous_meat = {
	color: ["#cc4c4c","#b2588b","#c996e6","#cd7d8a","#c4a4a9","#8f4d53"],
	behavior: behaviors.STURDYPOWDER,
	onBreak: function(pixel) {
        if (Math.random() > 0.95) {
			changePixel(pixel,"ambiguous_meat")
		}
		else if (Math.random() > 0.90) {
			changePixel(pixel,"noita_blood")
		}
	},
	burnable: true,
	reactions: {
	},
    meat: true,
	tempHigh: 200,
	stateHigh: "cooked_meat",
	category:"food",
	burn:15,
	burnTime:200,
	burnInto:"cooked_meat",
	state: "solid",
	density: 6000,
	conduct: 0.2,
	isFood: true,
    corrodible: true,
}

elements.worm_meat = {
	color: ["#6fa0c3","#6599bf","#b9d3dd","#94b9d0","#aac9d8","#5582a1"],
	behavior: behaviors.STURDYPOWDER,
	onBreak: function(pixel) {
        if (Math.random() > 0.95) {
			changePixel(pixel,"worm_meat")
		}
		else if (Math.random() > 0.90) {
			changePixel(pixel,"worm_blood")
		}
	},
	burnable: true,
	reactions: {
	},
    meat: true,
	tempHigh: 200,
	stateHigh: "cooked_meat",
	category:"food",
	burn:15,
	burnTime:200,
	burnInto:"cooked_meat",
	state: "solid",
	density: 6000,
	conduct: 0.2,
	isFood: true,
    corrodible: true,
}

elements.helpless_meat = {
	color: ["#cc4c4c","#b2588b","#c996e6","#cd7d8a","#c4a4a9","#8f4d53"],
	name: "meat of an innocent creature",
	behavior: behaviors.STURDYPOWDER,
	onBreak: function(pixel) {
        if (Math.random() > 0.95) {
			changePixel(pixel,"helpless_meat")
		}
		else if (Math.random() > 0.90) {
			changePixel(pixel,"noita_blood")
		}
	},
	burnable: true,
	reactions: {
	},
    meat: true,
	tempHigh: 200,
	stateHigh: "cooked_meat",
	category:"food",
	burn:15,
	burnTime:200,
	burnInto:"cooked_meat",
	state: "solid",
	density: 6000,
	conduct: 0.2,
	isFood: true,
    corrodible: true,
	desc: "You monster. How dare you."
}

elements.noita_meat = {
	color: ["#cc4c4c","#b2588b","#c996e6","#cd7d8a","#c4a4a9","#8f4d53"],
	name: "meat",
	behavior: behaviors.STURDYPOWDER,
	onBreak: function(pixel) {
        if (Math.random() > 0.95) {
			changePixel(pixel,"noita_meat")
		}
		else if (Math.random() > 0.90) {
			changePixel(pixel,"noita_blood")
		}
	},
	burnable: true,
	reactions: {
	},
    meat: true,
	tempHigh: 200,
	stateHigh: "cooked_meat",
	category:"food",
	burn:15,
	burnTime:200,
	burnInto:"cooked_meat",
	state: "solid",
	density: 6000,
	conduct: 0.2,
	isFood: true,
    corrodible: true,
}

elements.lightly_cooked_meat = {
	color: ["#b8a26e","#a67971","#e2dbb4","#c3af96","#c6beb4","#88785e"],
	behavior: behaviors.STURDYPOWDER,
	onBreak: function(pixel) {
        if (Math.random() > 0.95) {
			changePixel(pixel,"lightly_cooked_meat")
		}
		else if (Math.random() > 0.90) {
			changePixel(pixel,"noita_oil")
		}
	},
	burnable: true,
	reactions: {
		"noita_meat": { func:function(pixel1,pixel2){ if (Math.random()> 0.9) {changePixel(pixel2,"lightly_cooked_meat");} } },
	},
    meat: true,
	tempHigh: 200,
	stateHigh: "cooked_meat",
	category:"food",
	burn:15,
	burnTime:200,
	burnInto:"cooked_meat",
	state: "solid",
	density: 6000,
	conduct: 0.2,
	isFood: true,
    corrodible: true,
}
elements.noita_cooked_meat = {
	color: ["#a17858","#8e5f65","#cbb18d","#ac8779","#ab9b95","#715d52"],
	name: "cooked meat",
	behavior: behaviors.STURDYPOWDER,
	onBreak: function(pixel) {
        if (Math.random() > 0.95) {
			changePixel(pixel,"noita_cooked_meat")
		}
		else if (Math.random() > 0.90) {
			changePixel(pixel,"noita_oil")
		}
	},
	burnable: true,
	reactions: {
		"noita_meat": { func:function(pixel1,pixel2){ if (Math.random()> 0.9) {changePixel(pixel2,"noita_cooked_meat");} } },
		"lightly_cooked_meat": { func:function(pixel1,pixel2){ if (Math.random()> 0.9) {changePixel(pixel2,"noita_cooked_meat");} } },
	},
    meat: true,
	tempHigh: 200,
	stateHigh: "cooked_meat",
	category:"food",
	burn:15,
	burnTime:200,
	burnInto:"cooked_meat",
	state: "solid",
	density: 6000,
	conduct: 0.2,
	isFood: true,
    corrodible: true,
}

elements.fully_cooked_meat = {
	color: ["#6f533d","#624246","#a37e4a","#7d5a4d","#7b6962","#4e4039"],
	behavior: behaviors.STURDYPOWDER,
	onBreak: function(pixel) {
        if (Math.random() > 0.95) {
			changePixel(pixel,"fully_cooked_meat")
		}
		else if (Math.random() > 0.90) {
			changePixel(pixel,"noita_oil")
		}
	},
	burnable: true,
	reactions: {
		"noita_meat": { func:function(pixel1,pixel2){ if (Math.random()> 0.9) {changePixel(pixel2,"fully_cooked_meat");} } },
		"lightly_cooked_meat": { func:function(pixel1,pixel2){ if (Math.random()> 0.9) {changePixel(pixel2,"fully_cooked_meat");} } },
		"noita_cooked_meat": { func:function(pixel1,pixel2){ if (Math.random()> 0.9) {changePixel(pixel2,"fully_cooked_meat");} } },
	},
    meat: true,
	tempHigh: 200,
	stateHigh: "cooked_meat",
	category:"food",
	burn:15,
	burnTime:200,
	burnInto:"cooked_meat",
	state: "solid",
	density: 6000,
	conduct: 0.2,
	isFood: true,
    corrodible: true,
}

elements.burned_meat = {
	color: ["#403a35","#3c3435","#5b5246","#4a423f","#4e4a48","#302d2b"],
	behavior: behaviors.STURDYPOWDER,
	onBreak: function(pixel) {
        if (Math.random() > 0.95) {
			changePixel(pixel,"burned_meat")
		}
		else if (Math.random() > 0.90) {
			changePixel(pixel,"noita_oil")
		}
	},
	burnable: true,
	reactions: {
		"noita_meat": { func:function(pixel1,pixel2){ if (Math.random()> 0.9) {changePixel(pixel2,"lightly_cooked_meat");} } },
		"lightly_cooked_meat": { func:function(pixel1,pixel2){ if ( Math.random()> 0.9) {changePixel(pixel2,"noita_cooked_meat");} } },
		"noita_cooked_meat": { func:function(pixel1,pixel2){ if (Math.random()> 0.9) {changePixel(pixel2,"fully_cooked_meat");} } },
		"fully_cooked_meat": { func:function(pixel1,pixel2){ if (Math.random()> 0.995) {changePixel(pixel2,"burned_meat");} } },
	},
    meat: true,
	tempHigh: 200,
	stateHigh: "cooked_meat",
	category:"food",
	burn:15,
	burnTime:200,
	burnInto:"cooked_meat",
	state: "solid",
	density: 6000,
	conduct: 0.2,
	isFood: true,
    corrodible: true,
}

elements.acid.impure = true
elements.dirty_water.impure = true
elements.alcohol.impure = true
elements.blood.impure = true
elements.cement.impure = true
elements.melted_wax.impure = true
elements.slime.impure = true
elements.glue.impure = true
elements.seeds.impure = true
elements.potato_seed.impure = true
elements.grass_seed.impure = true
elements.wheat_seed.impure = true
elements.pumpkin_seed.impure = true
elements.corn_seed.impure = true
elements.mushroom_spore.impure = true
elements.grass.impure = true
elements.mushroom_stalk.impure = true
elements.mushroom_cap.impure = true
elements.mushroom_gill.impure = true
elements.hyphae.impure = true

elements.meat.meat = true
elements.rotten_meat.meat = true
elements.cured_meat.meat = true
elements.cooked_meat.meat = true

elements.purifying_powder = {
	color: ["#a7b6c4","#a9c4c3","#c4b5c4","#b1c4c4","#a2b4b0","#bec4b6","#ababb2"],
	behavior: behaviors.POWDER,
    tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
				elements.purifying_powder.tool(pixelMap[x][y]);
			}
		}
	},
    tool: function(impure) {
		if (elements[impure.element].impure === true) {
            changePixel(impure, "noita_water")
        }
	},
    canPlace: true,
	reactions: {
	},
	category: "powders",
	state: "solid",
	density: 6000,
	hardness: 0.99,
    corrodible: true
}

elements.alchemic_precursor = {
	color: ["#0843ec","#2b52e4","#2568db","#2250df","#1542e4"],
	behavior: behaviors.LIQUID,
    tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
				elements.alchemic_precursor.tool(pixelMap[x][y]);
			}
		}
	},
    tool: function(meat) {
		if (elements[meat.element].meat === true) {
            changePixel(meat, "draught_of_midas")
        }
	},
    canPlace: true,
	tempLow: -10,
	burn: 100,
	burnTime: 3,
	fireColor: ["#80acf0","#96cdfe","#bee6d4"],
	category: "liquids",
	reactions: {
        "magma": { elem1:"gas_of_midas" },
	},
	state: "liquid",
	density: 3500,
	conduct: 0.02,
	stain: -0.5,
	extinguish: true
}

elements.noita_acid = {
    name: "acid",
	color: "#00ff3c",
    behavior: behaviors.LIQUID,
	tick: function(pixel) {
		for (var i = 0; i < adjacentCoords.length; i++) {
			var x = pixel.x+adjacentCoords[i][0];
			var y = pixel.y+adjacentCoords[i][1];
			if (!isEmpty(x,y,true)) {
				var newPixel = pixelMap[x][y];
				if ((elements[newPixel.element].corrodible !== true || elements.acid.ignore.indexOf(newPixel.element) !== -1 && elements.noita_acid.ignore.indexOf(newPixel.element) !== -1)) { 
                }
				else { 
                    changePixel(newPixel,"flammable_gas"); 
                }
			}
		}
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.92 && (pixel.start + 225) < pixelTicks) {
			changePixel(pixel,"flammable_gas")
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.92 && (pixel.start + 225) < pixelTicks) {
			changePixel(pixel,"flammable_gas")
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.92 && (pixel.start + 225) < pixelTicks) {
			changePixel(pixel,"flammable_gas")
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.92 && (pixel.start + 225) < pixelTicks) {
			changePixel(pixel,"flammable_gas")
		}
		doDefaults(pixel);
	},
    ignore:["noita_acid","acid"],
	reactions: {
        "flammable_gas": {elem1:"flammable_gas",elem2:null, chance:0.12}
	},
	category: "liquids",
	tempHigh: 150,
	stateHigh: "flammable_gas",
	tempLow: -58.88,
	burn: 30,
	burnTime: 1,
	state: "liquid",
	density: 2900,
	stain: -0.1,
    impure: true,
}

elements.flammable_gas = {
	color: ["#357d22","#357d22","#357d22","#357d22","#285e1a",],
	behavior: behaviors.GAS,
    tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.70 && (pixel.start + 225) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.70 && (pixel.start + 225) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.70 && (pixel.start + 225) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.70 && (pixel.start + 225) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	burnableFast: true,
	category: "gases",
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: -45,
	burn: 100,
	burnTime: 1,
	fireColor: ["#00ffff","#00ffdd"],
	state: "gas",
	density: 2,
	alias: "gas"
}

elements.draught_of_midas = {
	color: ["#ffea47","#ffde5a","#ffea47","#ffde5a","#fffa9a","#ffea47","#ffde5a",],
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+3);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
				elements.draught_of_midas.tool(pixelMap[x][y]);
			}
		}
	},
	tool: function(pixel) {
		if (elements[pixel.element].id === elements.midas_touch.id) { return; }
        if (elements[pixel.element].id === elements.draught_of_midas.id) { return; }
        if (elements[pixel.element].id === elements.gas_of_midas.id) { return; }
		if (elements.midas_touch.reactions[pixel.element]) { return; }
        if (elements.draught_of_midas.reactions[pixel.element]) { return; }
        if (elements.gas_of_midas.reactions[pixel.element]) { return; }
		if (Math.random() < (elements[pixel.element].hardness || 0.25)) { return; }
		if (elements[pixel.element].state === "gas" && elements[pixel.element].id !== elements.mud.id && elements[pixel.element].id !== elements.noita_mud.id) {
			changePixel(pixel,"gold_coin");
			pixel.color = pixelColorPick(pixel,["#ffdf5e","#ffe682"]);
		}
		else if (elements[pixel.element].movable && elements[pixel.element].id !== elements.mud.id && elements[pixel.element].id !== elements.noita_mud.id) {
			changePixel(pixel,"gold_coin");
		}
        else if (elements[pixel.element].id === elements.alchemic_precursor.id) {
			changePixel(pixel, "draught_of_midas");
		}
		else if (elements[pixel.element].id !== elements.mud.id && elements[pixel.element].id !== elements.noita_mud.id) {
			changePixel(pixel,"gold_coin");
		}
	},
	canPlace: true,
	reactions: {
		"gold":{}, "gold_coin":{}, "rose_gold":{}, "blue_gold":{}, "purple_gold":{}, "electrum":{},
		"molten_gold":{}, "pipe":{},
		"paper": { stain2:"#54803d" },
		"head": { elem2:"gold" },
		"body": { elem2:"gold" },
		"copper": { elem2:"rose_gold" },
		"gallium": { elem2:"blue_gold" },
		"molten_gallium": { elem2:"blue_gold" },
		"aluminum": { elem2:"purple_gold" },
		"silver": { elem2:"electrum" }
	},
	density: 997,
	state: "liquid",
	category:"liquids",
}

elements.gas_of_midas = {
	color: ["#ffea47","#ffde5a","#ffea47","#ffde5a","#fffa9a","#ffea47","#ffde5a",],
	behavior: behaviors.GAS,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && elements[pixelMap[x][y].element].id !== elements.gold.id && elements[pixelMap[x][y].element].id !== elements.gold_coin.id && elements[pixelMap[x][y].element].id !== elements.midas_touch.id && elements[pixelMap[x][y].element].id !== elements.draught_of_midas.id && elements[pixelMap[x][y].element].id !== elements.gas_of_midas.id) {
                    elements.draught_of_midas.tool(pixelMap[x][y]);
                    changePixel(pixel,"gold_coin")
                }
			}
		}
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.70 && (pixel.start + 204) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.70 && (pixel.start + 204) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.70 && (pixel.start + 204) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.70 && (pixel.start + 204) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
	},
	tool: function(pixel) {
		if (elements[pixel.element].id === elements.midas_touch.id) { return; }
        if (elements[pixel.element].id === elements.draught_of_midas.id) { return; }
        if (elements[pixel.element].id === elements.gas_of_midas.id) { return; }
		if (elements.midas_touch.reactions[pixel.element]) { return; }
        if (elements.draught_of_midas.reactions[pixel.element]) { return; }
        if (elements.gas_of_midas.reactions[pixel.element]) { return; }
		if (Math.random() < (elements[pixel.element].hardness || 0.25)) { return; }
		if (elements[pixel.element].state === "gas" && elements[pixel.element].id !== elements.mud.id && elements[pixel.element].id !== elements.noita_mud.id && Math.random() > 0.90) {
			changePixel(pixel,"gold_coin");
			pixel.color = pixelColorPick(pixel,["#ffdf5e","#ffe682"]);
		}
		else if (elements[pixel.element].movable && elements[pixel.element].id !== elements.mud.id && elements[pixel.element].id !== elements.noita_mud.id && Math.random() > 0.90) {
			changePixel(pixel,"gold_coin");
		}
		else if (elements[pixel.element].id !== elements.mud.id && elements[pixel.element].id !== elements.noita_mud.id && Math.random() > 0.90) {
			changePixel(pixel,"gold_coin");
		}
	},
	canPlace: true,
	reactions: {
		"gold":{}, "gold_coin":{}, "rose_gold":{}, "blue_gold":{}, "purple_gold":{}, "electrum":{},
		"molten_gold":{}, "pipe":{},
		"paper": { stain2:"#54803d" },
		"head": { elem2:"gold" },
		"body": { elem2:"gold" },
		"copper": { elem2:"rose_gold" },
		"gallium": { elem2:"blue_gold" },
		"molten_gallium": { elem2:"blue_gold" },
		"aluminum": { elem2:"purple_gold" },
		"silver": { elem2:"electrum" }
	},
    tempLow: -50,
    stateLow: "draught_of_midas",
	density: 997,
	state: "gas",
	category:"liquids",
}

elements.noita_blood = {
	color: "#820000",
	name: "blood",
	behavior: behaviors.LIQUID,
	reactions: {
	},
	viscosity: 10,
	tempHigh: 150,
	stateHigh: "noita_steam",
	tempLow: -50,
	category:"liquids",
	state: "liquid",
	density: 1060,
	stain: 0.05,
	impure: true,
	blood: true,
}

elements.worm_blood = {
	color: ["#a0a72f","#92982c","#bec538"],
	behavior: behaviors.LIQUID,
	reactions: {
		"freezing_liquid": { elem2: "worm_blood", chance:0.20 },
		"worm_pheremone": { elem1: "flummoxium", elem2: "flummoxium", chance:0.15 },
	},
	viscosity: 10,
	tempHigh: 150,
	stateHigh: "noita_steam",
	tempLow: -10,
	category:"liquids",
	state: "liquid",
	density: 1060,
	stain: 0.05,
	impure: true,
	blood: true,
}

elements.soil = {
	color: ["#272618","#232018","#27282d","#36311e"],
	behavior: behaviors.POWDER,
	reactions: {
	},
    tick: function(pixel) {
        if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.98 && (pixel.start + 100) < pixelTicks) {
            changePixel(pixel, "noita_grass")
        }
	},
	tempHigh: 1500,
	tempLow: -50,
	stateLow: "permafrost",
	category:"land",
	state: "solid",
	density: 1220,
    corrodible: true
}

elements.noita_mud = {
	color: ["#464128","#686841","#5f5731","#3b3325"],
    name: "mud",
    behavior: behaviors.POWDER,
	reactions: {
		"toxic_sludge": { elem2:"swamp_water", chance:0.15 },
	},
	tempHigh: 1500,
	stateHigh: "molten_soil",
	onStateHigh: function(pixel) {
		releaseElement(pixel,"noita_steam");
	},
	tempLow: -50,
	stateLow: "permafrost",
	category: "land",
	state: "solid",
	density: 2000,
	stain: 0.025,
    impure: true,
    corrodible: true
}

elements.whiskey = {
	color: "#e87106",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.96 && (pixel.start + 25) < pixelTicks) {
			createPixel("whiskey_fumes",pixel.x+1,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.96 && (pixel.start + 25) < pixelTicks) {
			createPixel("whiskey_fumes",pixel.x-1,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.96 && (pixel.start + 25) < pixelTicks) {
			createPixel("whiskey_fumes",pixel.x,pixel.y+1)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.96 && (pixel.start + 25) < pixelTicks) {
			createPixel("whiskey_fumes",pixel.x,pixel.y-1)
		}
		doDefaults(pixel);
	},
	reactions: {
		"frog_meat": { elem1:"berserkium", chance:0.1 }
	},
	tempHigh: 150,
	stateHigh: "whiskey_fumes",
	tempLow: -100,
	burn: 100,
	burnTime: 3,
	fireColor: ["#80acf0","#96cdfe","#bee6d4"],
	category: "liquids",
	state: "liquid",
	density: 785.1,
	stain: -0.25,
	isFood: true,
	darkText: true,
	alias: "alcohol",
    impure: true,
}

elements.whiskey_fumes = {
	color: ["#994d0a","#994d0a","#994d0a","#994d0a","#7f4004",],
	behavior: behaviors.GAS,
    tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.75 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.75 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.75 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.75 && (pixel.start + 25) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        doNHeat(pixel)
        doNBurning(pixel)
		doDefaults(pixel);
	},
	burnable: true,
	nburnTime: 25,
	category: "gases",
	tempHigh: 1000,
	stateHigh: "noita_fire",
	tempLow: -45,
	burn: 100,
	burnTime: 1,
	fireColor: ["#00ffff","#00ffdd"],
	state: "gas",
	density: 2,
	alias: "gas"
}

elements.beer = {
	color: "#bb7e03",
	behavior: behaviors.LIQUID,
	reactions: {
	},
	tempHigh: 150,
	tempLow: -100,
	burn: 100,
	burnTime: 3,
	fireColor: ["#80acf0","#96cdfe","#bee6d4"],
	category: "liquids",
	state: "liquid",
	density: 785.1,
	stain: -0.25,
	isFood: true,
	darkText: true,
	alias: "alcohol",
    impure: true
}

elements.concentrated_mana = {
	color: "#0cffff",
	behavior: behaviors.LIQUID,
	onCollide: function(pixel1,pixel2) {
		if (elements[pixel2.element].meltableMetal === true && Math.random() < 0.25) {
			changePixel(pixel2,"noita_steam")
		}
	},
	reactions: {
        "noita_water": { elem2:"concentrated_mana", chance:0.25 },
		"noita_gold": { elem2:"noita_steam", chance:0.25 },
		"noita_glass": { elem2:"noita_steam", chance:0.25 },
		"glass_broken": { elem2:"noita_steam", chance:0.25 },
		"teleportatium": { elem2:"noita_fire", chance:0.10 },
		"unstable_teleportatium": { elem2:"noita_fire", chance:0.10 },
		"diminution": { elem1:"noita_steam", elem2:"noita_steam", chance:0.60 },
	},
	tempHigh: 150,
	tempLow: -100,
	category: "liquids",
	state: "liquid",
	density: 2412,
	stain: -0.05,
	isFood: true,
	darkText: true,
    impure: true
}

elements.berserkium = {
	color: "#ff989b",
	behavior: behaviors.LIQUID,
	reactions: {
        "flummoxium": { elem1:"pheremone", elem2:"pheremone", chance:0.25 }
	},
	tempHigh: 150,
	tempLow: -113.88,
	category: "liquids",
	state: "liquid",
	density: 2412,
	stain: -0.05,
	isFood: true,
	darkText: true,
    impure: true
}

elements.flummoxium = {
	color: ["#8c83c2","#ed7cc2","#8ce4bb","#f4dd5a","#f47c61"],
	behavior: behaviors.LIQUID,
	reactions: {
        "berserkium": { elem1:"pheremone", elem2:"pheremone", chance:0.25 },
        "noita_brass": { elem1:"levitatium", elem2:"levitatium", chance:0.25 },
        "noita_copper": { elem1:"levitatium", elem2:"levitatium", chance:0.25 },
        "noita_diamond": { elem1:"levitatium", elem2:"levitatium", chance:0.25 },
        "noita_gold": { elem1:"levitatium", elem2:"levitatium", chance:0.25 },
        "metal_dust": { elem1:"levitatium", elem2:"levitatium", chance:0.25 },
        "noita_silver": { elem1:"levitatium", elem2:"levitatium", chance:0.25 },
        "noita_steel": { elem1:"levitatium", elem2:"levitatium", chance:0.25 },
        "toxic_gold": { elem1:"levitatium", elem2:"levitatium", chance:0.25 },
	},
	tempHigh: 150,
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1200,
	stain: -0.05,
	isFood: true,
	darkText: true,
    impure: true
}

elements.diminution = {
	color: ["#0cce2c","#0fdb2f","#19e738",],
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && (elements[pixelMap[x][y].element].fungus === true)) {
					changePixel(pixelMap[x][y],"noita_sand")
                }
			}
		}
	},
	reactions: {
        "berserkium": { elem2:"noita_water", chance:0.60 },
        "mycelium": { elem2:"soil" },
        "levitatium": { elem1:"toxic_sludge", elem2:"toxic_sludge", chance:0.60 },
        "ambrosia": { elem1:"noita_smoke", elem2:"noita_acid", chance:0.80 },
        "noita_gold": { elem2:"noita_silver" },
        "noita_molten_gold": { elem2:"noita_molten_silver" },
        "noita_diamond": { elem1:"noita_steam", elem2:"toxic_sludge" },
        "noita_salt": { elem2:"noita_smoke" },
        "flammable_gas": { elem2:"diminution" },
	},
	tempHigh: 150,
    stateHigh: "diminution_cloud",
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1872,
	stain: -0.05,
	isFood: true,
	darkText: true,
    impure: true
}

elements.diminution_cloud = {
	color: ["#1cf53b","#0fdc2f","#12e932","#0f961f","#15a425"],
    tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	behavior: behaviors.GAS,
	tempLow: -10,
	stateLow: "diminution",
	category: "gases",
	state: "gas",
	density: 1000,
	isFood: true,
	darkText: true,
}

elements.healthium = {
	color: "#d8ffba",
	behavior: behaviors.LIQUID,
	reactions: {
		"noita_grass": { elem2:"holy_grass", elem1: null, chance:0.80 },
        "purifying_powder": { elem1:"noita_gunpowder", elem2:"noita_gunpowder", chance:0.80 },
		"lava": { elem1:"healium", chance:0.70 },
	},
	tempHigh: 150,
    stateHigh: "healium",
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1872,
	stain: -0.05,
	isFood: true,
	darkText: true,
	water: true,
}

elements.healium = {
	color: ["#adff99","#adff99","#adff99","#98e786","#98e786"],
    tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	behavior: behaviors.GAS,
	tempLow: -10,
	stateLow: "healthium",
	category: "gases",
	state: "gas",
	density: 1000,
	isFood: true,
	darkText: true,
}

elements.teleportatium = {
	color: "#aaffff",
	behavior: behaviors.LIQUID,
	reactions: {
		"noita_copper": { elem1:"noita_smoke", elem2:"noita_brass", chance:0.50 },
		"noita_silver": { elem1:"teleportatium_cloud", elem2:"teleportatium_cloud", chance:0.1, },
		"whiskey": { elem1:"unstable_teleportatium", chance:0.21 },
		"concentrated_mana": { elem1:"noita_fire", chance:0.10 },
		"lava": { elem1:"freezing_vapour", chance:0.70 },
	},
	tempHigh: 150,
	stateHigh: "teleportatium_cloud",
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1872,
	stain: -0.05,
	isFood: true,
	darkText: true,
    impure: true
}

elements.teleportatium_cloud = {
	color: ["#74bcda","#74bcda","#74bcda","#63a2b9","#63a2b9"],
    tick: function(pixel) {
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x-1,pixel.y) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
        else if (isEmpty(pixel.x,pixel.y-1) && Math.random() > 0.70 && (pixel.start + 125) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
		doDefaults(pixel);
	},
	behavior: behaviors.GAS,
	tempLow: -10,
	category: "gases",
	state: "gas",
	density: 2000,
	isFood: true,
	darkText: true,
}

elements.unstable_teleportatium = {
	color: "#3fffff",
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		var coords = rectCoords(pixel.x-1,pixel.y-1,pixel.x+1,pixel.y+1);
		for (var i = 0; i < coords.length; i++) { 
			var x = coords[i].x;
			var y = coords[i].y;
			if (!isEmpty(x,y,true)) {
                if (!outOfBounds(x,y) && (elements[pixelMap[x][y].element].slime === true)) {
                    changePixel(pixel,"teleportatium")
					changePixel(pixelMap[x][y],"teleportatium")
                }
			}
		}
	},
	reactions: {
		"noita_brass": { elem1:"noita_smoke", elem2:"metal_dust", chance:0.50 },
		"flummoxium": { elem1:"noita_smoke", elem2:"guiding_powder" },
		"concentrated_mana": { elem1:"noita_fire", chance:0.10 },
		"lava": { elem1:"freezing_vapour", chance:0.70 },
	},
	tempHigh: 150,
	stateHigh: "teleportatium_cloud",
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1872,
	stain: -0.05,
	isFood: true,
	darkText: true,
    impure: true
}

elements.toxic_sludge = {
	color: "#cbff11",
	behavior: behaviors.LIQUID,
	reactions: {
        "brine": { elem1:"noita_water", chance:0.20 },
        "water": { elem1:"noita_water", chance:0.13 },
        "noita_water": { elem1:"noita_water", chance:0.13 },
        "noita_mud": { elem1:"swamp_water", chance:0.15 },
	},
    viscosity: 5,
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1872,
	stain: -0.05,
	isFood: true,
	darkText: true,
    impure: true,
    corrodible: true,
	soluble: true,
}

elements.levitatium = {
	color: "#f5f5f5",
	behavior: behaviors.LIQUID,
	reactions: {
        "diminution": { elem1:"toxic_sludge", elem2:"toxic_sludge", chance:0.25 },
        "acceleratium": { elem1:"hastium", elem2:"hastium", chance:0.25 },
	},
	tempHigh: 150,
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 1200,
	stain: -0.05,
	isFood: true,
	darkText: true,
    impure: true
}

elements.pheremone = {
	color: "#ff4072",
	behavior: behaviors.LIQUID,
	reactions: {
	},
	tempHigh: 150,
	tempLow: -10,
	category: "liquids",
	state: "liquid",
	density: 3513,
	stain: -0.05,
	isFood: true,
	darkText: true,
	water: true,
	impure: true
}

// substances above
// creatures below

elements.noita = {
	color: ["#2b2429","#151515"],
	category: "life",
	properties: {
		dead: false,
		dir: 1,
		panic: 0
	},
	onPlace: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("noita_body", pixel.x, pixel.y+1);
			var color = pixel.color;
			changePixel(pixel,"noita_head");
			pixel.color = color;
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("noita_head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			changePixel(pixel,"noita_body");
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	reactions: {
	},
	related: ["noita_body","noita_head"],
	cooldown: defaultCooldown,
	forceSaveColor: true,
	blood: "noita_blood",
	living: true,
}

elements.noita_body = {
	color: ["#996e98","#6a406a","#d69f34","#996e98","#6a406a"],
	category: "life",
	hidden: true,
	density: 6000,
	state: "solid",
	conduct: .05,
	tempHigh: 150,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "noita_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: "noita_meat",
	forceSaveColor: true,
	pickElement: "noita",
	reactions: {
	},
	properties: {
		maxhp: 10000,
		hp: 10000,
		dir: 1,
		panic: 0
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element === "noita_head") {
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
		if (pixel.hp < 1) {
			pixel.element = "noita_meat"
			if (pixel.head) {
				pixel.head.element = "noita_meat"
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "noita_head") {
			pixel.head = pixelMap[pixel.x][pixel.y-1];
			if (pixel.head.hp < 1) { // If head is dead, kill body
				pixel.hp = pixel.head.hp;
			}
			else if (pixel.head.panic > 0) {
				pixel.panic = pixel.head.panic;
				delete pixel.head.panic;
			}
		}
		else { pixel.head = null }
		if (pixel.head && Math.random() < 0.25) {
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
				createPixel("noita_blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (pixel.head === null) { return }
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
						movePixel(pixel.head, pixel.head.x+move[0], pixel.head.y+move[1]);
						moved = true;
						break;
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.10 || !moved) {
				pixel.dir *= -1;
			}
			
		}
		if (pixel.temp > 150 && Math.random() > 0.75) { 
			DoDamage(pixel,"fire",10)
			pixel.panic++
		}
		if (pixel.temp < -25) { 
			DoDamage(pixel,"ice",10)
			pixel.panic++
		}
		DoNoitaHumanoid(pixel)
	},
	onCollide: function(pixel,damagePixel) {
		DoNoitaStaining(pixel,damagePixel)
	},
	onBreak: function(pixel) {
		releaseElement(pixel,elements[pixel.element].blood,4);
	},
	blood: "noita_blood",
	living: true,
}

elements.noita_head = {
	color: ["#996e98","#6a406a","#996e98","#6a406a","#2b2429","#151515","#2b2429","#151515","#2b2429","#151515","#2b2429","#151515","#2b2429","#151515","#2b2429","#151515"],
	category: "life",
	hidden: true,
	density: 6000,
	state: "solid",
	conduct: .05,
	tempHigh: 150,
	stateHigh: "noita_cooked_meat",
	tempLow: -30,
	stateLow: "noita_meat",
	burn: 10,
	burnTime: 250,
	burnInto: "cooked_meat",
	breakInto: "noita_meat",
	forceSaveColor: true,
	pickElement: "noita",
	reactions: {
	},
	properties: {
		hp: 10000,
		maxhp: 10000,
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.hp < 1) {
			pixel.element = "noita_meat"
			return
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "noita_body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.hp !== pixel.hp) {
				pixel.hp = body.hp;
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
				createPixel("noita_blood", pixel.x, pixel.y+1);
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
	},
	onBreak: function(pixel) {
		releaseElement(pixel,elements[pixel.element].blood,4);
	},
	blood: "noita_blood",
	living: true,
}

elements.lammas = {
	color: ["#cbcbcb","#ebebeb","#fffffe","#cbcbcb","#ebebeb","#fffffe","#ffcf93","#ffb373","#cbcbcb","#ebebeb","#fffffe"],
	properties: {
		maxhp: 250,
		hp: 250,
		dir: 1,
		panic: 0,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) {} // Fall
		doDefaults(pixel);
        if (pixel.hp < 1) {
            pixel.element = "helpless_meat"
            return
        }
        if (pixel.panic > 0) {
            pixel.panic -= 0.1;
            if (pixel.panic < 0) { pixel.panic = 0; }
        }
        if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
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
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if (hitPixel.element === "lammas" && hitPixel.panic < pixel.panic) {
						hitPixel.panic = pixel.panic;
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved) {
				pixel.dir *= -1;
			}

			if (pixel.temp > 150 && Math.random() > 0.75) { 
				DoDamage(pixel,"fire",10)
				pixel.panic++
			}
			if (pixel.temp < -25) { 
				DoDamage(pixel,"ice",10)
				pixel.panic++
			}
			DoNoitaCreature(pixel)
		}

    },
	onCollide: function(pixel,damagePixel) {
		DoNoitaStaining(pixel,damagePixel)
	},
	onBreak: function(pixel) {
		releaseElement(pixel,elements[pixel.element].blood,4);
	},
	reactions: {
	},
	category: "life",
	tempLow: -50,
	stateLow: "helpless_meat",
	tempHigh: 200,
	stateHigh: "helpless_meat",
	breakInto: "helpless_meat",
	breakIntoColor: ["#cbcbcb","#ebebeb","#fffffe","#cbcbcb","#ebebeb","#fffffe","#ffcf93","#ffb373","#cbcbcb","#ebebeb","#fffffe"],
	blood: "noita_blood",
	burn:80,
	burnTime:150,
	state: "solid",
	density: 6000,
	conduct: 0.25,
	living: true,
}

elements.evakas = {
	properties: {
		maxhp: 250,
		hp: 250,
		dir: 1,
		panic: 0,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) {} // Fall
		doDefaults(pixel);
        if (pixel.hp < 1) {
            pixel.element = "helpless_meat"
            return
        }
        if (pixel.panic > 0) {
            pixel.panic -= 0.1;
            if (pixel.panic < 0) { pixel.panic = 0; }
        }
        if (Math.random() < 0.1*((!isEmpty(pixel.x, pixel.y+1,true) && !outOfBounds(pixel.x, pixel.y+1,true) && elements[pixelMap[pixel.x][pixel.y+1].element].id === elements.noita_water.id) ? 1 : pixel.panic+1)) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,1],
				[1*pixel.dir,-1],
			];
			let moved = false;
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (!isEmpty(pixel.x+move[0], pixel.y+move[1],true) && !outOfBounds(pixel.x+move[0], pixel.y+move[1],true) && elements[pixelMap[pixel.x+move[0]][pixel.y+move[1]].element].id === elements.noita_water.id) {
					var origx = pixel.x+move[0];
					var origy = pixel.y+move[1];
					swapPixels(pixel, pixelMap[pixel.x+move[0]][pixel.y+move[1]])
					if (pixel.x===origx && pixel.y===origy) {
						moved = true;
						break;
					}
				}
				else if (isEmpty(pixel.x+move[0], pixel.y+move[1]) || outOfBounds(pixel.x+move[0], pixel.y+move[1]) || elements[pixelMap[pixel.x+move[0]][pixel.y+move[1]].element].id !== elements.noita_water.id) {
				}
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if (hitPixel.element === "evakas" && hitPixel.panic < pixel.panic) {
						hitPixel.panic = pixel.panic;
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved || outOfBounds(pixel.x+1, pixel.y) || outOfBounds(pixel.x-1, pixel.y)) {
				pixel.dir *= -1;
			}
			if (pixel.temp > 150 && Math.random() > 0.75) { 
				DoDamage(pixel,"fire",10)
				pixel.panic++
			}
			if (pixel.temp < -25) { 
				DoDamage(pixel,"ice",10)
				pixel.panic++
			}
			DoNoitaCreature(pixel)
		}

    },
	onCollide: function(pixel,damagePixel) {
		DoNoitaStaining(pixel,damagePixel)
	},
	onBreak: function(pixel) {
		releaseElement(pixel,elements[pixel.element].blood,4);
	},
	color: ["#313540","#4e5b95","#4e5b95","#4c89ab"],
	name:"eväkäs",
	reactions: {
	},
	tempHigh: 200,
	tempLow: -50,
	stateLow: "helpless_meat",
	category:"life",
	stateHigh: "helpless_meat",
	breakInto: "helpless_meat",
	breakIntoColor: ["#313540","#4e5b95","#4e5b95","#4c89ab"],
	blood: "noita_blood",
	burn:20,
	burnTime:200,
	state: "solid",
	density: 1080,
	conduct: 0.2,
	living: true,
}

elements.hamis = {
	color: ["#52316f","#52316f","#beda65","#52316f","#52316f","#beda65","#52316f","#52316f","#beda65","#2d1b3d","#2d1b3d","#2d1b3d","#2d1b3d","#634c7e"],
	name: "hämis",
	properties: {
		maxhp: 275,
		hp: 275,
		dir: 1,
		panic: 0,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) {} // Fall
		doDefaults(pixel);
        if (pixel.hp < 1) {
            pixel.element = "noita_meat"
            return
        }
        if (pixel.panic > 0) {
            pixel.panic -= 0.1;
            if (pixel.panic < 0) { pixel.panic = 0; }
        }
        if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
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
				else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
					var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
					if (hitPixel.element === "hamis") {
						DoDamage(pixel,"melee",750)
					}
				}
			}
			// 15% chance to change direction
			if (Math.random() < 0.15 || !moved) {
				pixel.dir *= -1;
			}

			if (pixel.temp > 150 && Math.random() > 0.75) { 
				DoDamage(pixel,"fire",10)
				pixel.panic++
			}
			if (pixel.temp < -25) { 
				DoDamage(pixel,"ice",10)
				pixel.panic++
			}
			DoNoitaCreature(pixel)
		}

    },
	onCollide: function(pixel,damagePixel) {
		DoNoitaStaining(pixel,damagePixel)
	},
	onBreak: function(pixel) {
		releaseElement(pixel,elements[pixel.element].blood,4);
	},
	reactions: {
	},
	category: "life",
	tempLow: -50,
	stateLow: "noita_meat",
	tempHigh: 200,
	stateHigh: "noita_meat",
	breakInto: "noita_meat",
	breakIntoColor: ["#52316f","#52316f","#beda65","#52316f","#52316f","#beda65","#52316f","#52316f","#beda65","#2d1b3d","#2d1b3d","#2d1b3d","#2d1b3d","#634c7e"],
	blood: "noita_blood",
	burn:80,
	burnTime:150,
	state: "solid",
	density: 6000,
	conduct: 0.25,
	living: true,
}

// creatures above
// props below

elements.lantern = {
	color: ["#524526","#6c9ccc","#6c9ccc","#efd97d","#6c9ccc","#6c9ccc","#6d5c2e","#524526","#6c9ccc","#647cdc","#efd97d","#6c9ccc","#647cdc","#6d5c2e","#23211b"],
	properties: {
		maxhp: 375,
		hp: 375,
	},
	tick: function(pixel) {
		if (!tryMove(pixel, pixel.x, pixel.y+1)) {
			tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y+1);
		}
		doDefaults(pixel);
        if (pixel.hp < 1) {
            pixel.element = "glass_broken"
            return
        }

		if (pixel.temp > 150 && Math.random() > 0.75) { 
			DoDamage(pixel,"fire",10)
		}
		if (pixel.temp < -25) { 
			DoDamage(pixel,"ice",10)
		}

    },
	onBreak: function(pixel) {
		releaseElement(pixel,elements[pixel.element].blood,4);
	},
	reactions: {
	},
	category: "props",
	tempLow: -50,
	stateLow: "glass_broken",
	tempHigh: 200,
	stateHigh: "glass_broken",
	breakInto: "glass_broken",
	breakIntoColor: ["#524526","#6c9ccc","#efd97d","#6c9ccc","#6d5c2e","#524526","#6c9ccc","#efd97d","#6c9ccc","#6d5c2e","#23211b"],
	blood: "noita_oil",
	burnTime:150,
	state: "solid",
	density: 6000,
	conduct: 0.25,
	living: true,
}

elements.propane_tank = {
	color: ["#60547a","#78669d","#ccbc6c","#78669d","#8777ae","#78669d","#8f7340","#78669d","#60547a"],
	properties: {
		maxhp: 5000,
		hp: 5000,
	},
	tick: function(pixel) {
		if (!tryMove(pixel, pixel.x, pixel.y+1)) {
			tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y+1);
		}
		doDefaults(pixel);
        if (pixel.hp < 1) {
            pixel.element = "noita_prop_steel"
			releaseElement(pixel,"freezing_vapour")
			NExplode(pixel.x,pixel.y,6,32500,["freezing_vapour"])
            return
        }

		if (pixel.temp > 150 && Math.random() > 0.75) { 
			DoDamage(pixel,"fire",10)
		}
		if (pixel.temp < -25) { 
			DoDamage(pixel,"ice",10)
		}
    },
	onBreak: function(pixel) {
		releaseElement(pixel,elements[pixel.element].blood,4);
		changePixel(pixel,"propane_tank_spell")
	},
	reactions: {
	},
	category: "props",
	tempLow: -50,
	stateLow: "noita_prop_steel",
	tempHigh: 200,
	stateHigh: "noita_prop_steel",
	breakInto: "noita_prop_steel",
	breakIntoColor: ["#60547a","#78669d","#ccbc6c","#78669d","#8777ae","#78669d","#8f7340","#78669d","#60547a"],
	blood: "freezing_liquid",
	burnTime:150,
	state: "solid",
	density: 6000,
	conduct: 0.25,
	living: true,
}

// props above
// spells below

elements.square_of_fire = {
    color: "#ff9700",
    category: "spells",
    hidden: true,
    tick: function(pixel){
        if (!pixel.expandedT){
            pixel.expandedT = 0
        }
        if (pixel.expandedT === 0){
            for (i = 0; i < squareCoords.length; i++){
                let x = squareCoords[i][0] + pixel.x;
                let y = squareCoords[i][1] + pixel.y;
                if (isEmpty(x, y)){
                    createPixel(pixel.element, x, y)
                }
            }
        }
        pixel.expandedT ++;
        if (pixel.expandedT > 2){
			if (Math.random() > 0.5) {
            	changePixel(pixel, "noita_fire")
            	return
        	}
			else {
            	deletePixel(pixel.x,pixel.y)
        		return
        	}
        }
    },
    movable: false,
    hardness: 0.8
}

elements.square_of_acid = {
    color: "#00ff3c",
    category: "spells",
    hidden: true,
    tick: function(pixel){
        if (!pixel.expandedT){
            pixel.expandedT = 0
        }
        if (pixel.expandedT === 0){
            for (i = 0; i < squareCoords.length; i++){
                let x = squareCoords[i][0] + pixel.x;
                let y = squareCoords[i][1] + pixel.y;
                if (isEmpty(x, y)){
                    createPixel(pixel.element, x, y)
                }
            }
        }
        pixel.expandedT ++;
        if (pixel.expandedT > 2){
            if (Math.random() > 0.5) {
            	changePixel(pixel, "noita_acid")
        		return
        	}
			else {
            	deletePixel(pixel.x,pixel.y)
        		return
        	}
        }
    },
    movable: false,
    hardness: 0.8
}

elements.square_of_oil = {
    color: "#3d3628",
    category: "spells",
    hidden: true,
    tick: function(pixel){
        if (!pixel.expandedT){
            pixel.expandedT = 0
        }
        if (pixel.expandedT === 0){
            for (i = 0; i < squareCoords.length; i++){
                let x = squareCoords[i][0] + pixel.x;
                let y = squareCoords[i][1] + pixel.y;
                if (isEmpty(x, y)){
                    createPixel(pixel.element, x, y)
                }
            }
        }
        pixel.expandedT ++;
        if (pixel.expandedT > 2) {
            if (Math.random() > 0.5) {
            	changePixel(pixel, "noita_oil")
        		return
        	}
			else {
            	deletePixel(pixel.x,pixel.y)
        		return
        	}
        }
    },
    movable: false,
    hardness: 0.8
}

elements.square_of_water = {
    color: "#366158",
    category: "spells",
    hidden: true,
    tick: function(pixel){
        if (!pixel.expandedT){
            pixel.expandedT = 0
        }
        if (pixel.expandedT === 0){
            for (i = 0; i < squareCoords.length; i++){
                let x = squareCoords[i][0] + pixel.x;
                let y = squareCoords[i][1] + pixel.y;
                if (isEmpty(x, y)){
                    createPixel(pixel.element, x, y)
                }
            }
        }
        pixel.expandedT ++;
        if (pixel.expandedT > 2){
            if (Math.random() > 0.5) {
            	changePixel(pixel, "noita_water")
        		return
        	}
			else {
            	deletePixel(pixel.x,pixel.y)
        		return
        	}
        }
    },
    movable: false,
    hardness: 0.8
}

elements.acid_ball = {
    color: ["#84b44c","#cce464","#5c7c4c"],
	tick: function(pixel) {
    	if (!pixel.xDir && !pixel.Dirx) {
			let Brandom = Math.random()
			if (Brandom > 0.5) {
				pixel.xDir = 1 
				pixel.Dirx = true
			}
			else {
				pixel.xDir = -1
				pixel.Dirx = true 
			}
		}
		if (!pixel.yDir && !pixel.Diry) {
			let Brandom = Math.random()
			if (Brandom > 0.66) {
				pixel.yDir = 1 
				pixel.Diry = true
			}
			else if (Brandom < 0.33) {
				pixel.yDir = -1
				pixel.Diry = true 
			}
			else {
				pixel.yDir = 0
				pixel.Diry = true
			}
		}
		if (!tryMove(pixel, pixel.x+pixel.xDir, pixel.y+pixel.yDir)) {
			NExplode(pixel.x,pixel.y,5,0,["noita_acid"])
			deletePixel(pixel.x,pixel.y)
		}
		if ((pixel.start + 330) < pixelTicks) {
			NExplode(pixel.x,pixel.y,5,0,["noita_acid"])
			deletePixel(pixel.x,pixel.y)
		}
	},
    state: "solid",
    category:"spells",
    density: 1300,
    excludeRandom: true,
	maxSize: 1,
    cooldown: defaultCooldown,
	hardness: 0.8,
}

elements.bullet = {
    color: ["#f7e787","#f7e787","#f7c34f"],
	name: "???",
	tick: function(pixel) {
    	if (!pixel.xDir && !pixel.Dirx) {
			let Brandom = Math.random()
			if (Brandom > 0.5) {
				pixel.xDir = 1 
				pixel.Dirx = true
			}
			else {
				pixel.xDir = -1
				pixel.Dirx = true 
			}
		}
		if (!pixel.yDir && !pixel.Diry) {
			let Brandom = Math.random()
			if (Brandom > 0.66) {
				pixel.yDir = 1 
				pixel.Diry = true
			}
			else if (Brandom < 0.33) {
				pixel.yDir = -1
				pixel.Diry = true 
			}
			else {
				pixel.yDir = 0
				pixel.Diry = true
			}
		}
		if (!tryMove(pixel, pixel.x+pixel.xDir, pixel.y+pixel.yDir)) {
			NExplode(pixel.x,pixel.y,2,1000,["spark"])
			deletePixel(pixel.x,pixel.y)
		}
		if ((pixel.start + 330) < pixelTicks) {
			NExplode(pixel.x,pixel.y,2,1000,["spark"])
			deletePixel(pixel.x,pixel.y)
		}
	},
    state: "solid",
    category:"spells",
    density: 1300,
    excludeRandom: true,
	maxSize: 1,
    cooldown: defaultCooldown,
	hardness: 0.8,
}

elements.arrow = {
    color: ["#953232","#654f2e","#9a7946","#deddd7"],
	tick: function(pixel) {
    	if (!pixel.xDir && !pixel.Dirx) {
			let Brandom = Math.random()
			if (Brandom > 0.5) {
				pixel.xDir = 1 
				pixel.Dirx = true
			}
			else {
				pixel.xDir = -1
				pixel.Dirx = true 
			}
		}
		if (!pixel.yDir && !pixel.Diry) {
			let Brandom = Math.random()
			if (Brandom > 0.66) {
				pixel.yDir = 1 
				pixel.Diry = true
			}
			else if (Brandom < 0.33) {
				pixel.yDir = -1
				pixel.Diry = true 
			}
			else {
				pixel.yDir = 0
				pixel.Diry = true
			}
		}
		if (!tryMove(pixel, pixel.x+pixel.xDir, pixel.y+pixel.yDir)) {
			if (pixel.bouncy == true) {
				if (pixel.xDir != pixel.yDir) { pixel.xDir = -pixel.xDir; }
				if (pixel.yDir != (-pixel.xDir)) { pixel.yDir = -pixel.yDir; }
			}
			if (!outOfBounds(pixel.x+pixel.xDir,pixel.y+pixel.yDir) && !isEmpty(pixel.x+pixel.xDir,pixel.y+pixel.yDir, true)) {
				var hitPixel = pixelMap[pixel.x+pixel.xDir][pixel.y+pixel.yDir]	
				if (hitPixel.hp) { // lower hp
					DoDamage(hitPixel,"ice",500)
				}
			}
			pixel.element = "plant_material"
			pixel.settled = true
		}
		if ((pixel.start + 330) < pixelTicks) {
			pixel.element = "plant_material"
			pixel.settled = true
		}
	},
    state: "solid",
    category:"spells",
    density: 1300,
    excludeRandom: true,
	maxSize: 1,
    cooldown: defaultCooldown,
	hardness: 0.8,
}

elements.bouncing_burst = {
    color: ["#4db73a","#358627","#95ed57"],
	tick: function(pixel) {
    	if (!pixel.xDir && !pixel.Dirx) {
			let Brandom = Math.random()
			if (Brandom > 0.5) {
				pixel.xDir = 1 
				pixel.Dirx = true
			}
			else {
				pixel.xDir = -1
				pixel.Dirx = true 
			}
		}
		if (!pixel.yDir && !pixel.Diry) {
			let Brandom = Math.random()
			if (Brandom > 0.66) {
				pixel.yDir = 1 
				pixel.Diry = true
			}
			else if (Brandom < 0.33) {
				pixel.yDir = -1
				pixel.Diry = true 
			}
			else {
				pixel.yDir = 0
				pixel.Diry = true
			}
		}
		if (pixel.bounces > 10) {
			pixel.bouncy = false
		}
		if (!tryMove(pixel, pixel.x+pixel.xDir, pixel.y+pixel.yDir)) {
			if (pixel.bouncy == true) {
				if (pixel.xDir != pixel.yDir) { pixel.xDir = -pixel.xDir; }
				if (pixel.yDir != (-pixel.xDir)) { pixel.yDir = -pixel.yDir; }
				if (!pixel.bounces) { pixel.bounces = 1 }
				else { pixel.bounces ++ }
			}
			if (!outOfBounds(pixel.x+pixel.xDir,pixel.y+pixel.yDir) && !isEmpty(pixel.x+pixel.xDir,pixel.y+pixel.yDir, true)) {
				var hitPixel = pixelMap[pixel.x+pixel.xDir][pixel.y+pixel.yDir]	
				if (hitPixel.hp) { // lower hp
					DoDamage(hitPixel,"ice",300)
				}
				deletePixel(pixel.x,pixel.y)
			}
			if (!pixel.bouncy || (pixel.start + 330) < pixelTicks) {
				deletePixel(pixel.x,pixel.y)
			}
		}
	},
	properties: {
		"bouncy": true
	},
    state: "solid",
    category:"spells",
    density: 1300,
    excludeRandom: true,
	maxSize: 1,
    cooldown: defaultCooldown,
	hardness: 0.8,
}

elements.propane_tank_spell = {
	name: "propane_tank",
    color: ["#60547a","#78669d","#ccbc6c","#78669d","#8777ae","#78669d","#8f7340","#78669d","#60547a"],
	tick: function(pixel) {
    	if (!pixel.xDir && !pixel.Dirx) {
			let Brandom = Math.random()
			if (Brandom > 0.5) {
				pixel.xDir = 1 
				pixel.Dirx = true
			}
			else {
				pixel.xDir = -1
				pixel.Dirx = true 
			}
		}
		if (!pixel.yDir && !pixel.Diry) {
			let Brandom = Math.random()
			if (Brandom > 0.66) {
				pixel.yDir = 1 
				pixel.Diry = true
			}
			else if (Brandom < 0.33) {
				pixel.yDir = -1
				pixel.Diry = true 
			}
			else {
				pixel.yDir = 0
				pixel.Diry = true
			}
		}
		if (pixel.bounces > 5) {
			pixel.bouncy = false
		}
		releaseElement(pixel,"freezing_vapour")
		if (!tryMove(pixel, pixel.x+pixel.xDir, pixel.y+pixel.yDir)) {
			if (pixel.bouncy == true) {
				if (pixel.xDir != pixel.yDir) { pixel.xDir = -pixel.xDir; }
				if (pixel.yDir != (-pixel.xDir)) { pixel.yDir = -pixel.yDir; }
				if (!pixel.bounces) { pixel.bounces = 1 }
				else { pixel.bounces ++ }
			}
			if (!outOfBounds(pixel.x+pixel.xDir,pixel.y+pixel.yDir) && !isEmpty(pixel.x+pixel.xDir,pixel.y+pixel.yDir, true)) {
				var hitPixel = pixelMap[pixel.x+pixel.xDir][pixel.y+pixel.yDir]	
				if (hitPixel.hp) { // lower hp
					DoDamage(hitPixel,"explosion",32500)
					NExplode(pixel.x,pixel.y,6,32500,["freezing_vapour"])
					deletePixel(pixel.x,pixel.y)
				}
			}
			if (!pixel.bouncy) {
				NExplode(pixel.x,pixel.y,6,32500,["freezing_vapour"])
				deletePixel(pixel.x,pixel.y)
			}
		}
	},
	properties: {
		"bouncy": true
	},
    state: "solid",
    category:"spells",
    density: 1300,
    excludeRandom: true,
	maxSize: 1,
    cooldown: defaultCooldown,
	hardness: 0.8,
}

elements.black_hole = {
    color: ["#251b35","#251b35","#251b35","#997bc6","#997bc6","#251b35","#251b35"],
	tick: function(pixel) {
    	if (!pixel.xDir && !pixel.Dirx) {
			let Brandom = Math.random()
			if (Brandom > 0.5) {
				pixel.xDir = 1 
				pixel.Dirx = true
			}
			else {
				pixel.xDir = -1
				pixel.Dirx = true 
			}
		}
		if (!pixel.yDir && !pixel.Diry) {
			let Brandom = Math.random()
			if (Brandom > 0.66) {
				pixel.yDir = 1 
				pixel.Diry = true
			}
			else if (Brandom < 0.33) {
				pixel.yDir = -1
				pixel.Diry = true 
			}
			else {
				pixel.yDir = 0
				pixel.Diry = true
			}
		}
		for (let i = -10; i < 11; i++) {
			if (!isEmpty(pixel.x+i,pixel.y+i,true) && !outOfBounds(pixel.x+i,pixel.y+i) && elements[pixelMap[pixel.x+i][pixel.y+i].element].state == "solid" && elements[pixelMap[pixel.x+i][pixel.y+i].element].movable == true) {
				if (pixel.x > pixel.x+i) {
					var dirx = 1
				}
				else if (pixel.x < pixel.x+i) {
					var dirx = -1
				}
				else {
					var diry = 0
				}
				if (pixel.y > pixel.y+i) {
					var diry = 1
				}
				else if (pixel.y < pixel.y+i) {
					var diry = -1
				}
				else {
					var diry = 0
				}
				if (dirx != undefined && diry != undefined && !((dirx==0) && (diry==0))) {
          			tryMove(pixelMap[pixel.x+i][pixel.y+i], (pixel.x+i)+dirx, (pixel.y+i)+diry)
				}
			}
    	}
		for (let i = -6; i < 7; i++) {
      		for (j = -6; j < 7; j++) {
        		if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i) && !((i==0) && (j==0))) {
        			if (elements[pixelMap[pixel.x+j][pixel.y+i].element].state == "solid") {
        				deletePixel(pixel.x+j,pixel.y+i)
        			}
        		}
      		}
    	}
		if (!tryMove(pixel, pixel.x+pixel.xDir, pixel.y+pixel.yDir)) {
			if (!isEmpty(pixel.x+pixel.xDir, pixel.y+pixel.yDir) && !outOfBounds(pixel.x+pixel.xDir, pixel.y+pixel.yDir)) {
				swapPixels(pixel,pixelMap[pixel.x+pixel.xDir][pixel.y+pixel.yDir])
        	}
			else {
				deletePixel(pixel.x,pixel.y)
			}
		}
		if ((pixel.start + 130) < pixelTicks) {
			deletePixel(pixel.x,pixel.y)
		}
	},
	renderer: function(pixel,ctx) {
		drawSquare(ctx,"#60bbf7",pixel.x-3,pixel.y-3,7,0.5);
        drawSquare(ctx,pixel.color,pixel.x-2,pixel.y-2,5,1);
        drawDefault(ctx,pixel);
	},
    state: "solid",
    category:"spells",
    density: 1300,
    excludeRandom: true,
	maxSize: 1,
    cooldown: defaultCooldown,
	hardness: 0.8,
}

worldgentypes.noita_surface = {
	layers: [
		[0.8, "soil"],
		[0.3, "noita_rock"],
		[0.1, "dense_rock"],
		[0, "extremely_dense_rock"],
	],
	decor: [
		["lammas", 0.1],
	]
} /*

worldgentypes.noita_lava = {
	layers: [
		[0.3, "lava"],
		[0.1, "dense_rock"],
		[0, "extremely_dense_rock"],
	],
} 

worldgentypes.noita_holy_mountain = {
	layers: [
		[0.9, "extremely_dense_rock"],
		[0.8, "dense_rock"],
		[0.7, "brickwork"],
		[0.3, "flash"],
		[0.2, "brickwork"],
		[0.1, "dense_rock"],
		[0, "extremely_dense_rock"],
	],
	baseHeight: 0.9,
	heightVariance: 0.05,
	complexity: 1,
} */