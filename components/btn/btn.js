const btnBehaviors = require('./btnBehaviors');
Component({
    behaviors: [btnBehaviors, 'wx://form-field' ],

    //常用的传入参数
    properties:{
        disabled: {
            type: Boolean,
            value: false,
        },
        loading: {
            type: Boolean,
            value: false,
        },
        classes: {
            type: String,
            value: 'g-small-btn-line'
        },
        styles:{
            type: String,
            value: ''
        }
    },
    methods:{
        handleClick(){
            console.log(this.data);
            if (this.data.disabled){
                return
            }else{
                console.log(666)
                this.triggerEvent('myevent');
            }
        }
    }
})