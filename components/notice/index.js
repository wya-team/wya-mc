Component({
    properties: {
        content: {
            type: String,
            value: '当你看到我的时候，说明你已经在用我们微一案的UI框架了，请帮忙点个start ^_^，好人一生平安~'
        },
        color: {
            type: String,
            value: '#ff6600'
        },
        backgroundColor: {
            type: String,
            value: '#fff7cc'
        },
        scrollable: {
            type: Boolean,
            value: true
        },
        leftIcon: {
            type: String,
            value: ''
        },
        speed: {
            type: Number,
            value: 40
        },
        delay: {
            type: Number,
            value: 0
        },
        closable: {
            type: Boolean,
            value: false
        }
    },
    data: {
        show: true,
        width: undefined,
        wrapWidth: undefined,
        elapse: undefined,
        animation: null,
        resetAnimation: null,
        timer: null
    },
    ready() {
        this._init();
    },
    detached() {
        const { timer } = this.data;
        timer && clearTimeout(timer);
    },
    methods: {
        _init() {
            wx.createSelectorQuery()
            .in(this)
            .select('._content')
            .boundingClientRect((rect) => {
                if (!rect || !rect.width) {
                    throw new Error('未在页面中发现notice组件');
                }
                this.setData({width: rect.width});
                
                wx.createSelectorQuery()
                .in(this)
                .select('._content-wrap')
                .boundingClientRect((rect) => {
                    if (!rect || !rect.width) {
                        return;
                    }
                    const wrapWidth = rect.width;
                    const {
                        width, speed, scrollable, delay
                    } = this.data;
    
                    // 可滚动 && content内容超过容器组件时让其开始滚动
                    if (scrollable && wrapWidth < width) {
                       
                        const elapse = width / speed * 1000;
                        const animation = wx.createAnimation({
                            duration: elapse,
                            delay
                        });
                        const resetAnimation = wx.createAnimation({
                            duration: 0
                        });
                        this.setData({
                            elapse,
                            wrapWidth,
                            width,
                            animation,
                            resetAnimation
                        }, () => {
                            this._scroll();
                        })
                    }
                })
                .exec();
            })
            .exec();
        },
        _scroll() {
            const { animation, resetAnimation, width, wrapWidth, speed, elapse } = this.data;
            resetAnimation.translateX(wrapWidth).step();
            const animationData = animation.translateX(-(elapse * speed) / 1000).step();
            this.setData({
                animationData: resetAnimation.export() // 让滚动条从最右侧开始
            });
            // 延迟100毫秒开始滚动，避免reset之后立马开始，导致滚动不是从最右侧开始
            setTimeout(() => {
                this.setData({
                    animationData: animationData.export()
                });
            }, 100);
    
            const timer = setTimeout(() => {
                this._scroll();
            }, elapse);
    
            this.setData({
                timer
            });
        },
        _handleButtonClick(event) {
            const { timer } = this.data;
            timer && clearTimeout(timer);
            this.setData({
                show: false,
                timer: null
            });
        }
    }
})