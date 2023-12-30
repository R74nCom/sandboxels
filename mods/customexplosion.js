//This mod was made by Alex the transfem, https://discord.com/users/778753696804765696 on discord and https://www.tiktok.com/@alextheagenenby?_t=8hoCVI3NRhu&_r=1 on tiktok.
//how to use:
//the "customExplosion" function is to be used in reactions, like so:
//"water": {
//func: function (pixel1, pixel2) {customExplosion(pixel1, pixel2, 5, ["fire", "fire", "pop", "hydrogen", "sodiumhydroxide", "potassiumhydroxide","sodiumhydroxide", "potassiumhydroxide","sodiumhydroxide", "potassiumhydroxide"])}
//}
//and the element you just have to select and enter "EX:(radius)>(elem1),(elem2),(elem3)" and so on. do not include spaces.
function customExplosion(pixel1, pixel2, radius, list) {
  let x = pixel1.x;
  let y = pixel1.y;
  deletePixel(x, y);
  deletePixel(pixel2.x, pixel2.y);
  explodeAt(x, y, radius, list);
};
elements.customExplosion = {
  items: "",
  rItems: "",
  behavior: behaviors.SOLID,
  state: "solid",
  onSelect: function(){
    items = prompt("What should this explosion include?");
    this.items = items;
    console.log(items);
    elements.customExplosion.behavior = [["XX", "XX", "XX"], ["XX", `EX:4>${items}`, "XX"], ["XX", "XX", "XX"]]
  },
}
