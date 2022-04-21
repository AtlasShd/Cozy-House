'use strict';

export default function popup(popupJson) {

	function addEvent() {
		const cards = document.querySelectorAll('.card');

		cards.forEach(card => {
			card.addEventListener('click', showPopup);
		});
	}
	addEvent();

	class PopupCard {
		constructor(name, img, type, breed, description, age, inoculations, diseases, parasites, parentSelector) {
			this.name = name;
			this.img = img;
			this.type = type;
			this.breed = breed;
			this.description = description;
			this.age = age;
			this.inoculations = inoculations;
			this.diseases = diseases;
			this.parasites = parasites;
			this.parent = document.querySelector(parentSelector);
		}

		setEvents(elem) {
			document.querySelector('.popup__shadow').addEventListener('click', closePopup);
			document.querySelector('.popup__cross').addEventListener('click', closePopup);

			function closePopup() {
				elem.remove();
			}
		}

		render() {
			this.element = document.createElement('div');
			this.element.classList.add('popup');

			this.element.innerHTML = `
				<div class="popup__shadow"></div>
				<div class="popup__container">
					<div class="popup__cross"><span>&#215;</span></div>
					<div class="popup__img">
						<img src="${this.img}" alt="${this.name}">
					</div>
					<div class="popup__column">
						<div class="popup__title">
							<h3 class="popup__name">${this.name}</h3>
							<h4 class="popup__type-breed">${this.type} - ${this.breed}</h4>
						</div>
						<h5 class="popup__description">${this.description}</h5>
						<div class="popup__character">
							<p class="popup__age"><span class="bold">Age:</span> ${this.age}</p>
							<p class="popup__inoculations"><span class="bold">Inoculations:</span> ${this.inoculations}</p>
							<p class="popup__diseases"><span class="bold">Diseases:</span> ${this.diseases}</p>
							<p class="popup__parasites"><span class="bold">Parasites:</span> ${this.parasites}</p>
						</div>
					</div>
				</div>
			`;
			this.parent.append(this.element);
			this.setEvents(this.element);
		}
	}

	function showPopup(e) {
		const cardName = checkCard(e.target)

		const [{
			name,
			img,
			type,
			breed,
			description,
			age,
			inoculations,
			diseases,
			parasites }] = popupJson.filter(({ name }) => cardName == name);

		new PopupCard(name, img, type, breed, description, age, inoculations, diseases, parasites, 'main').render();
	}

	function checkCard(elem) {
		const name = elem.getAttribute('data-name');
		return name ? name : checkCard(elem.parentElement);
	}

	return addEvent;
}