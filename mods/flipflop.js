elements.flipflop = {
	properties: {
		powerstate: "false",
		cooldown: 0,
	},
	name: "Flip Flop",
    	color: "#CF300D",
	state: "solid",
    	category: "machines",
	tick: function(pixel) {
			doHeat(pixel)
			doBurning(pixel)
			doElectricity(pixel)

    		let Output = pixelMap[pixel.x+1][pixel.y]
    		let Input = pixelMap[pixel.x-1][pixel.y]
		if (typeof Output !== "undefined" && typeof Input !== "undefined") {
			if (Input.charge == undefined && pixel.cooldown == 1) {
				pixel.cooldown = 0
			}
			if (Input.charge > 0 && pixel.cooldown == 0) {
				pixel.cooldown = 1
				if (pixel.powerstate == "true") {
					pixel.powerstate = "false"
      					pixel.color = "#CF300D"
				} else if (pixel.powerstate == "false") {
      					pixel.powerstate = "true"
      					pixel.color = "#94CF0D"
      					Output.charge = 1
				}
			} else if (pixel.cooldown == 0) { 
				Output.charge = undefined
			}
		}
	}
};
