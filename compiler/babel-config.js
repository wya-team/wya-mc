const { resolve, relative, dirname } = require('path');
const fs = require('fs-extra');
const upath = require('upath');

// 收集在js内引用的第三方库，再用runtime打包出来
let count = 0;
let libMap = {};
const getModuleID = (libraryName) => {
	if (libraryName === '@babel/runtime/regenerator') {
		libraryName = 'regenerator-runtime';
	}
	if (!libMap[libraryName]) {
		libMap[libraryName] = `m${count++}`;

		fs.outputFileSync(
			resolve(process.env.TEMP_DIR, './@@runtime.js'),
			Object.keys(libMap).reduce((pre, cur) => {
				pre += `exports.${libMap[cur]} = require('${cur}');\n`;
				return pre;
			}, '')
		);
	}
	return libMap[libraryName];
};

const babelConfig = {
	presets: ['@babel/preset-env'],
	plugins: [
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-function-bind',
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
		'@babel/plugin-transform-runtime',
		[
			({ types: t }) => {
				return {
					visitor: {
						CallExpression(path, opts) {
							const { filename } = opts;
							const { callee } = path.node;
							
							if (callee.name !== 'require') return;

							const args = path.node.arguments;
							let libraryName = args[0].value;
							// 非第三方库的引入不做处理
							if (libraryName.includes('./') || libraryName.includes('../')) return;

							const moduleId = getModuleID(libraryName);

							// dev - /dist/components/libs; product - /lib/libs
							let regex;
							let replacePath;
							if (filename.includes('/example')) {
								regex = new RegExp(process.env.EXAMPLE_DIR);
								replacePath = process.env.DIST_DIR;
							} else {
								regex = new RegExp(process.env.SRC_DIR);
								replacePath = process.env.DIST_COMPONENTS_DIR;
							}
							let filePath = upath
								.normalize(filename)
								.replace(regex, replacePath);
							const output = resolve(process.env.DIST_DIR, './libs/@@runtime.js');
							const relativePath = upath.normalize(relative(dirname(filePath), output));

							path.replaceWith(
								t.memberExpression(
									t.callExpression(t.identifier('require'), [t.stringLiteral(relativePath)]),
									t.identifier(moduleId)
								),
							);
						},
					}
				};
			}
		]
	]
};
module.exports = babelConfig;