App({
	$mc: { config: {} },
	emitter: {
		_events: {},
		on(eventName, fn) {
			this._events[eventName] = this._events[eventName] || [];

			this._events[eventName].push(fn);
		},
		off(eventName, fn) {
			if (typeof eventName === 'undefined') {
				this._events = {};
				return;
			}

			if (typeof eventName === 'string' 
				&& this._events[eventName] 
				&& !fn
			) {
				delete this._events[eventName];
				return;
			}

			if (typeof eventName === 'string' 
				&& this._events[eventName] 
				&& fn
			) {
				this._events[eventName] = this._events[eventName].filter(i => i != fn);
				return;
			}
		},
		emit(eventName, ...args) {
			this._events[eventName] && this._events[eventName].forEach((fn) => {
				fn(...args);
			});
		},
	},
	onLaunch() {

	}
});
