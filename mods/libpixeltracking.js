enabledMods.includes("mods/libpacman-v1.js") || (enabledMods.push("mods/libpacman-v1.js"), localStorage.setItem("enabledMods", JSON.stringify(enabledMods)), location.reload());

let __trackedPixels = [];
let __oldCoords = [];
function subscribePixel(x, y, callback) {
  __trackedPixels.push({ pixel: pixelMap[x][y], callback, update: false });
  __oldCoords.push({ x, y });
}
requireMods(["mods/libhooktick.js"], () => {
  everyTick(() => {
    __trackedPixels.forEach((pixel, index) => {
      let difference = [0, 0];
      pixel.update = false;
      if (pixel.pixel.x !== __oldCoords[index].x) {
        difference[0] = Math.abs(__oldCoords[index].x-pixel.pixel.x);
        __oldCoords[index].x = pixel.pixel.x;
        pixel.update = true;
      }
      if(pixel.pixel.y !== __oldCoords[index].y){
        difference[1] = Math.abs(__oldCoords[index].y-pixel.pixel.y);
        __oldCoords[index].y = pixel.pixel.y;
        pixel.update = true;
      }
      if(pixel.update){
        pixel.callback(pixel.pixel, difference[0], difference[1]);
      }
    });
  });
});
