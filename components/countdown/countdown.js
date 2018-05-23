/**
 * 获取当前页面
 */
const getPageCtx = () => {
    let ctx;
    const pages = getCurrentPages();
    ctx = pages[pages.length - 1];
  
    return ctx;
}

const CountDown = (options = {}) => {
    if (typeof options !== 'object') {
        throw new Error('参数错误');
    }
    let context = getPageCtx();
    const countDownCtx = context.selectComponent(options.selector);

    if (!countDownCtx) {
        console.error('无法找到对应的countdown组件，请于页面中注册并在 wxml 中声明countdown自定义组件');
        return;
    }

    countDownCtx.start(options);
}

export default CountDown;