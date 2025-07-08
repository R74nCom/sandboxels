elements.idly = {
  color: "#f5f5dc",
  behavior: behaviors.STILL,
  category: "food",
  state: "solid",
  tempHigh: 100,
  stateHigh: "burnt_idly",
};

elements.burnt_idly = {
  color: "#3c3c3c",
  behavior: behaviors.STILL,
  category: "food",
  state: "solid",
};

elements.sambar = {
  color: "#c26d27",
  behavior: behaviors.LIQUID,
  category: "liquids",
  tempHigh: 150,
  stateHigh: "steam",
  viscosity: 10,
  state: "liquid",
};

elements.biriyani = {
  color: "#e3c565",
  behavior: [
    "M1|M1|M1",
    "M1|XX|M1",
    "M1|M1|M1"
  ],
  burn: 20,
  burnTime: 100,
  category: "food",
  tempHigh: 120,
  stateHigh: "burnt_rice"
};

elements.burnt_rice = {
  color: "#4b3621",
  behavior: behaviors.STILL,
  category: "food",
  state: "solid"
};
