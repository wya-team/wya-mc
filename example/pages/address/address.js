Page({
	data: {
		show: false,
		customerShow: false,
		initValue: ["浙江省", "杭州市", "拱墅区"]
	},
	togglePopup() {
		this.setData({
			show: !this.data.show
		});
	},
	toggleCustomerPopup() {
		this.setData({
			customerShow: !this.data.customerShow
		});
	},
	handleOk(event) {
		this.setData({
			value: event.detail.value
		});
	},
	handleReady(event) {
		this.setData({
			value: event.detail.value
		});
	}
});