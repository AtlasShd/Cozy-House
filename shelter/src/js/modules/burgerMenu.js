'use strict';

export default function burgerMenu() {
	const burger = document.querySelector('.burger__container'),
		headerBurger = document.querySelector('.header__burger'),
		burgerBurger = document.querySelector('.burger__burger');

	headerBurger.addEventListener('click', toggleBurger);
	burgerBurger.addEventListener('click', toggleBurger);

	function toggleBurger() {
		headerBurger.classList.toggle('rotate-burger');
		burgerBurger.classList.toggle('rotate-burger');

		burger.classList.toggle('show-burger');
	}
}