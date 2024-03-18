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
    pixelTempCheck = function(pixel){
        if (pixel.del) { return }
        var elementInfo = elements[pixel.element];
        if (pixel.temp < absoluteZero) { // Absolute Zero
            pixel.temp = absoluteZero;
        }
        // If the pixel's temp >= the elementInfo tempHigh, change pixel.element to elementInfo.stateHigh
        if (pixel.temp >= elementInfo.tempHigh) {
            var result = elementInfo.stateHigh;
            if (elementInfo.extraTempHigh) {
                for (var extraTemp in elementInfo.extraTempHigh) {
                    if (pixel.temp >= extraTemp) {
                        result = elementInfo.extraTempHigh[extraTemp];
                    }
                }
            }
            // If result is an array, choose a random item
            if (Array.isArray(result)) {
                result = result[Math.floor(Math.random() * result.length)];
            }
            if (result === null) {deletePixel(pixel.x,pixel.y);return false}
            else {
                if (elements[result].customColor) {
                    changePixel(pixel,result,false);
                    pixel.color = color;
                }
                else if (elementInfo.stateHighColor) {
                    changePixel(pixel,result,false);
                    pixel.color = pixelColorPick(pixel,elementInfo.stateHighColor);
                }
                else if (elementInfo.stateHighColorMultiplier) {
                    var color = pixel.color;
                    changePixel(pixel,result,false);
                    var rgb = color.match(/\d+/g);
                    var m = elementInfo.stateHighColorMultiplier;
                    if (Array.isArray(m)) {
                        m = m[0];
                    }
                    var r = Math.floor(rgb[0] * m);
                    var g = Math.floor(rgb[1] * m);
                    var b = Math.floor(rgb[2] * m);
                    // Make sure the color is within the RGB range
                    r = Math.max(0, Math.min(255, r));
                    g = Math.max(0, Math.min(255, g));
                    b = Math.max(0, Math.min(255, b));
                    pixel.color = "rgb("+r+","+g+","+b+")";
                }
                else { changePixel(pixel,result,false); }
                if (elementInfo.fireColor && result==="fire") {
                    pixel.color = pixelColorPick(pixel,elementInfo.fireColor);
                }
            }
        }
        // If the pixel's temp <= the elementInfo tempLow, change pixel.element to elementInfo.stateLow
        else if (pixel.temp <= elementInfo.tempLow) {
            var result = elementInfo.stateLow;
            if (elementInfo.extraTempLow) {
                for (var extraTemp in elementInfo.extraTempLow) {
                    if (pixel.temp <= extraTemp) {
                        result = elementInfo.extraTempLow[extraTemp];
                    }
                }
            }
            // If result is an array, choose a random item
            if (Array.isArray(result)) {
                result = result[Math.floor(Math.random() * result.length)];
            }
            if (result === null) {deletePixel(pixel.x,pixel.y);return false}
            else {
                if (elements[result].customColor) {
                    changePixel(pixel,result,false);
                    pixel.color = color;
                }
                else if (elementInfo.stateLowColor) {
                    changePixel(pixel,result,false);
                    pixel.color = pixelColorPick(pixel,elementInfo.stateLowColor);
                }
                else if (elementInfo.stateLowColorMultiplier) {
                    var color = pixel.color;
                    changePixel(pixel,result,false);
                    var rgb = color.match(/\d+/g);
                    var m = elementInfo.stateLowColorMultiplier;
                    if (Array.isArray(m)) {
                        m = m[0];
                    }
                    var r = Math.floor(rgb[0] * m);
                    var g = Math.floor(rgb[1] * m);
                    var b = Math.floor(rgb[2] * m);
                    // Make sure the color is within the RGB range
                    r = Math.max(0, Math.min(255, r));
                    g = Math.max(0, Math.min(255, g));
                    b = Math.max(0, Math.min(255, b));
                    pixel.color = "rgb("+r+","+g+","+b+")";
                }
                else { changePixel(pixel,result,false); }
            }
        }
        return true;
    }
});
