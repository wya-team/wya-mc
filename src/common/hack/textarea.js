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

	toggleInCollapseItem(visible, data) {
		if (!(data instanceof Array)) {
			data = [data];
		}
		data.forEach(textInstance => {
			if (textInstance.data.viewPlaceholder) {
				textInstance.setData({ shouldHide: visible });
			}
		});
	}

	toggle(visible, popInstance) {
		if (visible) {
			this.instanceList.forEach((instance) => {
				instance.relatedPopList = instance.relatedPopList || [];
				instance.relatedPopList.push(popInstance);
			});
		} else {
			this.instanceList.forEach((instance) => {
				instance.relatedPopList = (instance.relatedPopList || []).filter((it) => it != popInstance);
			});
		}

		this.instanceList.forEach((instance) => {
			let shouldHide = instance.relatedPopList && instance.relatedPopList.length > 0;
			if (instance.collaspeItem && !instance.collaspeItem.data.isActive && !shouldHide) return;
			instance.data.viewPlaceholder && instance.setData({
				shouldHide
			});
		});

		// 原代码，存在多次pop后，再关闭一个pop，textarea就会浮现
		// if (data) {
		// 	if (!(data instanceof Array)) {
		// 		data = [data];
		// 	}
		// 	data.forEach(instance => {
		// 		instance.data.viewPlaceholder && instance.setData({
		// 			shouldHide: visible
		// 		});
		// 	});
		// } else {
		// 	this.instanceList.forEach((instance) => {
		// 		if (instance.collaspeItem && !instance.collaspeItem.data.isActive && !visible) return;
		// 		instance.data.viewPlaceholder && instance.setData({
		// 			shouldHide: visible
		// 		});
		// 	});
		// }
	}
}

export default new TextareaHack();