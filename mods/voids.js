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
elements.void.category = "voids";
elements.void.behavior = behaviors.WALL;
elements.liquidvoid = JSON.parse(JSON.stringify(elements.void));
elements.liquidvoid.state = "liquid";
elements.liquidvoid.category = "voids";
elements.liquidvoid.behavior = behaviors.LIQUID;
elements.voidgas = JSON.parse(JSON.stringify(elements.void));
elements.voidgas.state = "gas";
elements.voidgas.category = "voids";
elements.voidgas.behavior = behaviors.GAS;
