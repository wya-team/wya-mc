/**
 * 动画
 */

//  渐显
export const showAnimate = ()  => {
	let animation = wx.createAnimation({
		duration: 400,
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