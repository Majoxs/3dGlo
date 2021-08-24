/* eslint-disable arrow-parens */
/* eslint-disable indent */
/* eslint-disable strict */
/* eslint-disable prefer-arrow-callback */

window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        const addingZero = (number) => {
            if (number < 10) {
                number = '0' + number;
            }
            return number;
        };

        function updateClock() {
            const timer = getTimeRemaining();

            timerHours.textContent = addingZero(timer.hours);
            timerMinutes.textContent = addingZero(timer.minutes);
            timerSeconds.textContent = addingZero(timer.seconds);

            if (timer.timeRemaining <= 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    countTimer('25 august 2021');

    //Menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {

        const popUp = document.querySelector('.popup'),
        popUpBtn = document.querySelectorAll('.popup-btn'),
        popUpClose = document.querySelector('.popup-close'),
        popUpContent = popUp.querySelector('.popup-content'),
        widthUserWindow = document.documentElement.clientWidth;

        let count = -57;
        let popUpInterval;

        const popUpDown = function () {
            popUpInterval = requestAnimationFrame(popUpDown);
            count++;
            if (count < 31) {
                popUpContent.style.top = count + '%';
            } else {
                cancelAnimationFrame(popUpInterval);
            }
        };


        popUpBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
                if (widthUserWindow > 768) {
                    popUpInterval = requestAnimationFrame(popUpDown);
                }
            });
        });

        popUpClose.addEventListener('click', () => {
            popUp.style.display = 'none';
        });

    };
    togglePopUp();
});
