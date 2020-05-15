function McComponent(mcOptions) {
	if (mcOptions === undefined) { mcOptions = {}; }
	const { externalClasses = [], mixins, props, ...restOpts } = mcOptions;
	if (!externalClasses.includes('mc-class')) {
		externalClasses.push('mc-class');
	}
	let options = {
		...restOpts,
		externalClasses,
		behaviors: mixins,
		properties: {
			...props,
			mcStyle: String
		},
		methods: {
			...mcOptions.methods,
			$emit(event, options) {
				this.triggerEvent(event, options);
			},
		}
	};
	Component(options);
}
module.exports = McComponent;
