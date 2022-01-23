if(enabledMods.includes("mods/fey_and_more.js")) {

	elements.fairy_fairy = {
		name: "fairy fairy",
		color: ["#b300fa","#f67aff","#630fff"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"rainbow": { "elem1": "fairy_fairy_fairy", "elem2": null }
		},
		state: "solid",
		category: "fey",
	}

	elements.fairy_fairy_fairy = {
		name: "fairy fairy fairy",
		color: ["#9300da","#ee00ff","#5900ff"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy_fairy%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy_fairy_fairy_fairy", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy_fairy_fairy_fairy = {
		name: "fairy fairy fairy fairy",
		color: ["#7300ba","#ce00df","#3900df"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy_fairy_fairy%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy5", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy5 = {
		name: "5-fairy",
		color: ["#53009a","#ae00bf","#1900bf"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy_fairy_fairy_fairy%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy6", "elem2": null }
		},
		state: "solid",
		category: "fey",
	}

	elements.fairy6 = {
		name: "6-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy5%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy7", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy7 = {
		name: "7-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy6%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy8", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy8 = {
		name: "8-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy7%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy9", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy9 = {
		name: "9-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy8%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy10", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy10 = {
		name: "10-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy9%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy11", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy11 = {
		name: "11-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy10%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy12", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy12 = {
		name: "12-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy11%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy13", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy13 = {
		name: "13-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy12%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy14", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy14 = {
		name: "14-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy13%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy15", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy15 = {
		name: "15-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy14%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy16", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy16 = {
		name: "16-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy15%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy17", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy17 = {
		name: "17-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy16%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy18", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy18 = {
		name: "18-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy17%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy19", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy19 = {
		name: "19-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy18%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy20", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy20 = {
		name: "20-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy19%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy21", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy21 = {
		name: "21-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy20%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy22", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy22 = {
		name: "22-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy21%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy23", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy23 = {
		name: "23-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy22%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy24", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy24 = {
		name: "24-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy23%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy25", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy25 = {
		name: "25-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy24%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy26", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy26 = {
		name: "26-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy25%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy27", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy27 = {
		name: "27-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy26%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy28", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy28 = {
		name: "28-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy27%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy29", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy29 = {
		name: "29-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy28%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy30", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy30 = {
		name: "30-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy29%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy31", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy31 = {
		name: "31-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy30%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy32", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy32 = {
		name: "32-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy31%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy33", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy33 = {
		name: "33-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy32%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy34", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy34 = {
		name: "34-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy33%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy35", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy35 = {
		name: "35-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy34%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy36", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy36 = {
		name: "36-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy35%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy37", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy37 = {
		name: "37-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy36%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy38", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy38 = {
		name: "38-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy37%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy39", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy39 = {
		name: "39-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy38%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy40", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy40 = {
		name: "40-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy39%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy41", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy41 = {
		name: "41-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy40%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy42", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy42 = {
		name: "42-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy41%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy43", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy43 = {
		name: "43-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy42%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy44", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy44 = {
		name: "44-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy43%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy45", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy45 = {
		name: "45-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy44%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy46", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy46 = {
		name: "46-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy45%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy47", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy47 = {
		name: "47-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy46%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy48", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy48 = {
		name: "48-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy47%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy49", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy49 = {
		name: "49-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy48%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy50", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy50 = {
		name: "50-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy49%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy51", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy51 = {
		name: "51-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy50%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy52", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy52 = {
		name: "52-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy51%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy53", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy53 = {
		name: "53-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy52%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy54", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy54 = {
		name: "54-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy53%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy55", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy55 = {
		name: "55-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy54%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy56", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy56 = {
		name: "56-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy55%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy57", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy57 = {
		name: "57-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy56%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy58", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy58 = {
		name: "58-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy57%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy59", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy59 = {
		name: "59-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy58%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy60", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy60 = {
		name: "60-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy59%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy61", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy61 = {
		name: "61-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy60%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy62", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy62 = {
		name: "62-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy61%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy63", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy63 = {
		name: "63-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy62%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy64", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy64 = {
		name: "64-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy63%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy65", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy65 = {
		name: "65-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy64%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy66", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy66 = {
		name: "66-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy65%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy67", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy67 = {
		name: "67-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy66%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy68", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy68 = {
		name: "68-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy67%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy69", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy69 = {
		name: "69-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy68%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy70", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy70 = {
		name: "70-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy69%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy71", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy71 = {
		name: "71-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy70%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy72", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy72 = {
		name: "72-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy71%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy73", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy73 = {
		name: "73-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy72%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy74", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy74 = {
		name: "74-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy73%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy75", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy75 = {
		name: "75-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy74%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy76", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy76 = {
		name: "76-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy75%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy77", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy77 = {
		name: "77-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy76%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy78", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy78 = {
		name: "78-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy77%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy79", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy79 = {
		name: "79-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy78%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy80", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy80 = {
		name: "80-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy79%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy81", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy81 = {
		name: "81-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy80%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy82", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy82 = {
		name: "82-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy81%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy83", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy83 = {
		name: "83-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy82%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy84", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy84 = {
		name: "84-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy83%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy85", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy85 = {
		name: "85-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy84%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy86", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy86 = {
		name: "86-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy85%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy87", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy87 = {
		name: "87-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy86%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy88", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy88 = {
		name: "88-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy87%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy89", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy89 = {
		name: "89-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy88%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy90", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy90 = {
		name: "90-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy89%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy91", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy91 = {
		name: "91-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy90%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy92", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy92 = {
		name: "92-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy91%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy93", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy93 = {
		name: "93-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy92%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy94", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy94 = {
		name: "94-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy93%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy95", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy95 = {
		name: "95-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy94%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy96", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy96 = {
		name: "96-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy95%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy97", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy97 = {
		name: "97-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy96%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy98", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy98 = {
		name: "98-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy97%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy99", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy99 = {
		name: "99-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy98%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy100", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy100 = {
		name: "100-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy99%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		reactions: {
			"glitter": { "elem1": "fairy101", "elem2": null }
		},
		state: "solid",
		category: "fey",
		hidden: true,
	}

	elements.fairy101 = {
		name: "101-fairy",
		color: ["#33007a","#8e009f","#09009f"],
		behavior: [
			"XX|M1|M1",
			"XX|FX%5|XX",
			"XX|CR:fairy100%1 AND CR:fairy_dust%0.005 AND M1|M1",
		],
		state: "solid",
		category: "fey",
	}
}

runAfterLoad(function() {
    if(enabledMods.includes("mods/fey_and_more.js")) {
		//eList rebuilding {
			eLists.FAIRY.push("fairy_fairy");
			eLists.FAIRY.push("fairy_fairy_fairy");
			eLists.FAIRY.push("fairy_fairy_fairy_fairy");
			eLists.FAIRY.push("fairy5");
			eLists.FAIRY.push("fairy6");
			eLists.FAIRY.push("fairy7");
			eLists.FAIRY.push("fairy8");
			eLists.FAIRY.push("fairy9");
			eLists.FAIRY.push("fairy10");
			eLists.FAIRY.push("fairy11");
			eLists.FAIRY.push("fairy12");
			eLists.FAIRY.push("fairy13");
			eLists.FAIRY.push("fairy14");
			eLists.FAIRY.push("fairy15");
			eLists.FAIRY.push("fairy16");
			eLists.FAIRY.push("fairy17");
			eLists.FAIRY.push("fairy18");
			eLists.FAIRY.push("fairy19");
			eLists.FAIRY.push("fairy20");
			eLists.FAIRY.push("fairy21");
			eLists.FAIRY.push("fairy22");
			eLists.FAIRY.push("fairy23");
			eLists.FAIRY.push("fairy24");
			eLists.FAIRY.push("fairy25");
			eLists.FAIRY.push("fairy26");
			eLists.FAIRY.push("fairy27");
			eLists.FAIRY.push("fairy28");
			eLists.FAIRY.push("fairy29");
			eLists.FAIRY.push("fairy30");
			eLists.FAIRY.push("fairy31");
			eLists.FAIRY.push("fairy32");
			eLists.FAIRY.push("fairy33");
			eLists.FAIRY.push("fairy34");
			eLists.FAIRY.push("fairy35");
			eLists.FAIRY.push("fairy36");
			eLists.FAIRY.push("fairy37");
			eLists.FAIRY.push("fairy38");
			eLists.FAIRY.push("fairy39");
			eLists.FAIRY.push("fairy40");
			eLists.FAIRY.push("fairy41");
			eLists.FAIRY.push("fairy42");
			eLists.FAIRY.push("fairy43");
			eLists.FAIRY.push("fairy44");
			eLists.FAIRY.push("fairy45");
			eLists.FAIRY.push("fairy46");
			eLists.FAIRY.push("fairy47");
			eLists.FAIRY.push("fairy48");
			eLists.FAIRY.push("fairy49");
			eLists.FAIRY.push("fairy50");
			eLists.FAIRY.push("fairy51");
			eLists.FAIRY.push("fairy52");
			eLists.FAIRY.push("fairy53");
			eLists.FAIRY.push("fairy54");
			eLists.FAIRY.push("fairy55");
			eLists.FAIRY.push("fairy56");
			eLists.FAIRY.push("fairy57");
			eLists.FAIRY.push("fairy58");
			eLists.FAIRY.push("fairy59");
			eLists.FAIRY.push("fairy60");
			eLists.FAIRY.push("fairy61");
			eLists.FAIRY.push("fairy62");
			eLists.FAIRY.push("fairy63");
			eLists.FAIRY.push("fairy64");
			eLists.FAIRY.push("fairy65");
			eLists.FAIRY.push("fairy66");
			eLists.FAIRY.push("fairy67");
			eLists.FAIRY.push("fairy68");
			eLists.FAIRY.push("fairy69");
			eLists.FAIRY.push("fairy70");
			eLists.FAIRY.push("fairy71");
			eLists.FAIRY.push("fairy72");
			eLists.FAIRY.push("fairy73");
			eLists.FAIRY.push("fairy74");
			eLists.FAIRY.push("fairy75");
			eLists.FAIRY.push("fairy76");
			eLists.FAIRY.push("fairy77");
			eLists.FAIRY.push("fairy78");
			eLists.FAIRY.push("fairy79");
			eLists.FAIRY.push("fairy80");
			eLists.FAIRY.push("fairy81");
			eLists.FAIRY.push("fairy82");
			eLists.FAIRY.push("fairy83");
			eLists.FAIRY.push("fairy84");
			eLists.FAIRY.push("fairy85");
			eLists.FAIRY.push("fairy86");
			eLists.FAIRY.push("fairy87");
			eLists.FAIRY.push("fairy88");
			eLists.FAIRY.push("fairy89");
			eLists.FAIRY.push("fairy90");
			eLists.FAIRY.push("fairy91");
			eLists.FAIRY.push("fairy92");
			eLists.FAIRY.push("fairy93");
			eLists.FAIRY.push("fairy94");
			eLists.FAIRY.push("fairy95");
			eLists.FAIRY.push("fairy96");
			eLists.FAIRY.push("fairy97");
			eLists.FAIRY.push("fairy98");
			eLists.FAIRY.push("fairy99");
			eLists.FAIRY.push("fairy100");
			eLists.FAIRY.push("fairy101");
			elements.iron.behavior = [
				"XX|DL:"+eLists.FAIRY+"|XX",
				"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
				"XX|DL:"+eLists.FAIRY+"|XX"
			];
			elements.silver.behavior = [
				"XX|DL:"+eLists.FAIRY+"|XX",
				"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
				"XX|DL:"+eLists.FAIRY+"|XX"
			];
		//}
	elements.fairy.reactions.rainbow = { "elem1": "fairy_fairy", "elem2": null }
	};
    var toRemove = ["fairy5","fairy6","fairy7","fairy8","fairy9","fairy10","fairy11","fairy12","fairy13","fairy14","fairy15","fairy16","fairy17","fairy18","fairy19","fairy20","fairy21","fairy22","fairy23","fairy24","fairy25","fairy26","fairy27","fairy28","fairy29","fairy30","fairy31","fairy32","fairy33","fairy34","fairy35","fairy36","fairy37","fairy38","fairy39","fairy40","fairy41","fairy42","fairy43","fairy44","fairy45","fairy46","fairy47","fairy48","fairy49","fairy50","fairy51","fairy52","fairy53","fairy54","fairy55","fairy56","fairy57","fairy58","fairy59","fairy60","fairy61","fairy62","fairy63","fairy64","fairy65","fairy66","fairy67","fairy68","fairy69","fairy70","fairy71","fairy72","fairy73","fairy74","fairy75","fairy76","fairy77","fairy78","fairy79","fairy80","fairy81","fairy82","fairy83","fairy84","fairy85","fairy86","fairy87","fairy88","fairy89","fairy90","fairy91","fairy92","fairy93","fairy94","fairy95","fairy96","fairy97","fairy98","fairy99","fairy100","fairy101"];
    randomChoices = randomChoices.filter((item) => !toRemove.includes(item));

    if(enabledMods.includes("mods/fey_and_more.js") && enabledMods.includes("mods/randomness.js")) {
		//additional eList rebuilding for RM steel derivatives
		elements.tungstensteel.behavior = [
			"XX|DL:"+eLists.FAIRY+"|XX",
			"DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
			"XX|DL:"+eLists.FAIRY+"|XX",
		],
		elements.molten_tungstensteel.behavior = [
			"XX|DL:"+eLists.FAIRY+" AND CR:fire%2.5|XX",
			"DL:"+eLists.FAIRY+" AND M2|XX|DL:"+eLists.FAIRY+" AND M2",
			"M1|DL:"+eLists.FAIRY+"|M1",
		]
	};
});
