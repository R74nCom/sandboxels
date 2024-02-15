//This mod was made by Adora the transfem, https://discord.com/users/778753696804765696 on discord and https://www.tiktok.com/@alextheagenenby?_t=8hoCVI3NRhu&_r=1 on tiktok.
let liquid = [["XX", "XX", "XX"], ["M1", "XX", "M1"], ["M1", "M2", "M1"]]
runAfterLoad(function(){
  for (var element in elements){
    elements[element].noMix = false;
    let a = elements[element].behavior;
    console.log(a, elements[element], liquid)
    if(a != undefined && typeof a != 'function'){
      let i = 0;
      while (i < a.length){
        if(typeof a[i] == "string"){
          a[i] = a[i].split("|");
          i += 1;
        } else {
          i += 1;
        }
      }
      elements[element].behavior = [[a[0][0], a[0][1], a[0][2]], [`${a[1][0]} AND M1`, a[1][1], `${a[1][2]} AND M1`], [`${a[2][0]} AND M1`, `${a[2][1]} AND M2`, `${a[2][2]} AND M1`]];
    } else {
      elements[element].behavior = liquid;
    }

  }
});
