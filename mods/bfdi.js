elements.abcdefghijklmon =  {
  color: "#c86b8f",
  name: "myblueberryseed",
  behavior: behaviors.POWDER,
  reactions: {
    "porcelain": { elem1: "grower", elem2: "porcelain"},
},
  state: "solid",
  category: "bfdi",
};
elements.grower =  {
  color: "#00ff00",
  name: "blueberry_plant",
  behavior: [
    "XX|CL AND CH:shower%10|XX",
    "CR:blueberry%1|XX|CR:blueberry%1",
    "XX|XX|XX"
  ],
  category: "bfdi",
};
elements.blueberry =  {
  color: "#5500aa",
  behavior:  [
    "XX|XX|XX",
    "XX|EX:20%1|XX",
    "XX|XX|XX"
],
  category: "bfdi",
};
elements.shower =  {
  color: "#00aa00",
  name: "blueberry_plant",
  category: "bfdi"
};
elements.steel.breakInto = "fork"
;
elements.fork =  {
  color: "#999999",
  ignore: "abcd",
  behavior:  [
    "XX|XX|XX",
    "XX|XX|XX",
    "M2|DL AND M1|M2"
  ],
  state: "solid",
  category: "bfdi",
};
elements.abcd =  {
  state: "gas",
  name: "forkrepellent",
  category: "bfdi",
  stain: 0,
  alpha: 0.4,
  behavior: [
    "XX|M1 AND ST|XX",
    "M1 AND ST|XX|M1 AND ST",
    "XX|M1 AND ST|XX"
  ],
};
elements.cheesecake =  {
  state: "solid",
  behavior: behaviors.POWDER,
  color: "#ccbb77",
  category: "bfdi",
  reactions: {
    "glass_shard": { elem1: "shardcake", elem2: null } 
  },
};
elements.baked_batter.reactions = {}
elements.baked_batter.reactions.cheese_powder = { elem1: "cheesecake", elem2: null };
elements.shardcake =  {
  state: "solid",
  name: "cheesecake_with_shards", 
  behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|DL%5 AND M1|XX"
  ],
  color: Array ("#ccbb77","#5e807d"),
  category: "bfdi",
};
elements.rocky =  {
  color: "#777777",
  behavior:  [
    "XX|CR:barf|XX",
    "CR:barf|XX|CR:barf",
    "XX|CR:barf|XX"
  ],
  category: "bfdi",
  reactions:  {
    "lava_barf": { elem1: null, elem2: "zombie_rocky" }
  }, 
};
elements.barf =  {
  color: "#008800",
  category: "bfdi",
  ignore: Array("rocky", "zombie_rocky","cured_rocky"), 
  state: "liquid",
  behavior:  [
    "XX|XX|XX",
    "M2|XX|M2",
    "M2|DL%30 AND M1|M2"
  ],
  tempHigh: 800,
  stateHigh: "lava_barf",
  reactions:  {
    "lava": { elem1: "lava_barf", elem2: null }
  },
};
elements.lava_barf = {
  color: "#ffaa00",
  glow: 1,
  state: "liquid",
  ignore: Array("zombie_rocky","rocky","cured_rocky"), 
  behavior:  [
    "XX|CH:rocky>zombie_rocky AND CH:barf>lava_barf%5|XX",
    "M2 AND CH:rocky>zombie_rocky AND CH:barf>lava_barf%5|XX|M2 AND CH:rocky>zombie_rocky AND CH:barf>lavabarf%5",
    "XX|CH:rocky>zombie_rocky AND CH:barf>lava_barf%5 AND M1|XX"
  ],
  category: "bfb",
};
elements.zombie_rocky =  {
  color: "#005500",
  category: "bfdi",
  behavior:  [
    "XX|CH:rocky>zombie_rocky AND CR:lava_barf|XX",
    "CH:rocky>zombie_rocky AND CR:lava_barf|XX|CH:rocky>zombie_rocky AND CR:lava_barf",
    "XX|CH:rocky>zombie_rocky AND CR:lava_barf|XX"
  ],
  reactions:  {
    "water": { elem1: null, elem2: "cured_rocky" }
  },
};
elements.cured_rocky =  {
  color: "#777777", 
  category: "bfdi", 
  behavior:  [
    "XX|CR:barf AND CH:zombie_rocky>cured_rocky|XX", 
    "CR:barf AND CH:zombie_rocky>cured_rocky|XX|CR:barf AND CH:zombie_rocky>cured_rocky", 
    "XX|CR:barf AND CH:zombie_rocky>cured_rocky|XX"
  ], 
  reactions:  {
    "zombie_rocky": { elem1: "cured_rocky", elem2: "cured_rocky" }
  }, 
};
