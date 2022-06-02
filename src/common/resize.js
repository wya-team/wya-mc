class ResizeManage {
	constructor() {
		this.scale = null;
		this.getScale();
	}

	getScale() {
		if (!this.scale) {
			const { windowWidth } = wx.getSystemInfoSync();
			this.scale = windowWidth / 375;
		}

		return this.scale;
	}

	// px - rpx
	px2rpx(px) {
		return Math.floor(px * this.getScale()) * 2;
	}

	// rpx - px
	rpx2px(rpx) {
		return Math.floor(rpx / 2 * this.getScale());
	}
}

export default new ResizeManage();