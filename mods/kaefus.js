elements.jupiter = {
    behavior: behaviors.WALL,
    category: "kaeud's needs",
    state: "solid",
    density: Infinity,
}

elements.test2 = {
    behavior: behaviors.WALL,
    category: "kaeud's needs",
    state: "solid",
    density: -Infinity,
    conduct: 1,
}

elements.moderately_warm_foam = {
    behavior: [
        "XX|XX|XX",
        "XX|DL%5|XX",
        "M2%25|M1%25|M2%25",
    ],
    temp: 1000000000000,
    category: "kaeud's needs"
}

elements.comfortably_warm_form = {
    behavior: [
        "XX|XX|XX",
        "XX|DL%5|XX",
        "M2%25|M1%25|M2%25",
    ],
    temp: Infinity,
    category: "kaeud's needs"
}

elements.cpu_cooler = {
    color: "#d3e1e3",
    behavior: behaviors.LIQUID,
    category: "kaeud's needs",
    tempLow: -300,
    conduct: 0,
    density: 997,
}