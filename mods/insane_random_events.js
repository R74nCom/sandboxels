var modName = "mods/insane_random_events.js";
var runAfterAutogenMod = "mods/runAfterAutogen and onload restructure.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(runAfterAutogenMod) && enabledMods.includes(libraryMod)) {
	if(typeof(width) === "undefined") {
		width = 20;
	}
	if(typeof(height) === "undefined") {
		height = 10;
	}

	runAfterAutogen(function() {
		//Regenerate randomChoices
		var randomChoices = Object.keys(elements).filter(function(e) {
			return elements[e].excludeRandom != true && elements[e].category != "tools" && !elements[e].tool;
		});

		//Set all event choices to randomChoices
		randomEventChoices = {
			"falling_pixel": randomChoices.filter( function(elem) { return commonMovableCriteria(elem) } ),
			"element_circle": randomChoices,
			"explosion": randomChoices,
		}

		//Buff event functions
		randomEvents.old_falling_pixel = randomEvents.falling_pixel;
			//transform falling_pixel into a rain of pixels
		randomEvents.falling_pixel = function() {
			var element = randomEventChoices.falling_pixel[Math.floor(Math.random()*randomEventChoices.falling_pixel.length)];
			for(i = 1; i < width; i++) {
				for(j = 0; j < Math.round(height * 0.35); j++) {
					if(Math.random() < 0.1 && isEmpty(i,j)) {
						createPixel(element,i,j)
					};
				};
			};
		};
		randomEvents.element_circle = function() {
			// random x between 1 and width-1
			var x = Math.floor(Math.random()*(width-1))+1;
			// random y between 1 and height-1
			var y = Math.floor(Math.random()*(height-1))+1;
			// random radius between 1 and 9
			var radius = Math.floor(Math.random()*19)+1;
			// random element from randomEventChoices.element_circle
			var element = randomEventChoices.element_circle[Math.floor(Math.random()*randomEventChoices.element_circle.length)];
			var coords = circleCoords(x,y,radius);
			for (var i = 0; i < coords.length; i++) {
				var coord = coords[i];
				if (isEmpty(coord.x,coord.y)) {
					createPixel(element,coord.x,coord.y);
				}
			}
		};
		randomEvents.explosion = function() {
			// similar but do explodeAt(x,y,radius,element)
			var x = Math.floor(Math.random()*(width-1))+1;
			var y = Math.floor(Math.random()*(height-1))+1;
			var radius = Math.floor(Math.random()*19)+1;
			var element = randomEventChoices.explosion[Math.floor(Math.random()*randomEventChoices.explosion.length)];
			explodeAt(x,y,radius,element);
		};
		randomEvents.temperature = function() {
			// set the temperature in a random circle to a random value
			var x = Math.floor(Math.random()*(width-1))+1;
			var y = Math.floor(Math.random()*(height-1))+1;
			var radius = Math.floor(Math.random()*19)+1;
			var temp = Math.floor(Math.random()*400)-273;
			var coords = circleCoords(x,y,radius);
			for (var i = 0; i < coords.length; i++) {
				var coord = coords[i];
				if (!outOfBounds(coord.x,coord.y) && !isEmpty(coord.x,coord.y)) {
					pixelMap[coord.x][coord.y].temp = temp;
				}
			}
		};
		if(enabledMods.includes("mods/paint_event.js")) {
			randomEvents.paint = function() {
				// set the color of a random circle to a random color
				var x = Math.floor(Math.random()*(width-1))+1;
				var y = Math.floor(Math.random()*(height-1))+1;
				var randomR = Math.floor(Math.random() * 256);
				var randomG = Math.floor(Math.random() * 256);
				var randomB = Math.floor(Math.random() * 256);
				var radius = Math.floor(Math.random()*19)+1;
				var rColor = "rgb(" + randomR + "," + randomG + "," + randomB + ")";
				var coords = circleCoords(x,y,radius);
				for (var i = 0; i < coords.length; i++) {
					var coord = coords[i];
					if (!outOfBounds(coord.x,coord.y) && !isEmpty(coord.x,coord.y)) {
						pixelMap[coord.x][coord.y].color = rColor;
					};
				};
			};
		};
			//Buff mob events
		if(typeof(maximumCreeperTries) !== "undefined") {
			minimumCreeperTries = 10;
			maximumCreeperTries = 30;
		};
		if(typeof(maximumZombieTries) !== "undefined") {
			minimumZombieTries = 10;
			maximumZombieTries = 30;
		};
		if(typeof(maximumSkeletonTries) !== "undefined") {
			minimumSkeletonTries = 10;
			maximumSkeletonTries = 30;
		};
		
		//New event option
		var eventOptions = document.querySelectorAll('span[setting="events"]')[0].children[0];
		var newEventOption = document.createElement("option");
		newEventOption.setAttribute("value","1");
		newEventOption.textContent = "Every tick (why)";
		eventOptions.appendChild(newEventOption);
	});
} else {
	if(!enabledMods.includes(libraryMod))			{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	if(!enabledMods.includes(runAfterAutogenMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,runAfterAutogenMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${runAfterAutogenMod}" and "${libraryMod}" mods are required and have been automatically inserted (reload for this to take effect).`);
};
