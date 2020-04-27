const { resolve } = require('path');
const simulate = require('miniprogram-simulate');

test('component/template', () => {
	const id = simulate.load(resolve(__dirname, '../../lib/template/index')); // 此处必须传入绝对路径
	const comp = simulate.render(id); // 渲染成自定义组件树实例
	const parent = document.createElement('parent-wrapper'); // 创建父亲节点
	comp.attach(parent); // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子
	const view = comp.querySelector('.mc-tpl'); // 获取子组件 view
	expect(view.dom.innerHTML.trim()).toBe('template'); // 测试渲染结果
	expect(window.getComputedStyle(view.dom).fontSize).toBe('12px'); // 测试渲染结果

	comp.detach() // 将组件从容器节点中移除，会触发 detached 生命周期
});