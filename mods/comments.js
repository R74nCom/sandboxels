let comment = ""
dependOn(
    "debris.js",
    () => {
        elements.comment = {
            color: "#222222",
            state: "solid",
            onSelect: () => {
                promptInput("Enter the comment text", 
                (result) => {
                    if (result) {
                        comment = result
                    }
                }, 
                "comments.js is asking you...", 
                "")
            },
            tick: (pixel) => {
                if (pixel.start == pixelTicks) {
                    pixel.text = comment
                    pixel.cid = debris({
                        type: "text",
                        text: pixel.text,
                        color: "#fff",
                        size: 14,
                        x: pixel.x,
                        y: pixel.y
                    })
                }
            },
            onDelete: (pixel) => {
                removeDebris(pixel.cid)
            }
        }
    },
    true
)