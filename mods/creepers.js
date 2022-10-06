//Prerequisite Functions and Variables

var style = document.createElement('style'); //Initialize CSS for creeper spawning's status indicator
style.type = 'text/css';
style.id = 'creeperStatusStylesheet';
//initial style conditional branch
if(typeof(settings.creeperSpawning) === "undefined") { //undefined (falsy but it needs special handling)
	style.innerHTML = '.creeperStatus { color: #E11; text-decoration: none; }';
} else {
	if(!settings.creeperSpawning) { //falsy: red
		style.innerHTML = '.creeperStatus { color: #E11; text-decoration: none; }';
	} else if(settings.creeperSpawning) { //truthy: green
		style.innerHTML = '.creeperStatus { color: #1E1; text-decoration: none; }';
	};
};
document.getElementsByTagName('head')[0].appendChild(style);

function pyth(xA,yA,xB,yB) { //Distance function, used for explosion trigger
    var a = Math.abs(xB - xA);
    var b = Math.abs(yB - yA);
    var c = Math.sqrt(a**2 + b**2);
    return c;
};

function rgbColorBound(number) { //RGB bounding function, used for safety checking color changes
	return Math.min(255,Math.max(0,number));
};

function slBound(number) { //SL bounding function (not hue), same use as above
	return Math.min(100,Math.max(0,number));
};

function angelicUpwardVelocity(pixel,x,y,radius,fire,smoke,power) { //Angelic Creeper's effect, "compatible" with velocity.js by including the modified version of its code in itself
	var info = elements[pixel.element]
	if(enabledMods.includes("mods/velocity.js")) {
		//console.log("yeet");
		// set the pixel.vx and pixel.vy depending on the angle and power
		if (!elements[pixel.element].excludeRandom) {
			//console.log("LOOKS LIKE IT'S YEETING TIME!");
			var angle = Math.atan2(pixel.y-y,pixel.x-x);
			//console.log(`angle calculated (${angle})`);
			pixel.vx = Math.round((pixel.vx|0) + Math.cos(angle) * (radius * power/10));
			//console.log(`vx calculated (${pixel.vx}) for pixel (${pixel.x},${pixel.y})`);
			pixel.vy = 0 - Math.abs(Math.round((pixel.vy|0) + Math.sin(angle) * (radius * power/4)) + 4); //massively increased Y velocities even for objects below
			//pixel.color = "rgb(255,0,0)";
			//console.log(`vy calculated (${pixel.vy}) for pixel (${pixel.x},${pixel.y})`);
		};
		//console.log(`Velocities set`);
	};
	//console.log(`end`);
};

//afterFunction(pixel,x,y,radius,fire,smoke,power,damage);
function hellExplosionFire(pixel,x,y,radius,fire,smoke,power,damage) { //Angelic Creeper's effect, "compatible" with velocity.js by including the modified version of its code in itself
	var coords = circleCoords(pixel.x,pixel.y,radius);
	for (var i = 0; i < coords.length; i++) {
		var x = coords[i].x;
		var y = coords[i].y;
		if(!isEmpty(x,y,true)) {
			var pixel = pixelMap[x][y];
			var info = elements[pixel.element]
			if (info.burn) { //Light everything on fire
				pixel.burning = true;
				pixel.burnStart = pixelTicks;
				pixel.temp += 10; //smoke prevention
			} else if(Math.random() < 0.05) { //5%/px cursed burning
				pixel.burning = true;
				pixel.burnStart = pixelTicks;
				pixel.temp += 10;
			};
		} else if(isEmpty(x,y)) { //if there's space for fire
			if (Array.isArray(fire)) { //this should remain "fire"
				var newfire = fire[Math.floor(Math.random() * fire.length)];
			} else {
				var newfire = fire;
			};
			createPixel(newfire,x,y); //add fire
			var firePixel = pixelMap[x][y];
			firePixel.temp = Math.max(elements[newfire].temp,firePixel.temp);
			firePixel.burning = true;
		};
	};
};

function explodeAtPlus(x,y,radius,fire="fire",smoke="smoke",beforeFunction=null,afterFunction=null) { //explodeAt with additional arguments, used to allow implementation of Angelic Creeper's effect
	// if fire contains , split it into an array
	if (fire.indexOf(",") !== -1) {
		fire = fire.split(",");
	}
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
				changePixel(pixel,newfire);
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
					changePixel(pixel,result);
					continue;
				}
				else {
					if (Array.isArray(fire)) {
						var newfire = fire[Math.floor(Math.random() * fire.length)];
					}
					else {
						var newfire = fire;
					}
					changePixel(pixel,newfire);
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

if(typeof(settings.creeperSpawning) === "undefined") { //Default creeper setting
	setSetting("creeperSpawning",false);
};

function updateCreeperPreferences() { //Creeper setting handler
	if(settings.creeperSpawning) { //If the setting is on
		if(typeof(randomEvents.creeper) !== "function") { //add the event if it's missing
			randomEvents.creeper = function() {
				var amount = Math.floor((Math.random() * 3)+1); //1-3
				//In worldgen worlds, you can expect about half of this because about half of the world is pixels in it.
				for(i = 0; i < amount; i++) { //dummy for to break
					if(settings.creeperSpawning) { //setting validation
						// random x between 1 and width-1
						var x = Math.floor(Math.random()*(width-1))+1;
						// random y between 1 and height
						var y = Math.floor(Math.random()*height-1)+1;
						if (isEmpty(x,y)) {
							// random element from the list of spawnable creepers
							var element = spawnCreepers[Math.floor(Math.random()*spawnCreepers.length)];
							// if element is an array, choose a random element from the array
							if (Array.isArray(element)) {
								element = element[Math.floor(Math.random()*element.length)];
							}
							createPixel(element,x,y);
						};
					} else { //if false (this function is never supposed to fire with the setting false)
						delete randomEvents.creeper; //self-disable
						//substitute event
						var event = randomEvents[Object.keys(randomEvents)[Math.floor(Math.random()*Object.keys(randomEvents).length)]];
						event();
						break;
					};
				};
			};
		};
	} else if(!settings.creeperSpawning) { //and if it's off
		if(randomEvents.creeper) { delete randomEvents.creeper }; //delete it if it exists.
	};
};

function toggleCreeperSpawning() { //Creeper toggle handler
	if(settings.creeperSpawning != true) { //If it's false
		setSetting("creeperSpawning",true); //make it true and update the status display CSS
		updateCreeperPreferences(); //apply
		document.getElementById("creeperStatusStylesheet").innerHTML = '.creeperStatus { color: #1E1; text-decoration: underline; }'; //Displayed info doen't update until it's pulled up again, so I'm using CSS to dynamically change the color of an element, like with find.js (RIP).
	} else { //and the inverse if it's true
		setSetting("creeperSpawning",false);
		updateCreeperPreferences();
		document.getElementById("creeperStatusStylesheet").innerHTML = '.creeperStatus { color: #E11; text-decoration: none; }';
	};
};

enemyHumanoidArray = ["head","body"] //just in case

spawnCreepers = ["creeper","angelic_creeper","bombing_creeper","hell_creeper"];

if(settings.creeperSpawning) { //creeper spawning option
	randomEvents.creeper = function() {
		var amount = Math.floor((Math.random() * 3)+1); //1-3
		for(i = 0; i < amount; i++) { //dummy for to break
			if(settings.creeperSpawning) { //setting validation
				// random x between 1 and width-1
				var x = Math.floor(Math.random()*(width-1))+1;
				// random y between 1 and height
				var y = Math.floor(Math.random()*height-1)+1;
				if (isEmpty(x,y)) {
					// random element from the list of spawnable creepers
					var element = spawnCreepers[Math.floor(Math.random()*spawnCreepers.length)];
					// if element is an array, choose a random element from the array
					if (Array.isArray(element)) {
						element = element[Math.floor(Math.random()*element.length)];
					}
					createPixel(element,x,y);
				};
			} else { //if false (this function is never supposed to fire with the setting false)
				delete randomEvents.creeper; //self-disable
				//substitute event
				var event = randomEvents[Object.keys(randomEvents)[Math.floor(Math.random()*Object.keys(randomEvents).length)]];
				event();
				break;
			};
		};
	};
};

standaloneSpawnCreeper = function(amount=1) {
	/*	The amount is the maximum amount of *attempts*. Often, less creepers will spawn due to things in the way.
		In a generated world, which uses half of the space, you can expect about half of this number to spawn.	*/
	for(i = 0; i < amount; i++) { //dummy for to break
		// random x between 1 and width-1
		var x = Math.floor(Math.random()*(width-1))+1;
		// random y between 1 and height
		var y = Math.floor(Math.random()*height-1)+1;
		if (isEmpty(x,y)) {
			// random element from the list of spawnable creepers
			var element = spawnCreepers[Math.floor(Math.random()*spawnCreepers.length)];
			// if element is an array, choose a random element from the array
			if (Array.isArray(element)) {
				element = element[Math.floor(Math.random()*element.length)];
			}
			createPixel(element,x,y);
		};
	};
};

/*Start Main Creeper
	##################
	#########   ######
	#######       ####
	######     OOOOO##
	####      OOOOOOO#
	###        OOOOO##
	###           ####
	###           ####
	###           ####
	####          ####
	######        ####
	#######  ###  ####
	#######  ###  ####
	##################
*/

elements.creeper = {
	color: ["#D2D2D2", "#BFDFB9", "#94CE89", "#78D965", "#5ED54C", "#58C546", "#50B143", "#479143", "#559552", "#3F8738", "#5B8B59"],
	category: "life",
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
		following: false,
	},
	tick: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("creeper_body", pixel.x, pixel.y+1);
			pixel.element = "creeper_head";
			pixel.color = pixelColorPick(pixel)
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("creeper_head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			pixel.element = "creeper_body";
			pixel.color = pixelColorPick(pixel)
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	related: ["creeper_body","creeper_head"],
	desc: "<em>I'd rather this be toggleable mid-game than require a reload.</em><br/><br/><span class=\"creeperStatus\">If this text is green or underlined, creepers can spawn.</span> <span onclick=toggleCreeperSpawning() style=\"color: #ff00ff;\";>Click here</span> to toggle creeper spawning. If it's on, creepers (all types) can spawn through random events."
};

elements.creeper_body = {
	color: ["#D2D2D2", "#BFDFB9", "#94CE89", "#78D965", "#5ED54C", "#58C546", "#50B143", "#479143", "#559552", "#3F8738", "#5B8B59"],
	category: "life",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: 25,
	tempHigh: 250,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","gunpowder"],
	breakInto: ["blood","gunpowder"],
	reactions: {
		"cancer": { "elem1":"cancer", "chance":0.005 },
		"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"plague": { "elem1":"plague", "chance":0.05 },
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
		charged: false,
		didChargeBlueTinted: false,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headPixel = pixelMap[pixel.x][pixel.y-2];
				if (headPixel.element == "creeper_head") {
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
			if (pixelTicks-pixel.dead > 200) {
				Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "creeper_head") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
		}
		else { var head = null }

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1) {
				createPixel("blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head == null) { return }
		else if (Math.random() < 0.1) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						break;
					};
				};
			};
			// 15% chance to change direction while not chasing a human
			if(!head.following) {
				if (Math.random() < 0.15) {
					pixel.dir *= -1;
					//console.log("*turns around cutely to face ${pixel.dir < 0 ? 'left' : 'right'}*");
				};
			}/* else {
				//console.log("*chases cutely*");
			};*/
		};

		if(pixel.charge) {
			pixel.charged = true;
		};
		
		if(head) {
			if(typeof(head.charge) !== "undefined") {
				if(head.charge) {
					pixel.charged = true;
				};
			};
			if(typeof(head.charged) !== "undefined") {
				if(head.charged) {
					pixel.charged = true;
				};
			};
		};

		if(typeof(pixel.charged) === "undefined") {
			pixel.charged = false;
		};

		if(pixel.charged) {
			var explosionRadius = 7;
			if(!pixel.didChargeBlueTinted) { //do once, on initial charge
				//console.log("something something halsey lyric");
				var color = pixel.color;
				if(color.startsWith("rgb")) {
					//console.log("rgb detected");
					color = color.split(","); //split color for addition
					var red = parseFloat(color[0].substring(4));
					var green = parseFloat(color[1]);
					var blue = parseFloat(color[2].slice(0,-1));
					red = rgbColorBound(red + 51);
					green = rgbColorBound(green + 51);
					blue = rgbColorBound(blue + 102);
					color = `rgb(${red},${green},${blue})`;
					pixel.color = color;
					//console.log("color set");
				} else if(color.startsWith("hsl")) {
					//console.log("hsl detected");
					color = color.split(","); //split color for addition
					var hue = parseFloat(color[0].substring(4));
					var saturation = parseFloat(color[1].slice(0,-1));
					var luminance = parseFloat(color[2].slice(0,-2));
					hue = hue % 360; //piecewise hue shift
					if(hue <= 235 && hue >= 135) {
						hue = 185;
					} else if(hue < 135) {
						hue += 50;
					} else if(hue > 235 && hue < 360) {
						hue -= 50;
					};
					saturation = slBound (saturation + 10);
					luminance = slBound(luminance + 20);
					color = `hsl(${hue},${saturation}%,${luminance}%)`;
					pixel.color = color;
					//console.log("color set");
				};
				pixel.didChargeBlueTinted = true;
			};
		} else {
			var explosionRadius = 5;
		};
		
		if(pixel.burning) {
			pixel.hissing = true;
			if(!pixel.hissStart) {
				pixel.hissStart = pixelTicks;
			};
			if(!pixel.burnStart) { //I don't like errors.
				pixel.burnStart = pixel.ticks;
			};
			if(pixelTicks - pixel.burnStart > 30) {
				//console.log("Kaboom?");
				explodeAt(pixel.x,pixel.y,explosionRadius);
				//console.log("Yes, Rico, kaboom.");
			};
		};

		//Head hissing color handler: keeps track of head's hissing for coloring purposes
		for(i = 0; i < 1; i++) { //dummy for loop
			if(pixel.dead || !head || head.dead) { //can't hiss without a head according to the classic creeper anatomy
				//console.log("ss-- oof");
				pixel.hissing = false;
				break;
			};
			if(head.hissing) {
				//console.log("Ssssssss");
				if(!head.hissStart) {
					//console.log("t-30 ticks or whatever it was");
					head.hissStart = pixelTicks;
				};

				//Color code {
					var ticksHissing = pixelTicks - head.hissStart;
					var color = pixel.color; //do on each hissing tick
					if(color.startsWith("rgb")) {
						//console.log("rgb detected");
						color = color.split(","); //split color for addition
						var red = parseFloat(color[0].substring(4));
						var green = parseFloat(color[1]);
						var blue = parseFloat(color[2].slice(0,-1));
						red = rgbColorBound(red + ticksHissing);
						green = rgbColorBound(green + ticksHissing);
						blue = rgbColorBound(blue + ticksHissing);
						color = `rgb(${red},${green},${blue})`;
						pixel.color = color;
						//console.log("color set");
					} else if(color.startsWith("hsl")) {
						//console.log("hsl detected");
						color = color.split(","); //split color for addition
						var hue = parseFloat(color[0].substring(4));
						var saturation = parseFloat(color[1].slice(0,-1));
						var luminance = parseFloat(color[2].slice(0,-2));
						//console.log("the j");
						luminance = slBound(luminance + 1.176);
						//console.log(luminance);
						color = `hsl(${hue},${saturation}%,${luminance}%)`;
						pixel.color = color;
						//console.log("color set");
					};
				//}
			};
		};
	},
};

elements.creeper_head = {
	color: ["#5B8B59", "#3F8738", "#559552", "#479143", "#50B143", "#58C546"],
	category: "life",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: 25,
	tempHigh: 250,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","gunpowder"],
	breakInto: "blood",
	reactions: {
		"cancer": { "elem1":"cancer", "chance":0.005 },
		"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"plague": { "elem1":"plague", "chance":0.05 },
		"oxygen": { "elem2":"carbon_dioxide", "chance":0.5 },
	},
	properties: {
		dead: false,
		following: false,
		hissing: false,
		charged: false,
		didChargeBlueTinted: false,
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200) {
				Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "creeper_body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		if(body) {
			if(body.dir !== pixel.dir) { //hacky workaround: lock head dir to body dir
				pixel.dir = body.dir;
			};
		};

		if (isEmpty(pixel.x, pixel.y+1)) {
			tryMove(pixel, pixel.x, pixel.y+1);
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		
		//start of most new code
		var pX = pixel.x;
		var pY = pixel.y;
		
		if(pixel.charge) {
			pixel.charged = true;
		};
		
		if(body) {
			if(typeof(body.charge) !== "undefined") {
				if(body.charge) {
					pixel.charged = true;
				};
			};
			if(typeof(body.charged) !== "undefined") {
				if(body.charged) {
					pixel.charged = true;
				};
			};
		};
		
		if(typeof(pixel.charged) === "undefined") {
			pixel.charged = false;
		};

		if(pixel.charged) {
			var explosionRadius = 10;
			if(!pixel.didChargeBlueTinted) { //do once, on initial charge
				//console.log("something something halsey lyric");
				var color = pixel.color;
				if(color.startsWith("rgb")) {
					//console.log("rgb detected");
					color = color.split(","); //split color for addition
					var red = parseFloat(color[0].substring(4));
					var green = parseFloat(color[1]);
					var blue = parseFloat(color[2].slice(0,-1));
					red = rgbColorBound(red + 51);
					green = rgbColorBound(green + 51);
					blue = rgbColorBound(blue + 102);
					color = `rgb(${red},${green},${blue})`;
					pixel.color = color;
					//console.log("color set");
				} else if(color.startsWith("hsl")) {
					//console.log("hsl detected");
					color = color.split(","); //split color for addition
					var hue = parseFloat(color[0].substring(4));
					var saturation = parseFloat(color[1].slice(0,-1));
					var luminance = parseFloat(color[2].slice(0,-2));
					hue = hue % 360; //piecewise hue shift
					if(hue <= 235 && hue >= 135) {
						hue = 185;
					} else if(hue < 135) {
						hue += 50;
					} else if(hue > 235 && hue < 360) {
						hue -= 50;
					};
					saturation = slBound (saturation + 10);
					luminance = slBound(luminance + 20);
					color = `hsl(${hue},${saturation}%,${luminance}%)`;
					pixel.color = color;
					//console.log("color set");
				};
				pixel.didChargeBlueTinted = true;
			};
		} else {
			var explosionRadius = 7;
		};
		
		//Human detection loop (looks ahead according to direction and sets the "following" variable to true, telling the body to lock the direction)
		var directionAdverb = "left";
		if(pixel.dir > 0) {
			directionAdverb = "right";
		};
		//console.log(`Looking ${directionAdverb}`)
		if(pixel.dir === -1) {
			for(i = -4; i < 4+1; i++) {
				var oY = i;
				//console.log(`Starting row look at row ${pY+oY}`)
				for(j = (-1); j > (-16 - 1); j--) {
					var oX = j;
					var nX = pX+oX;
					var nY = pY+oY;
					if(outOfBounds(nX,nY)) {
						//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
						break;
					};
					if(isEmpty(nX,nY)) {
						////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
						continue;
					};
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newElement = newPixel.element;
						if(enemyHumanoidArray.includes(newElement)) {
							//console.log(`Human part found at (${nX},${nY})`)
							if(!newPixel.dead) {
								pixel.following = true;
								//console.log(`Human detected at (${nX},${nY})`)
								//Start "hissing" if a human is close enough
								if(pyth(pX,pY,nX,nY) <= 3.15) { //probably misapplying the tolerance from the MC Wiki line: "Creepers will chase after any player, as long as it is within a 16 block (±5%) radius"
									pixel.hissing = true;
									if(!pixel.hissStart) {
										pixel.hissStart = pixelTicks;
									};
								};
							};
						} else {
							//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
							break; //can't see through humans
						};
					};
				};
			};
		} else if(pixel.dir === 1) {
			for(i = -4; i < 4+1; i++) {
				var oY = i;
				//console.log(`Starting row look at row ${pY+oY}`)
				for(j = 1; j < 16 + 1; j++) {
					var oX = j;
					var nX = pX+oX;
					var nY = pY+oY;
					if(outOfBounds(nX,nY)) {
						//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
						break;
					};
					if(isEmpty(nX,nY)) {
						////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
						continue;
					};
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newElement = newPixel.element;
						if(enemyHumanoidArray.includes(newElement)) {
							//console.log(`Human part found at (${nX},${nY})`)
							if(!newPixel.dead) {
								pixel.following = true;
								//console.log(`Human detected at (${nX},${nY})`)
								//Start "hissing" if a human is close enough
								if(pyth(pX,pY,nX,nY) <= 3.15) {
									pixel.hissing = true;
									if(!pixel.hissStart) {
										pixel.hissStart = pixelTicks;
									};
								};
								break;
							};
						} else {
							//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
							break;
						};
					};
				};
			};
		};
		
		//Pre-explosion handler: keeps track of time before the kaboom
		for(i = 0; i < 1; i++) { //dummy for loop
			if(pixel.hissing) {
				//console.log("Ssssssss");
				if(pixel.dead || !body || body.dead) { //can't explode without a body according to the classic creeper anatomy
					//console.log("ss-- oof");
					pixel.hissing = false;
					break;
				};
				if(!pixel.hissStart) {
					//console.log("t-30 ticks or whatever it was");
					pixel.hissStart = pixelTicks;
				};
				//Color code {
					var ticksHissing = pixelTicks - pixel.hissStart;
					var color = pixel.color; //do on each hissing tick
					if(color.startsWith("rgb")) {
						//console.log("rgb detected");
						color = color.split(","); //split color for addition
						var red = parseFloat(color[0].substring(4));
						var green = parseFloat(color[1]);
						var blue = parseFloat(color[2].slice(0,-1));
						red = rgbColorBound(red + ticksHissing);
						green = rgbColorBound(green + ticksHissing);
						blue = rgbColorBound(blue + ticksHissing);
						color = `rgb(${red},${green},${blue})`;
						pixel.color = color;
						//console.log("color set");
					} else if(color.startsWith("hsl")) {
						//console.log("hsl detected");
						color = color.split(","); //split color for addition
						var hue = parseFloat(color[0].substring(4));
						var saturation = parseFloat(color[1].slice(0,-1));
						var luminance = parseFloat(color[2].slice(0,-2));
						luminance = slBound(luminance + 1.176);
						color = `hsl(${hue},${saturation}%,${luminance}%)`;
						pixel.color = color;
						//console.log("color set");
					};
				//}

				if(pixelTicks - pixel.hissStart > 30) {
					//console.log("Kaboom?");
					//console.log(`Exploding with radius ${explosionRadius} (charged: ${pixel.charged})`);
					explodeAt(body.x,body.y,explosionRadius);
					//console.log("Yes, Rico, kaboom.");
				};
			};
		};
		
		if(Math.random() < 0.01) { //1% chance each tick to lose interest
			pixel.following = false;
			//console.log("Meh.");
		};
	},
};

/*End Main Creeper
	##################
	##################
	##################
	#########X#X######
	#########XXX######
	##########X#######
	##########X#######
	### # # # X # ####
	###           ####
	####          ####
	######        ####
	#######  ###  ####
	#######  ###  ####
	##################
*/

														//Angelic Creeper

elements.angelic_creeper = { //let's get this one out of the way first
	color: ["#f5ef56", "#fcbddf", "#de8aa8", "#e35d95", "#eb4974", "#ed3ea7", "#d645a3", "#a84556", "#9e4f6c", "#91315b", "#8c4963"],
	category: "life",
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
		following: false,
	},
	tick: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("angelic_creeper_body", pixel.x, pixel.y+1);
			pixel.element = "angelic_creeper_head";
			pixel.color = pixelColorPick(pixel)
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("angelic_creeper_head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			pixel.element = "angelic_creeper_body";
			pixel.color = pixelColorPick(pixel)
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	related: ["angelic_creeper_body","angelic_creeper_head"],
	desc: 'A creeper type from <em>Extra Creeper Types</em> <a href="https://www.curseforge.com/minecraft/mc-mods/extra-creeper-types">(CF)</a>. It sends things upward.'
};

elements.angelic_creeper_body = {
	color: ["#d2d2d2", "#fcbddf", "#de8aa8", "#e35d95", "#eb4974", "#ed3ea7", "#d645a3", "#a84556", "#9e4f6c", "#91315b", "#8c4963"],
	category: "life",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: 25,
	tempHigh: 250,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","gunpowder"],
	breakInto: ["blood","blood","gunpowder","gunpowder","feather"],
	reactions: {
		"cancer": { "elem1":"cancer", "chance":0.005 },
		"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"plague": { "elem1":"plague", "chance":0.05 },
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
		charged: false,
		didChargeBlueTinted: false,
	},
	tick: function(pixel) {
		if(!pixel.hissing) { //If not hissing (it floats when hissing)
			if(Math.random() < 0.2) { //20% chance to fall
				if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
					if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
						var headPixel = pixelMap[pixel.x][pixel.y-2];
						if (headPixel.element == "angelic_creeper_head") {
							if (isEmpty(pixel.x, pixel.y-1)) {
								movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
							} else {
								swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
							};
						};
					};
				};
			};
		} else {
			if((pixelTicks - pixel.start) % 3 == 0) {
				if (!isEmpty(pixel.x, pixel.y-1, true)) { // Find head
					var headPixel = pixelMap[pixel.x][pixel.y-1];
					if (headPixel.element == "angelic_creeper_head") { //Validate head
						if (tryMove(headPixel, pixel.x, pixel.y-2)) { // Float
							if (isEmpty(pixel.x, pixel.y-1)) { //If the head didn't swap with something
								movePixel(pixel, pixel.x, pixel.y-1); //Pull body up
							} else { //If it did swap
								swapPixels(pixel, pixelMap[pixel.x][pixel.y-1]); //Pull body up through other pixel
							};
						};
					};
				};
			};
		};
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200) {
				Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "angelic_creeper_head") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
		}
		else { var head = null }

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1) {
				createPixel("blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head == null) { return }
		else if (Math.random() < 0.1) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						break;
					};
				};
			};
			// 15% chance to change direction while not chasing a human
			if(!head.following) {
				if (Math.random() < 0.15) {
					pixel.dir *= -1;
					//console.log("*turns around cutely to face ${pixel.dir < 0 ? 'left' : 'right'}*");
				};
			}/* else {
				//console.log("*chases cutely*");
			};*/
		};

		if(pixel.charge) {
			pixel.charged = true;
		};
		
		if(head) {
			if(typeof(head.charge) !== "undefined") {
				if(head.charge) {
					pixel.charged = true;
				};
			};
			if(typeof(head.charged) !== "undefined") {
				if(head.charged) {
					pixel.charged = true;
				};
			};
		};

		if(typeof(pixel.charged) === "undefined") {
			pixel.charged = false;
		};

		if(pixel.charged) {
			var explosionRadius = 10;
			if(!pixel.didChargeBlueTinted) { //do once, on initial charge
				//console.log("something something halsey lyric");
				var color = pixel.color;
				if(color.startsWith("rgb")) {
					//console.log("rgb detected");
					color = color.split(","); //split color for addition
					var red = parseFloat(color[0].substring(4));
					var green = parseFloat(color[1]);
					var blue = parseFloat(color[2].slice(0,-1));
					red = rgbColorBound(red + 51);
					green = rgbColorBound(green + 51);
					blue = rgbColorBound(blue + 102);
					color = `rgb(${red},${green},${blue})`;
					pixel.color = color;
					//console.log("color set");
				} else if(color.startsWith("hsl")) {
					//console.log("hsl detected");
					color = color.split(","); //split color for addition
					var hue = parseFloat(color[0].substring(4));
					var saturation = parseFloat(color[1].slice(0,-1));
					var luminance = parseFloat(color[2].slice(0,-2));
					hue = hue % 360; //piecewise hue shift
					if(hue <= 235 && hue >= 135) {
						hue = 185;
					} else if(hue < 135) {
						hue += 50;
					} else if(hue > 235 && hue < 360) {
						hue -= 50;
					};
					saturation = slBound (saturation + 10);
					luminance = slBound(luminance + 20);
					color = `hsl(${hue},${saturation}%,${luminance}%)`;
					pixel.color = color;
					//console.log("color set");
				};
				pixel.didChargeBlueTinted = true;
			};
		} else {
			var explosionRadius = 7;
		};
		
		if(pixel.burning) {
			pixel.hissing = true;
			if(!pixel.hissStart) {
				pixel.hissStart = pixelTicks;
			};
			if(!pixel.burnStart) { //I don't like errors.
				pixel.burnStart = pixel.ticks;
			};
			if(pixelTicks - pixel.burnStart > 30) {
				//console.log("GOTTA YEET YEET YEET!");
				explodeAtPlus(pixel.x,pixel.y,explosionRadius,"fire","smoke",null,angelicUpwardVelocity);	//Special effect: Flings you upwards (extended to all movable tiles because it's easier).
																								//It also floats when hissing, but that will come soon.
				//console.log("Yes, Rico, kaboom.");
			};
		};

		//Head hissing color handler: keeps track of head's hissing for coloring purposes
		for(i = 0; i < 1; i++) { //dummy for loop
			if(pixel.dead || !head || head.dead) { //can't hiss without a head according to the classic creeper anatomy
				//console.log("ss-- oof");
				pixel.hissing = false;
				break;
			};
			if(head.hissing) {
				//console.log("Ssssssss");
				if(!head.hissStart) {
					//console.log("t-30 ticks or whatever it was");
					head.hissStart = pixelTicks;
				};

				//Color code {
					var ticksHissing = pixelTicks - head.hissStart;
					var color = pixel.color; //do on each hissing tick
					if(color.startsWith("rgb")) {
						//console.log("rgb detected");
						color = color.split(","); //split color for addition
						var red = parseFloat(color[0].substring(4));
						var green = parseFloat(color[1]);
						var blue = parseFloat(color[2].slice(0,-1));
						red = rgbColorBound(red + ticksHissing);
						green = rgbColorBound(green + ticksHissing);
						blue = rgbColorBound(blue + ticksHissing);
						color = `rgb(${red},${green},${blue})`;
						pixel.color = color;
						//console.log("color set");
					} else if(color.startsWith("hsl")) {
						//console.log("hsl detected");
						color = color.split(","); //split color for addition
						var hue = parseFloat(color[0].substring(4));
						var saturation = parseFloat(color[1].slice(0,-1));
						var luminance = parseFloat(color[2].slice(0,-2));
						//console.log("the j");
						luminance = slBound(luminance + 1.176);
						//console.log(luminance);
						color = `hsl(${hue},${saturation}%,${luminance}%)`;
						pixel.color = color;
						//console.log("color set");
					};
				//}
			};
		};
	},
},
elements.angelic_creeper_head = {
	color: ["#f5ef56", "#f0ea4f", "#f0ea60"],
	category: "life",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: 25,
	tempHigh: 250,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","gunpowder"],
	breakInto: ["blood","blood","blood","blood","feather"],
	reactions: {
		"cancer": { "elem1":"cancer", "chance":0.005 },
		"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"plague": { "elem1":"plague", "chance":0.05 },
		"oxygen": { "elem2":"carbon_dioxide", "chance":0.5 },
	},
	properties: {
		dead: false,
		following: false,
		hissing: false,
		charged: false,
		didChargeBlueTinted: false,
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200) {
				Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "angelic_creeper_body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		if(body) {
			if(body.dir !== pixel.dir) { //hacky workaround: lock head dir to body dir
				pixel.dir = body.dir;
			};
		};

		if (isEmpty(pixel.x, pixel.y+1)) {
			tryMove(pixel, pixel.x, pixel.y+1);
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		
		//start of most new code
		var pX = pixel.x;
		var pY = pixel.y;
		
		if(pixel.charge) {
			pixel.charged = true;
		};
		
		if(body) {
			if(typeof(body.charge) !== "undefined") {
				if(body.charge) {
					pixel.charged = true;
				};
			};
			if(typeof(body.charged) !== "undefined") {
				if(body.charged) {
					pixel.charged = true;
				};
			};
		};
		
		if(typeof(pixel.charged) === "undefined") {
			pixel.charged = false;
		};

		if(pixel.charged) {
			var explosionRadius = 10;
			if(!pixel.didChargeBlueTinted) { //do once, on initial charge
				//console.log("something something halsey lyric");
				var color = pixel.color;
				if(color.startsWith("rgb")) {
					//console.log("rgb detected");
					color = color.split(","); //split color for addition
					var red = parseFloat(color[0].substring(4));
					var green = parseFloat(color[1]);
					var blue = parseFloat(color[2].slice(0,-1));
					red = rgbColorBound(red + 51);
					green = rgbColorBound(green + 51);
					blue = rgbColorBound(blue + 102);
					color = `rgb(${red},${green},${blue})`;
					pixel.color = color;
					//console.log("color set");
				} else if(color.startsWith("hsl")) {
					//console.log("hsl detected");
					color = color.split(","); //split color for addition
					var hue = parseFloat(color[0].substring(4));
					var saturation = parseFloat(color[1].slice(0,-1));
					var luminance = parseFloat(color[2].slice(0,-2));
					hue = hue % 360; //piecewise hue shift
					if(hue <= 235 && hue >= 135) {
						hue = 185;
					} else if(hue < 135) {
						hue += 50;
					} else if(hue > 235 && hue < 360) {
						hue -= 50;
					};
					saturation = slBound (saturation + 10);
					luminance = slBound(luminance + 20);
					color = `hsl(${hue},${saturation}%,${luminance}%)`;
					pixel.color = color;
					//console.log("color set");
				};
				pixel.didChargeBlueTinted = true;
			};
		} else {
			var explosionRadius = 7;
		};
		
		//Human detection loop (looks ahead according to direction and sets the "following" variable to true, telling the body to lock the direction)
		var directionAdverb = "left";
		if(pixel.dir > 0) {
			directionAdverb = "right";
		};
		//console.log(`Looking ${directionAdverb}`)
		if(pixel.dir === -1) {
			for(i = -4; i < 4+1; i++) {
				var oY = i;
				//console.log(`Starting row look at row ${pY+oY}`)
				for(j = (-1); j > (-16 - 1); j--) {
					var oX = j;
					var nX = pX+oX;
					var nY = pY+oY;
					if(outOfBounds(nX,nY)) {
						//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
						break;
					};
					if(isEmpty(nX,nY)) {
						////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
						continue;
					};
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newElement = newPixel.element;
						if(enemyHumanoidArray.includes(newElement)) {
							//console.log(`Human part found at (${nX},${nY})`)
							if(!newPixel.dead) {
								pixel.following = true;
								//console.log(`Human detected at (${nX},${nY})`)
								//Start "hissing" if a human is close enough
								if(pyth(pX,pY,nX,nY) <= 3.15) { //probably misapplying the tolerance from the MC Wiki line: "Creepers will chase after any player, as long as it is within a 16 block (±5%) radius"
									pixel.hissing = true;
									if(!pixel.hissStart) {
										pixel.hissStart = pixelTicks;
									};
								};
							};
						} else {
							//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
							break; //can't see through humans
						};
					};
				};
			};
		} else if(pixel.dir === 1) {
			for(i = -4; i < 4+1; i++) {
				var oY = i;
				//console.log(`Starting row look at row ${pY+oY}`)
				for(j = 1; j < 16 + 1; j++) {
					var oX = j;
					var nX = pX+oX;
					var nY = pY+oY;
					if(outOfBounds(nX,nY)) {
						//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
						break;
					};
					if(isEmpty(nX,nY)) {
						////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
						continue;
					};
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newElement = newPixel.element;
						if(enemyHumanoidArray.includes(newElement)) {
							//console.log(`Human part found at (${nX},${nY})`)
							if(!newPixel.dead) {
								pixel.following = true;
								//console.log(`Human detected at (${nX},${nY})`)
								//Start "hissing" if a human is close enough
								if(pyth(pX,pY,nX,nY) <= 3.15) {
									pixel.hissing = true;
									if(!pixel.hissStart) {
										pixel.hissStart = pixelTicks;
									};
								};
								break;
							};
						} else {
							//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
							break;
						};
					};
				};
			};
		};
		
		//Pre-explosion handler: keeps track of time before the kaboom
		for(i = 0; i < 1; i++) { //dummy for loop
			if(pixel.hissing) {
				//console.log("Ssssssss");
				if(pixel.dead || !body || body.dead) { //can't explode without a body according to the classic creeper anatomy
					//console.log("ss-- oof");
					pixel.hissing = false;
					break;
				};
				if(!pixel.hissStart) {
					//console.log("t-30 ticks or whatever it was");
					pixel.hissStart = pixelTicks;
				};
				//Color code {
					var ticksHissing = pixelTicks - pixel.hissStart;
					var color = pixel.color; //do on each hissing tick
					if(color.startsWith("rgb")) {
						//console.log("rgb detected");
						color = color.split(","); //split color for addition
						var red = parseFloat(color[0].substring(4));
						var green = parseFloat(color[1]);
						var blue = parseFloat(color[2].slice(0,-1));
						red = rgbColorBound(red + ticksHissing);
						green = rgbColorBound(green + ticksHissing);
						blue = rgbColorBound(blue + ticksHissing);
						color = `rgb(${red},${green},${blue})`;
						pixel.color = color;
						//console.log("color set");
					} else if(color.startsWith("hsl")) {
						//console.log("hsl detected");
						color = color.split(","); //split color for addition
						var hue = parseFloat(color[0].substring(4));
						var saturation = parseFloat(color[1].slice(0,-1));
						var luminance = parseFloat(color[2].slice(0,-2));
						luminance = slBound(luminance + 1.176);
						color = `hsl(${hue},${saturation}%,${luminance}%)`;
						pixel.color = color;
						//console.log("color set");
					};
				//}

				if(pixelTicks - pixel.hissStart > 30) {
					//console.log("GOTTA YEET YEET YEET!");
					//console.log(`Exploding with radius ${explosionRadius} (charged: ${pixel.charged})`);
					explodeAtPlus(body.x,body.y,explosionRadius,"fire","smoke",null,angelicUpwardVelocity);
					//console.log("Yes, Rico, kaboom.");
				};
			};
		};
		
		if(Math.random() < 0.01) { //1% chance each tick to lose interest
			pixel.following = false;
			//console.log("Meh.");
		};
	},
};

															//Bombing Creeper

elements.bombing_creeper = {
	color: ["#5b8b59", "#3f8738", "#559552", "#479143", "#50b143", "#58c546", "#e83c3c", "#c92a2a", "#f53d3d", "#ad3131"],
	category: "life",
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
		following: false,
	},
	tick: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("bombing_creeper_body", pixel.x, pixel.y+1);
			pixel.element = "bombing_creeper_head";
			pixel.color = pixelColorPick(pixel)
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("bombing_creeper_head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			pixel.element = "bombing_creeper_body";
			pixel.color = pixelColorPick(pixel)
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	related: ["bombing_creeper_body","bombing_creeper_head"],
	desc: 'A creeper type from <em>Extra Creeper Types</em> <a href="https://www.curseforge.com/minecraft/mc-mods/extra-creeper-types">(CF)</a>. It spawns more explosives when it explodes.'
};

elements.bombing_creeper_body = {
	color: ["#e83c3c", "#c92a2a", "#f53d3d", "#ad3131"],
	category: "life",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: 25,
	tempHigh: 250,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: ["cooked_meat","cooked_meat","cooked_meat","dynamite","gunpowder"],
	breakInto: ["blood","dynamite","dynamite"],
	reactions: {
		"cancer": { "elem1":"cancer", "chance":0.005 },
		"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"plague": { "elem1":"plague", "chance":0.05 },
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
		charged: false,
		didChargeBlueTinted: false,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headPixel = pixelMap[pixel.x][pixel.y-2];
				if (headPixel.element == "bombing_creeper_head") {
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
			if (pixelTicks-pixel.dead > 200) {
				Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bombing_creeper_head") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
		}
		else { var head = null }

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1) {
				createPixel("blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head == null) { return }
		else if (Math.random() < 0.1) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						break;
					};
				};
			};
			// 15% chance to change direction while not chasing a human
			if(!head.following) {
				if (Math.random() < 0.15) {
					pixel.dir *= -1;
					//console.log("*turns around cutely to face ${pixel.dir < 0 ? 'left' : 'right'}*");
				};
			}/* else {
				//console.log("*chases cutely*");
			};*/
		};

		if(pixel.charge) {
			pixel.charged = true;
		};
		
		if(head) {
			if(typeof(head.charge) !== "undefined") {
				if(head.charge) {
					pixel.charged = true;
				};
			};
			if(typeof(head.charged) !== "undefined") {
				if(head.charged) {
					pixel.charged = true;
				};
			};
		};

		if(typeof(pixel.charged) === "undefined") {
			pixel.charged = false;
		};

		if(pixel.charged) {
			var explosionRadius = 10;
			if(!pixel.didChargeBlueTinted) { //do once, on initial charge
				//console.log("something something halsey lyric");
				var color = pixel.color;
				if(color.startsWith("rgb")) {
					//console.log("rgb detected");
					color = color.split(","); //split color for addition
					var red = parseFloat(color[0].substring(4));
					var green = parseFloat(color[1]);
					var blue = parseFloat(color[2].slice(0,-1));
					red = rgbColorBound(red + 51);
					green = rgbColorBound(green + 51);
					blue = rgbColorBound(blue + 102);
					color = `rgb(${red},${green},${blue})`;
					pixel.color = color;
					//console.log("color set");
				} else if(color.startsWith("hsl")) {
					//console.log("hsl detected");
					color = color.split(","); //split color for addition
					var hue = parseFloat(color[0].substring(4));
					var saturation = parseFloat(color[1].slice(0,-1));
					var luminance = parseFloat(color[2].slice(0,-2));
					hue = hue % 360; //piecewise hue shift
					if(hue <= 235 && hue >= 135) {
						hue = 185;
					} else if(hue < 135) {
						hue += 50;
					} else if(hue > 235 && hue < 360) {
						hue -= 50;
					};
					saturation = slBound (saturation + 10);
					luminance = slBound(luminance + 20);
					color = `hsl(${hue},${saturation}%,${luminance}%)`;
					pixel.color = color;
					//console.log("color set");
				};
				pixel.didChargeBlueTinted = true;
			};
		} else {
			var explosionRadius = 7;
		};
		
		if(pixel.burning) {
			pixel.hissing = true;
			if(!pixel.hissStart) {
				pixel.hissStart = pixelTicks;
			};
			if(!pixel.burnStart) { //I don't like errors.
				pixel.burnStart = pixel.ticks;
			};
			if(pixelTicks - pixel.burnStart > 30) {
				//console.log("Kaboom?");
				explodeAt(pixel.x,pixel.y,explosionRadius,"fire,dynamite");	//Effect: Places (originally 5) primed TNT when it explodes (i.e. cluster bomb creeper)
																			//Dynamite is the closest thing we have to powder TNT (i.e. good enough)
				//console.log("Yes, Rico, kaboom.");
			};
		};

		//Head hissing color handler: keeps track of head's hissing for coloring purposes
		for(i = 0; i < 1; i++) { //dummy for loop
			if(pixel.dead || !head || head.dead) { //can't hiss without a head according to the classic creeper anatomy
				//console.log("ss-- oof");
				pixel.hissing = false;
				break;
			};
			if(head.hissing) {
				//console.log("Ssssssss");
				if(!head.hissStart) {
					//console.log("t-30 ticks or whatever it was");
					head.hissStart = pixelTicks;
				};

				//Color code {
					var ticksHissing = pixelTicks - head.hissStart;
					var color = pixel.color; //do on each hissing tick
					if(color.startsWith("rgb")) {
						//console.log("rgb detected");
						color = color.split(","); //split color for addition
						var red = parseFloat(color[0].substring(4));
						var green = parseFloat(color[1]);
						var blue = parseFloat(color[2].slice(0,-1));
						red = rgbColorBound(red + ticksHissing);
						green = rgbColorBound(green + ticksHissing);
						blue = rgbColorBound(blue + ticksHissing);
						color = `rgb(${red},${green},${blue})`;
						pixel.color = color;
						//console.log("color set");
					} else if(color.startsWith("hsl")) {
						//console.log("hsl detected");
						color = color.split(","); //split color for addition
						var hue = parseFloat(color[0].substring(4));
						var saturation = parseFloat(color[1].slice(0,-1));
						var luminance = parseFloat(color[2].slice(0,-2));
						//console.log("the j");
						luminance = slBound(luminance + 1.176);
						//console.log(luminance);
						color = `hsl(${hue},${saturation}%,${luminance}%)`;
						pixel.color = color;
						//console.log("color set");
					};
				//}
			};
		};
	},
};

elements.bombing_creeper_head = {
	color: ["#5B8B59", "#3F8738", "#559552", "#479143", "#50B143", "#58C546"],
	category: "life",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: 25,
	tempHigh: 250,
	stateHigh: "cooked_meat",
	tempLow: -30,
	stateLow: "frozen_meat",
	burn: 10,
	burnTime: 250,
	burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","dynamite","gunpowder"],
	breakInto: ["blood","dynamite"],
	reactions: {
		"cancer": { "elem1":"cancer", "chance":0.005 },
		"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"plague": { "elem1":"plague", "chance":0.05 },
		"oxygen": { "elem2":"carbon_dioxide", "chance":0.5 },
	},
	properties: {
		dead: false,
		following: false,
		hissing: false,
		charged: false,
		didChargeBlueTinted: false,
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200) {
				Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bombing_creeper_body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		if(body) {
			if(body.dir !== pixel.dir) { //hacky workaround: lock head dir to body dir
				pixel.dir = body.dir;
			};
		};

		if (isEmpty(pixel.x, pixel.y+1)) {
			tryMove(pixel, pixel.x, pixel.y+1);
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		
		//start of most new code
		var pX = pixel.x;
		var pY = pixel.y;
		
		if(pixel.charge) {
			pixel.charged = true;
		};
		
		if(body) {
			if(typeof(body.charge) !== "undefined") {
				if(body.charge) {
					pixel.charged = true;
				};
			};
			if(typeof(body.charged) !== "undefined") {
				if(body.charged) {
					pixel.charged = true;
				};
			};
		};
		
		if(typeof(pixel.charged) === "undefined") {
			pixel.charged = false;
		};

		if(pixel.charged) {
			var explosionRadius = 10;
			if(!pixel.didChargeBlueTinted) { //do once, on initial charge
				//console.log("something something halsey lyric");
				var color = pixel.color;
				if(color.startsWith("rgb")) {
					//console.log("rgb detected");
					color = color.split(","); //split color for addition
					var red = parseFloat(color[0].substring(4));
					var green = parseFloat(color[1]);
					var blue = parseFloat(color[2].slice(0,-1));
					red = rgbColorBound(red + 51);
					green = rgbColorBound(green + 51);
					blue = rgbColorBound(blue + 102);
					color = `rgb(${red},${green},${blue})`;
					pixel.color = color;
					//console.log("color set");
				} else if(color.startsWith("hsl")) {
					//console.log("hsl detected");
					color = color.split(","); //split color for addition
					var hue = parseFloat(color[0].substring(4));
					var saturation = parseFloat(color[1].slice(0,-1));
					var luminance = parseFloat(color[2].slice(0,-2));
					hue = hue % 360; //piecewise hue shift
					if(hue <= 235 && hue >= 135) {
						hue = 185;
					} else if(hue < 135) {
						hue += 50;
					} else if(hue > 235 && hue < 360) {
						hue -= 50;
					};
					saturation = slBound (saturation + 10);
					luminance = slBound(luminance + 20);
					color = `hsl(${hue},${saturation}%,${luminance}%)`;
					pixel.color = color;
					//console.log("color set");
				};
				pixel.didChargeBlueTinted = true;
			};
		} else {
			var explosionRadius = 7;
		};
		
		//Human detection loop (looks ahead according to direction and sets the "following" variable to true, telling the body to lock the direction)
		var directionAdverb = "left";
		if(pixel.dir > 0) {
			directionAdverb = "right";
		};
		//console.log(`Looking ${directionAdverb}`)
		if(pixel.dir === -1) {
			for(i = -4; i < 4+1; i++) {
				var oY = i;
				//console.log(`Starting row look at row ${pY+oY}`)
				for(j = (-1); j > (-16 - 1); j--) {
					var oX = j;
					var nX = pX+oX;
					var nY = pY+oY;
					if(outOfBounds(nX,nY)) {
						//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
						break;
					};
					if(isEmpty(nX,nY)) {
						////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
						continue;
					};
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newElement = newPixel.element;
						if(enemyHumanoidArray.includes(newElement)) {
							//console.log(`Human part found at (${nX},${nY})`)
							if(!newPixel.dead) {
								pixel.following = true;
								//console.log(`Human detected at (${nX},${nY})`)
								//Start "hissing" if a human is close enough
								if(pyth(pX,pY,nX,nY) <= 3.15) { //probably misapplying the tolerance from the MC Wiki line: "Creepers will chase after any player, as long as it is within a 16 block (±5%) radius"
									pixel.hissing = true;
									if(!pixel.hissStart) {
										pixel.hissStart = pixelTicks;
									};
								};
							};
						} else {
							//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
							break; //can't see through humans
						};
					};
				};
			};
		} else if(pixel.dir === 1) {
			for(i = -4; i < 4+1; i++) {
				var oY = i;
				//console.log(`Starting row look at row ${pY+oY}`)
				for(j = 1; j < 16 + 1; j++) {
					var oX = j;
					var nX = pX+oX;
					var nY = pY+oY;
					if(outOfBounds(nX,nY)) {
						//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
						break;
					};
					if(isEmpty(nX,nY)) {
						////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
						continue;
					};
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newElement = newPixel.element;
						if(enemyHumanoidArray.includes(newElement)) {
							//console.log(`Human part found at (${nX},${nY})`)
							if(!newPixel.dead) {
								pixel.following = true;
								//console.log(`Human detected at (${nX},${nY})`)
								//Start "hissing" if a human is close enough
								if(pyth(pX,pY,nX,nY) <= 3.15) {
									pixel.hissing = true;
									if(!pixel.hissStart) {
										pixel.hissStart = pixelTicks;
									};
								};
								break;
							};
						} else {
							//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
							break;
						};
					};
				};
			};
		};
		
		//Pre-explosion handler: keeps track of time before the kaboom
		for(i = 0; i < 1; i++) { //dummy for loop
			if(pixel.hissing) {
				//console.log("Ssssssss");
				if(pixel.dead || !body || body.dead) { //can't explode without a body according to the classic creeper anatomy
					//console.log("ss-- oof");
					pixel.hissing = false;
					break;
				};
				if(!pixel.hissStart) {
					//console.log("t-30 ticks or whatever it was");
					pixel.hissStart = pixelTicks;
				};
				//Color code {
					var ticksHissing = pixelTicks - pixel.hissStart;
					var color = pixel.color; //do on each hissing tick
					if(color.startsWith("rgb")) {
						//console.log("rgb detected");
						color = color.split(","); //split color for addition
						var red = parseFloat(color[0].substring(4));
						var green = parseFloat(color[1]);
						var blue = parseFloat(color[2].slice(0,-1));
						red = rgbColorBound(red + ticksHissing);
						green = rgbColorBound(green + ticksHissing);
						blue = rgbColorBound(blue + ticksHissing);
						color = `rgb(${red},${green},${blue})`;
						pixel.color = color;
						//console.log("color set");
					} else if(color.startsWith("hsl")) {
						//console.log("hsl detected");
						color = color.split(","); //split color for addition
						var hue = parseFloat(color[0].substring(4));
						var saturation = parseFloat(color[1].slice(0,-1));
						var luminance = parseFloat(color[2].slice(0,-2));
						luminance = slBound(luminance + 1.176);
						color = `hsl(${hue},${saturation}%,${luminance}%)`;
						pixel.color = color;
						//console.log("color set");
					};
				//}

				if(pixelTicks - pixel.hissStart > 30) {
					//console.log("Kaboom?");
					//console.log(`Exploding with radius ${explosionRadius} (charged: ${pixel.charged})`);
					explodeAt(body.x,body.y,explosionRadius,"fire,dynamite");
					//console.log("Yes, Rico, kaboom.");
				};
			};
		};
		
		if(Math.random() < 0.01) { //1% chance each tick to lose interest
			pixel.following = false;
			//console.log("Meh.");
		};
	},
};

															//Hell Creeper

elements.hell_creeper = {
	color: ["#D2D2D2", "#ff141e", "#fc3232", "#DFAFAF", "#e84a4a", "#ce7979", "#d95555", "#d53c3c", "#c53636", "#b13333", "#913535", "#954242", "#872828", "#8b4949", "#2b0304"],
	category: "life",
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
		following: false,
	},
	tick: function(pixel) {
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel("hell_creeper_body", pixel.x, pixel.y+1);
			pixel.element = "hell_creeper_head";
			pixel.color = pixelColorPick(pixel)
		}
		else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel("hell_creeper_head", pixel.x, pixel.y-1);
			pixelMap[pixel.x][pixel.y-1].color = pixel.color;
			pixel.element = "hell_creeper_body";
			pixel.color = pixelColorPick(pixel)
		}
		else {
			deletePixel(pixel.x, pixel.y);
		}
	},
	related: ["hell_creeper_body","hell_creeper_head"],
	desc: 'A creeper type from <em>Extra Creeper Types</em> <a href="https://www.curseforge.com/minecraft/mc-mods/extra-creeper-types">(CF)</a>. It has a small explosion radius, but spawns a lot of fire around its explosion.'
};

elements.hell_creeper_body = {
	color: ["#D2D2D2", "#ff141e", "#fc3232", "#DFAFAF", "#e84a4a", "#ce7979", "#d95555", "#d53c3c", "#c53636", "#b13333", "#913535", "#954242", "#872828", "#8b4949", "#2b0304"],
	category: "life",
	hidden: true,
	density: 1500,
	state: "solid",
	conduct: 25,
	tempHigh: 2000, //they are immune to lava, and minecraft's lava is presumably mafic, so at least 1200*C
	stateHigh: "ash",
	breakInto: ["blood","gunpowder","fire"],
	reactions: {
		"cancer": { "elem1":"cancer", "chance":0.005 },
		"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"plague": { "elem1":"plague", "chance":0.05 },
	},
	properties: {
		dead: false,
		dir: 1,
		panic: 0,
		charged: false,
		didChargeBlueTinted: false,
	},
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headPixel = pixelMap[pixel.x][pixel.y-2];
				if (headPixel.element == "hell_creeper_head") {
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
			if (pixelTicks-pixel.dead > 200) {
				Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "hell_creeper_head") {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
		}
		else { var head = null }

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1) {
				createPixel("blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head == null) { return }
		else if (Math.random() < 0.1) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						break;
					};
				};
			};
			// 15% chance to change direction while not chasing a human
			if(!head.following) {
				if (Math.random() < 0.15) {
					pixel.dir *= -1;
					//console.log("*turns around cutely to face ${pixel.dir < 0 ? 'left' : 'right'}*");
				};
			}/* else {
				//console.log("*chases cutely*");
			};*/
		};

		if(pixel.charge) {
			pixel.charged = true;
		};
		
		if(head) {
			if(typeof(head.charge) !== "undefined") {
				if(head.charge) {
					pixel.charged = true;
				};
			};
			if(typeof(head.charged) !== "undefined") {
				if(head.charged) {
					pixel.charged = true;
				};
			};
		};

		if(typeof(pixel.charged) === "undefined") {
			pixel.charged = false;
		};

		if(pixel.charged) {
			var explosionRadius = 10;
			if(!pixel.didChargeBlueTinted) { //do once, on initial charge
				//console.log("something something halsey lyric");
				var color = pixel.color;
				if(color.startsWith("rgb")) {
					//console.log("rgb detected");
					color = color.split(","); //split color for addition
					var red = parseFloat(color[0].substring(4));
					var green = parseFloat(color[1]);
					var blue = parseFloat(color[2].slice(0,-1));
					red = rgbColorBound(red + 51);
					green = rgbColorBound(green + 51);
					blue = rgbColorBound(blue + 102);
					color = `rgb(${red},${green},${blue})`;
					pixel.color = color;
					//console.log("color set");
				} else if(color.startsWith("hsl")) {
					//console.log("hsl detected");
					color = color.split(","); //split color for addition
					var hue = parseFloat(color[0].substring(4));
					var saturation = parseFloat(color[1].slice(0,-1));
					var luminance = parseFloat(color[2].slice(0,-2));
					hue = hue % 360; //piecewise hue shift
					if(hue <= 235 && hue >= 135) {
						hue = 185;
					} else if(hue < 135) {
						hue += 50;
					} else if(hue > 235 && hue < 360) {
						hue -= 50;
					};
					saturation = slBound (saturation + 10);
					luminance = slBound(luminance + 20);
					color = `hsl(${hue},${saturation}%,${luminance}%)`;
					pixel.color = color;
					//console.log("color set");
				};
				pixel.didChargeBlueTinted = true;
			};
		} else {
			var explosionRadius = 7;
		};
		
		if(pixel.burning) {
			pixel.hissing = true;
			if(!pixel.hissStart) {
				pixel.hissStart = pixelTicks;
			};
			if(!pixel.burnStart) { //I don't like errors.
				pixel.burnStart = pixel.ticks;
			};
			if(pixelTicks - pixel.burnStart > 30) {
				//console.log("Kaboom?");
				explodeAtPlus(pixel.x,pixel.y,explosionRadius,"fire","fire",null,hellExplosionFire);
				//console.log("Yes, Rico, kaboom.");
			};
		};

		//Head hissing color handler: keeps track of head's hissing for coloring purposes
		for(i = 0; i < 1; i++) { //dummy for loop
			if(pixel.dead || !head || head.dead) { //can't hiss without a head according to the classic creeper anatomy
				//console.log("ss-- oof");
				pixel.hissing = false;
				break;
			};
			if(head.hissing) {
				//console.log("Ssssssss");
				if(!head.hissStart) {
					//console.log("t-30 ticks or whatever it was");
					head.hissStart = pixelTicks;
				};

				//Color code {
					var ticksHissing = pixelTicks - head.hissStart;
					var color = pixel.color; //do on each hissing tick
					if(color.startsWith("rgb")) {
						//console.log("rgb detected");
						color = color.split(","); //split color for addition
						var red = parseFloat(color[0].substring(4));
						var green = parseFloat(color[1]);
						var blue = parseFloat(color[2].slice(0,-1));
						red = rgbColorBound(red + ticksHissing);
						green = rgbColorBound(green + ticksHissing);
						blue = rgbColorBound(blue + ticksHissing);
						color = `rgb(${red},${green},${blue})`;
						pixel.color = color;
						//console.log("color set");
					} else if(color.startsWith("hsl")) {
						//console.log("hsl detected");
						color = color.split(","); //split color for addition
						var hue = parseFloat(color[0].substring(4));
						var saturation = parseFloat(color[1].slice(0,-1));
						var luminance = parseFloat(color[2].slice(0,-2));
						//console.log("the j");
						luminance = slBound(luminance + 1.176);
						//console.log(luminance);
						color = `hsl(${hue},${saturation}%,${luminance}%)`;
						pixel.color = color;
						//console.log("color set");
					};
				//}
			};
		};
	},
};

elements.hell_creeper_head = {
	color: ["#D2D2D2", "#ff141e", "#fc3232", "#e84a4a", "#b13333", "#913535", "#954242", "#872828", "#8b4949", "#2b0304", "#111111", "#faae3c", "#f5e131"],
	category: "life",
	hidden: true,
	density: 1080,
	state: "solid",
	conduct: 25,
	tempHigh: 2000,
	stateHigh: "ash",
	tempLow: -30,
	stateLow: "frozen_meat",
	breakInto: ["blood","fire"],
	reactions: {
		"cancer": { "elem1":"cancer", "chance":0.005 },
		"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
		"plague": { "elem1":"plague", "chance":0.05 },
		"oxygen": { "elem2":"carbon_dioxide", "chance":0.5 },
	},
	properties: {
		dead: false,
		following: false,
		hissing: false,
		charged: false,
		didChargeBlueTinted: false,
	},
	tick: function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200) {
				Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "hell_creeper_body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		if(body) {
			if(body.dir !== pixel.dir) { //hacky workaround: lock head dir to body dir
				pixel.dir = body.dir;
			};
		};

		if (isEmpty(pixel.x, pixel.y+1)) {
			tryMove(pixel, pixel.x, pixel.y+1);
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		
		//start of most new code
		var pX = pixel.x;
		var pY = pixel.y;
		
		if(pixel.charge) {
			pixel.charged = true;
		};
		
		if(body) {
			if(typeof(body.charge) !== "undefined") {
				if(body.charge) {
					pixel.charged = true;
				};
			};
			if(typeof(body.charged) !== "undefined") {
				if(body.charged) {
					pixel.charged = true;
				};
			};
		};
		
		if(typeof(pixel.charged) === "undefined") {
			pixel.charged = false;
		};

		if(pixel.charged) {
			var explosionRadius = 10;
			if(!pixel.didChargeBlueTinted) { //do once, on initial charge
				//console.log("something something halsey lyric");
				var color = pixel.color;
				if(color.startsWith("rgb")) {
					//console.log("rgb detected");
					color = color.split(","); //split color for addition
					var red = parseFloat(color[0].substring(4));
					var green = parseFloat(color[1]);
					var blue = parseFloat(color[2].slice(0,-1));
					red = rgbColorBound(red + 51);
					green = rgbColorBound(green + 51);
					blue = rgbColorBound(blue + 102);
					color = `rgb(${red},${green},${blue})`;
					pixel.color = color;
					//console.log("color set");
				} else if(color.startsWith("hsl")) {
					//console.log("hsl detected");
					color = color.split(","); //split color for addition
					var hue = parseFloat(color[0].substring(4));
					var saturation = parseFloat(color[1].slice(0,-1));
					var luminance = parseFloat(color[2].slice(0,-2));
					hue = hue % 360; //piecewise hue shift
					if(hue <= 235 && hue >= 135) {
						hue = 185;
					} else if(hue < 135) {
						hue += 50;
					} else if(hue > 235 && hue < 360) {
						hue -= 50;
					};
					saturation = slBound (saturation + 10);
					luminance = slBound(luminance + 20);
					color = `hsl(${hue},${saturation}%,${luminance}%)`;
					pixel.color = color;
					//console.log("color set");
				};
				pixel.didChargeBlueTinted = true;
			};
		} else {
			var explosionRadius = 7;
		};
		
		//Human detection loop (looks ahead according to direction and sets the "following" variable to true, telling the body to lock the direction)
		var directionAdverb = "left";
		if(pixel.dir > 0) {
			directionAdverb = "right";
		};
		//console.log(`Looking ${directionAdverb}`)
		if(pixel.dir === -1) {
			for(i = -4; i < 4+1; i++) {
				var oY = i;
				//console.log(`Starting row look at row ${pY+oY}`)
				for(j = (-1); j > (-16 - 1); j--) {
					var oX = j;
					var nX = pX+oX;
					var nY = pY+oY;
					if(outOfBounds(nX,nY)) {
						//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
						break;
					};
					if(isEmpty(nX,nY)) {
						////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
						continue;
					};
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newElement = newPixel.element;
						if(enemyHumanoidArray.includes(newElement)) {
							//console.log(`Human part found at (${nX},${nY})`)
							if(!newPixel.dead) {
								pixel.following = true;
								//console.log(`Human detected at (${nX},${nY})`)
								//Start "hissing" if a human is close enough
								if(pyth(pX,pY,nX,nY) <= 3.15) { //probably misapplying the tolerance from the MC Wiki line: "Creepers will chase after any player, as long as it is within a 16 block (±5%) radius"
									pixel.hissing = true;
									if(!pixel.hissStart) {
										pixel.hissStart = pixelTicks;
									};
								};
							};
						} else {
							//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
							break; //can't see through humans
						};
					};
				};
			};
		} else if(pixel.dir === 1) {
			for(i = -4; i < 4+1; i++) {
				var oY = i;
				//console.log(`Starting row look at row ${pY+oY}`)
				for(j = 1; j < 16 + 1; j++) {
					var oX = j;
					var nX = pX+oX;
					var nY = pY+oY;
					if(outOfBounds(nX,nY)) {
						//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
						break;
					};
					if(isEmpty(nX,nY)) {
						////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
						continue;
					};
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newElement = newPixel.element;
						if(enemyHumanoidArray.includes(newElement)) {
							//console.log(`Human part found at (${nX},${nY})`)
							if(!newPixel.dead) {
								pixel.following = true;
								//console.log(`Human detected at (${nX},${nY})`)
								//Start "hissing" if a human is close enough
								if(pyth(pX,pY,nX,nY) <= 3.15) {
									pixel.hissing = true;
									if(!pixel.hissStart) {
										pixel.hissStart = pixelTicks;
									};
								};
								break;
							};
						} else {
							//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
							break;
						};
					};
				};
			};
		};
		
		//Pre-explosion handler: keeps track of time before the kaboom
		for(i = 0; i < 1; i++) { //dummy for loop
			if(pixel.hissing) {
				//console.log("Ssssssss");
				if(pixel.dead || !body || body.dead) { //can't explode without a body according to the classic creeper anatomy
					//console.log("ss-- oof");
					pixel.hissing = false;
					break;
				};
				if(!pixel.hissStart) {
					//console.log("t-30 ticks or whatever it was");
					pixel.hissStart = pixelTicks;
				};
				//Color code {
					var ticksHissing = pixelTicks - pixel.hissStart;
					var color = pixel.color; //do on each hissing tick
					if(color.startsWith("rgb")) {
						//console.log("rgb detected");
						color = color.split(","); //split color for addition
						var red = parseFloat(color[0].substring(4));
						var green = parseFloat(color[1]);
						var blue = parseFloat(color[2].slice(0,-1));
						red = rgbColorBound(red + ticksHissing);
						green = rgbColorBound(green + ticksHissing);
						blue = rgbColorBound(blue + ticksHissing);
						color = `rgb(${red},${green},${blue})`;
						pixel.color = color;
						//console.log("color set");
					} else if(color.startsWith("hsl")) {
						//console.log("hsl detected");
						color = color.split(","); //split color for addition
						var hue = parseFloat(color[0].substring(4));
						var saturation = parseFloat(color[1].slice(0,-1));
						var luminance = parseFloat(color[2].slice(0,-2));
						luminance = slBound(luminance + 1.176);
						color = `hsl(${hue},${saturation}%,${luminance}%)`;
						pixel.color = color;
						//console.log("color set");
					};
				//}

				if(pixelTicks - pixel.hissStart > 30) {
					//console.log("Kaboom?");
					//console.log(`Exploding with radius ${explosionRadius} (charged: ${pixel.charged})`);
					explodeAtPlus(pixel.x,pixel.y,explosionRadius,"fire","fire",null,hellExplosionFire);
					//console.log("Yes, Rico, kaboom.");
				};
			};
		};
		
		if(Math.random() < 0.01) { //1% chance each tick to lose interest
			pixel.following = false;
			//console.log("Meh.");
		};
	},
};

/* Creeper generation
___#___#___#___#___#___#___#___#___#___
__#___#___#___#___#___#___#___#___#___#
_#___#___#___#___#___#___#___#___#___#_
#___#___#___#___#___#___#___#___#___#__
___#___#___#___#___#___#___#___#___#___
__#___#___#___#___#___#___#___#___#___#
_#___#___#___#___#___#___#___#___#___#_
#___#___#___#___#___#___#___#___#___#__
___#___#___#___#___#___#___#___#___#___
__#___#___#___#___#___#___#___#___#___#
_#___#___#___#___#___#___#___#___#___#_
#___#___#___#___#___#___#___#___#___#__
___#___#___#___#___#___#___#___#___#___
__#___#___#___#___#___#___#___#___#___#
_#___#___#___#___#___#___#___#___#___#_
#___#___#___#___#___#___#___#___#___#__
*/

	//This code is a lot worse than I'd have liked it to be...



urlParams = new URLSearchParams(window.location.search);

//Include generated creepers in Random tool?
if(urlParams.get('creeperIncludeRandom') !== null) { //if the variable exists at all
    creeperIncludeRandom = true
} else { //if it doesn't (and it returns null)
    creeperIncludeRandom = false
}

//Start Creeper Template Functions {

	autoCreeperPlacerTick = function(pixel) {
		var creeperElement = elements[pixel.element].creeperType;
		var headName,bodyName;
		if(typeof(creeperElement === "string")) { //comma separated string check
			if(creeperElement.includes(",")) { //if it is
				creeperElement = creeperElement.split(","); //to array
				creeperElement = creeperElement.filter(function(e) { //strip nonexistent elements
					return typeof(elements[e]) === "object";
				});
			};
		};
		if(Array.isArray(creeperElement)) {
			headName = `${creeperElement.join("_")}_creeper_head`; //auto head element name
			bodyName = `${creeperElement.join("_")}_creeper_body`; //auto body element name
		} else {
			headName = `${creeperElement}_creeper_head`; //auto head element name
			bodyName = `${creeperElement}_creeper_body`; //auto body element name
		};
		if (isEmpty(pixel.x, pixel.y+1)) {
			createPixel(bodyName, pixel.x, pixel.y+1);
			pixel.element = headName;
			pixel.color = pixelColorPick(pixel)
		} else if (isEmpty(pixel.x, pixel.y-1)) {
			createPixel(headName, pixel.x, pixel.y-1);
			pixel.element = bodyName;
			pixel.color = pixelColorPick(pixel)
		} else {
			deletePixel(pixel.x, pixel.y);
		};
	};

	autoCreeperBodyTick = function(pixel) {
		var creeperElement = elements[pixel.element].creeperType;
		var headName,bodyName,explodeInto;
		if(typeof(creeperElement === "string")) { //comma separated string check
			if(creeperElement.includes(",")) { //if it is
				creeperElement = creeperElement.split(","); //to array
				creeperElement = creeperElement.filter(function(e) { //strip nonexistent elements
					return typeof(elements[e]) === "object";
				});
			};
		};
		if(Array.isArray(creeperElement)) {
			headName = `${creeperElement.join("_")}_creeper_head`; //auto head element name
			bodyName = `${creeperElement.join("_")}_creeper_body`; //auto body element name
			explodeInto = creeperElement.join(","); //auto body element name
		} else {
			headName = `${creeperElement}_creeper_head`; //auto head element name
			bodyName = `${creeperElement}_creeper_body`; //auto body element name
			explodeInto = creeperElement; //auto body element name
		};
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headPixel = pixelMap[pixel.x][pixel.y-2];
				if (headPixel.element == headName) {
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
			if (pixelTicks-pixel.dead > 200) {
				Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == headName) {
			var head = pixelMap[pixel.x][pixel.y-1];
			if (head.dead) { // If head is dead, kill body
				pixel.dead = head.dead;
			}
		}
		else { var head = null }

		if (isEmpty(pixel.x, pixel.y-1)) {
			// create blood if decapitated 10% chance
			if (Math.random() < 0.1) {
				createPixel("blood", pixel.x, pixel.y-1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		else if (head == null) { return }
		else if (Math.random() < 0.1) { // Move 10% chance
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						break;
					};
				};
			};
			// 15% chance to change direction while not chasing a human
			if(!head.following) {
				if (Math.random() < 0.15) {
					pixel.dir *= -1;
					//console.log("*turns around cutely to face ${pixel.dir < 0 ? 'left' : 'right'}*");
				};
			}/* else {
				//console.log("*chases cutely*");
			};*/
		};

		if(pixel.charge) {
			pixel.charged = true;
		};
		
		if(head) {
			if(typeof(head.charge) !== "undefined") {
				if(head.charge) {
					pixel.charged = true;
				};
			};
			if(typeof(head.charged) !== "undefined") {
				if(head.charged) {
					pixel.charged = true;
				};
			};
		};

		if(typeof(pixel.charged) === "undefined") {
			pixel.charged = false;
		};

		if(pixel.charged) {
			var explosionRadius = 7;
			if(!pixel.didChargeBlueTinted) { //do once, on initial charge
				//console.log("something something halsey lyric");
				var color = pixel.color;
				if(color.startsWith("rgb")) {
					//console.log("rgb detected");
					color = color.split(","); //split color for addition
					var red = parseFloat(color[0].substring(4));
					var green = parseFloat(color[1]);
					var blue = parseFloat(color[2].slice(0,-1));
					red = rgbColorBound(red + 51);
					green = rgbColorBound(green + 51);
					blue = rgbColorBound(blue + 102);
					color = `rgb(${red},${green},${blue})`;
					pixel.color = color;
					//console.log("color set");
				} else if(color.startsWith("hsl")) {
					//console.log("hsl detected");
					color = color.split(","); //split color for addition
					var hue = parseFloat(color[0].substring(4));
					var saturation = parseFloat(color[1].slice(0,-1));
					var luminance = parseFloat(color[2].slice(0,-2));
					hue = hue % 360; //piecewise hue shift
					if(hue <= 235 && hue >= 135) {
						hue = 185;
					} else if(hue < 135) {
						hue += 50;
					} else if(hue > 235 && hue < 360) {
						hue -= 50;
					};
					saturation = slBound (saturation + 10);
					luminance = slBound(luminance + 20);
					color = `hsl(${hue},${saturation}%,${luminance}%)`;
					pixel.color = color;
					//console.log("color set");
				};
				pixel.didChargeBlueTinted = true;
			};
		} else {
			var explosionRadius = 5;
		};
		
		if(pixel.burning) {
			pixel.hissing = true;
			if(!pixel.hissStart) {
				pixel.hissStart = pixelTicks;
			};
			if(!pixel.burnStart) { //I don't like errors.
				pixel.burnStart = pixel.ticks;
			};
			if(pixelTicks - pixel.burnStart > 30) {
				//console.log("Kaboom?");
				explodeAt(pixel.x,pixel.y,explosionRadius,creeperElement);
				//console.log("Yes, Rico, kaboom.");
			};
		};

		//Head hissing color handler: keeps track of head's hissing for coloring purposes
		for(i = 0; i < 1; i++) { //dummy for loop
			if(pixel.dead || !head || head.dead) { //can't hiss without a head according to the classic creeper anatomy
				//console.log("ss-- oof");
				pixel.hissing = false;
				break;
			};
			if(head.hissing) {
				//console.log("Ssssssss");
				if(!head.hissStart) {
					//console.log("t-30 ticks or whatever it was");
					head.hissStart = pixelTicks;
				};

				//Color code {
					var ticksHissing = pixelTicks - head.hissStart;
					var color = pixel.color; //do on each hissing tick
					if(color.startsWith("rgb")) {
						//console.log("rgb detected");
						color = color.split(","); //split color for addition
						var red = parseFloat(color[0].substring(4));
						var green = parseFloat(color[1]);
						var blue = parseFloat(color[2].slice(0,-1));
						red = rgbColorBound(red + ticksHissing);
						green = rgbColorBound(green + ticksHissing);
						blue = rgbColorBound(blue + ticksHissing);
						color = `rgb(${red},${green},${blue})`;
						pixel.color = color;
						//console.log("color set");
					} else if(color.startsWith("hsl")) {
						//console.log("hsl detected");
						color = color.split(","); //split color for addition
						var hue = parseFloat(color[0].substring(4));
						var saturation = parseFloat(color[1].slice(0,-1));
						var luminance = parseFloat(color[2].slice(0,-2));
						//console.log("the j");
						luminance = slBound(luminance + 1.176);
						//console.log(luminance);
						color = `hsl(${hue},${saturation}%,${luminance}%)`;
						pixel.color = color;
						//console.log("color set");
					};
				//}
			};
		};
	};

	autoCreeperHeadTick = function(pixel) {
		var creeperElement = elements[pixel.element].creeperType;
		var headName,bodyName,explodeInto;
		if(typeof(creeperElement === "string")) { //comma separated string check
			if(creeperElement.includes(",")) { //if it is
				creeperElement = creeperElement.split(","); //to array
				creeperElement = creeperElement.filter(function(e) { //strip nonexistent elements
					return typeof(elements[e]) === "object";
				});
			};
		};
		if(Array.isArray(creeperElement)) {
			headName = `${creeperElement.join("_")}_creeper_head`; //auto head element name
			bodyName = `${creeperElement.join("_")}_creeper_body`; //auto body element name
			explodeInto = creeperElement.join(","); //auto body element name
		} else {
			headName = `${creeperElement}_creeper_head`; //auto head element name
			bodyName = `${creeperElement}_creeper_body`; //auto body element name
			explodeInto = creeperElement; //auto body element name
		};
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200) {
				Math.random() < 0.1 ? changePixel(pixel,"gunpowder") : changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == bodyName) {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		if(body) {
			if(body.dir !== pixel.dir) { //hacky workaround: lock head dir to body dir
				pixel.dir = body.dir;
			};
		};

		if (isEmpty(pixel.x, pixel.y+1)) {
			tryMove(pixel, pixel.x, pixel.y+1);
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		
		//start of most new code
		var pX = pixel.x;
		var pY = pixel.y;
		
		if(pixel.charge) {
			pixel.charged = true;
		};
		
		if(body) {
			if(typeof(body.charge) !== "undefined") {
				if(body.charge) {
					pixel.charged = true;
				};
			};
			if(typeof(body.charged) !== "undefined") {
				if(body.charged) {
					pixel.charged = true;
				};
			};
		};
		
		if(typeof(pixel.charged) === "undefined") {
			pixel.charged = false;
		};

		if(pixel.charged) {
			var explosionRadius = 10;
			if(!pixel.didChargeBlueTinted) { //do once, on initial charge
				//console.log("something something halsey lyric");
				var color = pixel.color;
				if(color.startsWith("rgb")) {
					//console.log("rgb detected");
					color = color.split(","); //split color for addition
					var red = parseFloat(color[0].substring(4));
					var green = parseFloat(color[1]);
					var blue = parseFloat(color[2].slice(0,-1));
					red = rgbColorBound(red + 51);
					green = rgbColorBound(green + 51);
					blue = rgbColorBound(blue + 102);
					color = `rgb(${red},${green},${blue})`;
					pixel.color = color;
					//console.log("color set");
				} else if(color.startsWith("hsl")) {
					//console.log("hsl detected");
					color = color.split(","); //split color for addition
					var hue = parseFloat(color[0].substring(4));
					var saturation = parseFloat(color[1].slice(0,-1));
					var luminance = parseFloat(color[2].slice(0,-2));
					hue = hue % 360; //piecewise hue shift
					if(hue <= 235 && hue >= 135) {
						hue = 185;
					} else if(hue < 135) {
						hue += 50;
					} else if(hue > 235 && hue < 360) {
						hue -= 50;
					};
					saturation = slBound (saturation + 10);
					luminance = slBound(luminance + 20);
					color = `hsl(${hue},${saturation}%,${luminance}%)`;
					pixel.color = color;
					//console.log("color set");
				};
				pixel.didChargeBlueTinted = true;
			};
		} else {
			var explosionRadius = 7;
		};
		
		//Human detection loop (looks ahead according to direction and sets the "following" variable to true, telling the body to lock the direction)
		var directionAdverb = "left";
		if(pixel.dir > 0) {
			directionAdverb = "right";
		};
		//console.log(`Looking ${directionAdverb}`)
		if(pixel.dir === -1) {
			for(i = -4; i < 4+1; i++) {
				var oY = i;
				//console.log(`Starting row look at row ${pY+oY}`)
				for(j = (-1); j > (-16 - 1); j--) {
					var oX = j;
					var nX = pX+oX;
					var nY = pY+oY;
					if(outOfBounds(nX,nY)) {
						//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
						break;
					};
					if(isEmpty(nX,nY)) {
						////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
						continue;
					};
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newElement = newPixel.element;
						if(enemyHumanoidArray.includes(newElement)) {
							//console.log(`Human part found at (${nX},${nY})`)
							if(!newPixel.dead) {
								pixel.following = true;
								//console.log(`Human detected at (${nX},${nY})`)
								//Start "hissing" if a human is close enough
								if(pyth(pX,pY,nX,nY) <= 3.15) { //probably misapplying the tolerance from the MC Wiki line: "Creepers will chase after any player, as long as it is within a 16 block (±5%) radius"
									pixel.hissing = true;
									if(!pixel.hissStart) {
										pixel.hissStart = pixelTicks;
									};
								};
							};
						} else {
							//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
							break; //can't see through humans
						};
					};
				};
			};
		} else if(pixel.dir === 1) {
			for(i = -4; i < 4+1; i++) {
				var oY = i;
				//console.log(`Starting row look at row ${pY+oY}`)
				for(j = 1; j < 16 + 1; j++) {
					var oX = j;
					var nX = pX+oX;
					var nY = pY+oY;
					if(outOfBounds(nX,nY)) {
						//console.log(`Stopping row look at pixel (${nX},${nY}) due to OoB`)
						break;
					};
					if(isEmpty(nX,nY)) {
						////console.log(`Skipping pixel (${nX},${nY}) (empty)`)
						continue;
					};
					if(!isEmpty(nX,nY,true)) {
						var newPixel = pixelMap[nX][nY];
						var newElement = newPixel.element;
						if(enemyHumanoidArray.includes(newElement)) {
							//console.log(`Human part found at (${nX},${nY})`)
							if(!newPixel.dead) {
								pixel.following = true;
								//console.log(`Human detected at (${nX},${nY})`)
								//Start "hissing" if a human is close enough
								if(pyth(pX,pY,nX,nY) <= 3.15) {
									pixel.hissing = true;
									if(!pixel.hissStart) {
										pixel.hissStart = pixelTicks;
									};
								};
								break;
							};
						} else {
							//console.log(`Stopping row look at pixel (${nX},${nY}) due to non-human pixel in the way`)
							break;
						};
					};
				};
			};
		};
		
		//Pre-explosion handler: keeps track of time before the kaboom
		for(i = 0; i < 1; i++) { //dummy for loop
			if(pixel.hissing) {
				//console.log("Ssssssss");
				if(pixel.dead || !body || body.dead) { //can't explode without a body according to the classic creeper anatomy
					//console.log("ss-- oof");
					pixel.hissing = false;
					break;
				};
				if(!pixel.hissStart) {
					//console.log("t-30 ticks or whatever it was");
					pixel.hissStart = pixelTicks;
				};
				//Color code {
					var ticksHissing = pixelTicks - pixel.hissStart;
					var color = pixel.color; //do on each hissing tick
					if(color.startsWith("rgb")) {
						//console.log("rgb detected");
						color = color.split(","); //split color for addition
						var red = parseFloat(color[0].substring(4));
						var green = parseFloat(color[1]);
						var blue = parseFloat(color[2].slice(0,-1));
						red = rgbColorBound(red + ticksHissing);
						green = rgbColorBound(green + ticksHissing);
						blue = rgbColorBound(blue + ticksHissing);
						color = `rgb(${red},${green},${blue})`;
						pixel.color = color;
						//console.log("color set");
					} else if(color.startsWith("hsl")) {
						//console.log("hsl detected");
						color = color.split(","); //split color for addition
						var hue = parseFloat(color[0].substring(4));
						var saturation = parseFloat(color[1].slice(0,-1));
						var luminance = parseFloat(color[2].slice(0,-2));
						luminance = slBound(luminance + 1.176);
						color = `hsl(${hue},${saturation}%,${luminance}%)`;
						pixel.color = color;
						//console.log("color set");
					};
				//}

				if(pixelTicks - pixel.hissStart > 30) {
					//console.log("Kaboom?");
					//console.log(`Exploding with element ${creeperElement} and radius ${explosionRadius} (charged: ${pixel.charged})`);
					explodeAt(body.x,body.y,explosionRadius,explodeInto);
					//console.log("Yes, Rico, kaboom.");
				};
			};
		};
		
		if(Math.random() < 0.01) { //1% chance each tick to lose interest
			pixel.following = false;
			//console.log("Meh.");
		};
	};

//End Creeper Template Functions }

//Start Color Functions and Variables {
	function sumArray(array) { //Sum of array numbers
		return array.reduce((partialSum, a) => partialSum + a, 0);
	};

	function averageArray(array) { //Average of array numbers
		return sumArray(array) / array.length;
	};
	
	function _rgbHexCatcher(color) { //Hex triplet to rgb(), while rgb() is untouched
			//console.log("Logged color for _rgbHexCatcher: " + color);
									 //I have no idea if this runs before or after parsing hex triplets to rgb() values, so I'm going to handle both (by making everything rgb() and then making it hex at the end)
		if(typeof(color) === "undefined") {
			//console.log("Warning: An element has an undefined color. Unfortunately, due to how the code is structured, I can't say which one.");
			color = "#FF00FF";
		};
		if(color.length < 10) {
			//console.log("Short string detected, likely a hex triplet");
			if(!color.startsWith("#")) {
				color = "#" + color;
			};
			var object = hexToRGB(color);
			return `rgb(${object.r},${object.g},${object.b})`
		} else {
			//console.log("Non-triplet detected");
			return color;
		};
	};

	function averageRgbPrefixedColorArray(colorArray,returnObject=false) { //array of rgb()s to single rgb() of average color
		//console.log("Averaging started");
		var reds = [];
		var greens = [];
		var blues = [];
		for(k = 0; k < colorArray.length; k++) {
			//console.log("Average function: Executing catcher on " + colorArray);
			var color = _rgbHexCatcher(colorArray[k]);
			//console.log("Logged color for aRPCA: " + color);
			color = color.split(","); 
			var red = parseFloat(color[0].substring(4));
			reds.push(red)
			var green = parseFloat(color[1]);
			greens.push(green)
			var blue = parseFloat(color[2].slice(0,-1));
			blues.push(blue)
		};
		redAverage = Math.round(averageArray(reds));
		greenAverage = Math.round(averageArray(greens));
		blueAverage = Math.round(averageArray(blues));
		var output; 
		returnObject ? output = {r: redAverage, g: greenAverage, b: blueAverage} : output = `rgb(${redAverage},${greenAverage},${blueAverage})`;
		//console.log("Averaging finished, product: " + output);
		return output;
	};
	//averageRgbPrefixedColorArray(["rgb(255,0,0)", "rgb(0,0,0)", "rgb(0,0,255)"]);

	function rgbStringToUnvalidatedObject(string) { //turns rgb() to {r,g,b} with no bounds checking
		//console.log("Splitting string into object");
		string = string.split(",");
		var red = parseFloat(string[0].substring(4));
		var green = parseFloat(string[1]);
		var blue = parseFloat(string[2].slice(0,-1));
		//console.log("String split: outputs " + red + ", " + green + ", " + blue + ".");
		return {r: red, g: green, b: blue};
	};

	//https://stackoverflow.com/questions/46432335/hex-to-hsl-convert-javascript
	function rgbStringToHSL(rgb) { //Originally a hex-to-HSL function, edited to take RGB and spit out an array
		//console.log("HSLing some RGBs");
		var result = rgbStringToUnvalidatedObject(rgb);

		var r = result.r;
		var g = result.g;
		var b = result.b;

		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if(max == min){
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		};

		s = s*100;
		s = Math.round(s);
		l = l*100;
		l = Math.round(l);
		h = Math.round(360*h);

		//var colorInHSL = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
		//Edit to return an array
		var colorInHSL = [h,s,l];
		//console.log("HSL output "+ colorInHSL + ".");
		return colorInHSL;
	};

	//https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
	function hslToHex(h, s, l) { //h, s, l params to hex triplet
      //console.log(`Hexing some HSLs (the HSLs are ${h},${s},${l})`)
	  l /= 100;
	  var a = s * Math.min(l, 1 - l) / 100;
	  var f = n => {
		var k = (n + h / 30) % 12;
		var color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
	  };
	  //console.log(`Hexed to #${f(0)}${f(8)}${f(4)}`)
	  return `#${f(0)}${f(8)}${f(4)}`;
	};
	
	function pad_array(arr,len,fill) { //https://stackoverflow.com/a/38851957
		//console.log("Padding array");
		return arr.concat(Array(len).fill(fill)).slice(0,len);
	}
	
	function addArraysInPairs(array1,array2,fill=0) { //e.g. [1,2,3] + [10,0,-1] = [11,2,2]
		//console.log("Adding in pairs: " + array1 + " and " + array2 + ".");
		if(array1.length > array2.length) { //zero-padding
			array2 = pad_array(array2,array1.length,fill); //if a1 is longer, pad a2 to a1's length
		} else if(array2.length > array1.length) {
			array1 = pad_array(array1,array2.length,fill); //if a2 is longer, pad a1 to a2's length
		};
		var tempArray = [];
		for(z = 0; z < array1.length; z++) {
			//console.log("Forming output values (" + array1[z] + " + " + array2[z] + ")");
			tempArray[z] = array1[z] + array2[z];
			//console.log("Sum" + tempArray[z]);
		};
		//console.log("Added into " + tempArray + ".");
		return tempArray;
	};

	//var placeholderColor = "#FF00FF";
	
	var hslOffsets = [[0, -5, 5], [0, -20, 10], [0, 0, 10], [0, -20, 10], [0, -35, 0], [0, -20, -30], [0, 10, -10], [0, 10, 20], [0, -20, 10], [0, -10, 5]];
//End Color Functions and Variables }

	var colorOfRandomCreeper = ["#7ba883", "#8aba8a", "#87b292", "#8aba8a", "#71a171", "#346434", "#4d6d72", "#a0caad", "#8aba8a", "#7dac7f"]
	//random_creeper's final color but all values of the sixth one increased by 16 decimal and then everything's R and B -= 48 decimal

	elements.spawn_random_creeper = {
		color: colorOfRandomCreeper,
		behavior: behaviors.WALL,
		category: "special",
		excludeRandom: false, //see below
		tick: function(pixel) {
			changePixel(pixel,spawnCreepers[Math.floor(Math.random() * spawnCreepers.length)]) //spawnCreepers is already excludeRandom filtered
		},
	};

runAfterLoad(function() {
    creeperElements = Object.keys(elements);
	creeperElements.push(["rock","sand"]);
	//creeperElements = ["water","steel","dirt",["dirt","sand"],"frostwind","antimatter,acid","fire,nonexist"]; //Test array
    for(aaf = 0; aaf < creeperElements.length; aaf++) {
		var elementOfCreeper = creeperElements[aaf];
		var startColor;
		var randomExcl = 0;
		//console.log("randomExcl set")
		//console.log(elementOfCreeper);

		var headName,bodyName,placerName,descElement;

		if(typeof(elementOfCreeper === "string")) { //comma separated string check
			if(elementOfCreeper.includes(",")) { //if it is
				elementOfCreeper = elementOfCreeper.split(","); //to array
				elementOfCreeper = elementOfCreeper.filter(function(e) { //strip nonexistent elements
					return typeof(elements[e]) === "object";
				});
			};
		};
		if(Array.isArray(elementOfCreeper)) {
			headName = `${elementOfCreeper.join("_")}_creeper_head`; //auto head element name
			bodyName = `${elementOfCreeper.join("_")}_creeper_body`; //auto body element name
			placerName = `${elementOfCreeper.join("_")}_creeper`; //auto placer element name
			descElement = elementOfCreeper.join(", "); //auto explosion element list
			
			//array case color concatenator and excludeRandom handler
			startColor = [];
			//console.log(elementOfCreeper);
			for(ll = 0; ll < elementOfCreeper.length; ll++) {
				if(typeof(elements[elementOfCreeper[ll]].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
					if(elements[elementOfCreeper[ll]].excludeRandom) { //it it's true
						randomExcl = 1; //the whole array creeper is excluded
						//console.log("array nyet" + elementOfCreeper);
					};
				};
				//console.log(elementOfCreeper[ll]);
				startColor = startColor.concat(elements[elementOfCreeper[ll]].color);
			};
		} else { //they should all be strings, so here
			headName = `${elementOfCreeper}_creeper_head`; //auto head element name
			bodyName = `${elementOfCreeper}_creeper_body`; //auto body element name
			placerName = `${elementOfCreeper}_creeper`; //auto placer element name
			descElement = elementOfCreeper; //auto explosion element
			startColor = elements[elementOfCreeper].color;
			if(typeof(elements[elementOfCreeper].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
				if(elements[elementOfCreeper].excludeRandom) { //it it's true
					//console.log("nyet " + elementOfCreeper);
					randomExcl = 1; //the creeper is excluded
				} else {
					//console.log("allow " + elementOfCreeper);
					randomExcl = 0;
				};
			};
		};
			//Color gen
		if(Array.isArray(startColor)) { //Average arrays, make colors rgb()
			startColor = averageRgbPrefixedColorArray(startColor);
		} else {
			startColor = _rgbHexCatcher(startColor);
		};
		var preColor = rgbStringToHSL(startColor);
		var colorsArray = [preColor, preColor, preColor, preColor, preColor, preColor, preColor, preColor, preColor, preColor]
		for(q = 0; q < hslOffsets.length; q++) {
			colorsArray[q] = addArraysInPairs(colorsArray[q],hslOffsets[q]);
			colorsArray[q] = hslToHex((colorsArray[q][0] % 360),slBound(colorsArray[q][1]),slBound(colorsArray[q][2]));
			
		};
		
			//End color gen
		
		//console.log(`${headName}; ${bodyName}; ${placerName}; ${descElement}`)

										//Placer
        elements[placerName] = {
			creeperType: elementOfCreeper,
            color: colorsArray,
            category: "auto creepers",
			properties: {
				dead: false,
				dir: 1,
				panic: 0,
				following: false,
			},
			tick: function(pixel) {
				autoCreeperPlacerTick(pixel);
			},
			related: [bodyName,headName,"creeper"],
			desc: `Auto-generated creeper.<br/>Explodes into ${descElement}.`,
        };
										//Body
		elements[bodyName] = {
			creeperType: elementOfCreeper,
			color: colorsArray,
            category: "auto creepers",
			hidden: true,
			excludeRandom: true,
			density: 1500,
			state: "solid",
			conduct: 25,
			tempHigh: 250,
			stateHigh: "cooked_meat",
			tempLow: -30,
			stateLow: "frozen_meat",
			burn: 10,
			burnTime: 250,
			burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","gunpowder"],
			breakInto: ["blood","gunpowder"],
			reactions: {
				"cancer": { "elem1":"cancer", "chance":0.005 },
				"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
				"plague": { "elem1":"plague", "chance":0.05 },
			},
			properties: {
				dead: false,
				dir: 1,
				panic: 0,
				charged: false,
				didChargeBlueTinted: false,
			},
			tick: function(pixel) {
				autoCreeperBodyTick(pixel);
			},
		};

										//Head
		elements[headName] = {
			creeperType: elementOfCreeper,
            color: colorsArray,
            category: "auto creepers",
			hidden: true,
			excludeRandom: true,
			density: 1080,
			state: "solid",
			conduct: 25,
			tempHigh: 250,
			stateHigh: "cooked_meat",
			tempLow: -30,
			stateLow: "frozen_meat",
			burn: 10,
			burnTime: 250,
			burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","gunpowder"],
			breakInto: "blood",
			reactions: {
				"cancer": { "elem1":"cancer", "chance":0.005 },
				"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
				"plague": { "elem1":"plague", "chance":0.05 },
				"oxygen": { "elem2":"carbon_dioxide", "chance":0.5 },
			},
			properties: {
				dead: false,
				following: false,
				hissing: false,
				charged: false,
				didChargeBlueTinted: false,
			},
			tick: function(pixel) {
				autoCreeperHeadTick(pixel);
			},
		};
		if(creeperIncludeRandom) {
			randomExcl ? elements[placerName].excludeRandom = true : elements[placerName].excludeRandom = false;
		} else {
			elements[placerName].excludeRandom = true;
		};
		if(!randomExcl) {
			//console.log("spawn enabling " + placerName);
			spawnCreepers.push(placerName);
		} else {
			//console.log("nyetted " + placerName);
		};
	};
});

//Standalone generator function

function generateCreeper(creeperElements,isAfterScriptLoading=false) {//it can be a single element, though
	//To specify an array creeper, have the array be inside another array.
	/*For reasons related to how element colors are loaded, if this function is being run from a JS mod file, isAfterScriptLoading should be false.
	Otherwise, you'll get TypeErrors for some reason when trying to place your creeper.  If this is being run after the game has loaded (e.g. in the console),
	then isAfterScriptLoading should be true or you might also get TypeErrors (this latter case was a bit inconsistent when I tested it, but 
	the former case wasn't. **isAfterScriptLoading must be false when this function is run from a JS mod file**.*/
	if(typeof(creeperElements) === "string") { //it should be an array, so string check
		//console.log("String detected");
		if(creeperElements.includes(",")) { //comma-separated string?
			//console.log("Splitting string to array");
			creeperElements = creeperElements.split(","); //,SS to array
		} else {
			//console.log("Wrapping string in array");
			creeperElements = [creeperElements]; //single string to array 
		};
	};
	for(aaf = 0; aaf < creeperElements.length; aaf++) {
		var elementOfCreeper = creeperElements[aaf];
		var startColor;
		var randomExcl = 0;
		//console.log("randomExcl set")
		//console.log(elementOfCreeper);

		var headName,bodyName,placerName,descElement;

		if(typeof(elementOfCreeper === "string")) { //comma separated string check
			if(elementOfCreeper.includes(",")) { //if it is
				elementOfCreeper = elementOfCreeper.split(","); //to array
				elementOfCreeper = elementOfCreeper.filter(function(e) { //strip nonexistent elements
					return typeof(elements[e]) === "object";
				});
			};
		};
		if(Array.isArray(elementOfCreeper)) {
			headName = `${elementOfCreeper.join("_")}_creeper_head`; //auto head element name
			bodyName = `${elementOfCreeper.join("_")}_creeper_body`; //auto body element name
			placerName = `${elementOfCreeper.join("_")}_creeper`; //auto placer element name
			descElement = elementOfCreeper.join(", "); //auto explosion element list
			
			//array case color concatenator and excludeRandom handler
			startColor = [];
			//console.log(elementOfCreeper);
			for(ll = 0; ll < elementOfCreeper.length; ll++) {
				if(typeof(elements[elementOfCreeper[ll]].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
					if(elements[elementOfCreeper[ll]].excludeRandom) { //it it's true
						randomExcl = 1; //the whole array creeper is excluded
						//console.log("array nyet" + elementOfCreeper);
					};
				};
				//console.log(elementOfCreeper[ll]);
				startColor = startColor.concat(elements[elementOfCreeper[ll]].color);
			};
		} else { //they should all be strings, so here
			headName = `${elementOfCreeper}_creeper_head`; //auto head element name
			bodyName = `${elementOfCreeper}_creeper_body`; //auto body element name
			placerName = `${elementOfCreeper}_creeper`; //auto placer element name
			descElement = elementOfCreeper; //auto explosion element
			startColor = elements[elementOfCreeper].color;
			if(typeof(elements[elementOfCreeper].excludeRandom !== "undefined")) { //if excludeRandom exists (prevent TypeError)
				if(elements[elementOfCreeper].excludeRandom) { //it it's true
					//console.log("nyet " + elementOfCreeper);
					randomExcl = 1; //the creeper is excluded
				} else {
					//console.log("allow " + elementOfCreeper);
					randomExcl = 0;
				};
			};
		};
			//Color gen
		if(Array.isArray(startColor)) { //Average arrays, make colors rgb()
			startColor = averageRgbPrefixedColorArray(startColor);
		} else {
			startColor = _rgbHexCatcher(startColor);
		};
		var preColor = rgbStringToHSL(startColor);
		var colorsArray = [preColor, preColor, preColor, preColor, preColor, preColor, preColor, preColor, preColor, preColor]
		var colorObjectArray = [];
		for(q = 0; q < hslOffsets.length; q++) {
			colorsArray[q] = addArraysInPairs(colorsArray[q],hslOffsets[q]);
			colorsArray[q] = hslToHex((colorsArray[q][0] % 360),slBound(colorsArray[q][1]),slBound(colorsArray[q][2]));
			colorObjectArray[q] = hexToRGB(colorsArray[q]); //outputs hex
			if(isAfterScriptLoading) { // if it's after the hex -> RGB conversion
				var coq = colorObjectArray[q]; //pull the object
				colorsArray[q] = `rgb(${coq.r},${coq.g},${coq.b})`; //and change to the RGB from its values
			};
		};
		
			//End color gen
		
		//console.log(`${headName}; ${bodyName}; ${placerName}; ${descElement}`)

										//Placer
        elements[placerName] = {
			creeperType: elementOfCreeper,
            color: colorsArray,
            colorObject: colorObjectArray,
            category: "auto creepers",
			properties: {
				dead: false,
				dir: 1,
				panic: 0,
				following: false,
			},
			tick: function(pixel) {
				autoCreeperPlacerTick(pixel);
			},
			related: [bodyName,headName,"creeper"],
			desc: `Auto-generated creeper.<br/>Explodes into ${descElement}.`,
        };
										//Body
		elements[bodyName] = {
			creeperType: elementOfCreeper,
			color: colorsArray,
            colorObject: colorObjectArray,
            category: "auto creepers",
			hidden: true,
			excludeRandom: true,
			density: 1500,
			state: "solid",
			conduct: 25,
			tempHigh: 250,
			stateHigh: "cooked_meat",
			tempLow: -30,
			stateLow: "frozen_meat",
			burn: 10,
			burnTime: 250,
			burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","gunpowder"],
			breakInto: ["blood","gunpowder"],
			reactions: {
				"cancer": { "elem1":"cancer", "chance":0.005 },
				"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
				"plague": { "elem1":"plague", "chance":0.05 },
			},
			properties: {
				dead: false,
				dir: 1,
				panic: 0,
				charged: false,
				didChargeBlueTinted: false,
			},
			tick: function(pixel) {
				autoCreeperBodyTick(pixel);
			},
		};

										//Head
		elements[headName] = {
			creeperType: elementOfCreeper,
            color: colorsArray,
            colorObject: colorObjectArray,
            category: "auto creepers",
			hidden: true,
			excludeRandom: true,
			density: 1080,
			state: "solid",
			conduct: 25,
			tempHigh: 250,
			stateHigh: "cooked_meat",
			tempLow: -30,
			stateLow: "frozen_meat",
			burn: 10,
			burnTime: 250,
			burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","gunpowder"],
			breakInto: "blood",
			reactions: {
				"cancer": { "elem1":"cancer", "chance":0.005 },
				"radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
				"plague": { "elem1":"plague", "chance":0.05 },
				"oxygen": { "elem2":"carbon_dioxide", "chance":0.5 },
			},
			properties: {
				dead: false,
				following: false,
				hissing: false,
				charged: false,
				didChargeBlueTinted: false,
			},
			tick: function(pixel) {
				autoCreeperHeadTick(pixel);
			},
		};
		if(creeperIncludeRandom) {
			randomExcl ? elements[placerName].excludeRandom = true : elements[placerName].excludeRandom = false;
		} else {
			elements[placerName].excludeRandom = true;
		};
		if(!randomExcl) {
			//console.log("spawn enabling " + placerName);
			spawnCreepers.push(placerName);
		} else {
			//console.log("nyetted " + placerName);
		};
	};
};
