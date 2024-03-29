elements.carbon_monoxide = {
      color: "#b5b5b5",
      behavior: behaviors.GAS,
      behaviorOn: [
        "XX|XX|XX",
        "XX|CH:fire|XX",
        "XX|XX|XX",
    ],
      category: "gases",
      state: "gas",
      density: 1.14,
      burn: 75,
      tempHigh: 609,
      stateHigh: "fire",
      tempLow: -192,
      stateLow: "liquid_carbon_monoxide",
      burntime: 5,
      fireColor: "#ebba34",
      reactions: {
                    "head": { elem2:"rotten_meat", chance:0.5 },
                    "body": { elem2:"rotten_meat", chance:0.5 },
                    "human": { elem2:"rotten_meat", chance:0.5 },
                 }
};
elements.liquid_carbon_monoxide = {
         color: "#b5b5b5",
         behavior: behaviors.LIQUID,
         category: "liquids",
         state: "liquid",
         density: 1.14,
         tempHigh: 190,
         tempLow: -199,
         stateLow: "ice_carbon_monoxide",
         stateHigh: "carbon_monoxide", 
         temp: -192,
};
elements.ice_carbon_monoxide = {
         color: "#b5b5b5",
         behavior: behaviors.WALL,
         category: "solids",
         state: "solid",
         density: 1.14,
         tempHigh: -192,
         stateHigh: "liquid_carbon_monoxide", 
         temp: -199,
};
elements.cpu = {
         color: "#575757",
         behavior: behaviors.SOLID,
         category: "machines",
         state: "solid",
         density: 75,
         tempHigh: 1414,
         stateHigh: "explosion",
reactions: {
                    "virus": { elem1 : null , elem2:"malware", chance:0.9 },
                    "battery": { elem2:"computer" },
                    
                 }
};

elements.computer = {
         color: "#2b2b2a",
         behavior: behaviors.SOLID,
         category: "machines",
         state: "solid",
         density: 8908,
         tempHigh: 1414,
         stateHigh: "explosion",
 reactions: {
                    "virus": { elem1 : null , elem2:"malware", chance:0.9 },
                    "water": { elem1: null , elem2: "electric" },                    
                 }
};
elements.carbon_monoxide_detector = {
      behavior: behaviors.WALL,
      desc: "give red light and electric when found Carbon Monoxide touch",
      color: "#ffffff",
      reactions: {
      "carbon_monoxide": {"charge1":1},   
      },
      conduct: 1,
      tempHigh: 1550,
      stateHigh: ["molten_metal_scrap","electric","molten_plastic"],
      colorOn: "#ff0000",
      movable: false,
      category:"machines",
      darkText: true,
      hardness: 1,
};
