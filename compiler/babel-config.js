const { resolve, relative, dirname } = require('path');
const fs = require('fs-extra');
const upath = require('upath');
const platform = require('./platform');

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

let replacePlugins = [
	// 如wx. -> tt.
	[
		({ types: t }) => {
			return {
				visitor: {
					Identifier(path) {
						if (
							platform.globalApis.includes(path.node.name)
							&& path.node.name !== platform.globalApi 
							&& path.parent.type === 'MemberExpression'
						) {
							path.node.name = platform.globalApi;
						}
					}
				}
			};
		}
	]
];

let scriptPlugins = [
	// 如.wxs -> .sjs
	[
		({ types: t }) => {
			let regex = new RegExp(`\\.(${platform.scripts.join("|")})$`);
			let targetRegex = new RegExp(`\\.${platform.script}$`);
			return {
				visitor: {
					CallExpression(path) {
						let value = path.node.arguments && path.node.arguments[0] && path.node.arguments[0].value;
						if (
							path.node.callee.name === 'require' 
							&& regex.test(value) 
							&& !targetRegex.test(value)
						) {
							path.node.arguments[0].value = value.replace(regex, `.${platform.script}`);
						}
					},
					ImportDeclaration(path) {
						let { value } = path.node.source;
						if (regex.test(value) && !targetRegex.test(value)) {
							path.node.source.value = path.node.source.value.replace(regex, `.${platform.script}`);
						}
					}
				}
			};
		}
	]
];

let runtimePlugins = [
	['@babel/plugin-transform-runtime'],
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
	],
	...replacePlugins
];

const babelConfig = (opts = {}) => {
	const { runtimeHelpers = true } = opts;
	return {
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
				"@babel/plugin-proposal-class-properties", { 
					"assumptions": {
						"setPublicClassFields": true
					}
				}
			]
		].concat(runtimeHelpers ? runtimePlugins : [])
	};
};

exports.babelConfig = babelConfig;
exports.replacePlugins = replacePlugins;
exports.scriptPlugins = scriptPlugins;