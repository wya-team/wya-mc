export default {
	// 数字 0-9
	value: {
		type: [Number, String],
		value: 0
	},
	/**
	 * 模式：scroll 滚动；count 计算，单位时间内变化
	 * TODO: count模式
	 */
	mode: {
		type: String,
		value: 'scroll'
	},
	/**
	 * mode为scroll时数字滚动的类型：
	 * soft 由当前数字通过transition的方式切换到目标数字（比较柔和）
	 * hard 会进行duration时长的animation动画后切换到目标数字，比如适用那种抽奖的场景
	 */
	scrollType: {
		type: String,
		value: 'soft'
	},
	// 数字变化动画过程时长
	duration: {
		type: Number,
		value: 0
	},
	// dance-item样式
	itemStyle: {
		type: String,
		value: ''
	},
	// 数字样式
	numberStyle: {
		type: String,
		value: ''
	}
};