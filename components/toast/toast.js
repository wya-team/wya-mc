let timeoutData = {
	timeoutId: 0,
	toastCtx: null
};

/**
 * 获取当前页面
 */
const getPageCtx = () => {
	let ctx;
	const pages = getCurrentPages();
	ctx = pages[pages.length - 1];
  
	return ctx;
};

const Toast = (options = {}, timeout) => {
	if (typeof options === 'string') {
		options = { message: options };
	}
	let context = getPageCtx();
	const toastCtx = context.selectComponent(options.selector);

	if (!toastCtx) {
		console.error('无法找到对应的toast组件，请于页面中注册并在 wxml 中声明 toast 自定义组件');
		return;
	}

	timeoutData.timeoutId && Toast.clear();

	toastCtx.show({
		...options,
		show: true
	});
	const timeoutId = setTimeout(() => {
		toastCtx.clear();
	}, timeout || 3000);

	timeoutData = {
		timeoutId,
		toastCtx
	};
};
// 清理所有 toast
Toast.clear = function () {
	timeoutData.timeoutId && clearTimeout(timeoutData.timeoutId);

	try {
		timeoutData.toastCtx && timeoutData.toastCtx.clear();
	} catch (e) {
		console.log(e);
	}

	timeoutData = {
		timeoutId: 0,
		toastCtx: null
	};
};
  
// 显示 loading
Toast.loading = function (options = {}, timeout) {
	Toast({
		...options,
		type: 'loading'
	},  timeout);
};
// 显示 success
Toast.success = function (options = {}, timeout) {
	Toast({
		...options,
		type: 'success'
	},  timeout);
};
// 显示 fail
Toast.fail = function (options = {}, timeout) {
	Toast({
		...options,
		type: 'fail'
	}, timeout);
};

export default Toast;
