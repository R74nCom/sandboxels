


/* == Custom View Modes == */

viewInfo[4] = { // Small Pixels
    name: "grid",
    pre: function(ctx) {
        // run any code before pixels are rendered
        drawSquare(ctx,"#00ff00",20,20,5);
    },
    pixel: function(pixel,ctx) {
        // run any code when each individual pixel is rendered
        drawSquare(ctx,pixel.color,pixel.x,pixel.y,0.66)
    },
    post: function(ctx) {
        // run any code after pixels are rendered
        drawPlus(ctx,"#ff0000",10,10) // Like a gas
    }
};

// Number keys will automatically switch views.



/* == Custom Element Renderers == */

elements.ball.renderer = function(pixel,ctx) {
    // Draw three horizontal squares
    drawSquare(ctx,"#00ff00",pixel.x-1,pixel.y);
    drawSquare(ctx,"#00ff00",pixel.x,pixel.y);
    drawSquare(ctx,"#00ff00",pixel.x+1,pixel.y);
};



/* == Custom Global Renderers == */

renderEachPixel(function(pixel,ctx) {
    // run any code when each individual pixel is rendered
    if (pixel.element === "rock") {
        drawSquare(ctx,"#00ff00",pixel.x,pixel.y-1);
    }
})
renderPrePixel(function(ctx) {
    // run any code before pixels are rendered
    drawSquare(ctx,"#ff00ff",10,40);
})
renderPostPixel(function(ctx) {
    // run any code after pixels are rendered
    drawSquare(ctx,"#ffff00",30,40);
})

runPerPixel(function(pixel) {
    // run any code on each pixel every tick
    tryMove(pixel,pixel.x+1,pixel.y);
})

runEveryTick(function() {
    // run any code after pixels are simulated per tick
    if (pixelTicks % 90 === 0) {
        logMessage("tick"+pixelTicks);
    }
})


// If you NEED to overwrite drawPixels(), which is NOT RECOMMENDED, you must return true.
/*
oldDrawPixels = drawPixels;
drawPixels = function(forceTick=false) {
    oldDrawPixels(forceTick);
    // ...
    return true;
};
*/



/* == Custom canvas layers == */

// WARNING: Performance may decrease. Use canvasLayers.pixels unless necessary.
addCanvasLayer("effects");
// One of the following is required to have the layer render automatically.
canvasLayersPost.push(canvasLayers["effects"]); // Render after pixels
// canvasLayersPre.push(canvasLayers["effects"]); // Render before pixels

effectsCtx = canvasLayers["effects"].getContext("2d");



/* == Custom Keybinds == */

keybinds["Digit7"] = function(e) {
    console.log(e);
}

// Override existing keybind
keybinds["KeyH"] = function() {
    logMessage("H was pressed!");
}



/* == New Element Events == */

elements.slime.onPlace = function(pixel) {
    logMessage(pixel.element+" placed")
}
elements.slime.onDelete = function(pixel) {
    logMessage(pixel.element+" deleted at "+pixelTicks)
}
elements.slime.onChange = function(pixel,element) {
    logMessage(pixel.element+" changed into "+element)
}
elements.slime.onBreak = function(pixel) {
    // breakInto property not necessary to fire
    logMessage(pixel.element+" broken")
}