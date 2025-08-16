elements.boron = {
color: "#635F62",
category: "powders",
state: "solid",

behavior: [
"RL:radiation%0.001",
],


reactions: {
neutron: {elem2: "radiation"},
},

}),

elements.Graphite = {
color: "#635F62",
category: "powders",
state: "solid",

behavior: [
"RL:radiation%2, AND RL:neutron%5",
],

},

elements.Plutonium = {
color: "#FFFF7F",
category: "powders",
state: "solid",

behavior: [
"RL:radiation%10 AND RL:proton%0.05",
],

reactions: {
neutron: {
elem2: "radiation",

onReact: function(elem1, elem2) {
elem1.temp = elem1.temp + 25
},
},
},

}
