if(typeof(width) === "undefined") {
	width = 20;
}
if(typeof(height) === "undefined") {
	height = 10;
}

runAfterLoad(function() {
	var randomChoices = Object.keys(elements).filter(function(e) {
		return elements[e].excludeRandom != true && elements[e].category != "tools" && !elements[e].tool;
	});
	randomEventChoices = {
		"falling_pixel": randomChoices,
		"element_circle": randomChoices,
		"explosion": randomChoices,
	}
	randomEvents.falling_pixel = function() {
		console.log("changed");
		// random x between 1 and width-1
		var x = Math.floor(Math.random()*(width-1))+1;
		// random y between 1 and 6
		var y = Math.floor(Math.random()*6)+1;
		if (isEmpty(x,y)) {
			// random element from randomEventChoices.falling_pixel
			var element = randomEventChoices.falling_pixel[Math.floor(Math.random()*randomEventChoices.falling_pixel.length)];
			// if element is an array, choose a random element from the array
			if (Array.isArray(element)) {
				element = element[Math.floor(Math.random()*element.length)];
			}
			createPixel(element,x,y);
		}
	};
	randomEvents.element_circle = function() {
		// random x between 1 and width-1
		var x = Math.floor(Math.random()*(width-1))+1;
		// random y between 1 and height-1
		var y = Math.floor(Math.random()*(height-1))+1;
		// random radius between 1 and 9
		var radius = Math.floor(Math.random()*18)+1;
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
		var radius = Math.floor(Math.random()*18)+1;
		var element = randomEventChoices.explosion[Math.floor(Math.random()*randomEventChoices.explosion.length)];
		explodeAt(x,y,radius,element);
	};
	randomEvents.temperature = function() {
		// set the temperature in a random circle to a random value
		var x = Math.floor(Math.random()*(width-1))+1;
		var y = Math.floor(Math.random()*(height-1))+1;
		var radius = Math.floor(Math.random()*18)+1;
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
			var radius = Math.floor(Math.random()*18)+1;
			var rColor = "rgb(" + randomR + "," + randomG + "," + randomB + ")";
			var coords = circleCoords(x,y,radius);
			for (var i = 0; i < coords.length; i++) {
				var coord = coords[i];
				if (!outOfBounds(coord.x,coord.y) && !isEmpty(coord.x,coord.y)) {
					pixelMap[coord.x][coord.y].color = rColor;
				};
			};
		};
	}
});