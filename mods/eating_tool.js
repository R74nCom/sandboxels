// Sandboxels 1.11.1 için ALTERNATİF KESİN ÇÖZÜM
(function() {
    // 1. Yeme Aletini tanımla
    const eatingTool = {
        id: "eating_tool",
        name: "🍴 Yeme Aleti",
        color: "#8B4513",
        tool: function(pixel) {
            if (!pixel?.element) return;
            
            const elem = elements[pixel.element];
            if (!elem || (elem.category !== "food" && elem.category !== "powders")) return;
            
            // Sıcaklık mesajları
            let message;
            if (pixel.element === "ash") {
                message = "That's ash. Are you serious?";
            } else if (pixel.temp >= 150 && pixel.temp <= 200) {
                message = "Oh no my mouth burned!";
            } else if (pixel.temp > 100) {
                message = "This is hot!";
            } else if (pixel.temp > 30) {
                message = "This is delicious!";
            } else {
                message = "This is warm!";
            }
            
            // Mesaj göster
            const msg = document.createElement("div");
            msg.textContent = message;
            msg.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #8B4513;
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                z-index: 9999;
                font-family: Arial;
                animation: fadeIn 0.3s;
            `;
            document.body.appendChild(msg);
            setTimeout(() => msg.remove(), 2000);
            
            deletePixel(pixel.x, pixel.y);
        }
    };

    // 2. Direkt olarak Sandboxels'in araç sistemine enjekte et
    function injectTool() {
        // Elements'e ekle
        elements.eating_tool = eatingTool;
        
        // Araç listesini bul ve ekle
        if (window.tools && Array.isArray(window.tools.tool)) {
            if (!window.tools.tool.some(t => t.id === "eating_tool")) {
                window.tools.tool.push(eatingTool);
                window.tools.reloadTools();
                console.log("✅ Araç direkt olarak tools listesine eklendi");
                return true;
            }
        }
        
        // Eğer yukarıdaki çalışmazsa, alternatif yol
        try {
            const toolList = Object.values(elements).filter(e => e.tool && e.category === "tools");
            if (toolList.length > 0) {
                if (!toolList.some(t => t.id === "eating_tool")) {
                    elements.eating_tool = eatingTool;
                    if (window.tools && window.tools.reloadTools) {
                        window.tools.reloadTools();
                    }
                    console.log("✅ Araç alternatif yöntemle eklendi");
                    return true;
                }
            }
        } catch(e) {
            console.error("Enjeksiyon hatası:", e);
        }
        
        return false;
    }

    // 3. Sayfaya CSS ekle
    const style = document.createElement("style");
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .tool-icon[style*="background:#8B4513"] {
            box-shadow: 0 0 0 2px white;
        }
    `;
    document.head.appendChild(style);

    // 4. Enjekte etmeyi dene
    function tryInject() {
        if (injectTool()) {
            console.log("🎉 Yeme Aleti başarıyla eklendi!");
            return;
        }
        
        console.log("🔄 Sandboxels API'si bulunamadı, DOM manipülasyonu deneniyor...");
        
        // SON ÇARE: Direkt HTML'e enjekte et
        const toolsContainer = document.querySelector("#tools-container, .tools-container");
        if (toolsContainer) {
            const toolHTML = `
                <div class="tool" data-tool="eating_tool" title="Yeme Aleti">
                    <div class="tool-icon" style="background:#8B4513"></div>
                    <div class="tool-name">Yeme Aleti</div>
                </div>
            `;
            toolsContainer.insertAdjacentHTML("beforeend", toolHTML);
            
            // Tıklama olayını ekle
            const toolElement = toolsContainer.querySelector('[data-tool="eating_tool"]');
            toolElement.addEventListener("click", function() {
                selectedTool = "eating_tool";
                document.querySelectorAll(".tool").forEach(t => 
                    t.classList.remove("selected"));
                this.classList.add("selected");
            });
            
            console.log("✅ Araç direkt HTML'e eklendi");
        } else {
            console.error("❌ Hiçbir yöntem çalışmadı! Lütfen:");
            console.log("1. Sayfayı TAMAMEN yenileyin (Ctrl+Shift+R)");
            console.log("2. Kodu tekrar çalıştırın");
            console.log("3. https://sandboxels.r74n.com/ adresini dene");
        }
    }

    // 5. Sayfa yüklendiğinde çalıştır
    if (document.readyState === "complete") {
        tryInject();
    } else {
        window.addEventListener("load", tryInject);
    }

    console.log("Yeme Aleti modu yükleniyor...");
})();
