//This mod was made by Adora the transfem, https://discord.com/users/778753696804765696 on discord and https://www.tiktok.com/@alextheagenenby?_t=8hoCVI3NRhu&_r=1 on tiktok.
let code = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26, A: 27, B: 28, C: 29, D: 30, E: 31, F: 32, G: 33, H: 34, I: 35, J: 36, K: 37, L: 38, M: 39, N: 40, O: 41, P: 42, Q: 43, R: 44, S: 45, T: 46, U: 47, V: 48, W: 49, X: 50, Y: 51, Z: 52 }
let invertedCode = {}
let flat = function(){
  let str = "";
  for(var i = 0; i < width; i++){
    str += "a";
  }
  return str;
}
let biomes = {
  plains: {
    layers: 2,
    thicknesses: [15, 10],
    specificSeeds: "flat",
    heights: [1, 21],
    layersObj: {
      1: ["rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","iron","iron","iron","aluminum","aluminum","aluminum","aluminum","uranium","diamond","copper","copper","copper","copper","sodium","sodium","potassium","potassium","charcoal","charcoal","charcoal","charcoal","charcoal", "calcium"],
      2: ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt","dirt", "dirt", "dirt","dirt", "dirt", "gravel", "gravel"]
    },
    ssHeight: 39,
    ssElems: ["grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","sapling","pinecone","seeds","seeds"]
  },
  desert: {
    layers: 1,
    thicknesses: [20],
    specificSeeds: "flat",
    heights: [1],
    layersObj: {
      1: ["sand"]
    },
    ssHeight: 40,
    ssElems: [undefined,undefined,undefined,undefined,undefined,undefined,"cactus"]
  },
  forest: {
    layers: 2,
    specificSeeds: "flat",
    heights: [1, 16],
    thicknesses: [15, 10],
    ssHeight: 29,
    layersObj: {
      1: ["rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","charcoal","charcoal","charcoal","charcoal","charcoal","iron","iron","iron","aluminum","aluminum","aluminum","calcium","calcium","sodium","potassium","diamond"],
      2: ["dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","gravel"]
    },
    ssElems: ["grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","grass_seed","sapling", "pinecone"],
  }
}
for (var item in code){
  invertedCode[code[item]] = item;
}
let ranNum = function(max, last) {
    // Calculate a bias factor
    let bias = Math.random() * 0.07 + 0.5; // Adjust this range to control the bias strength

    // Generate a biased random number towards the 'last' value
    let num = Math.round(bias * last + (1 - bias) * Math.random() * max) + 1;

    // Randomly assign a negative or positive sign
    return (Math.random() > 0.5) ? num : -num;
}
function decode(str){
  let result = [];
  str.split("");
  for(var i = 0; i < str.length; i++){
    if(code[str[i]]){
      if(str[i - 1] == "*"){
        result[i] = code[str[i]] * 2;
      } else {
        result[i] = code[str[i]];
      }
    } else if(str[i] == ":"){
      result[i] = ":";
    } else {continue;}
  }
  return result.filter(element => element !== undefined);
}
function makeSeed(layers, thickness){
  let result = "";
  for(var i = 0; i < layers; i++){
    let avgThickness = thickness[i];
    let str = "";
    let lastNum = 0;
    for(var ii = 1; ii <= width-1; ii++){
      let num = ranNum(4, lastNum);
      let cThickness = avgThickness + num;
      lastNum = num;
      if(invertedCode[cThickness] != undefined){
        str += invertedCode[cThickness];
      } else {
        let num = Math.round(cThickness / 2);
        str += `*${invertedCode[num]}`;
      }
    }
    result += (i == (layers - 1)) ? str : `${str}:`;
  }
  return result;
}
function splitArrayByCharacter(arr, char) {
    let result = [];
    let subArray = [];

    arr.forEach(element => {
        if (element === char) {
            result.push(subArray);
            subArray = [];
        } else {
            subArray.push(element);
        }
    });

    // Push the last subarray if it's not empty
    if (subArray.length > 0) {
        result.push(subArray);
    }

    return result;
}
let seed = "";
function generate(type, seed1 = undefined){
  if(seed1){
    seed = seed1;
  } else{
    seed = makeSeed(biomes[type].layers, biomes[type].thicknesses);
  }
  let semifinalArr = decode(seed);
  let finalArr = splitArrayByCharacter(semifinalArr, ":");
  for(var i = 0; i < finalArr.length; i++){
    let lHeight = biomes[type].heights[i];
    for(var ii = 1; ii < width-1; ii++){
      for(var iii = (height - 1) - lHeight; iii > height - lHeight - finalArr[i][ii]; iii--){
        let x = ii;
        let y = iii;
        let Num = Math.round(Math.random() * biomes[type].layersObj[i+1].length);
        if(Num == biomes[type].layersObj[i+1].length){Num-=1;}
        let element = biomes[type].layersObj[i+1][Num];
        if(isEmpty(x, y) && !outOfBounds(x, y)){
          createPixel(element, x, y);
        } else {console.log("could not place. " + x + ", " + y); continue;}
      }
    }
  }
  if(biomes[type].specificSeeds){
    if(biomes[type].specificSeeds == "flat"){
      for(var i = 1; i < width-1; i++){
        let y = height - biomes[type].ssHeight;
        let Num = Math.round(Math.random() * biomes[type].ssElems.length);
        if(Num == biomes[type].ssElems.length){Num-=1;}
        let element = biomes[type].ssElems[Num];
        if(element == undefined){continue;}
        if(isEmpty(i, y) && !outOfBounds(i, y)){
          createPixel(element, i, y);
        }
      }
    }
  }
}
elements.copy_seed = {
  category: "tools",
  onSelect: function(pixel){
    navigator.clipboard.writeText(seed).then(function() {
      alert(`Seed succesfully copied to clipboard!`);
    }).catch(function(error) {
      alert("Unable to copy text.")
    });
    
  }
}
elements.random_generation = {
  category: "tools",
  onSelect: function(pixel){
    autoResizeCanvas();
    focusGame();
    let type = prompt("Enter the biome you want to generate: \nOptions: plains, desert, forest");
    if(!biomes[type]) {type = "plains";}
    generate(type);
  }
}
elements.seed_generation = {
  category: "tools",
  onSelect: function(pixel){
    autoResizeCanvas();
    focusGame();
    let type = prompt("Enter the biome you want to generate: \nOptions: plains, desert, forest");
    let seed1 = prompt("Enter the seed: ");
    generate(type, seed1);
  }
}
