// ---------- Space.js (BLOCO ÚNICO) ----------
// Mod: Space - elementos espaciais com comportamento único
mods.registerMod({
    name: "Space",
    version: "1.0",
    description: "Elementos espaciais com comportamentos únicos"
});

/////////////////////
// BURACO NEGRO
/////////////////////
elements.buraco_negro = {
    name: "Buraco Negro",
    nameEnglish: "Black Hole",
    category: "space",
    color: "#000000",
    behavior: [
        "XX|XX|XX",
        "XX|UP|XX",
        "XX|XX|XX"
    ], // suga tudo ao redor
    state: "solid",
    density: 9999999,
    reactions: {
        meteor: { elem1: "vapor", chance: 1.0 },
        planeta_gasoso: { elem1: "vapor", chance: 1.0 }
    }
};

/////////////////////
// BURACO BRANCO
/////////////////////
elements.buraco_branco = {
    name: "Buraco Branco",
    nameEnglish: "White Hole",
    category: "space",
    color: "#ffffff",
    behavior: [
        "XX|XX|XX",
        "XX|DOWN|XX",
        "XX|XX|XX"
    ], // expulsa tudo ao redor
    state: "solid",
    density: 999999,
    reactions: {
        meteor: { elem1: "scattered_meteor", chance: 1.0 },
        cometa: { elem1: "scattered_cometa", chance: 1.0 }
    }
};

/////////////////////
// PLANETA GASOSO
/////////////////////
elements.planeta_gasoso = {
    name: "Planeta Gasoso",
    nameEnglish: "Gas Planet",
    category: "space",
    color: "#aaffff",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 200,
    reactions: {}
};

/////////////////////
// COMETA
/////////////////////
elements.cometa = {
    name: "Cometa",
    nameEnglish: "Comet",
    category: "space",
    color: "#ffeeaa",
    behavior: [
        "XX|DOWN|XX",
        "DOWN|DOWN|DOWN",
        "XX|DOWN|XX"
    ], // movimento descendente
    state: "solid",
    density: 500
};

/////////////////////
// CAUDA DE COMETA
/////////////////////
elements.cauda_cometa = {
    name: "Cauda de Cometa",
    nameEnglish: "Comet Tail",
    category: "space",
    color: "#ffffff",
    behavior: behaviors.GAS,
    state: "gas",
    density: 50
};

/////////////////////
//ESTRELA CADENTE
/////////////////////

elements.estrela_cadente = {
    name: "Estrela Cadente",
    nameEnglish: "Shooting Star",
    category: "space",
    color: "#ffdd33",
    behavior: [
        "XX|DOWNRIGHT|XX",
        "DOWNRIGHT|DOWNRIGHT|DOWNRIGHT",
        "XX|DOWNRIGHT|XX"
    ], // movimento rápido em diagonal
    state: "solid",
    density: 100,
    reactions: {
        lua: { elem1: "ponto_luz", chance: 0.5 },
        planeta_gasoso: { elem1: "ponto_luz", chance: 0.5 }

};

elements.ponto_luz = {
    name: "Ponto de Luz",
    nameEnglish: "Light Point",
    category: "space",
    color: "#ffff66",
    behavior: behaviors.GAS,
    state: "gas",
    density: 1,
    burn: 0,
    tempHigh: 1000,
    tempLow: 0