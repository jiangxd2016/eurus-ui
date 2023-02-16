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



###  ESelectDown Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
