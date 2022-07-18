//We're assuming that the crystal structures reform properly because I don't want to have to research and implement refrozen amorphous forms.

elements.emerald = {
	color: ["#31e31e", "#88fa5a", "#28d419", "#54e823", "#64f235"],
	tempHigh: 1287,
		//1: I can't be arsed to find out what happens to emerald in extreme heat. Apparently, neither can anyone else because Google is f***ing useless for this.
		//2: So I'm just assuming that the chromium impurities are polite and remain in solution with the molten beryl.
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	density: 2710, //within natural variation
	hardness: 0.8, //Mohs scaled to diamond
};

elements.amethyst = {
	color: ["#c569e0", "#bd43e0", "#e37aeb", "#ab2fe0", "#b05bd4", "#9b2cdb"],
	tempHigh: 1650,
	//1: Gee, another quartz-like...
	//2: Like with emerald, I'm trusting the impurities to stay dissolved because I don't exactly have any amethyst laying around to melt.
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	density: 2650,
	hardness: 0.7,
};

elements.sapphire = {
	color: ["#2d43e3", "#4d5fe3", "#1f30cc", "#375fdb", "#2d39e3"],
	tempHigh: 2040,
		//1: You can actually grow corundum-based gems through the Verneuil process
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	density: 3980,
	hardness: 0.9,
}

elements.ruby = {
	//Corundum with different impurities, so I can copy/paste everything but the color
	color: ["#ff1222", "#ff4545", "#e30b13", "#fa253b", "#f2120f"],
	tempHigh: 2040,
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	density: 3980,
	hardness: 0.9,
}

elements.topaz = {
	//Terraria
	color: ["#f7f431", "#ffff5c", "#f7e048", "#fae43e", "#fff86e", "#ede321"],
	tempHigh: 1340, //yay, more thermal decomposition elements
	stateHigh: "mullite",
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	density: 3500,
	hardness: 0.8,
};

elements.mullite = {
	color: ["#f2dfcf", "#fadee9", "#edd8ca"], //hardly a gemstone, but i will color it like the others regardless
	tempHigh: 1840,
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	density: 3110,
	hardness: 0.7,
};

elements.onyx = { //Thorium
	color: ["#1a1919", "#070605", "#111313"],
	tempHigh: 1650, //another  silicate  mineral
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
	density: 2650,
	hardness: 0.7,
};

//todo: opal (pain), pearl