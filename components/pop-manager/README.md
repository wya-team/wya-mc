## PopupManager
### API
#### 参数
| 参数       | 说明      | 类型       | 默认值       | 必传      |
|-----------|-----------|-----------|-------------|-------------|
| show | 是否显示弹出层 | Boolean | false | 否 |
| mask | 是否显示遮罩层 | Boolean | true | 否 |
| type | 从哪个方向弹出, 可选`center`, `left`, `right`, `top`, `bottom` | String | center | 否 |

#### 事件
| 事件名       | 说明      | 参数       |
|-----------|-----------|-----------|
| clickMask | 点击遮罩层时触发 | |

### 使用指南
在`.josn`文件中引入组件
```json
{
  "usingComponents": {
    "popup-manager": "path/to/the/custom/component"
  }
}
```