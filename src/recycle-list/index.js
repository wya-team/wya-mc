import { PULL_DOWN_STATUS, PULL_UP_STATUS, SCROLL_STATUS } from './constant';

Component({
	options: {
		multipleSlots: true
	},
	data: {
		y: 0,
		/**
		 * 0.未touchstart 
		 * 1.pulling但未达到pauseY 
		 * 2.pulling达到pauseY 
		 * 3.进入pause状态 （loading）
		 */
		pullDownStatus: 0,
		pullDownText: PULL_DOWN_STATUS[0],
		/**
		 * 0: '上滑加载', 
		 * 1: '加载中', 
		 * 2: '已全部加载', 
		 * 3: '网络不稳定，请稍后重试', 
		 * 4: '没有内容可供显示'
		 */
		scrollStatus: 0,
		scrollText: SCROLL_STATUS[0],
		/**
		 * 0.未touchstart 
		 * 1.pulling但未达到pauseY 
		 * 2.pulling达到pauseY 
		 * 3.进入pause状态 （loading）
		 */
		pullUpStatus: 0,
		scrollTop: 0,
		// 页面
		currentPage: 0,
		animate: {}
	},
	properties: {
		pauseY: {
			type: Number,
			value: 40
		},
		height: {
			type: String
		},
		total: {
			type: Number,
		},
		scroll: {
			type: Boolean,
			value: true
		},
		pull: {
			type: Boolean,
			value: true
		},
		show: {
			type: Boolean,
			value: true
		}
	},
	lifetimes: {
		attached() {
			if (this.data.currentPage === 0) {
				this.loadDataForScroll();
			}
		},
		detached() {
			
		},
	},
	methods: {
		// TODO: 提取
		$emit(event, options) {
			this.triggerEvent(event, options);
		},

		handleScroll(e) {
			this.setData({
				scrollTop: e.detail.scrollTop
			});
		},
		handleEndReached() {
			this.loadDataForScroll();
		},
		handleTouchStart(e) {
			if (!this.canRefresh()) return;
			if (e.touches.length === 1) {
				this.startY = e.touches[0].clientY;
			}
		},
		handleTouchMove(e) {
			if (!this.canRefresh() || this.data.scrollTop > 0) return;
			let pulledY = e.touches[0].clientY - this.startY;

			// 滚动条所在位置
			if (this.data.scrollTop <= 0) {
				let pullDownStatus = pulledY > this.data.pauseY ? 2 : 1;
				this.setData({
					pullDownStatus,
					pullDownText: PULL_DOWN_STATUS[pullDownStatus],
					y: this.easing(pulledY)
				});
			}
		},
		handleTouchEnd(e) {
			if (!this.canRefresh()) return;

			if (this.data.pullDownStatus == 2) {
				this.setData({
					pullDownStatus: 3,
					pullDownText: PULL_DOWN_STATUS["3"],
					y: this.data.pauseY
				});

				this.$emit('loadData', { 
					page: 1, 
					refreshing: true, 
					done: () => {
						this.setData({
							pullDownText: PULL_DOWN_STATUS["0"],
							pullDownStatus: 0,
							y: 0
						});
					}
				});
			} else {
				this.setData({
					pullDownText: PULL_DOWN_STATUS["0"],
					pullDownStatus: 0,
					y: 0
				});
			}
		},

		easing(pulledY) {
			// 从顶部开始
			let startY = 0;
			// 允许拖拽的最大距离
			let maxY = 500;
			// 提示标签最大有效拖拽距离
			let duration = 2.5;
			return maxY / duration * Math.sin(pulledY / maxY * (Math.PI / 2)) + startY;
		},

		loadDataForScroll() {
			if (this.data.show && this.data.scroll && this.data.scrollStatus >= 1) return;

			this.setData({
				scrollStatus: 1,
				scrollText: SCROLL_STATUS["1"],
			});

			let page = this.data.currentPage + 1;
			this.$emit('loadData', {
				page,
				done: () => {
					let scrollStatus = this.data.total <= page ? 2 : 0;
					this.setData({
						scrollStatus, // TODO
						scrollText: SCROLL_STATUS[scrollStatus],
						currentPage: page
					});
				}
			});
		},

		canRefresh() {
			return this.data.show 
				&& this.data.pull
				&& this.data.pullDownStatus !== 3 
				&& this.data.scrollStatus !== 1;
		}
	}
});