elements.pac_man = {
	color: "#ffff00",
	behavior: behaviors.FLY,
	category: "pac-man",
	state: "solid",
	reactions: {
        "vulnerable_ghost": { elem2:null, chance:1000, func:behaviors.FEEDPIXEL },
	}
};

elements.vulnerable_ghost = {
	color: "#2121ff",
	behavior: behaviors.FLY,
	category: "pac-man",
  	state: "solid",
    density: 3300,
    insulate: false,
    noMix: false,
    alias: "scared_ghost",
    movable: true,
    hardness: 0.8,
    breakInto: "worm"
	reactions: {
        "pac_man": { elem2:null, chance:1000, func:behaviors.FEEDPIXEL },
	}
};
