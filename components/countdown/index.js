const COUNTDOWN_MODE = ['DD天hh时mm分ss秒', 'hh:mm:ss', 'hh时mm分ss秒', 'mm:ss', 'mm分ss秒'];

Component({
	properties: {
		mode: {
			type: String,
			value: ''
		},
		countStyle: {
			type: String,
			value: ''
		},
		unitStyle: {
			type: String,
			value: ''
		},
		isListen: {
			type: Boolean,
			value: false
		}
	},
	externalClasses: ["count-class"],
	data: {
		day: "0",
		hour: "00",
		min: "00",
		sec: "00",
		serverOffset: 0,
		isEnd: 0
	},
	detached() {
		const { timer } = this.data;
		timer && clearTimeout(timer);
	},
	methods: {
		start(options = {}) {
			const { isEnd } = this.data;
			const { serverTime = 0, targetTime = 0, wait = 1000 } = options;
			this.setData({
				...options,
				serverOffset: serverTime ? (serverTime * 1000 - new Date().getTime()) : 0
			});
			if (!isEnd) {
				const timer = setInterval(() => {
					this.runStart();
				}, wait);
				this.setData({ timer });
			}
		},
		getCurrentDate() {
			const { serverOffset } = this.data;
			const dateN = new Date;
			return new Date(dateN.getTime() + Number(serverOffset));
		},
		runStart() {
			const { targetTime, mode, isListen } = this.data;
			const currentDate = this.getCurrentDate().getTime();
			const difference = targetTime * 1000 - currentDate;
			if (difference < 0) {
				this.runEnd();
				return;
			}

			const _second = 1000;
			const _minute = _second * 60;
			const _hour = _minute * 60;
			const _day = _hour * 24;

			if (!mode || COUNTDOWN_MODE.indexOf(mode) == -1 ) {
				throw new Error('倒计时格式不是组件允许范围内');
			}

			let day = 0, hour = 0, min, sec;
			if (mode === 'DD天hh时mm分ss秒') {
				day = Math.floor(difference / _day);
				hour = Math.floor((difference % _day) / _hour);
				min = Math.floor((difference % _hour) / _minute);
				sec = Math.floor((difference % _minute) / _second);
			} else if (mode === 'hh:mm:ss' || mode === 'hh时mm分ss秒') {
				hour = Math.floor(difference / _hour);
				min = Math.floor((difference % _hour) / _minute);
				sec = Math.floor((difference % _minute) / _second);
			} else if (mode === 'mm:ss' || mode === 'mm分ss秒') {
				min = Math.floor(difference / _minute);
				sec = Math.floor((difference % _minute) / _second);
			}
			this.setData({
				day: day < 10 ? day == 0 ? day : `0${day}` : day,
				hour: hour < 10 ? `0${hour}` : hour,
				min: min < 10 ? `0${min}` : min,
				sec: sec < 10 ? `0${sec}` : sec,
			});

			if (difference < 1000) {  // 毫秒级 小于1000相当于0秒
				this.setData({
					isEnd: 1
				});
				this.runEnd();
			} else if (isListen) {
				this.triggerEvent('listen', { currentDate });
			}
		},
		runEnd() {
			const { timer } = this.data;
			timer && clearInterval(timer);
			if (this.data.isEnd) {
				this.triggerEvent('end', {});
			}
		}
	}
});