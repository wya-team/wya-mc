const path = require('path');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const complieWya = require('./compile-wya');
const complieDepend = require('./compile-depend');
const complieRuntime = require('./compile-runtime');
const compileTemplate = require('./compile-template');
const compileJSON = require('./compile-json');
const { babelConfig, scriptPlugins } = require('./babel-config');
const platform = require('./platform');

const src = path.resolve(__dirname, '../src');
const example = path.resolve(__dirname, '../example');
const dist = process.env.NODE_ENV === 'development' ? path.resolve(__dirname, '../dist') : path.resolve(__dirname, '../lib');
const distComponents = process.env.NODE_ENV === 'development' ? path.resolve(__dirname, '../dist/components') : path.resolve(__dirname, '../lib');
const temp = path.resolve(__dirname, '../.temp');
const tempComponents = process.env.NODE_ENV === 'development' ? path.resolve(__dirname, '../.temp/components') : temp;

/*
 * TODO example打包到dist内
 * 查找example内引用的组件，打包出来
 */

console.log(`ENTRY: ${src}\nOUTPUT: ${dist}`);

process.env.SRC_DIR = src;
process.env.DIST_DIR = dist;
process.env.EXAMPLE_DIR = example;
process.env.DIST_COMPONENTS_DIR = distComponents;
process.env.TEMP_DIR = temp;
process.env.TEMP_COMPONENTS_DIR = tempComponents;

// 需要编译的文件目录
const TEMP_SRC = `${temp}/**/*.js`;
const JS_SRC = `${src}/**/*.js`;
const JS_EXAMPLE_SRC = `${example}/**/*.js`;
const JSON_SRC = `${src}/**/*.json`;
const JSON_EXAMPLE_SRC = `${example}/**/*.json`;
const STYLE_SRC = `${src}/**/*.{${platform.styles.join(',')}}`;
const STYLE_EXAMPLE_SRC = `${example}/**/*.{${platform.styles.join(',')}}`;
const TEMPLATE_SRC = `${src}/**/*.${platform.templates.join(',')}`;
const TEMPLATE_EXAMPLE_SRC = `${example}/**/*.{${platform.templates.join(',')}}`;
const SCRIPT_SRC = `${src}/**/*.{${platform.scripts.join(',')}}`;
const SCRIPT_EXAMPLE_SRC = `${example}/**/*.{${platform.scripts.join(',')}}`;
const WYA_SRC = `${src}/**/*.wya`;
const WYA_EXAMPLE_SRC = `${example}/**/*.wya`;

let DEPEND_COMPONENTS = [];

// 获取gulp的配置
const getGulpConfig = () => {
	// 因为从环境变量内拿到的是string类型，需要转换下
	let ignoreFile = (process.env.IGNORED_COMPONENTS || '').split(',');
	ignoreFile = ignoreFile.filter((filePath) => {
		return !DEPEND_COMPONENTS.includes(filePath);
	});
	return {
		ignore: [...ignoreFile, path.resolve(temp, './libs/**/**')]
	};
};

// 获取gulp的输出路径
const getGulpOutput = (file) => {
	const srcRegex = /\/src/;
	if (process.env.NODE_ENV === 'development' && srcRegex.test(file.path)) {
		return distComponents;
	}
	return dist;
};

const getGulpTempOutput = (file) => {
	const srcRegex = /\/src/;
	if (process.env.NODE_ENV === 'development' && srcRegex.test(file.path)) {
		return tempComponents;
	}
	return temp;
};

class Compiler {
	static style(src) {
		return function style() {
			return gulp
				.src(src.from || src, getGulpConfig())
				.pipe(sass().on('error', sass.logError))
				.pipe(postcss())
				.pipe(rename({ extname: `.${platform.style}` }))
				.pipe(gulp.dest(src.to || getGulpOutput));
		};
	}

	static js(src) {
		return function js() {
			return gulp
				.src(src.from || src, getGulpConfig())
				.pipe(babel(babelConfig()))
				.pipe(gulp.dest(src.to || getGulpOutput));
		};
	}

	static template(src) {
		return function template() {
			return gulp
				.src(src.from || src, getGulpConfig())
				.pipe(compileTemplate())
				.pipe(gulp.dest(src.to || getGulpOutput));
		};
	}

	static script(src) {
		const babelrc = babelConfig({ runtimeHelpers: false });
		babelrc.plugins = babelrc.plugins.concat(scriptPlugins);
		return function script() {
			return gulp
				.src(src.from || src, getGulpConfig())
				.pipe(babel(babelrc))
				.pipe(rename({ extname: `.${platform.script}` }))
				.pipe(gulp.dest(src.to || getGulpOutput));
		};
	}

	static json(src) {
		return function json() {
			return gulp
				.src(src.from || src, getGulpConfig())
				.pipe(compileJSON())
				.pipe(gulp.dest(src.to || getGulpOutput));
		};
	}

	static cleaner() {
		return del([`${dist}/**`, `${temp}/**`], { force: true });
	}

	static wya(src) {
		return function wya() {
			return gulp
				.src(src.from || src, getGulpConfig())
				.pipe(complieWya())
				.pipe(rename({ extname: '.js' }))
				.pipe(babel(babelConfig()))
				.pipe(gulp.dest(src.to || getGulpOutput));
		};
	}

	static collectDepend(complierSrc) {
		return function collectDepend() {
			return gulp
				.src(complierSrc, getGulpConfig())
				.pipe(complieDepend((dependComps) => {
					DEPEND_COMPONENTS = dependComps.map((componentName) => {
						return path.resolve(src, `${componentName}/**/**`);
					});
				}));
		};
	}

	static runtime(src) {
		return function runtime() {
			return gulp
				.src(src.from || src)
				.pipe(complieRuntime());
		};
	}
}
// build task
exports.build = gulp.series(
	Compiler.cleaner,
	gulp.parallel(
		Compiler.wya(WYA_SRC),
		Compiler.style(STYLE_SRC),
		Compiler.js(JS_SRC),
		Compiler.template(TEMPLATE_SRC),
		Compiler.script(SCRIPT_SRC),
		Compiler.json(JSON_SRC),
	),
	Compiler.runtime(TEMP_SRC)
);

// dev task
exports.dev = gulp.series(
	Compiler.cleaner,
	// TODO: WYA_EXAMPLE_SRC
	Compiler.collectDepend([WYA_SRC, WYA_EXAMPLE_SRC, JS_SRC, JS_EXAMPLE_SRC]),
	gulp.parallel(
		Compiler.wya([WYA_SRC, WYA_EXAMPLE_SRC]),
		Compiler.style([STYLE_SRC, STYLE_EXAMPLE_SRC]),
		Compiler.js([JS_SRC, JS_EXAMPLE_SRC]),
		Compiler.template([TEMPLATE_SRC, TEMPLATE_EXAMPLE_SRC]),
		Compiler.script([SCRIPT_SRC, SCRIPT_EXAMPLE_SRC]),
		Compiler.json([JSON_SRC, JSON_EXAMPLE_SRC]),
	),
	Compiler.runtime(TEMP_SRC),
	function watch() {
		let fn = (globs, generateTask) => {
			gulp.watch(globs).on('all', (type, fullpath) => {
				try {
					const realPath = fullpath
						.replace(new RegExp(`(${src}|${example})`, 'g'), '');
					const isComponent = fullpath.includes(src);
					if (type !== 'unlink') {
						const run = generateTask(
							{
								from: fullpath,
								to: path
									.dirname(fullpath)
									.replace(new RegExp(`(${src}|${example})`, 'g'), `${dist}${isComponent ? '/components' : ''}`)
							}
						);

						run();
					} else {
						fs.removeSync(dist + realPath);
					}

					// 日志输出
					console.log(`${type}: {${realPath}}`);
					console.log(`from: {${fullpath}}`);
					console.log(`to: {${dist + (isComponent ? '/components' : '') + realPath}}`);
				} catch (e) {
					console.log(e);
				}
			});
		};

		fn([WYA_SRC, WYA_EXAMPLE_SRC], Compiler.wya);
		fn([JS_SRC, JS_EXAMPLE_SRC], Compiler.js);
		fn([STYLE_SRC, STYLE_EXAMPLE_SRC], Compiler.style);
		fn([TEMPLATE_SRC, TEMPLATE_EXAMPLE_SRC], Compiler.template);
		fn([SCRIPT_SRC, SCRIPT_EXAMPLE_SRC], Compiler.script);
		fn([JSON_SRC, JSON_EXAMPLE_SRC], Compiler.json);
		fn(TEMP_SRC, Compiler.runtime);
	}
);
