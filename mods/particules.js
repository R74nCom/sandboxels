// ---------- Particles.js (BLOCO ÚNICO) ----------
// Mod: Particles - partículas com comportamento único
mods.registerMod({
    name: "Particles",
    version: "1.1",
    description: "Partículas com comportamentos únicos e interações"
});

/////////////////////
// MUON
/////////////////////
elements.muon = {
    name: "Muon",
    nameEnglish: "Muon",
    category: "particle",
    color: "#00ffff",
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.001,
    charge: -1,
    reactions: {}
};

/////////////////////
// TAU
/////////////////////
elements.tau = {
    name: "Tau",
    nameEnglish: "Tau",
    category: "particle",
    color: "#ff00ff",
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.001,
    charge: -1,
    reactions: {}
};

/////////////////////
// PARTÍCULA ALFA
/////////////////////
elements.particula_alfa = {
    name: "Partícula Alfa",
    nameEnglish: "Alpha Particle",
    category: "particle",
    color: "#ffcc00",
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.001,
    charge: +2,
    reactions: {}
};

/////////////////////
// NEUTRINO ELETRÔNICO
/////////////////////
elements.neutrino_eletronico = {
    name: "Neutrino Eletrônico",
    nameEnglish: "Electron Neutrino",
    category: "particle",
    color: "#009dffff",
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.00001,
    reactions: {
        matter: { elem1: "eletron", chance: 1.0 }
    }
};

/////////////////////
// NEUTRINO MUÔNICO
/////////////////////
elements.neutrino_muonico = {
    name: "Neutrino Muônico",
    nameEnglish: "Muon Neutrino",
    category: "particle",
    color: "#00ccff",
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.00001,
    reactions: {
        matter: { elem1: "muon", chance: 1.0 }
    }
};

/////////////////////
// NEUTRINO TAUÔNICO
/////////////////////
elements.neutrino_taonico = {
    name: "Neutrino Tauônico",
    nameEnglish: "Tau Neutrino",
    category: "particle",
    color: "#ff9900",
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.00001,
    reactions: {
        matter: { elem1: "tau", chance: 1.0 }
    }
};

/////////////////////
// MATÉRIA EXÓTICA
/////////////////////
elements.materia_exotica = {
    name: "Matéria Exótica",
    nameEnglish: "Exotic Matter",
    category: "particle",
    color: "#00ccffff",
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.0001,
    reactions: {}
};

/////////////////////
// QUARK UP
/////////////////////
elements.quark_up = {
    name: "Quark Up",
    nameEnglish: "Up Quark",
    category: "particle",
    color: "#ff6666",
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.0001,
    reactions: {}
};

/////////////////////
// QUARK DOWN
/////////////////////
elements.quark_down = {
    name: "Quark Down",
    nameEnglish: "Down Quark",
    category: "particle",
    color: "#00ccffff",
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.0001,
    reactions: {}
};

/////////////////////
// QUARK STRANGE
/////////////////////
elements.quark_strange = {
    name: "Quark Strange",
    nameEnglish: "Strange Quark",
    category: "particle",
    color: "#66ff66",
    behavior: behaviors.GAS,
    state: "gas",
    density: 0.0001,
    reactions: {
        matter: { elem1: "materia_estranha", chance: 1.0 } // converte matéria em matéria exótica
    }
};
