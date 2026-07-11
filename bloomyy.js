(function () {
    const threshold = 180;
    const radius = 16;
    const strength = 1;

    function init() {
        const canvas = document.getElementById("game");
        if (!canvas) {
            requestAnimationFrame(init);
            return;
        }

        const ctx = canvas.getContext("2d");

        const bright = document.createElement("canvas");
        const blurA = document.createElement("canvas");
        const blurB = document.createElement("canvas");

        function resize() {
            bright.width = blurA.width = blurB.width = canvas.width;
            bright.height = blurA.height = blurB.height = canvas.height;
        }

        resize();

        const bctx = bright.getContext("2d");
        const actx = blurA.getContext("2d");
        const cctx = blurB.getContext("2d");

        function bloom() {
            if (canvas.width !== bright.width || canvas.height !== bright.height) {
                resize();
            }

            const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const out = bctx.createImageData(canvas.width, canvas.height);

            const src = img.data;
            const dst = out.data;

            for (let i = 0; i < src.length; i += 4) {
                const l = src[i] * 0.2126 + src[i + 1] * 0.7152 + src[i + 2] * 0.0722;

                if (l >= threshold) {
                    dst[i] = src[i];
                    dst[i + 1] = src[i + 1];
                    dst[i + 2] = src[i + 2];
                    dst[i + 3] = src[i + 3];
                }
            }

            bctx.putImageData(out, 0, 0);

            actx.clearRect(0, 0, blurA.width, blurA.height);
            actx.filter = `blur(${radius}px)`;
            actx.drawImage(bright, 0, 0);

            cctx.clearRect(0, 0, blurB.width, blurB.height);
            cctx.filter = `blur(${radius}px)`;
            cctx.drawImage(blurA, 0, 0);

            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            ctx.globalAlpha = strength;
            ctx.drawImage(blurB, 0, 0);
            ctx.restore();

            requestAnimationFrame(bloom);
        }

        requestAnimationFrame(bloom);
    }

    init();
})();