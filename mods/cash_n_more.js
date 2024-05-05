elements.cash = {
    color: "#00e600",
    behavior: behaviors.POWDER,
    category: "powders",
};

elements.paper = {
    color: "#ffffff",
    behavior: behaviors.SOLID,
    category: "solids",
};

elements.shredded_paper = {
    color: "#ffffff",
    behavior: behaviors.POWDER,
    category: "powders",
};

elements.shredded_cash = {
    color: "#004d00",
    behavior: behaviors.POWDER,
    category: "powders",
};

elements.shredder = {
    color: "#08b508",
    behavior: behaviors.SOLID,
    tool: function(pixel) {
        if (pixel.element == "cash") {
            pixel.element = "shredded_cash"
        },
        if (pixel.element == "paper") {
            pixel.element = "shredded_money"
        }
    },
    category: "tools",
};
