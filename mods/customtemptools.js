var ct = 100

elements.customtemp = {
    color: ["#FF0000", "#FF6600", "#FFCC00", "#FFFF00", "#CCFF00", "#66FF00", "#00FF00", "#00FF66", "#00FFCC", "#00FFFF"],
    onSelect: function() {
        var answer4 = parseInt(prompt("Please input the desired temperature to reach.",(ct||undefined)));
        if (!answer4) { return }
        ct = answer4;
        if (isNaN(answer4)) {
            ct = 100
        }
    },
    tool: function(pixel) {
        pixel.temp = ct,
		pixelTempCheck(pixel)
    },
    category: "tools",
};
elements.customheat = {
    color: ["#FF0000", "#FFFFFF", "#FF0000"],
    onSelect: function() {
        var answer4 = parseInt(prompt("Please input the desired temperature increase per tick. (In celsius)",(ct||undefined)));
        if (!answer4) { return }
        ct = answer4;
        if (isNaN(answer4)) {
            ct = 100
        }
    },
    tool: function(pixel) {
        pixel.temp = pixel.temp + ct,
		pixelTempCheck(pixel)
    },
    category: "tools",
};
elements.customcool = {
    color: ["#0000FF", "#FFFFFF", "#0000FF"],
    onSelect: function() {
        var answer4 = parseInt(prompt("Please input the desired temperature decrease per tick. (In celsius)",(ct||undefined)));
        if (!answer4) { return }
        ct = answer4;
        if (isNaN(answer4)) {
            ct = 100
        }
    },
    tool: function(pixel) {
        pixel.temp = pixel.temp - ct,
		pixelTempCheck(pixel)
    },
    category: "tools",
};
