/*

Disclaimer:
Making drugs isn't information that is easy to find on the web, therefor this mod might be mildly incorrect in the way it works.

*/


elements.drugs_methamphetamine = {
  color: ["#F0F8FE","#FFFFFF","#CDEDFA"],
  name: "Methamphetamine",
  behavior: behaviors.POWDER,
  category: "drugs",
  state: "solid",
};
elements.drugs_ephedrine = {
  name: "Ephedrine",
  color: ["#A091C9","#B29AD1","#BC9ED6"],
  behavior: behaviors.POWDER,
  category: "drugs",
  state: "solid",
  tempHigh: 180,
  stateHigh: "ephedrine_gas",
  reactions: {
    "drugs_hydroiodic_acid": { "elem1": "drugs_methamphetamine", "elem2": null }
  }
};
elements.drugs_ephedrine_gas = {
  name: "Ephedrine Gas",
  color: ["#A091C9","#B29AD1","#BC9ED6"],
  hidden: true,
  behavior: [
        ["M2","M1","M2"],
        ["M1","DL%5","M1"],
        ["M2","M1","M2"]
    ],
  category: "drugs",
  state: "gas"
};

elements.drugs_iodine_gas = {
  name: "Iodine Gas",
  color: ["#282C35"],
  hidden: true,
  behavior: [
        ["M2","M1","M2"],
        ["M1","DL%5","M1"],
        ["M2","M1","M2"]
    ],
  category: "drugs",
  state: "gas"
};
elements.drugs_iodine = {
  name: "Iodine",
  color: ["#000000","#282C35","#100C08"],
  behavior: behaviors.POWDER,
  category: "drugs",
  density: 1600,
  state: "solid",
  tempHigh: 183,
  stateHigh: "iodine_gas",
  reactions: {
    "drugs_hypophosphorous_acid": { "elem1": "drugs_hydroiodic_acid", "elem2": null }
  }
};
elements.drugs_hydroiodic_acid = {
  name: "Hydroiodic Acid",
  color: ["#FFFEE0", "#FFFEC8", "#FFFDAF"],
  behavior: behaviors.LIQUID,
  category: "drugs",
  density: 1500,
  state: "liquid"
};
elements.drugs_phosphorus = {
  name: "Phosphorus",
  color: ["#F8F8F8"],
  behavior: behaviors.POWDER,
  category: "drugs",
  state: "solid",
  reactions: {
    "water": { "elem1": "drugs_hypophosphorous_acid", "elem2": null }
  }
};
elements.drugs_hypophosphorous_acid = {
  name: "Hypophosphorous Acid",
  color: ["#3B3C36"],
  behavior: behaviors.LIQUID,
  category: "drugs",
  density: 1600,
  state: "liquid"
};
