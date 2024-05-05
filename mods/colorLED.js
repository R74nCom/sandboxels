elements.led = {
    behavior: behaviors.WALL,
    reactions: {
        "light": {"charge1":1},
        "liquid_light": {"charge1":1},
    },
    color: "#666666",
    colorOn: "#ffffff",
    category: "machines",
    tempHigh: 1500,
    stateHigh: ["molten_glass","molten_glass","molten_glass","molten_gallium"],
    conduct: 1,
    breakInto: "glass_shard",
    tick: (pixel) => {
        if (pixel.start == pixelTicks) {
            pixel.normalColor = pixel.color;
            pixel.chargeColor = `rgb(${pixel.color.replace(/[rgb\(\)]/g, "").split(",").map(a => parseInt(a.trim()) + 120).join(", ")})`;
        }
        if (pixel.color != pixel.normalColor && !pixel.charge && !pixel.chargeCD) {
            pixel.normalColor = pixel.color;
            pixel.chargeColor = `rgb(${pixel.color.replace(/[rgb\(\)]/g, "").split(",").map(a => parseInt(a.trim()) + 120).join(", ")})`;
        }
        if (pixel.charge) {
            pixel.color = pixel.chargeColor;
        } else {
            pixel.color = pixel.normalColor;
        }
    }
}

pixelColorPick = (function() {
    const oldPixelColorPick = pixelColorPick;

    return function(pixel, customColor = null) {
        if (pixel.element == "led" && pixel.color && !customColor) return pixel.color;
        return oldPixelColorPick.apply(this, arguments);
    }
})()