// UNFINISHED
{
let processed = 0;
let started = false;

const offsetX = 20;
const offsetY = 10;

function getAliveNeighbors(x, y) {
    let amount = 0;
    for (const i of [-1, 0, 1]) {
        for (const j of [-1, 0, 1]) {
            if (i == 0 && j == 0) continue;
            if (outOfBounds(x + i, y + j)) continue;
            const x1 = x + i;
            const y1 = y + j;
            if (pixelMap[x1][y1] && pixelMap[x1][y1].element == "alive_cell") amount++;
        }
    }
    return amount;
}

elements.alive_cell = {
    name: "Alive cell",
    color: "#000000"
}

elements.dead_cell = {
    name: "Dead cell",
    color: "#ffffff"
}

setInterval(cellTick, (1000/tps)*2);

function cellTick() {
    if (started && !paused) {
        const newStates = [];
        for (let i = offsetX; i < width - offsetX; i++) {
            for (let j = offsetY; j < height - offsetY; j++) {
                if (!pixelMap[i][j]) continue;
                const {element} = pixelMap[i][j];
                const neighbors = getAliveNeighbors(i, j);
                if (element == "alive_cell") {
                    if (neighbors < 2 || neighbors > 3) {
                        newStates.push(["dead_cell", i, j]);
                    } else {
                        newStates.push(["alive_cell", i, j]);
                    }
                } else if (element == "dead_cell") {
                    if (neighbors == 3) {
                        newStates.push(["alive_cell", i, j]);
                    } else {
                        newStates.push(["dead_cell", i, j]);
                    }
                }
            }
        }
        for (let state of newStates) {
            const {element} = pixelMap[state[1]][state[2]];
            if (element != state[0]) {
                deletePixel(state[1], state[2]);
                createPixel(state[0], state[1], state[2]);
            }
        }
    }
}

window.addEventListener("keydown", (ev) => {
    if (ev.key == "u") {
        if (!started) {
            videoFrame = 0;

            for (let i = offsetX; i < width - offsetX; i++) {
                for (let j = offsetY; j < height - offsetY; j++) {
                    if (pixelMap[i][j]) deletePixel(i, j);
                    createPixel("dead_cell", i, j);
                }
            }
        }
        started = !started;
    }
})
}