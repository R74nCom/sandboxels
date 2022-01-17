elements.test = {
    color: "#ff0000",
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 10,
};
elements.Neutronium = {
    color: "#aaffff",
    behavior: behaviors.POWDER,
    tempHigh: 1000,
    stateHigh: "molten_neutronium",
    category: "energy",
    state: "solid",
    density: 100000000000000000,
};
    elements.Molten_Neutronium = {
    color: "#ffffaa",
    behavior: behaviors.LIQUID,
    temp: 2500,
    tempHigh: 5000,
    stateHigh: "Neutronium_Gas",
    tempLow: 1000,
    stateLow: "Neutronium",
    viscosity: 10,
    category: "energy",
    state: "liquid",
    density: 50000000000000000,
};
    elements.Neutronium_Gas = {  
    color: "#abcdef",
    behavior: behaviors.GAS,
    temp: 6000,
    tempLow: 5000,
    stateLow: "molten_neutronium",
    category: "energy",
    state: "gas",
    density: 0.045,
};
eLists.CONDIMENT = ["ketchup","melted_cheese","mayo","mayonnaise","fry_sauce","chocolate_syrup","mustard","honey"];
behaviors.CONDIMENT_DESTROYER = [
""DL:"+eLists.CONDIMENT"|"DL:"+eLists.CONDIMENT"|"DL:"+eLists.CONDIMENT"",
""DL:"+eLists.CONDIMENT" AND M2|XX|"DL:"+eLists.CONDIMENT" AND M2",
"DL:"+eLists.CONDIMENT" AND M1|"DL:"+eLists.CONDIMENT" AND M1|"DL:"+eLists.CONDIMENT" AND M1",
];
elements.Condiment_Destroyer = {
    color: "ffff00, ff0000",
    behavior: behaviors.CONDIMENT_DESTROYER
    category: "testing",
    state: "liquid",
    density: 1000,
};
