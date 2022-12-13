function randomOfTwo(option1,option2,leftChance=0.5) {
	if(Math.random() < leftChance) {
		return option1;
	} else {
		return option2;
	};
};

elements.xdct = {
	name: "x-dependent change test",
	color: "#cc33cc",
	hardness: 0.5,
	density: 2400,
	behavior: behaviors.POWDER,
	state: "solid",
	category: "solids",
	tick: function(pixel) {
		var halfWidth = width / 2;
		var halfHeight = height / 2;
		var transitionLeftEdge = 4/5 * halfWidth;
		var transitionRightEdge = 6/5 * halfWidth;
		var x = pixel.x;
		if(x < transitionLeftEdge) { //To the left
			changePixel(pixel,"sand");
		} else if(x > transitionRightEdge) { //To the right
			changePixel(pixel,"dirt");
		} else { //Other (e.g. equal to)
			var distanceFromLeftEdge = x - transitionLeftEdge;
			var distanceBetweenEdges = transitionRightEdge - transitionLeftEdge;
			var relativePosition = distanceFromLeftEdge / distanceBetweenEdges;
			changePixel(pixel,randomOfTwo("dirt","sand",relativePosition));
		};
	},
};