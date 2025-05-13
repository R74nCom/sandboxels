// Makes it that electricity can travel diagonally too

const originalDoElectricity = doElectricity;

doElectricity = function(pixel, step) {
    const savedAdjacentCoords = adjacentCoords; // save original
    adjacentCoords = squareCoords;              // override
    const result = originalDoElectricity(pixel, step); // run the real logic
    adjacentCoords = savedAdjacentCoords;        // restore
    return result;
};
