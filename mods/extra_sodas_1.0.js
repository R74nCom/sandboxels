elements.sweetener = {
    color: "#ffffff",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "M2|M1 AND SW:liquids|M2",
],
    category: "extraSodas",
    state: "liquid",
    density: 1240,
    viscosity: 25000,
    reactions: {
    "seltzer": { elem1:null, elem2:"colorlessSugarFreeSoda"}
},
}
elements.sugarFreeSoda = {
    name: "Sugar Free Soda",
    color: "#4F3424",
    behavior: [
    "XX|CR:foam%5|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "extraSodas",
    state: "liquid",
    density: 150,
    viscosity: 2000,
    stateHigh: "carbon_dioxide",
    tempHigh: 50,
    stateLow: "sugarFreeSodaIce",
    tempLow: -1,
}
elements.sugarFreeSodaIce = {
    name: "Sugar Free Soda Ice",
    color: "#593E2E",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    category: "extraSodas",
    state: "solid",
    density: 250,
    viscosity: 15000,
    stateHigh: "sugarFreeSoda",
    tempHigh: 10,
}
elements.colorant = {
    color: "#4F3424",
    behavior: [
    "CC:4F3424|CC:4F3424|CC:4F3424",
    "M2 AND CC:4F3424|XX|M2 AND CC:4F3424",
    "M2 AND CC:4F3424|M1 AND SW:liquids AND CC:4F3424|M2 AND CC:4F3424",
],
    category: "extraSodas",
    state: "liquid",
    density: 997,
    viscosity: 25000,
    stateLow: "freezedColorant",
    tempLow: -1,
}
elements.bSoda = {
    color: "#0000ff",
    behavior: [
    "XX|XX|XX",
    "BO|XX|BO AND M1",
    "XX|XX|XX",
],
    category: "extraSodas",
    state: "liquid",
    density: 250,
    viscosity: 15000,
}
elements.dietBSoda = {
    name: "Diet BSoda",
    color: "#5555ff",
    behavior: [
    "XX|XX|XX",
    "BO|XX|BO AND M1",
    "XX|XX|XX",
],
    category: "extraSodas",
    state: "liquid",
    density: 250,
    viscosity: 15000,
}
elements.colorlessSugarFreeSoda = {
    name: "Colorless Sugar Free Soda",
    color: "#DCDCDC",
    behavior: [
    "XX|CR:foam%5|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "extraSodas",
    state: "liquid",
    density: 150,
    viscosity: 2000,
    stateHigh: "carbon_dioxide",
    tempHigh: 50,
    stateLow: "colorlessSugarFreeSodaIce",
    tempLow: -1,
    reactions: {
    "colorant": { elem1:null, elem2:"sugarFreeSoda"}
},
}
elements.colorlessSugarFreeSodaIce = {
    name: "Colorless Sugar Free Soda Ice",
    color: "#E6E6E6",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    category: "extraSodas",
    state: "solid",
    density: 250,
    viscosity: 15000,
    stateHigh: "colorlessSugarFreeSoda",
    tempHigh: 10,
}
elements.grapeSoda = {
    name: "Grape Soda",
    color: "#6F2DA8",
    behavior: [
    "XX|CR:foam%5|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "extraSodas",
    state: "liquid",
    density: 173,
    viscosity: 2000,
    stateHigh: "grape",
    tempHigh: 50,
    stateLow: "grapeSodaIce",
    tempLow: -1,
}
elements.grapeSodaIce = {
    name: "Grape Soda Ice",
    color: "#7937B2",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    category: "extraSodas",
    state: "solid",
    density: 273,
    viscosity: 15050,
    stateHigh: "grapeSoda",
    tempHigh: 10,
}
elements.orange = {
    color: "#FE9900",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "M2|M1|M2",
],
    category: "food",
    state: "solid",
    density: 465,
    viscosity: 200,
    stateHigh: "fire",
    tempHigh: 50,
}
elements.freezedColorant = {
    name: "Freezed Colorant",
    color: "#593E2E",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    category: "extraSodas",
    state: "solid",
    density: 250,
    viscosity: 15000,
    stateHigh: "colorant",
    tempHigh: 10,
}
elements.orangeJuice = {
    name: "Orange juice",
    color: "#FE9900",
    behavior: [
    "XX|XX|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "liquids",
    state: "liquid",
    density: 1823,
    viscosity: 30000,
    stateHigh: "fire",
    tempHigh: 50,
    stateLow: "freezedOrangeJuice",
    tempLow: -1,
    reactions: {
    "soda": { elem1:null, elem2:"orangeSoda"}
},
}
elements.orangeSoda = {
    name: "Orange Soda",
    color: "#FE9900",
    behavior: [
    "XX|CR:foam%5|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "extraSodas",
    state: "liquid",
    density: 173,
    viscosity: 20000,
    stateHigh: "foam",
    tempHigh: 50,
    stateLow: "orangeSodaIce",
    tempLow: -1,
}
elements.orangeSodaIce = {
    name: "Orange Soda Ice",
    color: "#FEA30A",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    category: "extraSodas",
    state: "solid",
    density: 273,
    viscosity: 10027,
    stateHigh: "orangeSoda",
    tempHigh: 10,
}
elements.chuckysPunch = {
    name: "Chucky's Punch (Fanta)",
    color: "#ff9999",
    behavior: [
    "XX|CR:foam%5|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "iRLLimitedSodas",
    state: "liquid",
    density: 173,
    viscosity: 20000,
    stateHigh: "steam",
    tempHigh: 50,
}
elements.freddyOrangeSoda = {
    name: "Orange Soda (Freddy, Fanta)",
    color: "#FE9900",
    behavior: [
    "XX|CR:foam%5|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "iRLLimitedSodas",
    state: "liquid",
    density: 173,
    viscosity: 20000,
    stateHigh: "foam",
    tempHigh: 50,
    stateLow: "orangeSodaIce",
    tempLow: -1,
}
elements.mimyPineappleSoda = {
    name: "Pineapple Soda (Michael Myers, Fanta)",
    color: "#FE9945",
    behavior: [
    "XX|CR:foam%5|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "iRLLimitedSodas",
    state: "liquid",
    density: 173,
    viscosity: 20000,
    stateHigh: "foam",
    tempHigh: 50,
}
elements.tgStrawberrySoda = {
    name: "Strawberry Soda (The Grabber, Fanta)",
    color: "#ff0000",
    behavior: [
    "XX|CR:foam%5|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "iRLLimitedSodas",
    state: "liquid",
    density: 173,
    viscosity: 20000,
    stateHigh: "steam",
    tempHigh: 50,
}
elements.oreoSoda = {
    name: "Oreo Soda (Coca-Cola)",
    color: "#252525",
    behavior: [
    "XX|CR:foam%5|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "iRLLimitedSodas",
    state: "liquid",
    density: 173,
    viscosity: 20000,
    stateHigh: "steam",
    tempHigh: 50,
}
elements.starWarsSoda = {
    name: "Star wars Soda (Coca-Cola)",
    color: "#4F3424",
    behavior: [
    "XX|CR:foam%5|XX",
    "M2|XX|M2",
    "M2|M1|M2",
],
    category: "iRLLimitedSodas",
    state: "liquid",
    density: 150,
    viscosity: 2000,
    stateHigh: "carbon_dioxide",
    tempHigh: 50,
    stateLow: "sugarFreeSodaIce",
    tempLow: -1,
}