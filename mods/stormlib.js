class stormlibRandom {
	int(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	max(max) {
		let treturn = Math.floor(Math.random() * max)
		if (treturn !== 0) {
			return treturn +1
	    } else {
	    	return treturn
	    }
	}

	option(array) {
		if (array.length < 1) return null;
		return array[this.int(0, array.length -1)]
	}

	string(length = 8, disallowed = ['☭']) {
		let chars = [
		    'a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G',
		    'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N',
		    'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U',
		    'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
		    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+',
		    '[', ']', '{', '}', '\\', '|', ';', ':', '\'', '"', ',', '.', '/', '<',
		    '>', '?', '`', '~'
		]

		let str = ''

		while (str.length < length) {
			let char = this.option(chars)
			if (!disallowed.includes(char)) {
				str += char
			}
		}

		return str
	}
}

class stormlibElement {
	exists(name) {
		return elements.hasOwnProperty(name)
	}
}

class stormlibColor {
	lighten(hex, percent = 10) {
		let rgb = hexToRGB(hex)
		if (rgb == null) return '#ffffff';
		let r = rgb.r 
		let g = rgb.g 
		let b = rgb.b 

		r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
        g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
        b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

        return RGBToHex({r: r, g: g, b: b})
	}

	darken(hex, percent = 10) {
		let rgb = hexToRGB(hex)
		if (rgb == null) return '#000000';
		let r = rgb.r 
		let g = rgb.g 
		let b = rgb.b 

		r = Math.max(0, Math.floor(r * (1 - percent / 100)));
        g = Math.max(0, Math.floor(g * (1 - percent / 100)));
        b = Math.max(0, Math.floor(b * (1 - percent / 100)));

        return RGBToHex({r: r, g: g, b: b})
	}
}

class stormlibPixels {
	create(x, y, color) {
		let canvas = document.getElementById('game')
		if (x < canvas.width && y < canvas.height) {
			let old = ctx.fillStyle
			ctx.fillStyle = color
			ctx.fillRect(x, y, pixelSize, pixelSize)
		}
	}
}

let Elements = new stormlibElement
let Random = new stormlibRandom
let Color = new stormlibColor
let Pixels = new stormlibPixels

setInterval(() => {
	Pixels.create(85, 45, '#ff0000')
}, 1000/tps)