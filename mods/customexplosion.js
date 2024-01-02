//This mod was made by Alex the transfem, https://discord.com/users/778753696804765696 on discord and https://www.tiktok.com/@alextheagenenby?_t=8hoCVI3NRhu&_r=1 on tiktok.
//how to use:
//instead of putting an element, put "explosion" in along with the radius, like so:
//"water": {
//explosion: "fire,fire,fire,hydrogen", radius: 5
//}
function customExplosion(pixel1, pixel2, radius, list) {
  let x = pixel1.x;
  let y = pixel1.y;
  deletePixel(x, y);
  deletePixel(pixel2.x, pixel2.y);
  explodeAt(x, y, radius, list);
};
function reactPixels(pixel1,pixel2) {
    var r = elements[pixel1.element].reactions[pixel2.element];
    if (r.setting && settings[r.setting]===0) {
        return false;
    }
    // r has the attribute "y" which is a range between two y values
    // r.y example: [10,30]
    // return false if y is defined and pixel1's y is not in the range
    if (r.tempMin !== undefined && pixel1.temp < r.tempMin) {
        return false;
    }
    if (r.tempMax !== undefined && pixel1.temp > r.tempMax) {
        return false;
    }
    if (r.burning1 !== undefined && Boolean(pixel1.burning) !== r.burning1) {
        return false;
    }
    if (r.burning2 !== undefined && Boolean(pixel2.burning) !== r.burning2) {
        return false;
    }
    if (r.charged && !pixel.charge) {
        return false;
    }
    if (r.chance !== undefined && Math.random() > r.chance) {
        return false;
    }
    if (r.y !== undefined && (pixel1.y < r.y[0] || pixel1.y > r.y[1])) {
        return false;
    }
    if (r.explosion !== undefined){
      if (r.radius !== undefined){
        let radius = r.radius;
        let list = r.explosion.split(",");
        console.log(list);
        console.log(pixel1, pixel2, radius, list);
        customExplosion(pixel1, pixel2, radius, list);
      }
    }
    if (r.elem1 !== undefined) {
        // if r.elem1 is an array, set elem1 to a random element from the array, otherwise set it to r.elem1
        if (Array.isArray(r.elem1)) {
            var elem1 = r.elem1[Math.floor(Math.random() * r.elem1.length)];
        } else { var elem1 = r.elem1; }

        if (elem1 == null) {
            deletePixel(pixel1.x,pixel1.y);
        }
        else {
            changePixel(pixel1,elem1);
        }
    }
    if (r.charge1) { pixel1.charge = r.charge1; }
    if (r.temp1) { pixel1.temp += r.temp1; pixelTempCheck(pixel1); }
    if (r.color1) { // if it's a list, use a random color from the list, else use the color1 attribute
        pixel1.color = pixelColorPick(pixel1, Array.isArray(r.color1) ? r.color1[Math.floor(Math.random() * r.color1.length)] : r.color1);
    }
    if (r.attr1) { // add each attribute to pixel1
        for (var key in r.attr1) {
            pixel1[key] = r.attr1[key];
        }
    }
    if (r.elem2 !== undefined) {
        // if r.elem2 is an array, set elem2 to a random element from the array, otherwise set it to r.elem2
        if (Array.isArray(r.elem2)) {
            var elem2 = r.elem2[Math.floor(Math.random() * r.elem2.length)];
        } else { var elem2 = r.elem2; }

        if (elem2 == null) {
            deletePixel(pixel2.x,pixel2.y);
        }
        else {
            changePixel(pixel2,elem2);
        }
    }
    if (r.charge2) { pixel2.charge = r.charge2; }
    if (r.temp2) { pixel2.temp += r.temp2; pixelTempCheck(pixel2); }
    if (r.color2) { // if it's a list, use a random color from the list, else use the color2 attribute
        pixel2.color = pixelColorPick(pixel2, Array.isArray(r.color2) ? r.color2[Math.floor(Math.random() * r.color2.length)] : r.color2);
    }
    if (r.attr2) { // add each attribute to pixel2
        for (var key in r.attr2) {
            pixel2[key] = r.attr2[key];
        }
    }
    if (r.func) { r.func(pixel1,pixel2); }
    return r.elem1!==undefined || r.elem2!==undefined;
}
elements.customExplosion = {
  items: "",
  behavior: behaviors.SOLID,
  state: "solid",
  onSelect: function(){
    let items = prompt("What should this explosion include? enter in format of \"elem1,elem2,elem3\" ensuring that there are no spaces, you can also use the same element multiple times.");
    let radius = prompt("Enter explosion radius:");
    elements.customExplosion.behavior = [["XX", "XX", "XX"], ["XX", `EX:${radius}>${items}`, "XX"], ["XX", "XX", "XX"]]
  },
}
