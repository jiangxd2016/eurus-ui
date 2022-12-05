---
class: 'EInput-doc'
---
# EInput 输入框 【WIP】

## 引入

```javascript
import { EInput } from 'eurus-ui';

Vue.createApp().use(EInput.name, EInput)
```

::::card input基本用法

:::code inputBasic
<<< ../src/packages/input/demo/Basic.vue
:::
::::

::::card input 前缀和后缀

插槽的名字为 prefix 和 suffix。

:::code inputSlot
<<< ../src/packages/input/demo/Slot.vue
:::
::::

::::card input 长度限制和清除

通过maxLength属性限制输入的最大长度，通过clearable属性开启清除功能。

:::code inputMax
<<< ../src/packages/input/demo/Max.vue
:::
::::


::::card input 大小

input的 size 分别为 xs、sm、md、lg 和 xl。

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
