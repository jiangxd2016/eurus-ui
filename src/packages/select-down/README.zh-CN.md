---
class: 'ESelectDown-doc'
---
# ESelectDown [WIP]

## 引入

```javascript
import { ESelectDown } from 'eurus-ui';

Vue.createApp().use(ESelectDown.name, ESelectDown)
```
::::card select down 大小

 分别为  xs、sm、md、lg 和 xl。

:::code select-downBase
<<< ../src/packages/select-down/demo/Base.vue
:::
::::

::::card select down 多选模式

:::code select-downMultiple
<<< ../src/packages/select-down/demo/Multiple.vue
:::
::::

### ESelectDown Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | any | - | 绑定值 |
| options | Array | - | 选项 |
| multiple | Boolean | false | 是否多选 |
| placeholder | String | 请选择 | 占位符 |
| disabled | Boolean | false | 是否禁用 |
| clearable | Boolean | false | 是否可清空 |

### ESelectDown Events
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| change | value | 绑定值改变时触发 |
  | clear | - | 点击清空按钮时触发 |



###  ESelectDown Slots

| 名称    | 参数 | 说明     |
| ------- | ---- |--------|
| default | -    | option |

