elements.dirt.color = [
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
];
elements.rotten_meat.color = [
    "#9ab865",
    "#b8b165",
    "#b89765"
];
elements.ant.color = "#4a0903";
elements.worm.color = "#402208";
elements.fly.color = "#303012";
elements.firefly.color = [
    "#310D09",
    "#310D09",
    "#d9d950",
    "#310D09",
    "#310D09"
];
elements.firefly.tick = function(pixel) {
    if (!pixel.fff) {
        pixel.fff = Math.floor(Math.random() * 60) + 20;
    }
    if (pixelTicks % pixel.fff === 0) {
        pixel.color = pixelColorPick(pixel,"#d9d950")
    }
    else if (pixelTicks % pixel.fff === 2) {
        pixel.color = pixelColorPick(pixel,"#310D09");
    }
    behaviors.FLY(pixel,function(firefly,newfly){
        if (newfly) {
            newfly.fff = firefly.fff;
        }
    })
},
elements.human.color = [
    "#f5eac6",
    "#d4c594",
    "#a89160",
    "#7a5733",
    "#523018",
    "#361e0e"
];
elements.body.color = [
    "#049699",
    "#638A61"
];
elements.head.color = [
    "#f5eac6",
    "#d4c594",
    "#a89160",
    "#7a6433",
    "#524018"
];
elements.slug.color = [
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
];
elements.light.color = "#ffffa8";
elements.wheat.color = "#c9bc81";
elements.permafrost.color = [
    "#557d65",
    "#557d79"
];
elements.root.color = "#7B6F6B";
elements.sap.color = [
    "#B66B18",
    "#C84805",
    "#CF6719",
    "#E49B3A"
];
elements.electric.color = "#dddd00";
elements.epsom_salt.color = [
    "#f2f2f2",
    "#e0e0e0"
];
elements.flash.color = "#ffffa8";
elements.bread.color = "#F2CF99";
elements.mycelium.color = ["#734d5e","#b5949f","#734d53"];