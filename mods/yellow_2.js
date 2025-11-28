elements.yellow_2 = {
    color: "#ffff00",
    behavior: behaviors.LIQUID,
	 reactions: {
        "water": { elem1:null, elem2:"salt", chance:0.1},
        "sand": { elem1:null, elem2:"human", chance:0.1 },
		"diamond": { elem1:null, elem2:"gold", chance:0.01},
		"steel": {elem1:null, elem2:"purple_gold", chance:0.0001}
    },
 category: "land",
    state: "liquid"
}