var modName = "mods/wifi.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
	//https://stackoverflow.com/a/60922255
	elements.wifi = {
		color: "#bfff7f",
		properties: {
			_channel: 0,
			_correspondingWifi: null,
		},
		hardness: 0.8,
		breakInto: ["plastic","steel","copper"],
		conduct: 1,
		insulate: true,
		tick: function(pixel) {
			pixel._channel = Math.floor(pixel.temp / 100);
			
			var colorBase = (pixel._channel + 3);
			if(colorBase < 0 || colorBase > 124) {
				pixel.color == "rgb(212,185,222)";
			} else {
				colorBase = colorBase.toString(5).padStart(3,"0").split("").map(x => parseInt(x) * 64);
				pixel.color = `rgb(${colorBase.join(",")})`
			};

			pixel._correspondingWifi = currentPixels.filter(function(pixelToCheck) {
				return (
					pixelToCheck !== pixel && //should work if this pixel is the same as the other one by reference
					["wifi","receiver"].includes(pixelToCheck.element) &&
					pixelToCheck._channel == pixelChannel
				);
			},pixelChannel=pixel._channel).map(pixel => [pixel.x,pixel.y]);
			
			if(pixel.charge) {
				for(var i in pixel._correspondingWifi) {
					i = parseInt(i);
					var wifiCoords = pixel._correspondingWifi[i];
					var newPixel = pixelMap[wifiCoords[0]]?.[wifiCoords[1]];
					if(newPixel) {
						if(!newPixel.chargeCD) {
							for(var j in adjacentCoords) {
								j = parseInt(j);
								var pixelAdjacentToWifi = pixelMap[newPixel.x+adjacentCoords[j][0]]?.[newPixel.y+adjacentCoords[j][1]];
								if(pixelAdjacentToWifi) { pixelAdjacentToWifi.charge = 1 };
							};
						}
					}
				};
				if(pixel._correspondingWifi.length > 0) {
					delete pixel.charge;
					pixel.chargeCD = 5
				}
			}
			
			if(typeof(pixel.chargeCD) !== "undefined") {
				pixel.chargeCD--;
				if(pixel.chargeCD <= 0) { delete pixel.chargeCD };
			};
		},
		category: "machines",
		state: "solid",
	};

	elements.transmitter = {
		color: "#00ff7f",
		properties: {
			_channel: 0,
			_correspondingWifi: null,
		},
		hardness: 0.8,
		breakInto: ["plastic","steel","copper"],
		conduct: 1,
		insulate: true,
		tick: function(pixel) {
			pixel._channel = Math.floor(pixel.temp / 100);

			var colorBase = (pixel._channel + 3);
			if(colorBase < 0 || colorBase > 124) {
				pixel.color == "rgb(212,185,222)";
			} else {
				colorBase = colorBase.toString(5).padStart(3,"0").split("").map(x => parseInt(x) * 64);
				pixel.color = `rgb(${colorBase.join(",")})`
			};

			pixel._correspondingWifi = currentPixels.filter(function(pixelToCheck) {
				return (
					pixelToCheck !== pixel && //should work if this pixel is the same as the other one by reference
					["wifi","receiver"].includes(pixelToCheck.element) &&
					pixelToCheck._channel == pixelChannel
				);
			},pixelChannel=pixel._channel).map(pixel => [pixel.x,pixel.y]);
			
			if(pixel.charge) {
				for(var i in pixel._correspondingWifi) {
					i = parseInt(i);
					var wifiCoords = pixel._correspondingWifi[i];
					var newPixel = pixelMap[wifiCoords[0]]?.[wifiCoords[1]];
					if(newPixel) {
						if(!newPixel.chargeCD) {
							for(var j in adjacentCoords) {
								j = parseInt(j);
								var pixelAdjacentToWifi = pixelMap[newPixel.x+adjacentCoords[j][0]]?.[newPixel.y+adjacentCoords[j][1]];
								if(pixelAdjacentToWifi && elements[pixelAdjacentToWifi.element].conduct) { pixelAdjacentToWifi.charge = 1 };
							};
						}
					}
				};
				if(pixel._correspondingWifi.length > 0) {
					delete pixel.charge;
					pixel.chargeCD = 5
				}
			}

			if(typeof(pixel.chargeCD) !== "undefined") {
				pixel.chargeCD--;
				if(pixel.chargeCD <= 0) { delete pixel.chargeCD };
			};
		},
		category: "machines",
		state: "solid",
	}
	
	elements.receiver = {
		color: "#bfff00",
		properties: {
			_channel: 0,
		},
		hardness: 0.8,
		breakInto: ["plastic","steel","copper"],
		conduct: 1,
		insulate: true,
		tick: function(pixel) {
			pixel._channel = Math.floor(pixel.temp / 100);

			var colorBase = (pixel._channel + 3);
			if(colorBase < 0 || colorBase > 124) {
				pixel.color = "rgb(212,185,222)";
			} else {
				colorBase = colorBase.toString(5).padStart(3,"0").split("").map(x => parseInt(x) * 64);
				pixel.color = `rgb(${colorBase.join(",")})`
			};

			if(typeof(pixel.chargeCD) !== "undefined") {
				pixel.chargeCD = Math.min(pixel.chargeCD,5);
				pixel.chargeCD--;
				if(pixel.chargeCD <= 0) { delete pixel.chargeCD };
			};
			if(pixel.charge) {
				pixel.charge -= 0.25;
				if(pixel.charge <= 0) { delete pixel.charge };
			};
		},
		category: "machines",
		state: "solid",
	}
	
} else {
	if(!enabledMods.includes(libraryMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${libraryMod}" mods is required; and has been automatically inserted (reload for this to take effect).`)
};
