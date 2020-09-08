export default class WxCanvas {
	constructor(node, canvasId) {
		this.ctx = node.getContext('2d');

		this.canvasId = canvasId;
		this.chart = null;
		this.canvasNode = node;

		this._initEvent();
	}

	// For Echarts
	getContext(contextType) {
		if (contextType === '2d') {
			return this.ctx;
		}
	}

	setChart(chart) {
		this.chart = chart;
	}

	attachEvent() {
		// noop
	}

	detachEvent() {
		// noop
	}

	// _initCanvas(zrender, ctx) {
	// 	zrender.util.getContext = function () {
	// 		return ctx;
	// 	};

	// 	zrender.util.$override('measureText', function (text, font) {
	// 		ctx.font = font || '12px sans-serif';
	// 		return ctx.measureText(text);
	// 	});
	// }

	// _initStyle(ctx) {
	// 	let styles = ['fillStyle', 'strokeStyle', 'globalAlpha',
	// 		'textAlign', 'textBaseAlign', 'shadow', 'lineWidth',
	// 		'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'];

	// 	styles.forEach(style => {
	// 		Object.defineProperty(ctx, style, {
	// 			set: value => {
	// 				if (style !== 'fillStyle' && style !== 'strokeStyle'
	// 					|| value !== 'none' && value !== null
	// 				) {
	// 					ctx['set' + style.charAt(0).toUpperCase() + style.slice(1)](value);
	// 				}
	// 			}
	// 		});
	// 	});

	// 	ctx.createRadialGradient = () => {
	// 		return ctx.createCircularGradient(arguments);
	// 	};
	// }

	_initEvent() {
		this.event = {};
		const eventNames = [{
			wxName: 'touchStart',
			ecName: 'mousedown'
		}, {
			wxName: 'touchMove',
			ecName: 'mousemove'
		}, {
			wxName: 'touchEnd',
			ecName: 'mouseup'
		}, {
			wxName: 'touchEnd',
			ecName: 'click'
		}];

		eventNames.forEach(name => {
			this.event[name.wxName] = e => {
				const touch = e.touches[0];
				this.chart.getZr().handler.dispatch(name.ecName, {
					zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
					zrY: name.wxName === 'tap' ? touch.clientY : touch.y
				});
			};
		});
	}

	set width(w) {
		if (this.canvasNode) this.canvasNode.width = w;
	}

	set height(h) {
		if (this.canvasNode) this.canvasNode.height = h;
	}

	get width() {
		if (this.canvasNode) return this.canvasNode.width;
		return 0;
	}

	get height() {
		if (this.canvasNode) return this.canvasNode.height;
		return 0;
	}
}
