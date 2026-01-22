if (!settings.heatglowMode){settings.heatglowMode = 1; saveSettings();}
if (!eLists.heatBlacklist) {eLists.heatBlacklist = []}
	eLists.heatBlacklist = eLists.heatBlacklist.concat(["void", "sun", "light", "plasma", "fire", "border", "heater", "superheater", "laser", "ray"])
function tempToRGB(temp){
	if (temp <= 6500){
		return{
			r: 255,
			g: Math.trunc(Math.max(-325.757*Math.pow(0.999581, temp)+272.879, 0)),
			b: Math.trunc(Math.max(-571.403*Math.pow(0.999675, temp)+321.955, 0))
		} 
	} else {
		return {
			r: Math.trunc(Math.max(604.879*Math.pow(0.999697, temp)+169.618, 0)),
			g: Math.trunc(Math.max(719.488*Math.pow(0.999599, temp)+201.788, 0)),
			b: 255
		}
	}
}
function oldtempToRgb(temp, pixel){
	let halftemp = ((20+elements[pixel.element].tempHigh)/2)
	let fulltemp = elements[pixel.element].tempHigh
	let ctemp = 0;
	if (pixel.temp <= fulltemp - halftemp){
		ctemp = 0;
	} else {
		ctemp = temp/(fulltemp-halftemp)-halftemp/(fulltemp-halftemp);
	}
	if (ctemp <= 0.5){
		return{
			r: Math.trunc(510*ctemp),
			g: 0,
			b: 0,
			opacity: (ctemp/1.3)
		}
	} else {
		return {
			r: 255,
			g: Math.trunc((510*ctemp)-255),
			b: Math.trunc((280*ctemp)-140),
			opacity: (ctemp/1.3)
		}
	}
}

renderPresets.HEATGLOW = function(pixel,ctx) {
	drawDefault(ctx,pixel)
}

renderEachPixel(function(pixel,ctx) {
    // run any code when each individual pixel is rendered
	if (!eLists.heatBlacklist.includes(pixel.element)){
	let color, opacity;
	if (settings.heatglowMode == 1){
		color = tempToRGB(pixel.temp)
		opacity = Math.max(0, Math.min(1, -3.5486801*Math.pow(0.9960659, pixel.temp)+0.73333))
	} else {
		color = oldtempToRgb(pixel.temp, pixel)
		opacity = color.opacity
		if (!((elements[pixel.element].tempHigh > 400 && elements[elements[pixel.element].stateHigh] && elements[elements[pixel.element].stateHigh].state === "liquid"))){
			return;
		}
	}
	if (elements[pixel.element].glow || elements[pixel.element].isGas){
		drawPlus(ctx,"rgb(" + color.r + ", " + color.g + ", " + color.b +")",pixel.x,pixel.y,undefined,opacity)
	} else {
		drawSquare(ctx,"rgb(" + color.r + ", " + color.g + ", " + color.b +")",pixel.x,pixel.y,undefined,opacity)
	}}
})
keybinds["KeyH"] = function(){
	if (settings.heatglowMode == 1){settings.heatglowMode = 2}
	else {settings.heatglowMode = 1}
	saveSettings();
	logMessage("Heat glow mode switched.")
}