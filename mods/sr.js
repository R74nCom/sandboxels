runAfterLoad(function() {
    // Strontium (Sr) - Solids menu
    elements.Sr = {
        name: "Strontium",
        symbol: "Sr",
        color: "#C8C8D8",
        behavior: behaviors.SOLID,
        category: "solids",
        state: "solid",
        density: 2630,
        hardness: 80,
        meltingPoint: 777,
        boilingPoint: 1382,
        conductivity: 0.8,
        description: "Strontium (Sr) - Alkaline earth metal"
    };

    // Strontium Oxide (SrO)
    elements.SrO = {
        name: "Strontium Oxide",
        symbol: "SrO",
        color: "#F5F5F5",
        behavior: behaviors.SOLID,
        category: "solids",
        state: "solid",
        density: 4700,
        hardness: 90,
        meltingPoint: 2531,
        description: "Strontium Oxide (SrO)"
    };

    // Strontium Hydroxide (Sr(OH)₂)
    elements.SrOH2 = {
        name: "Strontium Hydroxide",
        symbol: "Sr(OH)₂",
        color: "#F0F0F8",
        behavior: behaviors.SOLID,
        category: "solids",
        state: "solid",
        density: 3600,
        hardness: 70,
        meltingPoint: 375,
        description: "Strontium Hydroxide Sr(OH)₂"
    };

    // Strontium Chloride (SrCl₂)
    elements.SrCl2 = {
        name: "Strontium Chloride",
        symbol: "SrCl₂",
        color: "#F0E8FF",
        behavior: behaviors.SOLID,
        category: "solids",
        state: "solid",
        density: 3050,
        hardness: 60,
        meltingPoint: 874,
        boilingPoint: 1250,
        description: "Strontium Chloride SrCl₂, crimson flame"
    };

    // Basic reactions
    setReact("Sr", "water", "SrOH2", 0.2);
    setReact("Sr", "oxygen", "SrO", 0.2);
    setReact("Sr", "chlorine", "SrCl2", 0.2);
    setReact("SrO", "water", "SrOH2", 0.15);

    console.log("✅ Sr, SrO, Sr(OH)₂, SrCl₂ added to Solids");
});
