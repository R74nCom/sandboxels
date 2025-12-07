async function _modprompt(message, defaultValue = "") { // thanks to ggod for this prompt function. Taken from nousersthings.js
    return new Promise(resolve => {
        promptInput(message, (result) => {
            resolve(result);
        }, "bf.js is asking you...", defaultValue);
    })
}

class Interpreter {
    constructor() {
        this.map = new Array(64).fill(0)
        this.index = 0
        this.ci = 0
        this.loops = []
        this.code = ""
        this.tsay = ""
    }

    async run(px, code = this.code) {
        this.ci = 0
        while (this.ci < code.length) {
            const token = code[this.ci]

            switch (token) {
                case ">":
                    if (this.index + 1 == this.map.length) {
                        this.map.push(0)
                    }
                    this.index++
                    break

                case "<":
                    if (this.index - 1 != -1) {
                        this.index--
                    }
                    break

                case "+":
                    this.map[this.index]++
                    break

                case "-":
                    this.map[this.index]--
                    break

                case ".":
                    this.tsay += String.fromCharCode(this.map[this.index])
                    break

                case "!":
                    promptText(this.tsay, () => { }, "bf.js")
                    break

                case "/":
                    this.tsay = ""
                    break

                case ",":
                    const ans = await _modprompt("")
                    if (ans.trim().length > 0) {
                        this.map[this.index] = ans[0].charCodeAt(0)
                    }
                    break

                case "[":
                    if (this.map[this.index] === 0) {
                        let open = 1
                        while (open > 0) {
                            this.ci++
                            if (code[this.ci] === "[") open++
                            else if (code[this.ci] === "]") open--
                        }
                    } else {
                        this.loops.push(this.ci)
                    }
                    break

                case "]":
                    if (this.map[this.index] !== 0) {
                        this.ci = this.loops[this.loops.length - 1]
                    } else {
                        this.loops.pop()
                    }
                    break
            }

            this.ci++
        }

        px.running = false
    }
}

class RemoteBase {
    constructor(base) {
        this.base = base
        this.code = ""
    }

    run() {
        pixelMap[this.base[0]][this.base[1]].interpreter.run(pixelMap[this.base[0]][this.base[1]], this.code)
        this.code = ""
    }

    getMap() {
        return pixelMap[this.base[0]][this.base[1]].interpreter.map
    }
}

const bftokens = {
    bf_base: "#00ff00",
    bf_remote_base: "#008600",
    ">": "#ff7f00",
    "<": "#ff00ff",
    "+": "#00ffff",
    "-": "#800080",
    "[": "#ff1493",
    "]": "#1e90ff",
    ".": "#ffd700",
    ",": "#ff4500",
    "!": "#ff69b4",
    "split": "#565656",
    "act": "#ffc400",
    "bf_gate": "#ffc400",
}
const bftokenslist = Object.keys(bftokens)

elements.bf_base = {
    category: "bf",
    color: "#00ff00",
    state: "solid",
    behavior: behaviors.WALL,
    conduct: 1,
    tick: (px) => {
        if (pixelTicks == px.start) {
            px.act = false
            px.interpreter = new Interpreter()
            px.base = [px.x, px.y]
            px.running = false
        }

        if (!(px.interpreter instanceof Interpreter)) {
            px.interpreter = new Interpreter()
        }
    },

}

let remotebase1 = undefined
let bfreader = undefined
let bfreader2 = undefined

elements.bf_remote_base = {
    category: "bf",
    color: "#008600",
    state: "solid",
    behavior: behaviors.WALL,
    onSelect: async function () {
        var bfans1 = await _modprompt("Please input in the coordinates of the desired pixel. When it activates, this activates. (X,Y)", "0,0");
        if (!bfans1) { return }
        let [x, y] = bfans1.split(",")
        remotebase1 = [Number(x), Number(y)]
    },
    tick: (px) => {
        if (pixelTicks == px.start) {
            px.act = false
            px.interpreter = new RemoteBase(pixelMap[remotebase1[0]][remotebase1[1]].base)
            px.base = [px.x, px.y]
            if (!pixelMap[remotebase1[0]][remotebase1[1]].remotes) {
                pixelMap[remotebase1[0]][remotebase1[1]].remotes = []
            }
            pixelMap[remotebase1[0]][remotebase1[1]].remotes.push([px.x, px.y])
            px.parent = remotebase1
            px.cd = false
        }
    },
    onDelete: (px) => {
        if (!isEmpty(px.parent[0], px.parent[1]) && pixelMap[px.parent[0]][px.parent[1]].remotes) {
            pixelMap[px.parent[0]][px.parent[1]].remotes.filter(a => !(a[0] === px.x && a[1] === px.y))
        }
    }
}

elements.reader = {
    category: "bf",
    color: "#008600",
    state: "solid",
    behavior: behaviors.WALL,
    conduct: 1,
    onSelect: async function () {
        var bfans2 = await _modprompt("Please input in the desired value to activate when read.", "0");
        if (!bfans2) { return }
        bfreader = Number(bfans2)
    },
    tick: (px) => {
        if (pixelTicks == px.start) {
            px.tread = bfreader
        }
    },
}

elements.pointer_reader = {
    category: "bf",
    color: "#008600",
    state: "solid",
    behavior: behaviors.WALL,
    conduct: 1,
    onSelect: async function () {
        var bfans3 = await _modprompt("Please input in the desired pointer and value to activate when read. (pointer,value)", "0,0");
        if (!bfans3) { return }
        let [x, y] = bfans3.split(",")
        bfreader2 = [Number(x), Number(y)]
    },
    tick: (px) => {
        if (pixelTicks == px.start) {
            px.tread = bfreader2
        }
    },
}

elements.bf_runner = {
    category: "bf",
    color: "#ababab",
    tool: (px) => {
        if (px.element == "bf_base" && !px.running) {
            px.running = true
            px.act = true
            px.interpreter.map.fill(0)
            px.interpreter.code = ""
            px.interpreter.index = 0
            px.interpreter.ci = 0
        }
    }
}

dependOn("logicgates.js", () => {
    elements.bf_gate = {
        category: "bf",
        color: "#ffc400",
        state: "solid",
        behavior: behaviors.WALL,
        tick: (px) => {
            if (!px.base) {
                px.act = false
                const ns = getNeighbors(px)
                if (ns.length > 0) {
                    if (!isEmpty(px.x - 1, px.y)) {
                        const left = ns[0]
                        if (bftokenslist.includes(left.element) && left.base) {
                            px.base = left.base
                        }
                    }
                }
            } else {
                if (px.act) {
                    px.color = "#00ff00"
                } else {
                    px.color = "#ffc400"
                }
                var countNeighborsResult = countNeighbors(pixel)
                if (countNeighborsResult.charged > 0) {
                    px.can = true
                } else {
                    px.can = false
                }

                if (!isEmpty(px.x - 1, px.y)) {
                    const left = pixelMap[px.x - 1][px.y]
                    if (bftokenslist.includes(left.element) && left.base) {
                        if (left.act && !px.act && px.can) {
                            left.act = false
                            px.act = true
                            pixelMap[px.base[0]][px.base[1]].interpreter.code += "g"
                            if (isEmpty(px.x + 1, px.y) || !pixelMap[px.x][px.y].base || (pixelMap[px.x][px.y].element == "bf_gate" && !pixelMap[px.x][px.y].can)) {
                                px.act = false
                            }
                            if (px.remotes) {
                                px.remotes.forEach(remote => {
                                    pixelMap[remote[0]][remote[1]].act = true
                                })
                            } else {
                                pixelMap[px.base[0]][px.base[1]].interpreter.run(pixelMap[px.base[0]][px.base[1]])
                            }
                        }
                    }
                }

                const ns = getNeighbors(px)
                ns.forEach(n => {
                    if (pixelMap[px.base[0]][px.base[1]].interpreter instanceof Interpreter) {
                        if (n.element == "reader" && pixelMap[px.base[0]][px.base[1]].interpreter.map[pixelMap[px.base[0]][px.base[1]].interpreter.index] == n.tread) {
                            n.charge = 1
                        } else if (n.element == "pointer_reader" && pixelMap[px.base[0]][px.base[1]].interpreter.map[n.tread[0]] == n.tread[1]) {
                            n.charge = 1
                        }
                    } else {
                        if (n.element == "reader" && pixelMap[px.base[0]][px.base[1]].interpreter.getMap()[pixelMap[px.base[0]][px.base[1]].interpreter.index] == n.tread) {
                            n.charge = 1
                        } else if (n.element == "pointer_reader" && pixelMap[px.base[0]][px.base[1]].interpreter.getMap()[n.tread[0]] == n.tread[1]) {
                            n.charge = 1
                        }
                    }
                })
            }

            if (isEmpty(px.x + 1, px.y) || !pixelMap[px.x + 1][px.y].base || (pixelMap[px.x + 1][px.y].element == "bf_gate" && !pixelMap[px.x + 1][px.y].can)) {
                px.act = false
            }
        }
    }
}, true)

for (let token of bftokenslist) {
    if (token == "bf_base" || token == "bf_remote_base" || token == "bf_gate") { continue }
    elements[token] = {
        category: "bf",
        color: bftokens[token],
        state: "solid",
        behavior: behaviors.WALL,
        tick: (px) => {
            if (!px.base) {
                px.act = false
                const ns = getNeighbors(px)
                if (ns.length > 0) {
                    if (!isEmpty(px.x - 1, px.y)) {
                        const left = ns[0]
                        if (bftokenslist.includes(left.element) && left.base) {
                            px.base = left.base
                        }
                    }
                }
            } else {
                if (px.act) {
                    px.color = "#00ff00"
                } else {
                    px.color = bftokens[token]
                }
                const ns = getNeighbors(px)
                if (ns.length > 0 && !isEmpty(px.x - 1, px.y)) {
                    const left = pixelMap[px.x - 1][px.y]
                    if (bftokenslist.includes(left.element) && left.base) {
                        if (left.act && !px.act) {
                            left.act = false
                            px.act = true
                            pixelMap[px.base[0]][px.base[1]].interpreter.code += token
                            if (px.remotes) {
                                px.remotes.forEach(remote => {
                                    pixelMap[remote[0]][remote[1]].act = true
                                    console.log(pixelMap[remote[0]][remote[1]].act)
                                })
                            } else {
                                pixelMap[px.base[0]][px.base[1]].interpreter.run(pixelMap[px.base[0]][px.base[1]])
                            }
                        }
                    }
                }
                if (ns.length >= 2) {
                    ns.forEach(n => {
                        if (pixelMap[px.base[0]][px.base[1]].interpreter instanceof Interpreter) {
                            if (n.element == "reader" && pixelMap[px.base[0]][px.base[1]].interpreter.map[pixelMap[px.base[0]][px.base[1]].interpreter.index] == n.tread) {
                                n.charge = 1
                            } else if (n.element == "pointer_reader" && pixelMap[px.base[0]][px.base[1]].interpreter.map[n.tread[0]] == n.tread[1]) {
                                n.charge = 1
                            }
                        } else {
                            if (n.element == "reader" && pixelMap[px.base[0]][px.base[1]].interpreter.getMap()[pixelMap[px.base[0]][px.base[1]].interpreter.index] == n.tread) {
                                n.charge = 1
                            } else if (n.element == "pointer_reader" && pixelMap[px.base[0]][px.base[1]].interpreter.getMap()[n.tread[0]] == n.tread[1]) {
                                n.charge = 1
                            }
                        }
                    })
                }
            }

            if (isEmpty(px.x + 1, px.y) || !pixelMap[px.x + 1][px.y].base || (pixelMap[px.x + 1][px.y].element == "bf_gate" && !pixelMap[px.x + 1][px.y].can)) {
                px.act = false
            }
        }
    }
}

elements.act.conduct = 0.1
const oldact = elements.act.tick
elements.act.tick = (px) => {
    oldact(px)

    if (px.charge && !px.act) {
        px.act = true
        px.charge = 0
    } else {
        px.charge = 0
    }
}