/* eslint-disable no-trailing-spaces */
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

        const addZero = num => (num < 10 ? `0${num}` : num);

        function updateClock() {
            const timer = getTimeRemaining();

            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if (timer.timeRemaining <= 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        updateClock();
        setInterval(updateClock, 1000);
    }
    countTimer('28 august 2021');

    //Menu
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
    toggleMenu();

    //PopUp
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
    togglePopUp();

    //Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        
        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    //Slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');

        const addDots = () => {
            const portfolioDots = document.querySelector('.portfolio-dots');
            let countDots = 0;

            while (countDots < slide.length) {
                const li = document.createElement('li');
                li.classList.add('dot');
                portfolioDots.appendChild(li);
                countDots++;
            }

            const dotActive = portfolioDots.querySelector('.dot');
            dotActive.classList.add('dot-active');

        };
        addDots();

        const dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');
        
        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            // eslint-disable-next-line prefer-const
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(2000);

    };
    slider();

});
