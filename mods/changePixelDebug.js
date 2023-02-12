doLog = true;
oldChangePixel = changePixel;
changePixel = function(pixel,element,changetemp=true) {
	if(typeof(elements[element]) == "undefined") {
		if(doLog) { console.error(`Something tried to change a pixel (${pixel.x},${pixel.y}) to nonexistent element "${element}"`) };
		return false;
	};
	oldChangePixel(pixel,element,changetemp);
};
