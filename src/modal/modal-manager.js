import Portal from '../portal/index';

const registerOptions = {
	multiple: true,
	promise: false 
};
class ModalManager {
	static alert(opts) {
		new Portal({ 
			el: opts.el,
			mode: 'alert',
			...registerOptions
		}).popup(opts);
	}

	static operation(opts) {
		new Portal({ 
			el: opts.el,
			mode: 'operation',
			...registerOptions
		}).popup(opts);
	}
}

export default ModalManager;