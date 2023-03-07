---
class: 'ESwitch-doc'
---
# ESwitch [WIP]

## 引入

```javascript
import { ESwitch } from 'eurus-ui';

Vue.createApp().use(ESwitch.name, ESwitch)
```
::::card switch 基本用法

:::code switchDefault
<<< ../src/packages/switch/demo/Default.vue
:::
::::

::::card switch label文字
设置checkValue和uncheckValue来设置选中的值和未选中的值
设置checkLabel和uncheckLabel来设置选中的文字
:::code switchValue
<<< ../src/packages/switch/demo/Value.vue
:::
::::

::::card switch 自定义颜色
设置activeColor和inactiveColor来设置选中和未选中的颜色
:::code switchColor
<<< ../src/packages/switch/demo/Color.vue
:::
::::
### ESwitch Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |




###  ESwitch Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
