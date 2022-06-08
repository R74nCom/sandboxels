elements.slag = {
    color: ["#4b3a2d","#6a5447","#6b5b53","#675851","#78756e"],
    behavior: behaviors.POWDER,
    tempHigh: 1780,
    stateHigh: "molten_slag",
    category: "powders",
    density: 2400,
    state: "solid",
    conduct: 0.03,
    movable: true,
}

elements.molten_slag = {
    color: ["#964917","#963A17","#962C00","#D46924","#D45424","#D43F00","#D6722A","#D65B2A","#D64419","#CE6E29","#CE5829","#CE4200","#F09237","#F07537","#F05800"],
    behavior: behaviors.MOLTEN,
    temp: 1880,
    tempLow: 1780,
    stateLow: "slag",
    viscosity: 10000,
    hidden: true,
    state: "liquid",
    category: "molten",
    density: 2160,
    conduct: 0,
} 
