elements.free = { 
color:"#ff0000",
tool: function(pixel) {
if (pixel.element == "water") {
changePixel(pixel, "rock_wall");
}
},
category: "tools",
}