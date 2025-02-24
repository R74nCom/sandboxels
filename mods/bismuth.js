elements.bismuth = {
	color: ["#7814c4","#4a2fe0","#2fa2e0","#2fe099","#70e02f"],
	behavior: behaviors.WALL,
	category: "bismuth's stuff",
	state: "solid",
    tempHigh: 271.4,
    stateHigh: "moltenBismuth"
}

elements.moltenBismuth = {
    color: "#666675",
    behavior: behaviors.MOLTEN,
    category: "bismuth's stuff",
    state: "liquid",
    tempLow: 271.4,
    stateLow: "bismuth",
    temp: 300
}