elements.sweetwater = {
  color: "#8ae7eb",
  behavior: behaviors.liquid,
  category: "liquids",
  state: "solid",
  reactions: {
    "soda": { elem1: null, elem2: "syrup" }
  },
};

elements.syrup = {
  color: "#d9d2c3",
  behavior: behaviors.liquid,
  category: "food",
  state: "solid",
};

elements.orangesoda = {
  color: "#b8820d",
  behavior: behaviors.liquid,
  category: "food",
  state: "solid",
  reactions: {
    "sugar": { elem1: null, elem2: "syrup" }
  },
};

elements.orange = {
  color: "#eda813",
  behavior: behaviors.powder,
  category: "food",
  state: "solid",
  breakInto: "juice",
  reactions: {
    "syrup": { elem1: null, elem2: "orangesoda" }
  },
};
