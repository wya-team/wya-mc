## Actionsheet 行动按钮

未完待续

### API

#### options的具体参数
| 参数          | 说明           | 类型     | 默认值  | 可选值  |
| ----------- | ------------ | ------ | ---- | ---- |
| show        | 显示与隐藏        | String | -    |      |
| actions     | 自定义按钮        | array  | -    |      |
| cancel-text | 最底下取消按钮的文字内容 | String | -    |      |

#### 方法

| 方法名              | 参数   | 返回值  | 介绍             |
| ---------------- | ---- | ---- | -------------- |
| bind:cancel      | -    |      | 点击最底下取消按钮执行的动作 |
| bind:actionclick |      |      | 点击其他按钮执行的动作    |

### 使用指南
在`.json`文件中引入组件
```json
{
  "usingComponents": {
    "actionsheet": "path/to/the/custom/component"
  }
}
```
在`.wxml`文件中使用组件

```html
<view 
	style="margin-top: 30rpx;text-align:center" 
	bind:tap="openActionsheet"
>
	Click Me！
</view>

<actionsheet
	show="{{ show }}"
	actions="{{ actions }}"
	cancel-text="{{ cancelText }}"
	cancel-with-mask="{{ cancelWithMask }}"
	bind:cancel="closeActionSheet"
	bind:actionclick="clickAction"
	mask-class="tiny"
/>
```

