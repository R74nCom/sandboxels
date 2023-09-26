elements.flipflop = {
	properties: {
		powerstate: "false",
		cooldown: "0",
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
		if (typeof Output !== "undefined" && typeof Input !== "undefined"){
			if (pixel.cooldown > 0){
				pixel.cooldown--
				console.log(pixel.cooldown)
			}
			Output.charge = 0
			if (pixel.powerstate == "true" && Input.charge > 0.2 && pixel.cooldown < 1) {
				Input.charge = 0
				pixel.cooldown = 7
				pixel.powerstate = "false"
      				pixel.color = "#CF300D"
      				Output.charge = 0
			} else if (pixel.powerstate == "false" && Input.charge > 0.2 && pixel.cooldown < 1) {
				Input.chare = 0
				pixel.cooldown = 7
      				pixel.powerstate = "true"
      				pixel.color = "#94CF0D"
      				Output.charge = 5
    			}
		}
	}
};
