const app = getApp();

Page({
	data: {
		src: 'https://oss.weiyianmd.com/image/193/20190716/171208/0014105859837484_b.jpg',
		cropSrc: '',
		rotate: 0
	},
	handleClick() {
		const ref = this.selectComponent('#imgs-crop');
		ref.getImage()
			.then((res) => {
				this.setData({
					cropSrc: res
				});
			}).catch((res) => {

			});
	},
	handleChangeRotate(e) {
		this.setData({
			rotate: Number(e.detail.value)
		});
	},
	handleChangeFile(e) {
		wx.chooseImage({
			count: 1,
			sourceType: ['album', 'camera'],
			sizeType: ['original', 'compressed'],
			success: (res) => {
				this.setData({
					src: res.tempFilePaths[0]
				});
			},
			fail: (res) => {
				console.log(res);
			}
		});
	}
});
