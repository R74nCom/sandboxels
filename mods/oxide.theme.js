// Oxide.theme.js
let hasAppliedTheme = false;

runAfterReset(function applyTheme() {
	// Only run once
	if (hasAppliedTheme) return;
	hasAppliedTheme = true;

	const css = `
		:root {
			--theme: #66AC92;
			--theme-dark: #015C53;
			--theme-darker: #015C53;
			--theme-darker-opac85: #015C5377;
			--theme-darkest: #0B1E1A;
			--theme-darkest2: #0B1E1A;
			--theme-opac85: #66AC9279;
			--theme-opac75: #66AC92BF;
			--theme-opac50: #00000080;
			--theme-opac25: #66AC9240;
			--theme-opac10: #66AC921A;
		}
		
		a {
			color: var(--theme);
			text-decoration: underline;
		}
	`;

	let styleTag = document.getElementById("themeStyle");
	if (!styleTag) {
		styleTag = document.createElement("style");
		styleTag.id = "themeStyle";
		document.body.appendChild(styleTag);
	}

	styleTag.textContent = css;

	document
		.getElementById('extraInfo')
		.querySelectorAll('*')
		.forEach(el => {
			el.style.color = '#66AC92';
			el.style.background = 'none';
		});
});
