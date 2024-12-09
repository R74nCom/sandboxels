function playSubspace(file) {
    var audio = new Audio("https://JustAGenericUsername.github.io/" + file + ".mp3");
    audio.play();
}
elements.subspace_tripmine = {
    color: "#2e2430",
    behavior: behaviors.STURDYPOWDER,
    maxSize: 1,
    cooldown: defaultCooldown,
    density: 1500,
    category: "weapons",
    state: "solid",
    properties:{
        counter: 0
    },
    tick: function(pixel){
        if (pixel.counter == 0){
            playSubspace("subspaceplace")
        }
        if (!pixel.rgb){pixel.rgb = pixel.color.match(/\d+/g);}
        if (pixel.counter >= 90 && pixel.counter < 121){
            if (!pixel.a){pixel.a = 1}
            pixel.a -= 0.05
            pixel.color = "rgba(" + pixel.rgb[0] + "," + pixel.rgb[1] + "," + pixel.rgb[2] + "," + pixel.a + ")"
        }
        if (pixel.counter >= 121){
            if (!isEmpty(pixel.x, pixel.y-1, true)){
                let oldx = pixel.x
                let oldy = pixel.y
                explodeAt(pixel.x, pixel.y, 20)
                playSubspace("subspaceboom")
                deletePixel(pixel.x, pixel.y)
                var coords = circleCoords(oldx, oldy, 25)
                for (var i = 0; i < coords.length; i++){
                    var x = coords[i].x
                    var y = coords[i].y
                    if (!isEmpty(x, y, true)){
                        var newPixel = pixelMap[x][y]
                        newPixel.color = pixelColorPick(pixel, "#FF00FF")
                    }
                }
            }
        }
        pixel.counter ++
    }
}