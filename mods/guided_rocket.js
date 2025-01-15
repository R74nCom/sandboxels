// from code_libary.js
function pyth(xA, yA, xB, yB) {
    var a = Math.abs(xB - xA);
    var b = Math.abs(yB - yA);
    var c = Math.sqrt(a ** 2 + b ** 2);
    return c;
};
tgt = ""

elements.guided_misile = {
    color: "#323333",
    category: "weapons",
    behavior: [
        "EX:10|EX:10|EX:10",
        "EX:10|  XX |EX:10",
        "EX:10|EX:10|EX:10",
    ],
    onSelect: function () {
        var answer1 = prompt("Please input the target element.", (tgt || undefined));
        if (!answer1) { return }
        tgt = answer1;
    },
    tick: (pixel) => {
        let targets = [];

        // find all posible targets
        for (var x = 1; x < width; x++) {
            for (var y = 1; y < height; y++) {
                if (!isEmpty(x, y)) {
                    if (pixelMap[x][y]["element"] === tgt) {
                        pxl = pixelMap[x][y];
                        targets.push(
                            [pxl.x, pxl.y,
                            // calculate distance from target to current pixel
                            pyth(pixel.x, pixel.y, pxl.x, pxl.y)
                            ]);
                    }
                }
            }
        }

        if (targets == []) {
            return
        }

        // sort the targets by distance from self 
        targets.sort((a, b) => a[2] - b[2]);

        try {
            // get the closest target
            current_best = targets[0];

            target = [current_best[0], current_best[1]];
        } catch {
            // no pixels of target found
            return
        }

        if (pixel.x != target[0] || pixel.y != target[1]) {
            let { x, y } = pixel;
            const empty = checkForEmptyPixels(x, y);
            const [tX, tY] = target;

            // Separate moves into non-diagonal and diagonal categories
            const nonDiagonal = [];
            const diagonal = [];

            for (const [dx, dy] of empty) {
                if ((dx === 0) || (dy === 0)) {
                    nonDiagonal.push([dx, dy]); // Horizontal or vertical moves
                } else {
                    diagonal.push([dx, dy]);    // Diagonal moves
                }
            }

            let prioritizedMoves = []

            // chose whether to move diagonaly
            if (Math.abs(Math.abs(x - tX) - Math.abs(y - tY)) > 1) {
                prioritizedMoves = [...nonDiagonal];
            } else {
                prioritizedMoves = [...diagonal];
            }

            let bestVal = pyth(tX, tY, x, y)
            Math.sqrt(Math.pow(tX - x, 2) + Math.pow(tY - y, 2));
            let best = null;

            for (const [dx, dy] of prioritizedMoves) {
                const x_ = x + dx;
                const y_ = y + dy;
                const c = Math.sqrt(Math.pow(tX - x_, 2) + Math.pow(tY - y_, 2));
                if (c < bestVal) {
                    bestVal = c;
                    best = [dx, dy];
                }
            }

            if (best) {
                if (!tryMove(pixel, x + best[0] * 2, y + best[1] * 2, undefined, true)) {
                    tryMove(pixel, x + best[0], y + best[1], undefined, true)
                };
            }
        }
    }
}