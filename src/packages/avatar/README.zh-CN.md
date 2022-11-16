---
class: 'EAvatar-doc'
---
# EAvatar [WIP]

## 引入

```javascript
import { EAvatar } from 'eurus-ui';

Vue.createApp().use(EAvatar.name, EAvatar)
```
::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code avatarDemo0
<<< ../src/packages/avatar/demo/Demo0.vue
:::

### EAvatar Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  EAvatar Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
