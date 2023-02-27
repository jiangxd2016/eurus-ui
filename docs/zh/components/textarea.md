---
class: 'ETextarea-doc'
---
# ETextarea [WIP]

## 引入

```javascript
import { ETextarea } from 'eurus-ui';

Vue.createApp().use(ETextarea.name, ETextarea)
```
::::card  ETextarea 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code textareaDemo0
<<< ../src/packages/textarea/demo/Demo0.vue
:::
::::

### ETextarea Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  ETextarea Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
