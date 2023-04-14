---
class: 'spin-doc'
---
# ESpin [WIP]

## 引入

```javascript
import { ESpin } from 'eurus-ui';

Vue.createApp().use(ESpin.name, ESpin)
```
::::card  spin 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code spinDemo0
<<< ../src/packages/spin/demo/Demo0.vue
:::
::::

### spin Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  spin Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
