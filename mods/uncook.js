elements.UnCook = {
    color: ["#ffffff", "#aeefff", "#00ccff"],
    tool: function(pixel) {
        if (pixel.element == "cooked_meat") {
            changePixel(pixel, "meat")
            pixel.temp = 20
        }
        if (pixel.element == "hard_yolk") {
            changePixel(pixel, "yolk")
            pixel.temp = 20
        }
        if (pixel.element == "toast") {
            changePixel(pixel, "bread")
            pixel.temp = 20
        }
        if (pixel.element == "bread") {
            if (Math.random() <= 0.7) {
                changePixel(pixel, "dough")
            }
            else{
                changePixel(pixel, "yeast")
            }
            pixel.temp = 20
        }
        if (pixel.element == "baked_batter") {
            changePixel(pixel, "batter")
            pixel.temp = 20
        }
        if (pixel.element == "baked_potato") {
            changePixel(pixel, "potato")
            pixel.temp = 20
        }
        if (pixel.element == "caramel") {
            changePixel(pixel, "sugar")
            pixel.temp = 20
        }
        if (pixel.element == "nut_butter") {
            changePixel(pixel, "nut_meat")
            pixel.temp = 20
        }
        if (pixel.element == "nut_oil") {
            changePixel(pixel, "nut_meat")
            pixel.temp = 20
        }
        if (pixel.element == "popcorn") {
            changePixel(pixel, "corn")
            pixel.temp = 20
        }
    },
    category: "tools",
};