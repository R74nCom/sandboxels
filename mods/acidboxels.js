runAfterLoad(function() {
	drawPixels = function(forceTick=false) {
		// newCurrentPixels = shuffled currentPixels
		var newCurrentPixels = currentPixels.slice();
		newCurrentPixels.sort(function() {return 0.5 - Math.random()});
		for (var i = 0; i < newCurrentPixels.length; i++) {
			pixel = newCurrentPixels[i];
			//if (pixelMap[pixel.x][pixel.y] == undefined || currentPixels.indexOf(pixel) == -1) {continue}
			if (pixel.del) {continue}
			if ((!paused) || forceTick) {pixelTick(pixel);};
		}
		// Draw the current pixels
		if (!hiding) {
			var canvas = document.getElementById("game");
			var ctx = canvas.getContext("2d");
			for (var i = 0; i < newCurrentPixels.length; i++) {
				pixel = newCurrentPixels[i];
				if (pixelMap[pixel.x][pixel.y] == undefined) {continue}
				ctx.fillStyle = pixel.color;
				ctx.fillRect(pixel.x*pixelSize+(18*Math.sin((pixel.y)/4.4)), pixel.y*pixelSize+(18*Math.sin((pixel.x)/4.4)), pixelSize, pixelSize);
				if (pixel.charge) { // Yellow glow on charge
					if (!elements[pixel.element].colorOn) {
						ctx.fillStyle = "rgba(255,255,0,0.5)";
						ctx.fillRect(pixel.x*pixelSize+(18*Math.sin((pixel.y)/4.4)), pixel.y*pixelSize+(18*Math.sin((pixel.x)/4.4)), pixelSize, pixelSize);
					}
				}
			}
		}
		if ((!paused) || forceTick) {pixelTicks++};
	}
});
