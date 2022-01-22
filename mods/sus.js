function createSus(right, top) {
  return {
    color: "#ff0000",
    behavior: [
      `XX|CR:${top} AND CH:${top}|XX`,
      `XX|XX|CR:${right} AND CH:${right}`,
      "XX|XX|XX",
    ],
    category: "special",
    state: "solid",
    density: 6942.0,
    hidden: true,
  }
}
function createSusTop(top) {
  return {
    color: "#ff0000",
    behavior: [
      `XX|CR:${top} AND CH:${top}|XX`,
      `XX|XX|DL`,
      "XX|XX|XX",
    ],
    category: "special",
    state: "solid",
    density: 6942.0,
    hidden: true,
  }
}
function createSusTopRow(right) {
  return {
    color: "#ff0000",
    behavior: [
      `XX|CR:top AND CH:top|XX`,
      `XX|XX|CR:${right} AND CH:${right}`,
      "XX|XX|XX",
    ],
    category: "special",
    state: "solid",
    density: 6942.0,
    hidden: true,
  }
}

elements.sus = createSus("sus2", "sus4")
elements.sus.behavior[2] = "XX|M1|XX"
elements.sus.hidden = false
elements.sus2 = createSus("sus3", "sus5")
elements.sus3 = createSusTop("sus6")
elements.sus4 = createSus("sus5", "sus7")
elements.sus5 = createSus("sus6", "sus8")
elements.sus6 = createSusTop("sus9")
elements.sus7 = createSus("sus8", "susA")
elements.sus8 = createSus("sus9", "susB")
elements.sus9 = createSusTop("susC")
elements.susA = createSusTopRow("susB")
elements.susB = createSusTopRow("susC")
elements.susC = {
  color: "#ff0000",
  behavior: [
    `XX|CR:top AND CH:top|XX`,
    `XX|XX|DL`,
    "XX|XX|XX",
  ],
  category: "special",
  state: "solid",
  density: 6942.0,
  hidden: true,
}
elements.top = {
  color: "#000000",
  behavior: [
    `XX|DL|XX`,
    `XX|DL%5|XX`,
    "XX|XX|XX",
  ],
  category: "special",
  state: "solid",
  density: 6942.0,
  hidden: true,
}

// Colors
elements.sus2.color = "#000000"
elements.sus8.color = "#00ffff"
elements.sus9.color = "#00ffff"

/* 
susA susB susC
sus7 sus8 sus9
sus4 sus5 sus6
sus_ sus2 sus3
*/