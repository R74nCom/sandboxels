let jmax = 2
let jmin = -2
let offsetx = 0
let offsety = 0
let mode = `mandelbrot`
preCalculatedGrid = []
runEveryTick(function(){
    preCalculatedGrid = []
    for (let x = 0; x < pixelMap.length; x++){
        preCalculatedGrid.push([])
        for (let y = 0; y < pixelMap[x].length; y++){
            preCalculatedGrid[x].push({
                x: x,
                y: y,
                iteration: 100,
            })
        }
    }
    for (let ix = 0; ix < preCalculatedGrid.length; ix++){
        for (let iy = 0; iy < preCalculatedGrid[ix].length; iy++){
            const range = jmax - jmin;
            const scale = range / Math.min(width, height);
            let x = (ix - width / 2) * scale + offsetx;
            let y = (iy - height / 2) * scale + offsety;
            let iteration = 0;
            if (mode == `mandelbrot`){
            let zx = 0;
            let zy = 0;
            let c = {x: x, y: y};
            while (zx * zx + zy * zy < 4 && iteration < 100) {
                let xtemp = zx * zx - zy * zy + c.x;
                zy = 2 * zx * zy + c.y;
                zx = xtemp;
                iteration++;
            }}
            else { // burning ship
                let zx = 0;
                let zy = 0;
                let c = {x: x, y: y};
                while (zx * zx + zy * zy < 4 && iteration < 100) {
                    let xtemp = zx * zx - zy * zy + c.x;
                    zy = Math.abs(2 * zx * zy) + c.y;
                    zx = Math.abs(xtemp);
                    iteration++;
                }
            }
            preCalculatedGrid[ix][iy].iteration = iteration
        }
    }
})
elements.mandelbrot = {
    color: "#000000",
    behavior: behaviors.WALL,
    category: "mandelbrot tools",
    onSelect: function(){
        jmax = parseFloat(prompt("How far would you like it to extend in each direction?"))||2
        jmin = -jmax
        offsetx = parseFloat(prompt("How far would you like it to be offset in the x direction?"))||0
        offsety = parseFloat(prompt("How far would you like it to be offset in the y direction?"))||0
        mode = prompt("Mandelbrot or burning ship?")
    },
    tick: function(pixel){
        // first, map canvas coord to a range of -2 to 2, but dont scale it, using width, height, and pixel.x and pixel.y
        /*
        const range = jmax - jmin;
        const scale = range / Math.min(width, height);
        const x = (pixel.x - width / 2) * scale + offsetx;
        const y = -(pixel.y - height / 2) * scale + offsety;
        let iteration = 0;
            if (mode == `mandelbrot`){
            let zx = 0;
            let zy = 0;
            let c = {x: x, y: y};
            while (zx * zx + zy * zy < 4 && iteration < 100) {
                let xtemp = zx * zx - zy * zy + c.x;
                zy = 2 * zx * zy + c.y;
                zx = xtemp;
                iteration++;
            }}
            else { // burning ship
                let zx = 0;
                let zy = 0;
                let c = {x: x, y: y};
                while (zx * zx + zy * zy < 4 && iteration < 100) {
                    let xtemp = zx * zx - zy * zy + c.x;
                    zy = Math.abs(2 * zx * zy) + c.y;
                    zx = Math.abs(xtemp);
                    iteration++;
                }
            }
                */
            iteration = preCalculatedGrid[pixel.x][pixel.y].iteration
            if (iteration >= 99.5) {
                pixel.color = "rgb(255, 255, 255)"
            } else {
                pixel.color = `rgb(0, ${67.3684*Math.pow(1.01578, iteration)-67.3684}, ${67.3684*Math.pow(1.01578, iteration)-67.3684})`
                //console.log(iteration)
            }
    }
}
elements.mandelbrot_zoom_in = {
    color: elements.heater.color,
    category: "mandelbrot tools",
    canPlace: false,
    tool: function(){},
    onSelect: function(){
        jmax *= 0.95
        jmin = -jmax
    }
}
elements.mandelbrot_zoom_out = {
    color: elements.cooler.color,
    category: "mandelbrot tools",
    canPlace: false,
    tool: function(){},
    onSelect: function(){
        jmax *= 1.05
        jmin = -jmax
    }
}
elements.mandelbrot_move_left = {
    color: elements.grape.color,
    category: "mandelbrot tools",
    canPlace: false,
    tool: function(){},
    onSelect: function(){
        offsetx -= 0.05*jmax
    }
}
elements.mandelbrot_move_right = {
    color: elements.tomato.color,
    category: "mandelbrot tools",
    canPlace: false,
    tool: function(){},
    onSelect: function(){
        offsetx += 0.05*jmax
    }
}
elements.mandelbrot_move_up = {
    color: elements.mix.color,
    category: "mandelbrot tools",
    canPlace: false,
    tool: function(){},
    onSelect: function(){
        offsety += 0.05*jmax
    }
}
elements.mandelbrot_move_down = {
    color: elements.drag.color,
    category: "mandelbrot tools",
    canPlace: false,
    tool: function(){},
    onSelect: function(){
        offsety -= 0.05*jmax
    }
}