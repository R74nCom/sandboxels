elements.dirt.reactions.metal_scrap = {elem2:"normalPaydirt", elem1:"normalpaydirt"}
elements.dirt.reactions.gold_coin = {elem2:"betterPaydirt", elem1:"betterpaydirt"}
elements.dirt.reactions.uranium = {elem2:"goodPaydirt", elem1:"goodpaydirt"}
elements.dirt.reactions.diamond = {elem2:"bestPaydirt", elem1:"bestpaydirt"}
elements.sand.reactions.wet_sand = {elem2:"opal", elem1:"opal", chance: 0.005, tempMin:40}
elements.metal_scrap.reactions.oxygen = {elem2:["ruby","padparascha","fancy_sapphire","sapphire","sapphire","sapphire","fancy_sapphire","sapphire","sapphire","sapphire"], elem1:"rock", chance: 0.001, tempMin:700}
elements.basalt.reactions.sand = {elem2:"emerald", elem1:"rock", chance: 0.05, tempMin:700}
elements.metal_scrap.reactions.rock = {elem2:"ruby", elem1:"rock", chance: 0.001, tempMin:600}
elements.rock.reactions.basalt = {elem1:"Topaz", chance: 0.01, tempMin: 900}
elements.sodium.reactions.metal_scrap = {elem1:"nephrite", chance: 0.001, tempMin: 60}
elements.hydrogen.reactions.metal_scrap = {elem1:"jadite", chance: 0.001, tempMin: 60}
elements.sand.reactions.sand = {elem1:"quartz", chance: 0.001, tempMin: 400}
elements.salt_water.reactions.gravel = {elem1:"garnet", chance: 0.005, tempMin: 40}
elements.dirty_water.reactions.basalt = {elem1:"zircon", chance: 0.01, tempMin: 40}
elements.opal={
    color:["#CCeeCC","#eeCCCC","#CCCCee","#eeeeee"],
    behavior: [
        "XX|XX|XX",
        "SP|CC:6e4e24%0.1,eeCCCC%1,CCeeCC%1,CCCCee%1,eeeeee%1|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","steam"],
    tempHigh:"100",
    reactions:{
        "water":{elem1:"opal",elem2:"water"}
    },
    breakInto:"sand",
    
}
elements.sapphire={
    color:["#2b5c6e","#335b94","#4880D1","#3041D1","#4a36D1"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["metal_scrap","oxygen"],
    tempHigh:"2040",
    breakInto:["aluminium","oxygen"],
    
}
elements.ruby={
    color:["#d13032","#d14471","#ff5b90","#ff3c3f","#Eb9b9c"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["metal_scrap","chromium","oxygen"],
    tempHigh:"2040",
    breakInto:["aluminium","oxygen"],
    
}
elements.emerald={
    color:["#47d046","#59d999","#7Dd494","#43c846","#45b765"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["metal_scrap","beryllium","oxygen"],
    tempHigh:"2519",
    breakInto:["aluminium","oxygen"],
    
}
elements.topaz={
    color:["#fff3ba","#fDffcE","#fDE0ff","#DaEcff","#D7fff4"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["metal_scrap","hydrogen","oxygen"],
    tempHigh:"1200",
    breakInto:["gravel","oxygen"],
    
}
elements.quartz={
    color:["#fffDfb","#fffEE1","#D4D3bb","#ffEfDD","#ffE2bf"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","oxygen"],
    tempHigh:"1725",
    breakInto:["quartz","electric"],
    
    reactions:{
        "rust":{elem1:["citrine","citrine","citrine","citrine","amethyst"]},
        "sand":{elem1:"agate", chance: 0.001},
    },
}
elements.amethyst={
    color:["#cfa2ff","#f2a2ff","#f6D8ff","#b479ED","#ca51f5"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","rust","oxygen","radiation","citrine"],
    tempHigh:"1600",
    breakInto:["sand","oxygen"],
    
}
elements.citrine={
    color:["#f5E1c3","#f5D7a3","#f5D07a","#f5ca59","#D19a23"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","rust","oxygen"],
    tempHigh:"1750",
    breakInto:["sand","oxygen"],
    
}
elements.garnet={
    color:["#ff8a01","#D64b07","#D6613D","#D66769"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","gravel","metal_scrap","rust","magnesium"],
    tempHigh:"1300",
    breakInto:["rust","magnesium"],
    
}
elements.zircon={
    color:["#b86142","#b8712c","#E08f25","#b3381b"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["gravel","oxygen","rust"],
    tempHigh:"1300",
    breakInto:["rust","gravel"],
    
}
elements.agate={
    color:["#b25D3f","#E8c6bb","#336baD","#8aaD94"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["gravel","quartz","amethyst"],
    tempHigh:"1500",
    breakInto:["sand","oxygen"],
    
}
elements.laminar={
    color:["#a7f9ff","#CCfbff","#8fffE2","#aCCfcE"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
         "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["slag","quartz","gravel"],
    tempHigh:"700",
    breakInto:["sand","oxygen","quartz"],
    
}
elements.bloodstone={
    color:["#56785b","#3a7848","#8baD71","#8a2828"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
         "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","quartz","gravel"],
    tempHigh:"1230",
    breakInto:["sand","quartz","rock"],
    
}
elements.rutile={
    color:["#8a743b","#c99c2f","#E8ab2a","#E88D35"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["titanium","oxygen","gravel"],
    tempHigh:"1843",
    breakInto:["titanium","oxygen"],
    
}
elements.tigersEye={
    color:["#4D3E1a","#c99c2f","#52381a","#E88D35"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["rutile","quartz","gravel"],
    tempHigh:"1700",
    breakInto:["titanium","oxygen"],
    
}
elements.onyx={
    color:["#222222","#ffffff","#000000"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["gravel","quartz","agate"],
    tempHigh:"200",
    breakInto:["sand","oxygen"],
    
}
elements.blackopal={
    color:["#22CC22","#2222CC","#CC2222","#777722","#772277","#227777","#111111","#000000","#000000","#000000","#000000","#000000"],
    behavior: [
        "XX|XX|XX",
        "SP|CC:6e4e24%0.04,22CC22%1,22eeee%1,2222CC%1,111111%1,000000%1|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","steam"],
    tempHigh:"100",
    reactions:{
        "water":{elem1:"blackopal",elem2:"water"}
    },
    breakInto:["sand","oxygen","water"],
    
}
elements.fancysapphire={
    color:["#DD97ff","#ffcf8b","#D2ffb0","#3041D1","#b2fffa"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["metal_scrap","oxygen"],
    tempHigh:"2040",
    breakInto:["aluminium","oxygen"],
    
}
elements.carnelian={
    color:["#aD3c3c","#D63131","#Eb3535"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["metal_scrap","oxygen"],
    tempHigh:"3000",
    breakInto:["gravel","oxygen"],
    
}
elements.nephrite={
    color:["#EbEbEb","#E4EbD4","#D0EbCC"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["calcium","sand","rust","oxygen","magnesium","hydrogen"],
    tempHigh:"1060",
    breakInto:["magnesium","oxygen","rust","calcium"],
    
    reactions:{
        "calcium":{elem1:"jadite",chance: 0.001, tempmin: 80}
    },
}
elements.jadite={
    color:["#2a9E31","#499E5a","#649E74"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sodium","oxygen","sand"],
    tempHigh:"1040",
    breakInto:["sodium","oxygen"],
    
}
elements.titanium={
    color:["#bCCED1","#D1D1D1","#E8E8E8"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    category:"solids",
    state:"solid",
    stateHigh:"moltentitanium",
    tempHigh:"1668",
        reactions:{
        "oxygen":{elem1:"rutile",elem2:"oxygen"},
        "water":{elem1:"rutile",elem2:"water"}
    },
    conduct: 0.47,
}
elements.moltentitanium={
    color:["#E87D00","#E8Df00","#E83c00"],
    behavior: [
        "XX|cr:fire%5|XX",
        "M2|XX|M2",
        "M1|M1|M1"
    ],
    category:"states",
    state:"liquid",
    stateLow:"titanium",
    tempLow:"1667",
    conduct: 0.47,
}
elements.rawtanzanite={
    color:["#6E4D1B","#6E5B1A","#6E5324","#6E5E2D","#6E4D1B","#6E5B1A","#6E5324","#6E5E2D","#6E4D1B","#6E5B1A","#6E5324","#6E5E2D","#6E4D1B","#6E5B1A","#6E5324","#6E5E2D","#6E4D1B","#6E5B1A","#6E5324","#6E5E2D","#6E4D1B","#6E5B1A","#6E5324","#6E5E2D","#7D7EAB","#D18D8E","#9CBDD1"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["tanzanite","mudstone"],
    tempHigh:"700",
    breakInto:["aluminium","calcium"],
    
}
elements.tanzanite={
    color:["#c474ff","#8176ff","#646Dff","#4258D6","#3344D6","#2937aD"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["aluminium","calcium"],
    tempHigh:"2000",
    breakInto:["aluminium","calcium"],
    
}
elements.peridot={
    color:["#3D9c32","#599c34","#6fc241","#7CC24c","#71aD53"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["magnesium","rust"],
    tempHigh:"1400",
    breakInto:["magnesium","rust"],
    
}
elements.commontourmaline={
    color:["#273828","#293834","#1a2421","#1f241b"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sodium","rust","magnesium","aluminium","raretourmaline"],
    tempHigh:"1100",
    breakInto:["magnesium","rust"],
    
}
elements.raretourmaline={
    color:["#4b963f","#658E96","#bf91D6","#a6D67f"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sodium","rust","magnesium","aluminium"],
    tempHigh:"1100",
    breakInto:["magnesium","rust"],
    
}
elements.rawberyl={
    color:["#D1D1D1","#E6E6E6","#E5E3D5","#CECFCE"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","gravel","rock"],
    tempHigh:"1000",
    breakInto:"beryl_explosion",
}
elements.beryl={
    color:["#afD677","#D6a579","#D67777","#D678b3"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["rust","beryllium","sand","aluminium"],
    tempHigh:"1300",
    breakInto:["gravel","rust"],
    
}
elements.bixbite={
    color:["#851315","#A12124","#A13637","#A14C4E"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["rust","beryllium","sand","aluminium"],
    tempHigh:"1300",
    breakInto:["gravel","rust"],
}
elements.benitoite={
    color:["#8AD4E0","#88ACE0","#7372E0","#505FE0"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2 AND SA"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["titanium","beryllium","sand","oxygen"],
    tempHigh:"1060",
    breakInto:["gravel","titanium"],
}
elements.kunzite={
    color:["#f7f7f7","#f7f7f7","#ffffff","#ffDDfb","#ffcbf5"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["gravel","quartz","sand","aluminium"],
    tempHigh:"1700",
    breakInto:["gravel","quartz"],
    
}
elements.kyanite={
    color:["#2b3085","#477Dc4","#4f2aE3","#6cb5a1","#ffffff"],
    behavior: [
        "SP|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","aluminium"],
    tempHigh:"1100",
    breakInto:["metal_scrap","sand"],
    
}
elements.apatite={
    color:["#91CCf0","#8bf0DD","#5fDbb6","#5fDbDb"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "SP|M1|SP"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["calcium","carbon_dioxide"],
    tempHigh:"1670",
    breakInto:["calcium","limestone"],
    
}
elements.azurite={
    color:["#3a5Db3","#264fDE","#4265ba"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["copper","carbon_dioxide"],
    tempHigh:"840",
    breakInto:["oxidised_copper","limestone"],
    
}
elements.aquamarine={
    color:["#cEfffE","#c1ffff","#Dcfcff"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "SP|M1|SP"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["aluminium","sand","oxygen"],
    tempHigh:"1650",
    breakInto:["sand","limestone"],
    
}
elements.turquoise={
    color:["#4bE6bE","#4cDEE5","#55D7E5","#8f4D00"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "SP|M1|SP"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["rust","copper","oxygen"],
    tempHigh:"1700",
    breakInto:["copper","rock"],
    
}
elements.rosequartz={
    color:["#fDD4ff","#ffD7E9","#ffcEff"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","oxygen"],
    tempHigh:"1700",
    breakInto:["sand","rock"],
    
}
elements.smokyquartz={
    color:["#b07f53","#b08b70","#D6b9a0","#472a12"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","oxygen"],
    tempHigh:"1700",
    breakInto:["sand","rock"],
    
}
elements.milkyquartz={
    color:["#ffffff","#E0E0E0","#ffffff","#ffffff"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","oxygen"],
    tempHigh:"1700",
    breakInto:["sand","rock"],
    
}
elements.jasper={
    color:["#b54345","#5b9155"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["rust","gravel"],
    tempHigh:"1700",
    breakInto:["gravel","rock"],
    
}
elements.leopardjasper={
    color:["#bDa484","#bDba79","#2b2b1c","#8f6061"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["rust","gravel"],
    tempHigh:"1700",
    breakInto:["gravel","rock"],
    
}
elements.picturejasper={
    color:["#D6cE9b","#D6D08f"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["rust","gravel"],
    tempHigh:"1700",
    breakInto:["gravel","rock"],
    
}
elements.oceanjasper={
    color:["#D6D3a7","#99a5D6","#9aD6c5","#99c3D6"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["rust","gravel"],
    tempHigh:"1700",
    breakInto:["gravel","rock"],
    
}
elements.rainforestjasper={
    color:["#97aD7f","#81aD81","#cfcb9b"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["rust","gravel"],
    tempHigh:"1700",
    breakInto:["gravel","rock"],
    
}
elements.obsidian={
    color:["#363636","#000000","#000000"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["magma","basalt"],
    tempHigh:"1200",
    breakInto:["glass_shard","gravel","rock"],
    
}
elements.lapislazuli={
    color:["#0721ff","#292bE0","#2f5EE0"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["calcium","iron","sulfer"],
    tempHigh:"1100",
    breakInto:["gravel","rust"],
    
}
elements.pearl={
    color:["#ffE0fb","#E7ffE4","#DfEbff","#DDDDDD","#EEEEEE"],
    behavior: [
        "XX|XX|XX",
        "M2|XX|M2",
        "SP|M1|SP"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["calcium","limestone"],
    tempHigh:"1100",
    breakInto:["gravel","calcium"],
    
    viscosity:"400",
}
elements.chalcedony={
    color:["#CC9b77","#c7CC79","#76CCa2","#85c5CC","#8382CC"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "SP|M1|SA"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["quartz","rock"],
    tempHigh:"1100",
    breakInto:["gravel","sand"],
    
}
elements.rawmoissanite={
    color:["#2b0069","#002169","#003D2c","#000000","#000000"],
    behavior: [
        "SP|XX|SP",
        "XX|XX|XX",
        "SA AND M2|M1|SP AND m2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["moissanite","dust","ash"],
    tempHigh:"2600",
    breakInto:["gravel","sand"],
    
}
elements.moissanite={
    color:["#DfDfff","#faDbff","#DDfaff","#E0ffE0","#fff0Df"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["quartz","charcoal"],
    tempHigh:"2730",
    breakInto:["gravel","sand"],
    
}
elements.amazonite={
    color:["#629c7D","#77bf81","#71bf6a"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|SP",
        "XX|M1|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["quartz","copper"],
    tempHigh:"1500",
    breakInto:["copper","sand"],
    
}
elements.malachite={
    color:["#0f7324","#0f7359","#0f7359","#1D735f"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|XX",
        "M2|M1 AND SP|M2 AND SA"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["carbon_dioxide","oxidised_copper","copper"],
    tempHigh:"1000",
    breakInto:["copper","limestone"],
    
}
elements.cubiczircona={
    color:["#FFF3EB","#E8FFE7","#F3E8FF","#ffffff"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["zircon","oxygen"],
    tempHigh:"1000",
    breakInto:["gravel","zircon"],
    
}
elements.cinnibar={
    color:["#F20606","#D40505","#B30404","#8F0303"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "SP|M1|SP"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sulfur_gas","mercury_gas"],
    tempHigh:"580",
    breakInto:["gravel","mercury"],
    
}
elements.alexandrite={
    color:["#125416","#2A9146"],
    behavior: [
        "XX|XX|XX",
        "XX|CC:#125416%0.3 AND CC:#2A9146%0.3|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["beryllium","oxygen","aluminium"],
    tempHigh:"1900",
    breakInto:["metal_scrap","beryllium"],
    
    reactions:{
        "uv_light":{elem1:"alexandrite",elem2:"light", color1:["#99004d","#99004d","#c9003c"], color2:["#9539C2","#AA72E0","#9A89CF"]}
    }
}
elements.rhodonite={
    color:["#ED4747","#ED8282","#EDA3A3","#EDC4C4","#EDD3D3"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["magnesium","oxygen","sand"],
    tempHigh:"1250",
    breakInto:["magnesium","gravel"],
    
}
elements.cerussite={
    color:["#FFFBDF","#FFF8D1","#D1CEB8","#8F8D7E"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|SA",
        "M2 AND SP|M1|M2 AND SP"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["lead","oxygen","carbon_dioxide"],
    tempHigh:"380",
    breakInto:["carbon_dioxide","gravel"],
    
}
elements.charoite={
    color:["#9460CC","#9A6CCC","#A07ACC","#A78ACC","#C7AFE6","#D5C8E5"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|XX",
        "SA|M1|SP"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["potassium","oxygen","calcium","sand"],
    tempHigh:"1400",
    breakInto:["potassium","sand","gravel"],
}
elements.chromediopside={
    color:["#11750E","#377538","#499C4B"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|XX",
        "SA|M1|SP"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["chromium","magnesium","oxygen","calcium","sand"],
    tempHigh:"1400",
    breakInto:["chromium","magnesium","gravel"],
}
elements.diopside={
    color:["#D0E6D0","#D9E5D9","#E2E5E2"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|XX",
        "SA|M1|SP"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["magnesium","oxygen","calcium","sand"],
    tempHigh:"1400",
    breakInto:["magnesium","gravel"],
}
elements.lepidolite={
    color:["#BE6CEB","#9A6BEB","#976EB0","#F0E0FF"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "SA AND M2|M1|SA AND M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["potassium","sand","carbon_dioxide","hydrogen"],
    tempHigh:"1200",
    breakInto:["carbon_dioxide","aluminium","hydrogen"],
    
}
elements.painite={
    color:["#FF0004","#FF006A","#AD2A2A","#8C420C","#AD1414","#8C1010"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["calcium","zircon","carbon_dioxide","aluminium"],
    tempHigh:"2090",
    breakInto:["carbon_dioxide","aluminium","calcium"],
    
}
elements.moonstone={
    color:["#DDDDDD","#D6D6D6","#C8D1D6","#C1D2D6","#BED7F0"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["potassium","sand","sodium","oxygen"],
    tempHigh:"1090",
    breakInto:["potassium","aluminium","sodium","oxygen"],
    
}
elements.iolite={
    color:["#7DAFE5","#859CF7","#C4A0F7","#E4D0F7","#EDE6F7"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["magnesium","sand","rust","oxygen"],
    tempHigh:"1090",
    breakInto:["metal_scrap","aluminium","rust","oxygen"],
}
elements.andalusite={
    color:["#C28567","#C2A266","#C2C066","#97C264","#9FC283"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M1|M2|M1"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["aluminium","sand","oxygen"],
    tempHigh:"1090",
    breakInto:["metal_scrap","aluminium","sand","oxygen"],
}
elements.astrophyllite={
    color:["#C29715","#C2A34F","#E6E6E6","#CCCCCC","#5E5E5E","#383838"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|SP",
        "M1 AND SA|M2|M1 AND SA"
    ],
    category:"gemstones",
    state:"solid",
    breakInto:["potassium","iron","magnesium","sand","titanium","oxygen"],
}
elements.thunder_egg={
    color:["#423B34","#42372B","#C7B9AD","#524545","#303030"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","gravel","rock"],
    tempHigh:"1000",
    breakInto:"thunder_egg_explosion",
}
elements.thunder_egg_explosion={
    color:["#423B34","#303030"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:4>agate,agate,agate,agate,agate,chalcedony,leopardjasper,picturejasper,jasper,rainforestjasper,oceanjasper|XX",
        "XX|XX|XX"
    ],
    category:"energy",
}
elements.beryl_explosion={
    color:["#CECFCE","#E5E6E5"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:4>beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,beryl,bixbite|XX",
        "XX|XX|XX"
    ],
    category:"energy",
}
elements.geode_explosion={
    color:["#423B34","#303030"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:4>rock,rock,rock,sand,gravel,quartz,quartz,quartz,milkyquartz,rosequartz,smokyquartz|XX",
        "XX|XX|XX"
    ],
    category:"energy",
}
elements.geode={
    color:["#B8B094","#B8A892","#C9C29A","#948F85"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["sand","gravel","rock"],
    tempHigh:"1000",
    breakInto:"geode_explosion",
}
elements.chromite={
    color:["#8B6DA3","#883BB3","#8149B2","#A645DB","#CA3EF5"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|SP",
        "SP|M1|SP"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["chromium","iron","rust"],
    tempHigh:"1900",
    breakInto:["gravel","chromium","rust"],
}
elements.fluorite={
    color:["#93CFB5","#7DCFB2","#91CFAB","#8FBFE5","#AE83E5"],
    behavior: [
        "SP|XX|XX",
        "XX|XX|XX",
        "SP AND M2|M1|SA AND M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["gravel","sand","calcium"],
    tempHigh:"1350",
    breakInto:["calcium","sand","smoke"],
}
elements.sodalite={
    color:["#ADB2CF","#8B91CF","#2860CF","#1C22CF","#2114B3"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["chlorine","metal_scrap","sodium"],
    tempHigh:"1080",
    breakInto:["sodium","sand","chlorine"],
}
elements.jeremejevite={
    color:["#636BE5","#775FE5"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2 AND SA|M1|M2 AND SA"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["smoke","metal_scrap","oxygen"],
    tempHigh:"1050",
    breakInto:["aluminium","gravel","oxygen"],
}
elements.spinel={
    color:["#2F9655","#2F9655","#6518B8","#1C51B8"],
    behavior: [
        "XX|XX|XX",
        "XX|CC:#2F9655%1 AND CC:#6518B8%0.5 AND CC:#1C51B8%0.5|XX",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["smoke","metal_scrap","oxygen"],
    tempHigh:"1050",
    breakInto:["aluminium","gravel","oxygen"],
    reactions:{
        "uv_light":{elem1:"spinel",elem2:"light", color1:["#9657BD","#B557BD","#CF5AA3"], color2:["#9657BD","#B557BD","#CF5AA3"]}
    }
}
elements.asbestos={
    color:"#FAF9D9",
    behavior: [
        "SP|XX|SP",
        "XX|XX|XX",
        "SA AND M2|M1|SP AND m2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["fire","plague","dust","ash"],
    tempHigh:"800",
    breakInto:["gravel","sand"],
    reactions:{
        "body":{elem2:"cancer", chance:0.02},
        "head":{elem2:"cancer", chance:0.02}
    }
    
}
elements.tsavorite={
    color:["#00bf06","#009105","#006904"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["aluminium","calcium","chromium"],
    tempHigh:"2000",
    breakInto:["aluminium","calcium"],
}
elements.vanadinite={
    color:["#634e00","#b85600","#c93c00"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2 AND SP|M1 AND SP|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["vanadium","sulfer","smoke"],
    tempHigh:"1600",
    breakInto:["vanadium","sulfer"],
}
elements.padparascha={
    color:["#ffa3a9","#ffa3ce","#ffbaa3"],
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["metal_scrap","oxygen"],
    tempHigh:"2040",
    breakInto:["aluminium","oxygen"],
     
}
elements.celestite={
    color:["#B1E5FF","#CAEFFF","#B6D7E5","#EFFAFF"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|SA",
        "SA AND M2|M1|M2"
    ],
    category:"gemstones",
    state:"solid",
    stateHigh:["metal_scrap","oxygen","sulfer"],
    tempHigh:"2040",
    breakInto:["sulfer","metal_scrap","oxygen"],
     
}
elements.betterpaydirt={
    color:["#6E4c25","#c26E15","#9c6422"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category:"gemology",
    state:"solid",
    reactions:{
        "water":{elem1:["geode","thunder_egg","sodalite","fluorite","moonstone","cerussite","amazonite","jasper","oceanjasper","rainforestjasper","leopardjasper","picturejasper","obsidian","fluorite","rutile","pyrite","apatite","tigersEye","tigersEye","agate","agate","agate","zircon","dirt","mud","mud","mud","mud","dirt","dirt","dirt","dirt","dirt","dirt","mud","mudstone","tuff"],elem2:"dirty_water"}
    },
}
elements.goodpaydirt={
    color:["#6E4c25","#9c9288","#c2bfbc"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category:"gemology",
    state:"solid",
    reactions:{
        "water":{elem1:["iolite","chromite","andalusite","chromediopside","charoite","diopside","geode","thunder_egg","lepidolite","rhodonite","cubiczircona","malachite","pearl","lapislazuli","aquamarine","carnelian","azurite","kyanite","commontourmaline","onyx","carnelian","onyx","jadite","nephrite","nephrite","amethyst","amethyst","amethyst","garnet","dirt","dirt","dirt","dirt","dirt","dirt","mud","mud","mud","mud","mud","mud","mud","mud","dirt","mudstone","tuff"],elem2:"dirty_water"}
    },
}
elements.bestpaydirt={
    color:["#6E4c25","#735f19","#ffca3D"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category:"gemology",
    state:"solid",
    reactions:{
        "water":{elem1:["jeremejevite","astrophyllite","painite","alexandrite","benitoite","rawmoissanite","opal","blackopal","emerald","fancysapphire","rawtanzanite","raretourmaline","rawberyl","kunzite","ruby","SApphire","mud","dirt","dirt","dirt","dirt","dirt","dirt","dirt","mudstone","tuff"],elem2:"dirty_water"}
    },
}
elements.sieve={
    color:"#fDffCC",
    behavior: [
        "SA|SW:dirty_water,water|SA",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category:"gemology",
    state:"solid",
}
//metals
elements.beryllium={
    color:"#5C665C",
    category:"solids",
    behavior:[
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    stateHigh:"molten_beryllium",
    tempHigh:"1300",
    conduct: 0.47,
}
elements.molten_beryllium={
    color:["#F25000","#ff6845","#ff8752"],
    behavior:[
        "XX|cr:fire%10|XX",
        "M2|XX|M2",
        "M1|M1|M1"
    ],
    stateLow:"beryllium",
    tempLow:"1299",
    viscosity:"20",
    category:"states",
    conduct: 0.47,
}
elements.chromium={
    color:"#D0E6D0",
    category:"solids",
    behavior:[
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    stateHigh:"molten_chromium",
    tempHigh:"1900",
    conduct: 0.47,
}
elements.molten_chromium={
    color:["#F25000","#ff6845","#ff8752"],
    behavior:[
        "XX|cr:fire%10|XX",
        "M2|XX|M2",
        "M1|M1|M1"
    ],
    stateLow:"chromium",
    tempLow:"1899",
    viscosity:"20",
    category:"states",
    conduct: 0.47,
}
elements.uv_light= {
    color: "#cc00ff",
    behavior: [
        "XX|XX|XX",
        "XX|DL%5|XX",
        "XX|XX|XX",
    ],
    tick: behaviors.BOUNCY,
    temp: 35,
    tempLow: -273,
    stateLow: ["liquid_light",null],
    stateLowColorMultiplier: 0.8,
    breakInto: "light",
    breakIntoColor: "#ffcfcf",
    category: "gemology",
    density: 0.00001,
    ignoreAir: true,
    reactions:{
        "alexandrite":{elem1:"air"}
    }
}
elements.vanadium={
    color:"#6e6e6e",
    category:"solids",
    behavior:[
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2"
    ],
    stateHigh:"molten_vanadium",
    tempHigh:"1920",
    conduct: 0.47,
}
elements.molten_vanadium={
    color:["#F25000","#ff6845","#ff8752"],
    behavior:[
        "XX|cr:fire%10|XX",
        "M2|XX|M2",
        "M1|M1|M1"
    ],
    stateLow:"vanadium",
    tempLow:"1905",
    viscosity:"20",
    category:"states",
    conduct: 0.47,
}
