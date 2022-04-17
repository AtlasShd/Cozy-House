'use strict';

export default function slider(prevBtn, nextBtn, carousel) {

	const DOGS_NAMES = [
		'Katrine',
		'Jennifer',
		'Woody',
		'Sophia',
		'Timmy',
		'Charly',
		'Scarlett',
		'Freddie'
	];

	const toPrev = true,
		toNext = false;

	let isEnabled = true,
		step = 3,
		currentCards = [];

	prevBtn.addEventListener('click', prevSlide);
	nextBtn.addEventListener('click', nextSlide);

	function prevSlide() {
		if (!isEnabled) {
			return;
		}
		carousel.classList.remove('left-transition');
		renderCards(toPrev);
		carousel.style.left = byStep(-step);
		isEnabled = false;
		setTimeout(() => {
			carousel.classList.add('left-transition');
			carousel.style.left = byStep(+step);
		}, 0);
		setTimeout(() => {
			carousel.removeChild(carousel.lastElementChild);
			carousel.removeChild(carousel.lastElementChild);
			carousel.removeChild(carousel.lastElementChild);
			isEnabled = true;
			checkCurrentItems();
		}, 500);
	}

	function nextSlide() {
		if (!isEnabled) {
			return;
		}
		carousel.classList.add('left-transition');
		carousel.style.left = byStep(-step);
		renderCards(toNext);
		isEnabled = false;
		setTimeout(() => {
			carousel.classList.remove('left-transition');
			carousel.removeChild(carousel.firstElementChild);
			carousel.removeChild(carousel.firstElementChild);
			carousel.removeChild(carousel.firstElementChild);
			carousel.style.left = byStep(+step);
			isEnabled = true;
			checkCurrentItems();
		}, 500);
	}

	function byStep(s) {
		const left = 360 * s;
		return (+carousel.style.left.substring(0, carousel.style.left.length - 2) + left) + 'px';
	}

	function checkCurrentItems() {
		currentCards = DOGS_NAMES.slice();
		for (let card of carousel.children) {
			currentCards.splice(currentCards.indexOf(card.getAttribute('data-name')), 1);
		}
	}
	checkCurrentItems();

	function renderCards(where) {
		for (let i = 0; i < step; i++) {
			const randomNumber = Math.floor(Math.random() * (8 - step - i));

			new Card(carousel, currentCards[randomNumber]).render(where);

			currentCards.splice(currentCards.indexOf(currentCards[randomNumber]), 1);
		}
	}

	class Card {
		constructor(parent, name) {
			this.parent = parent;
			this.name = name;
		}

		render(direction) {
			this.element = document.createElement('div');
			this.element.classList.add('carousel__card', 'card');
			this.element.setAttribute('data-name', this.name);

			this.element.innerHTML = `
				<div class="card__img">
					<img src="assets/images/${this.name}.png" alt="${this.name}">
				</div>
				<div class="card__name">${this.name}</div>
				<div class="card__btns">
					<button class="card__btn button">Learn more</button>
				</div>
			`;
			if (direction) {
				this.parent.prepend(this.element);
			} else {
				this.parent.append(this.element);
			}
		}
	}
}