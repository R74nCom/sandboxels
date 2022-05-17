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
};

document.body.style.backgroundColor = color;