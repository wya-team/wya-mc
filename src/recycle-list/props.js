export const coreProps = {
	height: {
		type: String,
		value: '100vh'
	},
	show: {
		type: Boolean,
		value: true
	},
	scroll: {
		type: Boolean,
		value: true
	},
	scrollTop: { // 内部滚动距离
		type: Number,
		value: 0
	},
	disabled: {
		type: Boolean,
		value: false
	},
	lowerThreshold: {
		type: Number,
		value: 100
	},
	listenScroll: { // 是否抛出滚动事件
		type: Boolean,
		value: false
	},
	total: {
		type: Number,
		value: 0,
	}
};