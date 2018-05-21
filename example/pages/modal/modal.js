Page({
	data: {
		show: false
	},
	toggleModal() {
		this.setData({
			show: !this.data.show
		});
	}
});