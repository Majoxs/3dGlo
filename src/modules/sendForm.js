const sendForm = () => {
	event.preventDefault();
	let target = event.target;

	const errorMessage = 'Что-то пошло не так...',
		loadMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
		statusMessage = document.createElement('div'),
		formData = new FormData(target);

	const clearInput = () => {
		const inputAll = document.querySelectorAll('input');
		inputAll.forEach((elem) => {
			elem.value = '';
		});
		setTimeout(() => {
			statusMessage.style.display = 'none';
		}, 4000);
	};

	const postData = (formData) => fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify([...formData])
	});

	statusMessage.style.cssText = 'font-size: 2rem; color: #19b5fe;';
	target.appendChild(statusMessage);
	statusMessage.textContent = loadMessage;

	postData(formData)
		.then((response) => {
			if (response.status !== 200) {
				throw new Error('status network not 200');
			}
			statusMessage.textContent = successMessage;
		})
		.catch((error) => {
			statusMessage.textContent = errorMessage;
			console.error(error);
		})
		.finally(clearInput);
};

export default sendForm;
