runAfterLoad(function(){
  const patternCache = {};
  let currentPatternID = null;
  let nextPatternID = 1;

  elements.pattern_painter = {
    color:"#888", tool:function(pixel,x,y){
      if(!currentPatternID){
        currentPatternID = "pattern_"+(nextPatternID++);
        patternCache[currentPatternID] = Array(8).fill().map(()=>Array(8).fill(0));
      }
      const pat = patternCache[currentPatternID];
      const mx = Math.floor((x*8)%8), my = Math.floor((y*8)%8);
      pat[my][mx] = 1 - pat[my][mx];
    },
    category:"tools",
    description:"Pattern painter (8x8)"
  };

  function drawPattern(ctx, pat, dx, dy, s){
    for(let py=0;py<8;py++){
      for(let px=0;px<8;px++){
        if(pat[py][px]){
          ctx.fillStyle = "#444";
          ctx.fillRect(dx + px*s/8, dy + py*s/8, s/8, s/8);
        }
      }
    }
  }

  function blendColors(c1,c2,t){
    const parse = c=>parseInt(c.slice(1),16);
    const r1=((parse(c1)>>16)&255), g1=((parse(c1)>>8)&255), b1=(parse(c1)&255);
    const r2=((parse(c2)>>16)&255), g2=((parse(c2)>>8)&255), b2=(parse(c2)&255);
    const r=Math.floor(r1*(1-t)+r2*t), g=Math.floor(g1*(1-t)+g2*t), b=Math.floor(b1*(1-t)+b2*t);
    return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
  }

  elements.decor_block = {
    color:"#fff", behavior:behaviors.WALL, category:"solids",
    onPlace: p=>{ if(currentPatternID) p.patternID=currentPatternID; },
    renderer: function(p, ctx, dx, dy, s){
      if(p.patternID){
        drawPattern(ctx, patternCache[p.patternID], dx, dy, s);
      } else { ctx.fillStyle=p.color; ctx.fillRect(dx, dy, s, s); }
    }
  };

  elements.fader_block = {
    color:"#fff", behavior:behaviors.WALL, category:"solids",
    onPlace: p=>{ if(currentPatternID) p.patternID=currentPatternID; },
    renderer: function(p, ctx, dx, dy, s){
      const pat = p.patternID ? patternCache[p.patternID] : null;
      if(!pat){ ctx.fillStyle=p.color; ctx.fillRect(dx, dy, s, s); return; }
      for(let py=0;py<8;py++){
        const t = py/7;
        for(let px=0;px<8;px++){
          const c = pat[py][px] ? blendColors("#000","#555",t) : blendColors("#ccc","#eee",t);
          ctx.fillStyle=c;
          ctx.fillRect(dx+px*s/8, dy+py*s/8, s/8, s/8);
        }
      }
    }
  };

  elements.cloth = {
    color:"#aaa", behavior:behaviors.POWDER, category:"solids",
    onPlace: p=>{ if(currentPatternID) p.patternID=currentPatternID; p.vy=0; },
    tick: function(p){
      if(p.y+1>=pixelGridHeight) return;
      const below = pixelMap[p.x][p.y+1];
      if(!below||elements[below.element].behavior!==behaviors.WALL) p.y++;
    },
    renderer: function(p, ctx, dx, dy, s){
      if(p.patternID) drawPattern(ctx, patternCache[p.patternID], dx, dy, s);
      else ctx.fillStyle=p.color; ctx.fillRect(dx, dy, s, s);
    }
  };

  elements.fence_block = {
    color:"#666", behavior:behaviors.WALL, category:"solids",
    onPlace: p=>{ if(currentPatternID) p.patternID=currentPatternID; },
    renderer: function(p, ctx, dx, dy, s){
      if(p.patternID) drawPattern(ctx, patternCache[p.patternID], dx, dy, s);
      else ctx.fillStyle=p.color; ctx.fillRect(dx, dy, s, s);
    }
  };

  runEveryTick(function(){
    renderPrePixel(function(p, ctx, dx, dy, s){
      if(p.element==="decor_block"||p.element==="fader_block"||p.element==="cloth"||p.element==="fence_block"){
        const shade = ctx.createLinearGradient(dx, dy, dx, dy+s);
        shade.addColorStop(0,"rgba(0,0,0,0)");
        shade.addColorStop(1,"rgba(0,0,0,0.3)");
        ctx.fillStyle=shade;
        ctx.fillRect(dx, dy, s, s);
      }
    });
  });
});
