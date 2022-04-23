'use strict';

export default function pagination(superprevBtn, prevBtn, pageBtn, nextBtn, supernextBtn, body, addEvent) {
	if (!body) {
		return;
	}
	const arrNames = createArrNames();
	let pagesBody = body,
		cardsOnPage = 8,
		currentPage = 1;

	window.addEventListener('resize', setCardsOnPage);

	function setCardsOnPage() {
		if (window.matchMedia('(max-width: 767px)').matches) {
			cardsOnPage = 3;
			changePage(currentPage);
		} else if (window.matchMedia('(max-width: 1279px)').matches) {
			cardsOnPage = 6;
			changePage(currentPage);
		} else {
			cardsOnPage = 8;
			changePage(currentPage);
		}
	}
	setCardsOnPage();

	superprevBtn.addEventListener('click', () => {
		changePage(1);
		turnPage();
		showPage();
	});

	prevBtn.addEventListener('click', () => {
		changePage(currentPage - 1);
		turnPage();
		showPage();
	});

	nextBtn.addEventListener('click', () => {
		changePage(currentPage + 1);
		turnPage();
		showPage();
	});

	supernextBtn.addEventListener('click', () => {
		changePage(arrNames.length / cardsOnPage);
		turnPage();
		showPage();
	});

	function changePage(page) {
		currentPage = page;

		if (currentPage <= 1) {
			superprevBtn.classList.add('notbutton');
			prevBtn.classList.add('notbutton');
		} else {
			superprevBtn.classList.remove('notbutton');
			prevBtn.classList.remove('notbutton');
		}

		if (currentPage >= arrNames.length / cardsOnPage) {
			supernextBtn.classList.add('notbutton');
			nextBtn.classList.add('notbutton');
		} else {
			supernextBtn.classList.remove('notbutton');
			nextBtn.classList.remove('notbutton');
		}

		while (!arrNames[cardsOnPage * currentPage - 1]) {
			currentPage -= 1;
		}
	}

	function showPage() {
		pageBtn.innerHTML = currentPage;
	}

	function turnPage() {
		const secondBody = document.createElement('div');
		secondBody.classList.add('pages__body');

		fillPage(secondBody);

		pagesBody.parentElement.append(secondBody);

		pagesBody.classList.remove('pages__body');
		pagesBody.classList.add('pages__second-body');

		pagesBody.classList.add('enterInvis');
		secondBody.classList.add('exitInvis');

		pagesBody.addEventListener('animationend', () => {
			pagesBody.remove();
			secondBody.classList.remove('exitInvis');
			pagesBody = secondBody;
		});
		addEvent();
	}

	class Card {
		constructor(parent, name) {
			this.parent = parent;
			this.name = name;
		}

		render() {
			this.element = document.createElement('div');
			this.element.classList.add('pages__card', 'card');
			this.element.setAttribute('data-name', this.name);

			this.element.innerHTML = `
				<div class="card__img">
					<img src="assets/images/${this.name}.png" alt="${this.name}" width="270" height="270">
				</div>
				<div class="card__name">${this.name}</div>
				<div class="card__btns">
					<button class="card__btn button">Learn more</button>
				</div>
			`;
			this.parent.append(this.element);
		}
	}

	function fillPage(parent) {
		for (let i = cardsOnPage * currentPage - cardsOnPage; i < cardsOnPage * currentPage; i++) {
			new Card(parent, arrNames[i]).render();
		}
	}
	fillPage(pagesBody);
	addEvent();

	function createArrNames() {

		const DOGS_NAMES = ['Katrine', 'Jennifer', 'Woody', 'Sophia', 'Timmy', 'Charly', 'Scarlett', 'Freddie'];

		let randomNames = [];

		for (let i = 0; i < 6; i++) {
			let tempDogsNames = [...DOGS_NAMES];
			for (let j = 0; j < 8; j++) {
				let randomNumber = Math.floor(Math.random() * (8 - j));
				if (i > 0) {
					while (
						tempDogsNames[randomNumber] == randomNames[randomNames.length - 1] ||
						tempDogsNames[randomNumber] == randomNames[randomNames.length - 2] ||
						tempDogsNames[randomNumber] == randomNames[randomNames.length - 3] ||
						tempDogsNames[randomNumber] == randomNames[randomNames.length - 4] ||
						tempDogsNames[randomNumber] == randomNames[randomNames.length - 5]) {
						randomNumber = Math.floor(Math.random() * (8 - j));
					}
				}
				randomNames.push(tempDogsNames[randomNumber]);
				tempDogsNames.splice(tempDogsNames.indexOf(tempDogsNames[randomNumber]), 1);
			}
		}

		return randomNames;
	}
}