clearInterval(tickInterval);

tick = function() {
	// If mouseIsDown, do mouseAction
	if (mouseIsDown && !shaping) {
		mouseAction(null,mousePos.x,mousePos.y);
	}
	// Get the canvas
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	// Clear the canvas
	if (!settings["bg"]) {ctx.clearRect(0, 0, canvas.width, canvas.height)}
	else {
		if(settings["bg"] instanceof Array) {
			settings.bgAngle ??= 0;
			var angle = (settings.bgAngle) * Math.PI / 180;
			ctx.fillStyle = ctx.createLinearGradient(
				0,
				0,
				canvas.width * Math.cos(angle) + 0,
				canvas.height * Math.sin(angle)
			);
			var colors = settings["bg"];
			for(i = 0; i < colors.length; i++) {
				var color = colors[i];
				var position = i / (colors.length - 1);
				ctx.fillStyle.addColorStop(position,color);
			};
		} else {
			ctx.fillStyle = settings["bg"];
		};
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	if (!paused && settings.events) {
		doRandomEvents();
	}

	drawPixels();

	if (shaping) {
		if (shaping === 1) { // Draw a white line from shapeStart.x to shapeStart.y
			ctx.beginPath();
			ctx.strokeStyle = "white";
			ctx.lineWidth = 2;
			ctx.moveTo(shapeStart.x*pixelSize+pixelSizeHalf, shapeStart.y*pixelSize+pixelSizeHalf);
			ctx.lineTo(mousePos.x*pixelSize+pixelSizeHalf, mousePos.y*pixelSize+pixelSizeHalf);
			ctx.stroke();
		}
	}


	//ticks ++;
}

tickInterval = setInterval(tick, 1000/tps);