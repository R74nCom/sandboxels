selectivePaintElem = ""
elements.selective_paint = {
    color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
    onSelect: function() {
        var answer = prompt("Please input the desired element to paint. It will not work if you enter multiple elements types while paused.",(selectivePaintElem||undefined));
        if (!answer) { return }
		selectivePaintElem = mostSimilarElement(answer);
    },
    tool: function(pixel) {
        if (pixel.element == selectivePaintElem) {
            if (!shiftDown) {
                pixel.color = pixelColorPick(pixel,currentColor)
            }
            else {
                // convert the hex of currentColor to rgb and set it as a string
                var rgb = currentColor.replace("#","").match(/.{1,2}/g);
                for (var i = 0; i < rgb.length; i++) {
                    rgb[i] = parseInt(rgb[i],16);
                }
                pixel.color = "rgb(" + rgb.join(",") + ")"
            }
            delete pixel.origColor;
        }
    },
    customColor: true,
    category: "tools",
    canPlace: false,
    excludeRandom:true,
    desc: "Use on selected pixels to change their color."
}
selectivePaintElem2 = ""
elements.exclusive_paint = {
    color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
    onSelect: function() {
        var answer2 = prompt("Please input the desired element not to paint. It will not work if you enter multiple elements types while paused.",(selectivePaintElem2||undefined));
        if (!answer2) { return }
		selectivePaintElem2 = mostSimilarElement(answer2);
    },
    tool: function(pixel) {
        if (pixel.element != selectivePaintElem2) {
            if (!shiftDown) {
                pixel.color = pixelColorPick(pixel,currentColor)
            }
            else {
                // convert the hex of currentColor to rgb and set it as a string
                var rgb = currentColor.replace("#","").match(/.{1,2}/g);
                for (var i = 0; i < rgb.length; i++) {
                    rgb[i] = parseInt(rgb[i],16);
                }
                pixel.color = "rgb(" + rgb.join(",") + ")"
            }
            delete pixel.origColor;
        }
    },
    customColor: true,
    category: "tools",
    canPlace: false,
    excludeRandom:true,
    desc: "Used to paint pixels other than the one selected."
}
