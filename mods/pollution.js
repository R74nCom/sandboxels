elements.fire = {
    name: "fire",
    color: ["#ff6b21","#ffa600","#ff4000"],
    behavior: behaviors.UL_UR,
    density: 1300,
    temp: 400,
    tempLow: 350,
    stateLow: "carbon_dioxide", // <- changed from "smoke"
    tempHigh: 6095,
    stateHigh: "plasma",
    category: "energy",
    burning: true,
    burnTime: 25,
    burnInto: "carbon_dioxide", // <- changed from "smoke"
};
