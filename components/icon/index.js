Component({
	properties: {
		type: {
			type: String,
			value: ''
		},
		styles: {
			type: String,
			value: ''
		}
	},
	externalClasses: ["classes"],
	methods: {
		handleClick() {
			this.triggerEvent('click', {}, {});
		}
	}
});