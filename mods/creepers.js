//Prerequisite Functions and Variables

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

function upVelocity(pixel,x,y,radius,fire,smoke,power) { //Angelic Creeper's effect, "compatible" with velocity.js by including the modified version of its code in itself
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
		};5
		//console.log(`Velocities set`);
	};
	//console.log(`end`);
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

enemyHumanoidArray = ["head","body"] //just in case

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
	desc: 'So we back in the mine...'
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
						red = rgbColorBound(red + (ticksHissing * 3));
						green = rgbColorBound(green + (ticksHissing * 3));
						blue = rgbColorBound(blue + (ticksHissing * 3));
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
						red = rgbColorBound(red + (ticksHissing * 3));
						green = rgbColorBound(green + (ticksHissing * 3));
						blue = rgbColorBound(blue + (ticksHissing * 3));
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
			if(!pixel.burnStart) { //I don't like errors.
				pixel.burnStart = pixel.ticks;
			};
			if(pixelTicks - pixel.burnStart > 30) {
				//console.log("GOTTA YEET YEET YEET!");
				explodeAtPlus(pixel.x,pixel.y,explosionRadius,"fire","smoke",null,upVelocity);	//Special effect: Flings you upwards (extended to all movable tiles because it's easier).
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
						red = rgbColorBound(red + (ticksHissing * 3));
						green = rgbColorBound(green + (ticksHissing * 3));
						blue = rgbColorBound(blue + (ticksHissing * 3));
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
						red = rgbColorBound(red + (ticksHissing * 3));
						green = rgbColorBound(green + (ticksHissing * 3));
						blue = rgbColorBound(blue + (ticksHissing * 3));
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
					explodeAtPlus(body.x,body.y,explosionRadius,"fire","smoke",null,upVelocity);
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
