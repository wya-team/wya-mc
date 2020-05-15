
Object.defineProperty(exports, "__esModule", { value: true });
let utils_1 = require("../common/utils");

let getClassNames = function (name) {
	return ({
		enter: "mc-" + name + "-enter mc-" + name + "-enter-active enter-class enter-active-class",
		'enter-to': "mc-" + name + "-enter-to mc-" + name + "-enter-active enter-to-class enter-active-class",
		leave: "mc-" + name + "-leave mc-" + name + "-leave-active leave-class leave-active-class",
		'leave-to': "mc-" + name + "-leave-to mc-" + name + "-leave-active leave-to-class leave-active-class"
	}); 
};
let nextTick = function () { return new Promise(function (resolve) { return setTimeout(resolve, 1000 / 30); }); };
exports.transition = function (showDefaultValue) {
	return Behavior({
		properties: {
			// @ts-ignore
			visible: {
				type: Boolean,
				value: showDefaultValue,
				observer: 'observeShow'
			},
			// @ts-ignore
			duration: {
				type: null,
				value: 300,
				observer: 'observeDuration'
			},
			name: {
				type: String,
				value: 'fade'
			}
		},
		data: {
			type: '',
			inited: false,
			display: false
		},
		attached() {
			if (this.data.visible) {
				this.enter();
			}
		},
		methods: {
			observeShow(value) {
				value ? this.enter() : this.leave();
			},
			enter() {
				let _this = this;
				let _a = this.data; let duration = _a.duration; let 
					name = _a.name;
				let classNames = getClassNames(name);
				let currentDuration = utils_1.isObj(duration) ? duration.enter : duration;
				this.status = 'enter';
				this.$emit('before-enter');
				Promise.resolve()
					.then(nextTick)
					.then(function () {
						_this.checkStatus('enter');
						_this.$emit('enter');
						_this.setData({
							inited: true,
							display: true,
							classes: classNames.enter,
							currentDuration
						});
					})
					.then(nextTick)
					.then(function () {
						_this.checkStatus('enter');
						_this.transitionEnded = false;
						_this.setData({
							classes: classNames['enter-to']
						});
					})
					.catch(function () { });
			},
			leave() {
				let _this = this;
				if (!this.data.display) {
					return;
				}
				let _a = this.data; let duration = _a.duration; let 
					name = _a.name;
				let classNames = getClassNames(name);
				let currentDuration = utils_1.isObj(duration) ? duration.leave : duration;
				this.status = 'leave';
				this.$emit('before-leave');
				Promise.resolve()
					.then(nextTick)
					.then(function () {
						_this.checkStatus('leave');
						_this.$emit('leave');
						_this.setData({
							classes: classNames.leave,
							currentDuration
						});
					})
					.then(nextTick)
					.then(function () {
						_this.checkStatus('leave');
						_this.transitionEnded = false;
						setTimeout(function () { return _this.onTransitionEnd(); }, currentDuration);
						_this.setData({
							classes: classNames['leave-to']
						});
					})
					.catch(function () { });
			},
			checkStatus(status) {
				if (status !== this.status) {
					throw new Error("incongruent status: " + status);
				}
			},
			onTransitionEnd() {
				if (this.transitionEnded) {
					return;
				}
				this.transitionEnded = true;
				this.$emit("after-" + this.status);
				let _a = this.data; let visible = _a.visible; let 
					display = _a.display;
				if (!visible && display) {
					this.setData({ display: false });
				}
			}
		}
	});
};
