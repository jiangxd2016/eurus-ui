---
class: 'table-doc'
---
# ETable [WIP]

## 引入

```javascript
import { ETable } from 'eurus-ui';

Vue.createApp().use(ETable.name, ETable)
```
::::card  table 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code tableDemo0
<<< ../src/packages/table/demo/Demo0.vue
:::
::::

### table Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  table Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
