'use strict';

import testWebp from './modules/testWebp.js';
import burgerMenu from './modules/burgerMenu.js';

testWebp();
burgerMenu();

window.addEventListener('load', () => {
	document.querySelector('#transition-none').removeAttribute('id');
});