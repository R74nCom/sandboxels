function FillTool(x,y)
{
    if (!isEmpty(x,y))
    {
        oldElement = pixelMap[x][y].element;
    }
    else
    {
        oldElement = undefined;
    }
    
    Fill(x, y, oldElement);
}

function Fill(x, y, oldElement) 
{
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    
    if (pixelMap[x][y] !== undefined && oldElement !== undefined)
    {
        if (pixelMap[x][y].element != oldElement) return;
    }
    else
    {
        if (pixelMap[x][y] != oldElement) return;
    }
    

    var index = currentPixels.indexOf(pixelMap[x][y]);
    if (index > -1) 
    {
        currentPixels.splice(index, 1);
    }
    currentPixels.push(new Pixel(x, y, currentElement));
    
    Fill(x + 1, y, oldElement);
    Fill(x - 1, y, oldElement);
    Fill(x, y + 1, oldElement);
    Fill(x, y - 1, oldElement);
}

// Example: Fill(10, 10, pixelMap[10][10].element);