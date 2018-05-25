Component({
    options: {
        multipleSlots: true // 支持多slot
    },
    relations: {
        '../tab-pane/index': {
            type: 'child', // 关联的目标节点为子节点
            linked(target) {
                // 每次有tab-pane被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
            },
            linkChanged(target) {
                // 每次有tab-pane被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
            },
            unlinked(target) {
                // 每次有tab-pane被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
            }
        }
    },
    properties: {
        defaultActivityKey: {
            type: String,
            value: 0
        },
        scrollable: {
            type: Boolean,
            value: false
        },
        fixed: {
            type: Boolean,
            value: false
        },
        height: {
            type: Number,
            value: 90
        }
    },
    externalClasses: ['tab-class', 'active-class'],
    ready() {
        this._getAllTabPane();
        this.setData({
            currentIndex: this._getCurrentIndex()
        });
        console.log(this.data.currentIndex)
    },
    data: {
        nodes: [],
        currentIndex: 0,      // 显示相应的 swiper-item 和 active-tab
    },
    methods: {
        _getAllTabPane() {
            const nodes = this.getRelationNodes('../tab-pane/index');
            this.setData({nodes: this._formatNodes(nodes)});
        },
        _formatNodes(nodes) {
            let list = [...nodes];
            let result = [];
            for (let i = 0; i < list.length; i++) {
                if (!list[i].data.key) {
                    throw new Error('请检查tab-pane中是否传了key')
                }
                result.push({...list[i].data});
            }
            return result;
        },
        _getCurrentIndex() {
            const { defaultActivityKey, nodes } = this.data;
            return nodes.findIndex(item => item.key == defaultActivityKey);
        },
        handleChangeTab(event) {
            let index = event.currentTarget.id;
            this.setData({
                currentIndex: index
            })
        },
        handleChangeSwiper(event) {
            const { nodes } = this.data;
            let source = event.detail.source;
            let currentIndex = event.detail.current;

            if (source == 'touch') {
                this.setData({
                    currentIndex: currentIndex
                })
            }
        }
    }
})