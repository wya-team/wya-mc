## TabPane 

### API

#### 参数
| 参数       | 说明      | 类型       | 默认值       | 必传      |
|-----------|-----------|-----------|-------------|-------------|
| key | 索引值 | String | 0 | 是 |
| tab | Tab标签的名称 | String | `Tab` | 否 |

### 使用指南
在`.josn`文件中引入组件
```json
{
  "usingComponents": {
    "tab-pane": "path/to/the/custom/component"
  }
}
```
在`.wxml`中
```html
 <tabs defaultActivityKey="1">
    <tab-pane key="1" tab="Tab1" slot="1">
        <view style="height: 90vh">抓不到我吧</view>
    </tab-pane>
    <tab-pane key="2" tab="Tab2" slot="2">
        哈哈哈哈哈
    </tab-pane>
    <tab-pane key="3" tab="Tab3" slot="3">
        啦啦啦啦啦啦啦啦啦啦
    </tab-pane>
    <tab-pane key="4" tab="Tab4" slot="4">
        啦啦啦啦啦啦啦啦啦啦
    </tab-pane>
</tabs>
```

### Tip
使用时需搭配 [tab](https://github.com/wya-team/wya-mc/blob/master/components/tab/READNME.md) 组件才有效