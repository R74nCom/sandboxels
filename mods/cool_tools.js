elements.exploder = {
    color: "#fa872f",
    tool: function(pixel) {
        if (pixel.element == "sand") {
            pixel.element = "explosion"
        }
    },
    category: "tools",
};
  
elements.radiator = {
    color: "#248c1c",
    tool: function(pixel) {
        if (pixel.element == "null") {
            pixel.element == "radiation"
        }
        if (pixel.element == "cloud") {
            pixel.element = "rad_cloud"
        }
        if (pixel.element == "cell") {
            pixel.element = "cancer"
        }
        if (pixel.element == "steam" {
            pixel.element = "rad_steam"
        }
    },
    category: "tools",
};
//im aware that theres more radiation stuf than this
