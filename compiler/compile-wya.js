const through = require('through2');
const htmldom = require('htmldom');
const fs = require('fs-extra');
const upath = require('upath');
const { resolve, dirname } = require('path');
const sass = require('node-sass');
const platform = require('./platform');
const compileTemplate = require('./compile-template');

module.exports = (options) => {
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
	
		// 编译wya文件
		let content = file.contents.toString();
		let $ = htmldom(content);
		const template = $('template').html();
		const script = $('script').html();
		const style = $('style').html();
		const config = $('config').html();
		// 输出的对应文件路径
		const fn = (ext) => {
			let regex = /\/src/.test(file.path) ? new RegExp(process.env.SRC_DIR) : new RegExp(process.env.EXAMPLE_DIR);
			const dist = /\/src/.test(file.path) ? process.env.DIST_COMPONENTS_DIR : process.env.DIST_DIR;
			let fullpath = upath
				.normalize(file.path)
				.replace(regex, dist)
				.replace(/\.wya$/, `.${ext}`);
			if (!fullpath.includes(dist)) {
				console.log(fullpath, dist);
				throw new Error('路径解析错误');
			}
			return resolve(fullpath);
		};

		// wxml
		template && fs.outputFileSync(fn(platform.template), compileTemplate.transform(template));
		// json
		config && fs.outputFileSync(fn('json'), config);
		// wxss
		let imports = '';
		let css = '';
		let regex = new RegExp(`\\.(${platform.styles.join("|")})$`);
		if (style) {
			css = sass.renderSync({
				data: style,
				outputStyle: 'compressed',
				importer(url, prev, done) {
					let fullpath = resolve(dirname(prev), url);
					if (
						!fs.existsSync(fullpath) 
						|| (
							platform.styles
								.filter(i => i != 'scss')
								.some(i => url.includes(`.${i}`))
						)
					) {
						imports += `@import '${upath.normalize(url.replace(regex, `.${platform.style}`))}';\n`;
						return {
							file: fullpath, 
							contents: ``
						};
					}
				}
			}).css;
		}
		
		imports + css && fs.outputFileSync(fn(platform.style), imports + css);

		file.contents = Buffer.from(script);

		cb(null, file);
	});
};