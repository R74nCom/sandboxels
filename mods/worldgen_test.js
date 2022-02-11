elements.worldgen_test = {
	color: ["#787674", "#787674", "#787674", "#8c5923", "#8c5923", "#54c942", "#f7f0b0", "#5280eb"],
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {

			for (var j = 1; j < height; j++) {

				if (isEmpty(i,j)) {

					if(j >= Math.floor(6*height/7) && j < Math.floor(7*height/7)) {

						if(Math.random() < 0.95) {

							createPixel("rock",i,j)


						}

					}

					if(j >= Math.floor(5*height/7) && j < Math.floor(6*height/7)) {

						if(Math.random() < 0.95) {

							if(Math.random() < 1/2) {

								if(i >= Math.floor(11*width/14) && i < Math.floor(14*width/14)) {

									createPixel("sand",i,j)

								} else {

									createPixel("dirt",i,j)

								}

							} else {

								createPixel("rock",i,j)

							}

						}

					}

					if(j >= Math.floor(4*height/7) && j < Math.floor(5*height/7)) {

						if(Math.random() < 0.95) {

							if(i >= Math.floor(11*width/14) && i < Math.floor(14*width/14)) {

								createPixel("sand",i,j)

							} else {

								createPixel("dirt",i,j)

							}

						}

					}

					if(j >= Math.floor(15*height/28) && j < Math.floor(4*height/7)) {

						if(Math.random() < 0.95) {

							if(i < Math.floor(11*width/14)) {

								createPixel("grass",i,j)

							}

						}

					}

				}

			}

		}

		explodeAt(Math.floor(51*width/56),Math.floor(9*height/14),Math.floor(1.8*height/7),fire="water")

		deletePixel(pixel.x,pixel.y)

	},
	category: "machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
}

runAfterLoad(function() {
  if(enabledMods.includes("mods/minecraft.js")) {

elements.nether_gen_test = {
	color: ["#751318","#694a20","#f0771a"],
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {

			for (var j = 1; j < height; j++) {

				if (isEmpty(i,j)) {

					if(j >= Math.floor(5*height/7) && j < Math.floor(7*height/7)) {

						if(Math.random() < 0.95) {

							if(Math.random() < 2/3) {

								if(i >= Math.floor(11*width/14) && i < Math.floor(14*width/14)) {

									createPixel("soul_sand",i,j)

								} else {

									createPixel("netherrack",i,j)

								}

							} else {

								createPixel("gravel",i,j)

							}

						}

					}

					if(j >= Math.floor(4*height/7) && j < Math.floor(5*height/7)) {

						if(Math.random() < 0.95) {

							if(i >= Math.floor(11*width/14) && i < Math.floor(14*width/14)) {

								createPixel("soul_sand",i,j)

							} else {

								createPixel("netherrack",i,j)

							}

						}

					}

				}

			}

		}

		explodeAt(Math.floor(51*width/56),Math.floor(10*height/14),Math.floor(1.8*height/7),fire="magma")

		if(!isEmpty(Math.floor(51*width/56),Math.floor(10*height/14))) {
			pixelMap[Math.floor(51*width/56)][Math.floor(10*height/14)].temp += 10**(3*(Math.floor(Math.log10(Math.sqrt((height**2)+(width**2))))))
		}

		deletePixel(pixel.x,pixel.y)

	},
	category: "machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
	}
}
});
