// RedBirdly's mod that adds pixel text in sandboxels


function drawText(font, text, position, element, scale = 1) {
	const {
		x: startX,
		y: startY
	} = position;
	var currentX = startX;
	var currentY = startY;

	// Iterate through each character in the text
	for (var char of text) {
		if (char === '\n') {
			// Handle new lines
			currentY += (5 * scale) + scale; // Assuming each character height is 5 and we add 1 for line spacing
			currentX = startX;
			continue;
		}

		if (char === ' ') {
			// Handle spaces
			currentX += 4 * scale;
			continue;
		}

		// Get the character's pixel representation from the font
		const charArray = font[char];
		if (!charArray) {
			charArray = font["invalid"]
		}

		// Place the character in the pixelMap
		for (var row = 0; row < charArray.length; row++) {
			for (var col = 0; col < charArray[row].length; col++) {
				const pixel = charArray[row][col];
				if (pixel === '#') {
					for (var i = 0; i < scale; i++) {
						for (var j = 0; j < scale; j++) {
							var x = currentX + (col * scale) + j;
							var y = currentY + (row * scale) + i;
							if (x < width && y < height && !pixelMap[x][y]) {
								createPixel(element, x, y);
							}
						}
					}
				}
			}
		}

		// Move to the next character
		currentX += (charArray[0].length * scale) + scale;
	}
}

var textToPlace = "Text";
var textElement = "copper";

elements.text = {
	behavior: behaviors.WALL,
	category: "tools",
	state: "solid",
	maxSize: 1,
	cooldown: 2,
	onSelect: function() {
		textToPlace = prompt("Input Text\n(Previous element = Text's element)", textToPlace);
		textElement = previousValidTextElement;
	},
	tick: function(pixel) {
		if (pixel.start == pixelTicks) {
			deletePixel(pixel.x, pixel.y);
			drawText(font, textToPlace, {
				x: pixel.x,
				y: pixel.y
			}, textElement, 1);
		}
	}
};

// Keep track of previous valid text element, only if it can be used for text
var previousValidTextElement = "copper";
var oldSelectElement = selectElement;
selectElement = function(element) {
	// Don't include sand because the game auto-selects it at the start and would be annoying
	if (currentElement != "text" && currentElement != "unknown" && currentElement != "sand") {
		previousValidTextElement = currentElement;
	}
	oldSelectElement(element);
}


var font = {
	"invalid": [
		"###",
		"###",
		"###",
		"###",
		"###",
	],
	"A": [
		" # ",
		"# #",
		"###",
		"# #",
		"# #",
	],
	"B": [
		"## ",
		"# #",
		"## ",
		"# #",
		"###",
	],
	"C": [
		"##",
		"# ",
		"# ",
		"# ",
		"##",
	],
	"D": [
		"## ",
		"# #",
		"# #",
		"# #",
		"## ",
	],
	"E": [
		"###",
		"#  ",
		"## ",
		"#  ",
		"###",
	],
	"F": [
		"###",
		"#  ",
		"## ",
		"#  ",
		"#  ",
	],
	"G": [
		"###",
		"#  ",
		"# #",
		"# #",
		"###",
	],
	"H": [
		"# #",
		"# #",
		"###",
		"# #",
		"# #",
	],
	"I": [
		"###",
		" # ",
		" # ",
		" # ",
		"###",
	],
	"J": [
		"###",
		"  #",
		"  #",
		"# #",
		"## ",
	],
	"K": [
		"# #",
		"# #",
		"## ",
		"# #",
		"# #",
	],
	"L": [
		"#  ",
		"#  ",
		"#  ",
		"#  ",
		"###",
	],
	"M": [
		"#   #",
		"## ##",
		"# # #",
		"#   #",
		"#   #",
	],
	"N": [
		"#  #",
		"## #",
		"# ##",
		"#  #",
		"#  #",
	],
	"O": [
		"###",
		"# #",
		"# #",
		"# #",
		"###",
	],
	"P": [
		"###",
		"# #",
		"###",
		"#  ",
		"#  ",
	],
	"Q": [
		"###",
		"# #",
		"# #",
		"## ",
		"  #",
	],
	"R": [
		"###",
		"# #",
		"###",
		"## ",
		"# #",
	],
	"S": [
		"###",
		"#  ",
		"###",
		"  #",
		"###",
	],
	"T": [
		"###",
		" # ",
		" # ",
		" # ",
		" # ",
	],
	"U": [
		"# #",
		"# #",
		"# #",
		"# #",
		"###",
	],
	"V": [
		"# #",
		"# #",
		"# #",
		" # ",
		" # ",
	],
	"W": [
		"#   #",
		"#   #",
		"# # #",
		"## ##",
		"#   #",
	],
	"X": [
		"# #",
		"# #",
		" # ",
		"# #",
		"# #",
	],
	"Y": [
		"# #",
		"# #",
		" # ",
		" # ",
		" # ",
	],
	"Z": [
		"###",
		"  #",
		" # ",
		"#  ",
		"###",
	],
	"a": [
		"   ",
		"   ",
		" ##",
		"# #",
		" ##",
	],
	"b": [
		"#  ",
		"#  ",
		"###",
		"# #",
		"###",
	],
	"c": [
		"  ",
		" #",
		"# ",
		"# ",
		" #",
	],
	"d": [
		"  #",
		"  #",
		"###",
		"# #",
		"###",
	],
	"e": [
		" # ",
		"# #",
		"###",
		"#  ",
		" ##",
	],
	"f": [
		"  #",
		" # ",
		"###",
		" # ",
		" # ",
	],
	"g": [
		" ##",
		"# #",
		"###",
		"  #",
		"###",
	],
	"h": [
		"#  ",
		"#  ",
		"###",
		"# #",
		"# #",
	],
	"i": [
		" ",
		"#",
		" ",
		"#",
		"#",
	],
	"j": [
		"  #",
		"  #",
		"  #",
		"# #",
		"###",
	],
	"k": [
		"# #",
		"# #",
		"## ",
		"# #",
		"# #",
	],
	"l": [
		" ",
		"#",
		"#",
		"#",
		"#",
	],
	"m": [
		"     ",
		"## ##",
		"# # #",
		"#   #",
		"#   #",
	],
	"n": [
		"   ",
		"   ",
		"## ",
		"# #",
		"# #",
	],
	"o": [
		"   ",
		"   ",
		" ##",
		"# #",
		"## ",
	],
	"p": [
		"   ",
		"## ",
		"# #",
		"###",
		"#  ",
	],
	"q": [
		"   ",
		" ##",
		"# #",
		"###",
		"  #",
	],
	"r": [
		"  ",
		"##",
		"# ",
		"# ",
		"# ",
	],
	"s": [
		" ##",
		"#  ",
		"## ",
		"  #",
		"## ",
	],
	"t": [
		"   ",
		" # ",
		"###",
		" # ",
		" # ",
	],
	"u": [
		"   ",
		"   ",
		"# #",
		"# #",
		" ##",
	],
	"v": [
		"   ",
		"   ",
		"# #",
		"# #",
		" # ",
	],
	"w": [
		"     ",
		"     ",
		"#   #",
		"# # #",
		" # # ",
	],
	"x": [
		"   ",
		"   ",
		"# #",
		" # ",
		"# #",
	],
	"y": [
		"   ",
		"# #",
		" ##",
		"  #",
		" # ",
	],
	"z": [
		"   ",
		"###",
		" #",
		"#  ",
		"###",
	],
	"0": [
		"###",
		"# #",
		"# #",
		"# #",
		"###",
	],
	"1": [
		" # ",
		"## ",
		" # ",
		" # ",
		"###",
	],
	"2": [
		"###",
		"  #",
		"###",
		"#  ",
		"###",
	],
	"3": [
		"###",
		"  #",
		" ##",
		"  #",
		"###",
	],
	"4": [
		"# #",
		"# #",
		"###",
		"  #",
		"  #",
	],
	"5": [
		"###",
		"#  ",
		"###",
		"  #",
		"###",
	],
	"6": [
		"###",
		"#  ",
		"###",
		"# #",
		"###",
	],
	"7": [
		"###",
		"  #",
		"  #",
		"  #",
		"###",
	],
	"8": [
		"###",
		"# #",
		"###",
		"# #",
		"###",
	],
	"9": [
		"###",
		"# #",
		"###",
		"  #",
		"###",
	],
	"@": [
		" ### ",
		"#  ##",
		"# # #",
		"#  ##",
		" #   ",
	],
	"!": [
		"#",
		"#",
		"#",
		" ",
		"#",
	],
	"#": [
		" # # ",
		"#####",
		" # # ",
		"#####",
		" # # ",
	],
	"%": [
		"   # ",
		"#  # ",
		"  #  ",
		" #  #",
		" #   ",
	],
	"[": [
		"##",
		"# ",
		"# ",
		"# ",
		"##",
	],
	"]": [
		"##",
		" #",
		" #",
		" #",
		"##",
	],
	"{": [
		"  #",
		" # ",
		"## ",
		" # ",
		"  #",
	],
	"}": [
		"#  ",
		" # ",
		" ##",
		" # ",
		"#  ",
	],
	"<": [
		"  #",
		" # ",
		"#  ",
		" # ",
		"  #",
	],
	">": [
		"#  ",
		" # ",
		"  #",
		" # ",
		"#  ",
	],
	"(": [
		" #",
		"# ",
		"# ",
		"# ",
		" #",
	],
	")": [
		"# ",
		" #",
		" #",
		" #",
		"# ",
	],
	"-": [
		"   ",
		"   ",
		"###",
		"   ",
		"   ",
	],
	"_": [
		"   ",
		"   ",
		"   ",
		"   ",
		"###",
	],
	"^": [
		" # ",
		"# #",
		"   ",
		"   ",
		"   ",
	],
	"*": [
		" # ",
		"###",
		" # ",
		"   ",
		"   ",
	],
	"+": [
		"   ",
		" # ",
		"###",
		" # ",
		"   ",
	],
	"/": [
		"  #",
		" # ",
		" # ",
		" # ",
		"#  ",
	],
	"?": [
		" ##",
		"# #",
		"  #",
		"   ",
		" # ",
	],
	".": [
		" ",
		" ",
		" ",
		" ",
		"#",
	],
	",": [
		" ",
		" ",
		" ",
		"#",
		"#",
	],
};
