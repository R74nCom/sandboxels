//The "pixelSize" query parameter sets the size of the pixels; this is inversely proportional to the pixel "resolution", so bigger numbers mean less pixels fit on the screen and smaller numbers mean that more pixels will fit.
//Depending on your screen's size, the default pixelSize is either 5 or 6 (6 on larger screens).
//Making the pixels twice as big will decrease the pixel capacity by *slightly over* 4, and the reverse is also true. (I don't know why that is.)

urlParams = new URLSearchParams(window.location.search);

if(urlParams.get('pixelSize') != null) { //null check
    pixelSize = urlParams.get('pixelSize')
    if(isNaN(pixelSize) || pixelSize === "" || pixelSize === null) { //NaN check
        //Vanilla code
        //[Vanilla comment] If the screen size is under 768px, set pixelSize to 5, otherwise 6
        if (window.innerWidth < 700) {
            pixelSize = 5;
        } else {
            pixelSize = 6;
        }
    }
    pixelSize = parseFloat(pixelSize)
    pixelSize = Math.min(194.73749999999999,Math.max(pixelSize,0.05))
} else {
    //Vanilla code
    //[Vanilla comment] If the screen size is under 768px, set pixelSize to 5, otherwise 6
    if (window.innerWidth < 700) {
        pixelSize = 5;
    } else {
        pixelSize = 6;
    }
}
