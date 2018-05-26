## Card 商品卡

### API

#### options的具体参数
| 参数            | 说明                                | 类型     | 默认值  | 可选值                             |
| ------------- | --------------------------------- | ------ | ---- | ------------------------------- |
| thumb         | 图片                                | String | -    |                                 |
| title         | 顶部标题                              | String | -    |                                 |
| price         | 右侧价格                              | String | -    |                                 |
| num           | 右侧数量                              | String | -    |                                 |
| desc          | 中间描述                              | String | -    |                                 |
| status        | 底部红色文字                            | String | -    |                                 |
| classes       | 外部传入的类名                           | String | -    |                                 |
| styles        | 外部传入的样式                           | String | -    |                                 |
| slot          | 允许多插槽                             | 节点     | -    | name=“thumb-slot”/"detail-slot" |
| useThumbSlot  | 左侧图片区是否自定义，搭配name=“thumb-slot”使用  | String | -    |                                 |
| useDetailSlot | 右侧详情区是否自定义，搭配name=“detail-slot”使用 | String | -    |                                 |

#### 方法

| 方法名  | 参数   | 返回值  | 介绍   |
| ---- | ---- | ---- | ---- |
| -    | -    | -    | -    |

### 使用指南
在`.json`文件中引入组件
```json
{
  "usingComponents": {
    "card": "path/to/the/custom/component"
  }
}
```
在`.wxml`文件中使用组件

```html
// 标准使用
<card
    classes="test-card"
    thumb="https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imageView2/2/w/200/h/200/q/90/format/jpeg"
    price="999.99"
    title="红烧牛肉【虚拟商品】【有库存】【有sku】"
    num="2"
    desc="3000克 50%"
    status="已发货"
>
</card>

// 自定义使用
<card
    classes="test-card"
    useThumbSlot
    useDetailSlot
>
    <!-- 左侧图片 -->
    <view slot="thumb-slot">
        <image 
           mode="aspectFit" 
           style="width:180rpx;height:180rpx" 
           src="https://img.yzcdn.cn/uploat/jpeg" 
         />
    </view>
    <!-- 右侧详情 -->
    <view slot="detail-slot">
        我是自定义内容区域
    </view>
</card>
```

