const togglePopUp = () => {

	const popUp = document.querySelector('.popup'),
		popUpContent = popUp.querySelector('.popup-content'),
		serviceBlock = document.getElementById('service-block'),
		widthUserWindow = document.documentElement.clientWidth;

	serviceBlock.addEventListener('click', (event) => {
		let target = event.target;
		target = target.closest('.popup-btn');

		if (target) {
			popUp.style.display = 'block';
			let count = -57,
				popUpInterval;
			const popUpDown = () => {
				popUpInterval = requestAnimationFrame(popUpDown);
				count++;
				count < 31 ? popUpContent.style.top = `${count}%` : cancelAnimationFrame(popUpInterval);
			};

			if (widthUserWindow > 768) {
				popUpInterval = requestAnimationFrame(popUpDown);
			}
		}
	});

	popUp.addEventListener('click', (event) => {
		let target = event.target;

		if (target.classList.contains('popup-close')) {
			popUp.style.display = 'none';
		} else {
			target = target.closest('.popup-content');
			if (!target) {
				popUp.style.display = 'none';
			}
		}
	});

};

export default togglePopUp;
