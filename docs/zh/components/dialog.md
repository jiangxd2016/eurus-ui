---
class: 'dialog-doc'
---
# EDialog [WIP]

## 引入

```javascript
import { EDialog } from 'eurus-ui';

Vue.createApp().use(EDialog.name, EDialog)
```
::::card  dialog 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code dialogDemo0
<<< ../src/packages/dialog/demo/Demo0.vue
:::
::::

### dialog Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  dialog Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
