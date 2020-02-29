const app = getApp();

const generateArray = base => {
	return Array.from({ length: 30 }).map((self, i) => base * 10 + i);
};

Page({
	data: {
		list: [],
		current: 0,
		total: 0,
	},
	
	loadData(e) {
		const { page, refreshing, done } = e.detail;
		this.request(page)
			.then(res => {
				this.setData({
					list: this.data.list.concat(res.data.list),
					current: res.data.page.current,
					total: res.data.page.total,
				});

				done();
			});
	},

	request(page) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					status: 1,
					data: {
						page: {
							current: page,
							total: 2,
						},
						list: generateArray(page),
					}
				});
			}, 2000);
		});
	}
});
