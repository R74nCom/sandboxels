var modName = "mods/color_tools.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
	stripeFixedDefaultProperties = {
		color2: "rgb(0,0,0)",
		phase: 0,
		scale: 1,
		angle: 0
	};

	stripeSpreadingProperties = {
		color1: "It doesn't matter what I put here; I'm just sick of writing for loops.",
		color2: "stan loona",
	};

	/*stripeSpreadingProperties2 = {
		phase: 0,
		scale: 1, :eggTF:
		angle: 0
	};*/

	function stripeFunction(pixel) {
		if(pixel.color1 == undefined || pixel.color1 == null) {
			pixel.color1 = pixel.color;
		};
		for(prop in stripeFixedDefaultProperties) {
			if(pixel[prop] == undefined || pixel[prop] == null) {
				pixel[prop] = stripeFixedDefaultProperties[prop];
			};
		};

		//color1 and color2 self staining
		for (var i = 0; i < adjacentCoords.length; i++) {
			var x = pixel.x+adjacentCoords[i][0];
			var y = pixel.y+adjacentCoords[i][1];
			if(isEmpty(x,y,true)) {
				continue;
			};
			var otherPixel = pixelMap[x][y];
			for(prop in stripeSpreadingProperties) {
				if(otherPixel.element == pixel.element && pixel[prop] && otherPixel[prop]) {
					otherPixel[prop] = lerpColors(pixel[prop],otherPixel[prop]);
				};
			};
			/*for(prop in stripeSpreadingProperties2) {
				if(otherPixel.element == pixel.element && pixel[prop] !== undefined && otherPixel[prop] !== undefined) {
					otherPixel[prop] = pixel[prop]/2 + otherPixel[prop]/2;
				}; :eggTF:
			};*/
		};
		
		var radians = pixel.angle * (Math.PI / 180);

		var colorNumber = (pixel.x*Math.cos(radians))+(pixel.y*Math.sin(radians));

		var sineWeight = (1+Math.sin(pixel.phase + colorNumber / pixel.scale))/2;

		var preColor = lerpColors(pixel.color1,pixel.color2,"json",sineWeight);
		for(colorlet in preColor) {
			preColor[colorlet] = Math.round(preColor[colorlet]);
		};
		pixel.color = convertColorFormats(preColor,"rgb");
	};

	stripePaintDesc = `Exactly what it says on the button.
	<br/>
	Properties: <ol>
	<li>color1: The first color of the stripe</li>
	<li>color2: The second color of the stripe (defaults to black)</li>
	<li>scale: Relative width of the stripes, compared to the default</li>
	<li>phase: Offset in the position of the stripes (π/2 = 1 stripe width)</li>
	<li>angle: Angle in degrees<ul>
		<li>0 = vertical line</li>
		<li>45 = bottom left to top right</li>
		<li>90 = horizontal line</li>
		<li>135 = top left to bottom right...</li>
	</ul></li></ol>

	color1 and color2 spread through striped paint like dye does with itself. <u>color1</u> can be set <em>on initial placement</em> through the color picker, but otherwise, properties must be changed through the console or with prop.js's tools.

	<small><em style="color: #ff5555;">This does not work with HSL color and the game will black screen if one is somehow used.</em> The color conversion functions are a clusterf***.</small>`

	elements.stripe_paint = {
		behavior: behaviors.LIQUID,
		state: "liquid",
		density: 998,
		tempHigh: 100,
		stateHigh: "smoke",
		color: elements.paint.color,
		customColor: true,
		category: "special",
		properties: {
			color1: null,
			color2: null,
			scale: 1,
			phase: 0,
			angle: 0
		},
		stain: elements.dye.stain,
		tick: function(pixel) {
			stripeFunction(pixel);
		},
		desc: stripePaintDesc
	};
} else {
	alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
