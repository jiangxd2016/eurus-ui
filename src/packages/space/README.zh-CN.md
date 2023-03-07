---
class: 'space-doc'
---
# ESpace [WIP]

## 引入

```javascript
import { ESpace } from 'eurus-ui';

Vue.createApp().use(ESpace.name, ESpace)
```
::::card  space 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code spaceDemo0
<<< ../src/packages/space/demo/Demo0.vue
:::
::::

### space Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | 
| size | string | `sm` | 间距大小 |
| direction | string | `horizontal` | 间距方向 |
| align | string | - | 间距对齐方式 |
| wrap | boolean | - | 是否换行 |
| fill | boolean | - | 是否填充 |



###  space Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
