
Object.defineProperty(exports, "__esModule", { value: true });
exports.basic = Behavior({
	methods: {
		$emit() {
			let args = [];
			for (let _i = 0; _i < arguments.length; _i++) {
				args[_i] = arguments[_i];
			}
			/* eslint-disable */
			this.triggerEvent.apply(this, args);
		},
		set(data, callback) {
			this.setData(data, callback);
			return new Promise(function (resolve) { return wx.nextTick(resolve); });
		},
		getRect(selector, all) {
			let _this = this;
			return new Promise(function (resolve) {
				wx.createSelectorQuery()
					.in(_this)[all ? 'selectAll' : 'select'](selector)
					.boundingClientRect(function (rect) {
						if (all && Array.isArray(rect) && rect.length) {
							resolve(rect);
						}
						if (!all && rect) {
							resolve(rect);
						}
					})
					.exec();
			});
		}
	}
});
