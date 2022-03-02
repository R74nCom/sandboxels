msColorArray = ["#a0a0a0", "#0000ff", "#008000", "#ff0000", "#000080", "#800000", "#008080", "#000000", "#808080"]

elements.msfield = {
	name: "minefield",
	color: "#c0c0c0",
	conduct: 1,
	insulate: true,
	properties: {
		uwu: 0,
		revealed: false,
		revealedAround: false,
	},
	tick: function(pixel) {
		if(typeof(pixel.revealed) === 'undefined') {
			pixel.revealed = false
		}
		if(typeof(pixel.uwu) === 'undefined') {
			pixel.uwu = 0
		}
		if(typeof(pixel.revealedAround) === 'undefined') {
			pixel.revealedAround = false
		}
		if(pixel.charge) {
			pixel.revealed = true
			delete pixel.charge
			if(pixel.chargeCD) {
				delete pixel.chargeCD
			}
		}
		if(pixel.revealed) {
			//count neighbors
			pixel.uwu = 0
			for (let i = -1; i < 2; i++) {
				for (let j = -1; j < 2; j++) {
					if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
						if (pixelMap[pixel.x+j][pixel.y+i].element == "msmine") {
							pixel.uwu += 1
						}
					}
				}
			}
			if(typeof(pixel.uwu) === 'number' && isFinite(pixel.uwu) && !isNaN(pixel.uwu)) {
				if(pixel.uwu >= 0 && pixel.uwu <= 8) {
					pixel.color = msColorArray[pixel.uwu]
				}
			} else {
				pixel.color = "#ff00ff"
			}
		} else {
			pixel.color = "#c0c0c0" //I feel bad suppressing the sand effect.
		}
	},
	category: "special",
	state: "solid",
	hidden: true,
};

elements.msmine = {
	name: "minefield",
	color: "#c0c0c0",
	conduct: 1,
	insulate: true,
	properties: {
		uwu: 0,
		revealed: false,
	},
	tick: function(pixel) {
		if(pixel.charge) {
			pixel.revealed = true
			delete pixel.charge
			if(pixel.chargeCD) {
				delete pixel.chargeCD
			}
		}
		if(pixel.revealed) {
			pixel.color = ("#" + ((192 + Math.abs((pixelTicks * 4) % 64)).toString(16) + "c0c0").padStart(6, '0'));
			//oldFillStyle = ctx.fillStyle
			//ctx.fillStyle = "#ff0000";
			////ctx.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize/2, pixelSize);
			//ctx.fillRect(23*pixelSize, 23*pixelSize, pixelSize/2, pixelSize);
			//ctx.fillStyle = oldFillStyle;
		} else {
			pixel.color = "#c0c0c0"
		}
	},
	category: "special",
	state: "solid",
	hidden: true,
};

elements.ms = { //minesweeper = {
	color: ["#c0c0c0", "#c0c0c0", "#ff0000", "#008000", "#ff0000", "#000080", "#800000", "#008080", "#000000", "#808080", "#808080"],
	behavior: [
		"XX|XX|XX",
		"XX|CH:msfield,msfield,msfield,msfield,msfield,msfield,msfield,msfield,msfield,msmine|XX",
		"XX|XX|XX"
	],
	category: "special",
	state: "solid",
};