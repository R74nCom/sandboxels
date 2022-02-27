var incrementt = 0;

var interval = setInterval( increment, 500/30);

function increment(){
	incrementt = incrementt % (Math.PI*8.8) + (Math.PI/30);
}

function drawPixels(forceTick=false) {
	// newCurrentPixels = shuffled currentPixels
	var newCurrentPixels = currentPixels.slice();
	newCurrentPixels.sort(function() {return 0.5 - Math.random()});
	for (var i = 0; i < newCurrentPixels.length; i++) {
		pixel = newCurrentPixels[i];
		//if (pixelMap[pixel.x][pixel.y] == undefined || currentPixels.indexOf(pixel) == -1) {continue}
		if (pixel.del) {continue}
		if ((!paused) || forceTick) {
			if (elements[pixel.element].tick) { // Run tick function if it exists
				elements[pixel.element].tick(pixel);
			}
			if (elements[pixel.element].behavior) { // Parse behavior if it exists
				pixelTick(pixel);
			}
		};
	}
	// Draw the current pixels
		var canvas = document.getElementById("game");
		var ctx = canvas.getContext("2d");
		for (var i = 0; i < newCurrentPixels.length; i++) {
			pixel = newCurrentPixels[i];
			if (pixelMap[pixel.x][pixel.y] == undefined) {continue}
			if (view===null) {
				ctx.fillStyle = pixel.color;
			}
			else if (view === "thermal") {
				// set the color to pixel.temp, from hottest at 0 hue to coldest 225 hue, with the minimum being -273, max being 6000
				var temp = pixel.temp;
				if (temp < -273) {temp = -273}
				if (temp > 6000) {temp = 6000}
				var hue = 225 - (temp/6000)*225;
				if (hue < 0) {hue = 0}
				if (hue > 225) {hue = 225}
				ctx.fillStyle = "hsl("+hue+",100%,50%)";
			}
			ctx.fillRect(pixel.x*pixelSize+(19.8*Math.tan((pixel.y+incrementt	)/4.4)), pixel.y*pixelSize+(21.6*Math.tan((pixel.x+incrementt)/4.4)), pixelSize, pixelSize);
			if (pixel.charge) { // Yellow glow on charge
				if (!elements[pixel.element].colorOn) {
					ctx.fillStyle = "rgba(255,255,0,0.5)";
					ctx.fillRect(pixel.x*pixelSize+(18*Math.sec((pixel.y+incrementt)/4.4)), pixel.y*pixelSize+(9*Math.sec((pixel.x+incrementt)/4.4)), pixelSize, pixelSize);
				}
			}
		}
	if ((!paused) || forceTick) {pixelTicks++};
}
