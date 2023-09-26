elements.flipflop = {
	powerstate: "false",
	name: "Flip Flop",
    	color: "#CF300D",
	state: "solid",
    	category: "machines",
	conduct: 1,
	tick: function(pixel) {
		doHeat(pixel)
		doBurning(pixel)
		doElectricity(pixel)
		
		let Powerstate = pixel.powerst
    		let Output = pixelMap[pixel.x+1][pixel.y]
    		let Input = pixelMap[pixel.x-1][pixel.y]
		
		if (Output.x != undefined && Input.x != undefined){
			Output.charge = 0
			if (Powerstate == "true" && Input.charge > 0.9) {
				Powerstate == "false"
      				pixel.color = "#CF300D"
      				Output.charge = 0
			} else if (Powerstate == false && Input.charge < 0.9) {
      				Powerstate == true
      				pixel.color = "#94CF0D"
      				Output.charge = 5
    			}
		}
	}
};
