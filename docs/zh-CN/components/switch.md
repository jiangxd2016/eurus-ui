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
通过设置checkValue和uncheckValue来设置label文字
:::code switchValue
<<< ../src/packages/switch/demo/Value.vue
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
