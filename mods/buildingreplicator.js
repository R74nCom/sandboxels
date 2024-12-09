function playSound(soundFile) {
    var audio = new Audio("https://JustAGenericUsername.github.io/" + soundFile);
    audio.play();
  }
  function reverseObject(obj) {
    const reversedObj = {};
    for (const key in obj) {
        const value = obj[key];
        reversedObj[value] = key;
    }
    return reversedObj;
}
let blueprint = [
    ["0","0","0","0","0","G","G","G","G","G","0","0","0","0","0"],
    ["0","0","0","G","G","S","W","W","W","S","G","G","0","0","0"],
    ["0","0","G","W","W","S","W","W","W","S","W","W","G","0","0"],
    ["0","G","W","W","W","S","0","0","0","S","W","W","W","G","0"],
    ["0","G","W","W","0","0","0","0","0","0","0","W","W","G","0"],
    ["G","S","S","S","0","0","0","0","0","0","0","S","S","S","G"],
    ["G","W","W","0","0","0","0","0","0","0","0","0","W","W","G"],
    ["G","W","W","0","0","0","0","0","0","0","0","0","W","W","G"],
    ["G","W","W","0","0","0","0","0","0","0","0","0","W","W","G"],
    ["G","S","S","S","0","0","0","0","0","0","0","S","S","S","G"],
    ["0","G","W","W","0","0","0","0","0","0","0","W","W","G","0"],
    ["0","G","W","W","W","S","0","0","0","S","W","W","W","G","0"],
    ["0","0","G","W","W","S","W","W","W","S","W","W","G","0","0"],
    ["0","0","0","G","G","S","W","W","W","S","G","G","0","0","0"],
    ["0","0","0","0","0","G","G","G","G","G","0","0","0","0","0"]
]
let decaybp = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,2,2,2,2,0,2,2,2,2,2,2,2,3,1,3,0,4,0],
  [5,2,2,6,6,7,6,6,6,6,6,6,6,8,8,8,8,8,0],
  [5,2,9,6,6,0,6,0,6,0,6,0,6,9,0,0,0,10,0],
  [8,2,11,6,6,0,6,0,6,0,6,0,6,8,8,8,8,8,0],
  [5,2,9,6,6,6,0,0,0,0,0,0,6,9,2,2,0,10,0],
  [5,2,2,2,9,6,9,9,6,9,9,6,9,9,2,2,0,10,0],
  [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,10,0],
  [0,0,9,9,0,9,9,0,9,0,9,9,0,9,9,2,2,2,2]]
function getRandomPixelCoordinates(pixel, offsetx, offsety, bp, keyobject) {
  let x, y, r;
  let attempts = 0;
  const maxAttempts = 1000;
  do {
      x = Math.floor(Math.random() * bp[0].length);
      y = Math.floor(Math.random() * bp.length);
      r = bp[y][x];
      r = keyobject[r];
      //if (r !== undefined) {
          attempts++;
      //}
      if (attempts >= maxAttempts) {
          return "terminated";
      }
  } while (r === undefined || r === 0 || r === "0" || !isEmpty(pixel.x + x - offsetx, pixel.y + y - offsety));
  return { x, y, r };
}

elements.turn_into = {
  color: "#000000",
  behavior: behaviors.WALL,
  state: "gas",
  hidden: true,
  properties: {
    timer: 8,
  },
  category: "special",
  tick: function(pixel){
    if (!pixel.turninto){deletePixel(pixel.x, pixel.y); return}
    if (pixel.timer == 8){pixel.color = pixelColorPick({element: pixel.turninto})}
    //console.log(elements[pixel.turninto].color)
    pixel.timer --
    if (pixel.timer <= 0){
      deletePixel(pixel.x, pixel.y);
      createPixel(pixel.turninto, pixel.x, pixel.y);
    }
  }
}
elements.submitted_blueprint_1_creator = {
  color: "#64abfd",
  behavior: behaviors.WALL,
  state: "solid",
  category: "special",
  tick: function(pixel){
    if(!pixel.done){
      if (pixelTicks % 3 == 0){
        let randomcoord = getRandomPixelCoordinates(pixel, 7, 7, blueprint, {G: "glass", S: "steel", W: "silver"});
        if (randomcoord == "terminated"){pixel.done = true; return;}
        let rx = pixel.x + randomcoord.x-7;
        let ry = pixel.y + randomcoord.y-7;
        playSound("synth.wav")
        try {
          createPixel("turn_into", rx, ry);
          pixelMap[rx][ry].turninto = randomcoord.r;
          pixelMap[rx][ry].timer = 8;
        } catch (error) {
          console.error("Error occurred at coordinates:", rx, ",", ry);
          console.error("Error message:", error);
        }
      }
      if(pixelTicks == pixel.start){
      //  playSound("nocmusic.mp3")
      }
    }
  }
}
elements.submitted_blueprint_2_creator = {
  color: "#64abfd",
  behavior: behaviors.WALL,
  state: "solid",
  category: "special",
  tick: function(pixel){
    if(!pixel.done){
      if (pixelTicks % 3 == 0){
        let randomcoord = getRandomPixelCoordinates(pixel, -1, -1, decaybp, {1: "led_r", 2:"porcelain", 3: "glass", 4: "tungsten", 5: "zinc", 6: "aluminum", 7: "copper", 8: "copper", 9: "steel", 10: "bronze", 11: "sterling"});
        if (randomcoord == "terminated"){pixel.done = true; return;}
        let rx = pixel.x + randomcoord.x+1;
        let ry = pixel.y + randomcoord.y+1;
        playSound("synth.wav")
        try {
          createPixel("turn_into", rx, ry);
          pixelMap[rx][ry].turninto = randomcoord.r;
          pixelMap[rx][ry].timer = 8;
        } catch (error) {
          console.error("Error occurred at coordinates:", rx, ",", ry);
          console.error("Error message:", error);
        }
      }
      if(pixelTicks == pixel.start){
     //   playSound("nocmusic.mp3")
      }
    }
  }
}
elements.custom_bp_spawner = {
  color: "#64abfd",
  behavior: behaviors.WALL,
  state: "solid",
  category: "special",
  tick: function(pixel){
    if(!pixel.done){
      if (pixelTicks % 3 == 0){
        let randomcoord = getRandomPixelCoordinates(pixel, -1, -1, customBP, customBPKey);
        if (randomcoord == "terminated"){pixel.done = true; return;}
        let rx = pixel.x + randomcoord.x+1;
        let ry = pixel.y + randomcoord.y+1;
        playSound("synth.wav")
        try {
          createPixel("turn_into", rx, ry);
          pixelMap[rx][ry].turninto = randomcoord.r;
          pixelMap[rx][ry].timer = 8;
        } catch (error) {
          console.error("Error occurred at coordinates:", rx, ",", ry);
          console.error("Error message:", error);
        }
      }
      if(pixelTicks == pixel.start){
     //   playSound("nocmusic.mp3")
      }
    }
  }
}
var customBP = [[0]]
var customBPKey = {}
let bpsizeH = 15;
let bpsizeW = 15;
let generatedBP = [];
let seenElements = {};
elements.bp_scanner = {
  color: "#64abfd",
  behavior: behaviors.SOLID,
  state: "solid",
  category: "special",
  onSelect: function(pixel){
    bpsizeH = prompt("Enter the height of the blueprint. It will be scanned from the TOP LEFT corner.", 15);
    bpsizeW = prompt("Enter the width of the blueprint", 15);
  },
  tick: function(pixel){
    if(pixelTicks == pixel.start){
      generatedBP = [];
      for (let y = 1; y <= bpsizeH; y++){
        generatedBP.push([]);
      }
      let elementCounter = 1;
      seenElements = {};
      for (let y = 0; y < bpsizeH; y++){
        for (let x = 0; x < bpsizeW; x++){
          if (!isEmpty(pixel.x + x + 1, pixel.y + y + 1, true)){
            var opElement = pixelMap[pixel.x + x+1][pixel.y + y+1].element;
            if (!seenElements[opElement]){
              generatedBP[y].push(elementCounter);
              seenElements[opElement] = elementCounter;
              elementCounter++;
            } else {
              generatedBP[y].push(seenElements[opElement]);
            }
          } else {
            generatedBP[y].push(0);
          }
        }
      }
      console.log(generatedBP);
      console.log(seenElements);
      deletePixel(pixel.x, pixel.y);
      customBP = generatedBP;
      customBPKey = reverseObject(seenElements);
    }
  }
}

