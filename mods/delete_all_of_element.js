elements.delete_all_of_element = {
	name: "delete all of element",
	color: ["#a7a7a7", "#a7a7a7", "#a7a7a7", "#a7a7a7", "#000000", "#000000", "#000000", "#000000"],
	tool: function(pixel) {
		for (var i = 0; i <= width; i++) {
			for (var j = 0; j <= height; j++) {
				if (!isEmpty(i,j,true)) {
					if(pixelMap[i][j].element == pixel.element) {
						deletePixel(i,j)
					}
				}
			}
		}
	},
	category: "edit",
	excludeRandom: true,
};
