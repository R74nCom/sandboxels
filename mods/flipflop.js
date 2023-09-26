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
		console.log(pixel.powerstate)
		if (typeof Output !== "undefined" && typeof Input !== "undefined"){
			Output.charge = 0
			if (pixel.powerstate == "true" && Input.charge > 0.2) {
				pixel.powerstate = "false"
      				pixel.color = "#CF300D"
				console.log(pixel.powerstate+"y")
      				Output.charge = 0
			} else if (pixel.powerstate == "false" && Input.charge > 0.2) {
      				pixel.powerstate = "true"
				console.log(pixel.powerstate+"n")
      				pixel.color = "#94CF0D"
      				Output.charge = 5
    			}
		}
	}
};
