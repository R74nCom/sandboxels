elements.activated_bp = {
  color: "#008009",
  behavior: behaviors.wall,
  burn:300%,
  cartegory: "weapons",
  state: "solid",
  
  

elements.boompaste = {
	color: "#008000",
	behavior: behaviors.STURDYPOWDER,
	category: "weapons",
	state: "solid",
  reactions: {
    "water": { elem1:"activated-b-p" , elem2: null },
  }
}
