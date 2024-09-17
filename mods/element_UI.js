// element_UI.js - Redbirdly's Mod that adds an alternative square element UI

// Convert any html-valid color into RGB
function cssColorToRGB(color) {
	const div = document.createElement('div');
	div.style.color = color;
	document.body.appendChild(div);
	const computedColor = window.getComputedStyle(div).color;
	document.body.removeChild(div);
	const rgbValues = computedColor.match(/\d+/g).map(Number);
	return rgbValues;
}

function getColorBrightness(color) {
	const [r, g, b] = cssColorToRGB(color);
	return (r * 299 + g * 587 + b * 114) / 1000;
}

function createButtons(elements, inputDivId, currentCategory) {
	const elementControls = document.getElementById('elementControls');
	const existingContainer = document.getElementById('grid-container');
	if (existingContainer) {
		existingContainer.remove();
	}

	const container = document.createElement('div');
	container.id = 'grid-container';
	Object.assign(container.style, {
		display: 'grid',
		gap: '5px',
		maxHeight: '280px',
		overflowY: 'hidden',
		overflowX: 'auto',
		scrollbarColor: 'rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.1)',
		scrollbarWidth: 'thin'
	});

	const buttonNames = [];
	let numButtons = 0;
	let numColumns = 0;

	for (let index in elements) {
		if (elements.hasOwnProperty(index) && elements[index].category !== "tools" && elements[index].category === currentCategory) {
			const name = index.replace(/_/g, ' ');
			numButtons++;
			let color = 'gray';
			if (elements[index].color !== undefined) {
				if (typeof elements[index].color === 'string') {
					color = elements[index].color;
				} else if (Array.isArray(elements[index].color)) {
					color = elements[index].color[0];
				}
			}
			buttonNames.push({ name, color });
		}
	}

	numColumns = Math.ceil(numButtons / 3);
	container.style.gridTemplateColumns = `repeat(${numColumns}, 60px)`;
	container.style.gridTemplateRows = 'repeat(3, 60px)';

	buttonNames.forEach((buttonInfo, index) => {
		const button = document.createElement('div');
		button.className = 'grid-item';
		button.style.backgroundColor = buttonInfo.color;
		button.innerText = buttonInfo.name;
		const brightness = getColorBrightness(buttonInfo.color);
		button.style.color = brightness > 210 ? 'black' : 'white';
		Object.assign(button.style, {
			width: '60px',
			height: '60px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: '8px',
			cursor: 'pointer',
			border: '4px solid transparent',
			borderRadius: '0px',
			textAlign: 'center',
			wordWrap: 'break-word',
			transition: 'background-color 0.3s, color 0.3s, border 0.3s'
		});

		button.addEventListener('click', function() {
			document.querySelectorAll('.grid-item').forEach(btn => {
				btn.classList.remove('selected');
				btn.style.border = '4px solid transparent';
			});
			button.classList.add('selected');
			button.style.border = '4px solid white';
			currentElement = buttonInfo.name.replace(' ', '_');
			const element = elements[currentElement];
			if (element && typeof element.onSelect === 'function') {
				element.onSelect();
			}
		});

		container.appendChild(button);
	});

	const inputDiv = document.createElement('div');
	inputDiv.id = inputDivId;

	elementControls.insertAdjacentElement('afterend', container);
	container.insertAdjacentElement('afterend', inputDiv);
	elementControls.style.display = 'none';
}

function getCurrentCategory() {
	const categoryButtons = document.querySelectorAll('[current="true"]');
	if (categoryButtons.length === 0) {
		return null;
	}
	return categoryButtons[0].id.replace("categoryButton-", "");
}

function selectCategory(category) {
	if (!category) { return; }
	const categoryButton = document.getElementById("categoryButton-"+category);
	if (!categoryButton) { return; }
	if (categoryButton.classList.contains("notify")) {
		categoryButton.classList.remove("notify");
	}
	const categoryDiv = document.getElementById("category-"+category);
	for (let i = 0; i < categoryButton.parentNode.children.length; i++) {
		const e = categoryDiv.parentNode.children[i];
		e.style.display = "none";
		document.getElementById("categoryButton-"+e.getAttribute("category")).setAttribute("current", false);
	}
	categoryDiv.style.display = "block";
	categoryButton.setAttribute("current", true);
	createButtons(elements, 'input-div', category);
}

const initialCategory = getCurrentCategory();
if (initialCategory) {
	selectCategory(initialCategory);
}

selectElement("sand");