export const coreProps = {
	height: {
		type: String,
		value: '100vh'
	},
	/**
	 * 注意，如果使用mc-tabs, 一开始为display: none, 所有高宽计算均为0;
	 * 可以通过该字段来触发布局刷新
	 * 同recycle-list
	 */
	show: {
		type: Boolean,
		value: true
	},
	scroll: {
		type: Boolean,
		value: true
	},
	// 是否展示底部状态文字
	showScrollStatus: {
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
	},
	current: {
		type: [String, Number],
		value: '0',
	},
	pullDownStyle: {
		type: String,
		value: '',
	},
	pullUpStyle: {
		type: String,
		value: '',
	}
};