---
class: 'EIcon-doc'
---
# EIcon 按钮

## 引入

```javascript
import { EIcon } from 'eurus-ui';

Vue.createApp().use(EIcon.name, EIcon)
```

::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code iconsAllIcon
<<< ../src/packages/icons/demo/AllIcon.vue
:::
::::

### EIcon Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  EIcon Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
