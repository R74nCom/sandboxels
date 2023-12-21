elements.duncanium = {
  color: ["#ff0000","#f44336","#990000","#ea9999","#f4cccc"],
  behavior: behaviors.WALL,
  category: "solids",
  state: "solid",
  density: 99999,
  burn: 0,
  hardness: 1,
  breakInto: "duncanium",
  reactions: {
    "water": { elem1: "duncanium", elem2: "duncanium" },
    "fire": { elem1: "duncanium", elem2: null},
  }
};
