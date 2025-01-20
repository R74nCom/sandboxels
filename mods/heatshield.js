elements.ablative_shield =  {
  color: "#d6999c",
  behavior: behaviors.WALL,
  category: "solids",
  state: "solid",
  tempHigh: 2760,
  stateHigh: "smoke",
  conduct: 0.01,
};
elements.molten_reusable =  {
  color: "#ff9900",
  behavior: behaviors.MOLTEN,
  category: "states",
  state: "liquid",
  hidden: 1,
  temp: 1261,
  tempLow: 1259,
  stateLow: "reusable_shield",
};
elements.reusable_shield =  {
  color: "#3c3c3c",
  behavior: behaviors.WALL,
  category: "solids",
  state: "solid",
  tempHigh: 1260,
  stateHigh: "molten_reusable",
  conduct: 0.01,
};
elements.plasma.temp = 2800
;
