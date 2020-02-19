import Toast from '../../dist/toast/toast';

Page({
	handleShowMessage() {
		Toast({
			message: 'Toast的内容',
			selector: '#toast-message'
		}, 300);
	},
	handleShowLoading() {
		Toast.loading({
			message: '加载中',
			selector: '#toast-loading'
		});
	},
	handleShowSuccess() {
		Toast.success({
			message: '成功',
			selector: '#toast-success'
		});
	},
	handleShowFail() {
		Toast.fail({
			message: '失败',
			selector: '#toast-fail'
		});
	},
	handleShowCustomer() {
		Toast({
			message: '自定义图标（在icon内）',
			icon: 'close',
			selector: '#toast-customer'
		});
	},
	onHide() {
		Toast.clear();
	}
});