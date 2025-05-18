/* FOOLS-2-5 */

let perlinscript = document.createElement("script");
perlinscript.src = "scripts/perlin.js";

perlinscript.addEventListener("load",()=> {
  document.getElementById("controls").insertAdjacentHTML("beforeend",`
  <div style="text-align:center;justify-content:space-around;">
  <button class="elementButton" id="modulatorButton" style="border-color:#ff00ff; background-image: linear-gradient(to right bottom, rgb(255, 213, 180), rgb(238, 108, 255));" onclick="openModulator();">Element Modulator</button>
  </div>
  `)
})

document.head.appendChild(perlinscript);


function openModulator() {
  let genericParent = document.getElementById("genericParent");
  genericParent.style.display = "block";
  showingMenu = "generic";

  let genericMenuTitle = document.getElementById("genericMenuTitle");
  genericMenuTitle.innerText = "Element Modulator";

  let genericMenuText = document.getElementById("genericMenuText");
  genericMenuText.innerHTML = "Tap to target a universe.";

  document.getElementById("genericMenuOK").innerText = "Modulate";

  let modulator = document.createElement("canvas");
  modulator.id = "modulator";
  genericMenuText.appendChild(modulator);

  // modulator.style.backgroundColor = "gray";
  modulator.style.width = "100%";
  modulator.style.display = "block";
  modulator.style.imageRendering = "pixelated";
  modulator.style.backgroundImage = 'url("icons/modulator.png")';
  modulator.style.backgroundSize = 'cover';
  modulator.style.backgroundRepeat = 'no-repeat';
  modulator.style.filter = 'hue-rotate(1deg)';
  modulator.height = 100;
  let modulatorCtx = modulator.getContext("2d");

  modulator.onclick = handleModulation;
  modulator.onmousedown = handleModulation;
  modulator.oncontextmenu = ()=>false;
  modulator.onmousemove = (e) => {
    if (e.buttons || e.button) handleModulation(e);
  }
  modulator.ontouchstart = (e) => {
    e.preventDefault();
    handleModulation(e.touches[0])
  };
  modulator.ontouchmove = (e) => {
    e.preventDefault();
    handleModulation(e.touches[0])
  };

  // genericMenuText.insertAdjacentHTML("beforeend",`
  //   <span id="modulatorText">X???,Y???,Z</span><input type="number" id="modulatorZ" placeholder="0" value="1" style="width:3em;padding:0" onchange="if(!this.value && this.value!==0){this.value=0}document.getElementById('modulator').style.filter = 'hue-rotate('+(this.value % 359)+'deg)';">
  // `);
  genericMenuText.insertAdjacentHTML("beforeend",`
    <span id="modulatorText">X???,Y???,Z</span><span id="modulatorTextZ" style="width:6em;display:inline-block">1</span><input type="range" min="1" max="500" id="modulatorZ" value="1" style="width:5em;padding:0" oninput="if(!this.value && this.value!==0){this.value=0}document.getElementById('modulator').style.filter = 'hue-rotate('+(this.value % 359)+'deg)';document.getElementById('modulatorTextZ').innerText = this.value;">
  `);

  genericMenuHandler = modulateElement;
}

function handleModulation(e) {
  let modulator = document.getElementById("modulator");
  let modulatorCtx = modulator.getContext("2d");
  modulatorCtx.webkitImageSmoothingEnabled = false;
  modulatorCtx.mozImageSmoothingEnabled = false;
  modulatorCtx.imageSmoothingEnabled = false;
  
  const rect = modulator.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  
  x = Math.floor((x / modulator.clientWidth) * modulator.width);
  y = Math.floor((y / modulator.clientHeight) * modulator.height);
  let z = document.getElementById("modulatorZ").value || 0;

  // let value = noise.perlin3(x/50, y/50, z/50);
  // value = (value - -0.5) / (0.5 - -0.5);
  // value = Math.max(0,Math.min(1,value));
  // console.log(value);

  currentModulatorPos = [x,y,z];

  modulatorCtx.clearRect(0,0,modulator.width,modulator.height);

  modulatorCtx.fillStyle = "#ff9ffc";
  /*
      W
      W
    WW WW
      W
      W
  */
  modulatorCtx.fillRect(x+2, y, 4, 2);
  modulatorCtx.fillRect(x, y+2, 2, 4);
  modulatorCtx.fillRect(x, y-4, 2, 4);
  modulatorCtx.fillRect(x-4, y, 4, 2);

  document.getElementById("modulatorText").innerText = `X${x},Y${y},Z`;
}

currentModulatorPos = null;
function modulateValue(seed) {
  seed = seed / 174;
  noise.seed(seed);
  let value = noise.perlin3(currentModulatorPos[0]/50,currentModulatorPos[1]/50,currentModulatorPos[2]/50);
  value = (value - -0.5) / (0.5 - -0.5);
  value = Math.max(0.0001,Math.min(0.9999,value));
  return value;
}
function modulateChoose(array,seed) {
  let value = modulateValue(seed);
  // value = Math.min(0.99,value);
  return array[Math.floor(value*array.length)];
}
function modulateRange(min, max, seed) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(modulateValue(seed) * (max - min + 1)) + min;
}

wordSyllables = {
  "C": "B,C,D,F,G,H,J,K,L,M,N,P,QU,R,S,T,V,W,X,Y,Z,CH,TH,SH,PH,CK,NG,SS".toLowerCase().split(","),
  "V": "A,A,A,E,E,E,I,I,I,O,O,O,U,U,OU,AE,EE,IE,EA,EU,UI,OI,AI,OO,OW,OE,IA".toLowerCase().split(",")
}
function generateName() {
  let word = "";

  syllableCount = modulateChoose([2,3],1);
  let type = modulateValue(2) < 0.5;
  if (type === false && syllableCount === 1) syllableCount++;
  for (let i = 0; i < syllableCount; i++) {
    let letter;
    if (type === true) {
      letter = modulateChoose(wordSyllables.C,3+i);
      syllableCount++;
    }
    else letter = modulateChoose(wordSyllables.V,4+i);
    word += letter;
    type = !type;
  }

  if (word.charCodeAt(0) === word.charCodeAt(1)) {
    word = word.substring(1);
  }

  return word;
}

behaviors.FOOLS_LOOPY = [
  "XX|M2|M1",
  "XX|RT%20|M2",
  "XX|XX|XX",
];
behaviors.FOOLS_ELECTRIC = [
  "CL%5|CL%5|CL%5",
  "CL%5|SH%5 AND DL%50|CL%5",
  "M1%15 AND CL%6|M1%50 AND CL%13|M1%15 AND CL%6",
];
behaviors.FOOLS_BALL = [
  "XX|XX|XX",
  "XX|FY:0%5|XX",
  "XX|M1 AND BO|XX",
];

modulatorChoices = {
  behavior: [
    "POWDER","POWDER","POWDER","AGPOWDER","LIQUID","LIQUID","LIQUID","SUPERFLUID","LIGHTWEIGHT","AGLIQUID","UL_UR_OPTIMIZED","WALL","GAS","DGAS","SUPPORT","SUPPORTPOWDER","STURDYPOWDER","FOAM","BOUNCY","CRAWLER2","FOOLS_LOOPY","BOMB","BOMB","FOOLS_ELECTRIC","FOOLS_BALL"
  ],
  releases: [
    "radiation","foam","smoke","fire","cold_fire","electric","bless","neutron","fw_ember"
  ],
  burnInto: [
    null,"fire","smoke","ash","explosion","flash","electric","fw_ember","radiation","plasma","pop"
  ]
}

function modulateElement() {
  if (!currentModulatorPos) {
    logMessage("Modulator position wasn't specified!")
    return;
  }
  
  let element = {};

  element.desc = `Modulated at X${currentModulatorPos[0]},Y${currentModulatorPos[1]},Z${currentModulatorPos[2]}`;

  let name = generateName();

  let oldName = name;
  if (modulateValue(6) < 0.25) {
    let suffix = modulateChoose(["ium","ite","on"],7)
    name = name.replace(/([aeiou])$/g,suffix);
    if (name === oldName) name += suffix;
  }

  let h = modulateValue(1);
  let s = modulateValue(2);
  let l = Math.max(0.1,modulateValue(3));
  element.color = RGBToHex(HSLtoRGB([h,s,l]));

  let behavior = modulateChoose(modulatorChoices.behavior, 4);

  if (behavior == "LIQUID" || behavior == "SUPERFLUID" || behavior == "AGLIQUID" || behavior == "FOAM") {
    element.state = "liquid";
    element.category = "liquids";
  }
  else if (behavior == "UL_UR_OPTIMIZED" || behavior == "GAS" || behavior == "DGAS") {
    element.state = "gas";
    element.category = "gases";
  }
  else if (behavior == "BOUNCY") {
    element.state = modulateChoose(["liquid","gas"], 5);
    element.category = "energy";
  }
  else if (behavior == "CRAWLER2") {
    element.state = "solid";
    element.category = "life";
    element.tempHigh = 100;
    element.stateHigh = modulateChoose(["ash","cooked_meat"], 5);
    element.tempLow = 0;
    element.stateLow = modulateChoose(["dead_bug","frozen_meat"], 5);
  }
  else if (behavior == "BOMB") {
    element.state = "solid";
    element.category = "weapons";
    let choice = modulateChoose(randomChoices, 5);
    behavior = [
      "XX|XX|XX",
      "XX|XX|XX",
      "M2|M1 AND EX:10>"+choice+"|M2"
    ];
    name = choice+"_bomb";
    element.cooldown = defaultCooldown;
  }
  else if (behavior == "POWDER" || behavior == "AGPOWDER" || behavior == "SUPPORTPOWDER" || behavior == "STURDYPOWDER" || behavior == "SUPPORT" || behavior == "LIGHTWEIGHT") {
    element.state = "solid";
    element.category = "powders";
    if (modulateValue(5) < 0.2) {
      element.category = "land";
      eLists.SOIL.push(name);
      eLists.CRAWLTHRU.push(name);
    }
  }
  else if (behavior == "WALL") {
    element.state = "solid";
    element.category = "solids";
    element.movable = false;
  }
  else {
    element.state = modulateChoose(["solid","liquid","gas"], 5);
    element.category = "special";
  }

  if (behaviors[behavior]) behavior = behaviors[behavior];
  element.behavior = behavior;
  

  let functions = [];
  if (modulateValue(20) < 0.15) {
    let releases = modulateChoose(modulatorChoices.releases, 30);
    functions.push(function(pixel) {
      if (Math.random() < 0.05) releaseElement(pixel, releases);
    })
  }
  if (modulateValue(21) < 0.15) {
    let deletes = modulateChoose(["solid","liquid","gas"], 31);
    functions.push(function(pixel) {
      for (var i = 0; i < adjacentCoords.length; i++) {
        var x = pixel.x+adjacentCoords[i][0];
        var y = pixel.y+adjacentCoords[i][1];
        if (!isEmpty(x,y,true)) {
          let pixel2 = pixelMap[x][y];
          if (Math.random() < 0.1 && (deletes === true || elements[pixel2.element].state === deletes)) {
            deletePixel(pixel2.x,pixel2.y);
            if (deletes === true) { deletePixel(pixel.x,pixel.y); return; }
          }
        }
      }
    })
  }

  element.tick = function(pixel) {
    functions.forEach((fn) => {
      fn(pixel);
    })
  }

  element.density = modulateRange(0,100000,50)/100;

  if (element.category !== "energy") {
    if (!element.stateHigh && (element.state === "solid" || element.state === "liquid")) {
      element.tempHigh = modulateRange(25,200000,51)/100;
    }
    if (!element.stateLow && (element.state === "liquid" || element.state === "gas")) {
      element.tempLow = modulateRange(-27315,15,52)/100;
    }
  }

  element.reactions = {};
  let reactChoices = randomChoices.filter((key) => elements[key].category !== "states");
  for (let i = 0; i < 10; i++) {
    let key = modulateChoose(reactChoices, 60+i);
    let v = modulateValue(60+1);
    element.reactions[key] = {
      elem1: v < 0.25 ? null : modulateChoose(reactChoices, 20+i),
      elem2: v < 0.25 ? null : modulateChoose(reactChoices, 30+i),
      chance: 0.05
    }
  }

  if (modulateValue(70) < 0.25) {
    element.burn = modulateRange(1,100,71);
    element.burnInto = modulateChoose(modulatorChoices.burnInto, 72);
    element.burnTime = modulateRange(1,1000,73);
    let h = modulateValue(74);
    let s = modulateValue(75);
    let l = Math.max(0.1,modulateValue(76));
    element.fireColor = RGBToHex(HSLtoRGB([h,s,l]));
  }

  if (modulateValue(77) < 0.2) {
    element.emit = true;
    let h = modulateValue(78);
    let s = modulateValue(79);
    let l = Math.max(0.1,modulateValue(80));
    element.emitColor = RGBToHex(HSLtoRGB([h,s,l]));
  }

  if (modulateValue(81) < 0.25) {
    element.conduct = modulateRange(1,100,82)/100;
  }

  element.grain = modulateRange(1,5,83);

  addElement(name,element);
  selectCategory(element.category);
  selectElement(name);
  logMessage("Modulation completed... Unlocked "+name.toUpperCase());
  currentModulatorPos = null;
  return element;
}