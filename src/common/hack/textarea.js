class TextareaHack {
	constructor() {
		this.instanceList = [];
	}

	on(instance) {
		if (!instance) {
			console.error('mc-popup-hack-manager：缺少参数');
			return;
		}
		const isExist = this.instanceList.some((it) => it.data.uuid === instance.data.uuid);
		!isExist && this.instanceList.push(instance);
	}

	off(instance) {
		if (!instance) {
			console.error('mc-popup-hack-manager：缺少参数');
			return;
		}
		this.instanceList = this.instanceList.filter((it) => it.data.uuid === instance.data.uuid);
	}

	toggle(visible, data) {
		if (data) {
			if (!(data instanceof Array)) {
				data = [data];
			}
			data.forEach(instance => {
				instance.setData({
					isPopup: visible
				});
			});
		} else {
			this.instanceList.forEach((instance) => {
				instance.setData({
					isPopup: visible
				});
			});
		}
	}
}

export default new TextareaHack();