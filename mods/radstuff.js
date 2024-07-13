elements.rad_detector = {
    desc: "Detects Radiation, Fallout and Alpha Particles",
    behavior: behaviors.WALL,
    category: "machines",
    state:"solid",
    density :500,
    color: "#808080",
    reactions: {
        "radiation": {"charge1":1},
        "alpha_particles": {"charge1":1},
        "fallout": {"charge1":1},
    }
};
elements.smoke_detector = {
      behavior: behaviors.WALL,
      desc: "Detects Smoke and Carbon Dioxide",
      color: "#ffffff",
      reactions: {
      "smoke": {"charge1":1},   
      "carbon_dioxide": {"charge1":1},   
      },
      conduct: 1,
      tempHigh: 1550,
      stateHigh: ["molten_metal_scrap","electric","molten_plastic"],
      colorOn: "#ff0000",
      movable: false,
      insulate: true,
      noMix: true,
      category:"machines",
      darkText: true,
      hardness: 1,
};
