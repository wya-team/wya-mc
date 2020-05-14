
Object.defineProperty(exports, "__esModule", { value: true });
let MIN_DISTANCE = 10;
function getDirection(x, y) {
	if (x > y && x > MIN_DISTANCE) {
		return 'horizontal';
	}
	if (y > x && y > MIN_DISTANCE) {
		return 'vertical';
	}
	return '';
}
exports.touch = Behavior({
	methods: {
		resetTouchStatus() {
			this.direction = '';
			this.deltaX = 0;
			this.deltaY = 0;
			this.offsetX = 0;
			this.offsetY = 0;
		},
		touchStart(event) {
			this.resetTouchStatus();
			let touch = event.touches[0];
			this.startX = touch.clientX;
			this.startY = touch.clientY;
		},
		touchMove(event) {
			let touch = event.touches[0];
			this.deltaX = touch.clientX - this.startX;
			this.deltaY = touch.clientY - this.startY;
			this.offsetX = Math.abs(this.deltaX);
			this.offsetY = Math.abs(this.deltaY);
			this.direction = this.direction || getDirection(this.offsetX, this.offsetY);
		}
	}
});
