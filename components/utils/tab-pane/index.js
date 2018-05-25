Component({
    relations: {
        '../tabs/index': {
            type: 'parent', // 关联的目标节点为父节点
            linked(target) {
                // 每次有tab被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
            },
            linkChanged(target) {
                // 每次有tab被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
            },
            unlinked(target) {
                // 每次有tab被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
            }
        }
    },
    properties: {
        key: {
            type: String,
            value: 0
        },
        tab: {
            type: null,
            value: 'Tab'
        }
    }
})