// ---------- Minimap.js (BLOCO ÚNICO) ----------
// Mod: Minimap - adiciona minimapa com zoom ajustável
mods.registerMod({
    name: "Minimap",
    version: "1.0",
    description: "Adiciona minimapa com zoom 1x, 2x, 4x e 8x"
});

/////////////////////
// CONFIGURAÇÃO DO MINIMAPA
/////////////////////
minimap = {
    enabled: true,
    zoomLevels: [1, 2, 4, 8],
    currentZoomIndex: 0,
    size: 200, // tamanho do minimapa em pixels
    position: { x: 20, y: 20 } // posição no canto superior esquerdo
};

/////////////////////
// FUNÇÃO PARA MUDAR ZOOM
/////////////////////
function toggleMinimapZoom() {
    minimap.currentZoomIndex = (minimap.currentZoomIndex + 1) % minimap.zoomLevels.length;
}

/////////////////////
// DESENHO DO MINIMAPA
/////////////////////
function drawMinimap(ctx, world) {
    if(!minimap.enabled) return;
    
    const zoom = minimap.zoomLevels[minimap.currentZoomIndex];
    const mapSize = minimap.size;
    
    // Cria área do minimapa
    ctx.save();
    ctx.translate(minimap.position.x, minimap.position.y);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, mapSize, mapSize);
    
    // Calcula proporção do mundo
    const scaleX = mapSize / (world.width * zoom);
    const scaleY = mapSize / (world.height * zoom);
    
    // Desenha cada elemento do mundo
    for(let y = 0; y < world.height; y++){
        for(let x = 0; x < world.width; x++){
            const cell = world.getCell(x, y);
            if(cell){
                ctx.fillStyle = cell.color || "#ffffff";
                ctx.fillRect(x * scaleX, y * scaleY, scaleX, scaleY);
            }
        }
    }
    
    ctx.restore();
}

/////////////////////
// ATALHO DE TECLADO
/////////////////////
document.addEventListener("keydown", (e)=>{
    if(e.key === "z" || e.key === "Z"){ // tecla Z troca zoom
        toggleMinimapZoom();
    }
});
