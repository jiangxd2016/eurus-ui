---
class: 'trigger-doc'
---
# ETrigger [WIP]

## 引入

```javascript
import { ETrigger } from 'eurus-ui';

Vue.createApp().use(ETrigger.name, ETrigger)
```
::::card  trigger 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code triggerDemo0
<<< ../src/packages/trigger/demo/Demo0.vue
:::
::::

### trigger Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  trigger Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
