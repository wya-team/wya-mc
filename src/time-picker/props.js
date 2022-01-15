export const pickerViewProps = {
	indicatorStyle: {
		type: String,
		value: 'height: 80rpx;'
	},
	indicatorClass: {
		type: String,
		value: ''
	},
	mode: {
		type: String, // date、month、quarter
		value: '24',
	},
	// TODO: 最大值、最小值
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
	},
	maskStyle: {
		type: String,
		value: ''
	},
};