elements.einsteinium = {
    color: ["#B6D4D7", "#8cc8cf", "#b0b0b0", "#899a9c"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tempHigh: 860,
    density: 8.84,
    hardness: 0.4,
    stateHigh: "molten_einsteinium",
};

elements.molten_einsteinium = {
    color: ["#fc7303", "#ffda69", "#f04902", "#ffbb33"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "molten", //i dont know how molten einsteinium looks like but if anyone knows just dm me on discord ToT "mj_rawr.exe"
};

elements.eyes = {
    color: ["#ffffff", "#ffffff", "#ffffff", "#89aacc", "#78c479", "#733c1e", "#d4842f", "#737575"],
    behavior: behaviors.LIQUID,
    category: "life",
    state: "powder",
    tempHigh: 150,
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
    tempLow: -30,
    stateHigh: ["smoke", "ash"],
    burnInto: ["smoke", "ash"],
    breakInto: ["blood","meat",],
    burn: 10,
    burnTime: 250,
    viscosity: 1000000000,
 };

 elements.really_cold_coin = {
    color: ["#fff0b5","#ffe680","#eca832","#f0bb62"],
    behavior: behaviors.POWDER,
    category: "special",
    state: "powder",
    temp: -Infinity,
    density: 19300,
    hardness: 0.2,
    statehigh: "molten_gold"
 };

 elements.really_hot_coin = {
    color: ["#c48821","#986a1a","#eca832","#f0bb62"],
    behavior: behaviors.POWDER,
    category: "special",
    state: "powder",
    temp: Infinity,  //touching it is worse then touching a hot glue gun when its hot. trust me.
    density: 19300,
    hardness: 0.2,
 };

 elements.pink_goo = {
	color: ["#ff00d0", "#e300ba", "#ff17d4",],
	behavior: behaviors.LIQUID, //superfluid moves too quickly.
	category: "joke", //if your reading this, this is a refrence to one of my ocs and my original fictional diease :D
	state: "liquid",
    viscosity: 0, 
    reactions: {
        "antidote": { elem1: "water", elem2: null },
    }
};

elements.dark_brown_sugar = { 
    color: ["#9f603e", "#b77a59", "#894f30",],
    behavior: behaviors.SUPPORTPOWDER,
    category: "food",
    state: "powder",
    stateHigh: "caramel", //am i an idiot for taking this long to figure out how to edit my code? yes. i am.
    reactions: {
        "water": { elem1: "sugar_water", elem2: null },
    }

};

elements.icing_sugar = {
    color: ["#ffffff", "#ffffff", "#ffffff", "#f3f3f3",],
    behavior: behaviors.SUPPORTPOWDER,
    category: "food",
    state: "powder",
    stateHigh: "caramel",
    reactions: {
        "water": { elem1: null , elem2: "icing" },
    }

};

elements.golden_caster_sugar = {
    color: ["#f7f1e7", "#f4d3b1", "#eabc78", "#e5a169",],
    behavior: behaviors.POWDER,
    category: "food",
    state: "powder",
    stateHigh: "caramel",
    reactions: {
        "water": { elem1: "sugar_water" , elem2: null },
    }


};

elements.caster_sugar = {
    color: ["#ffffff", "#ffffff", "#fff8eb", "#fffcf6",],
    behavior: behaviors.POWDER,
    category: "food",
    state: "powder",
    stateHigh: "caramel",
    reactions: {
        "water": { elem1: "sugar_water" , elem2: null },
    }
};

elements.light_brown_sugar = {
    color: ["#e58a6f", "#eca388", "#ec945a", "#f3b17e",],
    behavior: behaviors.SUPPORTPOWDER,
    category: "food",
    state: "powder",
    stateHigh: "caramel",
    reactions: {
        "water": { elem1: "sugar_water" , elem2: null },
    }

};

elements.demerara_sugar = {
    color: ["#a5350f", "#d1560f", "#c03b07", "#af3b0d",],
    behavior: behaviors.POWDER,
    category: "food",
    state: "powder",
    stateHigh: "caramel",
    reactions: {
        "water": { elem1: "sugar_water" , elem2: null },
    }

};

elements.dark_muscovado_sugar = {
    color: ["#492212", "#622f12", "#562606", "#6d3210",],
    behavior: behaviors.SUPPORTPOWDER,
    category: "food",
    state: "powder",
    stateHigh: "caramel",
    reactions: {
        "water": { elem1: "sugar_water" , elem2: null },
    }
    

};

elements.granulated_sugar = {
    color: ["#ffffff", "#f4f4f4", "#f1f1f1", "#f3f3f3",],
    behavior: behaviors.POWDER,
    category: "food",
    state: "powder",
    stateHigh: "caramel",
    reactions: {
        "water": { elem1: "sugar_water" , elem2: null },
    }

};

elements.icing = {
    color: ["#dcf7ff", "#cef6ff", "#ffffff", "#e4faff",],
    behavior: behaviors.LIQUID,
    category: "food",
    state: "powder",
    stateHigh: "caramel",
    viscosity: 2000,
};


elements.Hazel = {
    color: ["#189BCC",],
    behavior: behaviors.SUPERFLUID,
    category: "joke",
    state: "liquid",
    viscosity: 0,
};

 elements.guhguhgugu = {
	color: ["#a73acf", "#9e26c9", "#be5ee0",],
	behavior: behaviors.LIQUID, 
	category: "joke", 
	state: "liquid",
	stateLow: "frozen_guhguhgugu",
	tempLow: -150,
	stateHigh: "solid_guhguhgugu",
        tempHigh: 150, 
	 };

 elements.solid_guhguhgugu = {
	color: ["#a73acf", "#9e26c9", "#be5ee0",],
	behavior: behaviors.SOLID, 
	category: "joke", 
	state: "solid",
	stateLow: "guhguhgugu",
	tempLow: 150,
	stateHigh: "liquid_guhguhgugu",
        tempHigh: 250,
	 };

 elements.liquid_guhguhgugu = {
	color: ["#a73acf", "#9e26c9", "#be5ee0",],
	behavior: behaviors.MOLTEN, 
	category: "molten", 
	state: "molten",
	tempLow: "250",
	stateLow: "solid_guhguhgugu",
	stateHigh: "liquid_guhguhgugu",
        tempHigh: 500,
	 };

 elements.boil_guhguhgugu = {
	color: ["#a73acf", "#9e26c9", "#be5ee0",],
	behavior: behaviors.DGAS, 
	category: "joke", 
	state: "gas",
	tempLow: "500",
	stateLow: "liquid_guhguhgugu",
	
	 };

elements.frozen_guhguhgugu = {
	color: ["#a73acf", "#9e26c9", "#be5ee0",],
	behavior: behaviors.SOLID, 
	category: "joke", 
	state: "solid",
	stateHigh: "guhguhgugu",
        tempHigh: 15, 
	 };
