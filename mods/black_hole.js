elements.black_hole = {
    color: "#000000",
    tick: function(pixel) {
        // Attract other pixels within a 9-pixel radius
        for (let dx = -9; dx <= 9; dx++) {
            for (let dy = -9; dy <= 9; dy++) {
                let x = pixel.x + dx;
                let y = pixel.y + dy;

                // Ignore out-of-bounds
                if (!isEmpty(x, y, true)) {
                    let other = pixelMap[x]?.[y];
                    if (other && other.element !== "black_hole") {
                        // Attraction: move other pixel towards the black hole
                        let stepX = Math.sign(pixel.x - other.x);
                        let stepY = Math.sign(pixel.y - other.y);
                        tryMove(other, other.x + stepX, other.y + stepY);
                    }
                }
            }
        }

        // Convert touching pixels into black holes
        const dirs = [
            [1, 0], [-1, 0], [0, 1], [0, -1],
            [1, 1], [-1, -1], [1, -1], [-1, 1]
        ];
        for (let d of dirs) {
            let nx = pixel.x + d[0];
            let ny = pixel.y + d[1];
            if (isEmpty(nx, ny, true)) continue;

            let touching = pixelMap[nx]?.[ny];
            if (touching && touching.element !== "black_hole") {
                changePixel(touching, "black_hole");
            }
        }
    },
    category: "special",
    state: "solid",
    density: 99999, // Very dense (optional)
    hardness: 1, // Can't be destroyed easily
};
