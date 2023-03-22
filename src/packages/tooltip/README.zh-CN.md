---
class: 'tool-tip-doc'
---
# ETooltip [WIP]

## 引入

```javascript
import { ETooltip } from 'eurus-ui';

Vue.createApp().use(ETooltip.name, ETooltip)
```
::::card  tool-tip 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code tooltipDemo0
<<< ../src/packages/tooltip/demo/Demo0.vue
:::
::::

### tool-tip Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  tool-tip Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
