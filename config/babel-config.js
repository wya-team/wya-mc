const { resolve, dirname, relative } = require('path');
const fs = require('fs-extra');

const babelConfig = (() => {
	return {
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
})();

module.exports = babelConfig;