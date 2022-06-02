function _rgbToHex(color) {
    if(typeof(color) == "object") { //Expects object like "{r: 172, g: 11, b: 34}"
        //console.log("Loading colors");
        //console.log("Loading R");
        var red = color.r;
        //console.log("Loading G");
        var green = color.g;
        //console.log("Loading B");
        var blue = color.b;
        //console.log("Rounding R");
        red = Math.round(red);
        //console.log("Rounding G");
        green = Math.round(green);
        //console.log("Rounding B");
        blue = Math.round(blue);
        //console.log("Bounding R");
        red = Math.min(255,Math.max(0,red));
        //console.log("Bounding G");
        green = Math.min(255,Math.max(0,green));
        //console.log("Bounding B");
        blue = Math.min(255,Math.max(0,blue));
        //console.log("Converting R");
        red = red.toString(16);
        //console.log("Converting G");
        green = green.toString(16);
        //console.log("Converting B");
        blue = blue.toString(16);
        //console.log("Padding R");
        while(red.length < 2) {
            red = "0" + red;
        };
        //console.log("Padding G");
        while(green.length < 2) {
            green = "0" + green;
        };
        //console.log("Padding B");
        while(blue.length < 2) {
            blue = "0" + blue;
        };
        //console.log("Concatenating");
        return "#" + red + green + blue;
    } else if(typeof(color) == "string") { //Expects string like "rgb(20,137,4)".
        //console.log("Splitting string")
        color = color.split(",");
        //console.log("Getting R");
        var red = parseFloat(color[0].substring(4))
        //console.log("Getting G");
        var green = parseFloat(color[1])
        //console.log("Getting B");
        var blue = parseFloat(color[2].slice(0,-1)) 
        //console.log("Rounding R");
        red = Math.round(red);
        //console.log("Rounding G");
        green = Math.round(green);
        //console.log("Rounding B");
        blue = Math.round(blue);
        //console.log("Bounding R");
        red = Math.min(255,Math.max(0,red));
        //console.log("Bounding G");
        green = Math.min(255,Math.max(0,green));
        //console.log("Bounding B");
        blue = Math.min(255,Math.max(0,blue));
        //console.log("Converting R");
        red = red.toString(16);
        //console.log("Converting G");
        green = green.toString(16);
        //console.log("Converting B");
        blue = blue.toString(16);
        //console.log("Padding R");
        while(red.length < 2) {
            red = "0" + red;
        };
        //console.log("Padding G");
        while(green.length < 2) {
            green = "0" + green;
        };
        //console.log("Padding B");
        while(blue.length < 2) {
            blue = "0" + blue;
        };
        //console.log("Concatenating");
        return "#" + red + green + blue;
        } else {
        throw "error: Only objects and strings are supported."
    };
};

elements.multiply_color = {
    color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
    tool: function(pixel) {
        // convert the hex of currentColor to rgb and set it as a string
        var rgb = currentColor.replace("#","").match(/.{1,2}/g);
        for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(rgb[i],16);
        }
        var oldColor = hexToRGB(_rgbToHex(pixel.color))
        var finalColor = [Math.round(oldColor.r * (rgb[0] / 255)), Math.round(oldColor.g * (rgb[1] / 255)), Math.round(oldColor.b * (rgb[2] / 255))]
        pixel.color = "rgb(" + finalColor.join(",") + ")"
    },
    customColor: true,
    category: "color tools", //the toolbar is getting cluttered
    excludeRandom: true, //the toolbar is getting cluttered
}

/*elements.divide_color = { //can't get it to work how I want it to work
    color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
    tool: function(pixel) {
        // convert the hex of currentColor to rgb and set it as a string
        var rgb = currentColor.replace("#","").match(/.{1,2}/g);
        for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(rgb[i],16);
        }
        var oldColor = hexToRGB(_rgbToHex(pixel.color))
        var finalColor = [Math.round(256 / ((rgb[0] + 1) / (oldColor.r + 1))), Math.round(256 / ((rgb[1] + 1) / (oldColor.g + 1))), Math.round(256 / ((rgb[2] + 1) / (oldColor.b + 1)))]
        pixel.color = "rgb(" + finalColor.join(",") + ")"
    },
    customColor: true,
    category: "color tools",
    excludeRandom: true,
}*/

elements.add_color = {
    color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
    tool: function(pixel) {
        // convert the hex of currentColor to rgb and set it as a string
        var rgb = currentColor.replace("#","").match(/.{1,2}/g);
        for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(rgb[i],16);
        }
        var oldColor = hexToRGB(_rgbToHex(pixel.color))
        var finalColor = [Math.min(oldColor.r + rgb[0], 255), Math.min(oldColor.g + rgb[1], 255), Math.min(oldColor.b + rgb[2], 255)]
        pixel.color = "rgb(" + finalColor.join(",") + ")"
    },
    customColor: true,
    category: "color tools",
    excludeRandom: true,
}

elements.subtract_color = {
    color: ["#c27070","#c29c70","#c2c270","#70c270","#70c2c2","#7070c2","#c270c2"],
    tool: function(pixel) {
        // convert the hex of currentColor to rgb and set it as a string
        var rgb = currentColor.replace("#","").match(/.{1,2}/g);
        for (var i = 0; i < rgb.length; i++) {
            rgb[i] = parseInt(rgb[i],16);
        }
        var oldColor = hexToRGB(_rgbToHex(pixel.color))
        var finalColor = [Math.max(oldColor.r - rgb[0], 0), Math.max(oldColor.g - rgb[1], 0), Math.max(oldColor.b - rgb[2], 0)]
        pixel.color = "rgb(" + finalColor.join(",") + ")"
    },
    customColor: true,
    category: "color tools",
    excludeRandom: true,
}

elements.grayscale = {
    color: ["#7f7f7f"],
    tool: function(pixel) {
        // convert the hex of currentColor to rgb and set it as a string
        var oldColor = hexToRGB(_rgbToHex(pixel.color))
        var lightness = Math.round((oldColor.r * 0.299) + (oldColor.g * 0.587) + (oldColor.b * 0.114))
        var finalColor = [lightness, lightness, lightness]
        pixel.color = "rgb(" + finalColor.join(",") + ")"
    },
    category: "color tools",
    excludeRandom: true,
}

elements.invert = {
    color: ["#ff0000", "#00ffff"],
    tool: function(pixel) {
        // convert the hex of currentColor to rgb and set it as a string
        var oldColor = hexToRGB(_rgbToHex(pixel.color))
        var finalColor = [(255 - oldColor.r), (255 - oldColor.g), (255 - oldColor.b)]
        pixel.color = "rgb(" + finalColor.join(",") + ")"
    },
    category: "color tools",
    excludeRandom: true,
}

elements.reverse_R_G_B = {
    color: ["#7f7f7f"],
    tool: function(pixel) {
        // convert the hex of currentColor to rgb and set it as a string
        var oldColor = hexToRGB(_rgbToHex(pixel.color))
        var finalColor = [oldColor.b, oldColor.g, oldColor.r]
        pixel.color = "rgb(" + finalColor.join(",") + ")"
    },
    category: "color tools",
    excludeRandom: true,
}

elements.shift_R_G_B = {
    color: ["#7f7f7f"],
    tool: function(pixel) {
        // convert the hex of currentColor to rgb and set it as a string
        var oldColor = hexToRGB(_rgbToHex(pixel.color))
        var finalColor = [oldColor.g, oldColor.b, oldColor.r]
        pixel.color = "rgb(" + finalColor.join(",") + ")"
    },
    category: "color tools",
    excludeRandom: true,
}