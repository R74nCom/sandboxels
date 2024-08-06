renderPrePixel(function(ctx) {
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
})