// use american spelling
elements.cold_gas = {
    color: "#80a3e0",
    behavior: behaviors.GAS,
    category: "cold",
    state: "gas",
    temp: -273,
    tempHigh:-200,
    stateHigh:"cold_liquid"
}
elements.cold_liquid = {
    color: "#80a3e0",
    behavior: behaviors.LIQUID,
    category: "cold",
    state: "liquid",
    temp: -200,
    tempLow: -150,
    stateLow: "cold_gas",
    tick: function(pixel){
        changePixel(pixel,"cold_gas")
    }
}