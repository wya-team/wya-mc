const through = require('through2');
const htmldom = require('htmldom');
const fs = require('fs-extra');
const upath = require('upath');
const { resolve, dirname, extname, basename } = require('path');
const sass = require('node-sass');

const unique = (source = [], data = []) => {
	return data.reduce((pre, cur) => {
		if (!pre.includes(cur)) {
			pre.push(cur);
		}
		return pre;
	}, source);
};
let dependComps = []; // 依赖的组件
module.exports = (callback) => {
	return through.obj(function (file, enc, cb) {
		// 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		// 插件不支持对 Stream 对直接操作，跑出异常
		if (file.isStream()) {
			this.emit('error', 'wya-mc/js: Streaming not supported');
			return cb();
		}

		const PORTAL_REGEX = /\/portal\/index/;

		const fn = (content, filePath) => {
			if (filePath.includes('/table/table-cell.wya')) {
				return [];
			}

			let $ = htmldom(content);
			const script = $('script').html();
			const config = JSON.parse($('config').html());
			let data = [];
			if (PORTAL_REGEX.test(script)) {
				data.push('portal');
			}
			if (config.usingComponents) {
				data = Object.values(config.usingComponents).reduce((pre, relativePath) => {
					// 是否是example内的wya
					if (filePath.includes(process.env.EXAMPLE_DIR)) {
						relativePath = relativePath.replace('../../components', '../../../src');
					}
					let relyOnCompPath = resolve(dirname(filePath), relativePath);
					if (!extname(relyOnCompPath)) {
						relyOnCompPath += '.wya';
					}
					const data = fs.readFileSync(relyOnCompPath, 'utf8');

					let childDependComps = fn(data, relyOnCompPath);
					pre.push(...childDependComps);

					let componentName = basename(dirname(relyOnCompPath));
					pre.push(componentName);
					return pre;
				}, data);
			}
			return data;
		};
	
		let extName = extname(file.path);
		let content = file.contents.toString();

		// 编译wya文件
		if (extName === '.wya') {
			dependComps = unique(dependComps, fn(content, file.path));
		} else if (extName === '.js' && PORTAL_REGEX.test(content)) {
			dependComps = unique(dependComps, ['portal']);
		}
		
		callback && callback(dependComps);

		cb(null, file);
	});
};