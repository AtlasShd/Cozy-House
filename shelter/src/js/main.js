'use strict';

import testWebp from './modules/testWebp.js';
import burgerMenu from './modules/burgerMenu.js';
import popupJson from './services/popup.json';
import popup from './modules/popup.js';
import slider from './modules/slider.js';

testWebp();
burgerMenu();
popup(popupJson);
slider(document.querySelector('.carousel__arrow_left'), document.querySelector('.carousel__arrow_right'), document.querySelector('.carousel__carousel'));

window.addEventListener('load', () => {
	document.querySelector('#transition-none').removeAttribute('id');
});