elements.drone ={
  color: "#2e2e2e",
  behavior: [  
    "XX|M1 AND EX:15>explosion|XX",
    "M1 AND EX:15>explosion|XX|M1 AND EX:15>explosion",
    "XX|M1 AND EX:15>explosion|XX",
  ],
  behaviorOn: [
    ["XX","XX","XX"],
    ["XX","EX:15","XX"],
    ["XX","XX","XX"],
  ],
  state: "solid",
  category: "weapons",
  conduct: .23,
  tempHigh: 750,
  stateHigh: "explosion",
  breakInto: ["nickel", "dynamite"],
}
