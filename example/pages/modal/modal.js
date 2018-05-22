Page({
	data: {
		show: false,
		showDobule: false
	},
	toggleModal() {
		this.setData({
			show: !this.data.show
		});
	},
	toggleDobuleModal() {
		this.setData({
			showDobule: !this.data.showDobule
		});
	}
});