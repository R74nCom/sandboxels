zzzz204689123_array = Object.keys(elements);

    function placeAll(limit=zzzz204689123_array.length) {
        zzzz204689123_array = Object.keys(elements);
        paused = true;
        counterLol = 0;
        loop1:
        for(i = 1; i < height; i++) {
            loop2:
            for(j = 1; j < width; j++) {
                if(isEmpty(j,i)) {
                    if(!zzzz204689123_array[counterLol] || counterLol > limit) {
                        break loop1;
                    };
                    createPixel(zzzz204689123_array[counterLol],j,i);
                    counterLol++;
                } else {
                    break loop1;
                }
            };
        };
        paused = true;
    };
