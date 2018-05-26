## Cells 单元组

里面包裹cell组件，解决多个cell时上下border累加，影响样式美观的问题，但是！我并没有解决这个，

我只给cell加了border-bottom，因此cells并没有X用。

### API

#### options的具体参数
| 参数      | 说明        | 类型     | 默认值  | 可选值  |
| ------- | --------- | ------ | ---- | ---- |
| classes | 外部传入的类名   | String | -    |      |
| styles  | 外部传入的行内样式 | String | -    |      |

#### 方法

| 方法名  | 参数   | 返回值  | 介绍   |
| ---- | ---- | ---- | ---- |
| -    | -    | --   | -    |

### 使用指南
在`.json`文件中引入组件
```json
{
  "usingComponents": {
    "cells": "path/to/the/custom/component"
  }
}
```
在`.wxml`文件中使用组件

```html
<view class="g-m-t-10">
    <notes>显示箭头和额外文字，可跳转到其他页面</notes>
 	<cells>	  
      <cell 
            title="我是标题" 
            is-link
            extra="查看更多"
            url="/pages/index/index"
        ></cell>
    </cells>
</view>
```

