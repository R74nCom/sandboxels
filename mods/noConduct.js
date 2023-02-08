function doElectricity(pixel) {
	var info = elements[pixel.element];
	if (pixel.charge) {
		// Check each adjacent pixel, if that pixel's charge is false, set it to the same charge
		for (var i = 0; i < adjacentCoords.length; i++) {
			var x = pixel.x+adjacentCoords[i][0];
			var y = pixel.y+adjacentCoords[i][1];
			if (!isEmpty(x,y,true)) {
				var newPixel = pixelMap[x][y];
				var con = elements[newPixel.element].conduct;
				if (con == undefined) {continue}
				if (info.noConduct?.length && info.noConduct.includes(newPixel.element)) {continue};
				if (Math.random() < con) { // If random number is less than conductivity
					if (!newPixel.charge && !newPixel.chargeCD) {
						newPixel.charge = 1;
						if (elements[newPixel.element].colorOn) {
							newPixel.color = pixelColorPick(newPixel);
						}
					}
				}
				else if (elements[newPixel.element].insulate != true) { // Otherwise heat the pixel (Resistance simulation)
					newPixel.temp += pixel.charge/4;
					pixelTempCheck(newPixel);
				}
			}
		}
		pixel.charge -= 0.25;
		if (pixel.charge <= 0) {
			delete pixel.charge;
			pixel.chargeCD = 4;
		}
	}
	// Lower charge cooldown
	else if (pixel.chargeCD) {
		pixel.chargeCD -= 1;
		if (pixel.chargeCD <= 0) {
			delete pixel.chargeCD;
			if (info.colorOn) {
				pixel.color = pixelColorPick(pixel);
			}
		}
	}
}
