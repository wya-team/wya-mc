## Badge
### API
#### 参数
| 参数       | 说明      | 类型       | 默认值       |
|-----------|-----------|-----------|-------------|
| color | 文字的颜色 | String | `#fff` |
| background-color | 背景颜色 | String | `#f44` |
| font-size | 字体大小 | Number | 20 |
| box-shadow | badge边框 | String | `0 0 0 2px #fff` |


### 使用指南
在`.josn`文件中引入组件
```json
{
  "usingComponents": {
    "badge": "path/to/the/custom/component"
  }
}
```

``` html
<view style="width: 100rpx; height: 100rpx; background: #999999; margin-top: 20rpx">
    <badge>9</badge>
</view>

<view style="width: 100rpx; height: 100rpx; background: #999999; margin-top: 20rpx">
    <badge
        background-color="#00c200"
        box-shadow="0 0 0 4px #fff"
    >
        new
    </badge>
</view>
```