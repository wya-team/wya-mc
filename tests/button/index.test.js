const { resolve } = require('path');
const simulate = require('miniprogram-simulate');

test('button', () => {
	const id = simulate.load(resolve(__dirname, '../../lib/button/index'));
	const comp = simulate.render(id);
	const parent = document.createElement('parent-wrapper');
	comp.attach(parent);
	comp.detach();
});
