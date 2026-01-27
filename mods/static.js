// IIFE to prevent this mod from breaking
(() => {
    let staticMode = 0

    function randomGrayscale() {
        const value = Math.floor(Math.random() * 256);
        return `rgb(${value}, ${value}, ${value})`;
    }

    function randomColor() {
        return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    }


    function loopScreen(callback) {
        for (let x = 0; x <= width; x++) {
            for (let y = 0; y <= height; y++) {
                callback(x, y)
            }
        }
    }

    /**
 * Converts RGB to RGBA
 * @param {string|object} rgb - Either "rgb(r, g, b)" string or {r, g, b} object
 * @param {number} alpha - Alpha value between 0 and 1
 * @returns {string} RGBA string
 */
    function rgbToRgba(rgb, alpha = 1) {
        let r, g, b;

        if (typeof rgb === 'string') {
            const match = rgb.match(/\d+/g);
            if (!match || match.length < 3) throw new Error('Invalid RGB string');
            [r, g, b] = match.map(Number);
        } else if (typeof rgb === 'object') {
            ({ r, g, b } = rgb);
        } else {
            throw new Error('Invalid input: must be RGB string or object');
        }
        alpha = Math.min(Math.max(alpha, 0), 1);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    /**
 * Updates the alpha value of an rgba string
 * @param {string} rgbaString - Example: "rgba(255, 0, 0, 0.5)"
 * @param {number} newAlpha - New alpha value (0 to 1)
 * @returns {string} - Updated rgba string
 */
    function setAlpha(rgbaString, newAlpha) {
        // Use a regex to capture the r, g, b values
        const match = rgbaString.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\s*\)/);
        if (!match) {
            throw new Error("Invalid rgba string: " + rgbaString);
        }
        const [_, r, g, b] = match;
        return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
    }

    function drawCircle(ctx, x, y, radius, options = {}) {
        const { fill = 'blue', stroke = null, lineWidth = 1 } = options;

        // Only compute offset if needed
        const offset = lineWidth % 2 === 0 ? 0 : 0.5;
        const cx = x + offset;
        const cy = y + offset;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);

        // Set styles only if needed
        if (fill) {
            if (ctx.fillStyle !== fill) ctx.fillStyle = fill;
            ctx.fill();
        }

        if (stroke) {
            if (ctx.strokeStyle !== stroke) ctx.strokeStyle = stroke;
            if (ctx.lineWidth !== lineWidth) ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
    }

    function toggleStaticMode() {
        staticMode = (staticMode + 1) % 5
    }

    if (isMobile) {
        const staticButton = document.createElement("button")
        staticButton.id = "staticButton"
        staticButton.title = "Change static mode"
        staticButton.classList.add("controlButton")
        staticButton.onclick = () => {
            toggleStaticMode()
        }
        staticButton.textContent = "Static"
        document.getElementById("pauseButton").before(staticButton)
    }

    keybinds["KeyS"] = () => {
        toggleStaticMode()
    }
    keybinds["KeyK"] = () => {
        toggleStaticMode()
    }


    // Static rendering loop
    let cachedColorMap = []
    renderPostPixel(function (ctx) {
        if (!staticMode) return
        if (!paused) {
            cachedColorMap = []
        } else {
            cachedColorMap.forEach(renderObj => {
                let x = renderObj.x
                let y = renderObj.y
                let color = renderObj.color
                if (color.match(/^#[0-9A-Fa-f]{6}$/)) {
                    color = rgbToRgba(hexToRGB(color), 1)
                }
                let colorFullAlpha = setAlpha(color, 1)
                let isCircle = renderObj.circle
                if (isCircle) {
                    drawCircle(ctx, canvasCoord(x) + 2.1, canvasCoord(y) + 2.1, 3, { fill: color })
                } else {
                    drawSquare(ctx, colorFullAlpha, x, y, 1, 0.2)
                }
            })
            return
        }
        loopScreen((x, y) => {
            if (staticMode === 1) {
                let color = randomGrayscale()
                drawSquare(ctx, color, x, y, 1, 0.2)
                cachedColorMap.push({ x, y, color })
            }
            if (staticMode === 2) {
                let color = randomColor()
                drawSquare(ctx, color, x, y, 1, 0.2)
                cachedColorMap.push({ x, y, color })
            }
            if (staticMode === 3) {
                let color = rgbToRgba(randomGrayscale(), 0.2)
                drawCircle(ctx, canvasCoord(x) + 2.1, canvasCoord(y) + 2.1, 3, { fill: color })
                cachedColorMap.push({ x, y, color, circle: true })
            }
            if (staticMode === 4) {
                let color = rgbToRgba(hexToRGB(randomColor()), 0.2)
                drawCircle(ctx, canvasCoord(x) + 2.1, canvasCoord(y) + 2.1, 3, { fill: color })
                cachedColorMap.push({ x, y, color, circle: true })
            }
            // Currently broken with pausing
            /*
            if (staticMode === 5) {
                let color = rgbToRgba(randomGrayscale(), 0.2)
                const random = Math.random()
                if (random <= 0.5) {
                    drawSquare(ctx, color, x, y)
                    cachedColorMap.push({ x, y, color })
                } else {
                    drawCircle(ctx, canvasCoord(x) + 2.1, canvasCoord(y) + 2.1, 3, { fill: color })
                    cachedColorMap.push({ x, y, color, circle: true })
                }
            }
            if (staticMode === 6) {
                let color = rgbToRgba(hexToRGB(randomColor()), 0.2)
                const random = Math.random()
                if (random <= 0.5) {
                    drawSquare(ctx, color, x, y)
                    cachedColorMap.push({ x, y, color })
                } else {
                    drawCircle(ctx, canvasCoord(x) + 2.1, canvasCoord(y) + 2.1, 3, { fill: color })
                    cachedColorMap.push({ x, y, color, circle: true })
                }
            }
                */
        })
    })
})()
