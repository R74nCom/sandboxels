// ---------- Magic.js (BLOCO ÚNICO) ----------
// Mod: Magic - elementos místicos com comportamentos únicos
mods.registerMod({
    name: "Magic",
    version: "1.0",
    description: "Magias e essências com comportamentos únicos"
});

/////////////////////
// ESSÊNCIA DE MADEIRA
/////////////////////
elements.essencia_madeira = {
    name: "Essência de Madeira",
    category: "magic",
    color: "#8B4513",
    behavior: behaviors.LIQUID,
    state: "solid",
    reactions: {
        matter: { elem1: "madeira", chance: 1.0 } // transforma tudo em madeira
    }
};

/////////////////////
// ESSÊNCIA DE NEBLINA
/////////////////////
elements.essencia_neblina = {
    name: "Essência de Neblina",
    category: "magic",
    color: "#cccccc",
    behavior: behaviors.LIQUID,
    state: "gas",
    reactions: {
        air: { elem1: "neblina", chance: 1.0 } // cria névoa
    }
};

/////////////////////
// PENA DE CORVO
/////////////////////
elements.pena_corvo = {
    name: "Pena de Corvo",
    category: "magic",
    color: "#222222",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// CORVO
/////////////////////
elements.corvo = {
    name: "Corvo",
    category: "magic",
    color: "#000000",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// SANGUE DE DRAGÃO
/////////////////////
elements.sangue_drago = {
    name: "Sangue de Dragão",
    category: "magic",
    color: "#ff3300",
    behavior: behaviors.LIQUID,
    state: "liquid",
    reactions: {
        matter: { elem1: "fogo", chance: 1.0 } // queima tudo
    }
};

/////////////////////
// DRAGÃO
/////////////////////
elements.drago = {
    name: "Dragão",
    category: "magic",
    color: "#cc0000",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// SANGUE DE HIDRA
/////////////////////
elements.sangue_hidra = {
    name: "Sangue de Hidra",
    category: "magic",
    color: "#33ff00",
    behavior: behaviors.LIQUID,
    state: "liquid",
    reactions: {
        matter: { elem1: "veneno", chance: 1.0 } // envenena tudo
    }
};

/////////////////////
// HIDRA
/////////////////////
elements.hidra = {
    name: "Hidra",
    category: "magic",
    color: "#00cc00",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// SANGUE DE YETI
/////////////////////
elements.sangue_yeti = {
    name: "Sangue de Yeti",
    category: "magic",
    color: "#00ffff",
    behavior: behaviors.LIQUID,
    state: "liquid",
    reactions: {
        matter: { elem1: "gelo", chance: 1.0 } // congela tudo
    }
};

/////////////////////
// YETI
/////////////////////
elements.yeti = {
    name: "Yeti",
    category: "magic",
    color: "#ffffff",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// LÓTUS
/////////////////////
elements.lotus = {
    name: "Lótus",
    category: "magic",
    color: "#ff99ff",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// LÓTUS SECO
/////////////////////
elements.lotus_seco = {
    name: "Lótus Seco",
    category: "magic",
    color: "#cc6699",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// ESSÊNCIA DE VENTO
/////////////////////
elements.essencia_vento = {
    name: "Essência de Vento",
    category: "magic",
    color: "#99ccff",
    behavior: behaviors.GAS,
    state: "gas"
};

/////////////////////
// ESSÊNCIA DE RELÂMPAGO
/////////////////////
elements.essencia_relampago = {
    name: "Essência de Relâmpago",
    category: "magic",
    color: "#ffff33",
    behavior: behaviors.GAS,
    state: "gas"
};

/////////////////////
// FLOR DO RAIO
/////////////////////
elements.flor_raio = {
    name: "Flor do Raio",
    category: "magic",
    color: "#ffff99",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// ROSA
/////////////////////
elements.rosa = {
    name: "Rosa",
    category: "magic",
    color: "#ff3366",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// ESSÊNCIA LUNAR
/////////////////////
elements.essencia_lunar = {
    name: "Essência Lunar",
    category: "magic",
    color: "#ccccff",
    behavior: behaviors.GAS,
    state: "gas"
};

/////////////////////
// ESSÊNCIA SOLAR
/////////////////////
elements.essencia_solar = {
    name: "Essência Solar",
    category: "magic",
    color: "#ffcc33",
    behavior: behaviors.GAS,
    state: "gas"
};

/////////////////////
// ESSÊNCIA DE NEVE
/////////////////////
elements.essencia_neve = {
    name: "Essência de Neve",
    category: "magic",
    color: "#e0f7ff",
    behavior: behaviors.GAS,
    state: "gas"
};

/////////////////////
// VENENO DE ESCORPIÃO
/////////////////////
elements.veneno_escorpiao = {
    name: "Veneno de Escorpião",
    category: "magic",
    color: "#9900ff",
    behavior: behaviors.LIQUID,
    state: "liquid"
};

/////////////////////
// ESCORPIÃO
/////////////////////
elements.escorpiao = {
    name: "Escorpião",
    category: "magic",
    color: "#330000",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// VENENO DE BASILISCO
/////////////////////
elements.veneno_basilisco = {
    name: "Veneno de Basilisco",
    category: "magic",
    color: "#00ff00",
    behavior: behaviors.LIQUID,
    state: "liquid"
};

/////////////////////
// BASILISCO
/////////////////////
elements.basilisco = {
    name: "Basilisco",
    category: "magic",
    color: "#00cc00",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// VENENO DE COBRA
/////////////////////
elements.veneno_cobra = {
    name: "Veneno de Cobra",
    category: "magic",
    color: "#ff9900",
    behavior: behaviors.LIQUID,
    state: "liquid"
};

/////////////////////
// COBRA
/////////////////////
elements.cobra = {
    name: "Cobra",
    category: "magic",
    color: "#996600",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// ESCAMA DE LEVIATÃ
/////////////////////
elements.escama_leviatao = {
    name: "Escama de Leviatã",
    category: "magic",
    color: "#0066ff",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// LEVIATÃ
/////////////////////
elements.leviataa = {
    name: "Leviatã",
    category: "magic",
    color: "#0033cc",
    behavior: behaviors.SOLID,
    state: "solid"
};

/////////////////////
// ALMAS
/////////////////////
elements.alma_monstro = {
name: "Alma de Monstro",
category: "magic",
color: "#660066",
behavior: behaviors.GAS,
state: "gas" };

};

elements.alma_neve = {
name: "Alma da Neve",
category: "magic",
color: "#99ffff",
behavior: behaviors.GAS,
state: "gas" };

};

elements.alma_goblin = {
name: "Alma de Goblin",
category: "magic",
color: "#33ff33",
behavior: behaviors.GAS,
state: "gas" };

};

elements.goblin = {
name: "Goblin",
category: "magic",
color: "#00cc00",
behavior: behaviors.SOLID,
state: "solid" };

};

elements.alma_noite = {
 name: "Alma da Noite",
category: "magic",
color: "#000033",
behavior:
behaviors.GAS,
state: "gas" };

};

/////////////////////
// FRAGMENTO DE ARCO ÍRIS
/////////////////////
elements.fragmento_arcoiris = {
name: "Fragmento de Arco Iris",
category: "magic",
color: "#ff00ff",
behavior: behaviors.SOLID,
state: "solid" };

/////////////////////
// POÇÕES
/////////////////////
elements.pocao_andar_nuvens = {
    name: "Poção de Andar nas Nuvens",
    category: "magic",
    color: "#ccffff",
    behavior: [
        "XX|N:nuvem,1.0|XX",
        "N:nuvem,1.0|XX|N:nuvem,1.0",
        "XX|N:nuvem,1.0|XX"
    ],
    state: "liquid"
};

/////////////////////
// POÇÃO DE IMUNIDADE A FOGO
/////////////////////
elements.pocao_imunidade_fogo = {
    name: "Poção de Imunidade a Fogo",
    category: "magic",
    color: "#ff6600",
    behavior: [
        "XX|B:fogo,0.0|XX",
        "B:fogo,0.0|XX|B:fogo,0.0",
        "XX|B:fogo,0.0|XX"
    ],
    state: "liquid"
};

/////////////////////
// POÇÃO DE IMUNIDADE A ÁCIDO
/////////////////////
elements.pocao_imunidade_acido = {
    name: "Poção de Imunidade a Ácido",
    category: "magic",
    color: "#33ffcc",
    behavior: [
        "XX|B:acido,0.0|XX",
        "B:acido,0.0|XX|B:acido,0.0",
        "XX|B:acido,0.0|XX"
    ],
    state: "liquid"
};

/////////////////////
// POÇÃO DE IMUNIDADE A VENENO
/////////////////////
elements.pocao_imunidade_veneno = {
    name: "Poção de Imunidade a Veneno",
    category: "magic",
    color: "#cc33ff",
    behavior: [
        "XX|B:veneno,0.0|XX",
        "B:veneno,0.0|XX|B:veneno,0.0",
        "XX|B:veneno,0.0|XX"
    ],
    state: "liquid"
};

/////////////////////
// POÇÃO DE IMUNIDADE A FRIO
/////////////////////
elements.pocao_imunidade_frio = {
    name: "Poção de Imunidade a Frio",
    category: "magic",
    color: "#66ffff",
    behavior: [
        "XX|B:gelo,0.0|XX",
        "B:gelo,0.0|XX|B:gelo,0.0",
        "XX|B:gelo,0.0|XX"
    ],
    state: "liquid"
};
