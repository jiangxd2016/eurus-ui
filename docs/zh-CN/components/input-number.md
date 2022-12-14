---
class: 'EInputNumber-doc'
---
# EInputNumber [WIP]

## 引入

```javascript
import { EInputNumber } from 'eurus-ui';

Vue.createApp().use(EInputNumber.name, EInputNumber)
```
::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code input-numberDemo0
<<< ../src/packages/input-number/demo/Demo0.vue
:::
::::

### EInputNumber Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  EInputNumber Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
