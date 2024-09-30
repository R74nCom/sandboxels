document.body.style.backgroundImage = 'url("https://jayd-rubies.github.io/uwuify.png")';
gameDiv.style.border = "1px solid #ffffff00"; 
window.addEventListener("load",function(){
    document.querySelectorAll(".categoryButton").forEach(e => {
        e.style.backgroundColor = "ffc0cb40";
    })
});
function drawCursor() {
    canvas.style.backgroundColor = "transparent";
    var layerCtx = canvasLayers.gui.getContext('2d');
    var mouseOffset = Math.trunc(mouseSize/2);
    var topLeft = [mousePos.x-mouseOffset,mousePos.y-mouseOffset];
    var bottomRight = [mousePos.x+mouseOffset,mousePos.y+mouseOffset];
    // Draw a square around the mouse
    layerCtx.strokeStyle = "#ffc0cb";
    layerCtx.fillStyle = "#ffc0cb40";    
    layerCtx.strokeRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
    layerCtx.beginPath();
    layerCtx.lineWidth = 3;
    layerCtx.stroke();
    layerCtx.fill();
    // draw one transparent pixel in the center
    if (settings.precision) {
        layerCtx.fillStyle = "#ffc0c80";
        layerCtx.fillRect(mousePos.x*pixelSize,mousePos.y*pixelSize,pixelSize,pixelSize);
    }
    if (shaping) {
        if (shaping === 1) { // Draw a white line from shapeStart.x to shapeStart.y
            layerCtx.beginPath();
            layerCtx.strokeStyle = "#ffc0c80";
            layerCtx.lineWidth = 1;
            layerCtx.moveTo(shapeStart.x*pixelSize+pixelSizeHalf, shapeStart.y*pixelSize+pixelSizeHalf);
            layerCtx.lineTo(mousePos.x*pixelSize+pixelSizeHalf, mousePos.y*pixelSize+pixelSizeHalf);
        }
    }
}