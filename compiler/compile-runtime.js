const through = require('through2');
const fs = require('fs-extra');
const upath = require('upath');
const { resolve, dirname, parse } = require('path');
const { rollup } = require('rollup');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const nodeResolve = require('@rollup/plugin-node-resolve');
const alias = require('@rollup/plugin-alias');
const { babel } = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-terser');
const { replacePlugins } = require('./babel-config');

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
		
		const { base } = parse(file.path);

		rollup({
			input: file.path,
			plugins: [
				nodeResolve.default(),
				commonjs({}),
				replace({
					'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
				}),
				babel({
					babelHelpers: 'inline',
					compact: false,
					plugins: [].concat(replacePlugins)
				}),
				process.env.NODE_ENV === 'production' && terser()
			]
		}).then((res) => {
			const regex = new RegExp(process.env.TEMP_DIR);
			let fullpath = upath
				.normalize(file.path)
				.replace(regex, resolve(process.env.DIST_DIR, './libs'));

			res.write({
				output: {
					file: resolve(fullpath),
					format: 'cjs',
					exports: 'named'
				}
			});
			cb();
		}).catch((err) => {
			console.log('compile-runtime: ', err);
		});
	});
};