| 属性 | 类型 | 默认值 | 必填 | 说明 
| ---- | ---- | ---- | ---- | ---- 
| visible | boolean | `false` | 否 | 是否可见
| cancelText | string | `取消` | 否 | 取消按钮文字,为空不展示底部取消按钮
| title | string | | 否 | 弹框标题
| description | string | | 否 | 弹框二级标题
| actions | array | `[]` | 否 | 面板选项列表, 每项可接受字段：`name` `extra` `color` `subname` `disabled` `onClick`
| closeOnClickAction | boolean | `true` | 否 | 选中某一项后是否关闭弹层

> `button` `popup`的props

| 事件 | 说明 
| ---- | ---- 
| sure | popup弹层关闭
| cancel | 点击取消的回调
| close | 弹层关闭的回调
| select | 选中某一项后触发回调