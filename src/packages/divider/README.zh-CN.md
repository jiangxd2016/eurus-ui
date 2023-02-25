---
class: 'EDivider-doc'
---
# EDivider [WIP]

## 引入

```javascript
import { EDivider } from 'eurus-ui';

Vue.createApp().use(EDivider.name, EDivider)
```
::::card  EDivider 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code dividerDemo0
<<< ../src/packages/divider/demo/Demo0.vue
:::
::::

### EDivider Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  EDivider Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
