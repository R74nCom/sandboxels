defaultColorOffset = 15;

pixelColorPick = function(pixel,customColor=null,maxOffset=null) {
	var element = pixel.element;
	var elementInfo = elements[element];
	//if (elementInfo.behavior instanceof Array) {
	
	if (pixel.charge && elementInfo.colorOn) {
		customColor = elementInfo.colorOn;
	}
	if (customColor != null) {
		if (Array.isArray(customColor)) {
			customColor = customColor[Math.floor(Math.random() * customColor.length)];
		}
		if (customColor.startsWith("#")) {
			customColor = hexToRGB(customColor);
		}
		var rgb = customColor;
	}
	else {
		var rgb = elements[element].colorObject; // {r, g, b}
		// If rgb is an array, choose a random item
		if (Array.isArray(rgb)) {
			rgb = rgb[Math.floor(Math.random() * rgb.length)];
		}
	}
	// Randomly darken or lighten the RGB color
		//try maxOffset parameter, then info maxColorOffset, then default 15
	var offsetAmount; 
	if(maxOffset !== null) {
		offsetAmount = maxOffset;
	} else {
		offsetAmount = elementInfo?.maxColorOffset ?? defaultColorOffset;
	};
	
	var maxColorOffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * offsetAmount);
	var r = rgb.r + maxColorOffset;
	var g = rgb.g + maxColorOffset;
	var b = rgb.b + maxColorOffset;
	// Make sure the color is within the RGB range
	r = Math.max(0, Math.min(255, r));
	g = Math.max(0, Math.min(255, g));
	b = Math.max(0, Math.min(255, b));
	var color = "rgb("+r+","+g+","+b+")";
	
	/*}
	else {
		var color = elementInfo.color;
		if (Array.isArray(color)) {
			color = color[Math.floor(Math.random() * color.length)];
		}
	}*/
	return color;
}
