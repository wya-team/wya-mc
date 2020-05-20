export const pickerViewProps = {
	dataSource: {
		type: Array,
		value: []
	},
	cols: {
		type: Number,
		value: 1
	},
	indicatorStyle: {
		type: String,
		value: 'height: 80rpx;'
	},
	indicatorClass: {
		type: String,
		value: ''
	},
};

export const pickerPopupProps = {
	title: {
		type: String,
		value: ''
	},
	cancelText: {
		type: String,
		value: '取消'
	},
	okText: {
		type: String,
		value: '确定'
	},
	showToolbar: {
		type: Boolean,
		value: true
	}
};