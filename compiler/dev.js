const { resolve } = require('path');
const { prompt, registerPrompt, Separator } = require('inquirer');
const { exec } = require('child_process');
const { readdirSync, readFileSync, writeFileSync } = require('fs-extra');

const gulpConfig = resolve(__dirname, './compiler.js');

const SRC_DIR = resolve(__dirname, '../src');
const EXAMPLE_DIR = resolve(__dirname, '../example');
const exclude = ['common', 'utils', 'wxs', 'styles', 'mixins', '.DS_Store'];

const getComponentsList = () => {
	const lists = [...new Set(readdirSync(SRC_DIR).concat(readdirSync(resolve(EXAMPLE_DIR, './pages'))))];
	return lists.reduce((pre, component) => {
		if (exclude.includes(component)) return pre;
		pre.push(component);
		return pre;
	}, []);
};

const setProjectAppID = (appid) => {
	const projectPath = resolve(EXAMPLE_DIR, './project.config.json');
	const config = JSON.parse(readFileSync(projectPath));
	config.appid = appid || 'wx852cddebbfcfe58f';
	writeFileSync(projectPath, JSON.stringify(config, null, '\t'));
};

const setPageJSON = (components, isAll) => {
	const projectPath = resolve(EXAMPLE_DIR, './app.json');
	const config = JSON.parse(readFileSync(projectPath));

	// 将index放到第一个
	if (isAll) {
		components = components.filter((it) => it !== 'index');
		components.unshift('index');	
	}

	config.pages = components.map((name) => `pages/${name}/index`);
	writeFileSync(projectPath, JSON.stringify(config, null, '\t'));
};

const choices = getComponentsList();
const questions = [
	{
		type: 'list',
		name: 'platform',
		message: 'Select platform:',
		choices: [
			new Separator(' = For platform = '),
			'wx',
			'tt'
		],
		default: 'wx'
	},
	{
		type: 'list',
		name: 'appid',
		message: 'Select appid:',
		choices: [
			new Separator(' = For appid = '),
			'testAppId',
			'wx852cddebbfcfe58f',
			'custom'
		],
		default: 'testAppId'
	},

	{
		type: 'input',
		name: 'customAppid',
		when: (answers) => answers.appid === 'custom',
		message: "Custom appid:",
		default: () => {
			return 'testAppId';
		}
	},

	{
		type: 'autocomplete',
		message: 'Select component:',
		name: 'component',
		// suggestOnly: true, 开启后可以验证数据且需要使用tab选中
		default: 'all',
		source: (answers, input) => {
			input = input || '';
			return new Promise((resolve => {
				let $choices = ['all', 'multiple'].concat(choices);
				let filter = input 
					? $choices.filter(item => item.includes(input))
					: $choices;

				resolve(filter);
			}));
		}
	},

	{
		type: 'search-checkbox',
		message: '多选组件',
		name: 'components',
		when: (answers) => answers.component === 'multiple',
		choices: choices.map(name => ({ name })),
		validate: (answer) => {
			if (answer.length < 1) {
				return '至少选中一个组件';
			}
			return true;
		}
	}
]; 

registerPrompt('search-checkbox', require('inquirer-search-checkbox'));
registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

prompt(questions).then((res) => {
	// res: { components: [ 'imgs-crop' ] }
	let { component, components, appid, customAppid, platform } = res;
	appid = customAppid || appid;
	
	let selects = [];
	let isAll = false;
	if (component === 'all') {
		isAll = true;
		selects = choices;
	} else if (component === 'multiple') {
		selects = components;
	} else {
		selects = [component];
	}

	setProjectAppID(appid);
	setPageJSON(selects, isAll);
	// 获取需要过滤打包的组件
	const ignoredComponents = choices.reduce((pre, cur) => {
		if (selects.includes(cur)) return pre;
		pre.push(resolve(SRC_DIR, `${cur}/**/**`));
		pre.push(resolve(EXAMPLE_DIR, `pages/${cur}/**/**`));
		return pre;
	}, []);

	process.env.IGNORED_COMPONENTS = ignoredComponents;
	process.env.PLATFORM = platform;
	// 开始构建
	const $process = exec(`npx gulp -f ${gulpConfig} dev --color & npm run lint:watch`);
	$process.stdout.on('data', (stdout) => console.info(stdout));
	$process.stderr.on('data', (stderr) => console.info(stderr));
}).catch((error) => {
	console.error(error);
});