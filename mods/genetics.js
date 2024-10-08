/* by nekonico, do not steal!!!!!! >:3*/

elements.organism = {
    color: ["#997457","#c4b270","#9c916a","#9e8955","#a89a76"],
    properties: {
      geneticCode: 0,
      oldvore: 0,
      vore: 0,
      food: 0,
      age: 0
    },
    tick: function(pixel) {
      if (pixel.vore != pixel.oldvore) {
      if (pixel.vore === 0) {
          if (Math.random() > 0.5) {
              pixel.color = "#997457"
          }
          else if (Math.random() > 0.5) {
              pixel.color = "#c4b270"
          }
          else if (Math.random() > 0.5) {
              pixel.color = "#9c916a"
          }
          else if (Math.random() > 0.5) {
              pixel.color = "#9e8955"
          }
          else {
              pixel.color = "#a89a76"
          }
      }
      else if (pixel.vore === 1) {
          pixel.color = "#9E6954"
      }
      else if (pixel.vore === 2) {
          pixel.color = "#A25F50"
      }
      else if (pixel.vore === 3) {
          pixel.color = "#A7544D"
      }
      else if (pixel.vore === 4) {
          pixel.color = "#A7544D"
      }
      else if (pixel.vore === 5) {
          pixel.color = "#AC4A4A"
      }
      else if (pixel.vore === 6) {
          pixel.color = "#B03F47"
      }
      else if (pixel.vore === 7) {
          pixel.color = "#B53543"
      }
      else if (pixel.vore === 8) {
          pixel.color = "#B92A40"
      }
      else if (pixel.vore > 8) {
          pixel.color = "#BE203D"
      }
      else if (pixel.vore === -1) {
          pixel.color = "#8B7C4F"
      }
      else if (pixel.vore === -2) {
          pixel.color = "#7D8447"
      }
      else if (pixel.vore === -3) {
          pixel.color = "#6F8C3F"
      }
      else if (pixel.vore === -4) {
          pixel.color = "#619437"
      }
      else if (pixel.vore === -5) {
          pixel.color = "#539C2F"
      }
      else if (pixel.vore === -6) {
          pixel.color = "#46A428"
      }
      else if (pixel.vore === -7) {
          pixel.color = "#38AC20"
      }
      else if (pixel.vore === -8) {
          pixel.color = "#2AB418"
      }
      else if (pixel.vore < -8) {
          pixel.color = "#1CBC10"
      }
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
        if (pixel.age > 2000) {
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
        if (pixel.age > 2000) {
            if (Math.random() > 0.3) {
                changePixel(pixel,"meat"); 
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
        if (pixel.vore === 0) {
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
        if (pixel.age > 2000) {
            if (Math.random() > 0.3) {
                changePixel(pixel,"meat"); 
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
        if (pixel.age > 2000) {
            if (Math.random() > 0.3) {
                changePixel(pixel,"rotten_meat"); 
            }
            else if (Math.random() > 0.5) {
                changePixel(pixel,"meat"); 
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
        if (pixel.age > 2000) {
            if (Math.random() > 0.3) {
                changePixel(pixel,"rotten_meat"); 
            }
            else if (Math.random() > 0.5) {
                changePixel(pixel,"meat"); 
            }
        }
        pixel.age += 1
      }
      else if (pixel.geneticCode > 50) {
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
            if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "algae") {
                deletePixel(pixel.x, pixel.y-1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "algae") {
                deletePixel(pixel.x, pixel.y+1);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x+1, pixel.y, true) && pixelMap[pixel.x+1][pixel.y].element == "algae") {
                deletePixel(pixel.x+1, pixel.y);
                pixel.food += 1
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x-1, pixel.y, true) && pixelMap[pixel.x-1][pixel.y].element == "algae") {
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
        if (pixel.age > 2000) {
            if (Math.random() > 0.3) {
                changePixel(pixel,"rotten_meat"); 
            }
            else if (Math.random() > 0.5) {
                changePixel(pixel,"meat"); 
            }
        }
        pixel.age += 1
      }
      pixel.oldvore = pixel.vore
    }, 
    tempHigh: 150,
    stateHigh: "cooked_meat",
    tempLow: -50,
    stateLow: "frozen_meat",
    category: "organism",
    state: "solid",
    density: 1050
  }

/* by nekonico, do not steal!!!!!! >:3*/
