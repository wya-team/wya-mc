Component({
    properties: {
        placeholder: {
            type: String,
            value: '搜索'
        },
        value: {
            type: String,
            value: ''
        }
    },
    attached() {
        this.setData({
            inputValue: this.data.value
        });
        if (this.data.value) {
            this.setData({
                inputShowed: true,
            });
        }
    },
    data: {
        inputShowed: false,
        inputValue: '',
    },
    methods: {
        handleShowInput() {
            this.setData({
                inputShowed: true,
                focus: true
            });
            // setTimeout(() => {this.setData({focus: true})}, 0)
        },
        handleChange(event) {
            const { value } = event.detail;
            this.setData({ inputValue: value });
        },
        handleClear() {
            this.setData({ inputValue: '' });
        },
        handleCancel() {
            this.setData({
                inputShowed: false,
                inputValue: ""
            });
            this.triggerEvent('cancel', {value: this.data.inputValue});
        },
        handleSubmit(event) {
            this.triggerEvent('submit', {value: event.detail.value});
        },
        handleFocus(event) {
            this.triggerEvent('focus', {});
        },
        handleBlur(event) {
            this.triggerEvent('blur', {});
        }
    }
})