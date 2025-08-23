/*window.addEventListener('load', function() { // original plan for mod 
	for (var element in elements) {
		elements[element].renderer = function(pixel, ctx) {}
	}
}); */

if (!enabledMods.includes("mods/betterSettings.js")) { enabledMods.unshift("mods/betterSettings.js"); localStorage.setItem("enabledMods", JSON.stringify(enabledMods)); window.location.reload() };

var ascii_settingsTab = new SettingsTab("Ascii");

var asciicustomcolor_setting = new Setting("Custom Colors", "customcolors", settingType.BOOLEAN, false, defaultValue=false);

var bw_setting = new Setting("Ascii B&W", "bw", settingType.BOOLEAN, false, defaultValue=true);

var asciicolor_setting = new Setting("Ascii Color", "asciicolor", settingType.COLOR, false, defaultValue="#ff0000");

var darklight_setting = new Setting("Flip Darkness", "asciidarklight", settingType.BOOLEAN, false, defaultValue=true, description="Whether the shading of ascii pixels flip depending on background or not.");

ascii_settingsTab.registerSettings("Color", asciicustomcolor_setting);

ascii_settingsTab.registerSettings("Color", bw_setting);

ascii_settingsTab.registerSettings("Color", asciicolor_setting);

ascii_settingsTab.registerSettings("Color", darklight_setting);

settingsManager.registerTab(ascii_settingsTab);

asciiListD = "`.-':~,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@"
asciiListL = "@&%QWNM0gB$#DR8mHXKAUbGOpV4d9h6PkqwSE2]ayjxY5Zoen[ult13If}C{iF|(7J)vTLs?z/*cr!+<>;=^,~:'-.`"
asciiNum = [-1, 0.0829, 0.0848, 0.1227, 0.1403, 0.1559, 0.185, 0.2183, 0.2417, 0.2571, 0.2852, 0.2902, 0.2919, 0.3099, 0.3192, 0.3232, 0.3294, 0.3384, 0.3609, 0.3619, 0.3667, 0.3737, 0.3747, 0.3838, 0.3921, 0.396, 0.3984, 0.3993, 0.4075, 0.4091, 0.4101, 0.42, 0.423, 0.4247, 0.4274, 0.4293, 0.4328, 0.4382, 0.4385, 0.442, 0.4473, 0.4477, 0.4503, 0.4562, 0.458, 0.461, 0.4638, 0.4667, 0.4686, 0.4693, 0.4703, 0.4833, 0.4881, 0.4944, 0.4953, 0.4992, 0.5509, 0.5567, 0.5569, 0.5591, 0.5602, 0.5602, 0.565, 0.5776, 0.5777, 0.5818, 0.587, 0.5972, 0.5999, 0.6043, 0.6049, 0.6093, 0.6099, 0.6465, 0.6561, 0.6595, 0.6631, 0.6714, 0.6759, 0.6809, 0.6816, 0.6925, 0.7039, 0.7086, 0.7235, 0.7302, 0.7332, 0.7602, 0.7834, 0.8037, 0.9999]

hex_is_light = function(color) {
    hex = color.replace('#', '');
    c_r = parseInt(hex.substring(0, 0 + 2), 16);
    c_g = parseInt(hex.substring(2, 2 + 2), 16);
    c_b = parseInt(hex.substring(4, 4 + 2), 16);
    brightness = ((c_r * 334) + (c_g * 334) + (c_b * 332)) / 1000;
    if (brightness > 127.5) {
        return true
    }
    else {
        return false
    }
}

invertColor = function(color) {
    let hex = color.replace(/^#/, '');
    if (hex.length === 3) hex = hex.replace(/./g, '$&$&'); // Expand
    if (hex.length !== 6) throw new Error(`Invalid HEX color: ${color}`);
    return `#${(0xFFFFFF ^ parseInt(hex, 16)).toString(16).padStart(6, '0')}`;
}
/* // original plan for mod 
renderPostPixel(function(ctx){
    for (pixel of currentPixels){
        if (pixel.color){
            ctx.font = `${pixelSize}pt Arial`
            if (asciicustomcolor_setting.value == false) {
                ctx.fillStyle = pixel.color;
            }
            else if (bw_setting.value !== true && asciicolor_setting.value) {
                ctx.fillStyle = asciicolor_setting.value;
            }
            else {
                ctx.fillStyle = invertColor(settings.bg)
            }
            var rgb1 = pixel.color.match(/\d+/g);
			// average the colors
            let sum = 0;
            for (const number of rgb1) {
                sum += Number(number);
            }
			var rgb = ((sum / rgb1.length)/225)
            if (hex_is_light(settings.bg) == false || darklight_setting.value == false) {
                for (i = 0; i < asciiNum.length; i++) {
                    if (rgb > asciiNum[i]) {
                        var asciiType = asciiListD[i]
                    }
	            }
            }
            else if (hex_is_light(settings.bg) == true) {
                for (i = 0; i < asciiNum.length; i++) {
                    if (rgb > asciiNum[i]) {
                        var asciiType = asciiListL[i]
                    }
	            }
            }
            if (asciiType) {
                ctx.fillText(asciiType, canvasCoord(pixel.x), canvasCoord(pixel.y+1), pixelSize)
            }
        }     
    }
}) */

drawSquare = function(ctx,color,x,y,scale=1,opacity=1) {
        if (color) {
            if (scale) {
                ctx.font = `${pixelSize*scale}pt Arial`
            }
            else {
                ctx.font = `${pixelSize}pt Arial`
            }
			if (ctx.globalAlpha !== opacity) { ctx.globalAlpha = opacity; }
            if (asciicustomcolor_setting.value == false) {
                ctx.fillStyle = color;
            }
            else if (bw_setting.value !== true && asciicolor_setting.value) {
                ctx.fillStyle = asciicolor_setting.value;
            }
            else {
                ctx.fillStyle = invertColor(settings.bg)
            }
            var rgb1 = color.match(/\d+/g);
			// average the colors
            let sum = 0;
            for (const number of rgb1) {
                sum += Number(number);
            }
			var rgb = ((sum / rgb1.length)/255)
            if (hex_is_light(settings.bg) == false || darklight_setting.value == false) {
                for (i = 0; i < asciiNum.length; i++) {
                    if (rgb > asciiNum[i]) {
                        var asciiType = asciiListD[i]
                    }
	            }
            }
            else if (hex_is_light(settings.bg) == true) {
                for (i = 0; i < asciiNum.length; i++) {
                    if (rgb > asciiNum[i]) {
                        var asciiType = asciiListL[i]
                    }
	            }
            }
			//ctx.fillRect(canvasCoord(x), canvasCoord(y), pixelSize*scale, pixelSize*scale);
            ctx.fillText(asciiType, canvasCoord(x), canvasCoord(y+scale), pixelSize*scale)
        }
}

drawPlus = function(ctx,color,x,y,scale=1,opacity=1) {
        if (color) {
			opacity = 0.5*opacity;
			if (ctx.globalAlpha!==opacity) { ctx.globalAlpha = opacity; }
            ctx.font = `${pixelSize}pt Arial`
            if (asciicustomcolor_setting.value == false) {
                ctx.fillStyle = color;
            }
            else if (bw_setting.value !== true && asciicolor_setting.value) {
                ctx.fillStyle = asciicolor_setting.value;
            }
            else {
                ctx.fillStyle = invertColor(settings.bg)
            }
            var rgb1 = color.match(/\d+/g);
			// average the colors
            let sum = 0;
            for (const number of rgb1) {
                sum += Number(number);
            }
			var rgb = ((sum / rgb1.length)/255)
            if (hex_is_light(settings.bg) == false || darklight_setting.value == false) {
                for (i = 0; i < asciiNum.length; i++) {
                    if (rgb > asciiNum[i]) {
                        var asciiType = asciiListD[i]
                    }
	            }
            }
            else if (hex_is_light(settings.bg) == true) {
                for (i = 0; i < asciiNum.length; i++) {
                    if (rgb > asciiNum[i]) {
                        var asciiType = asciiListL[i]
                    }
	            }
            }
            ctx.fillText(asciiType, canvasCoord(x-1), canvasCoord(y+scale), pixelSize)
            ctx.fillText(asciiType, canvasCoord(x+1), canvasCoord(y+scale), pixelSize)
            ctx.fillText(asciiType, canvasCoord(x), canvasCoord((y+scale)+1), pixelSize)
            ctx.fillText(asciiType, canvasCoord(x), canvasCoord((y+scale)-1), pixelSize)
            ctx.fillText(asciiType, canvasCoord(x), canvasCoord(y+scale), pixelSize)
        }
} 

function drawCursor() {
			var layerCtx = canvasLayers.gui.getContext('2d');
			var mouseOffset = Math.trunc(mouseSize/2);
			var topLeft = [mousePos.x-mouseOffset,mousePos.y-mouseOffset];
			var bottomRight = [mousePos.x+mouseOffset,mousePos.y+mouseOffset];
			// Draw a square around the mouse
			layerCtx.globalAlpha = mouseAlpha;
			layerCtx.lineWidth = 2;
            layerCtx.font = `${pixelSize}pt Arial`
            if (asciicustomcolor_setting.value == false) {
                layerCtx.fillStyle = mouseColor;
            }
            else if (bw_setting.value !== true && asciicolor_setting.value) {
                layerCtx.fillStyle = asciicolor_setting.value;
            }
            else {
                layerCtx.fillStyle = invertColor(settings.bg)
            }
            if (mouseSize > 1) {
            for (i = mousePos.x-mouseOffset; i <= mousePos.x+mouseOffset; i++) { // top
                layerCtx.fillText("_", (i)*pixelSize, (mousePos.y-mouseOffset)*pixelSize, pixelSize)
            } 
            for (i = mousePos.y-mouseOffset; i <= mousePos.y+mouseOffset; i++) { // left
                layerCtx.fillText("|", (mousePos.x-mouseOffset)*pixelSize, ((i)*pixelSize)+pixelSize, pixelSize)
            } 
            for (i = mousePos.x+mouseOffset; i >= mousePos.x-mouseOffset; i--) { // bottom
                layerCtx.fillText("_", (i)*pixelSize, ((mousePos.y+mouseOffset)*pixelSize)+pixelSize, pixelSize)
            } 
            for (i = mousePos.y+mouseOffset; i >= mousePos.y-mouseOffset; i--) { // right
                layerCtx.fillText("|", ((mousePos.x+mouseOffset)*pixelSize)+pixelSize, ((i)*pixelSize)+pixelSize, pixelSize)
            } 
            }
            else {
                layerCtx.font = `${pixelSize*1.5}pt Arial`
                layerCtx.fillText("▢", ((mousePos.x+mouseOffset)*pixelSize)-(pixelSize*0.25), ((mousePos.y+mouseOffset)*pixelSize)+(pixelSize*1.25), pixelSize*1.5)
            }
			// draw one transparent pixel in the center
			if (settings.precision) {
                layerCtx.fillText("o", mousePos.x*pixelSize, (mousePos.y*pixelSize)+pixelSize, pixelSize)
			}
			if (shaping) {
				if (shaping === 1) { // Draw a white line from shapeStart.x to shapeStart.y
					let coords = lineCoords(shapeStart.x,shapeStart.y,mousePos.x,mousePos.y);
					coords.forEach((coord) => {
						if (outOfBounds(coord[0],coord[1])) return;
						drawSquare(layerCtx,mouseColor,coord[0],coord[1],undefined,mouseAlpha)
					})
				}
			}
}