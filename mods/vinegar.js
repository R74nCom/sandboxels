elements.acetobacter = {
    color: ["#328fa8", "#6bbfd6", "#19718a"],
    category: "life",
    tempHigh: "102",
    tempLow: "-2",
    stateHigh: ["steam","steam","steam","sugar"],
    stateLow: ["ice","ice","ice","sugar_ice"],
    breakInto:["dna","dna","dna","water"],
    behavior: [
        ["XX","M1%30","XX"],
        ["M1%50","XX","M1%50"],
        ["XX","M1%30","XX"]
    ],
    reactions:{
        "alcohol" :{ elem1: "acetobacter", elem2:"vinegar", chance:0.2,}
    }
}
