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
		type: String, // 12, 24, range; range模式下为24小时制
		value: '24',
	},
	// mode为range时有效
	separator: {
		type: String,
		value: '-'
	}
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
	hideTabBar: Boolean,
};