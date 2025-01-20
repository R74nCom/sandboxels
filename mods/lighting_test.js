lightCoordsLevel1 = [
[-1,-3],[0,-3],[1,-3],
[-2,-2],[2,-2],
[-3,-1],[3,-1],
[-3,-0],[3,-0],
[-3,1],[3,1],
[-2,2],[2,2],
[-1,3],[0,3],[1,3],
]

lightCoordsLevel2 = [
[-1,-2],[0,-2],[1,-2],
[-2,-1],[2,-1],
[-2,0],[2,0],
[-2,1],[2,1],
[-1,2],[0,2],[1,2],
]

lightCoordsLevel3 = [
[-1,-1],[1,-1],
[-1,1],[1,1],
]

lightCoordsLevel3Extra = [
[1,0],[-1,0],[0,1],[0,-1]
]

glowAmount = 2;

viewInfo[4] = {
    name: "lighting",
    effects: true,
    colorEffects: true,
    pixel: viewInfo[1].pixel,
    pre: function(ctx){
        const pixelSize3 = pixelSize*3;
        const pixelSize7 = pixelSize*7
        const pixelSize5 = pixelSize*5
        ctx.globalAlpha = 0.1;
        for (let i = 0; i < currentPixels.length; i++) {
            const pixel = currentPixels[i];
            if (elements[pixel.element].id === elements.fire.id) {
                ctx.fillStyle = pixel.color;
                /* no occulusion: */
                ctx.fillRect(canvasCoord(pixel.x-1), canvasCoord(pixel.y-3), pixelSize3, pixelSize7);
                if (!isEmpty(pixel.x,pixel.y+1) && !isEmpty(pixel.x,pixel.y-1)) {
                    continue;
                }
                ctx.fillRect(canvasCoord(pixel.x-3), canvasCoord(pixel.y-1), pixelSize7, pixelSize3);
                if (!isEmpty(pixel.x+1,pixel.y) && !isEmpty(pixel.x-1,pixel.y)) {
                    continue;
                }
                ctx.fillRect(canvasCoord(pixel.x-2), canvasCoord(pixel.y-2), pixelSize5, pixelSize5);
                // ctx.globalAlpha = 0.1;
                // lightCoordsLevel1.forEach(coords => {
                //     let x = pixel.x+coords[0]; let y = pixel.y+coords[1];
                //     if (!outOfBounds(x,y) && pixelMap[pixel.x+coords[0]][pixel.y+coords[1]] === undefined) {
                //         ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
                //     }
                // });
                // ctx.globalAlpha = 0.2;
                // lightCoordsLevel2.forEach(coords => {
                //     let x = pixel.x+coords[0]; let y = pixel.y+coords[1];
                //     if (!outOfBounds(x,y) && pixelMap[pixel.x+coords[0]][pixel.y+coords[1]] === undefined) {
                //         ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
                //     }
                // });
                // ctx.globalAlpha = 0.3;
                // lightCoordsLevel3.forEach(coords => {
                //     let x = pixel.x+coords[0]; let y = pixel.y+coords[1];
                //     if (!outOfBounds(x,y) && pixelMap[pixel.x+coords[0]][pixel.y+coords[1]] === undefined) {
                //         ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
                //     }
                // });
            }
        }
        ctx.globalAlpha = 1;
    }
}