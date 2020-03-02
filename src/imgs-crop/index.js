const device = wx.getSystemInfoSync();
const pixelRatio = device.pixelRatio;
const width = device.windowWidth;
const height = width;

Component({
	properties: {
		src: {
			type: String,
		},

		// 放大的倍数
		scale: {
			type: Number,
			value: 1
		},

		// 旋转的角度倍数
		rotate: {
			type: Number,
			value: 0
		},

		// 裁剪的边框 [x, y]
		border: {
			type: [Number, Array],
			value: 20
		},

		// 裁剪区域高
		height: {
			type: Number,
			value: width - 40
		},

		// 裁剪区域宽
		width: {
			type: Number,
			value: height - 40
		},

		// 裁剪的边框圆角
		borderRadius: {
			type: Number,
			value: 0
		},
		elementId: {
			type: String,
		}
	},
	lifetimes: {
		attached() {
			// todo 验证参数
			this.init();
		},
	},
	methods: {
		init() {
			const { elementId } = this.properties;
			const query = wx.createSelectorQuery();
			query.select(`#${elementId}`)
				.fields({ node: true, size: true })
				.exec((res) => {
					console.log(res);

					const canvas = res[0].node;
					const ctx = canvas.getContext('2d');

					// this.paint(ctx);
					// const dpr = wx.getSystemInfoSync().pixelRatio;
					// canvas.width = res[0].width * dpr;
					// canvas.height = res[0].height * dpr;
					// ctx.scale(dpr, dpr);

					// ctx.fillRect(0, 0, 100, 100);
				});
		},
		/**
		 * 绘制当前的canvas
		 */
		paint(context) {
			let { borderRadius, color } = this;

			context.save();
			// 画布的参数，不影响容器
			context.scale(pixelRatio, pixelRatio);
			context.translate(0, 0);
			// 填充色
			context.fillStyle = 'rgba(' + color.slice(0, 4).join(',') + ')';

			const dimensions = this.getDimensions();
			const [borderSizeX, borderSizeY] = this.getBorders(dimensions.border);
			const height = dimensions.canvas.height;
			const width = dimensions.canvas.width;

			// 将边框半径在零，宽度一半，高度一半之间
			borderRadius = Math.max(borderRadius, 0);
			borderRadius = Math.min(
				borderRadius,
				width / 2 - borderSizeX,
				height / 2 - borderSizeY
			);
			// 开始绘制
			context.beginPath();
			// 内，可能圆形
			drawRoundedRect(
				context,
				borderSizeX,
				borderSizeY,
				width - borderSizeX * 2,
				height - borderSizeY * 2,
				borderRadius
			);
			// 外，逆时针绘制
			context.rect(width, 0, -width, height);
			context.fill('evenodd');
			context.restore();
		},

		/**
		 * canvas外形尺寸
		 */
		getDimensions() {
			const { width, height, rotate, border } = this;

			const canvas = {};

			const [borderX, borderY] = this.getBorders(border);

			const canvasWidth = width;
			const canvasHeight = height;

			canvas.width = canvasWidth;
			canvas.height = canvasHeight;

			canvas.width += borderX * 2;
			canvas.height += borderY * 2;

			return {
				canvas,
				rotate,
				width,
				height,
				border
			};
		},

		/**
		 * 边框
		 */
		getBorders(border = this.border) {
			return Array.isArray(border) ? border : [border, border];
		},
	}

});
