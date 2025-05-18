// made by dogo8me2 lololol
let channelVar = "0";

// RF Transmitter Element
elements.rf_transmitter = {
    color: "#142c47",
    category: "machines",
    behavior: behaviors.WALL,
    tempHigh: 250,
    stateHigh: "dirt",
    hoverStat: function(pixel) {
        return pixel.channel || "unset";
    },
    onSelect: function() {
        let ans1 = prompt("Set the transmitter channel (numbers only):", channelVar || 0);
        channelVar = ans1;
    },
    tick: function(pixel) {
        if (!pixel.channel) {
            pixel.channel = channelVar;
        }
        for (let i in currentPixels) {
            let otherPixel = currentPixels[i];
            if (otherPixel.element == "rf_receiver" && otherPixel.channel == pixel.channel) {
                for (let j = 0; j < adjacentCoords.length; j++) {
                    let coord = adjacentCoords[j];
                    let x = otherPixel.x + coord[0];
                    let y = otherPixel.y + coord[1];
                    if (!isEmpty(x, y, true)) {
                        let neighborPixel = pixelMap[x][y];
                        if (elements[neighborPixel.element].conduct) {
                            neighborPixel.charge = pixel.charge;
                        }
                    }
                }
            }
        }
        doDefaults(pixel);
    },
    conduct: 1
};

// RF Receiver Element
elements.rf_receiver = {
    color: "#142c47",
    category: "machines",
    behaviors: behaviors.WALL,
    tempHigh: 250,
    stateHigh: "dirt",
    hoverStat: function(pixel) {
        return pixel.channel || "unset";
    },
    onSelect: function() {
        let ans1 = prompt("Set the receiver channel (numbers only):", channelVar || 0);
        channelVar = ans1;
    },
    tick: function(pixel) {
        if (!pixel.channel) {
            pixel.channel = channelVar;
        }
    }
};
