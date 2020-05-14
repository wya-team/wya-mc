function McComponent(mcOptions) {
	if (mcOptions === undefined) { mcOptions = {}; }
	let options = {
		...mcOptions,
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
