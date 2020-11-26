import { basic } from '../mixins/basic';

function McComponent(mcOptions) {
	if (mcOptions === undefined) { mcOptions = {}; }
	const { externalClasses = [], mixins = [], props = {}, properties = {}, options, ...restOpts } = mcOptions;
	if (!externalClasses.includes('mc-class')) {
		externalClasses.push('mc-class');
	}
	mixins.push(basic);
	let opts = {
		...restOpts,
		options: {
			addGlobalClass: true,
			multipleSlots: true,
			...options,
		},
		externalClasses,
		behaviors: mixins,
		properties: {
			...props,
			...properties,
			mcStyle: String
		},
	};
	Component(opts);
}
module.exports = McComponent;
