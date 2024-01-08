elements.thread = {
	color: "#fff3e6",
	behavior: behaviors.STURDYPOWDER,
	category: "thread",
	state: "solid",
	tempHigh: "50",
	stateHigh: "ash",
	hardness: "0.2",
	breakInto: "wool"
	density: " 1314",
	burn: "99",
	burnTime: "40"
	burnInto: "ash",
	reactions: {
        "weavepowder": { elem1: null, elem2: "rope" },
};

elements.wool = {
	color: "#e2e1d8",
	behavior: behaviors.POWDER,
	category: "thread",
	state: "solid",
	tempHigh: "40",
	stateHigh: "ash",
	hardness: "1",
	density: " 1314",
	burn: "90",
	burnTime: "40"
	burnInto: "ash",
	reactions: {
        "weavepowder": { elem1: null, elem2: "thread" },
};
elements.weavepowder = {
	color: "#494736",
	behavior: behaviors.POWDER,
	category: "thread",
	state: "solid",
	tempHigh: "5000000",
	stateHigh: "dust",
	hardness: "1",
	density: " 1314",
	burn: "0",
	burnTime: "0"
	burnInto: "dust",
	reactions: {
        "wool": { elem1: thread, elem2: "null" },
		    "thread": { elem1: rope, elem2: "null" },
};
elements.rope = {
	color: "#ffe6cc",
	behavior: behaviors.STURDYPOWDER,
	category: "thread",
	state: "solid",
	tempHigh: "60",
	stateHigh: "ash",
	hardness: "0.4",
	breakInto: "thread"
	density: " 1314",
	burn: "85",
	burnTime: "50"
	burnInto: "ash",
};
