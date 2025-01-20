elements.anthranilicacid = {
    color: "#FFFFFF",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    tempHigh: 145,
    stateHigh: "moltenanthranilicacid",
    reactions: {
        "methanol": {elem1: "methylanthranilate", elem2: "methylanthranilate"},
    },
  }
  
  elements.moltenanthranilicacid = {
    color: ["#FFFF99", "#FFFF66", "#FFFF00"],
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    tempLow: 144,
    stateLow: "anthranilicacid",
    tempHigh: 340,
    stateHigh: "anthranilicacidgas",
    temp: 155, 
    viscosity: 10,
  }
  
  elements.anthranilicacidgas = {
    color: "#FEDEFF",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    tempLow: 339,
    stateLow: "moltenanthranilicacid",
    temp: 350,
  }
  
  elements.methanol = {
    color: "#FFE4FF",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 792,
    stateHigh: "methanolgas",
    tempHigh: 65,
    stateLow: "methanolice",
    tempLow: -98,
    burn: 100,
    burnTime: 100,
  }
  
  elements.methanolice = {
    color: "#FFFFFF",
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 822,  
    stateHigh: "methanol",
    temp: -117,
    tempHigh: -97,
  }
  
  elements.methanolgas = {
    color: "#E1E4FF",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 942,
    stateLow: "methanol",
    tempLow: 64,
    temp: 84,  
    burn: 100,
    burnTime: 100,
  }
  elements.methylanthranilate = {
    color: "#FFFBBA",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1120,
    stateHigh: "methylanthranilategas",
    tempHigh: 257,
    stateLow: "methylanthranilateice",
    tempLow: -20,
    reactions: {
        "seltzer": {elem1: "grapesoda", elem2: "grapesoda",}
    }
  }
  
  elements.methylanthranilategas = {
    color: "#FFFBBA",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 1120,
    stateLow: "methylanthranilate",
    tempLow: 256,
    temp: 276,
  }
  elements.methylanthranilateice = {
    color: "#FFFBD7",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 1120,
    stateHigh: "methulanthranilate",
    temphigh: -19,
    temp: -39,
  }
  
  elements.grapesoda = {
    color: "#5B134F",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    density: 1120,
    stateHigh: "grapesodagas",
    tempHigh: 257,
    stateLow: "grapesodaice",
    tempLow: -20,  
  }
  
  elements.grapesodagas = {
    color: "#B99FEA",
    behavior: behaviors.GAS, 
    category: "gases",
    state: "gas",
    density: 1100,
    stateLow: "grapesoda",
    tempLow: 256,
    temp: 257,
  }
  
elements.grapesodaice = {
    color: "#B99FC2",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 1140,
    stateHigh: "grapesoda",
    tempHigh: -19,
    temp: -20,  
  }
