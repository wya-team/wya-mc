Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        title: {
            type: String,
            value: 'Title'
        },
        showTitle: {
            type: Boolean,
            value: true
        },
        closable: {
            type: Boolean,
            value: true
        },
        maskClosable: {
            type: Boolean,
            value: true
        },
        cancelText: {
            type: String,
            value: '取消'
        },
        okText: {
            type: String,
            value: '确定'
        },
        cancelButtonStyle: {
            type: String,
            value: ''
        },
        okButtonStyle: {
            type: String,
            value: 'color: #00c200'
        },
        isTip: {
            type: Boolean,
            value: false
        }
    },
    data: {

    },
    methods: {
        handleClickMask() {
            if (!this.data.maskClosable) {
                return;
            }
            this.triggerEvent('close', {});
        },
        handleCancel() {
            if (!this.data.closable) {
                return;
            }
            this.triggerEvent('close', {});
        },
        handleOk() {
            this.triggerEvent('ok', {});
        }
    }
})