elements.reactor_water = {
	color: "#00FFCB",
	behavior: behaviors.LIQUID,
	category: "reactor_supplies",
	state: "liquid",
	density: 1050,
	tempHigh:200,
	tempLow:-40,
    stateHigh: "reactor_water_steam",
	stateLow: "reactor_water_ice",
};

elements.reactor_container_body_user = {
	color: "#676767",
	behavior: behaviors.SOLID,
	category: "reactor_supplies",
	state: "solid",
	tempHigh: 700,
	tempLow: -200,
	temp: 50,
	stateHigh: "molten_reactor_conatainer",
	stateLow: "frozen_reactor_container",
};

elements.molten_reactor_container = {
	color: "#FF5000",
	behavior: behaviors.LIQUID,
	category: "reactor_supplies",
	state: "liquid",
	tempLow: 50,
	temp: 700,
	stateLow: "reactor_container_body_user",
};

elements.frozen_reactor_container = {
	color: "#7FA0A8",
	behavior: behaviors.SOLID,
	category: "reactor_supplies",
	state: "solid",
	tempHigh: 50,
	temp: -200,
	stateHigh: "reactor_container_body_user",
};

elements.reactor_water_steam = {
	color: "#8CF193",
	behavior: behaviors.GAS,
	category: "reactor_supplies",
	state: "gas",
	tempLow: 150,
	temp: 200,
	stateLow: "reactor_water",
};

elements.reactor_water_ice = {
	color: "#BBF5E6",
	behavior: behaviors.SOLID,
	category: "reactor_supplies",
	state: "solid",
	tempHigh: 20,
	stateHigh: "reactor_water",
	temp: -40,
};

elements.the_fun_tool = {
	color: "#FF0000",
	category: "reactor_supplies",
	tool: function(pixel) {
		if (pixel.elemet == "reactor_water") {
			pixel.element = "explosion";
		};
		if (pixel.element == "reactor_water_ice") {
			pixel.element = "explosion";
		}; 
		if (pixel.element == "reactor_water_steam") {
			pixel.element = "explosion";
		};
		if (pixel.element == "molten_reactor_container") {
			pixel.element = "explosion";
		};
		if (pixel.element == "frozen_reactor_container") {
			pixel.element = "explosion";
		};
		if (pixel.element == "reactor_container_body_user") {
			pixel.element = "explosion";
		};
	}
};