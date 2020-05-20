export const openType = Behavior({
	properties: {
	  openType: String,
	},
	methods: {
		bindGetUserInfo() {
			this.$emit('getuserinfo', event.detail);
		},
	
		bindContact() {
			this.$emit('contact', event.detail);
		},
	
		bindGetPhoneNumber() {
			this.$emit('getphonenumber', event.detail);
		},
	
		bindError() {
			this.$emit('error', event.detail);
		},
	
		bindLaunchApp() {
			this.$emit('launchapp', event.detail);
		},
	
		bindOpenSetting() {
			this.$emit('opensetting', event.detail);
		},
	},
});