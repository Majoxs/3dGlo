/* eslint-disable strict */
'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePictures from './modules/changePictures';
import validation from './modules/validation';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('10 september 2021');
//Menu
toggleMenu();
//PopUp
togglePopUp();
//Tabs
tabs();
//Slider
slider();
//Change pictures
changePictures();
//Validation
validation();
//Calculator
calc(100);
//send-ajax-form
const bodyMain = document.querySelector('body');
bodyMain.addEventListener('submit', sendForm);

window.addEventListener('hashchange', () => {
	history.replaceState('', '', '/');
});
