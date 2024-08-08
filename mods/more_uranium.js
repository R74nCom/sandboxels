elements.uranium_235 = {
        color: ["#232922", "#0d4a03", "#7eff69", "#0d140c", "#3d3d3d", "#969696"]
        behavior: [
        "XX|CR:radiation%2|XX",
        "CR:radiation%2|CH:lead%0.002|CR:radiation%2",
        "M2|M1|M2"
    ],,
        category: powders,
        state: powder,
        density: 2400,
        tempHigh: 1355,
        burnTime: 30,
        stateHigh: molten_uranium-235,
    ],
        reactions: {
                "neutron": { elem1: "barium-141", elem2: "n_explosion", tempMin:500, chance:0.1 },

};

elements.barium-141 = {
        color: ["#232922", "#0d4a03", "#7eff69", "#0d140c", "#3d3d3d", "#969696"],
        temp: 50
        reactions: {
                "neutron": { elem1:"n_explosion", tempMin:500, chance:0.1 },
        }
};
