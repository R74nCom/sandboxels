pixelColorPick = function(pixel,customColor=null) {
    let element = pixel.element;
    let elementInfo = elements[element];
    //if (elementInfo.behavior instanceof Array) {
    
    if (pixel.charge && elementInfo.colorOn) {
        customColor = elementInfo.colorOn;
    }
    let rgb;
    if (customColor !== null) {
        if (Array.isArray(customColor)) {
            customColor = customColor[Math.floor(Math.random() * customColor.length)];
        }
        if (customColor.startsWith("#")) {
            customColor = hexToRGB(customColor);
        }
        rgb = customColor;
    }
    else {
        rgb = elements[element].colorObject; // {r, g, b}
        // If rgb is an array, choose a random item
        if (Array.isArray(rgb)) {
            rgb = rgb[Math.floor(Math.random() * rgb.length)];
        }
    }
    // Randomly darken or lighten the RGB color
    let grain = 15;
    if (elementInfo.grain !== undefined) { grain = grain * elementInfo.grain }
    let coloroffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * grain);
    let r = rgb.r + coloroffset;
    let g = rgb.g + coloroffset;
    let b = rgb.b + coloroffset;
    // better_grain.js changes begin
    let hsl = RGBToHSL([r,g,b]);
    hsl[0] += coloroffset/1.5/255;
    // console.log(hsl)
    let rgb2 = HSLtoRGB(hsl);
    r = Math.round(rgb2[0]); g = Math.round(rgb2[1]); b = Math.round(rgb2[2]);
    // better_grain.js changes end
    // Make sure the color is within the RGB range
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    let color = "rgb("+r+","+g+","+b+")";
    
    /*}
    else {
        var color = elementInfo.color;
        if (Array.isArray(color)) {
            color = color[Math.floor(Math.random() * color.length)];
        }
    }*/
    return color;
}