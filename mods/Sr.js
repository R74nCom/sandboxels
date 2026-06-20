runAfterLoad(function(){

  // ==================== Sr 鍶 (金屬) ====================
  elements.Sr = {
    name: "Strontium",
    symbol: "Sr",
    color: "#D0D0E0",
    behavior: behaviors.SOLID,
    category: "metals",
    state: "solid",
    density: 2640,
    hardness: 80,
    meltingPoint: 777,
    conductivity: 0.18,
    description: "鹼土金屬，遇水劇烈反應，焰色洋紅",
    
    // 遇水 → 氫氧化鍶 + 氫氣
    onCollide: function(p, o){
      if(o.element === elements.WATER){
        setElement(p, elements.SrOH);
        createParticle(p.x, p.y-1, elements.H2);
      }
      // 遇鹽酸 → 氯化鍶 + 氫氣
      if(o.element === elements.HCL){
        setElement(p, elements.SrCl2);
        createParticle(p.x, p.y, elements.H2);
      }
    },
    
    // 燃燒 → SrO
    update: function(p){
      if(p.hoveringElement === elements.O2){
        setElement(p, elements.SrO);
      }
    }
  };

  // ==================== SrO 氧化鍶 ====================
  elements.SrO = {
    name: "Strontium Oxide",
    symbol: "SrO",
    color: "#F8F8F8",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 4700,
    description: "氧化鍶，白色粉末"
  };

  // ==================== SrOH 氫氧化鍶 ====================
  elements.SrOH = {
    name: "Strontium Hydroxide",
    symbol: "Sr(OH)2",
    color: "#F0F0F8",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3600,
    description: "氫氧化鍶，鹼性"
  };

  // ==================== SrCl2 氯化鍶 (你要的!) ====================
  elements.SrCl2 = {
    name: "Strontium Chloride",
    symbol: "SrCl2",
    color: "#FF90AA",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3050,
    description: "氯化鍶，焰色反應 洋紅色",
    
    // 火焰 → 洋紅色光
    update: function(p){
      if(p.hoveringElement === elements.FIRE){
        p.color = "#FF2A66";
        setTimeout(()=>{p.color="#FF90AA"},20);
      }
    }
  };

});
