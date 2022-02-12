elements.superheat = {
    color: "#ff2f2f",
    tool: function(pixel) {
        pixel.temp += 10;
		pixelTempCheck(pixel)
    },
    category: "tools",
};
elements.supercool = {
    color: "#2f2fff",
    tool: function(pixel) {
        pixel.temp += -10;
		pixelTempCheck(pixel)
    },
    category: "tools",
};
elements.hyperheat = {
    color: "#ff5f5f",
    tool: function(pixel) {
        pixel.temp += 50;
		pixelTempCheck(pixel)
    },
    category: "tools",
};
elements.hypercool = {
    color: "#5f5fff",
    tool: function(pixel) {
        pixel.temp += -50;
		pixelTempCheck(pixel)
    },
    category: "tools",
};
elements.absolutezero = {
    color: "#d1f7ff",
    tool: function(pixel) {
        pixel.temp = -273.15;
		pixelTempCheck(pixel)
    },
    category: "tools",
};
