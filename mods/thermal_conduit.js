//Base element, uninitialized IO
elements.thermal_conduit = {
	hidden: true,
	category: "thermal_conduits",
	hardness: 1,
	state: "solid",
	density: 3000,
	temp: -273.15,
	behavior: behaviors.WALL,
	color: "#cf9f7f",
	insulate: true,
	properties: {
		inputs: [],
		outputs: [],
		rate: 2,
	},
	tick: function(pixel) {
		if(pixel.inputs.length == 0 && pixel.outputs.length == 0) {
			return;
		};
		//Iterate through inputs
		for(var i = 0; i < pixel.inputs.length; i++) {
			//Readability variable for offset pair
			var coordPair = pixel.inputs[i];
			//Coord RVs
			var newX = pixel.x + coordPair[0];
			var newY = pixel.y + coordPair[1];
			//Skip empties
			if(isEmpty(newX,newY,true)) {
				continue;
			} else {
				//New pixel RV
				var newPixel = pixelMap[newX][newY];
				//More sugar
				var newPixelTempKelvin = newPixel.temp + 273.15;
				//Skip pixels at or below absolute zero
				if(newPixelTempKelvin <= 0) {
					continue;
				};
				//If temp withdrawal would put pixel below absolute zero
				if(newPixelTempKelvin <= pixel.rate) {
					//Special "draining" logic
					pixel.temp += newPixelTempKelvin;
					newPixel.temp = -273.15;
				} else {
					//If not, just move the temperature
					pixel.temp += pixel.rate;
					newPixel.temp -= pixel.rate;
				};
			};
		};

		if(pixelTempKelvin <= 0 || pixel.outputs.length == 0) {
			return false;
		};

		//Iterate through outputs
		var availableOutputs = [];
		//Adjust effective output count;
		for(var i = 0; i < pixel.outputs.length; i++) {
			var coordPair = pixel.outputs[i];
			var newX = pixel.x + coordPair[0];
			var newY = pixel.y + coordPair[1];
			if(!isEmpty(newX,newY,true)) {
				availableOutputs.push([newX,newY]);
			};
		};
		
		var pixelTempKelvin = pixel.temp + 273.15;
		var isDraining = (pixelTempKelvin <= pixel.rate);
		var effectiveRate = (isDraining ? pixelTempKelvin : pixel.rate) / availableOutputs.length;
		//Actual distribution
		for(var i = 0; i < availableOutputs.length; i++) {
			var coordPair = availableOutputs[i];
			var newPixel = pixelMap[coordPair[0]][coordPair[1]];
			newPixel.temp += effectiveRate;
		};
		if(availableOutputs.length > 0) { isDraining ? pixel.temp = -273.15 : pixel.temp -= pixel.rate };
	},
};

function defineConduitElement(nameDescriber,inputOffsetNestedArray,outputOffsetNestedArray) {
	//There is no validation here. Please don't do anything stupid.
	//Pretty please don't run after script loading, i don't feel like adding that code in.
	var autoName = `thermal_${nameDescriber}_conduit`;
	//console.log(inputOffsetNestedArray);
	elements[autoName] = {
		category: "thermal_conduits",
		properties: {
			inputs: inputOffsetNestedArray,
			outputs: outputOffsetNestedArray,
			rate: 2,
		},
		hardness: 1,
		state: "solid",
		density: 3000,
		temp: -273.15,
		behavior: behaviors.WALL,
		color: "#cf9f7f",
		insulate: true,
		tick: function(pixel) {
			pixel.element = "thermal_conduit"; //manual change to preserve properties
		},
	};
	return autoName;
}

autoConduitTable = {
	//up_to_up: useless,
	up_to_down: {ins: [[0,-1]], outs: [[0,1]]},
	up_to_left: {ins: [[0,-1]], outs: [[-1,0]]},
	up_to_right: {ins: [[0,-1]], outs: [[1,0]]},

	down_to_up: {ins: [[0,1]], outs: [[0,-1]]},
	//down_to_down: useless,
	down_to_left: {ins: [[0,1]], outs: [[-1,0]]},
	down_to_right: {ins: [[0,1]], outs: [[1,0]]},

	left_to_up: {ins: [[-1,0]], outs: [[0,-1]]},
	left_to_down: {ins: [[-1,0]], outs: [[0,1]]},
	//left_to_left: useless,
	left_to_right: {ins: [[-1,0]], outs: [[1,0]]},

	right_to_up: {ins: [[1,0]], outs: [[0,-1]]},
	right_to_down: {ins: [[1,0]], outs: [[0,1]]},
	right_to_left: {ins: [[1,0]], outs: [[-1,0]]},
	//right_to_right: useless,
	
	left_and_right_to_down: {ins: [[-1,0],[1,0]], outs: [[0,1]]},
	up_and_down_to_left: {ins: [[0,-1],[0,1]], outs: [[-1,0]]},
	left_and_right_to_up: {ins: [[-1,0],[1,0]], outs: [[0,-1]]},
	up_and_down_to_right: {ins: [[0,-1],[0,1]], outs: [[1,0]]},

	down_to_left_and_right: {outs: [[-1,0],[1,0]], ins: [[0,1]]},
	left_to_up_and_down: {outs: [[0,-1],[0,1]], ins: [[-1,0]]},
	up_to_left_and_right: {outs: [[-1,0],[1,0]], ins: [[0,-1]]},
	right_to_up_and_down: {outs: [[0,-1],[0,1]], ins: [[1,0]]},
	
	up_down_and_left_to_right: {ins: [[0,-1],[0,1],[-1,0]], outs: [[1,0]]},
	up_left_and_right_to_down: {ins: [[0,-1],[-1,0],[1,0]], outs: [[0,1]]},
	up_down_and_right_to_left: {ins: [[0,-1],[0,1],[1,0]], outs: [[-1,0]]},
	down_left_and_right_to_up: {ins: [[0,1],[-1,0],[1,0]], outs: [[0,-1]]},

	right_to_up_down_and_left: {outs: [[0,-1],[0,1],[-1,0]], ins: [[1,0]]},
	down_to_up_left_and_right: {outs: [[0,-1],[-1,0],[1,0]], ins: [[0,1]]},
	left_to_up_down_and_right: {outs: [[0,-1],[0,1],[1,0]], ins: [[-1,0]]},
	up_to_down_left_and_right: {outs: [[0,1],[-1,0],[1,0]], ins: [[0,-1]]},
	
	left_and_down_to_right: {ins: [[-1,0],[0,1]], outs: [[1,0]]},
	right_and_down_to_left: {ins: [[1,0],[0,1]], outs: [[-1,0]]},
	left_and_up_to_right: {ins: [[-1,0],[0,-1]], outs: [[1,0]]},
	right_and_up_to_left: {ins: [[1,0],[0,-1]], outs: [[-1,0]]},
};

for(direction in autoConduitTable) {
	defineConduitElement(direction,autoConduitTable[direction].ins,autoConduitTable[direction].outs);
};
