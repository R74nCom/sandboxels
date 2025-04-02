elements.hide = {
	color: "#000000",
    tool: function(pixel){
        pixel.alpha = 0
    },
	category: "tools",
	canPlace: false,
	desc: "Use on pixels to hide them.",
};
elements.show = {
    color: "#ffffff",
    tool: function(pixel){
        pixel.alpha = 1
    },
    category: "tools",
    canPlace: false,
    desc: "Use on pixels to show them."
};
