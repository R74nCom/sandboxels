elements.reel = {
    color: "#78784c",
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|SH|XX",
        "SH|CH:spinning_reel|SH",
        "XX|SH|XX",
    ],
    tick: function(pixel) {
        if (pixel.age < 1000) {
            if (pixel.age > 100 && pixel.color != "#78784c") {
                pixel.color = "#78784c"
            }
            else if (pixel.age > 50 && pixel.color === "#ff0000") {
                pixel.winSignal = true
                pixel.color = "#ff0001"
            }
            if (!isEmpty(pixel.x+2, pixel.y, true) && pixel.age > 50) { 
                if (pixel.color === "#ffff00" && pixelMap[pixel.x+2][pixel.y].color === "#ffff00") {
                    pixel.jackpotSignal = true
                }
            }
            if (!isEmpty(pixel.x+4, pixel.y, true) && !isEmpty(pixel.x+2, pixel.y, true) && pixel.age > 50) { 
                if (pixelMap[pixel.x+4][pixel.y].color === pixel.color && pixelMap[pixel.x+2][pixel.y].color === pixel.color) {
                    pixel.jackpotSignal = true
                }
            }
            if (pixel.winSignal == true) {
                if (!isEmpty(pixel.x+2, pixel.y, true)) { 
                    pixelMap[pixel.x+2][pixel.y].winSignal = true
                    pixel.winSignal = false
                }
            }
            if (pixel.jackpotSignal == true) {
                if (!isEmpty(pixel.x+2, pixel.y, true)) { 
                    pixelMap[pixel.x+2][pixel.y].jackpotSignal = true
                    pixel.jackpotSignal = false
                }
            }
            pixel.age++;
        }
        doDefaults(pixel)
    },
    colorOn: "#ffff59",
    category: "machines",
    conduct: 1,
    ignore: ["shocker"],
    ignoreConduct: ["electric"]
}

elements.spinning_reel = {
    color: ["#ff0000","#ff8800","#ffff00","#88ff00","#00ff00","#00ff88","#00ffff","#0088ff","#0000ff","#8800ff","#ff00ff"],
    behavior: [
        "XX|XX|XX",
        "XX|CC:#ff0000,#ffff00,#ff8800,#00ffff,#0088ff,#0000ff,#8800ff,#ff00ff|XX",
        "XX|XX|XX",
    ],
    tick: function(pixel) {
        if (pixel.age > 100) {
            changePixel(pixel,"reel")
            pixel.color = pixel.oldcolor
            pixel.age = 0
        }
        pixel.age++;
        if (pixel.color != pixel.oldcolor) {
            pixel.oldcolor = pixel.color
        }
        doDefaults(pixel)
    },
    properties: {
        "age":0
    },
    category: "machines",
}

elements.reward_giver = {
    name: "slot",
    color: "#dddd00",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        if (pixel.winSignal === true) { 
            if (!isEmpty(pixel.x, pixel.y-1, true)) { 
                if (tryMove(pixelMap[pixel.x][pixel.y-1], pixel.x, pixel.y+1)) {
                    pixel.winSignal = false
                }
            }
        }
    },
    category:"machines",
    insulate:true,
    darkText: true,
    hardness: 1,
    movable: false
}