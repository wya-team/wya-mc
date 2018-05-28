Component({
	properties: {
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