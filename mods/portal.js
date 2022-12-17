var modName = "mods/portal.js";
var onTryMoveIntoMod = "mods/onTryMoveInto.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(onTryMoveIntoMod) && enabledMods.includes(libraryMod)) {
	//https://stackoverflow.com/a/60922255
	if(!enabledMods.includes("mods/mobs.js")) {
		headBodyObject = {
			"head": "body",
		};
	};

	elements.portal_in = {
		color: "#ee7f00",
		properties: {
			_channel: 0,
			_correspondingPortals: null,
		},
		insulate: true,
		onTryMoveInto: function(pixel,otherPixel) {
			if(pixel._correspondingPortals == null) {
				return;
			};
			if(pixel._correspondingPortals.length <= 0) {
				return;
			};
			
			var portal = randomChoice(pixel._correspondingPortals);
			
			var offset = {x: pixel.x - otherPixel.x, y: pixel.y - otherPixel.y}; //teleport destination's offset, inverted by subtraction
			
			var destination = {x: portal.x + offset.x, y: portal.y + offset.y};

			var otherElement = otherPixel.element;
			var isHead = (typeof(headBodyObject[otherElement]) !== "undefined");
			var isBody = (typeof(getKeyByValue(headBodyObject,otherElement)) !== "undefined");
			var isBipartite = xor(isHead,isBody); //a head being its own body will break the code	
			
			if(isBipartite) {
				if(isHead) {
					var dead = otherPixel.dead;
					var body = pixelMap[otherPixel.x][otherPixel.y+1];
					if(body == undefined) { body = null };
					if(!dead && (body !== null)) {
						if(offset.y == -1) {
							offset.y--;
							destination.y--;
						};
						var headSpotIsEmpty = isEmpty(destination.x,destination.y,false);
						var bodySpotIsEmpty = isEmpty(destination.x,destination.y+1,false);
						if(headSpotIsEmpty && bodySpotIsEmpty) {
							tryMove(otherPixel,destination.x,destination.y);
							tryMove(body,destination.x,destination.y+1);
						};
					} else {
						tryMove(otherPixel,destination.x,destination.y);
					};
				} else if(isBody) {
					var dead = otherPixel.dead;
					var head = pixelMap[otherPixel.x][otherPixel.y-1];
					if(head == undefined) { head = null };
					if(!dead && (head !== null)) {
						if(offset.y == 1) {
							offset.y++;
							destination.y++;
						};
						var headSpotIsEmpty = isEmpty(destination.x,destination.y-1,false);
						var bodySpotIsEmpty = isEmpty(destination.x,destination.y,false);
						if(headSpotIsEmpty && bodySpotIsEmpty) {
							tryMove(head,destination.x,destination.y-1);
							tryMove(otherPixel,destination.x,destination.y);
						};
					} else {
						tryMove(otherPixel,destination.x,destination.y);
					};
				};
			} else {
				tryMove(otherPixel,destination.x,destination.y);
			};
		},
		tick: function(pixel) {
			pixel._channel = Math.floor(pixel.temp / 100);

			pixel._correspondingPortals = currentPixels.filter(function(pixelToCheck) {
				return (
					pixelToCheck.element == "portal_out" &&
					pixelToCheck._channel == pixelChannel
				);
			},pixelChannel=pixel._channel);
			
			for(i = 0; i < pixel._correspondingPortals.length; i++) {
				pixel._correspondingPortals[i] = {x: pixel._correspondingPortals[i].x, y: pixel._correspondingPortals[i].y};
			};
			
			//pixel.tempdebug = JSON.stringify(pixel._correspondingPortals);
		},
		category: "machines",
		state: "solid",
	},

	elements.portal_out = {
		color: "#2222ee",
		properties: {
			channel: 0
		},
		insulate: true,
		tick: function(pixel) {
			pixel._channel = Math.floor(pixel.temp / 100);
		},
		behavior: behaviors.WALL,
		category: "machines",
		state: "solid",
		insulate: true,
	}
} else {
	if(!enabledMods.includes(libraryMod))		{ enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	if(!enabledMods.includes(onTryMoveIntoMod))	{ enabledMods.splice(enabledMods.indexOf(modName),0,onTryMoveIntoMod) };
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The "${libraryMod}" and "${onTryMoveIntoMod}" mods are all required; any missing mods in this list have been automatically inserted (reload for this to take effect).`)
};
