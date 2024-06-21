function getColor(celsius) {
    var temperature = (celsius - 273.15) / 100.0;
    var red, green, blue;
    if (temperature <= 66.0) {
      red = 255;
    } else {
      red = temperature - 60.0;
      red = 329.698727446 * Math.pow(red, -0.1332047592);
      if (red < 0) red = 0;
      if (red > 255) red = 255;
    }
    if (temperature <= 66.0) {
      green = temperature;
      green = 99.4708025861 * Math.log(green) - 161.1195681661;
      if (green < 0) green = 0;
      if (green > 255) green = 255;
    } else {
      green = temperature - 60.0;
      green = 288.1221695283 * Math.pow(green, -0.0755148492);
      if (green < 0) green = 0;
      if (green > 255) green = 255;
    }
    if (temperature >= 66.0) {
      blue = 255;
    } else {
      if (temperature <= 19.0) {
        blue = 0;
      } else {
        blue = temperature - 10;
        blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        if (blue < 0) blue = 0;
        if (blue > 255) blue = 255;
      }
    }
    return RGBToHex(Math.round(red), Math.round(green), Math.round(blue));
}
elements.blackBody = {
  color: getColor(20),
  behavior: behaviors.WALL,
  category: "special",
  desc: "Displays the color emitted by an idealized opaque, non-reflective body.",
  tick: function (pixel) {
    pixel.color = getColor(pixel.temp);
  }
}