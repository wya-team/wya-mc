
// 不常用的参数和方法全部放在haviors里面这样可以查阅更明朗，快速
module.exports = Behavior({
    properties: {
        loading: Boolean,
        formType: String,
        // 微信这边好像不支持这种在自定义组件中放入botton操作form
        openType: String,
        appParameter: String,
        hoverStopPropagation: Boolean,
        hoverStartTime: {
            type: Number,
            value: 20
        },
        hoverStayTime: {
            type: Number,
            value: 70
        },
        lang: {
            type: String,
            value: 'en'
        },
        sessionFrom: {
            type: String,
            value: ''
        },
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: String
    },
    methods: {
        bindgetuserinfo({ detail = {} } = {}) {
            this.triggerEvent('getuserinfo', detail);
        },
        bindcontact({ detail = {} } = {}) {
            this.triggerEvent('contact', detail);
        },
        bindgetphonenumber({ detail = {} } = {}) {
            this.triggerEvent('getphonenumber', detail);
        },
        binderror({ detail = {} } = {}) {
            this.triggerEvent('error', detail);
        }
    }
});
