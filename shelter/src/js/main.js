'use strict';

import testWebp from './modules/testWebp.js';
import burgerMenu from './modules/burgerMenu.js';
import popupJson from './services/popup.json';
import popup from './modules/popup.js';
import slider from './modules/slider.js';

window.addEventListener('load', () => {
	document.querySelector('#transition-none').removeAttribute('id');
});
const addEvent = popup(popupJson);
burgerMenu();
testWebp();
slider(
	document.querySelector('.carousel__arrow_left'), 
	document.querySelector('.carousel__arrow_right'), 
	document.querySelector('.carousel__carousel'),
	addEvent);
