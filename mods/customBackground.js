var imgVar = "https://i.ytimg.com/vi/fx2Z5ZD_Rbo/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGGUgZShlMA8=&rs=AOn4CLD7X0AtWZAmVxLAt0LRvN8nrco_8Q";
gameDiv.style.border = "1px solid #ffffff00";
document.body.style.backgroundSize = 'cover';
window.addEventListener("load",function(){
    document.querySelectorAll(".categoryButton").forEach(e => {
        e.style.backgroundColor = "transparent";
    })
});
function drawCursor() {
    document.body.style.backgroundImage = 'url('+ imgVar +')';
    canvas.style.backgroundColor = "transparent";
    var layerCtx = canvasLayers.gui.getContext('2d');
    var mouseOffset = Math.trunc(mouseSize/2);
    var topLeft = [mousePos.x-mouseOffset,mousePos.y-mouseOffset];
    var bottomRight = [mousePos.x+mouseOffset,mousePos.y+mouseOffset];
    // Draw a square around the mouse
    layerCtx.strokeStyle = "#808080";
    layerCtx.strokeRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
    layerCtx.beginPath();
    layerCtx.lineWidth = 1;
    layerCtx.stroke();
    // draw one transparent pixel in the center
    if (settings.precision) {
        layerCtx.fillStyle = "#80808080";
        layerCtx.fillRect(mousePos.x*pixelSize,mousePos.y*pixelSize,pixelSize,pixelSize);
    }
    if (shaping) {
        if (shaping === 1) { // Draw a white line from shapeStart.x to shapeStart.y
            layerCtx.beginPath();
            layerCtx.strokeStyle = "#808080";
            layerCtx.lineWidth = 1;
            layerCtx.moveTo(shapeStart.x*pixelSize+pixelSizeHalf, shapeStart.y*pixelSize+pixelSizeHalf);
            layerCtx.lineTo(mousePos.x*pixelSize+pixelSizeHalf, mousePos.y*pixelSize+pixelSizeHalf);
            layerCtx.stroke()
        }
    }
}
elements.change_background = {
    color:"#ffffff",
    category: "customBackground",
    tool: function(pixel) {},
    onSelect: function() {
        imgVar = prompt("Please input an image link to set as background.");
    }
}