---
class: 'EDatePicker-doc'
---
# EDatePicker [WIP]

## 引入

```javascript
import { EDatePicker } from 'eurus-ui';

Vue.createApp().use(EDatePicker.name, EDatePicker)
```
::::card  EDatePicker 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code date-pickerDemo0
<<< ../src/packages/date-picker/demo/Demo0.vue
:::
::::

### EDatePicker Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  EDatePicker Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
