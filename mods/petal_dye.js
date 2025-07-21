elements.water.reactions.petal = {
  func: function(pixel1, pixel2) {
    if (pixel1.temp > 64) {
      deletePixel(pixel1.x, pixel1.y);
      pixel2.element = "dye";
    }
  }
}
