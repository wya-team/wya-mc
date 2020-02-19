Component({
	properties: {
		// 排列方式 horizon 水平 vertical 竖直
		type: {
			type: String,
			value: 'horizon'
		},
		// 是否存在描述
		hasDesc: {
			type: Boolean,
			value: false
		},
		// 步骤的数组数据
		steps: { 
			type: Array,
			value: []
		},
		// 主题颜色
		color: {
			type: String,
			value: '#06bf04'
		},
		// 当前步骤的icon
		currentIcon: {
			type: String,
			value: 'success'
		},
		// 当前步骤的样式
		activeItem: String,
		// 文字的样式
		textStyle: String,
	}
});