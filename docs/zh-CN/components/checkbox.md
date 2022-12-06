---
class: 'ECheckbox-doc'
---
# ECheckbox [WIP]

## 引入

```javascript
import { ECheckbox } from 'eurus-ui';

Vue.createApp().use(ECheckbox.name, ECheckbox)
```
::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code checkboxDemo0

<<< ../src/packages/checkbox/demo/Demo0.vue
:::
::::

### ECheckbox Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  ECheckbox Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
