// This mod has been deprecated as of 2026-01-22.

/*
function reactPixels(pixel1,pixel2) {
	var r = elements[pixel1.element].reactions[pixel2.element];
	if (r.setting && settings[r.setting]===0) {
		return false;
	}
	var changeTemp = r.changeTemp ?? true
	// r has the attribute "y" which is a range between two y values
	// r.y example: [10,30]
	// return false if y is defined and pixel1's y is not in the range
	if (r.tempMin !== undefined && pixel1.temp < r.tempMin) {
		return false;
	}
	if (r.tempMax !== undefined && pixel1.temp > r.tempMax) {
		return false;
	}
	if (r.charged && !pixel1.charge) {
		return false;
	}
	if (r.chance !== undefined && Math.random() > r.chance) {
		return false;
	}
	if (r.y !== undefined && (pixel1.y < r.y[0] || pixel1.y > r.y[1])) {
		return false;
	}
	if (r.elem1 !== undefined) {
		// if r.elem1 is an array, set elem1 to a random element from the array, otherwise set it to r.elem1
		if (Array.isArray(r.elem1)) {
			var elem1 = r.elem1[Math.floor(Math.random() * r.elem1.length)];
		} else { var elem1 = r.elem1; }
		
		if (elem1 == null) {
			deletePixel(pixel1.x,pixel1.y);
		}
		else {
			changePixel(pixel1,elem1,changeTemp);
		}
	}
	if (r.charge1) { pixel1.charge = r.charge1; }
	if (r.temp1) { pixel1.temp += r.temp1; pixelTempCheck(pixel1); }
	if (r.color1) { // if it's a list, use a random color from the list, else use the color1 attribute
		pixel1.color = pixelColorPick(pixel1, Array.isArray(r.color1) ? r.color1[Math.floor(Math.random() * r.color1.length)] : r.color1);
	}
	if (r.attr1) { // add each attribute to pixel1
		for (var key in r.attr1) {
			pixel1[key] = r.attr1[key];
		}
	}
	if (r.elem2 !== undefined) {
		// if r.elem2 is an array, set elem2 to a random element from the array, otherwise set it to r.elem2
		if (Array.isArray(r.elem2)) {
			var elem2 = r.elem2[Math.floor(Math.random() * r.elem2.length)];
		} else { var elem2 = r.elem2; }

		if (elem2 == null) {
			deletePixel(pixel2.x,pixel2.y);
		}
		else {
			changePixel(pixel2,elem2,changeTemp);
		}
	}
	if (r.charge2) { pixel2.charge = r.charge2; }
	if (r.temp2) { pixel2.temp += r.temp2; pixelTempCheck(pixel2); }
	if (r.color2) { // if it's a list, use a random color from the list, else use the color2 attribute
		pixel2.color = pixelColorPick(pixel2, Array.isArray(r.color2) ? r.color2[Math.floor(Math.random() * r.color2.length)] : r.color2);
	}
	if (r.attr2) { // add each attribute to pixel2
		for (var key in r.attr2) {
			pixel2[key] = r.attr2[key];
		}
	}
	if (r.func) { r.func(pixel1,pixel2); }
	return r.elem1!==undefined || r.elem2!==undefined;
}
*/