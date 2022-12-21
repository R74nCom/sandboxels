function placeAll(limit=null) {
	var elementArray = Object.keys(elements);
	if(typeof(limit) === "number") {
		elementArray = elementArray.slice(0,limit)
	};
	paused = true;
	counterLol = 0;
	loop1:
	for(i = 1; i < height; i++) {
		loop2:
		for(j = 1; j < width; j++) {
			if(isEmpty(j,i,false)) {
			  if(!outOfBounds(j,i)) {
				if(!elementArray[counterLol]) {
					break loop1;
				};
				createPixel(elementArray[counterLol],j,i);
				counterLol++;
			  } else { break loop1; };
			} else if(!isEmpty(j,i,true)) {
			  if(!outOfBounds(j,i)) {
				deletePixel(j,i)
				createPixel(elementArray[counterLol],j,i);
				counterLol++;
			  } else { break loop1; };
			}
		};
	};
	paused = true;
};
