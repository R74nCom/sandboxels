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
/*
function weightedAverage(num1, num2, weight){
	return ((weight * num1)+((1-weight)*num2))
}
 const plantfunc = function(pixel){
	if (pixel.ogR == null || pixel.ogG == null || pixel.ogB == null){
			pixel.ogR = parseInt(pixel.color.slice(4, pixel.color.indexOf(',')), 10)
			pixel.ogG = parseInt(pixel.color.slice(pixel.color.indexOf(',') + 1, pixel.color.lastIndexOf(',')), 10)
			pixel.ogB = parseInt(pixel.color.slice(pixel.color.lastIndexOf(',') + 1, -1), 10)
			var deadR = 130;
			var deadG = 103;
			var deadB = 40;
			var burnR = 30;
			var burnG = 30;
			var burnB = 30;
			var newR = pixel.ogR;
			var newG = pixel.ogG;
			var newB = pixel.ogB;
		}else{
		var gethigh = (elements[pixel.element].tempHigh)
		var halftemp = ((20+gethigh)/2)
		if (pixel.temp > halftemp){
				var ctemp = ((1/halftemp)*pixel.temp)-(((gethigh)-halftemp)/halftemp);
			} else (ctemp = 0)
			if (ctemp <= 0.5 && ctemp > 0){
				newR = weightedAverage(deadR, pixel.ogR, 2*ctemp);
				newG = weightedAverage(deadG, pixel.ogG, 2*ctemp);
				newB = weightedAverage(deadB, pixel.ogB, 2*ctemp);
			}else if (ctemp > 0.5){
				var modctemp = 2*(ctemp%0.5)
				newR = weightedAverage(burnR, deadR, 2*modctemp);
				newG = weightedAverage(burnG, deadG, 2*modctemp);
				newB = weightedAverage(burnB, deadB, 2*modctemp);
			}
			if (!ctemp == 0){
			pixel.color = "rgb(" + newR + "," + newG + "," + newB + ")";
			} else {pixel.color = "rgb(" + pixel.ogR + "," + pixel.ogG + "," + pixel.ogB + ")"}
		}
	};
	if (!eLists.burnplants) { eLists.burnplants = [] }
	eLists.burnplants = eLists.burnplants.concat(["plant","dead_plant","grass","algae","sapling","evergreen","cactus","seeds","grass_seed","wheat_seed","flower_seed","pistil","petal","tree_branch","bamboo_plant","mushroom_spore","mushroom_stalk","mushroom_gill","mushroom_cap","hyphae","pumpkin_seed","pumpkin","corn","corn_seed","potato","potato_seed","root"])
eLists.burnplants.forEach(plant => { 
	const prefunc = elements[plant].tick;
	if (!prefunc){
		elements[plant].tick = plantfunc;
	}else{
		const modfunc = function(pixel){
			prefunc(pixel);
			plantfunc(pixel);
		};
		elements[plant].tick = modfunc;
	}
});
 */