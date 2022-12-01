---
class: 'EInput-doc'
---
# EInput [WIP]

## 引入

```javascript
import { EInput } from 'eurus-ui';

Vue.createApp().use(EInput.name, EInput)
```

::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code inputDemo0
<<< ../src/packages/input/demo/Demo0.vue
:::
::::


::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code inputSize
<<< ../src/packages/input/demo/Size.vue
:::
::::


### EInput Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  EInput Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
