---
class: 'notify-doc'
---
# ENotify [WIP]

## 引入

```javascript
import { ENotify } from 'eurus-ui';

Vue.createApp().use(ENotify.name, ENotify)
```
::::card  notify 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code notifyDemo0
<<< ../src/packages/notify/demo/Demo0.vue
:::
::::

### notify Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  notify Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
