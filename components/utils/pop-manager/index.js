import { showAnimate, hideAnimate } from '../utils';

Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        // 是否显示遮罩层
        mask: {
            type: Boolean,
            value: true
        },
        // 内容从哪个方向出，可选 center top bottom left right
        type: {
            type: String,
            value: 'center'
        }
    },
    data: {
        showAnimation: showAnimate(),
        hideAnimation: hideAnimate()
    },
    methods: {
        handleClickMask() {
            this.triggerEvent('clickMask', {});
        }
    }
});