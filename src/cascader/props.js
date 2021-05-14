export const viewProps = {
	dataSource: {
		type: Array,
		value: []
	},
	// 是否将第一级数据以头部tabs形式展示
	useTabs: {
		type: Boolean,
		value: false
	}
};

export const popupProps = {
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