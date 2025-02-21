// Clouds.js beta version

// Biased random
function randomGaussian(A, B, biasFactor=2) {
    let u = Math.random();
    let v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    let mean = (A + B) / 2;
    let stdDev = (B - A) / biasFactor;

    let result = mean + num * stdDev;

    return Math.min(Math.max(result, A), B);
}

// Spawn clouds
var clouds = [];
setTimeout(() => {
	for (var i = 0;i < 50;i++) {
		var w = (Math.random() * 13) + 7;
		var h = (Math.random() * 9) + 4;

		// Higher clouds = faster
		var y = randomGaussian(0, height * 0.75, 5);
		var speedFactor = (1 - (y / (height * 0.75)));

		clouds.push({
			x: Math.random() * (width - w),
			y: y,
			w: w,
			h: h,
			dx: ((Math.random() - 0.5) * 0.05) * (0.5 + speedFactor * 2),
			type: Math.random() > 0.5 ? 1 : 0
		});
	}
}, 200);

function renderClouds(ctx) {
	ctx.strokeStyle = "transparent";
	ctx.globalAlpha = 1.0;

	for (var i = 0;i < clouds.length;i++) {
		var cloud = clouds[i];

		var gradient = ctx.createLinearGradient(
			cloud.x * pixelSize, cloud.y * pixelSize,
			cloud.x * pixelSize, (cloud.y + cloud.h) * pixelSize
		);

		var cloudColor = cloud.type == 1 ? "255,255,255" : "220,220,210"
		gradient.addColorStop(0, `RGBA(${cloudColor},0.1)`);
		gradient.addColorStop(1, `RGBA(${cloudColor},0.2)`);

		ctx.filter = "blur(1px)";
		ctx.fillStyle = gradient;
		ctx.fillRect(cloud.x * pixelSize, cloud.y * pixelSize, cloud.w * pixelSize, cloud.h * pixelSize);
		ctx.filter = "none";
	}
}

function updateClouds() {
	if (paused) {return;}

	for (var i = 0;i < clouds.length;i++) {
		var cloud = clouds[i];

		cloud.x += cloud.dx;

		// Wrap around
		if (cloud.x > width) {
			cloud.x = -cloud.w;
		} else if (cloud.x + cloud.w < 0) {
			cloud.x = width;
		}
	}
}

renderPrePixel(renderClouds);
runEveryTick(updateClouds);
