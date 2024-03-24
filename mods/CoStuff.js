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
                    "head": { elem1:"rotten_meat", chance:0.5 },
                    "body": { elem1:"rotten_meat", chance:0.5 },
                    "human": { elem1:"rotten_meat", chance:0.5 },
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
};
elements.ice_carbon_monoxide = {
         color: "#b5b5b5",
         behavior: behaviors.WALL,
         category: "solids",
         state: "solid",
         density: 1.14,
         tempHigh: -192,
         stateHigh: "liquid_carbon_monoxide", 
}

