
Object.defineProperty(exports, "__esModule", { value: true });
function isDef(value) {
	return value !== undefined && value !== null;
}
exports.isDef = isDef;
function isObj(x) {
	let type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
}
exports.isObj = isObj;
function isNumber(value) {
	return /^\d+(\.\d+)?$/.test(value);
}
exports.isNumber = isNumber;
function range(num, min, max) {
	return Math.min(Math.max(num, min), max);
}
exports.range = range;
function nextTick(fn) {
	setTimeout(function () {
		fn();
	}, 1000 / 30);
}
exports.nextTick = nextTick;
let systemInfo = null;
function getSystemInfoSync() {
	if (systemInfo == null) {
		systemInfo = wx.getSystemInfoSync();
	}
	return systemInfo;
}
exports.getSystemInfoSync = getSystemInfoSync;
function addUnit(value) {
	if (!isDef(value)) {
		return undefined;
	}
	value = String(value);
	return isNumber(value) ? value + "px" : value;
}
exports.addUnit = addUnit;

export const getPropByPath = (obj, path) => {
	let target = obj;
	path = path.replace(/\[(\w+)\]/g, '.$1');
	path = path.replace(/^\./, '');

	let keyArr = path.split('.');
	let i = 0;

	for (let len = keyArr.length; i < len - 1; ++i) {
		let key = keyArr[i];
		if (key in target) {
			target = target[key];
		} else {
			throw new Error('[@wya/vc]: 无效路径!');
		}
	}
	// Oracle Key Vault?
	return {
		target,
		key: keyArr[i],
		value: target[keyArr[i]]
	};
};

export const filterEmpty = (val) => {
	if (val instanceof Array) {
		val = val.filter(i => i !== '');
	}
	return val;
};


/**
 * 获取源数据
 * [value, label, children]
 * value: Number or String -> '11' == 11
 */
export const getSelectedData = (value = [], source = [], opts = {}) => {
	let label = [];
	let data = [];
	if (source.length !== 0) {
		if (source.some(i => !!i.children) || !(source[0] instanceof Array)) { // 联动
			value.reduce((pre, cur) => {
				let target = pre.find(it => it.value == cur) || {};
				data.push(target);
				label.push(target.label);
				return target.children || [];
			}, source);
		} else {
			value.forEach((item, index) => {
				let target = source[index].find(it => it.value == item);
				data.push(target);
				label.push(target.label);
			});
		}
		
	}
	return {
		value,
		label,
		data
	};
};

// 不支持Function
export const isEqualWith = (a = [], b = []) => {
	let aProps = Object.getOwnPropertyNames(a);
	let bProps = Object.getOwnPropertyNames(b);
	if (aProps.length != bProps.length) {
		return false;
	}
	for (let i = 0; i < aProps.length; i++) {
		let propName = aProps[i];

		let propA = a[propName];
		let propB = b[propName];
		if ((typeof (propA) === 'object') || (typeof (propB) === 'object')) {
			return isEqualWith(propA, propB);
		} else if (propA !== propB) {
			return false;
		}
	}
	return true;
};

const now = +(new Date());
let index = 0;
export const getUid = (comp, opts = {}) => {
	const { prefix = 'mc', timestamp = false } = opts;

	return `${prefix}${`${comp ? `-${comp}` : ''}`}${timestamp ? `-${now}` : ''}-${++index}`;
};

// 精度计算
export const add = (num1, num2) => {
	const cardinal = 10 ** 10;
	return Math.round((num1 + num2) * cardinal) / cardinal;
};

export function requestAnimationFrame(cb) {
	const systemInfo = getSystemInfoSync();
  
	if (systemInfo.platform === 'devtools') {
		return nextTick(cb);
	}
  
	return wx
		.createSelectorQuery()
		.selectViewport()
		.boundingClientRect()
		.exec(() => {
			cb();
		});
}

/**
 * new Date 兼容ios，2020/10/14 
 * @param {*} dateStr 
 */
export const hackDate = (dateStr) => {
	if (typeof dateStr !== 'string') {
		throw new Error('【@wya/mc utils/hackDate】参数类型错误，应为日期字符串');
	}
	return dateStr.replace(/-/g, '/');
};

/**
 * 分割日期字符串
 * @param {*} dateStr 
 */
export const splitDateStr = (dateStr) => {
	if (typeof dateStr !== 'string') {
		throw new Error('【@wya/mc utils/hackDate】参数类型错误，应为日期字符串');
	}
	if (dateStr.includes('-')) {
		return dateStr.split('-').map((it) => Number(it));
	} else if (dateStr.includes('/')) {
		return dateStr.split('/').map((it) => Number(it));
	}
	return [];
};

/**
 * 小于10的数字前面加0
 */
export const preZero = (num) => {
	return String(num).padStart(2, '0');
};

let screenWidth;
// 不同屏幕下 获取对应的像素值
export const scalePx = (value) => {
	if (!screenWidth) {
		screenWidth = wx.getSystemInfoSync().screenWidth;
	}
	return (screenWidth * value) / 375;
};

export const kebabCase = str => {
	return str && str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map(x => x.toLowerCase())
		.join('-');
};
	