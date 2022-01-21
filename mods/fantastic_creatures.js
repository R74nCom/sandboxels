// Sandboxels: Fantastic Creatures Mod, v0.1
// Author: MelecieDiancie

/*
=== CHANGELOG ===
Version 0.1
+ Readded chickens and eggs from Fey & More v1.1
+ Bats and vampire bats
+ Hummingbirds
+ Caterpillars and butterflies
*/

elements.chicken = {
    color: ["#ba5700","#d18038","#d4ccc5"],
    category: "Fantastic Creatures",
	state: "solid",
    behavior: [
        "XX|XX|XX",
        "XX|FX%3 AND L2:chicken_egg%0.5 AND L2:golden_egg%0.01|M2%10",
        "XX|M1%33|XX",
    ],
	tempHigh: 41,
    stateHigh: "meat",
    burn:75,
    burnTime:30,
    density: 1200,
};
elements.chick = {
    color: ["#dbb11a","#dec56d"],
    category: "Fantastic Creatures",
	state: "solid",
    behavior: [
        "XX|XX|XX",
        "XX|FX%5 AND CH:chicken%0.05|M2%5",
        "XX|M1%33|XX",
    ],
	tempHigh: 41,
    stateHigh: "meat",
    burn:75,
    burnTime:30,
    density: 1200,
    hidden: true,
};
elements.chicken_egg = {
    color: ["#e8e3dc","#f7ddc6"],
    category: "Fantastic Creatures",
	state: "solid",
    behavior: [
        "XX|XX|XX",
        "XX|CH:chick%0.5|XX",
        "XX|M1|XX",
    ],
	tempHigh: 41,
    stateHigh: "boiled_egg",
    burn:75,
    burnTime:30,
    density: 1200,
};
elements.boiled_egg = {
    color: "#d4cbc3",
    category: "Fantastic Creatures",
	state: "solid",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
	tempHigh: 200,
    stateHigh: "ash",
    burn:75,
    burnTime:30,
    density: 1200,
    hidden: true,
};
elements.golden_egg = {
    color: "#ebcf9b",
    category: "Fantastic Creatures",
	state: "solid",
    behavior: [
		"XX|XX|XX",
		"XX|CC:ebcf9b,ebcf9b,ebcf9b,ebcf9b,ebcf9b,ebcf9b,ffffff|XX",
        "XX|M1|XX",
    ],
	tempHigh: 200,
    stateHigh: "ash",
    burn:75,
    burnTime:30,
    density: 1200,
    hidden: true,
};
elements.caterpillar = {
	color: ["#a7cfaf", "#4ecf6a", "#68cc7e","#a7cfaf"],
	category: "Fantastic Creatures",
	state: "solid",
	behavior: [
	"XX|XX|XX",
	"XX|FX%0.1 AND CH:cocoon%0.01|M2%1",
	"XX|M1|XX",
	],
	reactions: {
		plant: { "elem2": null, "chance": 80},
	},
	burnInto: "ash",
    burn:75,
    burnTime:25,
    density: 1000,
};
elements.cocoon = {
	color: "#f0fff3",
	category: "Fantastic Creatures",
	state: "solid",
	behavior: [
	"XX|ST|XX",
	"XX|CH:butterfly%0.01|XX",
	"XX|M1|XX",
	],
	burnInto: ["silk", "ash"],
    burn:75,
    burnTime:25,
    density: 1000,
};
elements.butterfly = {
	color: ["#6e6056", "#6e6056", "#423831", "#423831", "#e3cd5f", "#dbaf35", "#35db53", "#49cc61", "#49ccca", "#d18f84"],
	category: "Fantastic Creatures",
	state: "solid",
	behavior: [
	"XX|XX|M1",
	"XX|FX%5|M1",
	"XX|XX|M1",
	],
	burnInto: "ash",
    burn:75,
    burnTime:25,
    density: 500,
};
