/* eslint-disable max-len */
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
    countTimer('31 august 2021');

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

    //Change pictures
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
    changePictures();

    //Validation
    const validation = () => {

        const calcBlock = document.querySelector('.calc-block'),
            footerForm = document.getElementById('form2'),
            nameInput = document.getElementById('form2-name'),
            emailInput = document.getElementById('form2-email'),
            phoneInput = document.getElementById('form2-phone'),
            messageInput = document.getElementById('form2-message');

        calcBlock.addEventListener('input', (event) => {
            let target = event.target;

            if (!target.matches('input.calc-item')) {
                return;
            }

            target.value = target.value.replace(/\D/g, '');
        });

        footerForm.addEventListener('change', (event) => {
            let target = event.target;
            
            if (!target.matches('#form2-name, #form2-email, #form2-phone, #form2-message')) {
                return;
            }

            if (target.id === 'form2-name') {
                nameInput.addEventListener('blur', () => {
                    nameInput.value = nameInput.value.replace(/^[\s|-]|[^а-яё\s-]|[\s|-]$/gi, '');          
                    nameInput.value = nameInput.value.replace(/\s{2,}/gi, ' ');
                    nameInput.value = nameInput.value.replace(/-{2,}/gi, '-');
                    nameInput.value = nameInput.value.replace(/[А-ЯЁ]/g, (l) => l.toLowerCase());
                    nameInput.value = nameInput.value.replace(/( |^|-)[а-яё]/g, (u) => u.toUpperCase());
                });
            }

            if (target.id === 'form2-email') {
                emailInput.addEventListener('blur', () => {
                    // eslint-disable-next-line no-useless-escape
                    emailInput.value = emailInput.value.match(/\w+[-_\.!~\*']+?\w+@\w+\.\w{2,3}/g);
                });
            }

            if (target.id === 'form2-phone') {
                phoneInput.addEventListener('blur', () => {
                    phoneInput.value = phoneInput.value.match(/\+?[78]([-()]*\d){10}/g);
                });
            }

            if (target.id === 'form2-message') {
                messageInput.addEventListener('blur', () => {
                    messageInput.value = messageInput.value.replace(/^[\s|-]|[^а-яё\s-]|[\s|-]$/gi, '');          
                    messageInput.value = messageInput.value.replace(/\s{2,}/gi, ' ');
                    messageInput.value = messageInput.value.replace(/-{2,}/gi, '-');
                });
            }

        });
    };
    validation();

    //Calculator
    const calc = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };
        
        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });

    };
    calc(100);

});
