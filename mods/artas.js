elements.test_thing = {
color: "#ff0000",
behavior: behaviors.WALL,
state: "solid",
density: 500,
category: "solids",
tempHigh: 20,
stateHigh: "water"
reactions: {
 "water" : { elem1: "test_thing", elem2: "water", chance: 1.5 }
