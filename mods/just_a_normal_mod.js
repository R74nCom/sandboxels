// Find and remove ad containers
function removeAds() {
	var adSelectors = ['.ad-container', '#ad', '.adsbygoogle'];
	adSelectors.forEach(selector => {
		var ads = document.querySelectorAll(selector);
		ads.forEach(ad => {
			ad.remove();
//			console.log(`Removed ad: ${selector}`);
		});
	});
};

// Observe for changes
var observer = new MutationObserver(mutations => {
	for (var mutation of mutations) {
		if (mutation.addedNodes.length > 0) {
			removeAds(); // Check if new ads were added
		}
	}
});

removeAds();

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });
