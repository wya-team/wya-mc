## Address 地址选择器

### 使用指南
在 `.json` 中引入组件
```json
{
  "usingComponents": {
    "address": "path/to/the/custom/component"
  }
}
```

### 代码演示

#### 基础用法
```html
<address />
```

#### 传入参数
```html
<address 
    customer="{{true}}"
    value="{{initValue}}"
    valueType="name"
    bind:close="handleClose"
    bind:ok="handleOk"
    bind:ready="handleReady"
>
    <view class="address-item">
        <view style="width: 150rpx">选择地区</view>
        <view>
            {{value.province_name}} 
            {{value.city_name}} 
            {{value.district_name}} 
        </view>
    </view>
</address>
```

```js
    data: {
		initValue: ["浙江省", "杭州市", "拱墅区"]
	},]
	handleClose() {
		console.log('close')
	},
	handleOk(event) {
		this.setData({
			value: event.detail.value
		});
	},
	handleReady(event) {
		this.setData({
			value: event.detail.value
		});
	}
```

```css
.address-item {
    display: flex;
    align-items: auto;
    font-size: 28rpx;
    color: #343434;
    padding: 20rpx;
    background: #fff;
}
```

### API
| 参数       | 说明       | 类型       | 默认值       | 可选值       | 必传       |
|-----------|-----------|-----------|-----------|-----------|-----------|
| value | 初始值 | Array | [] | | 否 |

### 事件
| 事件名       | 说明       | 类型       |
|-----------|-----------|-----------|
| close | 关闭时的回调 | (): void |

### 其他（options的说明等）
