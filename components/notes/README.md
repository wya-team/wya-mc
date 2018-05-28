## NOTES 注释

用于注释、解释型文字

### API

#### 参数
| 参数      | 说明        | 类型     | 默认值  | 必传   |
| ------- | --------- | ------ | ---- | ---- |
| classes | 外部传入的类名   | String |      | 否    |
| styles  | 外部传入的行内样式 | String |      | 否    |

#### 事件
| 事件名   | 说明          | 参数   |
| ----- | ----------- | ---- |
| click | 点击整行注释文字时触发 |      |

### 使用指南
在`.json`文件中引入组件
```json
{
  "usingComponents": {
    "notes": "path/to/the/custom/component"
  }
}
```

在`.wxml`文件中使用组件

```html
<notes>这是注释、解释型文字</notes>
```

### 其他

无