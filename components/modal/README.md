## Modal弹出框
### API
#### 参数
| 参数       | 说明      | 类型       | 默认值       | 必传      |
|-----------|-----------|-----------|-------------|-------------|
| show | 是否显示弹窗 | Boolean | false | 是 |
| title | 弹窗的标题 | String | Title | 否 |
| showTitle | 是否显示标题 | Boolean | true | 否 |
| closable | 是否右上角的关闭按钮 | Boolean | true | 否 |
| maskClosable | 点击蒙层是否允许关闭 | Boolean | true | 否 |
| cancelText | 取消按钮的文本 | String | `取消` | 否 |
| okText | 确认按钮的文本 | String | `确定` | 否 |
| cancelButtonStyle | 取消按钮样式 | String |  | 否 |
| okButtonStyle | 确定按钮样式 | String | `color: #00c200` | 否 |
| isTip | 是否为提示型弹窗 | Boolean | false | 否 |

#### 事件
| 事件名       | 说明      | 参数       |
|-----------|-----------|-----------|
| close | 弹窗关闭的回调 | |
| ok | 点击确定按钮的回调 | |

### 使用指南
在`.josn`文件中引入组件
```json
{
  "usingComponents": {
    "modal": "path/to/the/custom/component"
  }
}
```

``` html
<modal 
    show="{{show}}"
    title="弹出框"
    maskClosable="{{true}}"
    isTip="{{true}}"
    bind:close="toggleModal"
    bind:ok="toggleModal"
>
    <view>
        这是一个弹出框
    </view>
</modal>
```