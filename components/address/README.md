## 地址选择组件

### API

### 参数
| 参数       | 说明      | 类型       | 默认值       | 可选值      | 必传      |
|-----------|-----------|-----------|-------------|-------------|-------------|
| value | 初始值 | Array | [] | | 否 |
| valueType | value的类型,传入的是地址code还是地址名称 | String | `code` | `code` & `name` | 否 |
| customer | 是否自定义Item样式 | Boolean | false |  | 否 |
| url | 获取地址数据的url | String | - |  | 否 |

#### 事件
| 事件名       | 说明      | 参数       |
|-----------|-----------|-----------|
| close | 关闭时的回调 | |
| ok | 点击确定时的回调 | `event.detail.value`可以获取到选中的地址的`code`&`name` |

### 使用指南
在`.josn`文件中引入组件
```json
{
  "usingComponents": {
    "address": "path/to/the/custom/component"
  }
}
```

### [代码示例](https://github.com/wya-team/wya-mc/blob/master/example/pages/address/address.wxml)

### 说明
1. 地址数据的格式
```js
 {
        "national_code": "110000",
        "region_name": "北京市",
        "parent_id": "0",
        "children": [
            {
                "national_code": "110100",
                "region_name": "北京市辖区",
                "parent_id": "110000",
                "children": [
                    {
                        "national_code": "110101",
                        "region_name": "东城区",
                        "parent_id": "110100",
                        "children": []
                    }
                ]
            }
        ]
        ....
 }
```
2. ok事件返回的数据
```js
{
    province_code, 
    province_name,
    city_code, 
    city_name,
    district_code, 
    district_name
}
```