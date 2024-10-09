/* by nekonico, do not steal!!!!!! >:3*/

elements.organism = {
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
        if (isEmpty(pixel.x, pixel.y+1)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x, pixel.y+1);
        }
        else if (Math.random() > 0.9 && isEmpty(pixel.x-1, pixel.y+1)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y+1);
        }
        else if (Math.random() > 0.9 && isEmpty(pixel.x+1, pixel.y+1)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y+1);
        }
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
        if (isEmpty(pixel.x, pixel.y+1)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x, pixel.y+1);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore === 0) {
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
        else if (pixel.vore > 0) {
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
        else if (pixel.vore < 0) {
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
        if (isEmpty(pixel.x, pixel.y+1)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x, pixel.y+1);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore === 0) {
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
        else if (pixel.vore > 0) {
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
        else if (pixel.vore < 0) {
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
        if (isEmpty(pixel.x, pixel.y+1)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x, pixel.y+1);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore === 0) {
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
        else if (pixel.vore > 0) {
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
        else if (pixel.vore < 0) {
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
        if (isEmpty(pixel.x, pixel.y+1)) {
          movePixel(pixelMap[pixel.x][pixel.y], pixel.x, pixel.y+1);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore === 0) {
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
        else if (pixel.vore > 0) {
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
        else if (pixel.vore < 0) {
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
        if (isEmpty(pixel.x, pixel.y+1)) {
          /* by nekonico, do not steal!!!!!! >:3*/  movePixel(pixelMap[pixel.x][pixel.y], pixel.x, pixel.y+1);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore === 0) {
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
        else if (pixel.vore > 0) {
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
        else if (pixel.vore < 0) {
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
        if (isEmpty(pixel.x, pixel.y+1)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x, pixel.y+1);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore === 0) {
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
        else if (pixel.vore > 0) {
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
        else if (pixel.vore < 0) {
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
      else if (pixel.geneticCode > 80) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x, pixel.y+1);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x-1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x-1, pixel.y);
        }
        else if (Math.random() > 0.99 && isEmpty(pixel.x+1, pixel.y)) {
            movePixel(pixelMap[pixel.x][pixel.y], pixel.x+1, pixel.y);
        }
        if (pixel.vore === 0) {
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
        else if (pixel.vore > 0) {
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
        else if (pixel.vore < 0) {
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
      pixel.oldvore = pixel.vore
    }, 
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","grass","meat","cooked_meat","dead_plant","dna","sugar"], "chance":0.4 },
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

/* by nekonico, do not steal!!!!!! >:3*/
