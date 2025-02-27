// antify v1
// turns stuff into antistuff.
// *made by xenonpy*

elements.antify = {
  color: '#141413',
  tool: function (pixel) {
    if (pixel.element === 'bomb') {
      pixel.element = 'antibomb';
    } else if (pixel.element.behavior == behaviors.LIQUID) {
      pixel.element = 'antifluid';
    } else if (pixel.element.behavior == behaviors.POWDER) {
      pixel.element = 'antipowder';
    } else {
      pixel.element = 'antimatter';
    }
  },
  category: 'tools',
};
