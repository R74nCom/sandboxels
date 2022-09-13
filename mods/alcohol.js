elements.alcohol.name = "ethanol";
elements.alcohol.viscosity = 1.144;
elements.water.viscosity = 1; //define reference viscosity of 1

elements.methanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2":null },
        "plague": { "elem2":null },
        "head": { "elem2":"rotten_meat", "chance": 0.8 },
        "body": { "elem2":"rotten_meat", "chance": 0.8 },
    },
    viscosity: 0.56,
    //tempHigh: 64.7,
    burn: 100,
    burnTime: 2,
    fireColor: "#b2c5d1",
    category: "liquids",
    state: "liquid",
    density: 792,
    stain: -0.25,
}

elements.propanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2":null },
        "plague": { "elem2":null },
    },
    viscosity: 2.23, //EXERCISE 8: VISCOSITY OF PURE LIQUIDS AND SOLUTIONS
    //tempHigh: 97,
    burn: 100,
    burnTime: 3,
    fireColor: "#ced8de",
    category: "liquids",
    state: "liquid",
    density: 803,
    stain: -0.25,
}

elements.isopropanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2":null },
        "plague": { "elem2":null },
    },
    viscosity: 2.38, //http://www.ddbst.com/en/EED/PCP/VIS_C95.php (293K is close enough)
    //tempHigh: 82.5,
    burn: 100,
    burnTime: 3,
    fireColor: "#d1c958",
    category: "liquids",
    state: "liquid",
    density: 786,
    stain: -0.25,
}

elements.butanol = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2":null },
        "plague": { "elem2":null },
    },
    viscosity: 3.0011, //https://www.sciencedirect.com/science/article/abs/pii/S0021961416301446?via%3Dihub
    //tempHigh: 118,
    burn: 100,
    burnTime: 3,
    category: "liquids",
    state: "liquid",
    density: 810,
    stain: -0.25,
}

elements.alcohol.reactions.water = { //50% is close enough to the standard 40%
	elem1: "vodka",
	elem2: "vodka",
}

elements.vodka = {
	color: "#9FAEC5",
	behavior: behaviors.LIQUID,
	reactions: {
		"virus": { "elem2":null },
		"plague": { "elem2":null },
	},
	//tempLow: -16,
	//tempHigh: 78.37,
    tick: function(pixel) { 
		//thermal splitting function
        /*var randomNeighbor = adjacentCoords[Math.floor(Math.random() * adjacentCoords.length)]
        var rnx = randomNeighbor[0]
        var rny = randomNeighbor[1]
        if(pixel.temp >= 100) {
            if(isEmpty(pixel.x+rnx, pixel.y+rny, false)) {
                createPixel("ethanol_gas", pixel.x+rnx, pixel.y+rny)
                changePixel(pixel, "water")
            }
        }*/
    },
	/*burn: 20,
	burnTime: 60,
	burnInto: "vodka_extinguish_handler",
	fireColor: ["#80ACF0","#96CDFE","#bee6d4"],*/
	//It is not possible to have the vodka catch fire temporarily and then be briefly unable to do so again; it is even more impossible to avoid waves while doing this.
	category: "liquids",
	state: "liquid",
	density: 916,
	stain: -0.25,
}
