;(function(){

if(!window.__sandboxelsTutorialShown) {

    window.__sandboxelsTutorialShown = true;

    setTimeout(function(){

        alert(
            "SANDBOXELS COMPUTER TUTORIAL\n\n" +

            "1) Place a CPU first\n" +
            "- It will ask for JavaScript code\n" +
            "- You can paste code or cancel\n\n" +

            "2) Place a GPU next to the CPU\n\n" +

            "3) Place a SCREEN to the RIGHT of the CPU\n\n" +

            "4) Power the CPU using electricity or a battery\n\n" +

            "5) The CPU runs code and draws to the screen\n\n" +

            "6) If the program crashes, screen turns red\n\n" +

            "TIPS:\n" +
            "- Pause before replacing CPUs to avoid double prompts\n" +
            "- computer_led pixels form the screen\n" +
            "- Use 'interactable' in CPU code for input\n"
        );

    }, 1500);
}

function rgb(r,g,b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

// INPUT

window.__sandboxelsKey = null;

window.addEventListener("keydown", function(e){
    window.__sandboxelsKey = e.key;
});

window.addEventListener("keyup", function(){
    window.__sandboxelsKey = null;
});

// LED

elements.computer_led = {
    color: "#000000",
    category: "machines",
    state: "solid",
    conduct: 1,

    properties: {
        displayColor: "#000000"
    },

    tick: function(pixel) {
        pixel.color = pixel.displayColor;
    }
};

// SCREEN

elements.computer_screen = {
    color: "#222222",
    category: "machines",
    state: "solid",
    conduct: 1,

    properties: {
        initialized: false,
        screenWidth: 32,
        screenHeight: 18,
        leds: null
    },

    tick: function(pixel) {

        if(pixel.initialized) return;

        pixel.initialized = true;
        pixel.leds = [];

        for(let y=0;y<pixel.screenHeight;y++) {
            for(let x=0;x<pixel.screenWidth;x++) {

                let px = pixel.x + x;
                let py = pixel.y + y;

                if(outOfBounds(px,py)) continue;

                if(isEmpty(px,py)) {
                    createPixel("computer_led",px,py);
                }

                let led = pixelMap[px][py];

                if(led && led.element === "computer_led") {
                    pixel.leds.push(led);
                }
            }
        }
    }
};

// GPU

elements.computer_gpu = {
    color: "#22aa44",
    category: "machines",
    state: "solid",
    conduct: 1,

    properties: {
        initialized: false,
        vram: null
    },

    tick: function(pixel) {
        if(pixel.initialized) return;
        pixel.initialized = true;
        pixel.vram = {};
    }
};

// CPU

elements.computer_cpu = {
    color: "#666666",
    category: "machines",
    state: "solid",
    conduct: 1,

    properties: {
        initialized: false,
        code: "gpu.clear(rgb(0,0,20));",
        compiled: null,
        lastCode: "",
        memory: {},
        clock: 0,
        speed: 4
    },

    tick: function(pixel) {

        if(!pixel.initialized) {
            pixel.initialized = true;
            setTimeout(function(){ editCPU(pixel); },100);
        }

        if(!pixel.charge) return;

        pixel.clock++;
        if(pixel.clock % pixel.speed !== 0) return;

        let gpuChip = findNearby(pixel,"computer_gpu");
        let screen = findNearby(pixel,"computer_screen");

        if(!gpuChip || !screen) {
            pixel.color = "#aa0000";
            return;
        }

        compileCPU(pixel);
        if(!pixel.compiled) return;

        let gpu = createGPU(screen);

        let interactable = {
            mouseX: mousePos ? mousePos.x - screen.x : 0,
            mouseY: mousePos ? mousePos.y - screen.y : 0,
            clicking: mouseIsDown || false,
            key: window.__sandboxelsKey || null,
            inside: function(x,y,w,h){
                return this.mouseX>=x && this.mouseY>=y && this.mouseX<x+w && this.mouseY<y+h;
            }
        };

        try {
            pixel.compiled(gpu,screen.screenWidth,screen.screenHeight,pixel.memory,rgb,interactable);
            pixel.color = "#666666";
        } catch(e) {
            pixel.color = "#ff0000";
        }
    },

    onSelect: function(pixel) {
        editCPU(pixel);
    }
};

// EDITOR

function editCPU(cpu) {
    let code = prompt("Enter JavaScript code", cpu.code);
    if(code === null) return;
    cpu.code = code;
    compileCPU(cpu);
}

function compileCPU(cpu) {
    if(cpu.code === cpu.lastCode) return;

    try {
        cpu.compiled = new Function("gpu","screenWidth","screenHeight","memory","rgb","interactable",cpu.code);
        cpu.lastCode = cpu.code;
    } catch(e) {
        cpu.compiled = null;
    }
}

// FINDER

function findNearby(pixel,name){
    for(let dy=-8;dy<=8;dy++){
        for(let dx=-8;dx<=8;dx++){
            let x=pixel.x+dx,y=pixel.y+dy;
            if(outOfBounds(x,y)) continue;
            let p=pixelMap[x][y];
            if(p&&p.element===name) return p;
        }
    }
    return null;
}

// GPU API

function createGPU(screen){

    function setPixel(x,y,color){
        x=Math.floor(x);y=Math.floor(y);
        if(x<0||y<0||x>=screen.screenWidth||y>=screen.screenHeight) return;
        let i=y*screen.screenWidth+x;
        let led=screen.leds[i];
        if(led) led.displayColor=color;
    }

    return {
        pixel:(x,y,c)=>setPixel(x,y,c),
        clear:(c)=>screen.leds.forEach(l=>l&&(l.displayColor=c)),
        rect:(x1,y1,x2,y2,c)=>{
            for(let y=y1;y<=y2;y++)
                for(let x=x1;x<=x2;x++)
                    setPixel(x,y,c);
        }
    };
}

})();
