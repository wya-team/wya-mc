## Toast 轻提示

### API

#### options的具体参数
| 参数       | 说明      | 类型       | 默认值       | 可选值      |
|-----------|-----------|-----------|-------------|-------------|
| message | `toast`显示文案 | String | - |  |
| type | 提示类型 | String | - | `loading` `success` `fail` |
| icon | `toast`显示的图标，只能是`icon`组件中的可用图标 | String | - |  |
| timeout | `toast`显示时间，小于0则会一直显示，需手动调用`Toast.clear` | String | `3000` |  |

#### 方法
| 方法名       | 参数      | 返回值       | 介绍 |
|-----------|-----------|-----------|-----------|
| Toast | `options`  `timeout` | - | 展示提示 | 
| Toast.loading | `options`  `timeout` | - | 展示加载提示 |
| Toast.success | `options`  `timeout` | - | 展示成功提示 |
| Toast.fail | `options`  `timeout` | - | 展示失败提示 |
| Toast.clear | - | - | 关闭提示 |

### 使用指南
在`.josn`文件中引入组件
```json
{
  "usingComponents": {
    "toast": "path/to/the/custom/component"
  }
}
```