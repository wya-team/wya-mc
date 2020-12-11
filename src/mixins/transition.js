
import { isObj, requestAnimationFrame } from '../common/utils';

const getClassNames = (name) => {
	return ({
		enter: `mc-${name}-enter mc-${name}-enter-active enter-class enter-active-class`,
		'enter-to': `mc-${name}-enter-to mc-${name}-enter-active enter-to-class enter-active-class`,
		leave: `mc-${name}-leave mc-${name}-leave-active leave-class leave-active-class`,
		'leave-to': `mc-${name}-leave-to mc-${name}-leave-active leave-to-class leave-active-class`,
	}); 
};
export const transition = (showDefaultValue) => {
	return Behavior({
		properties: {
			visible: {
				type: Boolean,
				value: showDefaultValue,
				observer: 'observeShow'
			},
			// TODO: 300 -> 0.3s
			duration: {
				type: null,
				value: 300,
				observer: 'observeDuration'
			},
			name: {
				type: String,
				value: 'fade'
			}
		},
		data: {
			type: '',
			inited: false,
			display: false
		},
		methods: {
			observeShow(value, old) {
				if (value === old) {
					return;
				}
				value ? this.enter() : this.leave();
			},
			enter() {
				const { duration, name } = this.data;
				const classNames = getClassNames(name);
				const currentDuration = isObj(duration) ? duration.enter : duration;

				this.status = 'enter';
				this.$emit('before-enter');
				
				requestAnimationFrame(() => {
					this.checkStatus('enter');
					this.$emit('enter');
		  
					this.setData({
						inited: true,
						display: true,
						classes: classNames.enter,
						currentDuration,
					});
		  
					requestAnimationFrame(() => {
						this.checkStatus('enter');
						this.transitionEnded = false;
			
						this.setData({ classes: classNames['enter-to'] });
					});
				  });
			},
			leave() {
				if (!this.data.display) {
					return;
				}
		  
				const { duration, name } = this.data;
				const classNames = getClassNames(name);
				const currentDuration = isObj(duration) ? duration.leave : duration;
		
				this.status = 'leave';
				this.$emit('before-leave');
		
				requestAnimationFrame(() => {
					this.checkStatus('leave');
					this.$emit('leave');
		
					this.setData({
						classes: classNames.leave,
						currentDuration,
					});
		
					requestAnimationFrame(() => {
						this.checkStatus('leave');
						this.transitionEnded = false;
						setTimeout(() => this.onTransitionEnd(), currentDuration);
		
						this.setData({ classes: classNames['leave-to'] });
					});
				});
			},
			checkStatus(status) {
				if (status !== this.status) {
					throw new Error(`incongruent status: ${status}`);
				}
			},
		
			onTransitionEnd() {
				if (this.transitionEnded) {
					return;
				}
	
				this.transitionEnded = true;
				this.$emit(`after-${this.status}`);
	
				const { visible, display } = this.data;
				if (!visible && display) {
					this.setData({ display: false });
				}
			},
		}
	});
};
