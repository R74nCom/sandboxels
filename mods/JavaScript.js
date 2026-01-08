// run.js - JavaScript execution mod for Sandboxels
// Adds a tool to run arbitrary JavaScript code

elements.run = {
    color: ["#00FF00", "#000000", "#00FF00", "#000000", "#00FF00", "#000000"],
    tool: function(pixel) {
        // This tool does nothing when placing pixels
        // All functionality is in onSelect
    },
    onSelect: function() {
        // Prompt for JavaScript code
        promptInput(
            "tool can run ANY .js code as example `alert(\"Sandboxels Game!\")`",
            function(code) {
                if (!code || code.trim() === "") return;
                
                try {
                    // Execute the code
                    eval(code);
                    logMessage("JavaScript code executed");
                    
                } catch (error) {
                    alert("Error: " + error.message);
                    console.error("Run.js error:", error);
                    logMessage("Error executing code: " + error.message);
                }
            },
            "Execute JavaScript",
            "alert(\"Sandboxels Game!\")"
        );
    },
    category: "tools",
    desc: "Execute arbitrary JavaScript code. Hotkey: J",
    maxSize: 1
};

// Add to toolbar at the end
runAfterLoad(function() {
    // Wait for toolbar to load
    setTimeout(function() {
        // Find the toolbar container
        const toolbar = document.querySelector('.tools-container') || 
                       document.querySelector('.toolbar');
        
        if (toolbar) {
            // Create button for run tool
            const runButton = document.createElement('div');
            runButton.className = 'tool tool-run';
            runButton.innerHTML = `
                <div class="tool-icon" style="background: linear-gradient(45deg, #000000 25%, #00FF00 25%, #00FF00 50%, #000000 50%, #000000 75%, #00FF00 75%);"></div>
                <div class="tool-name">run</div>
            `;
            runButton.title = "Execute JavaScript code (run tool) - Hotkey: J";
            runButton.onclick = function() {
                selectElement('run');
            };
            
            // Add to toolbar
            toolbar.appendChild(runButton);
            
            // Update tooltips
            if (typeof updateTooltips === 'function') {
                updateTooltips();
            }
        }
    }, 1000);
});

// Add keyboard shortcut J (JavaScript)
keybinds.J = function() {
    selectElement('run');
    logMessage("Selected run tool (J)");
    return true;
};
