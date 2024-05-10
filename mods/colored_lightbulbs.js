elements.colored_light_bulb = {
    color: "#666666",
    colorOn: "#ffffff",
    behavior: behaviors.WALL,
    category: "machines",
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_copper"],
    conduct: 1,
    breakInto: "glass_shard",
    tick: function(pixel) {
        if (pixel.start == pixelTicks) {
            pixel.normalColor = pixel.color;
            pixel.chargeColor = `rgb(${pixel.color.replace(/[rgb\(\)]/g, "").split(",").map(a => parseInt(a.trim()) + 150).join(", ")})`;
        }
        if (pixel.color != pixel.normalColor && !pixel.charge && !pixel.chargeCD) {
            pixel.normalColor = pixel.color;
            pixel.chargeColor = `rgb(${pixel.color.replace(/[rgb\(\)]/g, "").split(",").map(a => parseInt(a.trim()) + 150).join(", ")})`;
        }
        if (pixel.charge) {
            pixel.color = pixel.chargeColor;
        } else {
            pixel.color = pixel.normalColor;
        }
        if (pixel.charge > 0) {
            for (let i = 0; i < adjacentCoords.length; i++){
                let coord = adjacentCoords[i]
                let x = coord[0]+pixel.x
                let y = coord[1]+pixel.y
                if (isEmpty(x, y)){
                  //do crap to the pixel
                  createPixel("light", x, y,),
                  pixelMap[x][y].color = pixel.chargeColor
                }
              }
    }}
}
pixelColorPick = (function() {
    const oldPixelColorPick = pixelColorPick;

    return function(pixel, customColor = null) {
        if (pixel.element == "colored_light_bulb" && pixel.color && !customColor) return pixel.color;
        return oldPixelColorPick.apply(this, arguments);
    }
})()
