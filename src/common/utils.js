
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

export const arrayEqual = (arr1, arr2) => {
	if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false;
	if (arr1.length !== arr2.length) return false;
	return arr1.every((it, index) => {
		return it === arr2[index];
	});
};

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