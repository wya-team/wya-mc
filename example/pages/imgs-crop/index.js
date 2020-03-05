const app = getApp();

Page({
	data: {
		src: '',
		rotate: 0
	},
	handleClick() {
		const ref = this.selectComponent('#imgs-crop');
		ref.getImage()
			.then((res) => {
				this.setData({
					src: res
				});
			}).catch((res) => {

			});
	},
	handleChangeRotate(e) {
		this.setData({
			rotate: Number(e.detail.value)
		});
	}
});
