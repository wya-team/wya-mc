import { basic } from '../mixins/basic';

function McComponent(mcOptions) {
	if (mcOptions === undefined) { mcOptions = {}; }
	const { externalClasses = [], mixins = [], props, ...restOpts } = mcOptions;
	if (!externalClasses.includes('mc-class')) {
		externalClasses.push('mc-class');
	}
	mixins.push(basic);
	let options = {
		...restOpts,
		externalClasses,
		behaviors: mixins,
		properties: {
			...props,
			mcStyle: String
		},
	};
	Component(options);
}
module.exports = McComponent;
