
let setting = null

dependOn("betterSettings.js", () => {
    const tabMMT = new SettingsTab("Many More Themes");
    setting = new SelectSetting("Themes", "Themes", [[0, "disabled"],[1, "Stardust"], [2, "Aqautic(coming soon!)"], [3, "Supernova(coming soon!)"], [4, "Sunrise(coming soon!)"]]);
    
    tabMMT.registerSetting(setting);
    settingsManager.registerTab(tabMMT);

    

    if (setting.value == 1){
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "https://jayd-rubies.github.io/assets/css/stardust.css"; 
        document.head.appendChild(link);  
        document.body.style.backgroundImage = 'url("https://jayd-rubies.github.io/assets/image/2025_05_16_0x5_Kleki.png")';
        document.body.style.backgroundSize = 'cover';
        window.addEventListener("load",function(){;
            document.querySelectorAll(".categoryButton").forEach(e => {
                e.style.backgroundColor = "#5c008440";
                e.style.borderColor = "#5c0084";
            })
        });
        
    }
}, true,);

settings.bg = "transparernt";
// setting.onUpdate((setting) => {
//    if (setting == 1) {
//     function drawCursor() {
//         var layerCtx = canvasLayers.gui.getContext('2d');
//         var mouseOffset = Math.trunc(mouseSize/2);
//         var topLeft = [mousePos.x-mouseOffset,mousePos.y-mouseOffset];
//         var bottomRight = [mousePos.x+mouseOffset,mousePos.y+mouseOffset];
//         // Draw a square around the mouse
//         layerCtx.strokeStyle = "#5c0084";
//         layerCtx.fillStyle = "#5c008440";    
//         layerCtx.strokeRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
//         layerCtx.beginPath();
//         layerCtx.lineWidth = 3;
//         layerCtx.stroke();
//         layerCtx.fillRect(topLeft[0]*pixelSize,topLeft[1]*pixelSize,(bottomRight[0]-topLeft[0]+1)*pixelSize,(bottomRight[1]-topLeft[1]+1)*pixelSize);
//         layerCtx.fill();
//         // draw one transparent pixel in the center
//         if (settings.precision) {
//             layerCtx.fillStyle = "#5c008480";
//             layerCtx.fillRect(mousePos.x*pixelSize,mousePos.y*pixelSize,pixelSize,pixelSize);
//         }
//         if (shaping) {
//             if (shaping === 1) { // Draw a white line from shapeStart.x to shapeStart.y
//                 layerCtx.beginPath();
//                 layerCtx.strokeStyle = "#5c0084";
//                 layerCtx.lineWidth = 3;
//                 layerCtx.moveTo(shapeStart.x*pixelSize+pixelSizeHalf, shapeStart.y*pixelSize+pixelSizeHalf);
//                 layerCtx.lineTo(mousePos.x*pixelSize+pixelSizeHalf, mousePos.y*pixelSize+pixelSizeHalf);
//                 layerCtx.stroke()
//             }
//         }
//     }
//     drawCursor()
// }
// }) ¯\_(ツ)_/¯
// i'll figure it out later
