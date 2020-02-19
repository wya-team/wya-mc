const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
// const insert = require('gulp-insert');
const rename = require("gulp-rename");
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const src = path.resolve(__dirname, '../components');
const devDir = path.resolve(__dirname, '../example/dist'); // components在dev之后存放的路径
const buildDir = path.resolve(__dirname, '../lib'); // components在build之后存放的路径

const cleaner = path =>
	function clean() {
		return exec(`npx rimraf ${path}`);
	};

const copier = (output, ext) =>
	function copy() {
	  return gulp.src(`${src}/**/*.${ext}`).pipe(gulp.dest(output));
	};

const scriptCompiler = (output, type) => 
	function compilerJS() {
		let compiler = gulp
			.src(`${src}/**/*.js`)
			.pipe(babel({
				presets: ['es2015', 'stage-0']
			}));
		if (type === 'build') {
			compiler = compiler.pipe(uglify({
				compress: true,
			}));
		}
		return compiler.pipe(gulp.dest(output));
	};

const sassCompiler = (output) => 
	function compileSass() {
		return gulp
			.src(`${src}/**/*.scss`)
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss())
			.pipe(rename({ extname: '.wxss' }))
			.pipe(gulp.dest(output));
	};

const staticCopier = output =>
	gulp.parallel(
	  copier(output, 'wxml'),
	  copier(output, 'wxs'),
	  copier(output, 'json')
	);
	
let tasks = {};
tasks.dev = gulp.series(
	cleaner(devDir),
	gulp.parallel(
		scriptCompiler(devDir, 'dev'),
		sassCompiler(devDir),
		staticCopier(devDir)
	),
	() => {
		gulp.watch(`${src}/**/*.js`, scriptCompiler(devDir, 'dev'));
		gulp.watch(`${src}/**/*.scss`, sassCompiler(devDir));
		gulp.watch(`${src}/**/*.wxml`, copier(devDir, 'wxml'));
		gulp.watch(`${src}/**/*.wxs`, copier(devDir, 'wxs'));
		gulp.watch(`${src}/**/*.json`, copier(devDir, 'json'));
	}
);
tasks.build = gulp.series(
	cleaner(buildDir),
	gulp.parallel(
		scriptCompiler(buildDir, 'build'),
		sassCompiler(buildDir),
		staticCopier(buildDir)
	)
);

module.exports = tasks;