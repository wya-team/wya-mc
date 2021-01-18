import defaultOptions from './default-options';

const PORTAL_TAG = '@@PORTAL';

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
		return ctx || this.context;
	}


	_init(options) {
		const { onBefore, onSure, onClose, promise, multiple, context, ...rest } = options;
		this.context = context;

		return promise 
			? new Promise((resolve, reject) => {
				if (onBefore && !this.waiting) {
					this.waiting = true;
					onBefore({ 
						...options 
					}).then((response) => {
						this._render({ 
							options: {
								...rest,
								data: response 
							}, 
							onSure: resolve,
							onClose: reject,
						});
						this.waiting = false;
					}).catch((res) => {
						this.waiting = false;
						reject(res);
					});
				} else {
					this._render({ 
						options: rest, 
						onSure: resolve,
						onClose: reject,
					});
				}
			})
			: this._render({ 
				options: rest, 
				onSure, 
				onClose 
			});
	}

	_render({ options, onSure: _onSure, onClose: _onClose }) {
		const ctx = this._getContext();
		ctx.setData({
			visible: true
		});

		let update = ctx.update || ctx.onPortalUpdate;
		update && update.call(ctx, options);

		// 避免快速点击造成出现两次弹框
		if (ctx[PORTAL_TAG]) return ctx;
		let on = ctx.triggerEvent;

		let done = (hook, detail) => {
			this.destroy();
			ctx[PORTAL_TAG] = false;
			hook && hook(detail);
		};

		let overrideTrigger = (type, detail) => {
			switch (type) {
				case 'sure':
					done(_onSure, detail);
					break;
				case 'close':
					done(_onClose, detail);
					break;
				default:
					on(type);
					break;
					
			}
		};

		ctx[PORTAL_TAG] = true;
		// 每次render必须重新，拿去新的onSure和onClose
		ctx.triggerEvent = overrideTrigger;

		return ctx;
	}
}
export default Portal;