import { wxParse } from './wx-parse.js';
import McComponent from '../common/component';
import { scalePx } from '../common/utils';

McComponent({
	props: {
		value: {
			type: String,
			value: '',
			observer() {
				this.reset();
			}
		},
		// 单位为px，内部做不同屏幕的视频
		imagePadding: {
			type: Number,
			value: 5,
			observer(value) {
				this.setData({
					scaledImagePadding: scalePx(value)
				});
			}
		},
	},
	data: {
		currentValue: '',
	},
	methods: {
		reset() {
			wxParse(
				'currentValue', 
				'html', 
				this.data.value, 
				this, 
				this.data.scaledImagePadding
			);
		}
	}
});