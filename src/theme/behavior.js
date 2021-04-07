import { kebabCase } from '../common/utils';

let app = getApp();
app.$mc = app.$mc || { config: {} };

export default Behavior({
	properties: {
		color: {
			type: String,
			observer: 'resetStyles'
		},
		borderColor: {
			type: String,
			observer: 'resetStyles'
		},
		backgroundColor: {
			type: String,
			observer: 'resetStyles'
		},
		backgroundSize: {
			type: String,
			value: 'cover',
			observer: 'resetStyles'
		},
		backgroundImage: {
			type: String,
			observer: 'resetStyles'
		},
		src: {
			type: String,
			observer: 'resetSrc'
		}
	},
	data: {
		styles: '',
		source: ''
	},
	// 需要响应支持，否则无法实现
	lifetimes: {
		attached() {
			this.reset = this.reset.bind(this);
			app.emitter && app.emitter.on('themeUpdated', this.reset);
		},
		detached() {
			app.emitter && app.emitter.off('themeUpdated', this.reset);
		},
	},
	methods: {
		reset() {
			this.resetStyles();
			this.resetSrc();
		},

		resetSrc() {
			this.data.src && this.setData({
				source: this.setVar(this.data.src)
			});
		},
		resetStyles() {
			let attrs = [
				'color', 
				'backgroundColor', 
				'borderColor'
			].reduce((pre, key) => {
				pre[key] = this.data[key] && (this.setVar(this.data[key]));
				return pre;
			}, {});

			if (this.data.backgroundImage) {
				attrs.backgroundSize = this.data.backgroundSize;
				attrs.backgroundImage = `url(${this.setVar(this.data.backgroundImage)})`;
			}

			let content = ';';
			Object.entries(attrs).forEach(([key, val]) => {
				val && (content += `${kebabCase(key)}: ${val};`);
			});

			this.setData({
				styles: content
			});
		},

		setVar(name) {
			// http?s
			if (/[a-zA-z]+:\/\/[^\s]*/.test(name)) {
				return name;
			}
			let its = app.$mc && app.$mc.config && app.$mc.config.Theme
				? app.$mc.config.Theme
				: {};
			return its[name] || name;
		}
	}
});