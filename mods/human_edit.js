var modName = "mods/human_edit.js";
var onTryMoveIntoMod = "mods/onTryMoveInto.js";
if(typeof(breakPixel) == "undefined") {
	function breakPixel(pixel,changetemp=false,defaultBreakIntoDust=false) {
		var info = elements[pixel.element];
		if(typeof(info.breakInto) === "undefined") {
			if(defaultBreakIntoDust) {
				if(Math.random() < defaultBreakIntoDust) { changePixel(pixel,"dust",changetemp) };
			};
			return defaultBreakIntoDust;
		};
		var breakIntoElement = info.breakInto;
		if(Array.isArray(breakIntoElement)) {
			breakIntoElement = breakIntoElement[Math.floor(Math.random() * breakIntoElement.length)]
		};
		changePixel(pixel,breakIntoElement,changetemp)
		return true
	}
};

function hasPixel(x,y,elementInput) {
	if(isEmpty(x,y,true)) { //if empty, it can't have a pixel
		return false;
	} else {
		if(elementInput.includes(",")) { //CSTA
			elementInput = elementInput.split(",");
		};
		if(Array.isArray(elementInput)) { //if element list
			return elementInput.includes(pixelMap[x][y].element);
		} else { //if single element
			return pixelMap[x][y].element === elementInput;
		};
	};		
};

if(enabledMods.includes(onTryMoveIntoMod)) {
	elements.brain = {
		color: ["#fce3e3","#deb6c5","#f5ced5","#e87b8f"],
		behavior: [
			"XX|XX|XX",
			"XX|CH:rotten_meat%1|XX",
			"M2|M1|M2",
		],
		reactions: {
			"dirty_water": { "elem1":"rotten_meat", "chance":0.1 },
			"fly": { "elem1":"rotten_meat", "chance":0.2 },
			"dioxin": { "elem1":"rotten_meat", "elem2":null, "chance":0.1 },
			"uranium": { "elem1":"rotten_meat", "chance":0.1 },
			"cancer": { "elem1":"rotten_meat", "chance":0.1 },
			"plague": { "elem1":"rotten_meat", "elem2":null, "chance":0.3 },
			"ant": { "elem1":"rotten_meat", "chance":0.1 },
			"worm": { "elem1":"rotten_meat", "chance":0.1 },
			"rat": { "elem1":"rotten_meat", "chance":0.3 },
			"mushroom_spore": { "elem1":"rotten_meat", "chance":0.1 },
			"mushroom_stalk": { "elem1":"rotten_meat", "chance":0.1 },
			"mercury": { "elem1":"rotten_meat", "elem2":null, "chance":0.2 },
			"mercury_gas": { "elem1":"rotten_meat", "elem2":null, "chance":0.1 },
			"virus": { "elem1":"rotten_meat", "chance":0.1 },
			"poison": { "elem1":"rotten_meat", "elem2":null, "chance":0.5 },
			"infection": { "elem1":"rotten_meat", "elem2":null, "chance":0.1 },
			"ink": { "elem1":"rotten_meat", "elem2":null, "chance":0.1 },
			"acid": { "elem1":"rotten_meat", "elem2":null, "chance":0.5 },
			"acid_gas": { "elem1":"rotten_meat", "chance":0.4 },
			"cyanide": { "elem1":"rotten_meat", "elem2":null, "chance":0.5 },
		},
		tempHigh: 100,
		stateHigh: "cooked_meat",
		tempLow: -18,
		stateLow: "frozen_meat",
		category:"life",
		hidden: true,
		breakInto: ["meat", "blood"],
		burn:10,
		burnTime:200,
		burnInto:["cooked_meat","steam","steam","salt"],
		state: "solid",
		density: 1081,
		conduct: 1,
	};

	elements.cerebrospinal_fluid = {
		color: "#ced7db",
		behavior: behaviors.LIQUID,
		state: "liquid",
		tempHigh: 100,
		stateHigh: "steam",
		breakInto: "steam",
		reactions: JSON.parse(JSON.stringify(elements.water.reactions)),
	};

	function validatePanic(pixel) {
		//console.log(`validatePanic: validatePanic called on pixel ${pixel.element} at (${pixel.x},${pixel.y}) with panic level ${pixel.panic || 0}`);
		if(pixel.element.endsWith("body")) {
			//console.log("validatePanic called on body pixel (panic is stored in the head)");
		};
		if(Number.isNaN(pixel.panic)) {
			//console.log("NaN case: panic set to 0");
			pixel.panic = 0;
		};
		//console.log(`Bounding code running from value of ${pixel.panic}`);
		pixel.panic = Math.max(0,Math.min(1,pixel.panic));
		//console.log(`Validation result: Panic set to ${pixel.panic}`);

		if(Number.isNaN(pixel.mood)) {
			//console.log("NaN case: panic set to 0");
			pixel.mood = 0;
		};
		//console.log(`Bounding code running from value of ${pixel.panic}`);
		pixel.mood = Math.max(-3,Math.min(3,pixel.mood));
		//console.log(`Validation result: Panic set to ${pixel.panic}`);
	};

	goodPixels = {
		silver: { panicChange: 0.01, panicChangeChance: 0.1, moodChange: 0.004 },
		gold: { panicChange: 0.02, panicChangeChance: 0.15, moodChange: 0.01 },
		diamond: { panicChange: 0.03, panicChangeChance: 0.2, moodChange: 0.02 },
	}; //effectively, the difference is that good pixels don't make the human flip direction (run away);
	badPixels = {
		rotten_meat: { panicChange: 0.02, panicChangeChance: 0.15, moodChange: -0.015 },
		blood: { panicChange: 0.06, panicChangeChance: 0.2, moodChange: -0.006 },
		brain: { panicChange: 0.1, panicChangeChance: 0.3, moodChange: -0.005 },
		fire: { panicChange: 0.1, panicChangeChance: 0.1, moodChange: 0 },
		poison: { panicChange: 0.2, panicChangeChance: 0.05, moodChange: -0.01 },
		grenade: { panicChange: 0.2, panicChangeChance: 0.4, moodChange: -0.3 },
		bomb: { panicChange: 0.2, panicChangeChance: 0.4, moodChange: -0.3 },
		tnt: { panicChange: 0.2, panicChangeChance: 0.4, moodChange: 0 },
		dynamite: { panicChange: 0.2, panicChangeChance: 0.4, moodChange: -0.3 },
		anti_bomb: { panicChange: 0.2, panicChangeChance: 0.4, moodChange: -0.3 },
		cluster_bomb: { panicChange: 0.2, panicChangeChance: 0.4, moodChange: -0.4 },
		landmine: { panicChange: 0.25, panicChangeChance: 0.1, moodChange: -0.3 },
		fireball: { panicChange: 0.25, panicChangeChance: 0.45, moodChange: -0.35 },
		magma: { panicChange: 0.3, panicChangeChance: 0.2, moodChange: 0 },
		plasma: { panicChange: 0.3, panicChangeChance: 0.2, moodChange: 0 },
		nuke: { panicChange: 1, panicChangeChance: 1, moodChange: -1 }, //insta-panic
		cluster_nuke: { panicChange: 1, panicChangeChance: 1, moodChange: -1 }, //insta-panic
	}; //testing
	otherPixels = ["head","body"]; //do custom code here

	var initialTransparencyArray = ["glass","water","salt_water","sugar_water","steam","oxygen","nitrogen","neon","methane","propane","anesthesia","ammonia","carbon_dioxide","helium","hydrogen","ozone","radiation","pool_water"];
	for(transparentElementIndex = 0; transparentElementIndex < initialTransparencyArray.length; transparentElementIndex++) {
		var transparentElement = initialTransparencyArray[i];
		if(typeof(elements[transparentElement]) !== "undefined") {
			elements[transparentElement].transparent = true;
		};
	};

	elements.body.properties = {
		dead: false,
		dir: 1,
		extremePanicStart: null,
	};
	elements.body.tick = function(pixel) {
		if(typeof(pixel.extremePanicStart) == "undefined") {
			//console.log("oops");
			pixel.extremePanicStart = null
		};
		if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
			if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
				var headpixel = pixelMap[pixel.x][pixel.y-2];
				if (headpixel.element == "head") {
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
				changePixel(pixel,"rotten_meat");
			}
			return
		}

		// Find the head
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
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
		if (head == null) { return };
		
		if (Math.random() < (0.1 + head.panic)) { // Move 10% chance, varying depending on panic value
			var movesToTry = [
				[1*pixel.dir,0],
				[1*pixel.dir,-1],
			];
			// While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
			while (movesToTry.length > 0) {
				var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
				/*
				console.log(move);
				console.log("Body X:", pixel.x, "to", pixel.x+move[0]);
				console.log("Body Y:", pixel.y, "to", pixel.y+move[1]);
				console.log("Head X:",head.x, "to", head.x+move[0]);
				console.log("Head Y:", head.y, "to", head.y+move[1]);
				*/
				//If head coords are empty
				if (isEmpty(pixel.x+move[0], pixel.y+move[1]) && isEmpty(head.x+move[0], head.y+move[1])) {
					//console.log("Head target coords are empty");
					if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
						movePixel(head, head.x+move[0], head.y+move[1]);
						//console.log(`Moved body to (${pixel.x},${pixel.y}) and head to (${head.x},${head.y})`);
						//console.log(`Head-body offset (should always be [0,-1]): [${head.x-pixel.x},${head.y-pixel.y}]`)
						break;
					}
				}
			}
			// 15% chance to change direction
			if(!head.dirLocked) {
				if (Math.random() < 0.15) {
					pixel.dir *= -1;
					//console.log("*turns around cutely to face ${pixel.dir < 0 ? 'left' : 'right'}*");
				};
			};
		};	

		//if not flagged for extreme panic
		//extreme panic will not be flagged in good moods, just to be nice
		if(pixel.extremePanicStart == null && head.panic > 0.8 && head.mood <= 0) {
			//flag extreme panic
			pixel.extremePanicStart = pixelTicks;
		}
		//if flagged for extreme panic and panic is still extreme
		else if(pixel.extremePanicStart != null && (head.panic > 0.8 && head.mood <= 0)) {
			//if extreme panic lasts too long
			if(pixelTicks - pixel.extremePanicStart > 350) {
				//random chance to die from exhaustion/a heart attack/whatever
				if(Math.random() < 0.01) {
					pixel.dead = true;
				};
			};
		}
		//if flagged for extreme panic and extreme panic is no longer extreme
		else if(pixel.extremePanicStart != null && (head.panic <= 0.8 || head.mood > 0)) {
			//unflag
			pixel.extremePanicStart = null;
		};
		
	};

	elements.body.onTryMoveInto = function(pixel,otherPixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		if(!pixel.dead && hasPixel(pX,pY-1,"head")) { //if this body pixel is alive and has a head
			var head = pixelMap[pX][pY-1];
			var otherElement = otherPixel.element;
			var oX = otherPixel.x;
			var oY = otherPixel.y;
			if(oY !== (pY - 1)) { //exclude the head above this body
				if(otherElement === "head") { //if the pixel hitting this body is a head
					if(hasPixel(oX,oY+1,"body")) { //if the pixel hitting this pixel has a body under it
						var otherBody = pixelMap[oX][oY+1];
						if(otherPixel.dead || otherBody.dead) { //if either part of that human is dead
							head.panic += 0.08; //being hit by a dead ******* body is terrifying
						} else {
							if(otherPixel.panic > 0.04 && otherPixel.mood <= 0) { head.panic += 0.04 }; //living, normal, bodied heads scare only if that incoming human is already scared
						};
					} else { //if it's a severed head
						if(otherPixel.dead) { //if the head is dead
							head.panic += 0.08; //being hit by a /severed ******* head/ is terrifying
						} else {
							head.panic += 0.1; //being hit by a //******* severed head that's still alive// is even worse
						};					
					};
				} else if(otherElement === "body") { //if the pixel hitting this body is a body
					if(hasPixel(oX,oY-1,"head")) { //if the pixel hitting this pixel has a head on it
						var otherHead = pixelMap[oX][oY-1];
						if(otherPixel.dead || otherHead.dead) { //if either part of that human is dead
							head.panic += 0.06; //dead whole body case
						} else {
							if(otherHead.panic > 0.04) { head.panic += 0.04 }; //living, normal, bodied heads scare only if that incoming human is already scared
						};
					} else { //severed body case
						if(otherPixel.dead) { //if the body is dead
							head.panic += 0.08; //imagine being hit by a severed human without the head
						} else {
							head.panic += 0.1; //imagine the above but the heart is still beating
						};
					};
				};
			};
		};
	};

	elements.head.properties = {
		dead: false,
		dirLocked: false,
		panic: 0,
	};

	elements.head.tick = function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200) {
				changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

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
		
		pixel.mood ??= 0;

		if((pixelTicks-pixel.start) % 5 === 0) {
			//Vision loop
			var pX = pixel.x;
			var pY = pixel.y;
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
							//console.log(`Skipping pixel (${nX},${nY}) (empty)`)
							continue;
						};
						if(!isEmpty(nX,nY,true)) {
							var newPixel = pixelMap[nX][nY];
							var newElement = newPixel.element;
							if(Object.keys(goodPixels).includes(newElement)) {
								//no dir flip
								if(Math.random() > goodPixels[newElement].panicChangeChance) {
									pixel.panic += goodPixels[newElement].panicChange;
									pixel.mood += goodPixels[newElement].moodChange; //like if there was a pretty painting item, it would make you feel better but you wouldn't necessarily feel the need to run towards it
								};
								pixel.dirLocked = true;
							} else if(Object.keys(badPixels).includes(newElement)) {
								body.dir = 1; //flip dir
								if(Math.random() > badPixels[newElement].panicChangeChance) {
									pixel.panic += badPixels[newElement].panicChange;
									pixel.mood += badPixels[newElement].moodChange;
								};
								pixel.dirLocked = true;
							}; //good and bad should be mutually exclusive; good will be evaulated first because one inevitably has to be considered first
							if(otherPixels.includes(newElement)) {
								//specific custom code
								if(newElement === "head") {
									if(hasPixel(nX,nY+1,"body")) {
										var newBody = pixelMap[nX][nY+1];
										if(newPixel.dead || newBody.dead) {
											pixel.panic += 0.02;	//if it's seeing a whole human, it's likely to see the dead head and the dead body, thus double-executing
																	//it would be nice if there was a way to avoid double/multiple detection of the same human
											if(hasPixel(pX,pY+1,"body")) { //mix error-proofing
												var body = pixelMap[pX][pY+1];
												body.dir = 1; //run away
											};
										} else {
											if(newPixel.panic > 0.04) {
												if(newPixel.panic > 0.8) {
													pixel.panic += 0.015; //it will add up
												} else if(newPixel.panic > 0.6) {
													pixel.panic += 0.012;
												} else if(newPixel.panic > 0.4) {
													pixel.panic += 0.009;
												} else if(newPixel.panic > 0.2) {
													pixel.panic += 0.006;
												} else {
													pixel.panic += 0.003;
												};
												
												//the vision loop is in the head, and this is in the "seeing head" case, then this will happen when the head sees another head, and heads store panic; this is in the "other head" is panicking case so this will ultimately be the code that runs when its human sees another human panicking
												if(Math.random() < 0.5) {
													//run in same direction as panicking person
													pixel.dir = newPixel.dir
												};
											};
										};
									} else { //severed head
										newPixel.dead ? pixel.panic += 0.03 : pixel.panic += 0.04;
										if(hasPixel(pX,pY+1,"body")) {
											var body = pixelMap[pX][pY+1];
											body.dir = 1; //run away
										};
									};
								} else if(newElement === "body") {
									if(hasPixel(nX,nY-1,"head")) {
										var newHead = pixelMap[nX][nY-1];
										if(newPixel.dead || newHead.dead) {
											pixel.panic += 0.02;
											if(hasPixel(pX,pY+1,"body")) {
												var body = pixelMap[pX][pY+1];
												body.dir = 1; //run away
											};
										} else {
											if(newHead.panic > 0.04) {
												if(newHead.panic > 0.8) {
													pixel.panic += 0.014; //it will add up
												} else if(newHead.panic > 0.6) {
													pixel.panic += 0.011;
												} else if(newHead.panic > 0.4) {
													pixel.panic += 0.008;
												} else if(newHead.panic > 0.2) {
													pixel.panic += 0.005;
												} else {
													pixel.panic += 0.002;
												};
											};
										};
									} else { //severed body
										newPixel.dead ? pixel.panic += 0.025 : pixel.panic += 0.035;
										if(hasPixel(pX,pY+1,"body")) { //mix error-proofing
											var body = pixelMap[pX][pY+1];
											body.dir = 1; //run away
										};
									};
								};
							};
							//code outside of those three if blocks will be applied to pixels of all elements
							if(!elements[newElement].transparent) {
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
							//console.log(`Skipping pixel (${nX},${nY}) (empty)`)
							continue;
						};
						if(!isEmpty(nX,nY,true)) {
							var newPixel = pixelMap[nX][nY];
							var newElement = newPixel.element;
							if(Object.keys(goodPixels).includes(newElement)) {
								//no dir flip
								if(Math.random() > goodPixels[newElement].panicChangeChance) {
									pixel.panic += goodPixels[newElement].panicChange;
									pixel.mood += goodPixels[newElement].moodChange;
								};
								pixel.dirLocked = true;
							} else if(Object.keys(badPixels).includes(newElement)) {
								if(hasPixel(pX,pY+1,"body")) {
									var body = pixelMap[pX][pY+1];
									body.dir = -1; //run away
								};
								if(Math.random() > badPixels[newElement].panicChangeChance) {
									pixel.panic += badPixels[newElement].panicChange;
									pixel.mood += badPixels[newElement].moodChange;
								};
								pixel.dirLocked = true;
							}; //good and bad should be mutually exclusive; good will be evaulated first because one inevitably has to be considered first
							if(otherPixels.includes(newElement)) {
								if(newElement === "head") {
									if(hasPixel(nX,nY+1,"body")) {
										var newBody = pixelMap[nX][nY+1];
										if(newPixel.dead || newBody.dead) {
											pixel.panic += 0.02;	//if it's seeing a whole human, it's likely to see the dead head and the dead body, thus double-executing
																	//it would be nice if there was a way to avoid double/multiple detection of the same human
											if(hasPixel(pX,pY+1,"body")) {
												var body = pixelMap[pX][pY+1];
												body.dir = -1; //run away
											};
										} else {
											if(newPixel.panic > 0.04) {
												if(newPixel.panic > 0.8) {
													pixel.panic += 0.015; //it will add up
												} else if(newPixel.panic > 0.6) {
													pixel.panic += 0.012;
												} else if(newPixel.panic > 0.4) {
													pixel.panic += 0.009;
												} else if(newPixel.panic > 0.2) {
													pixel.panic += 0.006;
												} else {
													pixel.panic += 0.003;
												};
											};
										};
									} else { //severed head
										newPixel.dead ? pixel.panic += 0.03 : pixel.panic += 0.04;
										if(hasPixel(pX,pY+1,"body")) {
											var body = pixelMap[pX][pY+1];
											body.dir = -1; //run away
										};
									};
								} else if(newElement === "body") {
									if(hasPixel(nX,nY-1,"head")) {
										var newHead = pixelMap[nX][nY-1];
										if(newPixel.dead || newHead.dead) {
											pixel.panic += 0.02;
											if(hasPixel(pX,pY+1,"body")) {
												var body = pixelMap[pX][pY+1];
												body.dir = -1; //run away
											};
										} else {
											if(newHead.panic > 0.04) {
												if(newHead.panic > 0.8) {
													pixel.panic += 0.014; //it will add up
												} else if(newHead.panic > 0.6) {
													pixel.panic += 0.011;
												} else if(newHead.panic > 0.4) {
													pixel.panic += 0.008;
												} else if(newHead.panic > 0.2) {
													pixel.panic += 0.005;
												} else {
													pixel.panic += 0.002;
												};
											};
										};
									} else { //severed body
										newPixel.dead ? pixel.panic += 0.025 : pixel.panic += 0.035;
										if(hasPixel(pX,pY+1,"body")) {
											var body = pixelMap[pX][pY+1];
											body.dir = -1; //run away
										};
									};
								};
							};
							//code outside of those three if blocks will be applied to pixels of all elements
							if(!elements[newElement].transparent) {
								break; //can't see through humans
							};
						};
					};
				};
			};
		};

		validatePanic(pixel);

		if(Math.random() < 0.01) { //1% chance each tick to lose interest
			pixel.dirLocked = false;
			//console.log("Meh.");
		};

		if(Math.random() < ((pixel.panic) > 0.8 ? 0.04 : 0.02)) { //2% chance each tick to decrease panic (4% if the panic is extreme)
			//console.log("Decreasing panic");
			pixel.panic < 0.05 ? pixel.panic = 0 : pixel.panic -= 0.05;
		};

	};
	elements.head.breakInto = ["bone","brain","brain","cerebrospinal_fluid","blood","blood","meat"];

	elements.head.onTryMoveInto = function(pixel,otherPixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		if(!pixel.dead) {
			var otherElement = otherPixel.element;
			var oX = otherPixel.x;
			var oY = otherPixel.y;
			if(oY !== (pY + 1)) { //exclude the body under this head
				if(otherElement === "head") { //if the pixel hitting this head is also a head
					//console.log("head.onTryMoveInto: Head has tried to move into head");
					if(hasPixel(oX,oY+1,"body")) { //if the pixel hitting this pixel has a body under it
						var otherBody = pixelMap[oX][oY+1];
						if(otherPixel.dead || otherBody.dead) { //if either part of that human is dead
							pixel.panic += 0.08; //being hit by a dead ******* body is terrifying
							//console.log("head.onTryMoveInto: panic increase, case: head hit by dead whole body (head's code branch)");
						} else {
							//if(otherPixel.panic > 0.04) { pixel.panic += 0.04; console.log("head.onTryMoveInto: panic increase, case: head hit by panicked whole body (head's code branch)"); }; //living, normal, headed bodies scare only if that incoming human is already scared
						};
					} else { //if it's a severed head
						if(otherPixel.dead) { //if the head is dead
							pixel.panic += 0.08; //being hit by a /severed ******* head/ is terrifying
							//console.log("head.onTryMoveInto: panic increase, case: head hit by dead severed head");
						} else {
							pixel.panic += 0.1; //being hit by a //******* severed head that's still alive// is even worse
							//console.log("head.onTryMoveInto: panic increase, case: head hit by living severed head");
						};					
					};
				} else if(otherElement === "body") { //if the pixel hitting this head is a body
					if(hasPixel(oX,oY-1,"head")) { //if the body hitting this pixel has a head on it
						var otherHead = pixelMap[oX][oY-1];
						if(otherPixel.dead || otherHead.dead) { //if either part of that human is dead
							pixel.panic += 0.03; //dead whole body case
							//console.log("head.onTryMoveInto: panic increase, case: head hit by dead whole body (body's code branch)");
						} else {
							if(otherHead.panic > 0.04) {
								pixel.panic += 0.03;
								//console.log("head.onTryMoveInto: panic increase, case: head crushed by panicked whole body (body's code branch)");
							} else {
								pixel.panic += 0.02;
								//console.log("head.onTryMoveInto: panic increase, case: head crushed by whole body (body's code branch)");
							};
						};
					} else { //severed body case
						if(otherPixel.dead) { //if the body is dead
							pixel.panic += 0.04; //imagine being hit by a severed human without the head
							//console.log("head.onTryMoveInto: panic increase, case: head hit by dead severed body");
						} else {
							pixel.panic += 0.05; //imagine the above but the heart is still beating
							//console.log("head.onTryMoveInto: panic increase, case: head hit by living severed body");
						};
					};
				} else {
					if(oX === pX && oY === pY-1) {
						var otherInfo = elements[otherElement];
						var otherState; typeof(otherInfo.state) === "undefined" ? otherState = null : otherState = otherInfo.state;
						var otherDensity = typeof(otherInfo.density) === "undefined" ? otherDensity = null : otherDensity = otherInfo.density;
						if(otherState === "solid") {
							if(otherDensity > 5000) {
								var chance = (0.1 + (otherDensity/50000)) / 5;
								if(Math.random() < chance) {
									breakPixel(pixel);
								};
							} else if(otherDensity >= 500) {
								pixel.panic += (0.01 * (otherDensity / 500));
							} else if(otherDensity >= 100) {
								pixel.panic += (0.001 * (otherDensity / 100));
							};
						};
					};
				};
			};
		};
	};

	//Worldgen preset for testing

	worldgentypes.basalt_dirt = {
		layers: [
			[0, "basalt", 0.05],
			[0, "dirt"]
		]
	};

	kep1er = [
		["first_impact",	["#664482","#cf4ba3","#c15ca9","#f0a669"]],
		["doublast",		["#2b98fd","#d0e26d","#e6f049","#dce4b3"]],
		["fly-up",			["#f2f2f2","#15a667","#de0180"]],
		["troubleshooter",	["#291923","#ed3fb6","#fee6f8","#64c5e0","#d6cdca","#330d25"]],
		["fly-by",			["#e7e6dd","#fcf0ef","#efa1ba","#8d7cb6","#5e74ba","#2b5db5","#e292b7"]],
		["lovestruck",		["#bfd9f0","#bfd9f0","#fef792","#c36475","#edd1d6"]],
	];
	
	for(index in kep1er) {
		index = parseInt(index);
		var newName = kep1er[index][0];
		var newColor = kep1er[index][1];
		var newDisplayName = newName.replaceAll("_"," ").replaceAll("-"," - ").split(" ").map(x => x.substring(0,1).toUpperCase() + x.substring(1)).join(" ").replace(" - ","-");
		elements[newName] = {
			name: newDisplayName,
			color: newColor,
			tempHigh: 200,
			stateHigh: ["ash","molten_plastic"],
			density: 332, //based off of First Impact: https://www.amazon.com/Kep1er-IMPACT-Contents-Tracking-Connect/dp/B09MQMNZ62
			tick: function(pixel) {
				if(!(tryMove(pixel,pixel.x,pixel.y+1))) {
					var directions = [];
					if(isEmpty(pixel.x-1,pixel.y+1) && isEmpty(pixel.x-1,pixel.y+2)) {
						directions.push(-1)
					};
					if(isEmpty(pixel.x+1,pixel.y+1) && isEmpty(pixel.x+1,pixel.y+2)) {
						directions.push(1)
					};
					if(directions.length > 0) {
						tryMove(pixel,pixel.x+directions[Math.floor(Math.random() * directions.length)],pixel.y)
					};
				}
			},
			reactions: {
				water: { elem1: ["plastic","cellulose","cellulose"], elem2: ["water","water","cellulose",null,null], chance: 0.8 }
			},
			burn: 40,
			burnTime: 150,
			burnInto: ["ash","molten_plastic","carbon_dioxide","smoke"],
			category: "other"
		};
		
		goodPixels[newName] = { panicChange: 0.01, panicChangeChance: 0.2, moodChange: 0.035 };
	};
	
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,onTryMoveIntoMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The ${onTryMoveIntoMod} mod is required and has been automatically inserted (reload for this to take effect).`)
};
