---
class: 'message-doc'
---
# EMessage [WIP]

## 引入

```javascript
import { EMessage } from 'eurus-ui';

Vue.createApp().use(EMessage.name, EMessage)
```
::::card  message 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code messageDemo0
<<< ../src/packages/message/demo/Demo0.vue
:::
::::

### message Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  message Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
