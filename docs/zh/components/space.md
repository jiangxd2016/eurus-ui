---
class: 'space-doc'
---
# ESpace [WIP]

## 引入

```javascript
import { ESpace } from 'eurus-ui';

Vue.createApp().use(space.name, ESpace)
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



###  space Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
