---
class: 'menu-doc'
---
# EMenu [WIP]

## 引入

```javascript
import { EMenu } from 'eurus-ui';

Vue.createApp().use(EMenu.name, EMenu)
```
::::card  menu 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code menuDemo0
<<< ../src/packages/menu/demo/Demo0.vue
:::
::::

### menu Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  menu Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
