elements.blood.hidden = true;
elements.blood.tick = function (pixel) {
    tryDelete(pixel.x, pixel.y);
}
elements.blood.onPlace = function (pixel) {
    tryDelete(pixel.x, pixel.y);
}

elements.infection.hidden = true;
elements.infection.tick = function (pixel) {
    tryDelete(pixel.x, pixel.y);
}
elements.infection.onPlace = function (pixel) {
    tryDelete(pixel.x, pixel.y);
}

elements.antibody.hidden = true;
elements.antibody.tick = function (pixel) {
    tryDelete(pixel.x, pixel.y);
}
elements.antibody.onPlace = function (pixel) {
    tryDelete(pixel.x, pixel.y);
}