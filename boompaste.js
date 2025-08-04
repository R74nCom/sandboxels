elements.a_b_p = {
  color: "#008009",
  behavior: behaviors.WALL,
  burn:300%,
  cartegory: "weapons",
  state: "solid",
}
  

elements.boompaste = {
	color: "#008000",
	behavior: behaviors.STURDYPOWDER,
	category: "weapons",
	state: "solid",
  reactions: {
    "water": { elem1:"a_b_p" , elem2: "a_b_p" },
  }
}
