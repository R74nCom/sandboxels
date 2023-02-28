if(typeof(urlParams) === "undefined") {
	urlParams = new URLSearchParams(window.location.search);
};
if(urlParams.get('loadTheModList') !== null || urlParams.get('ltml') !== null) { //if the variable exists at all
    loadTheModList = true
} else { //if it doesn't (and it returns null)
    loadTheModList = false
}

if(loadTheModList) {
	enabledMods = ["mods/code_library.js","mods/adjustablepixelsize.js","mods/boiling_rock.js","mods/chalcopyrite.js","mods/clone_liquid.js","mods/conveyance.js","mods/CrashTestDummy.js","mods/delete_all_of_element.js","mods/evenmoretemptools.js","mods/extra_element_info.js","mods/fantastic_creatures.js","mods/fey_and_more.js","mods/glenn_gases.js","mods/iocalfaeus_clones.js","mods/grav_mudstones.js","mods/icb.js","mods/iean.js","mods/ketchup_mod.js","mods/laetium.js","mods/liquid_energy.js","mods/minecraft.js","mods/minesweeper.js","mods/more_breaking.js","mods/moreliquids.js","mods/moretools.js","mods/move_tools.js","mods/nested_for_reaction_example.js","mods/Neutronium Mod.js","mods/portal.js","mods/pushers.js","mods/rainbow_tests.js","mods/random_elems.js","mods/random_liquids.js","mods/random_rocks.js","mods/randomness.js","mods/randomness_but_tick.js","mods/randomness_but_tool.js","mods/slag_fix.js","mods/some_tf_liquids.js","mods/structure_test.js","mods/test.js","mods/ticking_temp_stuff.js","mods/time.js","mods/toothpaste.js","mods/troll.js","mods/unhide.js","mods/worldgen_test.js","mods/page_color.js","mods/color_tools.js","mods/invisible_wall.js","mods/replace_all.js","mods/bacteria_mod.js","mods/controllable_pixel_test.js","mods/fire_slime.js","mods/bioooze.js","mods/color_tools.js","mods/cells.js","mods/triggerable_random_powders.js","mods/replace.js","mods/change.js","mods/prompt.js","mods/miscible_psoup_and_birthpool.js","mods/primordial_birthpool.js","mods/liquid_void.js","mods/solid_rock.js","mods/invisible_dye.js","mods/alcohol.js","mods/a_bundle_of_tests.js","mods/paint_event.js","mods/amogus.js","mods/chem.js","mods/clf3.js","mods/roseyiede.js","mods/state_voids.js","mods/the_ground.js","mods/lone_urea.js","mods/fwibblen.js","mods/prop and prompt variables.js","mods/prop.js","mods/x_dependent_change_test.js","mods/alkahest.js","mods/tool_pixel_behavior.js","mods/onTryMoveInto.js","mods/human_edit.js","mods/runAfterAutogen and onload restructure.js","mods/changeTempReactionParameter.js","mods/metals.js","mods/explodeAtPlus.js","mods/note_block.js","mods/wirelike_test.js","mods/no_random_grbs.js","mods/bananas.js","mods/cpt_alt.js","mods/fire_mod.js","mods/test_4.js","mods/save_loading.js","mods/apioforms_pre.js","mods/fill_script.js","mods/funny elements 2022-11-15.js","mods/haseulite.js","mods/neutronium_compressor.js","mods/mobs.js","mods/stripe_paint.js","mods/velvet.txt","mods/switches.js","mods/noConduct.js","mods/changePixelDebug.js","mods/no_gas_sticking.js","mods/conduit.js","mods/ray_cloner.js","mods/date_test.js","mods/velocity.js","mods/maxColorOffset.js","mods/gradient_background_support.js","mods/life_eater.js","mods/planet_cracker.js","mods/generative_mods.js","mods/generator_prompt.js","mods/place_all_elements.js"];
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert("Mod list loaded. Refresh the page without the loadTheModList query parameter.");
	console.log("Mod list loaded. Refresh the page without the loadTheModList query parameter.");
};

if(typeof(pyth) === "undefined") { //has to be in here due to the role in loading the mod list
	function pyth(xA,yA,xB,yB) {
		var a = Math.abs(xB - xA);
		var b = Math.abs(yB - yA);
		var c = Math.sqrt(a**2 + b**2);
		return c;
	};
};

if(typeof(xor) === "undefined") {
	xor = function(c1,c2) { //Unused
		if(!!c1 && !c2) {
			return true;
		} else if(!c1 && !!c2) {
			return true;
		} else {
			return false;
		};
	};
};

function test(centerX,centerY,integer,chosenElement,createPixels=true,replacePixels=true,radialColor=false) {
	if(!elements[chosenElement]) {
		alert("Element " + chosenElement + " doesn't exist!");
		return false;
	};
	integer = Math.round(integer);
    for(i = 1; i < width; i++) {
        for(j = 1; j < height; j++) {
            var distance = pyth(centerX,centerY,i,j);
            if(Math.round(distance) % integer == 0) {
                if(isEmpty(i,j,false) && createPixels) {
                    createPixel(chosenElement,i,j);
                } else if(!isEmpty(i,j,true) && !outOfBounds(i,j) && replacePixels) {
					changePixel(pixelMap[i][j],chosenElement);
				};
			};
		};
	};
	return true;
};

function rctest(centerX,centerY,integer,chosenElement,createPixels=true,replacePixels=true,distanceScale=1,saturation=50,luminance=50) {
	saturation = Math.max(0,Math.min(100,saturation))
	luminance = Math.max(0,Math.min(100,luminance))
	if(!elements[chosenElement]) {
		alert("Element " + chosenElement + " doesn't exist!");
		return false;
	};
	integer = Math.round(integer);
    for(i = 1; i < width; i++) {
        for(j = 1; j < height; j++) {
            var distance = pyth(centerX,centerY,i,j);
            if(Math.round(distance) % integer == 0) {
                if(isEmpty(i,j,false) && createPixels) {
                    createPixel(chosenElement,i,j);
					var distancePrevariable = Math.round(distance * distanceScale) % 360
					pixelMap[i][j].color = `hsl(${distancePrevariable},${saturation}%,${luminance}%)`;
                } else if(!isEmpty(i,j,true) && !outOfBounds(i,j) && replacePixels) {
					changePixel(pixelMap[i][j],chosenElement);
					var distancePrevariable = Math.round(distance * distanceScale) % 360
					pixelMap[i][j].color = `hsl(${distancePrevariable},${saturation}%,${luminance}%)`;
				};
            };
        };
    };
	return true;
};

var canSupportWithEdge = function(x,y) {
	if(outOfBounds(x,y)) { //count edges
		return true;
	} else {
		if(!isEmpty(x,y,true)) { //if there is a pixel
			if(elements[pixelMap[x][y].element].state === "solid") {
				return true;
			} else {
				return false;
			};
		};
	};
};

/*var csweCharacter = function(x,y) { //Debug function
	if(canSupportWithEdge(x,y)) {
		return "X";
	} else {
		return ".";
	};
};*/

var powderMovementSnippet = function(pixel) { //Unused
	if (!tryMove(pixel, pixel.x, pixel.y+1)) {
		if (Math.random() < 0.5) {
			if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
				tryMove(pixel, pixel.x-1, pixel.y+1);
			};
		} else {
			if (!tryMove(pixel, pixel.x-1, pixel.y+1)) {
				tryMove(pixel, pixel.x+1, pixel.y+1);
			};
		};
	};
};

var sturdyMovementSnippet = function(pixel) { //readability wrapper
	tryMove(pixel, pixel.x, pixel.y+1);
};

if(typeof(includesArray) === "undefined") {
	function includesArray(parentArray, testArray) { //from portals.js
		for (let i = 0; i < parentArray.length; i++) {
			if (parentArray[i].every(function(value, index) { return value === testArray[index]})) {
				return true;
			};
		};
		return false;
	};
};

ddAnchorArray = [];

distanceScale = 15;

elements.hsl_tool_test = { //with help from ryan
    color: ["#cf3030","cf7f30","#cfcf30"],
    tool: function(pixel) {
		pixel.color = "hsl("+(pixelTicks%360)+",50%,50%)"
	},
    customColor: true,
    category: "color tools", //the toolbar is getting cluttered
    excludeRandom: true, //the toolbar is getting cluttered
};

elements.temporal_wall_test = {
	color: ["#8f8f8f","3f3f3f"],
	behavior: behaviors.WALL,
	properties: {
		counter: 1,
		active: true,
	},
	tick: function(pixel) {
		for(i = 0; i < 1; i++) { //dummy for
			if(!pixel) {
				break;
			};
			if(pixel.active) {
				if(pixel.counter == width) {
					pixel.active = false;
				};
				if(!isEmpty(pixel.counter,pixel.y) || outOfBounds(pixel.counter,pixel.y)) {
					pixel.counter++;
				} else {
					createPixel("wall",pixel.counter,pixel.y);
					pixel.counter++;
				};
			};
		};
	},
	state: "solid",
	density: 1000,
	category: "special",
};

elements.steel_silk = {
	color: ["#DCDEDF", "#C7C9CA", "#B9BBBC"],
	tick: function(pixel) {
		var px = pixel.x;
		var py = pixel.y;

		var supportCondition1 = (canSupportWithEdge(px-1,py-1) && canSupportWithEdge(px+1,py-1))	// V shape
		var supportCondition2 = (canSupportWithEdge(px-1,py) && canSupportWithEdge(px+1,py)) 		// - shape
		var supportCondition3 = (canSupportWithEdge(px-1,py+1) && canSupportWithEdge(px+1,py+1))	// Λ shape
		var supportCondition4 = (canSupportWithEdge(px-1,py+1) && canSupportWithEdge(px+1,py-1))	// / shape
		var supportCondition5 = (canSupportWithEdge(px-1,py-1) && canSupportWithEdge(px+1,py+1))	// \ shape
		var supportCondition6 = (canSupportWithEdge(px-1,py-1) && canSupportWithEdge(px+1,py))		// '- shape
		var supportCondition7 = (canSupportWithEdge(px-1,py+1) && canSupportWithEdge(px+1,py))		// ,- shape
		var supportCondition8 = (canSupportWithEdge(px+1,py-1) && canSupportWithEdge(px-1,py))		// -' shape
		var supportCondition9 = (canSupportWithEdge(px+1,py+1) && canSupportWithEdge(px-1,py))		// -, shape
		//var supportCondition6 = xor(canSupportWithEdge(px-1,py-1),canSupportWithEdge(px+1,py+1))	// one-side support
		var supports = (supportCondition1 || supportCondition2 || supportCondition3 || supportCondition4 || supportCondition5 || supportCondition6 || supportCondition7 || supportCondition8 || supportCondition9);
		/*if(pixelTicks % 10 == 0) {
			console.log(`Pixel at (${px},${py})`);
			console.log(`> ${csweCharacter(px-1,py-1)} ${csweCharacter(px+1,py-1)}\n> ${csweCharacter(px-1,py*1)} ${csweCharacter(px+1,py*1)}\n> ${csweCharacter(px-1,py+1)} ${csweCharacter(px+1,py+1)}`);
		};*/

		if (pixel.start === pixelTicks) {return}
		if (pixel.charge && elements[pixel.element].behaviorOn) {
			pixelTick(pixel)
		};

		if(!supports) {
			powderMovementSnippet(pixel);
		};
	},
	tempHigh: 1455.5,
	stateHigh: ["molten_steel", "molten_steel", "molten_steel", "molten_steel", "molten_steel", "molten_steel", "molten_steel", "molten_steel", "molten_steel", null],
	category: "solids",
	conduct: 0.48,
	hardness: 0.79,
	movable: true,
	category: "solids",
	state: "solid",
	density: 6850,
	breakInto: "metal_scrap",
};

function distanceScalePrompt() {
	var _distanceScale = prompt("Enter the value you want to use");

	//value check
	if(isNaN(parseFloat(_distanceScale))) {
		//empty string
		if(_distanceScale === "" || _distanceScale === null) {
			alert("No value was specified! Defaulting to 15");
			_distanceScale = 15;
		} else {
			alert("Invalid value! The value must be a number (defaulting to 15)");
			_distanceScale = 15;
		};
	};
	_distanceScale = parseFloat(_distanceScale);

	distanceScale = _distanceScale;
	updateDistanceDisplayDescription();
};

elements.distance_display = {
	color: "#00FFFF",
	properties: {
		distanceGetter: null,
	},
	tick: function(pixel) {
		var distance = Infinity;
		var oldDistance = Infinity;
		
		//if(!ddAnchorArray) { ddAnchorArray = [] }
		/*if(!Array.isArray(ddAnchorArray)) { ddAnchorArray = [] }
		for (var i = 1; i < width; i++) { //Find and store all anchor pixels
			for (var j = 1; j < height; j++) {
			};
		};*/
		
		var px = pixel.x;
		var py = pixel.y;
		
		if(ddAnchorArray.length > 0) {
			for(i = 0; i < ddAnchorArray.length; i++) {
				var newX = ddAnchorArray[i][0];
				var newY = ddAnchorArray[i][1];
				if(isEmpty(newX,newY)) {
					ddAnchorArray.splice(i,1);
				} else {
					var checkPixel = pixelMap[newX][newY];
					if(checkPixel.element !== "distance_display_anchor") {
						ddAnchorArray.splice(i,1);
					} else {
						distanceCandidate = pyth(px,py,newX,newY);
						if(distanceCandidate < distance) {
							distance = pyth(px,py,newX,newY);
						};
					};
				};
			};
		} else {
			distance = null;
		};
		
		pixel.distanceGetter = distance;
		
		if(distance !== null) {
			var processedDistance = Math.min(255,Math.max(0,Math.round(distance * distanceScale)));
			pixel.color = `rgb(0,${processedDistance},255)`;
		} else {
			pixel.color = `rgb(0,255,255)`;
		};
	},
	category: "machines",
	state: "solid",
	desc: `It gets more blue the closer it gets to a distance display anchor. The current scale factor is ${distanceScale} (bigger number = smaller blue radius). <span onclick=distanceScalePrompt() style=\"color: #ff00ff;\";>Click here</span> to open the scale prompt.<br/><em>Note: Info pages do not update automatically and must be closed and reopened to show the changed scale.</em>`,
};

elements.distance_display_anchor = {
	color: "#0000FF",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var px = pixel.x;
		var py = pixel.y;
		if(!includesArray(ddAnchorArray,[px,py])) {
			ddAnchorArray.push([px,py]);
		};
		pixel.color = "rgb(0,0,255)";
	},
	category: "machines",
	state: "solid",
	desc: `Distance display pixels get blue in its distance.`,
};

/*
blackObject = {r: 0, g: 0, b: 0};
pinkObject = {r: 255, g: 148, b: 255};

elements.black_pink_test = {
	color: ["#000000","#FF94FF"],
	behavior: behaviors.WALL,
	properties: {
		offset: Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 15)
	},
	tick: function(pixel) {
		if(typeof(pixel.offset) !== "number") {
			pixel.offset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 15);
		};
		
		var fraction = Math.min(1.0,Math.max(0.0,scale(pixel.y,1,height-1,0.0,1.0)));

		var color = averageColorObjects(pinkObject,blackObject,fraction);
		
		var offsettedColor = lightenColor(color,pixel.offset,"rgb");
		
		pixel.color = offsettedColor;
	},
	category: "machines",
	state: "solid",
	desc: "blackpink in your area",
};
*/

function updateDistanceDisplayDescription() {
	elements.distance_display.desc = `It gets more blue the closer it gets to a distance display anchor. The current scale factor is ${distanceScale} (bigger number = smaller blue radius). <span onclick=distanceScalePrompt() style=\"color: #ff00ff;\";>Click here</span> to open the scale prompt.<br/><em>Note: Info pages do not update automatically and must be closed and reopened to show the changed scale.</em>`;
};

if(enabledMods.includes("mods/code_library.js")) {
	function createDownAtFirstAvailableSpace(element,x) {
		//Get the Y of the first empty pixel on a row which is on a full pixel or the bottom of the canvas
		//1. map(x => !x) coerces empty pixels' `undefined` values to !false = true, while full pixels are coerced to !true = false
		//2. spread with false adds a sentinel value for the bottom of the canvas
		//3. slice(1) removes empty (OOB) position at y=0
		//4. indexOf(false) always shows the first matching item
		//5. an offset I don't understand (probably from that slice) shifts the first match to the empty spot above the first full pixel
		var firstEmptyY = [...pixelMap[x].map(obj => !obj),false].slice(1).indexOf(false);

		if(firstEmptyY == -1) {
			return false;
		};
		
		createPixel(element,x,firstEmptyY);
		return true;
	};

	function createReplacingGases(element,x,y) {
		if(isEmpty(x,y,false)) {
			createPixel(element,x,y);
			return true;
		};
		if(!isEmpty(x,y,true)) {
			var isGas = (elements[pixelMap[x][y].element].state == "gas");
			if(isGas) {
				deletePixel(x,y);
				createPixel(element,x,y);
			};
			return isGas;
		};
	};

	function cdafasIgnoringGas(element,x) {
		//Get the Y of the first empty pixel on a row which is on a full pixel or the bottom of the canvas
		//1. map(x => !x) coerces empty pixels' `undefined` values to !false = true, while full pixels are coerced to !true = false
		//2. spread with false adds a sentinel value for the bottom of the canvas
		//3. slice(1) removes empty (OOB) position at y=0
		//4. indexOf(false) always shows the first matching item
		//5. an offset I don't understand (probably from that slice) shifts the first match to the empty spot above the first full pixel
		var firstEmptyY = [...pixelMap[x].map(obj =>!obj || elements[obj.element].state == "gas"),false].slice(1).indexOf(false);

		if(firstEmptyY == -1) {
			return false;
		};
		
		createReplacingGases(element,x,firstEmptyY);
		return true;
	};

	elements.temporal_fire_test = {
		color: ["#8f8f8f","3f3f3f"],
		behavior: behaviors.WALL,
		properties: {
			direction: 1,
			counter: 1,
			active: true,
			fromX: null,
		},
		tick: function(pixel) {
			if(pixel.fromX == null) {
				pixel.fromX = pixel.x;
			};
			if(!pixel) {
				return;
			};
			if(!pixel.active) {
				return;
			};
			var newX = pixel.fromX + pixel.counter;
			if(outOfBounds(newX,1)) {
				pixel.active = false;
				newX = pixel.fromX + pixel.counter; //reset
				pixel.counter = 1;
				return;
			};
			cdafasIgnoringGas("fire",newX);
			pixel.counter += pixel.direction;
		},
		state: "gas",
		category: "special",
	};
};
