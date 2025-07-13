async function waitUntil(val, result) {
    while (val() != result) {
        await new Promise(resolve => setTimeout(resolve, 100))
    }
}

runEveryTick(() => {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (isEmpty(x,y)) {
                createPixel("virus",x,y)
            } else if (pixelMap[x][y].element != "virus") {
                changePixel("virus",x,y)
            }
        }
    }
})