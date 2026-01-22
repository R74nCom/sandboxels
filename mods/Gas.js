// made by hamburgermon 

elements.gas_fumes = {
    color: "#bfa832",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 0.1,
    tick: function(pixel) {
        if (pixel.ignited) {
            pixel.explosionTimer ??= 0;
            pixel.explosionTimer++;

            if (pixel.explosionTimer <= 5) {
                explodeAt(pixel.x, pixel.y, 10);
            }

            if (pixel.explosionTimer > 5) {
                deletePixel(pixel.x, pixel.y);
            }

            return;
        }

        const offsets = [
            [0, -1], [0, 1], [-1, 0], [1, 0],
            [-1, -1], [1, -1], [-1, 1], [1, 1]
        ];
        for (const [dx, dy] of offsets) {
            const nx = pixel.x + dx;
            const ny = pixel.y + dy;
            if (!isEmpty(nx, ny)) {
                const neighbor = getPixel(nx, ny);
                if (neighbor && neighbor.element.includes("fire")) {
                    pixel.ignited = true;
                    break;
                }
            }
        }
    }
};

elements.gas = {
    color: "#c5ad17",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tick: function(pixel) {
        if (pixel.ignited) {
            pixel.explosionTimer ??= 0;
            pixel.explosionTimer++;

            if (pixel.explosionTimer <= 5) {
                explodeAt(pixel.x, pixel.y, 10);
            }

            if (pixel.explosionTimer > 5) {
                deletePixel(pixel.x, pixel.y);
            }

            return;
        }

        if (Math.random() < 0.0001) {
            const nx = pixel.x + (Math.floor(Math.random() * 3) - 1);
            const ny = pixel.y - 1;
            if (isEmpty(nx, ny)) {
                tryCreate("gas_fumes", nx, ny);
            }
        }

        const offsets = [
            [0, -1], [0, 1], [-1, 0], [1, 0],
            [-1, -1], [1, -1], [-1, 1], [1, 1]
        ];
        for (const [dx, dy] of offsets) {
            const nx = pixel.x + dx;
            const ny = pixel.y + dy;
            if (!isEmpty(nx, ny)) {
                const neighbor = getPixel(nx, ny);
                if (!neighbor) continue;

                if (neighbor.element.includes("fire")) {
                    pixel.ignited = true;
                    break;
                }

                if (neighbor.element === "oil") {
                    changePixel(pixel, "molotov");
                    deletePixel(nx, ny);
                    break;
                }
            }
        }
    }
};

elements.molotov = {
    color: "#9b2e00",
    behavior: behaviors.LIQUID,
    category: "weapons",
    state: "liquid",
    tick: function(pixel) {
        if (pixel.ignited) {
            pixel.explosionTimer ??= 0;
            pixel.explosionTimer++;

            if (pixel.explosionTimer <= 5) {
                explodeAt(pixel.x, pixel.y, 10);

                if (pixel.explosionTimer === 1) {
                    const radius = 10;
                    let drops = 0;
                    for (let dx = -radius; dx <= radius; dx++) {
                        for (let dy = -radius; dy <= radius; dy++) {
                            if (drops >= 10) break;
                            const nx = pixel.x + dx;
                            const ny = pixel.y + dy;
                            if (
                                Math.sqrt(dx*dx + dy*dy) <= radius &&
                                isEmpty(nx, ny) &&
                                Math.random() < 0.15
                            ) {
                                tryCreate("oil", nx, ny);
                                drops++;
                            }
                        }
                        if (drops >= 10) break;
                    }
                }
            }

            if (pixel.explosionTimer > 5) {
                deletePixel(pixel.x, pixel.y);
            }

            return;
        }

        const offsets = [
            [0, -1], [0, 1], [-1, 0], [1, 0],
            [-1, -1], [1, -1], [-1, 1], [1, 1]
        ];
        for (const [dx, dy] of offsets) {
            const nx = pixel.x + dx;
            const ny = pixel.y + dy;
            if (!isEmpty(nx, ny)) {
                const neighbor = getPixel(nx, ny);
                if (neighbor && neighbor.element.includes("fire")) {
                    pixel.ignited = true;
                    break;
                }
            }
        }
    }
};
