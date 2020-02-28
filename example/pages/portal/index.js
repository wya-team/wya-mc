import { Modal } from './modal/portal';

Page({
	handleOpen() {
		Modal.popup({

		}).then(() => {

		}).catch(() => {

		});
	},

	handleClose() {
		Modal.destroy();
	}
});
