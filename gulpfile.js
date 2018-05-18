const gulp = require('gulp');
const del = require('del');
const path = require('path');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const jsonminify = require('gulp-jsonminify2');
const gutil = require('gulp-util');
const combiner = require('stream-combiner2');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const minifycss = require('gulp-minify-css');
const runSequence = require('run-sequence');
const jsonlint = require("gulp-jsonlint");

let colors = gutil.colors;
const handleError = function(err) {
	console.log('\n');
	gutil.log(colors.red('Error!'));
	gutil.log('fileName: ' + colors.red(err.fileName));
	gutil.log('lineNumber: ' + colors.red(err.lineNumber));
	gutil.log('message: ' + err.message);
	gutil.log('plugin: ' + colors.yellow(err.plugin));
};

gulp.task('clean', () => {
	return del(['./example/components/**']);
});

gulp.task('clean:lib', () => {
	return del(['./lib/']);
});

gulp.task('move', () => {
	return gulp.src('./components/**/*')
		.pipe(gulp.dest('./dist/components'));
});

/**
 * 监听example
 */
gulp.task('watch', () => {
	gulp.watch('./example/**/*.json', ['json']);
	gulp.watch('./example/assets/**', ['assets']);
	gulp.watch('./example/**/*.wxml', ['templates']);
	gulp.watch('./example/**/*.wxss', ['wxss']);
	gulp.watch('./example/**/*.sass', ['wxss']);
	gulp.watch('./example/**/*.js', ['scripts']);
});

/**
 * 监听components
 */
gulp.task('watch:components', () => {
	gulp.watch('./components/**/*.json', ['json:components']);
	gulp.watch('./components/**/*.wxml', ['templates:components']);
	gulp.watch('./components/**/*.wxss', ['wxss:components']);
	gulp.watch('./components/**/*.sass', ['wxss:components']);
	gulp.watch('./components/**/*.js', ['scripts:components']);
});

/**
 *  json
 */
gulp.task('jsonLint', () => {
	let combined = combiner.obj([
		gulp.src(['./example/**/*.json']),
		jsonlint(),
		jsonlint.reporter(),
		jsonlint.failAfterError()
	]);

	combined.on('error', handleError);
});
gulp.task('json', ['jsonLint'], () => {
	return gulp.src('./example/**/*.json')
		.pipe(gulp.dest('./dist'));
});
gulp.task('json:components', ['jsonLint'], () => {
	return gulp.src('./components/**/*.json')
		.pipe(gulp.dest('./dist/components'));
});
gulp.task('jsonPro', ['jsonLint'], () => {
	return gulp.src('./components/**/*.json')
		.pipe(jsonminify())
		.pipe(gulp.dest('./lib'));
});

/**
 * assets
 */
gulp.task('assets', () => {
	return gulp.src('./example/assets/**')
		.pipe(gulp.dest('./dist/assets'));
});

/**
 * templates
 */
gulp.task('templates', () => {
	return gulp.src('./example/**/*.wxml')
		.pipe(gulp.dest('./dist'));
});
gulp.task('templates:components', () => {
	return gulp.src('./components/**/*.wxml')
		.pipe(gulp.dest('./dist/components'));
});
gulp.task('templatesPro', () => {
	return gulp.src('./components/**/*.wxml')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			keepClosingSlash: true
		}))
		.pipe(gulp.dest('./lib'));
});
/**
 * wxss
 */
gulp.task('wxss', () => {
	let combined = combiner.obj([
		gulp.src(['./example/**/*.{wxss,sass}', '!./example/styles/**']),
		sass().on('error', sass.logError),
		autoprefixer([
			'iOS >= 8',
			'Android >= 4.1'
		]),
		rename((path) => path.extname = '.wxss'),
		gulp.dest('./dist')
	]);

	combined.on('error', handleError);
});
gulp.task('wxss:components', () => {
	let combined = combiner.obj([
		gulp.src(['./example/**/*.{wxss,sass}', '!./example/styles/**']),
		sass().on('error', sass.logError),
		autoprefixer([
			'iOS >= 8',
			'Android >= 4.1'
		]),
		rename((path) => path.extname = '.wxss'),
		gulp.dest('./dist/components')
	]);

	combined.on('error', handleError);
});
gulp.task('wxssPro', () => {
	let combined = combiner.obj([
		gulp.src(['./components/**/*.{wxss,sass}', '!./components/styles/**']),
		sass().on('error', sass.logError),
		autoprefixer([
			'iOS >= 8',
			'Android >= 4.1'
		]),
		minifycss(),
		rename((path) => path.extname = '.wxss'),
		gulp.dest('./lib')
	]);

	combined.on('error', handleError);
});
/**
 * js
 */
gulp.task('scripts', () => {
	return gulp.src('./example/**/*.js')
		.pipe(babel({
			presets: ['es2015', 'stage-0']
		}))
		.pipe(gulp.dest('./dist'));
});
gulp.task('scripts:components', () => {
	return gulp.src('./components/**/*.js')
		.pipe(babel({
			presets: ['es2015', 'stage-0']
		}))
		.pipe(gulp.dest('./dist/components'));
});
gulp.task('scriptsPro', () => {
	return gulp.src('./components/**/*.js')
		.pipe(babel({
			presets: ['es2015', 'stage-0']
		}))
		.pipe(uglify({
			compress: true,
		}))
		.pipe(gulp.dest('./lib'));
});


// dev 模式
gulp.task('dev', ['clean', 'move'], () => {
	runSequence(
		'json',
		'assets',
		'templates',
		'wxss',
		'scripts',
		'watch',
		'watch:components',
	);
});

// build 模式
gulp.task('build', ['clean:lib'], () => {
	runSequence(
		'jsonPro',
		'templatesPro',
		'wxssPro',
		'scriptsPro'
	);
});

gulp.task('pro', ['clean'], () => {
	runSequence('build');
});