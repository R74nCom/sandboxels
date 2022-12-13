// Sandboxels: Conveyance Mod, v1.0
// Author: MelecieDiancie

elements.r_conveyor = {
	name: "Right Conveyor",
    color: "#2a2a36",
	colorOn: "#3b3b4a",
	state: "solid",
    category: "machines",
	conduct: 1,
	tick: function(pixel) {
		doHeat(pixel)
		doBurning(pixel)
		doElectricity(pixel)
		
		let pixelAbove = pixelMap[pixel.x][pixel.y-1]
		
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixel.charge > 0.5 && elements[pixelAbove.element].movable == true ) {
			tryMove(pixelAbove,pixel.x+1,pixel.y-1)
		}
	}
};
elements.l_conveyor = {
	name: "Left Conveyor",
    color: "#2a2a36",
	colorOn: "#3b3b4a",
	state: "solid",
    category: "machines",
	conduct: 1,
	tick: function(pixel) {
		doHeat(pixel)
		doBurning(pixel)
		doElectricity(pixel)
		
		let pixelAbove = pixelMap[pixel.x][pixel.y-1]
		
		if (!isEmpty(pixel.x, pixel.y-1, true) && pixel.charge > 0.5 && elements[pixelAbove.element].movable == true ) {
			tryMove(pixelAbove,pixel.x-1,pixel.y-1)
		}
	}
};
elements.r_autoconveyor = {
	name: "Right Autoconveyor",
    color: "#3b3b4a",
	state: "solid",
    category: "machines",
	tick: function(pixel) {
		doHeat(pixel)
		doBurning(pixel)
		doElectricity(pixel)
		
		let pixelAbove = pixelMap[pixel.x][pixel.y-1]
		
		if (!isEmpty(pixel.x, pixel.y-1, true) && elements[pixelAbove.element].movable == true ) {
			tryMove(pixelAbove,pixel.x+1,pixel.y-1)
		}
	}
};
elements.l_autoconveyor = {
	name: "Left Autoconveyor",
    color: "#3b3b4a",
	state: "solid",
    category: "machines",
	tick: function(pixel) {
		doHeat(pixel)
		doBurning(pixel)
		doElectricity(pixel)
		
		let pixelAbove = pixelMap[pixel.x][pixel.y-1]
		
		if (!isEmpty(pixel.x, pixel.y-1, true) && elements[pixelAbove.element].movable == true ) {
			tryMove(pixelAbove,pixel.x-1,pixel.y-1)
		}
	}
};

runAfterLoad(function() {
	for (element in elements) {
		let behavior = elements[element].behavior
		let movable = false
		for (line in behavior) { // check if element has a M1 or M2 in their behavior
			line = behavior[line]
			if (line.includes("M1") || line.includes("M2")) {
				movable = true
			}
			else {
			}
		}
		
		if (movable != false) { // if element has M1 or M2, set movable to true, makes them movable by conveyors
			elements[element].movable = true
		}
		
	}
});
