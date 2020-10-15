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
		value: 'date',
	},
	minDate: {
		type: String,
		value: '1940/01/01 00:00'
	},
	maxDate: {
		type: String,
		value: '2030/12/31 23:59'
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