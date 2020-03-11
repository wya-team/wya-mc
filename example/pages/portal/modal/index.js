Component({
	properties: {
		value: {
			type: String,
			value: '我是一个Portal'
		}
	},
	data: {
		visible: false,
		count: 0
	},
	
	methods: {
		onPortalUpdate(options) {
			this.setData({
				count: options.count
			});
		},

		handleClose() {
			this.$emit('close', { a: 1 });
		},

		handleSure() {
			this.$emit('sure', { a: 1 });
		}
	}
});
