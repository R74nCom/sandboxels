audioContext = new AudioContext()

//Derived from marcgg's music.js

oscillatorDefaults = {
	frequency: 440,
	type: "sine",
	endType: "none",
	length: 1
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
	audioObject[oscillatorNodeName].type = parameterObject.type
	audioObject[oscillatorNodeName].connect(audioObject[gainNodeName])
	audioObject[oscillatorNodeName].frequency.value = parameterObject.frequency
	audioObject[gainNodeName].connect(audioContext.destination)
	audioObject[oscillatorNodeName].start(0)

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
		audioObject[oscillatorNodeName].stop(audioContext.currentTime + parameterObject.length);
	};
};

elements.note_block = {
	color: "#ee33ee",
	behavior: behaviors.WALL,
	state: "liquid",
	category: "liquids",
	density: 1200,
	hardness: 1,
	conduct: 1,
	properties: {
		frequency: 440,
		type: "sine",
		endType: "none",
		length: 1,
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