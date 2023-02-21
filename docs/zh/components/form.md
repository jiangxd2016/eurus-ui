---
class: 'EForm-doc'
---
# EForm [WIP]

## 引入

```javascript
import { EForm } from 'eurus-ui';

Vue.createApp().use(EForm.name, EForm)
```
<!--
::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code buttonType
<<< ../src/packages/button/demo/Type.vue
:::
::::

 -->
### EForm Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  EForm Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
