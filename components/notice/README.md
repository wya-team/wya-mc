## Notice 通告栏

### API

#### 参数
| 参数       | 说明      | 类型       | 默认值       | 必传      |
|-----------|-----------|-----------|-------------|-------------|
| content | 通告栏展示的内容 | String | - | 是 |
| color | 文字的颜色 | String | `#ff6600` | 否 |
| backgroundColor | 通告栏背景颜色 | String | `#fff7cc` | 否 |
| scrollable | 是否滚动 | Boolean | true | 否 |
| leftIcon | 左侧icon | String | - | 否 |
| speed | 滚动速度 | Number | 40 | 否 |
| delay | 延迟的时间（单位：毫秒） | Number | 0 | 否 |
| closable | 是否可关闭 | Boolean | false | 否 |

### 使用指南
在`.josn`文件中引入组件
```json
{
  "usingComponents": {
    "notice": "path/to/the/custom/component"
  }
}
```