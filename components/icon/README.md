## ICON 图标

### API

#### 参数
| 参数      | 说明        | 类型     | 默认值  | 必传   |
| ------- | --------- | ------ | ---- | ---- |
| type    | 图标类型      | String |      | 是    |
| classes | 外部传入的类名   | String |      | 否    |
| styles  | 外部传入的行内样式 | String |      | 否    |

#### 事件
| 事件名   | 说明       | 参数   |
| ----- | -------- | ---- |
| click | 点击图标时时触发 |      |

### 使用指南
在`.json`文件中引入组件
```json
{
  "usingComponents": {
    "icon": "path/to/the/custom/component"
  }
}
```

在`.wxml`文件中使用组件

```html
<icon type="success" styles="color:red" classes="g-pd-20"/>
```

### 其他

1. [iconfont项目地址](http://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=672234)
2. `icon` 图标命名尽可能采用简单易懂的英文
3. 添加图标方法：打开 `iconfont` 生成的链接，将内容复制到 `wxss` 文件中
