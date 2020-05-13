const { resolve } = require('path');
const simulate = require('miniprogram-simulate');

test('icon', () => {
	const id = simulate.load(resolve(__dirname, '../../lib/icon/index'));
	const comp = simulate.render(id);
	const parent = document.createElement('parent-wrapper');
	comp.attach(parent);
	comp.detach();
});
