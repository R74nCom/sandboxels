elements.reactorwater = {
	color: "#00FFCB",
	behavior: behaviors.LIQUID,
	category: "reactor_supplies",
	state: "liquid",
	density: 1050,
	tempHigh:200,
	tempLow:-40,
    stateHigh: "Reactor_Water_Steam",
	stateLow: "Reactor_Water_Ice",
};

elements.reactorcontainerbodyuser = {
	color: "#676767",
	behavior: behaviors.SOLID,
	category: "reactor_supplies",
	state: "solid",
	tempHigh: 700,
	tempLow: -200,
	temp: 50,
	stateHigh: "Molten_Reactor_Conatainer",
	stateLow: "Frozen_Reactor_Container",
};

elements.moltenreactorcontainer = {
	color: "#FF5000",
	behavior: behaviors.LIQUID,
	category: "reactor_supplies",
	state: "liquid",
	tempLow: 50,
	temp: 700,
	stateLow: "Reactor_Container_Body_User",
};

elements.frozenreactorcontainer = {
	color: "#7FA0A8",
	behavior: behaviors.SOLID,
	category: "reactor_supplies",
	state: "solid",
	tempHigh: 50,
	temp: -200,
	stateHigh: "Reactor_Container_Body_User",
};

elements.reactorwatersteam = {
	color: "#8CF193",
	behavior: behaviors.GAS,
	category: "reactor_supplies",
	state: "gas",
	tempLow: 150,
	temp: 200,
	stateLow: "Reactor_Water",
};

elements.reactorwaterice = {
	color: "#BBF5E6",
	behavior: behaviors.SOLID,
	category: "reactor_supplies",
	state: "solid",
	tempHigh: 20,
	stateHigh: "Reactor_Water",
	temp: -40,
};

elements.thefuntool = {
	color: "#FF0000",
	category: "reactor_supplies",
	tool: function(pixel) {
		if (pixel.elemet == "reactorwater") {
			pixel.element = "explosion";
		};
		if (pixel.element == "reactorwaterice") {
			pixel.element = "explosion";
		}; 
		if (pixel.element == "reactorwatersteam") {
			pixel.element = "explosion";
		};
		if (pixel.element == "moltenreactorcontainer") {
			pixel.element = "explosion";
		};
		if (pixel.element == "frozenreactorcontainer") {
			pixel.element = "explosion";
		};
		if (pixel.element == "reactorcontainerbodyuser") {
			pixel.element = "explosion";
		};
	}
};