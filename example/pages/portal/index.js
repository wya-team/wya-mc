import { Modal } from './modal/portal';

Page({
	handleOpen() {
		Modal.popup({
			count: 10
		}).then((res) => {
			console.log('sure', res);
		}).catch((err) => {
			console.log('close', err);
		});
	},

	handleClose() {
		Modal.destroy();
	}
});
