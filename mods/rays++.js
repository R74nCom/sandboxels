elements.shock_ray = {
    color: ["#fffba6", "#8c8279"],
    tick: function (pixel) {
        var x = pixel.x;
        for (var y = pixel.y + 1; y < height; y++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.1) { continue }
                createPixel("electric", x, y);
            }
            else {
                if (elements[pixelMap[x][y].element].id === elements.flash.id) { continue }
                if (elements[pixelMap[x][y].element].id === elements.god_ray.id) { break }
                if (!elements[pixelMap[x][y].element].isGas && isEmpty(x, y - 1)) {
                    createPixel("electric", x, y - 1);
                }
                if (Math.random() > 0.1) { continue }
                elements.bless.tool(pixelMap[x][y])
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
	temp: 20,
	category: "energy",
	state: "gas",
	excludeRandom: true,
	noMix: true
};
elements.magic_ray = {
    color: ["#a270ff","#f2d9ff"],
    tick: function (pixel) {
        var x = pixel.x;
        for (var y = pixel.y + 1; y < height; y++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.1) { continue }
                createPixel("magic", x, y);
            }
            else {
                if (elements[pixelMap[x][y].element].id === elements.flash.id) { continue }
                if (elements[pixelMap[x][y].element].id === elements.god_ray.id) { break }
                if (!elements[pixelMap[x][y].element].isGas && isEmpty(x, y - 1)) {
                    createPixel("magic", x, y - 1);
                }
                if (Math.random() > 0.1) { continue }
                elements.bless.tool(pixelMap[x][y])
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: 20,
    category: "energy",
    state: "gas",
    excludeRandom: true,
    noMix: true
};