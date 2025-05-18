
// Created by Rain :o 21/11 2024

runPerPixel(function(pixel) { // adds a universal tick: function(pixel) to every pixel no matter the element

	if (view != 3) { // don't continue the effect when on basic view
		if (elements[pixel.element].state == "liquid") {
			find()
			let finalColor = averageColor(colorArray)
			pixel.color = finalColor
            
		}
    }

	function find() { // finds and stores the colors of viable surrounding pixels
		colorArray = []; // empty array to fill later

		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				let x = pixel.x + dx;
				let y = pixel.y + dy;

				if (Math.abs(dx) + Math.abs(dy) > 1) continue; // makes it not check diagonal pixels for color averaging for better performance

				let neighboringPixel = pixelMap[x]?.[y];

				if (neighboringPixel && elements[neighboringPixel.element].state == "liquid") {
					colorArray.push(neighboringPixel.color);
                }
				
			}
		}
	}

	function averageColor(colors) { // calculates the average of colors given by find()
		let totalR = 0, totalG = 0, totalB = 0;

		// Loop through each color and get RGB components
		colorArray.forEach(color => {

			let match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

			if (match) {
				let r = parseInt(match[1]);
				let g = parseInt(match[2]);
				let b = parseInt(match[3]);

				// Accumulate RGB values from every color examined
				totalR += r;
				totalG += g;
				totalB += b;
			}
		});

		// Divide the total value for each channel by the number of colors to get the average
		let count = colorArray.length;
		let avgR = Math.round(totalR / count); // Math.round rounds the value to the nearest integer as pixel brightness cannot be in fractions
		let avgG = Math.round(totalG / count);
		let avgB = Math.round(totalB / count);

		// Return the average color as an RGB string
		return `rgb(${avgR}, ${avgG}, ${avgB})`; // formatted to be readable by Sandboxels as a color 
	}

})