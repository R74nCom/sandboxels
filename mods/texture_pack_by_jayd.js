//texture_pack_by_jayd
document.body.style.backgroundImage = 'url("https://jayd-rubies.github.io/image/1236951076024877107.png")';
gameDiv.style.border = "1px solid #ffffff00"; 
window.addEventListener("load",function(){
    document.querySelectorAll(".categoryButton").forEach(e => {
        e.style.backgroundColor = "transparent";
    })
});

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

function drawCursor() {
    canvas.style.backgroundColor = "transparent";
    var layerCtx = canvasLayers.gui.getContext('2d');
    var mouseOffset = Math.trunc(mouseSize/2);
    var topLeft = [mousePos.x-mouseOffset,mousePos.y-mouseOffset];
    var bottomRight = [mousePos.x+mouseOffset,mousePos.y+mouseOffset];
    // Draw a square around the mouse
    layerCtx.strokeStyle = "#FFFFFF80";
    layerCtx.strokeRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
    layerCtx.beginPath();
    layerCtx.arc(mousePos.x*pixelSize+offsetCorrection, mousePos.y*pixelSize+offsetCorrection, mouseSize*pixelSize/2, 0, 2 * Math.PI, false);
    layerCtx.lineWidth = 1;
    layerCtx.stroke();
    // draw one transparent pixel in the center
    if (settings.precision) {
        layerCtx.fillStyle = "#ffffffc8";
        layerCtx.fillRect(mousePos.x*pixelSize,mousePos.y*pixelSize,pixelSize,pixelSize);
    }
    if (shaping) {
        if (shaping === 1) { // Draw a white line from shapeStart.x to shapeStart.y
            layerCtx.beginPath();
            layerCtx.strokeStyle = "#FFFFFF80";
            layerCtx.lineWidth = 1;
            layerCtx.moveTo(shapeStart.x*pixelSize+pixelSizeHalf, shapeStart.y*pixelSize+pixelSizeHalf);
            layerCtx.lineTo(mousePos.x*pixelSize+pixelSizeHalf, mousePos.y*pixelSize+pixelSizeHalf);
        }
    }
}
function pixelColorPick(pixel,customColor=null) {
            var element = pixel.element;
            var elementInfo = elements[element];
            //if (elementInfo.behavior instanceof Array) {
            
            if (pixel.charge && elementInfo.colorOn) {
                customColor = elementInfo.colorOn;
            }
            if (customColor != null) {
                if (Array.isArray(customColor)) {
                    customColor = customColor[Math.floor(Math.random() * customColor.length)];
                }
                if (customColor.startsWith("#")) {
                    customColor = hexToRGB(customColor);
                }
                var rgb = customColor;
            }
            else {
                var rgb = elements[element].colorObject; // {r, g, b}
                // If rgb is an array, choose a random item
                if (Array.isArray(rgb)) {
                    rgb = rgb[Math.floor(Math.random() * rgb.length)];
                }
            }
            // Randomly darken or lighten the RGB color
            var coloroffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 5);
            var r = rgb.r + coloroffset;
            var g = rgb.g + coloroffset;
            var b = rgb.b + coloroffset;
            // Make sure the color is within the RGB range
            r = Math.max(0, Math.min(255, r));
            g = Math.max(0, Math.min(255, g));
            b = Math.max(0, Math.min(255, b));
            var color = "rgb("+r+","+g+","+b+")";
            
            /*}
            else {
                var color = elementInfo.color;
                if (Array.isArray(color)) {
                    color = color[Math.floor(Math.random() * color.length)];
                }
            }*/
            return color;
        }

function renderBall(ctx, color, x1, y1,plus_radius,opacity=1) {
    ctx.beginPath();
    ctx.globalAlpha = opacity;
    ctx.arc(x1*pixelSize+offsetCorrection, y1*pixelSize+offsetCorrection, pixelSize-offsetCorrection+plus_radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}
function renderGas(ctx, color, x1, y1,radius,opacity=1) {
    ctx.beginPath();
    ctx.globalAlpha = opacity;
    ctx.arc(x1*pixelSize+offsetCorrection, y1*pixelSize+offsetCorrection, pixelSize*radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}
viewInfo[4] = { // Small Pixels
    name: "Ball",
    pixel: function(pixel,ctx) {
        if ((elements[pixel.element].isGas && elements[pixel.element].glow !== false) || elements[pixel.element].glow || pixel.glow) {
                renderGas(ctx,pixel.color,pixel.x,pixel.y,3,0.5);
        }
        else{renderBall(ctx,pixel.color,pixel.x,pixel.y,0,1);}
    }
}
