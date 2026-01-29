{
elements.screen = {
    name: "Screen",
    color: "#000000"
}

let running = false;

const offsetX = 0;
const offsetY = 0;
const screenWidth = 166 - (2 * offsetX);
const screenHeight = 82 - (2 * offsetY);

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

    onClick(ev) {}

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
        GuiUtils.drawRect(this.x, this.y, this.x + this.width, this.y + this.height, this.color);
        TextRenderer.drawCenteredText(this.text, this.x + (this.width / 2), Math.floor(this.y + (this.height / 2) - 5/2), "#ffffff");
        if (this.selected) {
            GuiUtils.drawOutline(this.x, this.y, this.x + this.width, this.y + this.height, "#000000");
        }
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

const closestDivisible = (n, m) => m * Math.floor(n / m);
const xor = (a, b) => (!a && b) || (a && !b)

const colorSettings = {
    color1: "#eeeed5",
    color2: "#7d945d",
    white: {
        1: "#A4A9AD",
        2: "#BDC3C7",
        3: "#EDF3F7"
    },
    black: {
        1: "#000000",
        2: "#232323",
        3: "#7A7D7F"
    }
}

const sprites = {
    "pawn": [
        0,0,0,1,1,0,0,0,
        0,0,1,3,3,1,0,0,
        0,0,1,3,3,1,0,0,
        0,0,0,1,1,0,0,0,
        0,0,1,3,3,1,0,0,
        0,0,1,3,3,1,0,0,
        0,1,3,3,3,3,1,0,
        0,1,3,3,3,3,1,0
    ],
    "bishop": [
        0,0,0,1,1,0,0,0,
        0,0,1,3,3,1,0,0,
        0,1,3,1,1,3,1,0,
        0,1,3,3,3,3,1,0,
        0,0,1,1,1,1,0,0,
        0,0,1,3,3,1,0,0,
        0,1,3,3,3,3,1,0,
        0,1,3,3,3,3,1,0
    ],
    "knight": [
        0,0,0,2,1,1,2,0,
        0,0,1,1,1,1,1,2,
        0,1,1,3,1,1,1,2,
        0,1,1,1,1,1,1,2,
        0,0,0,1,1,1,1,2,
        0,0,1,1,1,1,1,2,
        0,0,1,1,1,1,0,2,
        0,1,1,1,1,1,1,0
    ],
    "rook": [
        1,0,1,0,0,1,0,1,
        1,1,1,1,1,1,1,1,
        0,1,3,3,3,3,1,0,
        0,1,3,3,3,3,1,0,
        0,1,3,3,3,3,1,0,
        1,1,3,1,1,3,1,1,
        1,3,3,2,1,3,3,1,
        1,3,3,2,2,3,3,1
    ],
    "queen": [
        0,0,0,0,0,0,0,0,
        0,0,0,1,1,0,0,0,
        1,0,1,3,3,1,0,1,
        1,1,3,3,3,3,1,1,
        1,3,3,3,3,3,3,1,
        1,2,3,2,2,3,2,1,
        1,2,3,2,2,3,2,1,
        1,3,3,3,3,3,3,1
    ],
    "king": [
        1,0,0,0,0,0,0,1,
        1,1,0,0,0,0,1,1,
        1,3,1,0,0,1,3,1,
        1,3,3,1,1,3,3,1,
        1,3,3,3,3,3,3,1,
        1,3,3,3,3,3,3,1,
        1,3,3,3,3,3,3,1,
        1,3,3,3,3,3,3,1
    ],
    move: [
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,1,1,0,0,0,
        0,0,1,1,1,1,0,0,
        0,0,1,1,1,1,0,0,
        0,0,0,1,1,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0
    ]
}

function checkBounds(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

class Piece {
    constructor (color, type, position) {
        this.color = color;
        this.type = type;
        this.position = position;
        this.moved = false;
    }

    moveTo(position) {
        this.position = {
            x: position[0],
            y: position[1]
        }
    }

    draw(screen) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const x = i + 1 + offsetX + screen.offsetX + this.position.x * screen.n;
                const y = j + 1 + offsetY + screen.offsetY + this.position.y * screen.n;
                if (sprites[this.type][j * 8 + i]) pixelMap[x][y].color = colorSettings[this.color][sprites[this.type][j * 8 + i]];
            }
        }
        if (screen.selected && screen.selected[0] == this.position.x && screen.selected[1] == this.position.y) {
            const moves = this.getLegalMoves(screen.getBoard(), screen);
            for (const move of moves) {
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        const x = move[0] * screen.n + screen.offsetX + offsetX + i + 1;
                        const y = move[1] * screen.n + screen.offsetY + offsetY + j + 1;
                        if (sprites.move[j * 8 + i]) pixelMap[x][y].color = "#dddddd";
                    }
                }
            }
        }
    }
    // -2
    // -1
    // origin

    getPossibleMoves(board, screen) {
        const moves = [];
        const direction = this.color == "black" ? 1 : -1;
        const opponent = this.color == "black" ? "white" : "black";
        switch (this.type) {
            case "pawn":
                if (!board[this.position.x][this.position.y + direction]) {
                    moves.push([0, direction]);
                    if (!board[this.position.x][this.position.y + direction * 2] && !this.moved) moves.push([0, direction * 2, false, true]);
                }
                if (board[this.position.x - 1] && board[this.position.x - 1][this.position.y + direction] && board[this.position.x - 1][this.position.y + direction].color == opponent) {
                    moves.push([-1, direction]);
                }
                if (board[this.position.x + 1] && board[this.position.x + 1][this.position.y + direction] && board[this.position.x + 1][this.position.y + direction].color == opponent) {
                    moves.push([1, direction]);
                }
                // en crossaint
                if (screen.enPassantTargetSquare != null && (this.position.x == screen.enPassantTargetSquare[0] - 1 || this.position.x == screen.enPassantTargetSquare[0] + 1) && this.position.y == screen.enPassantTargetSquare[1]) {
                    moves.push([screen.enPassantTargetSquare[0] - this.position.x, direction, false, false, true]);
                }
                break;
            case "knight": {
                const possibleMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
                for (const move of possibleMoves) {
                    const newX = move[0] + this.position.x;
                    const newY = move[1] + this.position.y;
                    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && (!board[newX][newY] || board[newX][newY].color == opponent)) moves.push(move);
                }
                break;
            }
            case "rook": {
                for (const coord of adjacentCoords) {
                    let currentX = this.position.x + coord[0];
                    let currentY = this.position.y + coord[1];
                    while (checkBounds(currentX, currentY)) {
                        if (board[currentX][currentY]) {
                            if (board[currentX][currentY].color == opponent) moves.push([currentX - this.position.x, currentY - this.position.y]);
                            break;
                        } else moves.push([currentX - this.position.x, currentY - this.position.y]);
                        currentX += coord[0];
                        currentY += coord[1];
                    }
                }
                break;
            }
            case "bishop": {
                for (let i = this.position.x - 1, j = this.position.y + 1; i >= 0 && j < 8; i--, j++) {
                    if (board[i][j]) {
                        if (board[i][j].color == opponent) moves.push([i - this.position.x, j - this.position.y]);
                        break;
                    }
                    moves.push([i - this.position.x, j - this.position.y]);
                }
                for (let i = this.position.x - 1, j = this.position.y - 1; i >= 0 && j >= 0; i--, j--) {
                    if (board[i][j]) {
                        if (board[i][j].color == opponent) moves.push([i - this.position.x, j - this.position.y]);
                        break;
                    }
                    moves.push([i - this.position.x, j - this.position.y]);
                }
                for (let i = this.position.x + 1, j = this.position.y + 1; i < 8 && j < 8; i++, j++) {
                    if (board[i][j]) {
                        if (board[i][j].color == opponent) moves.push([i - this.position.x, j - this.position.y]);
                        break;
                    }
                    moves.push([i - this.position.x, j - this.position.y]);
                }
                for (let i = this.position.x + 1, j = this.position.y - 1; i < 8 && j >= 0; i++, j--) {
                    if (board[i][j]) {
                        if (board[i][j].color == opponent) moves.push([i - this.position.x, j - this.position.y]);
                        break;
                    }
                    moves.push([i - this.position.x, j - this.position.y]);
                }
                break;
            }
            case "queen": {
                for (const coord of squareCoords) {
                    let currentX = this.position.x + coord[0];
                    let currentY = this.position.y + coord[1];
                    while (checkBounds(currentX, currentY)) {
                        if (board[currentX][currentY]) {
                            if (board[currentX][currentY].color == opponent) moves.push([currentX - this.position.x, currentY - this.position.y]);
                            break;
                        } else moves.push([currentX - this.position.x, currentY - this.position.y]);
                        currentX += coord[0];
                        currentY += coord[1];
                    }
                }
                break;
            }
            case "king": {
                const potentialMoves = [];
                for (const coord of squareCoords) {
                    const x = coord[0] + this.position.x;
                    const y = coord[1] + this.position.y;
                    if (checkBounds(x, y) && (!board[x][y] || board[x][y].color == opponent)) {
                        potentialMoves.push([coord[0], coord[1]]);
                    }
                }

                if (!this.moved) {
                    const ksRook = board[7][this.position.y];
                    const qsRook = board[0][this.position.y];
                    if (ksRook && ksRook.type == "rook" && ksRook.color == this.color && !ksRook.moved && !board[5][this.position.y] && screen.getAttackersAt([5, this.position.y], opponent).length == 0 && !board[6][this.position.y] && screen.getAttackersAt([6, this.position.y], opponent).length == 0) {
                        potentialMoves.push([2, 0, true]);
                    }
                    const cond = screen.getAttackersAt([1, this.position.y], opponent).length == 0 && screen.getAttackersAt([2, this.position.y], opponent).length == 0 && screen.getAttackersAt([3, this.position.y], opponent).length == 0;
                    if (qsRook && qsRook.type == "rook" && qsRook.color == this.color && !qsRook.moved && !board[1][this.position.y] && !board[2][this.position.y] && !board[3][this.position.y] && cond) {
                        potentialMoves.push([-2, 0, true]);
                    }
                }

                for (const move of potentialMoves) {
                    if (screen.getAttackersAt([move[0] + this.position.x, move[1] + this.position.y], opponent).length == 0) {
                        moves.push(move);
                    }
                }
            }
        }
        return moves.map(m => [m[0] + this.position.x, m[1] + this.position.y, ...m.slice(2)]).filter(a => a[0] < 8 && a[0] >= 0 && a[1] < 8 && a[1] >= 0);
    }

    getLegalMoves(board, screen) {
        const possibleMoves = this.getPossibleMoves(board, screen);
        if (this.type == "king") return possibleMoves;
        const legalMoves = [];
        for (const move of possibleMoves) {
            const screen2 = screen.clone();
            const piece2 = screen2.pieces.find(p => p.position.x == this.position.x && p.position.y == this.position.y);
            screen2.pieceMove(piece2, move, true, false);
            if (!screen2.isKingAttacked(this.color)) {
                legalMoves.push(move);
            }
        }
        return legalMoves;
    }

    handleSelection(pos, screen) {
        const found = this.getLegalMoves(screen.getBoard(), screen).find(a => a[0] == pos[0] && a[1] == pos[1]);
        if (found) {
            screen.pieceMove(this, found);
            this.moved = true;
            return true
        } else return false;
    }
}

const types = {
    p: "pawn",
    n: "knight",
    b: "bishop",
    r: "rook",
    q: "queen",
    k: "king"
}

const loadFEN = (fen) => {
    const split = fen.split(" ")[0].split("/");
    const pieces = [];
    let posY = 0;
    for (const part of split) {
        let posX = 0;
        for (const char of part.split("")) {
            if (!isNaN(parseInt(char))) {
                posX += parseInt(char);
                continue;
            }
            const white = char.toUpperCase() == char;
            const type = types[char.toLowerCase()];
            pieces.push(new Piece(white ? "white" : "black", type, {
                x: posX,
                y: posY
            }))
            posX++
        }
        posY++;
    }
    return pieces;
}

class UpgradeScreen extends GameMenu {
    constructor (screen, width, height, color, piece) {
        super("upgrade", screen, width, height);
        this.color = color;
        this.piece = piece;
        this.current = -1;
    }

    draw() {
        const separator = 4;
        const panelWidth = 12;
        const pieces = ["queen", "rook", "bishop", "knight"];
        for (let p = 0; p < 4; p++) {
            const iOffset = this.getOffsetX() + 2 + (panelWidth + separator) * p;
            const jOffset = this.getOffsetY() + separator;
            const hovered = mousePos.x >= iOffset && mousePos.x <= iOffset + panelWidth && mousePos.y >= jOffset && mousePos.y <= jOffset + 24;
            if (hovered) this.current = p;
            const color = this.color == "white" ? (hovered ? "#3c3c3c" : "#1e1e1e") : (hovered ? "#aaaaaa" : "#cccccc")
            for (let i = this.getOffsetX() + 2 + (panelWidth + separator) * p; i < panelWidth * (p + 1) + separator * p + this.getOffsetX() + 2; i++) {
                for (let j = this.getOffsetY() + separator; j < this.getOffsetY() + separator + 24; j++) {
                    const x = i - iOffset;
                    const y = j - jOffset;
                    if (x < 10 && x >= 2 && y < 12 && y >= 4) {
                        if (sprites[pieces[p]][(y - 4) * 8 + (x - 2)]) pixelMap[i][j].color = colorSettings[this.color][sprites[pieces[p]][(y - 4) * 8 + (x - 2)]];
                        else pixelMap[i][j].color = color;
                    } else {
                        pixelMap[i][j].color = color;
                    }
                }
            }
        }
        super.draw();
    }

    onClick(_) {
        if (this.current == -1) return;
        this.screen.upgrade(this.piece, this.current);
    }
}

class WinScreen extends GameMenu {
    constructor (screen, width, height, winningColor, timeout = false) {
        super(`${winningColor} won`, screen, width, height);
        this.winningColor = winningColor;
        this.timeout = timeout;
        const button = new GuiButton(1, 10, Math.ceil(width - 2), 20, "reset", "#555555", this);
        button.onClick(() => {
            screen.resetBoard();
        })
        this.addButtons(button);
    }

    draw() {
        for (let i = this.getOffsetX(); i < this.width + this.getOffsetX(); i++) {
            for (let j = this.getOffsetY(); j < this.height + this.getOffsetY(); j++) {
                pixelMap[i][j].color = "#ffffff";
            }
        }
        TextRenderer.drawCenteredText(`${this.winningColor} won ${this.timeout ? "on time" : "by checkmate"}`, Math.floor(this.getOffsetX() + this.width / 2), this.getOffsetY() + 1, "#000000")
        super.draw();
    }

    onClick(_) {
        if (mousePos.x >= this.buttons[0].x 
            && mousePos.x <= this.buttons[0].x + this.buttons[0].width
            && mousePos.y >= this.buttons[0].y
            && mousePos.y <= this.buttons[0].y + this.buttons[0].height) this.buttons[0].click();
    }
}

class DrawScreen extends GameMenu {
    constructor (screen, width, height, type) {
        super(`Game drawn`, screen, width, height);
        this.type = type;
        const button = new GuiButton(1, 10, Math.ceil(width - 2), 20, "reset", "#555555", this);
        button.onClick(() => {
            screen.resetBoard();
        })
        this.addButtons(button);
    }

    draw() {
        for (let i = this.getOffsetX(); i < this.width + this.getOffsetX(); i++) {
            for (let j = this.getOffsetY(); j < this.height + this.getOffsetY(); j++) {
                pixelMap[i][j].color = "#ffffff";
            }
        }
        const types = {
            0: "50-move rule",
            1: "insuff. mat.",
            2: "stalemate",
            3: "repetition"
        }
        TextRenderer.drawCenteredText(`Draw by ${types[this.type]}`, Math.floor(this.getOffsetX() + this.width / 2), this.getOffsetY() + 1, "#000000")
        super.draw();
    }

    onClick(_) {
        if (mousePos.x >= this.buttons[0].x 
            && mousePos.x <= this.buttons[0].x + this.buttons[0].width
            && mousePos.y >= this.buttons[0].y
            && mousePos.y <= this.buttons[0].y + this.buttons[0].height) this.buttons[0].click();
    }
}

const pieceValue = {
    "pawn": 1,
    "knight": 3,
    "bishop": 3,
    "rook": 5,
    "queen": 9,
    "king": Infinity
}

class GameScreen {
    constructor () {
        this.selected = null;
        this.pieces = loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        this.castlingWhite = true;
        this.castlingBlack = true;
        this.capturedWhite = [];
        this.capturedBlack = [];
        this.nonActionMoves = 0;
        this.positions = [];
        this.enPassantTargetSquare = null;
        // true = white
        this.turn = true;
        this.chessClock = {
            white: 60 * 5,
            black: 60 * 5
        }
        this.inCheck = null;
        this.positions.push(this.positionToHash());
    }

    clock() {
        this.fps = this.currentFrames;
        this.currentFrames = 0;
        if (!this.paused) this.turn ? this.chessClock.white-- : this.chessClock.black--;
        if (!this.paused && (this.turn ? this.chessClock.white : this.chessClock.black) <= 0) {
            this.timeout(this.turn ? "black" : "white");
        }
    }

    clear() {
        for (let i = offsetX; i < width - offsetX; i++) {
            for (let j = offsetY; j < height - offsetY; j++) {
                pixelMap[i][j].color = "#000000";
            }
        }
    }

    pause() {
        this.paused = true;
    }

    unpause() {
        this.paused = false;
    }

    draw() {
        if (!this.boardSize) {
            this.boardSize = closestDivisible(Math.min(width, height), 8);
            this.offsetX = (width  - this.boardSize) / 2;
            this.offsetY = (height - this.boardSize) / 2;
            this.n = this.boardSize / 8;
        }
        if (!this.currentFrames) this.currentFrames = 0;
        this.currentFrames++;
        this.clear();
        this.drawBoard();
        this.drawPieces();
        this.drawCaptured();
        TextRenderer.drawText(`${Math.floor(this.chessClock.white / 60)}:${(this.chessClock.white % 60).toString().padStart(2, "0")}`, 2, 2, "#ffffff");
        TextRenderer.drawText(`${Math.floor(this.chessClock.black / 60)}:${(this.chessClock.black % 60).toString().padStart(2, "0")}`, width - offsetX - 2 - TextRenderer.getStringWidth(`${Math.floor(this.chessClock.black / 60)}:${(this.chessClock.black % 60).toString().padStart(2, "0")}`), 2, "#ffffff");
        if (this.menuScreen) {
            this.drawMenu();
        }
    }

    drawBoard() {
        GuiUtils.drawOutline(this.offsetX + offsetY - 1, this.offsetY + offsetY - 1, width - this.offsetX - offsetX + 1, height - this.offsetY - offsetY + 1, "#ff0000");
        // totally not confusing
        for (let i = this.offsetX + offsetX; i < width - this.offsetX - offsetX; i++) {
            for (let j = this.offsetY + offsetY; j < height - this.offsetY - offsetY; j++) {
                const x = Math.floor((i - this.offsetX - offsetX) / this.n);
                const y = Math.floor((j - this.offsetY - offsetY) / this.n);
                if (this.pieces.find(p => p.position.x == x && p.position.y == y && p.type == "king" && this.inCheck == p.color)) {
                    pixelMap[i][j].color = "#ff0000";
                } else if (this.selected && this.selected[0] == x && this.selected[1] == y) {
                    pixelMap[i][j].color = "#ffff00";
                } else if (xor(x % 2 != 0, y % 2 != 0)) {
                    pixelMap[i][j].color = colorSettings.color2;
                } else {
                    pixelMap[i][j].color = colorSettings.color1;
                }
            }
        }
    }

    drawPieces() {
        for (const piece of this.pieces) {
            piece.draw(this);
        }
    }

    drawCaptured() {
        const whitePieces = [...new Set(this.capturedWhite.sort((a, b) => pieceValue[b.type] - pieceValue[a.type]).map(a => a.type))];
        const blackPieces = [...new Set(this.capturedBlack.sort((a, b) => pieceValue[b.type] - pieceValue[a.type]).map(a => a.type))];
        for (let k = 0; k < whitePieces.length; k++) {
            const piece = whitePieces[k];
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const x = i - 11 + offsetX + this.offsetX;
                    const y = j + 1 + offsetY + this.offsetY + k * 9;
                    if (sprites[piece][j * 8 + i]) pixelMap[x][y].color = colorSettings.white[sprites[piece][j * 8 + i]];
                }
            }
            const amount = this.capturedWhite.filter(p => p.type == piece);
            if (amount > 1) TextRenderer.drawText(offsetX + this.offsetX - 11, 1 + offsetY + this.offsetY + (k + 1) * 9);
        }
        for (let k = 0; k < blackPieces.length; k++) {
            const piece = blackPieces[k];
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const x = i + 3 + offsetX + this.boardSize + this.offsetX;
                    const y = j + 1 + offsetY + this.offsetY + k * 9;
                    if (sprites[piece][j * 8 + i]) pixelMap[x][y].color = colorSettings.black[sprites[piece][j * 8 + i]];
                }
            }
            const amount = this.capturedBlack.filter(p => p.type == piece).length;
            if (amount > 1) TextRenderer.drawText(`${amount}`, 12 + offsetX + this.boardSize + this.offsetX, 2 + offsetY + this.offsetY + k * 9, "#ffffff");
        }
    }

    openUpgradeScreen(piece) {
        this.menuScreen = new UpgradeScreen(this, 64, 28, piece.color, piece);
    }

    upgrade(piece, newType) {
        const types = ["queen", "rook", "bishop", "knight"]
        piece.type = types[newType];
        this.pieces.find(p => p.position.x == piece.position.x && p.position.y == piece.position.y).type = types[newType];
        this.menuScreen = null;
        const kings = {
            white: this.pieces.find(p => p.type == "king" && p.color == "white"),
            black: this.pieces.find(p => p.type == "king" && p.color == "black")
        }
        let checked = "";
        for (const king in kings) {
            const isChecked = this.isKingAttacked(king);
            if (isChecked) {
                checked = king;
                this.nonActionMoves = 0;
                this.inCheck = king;
                const isCheckmate = this.checkForCheckmate(king);
                if (isCheckmate) this.checkmate(king == "white" ? "black" : "white");
            }
        }
        if (!checked && this.inCheck) this.inCheck = null;
    }

    handleCastling(piece, pos) {
        this.turn = !this.turn;
        piece.moveTo([pos[0], pos[1]]);
        this.pieces.find(p => p.color == piece.color && p.type == "rook" && p.position.y == piece.position.y && p.position.x == (pos[0] == 6 ? 7 : 0)).moveTo([pos[0] == 6 ? 5 : 3, pos[1]]);
    }

    pieceMove(piece, pos, ignoreChecks = false, checkForDraw = true) {
        // castling
        if (pos[2]) return this.handleCastling(piece, pos);
        const captured = this.pieces.find(p => p.position.x == pos[0] && p.position.y == pos[1]) ?? ((pos[4] && !!this.enPassantTargetSquare) ? this.pieces.find(p => p.position.x == this.enPassantTargetSquare[0] && p.position.y == this.enPassantTargetSquare[1] && p.color != piece.color && p.type == "pawn") : null);
        if (!captured) {
            this.turn = !this.turn;
            piece.moveTo(pos);
            this.nonActionMoves++;
            if (piece.type == "pawn" && ((piece.color == "white" && piece.position.y == 0) || (piece.color == "black" && piece.position.y == 7))) {
                this.openUpgradeScreen(piece);
            }
        } else if (captured.type != "king") {
            if (piece.color == "white") this.capturedBlack.push(captured);
            else this.capturedWhite.push(captured);
            this.nonActionMoves = 0;
            this.pieces = this.pieces.filter(p => p.position.x != captured.position.x || p.position.y != captured.position.y)
            piece.moveTo(pos);
            this.turn = !this.turn;
            if (piece.type == "pawn" && ((piece.color == "white" && piece.position.y == 0) || (piece.color == "black" && piece.position.y == 7))) {
                this.openUpgradeScreen(piece);
            }
        }
        if (pos[3]) {
            this.enPassantTargetSquare = pos;
            // reset after every move that doesnt allow en passant
        } else if (this.enPassantTargetSquare || pos[4]) this.enPassantTargetSquare = null;
        const kings = {
            white: this.pieces.find(p => p.type == "king" && p.color == "white"),
            black: this.pieces.find(p => p.type == "king" && p.color == "black")
        }
        let checked = "";
        if (!ignoreChecks) {
            for (const king in kings) {
                const isChecked = this.isKingAttacked(king);
                if (isChecked) {
                    checked = king;
                    this.nonActionMoves = 0;
                    this.inCheck = king;
                    const isCheckmate = this.checkForCheckmate(king);
                    if (isCheckmate) this.checkmate(king == "white" ? "black" : "white");
                }
            }
        }
        if (!checked && this.inCheck) this.inCheck = null;
        if (checkForDraw) {
            this.positions.push(this.positionToHash());
            const draw = this.checkForDraw();
            if (draw[0]) this._draw(draw[1]);
        }
    }

    positionToHash() {
        const board = this.getBoard();
        const pieceTypes = {
            "pawn": BigInt(1 << 0),
            "knight": BigInt(1 << 1),
            "bishop": BigInt(1 << 2),
            "rook": BigInt(1 << 3),
            "queen": BigInt(1 << 4),
            "king": BigInt(1 << 5),
        }
        const colors = {
            "white": BigInt(1 << 6),
            "black": BigInt(1 << 7)
        }
        let hash = BigInt(0);
        let flag = false;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = board[i][j];
                if (flag) hash <<= BigInt(8);
                if (!piece) {
                    hash >>= BigInt(7);
                    hash |= BigInt(0);
                }
                else hash |= (colors[piece.color] | pieceTypes[piece.type]);
                flag = true;
            }
        }
        return hash;
    }
    
    isKingAttacked(color) {
        const king = this.pieces.find(p => p.type == "king" && p.color == color);
        const pos = [king.position.x, king.position.y];
        const attackers = this.getAttackersAt(pos, color == "white" ? "black" : "white");
        return attackers.length > 0;
    }

    // deep copies in javascript are so fucking annoying 
    clone() {
        const newScreen = new GameScreen();
        newScreen.selected = structuredClone(this.selected);
        newScreen.pieces = structuredClone(this.pieces);
        newScreen.pieces.forEach(p => Object.setPrototypeOf(p, Piece.prototype));
        newScreen.enPassantTargetSquare = structuredClone(this.enPassantTargetSquare);
        // true = white
        newScreen.turn = structuredClone(this.turn);
        newScreen.chessClock = structuredClone(this.chessClock);
        newScreen.inCheck = structuredClone(this.inCheck);
        return newScreen;
    }

    resetBoard() {
        this.menuScreen = null;
        this.selected = null;
        this.pieces = loadFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        this.castlingWhite = true;
        this.castlingBlack = true;
        this.capturedWhite = [];
        this.capturedBlack = [];
        this.nonActionMoves = 0;
        this.positions = [];
        this.enPassantTargetSquare = null;
        // true = white
        this.turn = true;
        this.chessClock = {
            white: 60 * 5,
            black: 60 * 5
        }
        this.inCheck = null;
        this.unpause();
    }

    timeout(winningColor) {
        this.menuScreen = new WinScreen(this, 0.85 * screenWidth, 0.5 * screenHeight, winningColor, true);
        this.pause();
    }

    checkmate(winningColor) {
        this.menuScreen = new WinScreen(this, 0.85 * screenWidth, 0.5 * screenHeight, winningColor);
        this.pause();
    }

    _draw(type) {
        this.menuScreen = new DrawScreen(this, 0.85 * screenWidth, 0.5 * screenHeight, type);
        this.pause();
    }

    checkForDraw() {
        // 50-move rule
        if (this.nonActionMoves >= 100) return [true, 0];
        const whitePieces = this.pieces.filter(p => p.color == "white");
        const blackPieces = this.pieces.filter(p => p.color == "black");
        const cond1 = whitePieces.length == 1 || (whitePieces.length == 2 && whitePieces.find(p => p.type == "rook" || p.type == "bishop"));
        const cond2 = blackPieces.length == 1 || (blackPieces.length == 2 && blackPieces.find(p => p.type == "rook" || p.type == "bishop"));
        // insufficient material
        if (cond1 && cond2) return [true, 1];
        // stalemate
        if (this.pieces.filter(p => p.color == this.turn ? "white" : "black" && p.getLegalMoves(this.getBoard(), this).length > 0).length == 0 && (this.inCheck != this.turn ? "white" : "black")) return [true, 2];
        // threefold repetition
        if (this.positions.filter(p => p == this.positionToHash()).length >= 3) return [true, 3];
        return [false];
    }

    checkForCheckmate(color) {
        if (!this.isKingAttacked(color)) return false;
        const pieces = this.pieces.filter(p => p.color == color);
        const savingMoves = [];
        for (const piece of pieces) {
            for (const move of piece.getPossibleMoves(this.getBoard(), this)) {
                const screen = this.clone();
                const piece2 = screen.pieces.find(p => p.position.x == piece.position.x && p.position.y == piece.position.y);
                screen.pieceMove(piece2, move, true, false);
                if (!screen.isKingAttacked(color)) {
                    savingMoves.push([piece, move]);
                }
            }
        }
        return savingMoves.length == 0;
    }

    getBoard() {
        const board = [];
        for (let i = 0; i < 8; i++) {
            board[i] = [];
            for (let j = 0; j < 8; j++) {
                board[i][j] = this.pieces.find(p => p.position.x == i && p.position.y == j) ?? null;
            }
        }
        return board;
    }

    getAttackersAt(pos, color) {
        const attackers = [];
        for (const piece of this.pieces.filter(p => p.color == color && p.type != "king")) {
            if (piece.getPossibleMoves(this.getBoard(), this).find(m => m[0] == pos[0] && m[1] == pos[1])) attackers.push(piece);
        }
        return attackers;
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

    onKey(ev) {
        if (this.menuScreen) {
            this.menuScreen.onKey(ev);
        }
    }

    onMouseClick(ev) {
        if (outOfBounds(mousePos.x, mousePos.y)) return;
        if (!this.offsetX || !this.offsetY) return;
        if (this.menuScreen) this.menuScreen.onClick(ev);
        if (mousePos.x <= offsetX + this.offsetX || mousePos.x >= offsetX + this.offsetX + this.boardSize || mousePos.y <= offsetY + this.offsetY || mousePos.y >= offsetY + this.offsetY + this.boardSize) return;
        const newPos = [Math.floor((mousePos.x - this.offsetX - offsetX) / this.n), Math.floor((mousePos.y - this.offsetY - offsetY) / this.n)];
        if (!this.selected) {
            const piece = this.pieces.find(p => p.position.x == newPos[0] && p.position.y == newPos[1]);
            if (piece && ((piece.color == "white" && this.turn) || (piece.color == "black" && !this.turn))) this.selected = newPos;
        } else {
            const piece = this.pieces.find(p => p.position.x == this.selected[0] && p.position.y == this.selected[1]);
            if (piece && ((piece.color == "white" && this.turn) || (piece.color == "black" && !this.turn))) {
                piece.handleSelection(newPos, this);
                this.selected = null;
            } else this.selected = null;
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

runAfterLoadList.push(() => {
    if (!localStorage.getItem("chessjs-tutorial")) {
        // "might break"
        // i know damn well it will 100% break on mobile
        promptText("To start or restart chess board press 'u'. Might break on different resolutions and on mobile.");
        localStorage.setItem("chessjs-tutorial", true);
    }
})

window.addEventListener("keydown", (ev) => {
    if (ev.key == "u") {
        if (!running) {
            for (let i = offsetX; i < width - offsetX; i++) {
                for (let j = offsetY; j < height - offsetY; j++) {
                    if (pixelMap[i][j]) deletePixel(i, j);
                    createPixel("screen", i, j);
                }
            }
            running = true;
        }
        game.resetBoard();
    } else {
        game.onKey(ev);
    }
})

window.addEventListener("mousedown", (ev) => {
    game.onMouseClick(ev);
})
}