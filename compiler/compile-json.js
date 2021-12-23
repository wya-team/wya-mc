const path = require('path');
const fs = require('fs-extra');
const del = require('del');
const through = require('through2');

let { resolve, dirname } = path;

let appEntry = resolve(__dirname, '../example/app.json');
let projectEntry = resolve(__dirname, '../example/project.config.json');

module.exports = (options) => {
	return through.obj(function (file, enc, cb) {

		// 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		// 插件不支持对 Stream 对直接操作，跑出异常
		if (file.isStream()) {
			this.emit('error', 'mp-cli/json: Streaming not supported');
			return cb();
		}

		let json;
		const isApp = file.path === appEntry;
		const isProject = file.path === projectEntry;
		if (isApp || isProject) {
			json = JSON.parse(file.contents.toString());

			try {
				isApp && (json.pages = process.env.PAGES.split(','));
				isProject && (json.appid = process.env.APPID);
			} catch (e) {
				// TODO
				console.log(e);
			}
		}

		json && (file.contents = Buffer.from(JSON.stringify(json, null, "\t")));
		this.push(file);
		cb();
	});
};