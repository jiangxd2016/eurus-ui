---
class: 'EDrawer-doc'
---
# EDrawer [WIP]

## 引入

```javascript
import { EDrawer } from 'eurus-ui';

Vue.createApp().use(EDrawer.name, EDrawer)
```
::::card  EDrawer 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code drawerDemo0
<<< ../src/packages/drawer/demo/Demo0.vue
:::
::::

### EDrawer Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  EDrawer Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
