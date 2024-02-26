elements.sweetwater = {
  color: "#8ae7eb",
  behavior: behaviors.LIQUID,
  category: "liquids",
  state: "liquid",
  reactions: {
    "soda": { elem1: null, elem2: "syrup" }
  },
};

elements.syrup = {
  color: "#d9d2c3",
  behavior: behaviors.LIQUID,
  category: "food",
  state: "liquid",
};

elements.orangesoda = {
  color: "#b8820d",
  behavior: behaviors.LIQUID,
  category: "food",
  state: "liquid",
  reactions: {
    "sugar": { elem1: null, elem2: "syrup" }
  },
};

elements.orange = {
  color: "#eda813",
  behavior: behaviors.POWDER,
  category: "food",
  state: "powder",
  breakInto: "juice",
  reactions: {
    "syrup": { elem1: null, elem2: "orangesoda" }
  },
};
