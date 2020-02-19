const DEFAULT_DATA = {
	show: false,
	message: '',
	icon: '',
};

const TOAST_TYPE = ['loading', 'success', 'fail'];

Component({
	properties: {
		show: {
			type: Boolean,
			value: false
		}
	},
	data: {
		...DEFAULT_DATA
	},
	methods: {
		show(options) {
			const toastOptions = { ...options };
			let icon = options.icon || '';

			if (TOAST_TYPE.indexOf(options.type) > -1) {
				icon = options.type;
			}

			this.setData({
				...toastOptions,
				icon,
			});

		},
		clear() {
			this.setData({
				...DEFAULT_DATA
			});
		}
	}
});