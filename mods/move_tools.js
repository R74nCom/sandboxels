elements.move_up = {
    color: "#1C0000",
    tool: function(pixel) {
        tryMove(pixel,pixel.x,pixel.y-1);
    },
    category: "movement tools",
    excludeRandom: true,
},

elements.move_down = {
    color: "#000038",
    tool: function(pixel) {
        tryMove(pixel,pixel.x,pixel.y+1);
    },
    category: "movement tools",
    excludeRandom: true,
},

elements.move_left = {
    color: "#007000",
    tool: function(pixel) {
        tryMove(pixel,pixel.x-1,pixel.y);
    },
    category: "movement tools",
    excludeRandom: true,
},

elements.move_right = {
    color: "#000E00",
    tool: function(pixel) {
        tryMove(pixel,pixel.x+1,pixel.y);
    },
    category: "movement tools",
    excludeRandom: true,
},

elements.move_up_left = {
    color: "#E00000",
    tool: function(pixel) {
        tryMove(pixel,pixel.x-1,pixel.y-1);
    },
    category: "movement tools",
    excludeRandom: true,
},

elements.move_down_left = {
    color: "#0001C0",
    tool: function(pixel) {
        tryMove(pixel,pixel.x-1,pixel.y+1);
    },
    category: "movement tools",
    excludeRandom: true,
},

elements.move_up_right = {
    color: "#038000",
    tool: function(pixel) {
        tryMove(pixel,pixel.x+1,pixel.y-1);
    },
    category: "movement tools",
    excludeRandom: true,
},

elements.move_down_right = {
    color: "#000007",
    tool: function(pixel) {
        tryMove(pixel,pixel.x+1,pixel.y+1);
    },
    category: "movement tools",
    excludeRandom: true,
}
