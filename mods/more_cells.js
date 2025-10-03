viewInfo[4] = { // energy view
    name: "enrg",
    pixel: function (pixel, ctx) {
        if (elements[pixel.element].isCell === true) {
            var stat = pixel.energy
            var ratio = Math.log(stat) / Math.log(3000)
            var hue = Math.round(ratio * 240)
            if (hue < 0) hue = 0
            if (hue > 240) hue = 240
            drawSquare(ctx, `hsl(${hue},100%,50%)`, pixel.x, pixel.y)
        }
    }
}

viewInfo[5] = { // breath view
    name: "brth",
    pixel: function (pixel, ctx) {
        if (elements[pixel.element].isCell === true) {
            var stat = pixel.breath
            var ratio = Math.log(stat) / Math.log(3000)
            var hue = Math.round(ratio * 240)
            if (hue < 0) hue = 0
            if (hue > 240) hue = 240
            drawSquare(ctx, `hsl(${hue},100%,50%)`, pixel.x, pixel.y)
        }
    }
}


function baseCellTick(px) {
    if (!elements[px.element].isCell) { return }

    if (px.energy > 3000) { px.energy = 3000 }
    if (px.breath > 3000) { px.breath = 3000 }

    if (!px.static && Math.random() < 0.115) {
        px.energy--
        px.breath--
    }

    if (px.energy < 1 || px.breath < 1) {
        changePixel(px, "cancer")
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
        }

        if (n.breath < px.breath) {
            let transfer = Math.floor((px.breath - n.breath) / 4)
            transfer = Math.min(transfer, (px.transfer + n.transfer) / 2)
            px.breath -= transfer
            n.breath += transfer
        }

    })
}

elements.chlorocyte = {
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
    category: "cells",
    breakInto: ["water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 }
    }
}

elements.nucleolyte = {
    color: "#FF6F3C",
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
        const ns = getNeighbors(px)
        for (let n of ns) {
            if (n.element == "vena" && n.charge) {
                px.breath += 80
                px.energy += 80
                break
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
    category: "cells",
    breakInto: ["sugar_water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 }
    }
}

elements.respira = {
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
    category: "cells",
    breakInto: ["water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 }
    }
}

elements.structura = {
    color: ["#535353"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 0,
        static: true,
    },
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "steam", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "ice", "sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "cells",
    breakInto: ["water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 }
    }
}

elements.vena = {
    color: ["#a85e5e"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 0,
        static: false,
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
            transfer = 0
            px.static = false
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
    category: "cells",
    breakInto: ["sugar_water", "sugar_water", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 }
    }
}

elements.neurocell = {
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
    category: "cells",
    breakInto: ["sugar_water", "sugar_water", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 }
    }
}

elements.insulon = {
    color: ["#cadf7e"],
    behavior: behaviors.WALL,
    noMix: true,
    properties: {
        energy: 300,
        breath: 300,
        transfer: 1
    },
    conduct: 1,
    isCell: true,
    hoverStat: function (px) {
        return `E:${px.energy} B:${px.breath}`
    },
    tick: (px) => {
        if (px.temp > 20) {
            px.temp -= 6
        }
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 300,
    stateHigh: ["steam", "steam", "steam", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "ice", "sugar_ice"],
    state: "solid",
    density: 1000.1,
    category: "cells",
    breakInto: ["water", "dna", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 }
    }
}

elements.carapace = {
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
    tick: (px) => {
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 1200,
    stateHigh: ["steam", "molten_copper", "steam", "sugar"],
    state: "solid",
    density: 1800,
    category: "cells",
    breakInto: ["water", "oxidized_copper", "dna", "dna"],
}

elements.phagocyte = {
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
        baseCellTick(px)
        doDefaults(px)
    },
    tempHigh: 102,
    stateHigh: ["steam", "steam", "sugar", "sugar"],
    tempLow: -2,
    stateLow: ["ice", "ice", "sugar_ice", "sugar_ice"],
    state: "solid",
    density: 1010,
    category: "cells",
    breakInto: ["dna", "sugar", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem2: "stem_cell", chance: 0.055 },
        infection: { elem2: "stem_cell", chance: 0.075 },
        poison: { elem2: "stem_cell", chance: 0.025 },
    }
}

elements.stem_cell = {
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
            if (elements[elem].isCell) {
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
    category: "cells",
    breakInto: ["dna", "sugar", "dna", "dna"],
    reactions: {
        ...elements.cell.reactions,
        cancer: { elem1: "cancer", chance: 0.005 }
    }
}

elements.cancer.reactions.chlorocyte = { elem2: "cancer", chane: 0.005 }
elements.cancer.reactions.respira = { elem2: "cancer", chane: 0.005 }
elements.cancer.reactions.insulon = { elem2: "cancer", chane: 0.005 }
elements.cancer.reactions.neurocell = { elem2: "cancer", chane: 0.005 }
elements.cancer.reactions.vena = { elem2: "cancer", chane: 0.005 }

elements.infection.reactions.chlorocyte = { elem2: "infection", chane: 0.0015 }
elements.infection.reactions.respira = { elem2: "infection", chane: 0.0015 }
elements.infection.reactions.insulon = { elem2: "infection", chane: 0.0015 }
elements.infection.reactions.neurocell = { elem2: "infection", chane: 0.0015 }
elements.infection.reactions.vena = { elem2: "infection", chane: 0.0015 }