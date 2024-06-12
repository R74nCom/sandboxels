elements.oreo = {
    color: "#120c08",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    breakInto: "creme_filling",
    isFood: true
};
elements.creme_filling = {
    color: "#ede7c2",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "solid",
    viscosity: 10000,
    isFood: true,
    hidden: true
};
elements.golden_oreo = {
    color: "#f0d465",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    breakInto: "creme_filling",
    isFood: true,
};
elements.hydrox = {
    color: "#302016",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    breakInto: "hydrox_creme"
};
elements.hydrox_creme = {
    color: "#F9F8F2",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "solid",
    viscosity: 10000,
    hidden: true
};
elements.head.reactions.oreo = { elem2: null, chance:0.015 };
elements.head.reactions.creme_filling = { elem2: null, chance:0.015 }
elements.head.reactions.golden_oreo = { elem2: null, chance:0.01 }
elements.head.reactions.hydrox = { elem2: null, chance: 0.015 }
elements.head.reactions.hydrox_creme = { elem2: null, chance: 0.015 }