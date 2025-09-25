mods.registerMod({
    name: "Shadow Force",
    version: "1.0",
    description: "Adiciona Relâmpago Negro, Raio de Petrificação e Fogo Negro."
});

// Relâmpago Negro
elements.black_lightning = {
    color: ["#000000", "#222222", "#5500aa"],
    behavior: behaviors.ELECTRIC,
    category: "energy",
    state: "gas",
    density: 1,
    temp: 3000,
    conduct: 1,
    reactions: {
        water: { elem1: "steam", elem2: "black_lightning", chance: 0.3 },
        plant: { elem2: null, chance: 0.7 } // queima plantas
    }
};

// Raio de Petrificação (verde)
elements.petrify_ray = {
    color: "#00aa00",
    behavior: behaviors.LIQUID,
    category: "energy",
    state: "liquid",
    density: 900,
    reactions: {
        plant: { elem2: "stone", chance: 0.7 },
        human: { elem2: "stone", chance: 0.6 },
        animal: { elem2: "stone", chance: 0.5 }
    }
};

// Fogo Negro
elements.black_fire = {
    color: ["#111111", "#330033", "#550055"],
    behavior: behaviors.FIRE,
    category: "energy",
    state: "gas",
    temp: 1500,
    burn: 200,
    burnTime: 600,
    fireColor: "#6600aa"
};
