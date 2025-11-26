// IIFE to prevent this mod from breaking
(() => {
    let staticMode = 0

    function randomGrayscale() {
        const value = Math.floor(Math.random() * 256);
        return `rgb(${value}, ${value}, ${value})`;
    }

    function randomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function loopScreen(callback) {
        for (let x = 0; x <= width; x++) {
            for (let y = 0; y <= height; y++) {
                callback(x, y)
            }
        }
    }

    keybinds["KeyS"] = () => {
        staticMode === 0 ? staticMode = 1 : staticMode === 1 ? staticMode = 2 : staticMode = 0
    }

    renderPostPixel(function (ctx) {
        if (!staticMode) return
        loopScreen((x, y) => {
            if (staticMode === 1) {
                drawSquare(ctx, randomGrayscale(), x, y, 1, 0.2)
            }
            if (staticMode === 2) {
                drawSquare(ctx, randomColor(), x, y, 1, 0.3)
            }
        })
    })
})()
