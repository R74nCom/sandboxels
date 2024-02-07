elements.UNBREAKABLE = {
	color: "#7f7f7f",
	behavior: behaviors.WALL,
	category: "WALA MOD",
	state: "solid",
  hardness: 1,
  burn: 0,
  density: 127
};

elements.ALWAYSBREAK = {
	color: "#ff0000",
	behavior: behaviors.POWDER,
	category: "WALA MOD",
	state: "powder",
  hardness: 0,
  burn: 100,
  density: 0,
  tempHigh: -127,
  stateHigh: null,
  tempLow: 127,
  stateLow: null,
  breakInto: null
};
