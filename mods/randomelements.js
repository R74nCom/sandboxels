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
    sand: ["#cccccc", "#dddddd", "#eeeeee", "#ffffff", "#eeeeee"],
    dust: ["#aaaaaa", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee"],
    rock: ["#777777", "#888888", "#999999", "#aaaaaa", "#bbbbbb"],
    lava: ["#ff4400", "#ff5511", "#ff6622", "#ff7733", "#ff8844"],
    ice: ["#66cccc", "#77dddd", "#88eeee", "#99ffff", "#aaffff"],
    vapor: ["#ffffff", "#eeeeee", "#dddddd", "#cccccc", "#bbbbbb"],
    ash: ["#cccccc", "#dddddd", "#eeeeee", "#ffffff", "#eeeeee"],
    soot: ["#333333", "#444444", "#555555", "#666666", "#777777"],
    sludge: ["#886633", "#997733", "#a98844", "#bb9944", "#ccaa55"]
  };
  

const adjectiveStates = {
  shiny: "solid",
  glowing: "gas",
  dark: "solid",
  bright: "gas",
  heavy: "solid",
  light: "gas",
  hot: "solid",
  cold: "solid",
  hard: "solid",
  soft: "liquid",
  smooth: "liquid",
  rough: "solid",
  round: "liquid",
  sharp: "solid",
  sweet: "liquid",
  sour: "liquid",
  bitter: "liquid",
  salty: "solid",
  savory: "liquid"
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

// Generate elements 
for (const name of elementNames) {

    const [adjective, noun] = name.split("_");
  
    const baseColor = nounColors[noun];

    const {tempLow, tempHigh} = nounTemperatures[noun];

    let temp = Math.random() * (tempHigh - tempLow) + tempLow;

    if (adjective === "hot") {
      temp *= 1.5; 
    } else if (adjective === "cold") {
      temp /= 2;
    }

  elements[name] = {
    color: baseColor,
    behavior: nounBehaviors[noun], 
    category: "random elements",
    state: adjectiveStates[adjective],
    temp: temp,
    density: Math.random() * 100,
    viscosity: Math.random() * 100
  };

}
