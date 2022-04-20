elements.codeine_phosphate =  {
    density: 1320, //pure codeine density, couldn't find phosphate's D
    tempHigh: 157.5,
    color: "#e0e0e0",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    reactions: {
        "promethazine_hydrochloride": { elem1: null, elem2: "cp_ph_mixture" },
        "wet_promethazine_hydrochloride": { elem1: null, elem2: "cp_ph_mixture" },
    },
}

elements.promethazine_hydrochloride = {
    density: 1100, //see above density
    tempHigh: 223, //decomps?
    color: "#e0e7e0",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    reactions: {
        "water": { elem1: null, elem2: "wet_promethazine_hydrochloride" },
        "steam": { elem1: null, elem2: "wet_promethazine_hydrochloride" },
    },
}

elements.wet_promethazine_hydrochloride = {
    density: 1600, //guess
    tick: function(pixel) { //thermal splitting function
        var neighbors = [ [-1,0], [1,0], [0,-1], [0,1] ]
        var randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
        var rnx = randomNeighbor[0]
        var rny = randomNeighbor[1]
        if(pixel.temp >= 100) {
            if(isEmpty(pixel.x+rnx, pixel.y+rny, false)) {
                createPixel("steam", pixel.x+rnx, pixel.y+rny)
                changePixel(pixel, "promethazine_hydrochloride")
            }
        }
    },
    color: "#b0b7e0",
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    state: "solid",
}

elements.cp_ph_mixture = {
    density: 1230, //using the 6.25/10 ratio from a CP/PH cough syrup from Morton Grove Pharmaceuticals, Inc. because it was in hot on r/lean (of course there’s a subreddit for that) | this is 6.25 mg pr.hy. and 10 mg co.ph. per 5mL dose, but ratios and reactions aren’t possible and implementing them to this accuracy would also require an accurate cough syrup density 
    tick: function(pixel) { //thermal splitting function
        var neighbors = [ [-1,0], [1,0], [0,-1], [0,1] ]
        var randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
        var rnx = randomNeighbor[0]
        var rny = randomNeighbor[1]
        if(pixel.temp >= 157.5) {
            if(isEmpty(pixel.x+rnx, pixel.y+rny, false)) {
                createPixel("molten_codeine_phosphate", pixel.x+rnx, pixel.y+rny)
                changePixel(pixel, "promethazine_hydrochloride")
            }
        }
    },
    color: "#e0e4e0",
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    state: "solid",
    reactions: {
        "sugar_water": { elem1: "cough_syrup", elem2: "null" },
    },
}

elements.cough_syrup = {
    density: 1200, //(made up)
    viscosity: 190, //https://www.dixonvalve.com/sites/default/files/product/files/brochures-literature/viscosity%20chart.pdf
    color: "#870870",
    behavior: behaviors.LIQUID,
    tick: function(pixel) { //thermal splitting function
        var neighbors = [ [-1,0], [1,0], [0,-1], [0,1] ]
        var randomNeighbor1 = neighbors[Math.floor(Math.random() * neighbors.length)]
        var randomNeighbor2 = neighbors[Math.floor(Math.random() * neighbors.length)]
        var rn1x = randomNeighbor1[0]
        var rn1y = randomNeighbor1[1]
        var rn2x = randomNeighbor2[0]
        var rn2y = randomNeighbor2[1]
        if(pixel.temp >= 100) {
            if(isEmpty(pixel.x+rn1x, pixel.y+rn1y, false) && isEmpty(pixel.x+rn2x, pixel.y+rn2y, false)) {
                createPixel("steam", pixel.x+rn1x, pixel.y+rn1y)
                createPixel("sugar", pixel.x+rn2x, pixel.y+rn2y)
                changePixel(pixel, "cp_ph_mixture")
            }
        }
    },
    category: "liquids",
    hidden: true,
    state: "liquid",
    reactions: {
        "soda": { elem1: "lean", elem2: "lean" },
    },
    
}

elements.lean = {
    density: (3*1037+1200)/4, //https://www.quora.com/How-do-I-make-a-cup-of-lean-And-how-many-millilteres-of-cough-syrup-usually-goes-into-a-standard-cup-of-lean ignoring ice and other things
    viscosity: 4, //made up
    color: "#a527db",
    behavior: [
        "XX|CR:foam%3|XX",
        "M2|XX|M2",
        "M1|M1|M1"
    ],
    tick: function(pixel) { //thermal splitting function
        var neighbors = [ [-1,0], [1,0], [0,-1], [0,1] ]
        var randomNeighbor1 = neighbors[Math.floor(Math.random() * neighbors.length)]
        var randomNeighbor2 = neighbors[Math.floor(Math.random() * neighbors.length)]
        var randomNeighbor3 = neighbors[Math.floor(Math.random() * neighbors.length)]
        var rn1x = randomNeighbor1[0]
        var rn1y = randomNeighbor1[1]
        var rn2x = randomNeighbor2[0]
        var rn2y = randomNeighbor2[1]
        var rn3x = randomNeighbor3[0]
        var rn3y = randomNeighbor3[1]
        if(pixel.temp >= 100) {
            if(isEmpty(pixel.x+rn1x, pixel.y+rn1y, false) && isEmpty(pixel.x+rn2x, pixel.y+rn2y, false) && isEmpty(pixel.x+rn3x, pixel.y+rn3y, false)) {
                createPixel("steam", pixel.x+rn1x, pixel.y+rn1y)
                createPixel("sugar", pixel.x+rn2x, pixel.y+rn2y)
                createPixel("carbon_dioxide", pixel.x+rn3x, pixel.y+rn3y)
                changePixel(pixel, "cp_ph_mixture")
            }
        }
    },
    category: "liquids",
    hidden: true, //for best results, play on unlock mode :eggTF:
    state: "liquid",
    stain: 0.03, //purple meme
}
