function planetCrackerHeat(pixel,x,y,radius,fire,smoke,power,damage) {
	//console.log(`Radius: ${radius}\nPower: ${power}\nPixel: (${pixel.x},${pixel.y})\nDamage: ${damage}`);
	//console.log(`Expected temperature increase for pixel at (${pixel.x},${pixel.y}): ${800 * ((1 + (7 * damage)) ** 2) * ((power ** 2) * 1.5)}`);
	var reversedCloseness = ((radius / 6) ** 0.5) - 1; //mathematically inaccurate but properly correlated
	
	pixel.temp += 500 * ((reversedCloseness * 2) + 1);
	if(pixel.vx) {
		pixel.vx *= 2;
	};
	if(pixel.vy) {
		pixel.vy *= 2;
	};
};

function planetCrackerFinale(doColorChange=true) {
	var bottomFortyPercent = Math.round(height * 0.6);
	var bottomTwentyPercent = Math.round(height * 0.8);
	var bottomTenPercent = Math.round(height * 0.9);
	for(x = 1; x < width; x++) {
		for(y = bottomFortyPercent; y < height; y++) {
			var chance = y > bottomTwentyPercent ? 0.03 : 0.01
			var radius = y > bottomTwentyPercent ? 8 : 6
			if(enabledMods.includes("velocity.js") && !isEmpty(x,y,true)) {
				pixelMap[x][y].vy ??= 0;
				pixelMap[x][y].vy -= 20;
			};			
			if(y > bottomTenPercent && !isEmpty(x,y,true)) {
				pixelMap[x][y].temp += 2000;
			};
			if(Math.random() < chance) {
				explodeAt(x,y,radius,"plasma");
			};
		};
	};
	if(doColorChange) {
		if(enabledMods.includes("mods/gradient_background_support.js")) {
			settings.bg = ["#000000","#000000","#000000","#000000","#29180e","#663814","#9e6f19","#f7af2a"];
			settings.bgAngle = 90;
		} else {
			settings.bg = "#642402";
		};
	};
};

elements.planet_cracker = {
	color: "#ffc8ba",
	behavior: behaviors.WALL,
	properties: {
		active: true,
		counter: 1,
	},
	tick: function(pixel) {
		if(!pixel?.active) {
			return;
		};
		if(outOfBounds(pixel.x,pixel.y+pixel.counter)) {
			planetCrackerFinale();
			pixel.active = false;
			changePixel(pixel,"metal_scrap");
		};
		if(pixel.active) {
			var pixelDistanceFromBottom = height - pixel.y;
			var counterDistanceFromBottom = height - (pixel.y + pixel.counter);
			var closenessToBottom = 1 - (counterDistanceFromBottom / pixelDistanceFromBottom);
			//console.log(closenessToBottom);

			var finalRadius = Math.round(((1 + closenessToBottom) ** 2) * 6);

			if(typeof(explodeAtPlus) === "function") {
				explodeAtPlus(pixel.x,pixel.y+pixel.counter,finalRadius,"plasma","fire",null,planetCrackerHeat);
			} else {
				explodeAt(pixel.x,pixel.y+pixel.counter,finalRadius,"plasma");
			};
			pixel.counter++;
		};
	},
	state: "solid",
	density: 10000,
	category: "weapons",
	hardness: 1,
};
