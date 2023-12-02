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
if (elements.frozen_meat) {elements.frozen_meat.color = "#65b8aa";}
if (elements.petal) {elements.petal.color = "#ff0000"; elements.petal.singleColor = false;}
if (elements.mushroom_cap) {
    elements.mushroom_cap.color = ["#c74442","#c74442","#c74442","#cfb4b4","#c74442","#c74442","#c74442"];
    elements.mushroom_cap.singleColor = false;
}
if (elements.mushroom_gill) {
    elements.mushroom_gill.tick = function(pixel) {
        if (isEmpty(pixel.x,pixel.y-1) && Math.random() < 0.1) {
            createPixel("mushroom_cap",pixel.x,pixel.y-1);
        }
        if (isEmpty(pixel.x-1,pixel.y) && Math.random() < 0.02) {
            // create either mushroom_gill or mushroom_cap
            if (Math.random() < 0.5) {
                createPixel("mushroom_gill",pixel.x-1,pixel.y);
            } else {
                createPixel("mushroom_cap",pixel.x-1,pixel.y);
            }
        }
        if (isEmpty(pixel.x+1,pixel.y) && Math.random() < 0.02) {
            if (Math.random() < 0.5) {
                createPixel("mushroom_gill",pixel.x+1,pixel.y);
            } else {
                createPixel("mushroom_cap",pixel.x+1,pixel.y);
            }
        }
    }
}
if (elements.slaked_lime) {elements.slaked_lime.color = "#adb8b5";}
if (elements.lead) {elements.lead.color = "#6c6c6a";}
if (elements.drag) {elements.drag.color = "#ffffff";}
if (elements.tuff) {elements.tuff.color = ["#A16A49","#C98256","#C7834F","#BF7640","#DB8641","#D1732C","#AF5D30","#A55E35","#8B5B4C"];}
if (elements.blood) {elements.blood.color = "#ff0000";}
if (elements.water && elements.tuff) {elements.water.reactions.tuff = { elem2: "wet_sand", color2:"#7a6b5c", chance: 0.00035 };}
if (elements.antibody) {elements.antibody.color = "#ff4040";}
if (elements.infection) {elements.infection.color = "#cf005d";}
if (elements.molten_solder) {delete elements.molten_solder.color;}
if (elements.gold_coin) {elements.gold_coin.color = ["#fff0b5","#986a1a","#f0bb62"];}