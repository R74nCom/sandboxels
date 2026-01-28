elements.boron = {
color: "#635F62",
category: "powders",
state: "solid",

behavior: [
"RL:radiation%0.001",
],


reactions: {
neutron: {elem2: null}
},

}

elements.Graphite = {
color: "#635F62",
category: "powders",
state: "solid",

behavior: [
"RL:radiation%2, AND RL:neutron%5",
],

}
