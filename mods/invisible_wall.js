if(!settings) {
	settings = {}
}

if(!settings.bg) {
	settings.bg = "#000000"
}

elements.invisible_wall = {
	color: settings.bg,
	behavior: behaviors.WALL,
	tick: function(pixel) {
		var backgroundColor = hexToRGB(settings.bg);
		var rgbValue = "rgb("+backgroundColor.r+","+backgroundColor.g+","+backgroundColor.b+")";
		pixel.color = rgbValue;
	},
	insulate: true,
	hardness: 1,
	category: "special",
	state: "solid",
};
