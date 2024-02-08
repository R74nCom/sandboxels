/*

Disclaimer:
Making drugs isn't information that is easy to find on the web, therefor this mod might be mildly incorrect in the way it works.

*/


elements.methamphetamine = {
  color: ["#F0F8FE","#FFFFFF","#CDEDFA"],
  name: "Methamphetamine",
  behavior: behaviors.POWDER,
  category: "drugs",
  state: "solid",
};
elements.ephedrine = {
  name: "Ephedrine",
  color: ["#A091C9","#B29AD1","#BC9ED6"],
  behavior: behaviors.POWDER,
  category: "drugs",
  state: "solid",
  reactions: {
    "hydroiodic_acid": { "elem1": "methamphetamine", "elem2": null }
  }
};

elements.iodine_gas = {
  name: "Iodine Gas",
  color: ["#282C35"],
  behavior: [
        ["M2","M1","M2"],
        ["M1","DL%5","M1"],
        ["M2","M1","M2"]
    ],
  category: "drugs",
  state: "gas"
};
elements.iodine = {
  name: "Iodine",
  color: ["#000000","#282C35","#100C08"],
  behavior: behaviors.POWDER,
  category: "drugs",
  density: 1600,
  state: "solid",
  tempHigh: 183,
  stateHigh: "iodine_gas",
  reactions: {
    "hypophosphorous_acid": { "elem1": "hydroiodic_acid", "elem2": null }
  }
};
elements.hydroiodic_acid = {
  name: "Hydroiodic Acid",
  color: ["#FFFEE0", "#FFFEC8", "#FFFDAF"],
  behavior: behaviors.LIQUID,
  category: "drugs",
  density: 1500,
  state: "liquid"
};
elements.phosphorus = {
  name: "Phosphorus",
  color: ["#F8F8F8"],
  behaviour: behaviors.POWDER,
  category: "drugs",
  state: "solid",
  reactions: {
    "water": { "elem1": "hypophosphorous_acid", "elem2": null }
  }
};
elements.hypophosphorous_acid = {
  name: "Hypophosphorous Acid",
  color: ["#3B3C36"],
  behavior: behaviors.LIQUID,
  category: "drugs",
  density: 1600,
  state: "liquid"
};
