const toggleMenu = () => {

	const btnMenu = document.querySelector('.menu'),
		menu = document.querySelector('menu'),
		menuItems = menu.querySelectorAll('ul>li>a');

	const handlerMenu = () => {
		menu.classList.toggle('active-menu');
	};

	btnMenu.addEventListener('click', handlerMenu);

	menu.addEventListener('click', (event) => {
		let target = event.target;

		if (target.classList.contains('close-btn')) {
			handlerMenu();
		} else {
			target = target.closest('ul>li>a');
			if (target) {
				menuItems.forEach(() => handlerMenu());
			}
		}
	});

};

export default toggleMenu;
