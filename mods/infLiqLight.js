let oldLiqLightTick = elements.liquid_light.tick;
let oldDelPixel = deletePixel;
elements.liquid_light.tick = (pixel)=>{
  deletePixel = ()=>{};
  oldLiqLightTick(pixel);
  deletePixel = oldDelPixel;
}
window.addEventListener("load", ()=>{});
