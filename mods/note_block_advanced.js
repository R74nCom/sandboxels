audioContext = new AudioContext()

//Derived from Alice's note_block.js - thanks!
//adv_note_block/note_block_advance/nba

oscillatorDefaults = {
	frequency: 440,
	type: "sine",
	endType: "none",
	length: 1,
	volume: 1,
	delay: 0,
};

audioObject = {};

function oscillator(name="test",parameterObject=oscillatorDefaults){ //creates oscillator with gain node, has specifiable frequency and type, fades out over 1 second (hard-coded)
	var defaultKeys = Object.keys(oscillatorDefaults); //readability variable
	
	for(i = 0; i < defaultKeys.length; i++) {
		var key = defaultKeys[i]; //the indexed keyname
		if(typeof(parameterObject[key]) === "undefined") {
			parameterObject[key] = oscillatorDefaults[key];
		};
	};

	var oscillatorNodeName = `${name}Oscillator`;
	var gainNodeName = `${name}Gain`;

	audioObject[oscillatorNodeName] = audioContext.createOscillator()
	audioObject[gainNodeName] = audioContext.createGain()
	audioObject[gainNodeName].gain.value = parameterObject.volume;
	audioObject[oscillatorNodeName].type = parameterObject.type
	audioObject[oscillatorNodeName].connect(audioObject[gainNodeName])
	audioObject[oscillatorNodeName].frequency.value = parameterObject.frequency
	audioObject[gainNodeName].connect(audioContext.destination)
	audioObject[oscillatorNodeName].start(audioContext.currentTime + parameterObject.delay)

	//stopping handler
	if(parameterObject.endType === "exponential") { //starts fading immediately
		audioObject[gainNodeName].gain.exponentialRampToValueAtTime(
			0.00001, audioContext.currentTime + parameterObject.length
		);
	} else if(parameterObject.endType === "linear") { //starts fading immediately
		audioObject[gainNodeName].gain.linearRampToValueAtTime(
			0.00001, audioContext.currentTime + parameterObject.length
		);	
	} else { //waits to stop
		audioObject[oscillatorNodeName].stop(audioContext.currentTime + parameterObject.delay + parameterObject.length);
	};
};

elements.c_note_block = {
	color: "#eb4034",
	name: "Note Block - C",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 261.63,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};

elements.cs_note_block = {
	color: "#fc3903",
	name: "Note Block - C Sharp",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 277.183,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};

elements.d_note_block = {
	color: "#fc6203",
	name: "Note Block - D",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 293.66,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};

elements.ef_note_block = {
	color: "#fc9803",
	name: "Note Block - E Flat",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 293.66,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};


elements.e_note_block = {
	color: "#fce303",
	name: "Note Block - E",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 329.63,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};

elements.f_note_block = {
	color: "#fce303",
	name: "Note Block - F",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 349.228,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};

elements.fs_note_block = {
	color: "#03fc3d",
	name: "Note Block - F Sharp",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 369.99,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};

elements.g_note_block = {
	color: "#03fcca",
	name: "Note Block - G",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 391.995,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};

elements.gs_note_block = {
	color: "#0394fc",
	name: "Note Block - G Sharp",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 415.305,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};

elements.a_note_block = {
	color: "#0f03fc",
	name: "Note Block - A",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 440,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};

elements.bf_note_block = {
	color: "#9803fc",
	name: "Note Block - B Flat",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 466.164,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};

elements.b_note_block = {
	color: "#fc03b5",
	name: "Note Block - B",
	behavior: behaviors.WALL,
	state: "solid",
	category: "note_blocks",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 493.883,
		type: "triangle",
		endType: "none",
		length: 0.5,
		volume: 0.7,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},
	tick: function(pixel) {
		var pixelSoundName = `x${pixel.x}y${pixel.y}`; //Generate unique-enough name
		
		var pixelPropertyObject = { //Load sound properties from pixel as object;
			frequency: pixel.frequency,
			type: pixel.type,
			endType: pixel.endType,
			length: pixel.length,
			volume: pixel.volume,
			delay: pixel.delay,
		};
		
		//console.log(pixelPropertyObject);
		
		if(pixel.debounce < 1) {
			//console.log(`${pixel.debounce} not debounced, play`);
			if(pixel.charge) {
				oscillator(pixelSoundName,pixelPropertyObject);
				delete pixel.charge;
				pixel.debounce = pixel.debounceLength;
			};
		} else if(pixel.debounce > 0) {
			//console.log(`${pixel.debounce} debounced, don't play`);
			pixel.debounce--;
		};
	},
};
