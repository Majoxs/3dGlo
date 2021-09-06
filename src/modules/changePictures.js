const changePictures = () => {

	const command = document.getElementById('command');
	let src;

	command.addEventListener('mouseover', (event) => {
		if (!event.target.matches('.command__photo')) {
			return;
		}
		src = event.target.getAttribute('src');
		event.target.src = event.target.dataset.img;
	});

	command.addEventListener('mouseout', (event) => {
		if (!event.target.matches('.command__photo')) {
			return;
		}
		event.target.src = src;
	});

};

export default changePictures;
