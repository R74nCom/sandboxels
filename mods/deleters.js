elements.voidbomb = {
  color: "#FFFFFF",
  behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|EX:5>void AND M1|XX"
  ],
  category: "voids",
  state: "powder"
};
elements.powdervoid = elements.void;
elements.powdervoid.state = "powder";
elements.powdervoid.category = "voids";
elements.powdervoid.behavior = behaviors.POWDER;
elements.void.category = "voids";
elements.void.behavior = behaviors.WALL;
elements.liquidvoid = elements.void;
elements.liquidvoid.state = "liquid";
elements.liquidvoid.category = "voids";
elements.liquidvoid.behavior = behaviors.LIQUID;
elements.voidgas = elements.void;
elements.voidgas.state = "gas";
elements.voidgas.category = "voids";
elements.voidgas.behavior = behaviors.GAS;