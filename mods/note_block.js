audioContext = new AudioContext()

//Derived from marcgg's music.js

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

elements.note_block = {
	color: "#ee33ee",
	behavior: behaviors.WALL,
	state: "solid",
	category: "machines",
	density: 1200,
	hardness: 0.2,
	breakInto: ["plastic","metal_scrap","metal_scrap","metal_scrap"],
	conduct: 1,
	properties: {
		frequency: 440,
		type: "sine",
		endType: "none",
		length: 1,
		volume: 1,
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

runAfterLoad(function() {
	elements.note_block.movable = false;
});

if(runAfterAutogen) {
	runAfterAutogen(function() {
		elements.note_block.movable = false;
	});
};
