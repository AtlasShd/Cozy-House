'use strict';

import testWebp from './modules/testWebp.js';
import burgerMenu from './modules/burgerMenu.js';
import popupJson from './services/popup.json';
import popup from './modules/popup.js';
import slider from './modules/slider.js';
import pagination from './modules/pagination.js';

window.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.transition-none').removeAttribute('class');
});

const addPopupOnSliders = popup(popupJson);
burgerMenu();
testWebp();
slider(
	document.querySelector('.carousel__arrow_left'),
	document.querySelector('.carousel__arrow_right'),
	document.querySelector('.carousel__carousel'),
	addPopupOnSliders);
pagination(
	document.querySelector('.our-friends__btn-superleft'),
	document.querySelector('.our-friends__btn-left'),
	document.querySelector('.our-friends__btn-page'),
	document.querySelector('.our-friends__btn-right'),
	document.querySelector('.our-friends__btn-superright'),
	document.querySelector('.pages__body'),
	addPopupOnSliders);
