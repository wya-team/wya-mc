const { resolve } = require('path');
const simulate = require('miniprogram-simulate');

test('number-dance', () => {
	const id = simulate.load(resolve(__dirname, '../../lib/number-dance/index'));
	const comp = simulate.render(id);
	const parent = document.createElement('parent-wrapper');
	comp.attach(parent);
	comp.detach();
});
