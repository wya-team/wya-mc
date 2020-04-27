const { resolve } = require('path');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');
const { existsSync, mkdirSync, outputFile, writeFileSync } = require('fs-extra');
const { example, component, test, readme } = require('./template/index');

const questions = [
	{
		type: 'input',
		name: 'name',
		message: "请输入要创建的组件名称",
		validate: (answer) => {
			if (!answer) {
				return '请输入组件名';
			}
			return true;
		}
	}
];
const createFile = (file, name, create) => {
	outputFile(file, create({ name }), (err) => {
		if (!err) {
			console.log(chalk.green(`${create.name}：${file}`));
			return;
		}
		console.error(err);
	});
};
prompt(questions).then((res) => {
	const { name } = res;
	const examplePath = resolve(__dirname, `../example/pages/${name}/index.wya`);
	const componentPath = resolve(__dirname, `../src/${name}/index.wya`);
	const readMePath = resolve(__dirname, `../src/${name}/README.md`);
	const testPath = resolve(__dirname, `../tests/${name}/index.test.js`);
	
	createFile(examplePath, name, example);
	createFile(componentPath, name, component);
	createFile(readMePath, name, readme);
	createFile(testPath, name, test);
}).catch((error) => {
	console.error(error);
});