//base syntax by sightnado
/*elements.warm = {
    color: "#7fff7f",
    tool: function(pixel) {
        pixel.temp = 20;
		pixelTempCheck(pixel)
    },
    category: "tools",
};*/
//warm is redundant due to room_temp
elements.ultraheat = {
    color: ["#ff0000", "#ffbf4f", "#ff0000", "#ffbf4f", "#ff0000", "#ffbf4f"],
    tool: function(pixel) {
        if(shiftDown) { pixel.temp += (350 * (1 + shiftDown)) } else { pixel.temp += 350 }
		pixelTempCheck(pixel)
    },
    category: "tools",
};
elements.ultracool = {
    color: ["#0000ff", "#4fbfff", "#0000ff", "#4fbfff", "#0000ff", "#4fbfff"],
    tool: function(pixel) {
        if(shiftDown) { pixel.temp -= (350 * (1 + shiftDown)) } else { pixel.temp -= 350 }
		pixelTempCheck(pixel)
    },
    category: "tools",
};
elements.na_ntemp = {
    color: ["#000000", "#ff00ff", "#000000", "#ff00ff"],
    tool: function(pixel) {
        pixel.temp = NaN;
		pixelTempCheck(pixel)
    },
    category: "tools",
};
elements.inftemp = {
    color: ["#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000", "#ffffff"],
    tool: function(pixel) {
        pixel.temp = Infinity;
		pixelTempCheck(pixel)
    },
    category: "tools",
};
