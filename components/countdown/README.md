## 倒计时组件

### API

### 参数
| 参数       | 说明      | 类型       | 默认值       | 可选值      | 必传      |
|-----------|-----------|-----------|-------------|-------------|-------------|
| mode | 倒计时显示的时间格式 | String | - | `DD天hh时mm分ss秒` `hh:mm:ss` `hh时mm分ss秒` `mm:ss` `mm分ss秒` | 是 |
| countStyle | 时间的样式 | String | - |  | 否 |
| unitStyle | 单位的样式 | String | - |  | 否 |
| isListen | 是否监听倒计时（为`true`时可以调用`bind:listen`） | Boolean | false |  | 否 |

#### options的具体参数
| 参数       | 说明      | 类型       | 默认值       | 可选值      |
|-----------|-----------|-----------|-------------|-------------|
| serverTime | 服务器时间（单位为秒的时间戳） | Number | 0 | |
| targetTime | 倒计时结束时间（单位为秒的时间戳） | Number | 0 | |
| wait | 计时器间隔多少秒执行 | Number | 1000 | |

#### 方法
| 方法名       | 参数      | 返回值       | 介绍 |
|-----------|-----------|-----------|-----------|
| CountDown | `options` | - | 开始倒计时 |

### 使用指南
在`.josn`文件中引入组件
```json
{
  "usingComponents": {
    "countdown": "path/to/the/custom/component"
  }
}
```

### 待开发
1. 自动隐藏为`0`的项
2. ....