## Popup 弹出层
### API
#### 参数
| 参数       | 说明      | 类型       | 默认值       | 必传      |
|-----------|-----------|-----------|-------------|-------------|
| show | 是否显示弹出层 | Boolean | false | false |
| mask | 是否显示遮罩层 | Boolean | true | false |
| maskClosable | 点击蒙层是否允许触发close事件 | Boolean | true | false |
| type | 从哪个方向弹出, 可选`center`, `left`, `right`, `top`, `bottom` | String | center | false |

#### 事件
| 事件名       | 说明      | 参数       |
|-----------|-----------|-----------|
| click-mask | 点击蒙层时触发 | |
| close | 蒙层关闭时触发 | |

### 使用指南
在`.josn`文件中引入组件
```json
{
  "usingComponents": {
    "popup": "path/to/the/custom/component"
  }
}
```
### [代码示例](https://github.com/wya-team/wya-mc/blob/master/example/pages/popup/popup.wxml)


