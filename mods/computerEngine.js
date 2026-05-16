;(function(){

if(typeof elements === "undefined") return;

if(!window.__advInputs){

window.__advInputs = true;

window.__sandboxKey = null;
window.__sandboxKeys = {};

window.addEventListener("keydown",e=>{
window.__sandboxKey = e.key;
window.__sandboxKeys[e.key] = true;
});

window.addEventListener("keyup",e=>{
delete window.__sandboxKeys[e.key];

if(window.__sandboxKey === e.key){
window.__sandboxKey = null;
}
});

}

// Tutorial

if(!window.__advComputerTutorial){

window.__advComputerTutorial = true;

setTimeout(()=>{

alert(
`ADV COMPUTER MOD

HOW TO USE

1. Place COMPUTER_CPU

2. Place COMPUTER_GPU nearby

3. Place COMPUTER_SCREEN
to the RIGHT of CPU

4. Power the CPU

SCREEN SIZE:
Bigger screens support
bigger programs.

If the program is too big,
the computer crashes.

It is recommended to pause before placing the CPU or the Screen, as sometimes if you use your mouse to click "OK" it will detect it as a press and drag and place a
bunch of the element along that path, this can be prevented by pressing enter instead of using your mouse, and then making sure you dont have replace on before dragging your mouse onto the screen,
clicking to make sure, and then you can continue.

Select CPU again
to edit code.`
);

},1000);

}

// Utils

function rgb(r,g,b){
return `rgb(${r},${g},${b})`;
}

function clamp(v,min,max){
return Math.max(min,Math.min(max,v));
}

function rand(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}

// LED

elements.computer_led = {

color:"#000000",
category:"machines",
state:"solid",
conduct:1,

properties:{
displayColor:"#000000"
},

tick(pixel){
pixel.color = pixel.displayColor;
}

};

// Screen

elements.computer_screen = {

color:"#222222",
category:"machines",
state:"solid",
conduct:1,

properties:{
initialized:false,
screenWidth:32,
screenHeight:18,
leds:null,
maxProgramSize:900,
corrupted:false,
noiseLevel:0
},

tick(pixel){

if(pixel.initialized) return;

pixel.initialized = true;

let w = parseInt(prompt("Screen width","32")) || 32;
let h = parseInt(prompt("Screen height","18")) || 18;

w = clamp(w,4,96);
h = clamp(h,4,64);

pixel.screenWidth = w;
pixel.screenHeight = h;

pixel.maxProgramSize = w*h;

pixel.leds = [];

for(let y=0;y<h;y++){

for(let x=0;x<w;x++){

let px = pixel.x + x;
let py = pixel.y + y;

if(outOfBounds(px,py)) continue;

if(isEmpty(px,py,true)){
createPixel("computer_led",px,py);
}

let led =
!outOfBounds(px,py)
? pixelMap[px][py]
: null;

if(led && led.element === "computer_led"){
pixel.leds.push(led);
}

}

}

}

};

// GPU

elements.computer_gpu = {

color:"#22aa55",
category:"machines",
state:"solid",
conduct:1,

properties:{
initialized:false,
temp:20
},

tick(pixel){

if(!pixel.initialized){
pixel.initialized = true;
}

pixel.temp *= 0.99;

}

};

// CPU

elements.computer_cpu = {

color:"#666666",
category:"machines",
state:"solid",
conduct:1,

properties:{
initialized:false,
code:"",
compiled:null,
lastCode:"",
memory:{},
clock:0,
speed:2,
heat:20,
booted:false,
ramUsage:0,
files:{}
},

tick(pixel){

if(!pixel.initialized){

pixel.initialized = true;

setTimeout(()=>{
setupCPU(pixel);
},100);

}

if(!pixel.charge) return;

pixel.clock++;

let gpuChip = findNearby(
pixel,
"computer_gpu"
);

let screen = findNearby(
pixel,
"computer_screen"
);

if(!gpuChip || !screen){

pixel.color = "#aa0000";
return;

}

// BIOS

if(!pixel.booted){

let gpu = createGPU(screen);

gpu.clear(rgb(0,0,0));

gpu.text(
1,
1,
"BOOTING...",
rgb(0,255,0)
);

if(pixel.clock > 20){
pixel.booted = true;
}

return;

}

// Program size limit

if(pixel.code.length > screen.maxProgramSize){

blueScreen(
screen,
"PROGRAM TOO LARGE"
);

pixel.color = "#ff0000";

return;

}

compileCPU(pixel);

if(!pixel.compiled){

blueScreen(
screen,
"COMPILATION FAILED"
);

pixel.color = "#ff0000";

return;

}

let gpu = createGPU(screen);

let interactable = {

mouseX:
mousePos
? mousePos.x - screen.x
: 0,

mouseY:
mousePos
? mousePos.y - screen.y
: 0,

clicking:
mouseIsDown || false,

key:
window.__sandboxKey,

keys:
window.__sandboxKeys,

inside(x,y,w,h){

return (
this.mouseX >= x &&
this.mouseY >= y &&
this.mouseX < x+w &&
this.mouseY < y+h
);

}

};

try{

pixel.compiled(
gpu,
screen.screenWidth,
screen.screenHeight,
pixel.memory,
rgb,
interactable,
pixel.files
);

try{
pixel.ramUsage =
JSON.stringify(pixel.memory).length;
}catch{
pixel.ramUsage = 999999;
}

pixel.heat +=
0.1 +
(pixel.ramUsage/10000);

if(pixel.heat > 120){

blueScreen(
screen,
"CPU OVERHEATED"
);

pixel.color = "#ff0000";

return;

}

pixel.color = rgb(
clamp(pixel.heat*2,80,255),
100,
100
);

}catch(e){

blueScreen(
screen,
"RUNTIME ERROR"
);

screen.corrupted = true;
screen.noiseLevel = 0.05;

pixel.color = "#ff0000";

}

pixel.heat *= 0.995;

},

onSelect(pixel){

editCPU(pixel);

}

};

// CPU Setup

function setupCPU(cpu){

let starter =
`gpu.clear(rgb(0,0,30));

gpu.rect(
1,1,
15,6,
rgb(40,40,90)
);

gpu.text(
2,
2,
"HELLO",
rgb(255,255,255)
);

gpu.button(
2,
8,
10,
3,
"CLICK"
);

if(
interactable.clicking &&
interactable.inside(
2,8,10,3
)
){

gpu.clear(
rgb(
Math.random()*255,
Math.random()*255,
Math.random()*255
)
);

}

gpu.text(
1,
screenHeight-2,
"KEY:"+interactable.key,
rgb(0,255,0)
);`;

let code = prompt(
"Enter JavaScript program",
starter
);

if(code !== null){
cpu.code = code;
}

}

// Editor

function editCPU(cpu){

let code = prompt(
"Edit Program",
cpu.code
);

if(code === null) return;

cpu.code = code;

compileCPU(cpu);

}

// Compiler

function compileCPU(cpu){

if(cpu.code === cpu.lastCode) return;

try{

cpu.compiled = new Function(
"gpu",
"screenWidth",
"screenHeight",
"memory",
"rgb",
"interactable",
"files",
cpu.code
);

cpu.lastCode = cpu.code;

}catch{

cpu.compiled = null;

}

}

// Finder

function findNearby(pixel,name){

for(let dy=-10;dy<=10;dy++){

for(let dx=-10;dx<=10;dx++){

let x = pixel.x + dx;
let y = pixel.y + dy;

if(outOfBounds(x,y)) continue;

let p = pixelMap[x][y];

if(p && p.element === name){
return p;
}

}

}

return null;

}

// BSOD

function blueScreen(screen,msg){

let gpu = createGPU(screen);

gpu.clear(rgb(0,0,180));

let lines = msg.split("\n");

for(let i=0;i<lines.length;i++){

gpu.text(
1,
2+i*2,
lines[i],
rgb(255,255,255)
);

}

}

// GPU API

function createGPU(screen){

function setPixel(x,y,color){

x = Math.floor(x);
y = Math.floor(y);

if(
x < 0 ||
y < 0 ||
x >= screen.screenWidth ||
y >= screen.screenHeight
) return;

let i =
y*screen.screenWidth+x;

let led = screen.leds[i];

if(led){
led.displayColor = color;
}

}

return {

pixel(x,y,c){

setPixel(x,y,c);

},

clear(c){

screen.leds.forEach(l=>{

if(l){
l.displayColor = c;
}

});

},

rect(x1,y1,x2,y2,c){

for(let y=y1;y<=y2;y++){

for(let x=x1;x<=x2;x++){

setPixel(x,y,c);

}

}

},

button(x,y,w,h,text){

this.rect(
x,
y,
x+w,
y+h,
rgb(120,120,120)
);

this.text(
x+1,
y+1,
text,
rgb(255,255,255)
);

},

text(x,y,text,color){

for(let i=0;i<text.length;i++){

let px = x+i;

if(px >= screen.screenWidth)
break;

setPixel(px,y,color);

}

},

noise(){

screen.leds.forEach(l=>{

if(!l) return;

l.displayColor = rgb(
rand(0,255),
rand(0,255),
rand(0,255)
);

});

}

};

}

})();
