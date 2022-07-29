randomEvents.paint = function() {
	// set the color of a random circle to a random color
	var x = Math.floor(Math.random()*(width-1))+1;
	var y = Math.floor(Math.random()*(height-1))+1;
	var randomR = Math.floor(Math.random() * 256);
	var randomG = Math.floor(Math.random() * 256);
	var randomB = Math.floor(Math.random() * 256);
	var radius = Math.floor(Math.random()*5)+2;
	var rColor = "rgb(" + randomR + "," + randomG + "," + randomB + ")";
	var coords = circleCoords(x,y,radius);
	for (var i = 0; i < coords.length; i++) {
		var coord = coords[i];
		if (!outOfBounds(coord.x,coord.y) && !isEmpty(coord.x,coord.y)) {
			pixelMap[coord.x][coord.y].color = rColor;
		};
	};
};
