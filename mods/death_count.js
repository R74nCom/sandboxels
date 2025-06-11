let dc_oldOnChange = elements.head.onChange;
let dc_oldOnDelete = elements.head.onDelete;
let dc_oldTick = elements.head.tick;

let deathCount = 0;
function announceDeath() {
    clearLog();
    deathCount++;
    logMessage(deathCount+" Humans have died.")
}

runAfterReset(function() {
    deathCount = 0;
})

elements.head.onChange = function(pixel) {
    dc_oldOnChange(pixel);

    if (pixelTicks - pixel.start > 30) announceDeath();

}

elements.head.onDelete = function(pixel) {
    dc_oldOnDelete(pixel);

    if (pixelTicks - pixel.start > 30) announceDeath();
}

elements.head.tick = function(pixel) {
    dc_oldTick(pixel);
    
    if (pixel.dead && pixel.deadA === undefined) {
        pixel.deadA = true;
    }
}