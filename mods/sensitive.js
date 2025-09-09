// Makes all elements EXTREAMLY sensitive to air or anything else.


runAfterLoad(function() {
    for (const elem in elements) {
        if (["fire", "explosion", "smoke"].includes(elem)) continue;
        if (!elements[elem].onPlace) {
            elements[elem].onPlace = function(pixel) {
                changePixel(pixel, "explosion");
            };
        } else {
            
            const oldOnPlace = elements[elem].onPlace;
            elements[elem].onPlace = function(pixel) {
                oldOnPlace(pixel);
                changePixel(pixel, "explosion");
            };
        }
    }
});