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
const babelConfig = require('./babel-config');

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
const CSS_SRC = `${src}/**/*.{wxss,scss}`;
const CSS_EXAMPLE_SRC = `${example}/**/*.{wxss,scss}`;
const WXML_SRC = `${src}/**/*.wxml`;
const WXML_EXAMPLE_SRC = `${example}/**/*.wxml`;
const WXS_SRC = `${src}/**/*.wxs`;
const WXS_EXAMPLE_SRC = `${example}/**/*.wxs`;
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
	static sass(src) {
		return function _sass() {
			return gulp
				.src(src, getGulpConfig())
				.pipe(sass().on('error', sass.logError))
				.pipe(postcss())
				.pipe(rename({ extname: '.wxss' }))
				.pipe(gulp.dest(getGulpOutput));
		};
	}

	static js(src) {
		return function js() {
			return gulp
				.src(src, getGulpConfig())
				.pipe(babel(babelConfig))
				.pipe(gulp.dest(getGulpOutput));
		};
	}

	static wxml(src) {
		return function wxml() {
			return gulp
				.src(src, getGulpConfig())
				.pipe(gulp.dest(getGulpOutput));
		};
	}

	static wxs(src) {
		return function wxs() {
			return gulp
				.src(src, getGulpConfig())
				// .pipe(babel(babelConfig))
				// .pipe(rename({ extname: '.wxs' }))
				.pipe(gulp.dest(getGulpOutput));
		};
	}

	static json(src) {
		return function json() {
			return gulp
				.src(src, getGulpConfig())
				.pipe(gulp.dest(getGulpOutput));
		};
	}

	static cleaner() {
		return del([`${dist}/**`, `${temp}/**`], { force: true });
	}

	static wya(src) {
		return function wya() {
			return gulp
				.src(src, getGulpConfig())
				.pipe(complieWya())
				.pipe(rename({ extname: '.js' }))
				.pipe(babel(babelConfig))
				.pipe(gulp.dest(getGulpOutput));
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
				.src(src)
				.pipe(complieRuntime());
		};
	}
}
// build task
exports.build = gulp.series(
	Compiler.cleaner,
	gulp.parallel(
		Compiler.wya(WYA_SRC),
		Compiler.sass(CSS_SRC),
		Compiler.js(JS_SRC),
		Compiler.wxml(WXML_SRC),
		Compiler.wxs(WXS_SRC),
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
		Compiler.sass([CSS_SRC, CSS_EXAMPLE_SRC]),
		Compiler.js([JS_SRC, JS_EXAMPLE_SRC]),
		Compiler.wxml([WXML_SRC, WXML_EXAMPLE_SRC]),
		Compiler.wxs([WXS_SRC, WXS_EXAMPLE_SRC]),
		Compiler.json([JSON_SRC, JSON_EXAMPLE_SRC]),
		() => {
			gulp.watch([WYA_SRC, WYA_EXAMPLE_SRC], Compiler.wya([WYA_SRC, WYA_EXAMPLE_SRC]));
			gulp.watch([JS_SRC, JS_EXAMPLE_SRC], Compiler.js([JS_SRC, JS_EXAMPLE_SRC]));
			gulp.watch([CSS_SRC, CSS_EXAMPLE_SRC], Compiler.sass([CSS_SRC, CSS_EXAMPLE_SRC]));
			gulp.watch([WXML_SRC, WXML_EXAMPLE_SRC], Compiler.wxml([WXML_SRC, WXML_EXAMPLE_SRC]));
			gulp.watch([WXS_SRC, WXS_EXAMPLE_SRC], Compiler.wxs([WXS_SRC, WXS_EXAMPLE_SRC]));
			gulp.watch([JSON_SRC, JSON_EXAMPLE_SRC], Compiler.json([JSON_SRC, JSON_EXAMPLE_SRC]));
			gulp.watch(TEMP_SRC, Compiler.runtime(TEMP_SRC));
		}
	),
);
