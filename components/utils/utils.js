/**
 * 动画
 */

//  渐显
export const showAnimate = ()  => {
	let animation = wx.createAnimation({
		duration: 300,
		timingFunction: 'easa-in',
	});
	animation.opacity(1).step();
	return animation.export();
};
export const hideAnimate = ()  => {
	let animation = wx.createAnimation({
		duration: 600,
		timingFunction: 'ease',
	});
	animation.opacity(0).step();
	return animation.export();
};

/**
 * 缓存
 */
const isAvailable = (function isAvailableIffe() {
	const test = 'test';
	try {
		wx.setStorageSync(test, test);
		wx.removeStorageSync(test);
		return true;
	} catch (e) {
		return false;
	}
}());

/**
 * 设置缓存
 * @param key 保存的键值
 * @param val 保存的内容
 */
export const setItem = (key, val)  => {
	if (isAvailable) {
		wx.setStorageSync(key, val);
	}
};
/**
 * 获取缓存
 * @param  {[String]} key 获取的键值
 * @return {Object}
 */
export const getItem = (key) => {
	if (isAvailable) {
		return wx.getStorageSync(key);
	}
};
/**
 * 删除缓存
 * @param  {[String]} key 删除的键值
 */
export const delItem = (key)  => {
	if (isAvailable) {
		wx.removeStorageSync(key);
	}
};