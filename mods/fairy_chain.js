if(enabledMods.includes("mods/fey_and_more.js")) {

	//fairy fairy {
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
	//}

	//fairy fairy fairy {
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
			hidden: true
		}
	//}

	//fairy fairy fairy fairy {
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
			hidden: true
		}
	//}

	//fairy fairy fairy fairy fairy {
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
			hidden: true
		}
	//}

	//fairy fairy fairy fairy fairy fairy {
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
			hidden: true
		}
	//}

	//fairy fairy fairy fairy fairy fairy fairy {
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
			hidden: true
		}
	//}

	//fairy fairy fairy fairy fairy fairy fairy fairy {
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
			hidden: true
		}
	//}

	//fairy fairy fairy fairy fairy fairy fairy fairy fairy {
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
			hidden: true
		}
	//}

	//fairy fairy fairy fairy fairy fairy fairy fairy fairy fairy {
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
			hidden: true
		}
	//}

	//fairy fairy fairy fairy fairy fairy fairy fairy fairy fairy fairy {
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
			hidden: true
		}
	//}

	//fairy fairy fairy fairy fairy fairy fairy fairy fairy fairy fairy fairy {
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
			hidden: true
		}
	//}

	//fairy fairy fairy fairy fairy fairy fairy fairy fairy fairy fairy fairy fairy {
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
			hidden: true
		}
	//}

	//14-fairy {
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
			hidden: true
		}
	//}

	//15-fairy {
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
			hidden: true
		}
	//}

	//16-fairy {
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
			hidden: true
		}
	//}

	//17-fairy {
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
			hidden: true
		}
	//}

	//18-fairy {
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
			hidden: true
		}
	//}

	//19-fairy {
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
			hidden: true
		}
	//}

	//20-fairy {
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
			hidden: true
		}
	//}

	//21-fairy {
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
		}
	//}

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
