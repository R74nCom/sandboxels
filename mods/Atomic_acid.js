elements.Atomic_Acid = {
    color: "#22ff00",
    ignore: ["Atomic_Acid"],
    behavior: [
		"CH:Atomic_Acid|DL AND CH:Atomic_Acid|CH:Atomic_Acid",
		"DL AND M2 AND CH:Atomic_Acid|DL%5|DL AND M2 AND CH:Atomic_Acid",
		"M1 AND CH:Atomic_Acid|DL AND M1 AND CH:Atomic_Acid|M1 AND CH:Atomic_Acid",
	],
    category: "liquids",
    state:  "liquid",
    density: 1,
    stateHigh: "supernova",
    tempHigh: 1000,
    stateLow: "plasma",
    tempLow: -273,
};