// seas.js - Marine Creatures Mod with Effects

// Enguia
elements.eel = {
    color: "#4e6f4a",
    behavior: behaviors.FISH,
    category: "marine",
    state: "solid",
    tick: function(pixel){
        let nearby = pixel.getNeighbors(2).filter(p => p.category=="marine" && p.name!="eel");
        nearby.forEach(p => {p.burn(5);}); // choque simples
    }
};

// Tartaruga
elements.turtle = {
    color: "#2e5f3e",
    behavior: behaviors.FISH,
    category: "marine",
    state: "solid",
    tick: function(pixel){
        // sempre com casco, pode ser representado como resistente
        pixel.temp = 1000; // exemplo de resistência
    }
};

// Tubarão
elements.shark = {
    color: "#7a7a7a",
    behavior: behaviors.FISH,
    category: "marine",
    state: "solid",
    tick: function(pixel){
        let prey = pixel.getNeighbors(5).filter(p => p.category=="marine" && p.name!="shark" && p.name!="eel" && p.name!="turtle");
        if(prey.length>0){
            let target = prey[Math.floor(Math.random()*prey.length)];
            target.delete(); // come o peixe
            pixel.moveTo(target.x, target.y);
        }
    }
};

// Caranguejo
elements.crab = {
    color: "#d14a2d",
    behavior: behaviors.WALK,
    category: "marine",
    state: "solid",
};

// Baleia
elements.whale = {
    color: "#4d6987",
    behavior: behaviors.FISH,
    category: "marine",
    state: "solid",
};

// Água-viva
elements.jellyfish = {
    color: "#a3c6ff",
    behavior: behaviors.FISH,
    category: "marine",
    state: "solid",
};

// Toxina de água-viva
elements.jelly_toxin = {
    color: "#7aa1ff",
    behavior: behaviors.LIQUID,
    category: "marine",
    state: "liquid",
};

// Casco de tartaruga
elements.turtle_shell = {
    color: "#3b5f3c",
    behavior: behaviors.SOLID,
    category: "marine",
    state: "solid",
};
