urlParams = new URLSearchParams(window.location.search);

backgroundUseStrings = ["bg","background","settings.bg"]

if(urlParams.get('pageColor') != null) { //null check
    color = urlParams.get('pageColor');
    if(color === "" || color === null) { //NaN check
        color = "black";
    };
    if(backgroundUseStrings.includes(color.toLowerCase())) {
	!settings.bg ? color = "black" : color = settings.bg;
        color = settings.bg;
    };

color_Would_Be_A_Triplet_If_It_Started_With_An_Octothorpe = null;
color_Is_Supported_As_A_Background_By_The_Browser = null;

if( /^#([0-9A-F]{3}){1,2}$/i.test("#" + color) ) {
    color_Would_Be_A_Triplet_If_It_Started_With_An_Octothorpe = true
} else {
    color_Would_Be_A_Triplet_If_It_Started_With_An_Octothorpe = false
}

if( CSS.supports('background',color) ) {
    color_Is_Supported_As_A_Background_By_The_Browser = true
} else {
    color_Is_Supported_As_A_Background_By_The_Browser = false
}

if(color_Is_Supported_As_A_Background_By_The_Browser == false && color_Would_Be_A_Triplet_If_It_Started_With_An_Octothorpe == true) {
    color = "#" + color
}

document.body.style.background = color;
};
