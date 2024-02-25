elements.candypowder = {
  color: "#cffaf1",
  behavior: behaviors.POWDER,
  category: null,
  state: "solid",
};

elements.lemon = {
  color: "#fcc603",
  behavior: behaviors.POWDER,
  category: "food",
  state: "solid",
  breakInto: "juice",
  reactions: {
    "sugar": { elem1: null, elem2: "candypowder" }
  },
};
