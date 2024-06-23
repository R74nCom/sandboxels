function getColor(celsius) { return `#${toHex((t = (celsius - 273.15) / 100.0) <= 66.0 ? 255 : Math.min(255, Math.max(0, 329.698727446 * Math.pow(t - 60.0, -0.1332047592))))}${toHex(t <= 66.0 ? Math.min(255, Math.max(0, 99.4708025861 * Math.log(t) - 161.1195681661)) : Math.min(255, Math.max(0, 288.1221695283 * Math.pow(t - 60.0, -0.0755148492))))}${toHex(t >= 66.0 ? 255 : t <= 19.0 ? 0 : Math.min(255, Math.max(0, 138.5177312231 * Math.log(t - 10) - 305.0447927307)))}`; }

function toHex(c) { 
  if (c.isNaN()) {
    return "00";
  }
  const hex = Math.round(c).toString(16); return hex.length === 1 ? "0" + hex : hex; }

elements.blackBody = {
  color: getColor(20),
  behavior: behaviors.WALL,
  category: "special",
  desc: "Displays the color emitted by an idealized opaque, non-reflective body.",
  tick: function (pixel) {
    pixel.color = getColor(pixel.temp);
  }
}