Component({
    properties: {
        type: {
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