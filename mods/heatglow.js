const heatfunc = function(pixel){
		if (pixel.ogR == null || pixel.ogG == null || pixel.ogB == null || !(pixel.element == pixel.ogElement)){
			pixel.ogR = parseInt(pixel.color.slice(4, pixel.color.indexOf(',')), 10)
			pixel.ogG = parseInt(pixel.color.slice(pixel.color.indexOf(',') + 1, pixel.color.lastIndexOf(',')), 10)
			pixel.ogB = parseInt(pixel.color.slice(pixel.color.lastIndexOf(',') + 1, -1), 10)
			pixel.ogElement = pixel.element 
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
	if (!eLists.metals) { eLists.metals = [] }
	eLists.metals = eLists.metals.concat(["iron", "glass", "copper", "gold", "brass","steel","nickel","zinc","silver","aluminum","bronze","metal_scrap","oxidized_copper","tin","lead", "rose_gold"])
eLists.metals.forEach(metal => { 
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
	if (elements[metal].behavior == behaviors.WALL){
		elements[metal].movable = false;
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
//const plantfunc = function(pixel){
//	if (pixel.ogR == null || pixel.ogG == null || pixel.ogB == null){
//			pixel.ogR = parseInt(pixel.color.slice(4, pixel.color.indexOf(',')), 10)
//			pixel.ogG = parseInt(pixel.color.slice(pixel.color.indexOf(',') + 1, pixel.color.lastIndexOf(',')), 10)
//			pixel.ogB = parseInt(pixel.color.slice(pixel.color.lastIndexOf(',') + 1, -1), 10)
//			pixel.deadR = 130;
//			pixel.deadG = 103;
//			pixel.deadB = 40;
//			pixel.burnR = 30;
//			pixel.burnG = 30;
//			pixel.burnB = 30;
//		}else{
//		pixel.gethigh = (elements[pixel.element].tempHigh)
//		pixel.halftemp = ((20+pixel.gethigh)/2)
//			if (pixel.temp <= (pixel.gethigh) - pixel.halftemp){
//				pixel.ctemp = 0;
//				pixel.twoctemp = 0,
//				pixel.littlectemp = 1;
//			} else if (pixel.temp > (pixel.gethigh)-pixel.halftemp && pixel.temp <= pixel.gethigh){
//				pixel.ctemp = ((1/pixel.halftemp)*pixel.temp)-(((pixel.gethigh)-pixel.halftemp)/pixel.halftemp);
//				pixel.twoctemp = pixel.ctemp*2;
//				pixel.littlectemp = 2*(1-(pixel.ctemp));
//			}
//			if (pixel.ctemp <= 0.5){
//			pixel.newR = ((pixel.twoctemp*pixel.deadR)+(pixel.littlectemp*pixel.ogR)/(pixel.twoctemp+pixel.littlectemp));
//				pixel.newG = ((pixel.twoctemp*pixel.deadG)+(pixel.littlectemp*pixel.ogG)/(pixel.twoctemp+pixel.littlectemp));
//				pixel.newB = ((pixel.twoctemp*pixel.deadB)+(pixel.littlectemp*pixel.ogB)/(pixel.twoctemp+pixel.littlectemp));
//			}else if (pixel.ctemp > 0.5){
//				pixel.newR = (((pixel.twoctemp*pixel.deadR)+(pixel.littlectemp*pixel.burnR))/(pixel.twoctemp*pixel.littlectemp));
//				pixel.newG = (((pixel.twoctemp*pixel.deadG)+(pixel.littlectemp*pixel.burnG))/(pixel.twoctemp*pixel.littlectemp));
//				pixel.newB= (((pixel.twoctemp*pixel.deadB)+(pixel.littlectemp*pixel.burnB))/(pixel.twoctemp*pixel.littlectemp));
//			}
//			pixel.color = "rgb(" + pixel.newR + "," + pixel.newG + "," + pixel.newB + ")";
//		}
//	};
//	if (!eLists.burnplants) { eLists.burnplants = [] }
//	eLists.burnplants = eLists.burnplants.concat(["plant","dead_plant","grass","algae","sapling","evergreen","cactus","seeds","grass_seed","wheat_seed","flower_seed","pistil","petal","tree_branch","bamboo_plant","mushroom_spore","mushroom_stalk","mushroom_gill","mushroom_cap","hyphae","pumpkin_seed","pumpkin","corn","corn_seed","potato","potato_seed","root"])
//eLists.burnplants.forEach(plant => { 
//	const prefunc = elements[plant].tick;
//	if (!prefunc){
//		elements[plant].tick = plantfunc;
//	}else{
//		const modfunc = function(pixel){
//			prefunc(pixel);
//			plantfunc(pixel);
//		};
//		elements[plant].tick = modfunc;
//	}
//});
	
