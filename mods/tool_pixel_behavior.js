function marasi(number) {
	return Math.min(255,Math.round(Math.abs(Math.sin(number) * 255)));
};

function _rgbHexCatcher(color) { //Hex triplet to rgb(), while rgb() is untouched
		//console.log("Logged color for _rgbHexCatcher: " + color);
								 //I have no idea if this runs before or after parsing hex triplets to rgb() values, so I'm going to handle both (by making everything rgb() and then making it hex at the end)
	if(typeof(color) === "undefined") {
		//console.log("Warning: An element has an undefined color. Unfortunately, due to how the code is structured, I can't say which one.");
		color = "#FF00FF";
	};
	if(color.length < 10) {
		//console.log("Short string detected, likely a hex triplet");
		if(!color.startsWith("#")) {
			color = "#" + color;
		};
		var object = hexToRGB(color);
		return `rgb(${object.r},${object.g},${object.b})`
	} else {
		//console.log("Non-triplet detected");
		return color;
	};
}; //color function

mooreDonutCoords = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]; //Moore neighborhood (includes corners) minus center, as opposed to the von Neumann neighborhood which is the + shape.

elements.lookup.tick = function(pixel) {
	//console.log(`### Tick ${pixelTicks} ###`);
	//console.log(`Storing coordinates`);
	var pX = pixel.x;
	var pY = pixel.y;
	//console.log(`Position (${pX},${pY})`);
	//console.log(`Iterating`);
	var neighborArray = [];
	for(i = 0; i < mooreDonutCoords.length; i++) {
		//console.log(`i: ${i}`);
		//console.log(`Initialized array`);
		var coord = mooreDonutCoords[i];
		//console.log(`Offset pair: ${coord}`);
		var oX = coord[0];
		var oY = coord[1];
		//console.log(`Stored offset pair`);
		var nX = pX+oX;
		var nY = pY+oY;
		//console.log(`Final coordinates: (${nX},${nY}) (index ${i})`);
		if(isEmpty(nX,nY,true)) {
			//console.log(`Skipping empty pixel (${nX},${nY})`);
			continue;
		} else {
			//console.log(`Found pixel at (${nX},${nY})`);
			var newPixel = pixelMap[nX][nY];
			//console.log(`Pixel stored`);
			var newElement = newPixel.element;
			//console.log(`Element is ${newElement}, running exclusion check;`);
			if(newElement !== pixel.element) { //exclude self
				//console.log(`Element is different, storing in array;`);
				neighborArray.push(newElement); //build array of valid neighbors
			};
			//console.log("Finding iteration done");
		};
		//console.log("End of for block (not loop)");
	};
	//console.log(`Loop done: ${neighborArray}`);
	if(neighborArray.length > 0) {
		var changeToElement = neighborArray[Math.floor(Math.random() * neighborArray.length)];
		changePixel(pixel,changeToElement);
	};
};

elements.paint.tick = function(pixel) {
	pixel.color = _rgbHexCatcher(currentColor);
	var pX = pixel.x;
	var pY = pixel.y;
	for(i = 0; i < mooreDonutCoords.length; i++) {
		var coord = mooreDonutCoords[i];
		var oX = coord[0];
		var oY = coord[1];
		var nX = pX+oX;
		var nY = pY+oY;
		if(isEmpty(nX,nY,true)) {
			continue;
		} else {
			var newPixel = pixelMap[nX][nY];
			var newElement = newPixel.element;
			if(newElement !== pixel.element) { //exclude self
				newPixel.color = pixel.color; //change color of other pixel
			};
		};
	};
};

elements.unpaint.tick = function(pixel) {
	var pX = pixel.x;
	var pY = pixel.y;
	for(i = 0; i < mooreDonutCoords.length; i++) {
		var coord = mooreDonutCoords[i];
		var oX = coord[0];
		var oY = coord[1];
		var nX = pX+oX;
		var nY = pY+oY;
		if(isEmpty(nX,nY,true)) {
			continue;
		} else {
			var newPixel = pixelMap[nX][nY];
			var newElement = newPixel.element;
			if(newElement !== pixel.element) { //slow for self, see below
				newPixel.color = pixelColorPick(newPixel); //change color of other pixel
			} else {
				if(pixelTicks % 10 === 0) { //every 10 ticks because unpaint shouldn't be paintable, but it shouldn't be a seizure machine either
					newPixel.color = pixelColorPick(newPixel);
				};
			};
		};
	};
};

if(typeof(elements.sandreplacer) !== "undefined") {
	elements.sandreplacer.behavior = [
		"CH:sand|CH:sand|CH:sand",
		"CH:sand|CH:sand|CH:sand",
		"CH:sand|CH:sand|CH:sand"
	];
};

if(typeof(elements.delete_all_of_element) !== "undefined") {
	elements.delete_all_of_element.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				//console.log(`stored adjacent element ${newElement} at (${nX},${nY})`);
				if(newElement !== pixel.element) { //exclude self
					var coordCircle = circleCoords(pX,pY,7);
					//console.log(`got coordinate circle centered at (${pX},${pY}) with ${coordCircle.length} ${coordCircle.length === 1 ? "pixel" : "pixels"}`);
					for(j = 0; j < coordCircle.length; j++) {
						//console.log(`itting through circle, index ${j}`);
						var coordCircleCoord = coordCircle[j];
						var cNX = coordCircleCoord.x;
						var cNY = coordCircleCoord.y;
						//console.log(`circle coords stored (${cNX},${cNY})`);
						if(isEmpty(cNX,cNY,true)) {
							continue;
							//console.log("skipped empty pixel");
						} else {
							var circleNewPixel = pixelMap[cNX][cNY];
							var circleNewElement = circleNewPixel.element;
							//console.log(`found pixel of element ${circleNewElement}`);
							if(circleNewElement === newElement && circleNewElement !== pixel.element) { //exclude self, match the stored element from before
								deletePixel(cNX,cNY);
							};
						};
					};
				};
			};
		};
	};
};

elements.room_temp.tick = function(pixel) {
	var pX = pixel.x;
	var pY = pixel.y;
	for(i = 0; i < mooreDonutCoords.length; i++) {
		var coord = mooreDonutCoords[i];
		var oX = coord[0];
		var oY = coord[1];
		var nX = pX+oX;
		var nY = pY+oY;
		if(isEmpty(nX,nY,true)) {
			continue;
		} else {
			var newPixel = pixelMap[nX][nY];
			newPixel.temp = 20; //to room temp
			pixelTempCheck(pixel);
		};
	};
};

elements.uncharge.tick = function(pixel) {
	var pX = pixel.x;
	var pY = pixel.y;
	for(i = 0; i < mooreDonutCoords.length; i++) {
		var coord = mooreDonutCoords[i];
		var oX = coord[0];
		var oY = coord[1];
		var nX = pX+oX;
		var nY = pY+oY;
		if(isEmpty(nX,nY,true)) {
			continue;
		} else {
			var newPixel = pixelMap[nX][nY];
			if(newPixel.charge) { //remove charge properties
				delete pixel.charge;
			};
			if(newPixel.chargeCD) {
				delete pixel.chargeCD;
			};
		};
	};
};

elements.unburn.tick = function(pixel) {
	var pX = pixel.x;
	var pY = pixel.y;
	for(i = 0; i < mooreDonutCoords.length; i++) {
		var coord = mooreDonutCoords[i];
		var oX = coord[0];
		var oY = coord[1];
		var nX = pX+oX;
		var nY = pY+oY;
		if(isEmpty(nX,nY,true)) {
			continue;
		} else {
			var newPixel = pixelMap[nX][nY];
			var newElement = newPixel.element;
			if(newElement === "fire") { //fire to smoke
				changePixel(newPixel,"smoke");
			};
			if(newPixel.burning) { //remove burning properties
				delete pixel.burning;
			};
			if(newPixel.burnStart) {
				delete pixel.burnStart;
			};
		};
	};
};

elements.smash.tick = function(pixel) {
	var pX = pixel.x;
	var pY = pixel.y;
	for(i = 0; i < mooreDonutCoords.length; i++) {
		var coord = mooreDonutCoords[i];
		var oX = coord[0];
		var oY = coord[1];
		var nX = pX+oX;
		var nY = pY+oY;
		if(isEmpty(nX,nY,true)) {
			continue;
		} else {
			var newPixel = pixelMap[nX][nY];
			var newElement = newPixel.element;
			if (elements[newElement].breakInto) {
				var breakInto = elements[pixel.element].breakInto; //edited vanilla code
				// if breakInto is an array, pick one
				if (Array.isArray(breakInto)) {
					breakInto = breakInto[Math.floor(Math.random() * breakInto.length)];
				}
				changePixel(pixel,breakInto);
			};
		};
	};
};

elements.cook.behavior = [
	"HT:0.5|HT:0.5|HT:0.5",
	"HT:0.5|HT:0.5|HT:0.5",
	"HT:0.5|HT:0.5|HT:0.5",
];

if(typeof(elements.ultraheat) !== "undefined") {
	elements.ultraheat.behavior = [
		"HT:350|HT:350|HT:350",
		"HT:350|HT:350|HT:350",
		"HT:350|HT:350|HT:350",
	];
};

if(typeof(elements.ultracool) !== "undefined") {
	elements.ultracool.behavior = [
		"CO:350|CO:350|CO:350",
		"CO:350|CO:350|CO:350",
		"CO:350|CO:350|CO:350",
	];
};

elements.incinerate.behavior = [
	"HT:10000|HT:10000|HT:10000",
	"HT:10000|HT:10000|HT:10000",
	"HT:10000|HT:10000|HT:10000",
];

if(typeof(elements.na_ntemp) !== "undefined") {
	elements.na_ntemp.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				newPixel.temp = NaN;
			};
		};
	};
};

if(typeof(elements.inftemp) !== "undefined") {
	elements.inftemp.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				newPixel.temp = Infinity;
			};
		};
	};
};

if(typeof(elements.superheat) !== "undefined") {
	elements.superheat.behavior = [
		"HT:10|HT:10|HT:10",
		"HT:10|HT:10|HT:10",
		"HT:10|HT:10|HT:10",
	];
};

if(typeof(elements.supercool) !== "undefined") {
	elements.supercool.behavior = [
		"CO:10|CO:10|CO:10",
		"CO:10|CO:10|CO:10",
		"CO:10|CO:10|CO:10",
	];
};

if(typeof(elements.hyperheat) !== "undefined") {
	elements.hyperheat.behavior = [
		"HT:50|HT:50|HT:50",
		"HT:50|HT:50|HT:50",
		"HT:50|HT:50|HT:50",
	];
};

if(typeof(elements.hypercool) !== "undefined") {
	elements.hypercool.behavior = [
		"CO:50|CO:50|CO:50",
		"CO:50|CO:50|CO:50",
		"CO:50|CO:50|CO:50",
	];
};

if(typeof(elements.absolutezero) !== "undefined") {
	elements.absolutezero.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				newPixel.temp = -273.15;
			};
		};
	};
};

if(typeof(elements.antigrav) !== "undefined") {
	elements.antigrav.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				newPixel.r = 2;
			};
		};
	};
};

if(typeof(elements.normalgrav) !== "undefined") {
	elements.normalgrav.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				newPixel.r = 0;
			};
		};
	};
};

if(typeof(elements.leftgrav) !== "undefined") {
	elements.leftgrav.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				newPixel.r = 3;
			};
		};
	};
};

if(typeof(elements.rightgrav) !== "undefined") {
	elements.rightgrav.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				newPixel.r = 1;
			};
		};
	};
};

if(typeof(elements.burn) !== "undefined") {
	elements.burn.burnTime = Infinity;
	elements.burn.burn = 100;
	elements.burn.burnInto = "burn";
	elements.burn.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(newElement === "smoke") { //smoke to fire
					changePixel(newPixel,"smoke");
				};
				newPixel.burning = true;
			};
		};
	};
};

if(typeof(elements.cursed_shock) !== "undefined") {
	elements.cursed_shock.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				newPixel.charge = 2;
				if(newPixel.chargeCD) {
					delete newPixel.chargeCD;
				};
			};
		};
	};
};

if(typeof(elements.offset_fourth_y) !== "undefined") {
	elements.offset_fourth_y.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(newElement !== pixel.element) { //self-exclude
					tryMove(newPixel,nX,nY+0.25)
				};
			};
		};
	};
};

if(typeof(elements.offset_half_y) !== "undefined") {
	elements.offset_half_y.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(newElement !== pixel.element) { //self-exclude
					tryMove(newPixel,nX,nY+0.5)
				};
			};
		};
	};
};

if(typeof(elements.offset_three_fourth_y) !== "undefined") {
	elements.offset_three_fourth_y.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(newElement !== pixel.element) { //self-exclude
					tryMove(newPixel,nX,nY+0.75)
				};
			};
		};
	};
};

if(typeof(elements.find_toggle) !== "undefined") {
	if(typeof(elements.find_toggle) !== "find") {
		elements.find_toggle.behavior = behaviors.WALL;
		elements.find_toggle.tick = function(pixel) {
			pixel.color = "rgb(255," + marasi(pixelTicks / 10) + ",0)";
		};
	};
};

if(typeof(elements.replace) !== "undefined") {
	elements.replace.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(newElement === replaceFrom) {
					changePixel(newPixel,replaceTo);
				};
			};
		};
	};
};

if(typeof(elements.alt_replace) !== "undefined") {
	elements.alt_replace.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(newElement === replaceFrom) {
					newPixel.element = replaceTo;
				};
			};
		};
	};
};

if(typeof(elements.alt_alt_replace) !== "undefined") {
	elements.alt_alt_replace.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(newElement === replaceFrom) {
					newPixel.element = replaceTo;
					newPixel.color = pixelColorPick(newPixel);
				};
			};
		};
	};
};

if(typeof(elements.change) !== "undefined") {
	elements.change.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(newElement !== pixel.element) {
					changePixel(newPixel,changeTo);
				};
			};
		};
	};
};

if(typeof(elements.alt_change) !== "undefined") {
	elements.alt_change.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(newElement !== pixel.element) {
					newPixel.element = changeTo;
				};
			};
		};
	};
};

if(typeof(elements.alt_alt_change) !== "undefined") {
	elements.alt_alt_change.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(newElement !== pixel.element) {
					newPixel.element = changeTo;
					newPixel.color = pixelColorPick(newPixel);
				};
			};
		};
	};
};

if(typeof(elements.prop) !== "undefined") {
	elements.prop.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				var newElement = newPixel.element;
				if(propProperty === "element") {
					if(newElement !== pixel.element) { //self exclude if element is the change
						newPixel[propProperty] = propValue;
						newPixel.temp = (elements[propValue].temp || newPixel.temp);
					};
				} else {
					newPixel[propProperty] = propValue;
				};
			};
		};
	};
};

if(typeof(elements.number_adjuster) !== "undefined") {
	elements.number_adjuster.tick = function(pixel) {
		var pX = pixel.x;
		var pY = pixel.y;
		for(i = 0; i < mooreDonutCoords.length; i++) {
			var coord = mooreDonutCoords[i];
			var oX = coord[0];
			var oY = coord[1];
			var nX = pX+oX;
			var nY = pY+oY;
			if(isEmpty(nX,nY,true)) {
				continue;
			} else {
				var newPixel = pixelMap[nX][nY];
				if(numberAdjusterProperty !== "element") {			
					//console.log(numberAdjusterValue);
					if(numberAdjusterMode === "set") {
						newPixel[numberAdjusterProperty] = numberAdjusterValue;
					} else if(numberAdjusterMode === "add") {
						if(typeof(newPixel[numberAdjusterProperty]) === "undefined") {
							newPixel[numberAdjusterProperty] = 0;
						};
						newPixel[numberAdjusterProperty] += numberAdjusterValue;
					};
					pixelTempCheck(newPixel);
				};
			};
		};
	};
};

/*elements.pointer.behavior = [
	"XX|XX|XX","XX|CH:cursed_shock|XX","XX|XX|XX"
];*/
