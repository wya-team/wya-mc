import { showAnimate, hideAnimate } from '../utils/utils';

Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        // 是否有遮罩层
        mask: {
            type: Boolean,
            value: true
        },
        // 遮罩层是否会显示
        showMask: {
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
            this.triggerEvent('clickmask', {});
        }
    }
});