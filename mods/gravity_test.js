// validateMoves((pixel,nx,ny) => {
//     if (pixel.y-ny < 0) { //goes down usually
//         return false;
//     }
// })

validateMoves((pixel,nx,ny) => {
    if (elements[pixel.element].isGas) return true;
    if (true || pixel.y-ny < 0) { //goes down usually
        
        nx = 0;
        ny = 0;

        const centerX = Math.floor(width/2);
        const centerY = Math.floor(height/2);

        let diffX = centerX-pixel.x;
        let diffY = centerY-pixel.y;

        let dirX = 0;
        let dirY = 0;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            dirX = Math.sign(diffX);
        }
        else {
            dirY = Math.sign(diffY);
        }

        if (Math.random() < Math.abs(diffX)/100) diffX = Math.sign(diffX);
        else diffX = 0;
        if (Math.random() < Math.abs(diffY)/100) diffY = Math.sign(diffY);
        else diffY = 0;

        if ((diffX || diffY) && !isEmpty(pixel.x+diffX,pixel.y+diffY)) {
            if (dirX !== 0) {
                diffY = Math.random() < 0.5 ? 1 : -1;
            }
            else if (dirY !== 0) {
                diffX = Math.random() < 0.5 ? 1 : -1;
            }
        }

        // if (!(pixel.y-ny)) {
        //     diffX += pixel.y-ny;
        //     diffY += pixel.x-nx;
        // }

        return [pixel.x+diffX,pixel.y+diffY];

    }
})