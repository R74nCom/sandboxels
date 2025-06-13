// Industry, made by PogDog.
// For that sweet sweet feeling of destroying the Ozone.
// Thanks nouser for the help, especially with the conveyors.

// Conveyors!


elements.conveyer_right = {
    color: "#9999ff",
    behavior: behaviors.SOLID,
    category: "industry",
    state: "wall",
    density: 2500,
    data: {},
    movable: false,
    noMix: true,
};

elements.conveyer_left = {
    color: "#9999cc",
    behavior: behaviors.SOLID,
    category: "industry",
    state: "wall",
    density: 2500,
    data: {},
    movable: false,
    noMix: true,
};

runAfterLoad(function () {
    runEveryTick(function () {
        // RIGHTWARD movement: scan right to left
        for (let x = width - 1; x >= 0; x--) {
            for (let y = height - 1; y >= 0; y--) {
                const pixel = pixelMap[x][y];
                if (pixel && pixel.element === "conveyer_right") {
                    for (let dy = 1; dy <= 10; dy++) {
                        const targetY = y - dy;
                        if (targetY < 0) break;
                        const stackPixel = pixelMap[x]?.[targetY];
                        if (!stackPixel || !elements[stackPixel.element]?.movable) break;
                        if (isEmpty(x + 1, targetY)) {
                            movePixel(stackPixel, x + 1, targetY);
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        // LEFTWARD movement: scan left to right
        for (let x = 0; x < width; x++) {
            for (let y = height - 1; y >= 0; y--) {
                const pixel = pixelMap[x][y];
                if (pixel && pixel.element === "conveyer_left") {
                    for (let dy = 1; dy <= 10; dy++) {
                        const targetY = y - dy;
                        if (targetY < 0) break;
                        const stackPixel = pixelMap[x]?.[targetY];
                        if (!stackPixel || !elements[stackPixel.element]?.movable) break;
                        if (isEmpty(x - 1, targetY)) {
                            movePixel(stackPixel, x - 1, targetY);
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    });
});

// Oven

elements.oven = {
    color: "#734700",
    behavior: behaviors.SOLID,
    category: "industry",
    state: "solid",
    density: 3000,
    movable: false,
    noMix: true,
    tick: function(pixel) {
        let x = pixel.x;
        let y = pixel.y + 1;
        if (isEmpty(x, y)) {
            createPixel("heat_ray", x, y);
            let ray = pixelMap[x][y];

        }
    }
};

// Freezer


elements.freezer = {
    color: "#055b61",
    behavior: behaviors.SOLID,
    category: "industry",
    state: "solid",
    density: 3000,
    movable: false,
    noMix: true,
    tick: function(pixel) {
        let x = pixel.x;
        let y = pixel.y + 1;
        if (isEmpty(x, y)) {
            createPixel("freeze_ray", x, y);
            let ray = pixelMap[x][y];

        }
    }
};

// Exhaust


elements.exhaust = {
    color: "#292929",
    category: "industry",
    state: "gas",
    density: 1.8,
    movable: false,
    noMix: true,
    tick: function(pixel) {
        const x = pixel.x;
        const y = pixel.y;
        const gasTypes = ["carbon_dioxide", "methane", "oxygen", "carbon_dioxide"]; // I am aware this isn't ideal, but it works for my purpouses.

        for (let i = 0; i < gasTypes.length; i++) {
            let ty = y - 1 - i;
            if (ty < 0) break;
            if (isEmpty(x, ty)) {
                createPixel(gasTypes[i], x, ty);
            }
        }
    }
};


// cancer machine!!1

elements.irradiator = {
  color: "#a0ff00",
  category: "industry",
  state: "solid",
  density: 3000,
  movable: false,
  noMix: true,
  tick: function(pixel) {
    const beamWidth = 1;
    const beamLength = 20; // how far down the beam goes
    const startX = pixel.x - Math.floor(beamWidth / 2);
    const endX = startX + beamWidth - 1;

    for (let y = pixel.y + 1; y <= pixel.y + beamLength; y++) {
      if (y < 0 || y >= height) break;
      for (let x = startX; x <= endX; x++) {
        if (x < 0 || x >= width) continue;
        if (isEmpty(x, y)) {
          createPixel("radiation", x, y);
        }
      }
    }
  }
};


// Mixer

elements.mix_beam = {
  color: "#ffff99",
  category: "energy",
  state: "gas",
  density: 0.1,
  movable: false,
  noMix: true,
  tick: function(pixel) {
    const x = pixel.x;
    const y = pixel.y;

    if (y + 1 >= height) {
      deletePixel(x, y);
      return;
    }

    const below = pixelMap[x]?.[y + 1];

    if (!below) {
      movePixel(pixel, x, y + 1);
    } else {
      const mixCoords = [];

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = 0; dy <= 10; dy++) {
          const nx = x + dx;
          const ny = y + 1 + dy;

          if (isEmpty(nx, ny)) continue;
          const p = pixelMap[nx]?.[ny];
          if (p) {
            mixCoords.push({ x: nx, y: ny, element: p.element });
          }
        }
      }

      // Shuffle the element types
      const shuffledElements = mixCoords.map(p => p.element)
        .sort(() => Math.random() - 0.5);

      // Assign shuffled elements back to original coordinates
      for (let i = 0; i < mixCoords.length; i++) {
        const pos = mixCoords[i];
        changePixel(pixelMap[pos.x][pos.y], shuffledElements[i]);
      }

      deletePixel(x, y);
    }
  }
};


// Mixer emitter

elements.beam_mixer_emitter = {
  color: "#ffcc00",
  category: "industry",
  state: "solid",
  behavior: behaviors.WALL,
  tick: function(pixel) {
    if (isEmpty(pixel.x, pixel.y + 1)) {
      createPixel("mix_beam", pixel.x, pixel.y + 1);
    }
  }
};

// Shocker. Legit just irradiator, but a different element.



elements.charger = {
  color: "#f2f200",
  category: "industry",
  state: "solid",
  density: 3000,
  movable: false,
  noMix: true,
  tick: function(pixel) {
    const beamWidth = 1;
    const beamLength = 20; // how far down the beam goes
    const startX = pixel.x - Math.floor(beamWidth / 2);
    const endX = startX + beamWidth - 1;

    for (let y = pixel.y + 1; y <= pixel.y + beamLength; y++) {
      if (y < 0 || y >= height) break;
      for (let x = startX; x <= endX; x++) {
        if (x < 0 || x >= width) continue;
        if (isEmpty(x, y)) {
          createPixel("electric", x, y);
        }
      }
    }
  }
};

// adios beam

elements.deleter_beam = {
  color: "#ff4444",
  category: "energy",
  state: "gas",
  density: 0.1,
  movable: false,
  noMix: true,
  tick: function(pixel) {
    const x = pixel.x;
    const y = pixel.y;

    if (y + 1 >= height) {
      deletePixel(x, y);
      return;
    }

    const below = pixelMap[x]?.[y + 1];

    if (!below) {
      movePixel(pixel, x, y + 1);
    } else {
      deletePixel(x, y);
      deletePixel(below.x, below.y);
    }
  }
};


elements.deleter_beam_emitter = {
  color: "#ff2222",
  category: "industry",
  state: "solid",
  behavior: behaviors.WALL,
  tick: function(pixel) {
    if (isEmpty(pixel.x, pixel.y + 1)) {
      createPixel("deleter_beam", pixel.x, pixel.y + 1);
    }
  }
};
