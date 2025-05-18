runAfterReset(()=>{
    const gradient = ctx.createLinearGradient(0,0, width*pixelSize,height*pixelSize);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(0.125, '#ff8800');
    gradient.addColorStop(0.25, '#ffff00');
    gradient.addColorStop(0.375, '#00ff00');
    gradient.addColorStop(0.5, '#00ffff');
    gradient.addColorStop(0.625, '#0000ff');
    gradient.addColorStop(0.75, '#8800ff');
    gradient.addColorStop(1, '#ff00ff');
    settings.mouseColor = gradient;
})