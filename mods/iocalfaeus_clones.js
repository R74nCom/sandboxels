elements.iorefrius_gas = {
	color: ["#217349", "#1b5f3c"],
	behavior: behaviors.GAS,
	tick: function(pixel) {
		if(!pixel.cold) {
			pixel.cold = false
		}
		for (let i = -2; i < 3; i++) {
			for (let j = -2; j < 3; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i,true)) {
					var newPixel = pixelMap[pixel.x+j][pixel.y+i];
					if ((lightArray.includes(newPixel.element)) || (newPixel.temp >= 525) || (ledArray.includes(newPixel.element) && newPixel.charge) || (newPixel.cold && Math.random() < 0.04)) {
						pixel.cold = true;
					};
				};
			};
		};
		if(pixel.cold == true) {
			pixel.temp -= 16;
		};
		if(pixel.cold == true && Math.random() < 0.02) {
			pixel.cold = false;
		};
	},
	category: "gases",
	density: 0.97,
	state: "gas",
};

elements.iolucius_gas = {
	color: ["#e9c5ed", "#e2b0e8"],
	behavior: behaviors.GAS,
	tick: function(pixel) {
		if(!pixel.lit) {
			pixel.lit = false
		}
		for (let i = -2; i < 3; i++) {
			for (let j = -2; j < 3; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i,true)) {
					var newPixel = pixelMap[pixel.x+j][pixel.y+i];
					if ((lightArray.includes(newPixel.element)) || (newPixel.temp >= 525) || (ledArray.includes(newPixel.element) && newPixel.charge) || (newPixel.lit && Math.random() < 0.04)) {
						pixel.lit = true;
					};
				};
			};
		};
		if(Math.random() < 0.05) {
			if(pixel.lit == true) {
				var randomLightOffset = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
				var lightX = pixel.x + randomLightOffset[0];
				var lightY = pixel.y + randomLightOffset[1];
				if(isEmpty(lightX,lightY,false)) {
					createPixel("light",lightX,lightY);
				};
			};
		};
		if(pixel.lit == true && Math.random() < 0.02) {
			pixel.lit = false;
		};
	},
	category: "gases",
	density: 0.97,
	state: "gas",
};

elements.ioradius_gas = {
	color: ["#a6a258", "#97944e"],
	behavior: behaviors.GAS,
	tick: function(pixel) {
		if(!pixel.rlit) {
			pixel.rlit = false
		}
		for (let i = -2; i < 3; i++) {
			for (let j = -2; j < 3; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i,true)) {
					var newPixel = pixelMap[pixel.x+j][pixel.y+i];
					if ((lightArray.includes(newPixel.element)) || newPixel.element === "radiation" || (newPixel.temp >= 525) || (ledArray.includes(newPixel.element) && newPixel.charge) || (newPixel.rlit && Math.random() < 0.04)) {
						pixel.rlit = true;
					};
				};
			};
		};
		if(Math.random() < 0.05) {
			if(pixel.rlit == true) {
				var randomRadiationOffset = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)];
				var radiationX = pixel.x + randomRadiationOffset[0];
				var radiationY = pixel.y + randomRadiationOffset[1];
				if(isEmpty(radiationX,radiationY,false)) {
					createPixel("radiation",radiationX,radiationY);
				};
			};
		};
		if(pixel.rlit == true && Math.random() < 0.02) {
			pixel.rlit = false;
		};
	},
	category: "gases",
	density: 0.97,
	state: "gas",
};