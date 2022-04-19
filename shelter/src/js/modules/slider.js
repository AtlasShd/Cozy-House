'use strict';

export default function slider(prevBtn, nextBtn, carousel) {
	const DOGS_NAMES = ['Katrine', 'Jennifer', 'Woody', 'Sophia', 'Timmy', 'Charly', 'Scarlett', 'Freddie'],
		toPrev = true,
		toNext = false,
		fromPrev = true,
		fromNext = false;

	let isEnabled = true,
		step = 3,
		stepPx = 360,
		currentCards = [];

	prevBtn.addEventListener('click', prevSlide);
	nextBtn.addEventListener('click', nextSlide);

	window.addEventListener('resize', setStep);

	function setStep() {
		if (window.matchMedia('(max-width: 767px)').matches) {
			stepPx = 270 + ((window.screen.width - 290) / 1.971);
			step = 1;
		} else if (window.matchMedia('(max-width: 1024px)').matches) {
			stepPx = 270 + ((window.screen.width - 733) / 0.866);
			step = 2;
		} else if (window.matchMedia('(max-width: 1280px)').matches) {
			stepPx = 270 + ((window.screen.width - 1018) / 2.91);
			console.log(window.screen.width, stepPx);
			step = 3;
		}
		console.log(step);
	}
	setStep();

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
			removeCards(fromNext);
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
			removeCards(fromPrev);
			carousel.style.left = byStep(+step);
			isEnabled = true;
			checkCurrentItems();
		}, 500);
	}

	function byStep(s) {
		const left = stepPx * s;
		return +carousel.style.left.substring(0, carousel.style.left.length - 2) + left + 'px';
	}

	function checkCurrentItems() {
		currentCards = DOGS_NAMES.slice();
		for (let card of carousel.children) {
			currentCards.splice(currentCards.indexOf(card.getAttribute('data-name')), 1);
		}
		console.log(currentCards);
	}
	checkCurrentItems();

	function renderCards(where) {
		for (let i = 0; i < step; i++) {
			const randomNumber = Math.floor(Math.random() * (5 - i));

			new Card(carousel, currentCards[randomNumber]).render(where);

			currentCards.splice(currentCards.indexOf(currentCards[randomNumber]), 1);
		}
	}

	function removeCards(where) {
		for (let i = 0; i < step; i++) {
			if (where) {
				carousel.removeChild(carousel.firstElementChild);
			} else {
				carousel.removeChild(carousel.lastElementChild);
			}
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
