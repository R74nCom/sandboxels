document.addEventListener("keydown", function(e) {
	if (e.keyCode == 83) {
		document.getElementById("game").toBlob(function(blob) { 
			const item = new ClipboardItem({ "image/png": blob });
			navigator.clipboard.write([item]); 
		});
		alert("Canvas copied!");
	}
})