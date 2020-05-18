export const props = {
	value: {
		type: String,
		observer(value) {
			if (value !== this.data.currentValue) {
				this.setData({ currentValue: value });
			}
		},
	},
	placeholder: {
		type: String,
		value: '请输入'
	},
	placeholderStyle: {
		type: String,
		value: 'color: #999999'
	},
	placeholderClass: String,
	disabled: Boolean,
	maxlength: {
		type: Number,
		value: -1,
	},
	cursorSpacing: {
		type: Number,
		value: 50,
	},
	autoFocus: Boolean,
	focus: Boolean,
	cursor: {
		type: Number,
		value: -1,
	},
	selectionStart: {
		type: Number,
		value: -1,
	},
	selectionEnd: {
		type: Number,
		value: -1,
	},
	adjustPosition: {
		type: Boolean,
		value: true,
	},
	holdKeyboard: Boolean,
	type: {
		type: String,
		value: 'text',
	},
	readonly: {
		type: Boolean,
		value: false
	}
};