const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
const isImageUrl = (url) => {
	return IMAGE_REGEXP.test(url);
};
export const isImageFile = (item) => {
	if (item.type) {
		return item.type.indexOf('image') === 0;
	}
	if (item.path) {
		return isImageUrl(item.path);
	}
	if (item.url) {
		return isImageUrl(item.url);
	}
	return false;
};

export const recognizer = (url) => {
	const reg = /\.(jpe?g|png|gif|bmp|webp|mp4|mov|avi|mpg|mpeg|rmvb)/ig;
	const result = url.match(reg);
	return result && result.length
		? /.(jpe?g|png|gif|bmp|webp)/ig.test(result[result.length - 1]) ? 'image' : 'video'
		: 'file';
};