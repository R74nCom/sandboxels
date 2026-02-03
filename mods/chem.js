function blendColors(colorA, colorB, amount = 0.5) {
  const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
  const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * amount)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(gA + (gB - gA) * amount)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(bA + (bB - bA) * amount)
    .toString(16)
    .padStart(2, "0");
  return "#" + r + g + b;
}

function toObject(color) {
  color = color.match(/\d+/g);
  return { r: color[0], g: color[1], b: color[2] };
}

function RGBToHex2(rgb) {
  var r = Math.min(255, parseInt(rgb.r));
  var g = Math.min(255, parseInt(rgb.g));
  var b = Math.min(255, parseInt(rgb.b));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function reactList(list1, list2, reaction) {
  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      let react = { react1: list1[i], react2: list2[j] };
      if (!Array.isArray(reaction.elem1)) {
        reaction.elem1 = [reaction.elem1];
      }
      if (!Array.isArray(reaction.elem2)) {
        reaction.elem2 = [reaction.elem2];
      }
      val1 = parseReactStringValue(reaction.elem1, react);
      val2 = parseReactStringValue(reaction.elem2, react);
      if (val1 === "unknown" || val1.includes("unknown") || val2 === "unknown" || val2.includes("unknown")) {
        continue;
      }
      ignoreReact(list1[i], list2[j], val1, val2, reaction.props);
      if (reaction.deleteReactions) {
        if (reaction.deleteReactions.aa) {
          for (let k = 0; k < val1.length; k++) {
            deleteReactions.push([list1[i], val1[k]]);
          }
        }
        if (reaction.deleteReactions.ab) {
          for (let k = 0; k < val2.length; k++) {
            deleteReactions.push([list1[i], val2[k]]);
          }
        }
        if (reaction.deleteReactions.ba) {
          for (let k = 0; k < val1.length; k++) {
            deleteReactions.push([list1[j], val1[k]]);
          }
        }
        if (reaction.deleteReactions.bb) {
          for (let k = 0; k < val2.length; k++) {
            deleteReactions.push([list1[j], val2[k]]);
          }
        }
      }
    }
  }
}
deleteReactions = [];

function ignoreReact(elem1, elem2, product1, product2, props) {
  if (elements[elem1] && elements[elem1].ignore && chemjsChemicals.ignorable.elementNames.includes(elem1)) {
    if (product1 !== null) {
      if (Array.isArray(product1)) {
        elements[elem1].ignore.push(...product1);
      } else {
        elements[elem1].ignore.push(product1);
      }
    }
    if (product2 !== null) {
      if (Array.isArray(product2)) {
        elements[elem1].ignore.push(...product2);
      } else {
        elements[elem1].ignore.push(product2);
      }
    }
    elements[elem1].ignore.push(elem2);
  }
  if (elements[elem2] && elements[elem2].ignore && chemjsChemicals.ignorable.elementNames.includes(elem2)) {
    if (product1 !== null) {
      if (Array.isArray(product1)) {
        elements[elem2].ignore.push(...product1);
      } else {
        elements[elem2].ignore.push(product1);
      }
    }
    if (product2 !== null) {
      if (Array.isArray(product2)) {
        elements[elem2].ignore.push(...product2);
      } else {
        elements[elem2].ignore.push(product2);
      }
    }
    elements[elem2].ignore.push(elem1);
  }
  if (product1 !== null) {
    let product1names = product1;
    if (!Array.isArray(product1)) {
      product1names = [product1];
    }
    for (let i = 0; i < product1names.length; i++) {
      if (elements[product1names[i]] && elements[product1names[i]].ignore && chemjsChemicals.ignorable.elementNames.includes(product1names[i])) {
        if (Array.isArray(product2)) elements[product1names[i]].ignore.push(...product2);
        else elements[product1names[i]].ignore.push(product2);
        elements[product1names[i]].ignore.push(elem1);
        elements[product1names[i]].ignore.push(elem2);
      }
    }
  }
  if (product2 !== null) {
    let product2names = product2;
    if (!Array.isArray(product2)) {
      product2names = [product2];
    }
    for (let i = 0; i < product2names.length; i++) {
      if (elements[product2names[i]] && elements[product2names[i]].ignore && chemjsChemicals.ignorable.elementNames.includes(product2names[i])) {
        if (Array.isArray(product1)) elements[product2names[i]].ignore.push(...product1);
        else elements[product2names[i]].ignore.push(product1);
        elements[product2names[i]].ignore.push(elem1);
        elements[product2names[i]].ignore.push(elem2);
      }
    }
  }
  if (product1.length == 1) {
    product1 = product1[0];
  }
  if (product2.length == 1) {
    product2 = product2[0];
  }
  if (!elements[elem1].reactions) {
    elements[elem1].reactions = {};
  }
  if (!elements[elem1].reactions[elem2]) {
    elements[elem1].reactions[elem2] = { elem1: product1, elem2: product2, ...props };
  }
  if (product1 !== null && (product1 === "no_change" || product1[0] === "no_change")) {
    delete elements[elem1].reactions[elem2].elem1;
  }
  if (product2 !== null && (product2 === "no_change" || product2[0] === "no_change")) {
    delete elements[elem1].reactions[elem2].elem2;
  }
}

function stateChangeName(key, obj, stateHigh) {
  if (stateHigh) {
    var newname = obj.stateHighName;
    if (obj.state === "solid" || !obj.state) {
      // Melting
      if (!newname) {
        newname = "molten_" + key;
      }
      return newname;
    } else if (obj.state === "liquid") {
      // Evaporating
      if (!newname) {
        newname = key;
        if (newname.startsWith("liquid_")) {
          newname = newname.substring(7);
        }
        if (newname.startsWith("molten_")) {
          newname = newname.substring(7);
        }
        newname += "_gas";
      }
      return newname;
    }
  } else {
    var newname = obj.stateLowName;
    if (obj.state === "liquid" || !obj.state) {
      // Freezing
      if (!newname) {
        newname = key;
        if (newname.startsWith("liquid_")) {
          newname = newname.substring(7);
        }
        if (newname.endsWith("_water")) {
          newname = newname.substring(0, newname.length - 6);
        }
        newname += "_ice";
      }
      return newname;
    } else if (obj.state === "gas") {
      // Condensing
      if (!newname) {
        newname = key;
        if (newname.endsWith("_gas")) {
          newname = newname.substring(0, newname.length - 4);
        }
        newname = "liquid_" + newname;
      }
      return newname;
    }
  }
}

function createChemical(key, obj) {
  let key2 = key;
  if (obj.elem) {
    if (obj.elemName) {
      key = obj.elemName;
    }
    elements[key] = obj.elem;
    if (obj.tempLow) {
      elements[key].tempLow = obj.tempLow[0];
    } else {
      obj.tempLow = [];
    }
    if (obj.tempHigh) {
      elements[key].tempHigh = obj.tempHigh[0];
    } else {
      obj.tempHigh = [];
    }

    let statelows = obj.stateLow;
    if (!obj.stateLow) {
      statelows = [];
    }
    statelows.unshift(key);
    for (let i = 1; i <= obj.tempLow.length; i++) {
      if (!statelows[i]) {
        statelows[i] = stateChangeName(statelows[i - 1], elements[statelows[i - 1]], false);
      }
      if (!statelows[i]) {
        break;
      } else if (Array.isArray(statelows[i])) {
        elements[statelows[i - 1]].stateLow = statelows[i];
        break;
      } else {
        elements[statelows[i - 1]].stateLowName = statelows[i];
      }
      if (!elements[statelows[i]]) {
        elements[statelows[i]] = {};
      }
      elements[statelows[i]].tempLow = obj.tempLow[i];
      if (obj.densityLow && obj.densityLow[i - 1]) {
        elements[statelows[i]].density = obj.densityLow[i - 1];
      }
    }

    let statehighs = obj.stateHigh;
    if (!obj.stateHigh) {
      statehighs = [];
    }
    statehighs.unshift(key);
    for (let i = 1; i <= obj.tempHigh.length; i++) {
      if (!statehighs[i]) {
        statehighs[i] = stateChangeName(statehighs[i - 1], elements[statehighs[i - 1]], true);
      }
      if (!statehighs[i]) {
        break;
      } else if (Array.isArray(statehighs[i])) {
        elements[statehighs[i - 1]].stateHigh = statehighs[i];
        break;
      } else {
        elements[statehighs[i - 1]].stateHighName = statehighs[i];
      }
      if (!elements[statehighs[i]]) {
        elements[statehighs[i]] = {};
      }
      elements[statehighs[i]].tempHigh = obj.tempHigh[i];
      if (obj.densityHigh && obj.densityHigh[i - 1]) {
        elements[statehighs[i]].density = obj.densityHigh[i - 1];
      }
    }

    statelows = statelows.filter((x) => typeof x === "string" || x instanceof String);
    statehighs = statehighs.filter((x) => typeof x === "string" || x instanceof String);

    if (!chemjsChemicals[key2].elementNames) {
      chemjsChemicals[key2].elementNames = statelows.concat(statehighs);
    } else {
      chemjsChemicals[key2].elementNames = chemjsChemicals[key2].elementNames.concat(statelows).concat(statehighs);
    }
  }
}

function toxic(name, chance, dirtyWater = false) {
  chemjsReactions.push(
    { react1: name, react2: "blood", elem1: null, elem2: "infection", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "soap", elem1: null, elem2: "no_change", chance: 0.02, priority: 10 },
    { react1: name, react2: "plant", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "evergreen", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "cactus", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "grass", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "vine", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "algae", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "kelp", elem1: null, elem2: "dirty_water", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "mushroom_spore", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "lichen", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "yeast", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "rat", elem1: null, elem2: "rotten_meat", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "frog", elem1: null, elem2: "rotten_meat", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "tadpole", elem1: "no_change", elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "fish", elem1: null, elem2: "rotten_meat", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "bird", elem1: null, elem2: "rotten_meat", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "head", elem1: null, elem2: "rotten_meat", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "body", elem1: null, elem2: "rotten_meat", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "homunculus", elem1: null, elem2: "rotten_meat", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "ant", elem1: null, elem2: "dead_bug", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "worm", elem1: null, elem2: "dead_bug", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "fly", elem1: null, elem2: "dead_bug", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "firefly", elem1: null, elem2: "dead_bug", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "bee", elem1: null, elem2: "dead_bug", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "stink_bug", elem1: null, elem2: "dead_bug", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "termite", elem1: null, elem2: "dead_bug", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "flea", elem1: null, elem2: "dead_bug", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "slug", elem1: null, elem2: "slime", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "snail", elem1: null, elem2: "limestone", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "sapling", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "root", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "flower_seed", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "pistil", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "petal", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "grass_seed", elem1: null, elem2: "dead_plant", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "meat", elem1: null, elem2: "rotten_meat", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "cheese", elem1: null, elem2: "rotten_cheese", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "tree_branch", elem1: null, elem2: "wood", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "mushroom_cap", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "mushroom_gill", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "mushroom_stalk", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "hyphae", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "mycelium", elem1: null, elem2: "dirt", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "pollen", elem1: "no_change", elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "bone_marrow", elem1: null, elem2: "rotten_meat", props: { chance: chance }, priority: 10 },
    { react1: name, react2: "hair", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "cell", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: name, react2: "cancer", elem1: null, elem2: null, props: { chance: chance }, priority: 10 },
    { react1: "bless", react2: name, elem1: "no_change", elem2: null, priority: 100 },
  );
  if (dirtyWater) {
    chemjsReactions.push({ react1: name, react2: "chemical!water,ignore!dirty_water", elem1: null, elem2: "dirty_water", chance: chance, priority: 10 });
  }
}

doStaining = function (pixel) {
  if (settings.stain === 0) {
    return;
  }
  var stain = elements[pixel.element].stain;
  if (stain > 0) {
    var newColor = pixel.color.match(/\d+/g);
  } else {
    var newColor = null;
  }

  for (var i = 0; i < adjacentCoords.length; i++) {
    var x = pixel.x + adjacentCoords[i][0];
    var y = pixel.y + adjacentCoords[i][1];
    if (!isEmpty(x, y, true)) {
      var newPixel = pixelMap[x][y];
      if ((elements[pixel.element].ignore && elements[pixel.element].ignore.indexOf(newPixel.element) !== -1) || eLists.STAINLESS.includes(newPixel.element)) {
        continue;
      }
      if ((elements[newPixel.element].id !== elements[pixel.element].id || elements[newPixel.element].stainSelf) && (solidStates[elements[newPixel.element].state] || elements[newPixel.element].id === elements[pixel.element].id)) {
        if (Math.random() < Math.abs(stain)) {
          if (stain < 0) {
            if (newPixel.origColor) {
              newColor = newPixel.origColor;
            } else {
              continue;
            }
          } else if (!newPixel.origColor) {
            newPixel.origColor = newPixel.color.match(/\d+/g);
          }
          // if newPixel.color doesn't start with rgb, continue
          if (!newPixel.color.match(/^rgb/)) {
            continue;
          }
          // parse rgb color string of newPixel rgb(r,g,b)
          var rgb = newPixel.color.match(/\d+/g);
          if (elements[pixel.element].stainSelf && elements[newPixel.element].id === elements[pixel.element].id) {
            // if rgb and newColor are the same, continue
            if (rgb[0] === newColor[0] && rgb[1] === newColor[1] && rgb[2] === newColor[2]) {
              continue;
            }
            var avg = [];
            for (var j = 0; j < rgb.length; j++) {
              avg[j] = Math.round(rgb[j] * (1 - Math.abs(stain)) + newColor[j] * Math.abs(stain));
            }
          } else {
            // get the average of rgb and newColor, more intense as stain reaches 1
            var avg = [];
            for (var j = 0; j < rgb.length; j++) {
              avg[j] = Math.floor(rgb[j] * (1 - Math.abs(stain)) + newColor[j] * Math.abs(stain));
            }
          }
          // set newPixel color to avg
          newPixel.color = "rgb(" + avg.join(",") + ")";
        }
      }
    }
  }
};

chemjsReactions = [];

chemjsChemicals = {};
//elements

let fluorineTick = function (pixel, chance) {
  let change = false;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0) && !isEmpty(pixel.x + i, pixel.y + j, true) && !elements[pixel.element].ignore.includes(pixelMap[pixel.x + i][pixel.y + j].element)) {
        if (Math.random() < chance && (!elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness || Math.random() > elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness)) {
          changePixel(pixelMap[pixel.x + i][pixel.y + j], "fire");
          change = true;
        }
      }
    }
  }
  if (change && Math.random() < 0.02) {
    changePixel(pixel, "fire");
  }
};

elements.sulfur.burnInto = ["sulfur_dioxide"];
elements.molten_sulfur.burnInto = ["sulfur_dioxide"];
elements.sulfur_gas.burnInto = ["sulfur_dioxide"];

chemjsChemicals.hydrogen = {
  elementNames: ["hydrogen", "liquid_hydrogen", "hydrogen_ice"],
};

chemjsChemicals.boron = {
  elem: {
    color: ["#80736a", "#a2999c", "#5e5544", "#292d2c"],
    category: "solids",
    density: 2080,
    state: "solid",
    behavior: behaviors.WALL,
    fireColor: ["#34eb67", "#5ceb34"],
  },
  tempHigh: [2076],
};

chemjsChemicals.carbon = {
  elementNames: ["charcoal"],
};

chemjsChemicals.oxygen = {
  elementNames: ["oxygen", "liquid_oxygen", "oxygen_ice"],
};

chemjsChemicals.ozone = {
  elementNames: ["ozone", "liquid_ozone", "ozone_ice"],
};
elements.liquid_ozone.tempLow = -192.2;

chemjsChemicals.fluorine = {
  elem: {
    color: "#FFFFBF",
    behavior: behaviors.GAS,
    tick: (pixel) => fluorineTick(pixel, 1),
    state: "gas",
    category: "gases",
    density: 1.7,
    stain: 0.005,
  },
  tempLow: [-188.1, -219.7],
  densityLow: [1505],
  causticIgnore: true,
  ignore: ["chemical!fluorine_ignore"],
  ignorable: true,
};

elements.liquid_fluorine = {
  color: "#ffff3b",
  behavior: behaviors.LIQUID,
  tick: (pixel) => fluorineTick(pixel, 0.01),
  temp: -198.1,
  state: "liquid",
  category: "liquids",
  stain: 0.005,
  hidden: false,
};

chemjsChemicals.fluorine_ignore = {
  elementNames: ["chemical!foof", "chemical!oxygen", "chemical!ozone", "chemical!chlorine", "chemical!hydrogen_fluoride", "chemical!fluorine", "chemical!acids", "fire", "smoke", "neutral_acid", "chemical!water", "acid_cloud", "steam", "gold", "hydrogen", "chemical!polytetrafluoroethylene", "molten_polytetrafluoroethylene", "foof_grass", "foof_grass_seed"],
};

chemjsChemicals.sodium = {
  elementNames: ["sodium", "molten_sodium", "sodium_gas"],
};

elements.molten_sodium.behavior = behaviors.LIQUID;

chemjsChemicals.magnesium = {
  elementNames: ["magnesium", "molten_magnesium"],
};
elements.magnesium.burnInto = "magnesium_oxide";
elements.molten_magnesium.burnInto = "magnesium_oxide";
elements.molten_magnesium.behavior = function (pixel) {
  if (Math.random() < 0.025 && isEmpty(pixel.x, pixel.y - 1)) {
    createPixel("flash", pixel.x, pixel.y - 1);
    pixelMap[pixel.x][pixel.y - 1].temp = pixel.temp;
    if (elements[pixel.element].fireColor) {
      pixelMap[pixel.x][pixel.y - 1].color = pixelColorPick(pixelMap[pixel.x][pixel.y - 1], elements[pixel.element].fireColor);
    }
  }
  behaviors.LIQUID(pixel);
};

chemjsChemicals.aluminum = {
  elementNames: ["aluminum", "molten_aluminum"],
};

let whitePhosphorusTick = function (pixel) {
  if (Math.random() < 0.0001 && pixel.temp > 40 && pixel.temp < 860) {
    changePixel(pixel, "red_phosphorus");
  }
  if (Math.random() < 0.0001 && pixel.temp > 530 && pixel.temp < 860) {
    changePixel(pixel, "violet_phosphorus");
  }
  if (pixel.temp > 860 && pixel.temp < 1200 && Math.random() < 0.0001) {
    changePixel(pixel, "black_phosphorus");
  }
};
chemjsChemicals.white_phosphorus = {
  elem: {
    color: "#f4f7ad",
    category: "powders",
    density: 1820,
    state: "solid",
    behavior: ["XX|XX|XX", "XX|XX|XX", "M2%1|M1|M2%1"],
    tick: whitePhosphorusTick,
    stain: 0.01,
    burn: 1,
    burnTime: 300,
    burnInto: "phosphorus_pentoxide",
    fireColor: "#5ed6c8",
  },
  tempHigh: [44.1, 280],
  stateHigh: [null, "white_phosphorus_gas"],
};

elements.molten_white_phosphorus = {
  color: "#eaeb96",
  tick: whitePhosphorusTick,
  state: "liquid",
  behavior: behaviors.LIQUID,
  density: 1810,
  stain: 0.01,
  burn: 1,
  burnTime: 300,
  burnInto: "phosphorus_pentoxide",
  fireColor: "#5ed6c8",
};

elements.white_phosphorus_gas = {
  tick: whitePhosphorusTick,
  behavior: behaviors.GAS,
  density: 5.13,
  stain: 0.01,
  burn: 1,
  burnTime: 300,
  burnInto: "phosphorus_pentoxide",
  fireColor: "#5ed6c8",
};

let redPhosphorusTick = function (pixel) {
  if (pixel.temp > 250 && Math.random() < 0.00001) {
    changePixel(pixel, "violet_phosphorus");
  }
};

chemjsChemicals.red_phosphorus = {
  elem: {
    tick: redPhosphorusTick,
    color: ["#fa5252", "#de4040", "#f24141"],
    category: "powders",
    density: 2275,
    state: "solid",
    behavior: behaviors.POWDER,
    stain: 0.005,
    fireColor: "#5ed6c8",
  },
  tempHigh: [530],
  stateHigh: [["violet_phosphorus"]],
};

chemjsChemicals.violet_phosphorus = {
  elem: {
    color: ["#d92378", "#ab1364", "#bd1c8a"],
    category: "powders",
    density: 2360,
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    stain: 0.005,
    fireColor: "#5ed6c8",
    burn: 0.1,
    burnTime: 300,
    burnInto: "phosphorus_pentoxide",
  },
  tempHigh: [860],
  stateHigh: [["white_phosphorus_gas"]],
};

chemjsChemicals.black_phosphorus = {
  elem: {
    color: ["#170a02", "#380e03", "#6b6968"],
    category: "powders",
    density: 2690,
    state: "solid",
    behavior: behaviors.SUPPORTPOWDER,
    stain: 0.005,
    fireColor: "#5ed6c8",
  },
  tempHigh: [950, 1200],
  stateHigh: [null, ["white_phosphorus_gas"]],
};

chemjsChemicals.sulfur = {
  elementNames: ["sulfur", "molten_sulfur", "sulfur_gas"],
};

chemjsChemicals.chlorine = {
  elementNames: ["chlorine", "liquid_chlorine", "chlorine_ice"],
};

chemjsChemicals.potassium = {
  elementNames: ["potassium", "molten_potassium", "potassium_gas"],
};
elements.molten_potassium.behavior = behaviors.LIQUID;

chemjsChemicals.calcium = {
  elementNames: ["calcium", "molten_calcium"],
};

chemjsChemicals.titanium = {
  elem: {
    color: "#e3e5e6",
    category: "solids",
    density: 4500,
    state: "solid",
    behavior: behaviors.WALL,
    conduct: 0.5,
    hardness: 0.7,
  },
  tempHigh: [1668],
};

chemjsChemicals.iron = {
  elementNames: ["iron", "molten_iron"],
};

let bromineTick = function (pixel) {
  if (pixel.temp > 0 && Math.random() < 0.001) {
    changePixel(pixelMap[pixel.x][pixel.y], "bromine_gas", false);
  }
};

let bromineGasTick = function (pixel) {
  if (pixel.temp < 58.8 && pixel.temp > 0 && Math.random() < 0.01) {
    changePixel(pixelMap[pixel.x][pixel.y], "bromine", false);
  }
};

chemjsChemicals.bromine = {
  elem: {
    color: "#470500",
    tick: bromineTick,
    category: "liquids",
    density: 3102,
    state: "liquid",
    behavior: behaviors.LIQUID,
    stain: 0.5,
  },
  tempHigh: [58.8],
  densityHigh: [7.59],
  tempLow: [-7.2],
  toxic: [0.1],
};

elements.bromine_gas = {
  tick: bromineGasTick,
  tempLow: 0,
  stateLow: "bromine",
  state: "gas",
  category: "gases",
};

chemjsChemicals.silver = {
  elementNames: ["silver", "molten_silver"],
};

let indiumTick = function (pixel) {
  pixel.indium_bendable = pixel.empty_above;
  let k = 0;
  while (!isEmpty(pixel.x, pixel.y - k, true)) {
    k++;
  }
  indium_bendable = pixel.empty_above != k;
  pixel.empty_above = k;
  k = k - 1;
  if (indium_bendable && !isEmpty(pixel.x, pixel.y - k, true) && elements[pixelMap[pixel.x][pixel.y - k].element].movable && pixelMap[pixel.x][pixel.y - k].element !== "indium") {
    if (Math.random() < elements[pixelMap[pixel.x][pixel.y - k].element].density / 5e5) {
      pixel.indium_bend = 0.5;
    }
  }
  if (pixel.indium_bend > 0) {
    for (let i = -1; i <= 1; i++) {
      if (!isEmpty(pixel.x + i, pixel.y + 1, true) && pixelMap[pixel.x + i][pixel.y + 1].element == "indium") {
        if (Math.random() < pixel.indium_bend) {
          pixelMap[pixel.x + i][pixel.y + 1].indium_bend = pixel.indium_bend;
        }
      }
    }
    let i = 0;
    let y = pixel.y;
    while (!isEmpty(pixel.x, y + i, true) && pixelMap[pixel.x][y + i].element == "indium") {
      pixelTick(pixelMap[pixel.x][y + i], [
        ["XX", "XX", "XX"],
        ["XX", "XX", "XX"],
        ["M2%5", "M1", "M2%5"],
      ]);
      i--;
    }
    pixel.indium_bend = 0;
  }
};

chemjsChemicals.indium = {
  elem: {
    tick: indiumTick,
    color: ["#aca9b0", "#ccc7d1", "#d6cbd6"],
    category: "solids",
    density: 7290,
    state: "solid",
    behavior: behaviors.WALL,
    conduct: 0.05,
    hardness: 0.05,
    superconductAt: -269.74,
  },
  tempHigh: [156.6],
};

let iodineTick = function (pixel) {
  if (pixel.temp > 25 && Math.random() < 0.001) {
    changePixel(pixelMap[pixel.x][pixel.y], "iodine_gas", false);
  }
};

let iodineGasTick = function (pixel) {
  if (pixel.temp < 113 && pixel.temp > 25 && Math.random() < 0.01) {
    changePixel(pixelMap[pixel.x][pixel.y], "iodine", false);
  }
};

chemjsChemicals.iodine = {
  elem: {
    color: ["#240030", "#15061a", "#752191"],
    tick: iodineTick,
    category: "powders",
    density: 4933,
    state: "solid",
    behavior: behaviors.POWDER,
    stain: 0.01,
  },
  tempHigh: [113, 183],
  toxic: [0.1],
};

elements.molten_iodine = {
  behavior: behaviors.LIQUID,
  color: ["#360147", "#2b0d36", "#9b2ebf"],
  state: "liquid",
  category: "liquids",
  hidden: true,
};
elements.iodine_gas = {
  tick: iodineGasTick,
  tempLow: 25,
  stateLow: "iodine",
  state: "gas",
  category: "gases",
  hidden: true,
  density: 11.27,
};

chemjsChemicals.tungsten = {
  elementNames: ["tungsten", "molten_tungsten"],
};

chemjsChemicals.mercury = {
  elementNames: ["solid_mercury", "mercury", "mercury_gas"],
};

chemjsChemicals.thallium = {
  elem: {
    color: ["#b3bdb4", "#a7b8b0", "#9fa39d"],
    category: "powders",
    density: 11873,
    state: "solid",
    behavior: behaviors.STURDYPOWDER,
    conduct: 0.05,
    hardness: 0.05,
  },
  tempHigh: [304],
  toxic: [0.2],
};

chemjsChemicals.polonium = {
  elem: {
    color: "#56b870",
    behavior: ["XX|CR:radiation%10|XX", "CR:radiation%10|CH:lead%0.1|CR:radiation%10", "XX|CR:radiation%10|XX"],
    tick: function (pixel) {
      pixel.temp += 1;
    },
    state: "solid",
    category: "solids",
    density: 9196,
    conduct: 0.21,
  },
  tempHigh: [254],
  reactionProduct: { stable: "stable_polonium" },
  categories: ["radioactive"],
};

elements.molten_polonium = {};
elements.molten_polonium.behavior = ["XX|CR:fire AND CR:radiation%12.5|XX", "M2 AND CR:radiation%10|CH:lead%0.1|M2 AND CR:radiation%10", "M1|M1|M1"];
elements.molten_polonium.tick = function (pixel) {
  pixel.temp += 1;
};

chemjsChemicals.stable_polonium = {
  elem: {
    color: [blendColors("#56b870", "#ff0000"), blendColors("#56b870", "#00ff00"), blendColors("#56b870", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    density: 9196,
    conduct: 0.21,
    hidden: true,
  },
  tempHigh: [254],
};

chemjsChemicals.astatine = {
  elem: {
    color: "#5a5e5a",
    behavior: ["XX|CR:radiation%50|XX", "CR:radiation%50|CH:polonium,explosion%0.1|CR:radiation%50", "M2|M1|M2"],
    tick: function (pixel) {
      pixel.temp += 5;
    },
    state: "solid",
    category: "powders",
    density: 8910,
  },
  tempHigh: [301, 336],
  reactionProduct: { stable: "stable_astatine" },
  densityHigh: [null, 17.17],
  categories: ["radioactive"],
};

elements.molten_astatine = {};
elements.molten_astatine.color = "#aab0a0";
elements.molten_astatine.state = "liquid";
elements.molten_astatine.behavior = ["XX|CR:radiation%50|XX", "M2 AND CR:radiation%50|CH:polonium,explosion%0.1|M2 AND CR:radiation%50", "M1|M1|M1"];
elements.molten_astatine.tick = function (pixel) {
  pixel.temp += 5;
};

elements.astatine_gas = {};
elements.astatine_gas.behavior2 = [
  ["XX", "CR:radiation%50", "XX"],
  ["CR:radiation%50", "CH:polonium,explosion%0.1", "CR:radiation%50"],
  ["XX", "CR:radiation%50", "XX"],
];
elements.astatine_gas.tick = function (pixel) {
  pixel.temp += 5;
  pixelTick(pixel, elements[pixel.element].behavior2);
};

chemjsChemicals.stable_astatine = {
  elem: {
    color: [blendColors("#5a5e5a", "#ff0000"), blendColors("#5a5e5a", "#00ff00"), blendColors("#5a5e5a", "#0000ff")],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 8910,
  },
  densityHigh: [null, 17.17],
  tempHigh: [301, 336],
  toxic: [0.01],
};

elements.molten_stable_astatine = {};
elements.molten_stable_astatine.color = [blendColors("#aab0a0", "#ff0000"), blendColors("#aab0a0", "#00ff00"), blendColors("#aab0a0", "#0000ff")];
elements.molten_stable_astatine.state = "liquid";

chemjsChemicals.radon = {
  elem: {
    color: "#b6ffb5",
    behavior: ["M2|M1 AND CR:radiation%10|M2", "M1 AND CR:radiation%10|CH:polonium%0.1|M1 AND CR:radiation%10", "M2|M1 AND CR:radiation%10|M2"],
    tick: function (pixel) {
      pixel.temp += 1;
    },
    state: "gas",
    category: "gases",
    density: 9.73,
    conduct: 0.86,
    colorOn: ["#b224ff", "#cc6caa", "#a16ccc"],
  },
  tempLow: [-61.7, -71],
  reactionProduct: { stable: "stable_radon" },
  densityHigh: [null, 9.73],
  categories: ["radioactive"],
};

elements.liquid_radon = {};
elements.liquid_radon.behavior = ["XX|CR:radiation%10|XX", "M2 AND CR:radiation%10|CH:polonium%0.1|M2 AND CR:radiation%10", "M1|M1|M1"];
elements.liquid_radon.tick = function (pixel) {
  pixel.temp += 1;
};

elements.radon_ice = {};
elements.radon_ice.behavior = ["XX|CR:radiation%10|XX", "CR:radiation%10|CH:polonium%0.1|CR:radiation%10", "XX|CR:radiation%10|XX"];
elements.radon_ice.tick = function (pixel) {
  pixel.temp += 1;
};
elements.radon_ice.color = "#789d96";

chemjsChemicals.stable_radon = {
  elem: {
    color: [blendColors("#b6ffb5", "#ff0000"), blendColors("#b6ffb5", "#00ff00"), blendColors("#b6ffb5", "#0000ff")],
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    density: 9.73,
    conduct: 0.86,
    colorOn: ["#b224ff", "#cc6caa", "#a16ccc"],
    hidden: true,
  },
  densityHigh: [null, 9.73],
  tempLow: [-61.7, -71],
};

chemjsChemicals.francium = {
  elem: {
    color: "#3eff3b",
    behavior: ["XX|CR:radiation%50|XX", "CR:radiation%50|CH:radon%0.1|CR:radiation%50", "M2|M1|M2"],
    tick: function (pixel) {
      pixel.temp += 5;
    },
    state: "solid",
    category: "powders",
    density: 2480,
    conduct: 0.7,
  },
  tempHigh: [27],
  reactionProduct: { stable: "stable_francium" },
  categories: ["radioactive"],
};

elements.molten_francium = {};
elements.molten_francium.behavior = ["XX|CR:radiation%50|XX", "M2 AND CR:radiation%50|CH:radon%0.1|M2 AND CR:radiation%50", "M1|M1|M1"];
elements.molten_francium.tick = function (pixel) {
  pixel.temp += 5;
};
elements.molten_francium.tempLow = 27;
elements.molten_francium.stateLow = "francium";

chemjsChemicals.stable_francium = {
  elem: {
    color: [blendColors("#3eff3b", "#ff0000"), blendColors("#3eff3b", "#00ff00"), blendColors("#3eff3b", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 2480,
    hidden: true,
    conduct: 0.7,
  },
  tempHigh: [27],
};

elements.molten_stable_francium = {};
elements.molten_stable_francium.behavior = behaviors.LIQUID;
elements.molten_stable_francium.tempLow = 27;
elements.molten_stable_francium.stateLow = "stable_francium";

chemjsChemicals.radium = {
  elem: {
    color: "#3bdeff",
    behavior: ["XX|CR:radiation%10|XX", "CR:radiation%10|CH:radon%0.1|CR:radiation%10", "M2|M1|M2"],
    tick: function (pixel) {
      pixel.temp += 1;
    },
    state: "solid",
    category: "powders",
    density: 5500,
    conduct: 0.4,
  },
  tempHigh: [700],
  reactionProduct: { stable: "stable_radium" },
  categories: ["radioactive"],
  toxic: [1],
};

elements.molten_radium = {};
elements.molten_radium.behavior = ["XX|CR:radiation%10|XX", "M2 AND CR:radiation%10|CH:radon%0.01|M2 AND CR:radiation%10", "M1|M1|M1"];
elements.molten_radium.tick = function (pixel) {
  pixel.temp += 1;
};
elements.molten_radium.tempLow = 700;
elements.molten_radium.stateLow = "radium";

chemjsChemicals.stable_radium = {
  elem: {
    color: [blendColors("#3bdeff", "#ff0000"), blendColors("#3bdeff", "#00ff00"), blendColors("#3bdeff", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5500,
    hidden: true,
    conduct: 0.4,
  },
  tempHigh: [700],
};

chemjsChemicals.actinium = {
  elem: {
    color: "#62ebf0",
    behavior: ["XX|CR:alpha_particle%0.1 AND CR:radiation%10|XX", "CR:alpha_particle%0.1 AND CR:radiation%10|CH:radium%0.02|CR:alpha_particle%0.1 AND CR:radiation%10", "M2|M1|M2"],
    tick: function (pixel) {
      pixel.temp += 2.5;
    },
    state: "solid",
    category: "powders",
    density: 10000,
    conduct: 0.225,
  },
  tempHigh: [1227],
  reactionProduct: { stable: "stable_actinium" },
  categories: ["radioactive"],
  toxic: [1],
};
elements.molten_actinium = {};
elements.molten_actinium.behavior = ["XX|CR:fire%2.5 AND CR:alpha_particle%0.1 AND CR:radiation%10|XX", "M2 AND CR:alpha_particle%0.1 AND CR:radiation%10|CH:radium%0.02|M2 AND CR:alpha_particle%0.1 AND CR:radiation%10", "M1|M1|M1"];
elements.molten_actinium.tick = function (pixel) {
  pixel.temp += 2.5;
};
elements.molten_actinium.tempLow = 1227;
elements.molten_actinium.stateLow = "radium";

chemjsChemicals.stable_actinium = {
  elem: {
    color: [blendColors("#62ebf0", "#ff0000"), blendColors("#62ebf0", "#00ff00"), blendColors("#62ebf0", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 10000,
    hidden: true,
    conduct: 0.225,
  },
  tempHigh: [1227],
};

chemjsChemicals.thorium = {
  elementNames: ["chemical!pure_unstable_thorium", "chemical!pure_stable_thorium"],
};

chemjsChemicals.thorium = {
  elementNames: ["chemical!pure_unstable_thorium", "chemical!pure_stable_thorium"],
};

chemjsChemicals.unstable_thorium = {
  elementNames: [],
};
chemjsChemicals.stable_thorium = {
  elementNames: [],
};

chemjsChemicals.pure_unstable_thorium = {
  elem: {
    color: ["#599e8a", "#364d4b", "#494d4c", "#428a58", "#658d7a", "#89e0a2"],
    behavior: ["XX|CR:alpha_particle%0.01|XX", "CR:alpha_particle%0.01|CH:lead%0.001|CR:alpha_particle%0.01", "XX|CR:alpha_particle%0.01|XX"],
    state: "solid",
    category: "solids",
    density: 11700,
    hardness: 0.7,
    conduct: 0.235,
  },
  tempHigh: [1750],
  elemName: "thorium",
  stateHigh: ["molten_thorium"],
  reactionProduct: { isotope: "unstable_thorium", stable: "stable_thorium" },
  categories: ["unstable_thorium", "radioactive"],
};

elements.molten_thorium = {};
elements.molten_thorium.behavior = ["XX|CR:alpha_particle%0.01|XX", "M2 AND CR:alpha_particle%0.01|XX|M2 AND CR:alpha_particle%0.01", "M1|M1|M1"];

chemjsChemicals.pure_stable_thorium = {
  elem: {
    color: [blendColors("#599e8a", "#ff0000"), blendColors("#364d4b", "#00ff00"), blendColors("#494d4c", "#0000ff"), blendColors("#428a58", "#ff0000"), blendColors("#658d7a", "#00ff00"), blendColors("#89e0a2", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    density: 11700,
    hardness: 0.7,
    conduct: 0.235,
    hidden: true,
  },
  tempHigh: [1750],
  elemName: "stable_thorium",
  stateHigh: ["molten_stable_thorium"],
  reactionProduct: { isotope: "stable_thorium" },
  categories: ["stable_thorium"],
};

chemjsChemicals.protactinium = {
  elem: {
    color: ["#9899a3", "#44464a", "#5a5b5e"],
    behavior: ["XX|CR:alpha_particle%0.01 AND CR:radiation%2|XX", "CR:alpha_particle%0.01 AND CR:radiation%2|CH:actinium%0.01|CR:alpha_particle%0.01 AND CR:radiation%2", "M2|M1|M2"],
    state: "solid",
    category: "powders",
    density: 15700,
    hardness: 0.1,
    conduct: 0.235,
  },
  tempHigh: [1568],
  reactionProduct: { stable: "stable_protactinium" },
  categories: ["radioactive"],
};
elements.molten_protactinium = {};
elements.molten_protactinium.behavior = ["XX|CR:fire%2.5 AND CR:alpha_particle%0.01 AND CR:radiation%2|XX", "M2 AND CR:alpha_particle%0.01 AND CR:radiation%2|CH:actinium%0.01|M2 AND CR:alpha_particle%0.01 AND CR:radiation%2", "M1|M1|M1"];

chemjsChemicals.stable_protactinium = {
  elem: {
    color: [blendColors("#9899a3", "#ff0000"), blendColors("#44464a", "#00ff00"), blendColors("#5a5b5e", "#0000ff")],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 15700,
    hardness: 0.1,
    conduct: 0.235,
  },
  tempHigh: [1568],
};

chemjsChemicals.uranium = {
  elementNames: ["chemical!pure_mixed_uranium", "chemical!pure_uranium_238", "chemical!pure_uranium_235", "chemical!pure_stable_uranium"],
};

chemjsChemicals.mixed_uranium = {
  elementNames: [],
};
chemjsChemicals.uranium_238 = {
  elementNames: [],
};
chemjsChemicals.uranium_235 = {
  elementNames: [],
};
chemjsChemicals.stable_uranium = {
  elementNames: [],
};

chemjsChemicals.pure_mixed_uranium = {
  elementNames: ["uranium", "molten_uranium"],
  categories: ["radioactive", "mixed_uranium"],
  reactionProduct: { stable: "stable_uranium", isotope: "mixed_uranium" },
};

elements.uranium.behavior = ["XX|CR:radiation%1 AND CR:alpha_particle%0.01|XX", "CR:radiation%1 AND CR:alpha_particle%0.01|CH:thorium%0.001|CR:radiation%1 AND CR:alpha_particle%0.01", "M2|M1|M2"];
elements.molten_uranium.behavior = ["XX|CR:fire%2.5 AND CR:radiation%1 AND CR:alpha_particle%0.01|XX", "M2 AND CR:radiation%1 AND CR:alpha_particle%0.01|CH:thorium%0.001|M2 AND CR:radiation%1 AND CR:alpha_particle%0.01", "M1|M1|M1"];
elements.molten_uranium.excludeRandom = true;

chemjsChemicals.pure_uranium_238 = {
  elem: {
    color: ["#599e61", "#364d3c", "#494d4a", "#6c8a42", "#798d65", "#b5e089"],
    behavior: ["XX|CR:alpha_particle%0.01|XX", "CR:alpha_particle%0.01|CH:thorium%0.001|CR:alpha_particle%0.01", "M2|M1|M2"],
    category: "powders",
    hidden: true,
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.235,
  },
  tempHigh: [1132.2],
  stateHigh: ["molten_depleted_uranium"],
  elemName: "depleted_uranium",
  categories: ["radioactive", "uranium_238"],
  reactionProduct: { stable: "stable_uranium", isotope: "uranium_238" },
};

elements.molten_depleted_uranium = {
  behavior: ["XX|CR:fire%2.5 AND CR:alpha_particle%0.01|XX", "M2 AND CR:alpha_particle%0.01|CH:thorium%0.001|M2 AND CR:alpha_particle%0.01", "M1|M1|M1"],
};

chemjsChemicals.pure_uranium_235 = {
  elem: {
    color: ["#599e61", "#364d3c", "#494d4a", "#6c8a42", "#798d65", "#b5e089"],
    behavior: ["XX|CR:radiation%2.5 AND CR:alpha_particle%0.1|XX", "CR:radiation%2.5 AND CR:alpha_particle%0.1|CH:thorium%0.01 AND CH:protactinium%0.005|CR:radiation%2.5 AND CR:alpha_particle%0.1", "M2|M1|M2"],
    category: "powders",
    hidden: true,
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.235,
  },
  tempHigh: [1132.2],
  stateHigh: ["molten_enriched_uranium"],
  elemName: "enriched_uranium",
  categories: ["radioactive", "uranium_235"],
  reactionProduct: { stable: "stable_uranium", isotope: "uranium_235" },
};

elements.molten_enriched_uranium = {
  excludeRandom: true,
  behavior: ["XX|CR:fire%2.5 AND CR:alpha_particle%0.01|XX", "M2 AND CR:alpha_particle%0.01|CH:thorium%0.01 AND CH:protactinium%0.005|M2 AND CR:alpha_particle%0.01", "M1|M1|M1"],
};

chemjsChemicals.pure_stable_uranium = {
  elem: {
    color: [blendColors("#599e61", "#ff0000"), blendColors("#364d3c", "#00ff00"), blendColors("#494d4a", "#0000ff"), blendColors("#6c8a42", "#ff0000"), blendColors("#798d65", "#00ff00"), blendColors("#b5e089", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    hidden: true,
    state: "solid",
    density: 19100,
    hardness: 0.6,
    conduct: 0.235,
  },
  tempHigh: [1132.2],
  stateHigh: ["molten_stable_uranium"],
  elemName: "stable_uranium",
  categories: ["stable_uranium"],
  reactionProduct: { isotope: "stable_uranium" },
};

chemjsChemicals.neptunium = {
  elem: {
    color: ["#626580", "#3f4a61", "#4a5463"],
    behavior: ["XX|CR:neutron%0.1 AND CR:radiation%2|XX", "CR:neutron%0.1 AND CR:radiation%2|CH:thorium%0.025|CR:neutron%0.1 AND CR:radiation%2", "XX|CR:neutron%0.1 AND CR:radiation%2|XX"],
    state: "solid",
    category: "solids",
    density: 19380,
    hardness: 0.7,
    conduct: 0.2,
    excludeRandom: true,
  },
  tempHigh: [639],
  reactionProduct: { stable: "stable_neptunium" },
  categories: ["radioactive"],
};
elements.molten_neptunium = {};
elements.molten_neptunium.behavior = ["XX|CR:fire%2.5 AND CR:neutron%0.1 AND CR:radiation%2|XX", "M2 AND CR:neutron%0.1 AND CR:radiation%2|CH:thorium%0.025|M2 AND CR:neutron%0.1 AND CR:radiation%2", "M1|M1|M1"];
elements.molten_neptunium.excludeRandom = true;

chemjsChemicals.stable_neptunium = {
  elem: {
    color: [blendColors("#626580", "#ff0000"), blendColors("#3f4a61", "#00ff00"), blendColors("#4a5463", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    density: 19380,
    hardness: 0.7,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [639],
};

chemjsChemicals.plutonium = {
  elementNames: ["chemical!pure_mixed_plutonium", "chemical!pure_plutonium_242", "chemical!pure_plutonium_239", "chemical!pure_stable_plutonium"],
};

chemjsChemicals.mixed_plutonium = {
  elementNames: [],
};
chemjsChemicals.plutonium_242 = {
  elementNames: [],
};
chemjsChemicals.plutonium_239 = {
  elementNames: [],
};
chemjsChemicals.stable_plutonium = {
  elementNames: [],
};

chemjsChemicals.pure_mixed_plutonium = {
  elem: {
    color: ["#5fc29f", "#5d9e7d", "#5b7d6b"],
    behavior: ["XX|CR:alpha_particle%0.05 AND CR:radiation%2|XX", "CR:alpha_particle%0.05 AND CR:radiation%2|CH:enriched_uranium%0.025 AND CH:americium%0.025|CR:alpha_particle%0.05 AND CR:radiation%2", "XX|CR:alpha_particle%0.05 AND CR:radiation%2|XX"],
    category: "solids",
    state: "solid",
    density: 19850,
    hardness: 0.7,
    conduct: 0.2,
    excludeRandom: true,
  },
  tempHigh: [639],
  stateHigh: ["molten_plutonium"],
  elemName: "plutonium",
  categories: ["radioactive", "mixed_plutonium"],
  reactionProduct: { stable: "stable_plutonium", isotope: "mixed_plutonium" },
};
elements.molten_plutonium = {
  excludeRandom: true,
  behavior: ["XX|CR:fire%2.5 AND CR:alpha_particle%0.05 AND CR:radiation%2|XX", "M2 AND CR:alpha_particle%0.05 AND CR:radiation%2|CH:enriched_uranium%0.01 AND CH:depleted_uranium%0.02|M2 AND CR:alpha_particle%0.05 AND CR:radiation%2", "M1|M1|M1"],
};

chemjsChemicals.pure_plutonium_242 = {
  elem: {
    color: ["#5fc29f", "#5d9e7d", "#5b7d6b"],
    behavior: ["XX|CR:radiation%2|XX", "CR:radiation%2|CH:depleted_uranium%0.025|CR:radiation%2", "XX|CR:radiation%2|XX"],
    category: "solids",
    hidden: true,
    state: "solid",
    density: 19850,
    hardness: 0.7,
    conduct: 0.2,
    excludeRandom: true,
  },
  tempHigh: [639],
  stateHigh: ["molten_depleted_plutonium"],
  elemName: "depleted_plutonium",
  categories: ["radioactive", "plutonium_242"],
  reactionProduct: { stable: "stable_plutonium", isotope: "plutonium_242" },
};
elements.molten_depleted_plutonium = {
  excludeRandom: true,
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%2|XX", "M2 AND CR:radiation%2|CH:depleted_uranium%0.015|M2 AND CR:radiation%2", "M1|M1|M1"],
};

chemjsChemicals.pure_plutonium_239 = {
  elem: {
    color: ["#5fc29f", "#5d9e7d", "#5b7d6b"],
    behavior: ["XX|CR:alpha_particle%0.05 AND CR:radiation%2|XX", "CR:alpha_particle%0.05 AND CR:radiation%2|CH:enriched_uranium%0.035|CR:alpha_particle%0.05 AND CR:radiation%2", "XX|CR:alpha_particle%0.05 AND CR:radiation%2|XX"],
    category: "solids",
    hidden: true,
    state: "solid",
    density: 19850,
    hardness: 0.7,
    conduct: 0.2,
    excludeRandom: true,
  },
  tempHigh: [639],
  stateHigh: ["molten_enriched_plutonium"],
  elemName: "enriched_plutonium",
  categories: ["radioactive", "plutonium_239"],
  reactionProduct: { stable: "stable_plutonium", isotope: "plutonium_239" },
};
elements.molten_enriched_plutonium = {
  excludeRandom: true,
  behavior: ["XX|CR:fire%2.5 AND CR:alpha_particle%0.05 AND CR:radiation%2|XX", "M2 AND CR:alpha_particle%0.05 AND CR:radiation%2|CH:enriched_uranium%0.035|M2 AND CR:alpha_particle%0.05 AND CR:radiation%2", "M1|M1|M1"],
};

chemjsChemicals.pure_stable_plutonium = {
  elem: {
    color: ["#5fc29f", "#5d9e7d", "#5b7d6b"],
    behavior: behaviors.WALL,
    category: "solids",
    hidden: true,
    state: "solid",
    density: 19850,
    hardness: 0.7,
    conduct: 0.2,
  },
  tempHigh: [639],
  stateHigh: ["molten_stable_plutonium"],
  elemName: "stable_plutonium",
  categories: ["stable_plutonium"],
  reactionProduct: { isotope: "stable_plutonium" },
};

chemjsChemicals.americium = {
  elem: {
    color: ["#42ebaf", "#59d998", "#d0dbd5"],
    behavior: ["XX|CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2|XX", "CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2|CH:neptunium%0.05 AND CH:plutonium%0.05|CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2", "XX|CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2|XX"],
    state: "solid",
    category: "solids",
    density: 12000,
    hardness: 0.9,
    conduct: 0.2,
    excludeRandom: true,
  },
  tempHigh: [1176],
  reactionProduct: { stable: "stable_americium" },
  categories: ["radioactive"],
};

elements.molten_americium = {};
elements.molten_americium.behavior = ["XX|CR:fire%2.5 AND CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2|XX", "M2 AND CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2|CH:neptunium%0.05 AND CH:plutonium%0.05|M2 AND CR:neutron%0.1 AND CR:radiation%2 AND CR:alpha_particle%2", "M1|M1|M1"];
elements.molten_americium.excludeRandom = true;

chemjsChemicals.stable_americium = {
  elem: {
    color: [blendColors("#42ebaf", "#ff0000"), blendColors("#59d998", "#00ff00"), blendColors("#d0dbd5", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "powders",
    density: 12000,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [1176],
};

chemjsChemicals.curium = {
  elem: {
    color: ["#fab1f1", "#d6c9d5", "#e0b1d6"],
    behavior: ["XX|CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1|XX", "CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1|CH:plutonium%0.075|CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1", "XX|CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1|XX"],
    state: "solid",
    category: "solids",
    density: 13510,
    hardness: 0.9,
    conduct: 0.2,
    excludeRandom: true,
  },
  tempHigh: [1340],
  reactionProduct: { stable: "stable_curium" },
  categories: ["radioactive"],
};

elements.molten_curium = {};
elements.molten_curium.behavior = ["XX|CR:fire%2.5 AND CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1|XX", "M2 AND CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1|CH:plutonium%0.075|M2 AND CR:neutron%0.5 AND CR:radiation%1 AND CR:alpha_particle%1", "M1|M1|M1"];
elements.molten_curium.excludeRandom = true;

chemjsChemicals.stable_curium = {
  elem: {
    color: [blendColors("#fab1f1", "#ff0000"), blendColors("#d6c9d5", "#00ff00"), blendColors("#e0b1d6", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "powders",
    density: 13510,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [1340],
};

chemjsChemicals.berkelium = {
  elem: {
    color: ["#f2edfa", "#bdbccf", "#d7cae8"],
    behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX", "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:californium%0.075|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1", "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX"],
    state: "solid",
    category: "solids",
    density: 13250,
    hardness: 0.9,
    conduct: 0.2,
    excludeRandom: true,
  },
  tempHigh: [986],
  reactionProduct: { stable: "stable_berkelium" },
  categories: ["radioactive"],
};

elements.molten_berkelium = {};
elements.molten_berkelium.behavior = ["XX|CR:fire%2.5 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX", "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:californium%0.075|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1", "M1|M1|M1"];
elements.molten_berkelium.excludeRandom = true;

chemjsChemicals.stable_berkelium = {
  elem: {
    color: [blendColors("#f2edfa", "#ff0000"), blendColors("#bdbccf", "#00ff00"), blendColors("#d7cae8", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "powders",
    density: 13250,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [986],
};

chemjsChemicals.californium = {
  elem: {
    color: ["#dfd0f7", "#bcbade", "#b99be0"],
    behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX", "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:curium%0.05 AND CH:einsteinium%0.05|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1", "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX"],
    state: "solid",
    category: "solids",
    density: 15100,
    hardness: 0.9,
    conduct: 0.2,
    excludeRandom: true,
  },
  tempHigh: [900],
  reactionProduct: { stable: "stable_californium" },
  categories: ["radioactive"],
};

elements.molten_californium = {};
elements.molten_californium.behavior = ["XX|CR:fire%2.5 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX", "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:curium%0.05 AND CH:einsteinium%0.05|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1", "M1|M1|M1"];
elements.molten_californium.excludeRandom = true;

chemjsChemicals.stable_californium = {
  elem: {
    color: [blendColors("#dfd0f7", "#ff0000"), blendColors("#bcbade", "#00ff00"), blendColors("#b99be0", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "powders",
    density: 15100,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [900],
};

chemjsChemicals.einsteinium = {
  elem: {
    color: ["#3aa6c2", "#b8edf1", "#83d9e4"],
    behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX", "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:curium%0.05 AND CH:fermium%0.05|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1", "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX"],
    state: "solid",
    category: "solids",
    density: 8840,
    hardness: 0.9,
    conduct: 0.2,
    excludeRandom: true,
  },
  tempHigh: [1133],
  reactionProduct: { stable: "stable_einsteinium" },
  categories: ["radioactive"],
};

elements.molten_einsteinium = {};
elements.molten_einsteinium.behavior = ["XX|CR:fire%2.5 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX", "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:berkelium%0.05 AND CH:fermium%0.05|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1", "M1|M1|M1"];
elements.molten_einsteinium.excludeRandom = true;

chemjsChemicals.stable_einsteinium = {
  elem: {
    color: [blendColors("#3aa6c2", "#ff0000"), blendColors("#b8edf1", "#00ff00"), blendColors("#83d9e4", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "powders",
    density: 8840,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [1133],
};

chemjsChemicals.fermium = {
  elem: {
    color: ["#c8a7fc", "#cecbf2", "#d5bff2"],
    behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX", "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:californium%0.1|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1", "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX"],
    state: "solid",
    category: "solids",
    density: 9710,
    hardness: 0.9,
    conduct: 0.2,
    excludeRandom: true,
  },
  tempHigh: [1800],
  reactionProduct: { stable: "stable_fermium" },
  categories: ["radioactive"],
};

elements.molten_fermium = {};
elements.molten_fermium.behavior = ["XX|CR:fire%2.5 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|XX", "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1|CH:californium%0.1|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1", "M1|M1|M1"];
elements.molten_fermium.excludeRandom = true;

chemjsChemicals.stable_fermium = {
  elem: {
    color: [blendColors("#c8a7fc", "#ff0000"), blendColors("#cecbf2", "#00ff00"), blendColors("#d5bff2", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "powders",
    density: 9710,
    hardness: 0.9,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [1800],
};

chemjsChemicals.copernicium = {
  elem: {
    color: ["#a7fcbc", "#8cc299", "#9db9c2"],
    behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|XX", "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|CH:transactinide_fallout%1|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1", "M1|M1|M1"],
    state: "liquid",
    category: "liquids",
    density: 14010,
    hardness: 0.999,
    conduct: 0.2,
    excludeRandom: true,
    tick: function (pixel) {
      pixel.temp += 50;
    },
  },
  tempHigh: [67],
  tempLow: [10],
  stateLow: ["solid_copernicium"],
  densityHigh: [11.848],
  reactionProduct: { stable: "stable_copernicium" },
  categories: ["radioactive"],
  causticIgnore: true,
};

elements.solid_copernicium = {
  behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|XX", "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|CH:transactinide_fallout%1|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1", "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|XX"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 50;
  },
  excludeRandom: true,
};

elements.copernicium_gas = {
  behavior: ["M2|M1 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|M2", "M1 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|CH:transactinide_fallout%1|M1 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1", "M2|M1 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|M2"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 50;
  },
  excludeRandom: true,
};

chemjsChemicals.stable_copernicium = {
  elem: {
    color: [blendColors("#a7fcbc", "#ff0000"), blendColors("#8cc299", "#00ff00"), blendColors("#9db9c2", "#0000ff")],
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "liquids",
    density: 14010,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [67],
  tempLow: [10],
  stateLow: ["solid_stable_copernicium"],
  densityHigh: [11.848],
  toxic: [0.02],
  causticIgnore: true,
};

chemjsChemicals.nihonium = {
  elem: {
    color: ["#c94a0a"],
    /*spike viper reference*/ behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|XX", "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|CH:transactinide_fallout%1|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1", "XX|M1|XX"],
    state: "solid",
    category: "powders",
    density: 16000,
    hardness: 0.999,
    conduct: 0.2,
    excludeRandom: true,
    tick: function (pixel) {
      pixel.temp += 50;
    },
  },
  tempHigh: [430],
  reactionProduct: { stable: "stable_nihonium" },
  categories: ["radioactive"],
};

elements.molten_nihonium = {
  behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|XX", "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|CH:transactinide_fallout%1|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1", "M1|M1|M1"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 50;
  },
  excludeRandom: true,
  state: "liquid",
};

chemjsChemicals.stable_nihonium = {
  elem: {
    color: [blendColors("#c94a0a", "#ff0000"), blendColors("#c94a0a", "#00ff00"), blendColors("#c94a0a", "#0000ff")],
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    category: "powders",
    density: 16000,
    hardness: 0.999,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [430],
  toxic: [0.02],
};

chemjsChemicals.flerovium = {
  elem: {
    color: ["#a8ffe2", "#7ddbcd", "#9dc2b1"],
    behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|XX", "M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|CH:copernicium%1|M2 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1", "M1|M1|M1"],
    state: "liquid",
    category: "liquids",
    density: 11400,
    hardness: 0.999,
    conduct: 0.2,
    excludeRandom: true,
    tick: function (pixel) {
      pixel.temp += 50;
    },
  },
  tempHigh: [107],
  tempLow: [-73],
  stateLow: ["solid_flerovium"],
  densityHigh: [12.014],
  reactionProduct: { stable: "stable_flerovium" },
  categories: ["radioactive"],
  causticIgnore: true,
};

elements.solid_flerovium = {
  behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|XX", "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|CH:copernicium%1|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1", "XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|XX"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 50;
  },
  excludeRandom: true,
};

elements.flerovium_gas = {
  behavior: ["M2|M1 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|M2", "M1 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|CH:copernicium%1|M1 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1", "M2|M1 AND CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|M2"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 50;
  },
  excludeRandom: true,
};

chemjsChemicals.stable_flerovium = {
  elem: {
    color: [blendColors("#a8ffe2", "#ff0000"), blendColors("#7ddbcd", "#00ff00"), blendColors("#9dc2b1", "#0000ff")],
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "liquids",
    density: 11400,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [107],
  tempLow: [-73],
  stateLow: ["solid_stable_flerovium"],
  densityHigh: [12.014],
  toxic: [0.02],
  causticIgnore: true,
};

chemjsChemicals.moscovium = {
  elem: {
    color: ["#8a3683", "#b0339b", "#d14fcd"],
    behavior: ["XX|CR:neutron%2 AND CR:radiation%2 AND CR:alpha_particle%2 AND CR:rad_pop%2|XX", "CR:neutron%2 AND CR:radiation%2 AND CR:alpha_particle%2 AND CR:rad_pop%2|CH:nihonium%1|CR:neutron%2 AND CR:radiation%2 AND CR:alpha_particle%2 AND CR:rad_pop%2", "XX|CR:neutron%2 AND CR:radiation%2 AND CR:alpha_particle%2 AND CR:rad_pop%2|XX"],
    state: "solid",
    category: "solids",
    density: 13500,
    hardness: 0.999,
    conduct: 0.2,
    excludeRandom: true,
    tick: function (pixel) {
      pixel.temp += 100;
    },
  },
  tempHigh: [400],
  reactionProduct: { stable: "stable_moscovium" },
  categories: ["radioactive"],
};

elements.molten_moscovium = {
  behavior: ["XX|CR:neutron%2 AND CR:radiation%2 AND CR:alpha_particle%2 AND CR:rad_pop%2|XX", "M2 AND CR:neutron%2 AND CR:radiation%2 AND CR:alpha_particle%2 AND CR:rad_pop%2|CH:nihonium%1|CR:neutron%2 AND CR:radiation%2 AND CR:alpha_particle%2 AND CR:rad_pop%2", "M1|M1|M1"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 100;
  },
  excludeRandom: true,
  state: "liquid",
};

chemjsChemicals.stable_moscovium = {
  elem: {
    color: [blendColors("#c94a0a", "#ff0000"), blendColors("#c94a0a", "#00ff00"), blendColors("#c94a0a", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    density: 13500,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [400],
};

chemjsChemicals.livermorium = {
  elem: {
    color: ["#c9c26b", "#5ee04c", "#8bc253"],
    behavior: ["XX|CR:neutron%10 AND CR:radiation%10 AND CR:alpha_particle%10 AND CR:rad_pop%10 AND CR:n_explosion%0.1|XX", "CR:neutron%10 AND CR:radiation%10 AND CR:alpha_particle%10 AND CR:rad_pop%10 AND CR:n_explosion%0.1|CH:flerovium%1|CR:neutron%10 AND CR:radiation%10 AND CR:alpha_particle%10 AND CR:rad_pop%10 AND CR:n_explosion%0.1", "XX|CR:neutron%10 AND CR:radiation%10 AND CR:alpha_particle%10 AND CR:rad_pop%10 AND CR:n_explosion%0.1|XX"],
    state: "solid",
    category: "solids",
    density: 12900,
    hardness: 0.999,
    conduct: 0.2,
    excludeRandom: true,
    tick: function (pixel) {
      pixel.temp += 100;
    },
  },
  tempHigh: [455],
  reactionProduct: { stable: "stable_livermorium" },
  categories: ["radioactive"],
};

elements.molten_livermorium = {
  behavior: ["XX|CR:neutron%10 AND CR:radiation%10 AND CR:alpha_particle%10 AND CR:rad_pop%10 AND CR:n_explosion%0.1|XX", "M2 AND CR:neutron%10 AND CR:radiation%10 AND CR:alpha_particle%10 AND CR:rad_pop%10 AND CR:n_explosion%0.1|CH:flerovium%1|CR:neutron%10 AND CR:radiation%10 AND CR:alpha_particle%10 AND CR:rad_pop%10 AND CR:n_explosion%0.1", "M1|M1|M1"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 100;
  },
  excludeRandom: true,
  state: "liquid",
};

chemjsChemicals.stable_livermorium = {
  elem: {
    color: [blendColors("#c94a0a", "#ff0000"), blendColors("#c94a0a", "#00ff00"), blendColors("#c94a0a", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    density: 12900,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [455],
};

chemjsChemicals.tennessine = {
  elem: {
    color: ["#4f4c42"],
    behavior: ["XX|CR:neutron%15 AND CR:radiation%15 AND CR:alpha_particle%15 AND CR:rad_pop%15 AND CR:n_explosion%0.2|XX", "CR:neutron%15 AND CR:radiation%15 AND CR:alpha_particle%15 AND CR:rad_pop%15 AND CR:n_explosion%0.2|CH:moscovium%1|CR:neutron%15 AND CR:radiation%15 AND CR:alpha_particle%15 AND CR:rad_pop%15 AND CR:n_explosion%0.2", "M2|M1|M2"],
    state: "solid",
    category: "powders",
    density: 7200,
    hardness: 0.999,
    conduct: 0.1,
    excludeRandom: true,
    tick: function (pixel) {
      pixel.temp += 100;
    },
  },
  tempHigh: [425],
  reactionProduct: { stable: "stable_tennessine" },
  categories: ["radioactive"],
};

elements.molten_tennessine = {
  behavior: ["XX|CR:neutron%15 AND CR:radiation%15 AND CR:alpha_particle%15 AND CR:rad_pop%15 AND CR:n_explosion%0.2|XX", "M2 AND CR:neutron%15 AND CR:radiation%15 AND CR:alpha_particle%15 AND CR:rad_pop%15 AND CR:n_explosion%0.2|CH:moscovium%1|M2 AND CR:neutron%15 AND CR:radiation%15 AND CR:alpha_particle%15 AND CR:rad_pop%15 AND CR:n_explosion%0.2", "M1|M1|M1"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 100;
  },
  excludeRandom: true,
  state: "liquid",
};

chemjsChemicals.stable_tennessine = {
  elem: {
    color: [blendColors("#4f4c42", "#ff0000"), blendColors("#4f4c42", "#00ff00"), blendColors("#4f4c42", "#0000ff")],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 7200,
    conduct: 0.1,
    hidden: true,
  },
  tempHigh: [425],
  toxic: [0.01],
};

chemjsChemicals.oganesson = {
  elem: {
    color: ["#c4ccc6", "#9ea39f", "#8e9294"],
    behavior: ["XX|CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1|XX", "CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1|CH:livermorium%1|CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1", "XX|CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1|XX"],
    state: "solid",
    category: "solids",
    density: 7200,
    hardness: 0.999,
    excludeRandom: true,
    tick: function (pixel) {
      pixel.temp += 100;
    },
  },
  tempHigh: [52, 177],
  densityHigh: [null, 12.222],
  reactionProduct: { stable: "stable_oganesson" },
  categories: ["radioactive"],
};
elements.molten_oganesson = {
  behavior: ["XX|CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1|XX", "M2 AND CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1|CH:livermorium%1|M2 AND CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1", "M1|M1|M1"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 100;
  },
  excludeRandom: true,
  state: "liquid",
};

elements.oganesson_gas = {
  behavior: ["M2|M1 AND CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1|M2", "M1 AND CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1|CH:livermorium%1|M1 AND CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1", "M2|M1 AND CR:neutron%20 AND CR:radiation%20 AND CR:alpha_particle%20 AND CR:rad_pop%20 AND CR:n_explosion%1|M2"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 100;
  },
  excludeRandom: true,
  colorOn: ["#e224ff", "#cc6c96", "#c76ccc"],
  conduct: 0.86,
  state: "gas",
};

chemjsChemicals.stable_oganesson = {
  elem: {
    color: [blendColors("#c4ccc6", "#ff0000"), blendColors("#9ea39f", "#00ff00"), blendColors("#8e9294", "#0000ff")],
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    density: 7200,
    conduct: 0.1,
    hidden: true,
  },
  tempHigh: [52, 177],
  densityHigh: [null, 12.222],
};

elements.molten_stable_oganesson = {
  behavior: behaviors.LIQUID,
  state: "liquid",
};

elements.stable_oganesson_gas = {
  colorOn: ["#e224ff", "#cc6c96", "#c76ccc"],
  conduct: 0.86,
  state: "gas",
};

chemjsChemicals.ununennium = {
  elem: {
    color: ["#c0eb9b", "#82e082", "#b8c29d"],
    behavior: ["XX|CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|XX", "M2 AND CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|CH:tennessine%1|M2 AND CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2", "M1|M1|M1"],
    state: "liquid",
    category: "liquids",
    density: 3000,
    hardness: 0.999,
    conduct: 0.2,
    excludeRandom: true,
    tick: function (pixel) {
      pixel.temp += 150;
    },
  },
  tempHigh: [630],
  tempLow: [15],
  stateLow: ["solid_ununennium"],
  densityHigh: [12.555],
  reactionProduct: { stable: "stable_ununennium" },
  categories: ["radioactive"],
};

elements.solid_ununennium = {
  behavior: ["XX|CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|XX", "CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|CH:tennessine%1|CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2", "M2|M1|M2"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 150;
  },
  excludeRandom: true,
};

elements.ununennium_gas = {
  behavior: ["M2|M1 AND CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|M2", "M1 AND CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|CH:tennessine%1|M1 AND CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2", "M2|M1 AND CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|M2"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 150;
  },
  excludeRandom: true,
};

chemjsChemicals.stable_ununennium = {
  elem: {
    color: [blendColors("#c0eb9b", "#ff0000"), blendColors("#82e082", "#00ff00"), blendColors("#b8c29d", "#0000ff")],
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "liquids",
    density: 14010,
    conduct: 0.2,
    hidden: true,
  },
  tempHigh: [630],
  tempLow: [15],
  stateLow: ["solid_stable_ununennium"],
  densityHigh: [12.555],
};

elements.solid_stable_ununennium = {
  behavior: behaviors.POWDER,
};

chemjsChemicals.unbinilium = {
  elem: {
    color: ["#faf069", "#fcf0c7", "#edcd3e"],
    behavior: ["XX|CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|XX", "CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|CH:oganesson%1|CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2", "M2|M1|M2"],
    state: "solid",
    category: "powders",
    density: 7000,
    hardness: 0.999,
    conduct: 0.2,
    excludeRandom: true,
    tick: function (pixel) {
      pixel.temp += 150;
    },
  },
  tempHigh: [680],
  reactionProduct: { stable: "stable_unbinilium" },
  categories: ["radioactive"],
};

elements.molten_unbinilium = {
  behavior: ["XX|CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|XX", "M2 AND CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2|CH:oganesson%1|M2 AND CR:neutron%25 AND CR:radiation%25 AND CR:alpha_particle%25 AND CR:rad_pop%25 AND CR:n_explosion%2", "M1|M1|M1"],
  hardness: 0.999,
  tick: function (pixel) {
    pixel.temp += 100;
  },
  excludeRandom: true,
  state: "liquid",
};

chemjsChemicals.stable_unbinilium = {
  elem: {
    color: [blendColors("#faf069", "#ff0000"), blendColors("#fcf0c7", "#00ff00"), blendColors("#edcd3e", "#0000ff")],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 7000,
    conduct: 0.1,
    hidden: true,
  },
  tempHigh: [680],
  toxic: [0.01],
};

chemjsChemicals.radioactive = {
  elementNames: [],
};
//acids

chemjsChemicals.generic_acid = {
  elem: {
    name: "acid",
    color: "#80d488",
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1020,
    burn: 30,
    burnTime: 1,
    hidden: true,
  },
  tempHigh: [110, 400],
  stateHigh: [null, ["fire"]],
  densityHigh: [1],
  tempLow: [-10],
};
elements.generic_acid_gas = {
  name: "acid_gas",
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};
elements.generic_acid_ice = {
  name: "acid_ice",
};

let hydrofluoricAcidTick = function (pixel) {
  let change = false;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0) && !isEmpty(pixel.x + i, pixel.y + j, true) && !elements[pixel.element].ignore.includes(pixelMap[pixel.x + i][pixel.y + j].element)) {
        if (!elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness || Math.random() > elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness) {
          changePixel(pixelMap[pixel.x + i][pixel.y + j], "fire");
          change = true;
        }
      }
    }
  }
  if (change) {
    if (Math.random() < 0.2) {
      changePixel(pixel, "hydrogen_fluoride");
    } else {
      deletePixel(pixel.x, pixel.y);
    }
  }
};

chemjsChemicals.hydrofluoric_acid = {
  elem: {
    color: ["#c8cf91", "#efff5e", "#a0cc39"],
    tick: hydrofluoricAcidTick,
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "liquids",
    density: 1020,
    stain: 0.005,
  },
  densityHigh: [1.63],
  tempHigh: [100, 400],
  stateHigh: [null, ["fire"]],
  tempLow: [-58.88],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "fluoride" },
  categories: ["acids", "hydrogen_ion", "fluoride", "caustic"],
};

elements.hydrofluoric_acid_gas = {
  tick: hydrofluoricAcidTick,
  behavior: behaviors.GAS,
  category: "gases",
  stain: 0.005,
};

let hydrogenFluorideTick = function (pixel) {
  let change = false;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0) && !isEmpty(pixel.x + i, pixel.y + j, true) && !elements[pixel.element].ignore.includes(pixelMap[pixel.x + i][pixel.y + j].element)) {
        if (!elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness || Math.random() > elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness) {
          changePixel(pixelMap[pixel.x + i][pixel.y + j], "fire");
          change = true;
        }
      }
    }
  }
  if (change && Math.random() < 0.2) {
    changePixel(pixel, "fire");
  }
};

chemjsChemicals.hydrogen_fluoride = {
  elem: {
    color: "#f2f28d",
    behavior: behaviors.GAS,
    tick: hydrogenFluorideTick,
    state: "gas",
    category: "gases",
    density: 1.7,
    stain: 0.005,
  },
  densityLow: [990],
  tempLow: [19.5, -83.6],
  elementNames: ["chemical!hydrofluoric_acid"],
  ignore: ["chemical!fluorine_ignore", "chemical!potassium_fluoride"],
  ignorable: true,
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "fluoride" },
  categories: ["hydrogen_ion", "fluoride"],
  ignore: ["chemical!fluoride", "chemical!apatite"],
};

elements.liquid_hydrogen_fluoride = {
  tick: hydrogenFluorideTick,
  behavior: behaviors.LIQUID,
  category: "liquids",
  stain: 0.005,
};

let fluoroboricAcidTick = function (pixel) {
  let change = false;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0) && !isEmpty(pixel.x + i, pixel.y + j, true) && !elements[pixel.element].ignore.includes(pixelMap[pixel.x + i][pixel.y + j].element)) {
        if (!elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness || Math.random() > elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness) {
          changePixel(pixelMap[pixel.x + i][pixel.y + j], "fire");
          change = true;
        }
      }
    }
  }
  if (change) {
    if (Math.random() < 0.2) {
      changePixel(pixel, "boron_trifluoride");
    } else {
      deletePixel(pixel.x, pixel.y);
      return;
    }
  }
};

chemjsChemicals.fluoroboric_acid = {
  elem: {
    color: ["#3bffdb", "#00caaf", "#56c4a3"],
    tick: fluoroboricAcidTick,
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "liquids",
    density: 1020,
    stain: 0.005,
    hidden: true,
  },
  densityHigh: [1],
  tempHigh: [100, 1000],
  stateHigh: [null, ["fire"]],
  tempLow: [0],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "tetrafluoroborate" },
  categories: ["acids", "hydrogen_ion", "tetrafluoroborate", "caustic"],
  ignore: ["chemical!boric_acid", "chemical!tetrafluoroborate"],
};

elements.fluoroboric_acid_gas = {
  tick: fluoroboricAcidTick,
  behavior: behaviors.GAS,
  category: "gases",
  stain: 0.005,
};

chemjsChemicals.nitric_acid = {
  elem: {
    color: ["#91993c", "#6b7041", "#5f614b"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1500,
  },
  tempHigh: [83, 400],
  stateHigh: [null, ["fire"]],
  densityHigh: [1.5],
  tempLow: [-42],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "nitrate" },
  categories: ["acids", "hydrogen_ion", "nitrate", "caustic"],
  ignore: ["chemical!nitrate"],
};
elements.nitric_acid_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

chemjsChemicals.hexafluorosilicic_acid = {
  elem: {
    color: ["#ebeed8", "#f9ffc2", "#c7e189"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1460,
    hidden: true,
  },
  tempHigh: [108.5, 400],
  stateHigh: [null, ["fire"]],
  densityHigh: [5.89],
  tempLow: [19],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "hexafluorosilicate" },
  categories: ["acids", "hydrogen_ion", "hexafluorosilicate", "caustic"],
};
elements.hexafluorosilicic_acid_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
  hidden: true,
};

chemjsChemicals.phosphoric_acid = {
  elem: {
    color: ["#a1a3ed", "#8f91db", "#bab5f5"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1684,
    viscosity: 26.7,
  },
  tempHigh: [120, 1000],
  stateHigh: [null, ["fire"]],
  densityHigh: [4],
  tempLow: [0],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "phosphate" },
  categories: ["acids", "hydrogen_ion", "phosphate"],
  ignore: ["chemical!phosphorus_pentoxide", "chemical!phosphate", "sugar"],
};
elements.phosphoric_acid_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

chemjsChemicals.sulfuric_acid = {
  elem: {
    color: ["#e9e05e", "#c2bd7a", "#9e9c7b"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1830,
    viscosity: 26.7,
  },
  tempHigh: [337, 600],
  stateHigh: [null, ["fire"]],
  densityHigh: [1.26],
  tempLow: [10],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "sulfate" },
  categories: ["acids", "hydrogen_ion", "sulfate", "caustic"],
  ignore: ["chemical!sulfate"],
};
elements.sulfuric_acid_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

elements.acid.name = "hydrochloric_acid";
elements.acid.forceAutoGen = true;
elements.acid_gas.name = "hydrochloric_acid_gas";
elements.acid_ice = {
  name: "hydrochloric_acid_ice",
};

chemjsChemicals.hydrochloric_acid = {
  elementNames: ["acid", "acid_gas", "acid_ice"],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "chloride" },
  categories: ["acids", "hydrogen_ion", "chloride", "caustic"],
};

let perchloricAcidTick = function (pixel) {
  let change = false;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0) && !isEmpty(pixel.x + i, pixel.y + j, true) && !elements[pixel.element].ignore.includes(pixelMap[pixel.x + i][pixel.y + j].element)) {
        if (!elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness || Math.random() > elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness) {
          changePixel(pixelMap[pixel.x + i][pixel.y + j], "fire");
          change = true;
        }
      }
    }
  }
  if (change) {
    if (Math.random() < 0.2) {
      changePixel(pixel, "explosion");
    } else {
      deletePixel(pixel.x, pixel.y);
      return;
    }
  }
};

chemjsChemicals.perchloric_acid = {
  elem: {
    color: ["#ff963b", "#ca6800", "#c48a56"],
    tick: perchloricAcidTick,
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "liquids",
    density: 1768,
    stain: 0.01,
    viscosity: 200,
    hardness: 0.4,
    hidden: true,
  },
  densityHigh: [1.63],
  tempHigh: [75, 100],
  stateHigh: [null, ["fire"]],
  tempLow: [-112],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "perchlorate" },
  categories: ["acids", "hydrogen_ion", "perchlorate", "caustic"],
  ignore: ["fire", "smoke"],
};

elements.perchloric_acid_gas = {
  tick: perchloricAcidTick,
  behavior: behaviors.GAS,
  category: "gases",
  stain: 0.01,
  hardness: 0.4,
};

chemjsChemicals.hydrobromic_acid = {
  elem: {
    color: ["#ff3b3b", "#ca0000", "#9e7b7b"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1100,
    hidden: true,
  },
  tempHigh: [100, 1000],
  stateHigh: [null, ["fire"]],
  densityHigh: [3.31],
  tempLow: [0],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "bromide" },
  categories: ["acids", "hydrogen_ion", "bromide", "caustic"],
};
elements.hydrobromic_acid_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

chemjsChemicals.hydrogen_iodide = {
  elem: {
    color: "#aa8df2",
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    density: 2.85,
    stain: 0.005,
  },
  densityLow: [2850],
  tempLow: [-35.4, -50.8],
  elementNames: ["chemical!hydroiodic_acid"],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "iodide" },
  categories: ["hydrogen_ion", "iodide"],
  toxic: [0.1],
};

chemjsChemicals.hydroiodic_acid = {
  elem: {
    color: ["#9670ff", "#da6afc", "#a77af5", "#9670ff", "#da6afc", "#a77af5", "#633a1d"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1150,
    hidden: true,
  },
  tempHigh: [100, 1000],
  stateHigh: [null, ["fire"]],
  densityHigh: [2.85],
  tempLow: [0],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "iodide" },
  categories: ["acids", "hydrogen_ion", "iodide", "caustic"],
};
elements.hydroiodic_acid_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

chemjsChemicals.hydroastatic_acid = {
  elem: {
    color: [blendColors("#5a5e5a", "#ff0000", 0.25), blendColors("#5a5e5a", "#00ff00", 0.25), blendColors("#5a5e5a", "#0000ff", 0.25)],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1200,
    hidden: true,
  },
  tempHigh: [100, 1000],
  stateHigh: [null, ["fire"]],
  densityHigh: [8.62],
  tempLow: [-3],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "astatide" },
  categories: ["acids", "hydrogen_ion", "astatide", "caustic"],
};
elements.hydroastatic_acid_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

chemjsChemicals.acids = {
  elementNames: ["chemical!generic_acid"],
  ignorable: true,
};

chemjsChemicals.acid_liquids = {
  elementNames: ["chemical!acids,state!liquid"],
};

chemjsChemicals.acid_gases = {
  elementNames: ["chemical!acids,state!gas"],
};

chemjsChemicals.caustic_ignore = {
  elementNames: structuredClone(elements.acid.ignore).concat("chemical!caustic"),
};

chemjsChemicals.ignorable = {
  elementNames: [],
};

//bases

behaviors.CAUSTIC = ["XX|DB%5|XX", "DB%5|XX|DB%5", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"];
behaviors.MOLTEN_CAUSTIC = ["XX|DB%5 AND CR:fire%2.5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"];

chemjsChemicals.caustic = {
  elementNames: [],
  ignore: ["chemical!caustic_ignore"],
  ignorable: true,
};

chemjsChemicals.generic_base = {
  elem: {
    color: "#d48092",
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1020,
    hidden: true,
  },
  elemName: "base",
  tempHigh: [110, 400],
  stateHigh: ["base_gas", ["fire"]],
  densityHigh: [1],
  tempLow: [-10],
  categories: ["caustic"],
};
elements.base_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
  state: "gas",
};

chemjsChemicals.sodium_hydride = {
  elem: {
    color: ["#9e9e9e", "#4f4f4f", "#616161", "#454545"],
    behavior: behaviors.CAUSTIC,
    category: "powders",
    state: "solid",
    density: 1390,
    hidden: true,
    burn: 75,
    burnTime: 120,
    fireColor: "#ffff00",
  },
  tempHigh: [638],
  stateHigh: [["sodium", "hydrogen"]],
  reactionProduct: { anionBase: "hydride", cationBase: "sodium_ion" },
  categories: ["bases", "sodium_ion", "hydride", "insoluble", "caustic"],
  ignore: ["chemical!sodium", "chemical!hydrogen"],
};

chemjsChemicals.sodium_methoxide = {
  elem: {
    color: ["#c4c4c4", "#8c8c8c", "#ababab", "#787878"],
    behavior: behaviors.CAUSTIC,
    category: "powders",
    state: "solid",
    density: 970,
    hidden: true,
    burn: 5,
    burnTime: 100,
    fireColor: "#ffff00",
  },
  tempHigh: [127],
  reactionProduct: { anionBase: "methoxide", cationBase: "sodium_ion" },
  categories: ["bases", "sodium_ion", "methoxide", "insoluble", "caustic"],
  ignore: ["chemical!sodium", "chemical!methanol"],
};
elements.molten_sodium_methoxide = {
  behavior: behaviors.MOLTEN_CAUSTIC,
};

chemjsChemicals.sodium_hydroxide_solution = {
  elem: {
    color: ["#fc3bff", "#c000ca", "#9b7b9e"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1050,
  },
  elemName: "sodium_hydroxide",
  tempHigh: [100, 150],
  stateHigh: [null, ["lye"]],
  densityHigh: [1],
  tempLow: [0],
  reactionProduct: { anionBase: "hydroxide", cationBase: "sodium_ion" },
  categories: ["base_solution"],
};
elements.sodium_hydroxide_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

chemjsChemicals.sodium_hydroxide = {
  elementNames: ["lye", "molten_lye", "chemical!sodium_hydroxide_solution"],
  tempHigh: [323],
  reactionProduct: { anionBase: "hydroxide", cationBase: "sodium_ion" },
  categories: ["bases", "sodium_ion", "hydroxide", "caustic"],
};
elements.lye.behavior = behaviors.CAUSTIC;
elements.molten_lye.behavior = behaviors.MOLTEN_CAUSTIC;

chemjsChemicals.potassium_hydroxide_solution = {
  elem: {
    color: ["#3bc4ff", "#0062ca", "#7b949e"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1075,
  },
  elemName: "potassium_hydroxide",
  tempHigh: [100, 150],
  stateHigh: [null, ["caustic_potash"]],
  densityHigh: [1],
  tempLow: [0],
  reactionProduct: { anionBase: "hydroxide", cationBase: "potassium_ion" },
  categories: ["base_solution"],
};
elements.potassium_hydroxide_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

chemjsChemicals.potassium_hydroxide = {
  elementNames: ["caustic_potash", "molten_caustic_potash", "chemical!potassium_hydroxide_solution"],
  reactionProduct: { anionBase: "hydroxide", cationBase: "potassium_ion" },
  categories: ["bases", "potassium_ion", "hydroxide", "caustic"],
};
elements.caustic_potash.behavior = behaviors.CAUSTIC;
elements.molten_caustic_potash = {
  behavior: behaviors.MOLTEN_CAUSTIC,
};

chemjsChemicals.francium_hydroxide_solution = {
  elem: {
    color: [blendColors("#863bff", "#ff0000"), blendColors("#4d00ca", "#00ff00"), blendColors("#897b9e", "#0000ff")],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1200,
    hidden: true,
  },
  elemName: "francium_hydroxide",
  tempHigh: [100, 160],
  stateHigh: [null, ["francium_hydroxide_powder"]],
  densityHigh: [1],
  tempLow: [0],
  reactionProduct: { anionBase: "hydroxide", cationBase: "francium_ion" },
  categories: ["base_solution"],
};
elements.francium_hydroxide_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

chemjsChemicals.francium_hydroxide = {
  elementNames: ["chemical!francium_hydroxide_solution"],
  elem: {
    color: [blendColors("#e8ede8", "#ff0000"), blendColors("#e8ede8", "#00ff00"), blendColors("#e8ede8", "#0000ff")],
    behavior: behaviors.CAUSTIC,
    category: "powders",
    state: "solid",
    density: 5100 /*made up*/,
    hidden: true,
  },
  elemName: "francium_hydroxide_powder",
  tempHigh: [251], //made up
  reactionProduct: { anionBase: "hydroxide", cationBase: "francium_ion" },
  categories: ["bases", "francium_ion", "hydroxide", "caustic"],
  ignore: ["fire", "smoke", "smog", "steam"],
};
elements.molten_francium_hydroxide_powder = {
  behavior: behaviors.MOLTEN_CAUSTIC,
};

chemjsChemicals.ununennium_hydroxide_solution = {
  elem: {
    color: [blendColors("#eb3bff", "#ff0000"), blendColors("#eb3bff", "#00ff00"), blendColors("#eb3bff", "#0000ff")],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1200,
    hidden: true,
  },
  elemName: "ununennium_hydroxide",
  tempHigh: [100, 160],
  stateHigh: [null, ["ununennium_hydroxide_powder"]],
  densityHigh: [1],
  tempLow: [0],
  reactionProduct: { anionBase: "hydroxide", cationBase: "ununennium_i" },
  categories: ["base_solution"],
};
elements.ununennium_hydroxide_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

chemjsChemicals.ununennium_hydroxide = {
  elementNames: ["chemical!ununennium_hydroxide_solution"],
  elem: {
    color: [blendColors("#c8cdc8", "#ff0000"), blendColors("#c8cdc8", "#00ff00"), blendColors("#c8cdc8", "#0000ff")],
    behavior: behaviors.CAUSTIC,
    category: "powders",
    state: "solid",
    density: 5100 /*made up*/,
    hidden: true,
  },
  elemName: "ununennium_hydroxide_powder",
  tempHigh: [251], //made up
  reactionProduct: { anionBase: "hydroxide", cationBase: "ununennium_i" },
  categories: ["bases", "ununennium_i", "hydroxide", "caustic"],
  ignore: ["fire", "smoke", "smog", "steam"],
};
elements.molten_ununennium_hydroxide_powder = {
  behavior: behaviors.MOLTEN_CAUSTIC,
};

chemjsChemicals.red_mud = {
  elem: {
    color: ["#ab3d24", "#cc5d2d", "#a81b1b"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 5200,
    viscosity: 1000000,
    hidden: true,
  },
  tempHigh: [1600],
  stateHigh: [null],
  densityHigh: [3],
  tempLow: [-10],
  categories: ["bases", "caustic"],
};
elements.red_mud_gas = {
  behavior: ["M1|DB%5 AND M1|M1", "DB%5 AND M1|XX|DB%5 AND M1", "DB%5 AND M1|DB%10 AND M1|DB%5 AND M1"],
  category: "gases",
};

chemjsChemicals.bases = {
  elementNames: ["chemical!base_solution"],
};

chemjsChemicals.base_solution = {
  elementNames: ["chemical!generic_base"],
};

chemjsChemicals.base_solution_liquids = {
  elementNames: ["chemical!base_solution,state!liquid"],
};

chemjsChemicals.base_solution_gases = {
  elementNames: ["chemical!base_solution,state!gas"],
};

chemjsChemicals.amphoteric = {
  elementNames: [],
};

//salts

chemjsChemicals.boron_trioxide = {
  elem: {
    color: "#c6c5c7",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 2550,
    state: "solid",
    fireColor: ["#34eb67", "#5ceb34"],
    hidden: true,
  },
  tempHigh: [450],
  categories: ["insoluble", "boron_ion", "oxide"],
};

chemjsChemicals.boric_acid = {
  elem: {
    color: "#fbffeb",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 1435,
    state: "solid",
    fireColor: ["#34eb67", "#5ceb34"],
  },
  tempHigh: [170],
  reactionProduct: { cationAcid: "hydrogen_ion", cationBase: "boron_ion", anionAcid: "borate", anionBase: "hydroxide" },
  categories: ["insoluble", "boron_ion", "hydroxide", "borate", "hydrogen_ion", "amphoteric"],
};
elements.molten_boric_acid = {
  behavior: behaviors.LIQUID,
};

chemjsChemicals.ammonium_nitrate = {
  elem: {
    color: "#e6c3a1",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 1725,
  },
  tempHigh: [169.6],
  stateHigh: [["fire"]],
  elementNames: ["chemical!ammonium_nitrate_solution"],
  reactionProduct: { salt_water: "ammonium_nitrate_solution", cation: "ammonium_ion", anion: "nitrate" },
  categories: ["salt", "ammonium_ion", "nitrate"],
};
chemjsChemicals.ammonium_nitrate_solution = {
  elem: {
    color: blendColors("#e6c3a1", "#2167ff", 0.5),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1010,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "ammonium_nitrate"]],
  reactionProduct: { salt: "ammonium_nitrate" },
  categories: ["salt_water"],
};

chemjsChemicals.ammonium_chloride = {
  elem: {
    color: "#daeced",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 1519,
    hidden: true,
  },
  tempHigh: [338],
  stateHigh: [["ammonia", "acid_gas"]],
  elementNames: ["chemical!ammonium_chloride_solution"],
  reactionProduct: { salt_water: "ammonium_chloride_solution", cation: "ammonium_ion", anion: "chloride" },
  categories: ["salt", "ammonium_ion", "chloride"],
};
chemjsChemicals.ammonium_chloride_solution = {
  elem: {
    color: ["#a299c7", "#7e76b3"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1008,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "ammonium_chloride"]],
  reactionProduct: { salt: "ammonium_chloride" },
  categories: ["salt_water"],
};

chemjsChemicals.ammonium_perchlorate = {
  elem: {
    color: "#edcfca",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "weapons",
    density: 1950,
    burn: 100,
    burnTime: 100,
    burnInto: "big_explosion",
  },
  tempHigh: [200],
  stateHigh: [["big_explosion"]],
  elementNames: ["chemical!ammonium_perchlorate_solution"],
  reactionProduct: { salt_water: "ammonium_perchlorate_solution", cation: "ammonium_ion", anion: "perchlorate" },
  categories: ["salt", "ammonium_ion", "perchlorate"],
};
chemjsChemicals.ammonium_perchlorate_solution = {
  elem: {
    color: blendColors("#edcfca", "#2167ff", 0.5),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1020,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
    burn: 1,
    burnTime: 100,
    burnInto: "big_explosion",
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "ammonium_perchlorate"]],
  reactionProduct: { salt: "ammonium_perchlorate" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_borate = {
  elementNames: ["borax", "molten_borax"],
  categories: ["insoluble", "borate", "sodium_ion"],
};
elements.borax.hidden = false;

chemjsChemicals.sodium_borohydride = {
  elem: {
    color: ["#deded3", "#ebebc7", "#fcfced", "#d9d9d9"],
    behavior: behaviors.CAUSTIC,
    state: "solid",
    category: "powders",
    density: 1070,
    fireColor: ["#34eb67", "#5ceb34"],
  },
  tempHigh: [400],
  stateHigh: [["sodium_hydride", "sodium", "boron"]],
  elementNames: ["chemical!sodium_borohydride_solution"],
  reactionProduct: { salt_water: "sodium_borohydride_solution", cation: "sodium_ion", anion: "borohydride" },
  categories: ["salt", "sodium_ion", "borohydride", "caustic"],
  ignore: ["chemical!sodium", "chemical!hydrogen", "chemical!boron", "chemical!borohydride"],
};

chemjsChemicals.sodium_borohydride_solution = {
  elem: {
    color: ["#ababb7", "#9d9dc1", "#bdbdcb", "#a8a898"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1005,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "sodium_borohydride"]],
  reactionProduct: { salt: "sodium_borohydride" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_octahydrotriborate = {
  elem: {
    color: ["#ded3de", "#ebc7eb", "#fbedfb", "#e3cce3"],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 1070 /*wild guess*/,
    state: "solid",
    fireColor: ["#ffff00", "#34eb67", "#5ceb34"],
    burn: 5,
    burnTime: 10,
    burnInto: "boron_trioxide",
    hidden: true,
  },
  tempHigh: [500], //wild guess
  stateHigh: [["sodium_dodecaborate"]],
  categories: ["insoluble", "sodium_ion", "octahydrotriborate"],
};

chemjsChemicals.sodium_dodecaborate = {
  elem: {
    color: "#f5aef5",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 1050 /*wild guess*/,
    state: "solid",
    fireColor: ["#ffff00", "#34eb67", "#5ceb34"],
    burn: 1,
    burnTime: 10,
    burnInto: "boron_trioxide",
    hidden: true,
  },
  tempHigh: [700], //wild guess
  categories: ["insoluble", "sodium_ion", "dodecaborate"],
};

chemjsChemicals.sodium_bromoheptahydrotriborate = {
  elem: {
    color: ["#ded9d3", "#ebd9c7", "#fbf4ed", "#e3d5cc"],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 1090 /*wild guess*/,
    state: "solid",
    fireColor: ["#ffff00", "#34eb67", "#5ceb34"],
    burn: 5,
    burnTime: 10,
    burnInto: "boron_trioxide",
    hidden: true,
  },
  tempHigh: [150], //wild guess
  stateHigh: [["pentaborane_9", "sodium_bromide", "hydrogen"]],
  categories: ["insoluble", "sodium_ion", "bromoheptahydrotriborate"],
};

chemjsChemicals.sodium_tetrafluoroborate = {
  elem: {
    color: ["#deded3", "#ebebc7", "#fcfced", "#d9d9d9"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2470,
    hidden: true,
    fireColor: ["#34eb67", "#5ceb34"],
  },
  tempHigh: [384],
  stateHigh: [["sodium_fluoride", "boron_trifluoride"]],
  elementNames: ["chemical!sodium_tetrafluoroborate_solution"],
  reactionProduct: { salt_water: "sodium_tetrafluoroborate_solution", cation: "sodium_ion", anion: "tetrafluoroborate" },
  categories: ["salt", "sodium_ion", "tetrafluoroborate"],
};

chemjsChemicals.sodium_tetrafluoroborate_solution = {
  elem: {
    color: ["#ababb7", "#9d9dc1", "#bdbdcb", "#a8a898"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1012,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "sodium_tetrafluoroborate"]],
  reactionProduct: { salt: "sodium_tetrafluoroborate" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_carbonate = {
  elem: {
    color: "#d8dae6",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2540,
    hidden: true,
  },
  tempHigh: [851],
  elementNames: ["chemical!sodium_carbonate_solution"],
  reactionProduct: { salt_water: "sodium_carbonate_solution", cation: "sodium_ion", anion: "carbonate" },
  categories: ["salt", "sodium_ion", "carbonate"],
};

chemjsChemicals.sodium_carbonate_solution = {
  elem: {
    color: ["#c5c1d6", "#afacc2"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1010,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "sodium_carbonate"]],
  reactionProduct: { salt: "sodium_carbonate" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_bicarbonate = {
  elementNames: ["chemical!sodium_bicarbonate_solution", "baking_soda"],
  reactionProduct: { salt_water: "sodium_carbonate_solution", cation: "sodium_ion", anion: "bicarbonate", cationBase: "sodium_ion", anionBase: "bicarbonate" },
  categories: ["salt", "sodium_ion", "bicarbonate", "bases"],
};

chemjsChemicals.sodium_bicarbonate_solution = {
  elem: {
    color: "#7494db",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1026,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "baking_soda"]],
  reactionProduct: { salt: "baking_soda" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_acetate = {
  elementNames: ["sodium_acetate", "molten_sodium_acetate", "chemical!sodium_acetate_solution"],
  reactionProduct: { salt_water: "sodium_carbonate_solution", cation: "sodium_ion", anion: "acetate" },
  categories: ["salt", "sodium_ion", "acetate"],
};

chemjsChemicals.sodium_acetate_solution = {
  elem: {
    color: "#7ea2f2",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1028,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "sodium_acetate"]],
  reactionProduct: { salt: "sodium_acetate" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_fluoride = {
  elem: {
    color: ["#8aebce", "#b9edde"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2558,
    hidden: true,
  },
  tempHigh: [993],
  elementNames: ["chemical!sodium_fluoride_solution"],
  reactionProduct: { salt_water: "sodium_fluoride_solution", cation: "sodium_ion", anion: "fluoride" },
  categories: ["salt", "sodium_ion", "fluoride"],
};

chemjsChemicals.sodium_fluoride_solution = {
  elem: {
    color: ["#8ad0eb", "#b9e3ed"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1012,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "sodium_fluoride"]],
  reactionProduct: { salt: "sodium_fluoride" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_aluminate = {
  elem: {
    color: ["#e6c9b3", "#ebc8ad"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 1500,
    hidden: true,
  },
  tempHigh: [1650],
  elementNames: ["chemical!sodium_aluminate_solution"],
  reactionProduct: { salt_water: "sodium_aluminate_solution", cation: "sodium_ion", anion: "aluminate" },
  categories: ["salt", "sodium_ion", "aluminate"],
};

chemjsChemicals.sodium_aluminate_solution = {
  elem: {
    color: ["#bdb3e6", "#b4adeb"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1005,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "sodium_aluminate"]],
  reactionProduct: { salt: "sodium_aluminate" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_hexafluoroaluminate = {
  elemName: "cryolite",
  elem: {
    color: ["#9ab6d9", "#dae4f0"],
    behavior: behaviors.POWDER,
    category: "land",
    density: 2900,
    state: "solid",
  },
  tempHigh: [950],
  categories: ["insoluble", "sodium_ion", "hexafluoroaluminate"],
};

chemjsChemicals.cryolite_mixture = {
  elem: {
    color: [blendColors("#9ab6d9", "#ebf4ff"), blendColors("#dae4f0", "#e3fdff")],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 2910,
    state: "solid",
    hidden: true,
  },
  tempHigh: [950],
};

chemjsChemicals.cryolite_solution = {
  elem: {
    color: [blendColors(blendColors("#9ab6d9", "#ebf4ff"), "#d1cbcb"), blendColors(blendColors("#dae4f0", "#e3fdff"), "#d1cbcb")],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 2920,
    state: "solid",
    hidden: true,
  },
  tempHigh: [950],
};

chemjsChemicals.sodium_sulfate = {
  elem: {
    color: "#f3f2f5",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2664,
    hidden: true,
  },
  tempHigh: [884],
  elementNames: ["chemical!sodium_sulfate_solution"],
  reactionProduct: { salt_water: "sodium_sulfate_solution", cation: "sodium_ion", anion: "sulfate" },
  categories: ["salt", "sodium_ion", "sulfate"],
  toxic: [0.02],
};
chemjsChemicals.sodium_sulfate_solution = {
  elem: {
    color: blendColors("#f3f2f5", "#2167ff", 0.5),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1013,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "sodium_sulfate"]],
  reactionProduct: { salt: "sodium_sulfate" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_chloride = {
  elementNames: ["salt", "molten_salt", "chemical!sodium_chloride_solution"],
  reactionProduct: { salt_water: "salt_water", cation: "sodium_ion", anion: "chloride" },
  categories: ["salt", "sodium_ion", "chloride"],
};
chemjsChemicals.sodium_chloride_solution = {
  elementNames: ["salt_water", "salt_ice"],
  reactionProduct: { salt: "salt" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_chlorate = {
  elem: {
    color: "#cff0cc",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2490,
    hidden: true,
  },
  tempHigh: [255],
  stateHigh: [["oxygen", "salt"]],
  elementNames: ["chemical!sodium_chlorate_solution"],
  reactionProduct: { salt_water: "sodium_chlorate_solution", cation: "sodium_ion", anion: "chlorate" },
  categories: ["salt", "sodium_ion", "chlorate"],
  toxic: [0.02],
};
chemjsChemicals.sodium_chlorate_solution = {
  elem: {
    color: blendColors("#cff0cc", "#2167ff", 0.25),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1011,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "sodium_chlorate"]],
  reactionProduct: { salt: "sodium_chlorate" },
  categories: ["salt_water"],
};

chemjsChemicals.sodium_perchlorate = {
  elem: {
    color: "#c0d3be",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2499,
    hidden: true,
  },
  tempHigh: [468],
  stateHigh: [["oxygen", "salt", "fire"]],
  elementNames: ["chemical!sodium_perchlorate_solution"],
  reactionProduct: { salt_water: "sodium_perchlorate_solution", cation: "sodium_ion", anion: "perchlorate" },
  categories: ["salt", "sodium_ion", "perchlorate"],
  toxic: [0.02],
};
chemjsChemicals.sodium_perchlorate_solution = {
  elem: {
    color: blendColors("#c0d3be", "#2167ff", 0.25),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1011,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "sodium_perchlorate"]],
  reactionProduct: { salt: "sodium_perchlorate" },
  categories: ["salt_water"],
};

chemjsChemicals.magnesium_oxide = {
  elem: {
    color: "#f0f0f0",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 3600,
    state: "solid",
  },
  tempHigh: [2852],
  categories: ["insoluble", "magnesium_ion", "oxide"],
};

chemjsChemicals.magnesium_fluoride = {
  elem: {
    color: ["#aaabae", "#a9adae"],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 3148,
    state: "solid",
    hidden: true,
  },
  tempHigh: [1263],
  categories: ["insoluble", "magnesium_ion", "fluoride"],
  toxic: [0.1],
};

chemjsChemicals.magnesium_sulfate = {
  elementNames: ["epsom_salt", "molten_epsom_salt", "chemical!magnesium_sulfate_solution"],
  reactionProduct: { salt_water: "epsom_salt_water", cation: "magnesium_ion", anion: "sulfate" },
  categories: ["salt", "magnesium_ion", "sulfate"],
};

chemjsChemicals.magnesium_sulfate_solution = {
  elemName: "epsom_salt_water",
  elem: {
    color: [blendColors("#f2f2f2", "#2167ff", 0.75), blendColors("#d6d6d6", "#2167ff", 0.75)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1015,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "epsom_salt"]],
  reactionProduct: { salt: "epsom_salt" },
  categories: ["salt_water"],
};

chemjsChemicals.magnesium_chloride = {
  elem: {
    color: "#bfbfbf",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2320,
    fireColor: "#f9ebff",
    hidden: true,
  },
  tempHigh: [714],
  elementNames: ["chemical!magnesium_chloride_solution"],
  reactionProduct: { salt_water: "magnesium_chloride_solution", cation: "magnesium_ion", anion: "chloride" },
  categories: ["salt", "magnesium_ion", "chloride"],
};

chemjsChemicals.magnesium_chloride_solution = {
  elem: {
    color: blendColors("#bfbfbf", "#2167ff", 0.75),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1015,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "magnesium_chloride"]],
  reactionProduct: { salt: "magnesium_chloride" },
  categories: ["salt_water"],
};

elements.molten_magnesium_chloride = {
  behaviorOn: ["XX|CR:fire%2.5|XX", "M2|CH:chlorine,magnesium%25|M2", "M1|M1|M1"],
  conduct: 0.3,
};

chemjsChemicals.bauxite = {
  elem: {
    color: ["#915a30", "#cc7533"],
    behavior: behaviors.SUPPORTPOWDER,
    category: "land",
    state: "solid",
    density: 2420,
  },
  tempHigh: [300],
};

chemjsChemicals.bauxite_solution = {
  elemName: "bauxite_slurry",
  elem: {
    color: ["#696380", "#7a759e"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1005,
    hidden: true,
    conduct: 0.05,
    stain: 0.33,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["sodium_aluminate", "sodium_aluminate", "sodium_aluminate", "gallium", "steam", "steam", "steam", "steam"]],
  categories: ["salt_water"],
};

chemjsChemicals.aluminum_hydroxide = {
  elem: {
    color: "#d1cbcb",
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    density: 2420,
    state: "solid",
    hidden: true,
  },
  tempHigh: [300],
  stateHigh: [["alumina", "steam"]],
  categories: ["insoluble", "aluminum_ion", "hydroxide"],
};

chemjsChemicals.aluminum_oxide = {
  elemName: "alumina",
  elem: {
    color: "#ebe1e1",
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    density: 3987,
    state: "solid",
  },
  tempHigh: [2072],
  categories: ["insoluble", "aluminum_ion", "oxide"],
};

chemjsChemicals.aluminum_fluoride = {
  elem: {
    color: "#ebe1e1",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 3100,
    state: "solid",
    hidden: true,
  },
  tempHigh: [1290],
  stateHigh: [["aluminum_fluoride_gas"]],
  categories: ["insoluble", "aluminum_ion", "fluoride"],
};

elements.aluminum_fluoride_gas = {
  color: "#ffff70",
  behavior: behaviors.GAS,
  state: "gas",
  category: "gases",
  density: 3.491,
  hidden: true,
};

chemjsChemicals.potassium_carbonate = {
  elem: {
    color: "#e2e1e8",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2430,
    hidden: true,
  },
  tempHigh: [891],
  elementNames: ["chemical!potassium_carbonate_solution"],
  reactionProduct: { salt_water: "potassium_carbonate_solution", cation: "potassium_ion", anion: "carbonate" },
  categories: ["salt", "potassium_ion", "carbonate"],
};

chemjsChemicals.potassium_carbonate_solution = {
  elem: {
    color: blendColors("#e2e1e8", "#2167ff", 0.75),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1024,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "potassium_carbonate"]],
  reactionProduct: { salt: "potassium_carbonate" },
  categories: ["salt_water"],
};

chemjsChemicals.potassium_nitrate = {
  elemName: "niter",
  elem: {
    color: "#f0efcc",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2109,
  },
  tempHigh: [334],
  stateHigh: [["fire"]],
  elementNames: ["chemical!potassium_nitrate_solution"],
  reactionProduct: { salt_water: "potassium_nitrate_solution", cation: "potassium_ion", anion: "nitrate" },
  categories: ["salt", "potassium_ion", "nitrate"],
};

chemjsChemicals.potassium_nitrate_solution = {
  elemName: "niter_solution",
  elem: {
    color: blendColors("#f0efcc", "#2167ff", 0.75),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1011,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "potassium_nitrate"]],
  reactionProduct: { salt: "potassium_nitrate" },
  categories: ["salt_water"],
};

chemjsChemicals.potassium_fluoride = {
  elem: {
    color: "#e8e8e1",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2480,
    hidden: true,
  },
  tempHigh: [858],
  elementNames: ["chemical!potassium_fluoride_solution"],
  reactionProduct: { salt_water: "potassium_fluoride_solution", cation: "potassium_ion", anion: "fluoride" },
  categories: ["salt", "potassium_ion", "fluoride"],
};

chemjsChemicals.potassium_fluoride_solution = {
  elem: {
    color: blendColors("#e8e8e1", "#2167ff", 0.75),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1020,
    hidden: true,
    conduct: 0.5,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "potassium_fluoride"]],
  reactionProduct: { salt: "potassium_fluoride" },
  categories: ["salt_water"],
};

chemjsChemicals.potassium_sulfate = {
  elem: {
    color: "#f0d8cc",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2660,
    hidden: true,
  },
  tempHigh: [1069],
  elementNames: ["chemical!potassium_sulfate_solution"],
  reactionProduct: { salt_water: "potassium_sulfate_solution", cation: "potassium_ion", anion: "sulfate" },
  categories: ["salt", "potassium_ion", "sulfate"],
};

chemjsChemicals.potassium_sulfate_solution = {
  elemName: "niter_solution",
  elem: {
    color: blendColors("#f0d8cc", "#2167ff", 0.75),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1012,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "potassium_sulfate"]],
  reactionProduct: { salt: "potassium_sulfate" },
  categories: ["salt_water"],
};

chemjsChemicals.potassium_chloride = {
  elementNames: ["potassium_salt", "molten_potassium_salt", "chemical!potassium_chloride_solution"],
  reactionProduct: { salt_water: "salt_water", cation: "potassium_ion", anion: "chloride" },
  categories: ["salt", "potassium_ion", "chloride"],
};

chemjsChemicals.potassium_chloride_solution = {
  elem: {
    color: "#416ed1",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1026,
    conduct: 0.1,
    stain: -0.66,
  },
  elemName: "potassium_salt_water",
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "potassium_salt"]],
  reactionProduct: { salt: "potassium_salt" },
  categories: ["salt_water"],
};

chemjsChemicals.calcium_oxide = {
  elementNames: ["quicklime"],
  categories: ["insoluble", "calcium_ion", "oxide"],
};

chemjsChemicals.calcium_hydroxide = {
  elementNames: ["slaked_lime"],
  reactionProduct: { cation: "calcium_ion", anion: "hydroxide", cationBase: "calcium_ion", anionBase: "hydroxide" },
  categories: ["insoluble", "calcium_ion", "hydroxide", "bases"],
};

chemjsChemicals.calcium_fluoride = {
  elemName: "fluorite",
  elem: {
    color: ["#8fc4f2", "#d0e5f7"],
    behavior: behaviors.POWDER,
    category: "land",
    density: 3180,
    state: "solid",
  },
  tempHigh: [1418],
  categories: ["insoluble", "calcium_ion", "fluoride"],
};

chemjsChemicals.apatite = {
  elem: {
    color: ["#48b593", "#3adec0", "#29c4cc"],
    behavior: behaviors.POWDER,
    category: "land",
    density: 3160,
    state: "solid",
  },
  tempHigh: [1670],
};

chemjsChemicals.tricalcium_phosphate = {
  elem: {
    color: "#b9e9ed",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 3140,
    state: "solid",
    hidden: true,
  },
  tempHigh: [1670],
  categories: ["insoluble", "calcium_ion", "phosphate"],
};

chemjsChemicals.calcium_sulfate = {
  elemName: "chalk",
  elem: {
    color: ["#e0e0e0", "#bfbfbf"],
    behavior: behaviors.POWDER,
    category: "land",
    density: 2320,
    state: "solid",
    stain: 0.05,
  },
  tempHigh: [1460],
  categories: ["insoluble", "calcium_ion", "sulfate"],
};

chemjsChemicals.titanium_dioxide = {
  elemName: "rutile",
  elem: {
    color: "#522614",
    behavior: behaviors.POWDER,
    category: "land",
    density: 4240,
    state: "solid",
  },
  tempHigh: [1843],
  categories: ["insoluble", "titanium_iv", "oxide"],
};

chemjsChemicals.titanium_trichloride = {
  elem: {
    color: "#c71585",
    behavior: behaviors.WALL,
    state: "solid",
    category: "solids",
    density: 2640,
    burn: 20,
    fireColor: "#f9ebff",
  },
  tempHigh: [440],
  stateHigh: [["titanium_tetrachloride", "fire"]],
  elementNames: ["chemical!titanium_trichloride_solution"],
  reactionProduct: { salt_water: "titanium_trichloride_solution", cation: "titanium_iii", anion: "chloride" },
  toxic: [0.1],
  categories: ["salt", "titanium_iii", "chloride"],
};

chemjsChemicals.titanium_trichloride_solution = {
  elem: {
    color: blendColors("#c71585", "#2167ff", 0.4),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1020,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "titanium_trichloride"]],
  reactionProduct: { salt: "titanium_trichloride" },
  toxic: [0.1],
  categories: ["salt_water"],
};

chemjsChemicals.iron_dichloride = {
  elem: {
    color: ["#207d09", "#b51259"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2900,
  },
  tempHigh: [307.6],
  elementNames: ["chemical!iron_dichloride_solution"],
  reactionProduct: { salt_water: "iron_dichloride_solution", cation: "iron_ii", anion: "chloride" },
  categories: ["salt", "iron_ii", "chloride"],
};
chemjsChemicals.iron_dichloride_solution = {
  elem: {
    color: [blendColors("#207d09", "#2167ff", 0.5), blendColors("#b51259", "#2167ff", 0.5)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1030,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "iron_dichloride"]],
  reactionProduct: { salt: "iron_dichloride" },
  categories: ["salt_water"],
};

chemjsChemicals.copper_sulfate = {
  elementNames: ["copper_sulfate", "molten_copper_sulfate"],
  categories: ["insoluble", "copper_ii", "sulfate"],
};

chemjsChemicals.sodium_bromide = {
  elem: {
    color: ["#f5f4ed", "#f2f2eb"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 3210,
  },
  tempHigh: [747],
  elementNames: ["chemical!sodium_bromide_solution"],
  reactionProduct: { salt_water: "sodium_bromide_solution", cation: "sodium_ion", anion: "bromide" },
  categories: ["salt", "sodium_ion", "bromide"],
};
chemjsChemicals.sodium_bromide_solution = {
  elem: {
    color: blendColors("#f5f4ed", "#2167ff", 0.75),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1040,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "sodium_bromide"]],
  reactionProduct: { salt: "sodium_bromide" },
  categories: ["salt_water"],
};

chemjsChemicals.potassium_bromide = {
  elem: {
    color: ["#fccaca", "#f7cbcb"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2740,
  },
  tempHigh: [734],
  elementNames: ["chemical!potassium_bromide_solution"],
  reactionProduct: { salt_water: "potassium_bromide_solution", cation: "potassium_ion", anion: "bromide" },
  categories: ["salt", "potassium_ion", "bromide"],
};
chemjsChemicals.potassium_bromide_solution = {
  elem: {
    color: blendColors("#fccaca", "#2167ff", 0.75),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "potassium_bromide"]],
  reactionProduct: { salt: "potassium_bromide" },
  categories: ["salt_water"],
};

let silverBromideTick = function (pixel) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!isEmpty(pixel.x + i, pixel.y + j, true) && Math.random() < 0.1 && (pixelMap[pixel.x + i][pixel.y + j].element === "light" || pixelMap[pixel.x + i][pixel.y + j].element === "laser" || pixelMap[pixel.x + i][pixel.y + j].element === "liquid_light")) {
        let coords = circleCoords(pixel.x + i, pixel.y + j, 20);
        for (var n = 0; n < coords.length; n++) {
          let k = coords[n].x;
          let l = coords[n].y;
          let distance = (k - pixel.x - i) * (k - pixel.x - i) + (l - pixel.y - j) * (l - pixel.y - j);
          if (!isEmpty(k, l, true) && pixelMap[k][l].element === "silver_bromide") {
            if (distance <= 0) {
              console.log("silver bromide broke");
            }
            let rgb = hexToRGB(blendColors(RGBToHex2(toObject(pixelMap[k][l].color)), RGBToHex2(toObject(pixelMap[pixel.x + i][pixel.y + j].color)), 10 / (10 + distance)));
            pixelMap[k][l].color = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
            //pixelMap[k][l].color = pixelColorPick(pixelMap[k][l],blendColors(RGBToHex2(toObject(pixelMap[k][l].color)),RGBToHex2(toObject(pixelMap[pixel.x+i][pixel.y+j].color)),1/distance));
          }
        }
        if (pixelMap[pixel.x + i][pixel.y + j].element === "light" || pixelMap[pixel.x + i][pixel.y + j].element === "laser") {
          deletePixel(pixel.x + i, pixel.y + j);
        }
      }
    }
  }
};

chemjsChemicals.silver_nitrate = {
  elem: {
    color: ["#cad7fc", "#cbd2f7"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 4350,
    hidden: true,
  },
  tempHigh: [209, 440],
  stateHigh: [null, ["silver", "nitrogen_dioxide", "oxygen", "fire"]],
  elementNames: ["chemical!silver_nitrate_solution"],
  reactionProduct: { salt_water: "silver_nitrate_solution", cation: "silver_i", anion: "nitrate" },
  categories: ["salt", "silver_i", "nitrate"],
  toxic: [0.1],
};
chemjsChemicals.silver_nitrate_solution = {
  elem: {
    color: blendColors("#cad7fc", "#2167ff", 0.5),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1060,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "silver_nitrate"]],
  reactionProduct: { salt: "silver_nitrate" },
  categories: ["salt_water"],
};

chemjsChemicals.silver_bromide = {
  elem: {
    color: ["#fcfcca", "#f7f24f"],
    tick: silverBromideTick,
    behavior: behaviors.POWDER,
    category: "powders",
    density: 6470,
    state: "solid",
  },
  tempHigh: [430],
  categories: ["insoluble", "silver_i", "bromide"],
};

chemjsChemicals.indium_nitrate = {
  elem: {
    color: "#eddaf5",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 4380,
    hidden: true,
  },
  tempHigh: [150],
  stateHigh: [["indium_oxide", "nitrogen_dioxide", "fire"]],
  elementNames: ["chemical!indium_nitrate_solution"],
  reactionProduct: { salt_water: "indium_nitrate_solution", cation: "indium_iii", anion: "nitrate" },
  categories: ["salt", "indium_iii", "nitrate"],
  toxic: [0.1],
};
chemjsChemicals.indium_nitrate_solution = {
  elem: {
    color: blendColors("#eddaf5", "#2167ff", 0.5),
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "indium_nitrate"]],
  reactionProduct: { salt: "indium_nitrate" },
  categories: ["salt_water"],
};

chemjsChemicals.indium_oxide = {
  elem: {
    color: "#ebc7e4",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 7179,
    state: "solid",
    hidden: true,
  },
  tempHigh: [1910],
  categories: ["insoluble", "indium_iii", "oxide"],
};

chemjsChemicals.indium_hydroxide = {
  elem: {
    color: "#e3f294",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 4380,
    state: "solid",
    hidden: true,
  },
  tempHigh: [150],
  stateHigh: [["indium_oxide", "steam"]],
  categories: ["insoluble", "indium_iii", "hydroxide"],
  toxic: [0.02],
};

chemjsChemicals.indium_chloride = {
  elem: {
    color: "#f8ebff",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 3460,
    hidden: true,
  },
  tempHigh: [586],
  elementNames: ["chemical!indium_chloride_solution"],
  reactionProduct: { salt_water: "indium_chloride_solution", cation: "indium_iii", anion: "chloride" },
  categories: ["salt", "indium_iii", "chloride"],
};
chemjsChemicals.indium_chloride_solution = {
  elem: {
    color: "#7e70ff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1030,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "indium_chloride"]],
  reactionProduct: { salt: "indium_chloride" },
  categories: ["salt_water"],
};

chemjsChemicals.thallium_oxide = {
  elem: {
    color: "#2b2b2a",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 10450,
    state: "solid",
    hidden: true,
  },
  tempHigh: [596],
  categories: ["insoluble", "thallium_i", "oxide"],
  toxic: [0.2],
};

chemjsChemicals.thallium_hydroxide = {
  elem: {
    color: ["#f0f564", "#f7ee45"],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 7440,
    hidden: true,
  },
  tempHigh: [139],
  stateHigh: [["thallium_oxide", "steam"]],
  elementNames: ["chemical!thallium_hydroxide_solution"],
  reactionProduct: { salt_water: "thallium_hydroxide_solution", cation: "thallium_i", anion: "hydroxide" },
  categories: ["salt", "thallium_i", "hydroxide"],
  toxic: [0.2],
};
chemjsChemicals.thallium_hydroxide_solution = {
  elem: {
    color: "#a4c244",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1035,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "thallium_hydroxide"]],
  reactionProduct: { salt: "thallium_hydroxide" },
  categories: ["salt_water"],
};

chemjsChemicals.thallium_sulfide = {
  elem: {
    color: "#20201f",
    behavior: behaviors.POWDER,
    category: "powders",
    density: 8390,
    state: "solid",
    hidden: true,
    conduct: 0.5,
  },
  tempHigh: [448],
  categories: ["insoluble", "thallium_i", "sulfide"],
  toxic: [0.2],
};

chemjsChemicals.thallium_sulfate = {
  elem: {
    color: "#fafaf0",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 6770,
    hidden: true,
  },
  tempHigh: [632],
  elementNames: ["chemical!thallium_sulfate_solution"],
  reactionProduct: { salt_water: "thallium_sulfate_solution", cation: "thallium_i", anion: "sulfate" },
  categories: ["salt", "thallium_i", "sulfate"],
  toxic: [0.2],
};
chemjsChemicals.thallium_sulfate_solution = {
  elem: {
    color: "#23ccbe",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1032,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "thallium_sulfate"]],
  reactionProduct: { salt: "thallium_sulfate" },
  categories: ["salt_water"],
};

chemjsChemicals.polonium_dioxide = {
  elem: {
    color: [blendColors("#ffff7f", "#ff0000"), blendColors("#ffff7f", "#00ff00"), blendColors("#ffff7f", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 8900,
    state: "solid",
    hidden: true,
  },
  tempHigh: [500],
  categories: ["insoluble", "polonium_iv", "oxide"],
};

chemjsChemicals.magnesium_polonide = {
  elem: {
    color: [blendColors("#b5b5b5", "#ff0000", 0.25), blendColors("#b5b5b5", "#00ff00", 0.25), blendColors("#b5b5b5", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 6700,
    hidden: true,
  },
  tempHigh: [1800],
  elementNames: ["chemical!magnesium_polonide_solution"],
  reactionProduct: { salt_water: "magnesium_polonide_solution", cation: "magnesium_ion", anion: "polonide" },
  categories: ["salt", "magnesium_ion", "polonide"],
};

chemjsChemicals.magnesium_polonide_solution = {
  elem: {
    color: [blendColors("#2167ff", "#ff0000", 0.25), blendColors("#2167ff", "#00ff00", 0.25), blendColors("#2167ff", "#0000ff", 0.25)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "magnesium_polonide"]],
  reactionProduct: { salt: "magnesium_polonide" },
  categories: ["salt_water"],
};

chemjsChemicals.francium_nihonide = {
  elem: {
    color: [blendColors("#d6d3a9", "#ff0000"), blendColors("#d6d3a9", "#00ff00"), blendColors("#d6d3a9", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 13700,
    /*made up*/ hidden: true,
  },
  tempHigh: [1920], //made up
  categories: ["francium_ion", "nihonide", "insoluble"],
  toxic: [0.1],
};

chemjsChemicals.radium_oxide = {
  elem: {
    color: [blendColors("#b2d9d9", "#ff0000", 0.25), blendColors("#b2d9d9", "#00ff00", 0.25), blendColors("#b2d9d9", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 12000,
    state: "solid",
    hidden: true,
  },
  tempHigh: [1700],
  categories: ["insoluble", "radium_ion", "oxide"],
};
chemjsChemicals.radium_hydroxide = {
  elem: {
    color: [blendColors("#f2fafa", "#ff0000", 0.25), blendColors("#f2fafa", "#00ff00", 0.25), blendColors("#f2fafa", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 12000,
    state: "solid",
    hidden: true,
  },
  tempHigh: [600],
  stateHigh: [["radium_oxide"]],
  reactionProduct: { cation: "radium_ion", anion: "hydroxide", cationBase: "radium_ion", anionBase: "hydroxide" },
  categories: ["insoluble", "radium_ion", "hydroxide", "bases"],
};

chemjsChemicals.radium_chloride = {
  elem: {
    color: [blendColors("#faf3de", "#ff0000", 0.25), blendColors("#faf3de", "#00ff00", 0.25), blendColors("#faf3de", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 4900,
    hidden: true,
  },
  tempHigh: [900],
  elementNames: ["chemical!radium_chloride_solution"],
  reactionProduct: { salt_water: "radium_chloride_solution", cation: "radium_ion", anion: "chloride" },
  categories: ["salt", "radium_ion", "chloride"],
};

chemjsChemicals.radium_chloride_solution = {
  elem: {
    color: [blendColors("#8eadef", "#ff0000", 0.25), blendColors("#8eadef", "#00ff00", 0.25), blendColors("#8eadef", "#0000ff", 0.25)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "radium_chloride"]],
  reactionProduct: { salt: "radium_chloride" },
  categories: ["salt_water"],
};

chemjsChemicals.actinium_oxide = {
  elem: {
    color: [blendColors("#ebf5f5", "#ff0000", 0.25), blendColors("#ebf5f5", "#00ff00", 0.25), blendColors("#ebf5f5", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 12000,
    state: "solid",
    hidden: true,
  },
  tempHigh: [2327],
  categories: ["insoluble", "actinium_ion", "oxide"],
};
chemjsChemicals.actinium_hydroxide = {
  elem: {
    color: [blendColors("#f2cef2", "#ff0000", 0.25), blendColors("#f2cef2", "#00ff00", 0.25), blendColors("#f2cef2", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 12000,
    state: "solid",
    hidden: true,
  },
  tempHigh: [600],
  stateHigh: [["actinium_oxide"]],
  reactionProduct: { cation: "actinium_ion", anion: "hydroxide", cationBase: "actinium_ion", anionBase: "hydroxide" },
  categories: ["insoluble", "actinium_ion", "hydroxide", "bases"],
};

chemjsChemicals.thorium_dioxide = {
  elementNames: [],
  categories: ["oxide", "insoluble"],
  reactionProduct: { anion: "oxide" },
};

chemjsChemicals.unstable_thorium_dioxide = {
  elem: {
    color: ["#313331", "#1a1a18", "#171717", "#24231d", "#262622", "#171613"],
    behavior: ["XX|CR:radiation%0.01|XX", "CR:radiation%0.01|XX|CR:radiation%0.01", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 10000,
  },
  tempHigh: [2865],
  elemName: "thorium_dioxide",
  stateHigh: ["molten_thorium_dioxide"],
  categories: ["unstable_thorium_iv", "unstable_thorium", "thorium_dioxide"],
  reactionProduct: { isotope: "unstable_thorium", cation: "unstable_thorium_iv" },
};
elements.molten_thorium_dioxide = {
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.01|XX", "M2 AND CR:radiation%0.01|XX|M2 AND CR:radiation%0.01", "M1|M1|M1"],
};

chemjsChemicals.stable_thorium_dioxide = {
  elem: {
    color: [blendColors("#313331", "#ff0000"), blendColors("#1a1a18", "#00ff00"), blendColors("#171717", "#0000ff"), blendColors("#24231d", "#ff0000"), blendColors("#262622", "#00ff00"), blendColors("#171613", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 10000,
    hidden: true,
  },
  tempHigh: [2865],
  elemName: "stable_thorium_dioxide",
  stateHigh: ["molten_stable_thorium_dioxide"],
  categories: ["stable_thorium_iv", "stable_thorium", "thorium_dioxide"],
  reactionProduct: { isotope: "stable_thorium", cation: "stable_thorium_iv" },
};

chemjsChemicals.thorium_tetrafluoride = {
  elementNames: [],
  categories: ["fluoride", "insoluble"],
  reactionProduct: { anion: "fluoride" },
};

chemjsChemicals.unstable_thorium_tetrafluoride = {
  elem: {
    color: "#e5e6e5",
    behavior: ["XX|CR:radiation%0.01|XX", "CR:radiation%0.01|XX|CR:radiation%0.01", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 6300,
    hidden: true,
  },
  tempHigh: [1110],
  elemName: "thorium_tetrafluoride",
  stateHigh: ["molten_thorium_tetrafluoride"],
  categories: ["unstable_thorium_iv", "unstable_thorium", "thorium_tetrafluoride"],
  reactionProduct: { isotope: "unstable_thorium", cation: "unstable_thorium_iv" },
};
elements.molten_thorium_tetrafluoride = {
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.01|XX", "M2 AND CR:radiation%0.01|XX|M2 AND CR:radiation%0.01", "M1|M1|M1"],
};

chemjsChemicals.stable_thorium_tetrafluoride = {
  elem: {
    color: [blendColors("#e5e6e5", "#ff0000"), blendColors("#e5e6e5", "#00ff00"), blendColors("#e5e6e5", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6300,
    hidden: true,
  },
  tempHigh: [1110],
  elemName: "stable_thorium_tetrafluoride",
  stateHigh: ["molten_stable_thorium_tetrafluoride"],
  categories: ["stable_thorium_iv", "stable_thorium", "thorium_tetrafluoride"],
  reactionProduct: { isotope: "stable_thorium", cation: "stable_thorium_iv" },
};

chemjsChemicals.protactinium_v_oxide = {
  elem: {
    color: [blendColors("#353b3b", "#ff0000", 0.25), blendColors("#353b3b", "#00ff00", 0.25), blendColors("#353b3b", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 12000,
    state: "solid",
    hidden: true,
  },
  tempHigh: [2500],
  categories: ["insoluble", "protactinium_v", "oxide"],
};
chemjsChemicals.protactinium_hydroxide = {
  elem: {
    color: [blendColors("#95c7c7", "#ff0000", 0.25), blendColors("#95c7c7", "#00ff00", 0.25), blendColors("#95c7c7", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 12000,
    state: "solid",
    hidden: true,
  },
  tempHigh: [350],
  stateHigh: [["protactinium_v_oxide"]],
  reactionProduct: { cation: "protactinium_v", anion: "hydroxide", cationBase: "protactinium_v", anionBase: "hydroxide" },
  categories: ["insoluble", "protactinium_v", "hydroxide", "bases"],
};
chemjsChemicals.protactinium_v_fluoride = {
  elem: {
    color: [blendColors("#cbf2ec", "#ff0000", 0.25), blendColors("#cbf2ec", "#00ff00", 0.25), blendColors("#cbf2ec", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 9000,
    state: "solid",
    hidden: true,
  },
  tempHigh: [2600],
  categories: ["insoluble", "protactinium_v", "fluoride"],
  toxic: [0.1],
};

chemjsChemicals.uraninite = {
  elem: {
    color: ["#545323", "#50573b", "#656660", "#4d4933", "#615e4a", "#525043"],
    behavior: ["XX|CR:radiation%0.05|XX", "CR:radiation%0.05|XX|CR:radiation%0.05", "M2|M1|M2"],
    category: "land",
    state: "solid",
    density: 10970,
  },
  tempHigh: [2865],
};

chemjsChemicals.yellowcake = {
  elem: {
    color: ["#dbd827", "#bce346", "#a8c418", "#d9bb1a", "#dec418", "#cfb615"],
    behavior: ["XX|CR:radiation%0.05|XX", "CR:radiation%0.05|XX|CR:radiation%0.05", "M2|M1|M2"],
    category: "powders",
    hidden: true,
    state: "solid",
    density: 8300,
  },
  tempHigh: [1150],
};

chemjsChemicals.yellowcake_solution = {
  elem: {
    color: ["#d2ed6f"],
    behavior: ["XX|DB%5|XX", "DB%5 AND M2|XX|DB%5 AND M2", "DB%5 AND M2|DB%10 AND M1|DB%5 AND M2"],
    category: "liquids",
    state: "liquid",
    density: 1850,
    viscosity: 26.7,
    hidden: true,
  },
  tempHigh: [337],
  stateHigh: [["sulfuric_acid_gas", "yellowcake"]],
  densityHigh: [1.26],
  tempLow: [10],
  categories: ["acids", "caustic"],
  ignore: ["chemical!sulfate", "radiation", "yellowcake", "uraninite"],
};

chemjsChemicals.uranium_dioxide = {
  elementNames: [],
  categories: ["oxide", "insoluble"],
  reactionProduct: { anion: "oxide" },
};

chemjsChemicals.mixed_uranium_dioxide = {
  elem: {
    color: ["#474744", "#21211f", "#2b2b2b", "#9c998c", "#40403f", "#24231d"],
    behavior: ["XX|CR:radiation%0.05|XX", "CR:radiation%0.05|XX|CR:radiation%0.05", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 10970,
  },
  tempHigh: [2865],
  elemName: "uranium_dioxide",
  stateHigh: ["molten_uranium_dioxide"],
  categories: ["mixed_uranium_iv", "mixed_uranium", "uranium_dioxide"],
  reactionProduct: { isotope: "mixed_uranium", cation: "mixed_uranium_iv" },
};

elements.molten_uranium_dioxide = {
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.05|XX", "M2 AND CR:radiation%0.05|XX|M2 AND CR:radiation%0.05", "M1|M1|M1"],
};

chemjsChemicals.uranium_238_dioxide = {
  elem: {
    color: ["#474744", "#21211f", "#2b2b2b", "#9c998c", "#40403f", "#24231d"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 10970,
    hidden: true,
  },
  tempHigh: [2865],
  elemName: "depleted_uranium_dioxide",
  stateHigh: ["molten_depleted_uranium_dioxide"],
  categories: ["uranium_238_iv", "uranium_238", "uranium_dioxide"],
  reactionProduct: { isotope: "uranium_238", cation: "uranium_238_iv" },
};

chemjsChemicals.uranium_235_dioxide = {
  elem: {
    color: ["#474744", "#21211f", "#2b2b2b", "#9c998c", "#40403f", "#24231d"],
    behavior: ["XX|CR:radiation%0.25|XX", "CR:radiation%0.25|XX|CR:radiation%0.25", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 10970,
    excludeRandom: true,
    hidden: true,
  },
  tempHigh: [2865],
  elemName: "enriched_uranium_dioxide",
  stateHigh: ["molten_enriched_uranium_dioxide"],
  categories: ["uranium_235_iv", "uranium_235", "uranium_dioxide"],
  reactionProduct: { isotope: "uranium_235", cation: "uranium_235_iv" },
};

elements.molten_enriched_uranium_dioxide = {
  excludeRandom: true,
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.25|XX", "M2 AND CR:radiation%0.25|XX|M2 AND CR:radiation%0.25", "M1|M1|M1"],
};

chemjsChemicals.stable_uranium_dioxide = {
  elem: {
    color: [blendColors("#474744", "#ff0000"), blendColors("#21211f", "#00ff00"), blendColors("#2b2b2b", "#0000ff"), blendColors("#9c998c", "#ff0000"), blendColors("#40403f", "#00ff00"), blendColors("#24231d", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 10970,
    hidden: true,
  },
  tempHigh: [2865],
  stateHigh: ["molten_stable_uranium_dioxide"],
  categories: ["stable_uranium_iv", "stable_uranium", "uranium_dioxide"],
  reactionProduct: { isotope: "stable_uranium", cation: "stable_uranium_iv" },
};

chemjsChemicals.uranium_tetrafluoride = {
  elementNames: [],
  categories: ["fluoride", "insoluble"],
  reactionProduct: { anion: "fluoride" },
  toxic: [0.1],
};

chemjsChemicals.mixed_uranium_tetrafluoride = {
  elem: {
    color: ["#495747", "#394d38", "#5a7859"],
    behavior: ["XX|CR:radiation%0.05|XX", "CR:radiation%0.05|XX|CR:radiation%0.05", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true,
  },
  tempHigh: [1036],
  elemName: "uranium_tetrafluoride",
  stateHigh: ["molten_uranium_tetrafluoride"],
  categories: ["mixed_uranium_iv", "mixed_uranium", "uranium_tetrafluoride"],
  reactionProduct: { isotope: "mixed_uranium", cation: "mixed_uranium_iv" },
};

elements.molten_uranium_tetrafluoride = {
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.05|XX", "M2 AND CR:radiation%0.05|XX|M2 AND CR:radiation%0.05", "M1|M1|M1"],
};

chemjsChemicals.uranium_238_tetrafluoride = {
  elem: {
    color: ["#495747", "#394d38", "#5a7859"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true,
  },
  tempHigh: [1036],
  elemName: "depleted_uranium_tetrafluoride",
  stateHigh: ["molten_depleted_uranium_tetrafluoride"],
  categories: ["uranium_238_iv", "uranium_238", "uranium_tetrafluoride"],
  reactionProduct: { isotope: "uranium_238", cation: "uranium_238_iv" },
};

chemjsChemicals.uranium_235_tetrafluoride = {
  elem: {
    color: ["#495747", "#394d38", "#5a7859"],
    behavior: ["XX|CR:radiation%0.25|XX", "CR:radiation%0.25|XX|CR:radiation%0.25", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true,
  },
  tempHigh: [1036],
  elemName: "enriched_uranium_tetrafluoride",
  stateHigh: ["molten_enriched_uranium_tetrafluoride"],
  categories: ["uranium_235_iv", "uranium_235", "uranium_tetrafluoride"],
  reactionProduct: { isotope: "uranium_235", cation: "uranium_235_iv" },
};

elements.molten_enriched_uranium_tetrafluoride = {
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.25|XX", "M2 AND CR:radiation%0.25|XX|M2 AND CR:radiation%0.25", "M1|M1|M1"],
};

chemjsChemicals.stable_uranium_tetrafluoride = {
  elem: {
    color: [blendColors("#495747", "#ff0000"), blendColors("#394d38", "#00ff00"), blendColors("#5a7859", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true,
  },
  tempHigh: [1036],
  stateHigh: ["molten_stable_uranium_tetrafluoride"],
  categories: ["stable_uranium_iv", "stable_uranium", "uranium_tetrafluoride"],
  reactionProduct: { isotope: "stable_uranium", cation: "stable_uranium_iv" },
};

chemjsChemicals.uranium_hexafluoride = {
  elementNames: [],
  categories: ["fluoride", "insoluble"],
  reactionProduct: { anion: "fluoride" },
  toxic: [0.2],
};

chemjsChemicals.mixed_uranium_hexafluoride = {
  elem: {
    color: "#f7fff7",
    behavior: ["XX|CR:radiation%0.05|XX", "CR:radiation%0.05|XX|CR:radiation%0.05", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 5090,
    hidden: true,
  },
  tempHigh: [56.5],
  elemName: "uranium_hexafluoride",
  stateHigh: ["uranium_hexafluoride_gas"],
  categories: ["mixed_uranium_vi", "mixed_uranium", "uranium_hexafluoride"],
  reactionProduct: { isotope: "mixed_uranium", cation: "mixed_uranium_vi" },
};

uraniumHexafluorideCentrifuge = function (pixel) {
  if (Math.random() < 0.05) {
    if (Math.random() < 0.8) {
      changePixel(pixel, "depleted_uranium_hexafluoride");
    } else {
      changePixel(pixel, "enriched_uranium_hexafluoride");
    }
  }
};
gasTick = function (pixel) {
  pixelTick(pixel, elements[pixel.element].behavior2);
};

elements.uranium_hexafluoride_gas = {
  behavior: behaviors.GAS,
  behavior2: [
    ["XX", "CR:radiation%0.05", "XX"],
    ["CR:radiation%0.05", "XX", "CR:radiation%0.05"],
    ["XX", "CR:radiation%0.05", "XX"],
  ],
  tick: gasTick,
  state: "gas",
  density: 12.84,
  onCentrifuge: uraniumHexafluorideCentrifuge,
};

chemjsChemicals.uranium_238_hexafluoride = {
  elem: {
    color: "#f7fff7",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5090,
    hidden: true,
  },
  tempHigh: [56.5],
  elemName: "depleted_uranium_hexafluoride",
  stateHigh: ["depleted_uranium_hexafluoride_gas"],
  categories: ["uranium_238_iv", "uranium_238", "uranium_hexafluoride"],
  reactionProduct: { isotope: "uranium_238", cation: "uranium_238_iv" },
};

elements.depleted_uranium_hexafluoride_gas = {
  behavior: behaviors.GAS,
  state: "gas",
  density: 12.84,
};

chemjsChemicals.uranium_235_hexafluoride = {
  elem: {
    color: "#f7fff7",
    behavior: ["XX|CR:radiation%0.25|XX", "CR:radiation%0.25|XX|CR:radiation%0.25", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 5090,
    hidden: true,
  },
  tempHigh: [56.5],
  elemName: "enriched_uranium_hexafluoride",
  stateHigh: ["enriched_uranium_hexafluoride_gas"],
  categories: ["uranium_235_iv", "uranium_235", "uranium_hexafluoride"],
  reactionProduct: { isotope: "uranium_235", cation: "uranium_235_iv" },
};

elements.enriched_uranium_hexafluoride_gas = {
  behavior: behaviors.GAS,
  behavior2: [
    ["XX", "CR:radiation%0.25", "XX"],
    ["CR:radiation%0.25", "XX", "CR:radiation%0.25"],
    ["XX", "CR:radiation%0.25", "XX"],
  ],
  tick: gasTick,
  state: "gas",
  density: 12.84,
};

chemjsChemicals.stable_uranium_hexafluoride = {
  elem: {
    color: [blendColors("#f7fff7", "#ff0000"), blendColors("#f7fff7", "#00ff00"), blendColors("#f7fff7", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5090,
    hidden: true,
  },
  tempHigh: [56.5],
  stateHigh: ["stable_uranium_hexafluoride_gas"],
  categories: ["stable_uranium_vi", "stable_uranium", "uranium_hexafluoride"],
  reactionProduct: { isotope: "stable_uranium", cation: "stable_uranium_vi" },
};
elements.stable_uranium_hexafluoride_gas = {
  behavior: behaviors.GAS,
  state: "gas",
  density: 12.84,
};

chemjsChemicals.neptunium_dioxide = {
  elem: {
    color: [blendColors("#47c94f", "#ff0000"), blendColors("#47c94f", "#00ff00"), blendColors("#47c94f", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 12000,
    hidden: true,
  },
  tempHigh: [2600],
  categories: ["neptunium_iv", "oxide", "insoluble"],
  reactionProduct: { anion: "oxide", cation: "neptunium_iv" },
};

chemjsChemicals.neptunium_tetrafluoride = {
  elem: {
    color: [blendColors("#73e67a", "#ff0000"), blendColors("#73e67a", "#00ff00"), blendColors("#73e67a", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 12000,
    hidden: true,
  },
  tempHigh: [2550],
  categories: ["neptunium_iv", "fluoride", "insoluble"],
  reactionProduct: { anion: "fluoride", cation: "neptunium_iv" },
  toxic: [0.1],
};

chemjsChemicals.neptunium_hexafluoride = {
  elem: {
    color: [blendColors("#eda042", "#ff0000"), blendColors("#eda042", "#00ff00"), blendColors("#eda042", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5000,
    hidden: true,
  },
  tempHigh: [55],
  stateHigh: ["neptunium_hexafluoride_gas"],
  categories: ["neptunium_vi", "fluoride", "insoluble"],
  reactionProduct: { anion: "fluoride", cation: "neptunium_vi" },
  toxic: [0.1],
};

elements.neptunium_hexafluoride_gas = {
  behavior: behaviors.GAS,
  state: "gas",
  density: 14.591,
};

chemjsChemicals.plutonium_dioxide = {
  elementNames: [],
  categories: ["oxide", "insoluble"],
  reactionProduct: { anion: "oxide" },
};

chemjsChemicals.mixed_plutonium_dioxide = {
  elem: {
    color: ["#edcf47", "#c7a924", "#e3c129"],
    behavior: ["XX|CR:radiation%0.25|XX", "CR:radiation%0.25|XX|CR:radiation%0.25", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 11500,
    excludeRandom: true,
    hidden: true,
  },
  tempHigh: [2744],
  elemName: "plutonium_dioxide",
  stateHigh: ["molten_plutonium_dioxide"],
  categories: ["mixed_plutonium_iv", "mixed_plutonium", "plutonium_dioxide"],
  reactionProduct: { isotope: "mixed_plutonium", cation: "mixed_plutonium_iv" },
};

elements.molten_plutonium_dioxide = {
  excludeRandom: true,
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.05|XX", "M2 AND CR:radiation%0.05|XX|M2 AND CR:radiation%0.05", "M1|M1|M1"],
};

chemjsChemicals.plutonium_242_dioxide = {
  elem: {
    color: ["#edcf47", "#c7a924", "#e3c129"],
    behavior: ["XX|CR:radiation%0.1|XX", "CR:radiation%0.1|XX|CR:radiation%0.1", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 11500,
    hidden: true,
  },
  tempHigh: [2744],
  elemName: "depleted_plutonium_dioxide",
  stateHigh: ["molten_depleted_plutonium_dioxide"],
  categories: ["plutonium_242_iv", "plutonium_242", "plutonium_dioxide"],
  reactionProduct: { isotope: "plutonium_242", cation: "plutonium_242_iv" },
};

elements.molten_depleted_plutonium_dioxide = {
  excludeRandom: true,
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.1|XX", "M2 AND CR:radiation%0.1|XX|M2 AND CR:radiation%0.1", "M1|M1|M1"],
};

chemjsChemicals.plutonium_239_dioxide = {
  elem: {
    color: ["#edcf47", "#c7a924", "#e3c129"],
    behavior: ["XX|CR:radiation%0.5|XX", "CR:radiation%0.5|XX|CR:radiation%0.5", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 11500,
    excludeRandom: true,
    hidden: true,
  },
  tempHigh: [2744],
  elemName: "enriched_plutonium_dioxide",
  stateHigh: ["molten_enriched_plutonium_dioxide"],
  categories: ["plutonium_239_iv", "plutonium_239", "plutonium_dioxide"],
  reactionProduct: { isotope: "plutonium_239", cation: "plutonium_239_iv" },
};

elements.molten_enriched_plutonium_dioxide = {
  excludeRandom: true,
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.5|XX", "M2 AND CR:radiation%0.5|XX|M2 AND CR:radiation%0.5", "M1|M1|M1"],
};

chemjsChemicals.stable_plutonium_dioxide = {
  elem: {
    color: [blendColors("#edcf47", "#ff0000"), blendColors("#c7a924", "#00ff00"), blendColors("#e3c129", "#0000ff"), blendColors("#9c998c", "#ff0000")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 11500,
    hidden: true,
  },
  tempHigh: [2744],
  stateHigh: ["molten_stable_plutonium_dioxide"],
  categories: ["stable_plutonium_iv", "stable_plutonium", "plutonium_dioxide"],
  reactionProduct: { isotope: "stable_plutonium", cation: "stable_plutonium_iv" },
};

chemjsChemicals.plutonium_tetrafluoride = {
  elementNames: [],
  categories: ["fluoride", "insoluble"],
  reactionProduct: { anion: "fluoride" },
  toxic: [0.1],
};

chemjsChemicals.mixed_plutonium_tetrafluoride = {
  elem: {
    color: ["#a13d0b", "#85401d", "#733211"],
    behavior: [["XX|CR:radiation%0.05|XX", "CR:radiation%0.05|XX|CR:radiation%0.05", "M2|M1|M2"]],
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true,
  },
  tempHigh: [1027],
  elemName: "plutonium_tetrafluoride",
  stateHigh: ["molten_plutonium_tetrafluoride"],
  categories: ["mixed_plutonium_iv", "mixed_plutonium", "plutonium_tetrafluoride"],
  reactionProduct: { isotope: "mixed_plutonium", cation: "mixed_plutonium_iv" },
};

elements.molten_plutonium_tetrafluoride = {
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.05|XX", "M2 AND CR:radiation%0.05|XX|M2 AND CR:radiation%0.05", "M1|M1|M1"],
};

chemjsChemicals.plutonium_242_tetrafluoride = {
  elem: {
    color: ["#a13d0b", "#85401d", "#733211"],
    behavior: ["XX|CR:radiation%0.02|XX", "CR:radiation%0.02|XX|CR:radiation%0.02", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true,
  },
  tempHigh: [1027],
  elemName: "depleted_plutonium_tetrafluoride",
  stateHigh: ["molten_depleted_plutonium_tetrafluoride"],
  categories: ["plutonium_242_iv", "plutonium_242", "plutonium_tetrafluoride"],
  reactionProduct: { isotope: "plutonium_242", cation: "plutonium_242_iv" },
};
elements.molten_depleted_plutonium_tetrafluoride = {
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.02|XX", "M2 AND CR:radiation%0.02|XX|M2 AND CR:radiation%0.02", "M1|M1|M1"],
};

chemjsChemicals.plutonium_239_tetrafluoride = {
  elem: {
    color: ["#a13d0b", "#85401d", "#733211"],
    behavior: ["XX|CR:radiation%0.02|XX", "CR:radiation%0.25|XX|CR:radiation%0.25", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true,
  },
  tempHigh: [1027],
  elemName: "enriched_plutonium_tetrafluoride",
  stateHigh: ["molten_enriched_plutonium_tetrafluoride"],
  categories: ["plutonium_239_iv", "plutonium_239", "plutonium_tetrafluoride"],
  reactionProduct: { isotope: "plutonium_239", cation: "plutonium_239_iv" },
};

elements.molten_enriched_plutonium_tetrafluoride = {
  behavior: ["XX|CR:fire%2.5 AND CR:radiation%0.1|XX", "M2 AND CR:radiation%0.1|XX|M2 AND CR:radiation%0.1", "M1|M1|M1"],
};

chemjsChemicals.stable_plutonium_tetrafluoride = {
  elem: {
    color: [blendColors("#a13d0b", "#ff0000"), blendColors("#85401d", "#00ff00"), blendColors("#733211", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6700,
    hidden: true,
  },
  tempHigh: [1027],
  stateHigh: ["molten_stable_plutonium_tetrafluoride"],
  categories: ["stable_plutonium_iv", "stable_plutonium", "plutonium_tetrafluoride"],
  reactionProduct: { isotope: "stable_plutonium", cation: "stable_plutonium_iv" },
};

chemjsChemicals.plutonium_hexafluoride = {
  elementNames: [],
  categories: ["fluoride", "insoluble"],
  reactionProduct: { anion: "fluoride" },
  toxic: [0.2],
};

plutoniumHexafluorideCentrifuge = function (pixel) {
  if (Math.random() < 0.05) {
    if (Math.random() < 0.8) {
      changePixel(pixel, "depleted_plutonium_hexafluoride");
    } else {
      changePixel(pixel, "enriched_plutonium_hexafluoride");
    }
  }
};
chemjsChemicals.mixed_plutonium_hexafluoride = {
  elem: {
    color: "#6e2602",
    behavior: ["XX|CR:radiation%0.05|XX", "CR:radiation%0.05|XX|CR:radiation%0.05", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 5080,
    hidden: true,
  },
  tempHigh: [62.5, 280],
  elemName: "plutonium_hexafluoride",
  stateHigh: ["plutonium_hexafluoride_gas", ["plutonium_tetrafluoride", "fluorine"]],
  categories: ["mixed_plutonium_vi", "mixed_plutonium", "plutonium_hexafluoride"],
  reactionProduct: { isotope: "mixed_plutonium", cation: "mixed_plutonium_vi" },
};

elements.plutonium_hexafluoride_gas = {
  behavior: behaviors.GAS,
  behavior2: [
    ["XX", "CR:radiation%0.05", "XX"],
    ["CR:radiation%0.05", "XX", "CR:radiation%0.05"],
    ["XX", "CR:radiation%0.05", "XX"],
  ],
  tick: gasTick,
  state: "gas",
  density: 14.88,
  onCentrifuge: plutoniumHexafluorideCentrifuge,
};

chemjsChemicals.plutonium_242_hexafluoride = {
  elem: {
    color: "#6e2602",
    behavior: ["XX|CR:radiation%0.01|XX", "CR:radiation%0.01|XX|CR:radiation%0.01", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 5080,
    hidden: true,
  },
  tempHigh: [62.5, 280],
  elemName: "depleted_plutonium_hexafluoride",
  stateHigh: ["depleted_plutonium_hexafluoride_gas", ["depleted_plutonium_tetrafluoride", "fluorine"]],
  categories: ["plutonium_242_iv", "plutonium_242", "plutonium_hexafluoride"],
  reactionProduct: { isotope: "plutonium_242", cation: "plutonium_242_iv" },
};

elements.depleted_plutonium_hexafluoride_gas = {
  behavior: behaviors.GAS,
  behavior2: [
    ["XX", "CR:radiation%0.01", "XX"],
    ["CR:radiation%0.01", "XX", "CR:radiation%0.01"],
    ["XX", "CR:radiation%0.01", "XX"],
  ],
  tick: gasTick,
  state: "gas",
  density: 14.88,
};

chemjsChemicals.plutonium_239_hexafluoride = {
  elem: {
    color: "#6e2602",
    behavior: ["XX|CR:radiation%0.25|XX", "CR:radiation%0.25|XX|CR:radiation%0.25", "M2|M1|M2"],
    category: "powders",
    state: "solid",
    density: 5080,
    hidden: true,
  },
  tempHigh: [62.5, 280],
  elemName: "enriched_plutonium_hexafluoride",
  stateHigh: ["enriched_plutonium_hexafluoride_gas", ["enriched_plutonium_tetrafluoride", "fluorine"]],
  categories: ["plutonium_239_iv", "plutonium_239", "plutonium_hexafluoride"],
  reactionProduct: { isotope: "plutonium_239", cation: "plutonium_239_iv" },
};

elements.enriched_plutonium_hexafluoride_gas = {
  behavior: behaviors.GAS,
  behavior2: [
    ["XX", "CR:radiation%0.25", "XX"],
    ["CR:radiation%0.25", "XX", "CR:radiation%0.25"],
    ["XX", "CR:radiation%0.25", "XX"],
  ],
  tick: gasTick,
  state: "gas",
  density: 14.88,
};

chemjsChemicals.stable_plutonium_hexafluoride = {
  elem: {
    color: [blendColors("#6e2602", "#ff0000"), blendColors("#6e2602", "#00ff00"), blendColors("#6e2602", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5080,
    hidden: true,
  },
  tempHigh: [62.5, 280],
  stateHigh: ["stable_plutonium_hexafluoride_gas", ["stable_plutonium_tetrafluoride", "fluorine"]],
  categories: ["stable_plutonium_vi", "stable_plutonium", "plutonium_hexafluoride"],
  reactionProduct: { isotope: "stable_plutonium", cation: "stable_plutonium_vi" },
};
elements.stable_plutonium_hexafluoride_gas = {
  behavior: behaviors.GAS,
  state: "gas",
  density: 14.88,
};

chemjsChemicals.copernicium_dioxide = {
  elem: {
    color: [blendColors("#e6c973", "#ff0000", 0.25), blendColors("#e6c973", "#00ff00", 0.25), blendColors("#e6c973", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 13120,
    /*made up*/ hidden: true,
  },
  tempHigh: [300], //made up
  stateHigh: [["stable_copernicium_gas", "oxygen"]],
  categories: ["copernicium_iv", "oxide", "insoluble"],
  toxic: [0.02],
};

chemjsChemicals.copernicium_tetrafluoride = {
  elem: {
    color: [blendColors("#eff2e4", "#ff0000", 0.25), blendColors("#eff2e4", "#00ff00", 0.25), blendColors("#eff2e4", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 12110,
    /*made up*/ hidden: true,
  },
  tempHigh: [502], //made up
  stateHigh: [["stable_copernicium_gas", "fluorine"]],
  categories: ["copernicium_ii", "sulfide", "insoluble"],
  toxic: [0.2],
};

chemjsChemicals.copernicium_sulfide = {
  elem: {
    color: [blendColors("#9c5f4f", "#ff0000", 0.25), blendColors("#9c5f4f", "#00ff00", 0.25), blendColors("#9c5f4f", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 13200,
    /*made up*/ hidden: true,
  },
  tempHigh: [421], //made up
  stateHigh: [["stable_copernicium_gas", "molten_sulfur"]],
  categories: ["copernicium_ii", "sulfide", "insoluble"],
  toxic: [0.02],
};

chemjsChemicals.nihonium_oxide = {
  elem: {
    color: [blendColors("#ab9a95", "#ff0000", 0.25), blendColors("#ab9a95", "#00ff00", 0.25), blendColors("#ab9a95", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 12370,
    /*made up*/ hidden: true,
  },
  tempHigh: [567], //made up
  categories: ["nihonium_i", "oxide", "insoluble"],
  toxic: [0.02],
};

chemjsChemicals.nihonium_hydroxide = {
  elem: {
    color: [blendColors("#ebc7c7", "#ff0000", 0.25), blendColors("#ebc7c7", "#00ff00", 0.25), blendColors("#ebc7c7", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 10220,
    /*made up*/ hidden: true,
  },
  tempHigh: [292], //made up
  stateHigh: [["nihonium_oxide", "steam"]],
  categories: ["nihonium_i", "hydroxide", "insoluble", "bases"],
  reactionProduct: { anion: "hydroxide", cation: "nihonium_i", anionBase: "hydroxide", cationBase: "nihonium_i" },
  toxic: [0.02],
};

chemjsChemicals.nihonium_nitrate = {
  elem: {
    color: [blendColors("#fccadd", "#ff0000", 0.25), blendColors("#fccadd", "#00ff00", 0.25), blendColors("#fccadd", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 9350,
    hidden: true,
  },
  tempHigh: [203],
  stateHigh: [["nihonium_oxide", "nitrogen_dioxide", "fire"]],
  elementNames: ["chemical!nihonium_nitrate_solution"],
  reactionProduct: { salt_water: "nihonium_nitrate_solution", cation: "nihonium_i", anion: "nitrate" },
  categories: ["salt", "nihonium_i", "nitrate"],
  toxic: [0.1],
};
chemjsChemicals.nihonium_nitrate_solution = {
  elem: {
    color: [blendColors("#8f19f7", "#ff0000", 0.25), blendColors("#8f19f7", "#00ff00", 0.25), blendColors("#8f19f7", "#0000ff", 0.25)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1090,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "nihonium_nitrate"]],
  reactionProduct: { salt: "nihonium_nitrate" },
  categories: ["salt_water"],
};

chemjsChemicals.nihonium_sulfate = {
  elem: {
    color: [blendColors("#fcf1ca", "#ff0000", 0.25), blendColors("#fcf1ca", "#00ff00", 0.25), blendColors("#fcf1ca", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 12050,
    hidden: true,
  },
  tempHigh: [1305],
  elementNames: ["chemical!nihonium_sulfate_solution"],
  reactionProduct: { salt_water: "nihonium_sulfate_solution", cation: "nihonium_i", anion: "sulfate" },
  categories: ["salt", "nihonium_i", "sulfate"],
  toxic: [0.02],
};
chemjsChemicals.nihonium_sulfate_solution = {
  elem: {
    color: [blendColors("#1984f7", "#ff0000", 0.25), blendColors("#1984f7", "#00ff00", 0.25), blendColors("#1984f7", "#0000ff", 0.25)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1092,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "nihonium_sulfate"]],
  reactionProduct: { salt: "nihonium_sulfate" },
  categories: ["salt_water"],
};

chemjsChemicals.flerovium_sulfide = {
  elem: {
    color: [blendColors("#121107", "#ff0000", 0.25), blendColors("#121107", "#00ff00", 0.25), blendColors("#121107", "#0000ff", 0.25)],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 14700,
    /*made up*/ hidden: true,
    burnInto: ["flerovium_oxide", "sulfur_dioxide"],
    burn: 1,
  },
  tempHigh: [1220], //made up
  categories: ["flerovium_ii", "sulfide", "insoluble"],
};

chemjsChemicals.flerovium_oxide = {
  elem: {
    color: [blendColors("#d9d8d4", "#ff0000", 0.25), blendColors("#d9d8d4", "#00ff00", 0.25), blendColors("#d9d8d4", "#0000ff", 0.25)],
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    state: "solid",
    density: 14320,
    /*made up*/ hidden: true,
  },
  tempHigh: [1120], //made up
  categories: ["flerovium_ii", "oxide", "insoluble"],
};

chemjsChemicals.moscovium_hydroxide = {
  elem: {
    color: [blendColors("#fcf1ca", "#ff0000", 0.25), blendColors("#fcf1ca", "#00ff00", 0.25), blendColors("#fcf1ca", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 5620,
    hidden: true,
  },
  tempHigh: [670],
  elementNames: ["chemical!moscovium_hydroxide_solution"],
  reactionProduct: { salt_water: "moscovium_hydroxide_solution", cation: "moscovium_iii", anion: "hydroxide", cationBase: "moscovium_iii", anionBase: "hydroxide" },
  categories: ["salt", "moscovium_iii", "hydroxide", "bases"],
  toxic: [0.02],
};
chemjsChemicals.moscovium_hydroxide_solution = {
  elem: {
    color: [blendColors("#6548f7", "#ff0000", 0.25), blendColors("#6548f7", "#00ff00", 0.25), blendColors("#6548f7", "#0000ff", 0.25)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1092,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "moscovium_hydroxide"]],
  reactionProduct: { salt: "moscovium_hydroxide" },
  categories: ["salt_water"],
};

chemjsChemicals.moscovium_fluoride = {
  elem: {
    color: [blendColors("#eedff5", "#ff0000", 0.25), blendColors("#eedff5", "#00ff00", 0.25), blendColors("#eedff5", "#0000ff", 0.25)],
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    state: "solid",
    density: 6220,
    /*made up*/ hidden: true,
  },
  tempHigh: [720], //made up
  categories: ["moscovium_iii", "fluoride", "insoluble"],
  toxic: [0.2],
};

chemjsChemicals.livermorium_oxide = {
  elem: {
    color: [blendColors("#ebcb8f", "#ff0000", 0.25), blendColors("#ebcb8f", "#00ff00", 0.25), blendColors("#ebcb8f", "#0000ff", 0.25)],
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    state: "solid",
    density: 12430,
    /*made up*/ hidden: true,
  },
  tempHigh: [730], //made up
  categories: ["livermorium_ii", "oxide", "insoluble"],
};

chemjsChemicals.ununennium_fluoride = {
  elem: {
    color: [blendColors("#e1e4eb", "#ff0000", 0.25), blendColors("#e1e4eb", "#00ff00", 0.25), blendColors("#e1e4eb", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 6703,
    hidden: true,
  },
  tempHigh: [1270], //made up
  elementNames: ["chemical!ununennium_fluoride_solution"],
  reactionProduct: { salt_water: "ununennium_fluoride_solution", cation: "ununennium_i", anion: "fluoride" },
  categories: ["salt", "ununennium_i", "fluoride"],
};

chemjsChemicals.ununennium_fluoride_solution = {
  elem: {
    color: [blendColors("#3061f2", "#ff0000", 0.25), blendColors("#3061f2", "#00ff00", 0.25), blendColors("#3061f2", "#0000ff", 0.25)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1094,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "ununennium_fluoride"]],
  reactionProduct: { salt: "ununennium_fluoride" },
  categories: ["salt_water"],
};

chemjsChemicals.ununennium_trifluoride = {
  elem: {
    color: [blendColors("#ccb87a", "#ff0000", 0.25), blendColors("#ccb87a", "#00ff00", 0.25), blendColors("#ccb87a", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 7200,
    /*made up*/ hidden: true,
  },
  tempHigh: [140], //made up
  categories: ["ununennium_iii", "fluoride", "insoluble"],
  toxic: [0.1],
};

chemjsChemicals.ununennium_pentafluoride = {
  elem: {
    color: [blendColors("#db5030", "#ff0000", 0.25), blendColors("#db5030", "#00ff00", 0.25), blendColors("#db5030", "#0000ff", 0.25)],
    behavior: behaviors.CAUSTIC,
    category: "powders",
    state: "solid",
    density: 7250,
    /*made up*/ hidden: true,
  },
  tempHigh: [70], //made up
  stateHigh: [["ununennium_trifluoride", "fluorine"]],
  categories: ["ununennium_v", "fluoride", "insoluble"],
  toxic: [0.1],
  ignore: ["chemical!foof", "chemical!fluorine", "chemical!ununennium_trifluoride", "chemical!oxygen", "chemical!ozone", "chemical!hydrogen_fluoride"],
};

chemjsChemicals.unbinilium_oxide = {
  elem: {
    color: [blendColors("#f5f2e1", "#ff0000", 0.25), blendColors("#f5f2e1", "#00ff00", 0.25), blendColors("#f5f2e1", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 15000,
    state: "solid",
    hidden: true,
  },
  tempHigh: [2763],
  categories: ["insoluble", "unbinilium_ii", "oxide"],
};
chemjsChemicals.unbinilium_hydroxide = {
  elem: {
    color: [blendColors("#f9faf2", "#ff0000", 0.25), blendColors("#f9faf2", "#00ff00", 0.25), blendColors("#f9faf2", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    density: 12000,
    state: "solid",
    hidden: true,
  },
  tempHigh: [620],
  stateHigh: [["unbinilium_oxide"]],
  reactionProduct: { cation: "unbinilium_ii", anion: "hydroxide", cationBase: "unbinilium_ii", anionBase: "hydroxide" },
  categories: ["insoluble", "unbinilium_ii", "hydroxide", "bases"],
};

chemjsChemicals.unbinilium_difluoride = {
  elem: {
    color: [blendColors("#e8ebe1", "#ff0000", 0.25), blendColors("#e8ebe1", "#00ff00", 0.25), blendColors("#e8ebe1", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 6800,
    hidden: true,
  },
  tempHigh: [1340], //made up
  elementNames: ["chemical!unbinilium_difluoride_solution"],
  reactionProduct: { salt_water: "unbinilium_difluoride_solution", cation: "unbinilium_ii", anion: "fluoride" },
  categories: ["salt", "unbinilium_ii", "fluoride"],
};

chemjsChemicals.unbinilium_difluoride_solution = {
  elem: {
    color: [blendColors("#3087f2", "#ff0000", 0.25), blendColors("#3087f2", "#00ff00", 0.25), blendColors("#3087f2", "#0000ff", 0.25)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1095,
    hidden: true,
    conduct: 0.1,
    stain: -0.66,
  },
  tempLow: [-2],
  tempHigh: [102],
  stateHigh: [["steam", "unbinilium_difluoride"]],
  reactionProduct: { salt: "unbinilium_difluoride" },
  categories: ["salt_water"],
};

chemjsChemicals.unbinilium_tetrafluoride = {
  elem: {
    color: [blendColors("#e0dd12", "#ff0000", 0.25), blendColors("#e0dd12", "#00ff00", 0.25), blendColors("#e0dd12", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 7500,
    /*made up*/ hidden: true,
  },
  tempHigh: [210], //made up
  categories: ["unbinilium_iv", "fluoride", "insoluble"],
  toxic: [0.1],
};

chemjsChemicals.unbinilium_hexafluoride = {
  elem: {
    color: [blendColors("#ffca7a", "#ff0000", 0.25), blendColors("#ffca7a", "#00ff00", 0.25), blendColors("#ffca7a", "#0000ff", 0.25)],
    behavior: behaviors.CAUSTIC,
    category: "powders",
    state: "solid",
    density: 7700,
    /*made up*/ hidden: true,
  },
  tempHigh: [70], //made up
  stateHigh: [["unbinilium_tetrafluoride", "fluorine"]],
  categories: ["unbinilium_vi", "fluoride", "insoluble"],
  toxic: [0.1],
  ignore: ["chemical!foof", "chemical!fluorine", "chemical!unbinilium_tetrafluoride", "chemical!oxygen", "chemical!ozone", "chemical!hydrogen_fluoride"],
};

chemjsChemicals.insoluble = {
  elementNames: [],
};

chemjsChemicals.solid_insoluble = {
  elementNames: ["chemical!insoluble,state!solid"],
};

chemjsChemicals.salt = {
  elementNames: [],
};
chemjsChemicals.solid_salt = {
  elementNames: ["chemical!salt,state!solid,ignorechemical!salt_water"],
};

chemjsChemicals.salt_water = {
  elementNames: [],
};

chemjsChemicals.liquid_salt_water = {
  elementNames: ["chemical!salt_water,state!liquid"],
};

chemjsChemicals.fertilizer = {
  elementNames: ["chemical!ammonium_nitrate", "chemical!potassium_nitrate", "chemical!potassium_sulfate"],
};

//ions

chemjsChemicals.hydrogen_ion = {
  elementNames: [],
};
chemjsChemicals.hydride = {
  elementNames: [],
};

chemjsChemicals.boron_ion = {
  elementNames: [],
};
chemjsChemicals.borohydride = {
  elementNames: [],
};
chemjsChemicals.octahydrotriborate = {
  elementNames: [],
};
chemjsChemicals.dodecaborate = {
  elementNames: [],
};
chemjsChemicals.borate = {
  elementNames: [],
};
chemjsChemicals.tetrafluoroborate = {
  elementNames: [],
};
chemjsChemicals.bromoheptahydrotriborate = {
  elementNames: [],
};

chemjsChemicals.carbonate = {
  elementNames: [],
};
chemjsChemicals.bicarbonate = {
  elementNames: [],
};
chemjsChemicals.methoxide = {
  elementNames: [],
};
chemjsChemicals.acetate = {
  elementNames: [],
};

chemjsChemicals.ammonium_ion = {
  elementNames: [],
};
chemjsChemicals.nitrate = {
  elementNames: [],
};

chemjsChemicals.oxide = {
  elementNames: [],
};

chemjsChemicals.hydroxide = {
  elementNames: [],
};

chemjsChemicals.fluoride = {
  elementNames: [],
};

chemjsChemicals.sodium_ion = {
  elementNames: [],
};

chemjsChemicals.magnesium_ion = {
  elementNames: [],
};

chemjsChemicals.aluminum_ion = {
  elementNames: [],
};

chemjsChemicals.aluminate = {
  elementNames: [],
};

chemjsChemicals.hexafluoroaluminate = {
  elementNames: [],
};

chemjsChemicals.hexafluorosilicate = {
  elementNames: [],
};

chemjsChemicals.phosphate = {
  elementNames: [],
};

chemjsChemicals.sulfide = {
  elementNames: [],
};
chemjsChemicals.sulfate = {
  elementNames: [],
};

chemjsChemicals.chloride = {
  elementNames: [],
};
chemjsChemicals.chlorate = {
  elementNames: [],
};
chemjsChemicals.perchlorate = {
  elementNames: [],
};

chemjsChemicals.potassium_ion = {
  elementNames: [],
};

chemjsChemicals.calcium_ion = {
  elementNames: [],
};

chemjsChemicals.titanium_iii = {
  elementNames: [],
};
chemjsChemicals.titanium_iv = {
  elementNames: [],
};

chemjsChemicals.iron_ii = {
  elementNames: [],
};

chemjsChemicals.copper_ii = {
  elementNames: [],
};

chemjsChemicals.bromide = {
  elementNames: [],
};

chemjsChemicals.silver_i = {
  elementNames: [],
};

chemjsChemicals.indium_iii = {
  elementNames: [],
};

chemjsChemicals.iodide = {
  elementNames: [],
};

chemjsChemicals.thallium_i = {
  elementNames: [],
};

chemjsChemicals.polonide = {
  elementNames: [],
};
chemjsChemicals.polonium_iv = {
  elementNames: [],
};

chemjsChemicals.astatide = {
  elementNames: [],
};

chemjsChemicals.francium_ion = {
  elementNames: [],
};

chemjsChemicals.radium_ion = {
  elementNames: [],
};

chemjsChemicals.actinium_ion = {
  elementNames: [],
};

chemjsChemicals.unstable_thorium_iv = {
  elementNames: [],
};
chemjsChemicals.stable_thorium_iv = {
  elementNames: [],
};

chemjsChemicals.protactinium_v = {
  elementNames: [],
};

chemjsChemicals.mixed_uranium_iv = {
  elementNames: [],
};
chemjsChemicals.mixed_uranium_vi = {
  elementNames: [],
};
chemjsChemicals.uranium_238_iv = {
  elementNames: [],
};
chemjsChemicals.uranium_238_vi = {
  elementNames: [],
};
chemjsChemicals.uranium_235_iv = {
  elementNames: [],
};
chemjsChemicals.uranium_235_vi = {
  elementNames: [],
};
chemjsChemicals.stable_uranium_iv = {
  elementNames: [],
};
chemjsChemicals.stable_uranium_vi = {
  elementNames: [],
};

chemjsChemicals.neptunium_iv = {
  elementNames: [],
};
chemjsChemicals.neptunium_vi = {
  elementNames: [],
};

chemjsChemicals.mixed_plutonium_iv = {
  elementNames: [],
};
chemjsChemicals.mixed_plutonium_vi = {
  elementNames: [],
};
chemjsChemicals.plutonium_242_iv = {
  elementNames: [],
};
chemjsChemicals.plutonium_242_vi = {
  elementNames: [],
};
chemjsChemicals.plutonium_239_iv = {
  elementNames: [],
};
chemjsChemicals.plutonium_239_vi = {
  elementNames: [],
};
chemjsChemicals.stable_plutonium_iv = {
  elementNames: [],
};
chemjsChemicals.stable_plutonium_vi = {
  elementNames: [],
};

chemjsChemicals.copernicium_ii = {
  elementNames: [],
};
chemjsChemicals.copernicium_iv = {
  elementNames: [],
};

chemjsChemicals.nihonide = {
  elementNames: [],
};
chemjsChemicals.nihonium_i = {
  elementNames: [],
};

chemjsChemicals.flerovium_ii = {
  elementNames: [],
};

chemjsChemicals.moscovium_iii = {
  elementNames: [],
};

chemjsChemicals.livermorium_ii = {
  elementNames: [],
};

chemjsChemicals.ununennium_i = {
  elementNames: [],
};
chemjsChemicals.ununennium_iii = {
  elementNames: [],
};
chemjsChemicals.ununennium_v = {
  elementNames: [],
};

chemjsChemicals.unbinilium_ii = {
  elementNames: [],
};
chemjsChemicals.unbinilium_iv = {
  elementNames: [],
};
chemjsChemicals.unbinilium_vi = {
  elementNames: [],
};

//misc

chemjsChemicals.diborane = {
  elem: {
    color: "#ffcac9",
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    density: 1.131,
    burn: 100,
    burnTime: 20,
    burnInto: "boron_trioxide",
    fireColor: ["#34eb67", "#5ceb34"],
  },
  tempLow: [-92.5, -164],
  tempHigh: [200],
  stateHigh: [["pentaborane_9", "pentaborane_9", "decaborane"]],
  toxic: [1],
  densityLow: [477],
};

chemjsChemicals.pentaborane_9 = {
  elem: {
    name: "pentaborane(9)",
    color: "#f7b5b5",
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "liquids",
    density: 618,
    hidden: true,
    burn: 100,
    burnTime: 5,
    burnInto: "explosion",
    fireColor: ["#34eb67", "#5ceb34"],
  },
  tempLow: [-46.8],
  tempHigh: [60.1, 250],
  stateHigh: [null, ["decaborane"]],
  toxic: [1],
  densityHigh: [477],
};
elements.pentaborane_9_gas = {
  name: "pentaborane(9)_gas",
};
elements.pentaborane_9_ice = {
  name: "pentaborane(9)_ice",
};

chemjsChemicals.decaborane = {
  elem: {
    color: "#d9cece",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 940,
    hidden: true,
    burn: 100,
    burnTime: 100,
    burnInto: "boron_trioxide",
    fireColor: ["#34eb67", "#5ceb34"],
  },
  tempHigh: [98],
  toxic: [0.1],
};
elements.molten_decaborane = {
  behavior: behaviors.LIQUID,
};

chemjsChemicals.carbonic_acid = {
  elementNames: ["seltzer", "soda", "pilk"],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "carbonate" },
  categories: ["hydrogen_ion", "carbonate", "bicarbonate", "acids"],
};

chemjsChemicals.trimethyl_borate = {
  elem: {
    color: "#c4bc89",
    behavior: behaviors.LIQUID,
    state: "liquid",
    category: "liquids",
    density: 932,
    burn: 100,
    fireColor: ["#34eb67", "#5ceb34"],
    burnTime: 10,
    hidden: true,
  },
  tempLow: [-34],
  tempHigh: [69],
  toxic: [0.2],
  densityHigh: [4.32],
  causticIgnore: true,
};

chemjsChemicals.boron_trifluoride = {
  elem: {
    color: "#d5d9ce",
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    density: 2.76,
    hidden: true,
  },
  tempLow: [-100.3, -126.8],
  toxic: [0.1],
  densityLow: [1640],
  causticIgnore: true,
};

chemjsChemicals.boron_trichloride = {
  elem: {
    color: "#ddf0dd",
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    density: 4.87,
    hidden: true,
  },
  tempLow: [-12.6, -107.3],
  toxic: [0.2],
  densityLow: [1326],
  causticIgnore: true,
};

chemjsChemicals.water = {
  elementNames: ["water", "chemical!salt_water", "sugar_water", "dirty_water", "neutral_acid", "seltzer", "pool_water", "primordial_soup", "disinfectant"],
};

chemjsChemicals.liquid_water = {
  elementNames: ["chemical!water,state!liquid"],
};

chemjsChemicals.pure_water = {
  elementNames: ["water", "ice", "rime", "snow", "slush", "packed_snow", "steam"],
};

chemjsChemicals.carbon_dioxide = {
  elementNames: ["carbon_dioxide", "dry_ice"],
};

chemjsChemicals.ammonia = {
  elementNames: ["ammonia", "liquid_ammonia", "ammonia_ice"],
};
chemjsChemicals.nitric_oxide = {
  elem: {
    color: "#b8926c",
    behavior: behaviors.GAS,
    state: "gas",
    category: "gases",
    density: 1.34,
  },
  tempLow: [-152, -164],
  toxic: [0.1],
  densityLow: [1280],
  causticIgnore: true,
};
chemjsChemicals.nitrogen_dioxide = {
  elem: {
    color: "#964B00",
    behavior: behaviors.GAS,
    temp: 30,
    category: "gases",
    state: "gas",
    density: 3.4,
  },
  tempLow: [21.15, -9.3],
  toxic: [0.2],
  densityLow: [1447],
  causticIgnore: true,
};

let foofTick = function (pixel, chance) {
  let change = false;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0) && !isEmpty(pixel.x + i, pixel.y + j, true) && !elements[pixel.element].ignore.includes(pixelMap[pixel.x + i][pixel.y + j].element)) {
        if (!elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness || Math.random() > elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness) {
          changePixel(pixelMap[pixel.x + i][pixel.y + j], "fire");
          change = true;
        }
      }
    }
  }
  if (change && Math.random() < 0.01) {
    changePixel(pixel, "explosion");
  } else if (Math.random() < chance) {
    if (Math.random() < 0.5) {
      changePixel(pixel, "oxygen", false);
    } else {
      changePixel(pixel, "fluorine", false);
    }
    pixelTempCheck(pixel);
    pixelTempCheck(pixel);
  }
};

chemjsChemicals.foof = {
  elem: {
    color: "#fa1e1e",
    behavior: behaviors.LIQUID,
    tick: (pixel) => foofTick(pixel, 0.0001),
    state: "liquid",
    category: "liquids",
    density: 1450,
    stain: 0.01,
    temp: -120,
  },
  tempHigh: [-57],
  stateHigh: [["oxygen", "fluorine", "explosion"]],
  tempLow: [-154],
  stateLow: ["solid_foof"],
  ignore: ["chemical!foof", "chemical!fluorine", "chemical!oxygen", "chemical!ozone", "radiation", "chemical!polytetrafluoroethylene", "molten_polytetrafluoroethylene", "foof_grass", "foof_grass_seed"],
  ignorable: true,
};
elements.solid_foof = {
  color: "#fa4a1e",
  behavior: behaviors.WALL,
  tick: (pixel) => foofTick(pixel, 0.00005),
  state: "solid",
  category: "solids",
  hidden: true,
};

chemjsChemicals.silicon_dioxide = {
  elementNames: ["sand", "wet_sand"],
};

chemjsChemicals.phosphorus_pentoxide = {
  elem: {
    color: "#fcfcfa",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "powders",
    density: 2390,
    fireColor: "#5ed6c8",
  },
  tempHigh: [340],
};

chemjsChemicals.hydrogen_sulfide = {
  elem: {
    color: "#d9e366",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 1.539,
    burn: 1,
    burnTime: 10,
    burnInto: ["sulfur_dioxide", "steam"],
    fireColor: ["#8180CC", "#7F84E6"],
  },
  tempLow: [-59.55, -85.5],
  tempHigh: [1000],
  stateHigh: [["fire"]],
  densityLow: [992],
  toxic: [0.2],
  causticIgnore: true,
};

chemjsChemicals.sulfur_dioxide = {
  elem: {
    color: "#FFF700",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 2.6,
  },
  tempLow: [-10, -72],
  densityLow: [1435],
  toxic: [0.1],
  causticIgnore: true,
};

chemjsChemicals.sulfur_hexafluoride = {
  elem: {
    color: "#f2ff00",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 6.17,
  },
  tempLow: [-50.8, -64],
  densityLow: [1339],
  causticIgnore: true,
};

chemjsChemicals.sodium_hypochlorite = {
  elementNames: ["bleach", "bleach_ice"],
};

chemjsChemicals.titanium_tetrachloride = {
  elem: {
    color: "#d9d7b2",
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 1728,
    state: "liquid",
    viscosity: 0.827,
  },
  tempHigh: [136.4],
  densityHigh: [7.753],
  tempLow: [-24],
  categories: ["insoluble", "titanium_iv", "chloride"],
  toxic: [0.1],
};

chemjsChemicals.tungsten_hexafluoride = {
  elem: {
    color: "#f5f57a",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 12.4,
    stain: 0.005,
  },
  tempLow: [17.1, -2.3],
  densityLow: [4560],
  causticIgnore: true,
};

chemjsChemicals.polonium_hydride = {
  elem: {
    color: [blendColors("#838396", "#ff0000"), blendColors("#838396", "#00ff00"), blendColors("#838396", "#0000ff")],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 2450,
    burn: 1,
    burnTime: 10,
    burnInto: ["polonium_dioxide", "steam"],
    hidden: true,
    stain: 0.05,
  },
  tempLow: [-35.3],
  tempHigh: [36.1],
  densityHigh: [8.29],
  categories: ["insoluble", "polonide", "hydrogen_ion"],
};

//organic chemistry

let plasticTick = function (pixel) {
  if (!pixel.colored) {
    let rgb = elements[pixel.element].colorObject;

    let coloroffset = Math.floor(Math.random() * (Math.random() > 0.5 ? -1 : 1) * Math.random() * 2);
    let r = rgb.r + coloroffset;
    let g = rgb.g + coloroffset;
    let b = rgb.b + coloroffset;
    pixel.color = "rgb(" + r + "," + g + "," + b + ")";
    pixel.colored = true;
    pixel.origColor = pixel.color.match(/\d+/g);
  }
};

chemjsChemicals.methane = {
  elementNames: ["methane_ice", "liquid_methane", "methane"],
};

chemjsChemicals.methanol = {
  elem: {
    color: "#969380",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 792,
    burn: 100,
    burnTime: 3,
    fireColor: ["#80acf0", "#96cdfe", "#bee6d4"],
    viscosity: 0.545,
  },
  tempLow: [-97.6],
  tempHigh: [64.7, 385],
  stateHigh: [null, ["fire"]],
  densityHigh: [1.332],
};

chemjsChemicals.ethane = {
  elem: {
    color: "#afafaf",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 1.356,
    burn: 85,
    burnTime: 5,
    fireColor: ["#00ffff", "#00ffdd"],
  },
  tempLow: [-88.5, -142],
  densityLow: [544],
  tempHigh: [400],
  stateHigh: [["fire"]],
};

chemjsChemicals.ethanol = {
  elementNames: ["alcohol", "alcohol_gas", "alcohol_ice"],
};

chemjsChemicals.ethylene = {
  elem: {
    color: "#afafaf",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 1.178,
    burn: 100,
    burnTime: 5,
    fireColor: ["#00ffff", "#00ffdd"],
  },
  tempLow: [-103.7, -154.4],
  densityLow: [567],
  tempHigh: [400],
  stateHigh: [["fire"]],
};

chemjsChemicals.polyethylene = {
  elem: {
    color: "#a7a7a7",
    behavior: behaviors.WALL,
    properties: { colored: false },
    tick: plasticTick,
    category: "solids",
    state: "solid",
    density: 1450,
  },
  tempHigh: [125],
  causticIgnore: true,
};

chemjsChemicals.propane = {
  elementNames: ["propane", "liquid_propane", "propane_ice"],
};

elements.liquid_propane.density = 493;

chemjsChemicals.acetic_acid = {
  elementNames: ["vinegar", "frozen_vinegar"],
  reactionProduct: { cationAcid: "hydrogen_ion", anionAcid: "acetate" },
  categories: ["acids", "hydrogen_ion", "acetate"],
};

chemjsChemicals.tetrafluoroethylene = {
  elem: {
    color: "#8f8f8f",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 4.16,
    burn: 100,
    burnTime: 2,
    hidden: true,
  },
  tempLow: [-76, -142],
  densityLow: [1519],
  causticIgnore: true,
  toxic: [0.2],
};

chemjsChemicals.polytetrafluoroethylene = {
  elem: {
    color: "#efefef",
    behavior: behaviors.WALL,
    properties: { colored: false },
    tick: plasticTick,
    category: "solids",
    state: "solid",
    density: 1450,
  },
  tempHigh: [327],
  causticIgnore: true,
};

chemjsChemicals.chloroform = {
  elem: {
    color: "#7f7f7f",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1564,
    viscosity: 0.563,
  },
  tempLow: [-63],
  densityHigh: [1.489],
  tempHigh: [61],
  causticIgnore: true,
  toxic: [0.1],
};

chemjsChemicals.chloroethane = {
  elem: {
    color: "#afdfaf",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 2.879,
    burn: 85,
    burnTime: 5,
    fireColor: ["#00ffff", "#00ffdd"],
  },
  tempLow: [12.27, -138.7],
  densityLow: [921],
  tempHigh: [510],
  stateHigh: [["fire"]],
};

chemjsChemicals.diethylaluminium_chloride = {
  elem: {
    color: "#7faf7f",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 960,
    hidden: true,
    burn: 100,
    burnTime: 500,
    fireColor: ["#ffffff"],
  },
  tempLow: [-74],
  densityHigh: [2.879],
  tempHigh: [125, 175],
  stateHigh: [null, ["fire"]],
  toxic: [0.1],
};

chemjsChemicals.radium_water = {
  elem: {
    color: "#3bc4ff",
    behavior: ["XX|CR:radiation%0.05|XX", "M2 AND CR:radiation%0.05|XX|M2 AND CR:radiation%0.05", "M1|M1|M1"],
    category: "liquids",
    state: "liquid",
    density: 1100,
    hidden: true,
  },
  tempLow: [0],
  densityHigh: [2.879],
  tempHigh: [100],
  stateHigh: [["rad_steam"]],
  toxic: [0.1],
  categories: ["water"],
};

chemjsChemicals.tennessine_monofluoride = {
  elem: {
    color: [blendColors("#4a4123", "#ff0000", 0.25), blendColors("#4a4123", "#00ff00", 0.25), blendColors("#4a4123", "#0000ff", 0.25)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 5200,
    hidden: true,
    stain: 0.2,
  },
  tempLow: [5], //made up
  densityHigh: [13.012],
  tempHigh: [130],
  toxic: [0.1],
};

chemjsChemicals.tennessine_trifluoride = {
  elem: {
    color: [blendColors("#ffc400", "#ff0000", 0.25), blendColors("#ffc400", "#00ff00", 0.25), blendColors("#ffc400", "#0000ff", 0.25)],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 5600,
    hidden: true,
    stain: 0.3,
  },
  tempLow: [3], //made up
  densityHigh: [14.591],
  tempHigh: [105],
  toxic: [0.1],
};

chemjsChemicals.oganesson_difluoride = {
  elem: {
    color: [blendColors("#e3e2de", "#ff0000", 0.25), blendColors("#e3e2de", "#00ff00", 0.25), blendColors("#e3e2de", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6100,
    hidden: true,
  },
  tempHigh: [160], //made up
  toxic: [0.1],
};

chemjsChemicals.oganesson_tetrafluoride = {
  elem: {
    color: [blendColors("#d6d5d2", "#ff0000", 0.25), blendColors("#d6d5d2", "#00ff00", 0.25), blendColors("#d6d5d2", "#0000ff", 0.25)],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 6300,
    hidden: true,
  },
  tempHigh: [120], //made up
  toxic: [0.1],
};

chemjsChemicals.oganesson_tetratennesside = {
  elem: {
    color: [blendColors("#f7f7f5", "#ff0000"), blendColors("#f7f7f5", "#00ff00"), blendColors("#f7f7f5", "#0000ff")],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 13800,
    hidden: true,
  },
  tempHigh: [180], //made up
  stateHigh: [["molten_stable_oganesson", "stable_tennessine"]],
  toxic: [0.1],
};

//whuh
elements.acid_cloud.behavior = ["XX|XX|XX", "XX|CH:generic_acid%0.05|M1%2.5 AND BO", "XX|XX|XX"];
elements.acid_cloud.behavior = ["XX|XX|XX", "XX|CH:generic_acid%0.05|M1%2.5 AND BO", "XX|XX|XX"];

elements.base_cloud = {
  color: "#78636a",
  behavior: ["XX|XX|XX", "XX|CH:base%0.05|M1%2.5 AND BO", "XX|XX|XX"],
  reactions: {
    fire_cloud: { elem1: "electric", elem2: "fire" },
    smoke: { elem2: "pyrocumulus", chance: 0.05, y: [0, 12], setting: "clouds" },
    ash: { elem2: "pyrocumulus", chance: 0.05, y: [0, 12], setting: "clouds" },
    balloon: { elem2: "pop" },
  },
  category: "gases",
  burn: 15,
  burnTime: 5,
  state: "gas",
  density: 0.7,
  ignoreAir: true,
};

elements.disinfectant = {
  color: "#2d004f",
  behavior: behaviors.LIQUID,
  reactions: {
    blood: { elem1: null, elem2: "water" },
    dirty_water: { elem2: "water" },
    plague: { elem2: null },
    virus: { elem2: null },
    infection: { elem2: null },
    mushroom_spore: { elem2: null },
    lichen: { elem2: null },
    rotten_meat: { elem2: "meat" },
    rotten_cheese: { elem2: "cheese" },
    stench: { elem2: null },
    cancer: { elem2: null, chance: 0.01 },
    rat: { elem2: null, chance: 0.01 },
    ant: { elem2: "dead_bug", chance: 0.1 },
    bee: { elem2: "dead_bug", chance: 0.1 },
    fly: { elem2: "dead_bug", chance: 0.1 },
    firefly: { elem2: "dead_bug", chance: 0.1 },
    worm: { elem2: "dead_bug", chance: 0.1 },
    flea: { elem2: "dead_bug", chance: 0.1 },
    termite: { elem2: "dead_bug", chance: 0.1 },
    stink_bug: { elem2: "dead_bug", chance: 0.1 },
  },
  tempHigh: 100,
  tempLow: 0,
  stateHigh: ["steam", "iodine"],
  state: "liquid",
  category: "liquids",
  density: 1020,
  stain: 0.01,
};

elements.soy_sauce = {
  color: "#470500",
  behavior: behaviors.LIQUID,
  tempLow: -5,
  tempHigh: 105,
  state: "liquid",
  category: "liquids",
  density: 1200,
  stain: 0.5,
  stateHigh: ["steam", "steam", "steam", "steam", "salt"],
};

elements.supernova.behavior = ["XX|XX|XX", "XX|EX:80>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_iron,molten_uranium,molten_lead,oxygen,molten_sodium,sulfur_gas,fluorine,neon,molten_potassium,molten_magnesium,molten_aluminum,chlorine,molten_calcium,molten_titanium,molten_nickel,molten_copper,molten_zinc,gallium_gas,bromine_gas,iodine_gas AND CH:neutronium,neutronium,quark_matter,void|XX", "XX|XX|XX"];

elements.gamma_ray_burst = {
  color: ["#fbf8ff", "#fbf3ff", "#f8f7ff"],
  behavior: ["XX|XX|XX", "XX|EX:100>plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,plasma,molten_gold,molten_uranium,molten_lead,molten_tungsten,molten_nickel,molten_copper,molten_zinc,gallium_gas,bromine_gas,iodine_gas,molten_tin,molten_silver AND CH:void|XX", "XX|XX|XX"],
  temp: 99999999700,
  category: "energy",
  state: "gas",
  density: 1000,
  hardness: 1,
  hidden: true,
  excludeRandom: true,
  maxSize: 1,
};

elements.neutronium = {
  color: "#aaffff",
  behavior: ["XX|CR:neutron%0.1|XX", "CR:neutron%0.1|XX|CR:neutron%0.1", "XX|CR:neutron%0.1|XX"],
  temp: 1e6,
  tempHigh: 1e7,
  stateHigh: "liquid_neutronium",
  tempLow: 1e5,
  stateLow: ["molten_uranium", "molten_gold", "molten_tungsten", "molten_lead"],
  breakInto: ["gamma_ray_burst", "supernova", "supernova"],
  category: "special",
  state: "solid",
  density: 4e17,
  hardness: 0.999,
  excludeRandom: true,
};

elements.liquid_neutronium = {
  color: "#ffffaa",
  behavior2: ["XX|CR:neutron%0.2|XX".split("|"), "M1 AND CR:neutron%0.2|XX|M1 AND CR:neutron%0.2".split("|"), "M1|M1|M1".split("|")],
  tick: function (pixel) {
    if (!isEmpty(pixel.x - 1, pixel.y, false) && (isEmpty(pixel.x - 1, pixel.y, true) || pixelMap[pixel.x - 1][pixel.y].element !== "liquid_neutronium") && !(outOfBounds(pixel.x - 1, pixel.y - 1) || !isEmpty(pixel.x - 1, pixel.y - 1, true))) {
      tryMove(pixel, pixel.x - 1, pixel.y - 1);
    } else if (!isEmpty(pixel.x + 1, pixel.y, false) && (isEmpty(pixel.x + 1, pixel.y, true) || pixelMap[pixel.x + 1][pixel.y].element !== "liquid_neutronium") && !(outOfBounds(pixel.x + 1, pixel.y - 1) || !isEmpty(pixel.x + 1, pixel.y - 1, true))) {
      tryMove(pixel, pixel.x + 1, pixel.y - 1);
    } else if (((!isEmpty(pixel.x + 1, pixel.y, false) && (isEmpty(pixel.x + 1, pixel.y, true) || pixelMap[pixel.x + 1][pixel.y].element !== "liquid_neutronium")) || (!isEmpty(pixel.x - 1, pixel.y, false) && (isEmpty(pixel.x - 1, pixel.y, true) || pixelMap[pixel.x - 1][pixel.y].element !== "liquid_neutronium"))) && !(outOfBounds(pixel.x, pixel.y - 1) || !isEmpty(pixel.x, pixel.y - 1, true))) {
      tryMove(pixel, pixel.x, pixel.y - 1);
    } else {
      pixelTick(pixel, elements.liquid_neutronium.behavior2);
    }
    doDefaults(pixel);
  },
  temp: 2e7,
  tempLow: 1e7,
  stateLow: "neutronium",
  breakInto: ["gamma_ray_burst", "supernova", "supernova"],
  category: "special",
  state: "liquid",
  density: 2e17,
  hardness: 0.999,
  excludeRandom: true,
};

chemjsChemicals.neutronium = {
  elementNames: ["neutronium", "liquid_neutronium"],
};
chemjsChemicals.quark_matter = {
  elementNames: ["quark_matter"],
};

elements.liquid_helium.behavior2 = ["XX|XX|XX".split("|"), "M1|XX|M1".split("|"), "M1|M1|M1".split("|")];
delete elements.liquid_helium.behavior;

elements.liquid_helium.tick = function (pixel) {
  if (Math.random() < 0.9) {
    if (!isEmpty(pixel.x - 1, pixel.y, false) && (isEmpty(pixel.x - 1, pixel.y, true) || pixelMap[pixel.x - 1][pixel.y].element !== "liquid_helium") && !(outOfBounds(pixel.x - 1, pixel.y - 1) || !isEmpty(pixel.x - 1, pixel.y - 1, true))) {
      tryMove(pixel, pixel.x - 1, pixel.y - 1);
    } else if (!isEmpty(pixel.x + 1, pixel.y, false) && (isEmpty(pixel.x + 1, pixel.y, true) || pixelMap[pixel.x + 1][pixel.y].element !== "liquid_helium") && !(outOfBounds(pixel.x + 1, pixel.y - 1) || !isEmpty(pixel.x + 1, pixel.y - 1, true))) {
      tryMove(pixel, pixel.x + 1, pixel.y - 1);
    } else if (((!isEmpty(pixel.x + 1, pixel.y, false) && (isEmpty(pixel.x + 1, pixel.y, true) || pixelMap[pixel.x + 1][pixel.y].element !== "liquid_helium")) || (!isEmpty(pixel.x - 1, pixel.y, false) && (isEmpty(pixel.x - 1, pixel.y, true) || pixelMap[pixel.x - 1][pixel.y].element !== "liquid_helium"))) && !(outOfBounds(pixel.x, pixel.y - 1) || !isEmpty(pixel.x, pixel.y - 1, true))) {
      tryMove(pixel, pixel.x, pixel.y - 1);
    } else {
      pixelTick(pixel, elements.liquid_helium.behavior2);
    }
  } else {
    pixelTick(pixel, elements.liquid_helium.behavior2);
  }
  doDefaults(pixel);
};

elements.quark_matter = {
  color: ["#ff0000", "#00ff00", "#0000ff"],
  behavior: ["XX|CR:neutron%0.1 AND CR:proton%0.1|XX", "M2 AND CR:neutron%0.1 AND CR:proton%0.1|XX|M2 AND CR:neutron%0.1 AND CR:proton%0.1", "M1|M1|M1"],
  tick: function (pixel) {
    pixel.color = pixelColorPick(pixel);
  },
  temp: 2e7,
  breakInto: "gamma_ray_burst",
  category: "special",
  state: "liquid",
  density: 4e18,
  hardness: 0.999,
  excludeRandom: true,
};

elements.big_explosion = {
  color: ["#fc6c6c", "#fc8a3e", "#f55656"],
  behavior: ["XX|XX|XX", "XX|EX:20|XX", "XX|XX|XX"],
  temp: 300,
  category: "energy",
  state: "gas",
  density: 1000,
  excludeRandom: true,
  noMix: true,
};

elements.rad_pop = {
  color: ["#a2ff57", "#52ff83", "#58f494"],
  behavior: ["XX|XX|XX", "XX|EX:10>fire,radiation,radiation|XX", "XX|XX|XX"],
  category: "energy",
  state: "gas",
  density: 1000,
  excludeRandom: true,
  hidden: true,
};

elements.alpha_particle = {
  color: "#ff7878",
  behavior: ["XX|XX|XX", "XX|CH:helium%0.01 AND DL%0.25|XX", "XX|XX|XX"],
  tick: behaviors.BOUNCY,
  temp: 35,
  category: "energy",
  state: "gas",
  density: 0.00012,
  ignoreAir: true,
};

elements.transactinide_fallout = {
  color: ["#5ab891", "#00ff5e", "#a7ff4a", "#a2f752"],
  behavior: ["XX|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|XX", "CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1|CH:fallout%1 AND CH:radium%0.1 AND CH:francium%0.1 AND CH:fermium%0.01 AND CH:einsteinium%0.01 AND CH:californium%0.01 AND CH:berkelium%0.01 AND CH:curium%0.01 AND CH:americium%0.01 AND CH:plutonium%0.01 AND CH:neptunium%0.01 AND CH:uranium%0.01 AND CH:protactinium%0.01 AND CH:thorium%0.01 AND CH:actinium%0.01|CR:neutron%1 AND CR:radiation%1 AND CR:alpha_particle%1 AND CR:rad_pop%1", "M2|M1|M2"],
  category: "energy",
  hidden: true,
  state: "solid",
  density: 10000,
  hardness: 0.9,
  excludeRandom: true,
};

elements.foof_grass = {
  color: ["#980909", "#8b2708", "#852a11", "#7b1212", "#6d1d13"],
  tick: function (pixel) {
    if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
      if (pixel.h < 2 && Math.random() < 0.0005 && isEmpty(pixel.x, pixel.y - 1)) {
        createPixel(pixel.element, pixel.x, pixel.y - 1);
        pixelMap[pixel.x][pixel.y - 1].h = pixel.h + 1;
      }
      var coords = [
        [pixel.x + 1, pixel.y],
        [pixel.x - 1, pixel.y],
        [pixel.x + 1, pixel.y + 1],
        [pixel.x - 1, pixel.y + 1],
      ];
      for (var i = 0; i < coords.length; i++) {
        if (Math.random() < 0.005 && isEmpty(coords[i][0], coords[i][1])) {
          if (!isEmpty(coords[i][0], coords[i][1] + 1, true)) {
            var soil = pixelMap[coords[i][0]][coords[i][1] + 1];
            if (eLists.SOIL.indexOf(soil.element) !== -1) {
              createPixel(pixel.element, coords[i][0], coords[i][1]);
            }
          }
        }
      }
    }
    doDefaults(pixel);
  },
  properties: {
    h: 0,
  },
  reactions: {
    vinegar: { elem1: "explosion", elem2: null, chance: 0.035 },
    mercury: { elem1: "explosion", elem2: null, chance: 0.01 },
  },
  temp: -120,
  tempHigh: -57,
  stateHigh: ["oxygen", "fluorine", "explosion"],
  tempLow: -200,
  stateLow: "solid_foof",
  burn: 50,
  burnTime: 20,
  breakInto: "foof",
  category: "life",
  state: "solid",
  density: 1400,
  hidden: true,
  seed: "foof_grass_seed",
};

elements.foof_grass_seed = {
  color: ["#980909", "#8b2708", "#852a11", "#7b1212", "#6d1d13"],
  behavior: ["XX|M2%0.05|XX", "XX|L2:foof_grass|XX", "XX|M1|XX"],
  temp: -120,
  tempHigh: -57,
  stateHigh: ["oxygen", "fluorine", "explosion"],
  tempLow: -200,
  stateLow: "solid_foof",
  burn: 50,
  burnTime: 20,
  category: "life",
  state: "solid",
  density: 1400,
  breakInto: "foof",
  hidden: true,
  cooldown: defaultCooldown,
  seed: true,
};

elements.centrifuge = {
  color: "#89888f",
  category: "machines",
  tempHigh: 1455.5,
  stateHigh: "molten_steel",
  tick: function (pixel) {
    if (!pixel.del) {
      for (let i = 0; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
          let x = [pixel.x + i, pixel.x - j, pixel.x - i, pixel.x + j];
          let y = [pixel.y + j, pixel.y + i, pixel.y - j, pixel.y - i];
          var oob = outOfBounds(x[0], y[0]) || outOfBounds(x[1], y[1]) || outOfBounds(x[2], y[2]) || outOfBounds(x[3], y[3]);
          if (!oob) {
            let pixels = [null, null, null, null];
            let immovable = false;
            for (let k = 0; k < 4; k++) {
              pixels[k] = !isEmpty(x[k], y[k], true) ? pixelMap[x[k]][y[k]] : null;
              if (pixels[k] && !elements[pixels[k].element].movable) {
                immovable = true;
              }
            }
            if (!immovable) {
              for (let k = 0; k < 4; k++) {
                if (pixelMap[x[k]][y[k]]) {
                  delete pixelMap[x[k]][y[k]];
                }
              }
              for (let k = 0; k < 4; k++) {
                if (pixels[k] && !pixels[k].del) {
                  pixels[k].x = x[(k + 1) % 4];
                  pixels[k].y = y[(k + 1) % 4];
                  movePixel(pixels[k], x[(k + 1) % 4], y[(k + 1) % 4]);
                }
              }

              for (let k = 0; k < 4; k++) {
                if (pixels[k] && elements[pixels[k].element].onCentrifuge) {
                  elements[pixels[k].element].onCentrifuge(pixels[k]);
                }
              }
            }
          }
        }
      }
    }
    doDefaults(pixel);
  },
  movable: false,
};
eLists.LIVING_SPARK = ["electric", "positron"];

elements.living_spark = {
  hidden: true,
  behaviorOn: [
    ["XX", "CR:electric%25", "XX"],
    ["CR:electric%25", "XX", "CR:electric%25"],
    ["XX", "CR:electric%25", "XX"],
  ],
  conduct: 0.1,
  insulate: true,
  color: "#fff86b",
  lifeState: 1, //0: survived a generation. 1: newly created. 2: will die next generation
  tick: function (pixel) {
    if (pixel.charge) {
      pixelTick(pixel);
    }
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i === 0 && j === 0)) {
          if (!isEmpty(pixel.x + i, pixel.y + j, true) && ((pixelMap[pixel.x + i][pixel.y + j].element === "living_spark" && (pixelMap[pixel.x + i][pixel.y + j].lifeState === 0 || pixelMap[pixel.x + i][pixel.y + j].lifeState === 2)) || pixelMap[pixel.x + i][pixel.y + j].on || eLists.LIVING_SPARK.includes(pixelMap[pixel.x + i][pixel.y + j].element))) {
            count++;
          } else if (!isEmpty(pixel.x + i, pixel.y + j, true) && pixelMap[pixel.x + i][pixel.y + j].element !== "living_spark") {
            pixel2 = pixelMap[pixel.x + i][pixel.y + j];
            // One loop that repeats 5 times if shiftDown else 1 time
            var con = elements[pixel2.element].conduct;
            if (pixel2.temp <= elements[pixel2.element].superconductAt) {
              con = 1;
            }
            if (con == undefined) {
              continue;
            }
            if (Math.random() < con) {
              // If random number is less than conductivity
              if (!pixel2.charge && !pixel2.chargeCD) {
                pixel2.charge = 1;
                if (elements[pixel2.element].colorOn) {
                  pixel2.color = pixelColorPick(pixel2);
                }
                pixel.lifeState = 2;
              }
            }
          } else if (isEmpty(pixel.x + i, pixel.y + j, false)) {
            count2 = false;
            for (let i2 = -1; i2 <= 1; i2++) {
              for (let j2 = -1; j2 <= 1; j2++) {
                if (!(i2 === 0 && j2 === 0)) {
                  i3 = i2 + i;
                  j3 = j2 + j;
                  if (!isEmpty(pixel.x + i3, pixel.y + j3, true) && ((pixelMap[pixel.x + i3][pixel.y + j3].element === "living_spark" && (pixelMap[pixel.x + i3][pixel.y + j3].lifeState === 0 || pixelMap[pixel.x + i3][pixel.y + j3].lifeState === 2)) || pixelMap[pixel.x + i3][pixel.y + j3].on || eLists.LIVING_SPARK.includes(pixelMap[pixel.x + i3][pixel.y + j3].element))) {
                    count2++;
                  }
                  if (count2 > 3) {
                    break;
                  }
                }
              }
              if (count2 > 3) {
                break;
              }
            }
            if (count2 == 3) {
              createPixel("living_spark", pixel.x + i, pixel.y + j);
            }
          }
        }
      }
    }
    if (count < 2 || count > 3) {
      pixel.lifeState = 2;
    }
    doDefaults(pixel);
  },
  category: "energy",
  state: "gas",
  density: 2.1,
  insulate: true,
  ignoreAir: true,
};

runEveryTick(function () {
  for (let i = currentPixels.length - 1; i >= 0; i--) {
    if (currentPixels[i].element === "living_spark") {
      if (currentPixels[i].lifeState === 2) {
        deletePixel(currentPixels[i].x, currentPixels[i].y);
      } else {
        currentPixels[i].lifeState = 0;
      }
    }
  }
});


function elementCircle(x, y, radius, pixelType = "fire", chance = 0.1, replace = [null]) {
  if (!Array.isArray(replace)) {
    replace = [replace];
  }
  // if pixelType includes , split it into an array
  if (pixelType.indexOf(",") !== -1) {
    pixelType = pixelType.split(",");
  }
  var coords = circleCoords(x, y, radius);
  for (var i = 0; i < coords.length; i++) {
    if (isEmpty(coords[i].x, coords[i].y) && replace.includes(null)) {
      if (Math.random() <= chance) {
        // if pixelType is an array, choose a random item
        if (Array.isArray(pixelType)) {
          createPixel(pixelType[Math.floor(Math.random() * pixelType.length)], coords[i].x, coords[i].y);
        } else {
          createPixel(pixelType, coords[i].x, coords[i].y);
        }
      }
    }
    if (!isEmpty(coords[i].x, coords[i].y, true) && replace.includes(pixelMap[coords[i].x][coords[i].y].element)) {
      if (Math.random() <= chance) {
        // if pixelType is an array, choose a random item
        if (Array.isArray(pixelType)) {
          changePixel(pixelMap[coords[i].x][coords[i].y], pixelType[Math.floor(Math.random() * pixelType.length)]);
        } else {
          changePixel(pixelMap[coords[i].x][coords[i].y], pixelType);
        }
      }
    }
  }
}

function franciumHydroxide(pixel) {
  elementCircle(pixel.x, pixel.y, 10, "francium_hydroxide", 0.1, parseReactStringValue(["chemical!liquid_water", "steam", "rad_steam"]));
}
function ununenniumHydroxide(pixel) {
  elementCircle(pixel.x, pixel.y, 10, "ununennium_hydroxide", 0.1, parseReactStringValue(["chemical!liquid_water", "steam", "rad_steam"]));
}

function radiumWater(pixel) {
  elementCircle(pixel.x, pixel.y, 10, "radium_water", 0.1, parseReactStringValue(["chemical!liquid_water"]));
}

function thorium(pixel, p) {
  if (Math.random() < 0.1) {
    changePixel(pixel, "radium");
    elementCircle(p.x, p.y, 2, "neutron");
  }
}

function depletedUranium(pixel) {
  if (Math.random() < 0.05) {
    changePixel(pixel, "plutonium");
  }
}

function enrichedUranium(pixel, p) {
  if (pixel.temp >= 500) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
  }
  if (Math.random() < 0.1) {
    changePixel(pixel, "neptunium");
  }
  elementCircle(p.x, p.y, 2, "neutron", 0.05);
}
function enrichedUraniumDioxide(pixel, p) {
  if (pixel.temp >= 500) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
  }
  elementCircle(p.x, p.y, 2, "neutron", 0.02);
}

function plutonium(pixel, p) {
  if (pixel.temp >= 500) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
    elementCircle(p.x, p.y, 5, "neutron");
  }
  if (Math.random() < 0.1) {
    changePixel(pixel, "americium");
  }
  elementCircle(p.x, p.y, 2, "neutron", 0.2);
}

function depletedPlutonium(pixel) {
  if (pixel.temp >= 500 && Math.random() < 0.1) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
  }
  if (Math.random() < 0.1) {
    changePixel(pixel, "americium");
  }
}

function plutoniumDioxide(pixel, p) {
  if (pixel.temp >= 500) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
  }
  elementCircle(p.x, p.y, 2, "neutron", 0.075);
}

function transmuteAround(pixel) {
  elementCircle(pixel.x, pixel.y, 40, "fermium", 0.1, parseReactStringValue(["chemical!einsteinium"]));
  elementCircle(pixel.x, pixel.y, 40, "einsteinium", 0.1, parseReactStringValue(["chemical!californium"]));
  elementCircle(pixel.x, pixel.y, 40, "californium", 0.1, parseReactStringValue(["chemical!berkelium"]));
  elementCircle(pixel.x, pixel.y, 40, "berkelium", 0.1, parseReactStringValue(["chemical!curium"]));
  elementCircle(pixel.x, pixel.y, 40, "curium", 0.1, parseReactStringValue(["chemical!americium"]));
  elementCircle(pixel.x, pixel.y, 40, "americium", 0.1, parseReactStringValue(["chemical!plutonium,ignorechemical!stable_plutonium"]));
  elementCircle(pixel.x, pixel.y, 40, "plutonium", 0.1, parseReactStringValue(["chemical!pure_uranium_238"]));
  elementCircle(pixel.x, pixel.y, 40, "neptunium", 0.1, parseReactStringValue(["chemical!pure_uranium_235"]));
  elementCircle(pixel.x, pixel.y, 40, "radium", 0.1, parseReactStringValue(["chemical!thorium"]));
}

function neptunium(pixel, p) {
  if (pixel.temp >= 500) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
  }
  elementCircle(p.x, p.y, 2, "neutron");
}
function americium(pixel, p) {
  if (pixel.temp >= 500) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
    elementCircle(p.x, p.y, 5, "neutron");
  }
  if (Math.random() < 0.1) {
    changePixel(pixel, "curium");
  }
  elementCircle(p.x, p.y, 2, "neutron");
}
function curium(pixel, p) {
  if (pixel.temp >= 500) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
    elementCircle(p.x, p.y, 5, "neutron");
  }
  if (Math.random() < 0.1) {
    changePixel(pixel, "berkelium");
  }
  elementCircle(p.x, p.y, 2, "neutron");
}
function berkelium(pixel, p) {
  if (pixel.temp >= 500) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
    elementCircle(p.x, p.y, 5, "neutron");
  }
  if (Math.random() < 0.1) {
    changePixel(pixel, "californium");
  }
  elementCircle(p.x, p.y, 2, "neutron", 0.2);
}
function californium(pixel, p) {
  if (pixel.temp >= 500) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
    elementCircle(p.x, p.y, 5, "neutron");
  }
  if (Math.random() < 0.1) {
    changePixel(pixel, "einsteinium");
  }
  elementCircle(p.x, p.y, 2, "neutron", 0.25);
}
function einsteinium(pixel, p) {
  if (pixel.temp >= 500) {
    transmuteAround(pixel);
    changePixel(pixel, "n_explosion");
    elementCircle(p.x, p.y, 5, "neutron");
  }
  if (Math.random() < 0.1) {
    changePixel(pixel, "fermium");
  }
  elementCircle(p.x, p.y, 3, "neutron");
}
function fermium(pixel, p) {
  if (pixel.temp >= 500) {
    changePixel(pixel, "n_explosion");
    elementCircle(p.x, p.y, 5, "neutron");
  }
  elementCircle(p.x, p.y, 3, "neutron", 0.2);
}

elements.molten_salt.conduct = 0.1;
elements.molten_potassium_salt = {};
elements.molten_potassium_salt.conduct = 0.1;
elements.molten_potassium_salt.fireElement = null;
elements.potassium_salt.hidden = false;
elements.bleach.stateHigh = ["salt", "steam", "sodium_chlorate"];

chemjsReactions = [
  { react1: "chemical!acid_liquids", react2: "ash", elem1: "neutral_acid", elem2: null, priority: 50 },
  { react1: "chemical!acid_liquids", react2: "limestone", elem1: "neutral_acid", elem2: null, priority: 50 },
  { react1: "chemical!acid_liquids", react2: "quicklime", elem1: "neutral_acid", elem2: null, priority: 50 },
  { react1: "chemical!acid_liquids", react2: "slaked_lime", elem1: "neutral_acid", elem2: null, priority: 50 },
  { react1: "chemical!acid_liquids", react2: "borax", elem1: "neutral_acid", elem2: null, priority: 50 },
  { react1: "chemical!acid_liquids", react2: "ammonia", elem1: "neutral_acid", elem2: null, priority: 50 },
  { react1: "chemical!acid_liquids", react2: "bleach", elem1: "neutral_acid", elem2: null, priority: 50 },
  { react1: "chemical!acid_liquids", react2: "caustic_potash", elem1: "neutral_acid", elem2: null, priority: 50 },
  { react1: "chemical!acid_liquids", react2: "charcoal", elem1: null, elem2: "carbon_dioxide", priority: 50 },
  { react1: "chemical!acid_liquids", react2: "grape", elem1: "no_change", elem2: "juice", color1: "#291824", priority: 50 },
  { react1: "chemical!acid_liquids", react2: "soap", elem1: "hydrogen", elem2: "no_change", priority: 50 },
  { react1: "chemical!acid_liquids", react2: "sodium", elem1: "explosion", elem2: "no_change", priority: 50 },
  { react1: "chemical!acid_liquids", react2: "potassium", elem1: "explosion", elem2: "no_change", priority: 50 },
  { react1: "chemical!acid_liquids", react2: "meat", elem1: "no_change", elem2: "rotten_meat", elem1: null, chance: 0.5, priority: 50 },
  { react1: "chemical!acids,restrictchemical!caustic", react2: "chemical!liquid_water,ignore!dirty_water,ignore!neutral_acid", elem1: null, elem2: "dirty_water", priority: 10 },
  { react1: "chemical!nitric_acid,chemical!sulfuric_acid,chemical!hydroiodic_acid,chemical!hydroastatic_acid,chemical!fluoroboric_acid", react2: "chemical!liquid_water,ignore!dirty_water,ignore!neutral_acid", elem1: "no_change", elem2: "dirty_water", priority: 11 },

  { react1: "chemical!acid_gases", react2: "chemical!acid_gases", elem1: null, elem2: "acid_cloud", props: { chance: 0.3, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!acid_gases", react2: "rain_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!acid_gases", react2: "cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!acid_gases", react2: "snow_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!acid_gases", react2: "hail_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!acid_gases", react2: "pyrocumulus", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!acid_gases", react2: "fire_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },

  { react1: "chemical!acid_gases", react2: "ash", elem1: "hydrogen", elem2: null, priority: 50 },
  { react1: "chemical!acid_gases", react2: "limestone", elem1: "hydrogen", elem2: null, priority: 50 },
  { react1: "chemical!acid_gases", react2: "quicklime", elem1: "hydrogen", elem2: null, priority: 50 },
  { react1: "chemical!acid_gases", react2: "slaked_lime", elem1: "hydrogen", elem2: null, priority: 50 },
  { react1: "chemical!acid_gases", react2: "borax", elem1: "hydrogen", elem2: null, priority: 50 },
  { react1: "chemical!acid_gases", react2: "ammonia", elem1: "hydrogen", elem2: null, priority: 50 },
  { react1: "chemical!acid_gases", react2: "bleach", elem1: "hydrogen", elem2: null, priority: 50 },
  { react1: "chemical!acid_gases", react2: "caustic_potash", elem1: "hydrogen", elem2: null, priority: 50 },
  { react1: "chemical!acid_gases", react2: "radium_hydroxide", elem1: "hydrogen", elem2: null, priority: 50 },
  { react1: "chemical!acid_gases", react2: "actinium_hydroxide", elem1: "hydrogen", elem2: null, priority: 50 },
  { react1: "chemical!acid_gases", react2: "charcoal", elem1: null, elem2: "carbon_dioxide", priority: 50 },
  { react1: "chemical!acid_gases", react2: "grape", elem1: "no_change", elem2: "juice", color1: "#291824", priority: 50 },
  { react1: "chemical!acid_gases", react2: "soap", elem1: "hydrogen", elem2: "no_change", priority: 50 },
  { react1: "chemical!acid_gases", react2: "sodium", elem1: "explosion", elem2: "no_change", priority: 50 },
  { react1: "chemical!acid_gases", react2: "potassium", elem1: "explosion", elem2: "no_change", priority: 50 },
  { react1: "chemical!acid_gases", react2: "meat", elem1: "no_change", elem2: "rotten_meat", elem1: null, chance: 0.5, priority: 50 },

  { react1: "chemical!base_solution_liquids", react2: "grape", elem1: "no_change", elem2: "juice", props: { color1: "#291824" }, priority: 50 },
  { react1: "chemical!base_solution_liquids", react2: "sodium", elem1: "no_change", elem2: "pop", priority: 50 },
  { react1: "chemical!base_solution_liquids", react2: "meat", elem1: null, elem2: "rotten_meat", props: { chance: 0.5 }, priority: 50 },
  { react1: "chemical!base_solution_liquids", react2: "grease", elem1: null, elem2: "soap", priority: 50 },
  { react1: "chemical!base_solution_liquids", react2: "fat", elem1: null, elem2: "soap", priority: 50 },

  { react1: "chemical!base_solution_gases", react2: "chemical!base_solution_gases", elem1: null, elem2: "base_cloud", props: { chance: 0.3, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!base_solution_gases", react2: "rain_cloud", elem1: null, elem2: "base_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!base_solution_gases", react2: "cloud", elem1: null, elem2: "base_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!base_solution_gases", react2: "snow_cloud", elem1: null, elem2: "base_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!base_solution_gases", react2: "hail_cloud", elem1: null, elem2: "base_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!base_solution_gases", react2: "pyrocumulus", elem1: null, elem2: "base_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },
  { react1: "chemical!base_solution_gases", react2: "fire_cloud", elem1: null, elem2: "base_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 50 },

  { react1: "chemical!base_solution_gases", react2: "grape", elem1: "no_change", elem2: "juice", props: { color1: "#291824" }, priority: 50 },
  { react1: "chemical!base_solution_gases", react2: "sodium", elem1: "no_change", elem2: "pop", priority: 50 },
  { react1: "chemical!base_solution_gases", react2: "meat", elem1: null, elem2: "rotten_meat", props: { chance: 0.4 }, priority: 50 },
  { react1: "chemical!base_solution_gases,ignorechemical!red_mud", react2: "grease", elem1: null, elem2: "soap", priority: 50 },
  { react1: "chemical!base_solution_gases,ignorechemical!red_mud", react2: "fat", elem1: null, elem2: "soap", priority: 50 },

  { react1: "chemical!red_mud", react2: "chemical!liquid_water,ignore!dirty_water,ignore!bauxite_slurry", elem1: "no_change", elem2: "dirty_water", priority: 10 },

  { react1: "acid_cloud", react2: "chemical!base", elem1: "rain_cloud", elem2: null, props: { elem2: null, chance: 0.05 }, priority: 50 },
  { react1: "base_cloud", react2: "chemical!acid", elem1: "rain_cloud", elem2: null, props: { elem2: null, chance: 0.05 }, priority: 50 },

  { react1: "chemical!sulfuric_acid", react2: "grape", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, deleteReactions: { aa: true }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "juice", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "corn", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "popcorn", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "potato", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "bread", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "toast", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "wheat", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "flour", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "dough", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "sugar", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "candy", elem1: "charcoal", elem2: "steam", props: { temp2: 200 }, priority: 100 },

  { react1: "chemical!solid_salt", react2: "water", elem1: null, elem2: "react1!salt_water", priority: 10 },
  { react1: "chemical!solid_salt", react2: "ice", elem1: null, elem2: "react1!salt_water", props: { chance: 0.1 }, priority: 10 },
  { react1: "chemical!solid_salt", react2: "rime", elem1: null, elem2: "react1!salt_water", props: { chance: 0.075 }, priority: 10 },
  { react1: "chemical!solid_salt", react2: "snow", elem1: null, elem2: "react1!salt_water", props: { chance: 0.25 }, priority: 10 },
  { react1: "chemical!solid_salt", react2: "packed_snow", elem1: null, elem2: "react1!salt_water", props: { chance: 0.05 }, priority: 10 },
  { react1: "chemical!solid_salt", react2: "packed_ice", elem1: null, elem2: "react1!salt_water", props: { chance: 0.01 }, priority: 10 },

  { react1: "chemical!liquid_salt_water", react2: "dirt", elem1: null, elem2: "mud", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "sand", elem1: null, elem2: "wet_sand", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "clay_soil", elem1: null, elem2: "clay", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "dust", elem1: "dirty_water", elem2: null, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "ash", elem1: "dirty_water", elem2: null, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "carbon_dioxide", elem1: "dirty_water", elem2: null, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "sulfur", elem1: "dirty_water", elem2: null, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "charcoal", elem1: "dirty_water", elem2: "no_change", props: { chance: 0.005 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "plague", elem1: "dirty_water", elem2: null, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "fallout", elem1: "dirty_water", elem2: "no_change", props: { chance: 0.25 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "radiation", elem1: "dirty_water", elem2: "no_change", props: { chance: 0.25 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "rust", elem1: "dirty_water", elem2: "no_change", props: { chance: 0.005 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "quicklime", elem1: null, elem2: "slaked_lime", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "rock", elem1: "no_change", elem2: "wet_sand", props: { chance: 0.0005 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "fly", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1, oneway: true }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "firefly", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1, oneway: true }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "bee", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.05, oneway: true }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "stink_bug", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1, oneway: true }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "cancer", elem1: "dirty_water", elem2: "no_change", props: { chance: 0.25 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "aluminum", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.0025 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "zinc", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.015 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "steel", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.0125 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "iron", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.0125 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "tin", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.01 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "lead", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.01 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "brass", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.001 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "bronze", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.001 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "copper", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.0075 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "silver", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.0075 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "gold", elem1: ["hydrogen", "hydrogen", "oxygen", "react1!salt"], elem2: "no_change", props: { charged: true, chance: 0.0075 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "fire", elem1: "no_change", elem2: "smoke", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "snow", elem1: "no_change", elem2: "slush", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "rat", elem1: "dirty_water", elem2: "no_change", props: { chance: 0.2 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "slug", elem1: null, elem2: "slime", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "snail", elem1: null, elem2: "calcium", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "torch", elem1: "no_change", elem2: "wood", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "sawdust", elem1: null, elem2: "cellulose", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "oxygen", elem1: "no_change", elem2: "foam", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "paper", elem1: null, elem2: "cellulose", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "pollen", elem1: "no_change", elem2: null, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "soda", elem1: "foam", elem2: "no_change", elem1: "foam", props: { chance: 0.01 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "ice_nine", elem1: "ice_nine", elem2: "no_change", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "ant_wall", elem1: null, elem2: ["mud", "mud", "wet_sand"], props: { chance: 0.007 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "soap", elem1: "water", elem2: "no_change", priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "dye", elem1: "no_change", elem2: null, props: { chance: 0.05 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "ink", elem1: "no_change", elem2: null, props: { chance: 0.01 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "sodium", elem1: "no_change", elem2: ["pop", "pop", "pop", "hydrogen"], props: { chance: 0.01, temp1: 250 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "molten_sodium", elem1: "no_change", elem2: ["pop", "pop", "pop", "hydrogen"], props: { chance: 0.01, temp1: 250 }, priority: 10 },
  { react1: "chemical!liquid_salt_water", react2: "confetti", elem1: "no_change", elem2: [null, "cellulose"], props: { chance: 0.001 }, priority: 10 },
  {
    react1: "chemical!liquid_salt_water",
    react2: "greek_fire",
    elem1: "no_change",
    elem2: "no_change",
    props: {
      func: function (p, pixel) {
        if (!pixel.burning) {
          pixel.burning = true;
          pixel.burnStart = pixelTick;
        }
      },
    },
    priority: 10,
  },
  { react1: "radiation", react2: "chemical!liquid_salt_water", elem1: "rad_steam", elem2: "no_change", props: { chance: 0.4 }, priority: 10 },
  { react1: "iron", react2: "chemical!liquid_salt_water", elem1: "rust", elem2: "no_change", props: { chance: 0.005 }, priority: 10 },
  { react1: "copper", react2: "chemical!liquid_salt_water", elem1: "oxidized_copper", elem2: "no_change", props: { chance: 0.005 }, priority: 10 },
  { react1: "steel", react2: "chemical!liquid_salt_water", elem1: "rust", elem2: "no_change", props: { chance: 0.004 }, priority: 10 },
  { react1: "bronze", react2: "chemical!liquid_salt_water", elem1: "oxidized_copper", elem2: "no_change", props: { chance: 0.0025 }, priority: 10 },

  { react1: "chemical!liquid_salt_water", react2: "chemical!liquid_salt_water", elem1: "chemical!solid_insoluble,react1restrict!anion,react2restrict!cation,one!", elem2: "chemical!liquid_salt_water,react2restrict!anion,react1restrict!cation,one!", priority: 10 },
  { react1: "chemical!acids,chemical!amphoteric,restrictchemical!hydrogen_ion", react2: "chemical!bases,restrictchemical!hydroxide", elem1: "chemical!liquid_salt_water,chemical!solid_insoluble,react1restrict!anionAcid,react2restrict!cationBase,one!", elem2: null, deleteReactions: { aa: true }, priority: 20 },
  { react1: "chemical!acids,restrictchemical!hydrogen_ion", react2: "chemical!bases,chemical!amphoteric,restrictchemical!hydroxide", elem1: "chemical!liquid_salt_water,chemical!solid_insoluble,react1restrict!anionAcid,react2restrict!cationBase,one!", elem2: null, deleteReactions: { aa: true }, priority: 20 },
  { react1: "chemical!hydrochloric_acid,chemical!sulfuric_acid", react2: "chemical!bases,chemical!amphoteric,restrictchemical!hydroxide", elem1: "chemical!liquid_salt_water,chemical!solid_insoluble,react1restrict!anionAcid,react2restrict!cationBase,one!", elem2: null, deleteReactions: { aa: true }, props: { temp1: 50, temp2: 50 }, priority: 21 },
  { react1: "chemical!hydrogen_fluoride", react2: "chemical!bases,chemical!amphoteric,restrictchemical!hydroxide", elem1: "chemical!liquid_salt_water,chemical!solid_insoluble,react1restrict!anionAcid,react2restrict!cationBase,one!", elem2: "fire", deleteReactions: { aa: true }, priority: 21 },
  { react1: "chemical!acids,chemical!amphoteric,restrictchemical!hydrogen_ion", react2: "chemical!bases,restrictchemical!hydride", elem1: "chemical!liquid_salt_water,chemical!solid_insoluble,react1restrict!anionAcid,react2restrict!cationBase,one!", elem2: "hydrogen", deleteReactions: { aa: true }, priority: 20 },
  { react1: "chemical!acids,chemical!amphoteric,restrictchemical!hydrogen_ion", react2: "chemical!bases,restrictchemical!methoxide", elem1: "chemical!liquid_salt_water,chemical!solid_insoluble,react1restrict!anionAcid,react2restrict!cationBase,one!", elem2: "methanol", deleteReactions: { aa: true }, priority: 20 },

  { react1: "chemical!acid_liquids", react2: "chemical!bases", elem1: "neutral_acid", elem2: null, priority: 10 },
  { react1: "chemical!acid_gases", react2: "chemical!bases", elem1: "hydrogen", elem2: null, priority: 10 },

  { react1: "chemical!fertilizer", react2: "plant", elem1: "plant", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "wheat_seed", elem1: "wheat", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "grass", elem1: "grass", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "grass_seed", elem1: "grass", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "bamboo_plant", elem1: "bamboo", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "flower_seed", elem1: "flower_seed", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "petal", elem1: "flower_seed", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "vine", elem1: "vine", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "sapling", elem1: "tree_branch", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "tree_branch", elem1: "tree_branch", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "corn_seed", elem1: "corn", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "root", elem1: "root", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "dirt", elem1: "grass", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "mud", elem1: "grass", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "potato_seed", elem1: "potato", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },
  { react1: "chemical!fertilizer", react2: "yeast", elem1: "yeast", elem2: "no_change", props: { chance: 0.05 }, priority: 15 },

  { react1: "chemical!radioactive", react2: "quark_matter", elem1: "react1!stable", elem2: "no_change", priority: 50 },
  { react1: "fallout", react2: "quark_matter", elem1: null, elem2: "no_change", priority: 100 },
  { react1: "transactinide_fallout", react2: "quark_matter", elem1: null, elem2: "no_change", priority: 100 },

  //He

  { react1: "alpha_particle", react2: "electric", elem1: "helium", elem2: null, priority: 100 },

  //B

  { react1: "chemical!diborane", react2: "chemical!oxygen", elem1: "boron_trioxide", elem2: "fire", priority: 100 },
  { react1: "chemical!decaborane", react2: "chemical!oxygen", elem1: "boron_trioxide", elem2: "fire", priority: 100 },
  { react1: "chemical!pentaborane_9", react2: "chemical!oxygen", elem1: "boron_trioxide", elem2: "explosion", priority: 100 },
  { react1: "chemical!diborane", react2: "chemical!liquid_water", elem1: "boric_acid", elem2: "hydrogen", props: { temp1: 100, temp2: 100 }, priority: 10 },
  { react1: "chemical!decaborane", react2: "chemical!liquid_water", elem1: "boric_acid", elem2: "hydrogen", props: { temp1: 100, temp2: 100 }, priority: 10 },
  { react1: "chemical!pentaborane_9", react2: "chemical!liquid_water", elem1: "boric_acid", elem2: "hydrogen", props: { temp1: 100, temp2: 100 }, priority: 10 },

  { react1: "chemical!boric_acid", react2: "chemical!methanol", elem1: "trimethyl_borate", elem2: "steam", props: { tempMin: 100 }, priority: 100 },

  { react1: "chemical!boron_trioxide", react2: "chemical!hydrofluoric_acid", elem1: "boron_trifloride", elem2: "fire", priority: 100 },
  { react1: "chemical!boron", react2: "chemical!fluorine", elem1: "boron_trifloride", elem2: "fire", priority: 100 },
  { react1: "chemical!boron_trifluoride", react2: "chemical!liquid_water,ignorechemical!tetrafluoroborate", elem1: "fluoroboric_acid", elem2: "boric_acid", priority: 10 },

  { react1: "chemical!fluoroboric_acid", react2: "chemical!sodium_carbonate", elem1: "fluoroboric_acid", elem2: ["carbon_dioxide,steam"], props: { temp1: 50, temp2: 50 }, priority: 100 },

  { react1: "chemical!hydrochloric_acid", react2: "chemical!sodium_borate", elem1: "boric_acid", elem2: "salt", props: { temp1: 50, temp2: 50 }, priority: 100 },

  { react1: "chemical!boron_trioxide", react2: "chemical!chlorine", elem1: "boron_trichloride", elem2: null, props: { tempMin: 500 }, priority: 100 },
  { react1: "chemical!boron", react2: "chemical!chlorine", elem1: "boron_trichloride", elem2: null, props: { temp1: 50, temp2: 50 }, priority: 100 },
  { react1: "chemical!boron_trichloride", react2: "chemical!liquid_water", elem1: "acid", elem2: "boric_acid", priority: 10 },

  { react1: "chemical!sodium_hydride", react2: "chemical!boron_trifluoride", elem1: "diborane", elem2: "sodium_tetrafluoroborate", props: { temp1: 20, temp2: 20 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "chemical!sodium_borohydride", elem1: "diborane", elem2: "hydrogen", props: { temp1: 50, temp2: 50 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "chemical!sodium_borate", elem1: "boron_trioxide", elem2: "sodium_sulfate", props: { temp1: 200, temp2: 200 }, priority: 100 },
  { react1: "chemical!sodium_borohydride", react2: "chemical!boron_trifluoride", elem1: "sodium_octahydrotriborate", elem2: ["sodium_fluoride", "hydrogen"], props: { temp1: 20, temp2: 20 }, priority: 100 },
  { react1: "chemical!hydrobromic_acid", react2: "chemical!sodium_octahydrotriborate", elem1: "sodium_bromoheptahydrotriborate", elem2: "hydrogen", props: { temp1: 20, temp2: 20 }, priority: 100 },

  //C
  { react1: "methanol", react2: "plant", elem1: null, elem2: "dead_plant", props: { chance: 0.05 }, priority: 100 },
  { react1: "methanol", react2: "cell", elem1: "no_change", elem2: [null, "dna"], props: { chance: 0.075 }, priority: 100 },
  { react1: "methanol", react2: "blood", elem1: "no_change", elem2: [null, "dna"], props: { chance: 0.075 }, priority: 100 },
  { react1: "methanol", react2: "antibody", elem1: "no_change", elem2: [null, "dna"], props: { chance: 0.075 }, priority: 100 },
  { react1: "methanol", react2: "infection", elem1: "no_change", elem2: [null, "dna"], props: { chance: 0.075 }, priority: 100 },
  { react1: "methanol", react2: "cancer", elem1: "no_change", elem2: [null, "dna"], props: { chance: 0.0375 }, priority: 100 },
  { react1: "methanol", react2: "flea", elem1: "no_change", elem2: "dead_bug", priority: 100 },
  { react1: "methanol", react2: "termite", elem1: "no_change", elem2: "dead_bug", priority: 100 },
  { react1: "methanol", react2: "ant", elem1: "no_change", elem2: "dead_bug", priority: 100 },
  { react1: "methanol", react2: "frog", elem1: "no_change", elem2: "meat", props: { chance: 0.05 }, priority: 100 },
  { react1: "methanol", react2: "evergreen", elem1: "no_change", elem2: "dead_plant", props: { chance: 0.05 }, priority: 100 },
  { react1: "methanol", react2: "cactus", elem1: "no_change", elem2: "dead_plant", props: { chance: 0.05 }, priority: 100 },
  { react1: "methanol", react2: "paper", elem1: "no_change", elem2: "cellulose", priority: 100 },
  { react1: "methanol", react2: "primordial_soup", elem1: "no_change", elem2: "water", priority: 100 },

  { react1: "chemical!carbon_dioxide", react2: "chemical!hydrogen", elem1: "steam", elem2: "methanol", props: { chance: 0.1, tempMin: 300 }, priority: 100 },

  { react1: "chemical!ethane", react2: "chemical!pure_water", elem1: "hydrogen", elem2: "ethylene", props: { chance: 0.01, tempMin: 300 }, priority: 100 },

  { react1: "chemical!titanium_trichloride", react2: "chemical!ethylene", elem1: "no_change", elem2: "polyethylene", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!diethylaluminium_chloride", react2: "chemical!ethylene", elem1: "no_change", elem2: "polyethylene", props: { chance: 0.1 }, priority: 100 },

  //N
  { react1: "chemical!nitric_oxide", react2: "steam", elem1: "smog", elem2: null, props: { chance: 0.01 }, priority: 100 },
  { react1: "chemical!nitric_oxide", react2: "oxygen", elem1: "nitrogen_dioxide", elem2: null, priority: 100 },

  { react1: "chemical!nitrogen_dioxide", react2: "steam", elem1: "smog", elem2: null, props: { chance: 0.01 }, priority: 100 },
  { react1: "chemical!nitrogen_dioxide", react2: "chemical!liquid_water,ignorechemical!nitrate", elem1: "nitric_oxide", elem2: "nitric_acid", priority: 10 },
  { react1: "chemical!sulfuric_acid", react2: "chemical!potassium_nitrate", elem1: "potassium_sulfate", elem2: "nitric_acid", props: { temp1: 50, temp2: 50 }, priority: 100 },

  { react1: "chemical!ammonia", react2: "oxygen", elem1: "nitric_oxide", elem2: "steam", props: { chance: 0.01 }, priority: 100 },
  { react1: "chemical!nitric_acid", react2: "chemical!ammonia", elem1: "ammonium_nitrate", elem2: null, priority: 100 },

  { react1: "chemical!ammonia", react2: "acid", elem1: "ammonium_chloride", elem2: null, priority: 100 },

  { react1: "chemical!nitrogen_dioxide", react2: "rain_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!nitrogen_dioxide", react2: "cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!nitrogen_dioxide", react2: "snow_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!nitrogen_dioxide", react2: "hail_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!nitrogen_dioxide", react2: "pyrocumulus", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!nitrogen_dioxide", react2: "fire_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!nitrogen_dioxide", react2: "thunder_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },

  //F
  { react1: "chemical!fluorine", react2: "steam", elem1: "hydrofluoric_acid_gas", elem2: "oxygen", priority: 100 },
  { react1: "chemical!fluorine", react2: "chemical!liquid_water,ignore!potassium_fluoride_solution", elem1: "hydrofluoric_acid_gas", elem2: "oxygen", priority: 10 },
  { react1: "chemical!fluorine", react2: "chemical!hydrogen", elem1: "hydrogen_fluoride", elem2: "fire", priority: 100 },

  { react1: "chemical!hydrogen_fluoride,ignorechemical!hydrofluoric_acid", react2: "steam", elem1: "hydrofluoric_acid_gas", elem2: null, priority: 100 },
  { react1: "chemical!hydrogen_fluoride,ignorechemical!hydrofluoric_acid", react2: "chemical!liquid_water,ignore!potassium_fluoride_solution", elem1: "hydrofluoric_acid", elem2: null, priority: 100 },
  { react1: "chemical!hydrofluoric_acid", react2: "chemical!liquid_water,ignore!dirty_water,ignore!potassium_fluoride_solution", elem1: "no_change", elem2: "dirty_water", priority: 10 },

  { react1: "chemical!potassium_fluoride_solution", react2: "chemical!hydrogen_fluoride", elem1: ["fluorine", "hydrogen"], elem2: "potassium_fluoride_solution", props: { charged: true, chance: 0.02 }, priority: 100 },

  { react1: "fluorine", react2: "liquid_oxygen", elem1: "foof", elem2: null, priority: 100 },

  { react1: "chemical!chloroform", react2: "chemical!hydrogen_fluoride", elem1: "tetrafluoroethylene", elem2: "acid", props: { temp2: 50 }, priority: 100 },
  { react1: "chemical!tetrafluoroethylene", react2: "chemical!oxygen", elem1: "fire", elem2: "fire", priority: 100 },
  { react1: "chemical!tetrafluoroethylene", react2: "chemical!sulfuric_acid", elem1: "polytetrafluoroethylene", elem2: "no_change", priority: 100 },

  { react1: "chemical!calcium_fluoride", react2: "chemical!sulfuric_acid", elem1: "hydrogen_fluoride", elem2: "chalk", priority: 100 },

  //Na
  { react1: "molten_salt", react2: "aluminum", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0025 }, priority: 100 },
  { react1: "molten_salt", react2: "zinc", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.015 }, priority: 100 },
  { react1: "molten_salt", react2: "steel", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0125 }, priority: 100 },
  { react1: "molten_salt", react2: "iron", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0125 }, priority: 100 },
  { react1: "molten_salt", react2: "tin", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.01 }, priority: 100 },
  { react1: "molten_salt", react2: "lead", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.01 }, priority: 100 },
  { react1: "molten_salt", react2: "brass", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.001 }, priority: 100 },
  { react1: "molten_salt", react2: "bronze", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.001 }, priority: 100 },
  { react1: "molten_salt", react2: "copper", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0075 }, priority: 100 },
  { react1: "molten_salt", react2: "silver", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0075 }, priority: 100 },
  { react1: "molten_salt", react2: "gold", elem1: ["sodium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0075 }, priority: 100 },

  { react1: "chemical!sodium", react2: "chemical!hydrogen", elem1: "sodium_hydride", elem2: null, props: { tempMin: 250 }, priority: 100 },
  { react1: "chemical!sodium_hydride", react2: "chemical!liquid_water", elem1: ["pop", "pop", "hydrogen", "hydrogen"], elem2: "no_change", props: { chance: 0.1, temp2: 250 }, priority: 10 },

  { react1: "chemical!sodium_hydroxide_solution", react2: "chemical!sodium_bicarbonate", elem1: null, elem2: "sodium_carbonate_solution", priority: 100 },
  { react1: "chemical!sodium_hydroxide", react2: "chemical!sodium_bicarbonate_solution", elem1: null, elem2: "sodium_carbonate_solution", priority: 100 },
  { react1: "chemical!sodium_hydroxide", react2: "chemical!sodium_bicarbonate", elem1: null, elem2: "sodium_carbonate", priority: 99 },

  { react1: "chemical!sodium", react2: "chemical!methanol", elem1: "sodium_methoxide", elem2: "hydrogen", props: { temp1: 200, temp2: 200 }, priority: 100 },
  { react1: "chemical!sodium_methoxide", react2: "chemical!liquid_water", elem1: "methanol", elem2: "sodium_hydroxide", props: { temp1: 50, temp2: 50 }, priority: 10 },

  { react1: "chemical!sodium_hydroxide,ignorechemical!sodium_hydroxide_solution", react2: "chemical!liquid_water,ignorechemical!sodium_aluminate_solution", elem1: "sodium_hydroxide", elem2: null, priority: 10 },

  { react1: "chemical!sodium_hydroxide_solution", react2: "chemical!bauxite", elem1: "bauxite_slurry", elem2: "red_mud", priority: 100 },

  { react1: "chemical!sodium_chloride_solution", react2: "chemical!mercury", elem1: ["sodium_hydroxide", "chlorine", "hydrogen"], elem2: "no_change", props: { charged: true, chance: 0.1 }, priority: 100 },
  { react1: "chemical!sodium_hydride", react2: "chemical!chlorine", elem1: "salt", elem2: "acid_gas", priority: 100 },

  //Mg
  { react1: "chemical!sulfuric_acid", react2: "chemical!magnesium_oxide", elem1: null, elem2: "epsom_salt", props: { temp2: 50 }, priority: 100 },
  { react1: "chemical!magnesium_oxide", react2: "chemical!calcium_oxide", elem1: "cement", elem2: null, priority: 100 },
  { react1: "chemical!magnesium_fluoride", react2: "chemical!sulfuric_acid", elem1: "hydrogen_fluoride", elem2: "epsom_salt", priority: 100 },

  //Al
  { react1: "chemical!chloroethane", react2: "chemical!aluminum", elem1: "diethylaluminium_chloride", elem2: null, props: { chance: 0.1 }, priority: 100 },

  { react1: "chemical!sodium_aluminate_solution", react2: "chemical!carbon_dioxide", elem1: "aluminum_hydroxide", elem2: "sodium_carbonate_solution", priority: 100 },
  { react1: "chemical!aluminum_oxide", react2: "chemical!cryolite_mixture", elem1: "molten_cryolite_solution", elem2: "molten_cryolite_solution", props: { tempMin: 950 }, priority: 100 },
  { react1: "chemical!cryolite_solution", react2: "chemical!carbon", elem1: "molten_aluminum", elem2: "carbon_dioxide", props: { tempMin: 950 }, priority: 100 },

  { react1: "chemical!hydrogen_fluoride", react2: "chemical!sodium_aluminate", elem1: "cryolite", elem2: "fire", priority: 100 },
  { react1: "chemical!hydrogen_fluoride", react2: "chemical!aluminum_oxide", elem1: "aluminum_fluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!hydrogen_fluoride", react2: "chemical!aluminum_hydroxide", elem1: "aluminum_fluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!sodium_hexafluoroaluminate", react2: "chemical!aluminum_fluoride", elem1: "molten_cryolite_mixture", elem2: "molten_cryolite_mixture", props: { tempMin: 950 }, priority: 100 },

  { react1: "chemical!hexafluorosilicic_acid", react2: "chemical!sodium_aluminate", elem1: "cryolite", elem2: "sand", priority: 100 },

  //Si
  { react1: "chemical!hydrogen_fluoride", react2: "chemical!silicon_dioxide", elem1: "hexafluorosilicic_acid", elem2: "fire", props: { chance: 0.05 }, priority: 100 },

  //P
  { react1: "chemical!white_phosphorus", react2: "head", elem1: "no_change", elem2: null, props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!white_phosphorus", react2: "light", elem1: "red_phosphorus", elem2: "no_change", priority: 100 },
  { react1: "chemical!white_phosphorus", react2: "liquid_light", elem1: "red_phosphorus", elem2: "no_change", priority: 100 },

  { react1: "chemical!phosphorus_pentoxide", react2: "mud", elem1: "no_change", elem2: "dirt", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "wet_sand", elem1: "no_change", elem2: "sand", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "ant", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "worm", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "fly", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "firefly", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "bee", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "stink_bug", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "termite", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "flea", elem1: "no_change", elem2: "dead_bug", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "slug", elem1: "no_change", elem2: "slime", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "frog", elem1: "no_change", elem2: "slime", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "tadpole", elem1: "no_change", elem2: "slime", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "fish", elem1: "no_change", elem2: "meat", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "snail", elem1: "no_change", elem2: "limestone", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "slime", elem1: "no_change", elem2: "dust", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "meat", elem1: "no_change", elem2: "dust", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "rotten_meat", elem1: "no_change", elem2: "dust", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "cooked_meat", elem1: "no_change", elem2: "dust", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "blood", elem1: ["phosphorus_pentoxide", "phosphorus_pentoxide", "phosphorus_pentoxide", "phosphorus_pentoxide", "phosphoric_acid"], elem2: ["salt", "oxygen"], priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "algae", elem1: ["phosphorus_pentoxide", "phosphorus_pentoxide", "phosphorus_pentoxide", "phosphorus_pentoxide", "phosphoric_acid"], elem2: "salt", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "kelp", elem1: ["phosphorus_pentoxide", "phosphorus_pentoxide", "phosphorus_pentoxide", "phosphorus_pentoxide", "phosphoric_acid"], elem2: "salt", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "mushroom_spore", elem1: "no_change", elem2: "dust", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "lichen", elem1: "no_change", elem2: "dust", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "yeast", elem1: "no_change", elem2: "dust", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "cell", elem1: "no_change", elem2: "dust", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "cancer", elem1: "no_change", elem2: "dust", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "udder", elem1: "no_change", elem2: "meat", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "bone_marrow", elem1: "no_change", elem2: "bone", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "jelly", elem1: "no_change", elem2: "dust", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "yolk", elem1: "no_change", elem2: "dust", priority: 100 },
  { react1: "chemical!phosphorus_pentoxide", react2: "chemical!liquid_water", elem1: ["phosphorus_pentoxide", "phosphorus_pentoxide", "phosphorus_pentoxide", "phosphorus_pentoxide", "phosphoric_acid"], elem2: null, priority: 100 },

  { react1: "chemical!phosphoric_acid", react2: "chemical!soda", elem1: ["soda", null], elem2: "soda", priority: 100 },
  { react1: "chemical!phosphoric_acid", react2: "chemical!calcium_hydroxide", elem1: "neutral_acid", elem2: "tricalcium_phosphate", priority: 100 },

  { react1: "chemical!apatite", react2: "chemical!carbon", elem1: "white_phosphorus_gas", elem2: ["carbon_dioxide", "molten_slag"], props: { tempMin: 1670 }, priority: 100 },
  { react1: "chemical!tricalcium_phosphate", react2: "chemical!carbon", elem1: "white_phosphorus_gas", elem2: ["carbon_dioxide", "molten_slag"], props: { tempMin: 1670 }, priority: 100 },

  { react1: "chemical!apatite", react2: "chemical!sulfuric_acid", elem1: "phosphoric_acid", elem2: ["chalk", "chalk", "chalk", "chalk", "hydrogen_fluoride"], priority: 100 },
  { react1: "chemical!tricalcium_phosphate", react2: "chemical!sulfuric_acid", elem1: "phosphoric_acid", elem2: "chalk", priority: 100 },
  { react1: "bone", react2: "chemical!sulfuric_acid", elem1: "phosphoric_acid", elem2: "chalk", priority: 100 },

  //S
  { react1: "chemical!sulfur", react2: "chemical!hydrogen", elem1: "hydrogen_sulfide", elem2: null, priority: 100 },
  { react1: "chemical!hydrogen_sulfide", react2: "oxygen", elem1: null, elem2: "stench", priority: 100 },
  { react1: "chemical!hydrogen_sulfide", react2: "nitrogen", elem1: null, elem2: "stench", priority: 100 },
  { react1: "chemical!hydrogen_sulfide", react2: "nitrogen", elem1: null, elem2: "stench", priority: 100 },
  { react1: "chemical!hydrogen_sulfide", react2: "chemical!liquid_water,ignore!dirty_water,ignore!iron_dichloride_solution", elem1: null, elem2: "dirty_water", priority: 10 },
  { react1: "chemical!hydrogen_sulfide", react2: "chemical!sodium_bicarbonate", elem1: null, elem2: "no_change", priority: 100 },

  { react1: "chemical!sulfur_dioxide", react2: "steam", elem1: null, elem2: ["sulfuric_acid_gas", null, null, null, null], priority: 100 },
  { react1: "chemical!sulfur_dioxide", react2: "chemical!liquid_water,ignore_chemical!sulfate", elem1: null, elem2: ["sulfuric_acid_gas", "dirty_water", "dirty_water", "dirty_water", "dirty_water"], priority: 10 },
  { react1: "chemical!sulfur_dioxide", react2: "chemical!acid_gases", elem1: null, elem2: ["sulfuric_acid_gas", null, null, null, null], priority: 50 },

  { react1: "chemical!sulfur_dioxide", react2: "rain_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!sulfur_dioxide", react2: "cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!sulfur_dioxide", react2: "snow_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!sulfur_dioxide", react2: "hail_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!sulfur_dioxide", react2: "pyrocumulus", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!sulfur_dioxide", react2: "fire_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },
  { react1: "chemical!sulfur_dioxide", react2: "thunder_cloud", elem1: null, elem2: "acid_cloud", props: { chance: 0.4, y: [0, 12], setting: "clouds" }, priority: 100 },

  { react1: "chemical!sulfur", react2: "chemical!fluorine", elem1: "sulfur_hexafluoride", elem2: "fire", priority: 100 },

  //Cl
  { react1: "chemical!chlorine", react2: "chemical!methane", elem1: "chloroform", elem2: ["acid", null, null], priority: 100 },

  { react1: "chemical!sulfuric_acid", react2: "chemical!sodium_chloride", elem1: "sodium_sulfate", elem2: "acid", props: { temp1: 50, temp2: 50 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "chemical!potassium_chloride", elem1: "potassium_sulfate", elem2: "acid", props: { temp1: 50, temp2: 50 }, priority: 100 },

  { react1: "chemical!ethylene", react2: "chemical!hydrochloric_acid", elem1: "chloroethane", elem2: null, props: { tempMin: 200 }, priority: 100 },

  { react1: "chemical!sodium_hypochlorite", react2: "chemical!acetic_acid", elem1: "chlorine", elem2: "sodium_acetate_solution", priority: 100 },
  { react1: "chemical!sodium_hypochlorite", react2: "chemical!ethanol", elem1: "chlorine", elem2: null, priority: 100 },

  { react1: "chemical!sodium_chlorate", react2: "plant", elem1: null, elem2: "dead_plant", priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "evergreen", elem1: null, elem2: "dead_plant", priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "cactus", elem1: null, elem2: "dead_plant", priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "vine", elem1: null, elem2: "dead_plant", priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "algae", elem1: null, elem2: null, priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "kelp", elem1: null, elem2: "dirty_water", priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "mushroom_spore", elem1: null, elem2: null, priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "lichen", elem1: null, elem2: null, priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "yeast", elem1: null, elem2: null, priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "sapling", elem1: null, elem2: "dead_plant", priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "root", elem1: null, elem2: "dead_plant", priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "flower_seed", elem1: null, elem2: "dead_plant", priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "pistil", elem1: null, elem2: "dead_plant", priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "petal", elem1: null, elem2: "dead_plant", priority: 100 },
  { react1: "chemical!sodium_chlorate", react2: "grass_seed", elem1: null, elem2: "dead_plant", priority: 100 },

  { react1: "chemical!sodium_chlorate_solution", react2: "gold", elem1: "sodium_perchlorate_solution", elem2: "no_change", props: { charged: true, chance: 0.05 }, priority: 100 },

  { react1: "chemical!sodium_perchlorate", react2: "chemical!hydrochloric_acid", elem1: "perchloric_acid", elem2: "salt", priority: 100 },

  { react1: "chemical!perchloric_acid", react2: "chemical!ammonia", elem1: "ammonium_perchlorate", elem2: null, props: { temp1: 100 }, priority: 100 },

  //K
  { react1: "chemical!potassium", react2: "chemical!liquid_water", elem1: ["potassium_hydroxide", "pop"], elem2: ["hydrogen", "pop", "fire"], props: { chance: 0.01, temp2: 400 }, priority: 10 },

  { react1: "molten_potassium_salt", react2: "aluminum", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0025 }, priority: 100 },
  { react1: "molten_potassium_salt", react2: "zinc", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.015 }, priority: 100 },
  { react1: "molten_potassium_salt", react2: "steel", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0125 }, priority: 100 },
  { react1: "molten_potassium_salt", react2: "iron", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0125 }, priority: 100 },
  { react1: "molten_potassium_salt", react2: "tin", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.01 }, priority: 100 },
  { react1: "molten_potassium_salt", react2: "lead", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.01 }, priority: 100 },
  { react1: "molten_potassium_salt", react2: "brass", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.001 }, priority: 100 },
  { react1: "molten_potassium_salt", react2: "bronze", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.001 }, priority: 100 },
  { react1: "molten_potassium_salt", react2: "copper", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0075 }, priority: 100 },
  { react1: "molten_potassium_salt", react2: "silver", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0075 }, priority: 100 },
  { react1: "molten_potassium_salt", react2: "gold", elem1: ["potassium", "chlorine"], elem2: "no_change", props: { charged: true, chance: 0.0075 }, priority: 100 },

  { react1: "chemical!potassium_hydroxide,ignorechemical!potassium_hydroxide_solution", react2: "chemical!liquid_water", elem1: "potassium_hydroxide", elem2: null, priority: 10 },

  { react1: "chemical!potassium_hydroxide", react2: "chemical!carbon_dioxide", elem1: "potassium_carbonate", elem2: null, priority: 99 },
  { react1: "chemical!potassium_hydroxide_solution", react2: "chemical!carbon_dioxide", elem1: "potassium_carbonate_solution", elem2: null, priority: 100 },

  { react1: "chemical!potassium_hydroxide", react2: "chemical!ammonium_nitrate", elem1: "niter", elem2: "ammonia", priority: 99 },
  { react1: "chemical!potassium_hydroxide", react2: "chemical!ammonium_nitrate_solution", elem1: "niter_solution", elem2: "ammonia", priority: 100 },

  { react1: "chemical!potassium_nitrate", react2: "chemical!sulfur", elem1: "gunpowder", elem2: null, priority: 99 },
  { react1: "chemical!potassium_nitrate_solution", react2: "chemical!sulfur", elem1: "gunpowder", elem2: "water", priority: 100 },

  { react1: "chemical!hydrogen_fluoride", react2: "chemical!potassium_carbonate", elem1: "potassium_fluoride_solution", elem2: "carbon_dioxide", props: { temp1: 100, temp2: 100 }, priority: 100 },

  { react1: "chemical!potassium_chloride_solution", react2: "chemical!mercury", elem1: ["potassium_hydroxide", "chlorine", "hydrogen"], elem2: "no_change", props: { charged: true, chance: 0.1 }, priority: 100 },

  //Ti
  { react1: "chemical!magnesium", react2: "chemical!titanium_tetrachloride", elem1: "titanium", elem2: "magnesium_chloride", props: { tempMin: 650 }, priority: 100 },

  { react1: "chemical!titanium", react2: "chemical!hydrochloric_acid", elem1: "titanium_trichloride_solution", elem2: "hydrogen", props: { temp1: 50, temp2: 50 }, priority: 100 },

  { react1: "chemical!titanium_dioxide", react2: "chemical!chlorine", elem1: "titanium_tetrachloride", elem2: null, props: { tempMin: 825 }, priority: 100 },

  //Fe
  { react1: "chemical!hydrochloric_acid", react2: "pyrite", elem1: "iron_dichloride_solution", elem2: "hydrogen_sulfide", deleteReactions: { aa: true }, props: { temp1: 50 }, priority: 100 }, //TODO: Pyrite

  //Br

  { react1: "water", react2: "chemical!bromine", elem1: "pool_water", elem2: null, priority: 100 },
  { react1: "chemical!potassium", react2: "chemical!bromine", elem1: "potassium_bromide", elem2: "fire", priority: 100 },
  { react1: "chemical!sodium", react2: "chemical!bromine", elem1: "sodium_bromide", elem2: "fire", priority: 100 },

  { react1: "chemical!sulfuric_acid", react2: "chemical!potassium_bromide", elem1: "potassium_sulfate", elem2: "hydrobromic_acid", props: { temp1: 50, temp2: 50 }, priority: 100 },

  //Ag

  { react1: "chemical!nitric_acid", react2: "chemical!silver", elem1: "nitrogen_dioxide", elem2: "silver_nitrate_solution", props: { temp1: 50, temp2: 50 }, deleteReactions: { ab: true }, priority: 100 },

  //In

  { react1: "chemical!nitric_acid", react2: "chemical!indium", elem1: "nitric_oxide", elem2: "indium_nitrate_solution", props: { temp1: 50, temp2: 50 }, deleteReactions: { ab: true }, priority: 100 },
  { react1: "chemical!chlorine", react2: "chemical!indium", elem1: null, elem2: "indium_chloride", props: { temp1: 50, temp2: 50 }, priority: 100 },

  { react1: "chemical!indium_iii,restrictchemical!water", react2: "chemical!bases,restrictchemical!hydroxide", elem1: "chemical!liquid_salt_water,react1restrict!anion,react2restrict!cationBase,one!", elem2: "indium_hydroxide", priority: 20 },
  { react1: "chemical!indium_iii", react2: "chemical!bases,restrictchemical!hydroxide,restrictchemical!base_solution", elem1: "chemical!liquid_salt_water,react1restrict!anion,react2restrict!cationBase,one!", elem2: "indium_hydroxide", priority: 20 },
  { react1: "chemical!indium_iii", react2: "chemical!bases,restrictchemical!hydroxide", elem1: "chemical!solid_salt,react1restrict!anion,react2restrict!cationBase,one!", elem2: "indium_hydroxide", priority: 20 },

  //I
  { react1: "water", react2: "chemical!iodine", elem1: "disinfectant", elem2: null, priority: 100 },
  { react1: "dirty_water", react2: "chemical!iodine", elem1: "water", elem2: null, priority: 100 },
  { react1: "chemical!iodine", react2: "algae", elem1: "no_change", elem2: null, props: { chance: 0.035 }, priority: 100 },
  { react1: "chemical!iodine", react2: "cell", elem1: "no_change", elem2: null, props: { chance: 0.02 }, priority: 100 },
  { react1: "chemical!iodine", react2: "cancer", elem1: "no_change", elem2: null, props: { chance: 0.02 }, priority: 100 },
  { react1: "chemical!iodine", react2: "plauge", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "chemical!iodine", react2: "virus", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "chemical!iodine", react2: "potato", elem1: "no_change", elem2: "no_change", props: { color2: "#3e0252" }, priority: 100 },
  { react1: "chemical!iodine", react2: "bread", elem1: "no_change", elem2: "no_change", props: { color2: "#3e0252" }, priority: 100 },
  { react1: "chemical!iodine", react2: "toast", elem1: "no_change", elem2: "no_change", props: { color2: "#3e0252" }, priority: 100 },
  { react1: "chemical!iodine", react2: "flour", elem1: "no_change", elem2: "no_change", props: { color2: "#3e0252" }, priority: 100 },
  { react1: "chemical!iodine", react2: "dough", elem1: "no_change", elem2: "no_change", props: { color2: "#3e0252" }, priority: 100 },
  { react1: "chemical!iodine", react2: "batter", elem1: "no_change", elem2: "no_change", props: { color2: "#3e0252" }, priority: 100 },

  { react1: "chemical!iodine", react2: "chemical!hydrogen", elem1: "hydrogen_iodide", elem2: null, priority: 100 },
  { react1: "chemical!iodine", react2: "chemical!hydrogen_sulfide", elem1: "hydrogen_iodide", elem2: "sulfur", priority: 100 },

  { react1: "chemical!hydrogen_iodide,ignorechemical!hydroiodic_acid", react2: "steam", elem1: "hydroiodic_acid_gas", elem2: null, priority: 100 },
  { react1: "chemical!hydrogen_iodide,ignorechemical!hydroiodic_acid", react2: "chemical!liquid_water", elem1: "hydroiodic_acid", elem2: null, priority: 10 },

  //W

  { react1: "chemical!fluorine", react2: "chemical!tungsten", elem1: "tungsten_hexafluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!tungsten_hexafluoride", react2: "chemical!liquid_water", elem1: "tungsten", elem2: "hydrofluoric_acid", priority: 10 },
  { react1: "chemical!tungsten_hexafluoride", react2: "chemical!liquid_water", elem1: "tungsten", elem2: "hydrofluoric_acid", priority: 10 },

  //Hg

  { react1: "chemical!mercury", react2: "chemical!liquid_water,ignore!dirty_water,ignore!salt_water,ignore!potassium_salt_water", elem1: null, elem2: "dirty_water", priority: 10 },

  //Tl

  { react1: "chemical!thallium", react2: "chemical!liquid_water,ignorechemical!thallium_i", elem1: "thallium_hydroxide_solution", elem2: "hydrogen", props: { chance: 0.01 }, priority: 10 },
  { react1: "chemical!thallium", react2: "chemical!steam", elem1: "thallium_hydroxide", elem2: "hydrogen", props: { chance: 0.01 }, priority: 10 },
  { react1: "chemical!thallium_oxide", react2: "chemical!liquid_water,ignorechemical!thallium_i", elem1: "thallium_hydroxide_solution", elem2: null, priority: 10 },

  { react1: "chemical!thallium_hydroxide_solution", react2: "chemical!liquid_water,ignore!dirty_water,ignorechemical!thallium_i", elem1: "no_change", elem2: "dirty_water", priority: 10 },
  { react1: "chemical!thallium_sulfate_solution", react2: "chemical!liquid_water,ignore!dirty_water,ignorechemical!thallium_i", elem1: "no_change", elem2: "dirty_water", priority: 10 },

  { react1: "chemical!thallium", react2: "chemical!sulfur", elem1: "thallium_sulfide", elem2: null, props: { tempMin: 115.21, chance: 0.1 }, priority: 100 },
  { react1: "chemical!thallium_sulfide", react2: "light", elem1: "no_change", elem2: null, props: { charge1: 1 }, priority: 100 },
  { react1: "chemical!thallium_sulfide", react2: "liquid_light", elem1: "no_change", elem2: null, props: { charge1: 1 }, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "chemical!thallium", elem1: "thallium_sulfate_solution", elem2: "hydrogen", props: { temp1: 50, temp2: 50 }, deleteReactions: { aa: true }, priority: 100 },

  { react1: "chemical!thallium", react2: "hair", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "chemical!thallium_i", react2: "hair", elem1: "no_change", elem2: null, priority: 100 },

  //Po
  { react1: "chemical!stable_polonium", react2: "chemical!oxygen", elem1: "polonium_dioxide", elem2: null, props: { tempMin: 0 }, priority: 100 },
  { react1: "chemical!stable_polonium", react2: "chemical!oxygen", elem1: "polonium_dioxide", elem2: null, props: { tempMin: 0 }, priority: 100 },
  { react1: "chemical!stable_polonium", react2: "chemical!magnesium", elem1: "magnesium_polonide", elem2: null, props: { tempMin: 300 }, priority: 100 },
  { react1: "chemical!stable_polonium", react2: "chemical!magnesium", elem1: "magnesium_polonide", elem2: null, props: { tempMin: 300 }, priority: 100 },

  { react1: "chemical!hydrochloric_acid", react2: "chemical!magnesium_polonide", elem1: "magnesium_chloride_solution", elem2: "polonium_hydride", props: { temp1: 50, temp2: 50 }, priority: 100 },

  //At
  { react1: "chemical!stable_astatine", react2: "chemical!liquid_water", elem1: "hydroastatic_acid", elem2: null, props: { chance: 0.001 }, priority: 10 },

  //Fr
  { react1: "chemical!francium", react2: "chemical!liquid_water", elem1: "radon", elem2: [null, null, "rad_pop"], priority: 10 },
  { react1: "chemical!francium", react2: "steam", elem1: "radon", elem2: [null, null, "rad_pop"], priority: 100 },
  { react1: "chemical!francium", react2: "rad_steam", elem1: "radon", elem2: [null, null, "rad_pop"], priority: 100 },

  { react1: "chemical!stable_francium", react2: "chemical!liquid_water", elem1: "francium_hydroxide", elem2: [null, null, "explosion"], props: { func: franciumHydroxide }, priority: 10 },
  { react1: "chemical!stable_francium", react2: "steam", elem1: "francium_hydroxide", elem2: [null, null, "explosion"], props: { func: franciumHydroxide }, priority: 100 },
  { react1: "chemical!stable_francium", react2: "rad_steam", elem1: "francium_hydroxide", elem2: [null, null, "explosion"], props: { func: franciumHydroxide }, priority: 100 },
  { react1: "chemical!francium_hydroxide,ignorechemical!francium_hydroxide_solution", react2: "chemical!liquid_water", elem1: "francium_hydroxide", elem2: null, priority: 10 },

  //Ra
  { react1: "chemical!radium", react2: "chemical!liquid_water", elem1: ["radium_water", "rad_pop"], elem2: ["hydrogen", "bubble"], props: { chance: 0.05, temp2: 350, func: radiumWater }, priority: 10 },
  { react1: "chemical!radium_water", react2: "head", elem1: "no_change", elem2: null, props: { chance: 0.4 }, priority: 100 },
  { react1: "chemical!radium_water", react2: "bone", elem1: "no_change", elem2: ["quicklime", "quicklime"], props: { chance: 0.4 }, priority: 100 },
  { react1: "chemical!radium_water", react2: "bone_marrow", elem1: "no_change", elem2: ["quicklime", "blood"], props: { chance: 0.4 }, priority: 100 },

  { react1: "chemical!stable_radium", react2: "chemical!liquid_water", elem1: ["radium_hydroxide", "pop"], elem2: ["hydrogen", "bubble"], props: { chance: 0.05, temp2: 350, func: radiumWater }, priority: 10 },
  { react1: "chemical!radium_chloride_solution", react2: "chemical!mercury", elem1: ["stable_radium", "chlorine", "hydrogen", "oxygen"], elem2: "no_change", props: { charged: true, chance: 0.02 }, priority: 100 },
  { react1: "chemical!radium_oxide", react2: "chemical!liquid_water", elem1: "radium_hydroxide", elem2: null, props: { chance: 0.01 }, priority: 10 },

  //Ac
  { react1: "chemical!stable_actinium", react2: "chemical!oxygen", elem1: "chemical!actinium_oxide", elem2: null, priority: 100 },
  { react1: "chemical!stable_actinium", react2: "chemical!liquid_water", elem1: "actinium_hydroxide", elem2: "hydrogen", props: { chance: 0.01 }, priority: 10 },
  { react1: "chemical!actinium_oxide", react2: "chemical!liquid_water", elem1: "actinium_hydroxide", elem2: null, props: { chance: 0.01 }, priority: 10 },

  { react1: "chemical!actinium_oxide", react2: "chemical!magnesium", elem1: "stable_actinium", elem2: "magnesium_oxide", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!actinium_oxide", react2: "chemical!calcium", elem1: "stable_actinium", elem2: "quicklime", props: { tempMin: 500 }, priority: 100 },

  //Th
  { react1: "chemical!unstable_thorium", react2: "neutron", elem1: "no_change", elem2: null, props: { func: thorium, temp1: 100 }, priority: 100 },

  { react1: "chemical!thorium", react2: "chemical!oxygen", elem1: "chemical!thorium_dioxide,react1restrict!isotope,state!solid,one!", elem2: null, props: { chance: 0.1 }, priority: 100 },

  { react1: "chemical!thorium_dioxide", react2: "chemical!hydrogen_fluoride", elem1: "chemical!thorium_tetrafluoride,react1restrict!isotope,state!solid,one!", elem2: "fire", priority: 100 },

  { react1: "chemical!thorium_dioxide", react2: "chemical!magnesium", elem1: "chemical!thorium,react1restrict!isotope,state!solid,one!", elem2: "magnesium_oxide", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!thorium_dioxide", react2: "chemical!calcium", elem1: "chemical!thorium,react1restrict!isotope,state!solid,one!", elem2: "quicklime", props: { tempMin: 500 }, priority: 100 },

  { react1: "chemical!thorium_tetrafluoride", react2: "chemical!magnesium", elem1: "chemical!thorium,react1restrict!isotope,state!solid,one!", elem2: "magnesium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!thorium_tetrafluoride", react2: "chemical!calcium", elem1: "chemical!thorium,react1restrict!isotope,state!solid,one!", elem2: "fluorite", props: { tempMin: 500 }, priority: 100 },
  { react1: "chemical!thorium_tetrafluoride", react2: "chemical!sodium", elem1: "chemical!thorium,react1restrict!isotope,state!solid,one!", elem2: "sodium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!thorium_tetrafluoride", react2: "chemical!potassium", elem1: "chemical!thorium,react1restrict!isotope,state!solid,one!", elem2: "potassium_fluoride", props: { tempMin: 200 }, priority: 100 },

  //Pa
  { react1: "chemical!stable_protactinium", react2: "chemical!oxygen", elem1: "protactinium_v_oxide", elem2: null, props: { chance: 0.01 }, priority: 100 },
  { react1: "chemical!stable_protactinium", react2: "steam", elem1: "protactinium_hydroxide", elem2: "hydrogen", props: { chance: 0.01 }, priority: 100 },
  { react1: "chemical!protactinium_v_oxide", react2: "chemical!hydrofluoric_acid", elem1: "protactinium_v_fluoride", elem2: "fire", priority: 100 },

  { react1: "chemical!protactinium_v_oxide", react2: "chemical!magnesium", elem1: "stable_protactinium", elem2: "magnesium_oxide", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!protactinium_v_oxide", react2: "chemical!calcium", elem1: "stable_protactinium", elem2: "quicklime", props: { tempMin: 500 }, priority: 100 },

  { react1: "chemical!protactinium_v_fluoride", react2: "chemical!magnesium", elem1: "stable_protactinium", elem2: "magnesium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!protactinium_v_fluoride", react2: "chemical!calcium", elem1: "stable_protactinium", elem2: "fluorite", props: { tempMin: 500 }, priority: 100 },
  { react1: "chemical!protactinium_v_fluoride", react2: "chemical!sodium", elem1: "stable_protactinium", elem2: "sodium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!protactinium_v_fluoride", react2: "chemical!potassium", elem1: "stable_protactinium", elem2: "potassium_fluoride", props: { tempMin: 200 }, priority: 100 },

  //U
  { react1: "chemical!uranium", react2: "meat", elem1: "no_change", elem2: "rotten_meat", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!uranium", react2: "cheese", elem1: "no_change", elem2: "rotten_cheese", props: { chance: 0.1 }, priority: 100 },
  { react1: "chemical!uranium", react2: "chemical!liquid_water,ignore!dirty_water", elem1: "no_change", elem2: "dirty_water", priority: 10 },

  { react1: "chemical!pure_uranium_238", react2: "neutron", elem1: "no_change", elem2: null, props: { func: depletedUranium }, priority: 100 },
  { react1: "chemical!pure_uranium_235", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: enrichedUranium, temp1: 100 }, priority: 100 },

  { react1: "chemical!uranium", react2: "chemical!oxygen", elem1: "chemical!uranium_dioxide,react1restrict!isotope,state!solid,one!", elem2: null, props: { chance: 0.1 }, priority: 100 },

  { react1: "chemical!mixed_uranium_dioxide", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { temp1: 25 }, priority: 100 },
  { react1: "chemical!uranium_235_dioxide", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: enrichedUraniumDioxide, temp1: 50 }, priority: 100 },
  { react1: "chemical!uranium_238_dioxide,chemical!stable_uranium_dioxide", react2: "neutron", elem1: "no_change", elem2: null, priority: 100 },

  { react1: "chemical!uranium_dioxide", react2: "chemical!magnesium", elem1: "chemical!uranium,react1restrict!isotope,state!solid,one!", elem2: "magnesium_oxide", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!uranium_dioxide", react2: "chemical!calcium", elem1: "chemical!uranium,react1restrict!isotope,state!solid,one!", elem2: "quicklime", props: { tempMin: 500 }, priority: 100 },

  { react1: "chemical!uranium_dioxide", react2: "chemical!hydrogen_fluoride", elem1: "chemical!uranium_tetrafluoride,react1restrict!isotope,state!solid,one!", elem2: "fire", priority: 100 },
  { react1: "chemical!uranium_tetrafluoride", react2: "chemical!fluorine", elem1: "chemical!uranium_hexafluoride,react1restrict!isotope,state!solid,one!", elem2: "fire", priority: 100 },

  { react1: "chemical!uranium_tetrafluoride", react2: "chemical!magnesium", elem1: "chemical!uranium,react1restrict!isotope,state!solid,one!", elem2: "magnesium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!uranium_tetrafluoride", react2: "chemical!calcium", elem1: "chemical!uranium,react1restrict!isotope,state!solid,one!", elem2: "fluorite", props: { tempMin: 500 }, priority: 100 },
  { react1: "chemical!uranium_tetrafluoride", react2: "chemical!sodium", elem1: "chemical!uranium,react1restrict!isotope,state!solid,one!", elem2: "sodium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!uranium_tetrafluoride", react2: "chemical!potassium", elem1: "chemical!uranium,react1restrict!isotope,state!solid,one!", elem2: "potassium_fluoride", props: { tempMin: 200 }, priority: 100 },

  { react1: "chemical!uranium_hexafluoride", react2: "chemical!hydrogen", elem1: "chemical!uranium_tetrafluoride,react1restrict!isotope,state!solid,one!", elem2: "hydrogen_fluoride", priority: 100 },
  { react1: "chemical!uranium_hexafluoride", react2: "chemical!liquid_water", elem1: "chemical!uranium_tetrafluoride,react1restrict!isotope,state!solid,one!", elem2: "hydrofluoric_acid", priority: 100 },

  { react1: "chemical!sulfuric_acid", react2: "chemical!uraninite", elem1: "yellowcake_solution", elem2: null, priority: 100 },
  { react1: "chemical!sulfuric_acid", react2: "chemical!yellowcake", elem1: "yellowcake_solution", elem2: "yellowcake_solution", priority: 100 },
  { react1: "chemical!yellowcake", react2: "chemical!hydrogen", elem1: ["uranium_dioxide", "uranium_dioxide", "uranium_dioxide", "uranium_dioxide", "thorium_dioxide"], elem2: "steam", priority: 100 },

  //Np
  { react1: "chemical!neptunium", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: neptunium, temp1: 150 }, priority: 100 },

  { react1: "chemical!stable_neptunium", react2: "chemical!oxygen", elem1: "neptunium_dioxide", elem2: null, props: { chance: 0.01 }, priority: 100 },
  { react1: "chemical!neptunium_dioxide", react2: "chemical!hydrofluoric_acid", elem1: "neptunium_tetrafluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!neptunium_tetrafluoride", react2: "chemical!fluorine", elem1: "neptunium_hexafluoride", elem2: "fire", priority: 100 },

  { react1: "chemical!neptunium_dioxide", react2: "chemical!magnesium", elem1: "stable_protactinium", elem2: "magnesium_oxide", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!neptunium_dioxide", react2: "chemical!calcium", elem1: "stable_protactinium", elem2: "quicklime", props: { tempMin: 500 }, priority: 100 },

  { react1: "chemical!neptunium_tetrafluoride", react2: "chemical!magnesium", elem1: "stable_protactinium", elem2: "magnesium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!neptunium_tetrafluoride", react2: "chemical!calcium", elem1: "stable_protactinium", elem2: "fluorite", props: { tempMin: 500 }, priority: 100 },
  { react1: "chemical!neptunium_tetrafluoride", react2: "chemical!sodium", elem1: "stable_protactinium", elem2: "sodium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!neptunium_tetrafluoride", react2: "chemical!potassium", elem1: "stable_protactinium", elem2: "potassium_fluoride", props: { tempMin: 200 }, priority: 100 },

  { react1: "chemical!neptunium_hexafluoride", react2: "chemical!hydrogen", elem1: "neptunium_tetrafluoride", elem2: "hydrogen_fluoride", priority: 100 },
  { react1: "chemical!neptunium_hexafluoride", react2: "chemical!liquid_water", elem1: "neptunium_tetrafluoride", elem2: "hydrofluoric_acid", priority: 100 },

  //Pu

  { react1: "chemical!plutonium", react2: "chemical!liquid_water,ignore!dirty_water", elem1: "no_change", elem2: "dirty_water", priority: 10 },

  { react1: "chemical!pure_mixed_plutonium", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: plutonium, temp1: 100 }, priority: 100 },
  { react1: "chemical!pure_plutonium_239", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: plutonium, temp1: 150 }, priority: 100 },
  { react1: "chemical!pure_plutonium_242", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: depletedPlutonium, temp1: 25 }, priority: 100 },

  { react1: "chemical!mixed_plutonium_dioxide", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: plutoniumDioxide, temp1: 25 }, priority: 100 },
  { react1: "chemical!plutonium_239_dioxide", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: plutoniumDioxide, temp1: 50 }, priority: 100 },

  { react1: "chemical!plutonium", react2: "chemical!oxygen", elem1: "chemical!plutonium_dioxide,react1restrict!isotope,state!solid,one!", elem2: null, props: { chance: 0.1 }, priority: 100 },

  { react1: "chemical!plutonium_dioxide", react2: "chemical!magnesium", elem1: "chemical!plutonium,react1restrict!isotope,state!solid,one!", elem2: "magnesium_oxide", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!plutonium_dioxide", react2: "chemical!calcium", elem1: "chemical!plutonium,react1restrict!isotope,state!solid,one!", elem2: "quicklime", props: { tempMin: 500 }, priority: 100 },

  { react1: "chemical!plutonium_dioxide", react2: "chemical!hydrogen_fluoride", elem1: "chemical!plutonium_tetrafluoride,react1restrict!isotope,state!solid,one!", elem2: "fire", priority: 100 },
  { react1: "chemical!plutonium_tetrafluoride", react2: "chemical!fluorine", elem1: ["fire", "fire", "fire", "fire", "chemical!plutonium_hexafluoride,react1restrict!isotope,state!solid,one!"], elem2: "fire", priority: 100 },
  { react1: "chemical!plutonium_tetrafluoride", react2: "chemical!foof", elem1: "chemical!plutonium_hexafluoride,react1restrict!isotope,state!solid,one!", elem2: "oxygen", priority: 100 },

  { react1: "chemical!plutonium_tetrafluoride", react2: "chemical!magnesium", elem1: "chemical!plutonium,react1restrict!isotope,state!solid,one!", elem2: "magnesium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!plutonium_tetrafluoride", react2: "chemical!calcium", elem1: "chemical!plutonium,react1restrict!isotope,state!solid,one!", elem2: "fluorite", props: { tempMin: 500 }, priority: 100 },
  { react1: "chemical!plutonium_tetrafluoride", react2: "chemical!sodium", elem1: "chemical!plutonium,react1restrict!isotope,state!solid,one!", elem2: "sodium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!plutonium_tetrafluoride", react2: "chemical!potassium", elem1: "chemical!plutonium,react1restrict!isotope,state!solid,one!", elem2: "potassium_fluoride", props: { tempMin: 200 }, priority: 100 },

  { react1: "chemical!plutonium_hexafluoride", react2: "chemical!hydrogen", elem1: "chemical!plutonium_tetrafluoride,react1restrict!isotope,state!solid,one!", elem2: "hydrogen_fluoride", priority: 100 },
  { react1: "chemical!plutonium_hexafluoride", react2: "chemical!liquid_water", elem1: "chemical!plutonium_tetrafluoride,react1restrict!isotope,state!solid,one!", elem2: "hydrofluoric_acid", priority: 100 },

  //Am
  { react1: "chemical!americium", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: americium, temp1: 150 }, priority: 100 },
  //Cm
  { react1: "chemical!curium", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: curium, temp1: 150 }, priority: 100 },
  //Bk
  { react1: "chemical!berkelium", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: berkelium, temp1: 150 }, priority: 100 },
  //Cf
  { react1: "chemical!californium", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: californium, temp1: 150 }, priority: 100 },
  //Es
  { react1: "chemical!einsteinium", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: einsteinium, temp1: 175 }, priority: 100 },
  //Fm
  { react1: "chemical!fermium", react2: "neutron", elem1: "no_change", elem2: "no_change", props: { func: fermium, temp1: 175 }, priority: 100 },

  //Cn
  { react1: "chemical!uranium,ignorechemical!pure_stable_uranium", react2: "chemical!calcium", elem1: "copernicium", elem2: null, props: { chance: 0.01, tempMin: 10000 }, priority: 100 },

  { react1: "chemical!copernicium", react2: "neutron", elem1: "nihonium", elem2: null, props: { chance: 0.1 }, priority: 100 },

  { react1: "chemical!stable_copernicium", react2: "chemical!oxygen", elem1: "copernicium_dioxide", elem2: null, props: { chance: 0.01, tempMin: 67, tempMax: 300 }, priority: 100 },
  { react1: "chemical!stable_copernicium", react2: "chemical!sulfur", elem1: "copernicium_sulfide", elem2: null, props: { tempMin: 115.21, tempMax: 421 }, priority: 100 },
  { react1: "chemical!copernicium_dioxide", react2: "chemical!fluorine", elem1: "copernicium_tetrafluoride", elem2: "fire", priority: 100 },

  { react1: "chemical!copernicium_tetrafluoride", react2: "chemical!liquid_water", elem1: "stable_copernicium", elem2: "hydrofluoric_acid", priority: 100 },

  //Nh
  { react1: "chemical!neptunium", react2: "chemical!calcium", elem1: "nihonium", elem2: null, props: { chance: 0.01, tempMin: 10000 }, priority: 100 },

  { react1: "chemical!nihonium", react2: "neutron", elem1: "flerovium", elem2: null, props: { chance: 0.1 }, priority: 100 },

  { react1: "chemical!stable_nihonium", react2: "chemical!stable_francium", elem1: "francium_nihonide", elem2: null, props: { tempMin: 50 }, priority: 100 },
  { react1: "chemical!stable_nihonium", react2: "chemical!nitric_acid", elem1: "nihonium_nitrate_solution", elem2: "nitrogen_dioxide", priority: 100 },
  { react1: "chemical!stable_nihonium", react2: "chemical!sulfuric_acid", elem1: "nihonium_sulfate_solution", elem2: "hydrogen", props: { temp1: 50, temp2: 50 }, priority: 100 },

  { react1: "chemical!nihonium_oxide", react2: "chemical!liquid_water", elem1: "nihonium_hydroxide", elem2: null, priority: 100 },
  { react1: "chemical!francium_nihonide", react2: "chemical!liquid_water", elem1: ["nihonium_hydroxide", "francium_hydroxide"], elem2: "hydrogen", priority: 10 },

  { react1: "chemical!nihonium_oxide", react2: "chemical!carbon", elem1: "stable_nihonium", elem2: "carbon_dioxide", props: { tempMin: 567 }, priority: 100 },

  { react1: "chemical!nihonium_i,restrictchemical!water", react2: "chemical!bases,restrictchemical!hydroxide", elem1: "chemical!liquid_salt_water,react1restrict!anion,react2restrict!cationBase,one!", elem2: "nihonium_hydroxide", priority: 20 },

  //Fl
  { react1: "chemical!plutonium,ignorechemical!pure_stable_uranium", react2: "chemical!calcium", elem1: "flerovium", elem2: null, props: { chance: 0.01, tempMin: 10000 }, priority: 100 },

  { react1: "chemical!flerovium", react2: "neutron", elem1: "moscovium", elem2: null, props: { chance: 0.1 }, priority: 100 },

  { react1: "chemical!flerovium", react2: "chemical!sulfur", elem1: "flerovium_sulfide", elem2: null, props: { tempMin: 115.21 }, priority: 100 },
  { react1: "chemical!flerovium_oxide", react2: "chemical!carbon", elem1: "stable_flerovium", elem2: "carbon_dioxide", props: { tempMin: 1120 }, priority: 100 },

  //Mc
  { react1: "chemical!americium", react2: "chemical!calcium", elem1: "moscovium", elem2: null, props: { chance: 0.01, tempMin: 10000 }, priority: 100 },

  { react1: "chemical!moscovium", react2: "neutron", elem1: "livermorium", elem2: null, props: { chance: 0.1 }, priority: 100 },

  { react1: "chemical!stable_moscovium", react2: "chemical!hydrogen_fluoride", elem1: "moscovium_fluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!moscovium_hydroxide", react2: "chemical!hydrogen_fluoride", elem1: "moscovium_fluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!stable_moscovium", react2: "chemical!liquid_water", elem1: "moscovium_hydroxide_solution", elem2: "hydrogen", props: { chance: 0.05, temp1: 100, temp2: 100 }, priority: 10 },

  { react1: "chemical!moscovium_fluoride", react2: "chemical!magnesium", elem1: "stable_moscovium", elem2: "magnesium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!moscovium_fluoride", react2: "chemical!calcium", elem1: "stable_moscovium", elem2: "fluorite", props: { tempMin: 500 }, priority: 100 },
  { react1: "chemical!moscovium_fluoride", react2: "chemical!sodium", elem1: "stable_moscovium", elem2: "sodium_fluoride", props: { tempMin: 200 }, priority: 100 },
  { react1: "chemical!moscovium_fluoride", react2: "chemical!potassium", elem1: "stable_moscovium", elem2: "potassium_fluoride", props: { tempMin: 200 }, priority: 100 },

  //Lv

  { react1: "chemical!curium", react2: "chemical!calcium", elem1: "livermorium", elem2: null, props: { chance: 0.01, tempMin: 10000 }, priority: 100 },

  { react1: "chemical!livermorium", react2: "neutron", elem1: "tennessine", elem2: null, props: { chance: 0.1 }, priority: 100 },

  { react1: "chemical!livermorium", react2: "chemical!oxygen", elem1: "livermorium_oxide", elem2: "fire", props: { tempMin: 300 }, priority: 100 },
  { react1: "chemical!livermorium_oxide", react2: "chemical!carbon", elem1: "stable_livermorium", elem2: "carbon_dioxide", props: { tempMin: 730 }, priority: 100 },

  //Ts

  { react1: "chemical!berkelium", react2: "chemical!calcium", elem1: "tennessine", elem2: null, props: { chance: 0.01, tempMin: 10000 }, priority: 100 },

  { react1: "chemical!tennessine", react2: "neutron", elem1: "oganesson", elem2: null, props: { chance: 0.1 }, priority: 100 },

  { react1: "chemical!stable_tennessine", react2: "chemical!hydrogen_fluoride", elem1: "tennessine_monofluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!tennessine_monofluoride", react2: "chemical!fluorine", elem1: "tennessine_trifluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!tennessine_trifluoride", react2: "chemical!liquid_water", elem1: "tennessine_monofluoride", elem2: "hydrofluoric_acid", priority: 10 },

  //Og

  { react1: "chemical!californium", react2: "chemical!calcium", elem1: "oganesson", elem2: null, props: { chance: 0.01, tempMin: 10000 }, priority: 100 },

  { react1: "chemical!stable_oganesson", react2: "chemical!hydrogen_fluoride", elem1: "oganesson_difluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!oganesson_difluoride", react2: "chemical!fluorine", elem1: "oganesson_tetrafluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!oganesson_tetrafluoride", react2: "chemical!liquid_water", elem1: "oganesson_difluoride", elem2: "hydrofluoric_acid", priority: 10 },

  { react1: "chemical!stable_oganesson", react2: "chemical!tennessine_trifluoride", elem1: "oganesson_tetrafluoride", elem2: "oganesson_tetratennesside", priority: 100 },
  { react1: "chemical!oganesson_difluoride", react2: "chemical!tennessine_trifluoride", elem1: "oganesson_tetrafluoride", elem2: "oganesson_tetratennesside", priority: 100 },

  //Uue

  { react1: "chemical!einsteinium", react2: "chemical!calcium", elem1: "ununennium", elem2: null, props: { chance: 0.01, tempMin: 10000 }, priority: 100 },

  { react1: "chemical!ununennium", react2: "rad_steam", elem1: "n_explosion", elem2: null, priority: 100 },
  { react1: "chemical!ununennium", react2: "steam", elem1: "n_explosion", elem2: null, priority: 100 },
  { react1: "chemical!ununennium", react2: "chemical!liquid_water", elem1: "n_explosion", elem2: null, priority: 10 },

  { react1: "chemical!stable_ununennium", react2: "rad_steam", elem1: "ununennium_hydroxide", elem2: [null, null, "explosion"], props: { func: ununenniumHydroxide }, priority: 100 },
  { react1: "chemical!stable_ununennium", react2: "steam", elem1: "ununennium_hydroxide", elem2: [null, null, "explosion"], props: { func: ununenniumHydroxide }, priority: 100 },
  { react1: "chemical!stable_ununennium", react2: "chemical!liquid_water", elem1: "ununennium_hydroxide", elem2: [null, null, "explosion"], props: { func: ununenniumHydroxide }, priority: 10 },
  { react1: "chemical!ununennium_hydroxide,ignorechemical!ununennium_hydroxide_solution", react2: "chemical!liquid_water", elem1: "ununennium_hydroxide", elem2: null, priority: 10 },

  { react1: "chemical!ununennium_fluoride", react2: "chemical!fluorine", elem1: "ununennium_trifluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!ununennium_trifluoride", react2: "chemical!foof", elem1: "ununennium_pentafluoride", elem2: "oxygen", priority: 100 },
  { react1: "chemical!ununennium_trifluoride", react2: "chemical!liquid_water", elem1: "ununennium_fluoride", elem2: "hydrofluoric_acid", priority: 10 },
  { react1: "chemical!ununennium_pentafluoride", react2: "chemical!liquid_water", elem1: "ununennium_trifluoride", elem2: "hydrofluoric_acid", priority: 10 },

  //Ubn

  { react1: "chemical!fermium", react2: "chemical!calcium", elem1: "unbinilium", elem2: null, props: { chance: 0.01, tempMin: 10000 }, priority: 100 },

  { react1: "chemical!stable_unbinilium", react2: "chemical!liquid_water", elem1: ["unbinilium_hydroxide", "pop"], elem2: ["hydrogen", "bubble"], props: { chance: 0.05, temp2: 350 }, priority: 100 },
  { react1: "chemical!unbinilium_oxide", react2: "chemical!liquid_water", elem1: "unbinilium_hydroxide", elem2: null, props: { chance: 0.01 }, priority: 100 },

  { react1: "chemical!unbinilium_difluoride", react2: "chemical!fluorine", elem1: "unbinilium_tetrafluoride", elem2: "fire", priority: 100 },
  { react1: "chemical!unbinilium_tetrafluoride", react2: "chemical!foof", elem1: "unbinilium_hexafluoride", elem2: "oxygen", priority: 100 },
  { react1: "chemical!unbinilium_tetrafluoride", react2: "chemical!liquid_water", elem1: "unbinilium_difluoride", elem2: "hydrofluoric_acid", priority: 10 },
  { react1: "chemical!unbinilium_hexafluoride", react2: "chemical!liquid_water", elem1: "unbinilium_tetrafluoride", elem2: "hydrofluoric_acid", priority: 10 },

  //Magic
  { react1: "bless", react2: "chemical!neutronium", elem1: "no_change", elem2: "neutron", priority: 100 },
  { react1: "bless", react2: "chemical!diborane", elem1: "no_change", elem2: "hydrogen", priority: 100 },
  { react1: "bless", react2: "chemical!pentaborane_9", elem1: "no_change", elem2: "hydrogen", priority: 100 },
  { react1: "bless", react2: "chemical!decaborane", elem1: "no_change", elem2: "hydrogen", priority: 100 },
  { react1: "bless", react2: "chemical!fluorine", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!hydrogen_fluoride", elem1: "no_change", elem2: "hydrogen", priority: 100 },
  { react1: "bless", react2: "chemical!sodium_hydride", elem1: "no_change", elem2: "hydrogen", priority: 100 },
  { react1: "bless", react2: "chemical!sodium_borohydride", elem1: "no_change", elem2: "hydrogen", priority: 99 },
  { react1: "bless", react2: "chemical!sodium_borohydride_solution", elem1: "no_change", elem2: "water", priority: 100 },
  { react1: "bless", react2: "chemical!foof", elem1: "no_change", elem2: "oxygen", priority: 100 },
  { react1: "bless", react2: "chemical!hydrogen_sulfide", elem1: "no_change", elem2: "hydrogen", priority: 100 },
  { react1: "bless", react2: "chemical!sulfur_dioxide", elem1: "no_change", elem2: "oxygen", priority: 100 },
  { react1: "bless", react2: "chemical!ammonium_perchlorate", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!bromine", elem1: "no_change", elem2: [null, null, null, "soy_sauce"], priority: 100 },
  { react1: "bless", react2: "chemical!polonium", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!astatine", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!radon", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!francium", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!radium", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!actinium", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!thorium,ignorechemical!stable_thorium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!thorium_dioxide,ignorechemical!stable_thorium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!thorium_tetrafluoride,ignorechemical!stable_thorium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!protactinium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!protactinium_v_fluoride", elem1: "no_change", elem2: "stable_protactinium", priority: 100 },
  { react1: "bless", react2: "chemical!uranium,ignorechemical!stable_uranium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!uraninite", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!yellowcake", elem1: "no_change", elem2: ["rock", "rock", "rock", "baked_batter"], priority: 100 },
  { react1: "bless", react2: "chemical!yellowcake_solution", elem1: "no_change", elem2: ["rock", "rock", "rock", "baked_batter", "hydrogen", "hydrogen", "hydrogen", "hydrogen"], priority: 100 },
  { react1: "bless", react2: "chemical!uranium_dioxide,ignorechemical!stable_uranium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!uranium_tetrafluoride,ignorechemical!stable_uranium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!uranium_hexafluoride", elem1: "no_change", elem2: "rock", priority: 99 },
  { react1: "bless", react2: "chemical!stable_uranium_hexafluoride", elem1: "no_change", elem2: "stable_uranium", priority: 100 },
  { react1: "bless", react2: "chemical!neptunium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!neptunium_tetrafluoride", elem1: "no_change", elem2: "stable_neptunium", priority: 100 },
  { react1: "bless", react2: "chemical!plutonium,ignorechemical!stable_plutonium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!plutonium_dioxide,ignorechemical!stable_plutonium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!plutonium_tetrafluoride,ignorechemical!stable_plutonium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!plutonium_hexafluoride", elem1: "no_change", elem2: "rock", priority: 99 },
  { react1: "bless", react2: "chemical!stable_plutonium_hexafluoride", elem1: "no_change", elem2: "stable_plutonium", priority: 100 },
  { react1: "bless", react2: "chemical!americium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!curium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!berkelium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!californium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!einsteinium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!fermium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!copernicium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!nihonium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!francium_nihonide", elem1: "no_change", elem2: "stable_nihonium", priority: 100 },
  { react1: "bless", react2: "chemical!flerovium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!moscovium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!livermorium", elem1: "no_change", elem2: "rock", priority: 100 },
  { react1: "bless", react2: "chemical!tennessine", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!stable_tennessine", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!tennessine_monofluoride", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!tennessine_trifluoride", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!oganesson", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!oganesson_difluoride", elem1: "no_change", elem2: "stable_oganesson", priority: 100 },
  { react1: "bless", react2: "chemical!oganesson_tetrafluoride", elem1: "no_change", elem2: "stable_oganesson", priority: 100 },
  { react1: "bless", react2: "chemical!oganesson_tetratennesside", elem1: "no_change", elem2: "stable_oganesson", priority: 100 },
  { react1: "bless", react2: "chemical!ununennium", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!stable_ununennium", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!ununennium_trifluoride", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!ununennium_pentafluoride", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!unbinilium", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!unbinilium_tetrafluoride", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!unbinilium_hexafluoride", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!quark_matter", elem1: "no_change", elem2: "neutron", priority: 100 },
  { react1: "bless", react2: "chemical!caustic", elem1: "no_change", elem2: "hydrogen", priority: 100 },

  { react1: "bless", react2: "chemical!rad_pop", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!big_explosion", elem1: "no_change", elem2: null, priority: 100 },
  { react1: "bless", react2: "chemical!gamma_ray_burst", elem1: "no_change", elem2: null, priority: 100 },
];

function createChemicals() {
  for (let i in chemjsChemicals) {
    createChemical(i, chemjsChemicals[i]);
  }
}
function cleanChemicals() {
  for (let i in chemjsChemicals) {
    if (chemjsChemicals[i].causticIgnore) {
      chemjsChemicals.caustic_ignore.elementNames.push("chemical!" + i);
    }
    if (chemjsChemicals[i].ignorable) {
      chemjsChemicals.ignorable.elementNames.push("chemical!" + i);
    }
    if (chemjsChemicals[i].categories) {
      for (let j = 0; j < chemjsChemicals[i].categories.length; j++) {
        chemjsChemicals[chemjsChemicals[i].categories[j]].elementNames.push("chemical!" + i);
      }
    }
  }
  let changed = true;
  while (changed) {
    changed = false;
    for (let i in chemjsChemicals) {
      let value = parseReactStringArr(chemjsChemicals[i].elementNames);
      chemjsChemicals[i].elementNames = value.value;
      changed = changed || value.changed;
    }
  }
  for (let i in chemjsChemicals) {
    chemjsChemicals[i].elementNames = [...new Set(chemjsChemicals[i].elementNames)];
    if (chemjsChemicals[i].reactionProduct) {
      for (let j = 0; j < chemjsChemicals[i].elementNames.length; j++) {
        if (!elements[chemjsChemicals[i].elementNames[j]].reactionProduct) {
          elements[chemjsChemicals[i].elementNames[j]].reactionProduct = Object.assign({}, chemjsChemicals[i].reactionProduct);
        } else {
          elements[chemjsChemicals[i].elementNames[j]].reactionProduct = Object.assign({}, elements[chemjsChemicals[i].elementNames[j]].reactionProduct, chemjsChemicals[i].reactionProduct);
        }
      }
    }
    if (chemjsChemicals[i].toxic) {
      toxic("chemical!" + i, ...chemjsChemicals[i].toxic);
    }

    if (chemjsChemicals[i].ignore && chemjsChemicals[i].ignore.length > 0) {
      for (let j = 0; j < chemjsChemicals[i].elementNames.length; j++) {
        if (!elements[chemjsChemicals[i].elementNames[j]].ignore) {
          elements[chemjsChemicals[i].elementNames[j]].ignore = [];
        }
        elements[chemjsChemicals[i].elementNames[j]].ignore = elements[chemjsChemicals[i].elementNames[j]].ignore.concat(parseReactStringValue(chemjsChemicals[i].ignore));
      }
    }
  }
}

function isCleaned(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf("!") > -1 || arr[i].indexOf(",") > -1) {
      return false;
    }
  }
  return true;
}

function parseReactString(input, props = {}) {
  let str = input.split(",");
  let result = [];
  let changed = false;
  for (let i = 0; i < str.length; i++) {
    let str2 = str[i].split("!");
    if (str2[0] === "chemical" && chemjsChemicals[str2[1]]) {
      if (isCleaned(chemjsChemicals[str2[1]].elementNames)) {
        result.push(...chemjsChemicals[str2[1]].elementNames);
        changed = true;
      } else {
        return { value: input, changed: false };
      }
    } else if (str2[0] === "ignore") {
      result = result.filter((x) => x != str2[1]);
      changed = true;
    } else if (str2[0] === "ignorechemical") {
      if (isCleaned(chemjsChemicals[str2[1]].elementNames)) {
        result = result.filter((x) => !chemjsChemicals[str2[1]].elementNames.includes(x));
        changed = true;
      } else {
        return { value: input, changed: false };
      }
    } else if (str2[0] === "restrictchemical") {
      if (isCleaned(chemjsChemicals[str2[1]].elementNames)) {
        result = result.filter((x) => chemjsChemicals[str2[1]].elementNames.includes(x));
        changed = true;
      } else {
        return { value: input, changed: false };
      }
    } else if (str2[0] === "state") {
      result = result.filter((x) => elements[x].state === str2[1]);
      changed = true;
    } else if (str2[0] === "react1") {
      if (elements[props.react1].reactionProduct) {
        result.push(elements[props.react1].reactionProduct[str2[1]]);
        changed = true;
      } else {
        return { value: "unknown", changed: true };
      }
    } else if (str2[0] === "react2") {
      if (elements[props.react2].reactionProduct) {
        result.push(elements[props.react2].reactionProduct[str2[1]]);
        changed = true;
      } else {
        return { value: "unknown", changed: true };
      }
    } else if (str2[0] === "react1restrict") {
      if (elements[props.react1].reactionProduct) {
        let restrict = elements[props.react1].reactionProduct[str2[1]];
        result = result.filter((x) => chemjsChemicals[restrict].elementNames.includes(x));
        changed = true;
      } else {
        return { value: "unknown", changed: true };
      }
    } else if (str2[0] === "react2restrict") {
      if (elements[props.react2].reactionProduct) {
        let restrict = elements[props.react2].reactionProduct[str2[1]];
        result = result.filter((x) => chemjsChemicals[restrict].elementNames.includes(x));
        changed = true;
      } else {
        return { value: "unknown", changed: true };
      }
    } else if (str2[0] === "one") {
      if (result.length !== 1) {
        return { value: "unknown", changed: true };
      }
    } else {
      result.push(str[i]);
    }
    if (i > 0) {
      changed = true;
    }
  }
  return { value: result, changed: changed };
}

function parseReactStringArr(arr, props = {}) {
  let result = [];
  let changed = false;
  for (let i = 0; i < arr.length; i++) {
    let value = { value: null, changed: false };
    if (arr[i] !== null) {
      value = parseReactString(arr[i], props);
    }
    changed = changed || value.changed;
    result = result.concat(value.value);
  }
  return { value: result, changed: changed };
}

function parseReactStringValue(arr, props = {}) {
  return parseReactStringArr(arr, props).value;
}

function reactChemicals() {
  chemjsReactions.sort((x, y) => -(x.priority - y.priority));
  for (let i = 0; i < chemjsReactions.length; i++) {
    let reaction = Object.assign({}, chemjsReactions[i]);
    reaction.react1 = parseReactString(reaction.react1).value;
    reaction.react2 = parseReactString(reaction.react2).value;
    reactList(reaction.react1, reaction.react2, reaction);
  }
  for (let i = 0; i < deleteReactions.length; i++) {
    if (elements[deleteReactions[i][0]].reactions) {
      delete elements[deleteReactions[i][0]].reactions[[deleteReactions[i][1]]];
    }
    if (elements[deleteReactions[i][1]].reactions) {
      delete elements[deleteReactions[i][1]].reactions[[deleteReactions[i][0]]];
    }
  }
  for (let i in elements) {
    elements[i].ignore = [...new Set(elements[i].ignore)];
    elements[i].ignore = elements[i].ignore.filter((x) => x !== null);
  }
}
runAfterLoad(createChemicals);
runAfterAutogen(cleanChemicals);
runAfterAutogen(reactChemicals);

eLists.STAINLESS = ["polytetrafluoroethylene"];
