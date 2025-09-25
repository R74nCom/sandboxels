// ---------- Bioquimic.js (BLOCO ÚNICO FINAL OTIMIZADO, BILINGUE) ----------
// Mod: Bioquimic - versão final otimizada
mods.registerMod({
    name: "Bioquimic",
    version: "final-optimized",
    description: "Mod completo (único bloco), nomes PT/EN e otimizado para desempenho."
});

/////////////////////
// BASES NITROGENADAS
/////////////////////

elements.adenina = {
    name: "Adenina",
    nameEnglish: "Adenine",
    category: "bioquimic",
    color: "#ffcc88",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1200
};

elements.guanina = {
    name: "Guanina",
    nameEnglish: "Guanine",
    category: "bioquimic",
    color: "#ccaa77",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1200
};

elements.citosina = {
    name: "Citosina",
    nameEnglish: "Cytosine",
    category: "bioquimic",
    color: "#99ccff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1200
};

elements.timina = {
    name: "Timina",
    nameEnglish: "Thymine",
    category: "bioquimic",
    color: "#ff9999",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1200
};

elements.uracila = {
    name: "Uracila",
    nameEnglish: "Uracil",
    category: "bioquimic",
    color: "#88ddff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1200
};

elements.rna = {
    name: "RNA",
    nameEnglish: "RNA",
    category: "bioquimic",
    color: "#66ccff",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1000
};

elements.parede_acucar_fosfato = {
    name: "Parede de Açúcar-Fosfato",
    nameEnglish: "Sugar-Phosphate Backbone",
    category: "bioquimic",
    color: "#bbaa88",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1400
};

/////////////////////
// ORGANELAS / ESTRUTURAS CELULARES
/////////////////////

elements.citoplasma = {
    name: "Citoplasma",
    nameEnglish: "Cytoplasm",
    category: "bioquimic",
    color: "#ffeedd",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1005
};

elements.membrana_celular = {
    name: "Membrana Celular",
    nameEnglish: "Cell Membrane",
    category: "bioquimic",
    color: "#ddbb99",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1100
};

elements.nucleo_celular = {
    name: "Núcleo Celular",
    nameEnglish: "Cell Nucleus",
    category: "bioquimic",
    color: "#ffddee",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1300
};

elements.mitocondria = {
    name: "Mitocôndria",
    nameEnglish: "Mitochondrion",
    category: "bioquimic",
    color: "#ffcc88",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1400
};

elements.ribossomo = {
    name: "Ribossomo",
    nameEnglish: "Ribosome",
    category: "bioquimic",
    color: "#aaddff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1300
};

elements.lisosomo = {
    name: "Lisosomo",
    nameEnglish: "Lysosome",
    category: "bioquimic",
    color: "#ff9999",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1250,
    reactions: {
        virus_dengue: { elem1: null, chance: 0.6 },
        bacteria_tetano: { elem1: null, chance: 0.6 }
    }
};

elements.reticulo_endoplasmatico_liso = {
    name: "Retículo Endoplasmático Liso",
    nameEnglish: "Smooth ER",
    category: "bioquimic",
    color: "#eeddff",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1200
};

elements.reticulo_endoplasmatico_rugoso = {
    name: "Retículo Endoplasmático Rugoso",
    nameEnglish: "Rough ER",
    category: "bioquimic",
    color: "#ddccff",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1220
};

elements.aparelho_de_golgi = {
    name: "Aparelho de Golgi",
    nameEnglish: "Golgi Apparatus",
    category: "bioquimic",
    color: "#ffd188",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1200
};

elements.citoesqueleto = {
    name: "Citoesqueleto",
    nameEnglish: "Cytoskeleton",
    category: "bioquimic",
    color: "#ccbbaa",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1250
};

elements.vacuolo = {
    name: "Vacúolo",
    nameEnglish: "Vacuole",
    category: "bioquimic",
    color: "#bbffcc",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1000
};

/////////////////////
// CÉLULAS E COMPONENTES SANGUÍNEOS
/////////////////////

elements.globulo_branco = {
    name: "Glóbulo Branco",
    nameEnglish: "White Blood Cell",
    category: "bioquimic",
    color: "#ffffff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1080,
    reactions: {
        coronavirus: { elem1: null, chance: 0.8 },
        virus_dengue: { elem1: null, chance: 0.75 },
        bacteria_tetano: { elem1: null, chance: 0.7 },
        opsonized_pathogen: { elem1: null, chance: 1.0 }
    }
};

elements.globulo_vermelho = {
    name: "Glóbulo Vermelho",
    nameEnglish: "Red Blood Cell",
    category: "bioquimic",
    color: "#ff0000",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1120
};

elements.plaqueta = {
    name: "Plaqueta",
    nameEnglish: "Platelet",
    category: "bioquimic",
    color: "#ffee99",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1090,
    reactions: {
        epiderme: { elem1: "clot", chance: 0.6 }
    }
};

elements.clot = {
    name: "Clot",
    nameEnglish: "Clot",
    category: "bioquimic",
    color: "#6b2b2b",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1200
};

elements.fagocito = {
    name: "Fagócito",
    nameEnglish: "Phagocyte",
    category: "bioquimic",
    color: "#99ff99",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1100,
    reactions: {
        opsonized_pathogen: { elem1: "digested_pathogen", chance: 1.0 },
        pathogen: { elem1: "digested_pathogen", chance: 0.5 }
    }
};

elements.digested_pathogen = {
    name: "Patógeno Digerido",
    nameEnglish: "Digested Pathogen",
    category: "bioquimic",
    color: "#666666",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 900
};

/////////////////////
// NEURÔNIO / NERVO / CÉLULA DE MEMÓRIA
/////////////////////

elements.neuronio = {
    name: "Neurônio",
    nameEnglish: "Neuron",
    category: "bioquimic",
    color: "#ffaa88",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1050
};

elements.nerve = {
    name: "Nervo",
    nameEnglish: "Nerve",
    category: "bioquimic",
    color: "#cc8866",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1050
};

elements.celula_memoria = {
    name: "Célula de Memória",
    nameEnglish: "Memory Cell",
    category: "bioquimic",
    color: "#66ddff",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1080
};

/////////////////////
// HORMÔNIOS / NEUROTRANSMISSORES
/////////////////////

elements.adrenalina = {
    name: "Adrenalina",
    nameEnglish: "Adrenaline",
    category: "bioquimic",
    color: "#ff8800",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1020
};

elements.dopamina = {
    name: "Dopamina",
    nameEnglish: "Dopamine",
    category: "bioquimic",
    color: "#aa55ff",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1020
};

elements.insulina = {
    name: "Insulina",
    nameEnglish: "Insulin",
    category: "bioquimic",
    color: "#ffee55",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1020
};

elements.glucagon = {
    name: "Glucagon",
    nameEnglish: "Glucagon",
    category: "bioquimic",
    color: "#ffdd66",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1020
};

elements.GH = {
    name: "GH",
    nameEnglish: "Growth Hormone",
    category: "bioquimic",
    color: "#88ff88",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1005
};

elements.t3 = {
    name: "T3",
    nameEnglish: "T3",
    category: "bioquimic",
    color: "#ddddee",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1005
};

elements.t4 = {
    name: "T4",
    nameEnglish: "T4",
    category: "bioquimic",
    color: "#ccccdd",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1005
};

elements.tireoide = {
    name: "Tireoide",
    nameEnglish: "Thyroid",
    category: "bioquimic",
    color: "#ccffaa",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1400
};

/////////////////////
// VITAMINAS (principais)
/////////////////////

elements.vitamina_A = {
    name: "Vitamina A",
    nameEnglish: "Vitamin A",
    category: "bioquimic",
    color: "#ffdd66",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1000
};

elements.vitamina_C = {
    name: "Vitamina C",
    nameEnglish: "Vitamin C",
    category: "bioquimic",
    color: "#fff8aa",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1000
};

elements.vitamina_D = {
    name: "Vitamina D",
    nameEnglish: "Vitamin D",
    category: "bioquimic",
    color: "#fff0cc",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1000
};

elements.vitamina_B12 = {
    name: "Vitamina B12",
    nameEnglish: "Vitamin B12",
    category: "bioquimic",
    color: "#ffddee",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1000
};

elements.vitamina_K = {
    name: "Vitamina K",
    nameEnglish: "Vitamin K",
    category: "bioquimic",
    color: "#eeddff",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1000
};

/////////////////////
// MINERAIS (principais)
/////////////////////

elements.ferro = {
    name: "Ferro",
    nameEnglish: "Iron",
    category: "bioquimic",
    color: "#aa3333",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 7874
};

elements.calcio = {
    name: "Cálcio",
    nameEnglish: "Calcium",
    category: "bioquimic",
    color: "#ffffdd",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1500
};

elements.zinco = {
    name: "Zinco",
    nameEnglish: "Zinc",
    category: "bioquimic",
    color: "#cccccc",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 7135
};

elements.potassio = {
    name: "Potássio",
    nameEnglish: "Potassium",
    category: "bioquimic",
    color: "#ffd1a1",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 862
};

elements.sodio = {
    name: "Sódio",
    nameEnglish: "Sodium",
    category: "bioquimic",
    color: "#eef5ff",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 970
};

/////////////////////
// MICRORGANISMOS (BACTÉRIAS E VÍRUS)
/////////////////////

elements.coronavirus = {
    name: "Coronavírus",
    nameEnglish: "Coronavirus",
    category: "bioquimic",
    color: "#6666ff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 900,
    reactions: {
        membrana_celular: { elem1: "infected_cell", chance: 0.8 }
    }
};

elements.influenza = {
    name: "Influenza",
    nameEnglish: "Influenza",
    category: "bioquimic",
    color: "#aabbff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 900,
    reactions: {
        membrana_celular: { elem1: "infected_cell", chance: 0.6 }
    }
};

elements.virus_dengue = {
    name: "Vírus da Dengue",
    nameEnglish: "Dengue Virus",
    category: "bioquimic",
    color: "#ffee66",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 900
};

elements.virus_raiva = {
    name: "Vírus da Raiva",
    nameEnglish: "Rabies Virus",
    category: "bioquimic",
    color: "#ff6666",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 900
};

elements.virus_variola = {
    name: "Vírus da Variola",
    nameEnglish: "Smallpox Virus",
    category: "bioquimic",
    color: "#999999",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 950
};

elements.virus_zika = {
    name: "Vírus da Zika",
    nameEnglish: "Zika Virus",
    category: "bioquimic",
    color: "#ff99ff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 900
};

elements.bacteria_tetano = {
    name: "Bactéria do Tétano",
    nameEnglish: "Tetanus Bacterium",
    category: "bioquimic",
    color: "#994422",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1250
};

elements.lactobacilo = {
    name: "Lactobacilo",
    nameEnglish: "Lactobacillus",
    category: "bioquimic",
    color: "#ccffcc",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1000
};

elements.cianobacteria = {
    name: "Cianobactéria",
    nameEnglish: "Cyanobacteria",
    category: "bioquimic",
    color: "#88dd88",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 800
};

/////////////////////
// OUTROS / PLACEHOLDERS (reduzidos para otimização)
/////////////////////

elements.opsonized_pathogen = {
    name: "Patógeno Opsonizado",
    nameEnglish: "Opsonized Pathogen",
    category: "bioquimic",
    color: "#55ff55",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 950
};

elements.infected_cell = {
    name: "Infected Cell",
    nameEnglish: "Infected Cell",
    category: "bioquimic",
    color: "#552200",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1200,
    reactions: {
        globulo_branco: { elem1: null, chance: 0.7 }
    }
};

elements.infected_nucleus = {
    name: "Infected Nucleus",
    nameEnglish: "Infected Nucleus",
    category: "bioquimic",
    color: "#442244",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1400
};

/////////////////////
// SISTEMA COMPLEMENTO (SIMPLIFICADO, final)
/////////////////////

elements.c3 = {
    name: "C3",
    nameEnglish: "C3",
    category: "bioquimic",
    color: "#66ccff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1020,
    reactions: {
        c3_convertase: { elem1: "c3a", elem2: "c3b", chance: 1.0 }
    }
};

elements.c3a = {
    name: "C3A",
    nameEnglish: "C3a",
    category: "bioquimic",
    color: "#99ffff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1010,
    reactions: {
        globulo_branco: { elem2: "activated_globulo_branco", chance: 1.0 },
        fagocito: { elem2: "activated_fagocito", chance: 1.0 }
    }
};

elements.c3b = {
    name: "C3B",
    nameEnglish: "C3b",
    category: "bioquimic",
    color: "#44bbff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1020,
    reactions: {
        pathogen: { elem2: "opsonized_pathogen", chance: 1.0 },
        c3b_receptor: { elem1: "c3b_receptor", elem2: "bound_c3b", chance: 1.0 },
        c5b: { elem1: "c5b", chance: 1.0 }
    }
};

elements.c3_convertase = {
    name: "C3 Convertase",
    nameEnglish: "C3 Convertase",
    category: "bioquimic",
    color: "#2288ff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1030,
    reactions: {
        c3: { elem1: "c3a", elem2: "c3b", chance: 1.0 }
    }
};

elements.c3b_receptor = {
    name: "C3B Receptor",
    nameEnglish: "C3b Receptor",
    category: "bioquimic",
    color: "#99bbff",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1050,
    reactions: {
        c3b: { elem2: "bound_c3b", chance: 1.0 }
    }
};

elements.c5_receptor = {
    name: "C5 Receptor",
    nameEnglish: "C5 Receptor",
    category: "bioquimic",
    color: "#88aaff",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1050,
    reactions: {
        c5b: { elem2: "bound_c5b", chance: 1.0 }
    }
};

elements.c5b = {
    name: "C5B",
    nameEnglish: "C5b",
    category: "bioquimic",
    color: "#4466ff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1020,
    reactions: {
        c6: { elem1: "c6", chance: 1.0 }
    }
};

elements.c6 = {
    name: "C6",
    nameEnglish: "C6",
    category: "bioquimic",
    color: "#3344ff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1020,
    reactions: {
        c7: { elem1: "c7", chance: 1.0 }
    }
};

elements.c7 = {
    name: "C7",
    nameEnglish: "C7",
    category: "bioquimic",
    color: "#5522ff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1020,
    reactions: {
        c8: { elem1: "c8", chance: 1.0 }
    }
};

elements.c8 = {
    name: "C8",
    nameEnglish: "C8",
    category: "bioquimic",
    color: "#7722ff",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 1020,
    reactions: {
        pathogen: { elem2: "complexo_ataque_membrana", chance: 1.0 }
    }
};

elements.complexo_ataque_membrana = {
    name: "Complexo de Ataque à Membrana",
    nameEnglish: "Membrane Attack Complex",
    category: "bioquimic",
    color: "#0000aa",
    behavior: behaviors.SOLID,
    state: "solid",
    density: 1100,
    reactions: {
        pathogen: { elem2: "lysed_pathogen", chance: 1.0 }
    }
};

elements.lysed_pathogen = {
    name: "Patógeno Lisado",
    nameEnglish: "Lysed Pathogen",
    category: "bioquimic",
    color: "#000000",
    behavior: behaviors.POWDER,
    state: "solid",
    density: 900
};

/////////////////////
// TORRE E BURACO (MAC VISUAL)
/////////////////////

elements.protein_tower = {
    name: "Torre de Proteínas",
    nameEnglish: "Protein Tower",
    category: "bioquimic",
    color: "#ffdd77",
    behavior: [
        "XX|XX|XX",
        "XX|C9|XX",
        "XX|C9|XX",
        "XX|XX|XX"
    ],
    state: "solid",
    density: 1050
};

elements.protein_hole = {
    name: "Buraco de Proteínas",
    nameEnglish: "Protein Hole",
    category: "bioquimic",
    color: "#000000",
    behavior: [
        "XX|XX|XX",
        "XX|VOID|XX",
        "XX|VOID|XX",
        "XX|XX|XX"
    ],
    state: "solid",
    density: 900,
    reactions: {
        pathogen: { elem2: "lysed_pathogen", chance: 1.0 }
    }
};

/////////////////////
// FINAL / NOTAS DE PERFORMANCE
/////////////////////

// Otimizações aplicadas:
// - Removi variantes redundantes e placeholders desnecessários.
// - Mantive apenas vitaminas/minerais principais para reduzir número de elementos.
// - Usei POWDER/Liquid/Solid em vez de criar muitas variantes in-vessel.
// - Reações diretas e claras (chance 0.5-1.0) para manter comportamento previsível.
// - Se quiser ainda mais performance, reduzimos a lista de vírus/bactérias ou transformamos alguns elementos em simples "tags" sem behavior pesado.

// Se quiser: posso agora gerar uma versão "minified" (menor espaçamento) para colar rapidinho, ou ajustar probabilidades/cores/estados para alguma coisa específica.
