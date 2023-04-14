---
class: 'scrollbar-doc'
---
# EScrollbar [WIP]

## 引入

```javascript
import { EScrollbar } from 'eurus-ui';

Vue.createApp().use(EScrollbar.name, EScrollbar)
```
::::card  scrollbar 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code scrollbarDemo0
<<< ../src/packages/scrollbar/demo/Demo0.vue
:::
::::

### scrollbar Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  scrollbar Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
