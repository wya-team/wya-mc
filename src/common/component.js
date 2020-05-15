function McComponent(mcOptions) {
	if (mcOptions === undefined) { mcOptions = {}; }
	const { externalClasses = [], ...restOpts } = mcOptions;
	if (!externalClasses.includes('mc-class')) {
		externalClasses.push('mc-class');
	}
	let options = {
		...restOpts,
		externalClasses,
		properties: {
			...mcOptions.properties,
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
