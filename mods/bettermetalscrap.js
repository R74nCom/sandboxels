if (!elements.aluminum.properties){elements.aluminum.properties = {}}
elements.aluminum.properties.scrapType = "aluminum"
if (!elements.tin.properties){elements.tin.properties = {}}
elements.tin.properties.scrapType = "tin"
if (!elements.brass.properties){elements.brass.properties = {}}
elements.brass.properties.scrapType = "brass"
if (!elements.grenade.properties){elements.grenade.properties = {}}
elements.grenade.properties.scrapType = "steel"
if (!elements.smoke_grenade.properties){elements.smoke_grenade.properties = {}}
elements.smoke_grenade.properties.scrapType = "steel"
if (!elements.flashbang.properties){elements.flashbang.properties = {}}
elements.flashbang.properties.scrapType = "steel"
var randomScrap = ["aluminum", "steel", "iron"]
delete elements.metal_scrap.tempHigh
delete elements.metal_scrap.stateHigh
if (!elements.metal_scrap.tick){
elements.metal_scrap.tick = function(pixel){
    if (!pixel.scrapType){
        pixel.scrapType = randomScrap[Math.floor(Math.random()*randomScrap.length)]
    }
    if (pixel.temp >= elements[pixel.scrapType].tempHigh){
        changePixel(pixel, pixel.scrapType, false)
    }
}
}
else {
    const prefunc = elements.metal_scrap.tick;
    elements.metal_scrap.tick = function(pixel){
        prefunc(pixel);
        if (!pixel.scrapType){
            pixel.scrapType = randomScrap[Math.floor(Math.random()*randomScrap.length)]
        }
        if (pixel.temp >= elements[pixel.scrapType].tempHigh){
            changePixel(pixel, pixel.scrapType, false)
        }
    }
}