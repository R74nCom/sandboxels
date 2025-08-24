// for pasting schematics (mostly logic gates)
// created by SquareScreamYT/sq
// https://github.com/SquareScreamYT/
// https://youtube.com/@sqec

elems = {
  e: "ecloner", // ecloner with flash at -250c
  E: "ecloner", // ecloner with flash at 20c
  c: "cloner", // cloner with flash at -250c
  C: "cloner", // cloner with flash at 20c
  l: "ecloner", // ecloner with sand
  L: "ecloner", // ecloner with liquid light
  A: "ecloner", // cloner with antifluid
  a: "ecloner", // cloner with antipowder
  p: "porcelain",
  W: "water",
  w: "wall",
  m: "meat",
  b: "battery",
  f: "flash",
  s: "sensor",
  x: "wire",
  F: "fuse",
  v: "void",
  R: "led_r",
  G: "led_g",
  B: "led_b",
}

schematics = {

not_gate_1: `
C e
 b
 m
 x
`,

not_gate_2: `
CeC

pWp
wsw
`,

or_gate: `
E E
 s
`,

and_gate: `
Ce eC

pWwWp
wsxsw
 CeC

 pWp
 wsw
`,

nand_gate: `
Ce eC

pWwWp
wsxsw
`,

nor_gate: `
Ce eC

pWwWp
wsxsw
 CeC

 pWp
 wsw
`,

xor_gate: `
w   x x   w
 xxxe exxx
 xC     Cx
 x pWwWp x
 x wsxsw x
Ce ex xe eC
     C
pWwWp pWwWp
wsxsx xsxsw
   Ce eC

   pWwWp
   wsxsw
`,

xnor_gate: `
w   x x   w
 xxxe exxx
 xC     Cx
 x pWwWp x
 x wsxsw x
Ce ex xe eC
     C
pWwWp pWwWp
wsxsx xsxsw
   Ce eC

   pWwWp
   wsxsw
    CeC

    pWp
    wsw
`,

intersection_tl: `
wlww
A  s
w vw
wsww
`,

intersection_tr: `
wwlw
s  A
wv w
wwsw
`,

intersection_bl: `
wsww
w vw
L  s
waww
`,

intersection_br: `
wwsw
wv w
s  L
wwaw
`,

}

function pasteSchematic(pattern, startX, startY) {
  const lines = pattern.trim().split('\n');
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const char = lines[y][x];
      if (char !== ' ' && elems[char]) {
        const pixelX = startX + x;
        const pixelY = startY + y;
        if (isEmpty(pixelX, pixelY)) {
          createPixel(elems[char], pixelX, pixelY);
          if (char.toLowerCase() == "e" || char.toLowerCase() == "c") {
            pixelMap[pixelX][pixelY].clone = "flash"
            if (char.toLowerCase() == char) {
              pixelMap[pixelX][pixelY].temp = -250
            }
          } else if (char.toLowerCase() == "l" || char.toLowerCase() == "a") {
            if (char == "a") {
              pixelMap[pixelX][pixelY].clone = "antipowder"
            } else if (char == "A") {
              pixelMap[pixelX][pixelY].clone = "antifluid"
            } else if (char == "L") {
              pixelMap[pixelX][pixelY].clone = "liquid_light"
              pixelMap[pixelX][pixelY].temp = -273.15
            } else if (char == "l") {
              pixelMap[pixelX][pixelY].clone = "sand"
            }
          }
        }
      }
    }
  }
}

for (schematic in schematics) {
  elements[schematic] = {
    category: "schematics",
    color: "#888888",
    behavior: behaviors.WALL,
    state: "solid",
    maxSize: 1,
    onSelect: (function(pattern) {
      return function() {
        const lines = pattern.trim().split('\n');
        let pixelCount = 0;
        const height = lines.length;
        const width = Math.max(...lines.map(line => line.length));
        for (let y = 0; y < lines.length; y++) {
          for (let x = 0; x < lines[y].length; x++) {
            const char = lines[y][x];
            if (char !== ' ' && elems[char]) {
              pixelCount++;
            }
          }
        }
        logMessage(pixelCount + " pixels, " + width + "x" + height);
      }
    })(schematics[schematic]),
    tick: (function(pattern) {
      return function(pixel) {
        deletePixel(pixel.x, pixel.y);
        pasteSchematic(pattern, pixel.x, pixel.y);
      }
    })(schematics[schematic]),
    excludeRandom: true
  }
}