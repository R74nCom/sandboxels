//texture_pack_by_jayd
document.body.style.backgroundImage = 'url("https://jayd-rubies.github.io/1236951076024877107.png")';
gameDiv.style.border = "0px solid #ffffff"; 
function drawCursor() {
    canvas.style.backgroundColor = "#00000000";
    var layerCtx = canvasLayers.gui.getContext('2d');
    var mouseOffset = Math.trunc(mouseSize/2);
    var topLeft = [mousePos.x-mouseOffset,mousePos.y-mouseOffset];
    var bottomRight = [mousePos.x+mouseOffset,mousePos.y+mouseOffset];
    // Draw a square around the mouse
    layerCtx.strokeStyle = "#FFFFFF80";
    layerCtx.strokeRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
    // draw one transparent pixel in the center
    if (settings.precision) {
        layerCtx.fillStyle = "#ffffffc8";
        layerCtx.fillRect(mousePos.x*pixelSize,mousePos.y*pixelSize,pixelSize,pixelSize);
    }
    if (shaping) {
        if (shaping === 1) { // Draw a white line from shapeStart.x to shapeStart.y
            layerCtx.beginPath();
            layerCtx.strokeStyle = "#FFFFFF80";
            layerCtx.lineWidth = 2;
            layerCtx.moveTo(shapeStart.x*pixelSize+pixelSizeHalf, shapeStart.y*pixelSize+pixelSizeHalf);
            layerCtx.lineTo(mousePos.x*pixelSize+pixelSizeHalf, mousePos.y*pixelSize+pixelSizeHalf);
            layerCtx.stroke();
            layerCtx.lineWidth = 1;
        }
    }
}