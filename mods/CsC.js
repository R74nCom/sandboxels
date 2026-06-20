runAfterLoad(function(){
  const patternCache = {};
  let currentPatternID = null;
  let nextPatternID = 1;
  const undoStack = [];
  const redoStack = [];
  const maxHistory = 50;

  function saveAction(pixels){
    undoStack.push(pixels.map(px=>({x:px.x,y:px.y,element:px.element,color:px.color,patternID:px.patternID})));
    if(undoStack.length>maxHistory) undoStack.shift();
    redoStack.length=0;
  }

  function undo(){
    if(!undoStack.length) return;
    const action = undoStack.pop();
    const redoPixels = [];
    action.forEach(a=>{
      const px = pixelMap[a.x][a.y];
      redoPixels.push({x:a.x,y:a.y,element:px.element,color:px.color,patternID:px.patternID});
      px.element=a.element; px.color=a.color; px.patternID=a.patternID;
    });
    redoStack.push(redoPixels);
  }

  function redo(){
    if(!redoStack.length) return;
    const action = redoStack.pop();
    const undoPixels = [];
    action.forEach(a=>{
      const px = pixelMap[a.x][a.y];
      undoPixels.push({x:a.x,y:a.y,element:px.element,color:px.color,patternID:px.patternID});
      px.element=a.element; px.color=a.color; px.patternID=a.patternID;
    });
    undoStack.push(undoPixels);
  }

  elements.undo_tool = {
    color:"#f00", tool:undo, category:"tools", description:"Undo last action"
  };
  elements.redo_tool = {
    color:"#0f0", tool:redo, category:"tools", description:"Redo last undone action"
  };

  elements.pattern_painter = {
    color:"#888", tool:function(pixel,x,y){
      if(!currentPatternID){
        currentPatternID="pattern_"+(nextPatternID++);
        patternCache[currentPatternID]=Array(8).fill().map(()=>Array(8).fill(0));
      }
      const pat = patternCache[currentPatternID];
      const mx=Math.floor((x*8)%8), my=Math.floor((y*8)%8);
      pat[my][mx]=1-pat[my][mx];
    }, category:"tools", description:"Pattern painter (8x8)"
  };

  function drawPattern(ctx, pat, dx, dy, s){
    for(let py=0;py<8;py++)for(let px=0;px<8;px++){
      if(pat[py][px]){
        ctx.fillStyle="#444";
        ctx.fillRect(dx+px*s/8, dy+py*s/8, s/8, s/8);
      }
    }
  }

  elements.decor_block={
    color:"#fff", behavior:behaviors.WALL, category:"solids",
    onPlace:p=>{if(currentPatternID)p.patternID=currentPatternID; saveAction([p]);},
    renderer:function(p,ctx,dx,dy,s){
      if(p.patternID) drawPattern(ctx, patternCache[p.patternID], dx, dy, s);
      else { ctx.fillStyle=p.color; ctx.fillRect(dx,dy,s,s); }
    }
  };

  elements.batch_filler={
    color:"#66f",
    tool:function(pixel){
      const area=[];
      for(let dx=-2;dx<=2;dx++)for(let dy=-2;dy<=2;dy++){
        const px=pixelMap[pixel.x+dx]?.[pixel.y+dy];
        if(px){px.element="decor_block"; if(currentPatternID) px.patternID=currentPatternID; area.push(px);}
      }
      saveAction(area);
    },
    category:"tools",
    description:"Fill 5x5 area with pattern"
  };

  elements.stamp_tool={
    color:"#ff0",
    tool:function(pixel){
      if(!currentPatternID) return;
      const area=[];
      for(let dx=0;dx<8;dx++)for(let dy=0;dy<8;dy++){
        const px=pixelMap[pixel.x+dx]?.[pixel.y+dy];
        if(px){px.element="decor_block"; px.patternID=currentPatternID; area.push(px);}
      }
      saveAction(area);
    },
    category:"tools",
    description:"Stamp 8x8 pattern"
  };

  elements.gradient_tool={
    color:"#0ff",
    tool:function(pixel){
      const area=[];
      for(let dx=0;dx<5;dx++)for(let dy=0;dy<5;dy++){
        const px=pixelMap[pixel.x+dx]?.[pixel.y+dy];
        if(px){
          const r=Math.floor(255*dx/4), b=Math.floor(255*dy/4);
          px.element="decor_block";
          px.color=`rgb(${r},0,${b})`;
          area.push(px);
        }
      }
      saveAction(area);
    },
    category:"tools",
    description:"Paint 5x5 gradient"
  };

  elements.curve_tool={
    color:"#f0f",
    tool:function(pixel){
      const area=[];
      for(let i=0;i<5;i++){
        const px=pixelMap[pixel.x+i]?.[pixel.y+Math.floor(Math.sin(i/4*Math.PI)*4)];
        if(px){px.element="decor_block"; if(currentPatternID) px.patternID=currentPatternID; area.push(px);}
      }
      saveAction(area);
    },
    category:"tools",
    description:"Draw sine curve with pattern"
  };

});
