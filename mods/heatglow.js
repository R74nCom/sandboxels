const heatfunc = function(pixel){
		if (pixel.ogR == null || pixel.ogG == null || pixel.ogB == null){
			pixel.ogR = parseInt(pixel.color.slice(4, pixel.color.indexOf(',')), 10)
			pixel.ogG = parseInt(pixel.color.slice(pixel.color.indexOf(',') + 1, pixel.color.lastIndexOf(',')), 10)
			pixel.ogB = parseInt(pixel.color.slice(pixel.color.lastIndexOf(',') + 1, -1), 10)
		}else{
		pixel.gethigh = (elements[pixel.element].tempHigh)
		pixel.halftemp = ((20+pixel.gethigh)/2)
			if (pixel.temp <= (pixel.gethigh) - pixel.halftemp){
				pixel.ctemp = 0;
			} else if (pixel.temp > (pixel.gethigh)-pixel.halftemp && pixel.temp <= pixel.gethigh){
				pixel.ctemp = ((1/pixel.halftemp)*pixel.temp)-(((pixel.gethigh)-pixel.halftemp)/pixel.halftemp)
			}
			if (pixel.ctemp <= 0.5){
				pixel.newR = (((510-(2*pixel.ogR))*pixel.ctemp)+pixel.ogR);
				pixel.newG = ((0-((2*pixel.ogG)*pixel.ctemp))+pixel.ogG);
				pixel.newB = ((0-((2*pixel.ogB)*pixel.ctemp))+pixel.ogB);
			}else if (pixel.ctemp > 0.5){
				pixel.newR = 255;
				pixel.newG = ((510*pixel.ctemp)-255);
				pixel.newB= ((280*pixel.ctemp)-140);
			}
			pixel.color = "rgb(" + pixel.newR + "," + pixel.newG + "," + pixel.newB + ")";
		}
	};
	const metals = ["iron", "glass", "copper", "gold", "brass","steel","nickel","zinc","silver","aluminum","bronze","metal_scrap","oxidized_copper","tin","lead"];
metals.forEach(metal => { 
	const prefunc = elements[metal].tick;
	if (!prefunc){
		elements[metal].tick = heatfunc;
	}else{
		const modfunc = function(pixel){
			prefunc(pixel);
			heatfunc(pixel);
		};
		elements[metal].tick = modfunc;
	}
});
elements.color_baker = {
	color: "#F61212",
	tool: function(pixel) {
		pixel.ogR = parseInt(pixel.color.slice(4, pixel.color.indexOf(',')), 10)
		pixel.ogG = parseInt(pixel.color.slice(pixel.color.indexOf(',') + 1, pixel.color.lastIndexOf(',')), 10)
		pixel.ogB = parseInt(pixel.color.slice(pixel.color.lastIndexOf(',') + 1, -1), 10)
	},
	category: "tools",
	excludeRandom: true,
	desc: "Use to bake a metals paint color into its 'true' color, for heating purposes.",
}
