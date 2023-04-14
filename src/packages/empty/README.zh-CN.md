---
class: 'empty-doc'
---
# EEmpty [WIP]

## 引入

```javascript
import { EEmpty } from 'eurus-ui';

Vue.createApp().use(EEmpty.name, EEmpty)
```
::::card  empty 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code emptyDemo0
<<< ../src/packages/empty/demo/Demo0.vue
:::
::::

### empty Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  empty Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
