---
class: 'pagination-doc'
---
# EPagination [WIP]

## 引入

```javascript
import { EPagination } from 'eurus-ui';

Vue.createApp().use(EPagination.name, EPagination)
```
::::card  pagination 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code paginationDemo0
<<< ../src/packages/pagination/demo/Demo0.vue
:::
::::

### pagination Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  pagination Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
