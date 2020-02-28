const path = require('path');
const del = require('del');
const fs = require('fs-extra');
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
sass.compiler = require('node-sass');

const babelConfig = {
	presets: ['@babel/preset-env'],
	plugins: [
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-function-bind',
		'@babel/plugin-syntax-dynamic-import',
		[
			'@babel/plugin-proposal-decorators',
			{
				"legacy": true
			}
		],
		[	
			'@babel/plugin-proposal-class-properties',
			{
				"loose": true
			}
		],
		[
			({ types: t }) => {
				return {
					visitor: {
						MemberExpression(path) {
							if (path.matchesPattern("process.env.NODE_ENV")) {
								path.replaceWith(t.valueToNode(process.env.NODE_ENV));

								if (path.parentPath.isBinaryExpression()) {
									const evaluated = path.parentPath.evaluate();
									if (evaluated.confident) {
										path.parentPath.replaceWith(t.valueToNode(evaluated.value));
									}
								}
							}
						}
					}
				};
			}
		]
	]
};

let src = path.resolve(__dirname, '../src');
let dist = process.env.NODE_ENV === 'development'
	? path.resolve(__dirname, '../example/dist')
	: path.resolve(__dirname, '../dist');

console.log(`ENTRY: ${src}\nOUTPUT: ${dist}`);

class Compiler {
	static sass = () => {
		return gulp
			.src(`${src}/**/*.{wxss,scss}`)
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss())
			.pipe(rename({ extname: '.wxss' }))
			.pipe(gulp.dest(dist));
	}

	static js = () => {
		return gulp
			.src(`${src}/**/*.js`)
			.pipe(babel(babelConfig))
			.pipe(gulp.dest(dist));
	}

	static wxml = () => {
		return gulp
			.src(`${src}/**/*.wxml`)
			.pipe(gulp.dest(dist));
	}

	static wxs = () => {
		return gulp
			.src(`${src}/**/*.wxs`)
			.pipe(gulp.dest(dist));
	}

	static json = () => {
		return gulp
			.src(`${src}/**/*.json`)
			.pipe(gulp.dest(dist));
	}

	static cleaner = () => {
		return del([`${dist}/**`], { force: true });
	}
}

// build task
exports.build = gulp.series(
	Compiler.cleaner,
	gulp.parallel(
		Compiler.sass,
		Compiler.js,
		Compiler.wxml,
		Compiler.wxs,
		Compiler.json,
	)
);

// dev task
exports.dev = gulp.series(
	Compiler.cleaner,
	gulp.parallel(
		Compiler.sass,
		Compiler.js,
		Compiler.wxml,
		Compiler.wxs,
		Compiler.json,
		() => {
			gulp.watch(`${src}/**/*.js`, Compiler.js);
			gulp.watch(`${src}/**/*.{wxss,scss}`, Compiler.sass);
			gulp.watch(`${src}/**/*.wxml`, Compiler.wxml);
			gulp.watch(`${src}/**/*.wxs`, Compiler.wxs);
			gulp.watch(`${src}/**/*.json`, Compiler.json);
		}
	)
);
