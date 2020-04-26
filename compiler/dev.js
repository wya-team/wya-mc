const { resolve } = require('path');
const { prompt } = require('inquirer');
const { exec } = require('child_process');
const { readdirSync, readFileSync, writeFileSync } = require('fs-extra');
const gulpConfig = resolve(__dirname, './compiler.js');

const SRC_DIR = resolve(__dirname, '../src');
const EXAMPLE_DIR = resolve(__dirname, '../example');
const exclude = ['common', '__tpl__', 'utils', 'wxs', 'styles'];

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

const setPageJSON = (components) => {
	const projectPath = resolve(EXAMPLE_DIR, './app.json');
	const config = JSON.parse(readFileSync(projectPath));
	config.pages = components.map((name) => `pages/${name}/index`);
	writeFileSync(projectPath, JSON.stringify(config, null, '\t'));
}

const choices = getComponentsList();
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
		choices,
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
	let { components, appid } = res;
	setProjectAppID(appid);
	setPageJSON(components);
	// 获取需要过滤打包的组件
	const ignoreComponents = choices.reduce((pre, cur) => {
		if (components.includes(cur.name)) return pre;
		pre.push(resolve(SRC_DIR, `${cur.name}/**/**`));
		pre.push(resolve(EXAMPLE_DIR, `pages/${cur.name}/**/**`));
		return pre;
	}, []);

	process.env.SELECTED_COMPONENTS = ignoreComponents;
	// 开始构建
	const $process = exec(`npx gulp -f ${gulpConfig} dev --color`);
	$process.stdout.on('data', (stdout) => console.info(stdout));
	$process.stderr.on('data', (stderr) => console.info(stderr));
});