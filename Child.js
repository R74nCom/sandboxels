elements.child = {
  color: "#FFE5B4",
  behaviour:behaviours.WALL,
  category: "life",
  viscosity: 0,
  state: "solid",
  density: 20,
};
if (!elements.child.reactions) {
  elements.child.reactions = {}
}
elements.child.reactions.herb = { "elem1":null,"elem2","explosion"}
