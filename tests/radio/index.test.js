const { resolve } = require('path');
const simulate = require('miniprogram-simulate');

test('radio', () => {
	const id = simulate.load(resolve(__dirname, '../../lib/radio/index'));
	const comp = simulate.render(id);
	const parent = document.createElement('parent-wrapper');
	comp.attach(parent);
	comp.detach();
});
