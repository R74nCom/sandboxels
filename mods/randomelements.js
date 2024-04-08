const adjectives = ["shiny", "glowing", "dark", "bright", "heavy", "light", "hot", "cold", "hard", "soft", "smooth", "rough", "round", "sharp", "sweet", "sour", "bitter", "salty", "savory"];

const nouns = ["metal", "crystal", "stone", "powder", "liquid", "gas", "plasma", "slime", "sand", "dust", "rock", "lava", "ice", "vapor", "ash", "soot", "sludge"];

const elementNames = [];

while (elementNames.length < 300) {

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  const name = `${adjective}_${noun}`;
  
  if (!elementNames.includes(name)) {
    elementNames.push(name);
  }
}

const nounTemperatures = {
    metal: {tempLow: 1000, tempHigh: 1800},
  crystal: {tempLow: 500, tempHigh: 1000},
  stone: {tempLow: 600, tempHigh: 1200},  
  powder: {tempLow: 100, tempHigh: 500},
  liquid: {tempLow: -100, tempHigh: 100},
  gas: {tempLow: -200, tempHigh: -100},
  plasma: {tempLow: 8000, tempHigh: 20000},
  slime: {tempLow: -10, tempHigh: 30},
  sand: {tempLow: 100, tempHigh: 500},
  dust: {tempLow: 50, tempHigh: 200},
  rock: {tempLow: 500, tempHigh: 1000},
  lava: {tempLow: 700, tempHigh: 1200},
  ice: {tempLow: -50, tempHigh: 0},
  vapor: {tempLow: -50, tempHigh: 100},
  ash: {tempLow: 200, tempHigh: 500},
  soot: {tempLow: 200, tempHigh: 500},
  sludge: {tempLow: -10, tempHigh: 100}
  }
  
  const nounColors = {
    metal: ["#999999", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee"],
    crystal: ["#77ffff", "#88eeff", "#99ddff", "#aaccff", "#bbbbff"],
    stone: ["#888888", "#999999", "#aaaaaa", "#bbbbbb", "#cccccc"],
    powder: ["#eeeeee", "#ffffff", "#dddddd", "#cccccc", "#bbbbbb"], 
    liquid: ["#336699", "#4477aa", "#5588bb", "#6699cc", "#77aadd"],
    gas: ["#ffffff", "#eeeeee", "#dddddd", "#cccccc", "#bbbbbb"],
    plasma: ["#ff9966", "#ffaa77", "#ffbb88", "#ffcc99", "#ffddaa"],
    slime: ["#88cc88", "#99dd99", "#aaddaa", "#bbeebb", "#ccffcc"],
    sand: ["#D2B48C", "#E8D5A9", "#F0E3C4", "#DCD0BF", "#EBE4D6"],
    dust: ["#aaaaaa", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee"],
    rock: ["#777777", "#888888", "#999999", "#aaaaaa", "#bbbbbb"],
    lava: ["#ff4400", "#ff5511", "#ff6622", "#ff7733", "#ff8844"],
    ice: ["#66cccc", "#77dddd", "#88eeee", "#99ffff", "#aaffff"],
    vapor: ["#ffffff", "#eeeeee", "#dddddd", "#cccccc", "#bbbbbb"],
    ash: ["#cccccc", "#dddddd", "#eeeeee", "#ffffff", "#eeeeee"],
    soot: ["#333333", "#444444", "#555555", "#666666", "#777777"],
    sludge: ["#886633", "#997733", "#a98844", "#bb9944", "#ccaa55"]
  };
  

  const nounStates = {
    metal: "solid",
    crystal: "solid",
    stone: "solid",
    powder: "liquid",
    liquid: "liquid",
    gas: "gas",
    plasma: "gas",
    slime: "liquid",
    sand: "liquid",
    dust: "liquid",
    rock: "solid",
    lava: "liquid",
    ice: "solid",
    vapor: "gas",
    ash: "liquid",
    soot: "liquid",
    sludge: "liquid"
};

// Map noun to behavior
const nounBehaviors = {
  metal: behaviors.WALL,
  crystal: behaviors.WALL,
  stone: behaviors.WALL,
  powder: behaviors.POWDER,
  liquid: behaviors.LIQUID, 
  gas: behaviors.GAS,
  plasma: behaviors.GAS,
  slime: behaviors.LIQUID,
  sand: behaviors.POWDER,
  dust: behaviors.POWDER,
  rock: behaviors.WALL,
  lava: behaviors.LIQUID,
  ice: behaviors.WALL,
  vapor: behaviors.GAS,
  ash: behaviors.POWDER,
  soot: behaviors.POWDER,
  sludge: behaviors.LIQUID
};

const adjectiveBreakInto = {
  sweet: "sugar",
  salty: "salt",
};

const nounBreakInto = {
  crystal: "glass_shard",
  ice: "snow",
  rock: ["sand", "gravel"],
};

const adjectiveColorModifiers = {
  dark: 0.8, // darker
  shiny: 1.2, // brighter
  glowing: 1.5 // brightest
};

// Generate elements 
for (const name of elementNames) {

    const [adjective, noun] = name.split("_");
  
    let baseColor = nounColors[noun];

    const {tempLow, tempHigh} = nounTemperatures[noun];

    let temp = Math.random() * (tempHigh - tempLow) + tempLow;

    if (adjective === "hot") {
      temp *= 1.5; 
    } else if (adjective === "cold") {
      temp /= 2;
    }

    if (adjective in adjectiveColorModifiers) {
      const modifier = adjectiveColorModifiers[adjective];
      baseColor = modifyColor(baseColor, modifier); 
    }

  elements[name] = {
    color: baseColor,
    behavior: nounBehaviors[noun], 
    category: "random elements",
    state: nounStates[noun],
    temp: temp,
    breakInto: adjectiveBreakInto[adjective] || nounBreakInto[noun],
    density: Math.random() * 100,
    viscosity: Math.random() * 100
  };

  function modifyColor(color, modifier) {
    if (color[0] === '#') {
      color = color.slice(1);
    }

    color = String(color);

  // Check for '#' 
  const match = color.match(/^#?(.*)$/);
  if (match) {
    color = match[1]; 
  }
  
    // Convert to RGB
    let [r, g, b] = color.match(/.{1,2}/g).map(x => parseInt(x, 16));
  
    // Apply modifier 
    r = Math.round(r * modifier);
    g = Math.round(g * modifier); 
    b = Math.round(b * modifier);
  
    // Constrain RGB values to 0-255
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
  
    // Convert back to hex
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

}

/*
changelog only count importtant stuff and not the small details

0.1
added the mod

0.2
elements have breakInto's
elements with the adjectives "dark, shiny and glowing" are darker or brighter
elements with the nouns "crystal, ice, rock" can break into other elements like "glass_shard, snow, sand"
fixed some elements having wrong states

todo:
elements have reactions
gases dont have breakintos

what a silly little changelog! i made it literally right here!!
*/
