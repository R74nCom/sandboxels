
var isChromium = !!window.chrome;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

if (!isChromium && !isAndroid) {
    window.addEventListener("load",function(){
        console.log(1)
        logMessage("Error: glow.js only works on Chrome or Chromium-based browsers.")
    })
}
else {

addCanvasLayer("glowmod");
addCanvasLayer("glowmod2");
canvasLayersPre.unshift(canvasLayers["glowmod"]);
glowmodCtx = canvasLayers["glowmod"].getContext("2d");
glowmodCtx2 = canvasLayers["glowmod2"].getContext("2d");
delete canvasLayers.glowmod;
delete canvasLayers.glowmod2;

elements.fire.emit = true;
elements.lightning.emit = 15;
elements.electric.emit = true;
elements.positron.emit = true;
elements.plasma.emit = true;
elements.uranium.emit = 3;
elements.uranium.emitColor = "#009800";
elements.rainbow.emit = true;
elements.static.emit = true;
elements.flash.emit = true;
elements.cold_fire.emit = true;
elements.blaster.emit = true;
elements.ember.emit = true;
elements.fw_ember.emit = 10;
elements.bless.emit = true;
elements.pop.emit = true;
elements.explosion.emit = true;
elements.n_explosion.emit = 10;
elements.supernova.emit = 20;
elements.midas_touch.emit = true;
elements.fireball.emit = true;
elements.sun.emit = 15;
elements.light.emit = 3;
elements.liquid_light.emit = true;
elements.laser.emit = 3;
elements.neutron.emit = 3;
elements.proton.emit = 3;
elements.radiation.emit = 3;
elements.fallout.emit = 3;
elements.rad_steam.emit = 2;
elements.rad_steam.emitColor = "#6ad48c";
elements.rad_cloud.emit = 2;
elements.rad_cloud.emitColor = "#009800";
elements.rad_glass.emit = 2;
elements.rad_glass.emitColor = "#009800";
elements.rad_shard.emit = 2;
elements.rad_shard.emitColor = "#009800";
elements.malware.emit = 2;
elements.border.emit = 2;
elements.void.emit = 10;

window.addEventListener("load",()=>{
    glowmodCtx2.canvas.width = ctx.canvas.width;
    glowmodCtx2.canvas.height = ctx.canvas.height;
    glowmodCtx.canvas.width = ctx.canvas.width;
    glowmodCtx.canvas.height = ctx.canvas.height;
})

viewInfo[1] = { // Blur Glow (Emissive pixels only)
    name: "",
    pixel: viewInfo[1].pixel,
    effects: true,
    colorEffects: true,
    onUnselect: function(ctx) {
        glowmodCtx2.canvas.width = ctx.canvas.width;
        glowmodCtx2.canvas.height = ctx.canvas.height;
        glowmodCtx.canvas.width = ctx.canvas.width;
        glowmodCtx.canvas.height = ctx.canvas.height;
    },
    pre: function(ctx) {
        glowmodCtx2.canvas.width = ctx.canvas.width;
        glowmodCtx2.canvas.height = ctx.canvas.height;
    },
    pixel: viewInfo[1].pixel,
    post: function(ctx) {
        glowmodCtx.canvas.width = ctx.canvas.width;
        glowmodCtx.canvas.height = ctx.canvas.height;
        glowmodCtx.filter = "blur(30px)";
        // Draw the blurred content on the canvas
        glowmodCtx.drawImage(glowmodCtx2.canvas, 0, 0);
        glowmodCtx.filter = "none";
    },
};

renderEachPixel(function(pixel,ctx) {
    if (view === 1 && settings.textures !== 0) {
        if (elements[pixel.element].emit || pixel.emit || (elements[pixel.element].colorOn && pixel.charge)) {
            let a = (settings.textures !== 0) ? pixel.alpha : undefined;
            let d = pixel.emit||elements[pixel.element].emit||true;
            if (d === true) d = 5;
            let r = Math.floor(d/2);
            drawSquare(glowmodCtx2,elements[pixel.element].emitColor||pixel.color,pixel.x-r,pixel.y-r,d,a);
        }
        if (pixel.charge && !elements[pixel.element].colorOn) {
            drawSquare(glowmodCtx2,"#ffff00",pixel.x-1,pixel.y-1,3);
        }
    }
})

}