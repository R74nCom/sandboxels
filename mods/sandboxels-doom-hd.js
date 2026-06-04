// sandboxels_doom3d_standalone.js
// Standalone Doom-style 3D engine for Sandboxels

(() => {

    // =========================================================
    // CONFIG
    // =========================================================

    const SCREEN_W = 320;
    const SCREEN_H = 200;

    const FOV = Math.PI / 3;
    const MOVE_SPEED = 0.08;
    const ROT_SPEED = 0.045;

    const MAX_DEPTH = 20;

    // =========================================================
    // MAP
    // =========================================================

    const MAP = [
        "################",
        "#..............#",
        "#..##..........#",
        "#..............#",
        "#......##......#",
        "#..............#",
        "#....E.........#",
        "#..............#",
        "#..............#",
        "#.......P......#",
        "################"
    ];

    const MAP_W = MAP[0].length;
    const MAP_H = MAP.length;

    // =========================================================
    // PLAYER
    // =========================================================

    const player = {
        x: 8,
        y: 9,
        angle: -Math.PI / 2,
        health: 100,
        ammo: 50
    };

    // =========================================================
    // ENEMIES
    // =========================================================

    const enemies = [];

    for (let y = 0; y < MAP_H; y++) {
        for (let x = 0; x < MAP_W; x++) {
            if (MAP[y][x] === "E") {
                enemies.push({
                    x: x + 0.5,
                    y: y + 0.5,
                    alive: true
                });
            }
        }
    }

    // =========================================================
    // CANVAS
    // =========================================================

    let canvas;
    let ctx;

    function createRenderer() {

        canvas = document.createElement("canvas");
        canvas.width = SCREEN_W;
        canvas.height = SCREEN_H;

        canvas.style.position = "absolute";
        canvas.style.left = "10px";
        canvas.style.top = "10px";
        canvas.style.zIndex = "9999";
        canvas.style.border = "2px solid black";
        canvas.style.imageRendering = "pixelated";

        document.body.appendChild(canvas);

        ctx = canvas.getContext("2d");
    }

    // =========================================================
    // INPUT
    // =========================================================

    const keys = {};

    window.addEventListener("keydown", e => {
        keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", e => {
        keys[e.key.toLowerCase()] = false;
    });

    window.addEventListener("mousedown", shoot);

    // =========================================================
    // HELPERS
    // =========================================================

    function isWall(x, y) {

        x = Math.floor(x);
        y = Math.floor(y);

        if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H)
            return true;

        return MAP[y][x] === "#";
    }

    // =========================================================
    // MOVEMENT
    // =========================================================

    function updatePlayer() {

        if (keys["a"]) {
            player.angle -= ROT_SPEED;
        }

        if (keys["d"]) {
            player.angle += ROT_SPEED;
        }

        let dx = Math.cos(player.angle);
        let dy = Math.sin(player.angle);

        if (keys["w"]) {

            let nx = player.x + dx * MOVE_SPEED;
            let ny = player.y + dy * MOVE_SPEED;

            if (!isWall(nx, ny)) {
                player.x = nx;
                player.y = ny;
            }
        }

        if (keys["s"]) {

            let nx = player.x - dx * MOVE_SPEED;
            let ny = player.y - dy * MOVE_SPEED;

            if (!isWall(nx, ny)) {
                player.x = nx;
                player.y = ny;
            }
        }
    }

    // =========================================================
    // SHOOTING
    // =========================================================

    function shoot() {

        if (player.ammo <= 0) return;

        player.ammo--;

        for (let enemy of enemies) {

            if (!enemy.alive) continue;

            let dx = enemy.x - player.x;
            let dy = enemy.y - player.y;

            let dist = Math.sqrt(dx*dx + dy*dy);

            let angle = Math.atan2(dy, dx);

            let diff = normalizeAngle(angle - player.angle);

            if (Math.abs(diff) < 0.12 && dist < 8) {
                enemy.alive = false;
            }
        }
    }

    function normalizeAngle(a) {

        while (a < -Math.PI) a += Math.PI * 2;
        while (a > Math.PI) a -= Math.PI * 2;

        return a;
    }

    // =========================================================
    // ENEMY AI
    // =========================================================

    function updateEnemies() {

        for (let enemy of enemies) {

            if (!enemy.alive) continue;

            let dx = player.x - enemy.x;
            let dy = player.y - enemy.y;

            let dist = Math.sqrt(dx*dx + dy*dy);

            if (dist > 0.5) {

                enemy.x += dx / dist * 0.01;
                enemy.y += dy / dist * 0.01;
            }

            if (dist < 0.7) {
                player.health -= 0.05;
            }
        }
    }

    // =========================================================
    // RAYCASTER
    // =========================================================

    function render3D() {

        ctx.fillStyle = "#202020";
        ctx.fillRect(0, 0, SCREEN_W, SCREEN_H / 2);

        ctx.fillStyle = "#111";
        ctx.fillRect(0, SCREEN_H / 2, SCREEN_W, SCREEN_H / 2);

        for (let x = 0; x < SCREEN_W; x++) {

            let rayAngle =
                player.angle - FOV / 2 + (x / SCREEN_W) * FOV;

            let dist = 0;
            let hit = false;

            let eyeX = Math.cos(rayAngle);
            let eyeY = Math.sin(rayAngle);

            while (!hit && dist < MAX_DEPTH) {

                dist += 0.02;

                let tx = player.x + eyeX * dist;
                let ty = player.y + eyeY * dist;

                if (isWall(tx, ty)) {
                    hit = true;
                }
            }

            let corrected =
                dist * Math.cos(rayAngle - player.angle);

            let wallHeight = SCREEN_H / corrected;

            let shade =
                Math.max(0, 255 - corrected * 18);

            ctx.fillStyle =
                `rgb(${shade},${shade},${shade})`;

            ctx.fillRect(
                x,
                SCREEN_H / 2 - wallHeight / 2,
                1,
                wallHeight
            );
        }

        renderEnemies();
        renderGun();
        renderHUD();
    }

    // =========================================================
    // ENEMY SPRITES
    // =========================================================

    function renderEnemies() {

        for (let enemy of enemies) {

            if (!enemy.alive) continue;

            let dx = enemy.x - player.x;
            let dy = enemy.y - player.y;

            let dist = Math.sqrt(dx*dx + dy*dy);

            let angle = Math.atan2(dy, dx)
                - player.angle;

            let size = SCREEN_H / dist;

            let screenX =
                (Math.tan(angle) / Math.tan(FOV/2))
                * SCREEN_W/2
                + SCREEN_W/2;

            ctx.fillStyle = "#cc0000";

            ctx.fillRect(
                screenX - size/2,
                SCREEN_H/2 - size/2,
                size,
                size
            );
        }
    }

    // =========================================================
    // GUN
    // =========================================================

    function renderGun() {

        ctx.fillStyle = "#555";

        ctx.fillRect(
            SCREEN_W/2 - 40,
            SCREEN_H - 50,
            80,
            40
        );

        ctx.fillStyle = "#999";

        ctx.fillRect(
            SCREEN_W/2 - 10,
            SCREEN_H - 60,
            20,
            20
        );
    }

    // =========================================================
    // HUD
    // =========================================================

    function renderHUD() {

        ctx.fillStyle = "white";
        ctx.font = "14px monospace";

        ctx.fillText(
            "HP: " + Math.floor(player.health),
            10,
            20
        );

        ctx.fillText(
            "AMMO: " + player.ammo,
            10,
            40
        );
    }

    // =========================================================
    // GAME LOOP
    // =========================================================

    function loop() {

        updatePlayer();
        updateEnemies();

        render3D();

        requestAnimationFrame(loop);
    }

    // =========================================================
    // START
    // =========================================================

    function init() {

        createRenderer();

        loop();

        console.log("Standalone Doom engine loaded.");
    }

    runAfterLoad(init);

})();
