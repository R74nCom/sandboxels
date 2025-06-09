elements.ultra_heat = {
	color: "#ff0000",
	category: "Temperature+",
    tool: function(pixel) {
        pixel.temp += 500;
    }
}

elements.infinite_heat = {
	color: "#ff0000",
	category: "Temperature+",
    tool: function(pixel) {
        pixel.temp += Infinity;
    }
}

elements.ultra_freeze = {
	color: "#00ccff",
	category: "Temperature+",
    tool: function(pixel) {
        pixel.temp -= 500;
    }
}

elements.infinite_freeze = {
	color: "#00ccff",
	category: "Temperature+",
    tool: function(pixel) {
        pixel.temp -= Infinity;
    }
}

elements.absolute_zero = {
	color: "#66ccff",
	category: "Temperature+",
    tool: function(pixel) {
        pixel.temp = -273.15;
    }
}

elements.neutralize = {
	color: "#cccccc",
	category: "Temperature+",
    tool: function(pixel) {
        pixel.temp = 20;
    }
}
