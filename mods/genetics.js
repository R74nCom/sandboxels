elements.organism = {
  color: ["#a19348","#b5a85e"],
  properties: {
    geneticCode: 00000,
    food: 0
  },
  tick: function(pixel) {
    if ((pixel.geneticCode & 0b101) = 0) {
      if (tryMove(pixel, pixel.x, pixel.y+1)) {
        if ((pixel.geneticCode & 0b10) > 0 && Math.random() < 0.1) {
          if (!isEmpty(pixel.x,pixel.y+1),true && pixelMap[pixel.x][pixel.y+1].isFood) {
            deletePixel(pixel.x, pixel.y+1);
            pixel.food += 1
          }
        }
        else if ((pixel.geneticCode & 0b10) = 0 && Math.random() < 0.1) {
          if (!isEmpty(pixel.x,pixel.y+1),true && pixelMap[pixel.x][pixel.y+1].element === "sugar") {
            deletePixel(pixel.x, pixel.y+1);
            pixel.food += 1
          }
        }
      }
      if ((pixel.geneticCode & 0b10) > 0 && Math.random() < 0.1) {
        if (!isEmpty(pixel.x+1,pixel.y),true && pixelMap[pixel.x+1][pixel.y].isFood) {
          deletePixel(pixel.x+1, pixel.y);
          pixel.food += 1
        }
        else if (!isEmpty(pixel.x-1,pixel.y),true && pixelMap[pixel.x-1][pixel.y].isFood) {
          deletePixel(pixel.x-1, pixel.y);
          pixel.food += 1
        }
      }
      else if ((pixel.geneticCode & 0b10) = 0 && Math.random() < 0.1) {
        if (!isEmpty(pixel.x+1,pixel.y),true && pixelMap[pixel.x+1][pixel.y].element === "sugar") {
          deletePixel(pixel.x+1, pixel.y);
          pixel.food += 1
        }
        else if (!isEmpty(pixel.x-1,pixel.y),true && pixelMap[pixel.x-1][pixel.y].element === "sugar") {
          deletePixel(pixel.x-1, pixel.y);
          pixel.food += 1
        }
      }
      if (pixel.food === 5 && isEmpty(pixel.x,pixel.y-1)) {
        createPixel("organism", pixel.x, pixel.y-1);
        pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
        pixel.food -= 5;
      }
      else if (pixel.food === 5 && isEmpty(pixel.x+1,pixel.y)) {
        createPixel("organism", pixel.x, pixel.y-1);
        pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
        pixel.food -= 5;
      }
      else if (pixel.food === 5 && isEmpty(pixel.x-1,pixel.y)) {
        createPixel("organism", pixel.x, pixel.y-1);
        pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
        pixel.food -= 5;
      }
    }
    else if ((pixel.geneticCode & 0b101) = 1) {
      if (tryMove(pixel, pixel.x, pixel.y+1)) {
        if ((pixel.geneticCode & 0b10) = 1 && Math.random() < 0.1) {
          if (!isEmpty(pixel.x,pixel.y+1),true && pixelMap[pixel.x][pixel.y+1].isFood) {
            deletePixel(pixel.x, pixel.y+1);
            pixel.food += 1
          }
        }
      }
      if ((pixel.geneticCode & 0b10) = 1 && Math.random() < 0.1) {
        if (!isEmpty(pixel.x+1,pixel.y),true && pixelMap[pixel.x+1][pixel.y].isFood) {
          deletePixel(pixel.x+1, pixel.y);
          pixel.food += 1
        }
        else if (!isEmpty(pixel.x-1,pixel.y),true && pixelMap[pixel.x-1][pixel.y].isFood) {
          deletePixel(pixel.x-1, pixel.y);
          pixel.food += 1
        }
      }
      if (pixel.food === 5 && isEmpty(pixel.x,pixel.y-1)) {
        createPixel("organism", pixel.x, pixel.y-1);
        pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
        pixel.food -= 5;
      }
      else if (pixel.food === 5 && isEmpty(pixel.x+1,pixel.y)) {
        createPixel("organism", pixel.x, pixel.y-1);
        pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
        pixel.food -= 5;
      }
      else if (pixel.food === 5 && isEmpty(pixel.x-1,pixel.y)) {
        createPixel("organism", pixel.x, pixel.y-1);
        pixelMap[pixel.x][pixel.y-1].geneticCode = pixel.geneticCode;
        pixel.food -= 5;
      }
    }
  },
  tempHigh: 150,
  stateHigh: "meat",
  tempLow: -50,
  stateLow: "frozen_meat",
  category: "life",
  state: "solid",
  density: 1050
},
