// Mod Name: Acid-Proof Machines & Filter
// Description: Adds acid-proof versions of all default machines and an acid-resistant filter.
// Author: Your Name (Replace with your name)

// --- New Element IDs ---
// These IDs should be unique and not conflict with existing element IDs
const ACID_PROOF_WALL_ID = 'ACID_PROOF_WALL';
const ACID_PROOF_FAN_ID = 'ACID_PROOF_FAN';
const ACID_PROOF_PUMP_ID = 'ACID_PROOF_PUMP';
const ACID_PROOF_VACUUM_ID = 'ACID_PROOF_VACUUM';
const ACID_RESISTANT_FILTER_ID = 'ACID_RESISTANT_FILTER';

// --- Acid-Proof Wall Element ---
elements.ACID_PROOF_WALL = {
    color: '#8FBC8F', // Dark Sea Green
    behavior: [
        'XX|XX|XX',
        'XX|CH|XX',
        'XX|XX|XX',
    ],
    category: 'basic',
    name: 'Acid-Proof Wall',
    hardness: 100, // High hardness to withstand acid
    conduct: 0,
    insulate: true,
    state: 'solid',
    density: 2500, // High density
};

// --- Acid-Proof Fan Element ---
elements.ACID_PROOF_FAN = {
    color: '#B0E0E6', // Powder Blue
      behavior: [
        'AIR|AIR|AIR',
        'FAN|CH|AIR',
        'AIR|AIR|AIR',
    ],
    category: 'machine',
    name: 'Acid-Proof Fan',
    hardness: 80,
    conduct: 10,
    insulate: false,
    state: 'solid',
    density: 1500,
    temp: 293,
    onTick: function(self) {
        if (self.element === 'ACID_PROOF_FAN') {
        const directions = [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
        ];
        for (const dir of directions) {
            const newX = self.x + dir.x;
            const newY = self.y + dir.y;
            if (insideBound(newX, newY)) {
                const neighborElement = getElement(newX, newY);
                    if (neighborElement.id === 0) { //blow air
                         setPixel(newX,newY,ID.AIR);
                    }
                }
            }
        }
    }
};

// --- Acid-Proof Pump Element ---
elements.ACID_PROOF_PUMP = {
    color: '#87CEFA', // Light Sky Blue
    behavior: [
        'XX|XX|XX',
        'PMP|CH|XX',
        'XX|XX|XX',
    ],
    category: 'machine',
    name: 'Acid-Proof Pump',
    hardness: 80,
    conduct: 10,
    insulate: false,
    state: 'solid',
    density: 1500,
    temp: 293,
     onTick: function(self) {
        if (self.element === 'ACID_PROOF_PUMP') {
        const directions = [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
        ];
        for (const dir of directions) {
            const newX = self.x + dir.x;
            const newY = self.y + dir.y;
            if (insideBound(newX, newY)) {
                const neighborElement = getElement(newX, newY);
                    if (neighborElement.state === "liquid") {
                         setPixel(newX,newY,ID.AIR);
                    }
                }
            }
        }
    }
};

// --- Acid-Proof Vacuum Element ---
elements.ACID_PROOF_VACUUM = {
    color: '#D3D3D3',  // Light Gray
      behavior: [
        'VAC|CH|VAC',
        'CH|CH|CH',
        'VAC|CH|VAC',
    ],
    category: 'machine',
    name: 'Acid-Proof Vacuum',
    hardness: 80,
    conduct: 10,
    insulate: false,
    state: 'solid',
    density: 1500,
    temp: 293,
    onTick: function(self) {
        if (self.element === 'ACID_PROOF_VACUUM') {
        const directions = [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            {x: -1, y: -1},
            {x: -1, y: 1},
            {x: 1, y: -1},
            {x: 1, y: 1}
        ];
        for (const dir of directions) {
            const newX = self.x + dir.x;
            const newY = self.y + dir.y;
            if (insideBound(newX, newY)) {
                const neighborElement = getElement(newX, newY);
                    if (neighborElement.state === "gas" || neighborElement.state === "liquid") {
                         setPixel(newX,newY,ID.AIR);
                    }
                }
            }
        }
    }
};

// --- Acid-Resistant Filter Element ---
elements.ACID_RESISTANT_FILTER = {
    color: '#FFA500', // Orange
    behavior: [
        'XX|FI|XX',
        'CH|CH|CH',
        'XX|XX|XX',
    ],
    category: 'machine',
    name: 'Acid-Resistant Filter',
    hardness: 70,
    conduct: 10,
    insulate: false,
    state: 'solid',
    density: 1800,
    temp: 293,
    onTick: function(self) {
        if (self.element === 'ACID_RESISTANT_FILTER') {
            // Get the element ID to filter from the pixel's data
            const filterElementId = self.data;
            if (filterElementId !== null && filterElementId !== undefined) {

                const directions = [
                    { x: -1, y: 0 },
                    { x: 1, y: 0 },
                    { x: 0, y: -1 },
                    { x: 0, y: 1 },
                ];

                for (const dir of directions) {
                    const newX = self.x + dir.x;
                    const newY = self.y + dir.y;

                    if (insideBound(newX, newY)) {
                        const neighborPixel = getPixel(newX, newY);
                        if (neighborPixel) {
                            const neighborElement = getElement(neighborPixel.element);
                            // Pass only the filtered element
                            if (neighborElement.id === filterElementId) {
                                // Find an empty spot
                                const emptyDirections = [
                                    { x: -1, y: 0 },
                                    { x: 1, y: 0 },
                                    { x: 0, y: -1 },
                                    { x: 0, y: 1 },
                                ];
                                for(const emptyDir of emptyDirections){
                                     const emptyX = self.x + emptyDir.x;
                                     const emptyY = self.y + emptyDir.y;
                                     if(insideBound(emptyX,emptyY) && getPixel(emptyX,emptyY).element === ID.AIR){
                                        setPixel(emptyX,emptyY,neighborPixel.element);
                                        setPixel(newX,newY,ID.AIR);
                                        break;
                                     }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    category: 'machine',
    onKeyPress: function(self, key) {
        if (key === 'Enter') {
            let elementInput = prompt("Enter the element name to filter (e.g., WATER, FIRE):");
            if (elementInput) {
                elementInput = elementInput.toUpperCase();
                const filterElement = elements[elementInput];
                if (filterElement) {
                    self.data = filterElement.id; // Store the element ID
                    self.color = filterElement.color;  //change color
                    self.name = `Acid-Resistant Filter (${filterElement.name})`;
                } else {
                    self.data = null;
                    self.color = '#FFA500';
                    self.name = 'Acid-Resistant Filter';
                    alert("Element not found. Filter is reset.");
                }
            } else {
                self.data = null;
                self.color = '#FFA500';
                self.name = 'Acid-Resistant Filter';
                alert("Filter is reset.");
            }
        }
    },
    customMenu: function(pixel) {
        return [
            {
                text: "Set Filter Element",
                action: () => {
                    let elementInput = prompt("Enter the element name to filter:");
                     if (elementInput) {
                        elementInput = elementInput.toUpperCase();
                        const filterElement = elements[elementInput];
                        if (filterElement) {
                            pixel.data = filterElement.id;
                             pixel.color = filterElement.color;
                             pixel.name = `Acid-Resistant Filter (${filterElement.name})`;
                        } else {
                             pixel.data = null;
                             pixel.color = '#FFA500';
                             pixel.name = 'Acid-Resistant Filter';
                            alert("Element not found. Filter is reset.");
                        }
                    }
                     else {
                         pixel.data = null;
                         pixel.color = '#FFA500';
                         pixel.name = 'Acid-Resistant Filter';
                        alert("Filter is reset.");
                    }
                },
            },
            {
                text: "Clear Filter",
                action: () => {
                    pixel.data = null;
                    pixel.color = '#FFA500';
                    pixel.name = 'Acid-Resistant Filter';
                }
            }
        ];
    }
};
//Genrated using google gemini ai bc i don't know how to code in java script
