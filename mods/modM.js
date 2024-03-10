console.log("run mod")
elements.turbine = { color: "#524945",
    behavior: behaviors.WALL
    category: "solids",
	state: "solid",
    density: 720,
};
elements.coolant = { color: "#16c1db",
    behavior: behaviors.WALL
    category: "liquids",
	state: "liquid",
    density: 720,
	tempHigh: 1000,
};
elements.unstable_coolant = { color: "#16c1db",
 behavior: behaviors.DGAS,
 category: "gases",
	state: "gas",
};