const chalk = require('chalk');
const { prompt } = require('inquirer');
const { resolve } = require('path');
const { readdirSync, readFileSync, writeFileSync } = require('fs');

const SRC_DIR = resolve(__dirname, '../src');
const exclude = ['common', '__tpl__', 'utils', 'wxs', 'styles'];
const EXAMPLE_DIR = resolve(__dirname, '../example');

const getComponentsList = () => {
	const lists = readdirSync(SRC_DIR);
	return lists.reduce((pre, components) => {
		if (exclude.includes(components)) return pre;
		pre.push({ name: components });
		return pre;
	}, []);
};

const setProjectAppID = (appid) => {
	const projectPath = resolve(EXAMPLE_DIR, './project.config.json');
	const config = JSON.parse(readFileSync(projectPath));
	config.appid = appid;
	writeFileSync(projectPath, JSON.stringify(config, null, '\t'));
};

const questions = [
	{
		type: 'input',
		name: 'appid',
		message: "小程序要使用的appid",
		default: () => {
			return 'wx852cddebbfcfe58f';
		}
	},
	{
		type: 'checkbox',
		message: '请选择要运行的组件',
		name: 'components',
		choices: getComponentsList(),
		validate: (answer) => {
			if (answer.length < 1) {
				return '至少选中一个组件';
			}
			return true;
		}
	}
];
prompt(questions).then((res) => {
	// res: { components: [ 'imgs-crop' ] }
	const { components, appid } = res;
	setProjectAppID(appid);
	// TODO 
}).catch((error) => {
	console.error(chalk.redBright(error));
});