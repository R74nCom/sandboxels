= new AudioContext()

//orbit-loona made the note block mod but then I just added more, so don’t credit me for making a note block system.audioContext 

oscillatorDefaults = {
	frequency: 440,
	type: "sine",
	endType: "none",
	length: 0.5,
	volume: 1,
	delay: 0,
};

audioObject = {};

function oscillator(name="test",parameterObject=oscillatorDefaults){ 
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

elements.note_block_very_high = {
	color: “#dc1212",
	behavior: behaviors.WALL,
	state: "solid",
	category: “music",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 600,
		type: "sine",
		endType: "none",
		length: 0.5,
		volume: 1,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},

elements.note_block_high = {
	color: "#e5359f",
	behavior: behaviors.WALL,
	state: "solid",
	category: “music",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 500,
		type: "sine",
		endType: "none",
		length: 0.5,
		volume: 1,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},


elements.note_block = {
	color: "#ee33ee",
	behavior: behaviors.WALL,
	state: "solid",
	category: “music",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 400,
		type: "sine",
		endType: "none",
		length: 0.5,
		volume: 1,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},


elements.note_block_low = {
	color: "#7310a7",
	behavior: behaviors.WALL,
	state: "solid",
	category: "machines",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 300,
		type: "sine",
		endType: "music",
		length: 0.5,
		volume: 1,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},

elements.note_block_very_low = {
	color: "#3310d8",
	behavior: behaviors.WALL,
	state: "solid",
	category: "music",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 200,
		type: "sine",
		endType: "none",
		length: 0.5,
		volume: 1,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},

elements.note_block_super_low = {
	color: “#12c6dc",
	behavior: behaviors.WALL,
	state: "solid",
	category: “music",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 200,
		type: "sine",
		endType: "none",
		length: 0.5,
		volume: 1,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},

elements.note_block_test = {
	color: “#ffffff",
	behavior: behaviors.WALL,
	state: "solid",
	category: “music",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 400,
		type: "square",
		endType: "none",
		length: 0.5,
		volume: 1,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	},

elements.note_block_loud = {
	color: "#000000",
	behavior: behaviors.WALL,
	state: "solid",
	category: “music",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 440,
		type: "sine",
		endType: "none",
		length: 1,
		volume: 10,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	tick: function(pixel) {

elements.note_block_long = {
	color: "#23ab0f",
	behavior: behaviors.WALL,
	state: "solid",
	category: “music",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 400,
		type: "sine",
		endType: "none",
		length: 2.5,
		volume: 1,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	tick: function(pixel) {

elements.note_block_beep = {
	color: "#f8e258",
	behavior: behaviors.WALL,
	state: "solid",
	category: “music",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 1000,
		type: "sine",
		endType: "none",
		length: 0.1,
		volume: 1,
		delay: 0,
		debounce: 0,
		debounceLength: tps,
	tick: function(pixel) {

elements.note_connecter_fast = {
    color: "#ac2b2b",
    behavior: behaviors.WALL,
    category: "music",
    insulate: true,
    conduct: 2,
    noMix: true,
},

elements.note_connecter = {
    color: "#c8c22d",
    behavior: behaviors.WALL,
    category: "music",
    insulate: true,
    conduct: 1,
    noMix: true,
},

elements.note_connecter_slow = {
    color: "#2d6fc8",
    behavior: behaviors.WALL,
    category: "music",
    insulate: true,
    conduct: 0.5,
    noMix: true,
},

elements.note_connecter_very_slow = {
    color: "#184584",
    behavior: behaviors.WALL,
    category: "music",
    insulate: true,
    conduct: 0.1,
    noMix: true,
},

elements.generator= {
    color: "#989888",
    behavior: [
        "XX|SH|XX",
        "SH|XX|SH",
        "XX|SH|XX",
    category: "machines",
    ],

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

runAfterLoad(function() {
	elements.note_block.movable = false;
});

if(runAfterAutogen) {
	runAfterAutogen(function() {
		elements.note_block.movable = false;
	});
};
