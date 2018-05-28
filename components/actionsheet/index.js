Component({
	externalClasses: ['action-class'],
	properties: {
		actions: {
			type: Array,
			value: []
		},
		show: {
			type: Boolean,
			value: false
		},
		maskClosable: {
			type: Boolean,
			value: true
		},
		cancelText: {
			type: String,
			value: ''
		}
	},
	methods: {
		onMaskClick() {
			if (this.data.maskClosable) {
				this.handleClose();
			}
		},
		handleClose() {
			this.triggerEvent('cancel');
		},
		handleBtnClick({ currentTarget = {} }) {
			const dataset = currentTarget.dataset || {};
			const { index } = dataset;
			this.triggerEvent('actionclick', { index });
		}
	}
});
