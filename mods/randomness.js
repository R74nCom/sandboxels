//lily made some stupid things

//TPT reference
elements.warp = {
    name: "warp",
    color: "#111111",
    behavior: [
        "M1%30 AND SW%30|M1%30 AND SW%30|M1%30 AND SW%30",
        "M1%30 AND SW%30|DL%1|M1%30 AND SW%30",
        "M1%30 AND SW%30|M1%30 AND SW%30|M1%30 AND SW%30",
    ],
    category: "special",
    state: "gases",
},

//unrealistically flammable thing
elements.unnamed_gas = {
    color: "#ddee11",
    behavior: [
        "M1%05 AND SW%2 AND HT:1%1|M1%05 AND SW%2 AND HT:1%1|M1%05 AND SW%2 AND HT:1%1",
        "M1%10 AND SW%2 AND HT:1%1|HT:1%1.000000000000000000|M1%10 AND SW%2 AND HT:1%1",
        "M1%15 AND SW%2 AND HT:1%1|M1%15 AND SW%2 AND HT:1%1|M1%15 AND SW%2 AND HT:1%1",
    ],
    behaviorOn: [
        "M1%10 AND SW%4 AND HT:2%2|M1%10 AND SW%4 AND HT:2%2|M1%10 AND SW%4 AND HT:2%2",
        "M1%20 AND SW%4 AND HT:2%2|HT:2%2 AND CH:plasma%0.01|M1%20 AND SW%4 AND HT:2%2",
        "M1%30 AND SW%4 AND HT:2%2|M1%30 AND SW%4 AND HT:2%2|M1%30 AND SW%4 AND HT:2%2",
    ],
    category: "gases",
    burn: 3000,
    burnTime: 5,
    burnInto: "burning_unnamed_gas",
    state: "gas",
    density: 2,
    tempHigh: 95,
    stateHigh: "burning_unnamed_gas",
    conduct: 0.2,
    }, 

elements.burning_unnamed_gas = {
    color: "#eedd11",
    behavior: [
        "M2 AND HT:3750%70 AND CR:plasma%10|M1 AND HT:3750%70 AND CR:plasma%10.000000000000000000000000000000000000000000|M2 AND HT:3750%70 AND CR:plasma%10",
        "M1 AND HT:3750%70 AND CR:plasma%10|HT:3750%70.000000 AND CH:plasma%6.71 AND EX:9>plasma,plasma,burning_unnamed_gas%0.25|M1 AND HT:3750%70 AND CR:plasma%10",
        "M2 AND HT:3750%70 AND CR:plasma%10|M1 AND HT:3750%70 AND CR:plasma%10.000000000000000000000000000000000000000000|M2 AND HT:3750%70 AND CR:plasma%10",
    ],
    behaviorOn: [
        "M2 AND HT:7500%70 AND CR:plasma%15|M1 AND HT:7500%70 AND CR:plasma%15.00000000000000000000000000000000000|M2 AND HT:7500%70 AND CR:plasma%15",
        "M1 AND HT:7500%70 AND CR:plasma%15|HT:7500%70 AND CH:plasma%5.60 AND EX:11>plasma,plasma,burning_unnamed_gas%0.5|M2 AND HT:7500%70 AND CR:plasma%15",
        "M2 AND HT:7500%70 AND CR:plasma%15|M1 AND HT:7500%70 AND CR:plasma%15.00000000000000000000000000000000000|M2 AND HT:7500%70 AND CR:plasma%15",
    ],
    category: "gases",
    burn: 2000,
    burnTime: 950,
    burnInto: "plasma",
    state: "gas",
    density: 1.5,
    tempHigh: 200001,
    stateHigh: "plasma",
    hidden: true,
    excludeRandom: true,
}, 

elements.unnamed_powder = {
    color: "#cddd22",
    behavior: [
        "HT:2%2 AND CR:unnamed_gas%3|HT:2%2 AND CR:unnamed_gas%3|HT:2%2 AND CR:unnamed_gas%3",
        "HT:2%2 AND CR:unnamed_gas%1|HT:2%2.00000000000000000000|HT:2%2 AND CR:unnamed_gas%1",
        "M2 AND HT:2%2.0000000000000|M1 AND HT:2%2.0000000000000|M2 AND HT:2%2.0000000000000",
    ],
    behaviorOn: [
        "HT:4%4 AND CR:unnamed_gas%6|HT:4%4 AND CR:unnamed_gas%6|HT:4%4 AND CR:unnamed_gas%6",
        "HT:4%4 AND CR:unnamed_gas%2|HT:4%4.00000000000000000000|HT:4%4 AND CR:unnamed_gas%2",
        "M2 AND HT:4%4.0000000000000|M1 AND HT:4%4.0000000000000|M2 AND HT:4%4.0000000000000",
    ],
    category: "powders",
    burn: 3000,
    burnTime: 5,
    burnInto: "burning_unnamed_gas",
    state: "powders",
    density: 20,
    tempHigh: 95,
    stateHigh: "burning_unnamed_gas",
    conduct: 0.4,
}, 

elements.burning_unnamed_powder = {
    color: "#ddcd22",
    behavior: [
        "HT:89850%70 AND CR:burning_unnamed_gas%7|HT:89850%70 AND CR:burning_unnamed_gas%7.0000000000000000000000000000000000000000000000000000000000000000000000000000|HT:89850%70 AND CR:burning_unnamed_gas%7",
        "HT:89850%70 AND CR:burning_unnamed_gas%7|HT:89850%70 AND CH:plasma%00000000005.60 AND EX:12>plasma,plasma,plasma,burning_unnamed_gas,burning_unnamed_powder%0.5|HT:89850%70 AND CR:burning_unnamed_gas%7",
        "M2 AND HT:89850%70 AND CR:burning_unnamed_gas%7|M1 AND HT:89850%70 AND CR:burning_unnamed_gas%7.00000000000000000000000000000000000000000000000000000000000000|M2 AND HT:89850%70 AND CR:burning_unnamed_gas%7",
    ],
    behaviorOn: [
        "HT:179700%70 AND CR:burning_unnamed_gas%9|HT:179700%70 AND CR:burning_unnamed_gas%9.00000000000000000000000000000000000000000000000000000000000000000000000000|HT:179700%70 AND CR:burning_unnamed_gas%9",
        "HT:179700%70 AND CR:burning_unnamed_gas%9|HT:179700%70 AND CH:plasma%00000000004.79 AND EX:13>plasma,plasma,plasma,burning_unnamed_gas,burning_unnamed_gas,burning_unnamed_powder%1|HT:179700%70 AND CR:burning_unnamed_gas%9",
        "M2 AND HT:179700%70 AND CR:burning_unnamed_gas%9|M1 AND HT:179700%70 AND CR:burning_unnamed_gas%9.000000000000000000000000000000000000000000000000000000000000|M2 AND HT:179700%70 AND CR:burning_unnamed_gas%9",
    ],
    category: "powders",
    burn: 2000,
    burnTime: 1150,
    burnInto: "plasma",
    state: "powders",
    density: 15,
    tempHigh: 200001,
    stateHigh: "burning_unnamed_gas",
    conduct: 0.4,
    hidden: true,
    excludeRandom: true,
},

elements.steam_remover = { //pov: you tried using water to cool something
    name: "steam remover",
    color: "#542900",
    behavior: [
        "CH:steam>steam_remover|CH:steam>steam_remover|CH:steam>steam_remover",
        "CH:steam>steam_remover|DL%40|CH:steam>steam_remover",
        "CH:steam>steam_remover|CH:steam>steam_remover|CH:steam>steam_remover",
    ],
    category: "special",
    excludeRandom: true,
},

elements.filler_remover = { //pov: you put a filler for fun but now you want your scene back
    name: "filler remover",
    color: "#00dd00",
    behavior: [
        "CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover",
        "CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|DL%40|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover",
        "CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover",
    ],
    "category":"special",
    excludeRandom: true,
},     

elements.plasma_remover = { //why would you need this?
    name: "plasma remover",
    color: "#77ff00",
    behavior: [
        "CH:plasma>plasma_remover|CH:plasma>plasma_remover|CH:plasma>plasma_remover",
        "CH:plasma>plasma_remover|DL%40|CH:plasma>plasma_remover",
        "CH:plasma>plasma_remover|CH:plasma>plasma_remover|CH:plasma>plasma_remover",
    ],
    category: "special",
    temp: 7065,
    excludeRandom: true,
},

elements.black_decay = { //random mystcraft mod reference
    name: "black decay",
    color: "#222222",
    behavior: [
        "XX|CH:black_decay%2 AND DL:black_decay%30|XX",
        "CH:black_decay%1|DL%0.2|CH:black_decay%1",
        "XX|CH:black_decay%1 AND M1|XX",
    ],
    category: "special",
    excludeRandom: true,
},

elements.tungstensteel = {
    color: "#555589",
    behavior: behaviors.FAIRYKILL,
    tempHigh: 3600,
    category: "solids",
    density: 19000,
    conduct: 0.48,
},

elements.molten_tungsten = {
    density: 17600,
    temp: 3500,
    tempHigh: 5555,
    stateHigh: "tungsten_gas",
},         

elements.tungsten_gas = {
    color: "#FFEEE2",
    behavior: [
        "CR:plasma%0.625 AND M2|M1|CR:plasma%0.625 AND M2",
        "M1|XX|M1",
        "CR:plasma%0.625 AND M2|M1|CR:plasma%0.625 AND M2",
    ],
    density: 15800, //https://link.springer.com/article/10.1007/s11661-019-05262-5
    temp: 5600,
    tempLow: 5555,
    stateLow: "molten_tungsten",
    category: "gases",
    hidden: true,
},

elements.molten_steel = {
    reactions: {
        "molten_tungsten": { "elem1":"molten_tungstensteel", "elem2":"molten_tungstensteel" }
    }
}

elements.molten_tungstensteel = {
    behavior: [
        "XX|DL:"+eLists.FAIRY+" AND CR:fire%2.5|XX",
        "DL:"+eLists.FAIRY+" AND M2|XX|DL:"+eLists.FAIRY+" AND M2",
        "M1|DL:"+eLists.FAIRY+"|M1",
    ]
}

elements.rm_water_balloon = {
    name: "water balloon",
    color: "#3dc2ff",
    behavior: [
        "XX|M2|XX",
        "XX|C2:wb3|XX",
        "XX|M1|XX",
    ],
    tempHigh: 180,
    stateHigh: ["steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "steam", "plastic"],
    tempLow: 0,
    stateLow: ["ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "ice", "plastic"],
    category: "special",
    state: "solid",
    density: 997,
}

elements.wb3 = {
    name: "wb3",
    color: "#0856ff",
    behavior: [
        "XX|CR:wb2|XX",
        "CR:wb2|CH:wb2|CR:wb2",
        "XX|CR:wb2|XX",
    ],
    category: "liquid",
    state: "solid",
    density: 997,
    hidden: true,
    excludeRandom: true,
}

elements.wb2 = {
    name: "wb2",
    color: "#145fff",
    behavior: [
        "XX|CR:wb1|XX",
        "CR:wb1|CH:wb1|CR:wb1",
        "XX|CR:wb1|XX",
    ],
    category: "special",
    state: "liquid",
    density: 997,
    hidden: true,
    excludeRandom: true,
}

elements.wb1 = {
    name: "wb1",
    color: "#2167ff",
    behavior: [
        "XX|CR:water|XX",
        "CR:water|CH:water|CR:water",
        "XX|CR:water|XX",
    ],
    category: "special",
    state: "liquid",
    density: 997,
    hidden: true,
    excludeRandom: true,
}

elements.rm_lava_balloon = {
    name: "lava balloon",
    color: "#ffab36",
    behavior: [
        "XX|M2|XX",
        "XX|C2:lb3|XX",
        "XX|M1|XX",
    ],
    temp: 950,
    category: "special",
    state: "solid",
    density: 2725,
}

elements.lb3 = {
    name: "lb3",
    color: "#ff8c00",
    behavior: [
        "XX|CR:lb2|XX",
        "CR:lb2|CH:lb2|CR:lb2",
        "XX|CR:lb2|XX",
    ],
    temp: 1000,
    category: "liquid",
    state: "solid",
    density: 2725,
    hidden: true,
    excludeRandom: true,
}

elements.lb2 = {
    name: "lb2",
    color: "#ff6f00",
    behavior: [
        "XX|CR:lb1|XX",
        "CR:lb1|CH:lb1|CR:lb1",
        "XX|CR:lb1|XX",
    ],
    temp: 1000,
    category: "special",
    state: "liquid",
    density: 2725,
    hidden: true,
    excludeRandom: true,
}

elements.lb1 = {
    name: "lb1",
    color: "#ff4d00",
    behavior: [
        "XX|CR:magma|XX",
        "CR:magma|CH:magma|CR:magma",
        "XX|CR:magma|XX",
    ],
    temp: 1000,
    category: "special",
    state: "liquid",
    density: 2725,
    hidden: true,
    excludeRandom: true,
},

elements.unnamed_substance_bomb = {
    name: "unnamed bomb",
    color: "#cdad52",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>plasma,burning_unnamed_powder,unnamed_powder,unnamed_powder,unnamed_powder,burning_unnamed_gas,unnamed_gas,unnamed_gas,unnamed_gas|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
},

elements.warp_bomb = {
    name: "warp bomb",
    color: "#422e4a",
    behavior: [
        "XX|XX|XX",
        "XX|CC:#5b3a69,#382740,#400e61|XX",
        "M2|M1 AND EX:15>warp|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
},

elements.cluster_nuke = {
    color: "#e3f636",
    behavior: [
        "CR:radiation%5|EX:90>plasma,plasma,plasma,nuke,nuke,nuke,radiation,radiation,radiation,rad_steam,rad_steam,radiation,rad_steam AND CR:radiation%5|CR:radiation%5",
        "CR:radiation%5|XX|CR:radiation%5",
        "M2 AND CR:radiation%5|M1 AND EX:90>plasma,plasma,plasma,nuke,nuke,nuke,radiation,radiation,radiation,rad_steam,rad_steam,radiation,rad_steam AND CR:radiation%5|M2 AND CR:radiation%5",
    ],
    category: "weapons",
    state: "solid",
    density: 1500,
    excludeRandom: true,
},

//hormones

    //estrogens

elements.estradiol = {
    color: "#f2fcee", //it absorbs shorter wavelength UV than testosterone and I am treating this like absorbing violet for convenience
          //https://www.researchgate.net/publication/226065469_Optical_Properties_of_Two_Types_of_Sex_Hormones_of_the_Cyclopentenephenanthrene_Series
          //http://depts.washington.edu/cmditr/modules/lum/color.html
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 1200,
    tempHigh: 173,
    category: "powders",
},

elements.molten_estradiol = {
    tempHigh: 446,
    stateHigh: "vaporized_estradiol",
},

elements.vaporized_estradiol = {
    color: ["#ffbf60","#ffdc60","#ff9d60"], //hormone gas wouldn't glow that brightly at these temperatures but just ignore that
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    hidden: true,
    density: 972,
    tempLow: 446,
    stateLow: "molten_estradiol",
},

    //progestogens

elements.progesterone = {
    color: "#f7eefc", //slightly different? from testosterone but exaggerated
          //https://downloads.hindawi.com/journals/ijps/2017/9603140.pdf
          //these hormones all absorb in the uv region anyway so they would all look white to us
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 1100,
    tempHigh: 121,
    category: "powders",
},

elements.molten_progesterone = {
    tempHigh: 447,
    stateHigh: "vaporized_progesterone",
},

elements.vaporized_progesterone = {
    color: ["#ffbf60","#ffdc60","#ff9d60"],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    hidden: true,
    density: 891,
    tempLow: 447,
    stateLow: "molten_progesterone",
}

    //androgens

elements.testosterone = {
    color: "#f7eef7", //it absorbs longer wavelength UV than estradiol and I am treating this like absorbing green for convenience
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 1100,
    tempHigh: 155,
    category: "powders",
},

elements.molten_testosterone = {
    tempHigh: 433,
    stateHigh: "vaporized_testosterone",
},

elements.vaporized_testosterone = {
    color: ["#ffbf60","#ffdc60","#ff9d60"],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    hidden: true,
    density: 891,
    tempLow: 433,
    stateLow: "molten_testosterone",
},

//other

    //anti-androgens

        //CPA

elements.cyproterone_acetate = {
    color: "#efeef8", //it absorbs far longer uv than the others, which i am rendering as red absorption
          //https://www.researchgate.net/figure/UV-spectrum-for-drospirenone-cyproterone-acetate-desogestrel-and-ethinyl-estradiol-at-1_fig1_315746083
          //i didn't really expect to find a spectrum for this
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 1068,
    tempHigh: 200,
    category: "powders",
},

/*    > Hazardous decomposition products:
    > Hydrogen chloride (HCl)
    > Carbon monoxide and carbon dioxide
    > Hydrogen
    
    > https://cdn.caymanchem.com/cdn/msds/16622m.pdf
    
    so many interesting effects i can't add
*/
elements.molten_cyproterone_acetate = {
    tempHigh: 569,
    stateHigh: "vaporized_cyproterone_acetate",
},

elements.vaporized_cyproterone_acetate = {
    color: ["#ffbf60","#ffdc60","#ff9d60"],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    hidden: true,
    density: 865,
    tempLow: 569,
    stateLow: "molten_cyproterone_acetate",
},

        //spironolactone

elements.spironolactone = {
    color: "#f7eef1", //UV absorbance peak wavelength is slightly shorter than that of testosterone
          //https://www.researchgate.net/publication/348592381_Quantification_of_Spironolactone_by_first_and_second_order_UV_Derivative_Spectrophotometry_in_bulk_and_tablet_dosage_form/link/6006b3cf299bf14088a649bd/download
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 1200,
    tempHigh: 207,
    category: "powders",
},

elements.molten_spironolactone = {
    tempHigh: 597,
    stateHigh: "vaporized_spironolactone",
    /*should have more decomps
    https://sci-hub.se/https://link.springer.com/article/10.1007/BF01979243
    > The TG-DTG curves of spironolactone in Fig. 7 demonstrate that the compound is thermally stable up to 200*C, and that its thermal decomposition occurs between 200 and 620*C. Four consecutive steps are observed in the TG-DTG curves. The first step, up to 260*C is ascribed to the elimination of the substituent group, SCOCH_{3} (TG= 19.59%, Calc. = 19.33%). The second step (260-370*C) and the third and fourth steps (370-700*C) involve losses of 42.93% and 37.48%, respectively, but do not permit a suggestion as to which parts of the compound are eliminated in each step. */
},

elements.vaporized_spironolactone = {
    color: ["#ffbf60","#ffdc60","#ff9d60"],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    hidden: true,
    density: 972,
    tempLow: 597,
    stateLow: "molten_spironolactone",
},

        //finasteride

elements.finasteride = {
    color: "#fcfcf1", //UV absorbance peak wavelength is even shorter than that of estradiol
          //https://www.researchgate.net/publication/312317200
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 1100,
    tempHigh: 253,
    category: "powders",
},

elements.molten_finasteride = {
    tempHigh: 577,
    stateHigh: "vaporized_finasteride",
},

elements.vaporized_finasteride = {
    color: ["#ffbf60","#ffdc60","#ff9d60"],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    hidden: true,
    density: 891,
    tempLow: 577,
    stateLow: "molten_finasteride",
},

        //dutasteride

elements.dutasteride = {
    color: "#fbf6ee", //High UV absorbances around the peak wavelengths of both estradiol and testosterone
          //https://sphinxsai.com/sphinxsaivol_2no.1/pharmtech_vol_2no.1/PharmTech_Vol_2No.1PDF/PT=18%20(113-117).pdf
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 1303, //https://www.chemicalbook.com/ChemicalProductProperty_EN_CB3254628.htm
    tempHigh: 243,
    category: "powders",
},

elements.molten_dutasteride = {
    tempHigh: 620, //http://www.chemspider.com/Chemical-Structure.5293502.html
    stateHigh: "vaporized_dutasteride",
},

elements.vaporized_dutasteride = {
    color: ["#ffbf60","#ffdc60","#ff9d60"],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    hidden: true,
    density: 1055,
    tempLow: 620,
    stateLow: "molten_dutasteride",
},

        //bicalutamide

elements.bicalutamide = {
    color: "#f4fcee", //peaks at 200-220 and at 270
          //i am probably mapping uv to visible wrong and misreading color.html
          //https://www.researchgate.net/publication/257679318
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 1520, //https://www.chemicalbook.com/ProductMSDSDetailCB7457827_EN.htm
    tempHigh: 192,
    category: "powders",
},

elements.molten_bicalutamide = {
    tempHigh: 659,
    stateHigh: "vaporized_bicalutamide",
},

elements.vaporized_bicalutamide = {
    color: ["#ffbf60","#ffdc60","#ff9d60"],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    hidden: true,
    density: 1231,
    tempLow: 659,
    stateLow: "molten_bicalutamide",
},

    //puberty blockers

elements.leuprolide = {
    color: "#f5eefb", //http://dspace.hmlibrary.ac.in:8080/jspui/bitstream/123456789/1143/11/11_Chapter%203.pdf
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 1440, //https://www.chemicalbook.com/ProductMSDSDetailCB7457827_EN.htm
    tempHigh: 150,
    category: "powders",
},

elements.molten_leuprolide = {
    tempHigh: 1720, //https://web.archive.org/web/20210512074205/http://www.shreejipharmainternational.com/leuprolide-acetate-1177796.html
    stateHigh: "vaporized_leuprolide",
},

elements.vaporized_leuprolide = {
    color: ["#ffbf60","#ffdc60","#ff9d60"],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    hidden: true,
    density: 1166,
    tempLow: 1720,
    stateLow: "molten_leuprolide",
},

    //histrelin

elements.histrelin = {
    color: "#f8f5ee", //no spectrum available
    behavior: behaviors.POWDER,
    state: "solid",
    category: "solids",
    density: 1500, //https://www.chemicalbook.com/ProductMSDSDetailCB7457827_EN.htm
    tempHigh: 1800, //https://www.chemsrc.com/en/cas/76712-82-8_1042020.html
    category: "powders",
},

elements.molten_histrelin = {
    color: ["#ffbf60","#ffdc60","#ff9d60"],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    hidden: true,
    tempLow: 1800,
    stateLow: "histrelin",
},

//end of hrt section

elements.anti_bomb = {
    color: "#525c61",
    behavior: [
        "M2|M1 AND EX:10|M2",
        "XX|XX|XX",
        "XX|EX:10|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
}

elements.anti_bomb_2 = {
    color: "#625c71",
    behavior: [
        "M2|M1 AND EX:15|M2",
        "XX|XX|XX",
        "XX|EX:15|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
}

elements.anti_bomb_3 = {
    color: "#825c71",
    behavior: [
        "M2|M1 AND EX:20|M2",
        "XX|XX|XX",
        "XX|EX:20|XX",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
}

elements.bomb_2 = {
    color: "#624c41",
    behavior: [
        "XX|EX:15|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:15|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
},

elements.bomb_3 = {
    color: "#725c41",
    behavior: [
        "XX|EX:20|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:20|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
}

elements.sebA = {
	color: "#ffffff",
	behavior: [
	    "SH%50|EX:8>electric AND SH%50      |SH%50",
	    "SH%50|EX:9>electric%0.5|SH%50",
	    "M2 AND SH%50|M1 AND SH%50 AND EX:8>electric AND SW:electric|M2 AND SH%50",
	],
	category: "weapons",
	state: "solid",
	density: 1200,
	hidden: true,
	excludeRandom: true,
	hardness: 0.3,
},

elements.seb = {
	color: "#ffffff",
	behavior: [
	    "SH%50|EX:8>sebA AND SH%50      |SH%50",
	    "SH%50|XX           |SH%50",
	    "M2 AND SH%50|M1 AND SH%50 AND EX:8>sebA AND SW:electric|M2 AND SH%50",
	],
	category: "weapons",
	state: "solid",
	density: 1800,
	hidden: true,
	excludeRandom: true,
	hardness: 0.3,
},

this.aaa = ["plasma","plasma","plasma","plasma","plasma","plasma","plasma","plasma","plasma","plasma","plasma","plasma","smoke","plasma","plasma","fire","smoke","fire","smoke","plasma","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","acid","acid","oil","oil","oil","oil","oil","oil","oil","plasma","plasma","plasma","plasma","plasma","smoke","plasma","plasma","fire","smoke","plasma","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","flash","flash","flash","flash","flash","acid_gas","acid_gas","acid_gas","acid","oil","oil","oil","oil","oil","oil","oil","oil","oil","oil","plasma","plasma","plasma","plasma","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","acid","acid","oil","oil","oil","oil","oil","oil","oil","plasma","plasma","plasma","plasma","plasma","smoke","plasma","plasma","fire","smoke","plasma","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","seb","seb","flash","flash","flash","flash","flash","acid_gas","acid_gas","acid_gas","acid","oil","oil","oil","oil","oil","oil","oil","oil","oil","oil","plasma","plasma","plasma","plasma","bomb_2","bomb_2","bomb_2","plague","plague","plague","plague","plague","plague","radiation","radiation","radiation","radiation","radiation","radiation","radiation","radiation","uranium","uranium","uranium","uranium","uranium","uranium","greek_fire","greek_fire","greek_fire","greek_fire","greek_fire","antimatter","antimatter","antimatter","antimatter","antimatter","smoke_grenade","antimatter","smoke_grenade","fireball","flash","acid_gas","acid_gas","acid_gas","burning_unnamed_gas","warp","burning_unnamed_gas","warp","warp","plague","plague","plague","plague","plague","plague","radiation","radiation","radiation","radiation","radiation","radiation","radiation","radiation","uranium","uranium","uranium","uranium","uranium","uranium","greek_fire","greek_fire","greek_fire","greek_fire","greek_fire","op_hottester_bomb","antimatter","antimatter","antimatter","antimatter","antimatter","smoke_grenade","antimatter","flash","acid_gas","acid_gas","acid_gas","burning_unnamed_gas","warp","burning_unnamed_gas","warp","warp"]

this.bbb = ["smoke","smoke","smoke","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","acid","acid","oil","oil","oil","oil","oil","oil","oil","smoke","smoke","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","flash","flash","flash","flash","flash","acid_gas","acid_gas","acid_gas","acid","oil","oil","oil","oil","oil","oil","oil","oil","oil","oil","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","acid","acid","oil","oil","oil","oil","oil","oil","oil","smoke","smoke","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","metal_scrap","seb","flash","flash","flash","flash","flash","acid_gas","acid_gas","acid_gas","acid","oil","oil","oil","oil","oil","oil","oil","oil","oil","oil","plague","plague","plague","plague","plague","plague","radiation","radiation","radiation","radiation","radiation","radiation","radiation","radiation","uranium","uranium","uranium","uranium","uranium","uranium","greek_fire","greek_fire","greek_fire","greek_fire","greek_fire","antimatter","antimatter","antimatter","antimatter","antimatter","smoke_grenade","antimatter","smoke_grenade","flash","acid_gas","acid_gas","acid_gas","unnamed_gas","warp","unnamed_gas","warp","warp","plague","plague","plague","plague","plague","plague","radiation","radiation","radiation","radiation","radiation","radiation","radiation","radiation","uranium","uranium","uranium","uranium","uranium","uranium","greek_fire","greek_fire","greek_fire","greek_fire","greek_fire","antimatter","smoke_grenade","flash","acid_gas","acid_gas","acid_gas","unnamed_gas","warp","unnamed_gas","warp","warp"]

elements.amalgamated_bomb = {
    color: ["#FF0000","#FF0000","#FFFF00","#FFFF00","#00FF00","#00FF00","#0000FF","#0000FF"],
	tick: function(pixel) {
		eee = Math.random()
		doHeat(pixel);
		if(!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
			if(pixelMap[pixel.x][pixel.y-1].element != pixel.element) {
				steppedOn = true
			} else steppedOn = false
		} else {
			steppedOn = false
		}
		if(!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if(pixelMap[pixel.x][pixel.y+1].element != pixel.element) {
				landed = true
			} else landed = false
		} else {
			landed = false
		}
		if(outOfBounds(pixel.x,pixel.y+1)) {
			landed = true
		}
		tryMove(pixel, pixel.x, pixel.y+1)
		if(steppedOn == true || landed == true) {
		fire = bbb
		smoke = bbb
		radius = 45
		x = pixel.x
		y = pixel.y
		//SECONDARY
			// if fire contains , split it into an array
			if (fire.includes(",")) {
				fire = fire.split(",");
			}
			// if smoke contains , split it into an array
			if (smoke.includes(",")) {
				smoke = smoke.split(",");
			}
			var coords = circleCoords(x,y,radius);
			var power = radius/10;
			//for (var p = 0; p < Math.round(radius/10+1); p++) {
			for (var i = 0; i < coords.length; i++) {
				// damage value is based on distance from x and y
				var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
				// invert
				damage = 1 - damage;
				if (damage < 0) { damage = 0; }
				damage *= power;
				if (isEmpty(coords[i].x,coords[i].y)) {
					// create smoke or fire depending on the damage if empty
					if (damage < 0.02) { } // do nothing
					else if (damage < 0.2) {
						// if smoke is an array, choose a random item
						if (Array.isArray(smoke)) {
							createPixel(smoke[Math.floor(Math.random() * smoke.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(smoke,coords[i].x,coords[i].y);
						}
					}
					else {
						// if fire is an array, choose a random item
						if (Array.isArray(fire)) {
							createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(fire,coords[i].x,coords[i].y);
						}
					}
				}
				else if (!outOfBounds(coords[i].x,coords[i].y)) {
					// damage the pixel
					var pixel = pixelMap[coords[i].x][coords[i].y];
					var info = elements[pixel.element];
					if (info.hardness) { // lower damage depending on hardness(0-1)
						if (info.hardness < 1) {
							damage = damage * ((1 - info.hardness)*10);
						}
						else { damage = 0; }
					}
					if (damage > 0.25) {
						if (info.breakInto) {
							// if it is an array, choose a random item, else just use the value
							if (Array.isArray(info.breakInto)) {
								var result = info.breakInto[Math.floor(Math.random() * info.breakInto.length)];
							}
							else {
								var result = info.breakInto;
							}
							// change the pixel to the result
							pixel.element = result;
							pixel.color = pixelColorPick(pixel);
							if (elements[result].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[result].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
						else {
							if (Array.isArray(fire)) {
								var newfire = fire[Math.floor(Math.random() * fire.length)];
							}
							else {
								var newfire = fire;
							}
							pixel.element = newfire;
							pixel.color = pixelColorPick(pixel);
							if (elements[newfire].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[newfire].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
					}
					if (damage > 0.75) {
						if (info.burn) {
							pixel.burning = true;
							pixel.burnStart = pixelTicks;
						}
					}
					pixel.temp += damage*radius*power;
					pixelTempCheck(pixel);
				}
			}
		
		fire = aaa
		smoke = aaa
		radius = 30
		//PRIMARY
			// if fire contains , split it into an array
			if (fire.includes(",")) {
				fire = fire.split(",");
			}
			// if smoke contains , split it into an array
			if (smoke.includes(",")) {
				smoke = smoke.split(",");
			}
			var coords = circleCoords(x,y,radius);
			var power = radius/10;
			//for (var p = 0; p < Math.round(radius/10+1); p++) {
			for (var i = 0; i < coords.length; i++) {
				// damage value is based on distance from x and y
				var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
				// invert
				damage = 1 - damage;
				if (damage < 0) { damage = 0; }
				damage *= power;
				if (isEmpty(coords[i].x,coords[i].y)) {
					// create smoke or fire depending on the damage if empty
					if (damage < 0.02) { } // do nothing
					else if (damage < 0.2) {
						// if smoke is an array, choose a random item
						if (Array.isArray(smoke)) {
							createPixel(smoke[Math.floor(Math.random() * smoke.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(smoke,coords[i].x,coords[i].y);
						}
					}
					else {
						// if fire is an array, choose a random item
						if (Array.isArray(fire)) {
							createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(fire,coords[i].x,coords[i].y);
						}
					}
				}
				else if (!outOfBounds(coords[i].x,coords[i].y)) {
					// damage the pixel
					var pixel = pixelMap[coords[i].x][coords[i].y];
					var info = elements[pixel.element];
					if (info.hardness) { // lower damage depending on hardness(0-1)
						if (info.hardness < 1) {
							damage = damage * ((1 - info.hardness)*10);
						}
						else { damage = 0; }
					}
					if (damage > 0.25) {
						if (info.breakInto) {
							// if it is an array, choose a random item, else just use the value
							if (Array.isArray(info.breakInto)) {
								var result = info.breakInto[Math.floor(Math.random() * info.breakInto.length)];
							}
							else {
								var result = info.breakInto;
							}
							// change the pixel to the result
							pixel.element = result;
							pixel.color = pixelColorPick(pixel);
							if (elements[result].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[result].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
						else {
							if (Array.isArray(fire)) {
								var newfire = fire[Math.floor(Math.random() * fire.length)];
							}
							else {
								var newfire = fire;
							}
							pixel.element = newfire;
							pixel.color = pixelColorPick(pixel);
							if (elements[newfire].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[newfire].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
					}
					if (damage > 0.75) {
						if (info.burn) {
							pixel.burning = true;
							pixel.burnStart = pixelTicks;
						}
					}
					pixel.temp += damage*radius*power;
					pixelTempCheck(pixel);
				}
			}
		}
	},
    category: "weapons",
    state: "solid",
    density: 1800,
    excludeRandom: true,
    extraInfo: "a little bit of everything <img aria-label=\":eggTF:\" src=\"https://cdn.discordapp.com/emojis/861270810151616545.png\" alt=\":eggTF:\" draggable=\"false\" data-type=\"emoji\" data-id=\"861270810151616545\" style=\"-o-object-fit: contain; object-fit: contain; width: 1.375em; height: 1.375em; vertical-align: bottom; text-indent: -9999px;\" title=\":eggTF:\">&nbsp;",
},

elements.colder_bomb = {
    color: "#43648e",
	tick: function(pixel) {
		eee = Math.random()
		doHeat(pixel);
		if(!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
			if(pixelMap[pixel.x][pixel.y-1].element != pixel.element) {
				steppedOn = true
			} else steppedOn = false
		} else {
			steppedOn = false
		}
		if(!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if(pixelMap[pixel.x][pixel.y+1].element != pixel.element) {
				landed = true
			} else landed = false
		} else {
			landed = false
		}
		if(outOfBounds(pixel.x,pixel.y+1)) {
			landed = true
		}
		tryMove(pixel, pixel.x, pixel.y+1)
		if(steppedOn == true || landed == true) {
			fire = "cold_fire"
			smoke = "cold_fire"
			radius = 10
			x = pixel.x
			y = pixel.y
			// if fire contains , split it into an array
			if (fire.includes(",")) {
				fire = fire.split(",");
			}
			// if smoke contains , split it into an array
			if (smoke.includes(",")) {
				smoke = smoke.split(",");
			}
			var coords = circleCoords(x,y,radius);
			var power = radius/10;
			//for (var p = 0; p < Math.round(radius/10+1); p++) {
			for (var i = 0; i < coords.length; i++) {
				// damage value is based on distance from x and y
				var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
				// invert
				damage = 1 - damage;
				if (damage < 0) { damage = 0; }
				damage *= power;
				if (isEmpty(coords[i].x,coords[i].y)) {
					// create smoke or fire depending on the damage if empty
					if (damage < 0.02) { } // do nothing
					else if (damage < 0.2) {
						// if smoke is an array, choose a random item
						if (Array.isArray(smoke)) {
							createPixel(smoke[Math.floor(Math.random() * smoke.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(smoke,coords[i].x,coords[i].y);
						}
					}
					else {
						// if fire is an array, choose a random item
						if (Array.isArray(fire)) {
							createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(fire,coords[i].x,coords[i].y);
						}
					}
				}
				else if (!outOfBounds(coords[i].x,coords[i].y)) {
					// damage the pixel
					var pixel = pixelMap[coords[i].x][coords[i].y];
					var info = elements[pixel.element];
					if (info.hardness) { // lower damage depending on hardness(0-1)
						if (info.hardness < 1) {
							damage = damage * ((1 - info.hardness)*10);
						}
						else { damage = 0; }
					}
					if (damage > 0.25) {
						if (info.breakInto) {
							// if it is an array, choose a random item, else just use the value
							if (Array.isArray(info.breakInto)) {
								var result = info.breakInto[Math.floor(Math.random() * info.breakInto.length)];
							}
							else {
								var result = info.breakInto;
							}
							// change the pixel to the result
							pixel.element = result;
							pixel.color = pixelColorPick(pixel);
							if (elements[result].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[result].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
						else {
							if (Array.isArray(fire)) {
								var newfire = fire[Math.floor(Math.random() * fire.length)];
							}
							else {
								var newfire = fire;
							}
							pixel.element = newfire;
							pixel.color = pixelColorPick(pixel);
							if (elements[newfire].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[newfire].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
					}
					if (damage > 0.75) {
						if (info.burn) {
							pixel.burning = true;
							pixel.burnStart = pixelTicks;
						}
					}
					pixel.temp -= damage*radius*power;
					pixelTempCheck(pixel);
				}
			}
		}
	},
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
},

elements.op_hottester_bomb = {
    color: "#cc436e",
	tick: function(pixel) {
		eee = Math.random()
		doHeat(pixel);
		if(!isEmpty(pixel.x,pixel.y-1) && !outOfBounds(pixel.x,pixel.y-1)) {
			if(pixelMap[pixel.x][pixel.y-1].element != pixel.element) {
				steppedOn = true
			} else steppedOn = false
		} else {
			steppedOn = false
		}
		if(!isEmpty(pixel.x,pixel.y+1) && !outOfBounds(pixel.x,pixel.y+1)) {
			if(pixelMap[pixel.x][pixel.y+1].element != pixel.element) {
				landed = true
			} else landed = false
		} else {
			landed = false
		}
		if(outOfBounds(pixel.x,pixel.y+1)) {
			landed = true
		}
		tryMove(pixel, pixel.x, pixel.y+1)
		if(steppedOn == true || landed == true) {
			fire = "plasma"
			smoke = "plasma"
			radius = 15
			x = pixel.x
			y = pixel.y
			// if fire contains , split it into an array
			if (fire.includes(",")) {
				fire = fire.split(",");
			}
			// if smoke contains , split it into an array
			if (smoke.includes(",")) {
				smoke = smoke.split(",");
			}
			var coords = circleCoords(x,y,radius);
			var power = radius/10;
			//for (var p = 0; p < Math.round(radius/10+1); p++) {
			for (var i = 0; i < coords.length; i++) {
				// damage value is based on distance from x and y
				var damage = Math.random() + (Math.floor(Math.sqrt(Math.pow(coords[i].x-x,2) + Math.pow(coords[i].y-y,2)))) / radius;
				// invert
				damage = 1 - damage;
				if (damage < 0) { damage = 0; }
				damage *= power;
				if (isEmpty(coords[i].x,coords[i].y)) {
					// create smoke or fire depending on the damage if empty
					if (damage < 0.02) { } // do nothing
					else if (damage < 0.2) {
						// if smoke is an array, choose a random item
						if (Array.isArray(smoke)) {
							createPixel(smoke[Math.floor(Math.random() * smoke.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(smoke,coords[i].x,coords[i].y);
						}
					}
					else {
						// if fire is an array, choose a random item
						if (Array.isArray(fire)) {
							createPixel(fire[Math.floor(Math.random() * fire.length)],coords[i].x,coords[i].y);
						}
						else {
							createPixel(fire,coords[i].x,coords[i].y);
						}
					}
				}
				else if (!outOfBounds(coords[i].x,coords[i].y)) {
					// damage the pixel
					var pixel = pixelMap[coords[i].x][coords[i].y];
					var info = elements[pixel.element];
					if (info.hardness) { // lower damage depending on hardness(0-1)
						if (info.hardness < 1) {
							damage = damage * ((1 - info.hardness)*10);
						}
						else { damage = 0; }
					}
					if (damage <= 0.25) {
						pixel.temp += Math.floor((damage*radius*power*10)**1.3)
					}
					if (damage > 0.25) {
						if (info.breakInto) {
							// if it is an array, choose a random item, else just use the value
							if (Array.isArray(info.breakInto)) {
								var result = info.breakInto[Math.floor(Math.random() * info.breakInto.length)];
							}
							else {
								var result = info.breakInto;
							}
							// change the pixel to the result
							pixel.element = result;
							pixel.color = pixelColorPick(pixel);
							if (elements[result].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[result].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
						else {
							if (Array.isArray(fire)) {
								var newfire = fire[Math.floor(Math.random() * fire.length)];
							}
							else {
								var newfire = fire;
							}
							pixel.element = newfire;
							pixel.color = pixelColorPick(pixel);
							if (elements[newfire].burning) {
								pixel.burning = true;
								pixel.burnStart = pixelTicks;
							}
							else if (pixel.burning && !elements[newfire].burn) {
								pixel.burning = false;
								delete pixel.burnStart;
							}
						}
						pixel.temp += Math.floor((damage*radius*power*15)**1.5)
					}
					if (damage > 0.75) {
						if (info.burn) {
							pixel.burning = true;
							pixel.burnStart = pixelTicks;
							pixel.temp += Math.floor((damage*radius*power*20)**1.7)
						}
					}
					pixel.temp += Math.floor((damage*radius*power*5)**1.1);
					pixelTempCheck(pixel);
				}
			}
		}
	},
    category: "weapons",
    state: "solid",
	temp: 7065,
    density: 1300,
    excludeRandom: true,
},

elements.liquid_plasma = {
    color: ["#8800ff","#b184d9","#8800ff"],
    behavior: [
    "XX|XX|XX",
    "M2|DL%2|M2",
    "M1|M1|M1",
    ],
    behaviorOn: [
        "XX|CL%5|XX",
        "CL%5 AND M2|XX|CL%5 AND M2",
        "M1|M1 AND CL%5|M1",
    ],
    temp:7065,
    tempLow:5000,
    stateLow: "liquid_fire",
    category: "liquids",
    state: "liquids",
    density: 70,
    charge: 0.5,
    conduct: 1,
},

elements.liquid_fire = {
    color: ["#ff6b21","#ffa600","#ff4000"],
    behavior: [
    "XX|M2|XX",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    reactions: {
        "water": { "elem1": "liquid_smoke" },
    },
    temp:600,
    tempLow:100,
    stateLow: "liquid_smoke",
    tempHigh: 7000,
    stateHigh: "liquid_plasma",
    category: "liquids",
    burning: true,
    burnTime: 500,
    burnInto: "liquid_smoke",
    state: "liquid",
    density: 21,
},

elements.liquid_smoke = {
    color: "#383838",
    behavior: [
    "XX|XX|XX",
    "M2|DL%2|M2",
    "M1|M1|M1",
    ],
    reactions: {
        "water": { "elem1": "dirty_water", "elem2": null },
        "steam": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,15] },
        "rain_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,15] },
        "snow_cloud": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,15] },
        "acid_cloud": { "elem1": "pyrocumulus", "chance":0.05, "y":[0,15] },
        "fire_cloud": { "elem1": "pyrocumulus", "chance":0.05, "y":[0,15] },
        "pyrocumulus": { "elem1": "pyrocumulus", "chance":0.08, "y":[0,15] },
    },
    temp: 114,
    tempHigh: 605,
    stateHigh: "liquid_fire",
    category: "liquids",
    state: "liquids",
    density: 2180,
},

elements.netherrack = {
    color: ["#802b2b","#4f1b1b","#943232"],
    behavior: behaviors.POWDER,
    tempHigh: 7550,
    category: "land",
    state: "solid",
    density: 2550,
    hardness: 0.07,
    breakInto: ["crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","sulfur"], // and some copper, gold, iron, nickel after processing //sulfur closer to 1/7 in-game
    burn: 9,
    burnTime: 9007199254740995,
    burnInto: "netherrack",
},

elements.crushed_netherrack = {
    color: ["#e34b46","#b04235","#73431f","#522510","#7a3326"],
    behavior: behaviors.POWDER,
    category:"land",
    tempHigh: 7550,
    stateHigh: "molten_netherrack",
    state: "solid",
    density: 1680,
    burn: 20,
    burnTime: 9007199254740995,
    hardness: 0.02,
    hidden: true,
},

elements.soul_sand = {
    color: "#755e35",
    behavior: behaviors.POWDER,
    tempHigh: 3000,
    stateHigh: "molten_soul_glass",
    category: "land",
    state: "solid",
    density: 1602,
},

elements.soul_glass = {
    color: ["#998060","#a18654"],
    behavior: behaviors.WALL,
    tempHigh: 3000,
    category: "solids",
    state: "solid",
    density: 2500,
    breakInto: "soul_glass_shard",
    hidden: true,
},

elements.soul_glass_shard = {
    color: ["#998060","#a18654","#8f764a"],
    behavior: behaviors.POWDER,
    tempHigh: 3000,
    stateHigh: "molten_soul_glass",
    category: "powders",
    state: "solid",
    density: 2500,
    hidden: true,
}

runAfterLoad(function() {
  if(enabledMods.includes("mods/fey_and_more.js")) {
    elements.tungstensteel.behavior = [
      "XX|DL:"+eLists.FAIRY+"|XX",
      "DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
      "XX|DL:"+eLists.FAIRY+"|XX",
    ],
    elements.molten_tungstensteel.behavior = [
      "XX|DL:"+eLists.FAIRY+" AND CR:fire%2.5|XX",
      "DL:"+eLists.FAIRY+" AND M2|XX|DL:"+eLists.FAIRY+" AND M2",
      "M1|DL:"+eLists.FAIRY+"|M1",
    ]

    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("mystic_fire")
    aaa.push("mystic_fire")
    aaa.push("firesea")
    aaa.push("firesea")
    aaa.push("firesea")
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("poisonwater")
    aaa.push("mystic_fire")
    aaa.push("mystic_fire")
    aaa.push("firesea")
    aaa.push("firesea")
    aaa.push("firesea")
    aaa.push("lektre")
    aaa.push("lektre")
    aaa.push("lektre")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("mystic_fire")
    bbb.push("mystic_fire")
    bbb.push("firesea")
    bbb.push("firesea")
    bbb.push("firesea")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("poisonwater")
    bbb.push("mystic_fire")
    bbb.push("mystic_fire")
    bbb.push("firesea")
    bbb.push("firesea")
    bbb.push("firesea")
    bbb.push("lektre")
    bbb.push("lektre")
    bbb.push("lektre")
  }
  if(enabledMods.includes("mods/Neutronium Mod.js")) {
    aaa.push("flamer")
    aaa.push("flamebomb")
    aaa.push("flamer")
    aaa.push("flamebomb")
    bbb.push("flamer")
    bbb.push("flamebomb")
    bbb.push("flamer")
    bbb.push("flamebomb")
  }
  elements.vaporized_histrelin = elements.molten_histrelin
  delete elements.molten_histrelin
  elements.histrelin.stateHigh = "vaporized_histrelin"
  elements.vaporized_histrelin.stateLow = "histrelin"

});
