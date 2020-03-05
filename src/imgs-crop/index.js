/**
 * TODO: 优化代码逻辑 ~ ~！
 */

Component({
	properties: {
		src: {
			type: String,
			value: ''
		},

		// 放大的倍数
		scale: {
			type: Number,
			value: 1,
			observer(value) {
				this.update();
			}
		},

		// 旋转的角度倍数
		rotate: {
			type: Number,
			value: 0,
			observer(value) {
				this.update();
			}
		},

		// 裁剪的边框 [x, y]
		border: {
			type: [Number, Array],
			value: 40
		},

		// 裁剪区域高
		height: {
			type: Number,
			value: 750
		},

		// 裁剪区域宽
		width: {
			type: Number,
			value: 750
		},

		color: {
			type: Array,
			value: [0, 0, 0, 0.5]
		},
		// 裁剪区域高
		position: Object, 

		elementId: {
			type: String,
			value: 'import-mc-imgs-crop'
		}
	},
	data: {
		
	},
	lifetimes: {
		attached() {
			this.image = {
				width: 0, 
				height: 0,
				x: 0.5,
				y: 0.5
			};
			this.drag = true;

			this.canvas = null;
			this.startX = null;
			this.startY = null;
			this.moveX = null;
			this.moveY = null;

			this.mx = null;
			this.my = null;

			this.previousPinchScale = 1;
			this.init();
		},
	},
	methods: {
		update() {
			const { canvas } = this;
			if (!canvas) return;
			const ctx = canvas.getContext('2d');

			this.paintBound(ctx);
			this.paintImage(ctx, { ...this.image }, this.data.border);
		},
		init() {
			const { elementId } = this.properties;
			const query = this.createSelectorQuery();
			query.select(`#${elementId}`)
				.fields({ node: true, size: true })
				.exec((res) => {
					const { width, height } = this.properties;
					const canvas = res[0].node;

					canvas.width = width;
					canvas.height = height;

					const ctx = res[0].node.getContext('2d');

					this.paintBound(ctx);

					let image = canvas.createImage();
					image.src = this.properties.src;
					image.onload = (e) => {
						const imageState = this.getInitialSize(image.width, image.height);

						imageState.x = 0.5;
						imageState.y = 0.5;
						imageState.resource = image;

						this.image = imageState;
						this.paintImage(ctx, imageState);
					};

					this.canvas = canvas;
				});
		},
		/**
		 * 绘制边框
		 */
		paintBound(ctx) {
			let { borderRadius, color, width, height } = this.data;

			ctx.clearRect(0, 0, width, height);

			ctx.save();
			// 画布的参数，不影响容器
			ctx.scale(1, 1);
			ctx.translate(0, 0);
			// 填充色
			ctx.fillStyle = 'rgba(' + color.slice(0, 4).join(',') + ')';

			const [borderSizeX, borderSizeY] = this.getBorders();

			// 开始绘制
			ctx.beginPath();

			ctx.rect(borderSizeX, borderSizeY, width - borderSizeX * 2, height - borderSizeY * 2);
			ctx.rect(width, 0, -width, height);

			ctx.fill();
			ctx.restore();
		},

		/**
		 * 绘制图片
		 */
		paintImage(ctx, image, border) {
			if (!image.resource) return;
			const { rotate } = this.properties;
			const { canvas } = this.getDimensions();

			const position = this.calculatePosition(image, border);

			ctx.save();
			ctx.translate(canvas.width / 2, canvas.height / 2);
			ctx.rotate(rotate * Math.PI / 180);
			ctx.translate( 
				-(canvas.width / 2), 
				-(canvas.height / 2)
			);

			ctx.scale(1, 1);
			// 在源图像上方显示目标图像
			ctx.globalCompositeOperation = 'destination-over';
			
			ctx.drawImage(
				image.resource,
				position.x,
				position.y,
				position.width,
				position.height
			);

			ctx.restore();
		},

		/**
		 * canvas外形尺寸
		 */
		getDimensions() {
			const { width, height, rotate, border } = this.properties;

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
		 * 初始的宽高
		 */
		getInitialSize(width, height) {
			let newHeight;
			let newWidth;

			const dimensions = this.getDimensions();
			const canvasRatio = dimensions.height / dimensions.width;
			const imageRatio = height / width;

			if (canvasRatio > imageRatio) {
				newHeight = dimensions.height; // 高度占满
				newWidth = width * (newHeight / height);
			} else {
				newWidth = dimensions.width; // 宽度占满
				newHeight = height * (newWidth / width);
			}

			return {
				height: newHeight,
				width: newWidth
			};
		},

		/**
		 * 边框
		 */
		getBorders(border = this.data.border) {
			return Array.isArray(border) ? border : [border, border];
		},

		/**
		 * 通过相对位置计算 实际的位置
		 */
		calculatePosition(image, border) {
			const { scale } = this.properties;

			const [borderX, borderY] = this.getBorders(border);

			const croppingRect = this.getCroppingRect();

			const width = image.width * scale;
			const height = image.height * scale;

			let x = -croppingRect.x * width;
			let y = -croppingRect.y * height;

			x += borderX;
			y += borderY;

			return {
				x,
				y,
				height,
				width
			};
		},

		/**
		 * 可外调用
		 * 获取裁剪的startX, startY, width, height [0, 1]
		 */
		getCroppingRect() {
			const { image } = this;
			const { scale } = this.data;

			const position = this.data.position || {
				x: image.x,
				y: image.y
			};
			const width = 1 / scale * this.getXScale();
			const height = 1 / scale * this.getYScale();

			const croppingRect = {
				x: position.x - width / 2,
				y: position.y - height / 2,
				width,
				height
			};

			let xMin = 0;
			let xMax = 1 - croppingRect.width;
			let yMin = 0;
			let yMax = 1 - croppingRect.height;
			/**
			 * 如果裁剪图像大于原图像，则需要更改
			 * 我们的最大和最小的x＆y允许图像出现在任何地方
			 * 到修剪矩形的边缘.
			 */
			const isLargerThanImage = width > 1 || height > 1;

			if (isLargerThanImage) {
				xMin = -croppingRect.width;
				xMax = 1;
				yMin = -croppingRect.height;
				yMax = 1;
			}

			return {
				...croppingRect,
				x: Math.max(xMin, Math.min(croppingRect.x, xMax)),
				y: Math.max(yMin, Math.min(croppingRect.y, yMax))
			};
		},

		/**
		 * x轴默认缩放
		 */
		getXScale() {
			const { image } = this;
			const { width, height } = this.data;

			const canvasAspect = width / height;
			const imageAspect = image.width / image.height;

			return Math.min(1, canvasAspect / imageAspect);
		},
		/**
		 * y轴默认缩放
		 */
		getYScale() {
			const { image } = this;
			const { width, height } = this.data;

			const canvasAspect = height / width;
			const imageAspect = image.height / image.width;

			return Math.min(1, canvasAspect / imageAspect);
		},

		/**
		 * 按下，只作用于canvas区域
		 */
		handleStart(e) {
			this.drag = true;
			this.startX = e.touches[0].x;
			this.startY = e.touches[0].x;
			this.moveX = null;
			this.moveY = null;

			// 多指触控
			if (e.touches.length > 1) {
				let point2 = e.touches[1];
				let xLen = Math.abs(point2.x - this.startX);
				let yLen = Math.abs(point2.y - this.startY);
				this.touchDistance = Math.sqrt(xLen * xLen + yLen * yLen);
				this.touchVector = {
					x: point2.x - this.startX,
					y: point2.y - this.startY
				};
				return;
			}
			
		},

		/**
		 * 抬起
		 * 由 this.drag 判断
		 */
		handleEnd() {
			if (this.drag) {
				this.drag = false;
			}
			this.startX = null;
			this.startY = null;
			this.moveX = null;
			this.moveY = null;
			this.previousPinchScale = 1;
		},

		handleMove(e) {
			if (!this.drag) return;

			if (e.touches.length > 1) {
				let xLen = Math.abs(e.touches[0].x - e.touches[1].x);
				let yLen = Math.abs(e.touches[0].y - e.touches[1].y);
				let touchDistance = Math.sqrt(xLen * xLen + yLen * yLen);
				// 缩放
				if (this.touchDistance) {
					let pinchScale;
					if (touchDistance > this.touchDistance) { // 放大
						pinchScale = touchDistance / this.touchDistance;
						this.setData({
							scale: this.data.scale + (pinchScale - this.previousPinchScale),
						});
					} else { // 缩小
						pinchScale = this.touchDistance / touchDistance;
						this.setData({
							scale: this.data.scale + this.previousPinchScale - pinchScale,
						});
					}
					this.previousPinchScale = pinchScale;
				}
				// 旋转
				if (this.touchVector) {
					// TODO
				}

				this.update();
				return;
			}


			// 拖动逻辑
			const mousePositionX = e.touches[0].x;
			const mousePositionY = e.touches[0].y;

			const newState = {
				mx: mousePositionX,
				my: mousePositionY
			};

			let { rotate, scale } = this.data;
			let { image, moveX, moveY } = this;

			rotate %= 360;
			rotate = rotate < 0 ? rotate + 360 : rotate;

			if (moveX && moveY) {
				moveX -= mousePositionX;
				moveY -= mousePositionY;

				const width = image.width * scale;
				const height = image.height * scale;

				let { x: lastX, y: lastY } = this.getCroppingRect();

				lastX *= width;
				lastY *= height;

				// 计算向量
				const toRadians = degree => degree * (Math.PI / 180);
				const cos = Math.cos(toRadians(rotate));
				const sin = Math.sin(toRadians(rotate));

				const x = lastX + moveX * cos + moveY * sin;
				const y = lastY + -moveX * sin + moveY * cos;

				const relativeWidth = 1 / scale * this.getXScale();
				const relativeHeight = 1 / scale * this.getYScale();

				const position = {
					x: x / width + relativeWidth / 2,
					y: y / height + relativeHeight / 2
				};


				this.image = {
					...this.image,
					...position
				};

				this.update();
			}

			this.moveX = newState.mx;
			this.moveY = newState.my;
		},

		// 外部调用
		getImage() {
			return new Promise((resolve, reject) => {
				const query = this.createSelectorQuery();
				query.select(`#export-mc-imgs-crop`)
					.fields({ node: true, size: true })
					.exec((res) => {
						// 获取相对坐标
						const cropRect = this.getCroppingRect();
						const { image } = this;
						const { rotate } = this.data;

						// 获取实际像素坐标
						cropRect.x *= image.resource.width;
						cropRect.y *= image.resource.height;
						cropRect.width *= image.resource.width;
						cropRect.height *= image.resource.height;
						const canvas = res[0].node;
						canvas.width = cropRect.width;
						canvas.height = cropRect.height;

						// 在正确的位置绘制全尺寸图像,
						// 图像被截断到画布的大小.
						const ctx = canvas.getContext('2d');

						ctx.translate(canvas.width / 2, canvas.height / 2);
						ctx.rotate(rotate * Math.PI / 180);
						ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
						ctx.drawImage(image.resource, -cropRect.x, -cropRect.y);

						// 目前微信只支持保存在本地
						wx.canvasToTempFilePath({
							x: 0,
							y: 0,
							width: cropRect.width,
							height: cropRect.height,
							destWidth: cropRect.width,
							destHeight: cropRect.height,
							canvas,
							success(res) {
								resolve(res.tempFilePath);
							},
							fail(res) {
								console.log(res);
								reject(res);
							}
						});
					});
			});
		}
	}

});
