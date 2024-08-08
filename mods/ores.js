function makePerlinMap(){
    return Array.from({ length: Math.pow(12, 2) }, () => Math.random() * 2 * Math.PI);
}
function perlinNoise(C, x, y) {
    // Helper function to calculate dot product
    function dotProduct(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }

    // Function d
    function d(index) {
        return [Math.cos(C[index]), Math.sin(C[index])];
    }

    // Function f
    function f(x, y, t) {
        return x + (y - x) * (6 * t ** 5 - 15 * t ** 4 + 10 * t ** 3);
    }

    // Function g
    function g(x, y, z, w) {
        const dx = x - z;
        const dy = y - w;
        return dotProduct([dx, dy], d(z + w * 6 + 1));
    }

    // Main function h
    const x0 = Math.floor(x);
    const x1 = Math.ceil(x);
    const y0 = Math.floor(y);
    const y1 = Math.ceil(y);

    const g00 = g(x, y, x0, y0);
    const g10 = g(x, y, x1, y0);
    const g01 = g(x, y, x0, y1);
    const g11 = g(x, y, x1, y1);

    const fx = f(g00, g10, x - x0);
    const fy = f(g01, g11, x - x0);

    return Math.sqrt(2) * f(fx, fy, y - y0);
}
function getScalingFactor(d1, d2){
    return Math.min(d1, d2)/6
}
function scaledPerlinNoise(C, x, y){
    let scale = getScalingFactor(width, height)
    return perlinNoise(C, x/scale, y/scale)
}
if (!eLists.oreSpawnConditions){eLists.oreSpawnConditions = {}}
eLists.oreSpawnConditions = {...eLists.oreSpawnConditions, ...{
    uranium: 0.65,
    diamond: 0.65,
    gold: 0.55,
    silver: 0.52,
    iron: 0.45,
    copper: 0.4,
    charcoal: 0.4
}}
if (!eLists.oreRgb){eLists.oreRgb = {}}
eLists.oreRgb = {...eLists.oreRgb, ...{
    charcoal: "rgba(54, 54, 54, ",
    iron: "rgba(247, 218, 157, ",
    silver: "rgba(206, 206, 206, ",
    copper: "rgba(151, 80, 10, ",
    gold: "rgba(255, 215, 0, ",
    diamond: "rgba(125, 214, 255, ",
    uranium: "rgba(0, 100, 8, "
}}
let oldclearall = clearAll
let oreMap = []
clearAll = function(skipworldgen){
    oldclearall(skipworldgen)
    oreMaps = {}
    for (let ore of Object.keys(eLists.oreSpawnConditions)){
        oreMaps[ore] = makePerlinMap()
    }
     //console.log(oreMaps)
    for (let x in pixelMap){
        oreMap.push([]);
        for (let y in pixelMap){
            oreMap[x].push(false);
            for (let ore in eLists.oreSpawnConditions){
                if (scaledPerlinNoise(oreMaps[ore], x, y) > eLists.oreSpawnConditions[ore]){
                    oreMap[x][y] = ore
                    //console.log(ore + " at " + x + ", " + y)
                    break;
                }
            }
        }
    }
}

adjacentToCanvas = function(x, y, px, py){
    if (x == 0 && y == -1){
        return [[canvasCoord(px), canvasCoord(py)], [canvasCoord(px)+pixelSize, canvasCoord(py)]]
    }
    if (x == 0 && y == 1){
        return [[canvasCoord(px), canvasCoord(py)+pixelSize], [canvasCoord(px)+pixelSize, canvasCoord(py)+pixelSize]]
    }
    if (x == -1 && y == 0){
        return [[canvasCoord(px), canvasCoord(py)], [canvasCoord(px), canvasCoord(py)+pixelSize]]
    }
    if (x == 1 && y == 0){
        return [[canvasCoord(px)+pixelSize, canvasCoord(py)], [canvasCoord(px)+pixelSize, canvasCoord(py)+pixelSize]]
    }
}
renderEachPixel(function(pixel, ctx) {
    if (currentElement == "ore_xray") {
        if (Math.abs(pixel.x - mousePos.x) <= mouseSize/2 && Math.abs(pixel.y - mousePos.y) <= mouseSize/2) {
            if (!oreMap[pixel.x][pixel.y]) {
                drawSquare(ctx, "rgba(0, 0, 0, 0.7)", pixel.x, pixel.y, 1, 1);
            } else {
                drawSquare(ctx, eLists.oreRgb[oreMap[pixel.x][pixel.y]] + "0.2)", pixel.x, pixel.y, 1, 1);
                let differentAdjacent = [];
                for (let i = 0; i < adjacentCoords.length; i++) {
                    let x = adjacentCoords[i][0] + pixel.x;
                    let y = adjacentCoords[i][1] + pixel.y;
                    if (isEmpty(x, y, true)) {
                        differentAdjacent.push(adjacentCoords[i]);
                    } else {
                        let otherPixel = pixelMap[x][y];
                        if (oreMap[x][y] != oreMap[pixel.x][pixel.y] && (oreMap[x][y] == false || eLists.oreSpawnConditions[oreMap[pixel.x][pixel.y]] >= eLists.oreSpawnConditions[oreMap[x][y]])) {
                            differentAdjacent.push(adjacentCoords[i]);
                        }
                    }
                }
                differentAdjacent.forEach(adj => {
                    let canvasadjacentCoords = adjacentToCanvas(adj[0], adj[1], pixel.x, pixel.y);
                    if (!canvasadjacentCoords){
                        console.log(adj)
                        return;
                    }
                    //console.log(canvasadjacentCoords);
                    ctx.beginPath();
                    ctx.moveTo(canvasadjacentCoords[0][0], canvasadjacentCoords[0][1]);
                    ctx.lineTo(canvasadjacentCoords[1][0], canvasadjacentCoords[1][1]);
                    ctx.strokeStyle = eLists.oreRgb[oreMap[pixel.x][pixel.y]]+"1)";
                    ctx.lineWidth = 4;
                    ctx.stroke();
                    //console.log("line")
                });
            }
        }
    }
    if (oreMap.length < 2){
        clearAll();
    }
});

let validGroundElements = []
for (let elementi in elements){
    if (elements[elementi].category == "land"){
        validGroundElements.push(elementi)
    }
}
elements.pickaxe = {
    category: "tools",
    color: "#b0b0b0",
    canPlace: false,
    maxSize: 5,
    tool: function(pixel){
        if (oreMap[pixel.x][pixel.y].length > 0 && validGroundElements.includes(pixel.element)){
            if (Math.random()>0.95){
                changePixel(pixel, oreMap[pixel.x][pixel.y], false)
                oreMap[pixel.x][pixel.y] = false
            }
            else if (Math.random() > 0.9){
                deletePixel(pixel.x, pixel.y)
                oreMap[pixel.x][pixel.y] = false
            }
        }
    }
}
elements.chisel = {
    category: "tools",
    color: "#8d8574",
    canPlace: false,
    maxSize: 3,
    tool: function(pixel){
        if (oreMap[pixel.x][pixel.y].length > 0 && validGroundElements.includes(pixel.element)){
            if (Math.random()>0.95){
                changePixel(pixel, oreMap[pixel.x][pixel.y], false)
                oreMap[pixel.x][pixel.y] = false
            }
            else if (Math.random() > 0.98){
                deletePixel(pixel.x, pixel.y)
                oreMap[pixel.x][pixel.y] = false
            }
        }
    }
}
elements.ore_xray = {
    category: "tools",
    color: "#220f27",
    canPlace: false,
    maxSize: 15,
    tool: function(pixel){}
}