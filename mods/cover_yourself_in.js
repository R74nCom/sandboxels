function highBloodColumn(xx,yy) {
  //console.log("from " + xx + "," + yy)
  if(!outOfBounds(xx,yy)) {
    for(i = yy; i < pixelMap[xx].length; i++) {
        if(isEmpty(xx,i,false)) {
            if(Math.random() < 0.5) {
                createPixel("blood",xx,i)
            }
            if(Math.random() < 0.3) { 
                if(!isEmpty(xx,yy,true)) {
                    deletePixel(xx,yy)
                }
            }
        } else if(!isEmpty(xx,i,false) && !outOfBounds(xx,i)) {
            break;
        } else if(!isEmpty(xx,i,false) && outOfBounds(xx,i)) {
            break;
        } else {
            break;
        } 
    }
  }
}

//cliche'
elements.blood_cloud = {
    color: "#9c3e35",
        behavior: [
            "XX|XX|XX",
            "XX|CH:blood%0.05|M1%2.5 AND BO",
            "XX|XX|XX",
        ],
    category:"gases",
    temp: 30,
    state: "gas",
    density: 0.5,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.02,
},

elements.heavy_blood_cloud = {
    color: "#c22d23",
    behavior: [
        "XX|XX|XX",
        "XX|CH:blood%0.1|M1%2.5 AND BO",
        "XX|CR:blood%0.05|XX",
    ],
    category:"gases",
    temp: 30,
    state: "gas",
    density: 0.7,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.03,
},

elements.heavier_blood_cloud = {
    color: "#b02219",
    behavior: [
        "XX|XX|XX",
        "XX|CH:blood%0.2|M1%2.5 AND BO",
        "XX|CR:blood%0.1|XX",
    ],
    category:"gases",
    temp: 30,
    state: "gas",
    density: 0.9,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.04,
},

elements.heaviest_blood_cloud = {
    color: "#910f07",
    behavior: [
        "XX|XX|XX",
        "XX|CH:blood%0.4|M1%2.5 AND BO",
        "XX|CR:blood%0.2|XX",
    ],
    category:"gases",
    temp: 30,
    state: "gas",
    density: 1.1,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.05,
},

elements.heaviester_blood_cloud = {
    color: "#690600",
    behavior: [
        "XX|XX|XX",
        "XX|CH:blood%0.8|M1%2.5 AND BO",
        "XX|CR:blood%0.4|XX",
    ],
    tick: function(pixel) {
        if(Math.random() < 0.01) {
            for(i = pixel.y + 1; i < pixelMap[i].length; i++) {
                if(isEmpty(pixel.x,i,false)) {
                    if(Math.random() < 0.5) {
                        createPixel("blood",pixel.x,i)
                    }
                    if(Math.random() < 0.3) { 
                        if(!isEmpty(pixel.x,pixel.y,true)) {
                            deletePixel(pixel.x,pixel.y)
                        }
                    }
                } else if(!isEmpty(pixel.x,i,false) && !outOfBounds(pixel.x,i)) {
                    break;
                } else if(!isEmpty(pixel.x,i,false) && outOfBounds(pixel.x,i)) {
                    break;
                } else {
                    break;
                } 
            }
        }
    },
    category:"gases",
    temp: 30,
    state: "gas",
    density: 1.15,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.06,
},

elements.heaviestest_blood_cloud = {
    color: "#330301",
    behavior: [
        "XX|CR:blood%0.8|XX",
        "CR:blood%0.05|CH:blood%3|CR:blood%0.05 AND M1%2.5 AND BO",
        "XX|CR:blood%0.8|XX",
    ],
    tick: function(pixel) {
        if(Math.random() < 0.02) {
            highBloodColumn(pixel.x-1,pixel.y + 1)
            highBloodColumn(pixel.x,pixel.y + 1)
            highBloodColumn(pixel.x+1,pixel.y + 1)
        }
    },
    category:"gases",
    temp: 30,
    state: "gas",
    density: 1.2,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.07,
}
