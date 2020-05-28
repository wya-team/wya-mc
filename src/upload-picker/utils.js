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