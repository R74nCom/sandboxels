window.addEventListener('load', function() {
    console.log("attempted override")
	pixelColorPick = function(pixel,customColor=null) {
        var element = pixel.element;
        var elementInfo = elements[element];
        //if (elementInfo.behavior instanceof Array) {
        
        if (pixel.charge && elementInfo.colorOn) {
            customColor = elementInfo.colorOn;
        }
        if (customColor != null) {
            if (Array.isArray(customColor)) {
                customColor = customColor[0];
            }
            if (customColor.startsWith("#")) {
                customColor = hexToRGB(customColor);
            }
            var rgb = customColor;
        }
        else {
            var rgb = elements[element].colorObject; // {r, g, b}
            // If rgb is an array, choose a random item
            if (Array.isArray(rgb)) {
                rgb = rgb[0];
            }
        }
        // Randomly darken or lighten the RGB color
        var coloroffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 15);
        var r = rgb.r + 0;
        var g = rgb.g + 0;
        var b = rgb.b + 0;
        // Make sure the color is within the RGB range
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));
        var color = "rgb("+r+","+g+","+b+")";
        
        /*}
        else {
            var color = elementInfo.color;
            if (Array.isArray(color)) {
                color = color[Math.floor(Math.random() * color.length)];
            }
        }*/
        return color;
    }
});
