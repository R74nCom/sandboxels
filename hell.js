// underworld.js - Mod do Submundo

// Lava do Submundo
elements.hell_lava = {
    color: "#ff4500",
    behavior: behaviors.LIQUID,
    category: "infernal",
    state: "liquid",
    temp: 1500,
    burn: 100,
    burnTime: 600,
};

// Piranhas Demoníacas
elements.demonic_piranha = {
    color: "#8b0000",
    behavior: behaviors.FISH,
    category: "infernal",
    state: "solid",
};

// Corvos Demoníacos
elements.demonic_crow = {
    color: "#1a1a1a",
    behavior: behaviors.FLY,
    category: "infernal",
    state: "solid",
};

// Espinhos Infernais
elements.infernal_spike = {
    color: "#660000",
    behavior: behaviors.POWDER,
    category: "infernal",
    state: "solid",
};

// Olho Voador
elements.flying_eye = {
    color: "#ff0000",
    behavior: behaviors.FLY,
    category: "infernal",
    state: "solid",
};

// Morcego
elements.bat = {
    color: "#2b2b2b",
    behavior: behaviors.FLY,
    category: "infernal",
    state: "solid",
};

// Prisão de Alma
elements.soul_prison = {
    color: "#550055",
    behavior: behaviors.SOLID,
    category: "infernal",
    state: "solid",
    tick: function(pixel){
        let nearby = pixel.getNeighbors(3).filter(p => p.category=="soul");
        nearby.forEach(p => pixel.grab(p)); // prende apenas almas
    }
};

// Dente
elements.tooth = {
    color: "#fffff0",
    behavior: behaviors.POWDER,
    category: "infernal",
    state: "solid",
};

// Inseto
elements.insect = {
    color: "#654321",
    behavior: behaviors.WALK,
    category: "infernal",
    state: "solid",
};

// Mão de Ciclopes
elements.cyclops_hand = {
    color: "#aa0000",
    behavior: behaviors.WALK,
    category: "infernal",
    state: "solid",
};

// Caveira
elements.skull = {
    color: "#eeeeee",
    behavior: behaviors.SOLID,
    category: "infernal",
    state: "solid",
};

//Maldição
element.cursed = {
    color: "#ae2626",
    behaivor: behaivors.FIRE,
    category: "infernal"
    state: "gas"
