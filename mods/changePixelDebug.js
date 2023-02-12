doLog = true;
oldChangePixel = changePixel;
function changePixel(pixel,element,changetemp=true) {
	if(!elements[element]) {
		if(doLog) { console.error(`Something tried to change a pixel (${pixel.x},${pixel.y}) to nonexistent element "${element}"`) };
	};
	return false;
	changePixel(pixel,element,changetemp);
};