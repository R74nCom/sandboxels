     elements.tumor_clotter = {
    color: "#552b2b",
    behavior: function(pixel){
        var webs = [];
        shuffleArray(squareCoordsShuffle)
        for (var i = 0; i < squareCoordsShuffle.length; i++) {
            var coord = squareCoordsShuffle[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].id === elements.web.id) {
                webs.push(pixelMap[x][y]);
                if (pixel.web === undefined) { pixel.web = Math.floor(Math.random() * (5 - 1) + 1) }
            }
        }
        if (webs.length) {
            if (Math.random() < 0.1) {
                var web = choose(webs);
                shuffleArray(squareCoordsShuffle);
                for (var i = 0; i < squareCoordsShuffle.length; i++) {
                    var coord = squareCoordsShuffle[i];
                    var x = web.x+coord[0];
                    var y = web.y+coord[1];
                    if (webs.length === 1 && coord[0] && coord[1] && isEmpty(x,y) && Math.random() < 0.1) {
                        createPixel("tumor_node",x,y);
                        break;
                    }
                    else if (tryMove(pixel,x,y)) { break }
                }
            }
            doDefaults(pixel);
        }
        else {
            behaviors.CRAWLER2(pixel,undefined,function(pixel){
                if (pixel.r % 2 === 1 && pixel.climb > 10 && pixel.web === undefined && Math.random() < 0.1) {
                    if (tryMove(pixel,pixel.x,pixel.y-1,"tumor_node")) {
                        pixel.web = Math.floor(Math.random() * (50 - 10) + 10);
                    }
                }
            });
        }
    },
    foodNeed: 4,
    reactions: {
        "dead_bug": { elem2:null, chance:0.1, func:behaviors.FEEDPIXEL },
        "bleach": { elem1:"dead_bug", chance:0.1 },
        "alcohol": { elem1:"dead_bug", chance:0.05 },
        "vinegar": { elem1:"dead_bug", chance:0.03 },
    },
    tempHigh: 100,
    stateHigh: "ash",
    tempLow: 0,
    stateLow: "dead_bug",
    breakInto: "dead_bug",
    category:"infection",
    burn:95,
    burnTime:25,
    state: "solid",
    density: 500,
    conduct: 0.05,
    cooldown: defaultCooldown
},
