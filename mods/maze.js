{
const inBounds = (x, y, width, height) => x >= 0 && x < width && y >= 0 && y < height;

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min) + min);

const generateMaze = (w, h, originX, originY) => {
    const map = [];
    for (let i = 0; i < w; i++) {
        map[i] = [];
        for (let j = 0; j < w; j++) {
            map[i][j] = 0;
        }
    }
    
    const stack = [];
    let current = [];

    const start = [w - 2, h - 2];
    
    stack.push(start);
    current = start;

    while (stack.length > 0) {
        const [x, y] = current;
        const neighbors = [
            inBounds(x, y + 2, w, h) ? [x, y + 2,  0,  1] : null,
            inBounds(x, y - 2, w, h) ? [x, y - 2,  0, -1] : null,
            inBounds(x + 2, y, w, h) ? [x + 2, y,  1,  0] : null,
            inBounds(x - 2, y, w, h) ? [x - 2, y, -1,  0] : null
        ].filter(a => a != null && map[a[0]][a[1]] == 0);

        if (neighbors.length == 0) {
            const cell = stack.pop();
            current = cell;
            continue;
        }

        const next = neighbors[getRandomValue(0, neighbors.length)];

        const [offsetX, offsetY] = next.slice(2);

        map[x + offsetX][y + offsetY] = 1;
        map[x + offsetX * 2][y + offsetY * 2] = 1;

        stack.push([x, y]);

        current = [next[0], next[1]];
    }

    for (let i = 0; i <= w; i++) {
        for (let j = 0; j <= h; j++) {
            const x = i + originX;
            const y = j + originY;
            if (pixelMap[x][y]) deletePixel(x, y);
            if (i == 0 || j == 0) createPixel("wall", x, y);
            else if (map[i - 1][j - 1] == 0) createPixel("wall", x, y);
            if ((i == 1 && j == 0) || (i == w - 1 && j == h)) deletePixel(x, y);
        }
    }
}

elements.maze = {
    color: "#760144",
    category: "special",
    tool: (_) => {},
    onMouseDown: () => {
        if (outOfBounds(Math.floor(mousePos.x - mouseSize / 2) + 1, Math.floor(mousePos.y - mouseSize / 2) + 1) || outOfBounds(Math.floor(mousePos.x - mouseSize / 2) + mouseSize, Math.floor(mousePos.y - mouseSize / 2) + mouseSize)) return;
        generateMaze(mouseSize - 1, mouseSize - 1, Math.floor(mousePos.x - mouseSize / 2) + 1, Math.floor(mousePos.y - mouseSize / 2) + 1)
    }
}

runAfterLoadList.push(() => {
    if (!enabledMods.includes("mods/editTools.js")) {
        document.addEventListener("mousedown", (ev) => {
            if (elements[currentElement].onMouseDown) {
                elements[currentElement].onMouseDown();
            }
        })
    }
})
}