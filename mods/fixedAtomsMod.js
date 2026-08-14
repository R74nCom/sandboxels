//! @name     atom_mod.js
//! @author   ACrazyPencil
//! @category tools
//! @desc
//!  Adds Nucleus which you can add neutrons, protons and electrons.
//!  And adds merge tool to merge neutrons, protons and electrons in a Nucleus,
//!  Which will turn into an element if the numbers neutrons, protons and electrons are correct for the element.
//!  (c) 2026 ACrazyPencil
//! @createdElements electron; frozen_proton; frozen_neutron; nucleus

var listofelements = {
  hydrogen: [0, 1, 1],
  helium: [2, 2, 2],
  lithium: [4, 3, 3],
  beryllium: [5, 4, 4],
  boron: [6, 5, 5],
  carbon: [6, 6, 6],
  nitrogen: [7, 7, 7],
  oxygen: [8, 8, 8],
  fluorine: [10, 9, 9],
  neon: [10, 10, 10],
  sodium: [12, 11, 11],
  magnesium: [12, 12, 12],
  aluminium: [14, 13, 13],
  silicon: [14, 14, 14],
  phosphorus: [16, 15, 15],
  sulfur: [16, 16, 16],
  chlorine: [18, 17, 17],
  argon: [22, 18, 18],
  potassium: [20, 19, 19],
  calcium: [20, 20, 20],
  scandium: [24, 21, 21],
  titanium: [26, 22, 22],
  vanadium: [28, 23, 23],
  chromium: [28, 24, 24],
  manganese: [30, 25, 25],
  iron: [30, 26, 26],
  cobalt: [32, 27, 27],
  nickel: [30, 28, 28],
  copper: [34, 29, 29],
  zinc: [34, 30, 30],
  gallium: [38, 31, 31],
  germanium: [42, 32, 32],
  arsenic: [42, 33, 33],
  selenium: [46, 34, 34],
  bromine: [44, 35, 35],
  krypton: [48, 36, 36],
  rubidium: [48, 37, 37],
  strontium: [50, 38, 38],
  yttrium: [50, 39, 39],
  zirconium: [50, 40, 40],
  niobium: [52, 41, 41],
  molybdenum: [56, 42, 42],
  technetium: [56, 43, 43],
  ruthenium: [58, 44, 44],
  rhodium: [58, 45, 45],
  palladium: [60, 46, 46],
  silver: [60, 47, 47],
  cadmium: [66, 48, 48],
  indium: [66, 49, 49],
  tin: [70, 50, 50],
  antimony: [70, 51, 51],
  tellurium: [78, 52, 52],
  iodine: [74, 53, 53],
  xenon: [78, 54, 54],
  caesium: [78, 55, 55],
  barium: [82, 56, 56],
  lanthanum: [82, 57, 57],
  cerium: [82, 58, 58],
  praseodymium: [82, 59, 59],
  neodymium: [82, 60, 60],
  promethium: [84, 61, 61],
  samarium: [90, 62, 62],
  europium: [90, 63, 63],
  gadolinium: [94, 64, 64],
  terbium: [94, 65, 65],
  dysprosium: [98, 66, 66],
  holmium: [98, 67, 67],
  erbium: [98, 68, 68],
  thulium: [100, 69, 69],
  ytterbium: [104, 70, 70],
  lutetium: [104, 71, 71],
  hafnium: [108, 72, 72],
  tantalum: [108, 73, 73],
  tungsten: [110, 74, 74],
  rhenium: [112, 75, 75],
  osmium: [116, 76, 76],
  iridium: [116, 77, 77],
  platinum: [117, 78, 78],
  gold: [118, 79, 79],
  mercury: [122, 80, 80],
  thallium: [124, 81, 81],
  lead: [126, 82, 82],
  bismuth: [126, 83, 83],
  polonium: [126, 84, 84],
  astatine: [125, 85, 85],
  radon: [136, 86, 86],
  francium: [136, 87, 87],
  radium: [138, 88, 88],
  actinium: [138, 89, 89],
  thorium: [142, 90, 90],
  protactinium: [140, 91, 91],
  uranium: [146, 92, 92],
  neptunium: [144, 93, 93],
  plutonium: [145, 94, 94],
  americium: [146, 95, 95],
  curium: [148, 96, 96],
  berkelium: [152, 97, 97],
  californium: [154, 98, 98],
  einsteinium: [154, 99, 99],
  fermium: [157, 100, 100],
  mendelevium: [155, 101, 101],
  nobelium: [157, 102, 102],
  lawrencium: [163, 103, 103],
  rutherfordium: [163, 104, 104],
  dubnium: [163, 105, 105],
  seaborgium: [165, 106, 106],
  bohrium: [163, 107, 107],
  hassium: [161, 108, 108],
  meitnerium: [169, 109, 109],
  darmstadtium: [171, 110, 110],
  roentgenium: [171, 111, 111],
  copernicium: [173, 112, 112],
  nihonium: [173, 113, 113],
  flerovium: [176, 114, 114],
  moscovium: [175, 115, 115],
  livermorium: [177, 116, 116],
  tennessine: [177, 117, 117],
  oganesson: [176, 118, 118],
};

let enable_electron_shells = false;
dependOn(
  "betterSettings.js",
  function () {
    let atomjs_SettingsTab = new SettingsTab("Atom Mod");
    enable_electron_shells = new Setting(
      "Electron Shells",
      "enableelectronshells",
      settingType.BOOLEAN,
      false,
      true,
    );
    atomjs_SettingsTab.registerSettings("Options\n", enable_electron_shells);
    settingsManager.registerTab(atomjs_SettingsTab);
  },
  true,
);

function compareArray(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((a, i) => arr2[i] === a);
}

function getExploisionSize(neutrons, protons, electrons) {
  let electrons2 = electrons / 2;
  if (electrons2 <= 0) electrons2 = 1;
  let result = (neutrons - protons) * electrons2;
  if (result <= 0) return Math.round(6 * electrons2);
  return Math.round(result);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => compareArray(object[key], value));
}

const electronShells = {
  2: 4,
  8: 6,
  18: 10,
  32: 16,
  64: 32,
  128: 64,
  256: 128,
};

function findElectronValue(index, list, mode) {
  let valueSum = 0;
  for (let value in list) {
    if (index <= valueSum + parseInt(list[value])) {
      if (mode == 1) {
        return (index - valueSum) / parseInt(list[value]);
      } else {
        return list[value];
      }
    }
    valueSum += parseInt(list[value]);
  }
}

elements.electron = {
  color: "#146c09",
  tick: behaviors.BOUNCY,
  temp: 40,
  category: "energy",
  state: "gas",
  conduct: 1,
  density: 0.00002,
  ignoreAir: true,
};

elements.frozen_proton = {
  color: "#ffa6a6",
  behavior: behaviors.WALL,
  behaviorOn: ["XX|XX|XX", "XX|CH:hydrogen|XX", "XX|XX|XX"],
  reactions: {
    electric: { elem1: null, elem2: "hydrogen", temp2: 200 },
    nitrogen: {
      elem1: "flash",
      color1: "#5a9fdb",
      attr1: { delay: 500 },
      elem2: "flash",
      color2: "#5a9fdb",
      attr2: { delay: 500 },
      chance: 0.05,
      y: [10, 20],
    },
    oxygen: {
      elem1: "flash",
      color1: "#5adb63",
      attr1: { delay: 500 },
      elem2: "flash",
      color2: "#5adb63",
      attr2: { delay: 500 },
      chance: 0.05,
      y: [10, 20],
    },
    ozone: {
      elem1: "flash",
      color1: "#5adb63",
      attr1: { delay: 500 },
      elem2: "flash",
      color2: "#5adb63",
      attr2: { delay: 500 },
      chance: 0.05,
      y: [10, 20],
    },
  },
  temp: 40,
  category: "energy",
  state: "gas",
  conduct: 1,
  density: 0.00002,
  ignoreAir: true,
};

elements.frozen_neutron = {
  color: "#a6ffff",
  behavior: behaviors.WALL,
  reactions: {
    uranium: { temp2: 100 },
    plant: { elem2: "wood", chance: 0.05 },
    gunpowder: { elem2: "dust", chance: 0.05 },
    yeast: { elem2: "bread", chance: 0.05 },
    silver: { elem1: ["radiation", null, null], chance: 0.25 },
    firework: {
      func(pixel1, pixel2) {
        pixel2.burning = true;
        pixel2.burnStart = pixelTicks;
      },
      chance: 0.01,
    },
    glass: { elem1: null, elem2: "rad_glass" },
    glass_shard: { elem1: null, elem2: "rad_shard" },
    cloud: { elem1: null, elem2: "rad_cloud" },
    rain_cloud: { elem1: null, elem2: "rad_cloud" },
  },
  temp: 35,
  category: "energy",
  state: "gas",
  density: 0.00003,
  ignoreAir: true,
};

elements.nucleus = {
  color: ["#ffa6a6", "#a6ffff", "#146c09"],
  behavior: behaviors.WALL,
  category: "energy",
  properties: {
    neutrons: 0,
    protons: 0,
    electrons: 0,
  },
  hoverStat: function (pixel) {
    return (
      "Neutrons:" +
      pixel.neutrons +
      " Protons:" +
      pixel.protons +
      " Electrons:" +
      pixel.electrons
    );
  },
  tick: function (pixel) {
    for (let coords of adjacentCoords) {
      let x = pixel.x + coords[0],
        y = pixel.y + coords[1];
      let newPx = getPixel(x, y);
      if (
        newPx != null &&
        (newPx.element == "frozen_neutron" || newPx.element == "neutron")
      ) {
        pixel.neutrons += 1;
        deletePixel(newPx.x, newPx.y);
      } else if (
        newPx != null &&
        (newPx.element == "frozen_proton" || newPx.element == "proton")
      ) {
        pixel.protons += 1;
        deletePixel(newPx.x, newPx.y);
      } else if (
        newPx != null &&
        (newPx.element == "frozen_electron" || newPx.element == "electron")
      ) {
        pixel.electrons += 1;
        deletePixel(newPx.x, newPx.y);
      }
    }
  },
  renderer: function (pixel, ctx) {
    drawDefault(ctx, pixel);
    let speed = 7;
    let shellsActive =
      typeof enable_electron_shells === "object"
        ? enable_electron_shells.value
        : enable_electron_shells;

    if (shellsActive && pixel.electrons > 0) {
      for (let i = 0; i < pixel.electrons; i++) {
        let distance =
          electronShells[
            findElectronValue(i - 1, Object.keys(electronShells), 2)
          ];
        let x =
          Math.cos(
            (pixelTicks / speed) * 0.2 +
              2 *
                Math.PI *
                findElectronValue(i - 1, Object.keys(electronShells), 1),
          ) *
            distance +
          pixel.x;
        let y =
          Math.sin(
            (pixelTicks / speed) * 0.2 +
              2 *
                Math.PI *
                findElectronValue(i - 1, Object.keys(electronShells), 1),
          ) *
            distance +
          pixel.y;
        drawPlus(ctx, "#146c09", x, y);
      }
    }
  },
  maxSize: 1,
};

elements.frozen_electron = {
  color: "#146c09",
  behavior: behaviors.WALL,
  temp: 40,
  category: "energy",
  state: "gas",
  conduct: 1,
  density: 0.00002,
  ignoreAir: true,
};

elements.release_electron = {
  color: "#146c09",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      if (pixel.electrons >= 1) {
        pixel.electrons -= 1;
        createPixel("electron", pixel.x + 1, pixel.y + 1);
      }
    }
  },
};

elements.release_neutron = {
  color: "#a6ffff",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      if (pixel.neutrons >= 1) {
        pixel.neutrons -= 1;
        createPixel("neutron", pixel.x + 1, pixel.y + 1);
      }
    }
  },
};

elements.release_proton = {
  color: "#ffa6a6",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      if (pixel.protons >= 1) {
        pixel.protons -= 1;
        createPixel("proton", pixel.x + 1, pixel.y + 1);
      }
    }
  },
};

elements.add_proton = {
  color: "#ffa6a6",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      pixel.protons += 1;
    }
  },
};

elements.add_neutron = {
  color: "#a6ffff",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      pixel.neutrons += 1;
    }
  },
};

elements.add_electron = {
  color: "#146c09",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      pixel.electrons += 1;
    }
  },
};

elements.merge = {
  color: ["#ffa6a6", "#000000", "#a6ffff", "#000000", "#146c09"],
  category: "tools",
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      const result = getKeyByValue(listofelements, [
        pixel.neutrons,
        pixel.protons,
        pixel.electrons,
      ]);
      if (result != null && result != undefined) {
        let resultlower = result.toLowerCase();
        if (elements[resultlower]) {
          createPixel(resultlower, pixel.x, pixel.y);
        } else {
          let px = pixel.x;
          let py = pixel.y;
          let expSize = getExploisionSize(
            pixel.neutrons,
            pixel.protons,
            pixel.electrons,
          );
          deletePixel(px, py);
          explodeAt(px, py, expSize, "fire");
          promptText(
            "Cannot find element: " +
              resultlower +
              ", You might need to install a mod",
          );
        }
      } else {
        let px = pixel.x;
        let py = pixel.y;
        let expSize = getExploisionSize(
          pixel.neutrons,
          pixel.protons,
          pixel.electrons,
        );
        deletePixel(px, py);
        explodeAt(px, py, expSize, "fire");
      }
    }
  },
  maxSize: 1,
};
