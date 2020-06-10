
class HackManager {
	constructor() {
		this.instanceList = [];
	}

	on(instance) {
		if (!instance) {
			console.error('mc-popup-hack-manager：缺少参数');
			return;
		}
		const isExist = this.instanceList.some((it) => it.__wxExparserNodeId__ === instance.__wxExparserNodeId__);
		!isExist && this.instanceList.push(instance);
	}

	off(instance) {
		if (!instance) {
			console.error('mc-popup-hack-manager：缺少参数');
			return;
		}
		this.instanceList = this.instance.filter((it) => it.__wxExparserNodeId__ === instance.__wxExparserNodeId__);
	}

	toggle(visible) {
		this.instanceList.forEach((instance) => {
			instance.setData({
				isPopup: visible
			});
		});
	}
}

export default new HackManager();