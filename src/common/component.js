import { basic } from '../mixins/basic';

// TODO: 弃用mc-class和mcStyle -> custom-class + customStyle
function McComponent(mcOptions) {
	if (mcOptions === undefined) { mcOptions = {}; }
	const { externalClasses = [], mixins = [], props = {}, properties = {}, options, ...restOpts } = mcOptions;
	if (!externalClasses.includes('mc-class')) {
		externalClasses.push('mc-class');
	}
	if (!externalClasses.includes('custom-class')) {
		externalClasses.push('custom-class');
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
			mcStyle: String,
			customStyle: String
		},
	};
	Component(opts);
}
module.exports = McComponent;
