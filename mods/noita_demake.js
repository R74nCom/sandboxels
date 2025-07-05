// --- KEY STATE ---
var KA = false;
var KD = false;
var KW = false;
var KS = false;
var mouseX = 0;
var mouseY = 0;
var selectedSpell = 0;


keybinds["Digit1"] = function() {
    selectedSpell = 0;
};
keybinds["Digit2"] = function() {
    selectedSpell = 1;
};
keybinds["Digit3"] = function() {
    selectedSpell = 2;
};
keybinds["Digit4"] = function() {
    selectedSpell = 3;
};



document.addEventListener("keydown", function(e) {
    if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        KS = true;
    }
    const key = e.key;
    if (key >= "0" && key <= "9") {
        selectedSpell = key === "0" ? 9 : parseInt(key) - 1;
    }
    if (e.key === "a" || e.key === "A") KA = true;
    if (e.key === "d" || e.key === "D") KD = true;
    if (e.key === "w" || e.key === "W") KW = true;
    if (e.key === "s" || e.key === "S") KS = true;
});


document.addEventListener("keyup", function(e) {
    if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        KS = false;
    }
    if (e.key === "a" || e.key === "A") KA = false;
    if (e.key === "d" || e.key === "D") KD = false;
    if (e.key === "w" || e.key === "W") KW = false;
    if (e.key === "s" || e.key === "S") KS = false;
});

document.addEventListener("mousemove", function(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = Math.floor((e.clientX - rect.left) / pixelSize);
    mouseY = Math.floor((e.clientY - rect.top) / pixelSize);
});


// --- WIZARD BASE ---
elements.wizard = {
    color: "#5a00a0",
    behavior: behaviors.WALL,
    category: "noita",
    state: "solid",

    hardness: 1.2,
    conduct: 0.4,
    fireResistance: 25,
    burn: 100,
    burnTime: 150,
    burnInto: "ash",
    density: 2000,
    desc: "A magical being controlled with wasd. Dies easily.",

    tick: function(pixel) {

        if (typeof pixel.temp === "undefined") pixel.temp = 30;
        if (pixel.temp < 30) pixel.temp += 1;
        else if (pixel.temp > 30) pixel.temp -= 1;

        if (pixel.temp > 100) {
            pixel.hotTicks ??= 0;
            pixel.hotTicks++;
            if (pixel.hotTicks >= 60) {
                changePixel(pixel, "ash");
                return;
            }
        } else {
            pixel.hotTicks = 0;
        }

        if (pixel.hotTicks >= 30 && Math.random() < 0.2) {
            createPixel("smoke", pixel.x, pixel.y - 1);
        }

        let coldFactor = 1;
        if (pixel.temp < 0) {
            coldFactor = Math.max(0.02, Math.pow((pixel.temp + 100) / 100, 2));
        }


        if (typeof pixel.spellCooldown === "undefined") pixel.spellCooldown = 0;
        if (typeof pixel.wasQPressed === "undefined") pixel.wasQPressed = false;

        if (isNaN(pixel.vx)) pixel.vx = 0;
        if (isNaN(pixel.vy)) pixel.vy = 0;
        if (isNaN(pixel.frame)) pixel.frame = 0;
        pixel.frame++;

        const moveAccel = 0.2 * coldFactor;
        const maxV = 1 * coldFactor;

        if (KA) pixel.vx = -moveAccel;
        else if (KD) pixel.vx = moveAccel;
        else pixel.vx = 0;

        if (KW) pixel.vy = -1 * coldFactor;

        pixel.vy += 0.05;
        if (!KW && pixel.vy < 0) pixel.vy = 0;

        pixel.vx = Math.max(-maxV, Math.min(maxV, pixel.vx));
        pixel.vy = Math.max(-maxV, Math.min(maxV, pixel.vy));

        if (pixel.vx !== 0) tryMove(pixel, pixel.x + Math.sign(pixel.vx), pixel.y);
        if (pixel.vy !== 0 && pixel.frame % 2 === 0) tryMove(pixel, pixel.x, pixel.y + Math.sign(pixel.vy));
        if (!isEmpty(pixel.x, pixel.y + 1) && pixel.vy > 0) pixel.vy = 0;

        if (pixel.spellCooldown > 0) pixel.spellCooldown--;

        if (KS && !pixel.wasQPressed && pixel.spellCooldown === 0) {
            const spellFns = [
                // Magic Missile 1
                () => {
                    let dx = mouseX - pixel.x;
                    let dy = mouseY - (pixel.y - 2);
                    let mag = Math.sqrt(dx * dx + dy * dy) || 1;
                    dx /= mag;
                    dy /= mag;
                    let vx = dx * 2;
                    let vy = dy * 2;
                    let spawnX = pixel.x;
                    let spawnY = pixel.y - 2;
                    createPixel("nfirebolt", spawnX, spawnY);
                    let bolt = pixelMap[spawnX]?.[spawnY];
                    if (bolt) {
                        bolt.vx = vx;
                        bolt.vy = vy;
                    }
                },
                // Swipe 2
                () => {
                    for (let r = 6; r <= 8; r++) {
                        for (let a = 0; a < 360; a += 10) {
                            let angle = a * Math.PI / 180;
                            let x = Math.round(pixel.x + r * Math.cos(angle));
                            let y = Math.round(pixel.y + r * Math.sin(angle));
                            if (isEmpty(x, y)) createPixel("cold_fire", x, y);
                        }
                    }
                },
                // Shield 3
                () => {
                    for (let dx = -3; dx <= 3; dx++) {
                        for (let dy = -3; dy <= 3; dy++) {
                            if ((Math.abs(dx) === 3 || Math.abs(dy) === 3) && isEmpty(pixel.x + dx, pixel.y + dy)) {
                                createPixel("nmagicbarrier", pixel.x + dx, pixel.y + dy);
                            }
                        }
                    }
                },
                // Meteor 4
                () => {
                    if (isEmpty(pixel.x, pixel.y - 10)) {
                        createPixel("nbomb", pixel.x, pixel.y + 2);
                    }
                },
                // Rain 5
                () => {
                    createPixel("rain_call", pixel.x, pixel.y - 6);
                },
                // Bridge 6
                () => {
                    for (let y = 1; y <= 3; y++) {
                        if (isEmpty(pixel.x, pixel.y + y)) {
                            createPixel("dirt", pixel.x, pixel.y + y);
                        }
                    }
                },
                // Wisp 7
                () => {
                    createPixel("nwisp", pixel.x, pixel.y - 2);
                },
                // Growth Burst 8
                () => {
                    let growthOptions = ["plant", "grass", "seeds", "vine", "flower_seed", "sapling"];
                    for (let i = 0; i < 5; i++) {
                        let gx = pixel.x + Math.floor(Math.random() * 5 - 2);
                        let gy = pixel.y + Math.floor(Math.random() * 5 - 2);
                        if (isEmpty(gx, gy)) {
                            let pick = growthOptions[Math.floor(Math.random() * growthOptions.length)];
                            createPixel(pick, gx, gy);
                        }
                    }
                },
                // Obliteration Blink
                () => {
                    const dashLength = 20;
                    let dx = mouseX - pixel.x;
                    let dy = mouseY - pixel.y;
                    let mag = Math.sqrt(dx * dx + dy * dy) || 1;
                    dx = Math.round((dx / mag) * dashLength);
                    dy = Math.round((dy / mag) * dashLength);
                
                    let targetX = pixel.x + dx;
                    let targetY = pixel.y + dy;
                
                    // 💣 Step 1: Destroy 4x4 area around the wizard
                    for (let dx = -2; dx <= 1; dx++) {
                        for (let dy = -2; dy <= 1; dy++) {
                            let tx = pixel.x + dx;
                            let ty = pixel.y + dy;
                            if (!isEmpty(tx, ty) && pixelMap[tx][ty] !== pixel) {
                                deletePixel(tx, ty);
                            }
                        }
                    }
                
                    // 💨 Step 2: Leave trail of particles
                    for (let i = 0; i < 5; i++) {
                        let tx = Math.round(pixel.x + (i / 5) * (targetX - pixel.x));
                        let ty = Math.round(pixel.y + (i / 5) * (targetY - pixel.y));
                        if (isEmpty(tx, ty)) {
                            createPixel("nspell_dust", tx, ty);
                        }
                    }
                
                    // 🌫️ Puff at old spot
                    for (let i = 0; i < 4; i++) {
                        createPixel("smoke", pixel.x + Math.floor(Math.random()*3 - 1), pixel.y + Math.floor(Math.random()*3 - 1));
                    }
                
                    // 🚀 Step 3: Move the wizard
                    movePixel(pixel, targetX, targetY);
                
                },

                // Crystal Bridge 0
                () => {
                    let dx = mouseX - pixel.x;
                    let dy = mouseY - pixel.y;
                    let mag = Math.sqrt(dx * dx + dy * dy) || 1;
                    dx /= mag;
                    dy /= mag;
                    for (let i = 1; i <= 7; i++) {
                        let x = Math.round(pixel.x + dx * i);
                        let y = Math.round(pixel.y + dy * i);
                        if (isEmpty(x, y)) {
                            createPixel("stained_glass", x, y);
                        }
                    }
                }

            ];

            // ✨ Visual spell cast effect
            // ✨ Triangle particle effect
            let baseAngle = (pixel.frame || 0) * 0.15; // slowly rotates
            let radius = 4;
            for (let i = 0; i < 3; i++) {
                let angle = baseAngle + i * (2 * Math.PI / 3); // 0, 120°, 240°
                let x = Math.round(pixel.x + radius * Math.cos(angle));
                let y = Math.round(pixel.y + radius * Math.sin(angle));
            
                if (isEmpty(x, y)) {
                    createPixel("nspell_dust", x, y);
                    let p = pixelMap[x]?.[y];
                    if (p) {
                        // Set velocity tangent to the circle (spinning effect)
                        let spinForce = pixel.spinVelocity ?? 2; // starts strong
                        let tangentAngle = angle + Math.PI / 2;
                        p.vx = spinForce * Math.cos(tangentAngle);
                        p.vy = spinForce * Math.sin(tangentAngle);

                    }
                }
            }

            spellFns[selectedSpell]?.();
            pixel.spellCooldown = 5;
        }

        pixel.wasSPressed = KS;
    }
};


//       NOITA -------------------------------------------------------
//        SPELLS -----------------------------------------------------
//         SECTION ---------------------------------------------------

// --- MAGIC BARRIER ---
elements.nmagicbarrier = {
    color: "#b8f0ff",
    behavior: behaviors.WALL,
    category: "noita",
    state: "solid",
    density: 50,
    pushable: 1,
    tick: function(pixel) {
        if (!pixel || typeof pixel.x !== "number" || typeof pixel.y !== "number") return;
        if (Math.random() < 0.02) {
            deletePixel(pixel.x, pixel.y);
        }
    }
        
};


// --- FIREBOLT ---
elements.nfirebolt = {
    color: "#ff7300",
    behavior: behaviors.MOVE,
    category: "noita",
    state: "gas",
    tick: function(pixel) {
        if (isNaN(pixel.vx)) pixel.vx = 0;
        if (isNaN(pixel.vy)) pixel.vy = 0;

        // Slight gravity
        pixel.vy += 0.02;

        // Move
        let newX = pixel.x + Math.round(pixel.vx);
        let newY = pixel.y + Math.round(pixel.vy);

        if (isEmpty(newX, newY)) {
            movePixel(pixel, newX, newY);
        } else {
            // Impact: burst of plasma
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (Math.random() < 0.6 && isEmpty(pixel.x + dx, pixel.y + dy)) {
                            createPixel("fire", pixel.x + dx, pixel.y + dy);
                        }
                    }
                }

            deletePixel(pixel.x, pixel.y);
        }
    }
};

// --- BOMB ---
elements.nbomb = {
    color: "#333333",
    behavior: behaviors.POWDER,
    category: "noita",
    state: "solid",
    desc: "Explodes 2 seconds after being placed.",
    cooldown: 90, // tracks ticks

    tick: function(pixel) {
        if (isNaN(pixel.life)) pixel.life = 0;
        pixel.life++;

        // Visual cue: start flashing after 40 ticks
        if (pixel.life > 40 && Math.random() < 0.3) {
            createPixel("electric", pixel.x + (Math.random() < 0.5 ? 1 : -1), pixel.y - 1);
        }

        if (pixel.life >= 60) {
            // Boom! Create fire/plasma/etc
            for (let dx = -2; dx <= 2; dx++) {
                for (let dy = -2; dy <= 2; dy++) {
                    if (Math.random() < 0.7 && isEmpty(pixel.x + dx, pixel.y + dy)) {
                        createPixel(Math.random() < 0.5 ? "fire" : "pop", pixel.x + dx, pixel.y + dy);
                    }
                }
            }
            deletePixel(pixel.x, pixel.y);
        }
    }
};


// --- SPELL DUST ---
elements.nspell_dust = {
    color: "#00cfff",
    behavior: ["XX", "XX", "XX"],
    category: "noita",
    state: "gas",
    density: 1,
    temp: 20,
    tick: function(pixel) {
        if (Math.random() < 0.05) {
            deletePixel(pixel.x, pixel.y);
        }
    }
};


// --- RAIN CALL ---
elements.rain_call = {
    color: "#0077ff",
    behavior: behaviors.SUPPORT,
    category: "noita",
    state: "gas",
    hidden: true,

    tick: function(pixel) {
        if (isNaN(pixel.life)) pixel.life = 0;
        pixel.life++;

        if (pixel.life <= 60) {
            // Rain for 2 seconds
            if (Math.random() < 0.6) {
                let rx = pixel.x + Math.floor(Math.random() * 5 - 2);
                if (isEmpty(rx, pixel.y - 1)) {
                    createPixel("water", rx, pixel.y - 1);
                }
            }
        } else {
            deletePixel(pixel.x, pixel.y);
        }
    }
};


