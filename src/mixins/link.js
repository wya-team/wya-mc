
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = Behavior({
	properties: {
		url: String,
		linkType: {
			type: String,
			value: 'navigateTo'
		}
	},
	methods: {
		jumpLink(urlKey) {
			/* eslint-disable */
			if (urlKey === void 0) { urlKey = 'url'; }
			let url = this.data[urlKey];
			if (url) {
				wx[this.data.linkType]({ url });
			}
		}
	}
});
