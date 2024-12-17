window.addEventListener('load', function() {
	for (var element in elements) {
		elements[element].isFood = true;
	}
	elements.head.isFood = false;
	elements.body.isFood = false;
});
