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
elements.bat = {
	color: "#2b2824",
	category: "Fantastic Creatures",
	state: "solid",
	behavior: [
	"XX|M1%5|XX",
	"XX|FX%3|M2",
	"XX|XX|M2%10",
	],
	burnInto: "ash",
    burn:75,
    burnTime:25,
    density: 750,
};
elements.vampire_bat = {
	color: "#241919",
	category: "Fantastic Creatures",
	state: "solid",
	behavior: [
	"XX|M1%5|XX",
	"XX|FX%3|M2",
	"XX|XX|M2%10",
	],
	reactions: {
		"blood": { "elem2": null, "chance": 50 }
	}
	burnInto: "ash",
    burn:75,
    burnTime:25,
    density: 750,
};
