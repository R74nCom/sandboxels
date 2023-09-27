elements.flipflop = {
	properties: {
		powerstate: "false",
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
			if (Input.charge > 0.45) {
				if (pixel.powerstate == "true") {
					pixel.powerstate = "false"
      					pixel.color = "#CF300D"
      					Output.charge = 0
				} else if (pixel.powerstate == "true") {
      					pixel.powerstate = "true"
      					pixel.color = "#94CF0D"
      					Output.charge = 1
				}
			} else { 
				Output.charge = 0
			}
		}
	}
};
