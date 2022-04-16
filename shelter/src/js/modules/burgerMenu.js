'use strict';

export default function burgerMenu() {
	const burgerShadow = document.querySelector('.burger__shadow'),
		burgerContainer = document.querySelector('.burger__container'),
		headerBurger = document.querySelector('.header__burger'),
		burgerBurger = document.querySelector('.burger__burger');

	headerBurger.addEventListener('click', toggleBurger);
	burgerBurger.addEventListener('click', toggleBurger);

	burgerShadow.addEventListener('click', toggleBurger);

	function toggleBurger() {
		burgerContainer.classList.toggle('show-burger');

		burgerShadow.classList.toggle('half-opacity');
		burgerShadow.classList.toggle('pointer-events');

		headerBurger.classList.toggle('rotate-burger');
		burgerBurger.classList.toggle('rotate-burger');
	}
}