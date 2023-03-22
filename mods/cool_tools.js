elements.exploder = {
    color: "#ffffff",
    tool: function(pixel) {
        if (pixel.element == "sand") {
            pixel.element = "explosion"
        }
    },
    category: "tools",
};
  
elements.radiator = {
    color: '#ffffff',
    tool: function (pixel) {
        if (pixel.element == 'cloud') {
            pixel.element = 'rad_cloud'
        }
        if (pixel.element == 'cell') {
            pixel.element = 'cancer'
        }
        if (pixel.element == 'steam') {
            pixel.element = 'rad_steam'
        }
        if (pixel.element == 'dust') {
            pixel.element = 'fallout'
        }
        if (pixel.element == 'explosion') {
            pixel.element = 'n_explosion'
        }
        if (pixel.element == 'null') {
            pixel.element = 'radiation'
        }
    }, 
    category: 'tools',
};
//im aware that theres more radiation stuf than this
