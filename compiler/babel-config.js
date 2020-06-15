const { resolve, relative, dirname } = require('path');
const fs = require('fs-extra');
const upath = require('upath');

// 收集在js内引用的第三方库，再用runtime打包出来
const collectLibs = (libraryName) => {
	const filePath = upath.normalize(resolve(process.env.TEMP_DIR, `./libs/${libraryName}.js`));
	if (!fs.pathExistsSync(filePath)) {
		fs.outputFileSync(
			filePath,
			`import A from '${libraryName}'; export default A;`
		);
	}
	return filePath;
};

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
						ImportDeclaration(path, opts) {
							const { filename } = opts;
							const specifiers = path.node.specifiers;
							const source = path.node.source;
							const libraryName = source.value;
							// 非第三方库的引入不做处理
							if (libraryName.includes('./') || libraryName.includes('../')) return;

							const output = collectLibs(libraryName);

							// dev - /dist/components/libs; product - /lib/libs
							const relativePath = upath.normalize(relative(dirname(filename), output));

							const func = t.importDeclaration(specifiers, t.stringLiteral(relativePath));
							path.replaceWith(func);
						}
					}
				};
			}
		]
	]
};
module.exports = babelConfig;