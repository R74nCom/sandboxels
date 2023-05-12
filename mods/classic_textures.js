if (elements.dirt) {elements.dirt.color = [
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#9e6b4b",
    "#a88c7b"
];}
if (elements.rotten_meat) {elements.rotten_meat.color = [
    "#9ab865",
    "#b8b165",
    "#b89765"
];}
if (elements.ant) {elements.ant.color = "#4a0903";}
if (elements.worm) {elements.worm.color = "#402208";}
if (elements.fly) {elements.fly.color = "#303012";}
if (elements.firefly) {elements.firefly.color = [
    "#310D09",
    "#310D09",
    "#d9d950",
    "#310D09",
    "#310D09"
];}
elements.firefly.tick = function(pixel) {
    if (!pixel.fff) {
        pixel.fff = Math.floor(Math.random() * 60) + 20;
    }
    if (pixelTicks % pixel.fff === 0) {
        if (pixel) {pixel.color = pixelColorPick(pixel,"#d9d950")}
    }
    else if (pixelTicks % pixel.fff === 2) {
        if (pixel) {pixel.color = pixelColorPick(pixel,"#310D09");}
    }
    behaviors.FLY(pixel,function(firefly,newfly){
        if (newfly) {
            newfly.fff = firefly.fff;
        }
    })
}
if (elements.human) {elements.human.color = [
    "#f5eac6",
    "#d4c594",
    "#a89160",
    "#7a5733",
    "#523018",
    "#361e0e"
];}
if (elements.body) {elements.body.color = [
    "#049699",
    "#638A61"
];}
if (elements.head) {elements.head.color = [
    "#f5eac6",
    "#d4c594",
    "#a89160",
    "#7a6433",
    "#524018"
];}
if (elements.slug) {elements.slug.color = [
    "#997e12",
    "#403314",
    "#997e12",
    "#403314",
    "#997e12",
    "#403314",
    "#997e12",
    "#403314",
    "#997e12",
    "#403314",
    "#997e12",
    "#403314",
    "#124a44"
];}
if (elements.light) {elements.light.color = "#ffffa8";}
if (elements.wheat) {elements.wheat.color = "#c9bc81";}
if (elements.permafrost) {elements.permafrost.color = [
    "#557d65",
    "#557d79"
];}
if (elements.root) {elements.root.color = "#7B6F6B";}
if (elements.sap) {elements.sap.color = [
    "#B66B18",
    "#C84805",
    "#CF6719",
    "#E49B3A"
];}
if (elements.electric) {elements.electric.color = "#dddd00";}
if (elements.epsom_salt) {elements.epsom_salt.color = [
    "#f2f2f2",
    "#e0e0e0"
];}
if (elements.flash) {elements.flash.color = "#ffffa8";}
if (elements.bread) {elements.bread.color = "#F2CF99";}
if (elements.mycelium) {elements.mycelium.color = ["#734d5e","#b5949f","#734d53"];}
if (elements.glass) {elements.glass.color = ["#5e807d","#679e99"];}
if (elements.rad_glass) {elements.rad_glass.color = ["#648c64","#6aad83"];}
if (elements.packed_sand) {elements.packed_sand.color = "#a1975d";}
if (elements.dough) {elements.dough.color = "#edd8ba";}
if (elements.flour) {elements.flour.color = "#f0e2b7";}