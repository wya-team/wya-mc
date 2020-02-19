import CountDown from '../../dist/countdown/countdown';

Page({
	onShow() {
		CountDown({
			targetTime: 1527066720,
			selector: '#day_text'
		});
		CountDown({
			targetTime: 1527155700,
			selector: '#hour_code'
		});
		CountDown({
			targetTime: 1527155700,
			selector: '#hour_text'
		});
		CountDown({
			targetTime: 1527155700,
			selector: '#min_code'
		});
		CountDown({
			targetTime: 1527155700,
			selector: '#sec_text'
		});
	},
	handleEnd() {
		console.log('count down is end!');
	},
	handleListen(e) {
		console.log(e);
	}
});