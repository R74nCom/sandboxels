if (!enabledMods.includes("mods/betterSettings.js")) { enabledMods.unshift("mods/betterSettings.js"); localStorage.setItem("enabledMods", JSON.stringify(enabledMods)); window.location.reload() };

const settingsTab = new SettingsTab("Edit tools");

const element = new Setting("Element", "element", settingType.TEXT, false, "wall");
const replace = new Setting("Replace pixels", "replace", settingType.BOOLEAN, false, true);

const filter = new Setting("Filter", "filter", settingType.BOOLEAN, false, false);
const filteredElement = new Setting("Filtered Element", "filterElement", settingType.TEXT, false, "");

const transparentSelection = new Setting("Transparent selection", "transparentSelection", settingType.BOOLEAN, false, true);

settingsTab.registerSettings("Box tools", element, replace);
settingsTab.registerSettings("Filter settings", filter, filteredElement);
settingsTab.registerSettings("Selection settings", transparentSelection);

settingsManager.registerTab(settingsTab);

// current selection
let selection_ = {
    start: {},
    end: {}
}
// selection position, used for moveSelection
let selectionPosition = {};
// copy of the selection that is being moved (pixels), used for moveSelection
let selectionMoved = [];
// offsets of the mouse relative to selection position, used for moveSelection
let selectionOffsets = {};

// current box, used in box and rectangle
let box = {
    start: {},
    end: {}
}

// whether the next mouseUp even should trigger
let skip = false;
// whether user is currently holding
let holding = false;
// mobile device shift equivalent
let lockSelection = false;

// current clipboard, used for cutting, copying and pasting
let clipboard = [];

// createPixel but with color argument
const createPixelColor = (element, x, y, color) => {
    const pixel = new Pixel(x, y, element);
    pixel.color = color;
    currentPixels.push(pixel);
    checkUnlock(element);
}

// replaces a pixel at x, y position with replacement element specified in the settings
const replacePixel = (x, y) => {
    if (outOfBounds(x, y)) return;
    if (pixelMap[x][y]) {
        if (!replace.get()) return;
        deletePixel(x, y);
    }
    createPixel(element.get(), x, y);
}

// checks whether position pos is in bounds
const inBounds = (bounds, pos) => {
    bounds = {
        start: {
            x: Math.min(bounds.start.x, bounds.end.x),
            y: Math.min(bounds.start.y, bounds.end.y)
        },
        end: {
            x: Math.max(bounds.start.x, bounds.end.x),
            y: Math.max(bounds.start.y, bounds.end.y)
        }
    }
    return pos.x >= bounds.start.x && pos.x <= bounds.end.x && pos.y >= bounds.start.y && pos.y <= bounds.end.y;
}

// generates a selection based on start and end positions
const select = (start, end) => {
    const res = [];
    for (let i = 0; i <= end.x - start.x; i++) {
        res[i] = [];
        for (let j = 0; j <= end.y - start.y; j++) {
            res[i][j] = pixelMap[i + start.x][j + start.y];
        }
    }
    return res;
}

elements.select = {
    name: "Select",
    category: "editTools",
    maxSize: 1,
    onMouseDown: () => {
        if (outOfBounds(mousePos.x, mousePos.y)) {
            skip = true;
            return;
        }
        skip = false;
        holding = true;
        selection_.start = mousePos;
    },
    onMouseUp: () => {
        if (skip) return;
        selection_.end = mousePos;
        if (selection_.start == selection_.end) selection_ = {};
        holding = false;
    },
    tool: (_) => {},
    perTick: () => {
        if (!selection_ || !selection_.start || !selection_.end) return;
        if (holding) {
            selection_.end = mousePos;
        }
        const canvas = document.getElementById("game");
        const ctx = canvas.getContext("2d");
        const start = {
            x: Math.round(selection_.start.x * pixelSize),
            y: Math.round(selection_.start.y * pixelSize)
        }
        const end = {
            x: Math.round(selection_.end.x * pixelSize),
            y: Math.round((selection_.end.y + 1) * pixelSize)
        }
        const {strokeStyle, lineWidth} = ctx;
        ctx.setLineDash([8, 8]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.globalCompositeOperation = "destination-over";
        ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.setLineDash([]);
    }
}

elements.box = {
    name: "Box",
    category: "editTools",
    onMouseDown: () => {
        if (outOfBounds(mousePos.x, mousePos.y) || showingMenu) {
            skip = true;
            return;
        }
        skip = false;
        holding = true;
        box.start = mousePos;
    },
    onMouseUp: () => {
        if (skip) return;
        box.end = mousePos;
        holding = false;
        for (let i = -Math.floor(mouseSize / 2); i < Math.abs(box.start.x - box.end.x) + Math.floor(mouseSize / 2); i++) {
            const x = Math.min(box.start.x, box.end.x) + i;
            for (let j = -Math.floor(mouseSize / 2); j <= Math.floor(mouseSize / 2); j++) {
                replacePixel(x, box.start.y + (box.start.y > box.end.y ? -j : j));
                replacePixel(x, box.end.y + (box.end.y > box.start.y ? -j : j)); 
            }
        }
        for (let i = -Math.floor(mouseSize / 2); i <= Math.abs(box.start.y - box.end.y) + Math.floor(mouseSize / 2); i++) {
            const y = Math.min(box.start.y, box.end.y) + i;
            for (let j = -Math.floor(mouseSize / 2); j <= Math.floor(mouseSize / 2); j++) {
                replacePixel(box.start.x + (box.start.x > box.end.x ? -j : j), y);
                replacePixel(box.end.x + (box.end.x > box.start.x ? -j : j), y);
            }
        }
    },
    tool: (_) => {},
    perTick: () => {
        if (holding) {
            if (shiftDown || lockSelection) {
                box.end = {
                    y: mousePos.y,
                    x: box.start.x + Math.abs(mousePos.y - box.start.y) * (box.start.x > mousePos.x ? -1 : 1)
                };
                mousePos = box.end;
            } else {
                box.end = mousePos;
            }
            const canvas = document.getElementById("game");
            const ctx = canvas.getContext("2d");
            const start = {
                x: Math.round(box.start.x * pixelSize),
                y: Math.round(box.start.y * pixelSize)
            }
            const end = {
                x: Math.round(box.end.x * pixelSize),
                y: Math.round((box.end.y + 1) * pixelSize)
            }
            const {strokeStyle, lineWidth} = ctx;
            ctx.setLineDash([8, 8]);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            ctx.setLineDash([]);
        }
    }
}

elements.cut = {
    name: "Cut",
    category: "editTools",
    maxSize: 0,
    tool: (_) => {},
    onSelect: () => {
        if (!selection_.start || !selection_.end) return alert("No selection made");
        const selected = select({
            x: Math.min(selection_.start.x, selection_.end.x),
            y: Math.min(selection_.start.y, selection_.end.y)
        }, {
            x: Math.max(selection_.start.x, selection_.end.x),
            y: Math.max(selection_.start.y, selection_.end.y)
        })
        clipboard = selected;
        for (const i of selected) {
            for (const pixel of i) {
                if (!pixel) continue;
                deletePixel(pixel.x, pixel.y);
            }
        }
        selectElement("unknown");
    }
}
elements.copy = {
    name: "Copy",
    category: "editTools",
    maxSize: 0,
    tool: (_) => {},
    onSelect: () => {
        if (!selection_.start || !selection_.end) return alert("No selection made");
        const selected = select({
            x: Math.min(selection_.start.x, selection_.end.x),
            y: Math.min(selection_.start.y, selection_.end.y)
        }, {
            x: Math.max(selection_.start.x, selection_.end.x),
            y: Math.max(selection_.start.y, selection_.end.y)
        })
        clipboard = selected;
        selectElement("unknown");
    }
}

elements.selectionMove = {
    name: "Move selection",
    category: "editTools",
    maxSize: 0,
    tool: (_) => {},
    onMouseDown: () => {
        if (outOfBounds(mousePos.x, mousePos.y)) return;
        if (!selection_.start || !selection_.end) return;
        if (!inBounds(selection_, mousePos)) return;
        selectionOffsets = {
            x: mousePos.x - Math.min(selection_.start.x, selection_.end.x),
            y: mousePos.y - Math.min(selection_.start.y, selection_.end.y)
        }
        const selected = select({
            x: Math.min(selection_.start.x, selection_.end.x),
            y: Math.min(selection_.start.y, selection_.end.y)
        }, {
            x: Math.max(selection_.start.x, selection_.end.x),
            y: Math.max(selection_.start.y, selection_.end.y)
        })
        selectionPosition = {
            x: selection_.start.x,
            y: selection_.start.y
        }
        for (const i of selected) {
            for (const pixel of i) {
                if (!pixel) continue;
                deletePixel(pixel.x, pixel.y);
            }
        }
        selectionMoved = selected;
    },
    perTick: () => {
        const canvas = document.getElementById("game");
        const ctx = canvas.getContext("2d");
        ctx.globalAlpha = 1;
        const start = {
            x: Math.round(selection_.start.x * pixelSize),
            y: Math.round(selection_.start.y * pixelSize)
        }
        const end = {
            x: Math.round(selection_.end.x * pixelSize),
            y: Math.round((selection_.end.y + 1) * pixelSize)
        }
        const {strokeStyle, lineWidth} = ctx;
        ctx.setLineDash([8, 8]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.setLineDash([]);
        if (!selectionMoved || selectionMoved.length == 0) return;
        selectionPosition = {
            x: mousePos.x - selectionOffsets.x,
            y: mousePos.y - selectionOffsets.y
        }
        selection_ = {
            start: {
                x: selectionPosition.x,
                y: selectionPosition.y
            },
            end: {
                x: selectionPosition.x + selectionMoved.length - 1,
                y: selectionPosition.y + selectionMoved[0].length - 1
            }
        }
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < selectionMoved.length; i++) {
            for (let j = 0; j < selectionMoved[i].length; j++) {
                const x = selectionPosition.x + i;
                const y = selectionPosition.y + j;
                if (!selectionMoved[i][j]) continue;
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = selectionMoved[i][j].color;
                ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            }
        }
    },
    onMouseUp: () => {
        if (outOfBounds(mousePos.x, mousePos.y)) return;
        for (let i = 0; i < selectionMoved.length; i++) {
            for (let j = 0; j < selectionMoved[i].length; j++) {
                const x = selectionPosition.x + i;
                const y = selectionPosition.y + j;
                if (!selectionMoved[i][j] && transparentSelection.get()) continue;
                if (pixelMap[x][y]) deletePixel(x, y);
                if (selectionMoved[i][j]) createPixelColor(selectionMoved[i][j].element, x, y, selectionMoved[i][j].color);
            }
        }
        selectionMoved = [];
    }
}

elements.paste = {
    name: "Paste",
    category: "editTools",
    tool: (_) => {},
    maxSize: 1,
    onMouseDown: () => {
        if (!clipboard) return alert("Nothing left to paste");
        for (let i = 0; i < clipboard.length; i++) {
            for (let j = 0; j < clipboard[i].length; j++) {
                const x = mousePos.x + i;
                const y = mousePos.y + j;
                if (outOfBounds(x, y) || (!clipboard[i][j] && transparentSelection.get())) continue;
                if (!clipboard[i][j]) {
                    if (pixelMap[x][y]) deletePixel(x, y);
                    continue;
                }
                if (!pixelMap[x][y]) createPixelColor(clipboard[i][j].element, x, y, clipboard[i][j].color);
                else {
                    deletePixel(x, y);
                    createPixelColor(clipboard[i][j].element, x, y, clipboard[i][j].color);
                }
            }
        }
    }
}

elements.rectangle = {
    name: "Rectangle",
    category: "editTools",
    onMouseDown: () => {
        if (outOfBounds(mousePos.x, mousePos.y)) {
            skip = true;
            return;
        }
        skip = false;
        holding = true;
        box.start = mousePos;
    },
    onMouseUp: () => {
        if (skip) return;
        box.end = mousePos;
        holding = false;
        for (let i = -Math.floor(mouseSize / 2); i <= Math.abs(box.start.x - box.end.x) + Math.floor(mouseSize / 2); i++) {
            for (let j = -Math.floor(mouseSize / 2); j <= Math.abs(box.start.y - box.end.y) + Math.floor(mouseSize / 2); j++) {
                replacePixel(Math.min(box.start.x, box.end.x) + i, Math.min(box.start.y, box.end.y) + j);
            }
        }
    },
    tool: (_) => {},
    perTick: () => {
        if (holding) {
            if (shiftDown || lockSelection) {
                box.end = {
                    y: mousePos.y,
                    x: box.start.x + Math.abs(mousePos.y - box.start.y) * (box.start.x > mousePos.x ? -1 : 1)
                };
                mousePos = box.end;
            } else {
                box.end = mousePos;
            }
            const canvas = document.getElementById("game");
            const ctx = canvas.getContext("2d");
            const start = {
                x: Math.round(box.start.x * pixelSize),
                y: Math.round(box.start.y * pixelSize)
            }
            const end = {
                x: Math.round(box.end.x * pixelSize),
                y: Math.round((box.end.y + 1) * pixelSize)
            }
            const {strokeStyle, lineWidth} = ctx;
            ctx.setLineDash([8, 8]);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            ctx.setLineDash([]);
        }
    }
}

// Ellipse Midpoint Algorithm
// https://stackoverflow.com/questions/15474122/is-there-a-midpoint-ellipse-algorithm
// https://web.archive.org/web/20160305234351/http://geofhagopian.net/sablog/Slog-october/slog-10-25-05.htm
function ellipsePlotPoints(xc, yc, x, y) {
    replacePixel(xc + x, yc + y);
    replacePixel(xc - x, yc + y);
    replacePixel(xc + x, yc - y);
    replacePixel(xc - x, yc - y);
}

function ellipse(xc, yc, w, h) {
    const a2 = Math.pow(w, 2);
    const b2 = Math.pow(h, 2);
    const twoa2 = 2 * a2;
    const twob2 = 2 * b2;
    let p;
    let x = 0;
    let y = h;
    let px = 0;
    let py = twoa2 * y;

    /* Plot the initial point in each quadrant. */
    ellipsePlotPoints(xc, yc, x, y);

    p = Math.round(b2 - (a2 * b) + (0.25 * a2));
    while (px < py) {
        x++;
        px += twob2;
        if (p < 0) p += b2 + px;
        else {
            y--;
            py -= twoa2;
            p += b2 + px - py;
        }
        ellipsePlotPoints(xc, yc, x, y);
    }

    p = Math.round(b2 * (x + 0.5) * (x + 0.5) + a2 * (y - 1) * (y - 1) - a2 * b2);
    while (y > 0) {
        y--;
        py -= twoa2;
        if (p > 0) p += a2 - py;
        else {
            x++;
            px += twob2;
            p += a2 - py + px;
        }
        ellipsePlotPoints(xc, yc, x, y);
    }
}

elements.ellipse = {
    name: "Ellipse",
    category: "editTools",
    tool: (_) => {},
    maxSize: 1,
    onMouseDown: () => {
        if (outOfBounds(mousePos.x, mousePos.y)) {
            skip = true;
            return;
        }
        skip = false;
        holding = true;
        box.start = mousePos;
    },
    onMouseUp: () => {
        if (skip) return;
        box.end = mousePos;
        holding = false;
        const w = Math.abs(box.end.x - box.start.x);
        const h = Math.abs(box.end.y - box.start.y);
        const x = Math.min(box.start.x, box.end.x) + Math.floor(w / 2);
        const y = Math.min(box.start.y, box.end.y) + Math.floor(h / 2);
        ellipse(x, y, Math.floor(w / 2), Math.floor(h / 2));
    },
    tool: (_) => {},
    perTick: () => {
        if (holding) {
            if (shiftDown || lockSelection) {
                box.end = {
                    y: mousePos.y,
                    x: box.start.x + Math.abs(mousePos.y - box.start.y) * (box.start.x > mousePos.x ? -1 : 1)
                };
                mousePos = box.end;
            } else {
                box.end = mousePos;
            }
            const canvas = document.getElementById("game");
            const ctx = canvas.getContext("2d");
            const start = {
                x: Math.round(box.start.x * pixelSize),
                y: Math.round(box.start.y * pixelSize)
            }
            const end = {
                x: Math.round(box.end.x * pixelSize),
                y: Math.round((box.end.y + 1) * pixelSize)
            }
            const {strokeStyle, lineWidth} = ctx;
            ctx.setLineDash([8, 8]);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            ctx.setLineDash([]);
        }
    }
}

document.addEventListener("mousedown", (ev) => {
    if (elements[currentElement].onMouseDown) {
        elements[currentElement].onMouseDown();
    }
})

// mouse2 overwrite for delete filter
// no mouse1 overwrite for replace functionality, I don't think I should be overwriting such big functions
// maybe in a future update
mouse2Action = (e,mouseX=undefined,mouseY=undefined,startPos) => {
    // Erase pixel at mouse position
    if (mouseX == undefined && mouseY == undefined) {
        var canvas = document.getElementById("game");
        var ctx = canvas.getContext("2d");
        lastPos = mousePos;
        mousePos = getMousePos(canvas, e);
        var mouseX = mousePos.x;
        var mouseY = mousePos.y;
    }
    // If the current element is "pick" or "lookup", coords = [mouseX,mouseY]
    if (currentElement == "pick" || currentElement == "lookup") {
        var coords = [[mouseX,mouseY]];
    }
    else if (!isMobile) {
        startPos = startPos || lastPos
        var coords = lineCoords(startPos.x,startPos.y,mouseX,mouseY);
    }
    else {
        var coords = mouseRange(mouseX,mouseY);
    }
    // For each x,y in coords
    for (var i = 0; i < coords.length; i++) {
        var x = coords[i][0];
        var y = coords[i][1];

        if (!isEmpty(x, y)) {
            if (outOfBounds(x,y)) {
                continue
            }
            var pixel = pixelMap[x][y];
            // filter
            if (filter.get() && pixel.element != filteredElement.get()) continue;
            delete pixelMap[x][y];
            // Remove pixel from currentPixels
            for (var j = 0; j < currentPixels.length; j++) {
                if (currentPixels[j].x == x && currentPixels[j].y == y) {
                    currentPixels.splice(j, 1);
                    break;
                }
            }
        }
    }
}

// Mobile check
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
// http://detectmobilebrowsers.com/
window.mobileAndTabletCheck = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

// if user is on mobile, add lock selection tool
if (window.mobileAndTabletCheck()) {
    elements.lockSelection = {
        name: "Lock selection",
        category: "editTools",
        tool: (_) => {},
        onSelect: () => {
            // unselect so you can click it multiple times
            selectElement("unknown");
            document.getElementById("elementButton-lockSelection").innerText = lockSelection ? "Lock selection" : "Unlock selection";
            lockSelection = !lockSelection;
        }
    }
}