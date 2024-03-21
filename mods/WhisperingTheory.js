/* TODO
- [x] powder heater & coller
- [x] block roomtemp
- [x] no smoke from cold fire
*/

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

elements.powder_freeze = {
    category: "machines",
    behavior: [
        "XX|CO:10|XX",
        "CO:10|XX|CO:10",
        "M2|CO:10 AND M1|M2",
    ],
    color: "#1111dd",
    insulate: true,
};

elements.roomtemper = {
	color: "#29632f",
	behavior: behaviors.WALL,
	tick: function(pixel) {
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
},

elements.cold_fire.behavior = [
    "M1|M1|M1",
    "M2|DL%8|M2",
    "XX|M2|XX",
]
