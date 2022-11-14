---
class: 'EButtonGroup-doc'
---
# EButtonGroup 按钮组

## 引入

```javascript
import { EButtonGroup } from 'eurus-ui';

Vue.createApp().use(EButtonGroup.name, EButtonGroup)
```
::::card 

:::code button-groupDemo0
<<< ../src/packages/button-group/demo/Demo0.vue
:::
::::


### ButtonGroup Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| vertical | `boolean` | `false` | 组内按钮的排列方式 |


### ButtonGroup Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | -    | 按钮组的内容 |
