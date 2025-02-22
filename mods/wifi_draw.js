// RedBirdly's mod to draw lines between transmitters/receivers
// logicgates.js or wifi.js required

let logicReceivers = [];
let logicTransmitters = [];
let receivers = [];
let transmitters = [];

function updateLogicLists() {
	 receivers = [];
	 transmitters = [];
	logicReceivers = [];
	logicTransmitters = [];
	
	for (let i = 0; i < currentPixels.length; i++) {
		const pixel = currentPixels[i];
		if (pixel.element === "logic_receiver") {
			logicReceivers.push(pixel);
		} else if (pixel.element === "logic_transmitter") {
			logicTransmitters.push(pixel);
		} else if (pixel.element === "receiver") {
			receivers.push(pixel);
		} else if (pixel.element === "transmitter") {
			transmitters.push(pixel);
		}
	}
}

// Function to draw lines between linked transmitters and receivers
function drawLinks(ctx) {
	// Iterate through transmitters and receivers to draw lines for linked channels
	for (const transmitter of logicTransmitters) {
		for (const receiver of logicReceivers) {
			if (transmitter.channel === receiver.channel) {
				ctx.beginPath();
				ctx.moveTo(transmitter.x * pixelSize + pixelSizeHalf, transmitter.y * pixelSize + pixelSizeHalf);
				ctx.lineTo(receiver.x * pixelSize + pixelSizeHalf, receiver.y * pixelSize + pixelSizeHalf);
				ctx.strokeStyle = "RGBA(255,255,255,0.2)";

				const neighbors = [
					{ x: transmitter.x, y: transmitter.y - 1 }, // Top
					{ x: transmitter.x, y: transmitter.y + 1 }, // Bottom
					{ x: transmitter.x - 1, y: transmitter.y }, // Left
					{ x: transmitter.x + 1, y: transmitter.y }  // Right
				];

				let highlight = false;
				for (const neighbor of neighbors) {
					if (
						neighbor.x >= 0 && neighbor.x < width &&
						neighbor.y >= 0 && neighbor.y < height
					) {
						const neighborPixel = pixelMap[neighbor.x][neighbor.y];
						if (neighborPixel && neighborPixel.lstate > 0) {
							highlight = true;
							break;
						}
					}
				}

				if (highlight) {
					ctx.strokeStyle = "RGBA(255,200,0,0.4)";
				}
				
				ctx.lineWidth = 2;
				ctx.stroke();
			}
		}
	}

	// Iterate through transmitters and receivers to draw lines for linked channels
	for (const transmitter of transmitters) {
		for (const receiver of receivers) {
			if (transmitter._channel === receiver._channel) {
				ctx.beginPath();
				ctx.moveTo(transmitter.x * pixelSize + pixelSizeHalf, transmitter.y * pixelSize + pixelSizeHalf);
				ctx.lineTo(receiver.x * pixelSize + pixelSizeHalf, receiver.y * pixelSize + pixelSizeHalf);
				ctx.strokeStyle = "RGBA(0,0,255,0.2)";
				ctx.lineWidth = 2;
				ctx.stroke();
			}
		}
	}
}

renderPostPixel(updateLogicLists);
renderPostPixel(drawLinks);
