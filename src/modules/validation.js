const validation = () => {

	const calcBlock = document.querySelector('.calc-block'),
		bodyMain = document.querySelector('body');

	calcBlock.addEventListener('input', (event) => {
		let target = event.target;

		if (!target.matches('input.calc-item')) {
			return;
		}

		target.value = target.value.replace(/\D/g, '');
	});

	bodyMain.addEventListener('input', (event) => {
		let target = event.target;

		if (target.name === 'user_name') {
			target.addEventListener('input', () => {
				target.value = target.value.replace(/^[^а-яё\s]+$/gi, '');
				target.value = target.value.replace(/[А-ЯЁ]/g, (l) => l.toLowerCase());
				target.value = target.value.replace(/( |^|-)[а-яё]/g, (u) => u.toUpperCase());
			});
			target.addEventListener('blur', () => {
				target.value = target.value.replace(/^[\s]|[^а-яё\s]|[\s]$/gi, '');
				target.value = target.value.replace(/\s{2,}/gi, ' ');
			});
		}

		if (target.name === 'user_email') {
			target.addEventListener('input', () => {
				target.value = target.value.replace(/[^a-z@.]/g, '');
			});
			target.addEventListener('blur', () => {
				target.value = target.value.match(/\w+[-_.!~*']?\w+@\w+\.\w{2,4}/g);
			});
		}

		if (target.name === 'user_phone') {
			target.addEventListener('input', () => {
				target.value = target.value.replace(/[^\d+()-]/g, '');
			});
			target.addEventListener('change', () => {
				target.value = target.value.match(/\+?[78]([-()]*\d){10}/g);
			});
		}

		if (target.name === 'user_message') {
			target.addEventListener('input', () => {
				target.value = target.value.replace(/^[^а-яё\s]+$/gi, '');
			});
			target.addEventListener('blur', () => {
				target.value = target.value.replace(/^[\s]|[^а-яё\s\d,.]|[\s]$/gi, '');
				target.value = target.value.replace(/\s{2,}/gi, ' ');
			});
		}

	});
};

export default validation;
