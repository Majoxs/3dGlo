const togglePopUp = () => {

	const popUp = document.querySelector('.popup'),
		popUpContent = popUp.querySelector('.popup-content'),
		serviceBlock = document.getElementById('service-block');

	let widthUserWindow = document.documentElement.clientWidth;

	window.addEventListener('resize', () => {
		widthUserWindow = document.documentElement.clientWidth;
	});

	let count = -46,
		startTime;

	const popUpDown = () => {

		let currTime = new Date().getTime(),
			newPos = (count + ((currTime - startTime) / 200) * 30);

		popUpContent.style.top = newPos + '%';

		if (newPos < 31) {
			requestAnimationFrame(popUpDown);
		}
	};

	serviceBlock.addEventListener('click', event => {
		let target = event.target;
		target = target.closest('.popup-btn');

		if (target) {
			popUp.style.display = 'block';

			if (widthUserWindow > 768) {
				startTime = new Date().getTime();
				popUpDown();
			}
		}
	});

	popUp.addEventListener('click', event => {
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
