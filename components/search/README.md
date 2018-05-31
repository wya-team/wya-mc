## Search 搜索栏

### 使用指南
在 `.json` 中引入组件
```json
{
  "usingComponents": {
    "search": "path/to/the/custom/component"
  }
}
```

### 代码演示

#### 基础用法
```html
<search />
```

#### 传入参数
```html
<search
    value="来了"
    placeholder="来~有种就搜一下"
    bind:cancel="handleCancel"
    bind:submit="handleSubmit"
    bind:focus="handleFocus"
    bind:blur="handleBlur"
></search>
```

```js
    handleCancel(value) {
		console.log(value, 'cancel');
	},
	handleSubmit(value) {
		console.log(value, 'submit');
    },
    handleFocus(value) {
		console.log(value, 'focus');
	},
	handleBlur(value) {
		console.log(value, 'blur');
	}
```

### API
| 参数       | 说明       | 类型       | 默认值       | 可选值       | 必传       |
|-----------|-----------|-----------|-----------|-----------|-----------|
| value | 搜索框的内容 | String | - | | 否 |
| placeholder | placeholder | String | `搜索` | | 否 |

### 事件
| 事件名       | 说明       | 类型       |
|-----------|-----------|-----------|
| cancel | 点击取消时的回调 | (value: string): void |
| submit | 完成按钮时触发 | (value: string): void |
| focus | 输入框聚焦时触发 | (): void |
| blur | 输入框失去焦点时触发 | (): void |
