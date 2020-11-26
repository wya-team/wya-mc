import { wxParse } from './wx-parse.js';
import McComponent from '../common/component';

McComponent({
	props: {
		value: {
			type: String,
			value: '',
			observer() {
				this.reset();
			}
		}
	},
	data: {
		currentValue: ''
	},
	methods: {
		reset() {
			wxParse(
				'currentValue', 
				'html', 
				this.data.value, 
				this, 
				5
			);
		}
	}
});