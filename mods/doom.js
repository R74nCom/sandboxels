elements.screen = {
    name: "Screen",
    color: "#000000",
    hidden: true
}
elements.doom = {
    color: "#000000",
    onSelect: function() {
        startDoom()
    }
}

let running = false;

const offsetX = 0;
const offsetY = 0;
const screenWidth = 166 - (2 * offsetX);
const screenHeight = 82 - (2 * offsetY);
const halfHeight = screenHeight / 2 + offsetY;

const fov = 50;
const halfFov = fov / 2;

const showDebugText = true;

const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,2,2,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,3,0,0,0,3,0,0,0,1],
    [1,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,2,2,0,2,2,0,0,0,0,3,0,3,0,3,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,0,0,0,0,5,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,0,4,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,0,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const colors = ["#ff0000", "#0000ff", "#ffffff", "#808080", "#ff5000"];

const defaults = {
    x: 2,
    y: 2,
    angle: 90
}

const colorSettings = {
    floor: "#cccccc",
    ceiling: "#1e1e1e",
}

const mapHeight = map.length;
const mapWidth = map[0].length;
const minimapOffset = 5;

const speed = {
    movementSpeed: 0.5,
    rotationalSpeed: 5,
    verticalRotationalSpeed: 5,
}

const planeX = 0;
const planeY = 0.66;

const inc = fov / screenWidth;
const precision_ = 64;
const maxDist = 25;
const accuracy = 1;


// const colorSettings = {
//     floor: "#d1bd62",
//     ceiling: "#f0c743"
// }

const degToRad = (deg) => deg * (Math.PI / 180);
const radToDeg = (rad) => rad * (180 / Math.PI);
const splitHex = (hex) => hex.slice(1).match(/../g).map(a => Math.floor(parseInt(a, 16)));
const hexify = (rgb) => rgb.map(a => Math.floor(a).toString(16).padStart(2, "0")).join("");
function colorLerp(color_, color2_, t) {
    const color = splitHex(color_);
    const color2 = splitHex(color2_);
    const r = (1 - t) * color[0] + t * color2[0];
    const g = (1 - t) * color[1] + t * color2[1];
    const b = (1 - t) * color[2] + t * color2[2];
    return hexify([r, g, b]);
}

function clamp(x, min, max) {
    return Math.max(min, Math.min(x, max));
}

class Player {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.verticalOffset = 0;
    }

    update(key) {
        // if (key.keyCode == 37) { // left
        if (key.key == "a") {
            this.angle -= speed.rotationalSpeed;
        // } else if (key.keyCode == 39) { // right
        } else if (key.key == "d") {
            this.angle += speed.rotationalSpeed;
        } else if (key.key == "b") { // up
            this.verticalOffset = clamp(this.verticalOffset + 5, -45, 45);
        } else if (key.key == "n") { // down
            this.verticalOffset = clamp(this.verticalOffset - 5, -45, 45);
        }
        if (key.key == "w") {
            console.log(this.angle);
            const playerCos = Math.cos(degToRad(this.angle)) * speed.movementSpeed;
            const playerSin = Math.sin(degToRad(this.angle)) * speed.movementSpeed;
            const newX = this.x + playerCos;
            const newY = this.y + playerSin;
            const oldX = this.x;
            const oldY = this.y;
            if (map[Math.floor(newY)][Math.floor(oldX)] == 0) {
                this.y = newY;
            }
            if (map[Math.floor(oldY)][Math.floor(newX)] == 0) {
                this.x = newX;
            }
        } else if (key.key == "s") {
            const playerCos = Math.cos(degToRad(this.angle)) * speed.movementSpeed;
            const playerSin = Math.sin(degToRad(this.angle)) * speed.movementSpeed;
            const newX = this.x - playerCos;
            const newY = this.y - playerSin;
            const oldX = this.x;
            const oldY = this.y;
            if (map[Math.floor(newY)][Math.floor(oldX)] == 0) {
                this.y = newY;
            }
            if (map[Math.floor(oldY)][Math.floor(newX)] == 0) {
                this.x = newX;
            }
        } else if (key.key == "a" && shiftDown) {
            const playerCos = Math.cos(degToRad(this.angle + 90)) * speed.movementSpeed;
            const playerSin = Math.sin(degToRad(this.angle + 90)) * speed.movementSpeed;
            const newX = this.x - playerCos;
            const newY = this.y - playerSin;
            const oldX = this.x;
            const oldY = this.y;
            if (map[Math.floor(newY)][Math.floor(oldX)] == 0) {
                this.y = newY;
            }
            if (map[Math.floor(oldY)][Math.floor(newX)] == 0) {
                this.x = newX;
            }
        } else if (key.key == "d" && shiftDown) {
            const playerCos = Math.cos(degToRad(this.angle - 90)) * speed.movementSpeed;
            const playerSin = Math.sin(degToRad(this.angle - 90)) * speed.movementSpeed;
            const newX = this.x - playerCos;
            const newY = this.y - playerSin;
            const oldX = this.x;
            const oldY = this.y;
            if (map[Math.floor(newY)][Math.floor(oldX)] == 0) {
                this.y = newY;
            }
            if (map[Math.floor(oldY)][Math.floor(newX)] == 0) {
                this.x = newX;
            }
        }
    }
}

const player = new Player(defaults.x, defaults.y, defaults.angle);

// 5x5
const font = {
    a: [
        0, 1, 1, 1, 0,
        0, 0, 0, 0, 1,
        0, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        0, 1, 1, 1, 1
    ],
    b: [
        1, 1, 1, 1, 0,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 0,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 0
    ],
    c: [
        0, 1, 1, 1, 1,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        0, 1, 1, 1, 1
    ],
    d: [
        1, 1, 1, 1, 0,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 0
    ],
    e: [
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 0,
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 0,
        1, 1, 1, 1, 1
    ],
    f: [
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 0,
        1, 1, 1, 1, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0
    ],
    g: [
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 0,
        1, 0, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1
    ],
    h: [
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1
    ],
    i: [
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0
    ],
    j: [
        0, 0, 0, 0, 1,
        0, 0, 0, 0, 1,
        0, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        0, 1, 1, 1, 0
    ],
    k: [
        1, 0, 0, 1, 0,
        1, 0, 0, 1, 0,
        1, 1, 1, 0, 0,
        1, 0, 0, 1, 0,
        1, 0, 0, 1, 0
    ],
    l: [
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 1, 1, 1, 0
    ],
    m: [
        1, 1, 1, 1, 0,
        1, 0, 1, 0, 1,
        1, 0, 1, 0, 1,
        1, 0, 1, 0, 1,
        1, 0, 1, 0, 1
    ],
    n: [
        1, 1, 1, 1, 0,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1
    ],
    o: [
        0, 1, 1, 1, 0,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        0, 1, 1, 1, 0
    ],
    p: [
        1, 1, 1, 1, 0,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0
    ],
    q: [
        0, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        0, 1, 1, 1, 1,
        0, 0, 0, 0, 1,
        0, 0, 0, 0, 1
    ],
    r: [
        1, 0, 1, 1, 1,
        1, 1, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0
    ],
    s: [
        0, 1, 1, 1, 1,
        1, 0, 0, 0, 0,
        0, 1, 1, 1, 0,
        0, 0, 0, 0, 1,
        1, 1, 1, 1, 0
    ],
    t: [
        1, 1, 1, 1, 1,
        0, 0, 1, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 1, 0, 0
    ],
    u: [
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1
    ],
    v: [
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        0, 1, 0, 1, 0,
        0, 1, 0, 1, 0,
        0, 0, 1, 0, 0
    ],
    w: [
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 0, 1, 0, 1,
        1, 0, 1, 0, 1,
        0, 1, 0, 1, 0
    ],
    x: [
        1, 0, 0, 0, 1,
        0, 1, 0, 1, 0,
        0, 0, 1, 0, 0,
        0, 1, 0, 1, 0,
        1, 0, 0, 0, 1
    ],
    y: [
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        0, 1, 0, 1, 0,
        0, 0, 1, 0, 0,
        0, 0, 1, 0, 0
    ],
    z: [
        1, 1, 1, 1, 0,
        0, 0, 0, 1, 0,
        0, 1, 1, 0, 0,
        1, 0, 0, 0, 0,
        1, 1, 1, 1, 0
    ],
    "0": [
        1, 1, 1, 1, 0,
        1, 0, 0, 1, 0,
        1, 0, 0, 1, 0,
        1, 0, 0, 1, 0,
        1, 1, 1, 1, 0
    ],
    "1": [
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0
    ],
    "2": [
        1, 1, 1, 1, 1,
        0, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 0,
        1, 1, 1, 1, 1
    ],
    "3": [
        1, 1, 1, 1, 1,
        0, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
        0, 0, 0, 0, 1,
        1, 1, 1, 1, 1
    ],
    "4": [
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
        0, 0, 0, 0, 1,
        0, 0, 0, 0, 1
    ],
    "5": [
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 0,
        1, 1, 1, 1, 1,
        0, 0, 0, 0, 1,
        1, 1, 1, 1, 1
    ],
    "6": [
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 0,
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1
    ],
    "7": [
        1, 1, 1, 1, 1,
        0, 0, 0, 0, 1,
        0, 0, 0, 0, 1,
        0, 0, 0, 0, 1,
        0, 0, 0, 0, 1
    ],
    "8": [
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1
    ],
    "9": [
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
        0, 0, 0, 0, 1,
        1, 1, 1, 1, 1
    ],
    ".": [
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 0, 0, 0, 0
    ],
    ":": [
        0, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        0, 0, 0, 0, 0
    ],
    "-": [
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 1, 1, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0
    ],
    "+": [
        0, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        1, 1, 1, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 0, 0, 0,
    ],
    ",": [
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
    ],
    "[": [
        1, 1, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 1, 0, 0, 0
    ],
    "]": [
        1, 1, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 1, 0, 0, 0,
        1, 1, 0, 0, 0
    ],
    "(": [
        0, 1, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0
    ],
    ")": [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 1, 0, 0, 0,
        1, 0, 0, 0, 0
    ],
    ";": [
        0, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0
    ],
    "!": [
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 0, 0, 0, 0
    ],
    "{": [
        0, 1, 1, 0, 0,
        0, 1, 0, 0, 0,
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 1, 1, 0, 0
    ],
    "}": [
        1, 1, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 1, 0, 0, 0,
        1, 1, 0, 0, 0
    ],
    "_": [
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 1, 1, 0, 0
    ],
    "°": [
        1, 1, 1, 0, 0,
        1, 0, 1, 0, 0,
        1, 1, 1, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0
    ],
    "|": [
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0,
        1, 0, 0, 0, 0
    ]
}

const customWidth = {
    i: 1,
    l: 4,
    z: 4,
    "0": 4,
    "1": 1,
    ".": 1,
    ":": 1,
    "-": 3,
    "+": 3,
    ",": 1,
    "[": 2,
    "]": 2,
    "(": 2,
    ")": 2,
    ";": 1,
    "!": 1,
    "{": 3,
    "}": 3,
    "_": 3,
    "°": 3,
    " ": 3,
    "|": 1,
}

class TextRenderer {
    static getCharWidth(char) {
        return customWidth[char] ?? 5;
    }

    static drawChar(char, x, y, color) {
        if (!font[char]) return;
        const width = this.getCharWidth();
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < 5; j++) {
                if (font[char][j * 5 + i] == 1) {
                    pixelMap[x + offsetX + i][y + offsetY + j].color = color;
                }
            }
        }
    }

    static drawText(text, x, y, color) {
        let offset = 0;
        for (const char of text.toLowerCase().split("")) {
            const width = this.getCharWidth(char);
            this.drawChar(char, x + offset, y, color);
            offset += width + 1;
        }
    }

    static getStringWidth(text) {
        return text.split("").map(a => this.getCharWidth(a)).reduce((a, b) => a + b, 0) + text.length - 1;
    }

    static drawCenteredText(text, x1, y, color) {
        const x = Math.floor(x1 - (this.getStringWidth(text) / 2));
        this.drawText(text, x, y, color);
    }
}

class ButtonRegistry {
    constructor (screen, buttons) {
        this.screen = screen;
        this.buttons = buttons;
        this.currentButton = 0;
        if (this.buttons.length > 0) {
            this.buttons[this.currentButton].toggleSelection();
        }
    }

    next() {
        this.buttons[this.currentButton].toggleSelection();
        this.currentButton++;
        if (this.currentButton >= this.buttons.length) {
            this.currentButton %= this.buttons.length;
        }
        this.buttons[this.currentButton].toggleSelection();
    }

    prev() {
        this.buttons[this.currentButton].toggleSelection();
        this.currentButton--;
        if (this.currentButton < 0) {
            this.currentButton = this.buttons.length - 1;
        }
        this.buttons[this.currentButton].toggleSelection();
    }

    current() {
        return this.buttons[this.currentButton];
    }
}

class GameMenu {
    constructor (name, screen, width, height, offsets = null) {
        this.name = name;
        this.screen = screen;
        this.width = width;
        this.height = height;
        this.offsetX = Math.floor((screenWidth - width - (offsets ? offsets.x : 0)) / 2) + (offsets ? offsets.x : 0);
        this.offsetY = Math.floor((screenHeight - height - 10 - (offsets ? offsets.y : 0)) / 2) + (offsets ? offsets.y : 0) + 10;
        this.buttons = [];
        this.buttonRegistry = new ButtonRegistry(this, []);
    }

    draw() {
        for (const button of this.buttons) {
            button.draw();
        }
    }

    getOffsetX() {
        return offsetX + this.offsetX;
    }

    getOffsetY() {
        return offsetY + this.offsetY;
    }
    
    onKey(ev) {
        if (ev.key == "b") { // up
            this.buttonRegistry.prev();
        } else if (ev.key == "n") { // down
            this.buttonRegistry.next();
        } else if (ev.key == "Enter") {
            this.buttonRegistry.current().click();
        }
    }

    addButtons(...buttons) {
        this.buttons.push(...buttons);
        this.updateButtonRegistry();
    }

    getButtons() {
        return this.buttons;
    }

    updateButtonRegistry() {
        this.buttonRegistry = new ButtonRegistry(this, this.buttons);
    }
}

class GuiButton {
    constructor (x, y, width, height, text, color, screen) {
        this.x = x + screen.getOffsetX();
        this.y = y + screen.getOffsetY();
        this.width = width;
        this.height = height;
        this.text = text;
        this.color = color;
        this.onPressed = () => {};
        this.selected = false;
        this.screen = screen;
    }
    
    draw() {
        for (let i = this.x; i < this.x + this.width; i++) {
            for (let j = this.y; j < this.y + this.height; j++) {
                if (this.selected && (i == this.x || j == this.y || i == this.x + this.width - 1 || j == this.y + this.height - 1)) {
                    pixelMap[i][j] = "#0080000";
                } else pixelMap[i][j] = this.color
            }
        }
        TextRenderer.drawCenteredText(this.text, this.x + (this.width / 2), Math.floor(this.y + (this.height / 2) - 5/2), "#ffffff");
    }
    
    onClick(cb) {
        this.onPressed = cb;
    }

    click() {
        this.onPressed();
    }

    toggleSelection() {
        this.selected = !this.selected;
    }
}

class GuiUtils {
    static drawRect(x1, y1, x2, y2, color) {
        for (let i = Math.max(Math.min(x1, x2), 0); i < Math.min(Math.max(x1, x2), width); i++) {
            for (let j = Math.max(Math.min(y1, y2), 0); j < Math.min(Math.max(y1, y2), height); j++) {
                pixelMap[i][j].color = color;
            }
        }
    }

    static drawOutline(x1, y1, x2, y2, color) {
        const initI = Math.max(Math.min(x1, x2), 0);
        const endI = Math.min(Math.max(x1, x2), width);
        const initJ = Math.max(Math.min(y1, y2), 0);
        const endJ = Math.min(Math.max(y1, y2), height);
        for (let i = initI; i < endI; i++) {
            for (let j = initJ; j < endJ; j++) {
                if (i == initI || i == endI - 1 || j == initJ || j == endJ - 1) {
                    pixelMap[i][j].color = color;
                } 
            }
        }
    }

    static drawVerticalLine(x, y1, y2, color) {
        for (let i = Math.max(Math.min(y1, y2), 0); i <= Math.min(Math.max(y1, y2), height); i++) {
            if (!pixelMap[x][i]) continue;
            pixelMap[x][i].color = color;
        }
    }
}

class TestGameMenu extends GameMenu {
    constructor (screen, width, height, offsets = null) {
        super("test menu screen", screen, width, height, offsets);
        const button1 = new GuiButton(1, 1, width - 2, 20, "button", "#005555", this);
        button1.onClick(() => {
            button1.color = "#ff0000";
            button2.color = "#005555";
        })
        const button2 = new GuiButton(1, 22, width - 2, 20, "button 2", "#005555", this);
        button2.onClick(() => {
            button2.color = "#ff0000";
            button1.color = "#005555";
        })
        this.addButtons(
            button1,
            button2
        )
    }
    draw() {
        for (let i = this.getOffsetX(); i < this.width + this.getOffsetX(); i++) {
            for (let j = this.getOffsetY(); j < this.height + this.getOffsetY(); j++) {
                pixelMap[i][j].color = "#ffffff";
            }
        }
        super.draw();
    }
}

class GameScreen {
    clock() {
        this.fps = this.currentFrames;
        this.currentFrames = 0;
    }
    clear() {
        for (let i = offsetX; i < width - offsetX; i++) {
            for (let j = offsetY; j < height - offsetY; j++) {
                pixelMap[i][j].color = "#ffffff";
            }
        }
    }

    draw() {
        if (!this.currentFrames) this.currentFrames = 0;
        this.currentFrames++;
        this.clear();
        this.drawLevel();
        this.drawMinimap();
        if (showDebugText) {
            TextRenderer.drawText(`angle: ${Math.floor(player.angle)}°`, 1, 1, "#ffffff");
            TextRenderer.drawText(`pos: ${player.x.toFixed(2)} | ${player.y.toFixed(2)}`, 1, 7, "#ffffff");
            TextRenderer.drawText(`fps: ${this.fps}`, 1, 13, "#ffffff");
            TextRenderer.drawText(`vertangle: ${player.verticalOffset}`, 1, 19, "#ffffff");
        }
        if (this.menuScreen) {
            this.drawMenu();
        }
    }

    drawMenu() {
        this.drawOverlay();
        GuiUtils.drawRect(this.menuScreen.getOffsetX(), Math.floor((screenHeight - this.menuScreen.height) / 2) - 2, this.menuScreen.getOffsetX() + this.menuScreen.width, this.menuScreen.getOffsetY(), "#1e1e1e");
        TextRenderer.drawCenteredText(this.menuScreen.name, (this.menuScreen.width / 2) + this.menuScreen.getOffsetX(), Math.floor((screenHeight - this.menuScreen.height) / 2) - 1, "#ffffff");
        this.menuScreen.draw();
    }

    drawOverlay() {
        for (let i = offsetX; i < width - offsetX; i++) {
            for (let j = offsetY; j < height - offsetY; j++) {
                pixelMap[i][j].color = "#" + colorLerp(pixelMap[i][j].color, "#000000", 0.5);
            }
        }
    }

    drawLevel() {
        let rayAngle = player.angle - halfFov;
        for (let i = 0; i < screenWidth; i += accuracy) {
            let rayX = player.x;
            let rayY = player.y;
            const rayCos = Math.cos(degToRad(rayAngle)) / precision_;
            const raySin = Math.sin(degToRad(rayAngle)) / precision_;
            let wall = 0;
            
            while (wall == 0) {
                rayX += rayCos;
                rayY += raySin;
                wall = map[Math.floor(rayY)][Math.floor(rayX)];
            }

            const angle = radToDeg(Math.atan2(rayY, rayX));
            const side = (angle >= 45 && angle <= 135) || (angle >= 275 && angle <= 315);

            const distance = Math.sqrt((player.x - rayX) ** 2 + (player.y - rayY) ** 2) * Math.cos(degToRad(rayAngle - player.angle));

            const wallHeight = Math.floor(halfHeight / distance);

            let t = Math.min(1, (1 / maxDist) * distance);

            const color = "#" + colorLerp(colors[wall - 1], "#000000", t);
            const ceilingColor = colorSettings.ceiling;
            const floorColor = colorSettings.floor;

            GuiUtils.drawVerticalLine(offsetX + i, halfHeight - wallHeight - player.verticalOffset, halfHeight + wallHeight - player.verticalOffset, color);
            GuiUtils.drawVerticalLine(offsetX + i, offsetY, halfHeight - wallHeight - 1 - player.verticalOffset, ceilingColor);
            GuiUtils.drawVerticalLine(offsetX + i, halfHeight + wallHeight + 1 - player.verticalOffset, height - offsetY - 1, floorColor);

            rayAngle += inc;
        }
    }

    drawMinimap() {
        for (let i = 0; i < mapWidth; i++) {
            for (let j = 0; j < mapHeight; j++) {
                const x = width - offsetX - minimapOffset - mapWidth + i;
                const y = offsetY + minimapOffset + j;
                if (map[j][i] == 0) {
                    pixelMap[x][y].color = colorSettings.floor;
                } else {
                    pixelMap[x][y].color = colors[map[j][i] - 1];
                }
                if (i == Math.floor(player.x) && j == Math.floor(player.y)) {
                    pixelMap[x][y].color = "#00ffff";
                }
            }
        }
    }

    onKey(ev) {
        // if (ev.key == "Escape") {
        //     this.menuScreen = this.menuScreen ? null : new TestGameMenu(this, Math.floor(0.75 * screenWidth), Math.floor(0.75 * screenHeight));
        // }
        if (!this.menuScreen) {
            player.update(ev);
        } else {
            this.menuScreen.onKey(ev);
        }
    }
}

const game = new GameScreen();

setInterval(cellTick, (1000/(tps*4)));
setInterval(() => {game.clock()}, 1000);

function cellTick() {
    if (running && !paused) {
        game.draw();
    }
}

function startDoom() {
    if (!running) {
        videoFrame = 0;

        for (let i = offsetX; i < width - offsetX; i++) {
            for (let j = offsetY; j < height - offsetY; j++) {
                if (pixelMap[i][j]) deletePixel(i, j);
                createPixel("screen", i, j);
            }
        }
    }
    running = !running;
}

window.addEventListener("keydown", (ev) => {
    if (ev.key == "u") {
        startDoom();
    } else {
        game.onKey(ev);
    }
})