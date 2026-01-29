var modName = "mods/colonies.js";
// var exoplanetMod = "mods/exoplanet.js";

dependOn("exoplanet.js", function(){

    window.addEventListener("load", () => { 
        document.getElementById("elementButton-base")?.remove()
    })

    window.addEventListener("load", () => { 
        document.getElementById("elementButton-empty_room")?.remove()
    })

    window.addEventListener("load", () => { 
        document.getElementById("elementButton-cafeteria")?.remove()
    })

    window.addEventListener("load", () => { 
        document.getElementById("elementButton-terraformer_room")?.remove()
    })

    window.addEventListener("load", () => { 
        document.getElementById("elementButton-base_door_left")?.remove()
    })

    window.addEventListener("load", () => { 
        document.getElementById("elementButton-base_door_right")?.remove()
    })

    elements.base = {
        hidden: true,
        color: "#ff0000",
        behavior: [
            "XX|XX|CR:glass|CR:glass|CR:rocket_gate|CR:rocket_gate|CR:rocket_gate|CR:glass|CR:glass|XX|XX",
            "XX|CR:glass|CR:glass|CR:air_filter|XX|XX|XX|XX|CR:glass|CR:glass|XX",
            "XX|CR:glass|XX|XX|XX|XX|XX|XX|XX|CR:glass|XX",
            "CR:glass|CR:glass|XX|XX|XX|XX|XX|XX|XX|CR:glass|CR:glass",
            "CR:glass AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>glass|XX|XX|XX|XX|XX|XX|XX|XX|XX|CR:glass AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>glass",
            "CR:base_door_left,base_door,base_door AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>base_door_left,base_door,base_door|XX|XX|XX|XX|CH:leaving_rocket%25|XX|XX|XX|XX|CR:base_door_right,base_door AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>base_door_right,base_door",
            "CR:concrete|CR:glass AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>glass|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:glass AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>glass|CR:concrete",
            "CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX|XX|XX",
        ],
        category: "colonies",
        state: "solid",
    }

    elements.empty_room = {
        hidden: true,
        color: "#ff0000",
        behavior: [
            "XX|XX|CR:glass|CR:glass|CR:glass|CR:glass|CR:glass|XX|XX",
            "XX|CR:glass|CR:glass|XX|XX|XX|CR:glass|CR:glass|XX",
            "CR:glass|CR:glass|CR:air_filter|XX|XX|XX|XX|CR:glass|CR:glass",
            "CR:glass|XX|XX|XX|XX|XX|XX|XX|CR:glass",
            "CR:base_door|XX|XX|XX|DL|XX|XX|XX|CR:base_door",
            "CR:concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete",
            "CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
        ],
        category: "colonies",
        state: "solid",
    }

    elements.cafeteria = {
        hidden: true,
        color: "#ff0000",
        behavior: [
            "XX|CR:glass|CR:glass|CR:glass|CR:glass|CR:glass|CR:glass|CR:glass|XX",
            "CR:glass|CR:glass|CR:food_dispenser|CR:food_dispenser|CR:air_filter|CR:food_dispenser|CR:food_dispenser|CR:glass|CR:glass",
            "CR:glass|XX|XX|XX|XX|XX|XX|XX|CR:glass",
            "CR:glass|XX|XX|XX|XX|XX|XX|XX|CR:glass",
            "CR:base_door|XX|XX|XX|DL|XX|XX|XX|CR:base_door",
            "CR:concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|DL:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass,concrete,mulch|DL:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass,concrete,mulch|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|DL:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass,concrete,mulch|DL:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass,concrete,mulch|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete",
            "CR:concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
        ],
        category: "colonies",
        state: "solid",
    }

    elements.terraformer_room = {
        hidden: true,
        color: "#ff0000",
        behavior: [
            "XX|XX|CR:glass|CR:glass|CR:glass|CR:glass|CR:glass|XX|XX",
            "XX|CR:glass|CR:glass|XX|XX|XX|CR:glass|CR:glass|XX",
            "CR:glass|CR:glass|CR:air_filter|XX|XX|XX|XX|CR:glass|CR:glass",
            "CR:glass|XX|XX|XX|XX|XX|XX|XX|CR:glass",
            "CR:base_door|XX|XX|XX|DL|XX|XX|XX|CR:base_door",
            "CR:concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:room_temper AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>room_temper|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:nanobot_terraformers AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>nanobot_terraformers|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:room_temper AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>room_temper|CR:concrete AND CH:dirt,exoplanetary_dust,exoplanetary_rock,exoplanetary_sand,sand,mud,grass>concrete|CR:concrete",
            "CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete|CR:concrete",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
        ],
        category: "colonies",
        state: "solid",
    }

    elements.air_filter = {
        hidden: true,
        color: ["#d1c6be","#b5c0ad","#b9b8bc"],
        reactions: {
            "carbon_dioxide": { elem2:"oxygen" },
            "dust_cloud": { elem2:["oxygen",null], },
            "exoplanetary_dust": { elem2:null, },
            "dust": { elem2:null, },
            "radiation": { elem2:"electric", temp1:200 }
        },
        behavior: [
            "XX|ST|XX",
            "ST AND CR:oxygen%1|XX|ST AND CR:oxygen%1",
            "XX|CR:oxygen%1|XX",
        ],
        tempHigh: 500,
        stateHigh: "molten_aluminum",
        category: "colonies",
        density: 2710,
        conduct: 0.73,
        hardness: 0.01,
        breakInto: "metal_scrap",
        fireColor: "#A7B3BF",
        superconductAt: -271.95,
        state: "solid",
    }

    elements.rocket_gate = {
        hidden: true,
        color: ["#d1c6be","#b5c0ad","#b9b8bc"],
        behavior: behaviors.WALL,
        tempHigh: 500,
        stateHigh: "molten_aluminum",
        category: "colonies",
        density: 2710,
        conduct: 0.73,
        hardness: 0.05,
        breakInto: "metal_scrap",
        fireColor: "#A7B3BF",
        superconductAt: -271.95,
        state: "solid",
    }

    elements.base_door = {
        hidden: true,
        color: ["#d1c6be","#b5c0ad","#b9b8bc"],
        behavior: behaviors.WALL,
        tempHigh: 500,
        stateHigh: "molten_aluminum",
        category: "colonies",
        density: 2710,
        conduct: 0.73,
        hardness: 0.04,
        breakInto: "metal_scrap",
        fireColor: "#A7B3BF",
        superconductAt: -271.95,
        state: "solid",
    }

    elements.base_door_left = {
        hidden: true,
        color: "#ff0000",
        behavior: [
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "CR:empty_room,cafeteria,cafeteria,terraformer_room,terraformer_room|XX|XX|XX|CH:base_door|XX|XX|XX|XX",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
        ],
        category: "colonies",
        state: "solid",
    }

    elements.base_door_right = {
        hidden: true,
        color: "#ff0000",
        behavior: [
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "XX|XX|XX|XX|CH:base_door|XX|XX|XX|CR:empty_room,cafeteria,cafeteria,cafeteria,terraformer_room,terraformer_room,terraformer_room",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
            "XX|XX|XX|XX|XX|XX|XX|XX|XX",
        ],
        category: "colonies",
        state: "solid",
    }

elements.settler = {
	color: ["#A8A7AB","#878689"],
	category: "colonies",
	tick: function(pixel) {
		if (tryMove(pixel, pixel.x, pixel.y+1)) {} // Fall
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
		if (pixel.oxygen > 0.1 && Math.random() < 0.025) { pixel.oxygen -= 0.5 } // consume oxygen
		else if (pixel.oxygen < 0.1) { pixel.dead = true }

        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				if (Math.random() < 0.5) {
					changePixel(pixel,"metal_scrap");
				}
				else {
					changePixel(pixel,"rotten_meat");
				}
            }
            return
        }

        if (pixel.burning) {
            pixel.panic += 0.1;
        }
		else if (pixel.oxygen < 25.1) { 
			pixel.panic += 0.1; 
		}
        else if (pixel.panic > 0) {
            pixel.panic -= 0.1;
            if (pixel.panic < 0) { pixel.panic = 0; }
        }

        if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : pixel.panic+1)) { // Move 10% chance
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
                        break;
                    }
                }
                else if (!isEmpty(pixel.x+move[0], pixel.y+move[1], true)) {
                    var hitPixel = pixelMap[pixel.x+move[0]][pixel.y+move[1]];
                    if (hitPixel.element === "settler") {
                        // interact with other settlers
                        hitPixel.panic = pixel.panic;
                    }
                    else if (hitPixel.element === "base_door") {
                        if (pixel.dir === -1 && Math.random() > 0.5) {
                            tryMove(pixel,pixel.x-2,pixel.y);
                        }
                        else if (pixel.dir === 1 && Math.random() > 0.5) {
                            tryMove(pixel,pixel.x+2,pixel.y);
                        }
                    }
                    else if (hitPixel.element === "leaving_rocket" && pixel.ogcrew === false) {
                        if (Math.random() > 0.75) {
                            deletePixel(pixel.x,pixel.y);
                            hitPixel.passengers += 1;
                        }
                    }
                    else if (elements[hitPixel.element].state === "gas") {
                        swapPixels(pixel,hitPixel);
                    }
                    else if (elements[hitPixel.element].state === "liquid") {
                        swapPixels(pixel,pixelMap[hitPixel.x][hitPixel.y-1]);
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
            // spacesuit A/C
            if (pixel.temp > 40) { pixel.temp -= 3; }
            else if (pixel.temp < 32) { pixel.temp += 3; }
        }

    },
    foodNeed: 50,
    egg: "settler",
    density: 2710,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 300,
    stateHigh: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","molten_aluminum","smoke","dioxin","smoke","stench","ash","melted_plastic"],
    tempLow: -75,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: ["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","molten_aluminum","smoke","dioxin","smoke","stench","ash","melted_plastic"],
	hardness: 0.02,
    breakInto: ["blood","meat","bone","blood","meat","bone","metal_scrap"],
    forceSaveColor: true,
	reactions: {
		"cancer": { elem1:"cancer", chance:0.0005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.04 },
        "neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.003 },
        "fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.003 },
        "plague": { elem1:"plague", chance:0.005 },
        "oxygen": { func:function(pixel,air){pixel.oxygen += 5}, elem2:"carbon_dioxide", chance:0.5 },
        "carbon_dioxide": { func:function(pixel,air){pixel.oxygen -= 1}, chance:0.05 },
		"dust_cloud": { func:function(pixel,air){pixel.oxygen -= 5}, elem2:null, chance:0.05 },
		"exoplanetary_dust": { elem2:"dust_cloud", chance:0.001 },
        "meat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "cooked_meat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "cured_meat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "sugar": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "broth": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "yolk": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "hard_yolk": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "dough": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "batter": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "butter": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "melted_butter": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "chocolate": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "melted_chocolate": { elem2:null, chance:0.3, func:behaviors.FEEDPIXEL  },
        "grape": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "tomato": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "herb": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "lettuce": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "corn": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "popcorn": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL  },
        "potato": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "baked_potato": { elem2:null, chance:0.15, func:behaviors.FEEDPIXEL  },
        "bread": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "toast": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "gingerbread": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "baked_batter": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "wheat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "candy": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "yogurt": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "frozen_yogurt": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "ice_cream": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "beans": { elem2:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,"stench"], chance:0.2, func:behaviors.FEEDPIXEL  },
        "tea": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "coffee": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "milk": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "cream": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "soda": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "chocolate_milk": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "fruit_milk": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "pilk": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "eggnog": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "juice": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "cheese": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "melted_cheese": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "alcohol": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "antidote": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "honey": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "caramel": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "molasses": { elem2:null, chance:0.05, func:behaviors.FEEDPIXEL  },
        "ketchup": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "pumpkin_seed": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "nut": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "nut_meat": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "nut_butter": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "nut_milk": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "jelly": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "mayo": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "mashed_potato": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "sauce": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "pickle": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL  },
        "food_container": { elem2:null, chance:0.2, func:behaviors.FEEDPIXEL  },
        "sun": { elem1:["cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","cooked_meat","molten_aluminum","smoke","dioxin","smoke","stench","ash","melted_plastic"] },
        "water": { func:function(pixel,water){pixel.oxygen -= 1}, elem2:"bubble", attr2:{"clone":"water"}, chance:0.0002 },
        "salt_water": { func:function(pixel,water){pixel.oxygen -= 2}, elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.0002 },
        "sugar_water": { func:function(pixel,water){pixel.oxygen -= 2}, elem2:"bubble", attr2:{"clone":"sugar_water"}, chance:0.0002 },
        "seltzer": { func:function(pixel,water){pixel.oxygen -= 4}, elem2:"bubble", attr2:{"clone":["seltzer","seltzer","carbon_dioxide"]}, chance:0.0002 },
        "pool_water": { func:function(pixel,water){pixel.oxygen -= 1}, elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.0002 },
        "dirty_water": { func:function(pixel,water){pixel.oxygen -= 4}, elem2:"bubble", color2:["#0e824e","#07755a","#0c6934"], attr2:{"clone":"dirty_water"}, chance:0.0003 },
        "blood": { func:function(pixel,water){pixel.oxygen -= 5}, elem2:"bubble", color2:["#ff0000","#ee0000","#ff4040"], attr2:{"clone":"blood"}, chance:0.0003 },
	},
	properties: {
        dead: false,
        dir: 1,
        panic: 0,
		oxygen: 100,
        ogcrew: false,
    },
}

elements.nanobot_terraformers = {
    color: "#c0c0c0",
    hidden: true,
    behavior: [
        "CH:exoplanetary_dust>nanobot_terraformers%50|CH:exoplanetary_dust>nanobot_terraformers%50 AND CR:oxygen%5|CH:exoplanetary_dust>nanobot_terraformers%50",
        "CH:exoplanetary_dust>nanobot_terraformers%50|XX|CH:exoplanetary_dust>nanobot_terraformers%50",
        "CH:exoplanetary_dust,exoplanetary_rock>nanobot_terraformers%50 AND M2|CH:exoplanetary_dust>nanobot_terraformers%50 AND M1|CH:exoplanetary_dust>nanobot_terraformers%50 AND M2",
    ],
    reactions: {
        "exoplanetary_rock": { elem2:"nanobot_terraformers", attr2:{"clone":"rock"}},
        "dusty_water": { elem2:"nanobot_terraformers", attr2:{"clone":"water"}},
        "dusty_ice": { elem2:"nanobot_terraformers", attr2:{"clone":"ice"}},
		"exoplanetary_sand": { elem2:"nanobot_terraformers", attr2:{"clone":"sand"} },
    },
	tick: function(pixel) {
        if (pixel.age > 25 || (pixel.clone && isEmpty(pixel.x,pixel.y-1))) {
            if (pixel.clone) {
                changePixel(pixel,pixel.clone);
                return;
            }
            changePixel(pixel,"dirt");
        }
		pixel.age ++;
    },
	properties: {
        "age": 0,
    },
    category: "colonies",
    state: "solid",
    density: 21450,
    excludeRandom: true,
    conduct: 0.25,
    darkText: true,
    tempHigh: 1456,
    stateHigh: "molten_steel"
}

elements.room_temper = {
	color: "#29632f",
	behavior: behaviors.WALL,
	tick: function(pixel) {
        // from nouserthings.js <3
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < -230) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > 270) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"colonies",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
};

elements.food_dispenser = {
    color: "#606378",
    behavior: [
        "XX|ST|XX",
        "ST|XX|ST",
        "XX|XX|XX",
    ],
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+4) && isEmpty(pixel.x, pixel.y+1) && Math.random() > 0.95) {
            createPixel("food_container",pixel.x,pixel.y+1);
        }
    },
    category:"colonies",
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    conduct: 0.42
}

elements.food_container = {
    behavior: behaviors.STURDYPOWDER,
    category: "colonies",
    hidden: true,
    state: "solid",
    color: ["#2b1107","#5c3322","#2b1107","#5c3322","#2b1107","#5c3322"],
    tempHigh: 250,
    stateHigh: ["sugar","cooked_meat","dead_plant","ash","ash","charcoal"],
    burn: 10,
    burnTime: 200,
    burnInto: ["sugar","cooked_meat","dead_plant","ash","ash","charcoal"],
    breakInto: ["sugar","cooked_meat","dead_plant","sugar","cooked_meat","dead_plant","sugar","cooked_meat","dead_plant","sawdust","sawdust","sawdust","sawdust"],
    breakIntoColor: ["#2b1107","#5c3322","#5c3322","#5c3322","#5c3322","#5c3322","#5c3322","#5c3322","#41770B","#774C35"],
    isFood: true
}

elements.leaving_rocket = {
    name: "rocket",
    hidden: true,
    color: "#ff6f47",
    tick: function(pixel) {
        if (pixel.passengers > 14) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                if (outOfBounds(pixel.x,pixel.y-1)) {
                    deletePixel(pixel.x,pixel.y);
                }
                else if (pixelMap[pixel.x][pixel.y-1].element === "rocket_gate") {
                    tryMove(pixel, pixel.x, pixel.y-2);
                }
                else {
                    // tryMove again to the top left or top right
                    tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
                }
            }
            if (Math.random() > 0.5 && isEmpty(pixel.x,pixel.y+1)) {
                createPixel("smoke", pixel.x, pixel.y+1);
            }
        }
        else {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                // tryMove again to the bottom left or bottom right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y+1);
            }
        }
        doDefaults(pixel)
    },
    properties: {
        "passengers": 0,
    },
    conduct: 0.5,
    ignore: ["cloner","ecloner","slow_cloner","clone_powder","floating_cloner"],
    category: "colonies",
    state: "solid",
    density: 7300,
    cooldown: defaultCooldown
}

elements.arriving_rocket = {
    name: "rocket",
    color: "#ff6f47",
    tick: function(pixel) {
        if (!tryMove(pixel, pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y+1);
            pixel.age++;
        }
        if (Math.random() > 0.5 && pixel.age < 10) {
            createPixel("smoke", pixel.x, pixel.y-1);
        }
        if (pixel.age > 250 && pixel.base_established === false) {
            if (isEmpty(pixel.x, pixel.y-1)) {
                createPixel("base",pixel.x, pixel.y-1);
                pixel.base_established = true;
            }
        }
        if (pixel.age > 500 && pixel.passengers > 0) {
            if (isEmpty(pixel.x+1, pixel.y-1)) {
                createPixel("settler",pixel.x+1, pixel.y-1);
                pixelMap[pixel.x+1][pixel.y-1].ogcrew = true;
                pixel.passengers -= 1;
            }
            else if (isEmpty(pixel.x-1, pixel.y-1)) {
                createPixel("settler",pixel.x-1, pixel.y-1);
                pixelMap[pixel.x-1][pixel.y-1].ogcrew = true;
                pixel.passengers -= 1;
            }
        }
        if (pixel.passengers < 1) {
            changePixel(pixel,"concrete");
        }
    },
    properties: {
        "passengers": 5,
        "age": 0,
        "base_established": false,
    },
    conduct: 0.5,
    ignore: ["cloner","ecloner","slow_cloner","clone_powder","floating_cloner"],
    category: "colonies",
    state: "solid",
    density: 7300,
    cooldown: defaultCooldown
}

}, true);