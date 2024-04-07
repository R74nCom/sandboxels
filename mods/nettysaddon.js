elements.ultra_uranium = {
	color: ["#50C878" , "#4F7942"],
	behavior: [
     "XX|XX|XX",
     "XX|DL%5|XX",
     "M2%25|M1%25|M2%25",
],
	category: "weapons",
	state: "solid",
        temp: 9999999999999999,
        hardness: 1,
};
elements.mega_beam = {
    color: ["#DFFF00" , "#00FFFF"],
    tick: function(pixel) {
        var x = pixel.x;
        for (var y = pixel.y; y < height; y++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.05) { continue }
                createPixel("flash", x, y);
                pixelMap[x][y].color = "#DFFF00";
                pixelMap[x][y].temp = 9800;
            }
            else {
                if (elements[pixelMap[x][y].element].isGas) { continue }
                if (elements[pixelMap[x][y].element].id === elements.mega_beam.id) { break }
                pixelMap[x][y].temp += 9800;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x-1, pixel.y-1);
        deletePixel(pixel.x+1, pixel.y+1);
        if ( pixelTicks - pixel.start > 1) {
            deletePixel(pixel.x, pixel.y)
        }
        doHeat(pixel);
    },
    temp: 9800,
    category: "weapons",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
}