'use strict';

import testWebp from './modules/testWebp.js';
import burgerMenu from './modules/burgerMenu.js';
import popupJson from './services/popup.json';
import popup from './modules/popup.js';

testWebp();
burgerMenu();
popup(popupJson);

window.addEventListener('load', () => {
	document.querySelector('#transition-none').removeAttribute('id');
});