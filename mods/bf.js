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

    async run(px) {
        while (this.ci < this.code.length) {
            const token = this.code[this.ci]

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
                            if (this.code[this.ci] === "[") open++
                            else if (this.code[this.ci] === "]") open--
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
            px.base = pixelMap[remotebase1[0]][remotebase1[1]].base
            if (!pixelMap[remotebase1[0]][remotebase1[1]].remotes) {
                pixelMap[remotebase1[0]][remotebase1[1]].remotes = []
            }
            pixelMap[remotebase1[0]][remotebase1[1]].remotes.push([px.x, px.y])
            px.cd = false
        }
    },
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

for (let token of bftokenslist) {
    if (token == "bf_base" || token == "bf_remote_base") { continue }
    elements[token] = {
        category: "bf",
        color: bftokens[token],
        state: "solid",
        behavior: behaviors.WALL,
        tick: (px) => {
            if (!px.base) {
                px.way = "l"
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
                if (ns.length > 0) {
                    const left = ns[0]
                    if (bftokenslist.includes(left.element) && left.base) {
                        if (left.act && !px.act) {
                            left.act = false
                            px.act = true
                            pixelMap[px.base[0]][px.base[1]].interpreter.code += token
                            if (isEmpty(px.x + 1, px.y)) {
                                if (px.remotes) {
                                    px.remotes.forEach(remote => {
                                        pixelMap[remote[0]][remote[1]].act = true
                                    })
                                } else {
                                    pixelMap[px.base[0]][px.base[1]].interpreter.run(pixelMap[px.base[0]][px.base[1]])
                                }
                                px.act = false
                            }
                        }
                    }
                    if (ns.length >= 2) {
                        ns.forEach(n => {
                            if (n.element == "reader" && pixelMap[px.base[0]][px.base[1]].interpreter.map[pixelMap[px.base[0]][px.base[1]].interpreter.index] == n.tread) {
                                n.charge = 1
                            } else if (n.element == "pointer_reader" && pixelMap[px.base[0]][px.base[1]].interpreter.map[n.tread[0]] == n.tread[1]) {
                                n.charge = 1
                            }
                        })
                    }
                }
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