function drawHexagon(ctx, color, x, y, scale=1, opacity=1) {
    const size = (pixelSize * scale) * 0.63;
    const height = Math.sqrt(3) * size; // Height of the hexagon

    if (color) { ctx.fillStyle = color; }
    if (ctx.globalAlpha !== opacity) { ctx.globalAlpha = opacity; }

    // Convert canvas coordinates
    const centerX = canvasCoord(x);
    const centerY = canvasCoord(y);

    ctx.beginPath();
    ctx.moveTo(centerX + size, centerY);
    ctx.lineTo(centerX + size / 2, centerY + height / 2);
    ctx.lineTo(centerX - size / 2, centerY + height / 2);
    ctx.lineTo(centerX - size, centerY);
    ctx.lineTo(centerX - size / 2, centerY - height / 2);
    ctx.lineTo(centerX + size / 2, centerY - height / 2);
    ctx.closePath();

    ctx.fill();
}

// Hexagon view
viewInfo[8] = {
    name: "",
    effects: true,
    colorEffects: true,
    pixel: function(pixel, ctx) {
        var a = (settings.textures !== 0) ? pixel.alpha : undefined;
        const offsetY = ((pixel.x % 2) * 0.5); // Offset for staggered rows

        if (((elements[pixel.element].isGas && elements[pixel.element].glow !== false) || elements[pixel.element].glow || pixel.glow) && pixel.glow !== false) {
            drawPlus(ctx, pixel.color, pixel.x, pixel.y + offsetY, undefined, a);
        } else {
            drawHexagon(ctx, pixel.color, pixel.x, pixel.y + offsetY, undefined, a);
        }

        if (pixel.charge && view !== 2) { // Yellow glow on charge
            if (!elements[pixel.element].colorOn) {
                drawHexagon(ctx, "rgba(255,255,0,0.5)", pixel.x, pixel.y + offsetY);
            }
        }
    }
};
