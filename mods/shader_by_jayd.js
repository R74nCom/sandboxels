elements.shader_test = {
    color: "#FFFFFF",
    category: "special",
    renderer: function(pixel,ctx) {
        var circlec = circleCoords(pixel.x, pixel.y, 3);
            for (var i = 0; i < circlec.length; i++){
            var coord = circlec[i];
            var x = coord.x;
            var y = coord.y;
            drawSquare(ctx,"#ffffff",x,y,1,0.25)
        }
    }
}
elements.fire.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.cold_fire.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.light.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 2);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.75)
    }
}
elements.laser.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 2);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.75)
    }
}
elements.plasma.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.5)
    }
}
elements.electric.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 2);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.heat_ray.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.freeze_ray.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.flash.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.7)
    }
}
elements.smoke.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 2);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.radiation.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 2);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        drawSquare(ctx,pixel.color,x,y,1,0.25)
    }
}
elements.led_r.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        if (pixel.charge) {
            drawSquare(ctx,pixel.color,x,y,1,0.5)
        }
        else {
            drawSquare(ctx,pixel.color,pixel.x,pixel.y,1,1)
        }
    }
}
elements.led_g.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        if (pixel.charge) {
            drawSquare(ctx,pixel.color,x,y,1,0.5)
        }
        else {
            drawSquare(ctx,pixel.color,pixel.x,pixel.y,1,1)
        }
    }
}
elements.led_b.renderer = function(pixel,ctx) {
    var circlec = circleCoords(pixel.x, pixel.y, 3);
    for (var i = 0; i < circlec.length; i++){
        var coord = circlec[i];
        var x = coord.x;
        var y = coord.y;
        if (pixel.charge) {
            drawSquare(ctx,pixel.color,x,y,1,0.5)
        }
        else {
            drawSquare(ctx,pixel.color,pixel.x,pixel.y,1,1)
        }
    }
}
