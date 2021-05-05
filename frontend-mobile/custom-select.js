let CustomSelect = {};

CustomSelect.create = ({
	baseElement, options, value,
	selectedElementUpdater, dropdownElementGenerator
}) => {
	if (options.length == 0) throw new Error('empty items array');

	baseElement.classList.add('custom-select');

	if (dropdownElementGenerator === undefined) {
		dropdownElementGenerator = (option) => {
			let element = document.createElement('div');
			element.classList.add('option');
			element.classList.add('default');
			element.innerText = option.name;
			return element;
		}
	}
	if (selectedElementUpdater === undefined) {
		selectedElementUpdater = (selectedElement, option) => {
			while (selectedElement.firstChild != null) {
				selectedElement.removeChild(selectedElement.firstChild);
			}

			selectedElement.classList.add('default');
			
			let selected = document.createElement('div');
			selected.classList.add('selected-option');
			selected.innerText = option.name;

			let dropdownIndicator = document.createElement('div');
			dropdownIndicator.classList.add('dropdown-indicator');
			dropdownIndicator.innerText = '\u25be';

			selectedElement.appendChild(selected);
			selectedElement.appendChild(dropdownIndicator);
		}
	}

	let selectedElement = document.createElement('div');
	selectedElement.classList.add('selected');

	let selectedIndex = 0;
	function select(index) {
		selectedIndex = index;
		selectedElementUpdater(selectedElement, options[selectedIndex]);
	}

	let dropdownMenuContainer = document.createElement('div');
	dropdownMenuContainer.classList.add('dropdown-container');

	let dropdownMenu = document.createElement('div');
	dropdownMenu.classList.add('dropdown');

	dropdownMenuContainer.appendChild(dropdownMenu);

	baseElement.appendChild(selectedElement);
	baseElement.appendChild(dropdownMenuContainer);

	let windowClickHandler = (e) => {
		if (e.toggledDropdown == baseElement) return;
		closeDropdown();
	}

	function toggleDropdown() {
		dropdownMenu.classList.toggle('open');
		if (dropdownMenu.classList.contains('open')) {
			window.addEventListener('click', windowClickHandler);
		}
	}

	function closeDropdown() {
		dropdownMenu.classList.remove('open');
		window.removeEventListener('click', windowClickHandler);
	}

	let index = 0;
	for (let option of options) {
		let thisIndex = index;
		let optionElement = dropdownElementGenerator(option);
		optionElement.addEventListener('click', () => {
			select(thisIndex);
		});
		dropdownMenu.appendChild(optionElement);
		index += 1;
	}

	baseElement.addEventListener('click', (e) => {
		toggleDropdown();
		e.toggledDropdown = baseElement;
	});

	

	Object.defineProperty(baseElement, 'value', {
		get: () => {
			return options[selectedIndex].value
		},
		set: (value) => {
			for (let index = 0; index < options.length; ++index) {
				let option = options[index];
				if (option.value == value) {
					select(index);
				}
			}
			// ignore if the value is different
		}
	});

	select(0);
	this.value = value;

}
