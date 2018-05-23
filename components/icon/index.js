Component({
    properties: {
        type: {
            type: String,
            value: ''
        },
        iconStyle: {
            type: String,
            value: ''
        }
    },
    externalClasses: ["icon-class"],
    methods: {
        handleClick() {
            this.triggerEvent('click', {}, {});
        }
    }
});