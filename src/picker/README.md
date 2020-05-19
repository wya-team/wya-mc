# 数据结构
## 列之间没有关联
```
const dataSource = [
	[{label: 'xx', value: 1}, {label: 'xxxx', value: 2}],
	[{label: 'jj', value: 1}, {label: 'jjjj', value: 2}],
	[{label: 'ii', value: 1}, {label: 'iiii', value: 2}],
]
```
## 列之间有关联
```
const dataSource = [
	{
		label: 'xx',
		value: 1,
		children: [
			{
				label: 'jj',
				value: 11
			}
		]
	},
	{
		label: 'xxxx',
		value: 1,
		children: [
			{
				label: 'jjjj',
				value: 11
			}
		]
	},
]
```