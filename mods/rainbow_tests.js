elements.rainbow_alt_test = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/180)));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/180+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/180+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.red_test = {
	color: ["#ff0000","#200000","#ff0000","#200000"],
	tick: function(pixel) {
		var t = pixelTicks*2.5+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/18)));
		pixel.color = "rgb("+Math.ceil((r*(7/8))+32)+","+0+","+0+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_small = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/60)));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/60+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/60+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_x_d_t = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(pixelTicks/pixel.x))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(pixelTicks/pixel.x)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(pixelTicks/pixel.x)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/pixel.x)));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/pixel.x+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/pixel.x+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_y = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/pixel.y)));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/pixel.y+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/pixel.y+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_d = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.sqrt(pixel.x**2+pixel.y**2)))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.sqrt(pixel.x**2+pixel.y**2))+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.sqrt(pixel.x**2+pixel.y**2))+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_x_p_y = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x+pixel.y))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x+pixel.y)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x+pixel.y)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_x_m_y = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x-pixel.y))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x-pixel.y)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x-pixel.y)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_x_t_y = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x*pixel.y))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x*pixel.y)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x*pixel.y)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_x_d_y = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x/pixel.y))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x/pixel.y)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x/pixel.y)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_x_e_y = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x**pixel.y))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x**pixel.y)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x**pixel.y)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_x_r_y = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.pow(pixel.x, 1/pixel.y)))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.pow(pixel.x, 1/pixel.y))+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.pow(pixel.x, 1/pixel.y))+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_x_l_y = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.log(pixel.x) / Math.log(pixel.y)))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.log(pixel.x) / Math.log(pixel.y))+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.log(pixel.x) / Math.log(pixel.y))+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_s_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/Math.sin(pixel.x))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/Math.sin(pixel.x)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/Math.sin(pixel.x)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_c_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/Math.cos(pixel.x))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/Math.cos(pixel.x)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/Math.cos(pixel.x)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_t_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/Math.tan(pixel.x))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/Math.tan(pixel.x)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/Math.tan(pixel.x)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_sh_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/Math.sinh(pixel.x))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/Math.sinh(pixel.x)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/Math.sinh(pixel.x)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_ch_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/Math.cosh(pixel.x))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/Math.cosh(pixel.x)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/Math.cosh(pixel.x)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_th_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/Math.tanh(pixel.x))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/Math.tanh(pixel.x)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/Math.tanh(pixel.x)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_sr_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/Math.sqrt(pixel.x))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/Math.sqrt(pixel.x)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/Math.sqrt(pixel.x)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_d_m_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.sqrt(pixel.x**2+pixel.y**2))-pixel.x)));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.sqrt(pixel.x**2+pixel.y**2))-pixel.x+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.sqrt(pixel.x**2+pixel.y**2))-pixel.x+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_d_t_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.sqrt(pixel.x**2+pixel.y**2))*pixel.x)));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.sqrt(pixel.x**2+pixel.y**2))*pixel.x+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(Math.sqrt(pixel.x**2+pixel.y**2))*pixel.x+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_x_d_d = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x/(Math.sqrt(pixel.x**2+pixel.y**2))))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x/(Math.sqrt(pixel.x**2+pixel.y**2)))+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x/(Math.sqrt(pixel.x**2+pixel.y**2)))+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_x_mod_y = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x%pixel.y))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x%pixel.y)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/(pixel.x%pixel.y)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

elements.rainbow_alt_test_pixel_d_mod_x = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/((Math.sqrt(pixel.x**2+pixel.y**2))%pixel.x))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/((Math.sqrt(pixel.x**2+pixel.y**2))%pixel.x)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/((Math.sqrt(pixel.x**2+pixel.y**2))%pixel.x)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}
elements.rainbow_alt_test_pixel_d_mod_y = {
	color: ["#ffaacc","#ffaacc","#aaccff","#aaccff","#ffffbb","#ffffbb"],
	tick: function(pixel) {
		var t = pixelTicks*3+pixel.x+pixel.y;
		var r = Math.floor(255*(1-Math.cos(t*Math.PI/((Math.sqrt(pixel.x**2+pixel.y**2))%pixel.y))));
		var g = Math.floor(255*(1-Math.cos(t*Math.PI/((Math.sqrt(pixel.x**2+pixel.y**2))%pixel.y)+2*Math.PI/3)));
		var b = Math.floor(255*(1-Math.cos(t*Math.PI/((Math.sqrt(pixel.x**2+pixel.y**2))%pixel.y)+4*Math.PI/3)));
		pixel.color = "rgb("+Math.ceil((r/2)+127)+","+Math.ceil((g/2)+127)+","+Math.ceil((b/2)+127)+")";
		doHeat(pixel);
	},
	category: "idk",
}

