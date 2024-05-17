elements.explodeinator = {
  color: "#ff0000",
  behaviorOn: behaviors.WALL,
  behavior: [
    "CR:wall|CR:wall|CR:wall|CR:wall|CR:wall",
    "XX|DL|CR:beamcr|CR:wire|CR:wall",
    "CR:wall|CR:wall|CR:wire|CR:wire|CR:wire|CR:sensor"
  ],
  category: "lab",
  state: "solid",
};
elements.explodeinator_beam = {
    color: "#ff0000",
    behavior: [
        "XX|XX|XX",
        "XX|DL%0.25|XX",
        "XX|XX|XX",
    ],
    tick: behaviors.BOUNCY,
    reactions: {
      "head": { "elem2":"explosion", "chance": 100 },
      "body": { "elem2":"explosion", "chance": 100 },
    },
    temp: 35,
    tempLow: -273,
    stateLow: ["liquid_light",null],
    stateLowColorMultiplier: 0.8,
    breakInto: "light",
    breakIntoColor: "#ffcfcf",
    category: "energy",
    state: "gas",
    density: 0.00001,
    ignoreAir: true
};
elements.beamcr = {   
  behavior: behaviors.WALL,
  behaviorOn: [
    "XX|XX|XX",
    "CR:explodeinator_beam|XX|XX",
    "XX|XX|XX",
  ],
  color: "#fadecd",
  category: "machines",
  conduct: 1
}
