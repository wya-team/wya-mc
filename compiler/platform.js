const fs = require('fs-extra');

/**
 * 平台之间的转换，如微信小程序转抖音小程序
 * 文件后缀替换，.wxml -> .ttml, .wxss -> .ttss, .wxs -> .sjs
 * API 前缀替换，wx -> tt
 */
let platform = process.env.PLATFORM || 'wx';

const configHash = {
	// 微信小程序
	wx: {
		template: 'wxml',
		style: 'wxss',
		script: 'wxs',
		globalApi: 'wx'
	},

	// 字节小程序
	tt: {
		template: 'ttml',
		style: 'ttss',
		script: 'sjs',
		globalApi: 'tt'
	}
};

const config = {
	templates: [],
	styles: ['scss'],
	scripts: [],
	globalApis: [],

	template: '',
	style: '',
	script: '',
	globalApi: '',

	...(configHash[platform] || configHash.wx)
};

if (!configHash[platform]) {
	throw new Error('@wya/mp-cli: 该平台不存在');
}

Object.keys(configHash).forEach((key) => {
	let item = configHash[key];
	Object.keys(item).forEach(($key) => {
		config[`${$key}s`].push(item[$key]);
	});
});

module.exports = config;