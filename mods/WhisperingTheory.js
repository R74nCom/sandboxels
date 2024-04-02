elements.roomtemper = {
	color: "#29632f",
	behavior: behaviors.WALL,
	tick: function(pixel) {
        // from nouserthings.js <3
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < -230) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > 270) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
};

elements.cold_fire.behavior = [
    "M1|M1|M1",
    "M2|DL%8|M2",
    "XX|M2|XX",
];

// powder
elements.powder_heater = {
    category: "machines",
    behavior: [
        "XX|HT:2|XX",
        "HT:2|XX|HT:2",
        "M2|HT:2 AND M1|M2",
    ],
    color: "#881111",
    insulate: true,
};

elements.powder_cooler = {
    category: "machines",
    behavior: [
        "XX|CO:2|XX",
        "CO:2|XX|CO:2",
        "M2|CO:2 AND M1|M2",
    ],
    color: "#111188",
    insulate: true,
};

elements.powder_superheater = {
    category: "machines",
    behavior: [
        "XX|HT:10|XX",
        "HT:10|XX|HT:10",
        "M2|HT:10 AND M1|M2",
    ],
    color: "#dd1111",
    insulate: true,
};

elements.powder_freezer = {
    category: "machines",
    behavior: [
        "XX|CO:10|XX",
        "CO:10|XX|CO:10",
        "M2|CO:10 AND M1|M2",
    ],
    color: "#1111dd",
    insulate: true,
};

// gas
elements.gas_heater = {
    color: "#881111",
    behavior: [
        "M2|M1 AND HT:2|M2",
        "M1 AND HT:2|XX|M1 AND HT:2",
        "M2|M1 AND HT:2 | M2",
    ],
    category: "machines",
    insulate: true,
};

elements.gas_cooler = {
    color: "#111188",
    behavior: [
        "M2|M1 AND CO:2|M2",
        "M1 AND CO:2|XX|M1 AND CO:2",
        "M2|M1 AND CO:2|M2",
    ],
    category: "machines",
    insulate: true,
};

elements.gas_superheater = {
    color: "#dd1111",
    behavior: [
        "M2|M1 AND HT:10|M2",
        "M1 AND HT:10|XX|M1 AND HT:10",
        "M2|M1 AND HT:10|M2",
    ],
    category: "machines",
    insulate: true,
};

elements.gas_freezer = {
    color: "#1111dd",
    behavior: [
        "M2|M1 AND CO:10|M2",
        "M1 AND CO:10|XX|M1 AND CO:10",
        "M2|M1 AND CO:10|M2",
    ],
    category: "machines",
    insulate: true,
};

// antipowder
elements.anti_heater = {
    color: "#881111",
    behavior: [
        "M2|M1 AND HT:2|M2",
        "HT:2|XX|HT:2",
        "XX|HT:2|XX",
    ],
    category: "special",
    insulate: true,
};

elements.anti_cooler = {
    color: "#111188",
    behavior: [
        "M2|M1 AND CO:2|M2",
        "CO:2|XX|CO:2",
        "XX:CO:2|XX",
    ],
    category: "special",
    insulate: true,
};

elements.anti_superheater = {
    color: "#881111",
    behavior: [
        "M2|M1 AND HT:10|M2",
        "HT:10|XX|HT:10",
        "XX|HT:10|XX",
    ],
    category: "special",
    insulate: true,
};

elements.anti_freezer = {
    color: "#1111dd",
    behavior: [
        "M2|M1 AND CO:10|M2",
        "CO:10|XX|CO:10",
        "XX:CO:10|XX",
    ],
    category: "special",
    insulate: true,
};

elements.heater_gas = {
    color: "#881111",
    behavior: [
        "M2|M1 AND HT:2|M2",
        "M1 AND HT:2|XX|M1 AND HT:2",
        "M2|M1 aND HT:2|M2",
    ],
    category: "special",
    insulate: true,
}

elements.cooler_gas = {
    color: "#111188",
    behavior: [
        "M2|M1 AND CO:2|M2",
        "M1 AND CO:2|XX|M1 AND CO:2",
        "M2|M1 A ND CO:2|M2",
    ],
    category: "special",
    insulate: true,
}

elements.superheater_gas = {
    color: "#881111",
    behavior: [
        "M2|M1 AND H1:10|M2",
        "M1 AND HT:10|XX|M1 AND HT:10",
        "M2|M1 AND HT:10|M2",
    ],
    category: "special",
    insulate: true,
}

elements.freezer_gas = {
    color: "#1111dd",
    behavior: [
        "M2|M1 AND CO:10|M2",
        "M1 AND CO:10|XX|M1 AND CO:10",
        "M2|M1 AND CO:10|M2",
    ],
    category: "special",
    insulate: true,
}