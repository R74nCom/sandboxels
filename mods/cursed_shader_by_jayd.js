function shade(ctx, color, x1, y1, radius=3, opacity) {
    var offsetCorrection = 0;
    if (pixelSize === 8){
        offsetCorrection = 4;
    }
    else if (pixelSize === 6){
        offsetCorrection = 3;
    }
    else if (pixelSize === 4){
        offsetCorrection = 2;
    }
    ctx.beginPath();
    ctx.arc(x1*pixelSize+offsetCorrection, y1*pixelSize+offsetCorrection, radius*pixelSize, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fill();
}

elements.shader_test = {
    color: "#FFFFFF",
    category: "special",
    renderer: function(pixel,ctx) {
        shade(ctx, pixel.color, pixel.x, pixel.y, 3, 0.5)
    }
}
elements.fire.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 3, 0.25)
}
elements.cold_fire.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 3, 0.25)
}
elements.light.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 2, 0.75)
}
elements.laser.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 2, 0.75)
}
elements.plasma.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 3, 0.5)
}
elements.electric.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 2, 0.25)
}
elements.heat_ray.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 3, 0.25)
}
elements.freeze_ray.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 3, 0.25)
}
elements.flash.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 3, 0.7)
}
elements.smoke.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 2, 0.25)
}
elements.radiation.renderer = function(pixel,ctx) {
    shade(ctx, pixel.color, pixel.x, pixel.y, 2, 0.25)
}
elements.led_r.renderer = function(pixel,ctx) {
    if (pixel.charge) {
        shade(ctx, pixel.color, pixel.x, pixel.y, 3, 0.5)
    }
    else {
        shade(ctx, pixel.color, pixel.x, pixel.y, 0, 1)
    }
}
elements.led_g.renderer = function(pixel,ctx) {
    if (pixel.charge) {
        shade(ctx, pixel.color, pixel.x, pixel.y, 3, 0.5)
    }
    else {
        shade(ctx, pixel.color, pixel.x, pixel.y, 0, 1)
    }
}
elements.led_b.renderer = function(pixel,ctx) {
    if (pixel.charge) {
        shade(ctx, pixel.color, pixel.x, pixel.y, 3, 0.5)
    }
    else {
        shade(ctx, pixel.color, pixel.x, pixel.y, 0, 1)
    }
}
