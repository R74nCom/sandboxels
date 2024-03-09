{
let currentVideoFrames = [];
let videoFrame = 0;
let processed = 0;
let started = false;
let videoWidth = 0;
let videoHeight = 0;
let FPS = tps / 2;

const splitHex = (hex) => hex.slice(1).match(/../g).map(a => Math.floor(parseInt(a, 16)));
const hexify = (rgb) => "#" + rgb.map(a => Math.floor(a).toString(16).padStart(2, "0")).join("");
function colorLerp(color_, color2_, t) {
    const color = splitHex(color_);
    const color2 = splitHex(color2_);
    const r = (1 - t) * color[0] + t * color2[0];
    const g = (1 - t) * color[1] + t * color2[1];
    const b = (1 - t) * color[2] + t * color2[2];
    return hexify([r, g, b]);
}

elements.video_pixel = {
    color: "#ffffff",
    hidden: true,
    category: "special",
    canPlace: false,
    tool: () => {},
    tick: (pixel) => {
        if (started && pixelTicks % (tps / FPS) == 0) {
            processed++;
            if (processed >= videoWidth * videoHeight) {
                videoFrame++;
                processed = 0;
            }
            if (videoFrame >= currentVideoFrames.length) {
                started = false;
                processed = 0;
                currentVideoFrames = [];
                videoFrame = 0;
            }

            pixel.color = currentVideoFrames[videoFrame % currentVideoFrames.length][pixel.y][pixel.x - Math.floor((width - videoWidth) / 2)];
        }
    }
}

const chunk = (arr, size) => arr.map((_, i) => i % size == 0 ? arr.slice(i, i + size) : null).filter(a => a)

elements.video = {
    color: ["#78bbff","#5bb81a"],
    onSelect: () => {
        if (!localStorage.getItem("video.js/tutorial")) {
            alert("Videos might take a while (up to a few minutes with larger videos) to load. During that time, do not delete any video pixels");
            localStorage.setItem("video.js/tutorial", true);
        }
        const file = document.createElement("input");
        file.type = "file";
        file.accept = "video/*";
        file.click();
        file.onchange = () => {
            setTimeout(() => {
                const video = document.createElement("video");
                video.preload = "auto";
                const url = URL.createObjectURL(file.files[0]);
                video.src = url;
                video.load();

                let canvas = document.createElement("canvas", {
                    willReadFrequently: true
                });
                let ctx = canvas.getContext("2d");
                video.onloadeddata = async () => {
                    const w = video.videoWidth;
                    const h = video.videoHeight;
                    const newHeight = height;
                    const newWidth = Math.floor((w / h) * newHeight);
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    videoWidth = newWidth;
                    videoHeight = newHeight;
                    
                    const videoLength = video.duration * FPS;
                    const seekBy = video.duration / videoLength;
        
                    for (let i = 0; i < newWidth; i++) {
                        for (let y = 0; y < newHeight; y++) {
                            const x = Math.floor((width - newWidth) / 2) + i;
                            if (pixelMap[x][y]) deletePixel(x, y);
                            createPixel("video_pixel", x, y);
                        }
                    };

                    video.currentTime = 0;

                    video.onseeked = () => {
                        ctx.drawImage(video, 0, 0, newWidth, newHeight);
                        const imageData = chunk(chunk(Array.from(ctx.getImageData(0, 0, newWidth, newHeight).data), 4), newWidth);
                        const frame = [];
                        for (let y = 0; y < newHeight; y++) {
                            frame[y] = [];
                            for (let x = 0; x < newWidth; x++) {
                                frame[y][x] = `#${imageData[y][x].slice(0, 3).map(a => a.toString(16).padStart(2, "0")).join("")}`
                            }
                        }
                        currentVideoFrames.push(frame);

                        if (currentVideoFrames.length >= videoLength) {
                            const audio = new Audio();
                            audio.src = url;
                            audio.play();
        
                            started = true;
                            videoFrame = 0;
                        } else {
                            video.currentTime += seekBy;
                        }
                    }
                }
            }, 500);
        }
    },
    tool: () => {},
    category: "special"
}
}