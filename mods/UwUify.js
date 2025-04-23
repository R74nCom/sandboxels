document.body.style.backgroundImage = 'url("https://jayd-rubies.github.io/image/uwuify.png")';
document.body.style.backgroundSize = 'cover';
gameDiv.style.border = "1px solid #ffffff00"; 
var statsbar = document.getElementById("stats");
var stylesheetchangevar = document.querySelector("link[rel=stylesheet]");
stylesheetchangevar.href = "https://jayd-Rubies.github.io/assets/css/UwUstyle.css";
statsbar.style.backgroundColor = 'transparent';
window.addEventListener("load",function(){
    document.querySelectorAll(".categoryButton").forEach(e => {
        e.style.backgroundColor = "#ffc0cb40";
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
    layerCtx.fillRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
    layerCtx.fill();
    // draw one transparent pixel in the center
    if (settings.precision) {
        layerCtx.fillStyle = "#ffc0cb80";
        layerCtx.fillRect(mousePos.x*pixelSize,mousePos.y*pixelSize,pixelSize,pixelSize);
    }
    if (shaping) {
        if (shaping === 1) { // Draw a white line from shapeStart.x to shapeStart.y
            layerCtx.beginPath();
            layerCtx.strokeStyle = "#ffc0cb";
            layerCtx.lineWidth = 3;
            layerCtx.moveTo(shapeStart.x*pixelSize+pixelSizeHalf, shapeStart.y*pixelSize+pixelSizeHalf);
            layerCtx.lineTo(mousePos.x*pixelSize+pixelSizeHalf, mousePos.y*pixelSize+pixelSizeHalf);
            layerCtx.stroke()
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
    var coloroffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 1);
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