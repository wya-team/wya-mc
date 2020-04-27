const example = (opts = {}) => {
	const { name } = opts;
	let content = '';
	content += '<template>\n';
	content += `	<mc-${name}>${name}</mc-${name}>\n`;
	content += '</template>\n\n';
	content += '<script>\n';
	content += 'Page({\n';
	content += '	data: {},\n';
	content += '	onLoad() {}\n';
	content += '})\n';
	content += '</script>\n';
	content += '<style lang="scss">\n';
	content += `.v-${name} {}\n`;
	content += '</style>\n';
	content += '<config>\n';
	content += '{\n';
	content += '	"usingComponents": {\n';
	content += `		"mc-${name}": "../components/${name}"\n`;
	content += '	}\n';
	content += '}\n';
	content += '</config>\n';
	return content;
};

const component = (opts = {}) => {
	const { name } = opts;
	let content = '';
	content += '<template>\n';
	content += `	<view class="mc-${name}">\n`;
	content += `		${name}\n`;
	content += '	</view>\n';
	content += '</template>\n';
	content += '<script>\n';
	content += 'Component({\n';
	content += '	properties: {},\n';
	content += '	data: {},\n';
	content += '	lifetimes: {\n';
	content += '		attached(){}\n';
	content += '	},\n';
	content += '	methods: {}\n';
	content += '});\n';
	content += '</script>\n';
	content += '<style lang="scss">\n';
	content += `.mc-${name} {}\n`;
	content += '</style>\n';
	content += '<config>\n';
	content += '{\n';
	content += '	"component": true\n';
	content += '}\n';
	content += '</config>\n';
	return content;
};

const test = (opts = {}) => {
	const { name } = opts;
	let content = '';
	content += `const { resolve } = require('path');\n`;
	content += `const simulate = require('miniprogram-simulate');\n`;
	content += '\n';
	content += `test('${name}', () => {\n`;
	content += `	const id = simulate.load(resolve(__dirname, '../../lib/${name}/index'));\n`;
	content += `	const comp = simulate.render(id);\n`;
	content += `	const parent = document.createElement('parent-wrapper');\n`;
	content += `	comp.attach(parent);\n`;
	content += `	comp.detach();\n`;
	content += `});\n`;
	return content;
};

const readme = (opts = {}) => {
	const { name } = opts;
	let content = `# ${name}`;
	return content;
};

module.exports = {
	example,
	component,
	test,
	readme
};