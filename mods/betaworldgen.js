//This mod was made by Alex the transfem, https://discord.com/users/778753696804765696 on discord and https://www.tiktok.com/@alextheagenenby?_t=8hoCVI3NRhu&_r=1 on tiktok.
function randomAlter(num, list){
  let r = Math.floor(Math.random() * list.length);
  return (num + list[r]);
}
let avgheight = 0;
let seed = "";
function getSeed(type = "plains", thickness = 15){
  seed = "";
  console.log(thickness)
  if(thickness == 15){
    avgheight = Math.floor(Math.random() * (18 - 12 + 1)) + 12;
  } else{
    avgheight = thickness;
  }
  console.log(avgheight)
  
  if(type == "plains"){
    let location = Math.floor(Math.random(0, pixelMap.length) * 100);
    let i = 0;
    while (i < pixelMap.length){
      if (i !== location){
        seed += `${randomAlter(avgheight, [0, 1, 1, 2, 0, 0])}|`;
        i += 1;
      } else if (i == location){
        let height = `${Math.floor(Math.random(40, pixelMap[i].length) * 10)}`;
        let prevH = randomAlter(avgheight, [1, 1, 1, 2, 0, 0]);
        while (height > prevH){
          prevH = randomAlter(prevH, [0, 1, 1, 2, 0, 0, 0, 1]);
          seed += `${prevH}|`;
        }
        
        i += 1;

        }
      }
      return seed;
    }
  if(type == "desert"){
  let i = 0;
  while (i < pixelMap.length){
    seed += `${randomAlter(avgheight, [0, 1, 1, 2, 0, 0])}|`;
    i += 1;
    
      }
    }
    return seed;
  }
function spawnElements(seed, list, height2 = 1, condition = [1, 1, 0]){
  console.log(list);
  let width = pixelMap.length - 1;
  let element;
  let height = pixelMap[1].length - 1;
  console.log(seed);
  let seedArray = seed.split("|");
  console.log(seedArray);
  seedArray.splice(seedArray.indexOf(""), 1);
  seedArray.splice(pixelMap.length);
  console.log(seedArray);
  let i = 0;
  while (i < seedArray.length - 1){
    
    let ii = 0;
    while (ii < seedArray[i]){
      if((Math.floor(Math.random() * (condition[0] - condition[1] + 1))) == condition[2]){
        if (height2 != 1){
          element = list[Math.floor(Math.random() * list.length)];
          createPixel(element, (width - 1) - i, (height - (height2 + 1)) - ii);
        } else{
          element = list[Math.floor(Math.random() * list.length)];
          createPixel(element, (width - 1) - i, (height - 1) - ii);
        }
      }
      ii += 1;
    }
    
    i += 1;
  }
}

function flat(){
  let iii = 0;
  let flat = "";
  while (iii < pixelMap.length){
      flat += "1|";
      iii += 1;
  }
  return flat;
}
function processSeed(seed, type = "plains"){
  
  console.log(flat());
  let seedsArray = seed.split(":");
  console.log(seedsArray);
  if(type == "plains"){
    spawnElements(seedsArray[0],["rock","rock","rock","rock","rock","rock","metal_scrap","metal_scrap","metal_scrap","gold_coin","uranium","uranium","diamond","rock","iron","iron","iron","aluminum","aluminum","aluminum","aluminum","copper","copper","copper","zinc","zinc","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock"].sort(() => Math.random() - 0.5));
    setTimeout(function(){ spawnElements(seedsArray[1], ["dirt"], 24); }, 200);
    setTimeout(function(){ spawnElements(flat(),["grass","grass","grass","sapling","flower_seed","grass","grass","pinecone","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"], 40); }, 300);
  } else if(type == "desert"){
    spawnElements(seed, ["sand"]);
    setTimeout(function(){ spawnElements(flat(), ["cactus"], 40, [6, 0, 3]); }, 100);
  }
}
elements.worldGen = {
      color: "#FFFFFF",
      behavior: elements.erase.behavior,
      temp: 2,
      category: "tools",
      insulate:true,
      canPlace: false,
      desc: "Generate worlds with random seeds or your own seeds.",
  onSelect: function() {
    let Seed = prompt("Enter desert or plains random generation! automatically set to plains.");
    let regex = /[a-z]/;
    if (regex.test(Seed)){
      if(Seed.toLowerCase() == "desert"){
        processSeed(getSeed("desert", 30), "desert");
      }
    } else {
      if (Seed == ""){
        seed = `${getSeed("plains", 20)}:${getSeed("plains", 8)}`
        processSeed(seed);
      } else{
        processSeed(Seed);
      }
    }
  }
}
