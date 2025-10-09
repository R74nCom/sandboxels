// heavily inspired by biology.js, go try it out too!
viewInfo[4] = {
    name: "enrg",
    pixel: function (pixel, ctx) {
        if (elements[pixel.element].isCell === true) {
            var stat = pixel.energy
            var ratio = stat / 3000
            if (ratio < 0) ratio = 0
            if (ratio > 1) ratio = 1
            var hue = Math.round(ratio * 180)
            drawSquare(ctx, `hsl(${hue},100%,50%)`, pixel.x, pixel.y)
        }
    }
}

viewInfo[5] = {
    name: "brth",
    pixel: function (pixel, ctx) {
        if (elements[pixel.element].isCell === true) {
            var stat = pixel.breath
            var ratio = stat / 3000
            if (ratio < 0) ratio = 0
            if (ratio > 1) ratio = 1
            var hue = Math.round(ratio * 180)
            drawSquare(ctx, `hsl(${hue},100%,50%)`, pixel.x, pixel.y)
        }
    }
}

viewInfo[6] = {
    name: "wste",
    pixel: function (pixel, ctx) {
        if (elements[pixel.element].properties?.waste !== undefined) {
            let stat = pixel.waste || 1
            let ratio = Math.log(stat) / Math.log(500)
            if (ratio < 0) ratio = 0
            if (ratio > 1) ratio = 1
            let hue = 120 - Math.round(ratio * 120)
            drawSquare(ctx, `hsl(${hue},100%,50%)`, pixel.x, pixel.y)
        }
    }
}

function baseCellTick(px) {
    if (!elements[px.element].isCell) { return }

    if (px.energy > 3000) { px.energy = 3000 }
    if (px.breath > 3000) { px.breath = 3000 }

    if (!px.static && Math.random() < 0.115) {
        px.energy -= 2
        px.breath -= 2
    }

    if (px.energy < 1 || px.breath < 1 || (px.waste > 500 && px.element !== "urocyte") || px.waste > 3000) {
        changePixel(px, "infection")
        return
    }

    const ns = getNeighbors(px)
    ns.forEach(n => {
        if (!elements[n.element].isCell) { return }

        if (n.energy < px.energy) {
            let transfer = (px.energy - n.energy) / 4
            transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
            px.energy -= transfer
            n.energy += transfer
        } else if (n.energy > px.energy) {
            let transfer = (n.energy - px.energy) / 4
            transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
            px.energy += transfer
            n.energy -= transfer
        }

        if (n.breath < px.breath) {
            let transfer = (px.breath - n.breath) / 4
            transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
            px.breath -= transfer
            n.breath += transfer
        } else if (n.breath > px.breath) {
            let transfer = (n.breath - px.breath) / 4
            transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
            px.breath += transfer
            n.breath -= transfer
        }

    })
}

elements.chlorocyte = { // generates energy per air pixel next to it
    color: ["#00ff00", "#00a500", "#008a00", "#26a026", "#3eff3e"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 1
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        px.energy += (4 - getNeighbors(px).length) * 3
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "steam", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "ice", "sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "nutrients",
    breakInto: ["water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 },
        sugar: undefined,
        sugar_water: undefined,
    },
    movable: false
}

elements.fermentocyte = { // stores and ferments sugar into energy
    color: "#FF6F3C",
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 1,
        waste: 0,
        sugar: 0
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        if (px.sugar + 1 < 5) {
            const ns = getNeighbors(px)
            for (let n of ns) {
                if (n.element == "sugar") {
                    deletePixel(n.x, n.y)
                    px.sugar++
                    break
                }
            }
        }
        if (px.sugar) {
            px.sugar -= 0.0034
            px.energy += 50
            px.waste += 0.5
            if (px.sugar < 0) { px.sugar = 0 }
        }
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "steam", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "ice", "sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "nutrients",
    breakInto: ["sugar_water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 },
        sugar: undefined,
        sugar_water: undefined,
    },
    movable: false
}

elements.urocyte = {
    color: "#927d07",
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        waste: 0,
        inWaste: true,
        transfer: 1
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        if (px.waste >= 400) {
            if (isEmpty(px.x, px.y + 1)) {
                createPixel("waste", px.x, px.y + 1)
                px.waste -= 400
            } else if (isEmpty(px.x + 1, px.y)) {
                createPixel("waste", px.x + 1, px.y)
                px.waste -= 400
            } else if (isEmpty(px.x - 1, px.y)) {
                createPixel("waste", px.x - 1, px.y)
                px.waste -= 400
            }
        }
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "steam", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "ice", "sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "waste",
    breakInto: ["water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 },
        sugar: undefined,
        sugar_water: undefined,
    },
    movable: false
}

elements.root = { // stores water and converts it into energy
    color: ["#fff0c0", "#bba86c"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 2,
        water: 0
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        const ns = getNeighbors(px)
        ns.forEach(n => {
            if (n.element == "water") {
                deletePixel(n.x, n.y)
                px.water += 2
            } else if (n.element == "root") {
                if (n.energy < px.energy) {
                    let transfer = (px.energy - n.energy) / 4
                    transfer = Math.floor(Math.min(transfer, 40 / 2))
                    px.energy -= transfer
                    n.energy += transfer
                } else if (n.energy > px.energy) {
                    let transfer = (n.breath - px.breath) / 4
                    transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
                    px.energy += transfer
                    n.energy -= transfer
                }

                if (n.breath < px.breath) {
                    let transfer = (px.breath - n.breath) / 4
                    transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
                    px.breath -= transfer
                    n.breath += transfer
                } else if (n.breath > px.breath) {
                    let transfer = (n.breath - px.breath) / 4
                    transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
                    px.breath += transfer
                    n.breath -= transfer
                }
            } else if (n.element == "sugar_water") {
                deletePixel(n.x, n.y)
                px.water += 3
            } else if (n.element == "mud") {
                changePixel(n, "dirt")
                px.water += 5
            } else if (n.element == "wet_sand") {
                changePixel(n, "sand")
                px.water += 5
            } else if (n.element == "dirt" && Math.random() < 0.075) {
                px.water += 1
            } else if (n.element == "sand" && Math.random() < 0.025) {
                px.water += 1
            }
        })
        if (px.water > 0 && Math.random() < 0.185) {
            px.water -= 1
            px.energy += 15
            if (px.water < 0) { px.water = 0 }
        }
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "steam", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "ice", "sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "nutrients",
    breakInto: ["sugar_water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 },
        sugar: undefined,
        sugar_water: undefined,
    },
    movable: false,
    isFood: true
}

elements.lipocyte = { // stores excess energy for later use
    color: "#FFE680",
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 30,
        fat: 0
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        if (px.energy >= 1300 && px.fat < 18) {
            px.energy -= 1000
            px.fat += 1
        } else if (px.energy <= 300 && px.fat > 0 && Math.random() < 0.1875) {
            px.fat -= 1
            px.energy += 1000
        }
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "steam", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "ice", "sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "nutrients",
    breakInto: ["sugar_water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 },
        sugar: undefined,
        sugar_water: undefined,
    },
    movable: false
}

elements.aerocyte = { // generates breath out of energy
    color: "#66ccff",
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        waste: 0,
        transfer: 30,
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        if (px.energy >= 305 && px.breath <= 1995) {
            px.energy -= 5
            px.breath += 5
            px.waste += 0.075
        }

        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "steam", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "ice", "sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "breathing",
    breakInto: ["sugar_water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 },
        sugar: undefined,
        sugar_water: undefined,
    },
    movable: false
}

elements.respira = { // just like chlorocyte, but for breath
    color: ["#8888ff"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 1
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        px.breath += (4 - getNeighbors(px).length) * 3
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "steam", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "ice", "sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "breathing",
    breakInto: ["water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 },
        sugar: undefined,
        sugar_water: undefined,
    },
    movable: false
}

elements.vena = { // transfers energy when powered
    color: ["#a85e5e"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 0,
        static: false,
        waste: 0
    },
    conduct: 1,
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        if (px.charge) {
            px.transfer = 500
            px.static = true
        } else {
            px.transfer = 0
            px.static = false
        }

        if (px.energy > 3000) { px.energy = 3000 }
        if (px.breath > 3000) { px.breath = 3000 }

        if (!px.static && Math.random() < 0.115) {
            px.energy -= 2
            px.breath -= 2
        }

        if (px.energy < 1 || px.breath < 1 || (px.waste > 500 && px.element !== "urocyte") || px.waste > 3000) {
            changePixel(px, "infection")
            return
        }

        const ns = getNeighbors(px)
        ns.forEach(n => {
            if (!elements[n.element].isCell) { return }

            if (n.energy < px.energy) {
                let transfer = (px.energy - n.energy) / 4
                transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
                px.energy -= transfer
                n.energy += transfer
            } else if (n.energy > px.energy) {
                let transfer = (n.energy - px.energy) / 4
                transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
                px.energy += transfer
                n.energy -= transfer
            }

            if (n.breath < px.breath) {
                let transfer = (px.breath - n.breath) / 4
                transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
                px.breath -= transfer
                n.breath += transfer
            } else if (n.breath > px.breath) {
                let transfer = (n.breath - px.breath) / 4
                transfer = Math.floor(Math.min(transfer, (px.transfer + n.transfer) / 2))
                px.breath += transfer
                n.breath -= transfer
            }

            if (n.waste !== undefined) {
                if (n.inWaste) {
                    let transfer = Math.max(1, Math.floor(Math.min(px.waste / 4, (px.transfer + n.transfer) / 2)))
                    if (px.waste >= transfer) {
                        px.waste -= transfer
                        n.waste += transfer
                    }
                } else {
                    if (n.waste < px.waste) {
                        let transfer = Math.max(1, Math.min((px.waste - n.waste) / 4, (px.transfer + n.transfer) / 2))
                        px.waste -= transfer
                        n.waste += transfer
                    } else if (n.waste > px.waste) {
                        let transfer = Math.max(1, Math.min((n.waste - px.waste) / 4, (px.transfer + n.transfer) / 2))
                        px.waste += transfer
                        n.waste -= transfer
                    }
                }
            }
        })
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "sugar_water", "sugar_water"],
    tempLow: -2,
    stateLow: ["ice", "ice", "sugar_ice", "sugar_ice"],
    state: "solid",
    density: 1010,
    category: "structural",
    breakInto: ["sugar_water", "sugar_water", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 },
        sugar: undefined,
        sugar_water: undefined,
    },
    movable: false
}

elements.neurocell = { // powers up venas
    color: ["#5e5fa8"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 50,
        cd: 1
    },
    conduct: 1,
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        px.cd--
        if (px.cd < 1) {
            px.cd = 20
            px.charge = 1
        }
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "sugar_water", "sugar_water"],
    tempLow: -2,
    stateLow: ["ice", "ice", "sugar_ice", "sugar_ice"],
    state: "solid",
    density: 1010,
    category: "structural",
    breakInto: ["sugar_water", "sugar_water", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 },
        sugar: undefined,
        sugar_water: undefined,
    },
    movable: false
}

elements.waste = { // urocyte excretes this
    color: "#5f9102",
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "waste",
    stateHigh: "stench",
    burn: 20,
    isFood: true,
    burnTime: 150,
    burnInto: "stench",
    tempHigh: 120,
    stateLow: "slime_ice",
    tempLow: 0,
    density: 1465,
    viscosity: 5000
}

elements.mucus = { // light protective layer
    color: "#aff036",
    behavior: [
        "XX|SA|XX",
        "SA|DL%1|XX",
        "XX AND M2|SA AND M1|XX AND M2"
    ],
    state: "liquid",
    category: "protection",
    stateHigh: "steam",
    tempHigh: 120,
    stateLow: "slime_ice",
    tempLow: 0,
    density: 1400,
    viscosity: 5000
}

elements.toxic_mucus = { // toxic protective layer, eats bugs for energy
    color: "#58046d",
    behavior: [
        "XX|SA|XX",
        "SA|DL%1|XX",
        "XX AND M2|SA AND M1|XX AND M2"
    ],
    tick: (px) => {
        const ns = getNeighbors(px)
        energy = 0
        ns.forEach(n => {
            if (["ant", "fly", "spider", "worm", "flea", "rat", "frog", "tadpole", "fish", "slug", "snail"].includes(n.element)) {
                deletePixel(n.x, n.y)
                energy++
            } else if (n.element == "mucotoxin" && energy > 0) {
                energy--
                n.waste += 0.6
                n.energy += 3000
            }
        })
    },
    state: "liquid",
    category: "protection",
    stateHigh: "steam",
    tempHigh: 120,
    stateLow: "slime_ice",
    tempLow: 0,
    density: 1400,
    viscosity: 5000
}

elements.slimecoat = { // generates mucus
    color: ["#5a4606"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 0
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        const ns = getNeighbors(px)
        let change = (ns.length == 4)
        if (change) {
            ns.forEach(n => {
                if (n.element == ("mucus" || "toxic_mucus" || "slimecoat")) {
                    change = false
                }
            })
        }
        if (change) {
            changePixel(px, "stem_cell")
            return
        }
        if (isEmpty(px.x - 1, px.y)) {
            createPixel("mucus", px.x - 1, px.y)
        }
        if (isEmpty(px.x + 1, px.y)) {
            createPixel("mucus", px.x + 1, px.y)
        }
        if (isEmpty(px.x, px.y - 1)) {
            createPixel("mucus", px.x, px.y - 1)
        }
        if (isEmpty(px.x, px.y + 1)) {
            createPixel("mucus", px.x, px.y + 1)
        }
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 250,
    stateHigh: "steam",
    state: "solid",
    density: 1800,
    insulate: true,
    category: "protection",
    breakInto: ["tin", "dna", "dna"],
    movable: false
}

elements.mucotoxin = { // generates toxic mucus
    color: ["#5a2806"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        waste: 0,
        transfer: 0
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        const ns = getNeighbors(px)
        let change = (ns.length == 4)
        if (change) {
            ns.forEach(n => {
                if (n.element == ("mucus" || "toxic_mucus" || "mucotoxin")) {
                    change = false
                }
            })
        }
        if (isEmpty(px.x - 1, px.y)) {
            createPixel("toxic_mucus", px.x - 1, px.y)
        }
        if (isEmpty(px.x + 1, px.y)) {
            createPixel("toxic_mucus", px.x + 1, px.y)
        }
        if (isEmpty(px.x, px.y - 1)) {
            createPixel("toxic_mucus", px.x, px.y - 1)
        }
        if (isEmpty(px.x, px.y + 1)) {
            createPixel("toxic_mucus", px.x, px.y + 1)
        }
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 250,
    stateHigh: "molten_tin",
    state: "solid",
    density: 1800,
    insulate: true,
    category: "protection",
    breakInto: ["tin", "dna", "dna"],
    movable: false
}

elements.carapace = { // heat-resistant, cancer/infection proof shell
    color: ["#46065a"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 0
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (pixel) => {
        if (getNeighbors(pixel).length == 4) { changePixel(pixel, "stem_cell"); return }
        baseCellTick(pixel)
        doDefaults(pixel)
        if (!isEmpty(pixel.x, pixel.y - 1, true)) { // Everything after this in the tick function is from biology.js, make sure to check it out too!
            var hitPixel = pixelMap[pixel.x][pixel.y - 1]
            if (elements[hitPixel.element].isCell != true && Math.random() > 0.5) {
                if (hitPixel.temp > pixel.temp) {
                    hitPixel.temp--
                    pixel.temp++
                }
            }
        }
        if (!isEmpty(pixel.x, pixel.y + 1, true)) {
            var hitPixel = pixelMap[pixel.x][pixel.y + 1]
            if (elements[hitPixel.element].isCell != true && Math.random() > 0.5) {
                if (hitPixel.temp > pixel.temp) {
                    hitPixel.temp--
                    pixel.temp++
                }
            }
        }
        if (!isEmpty(pixel.x - 1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x - 1][pixel.y]
            if (elements[hitPixel.element].isCell != true && Math.random() > 0.5) {
                if (hitPixel.temp > pixel.temp) {
                    hitPixel.temp--
                    pixel.temp++
                }
            }
        }
        if (!isEmpty(pixel.x + 1, pixel.y, true)) {
            var hitPixel = pixelMap[pixel.x + 1][pixel.y]
            if (elements[hitPixel.element].isCell != true && Math.random() > 0.5) {
                if (hitPixel.temp > pixel.temp) {
                    hitPixel.temp--
                    pixel.temp++
                }
            }
        }
        doDefaults(pixel);
        if (pixel.temp > 250) {
            changePixel(pixel, "molten_tin", 250)
        }
    },
    tempHigh: 250,
    stateHigh: "steam",
    state: "solid",
    density: 1800,
    insulate: true,
    category: "protection",
    breakInto: ["tin", "dna", "dna"],
    movable: false
}

elements.phagocyte = { // turns cancer and infection into stem cells
    color: ["#a3d9a6"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 0
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        if (Math.random() < 0.35) {
            const coords = circleCoords(px.x, px.y, 3)
            coords.forEach(coord => {
                if (!isEmpty(coord.x, coord.y)) {
                    const n = pixelMap[coord.x][coord.y]
                    if (n.element === "infection" || n.element === "cancer" || n.element === "poison") {
                        if (Math.random() < 0.35) {
                            changePixel(n, "stem_cell")
                        }
                    }
                }
            })
        }
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "sugar", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "sugar_ice", "sugar_ice"],
    state: "solid",
    density: 1010,
    category: "protection",
    breakInto: ["dna", "sugar", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem2: "stem_cell", chance: 0.055 },
        infection: { elem2: "stem_cell", chance: 0.075 },
        poison: { elem2: "stem_cell", chance: 0.025 },
        sugar: undefined,
        sugar_water: undefined,
    },
    movable: false
}

elements.stem_cell = { // turns into the first cell it touches
    color: ["#c0c0c0"],
    behavior: behaviors.LIQUID,
    noMix: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        const ns = getNeighbors(px)
        if (ns.length > 0) {
            const elem = ns[Math.floor(Math.random() * ns.length)].element
            if (elements[elem].isCell && elem !== "phagocyte") {
                changePixel(px, elem)
            }
        }
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "sugar", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "sugar_ice", "sugar_ice"],
    state: "solid",
    density: 1010,
    category: "structural",
    breakInto: ["dna", "sugar", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 },
        sugar: undefined,
        sugar_water: undefined,
    }
}

elements.cancer.reactions.chlorocyte = { elem2: "cancer", chance: 0.005 }
elements.cancer.reactions.respira = { elem2: "cancer", chance: 0.005 }
elements.cancer.reactions.neurocell = { elem2: "cancer", chance: 0.005 }
elements.cancer.reactions.vena = { elem2: "cancer", chance: 0.005 }
elements.cancer.reactions.fermentocyte = { elem2: "cancer", chance: 0.005 }
elements.cancer.reactions.root = { elem2: "cancer", chance: 0.005 }
elements.cancer.reactions.lipocyte = { elem2: "cancer", chance: 0.005 }
elements.cancer.reactions.slimecoat = { elem2: "cancer", chance: 0.005 }
elements.cancer.reactions.mucotoxin = { elem2: "cancer", chance: 0.005 }
elements.cancer.reactions.aerocyte = { elem2: "cancer", chance: 0.005 }
elements.cancer.reactions.urocyte = { elem2: "cancer", chance: 0.005 }

elements.infection.reactions.chlorocyte = { elem2: "infection", chance: 0.0015 }
elements.infection.reactions.respira = { elem2: "infection", chance: 0.0015 }
elements.infection.reactions.neurocell = { elem2: "infection", chance: 0.0015 }
elements.infection.reactions.vena = { elem2: "infection", chance: 0.0015 }
elements.infection.reactions.fermentocyte = { elem2: "infection", chance: 0.0015 }
elements.infection.reactions.lipocyte = { elem2: "infection", chance: 0.0015 }
elements.infection.reactions.root = { elem2: "infection", chance: 0.0015 }
elements.infection.reactions.slimecoat = { elem2: "infection", chance: 0.0015 }
elements.infection.reactions.mucotoxin = { elem2: "infection", chance: 0.0015 }
elements.infection.reactions.aerocyte = { elem2: "infection", chance: 0.0015 }
elements.infection.reactions.urocyte = { elem2: "infection", chance: 0.0015 }

elements.ant.reactions.waste = { elem2: null, chance: 0.035, func: behaviors.FEEDPIXEL }