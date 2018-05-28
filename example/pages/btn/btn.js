Page({
	handleClick(){
		console.log('你好');
	},
	formSubmit(e){
		console.log('form发生了submit事件，携带数据为：', e.detail.value);
	}
});