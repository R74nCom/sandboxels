/* by nekonico, do not steal!!!!!! >:3*/

elements.organism = {
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%10|M1|M2%10",
    ],
    color: ["#997457","#a89a76"],
    properties: {
      geneticCode: 0,
      oldvore: 0,
      vore: 0,
      food: 0,
      age: 0,
      dead: false
    },
    tick: function(pixel) {
      if (pixel.vore != pixel.oldvore) {
      if (pixel.vore === 0) {
          if (Math.random() > 0.5) {
            pixel.color = "#997457"
          }
          else {
            pixel.color = "#a89a76"
          }
      }
      else if (pixel.vore === 1) {
        if (Math.random() > 0.5) {
            pixel.color = "#9E6954"
        }
        else {
            pixel.color = "#AB8C6B"
        }
      }
      else if (pixel.vore === 2) {
        if (Math.random() > 0.5) {
            pixel.color = "#A25F50"
        }
        else {
            pixel.color = "#AF7E61"
        }
      }
      else if (pixel.vore === 3) {
        if (Math.random() > 0.5) {
            pixel.color = "#A7544D"
        }
        else {
            pixel.color = "#B27056"
        }
      }
      else if (pixel.vore === 4) {
        if (Math.random() > 0.5) {
            pixel.color = "#A7544D"
        }
        else {
            pixel.color = "#B5624B"
        }
      }
      else if (pixel.vore === 5) {
        if (Math.random() > 0.5) {
            pixel.color = "#AC4A4A"
        }
        else {
            pixel.color = "#B85440"
        }
      }
      else if (pixel.vore === 6) {
        if (Math.random() > 0.5) {
            pixel.color = "#B03F47"
        }
        else {
            pixel.color = "#BC4636"
        }
      }
      else if (pixel.vore === 7) {
        if (Math.random() > 0.5) {
            pixel.color = "#B53543"
        }
        else {
            pixel.color = "#BF382B"
        }
      }
      else if (pixel.vore === 8) {
        if (Math.random() > 0.5) {
            pixel.color = "#B92A40"
        }
        else {
            pixel.color = "#C22A20"
        }
      }
      else if (pixel.vore > 8) {
        if (Math.random() > 0.5) {
            pixel.color = "#BE203D"
        }
        else {
            pixel.color = "#C51C15"
        }
      }
      else if (pixel.vore === -1) {
        if (Math.random() > 0.5) {
            pixel.color = "#8B7C4F"
        }
        else {
            pixel.color = "#9D9A6B"
        }
      }
      else if (pixel.vore === -2) {
        if (Math.random() > 0.5) {
            pixel.color = "#7D8447"
        }
        else {
            pixel.color = "#939A61"
        }
      }
      else if (pixel.vore === -3) {
        if (Math.random() > 0.5) {
            pixel.color = "#6F8C3F"
        }
        else {
            pixel.color = "#889A56"
        }
      }
      else if (pixel.vore === -4) {
        if (Math.random() > 0.5) {
            pixel.color = "#619437"
        }
        else {
            pixel.color = "#7D9A4B"
        }
      }
      else if (pixel.vore === -5) {
        if (Math.random() > 0.5) {
            pixel.color = "#539C2F"
        }
        else {
            pixel.color = "#739A40"
        }
      }
      else if (pixel.vore === -6) {
        if (Math.random() > 0.5) {
            pixel.color = "#46A428"
        }
        else {
            pixel.color = "#689936"
        }
      }
      else if (pixel.vore === -7) {
        if (Math.random() > 0.5) {
            pixel.color = "#38AC20"
        }
        else {
            pixel.color = "#5E992B"
        }
      }
      else if (pixel.vore === -8) {
        if (Math.random() > 0.5) {
            pixel.color = "#2AB418"
        }
        else {
            pixel.color = "#539920"
        }
      }
      else if (pixel.vore < -8) {
        if (Math.random() > 0.5) {
            pixel.color = "#1CBC10"
        }
        else {
            pixel.color = "#489915"
        }
      }
      }
      if (pixel.food > 0 && Math.random() > 0.99) {
        pixel.food -= 1;
      }
      else if (pixel.food < 1 && pixel.age > 1000 && Math.random() > 0.99) {
        pixel.dead = true;
      }
      if (pixel.geneticCode < 11) {
        if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "sugar") {
            deletePixel(pixel.x, pixel.y-1);
            pixel.food += 1
        }
        else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "sugar") {
            deletePixel(pixel.x+1, pixel.y);
            pixel.food += 1
        }
        else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "sugar") {
            deletePixel(pixel.x-1, pixel.y);
            pixel.food += 1
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                changePixel(pixel,"sugar"); 
            }
            else if (Math.random() > 0.5) {
                changePixel(pixel,"dna"); 
            }
        }
        pixel.age += 1
      }
      else if (pixel.geneticCode > 10 && pixel.geneticCode < 21) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x, pixel.y+1);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "sugar") {
            deletePixel(pixel.x, pixel.y-1);
            pixel.food += 1
        }
        if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "sugar") {
            deletePixel(pixel.x, pixel.y+1);
            pixel.food += 1
        }
        else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "sugar") {
            deletePixel(pixel.x+1, pixel.y);
            pixel.food += 1
        }
        else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "sugar") {
            deletePixel(pixel.x-1, pixel.y);
            pixel.food += 1
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"grass"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
            else if (Math.random() > 0.5) {
                changePixel(pixel,"sugar"); 
            }
        }
        pixel.age += 1
      }
      else if (pixel.geneticCode > 20 && pixel.geneticCode < 31) {
        if (Math.random() > 0.95 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.95 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore > -3 && pixel.vore < 3) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "sugar") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "sugar") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "sugar") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "sugar") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore > 2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore < -2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2 ) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"grass"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
            else if (Math.random() > 0.5) {
                changePixel(pixel,"sugar"); 
            }
        }
        pixel.age += 1
      }
      else if (pixel.geneticCode > 30 && pixel.geneticCode < 41) {
        if (Math.random() > 0.9 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.9 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore > -3 && pixel.vore < 3) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "sugar") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "sugar") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "sugar") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "sugar") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore > 2) {
           /* by nekonico, do not steal!!!!!! >:3*/ if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore < -2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            } 
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"rotten_meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"dead_plant"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
            else if (Math.random() > 0.5) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"grass"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
        }
        pixel.age += 1
      }
      else if (pixel.geneticCode > 40 && pixel.geneticCode < 51) {
        if (Math.random() > 0.9 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.9 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore > -3 && pixel.vore < 3) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "sugar") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "sugar") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "sugar") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "sugar") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore > 2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore < -2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"rotten_meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"dead_plant"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
            else if (Math.random() > 0.5) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"grass"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
        }
        pixel.age += 1
      }
      else if (pixel.geneticCode > 50 && pixel.geneticCode < 61) {
        if (Math.random() > 0.8 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.8 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore > -3 && pixel.vore < 3) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "sugar") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "sugar") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "sugar") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "sugar") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore > 2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "fly") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "fly") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "fly") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "fly") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "ant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "ant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "ant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "ant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore < -2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"rotten_meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"dead_plant"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
            else if (Math.random() > 0.5) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"grass"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
        }
        pixel.age += 1
    }
    else if (pixel.geneticCode > 60 && pixel.geneticCode < 71) {
        if (Math.random() > 0.8 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.8 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore > -3 && pixel.vore < 3) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "sugar") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "sugar") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "sugar") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "sugar") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore > 2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "fly") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "fly") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "fly") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "fly") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "ant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "ant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "ant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "ant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "egg") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "egg") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "egg") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "egg") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore < -2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "wood") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "wood") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "wood") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "wood") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bamboo") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bamboo") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bamboo") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bamboo") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"rotten_meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"dead_plant"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
            else if (Math.random() > 0.5) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"grass"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
        }
        pixel.age += 1
    }
    else if (pixel.geneticCode > 70 && pixel.geneticCode < 81) {
        if (Math.random() > 0.75 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.75 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore > -3 && pixel.vore < 3) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && elements[pixelMap[pixel.x][pixel.y-1].element].isFood) {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && elements[pixelMap[pixel.x][pixel.y+1].element].isFood) {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && elements[pixelMap[pixel.x+1][pixel.y].element].isFood) {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && elements[pixelMap[pixel.x-1][pixel.y].element].isFood) {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore > 2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "fly") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "fly") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "fly") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "fly") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "ant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "ant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "ant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "ant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "egg") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "egg") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "egg") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "egg") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bird") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bird") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bird") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bird") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "fish") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "fish") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "fish") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "fish") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore < -2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "wood") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "wood") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "wood") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "wood") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bamboo") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bamboo") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bamboo") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bamboo") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "vine") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "vine") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "vine") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "vine") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "cactus") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "cactus") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "cactus") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "cactus") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.95) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.05) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.95) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.05) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.95) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.05) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"rotten_meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"dead_plant"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
            else if (Math.random() > 0.5) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"grass"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
        }
        pixel.age += 1
      }
      else if (pixel.geneticCode > 80 && pixel.geneticCode < 91) {
        if (Math.random() > 0.75 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.75 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore > -3 && pixel.vore < 3) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && elements[pixelMap[pixel.x][pixel.y-1].element].isFood) {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && elements[pixelMap[pixel.x][pixel.y+1].element].isFood) {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && elements[pixelMap[pixel.x+1][pixel.y].element].isFood) {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && elements[pixelMap[pixel.x-1][pixel.y].element].isFood) {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore > 2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "fly") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "fly") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "fly") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "fly") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "ant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "ant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "ant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "ant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "egg") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "egg") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "egg") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "egg") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bird") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bird") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bird") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bird") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "fish") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "fish") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "fish") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "fish") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "head") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "head") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "head") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "body") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "body") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "body") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore < -2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "wood") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "wood") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "wood") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "wood") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bamboo") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bamboo") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bamboo") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bamboo") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "vine") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "vine") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "vine") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "vine") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "cactus") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "cactus") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "cactus") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "cactus") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "petal") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "petal") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "petal") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "petal") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "pistil") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "pistil") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "pistil") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "pistil") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.95) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.05) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.95) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.05) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.95) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.05) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"rotten_meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"dead_plant"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
            else if (Math.random() > 0.5) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"grass"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
        }
        pixel.age += 1
      }
      else if (pixel.geneticCode > 90 && pixel.geneticCode < 101) {
        if (Math.random() > 0.75 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.75 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore > -3 && pixel.vore < 3) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && elements[pixelMap[pixel.x][pixel.y-1].element].isFood) {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && elements[pixelMap[pixel.x][pixel.y+1].element].isFood) {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && elements[pixelMap[pixel.x+1][pixel.y].element].isFood) {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && elements[pixelMap[pixel.x-1][pixel.y].element].isFood) {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore > 2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "fly") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "fly") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "fly") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "fly") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "ant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "ant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "ant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "ant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "egg") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "egg") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "egg") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "egg") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bird") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bird") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bird") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bird") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "fish") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "fish") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "fish") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "fish") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "head") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "head") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "head") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "body") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "body") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "body") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bone") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bone") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bone") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bone") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "blood") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "blood") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "blood") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "blood") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore < -2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "wood") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "wood") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "wood") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "wood") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bamboo") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bamboo") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bamboo") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bamboo") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "vine") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "vine") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "vine") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "vine") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "cactus") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "cactus") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "cactus") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "cactus") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "petal") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "petal") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "petal") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "petal") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "pistil") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "pistil") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "pistil") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "pistil") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "sapling") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "sapling") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "sapling") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "sapling") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "pinecone") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "pinecone") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "pinecone") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "pinecone") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.995) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.005) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.995) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.005) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.995) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.005) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"rotten_meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"dead_plant"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
            else if (Math.random() > 0.5) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"grass"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
        }
        pixel.age += 1
      }
      else if (pixel.geneticCode > 100) {
        if (Math.random() > 0.75 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.75 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore > -3 && pixel.vore < 3) {
            changePixel(pixel,"human");
        }
        else if (pixel.vore > 2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rotten_meat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rotten_meat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "fly") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "fly") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "fly") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "fly") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "ant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "ant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "ant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "ant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "egg") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "egg") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "egg") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "egg") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "rat") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "rat") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "rat") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "rat") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bird") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bird") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bird") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bird") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "fish") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "fish") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "fish") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "fish") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "head") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "head") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "head") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "head") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "body") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "body") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "body") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bone") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bone") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bone") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bone") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "blood") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "blood") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "blood") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "blood") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        else if (pixel.vore < -2) {
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "grass") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "grass") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "grass") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "grass") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "dead_plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "dead_plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "plant") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "plant") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "plant") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "plant") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "tree_branch") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "tree_branch") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "wood") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "wood") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "wood") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "wood") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "bamboo") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "bamboo") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "bamboo") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "bamboo") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "vine") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "vine") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "vine") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "vine") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "cactus") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "cactus") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "cactus") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "cactus") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "petal") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "petal") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "petal") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "petal") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "pistil") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "pistil") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "pistil") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "pistil") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "sapling") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "sapling") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "sapling") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "sapling") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "pinecone") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "pinecone") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "pinecone") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "pinecone") {
                deletePixel(pixel.x-1, pixel.y);
                pixel.food += 1
            }
        }
        if (isEmpty(pixel.x, pixel.y-1) && pixel.food > 10) {
            createPixel("organism", pixel.x, pixel.y-1);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.995) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.005) {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x][pixel.y-1].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x+1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x+1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.995) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.005) {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x+1][pixel.y].vore = pixel.vore;
            }
        }
        else if (isEmpty(pixel.x-1, pixel.y) && pixel.food > 10) {
            createPixel("organism", pixel.x-1, pixel.y);
            pixel.food -= 5;
            if (Math.random() > 0.8) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode += 1;
            }
            if (Math.random() < 0.2) {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].geneticCode = pixel.geneticCode;
            }
            if (Math.random() > 0.995) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore += 1;
            }
            if (Math.random() < 0.005) {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore -= 1;
            }
            else {
                pixelMap[pixel.x-1][pixel.y].vore = pixel.vore;
            }
        }
        if (pixel.age > 10000 || pixel.dead === true) {
            if (Math.random() > 0.3) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"rotten_meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"dead_plant"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
            else if (Math.random() > 0.5) {
                if (pixel.vore > 0) {
                    changePixel(pixel,"meat"); 
                }
                else if (pixel.vore < 0) {
                    changePixel(pixel,"grass"); 
                }
                else if (pixel.vore === 0) {
                    changePixel(pixel,"sugar"); 
                }
            }
        }
        pixel.age += 1
      }
      pixel.oldvore = pixel.vore
    }, 
    reactions: {
        "cancer": { elem1:"cancer", chance:0.005 },
        "radiation": { elem1:["ash","grass","meat","cooked_meat","dead_plant","dna","sugar"], chance:0.4, func:function(pixel) {
            if (pixel1.vore > 2) {
                changePixel(pixel,"cooked_meat");
            }
            else if (pixel1.vore < -2) {
                changePixel(pixel,"dead_plant");
            }
            else if (pixel1.vore > -3 && pixel1.vore < 3) {
                changePixel(pixel,"ash");
            }
        }},
    },
    burn: 10,
    burnTime: 250,
    burnInto: ["cooked_meat","dead_plant","dna","sugar"],
    tempHigh: 150,
    stateHigh: ["cooked_meat","dead_plant","dna","sugar"],
    tempLow: -50,
    stateLow: ["frozen_meat","frozen_plant","dna","sugar"],
    breakInto: ["rotten_meat","dead_plant","dna","sugar"],
    category: "organism",
    state: "solid",
    density: 1050
}

elements.food_pill = {
    behavior: behaviors.POWDER,
    reactions: {
        "organism": { elem1: null, chance:0.1, func:function(pixel1,pixel2) {
            if (pixel2.vore > 2) {
                pixel2.food += 2
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
            else if (pixel2.vore < -2) {
                pixel2.food += 2
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
            else if (pixel2.vore > -3 && pixel2.vore < 3) {
                pixel2.food += 5
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
        }},
    }, 
    category: "organism",
    state: "solid",
    color: ["#2b1107","#5c3322","#2b1107","#5c3322","#2b1107","#5c3322"],
    tempHigh: 250,
    stateHigh: ["sugar","cooked_meat","smoke","smoke","smoke","dead_plant","smoke","smoke","smoke","stench"],
    burn: 10,
    burnTime: 200,
    burnInto: ["sugar","cooked_meat","smoke","smoke","smoke","dead_plant","smoke","smoke","smoke","stench"],
    breakInto: ["sugar","cooked_meat","dead_plant","dust","dust","dust","dust","dust","dust","dust","dust","dust","dust","dust","dust","dust"],
    breakIntoColor: ["#2b1107","#5c3322","#5c3322","#5c3322","#5c3322","#5c3322","#5c3322","#5c3322","#41770B","#774C35"],
    isFood: true
}

elements.pacifism_pill = {
    behavior: behaviors.POWDER,
    reactions: {
        "organism": { elem1: null, chance:0.1, func:function(pixel1,pixel2) {
            if (pixel2.vore > 0) {
                pixel2.vore -= 1
                if (Math.random() > 0.9) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
            else if (pixel2.vore < 0) {
                pixel2.vore -= 1
                pixel2.food += 1
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
            else if (pixel2.vore === 0) {
                pixel2.vore -= 1
                if (Math.random() > 0.9) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
        }},
    },
    category: "organism",
    state: "solid",
    color: ["#58AA38","#58AA38","#3D6D4B","#316232","#6CA65A","#58AA38","#3D6D4B","#316232","#58AA38","#58AA38","#3D6D4B","#316232"],
    tempHigh: 250,
    stateHigh: ["molten_plastic","dead_plant","smoke","smoke","smoke","dead_plant","smoke","smoke","smoke","stench","stench"],
    burn: 10,
    burnTime: 200,
    burnInto: ["molten_plastic","dead_plant","smoke","smoke","smoke","dead_plant","smoke","smoke","smoke","stench","stench"],
    breakInto: ["dead_plant","dust","dust","dust","dust","dust","dust"],
    breakIntoColor: ["#6CA65A","#58AA38","#6CA65A","#6CA65A"],
    isFood: true
}

elements.neutrality_pill = {
    behavior: behaviors.POWDER,
    reactions: {
        "organism": { elem1: null, chance:0.1, func:function(pixel1,pixel2) {
            if (pixel2.vore > 0) {
                pixel2.vore -= 1
                if (Math.random() > 0.9) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
            else if (pixel2.vore < 0) {
                pixel2.vore += 1
                if (Math.random() > 0.9) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
            else if (pixel2.vore === 0) {
                pixel2.food += 1
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
        }},
    },
    category: "organism",
    state: "solid",
    color: ["#c5dede","#c5dede","#464196","#2E2B64","#a4b3b3","#c5dede","#464196","#2E2B64","#c5dede","#c5dede","#464196","#2E2B64"],
    tempHigh: 250,
    stateHigh: ["molten_plastic","sugar","smoke","smoke","smoke","sugar","smoke","smoke","smoke","stench","stench"],
    burn: 10,
    burnTime: 200,
    burnInto: ["molten_plastic","sugar","smoke","smoke","smoke","sugar","smoke","smoke","smoke","stench","stench"],
    breakInto: ["sugar","dust","dust","dust","dust","dust","dust"],
    breakIntoColor: ["#a4b3b3","#c5dede","#a4b3b3","#a4b3b3"],
    isFood: true
}

elements.aggression_pill = {
    behavior: behaviors.POWDER,
    reactions: {
        "organism": { elem1: null, chance:0.1, func:function(pixel1,pixel2) {
            if (pixel2.vore > 0) {
                pixel2.vore += 1
                pixel2.food += 1
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
            else if (pixel2.vore < 0) {
                pixel2.vore += 1
                if (Math.random() > 0.9) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
            else if (pixel2.vore === 0) {
                pixel2.vore += 1
                if (Math.random() > 0.9) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.9) {
                    pixel2.geneticCode += 1
                };
            }
        }},
    },
    category: "organism",
    state: "solid",
    color: ["#B13E3E","#B13E3E","#8E122A","#870C1C","#A83232","#B13E3E","#8E122A","#870C1C","#B13E3E","#B13E3E","#8E122A","#870C1C"],
    tempHigh: 250,
    stateHigh: ["molten_plastic","cooked_meat","smoke","smoke","smoke","cooked_meat","smoke","smoke","smoke","stench","stench"],
    burn: 10,
    burnTime: 200,
    burnInto: ["molten_plastic","cooked_meat","smoke","smoke","smoke","cooked_meat","smoke","smoke","smoke","stench","stench"],
    breakInto: ["cooked_meat","dust","dust","dust","dust","dust","dust"],
    breakIntoColor: ["#A83232","#B13E3E","#A83232","#A83232"],
    isFood: true
}

elements.growth_pill = {
    behavior: behaviors.POWDER,
    reactions: {
        "organism": { elem1: null, chance:0.1, func:function(pixel1,pixel2) {
            if (pixel2.vore > 0) {
                if (Math.random() > 0.9) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.99) {
                    pixel2.vore += 1
                };
                pixel2.geneticCode += 1
            }
            else if (pixel2.vore < 0) {
                if (Math.random() > 0.8) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.99) {
                    pixel2.vore -= 1
                };
                pixel2.geneticCode += 1
            }
            else if (pixel2.vore === 0) {
                if (Math.random() > 0.75) {
                    pixel2.food += 1
                };
                pixel2.geneticCode += 1
            }
        }},
    },
    category: "organism",
    state: "solid",
    color: ["#ECF4B0","#ECF4B0","#D1D099","#CBCA8C","#D2D9A6","#ECF4B0","#D1D099","#CBCA8C","#ECF4B0","#ECF4B0","#D1D099","#CBCA8C"],
    tempHigh: 250,
    stateHigh: ["molten_plastic","sugar","smoke","smoke","smoke","herb","smoke","smoke","smoke","stench"],
    burn: 10,
    burnTime: 200,
    burnInto: ["molten_plastic","sugar","smoke","smoke","smoke","herb","smoke","smoke","smoke","stench"],
    breakInto: ["sugar","dust","dust","dust","dust","dust","dust","herb","dust","dust","dust","dust","dust","dust"],
    breakIntoColor: ["#D2D9A6","#ECF4B0","#D2D9A6","#D2D9A6"],
    isFood: true
}

elements.antiaging_pill = {
    name: "anti-aging_pill",
    behavior: behaviors.POWDER,
    reactions: {
        "organism": { elem1: null, chance:0.1, func:function(pixel1,pixel2) {
            if (pixel2.age > 99) {
                pixel2.age -= 100;
                if (Math.random() > 0.999) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.995) {
                    pixel2.geneticCode += 1
                };
            }
            else if (pixel2.age < 100) {
                pixel2.age = 100;
                if (Math.random() > 0.999) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.995) {
                    pixel2.geneticCode += 1
                };
            }
        }},
    },
    category: "organism",
    state: "solid",
    color: ["#B8C5C5","#B8C5C5","#9291A6","#8C8B99","#A8AFAF","#B8C5C5","#9291A6","#8C8B99","#B8C5C5","#B8C5C5","#9291A6","#8C8B99"],
    tempHigh: 250,
    stateHigh: ["molten_plastic","magnesium","smoke","smoke","smoke","sugar","smoke","smoke","smoke","stench","stench","stench"],
    burn: 10,
    burnTime: 200,
    burnInto: ["molten_plastic","magnesium","smoke","smoke","smoke","sugar","smoke","smoke","smoke","stench","stench","stench"],
    breakInto: ["magnesium","dust","dust","dust","dust","dust","dust","sugar","dust","dust","dust","dust","dust","dust"],
    breakIntoColor: ["#A8AFAF","#B8C5C5","#A8AFAF","#A8AFAF"],
    isFood: true
}

elements.regression_pill = {
    behavior: behaviors.POWDER,
    reactions: {
        "organism": { elem1: null, chance:0.1, func:function(pixel1,pixel2) {
            if (pixel2.vore > 0) {
                if (Math.random() > 0.9) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.99) {
                    pixel2.vore -= 1
                };
                pixel2.geneticCode -= 1
            }
            else if (pixel2.vore < 0) {
                if (Math.random() > 0.8) {
                    pixel2.food += 1
                };
                if (Math.random() > 0.99) {
                    pixel2.vore += 1
                };
                pixel2.geneticCode -= 1
            }
            else if (pixel2.vore === 0) {
                if (Math.random() > 0.75) {
                    pixel2.food += 1
                };
                pixel2.geneticCode -= 1
            }
        }},
    },
    category: "organism",
    state: "solid",
    color: ["#c5dede","#c5dede","#D1D099","#CBCA8C","#a4b3b3","#c5dede","#D1D099","#CBCA8C","#c5dede","#c5dede","#D1D099","#CBCA8C"],
    tempHigh: 250,
    stateHigh: ["molten_plastic","sugar","smoke","smoke","smoke","herb","smoke","smoke","smoke","stench"],
    burn: 10,
    burnTime: 200,
    burnInto: ["molten_plastic","sugar","smoke","smoke","smoke","herb","smoke","smoke","smoke","stench"],
    breakInto: ["sugar","dust","dust","dust","dust","dust","dust","herb","dust","dust","dust","dust","dust","dust"],
    breakIntoColor: ["#a4b3b3","#ECF4B0","#a4b3b3","#a4b3b3"],
    isFood: true
}

/* by nekonico, do not steal!!!!!! >:3*/
