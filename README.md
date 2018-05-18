# wya-mc
微一案小程序组件库（Mini Program）
## 下载
``` bash
git clone https://github.com/youzan/zanui-weapp.git
```

## 开发&预览
1. 安装项目
``` bash
# 安装项目依赖
npm install
# 执行组件编译
npm run start
```
2. 打开[微信web开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，'本地小程序项目 - 添加项目'，将 `dist` 文件选中即可进行开发和预览。
## 使用
#### 1. 将lib下的组件拷贝至项目中
#### 2. 按照微信小程序官方使用组件的教程进行使用即可
```json
{
    "usingComponents": {
        "popup": "path/to/the/custom/component"
    }
}
```
