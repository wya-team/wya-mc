import defaultOptions from './default-options';

class Portal {
	constructor(registerOptions) {
		this.waiting = false;

		this.globalOptions = registerOptions;
		this.popup = this.popup.bind(this);
		this.destroy = this.destroy.bind(this);
	}

	/**
	 * 弹出项目，验证数据结构是否合法
	 * userOptions {
	 * 	store,
	 * 	router,
	 * 	getInstance,
	 * 	param: {
	 * 	}
	 * }
	 */
	popup(userOptions = {}) {
		if (typeof userOptions !== 'object') {
			userOptions = {};
		}
		return this._init({ 
			...this._getDefaultOptions(),
			...userOptions 
		});
	}


	destroy() {
		const ctx = this._getContext();

		ctx.setData({
			visible: false
		});
	}

	_getDefaultOptions() {
		return {
			...defaultOptions, 
			...this.globalOptions,
		};
	}

	_getContext() {
		let { el } = this._getDefaultOptions();
		const page = getCurrentPages().pop();
		const ctx = page.selectComponent(el);
		return ctx;
	}


	_init(options) {
		const { onBefore, onSure, onClose, promise, ...rest } = options;

		return promise 
			? new Promise((resolve, reject) => {
				if (onBefore && !this.waiting) {
					this.waiting = true;
					onBefore({ 
						...options 
					}).then(() => {
						this._render({ 
							options, 
							response,
							onSure: resolve,
							onClose: reject,
						});
					}).catch(() => {
						this.waiting = false;
						reject(res);
					});
				} else {
					this._render({ 
						options, 
						onSure: resolve,
						onClose: reject,
					});
				}
			})
			: this._render({ 
				options, 
				onSure, 
				onClose 
			});
	}

	_render({ options, response = {}, onSure, onClose }) {
		const ctx = this._getContext();

		ctx.setData({
			visible: true
		});

		return ctx;
	}
}
export default Portal;