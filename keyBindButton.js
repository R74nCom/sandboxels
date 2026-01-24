async function _kBBprompt(message, defaultValue = "") {
    return new Promise(resolve => {
        promptInput(message, (result) => {
            resolve(result);
        }, "keyBindButton.js is asking you...", defaultValue);
        
    })
}
async function _jaydalert(message) {
    promptText(message, undefined, "Jayd:");
}
runAfterLoad(async () => {
    window.setTimeout(async () => {
            _jaydalert("Warning! keyBindButton.js is in beta, expect bugs.")
    },)
})

elements.keyBindButton = {
    color: "#bebfa3",
    onPlace: async (pixel) => {
        pixel.thisKeyIsBinded = await _kBBprompt("Select a key to bind.",(pixel.thisKeyIsBinded||undefined))
    },
    tick: (pixel) => {
        document.onkeydown = function(kb)/*keybind*/ {
            if (kb.key.toLowerCase() == pixel.thisKeyIsBinded.toLowerCase()) {
                pixel.charge = 1;
            }
        },
        document.onkeyup = function(kb)/*keybind*/ {
            if (kb.key.toLowerCase() == pixel.thisKeyIsBinded.toLowerCase()) {
            }
        }
        doDefaults(pixel);
    },
    perTick: () => {
        mouseSize = 1;
    },
    ignore: ["flash"],
    conduct: 1,
    movable: false,
    category:"machines",
    darkText: true,
    maxSize: 1
}