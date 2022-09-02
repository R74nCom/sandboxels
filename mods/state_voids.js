//Deletion code mostly by R74n

elements.drain = {
	color: "#888888",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		for (var i = 0; i < coordsToCheck.length; i++) {
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].state === "liquid") {
					deletePixel(coord[0],coord[1]);
				}
			}
		}
	},
	category: "special",
	tempHigh: 1455.5,
	stateHigh: "molten_steel",
	state: "solid",
	density: 2000,
	breakInto: ["metal_scrap"],
	desc: "A drain that removes any liquid.",
	hardness: 0.8,
	insulate: true,

};

elements.vent = {
	color: "#e6e6e6",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		for (var i = 0; i < coordsToCheck.length; i++) {
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].state === "gas") {
					deletePixel(coord[0],coord[1]);
				}
			}
		}
	},
	category: "special",
	tempHigh: 1455.5,
	stateHigh: "molten_steel",
	state: "solid",
	density: 2000,
	breakInto: ["metal_scrap"],
	desc: "A vent that removes any gas. <span style=\"color: #eeaaaa;\">Remarkably sussy.<span>",
	hardness: 0.8,
	insulate: true,
}; elements.wall.movable = false; chuteExcludedElements = ["wall","drain","vent","chute","hole_of_miscellanea","drent","drute","vute","drolent","drolute","volute","void"]; elements.acid.ignore.push("drain"); elements.acid_gas.ignore.push("vent");

elements.chute = {
	color: "#636363",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		for (var i = 0; i < coordsToCheck.length; i++) {
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].state === "solid" && elements[newPixel.element].movable === true && !chuteExcludedElements.includes(newPixel.element)) {
					deletePixel(coord[0],coord[1]);
				}
			}
		}
	},
	category: "special",
	tempHigh: 1455.5,
	stateHigh: "molten_steel",
	state: "solid",
	density: 2000,
	breakInto: ["metal_scrap"],
	desc: "A chute that removes any powder.",
	movable: false,
	hardness: 0.8,
	insulate: true,
	
}; mainStateArray = ["solid","liquid","gas"];

elements.hole_of_miscellanea = {
	color: "#69606b",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		for (var i = 0; i < coordsToCheck.length; i++) {
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].movable && !mainStateArray.includes(elements[newPixel.element].state)) {
					deletePixel(coord[0],coord[1]);
				}
			}
		}
	},
	category: "special",
	tempHigh: 1455.5,
	stateHigh: "molten_steel",
	state: "solid",
	density: 2000,
	breakInto: ["metal_scrap"],
	desc: "A mysterious hole that removes the other states of matter.",
	movable: false,
	insulate: true,
};

elements.drent = {
	color: "#B7B7B7",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		for (var i = 0; i < coordsToCheck.length; i++) {
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].state === "liquid" || elements[newPixel.element].state === "gas") {
					deletePixel(coord[0],coord[1]);
				}
			}
		}
	},
	category: "special",
	tempHigh: 1455.5,
	stateHigh: "molten_steel",
	state: "solid",
	density: 2000,
	breakInto: ["metal_scrap"],
	desc: "A combined drain and vent that removes any liquid or gas. <span style=\"color: #ffcccc;\">Slightly sussy.<span>",
	hardness: 0.8,
	insulate: true,

};

elements.drute = {
	color: "#767676",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		for (var i = 0; i < coordsToCheck.length; i++) {
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].state === "liquid") {
					deletePixel(coord[0],coord[1]);
				} else if (elements[newPixel.element].state === "solid" && elements[newPixel.element].movable === true && !chuteExcludedElements.includes(newPixel.element)) {
					deletePixel(coord[0],coord[1]);
				}
			}
		}
	},
	category: "special",
	tempHigh: 1455.5,
	stateHigh: "molten_steel",
	state: "solid",
	density: 2000,
	breakInto: ["metal_scrap"],
	desc: "A combined drain and chute that removes any liquid or powder.",
	hardness: 0.8,
	insulate: true,

};

elements.vute = {
	color: "#9d8aa1",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		for (var i = 0; i < coordsToCheck.length; i++) {
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].state === "gas") {
					deletePixel(coord[0],coord[1]);
				} else if (elements[newPixel.element].state === "solid" && elements[newPixel.element].movable === true && !chuteExcludedElements.includes(newPixel.element)) {
					deletePixel(coord[0],coord[1]);
				}
			}
		}
	},
	category: "special",
	tempHigh: 1455.5,
	stateHigh: "molten_steel",
	state: "solid",
	density: 2000,
	breakInto: ["metal_scrap"],
	desc: "A vent that removes any gas. <span style=\"color: #eeaaaa;\">Somewhat sussy.<span>",
	hardness: 0.8,
	insulate: true,
};

elements.drolent = {
	color: "#b8afba",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		for (var i = 0; i < coordsToCheck.length; i++) {
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].state !== "solid") {
					deletePixel(coord[0],coord[1]);
				}
			}
		}
	},
	category: "special",
	tempHigh: 1455.5,
	stateHigh: "molten_steel",
	state: "solid",
	density: 2000,
	breakInto: ["metal_scrap"],
	desc: "A combined drain, hole, and vent removes anything but powders. <span style=\"color: #ffd7d7;\">Slightly sussy.<span>",
	hardness: 0.8,
	insulate: true,

};

elements.drolute = {
	color: "#786c7a",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		for (var i = 0; i < coordsToCheck.length; i++) {
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].state === "solid" && elements[newPixel.element].movable === true && !chuteExcludedElements.includes(newPixel.element)) {
					deletePixel(coord[0],coord[1]);
				} else {
					if (elements[newPixel.element].state !== "solid" && elements[newPixel.element].state !== "gas") {
						deletePixel(coord[0],coord[1]);
					}
				}
			}
		}
	},
	category: "special",
	tempHigh: 1455.5,
	stateHigh: "molten_steel",
	state: "solid",
	density: 2000,
	breakInto: ["metal_scrap"],
	desc: "A combined drain, hole, and chute removes anything but gases.",
	hardness: 0.8,
	insulate: true,

};

elements.volute = {
	color: "#b8afba",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var coordsToCheck = [
			[pixel.x-1,pixel.y],
			[pixel.x+1,pixel.y],
			[pixel.x,pixel.y-1],
			[pixel.x,pixel.y+1],
		];
		for (var i = 0; i < coordsToCheck.length; i++) {
			var coord = coordsToCheck[i];
			if (!isEmpty(coord[0],coord[1],true)) {
				var newPixel = pixelMap[coord[0]][coord[1]];
				if (elements[newPixel.element].state === "solid" && elements[newPixel.element].movable === true && !chuteExcludedElements.includes(newPixel.element)) {
					deletePixel(coord[0],coord[1]);
				} else {
					if (elements[newPixel.element].state !== "solid" && elements[newPixel.element].state !== "liquid") {
						deletePixel(coord[0],coord[1]);
					}
				}
			}
		}
	},
	category: "special",
	tempHigh: 1455.5,
	stateHigh: "molten_steel",
	state: "solid",
	density: 2000,
	breakInto: ["metal_scrap"],
	desc: "A combined vent, hole, and chute removes anything but liquids.",
	hardness: 0.8,
	insulate: true,

};

//The all-combination is called void.

if(enabledMods.includes("mods/more_breaking.js")) {
    elements.drain.breakInto = ["steel_scrap"];
    elements.vent.breakInto = ["steel_scrap"];
    elements.chute.breakInto = ["steel_scrap"];
    elements.hole_of_miscellanea.breakInto = ["steel_scrap"];
};

if(enabledMods.includes("mods/fey_and_more.js")) {
    elements.drain.breakInto.push("magic");
    elements.vent.breakInto.push("magic");
    elements.chute.breakInto.push("magic");
    elements.hole_of_miscellanea.breakInto.push("magic");
};
