---
class: 'ESelect-doc'
---
# ESelect [WIP]

## 引入

```javascript
import { ESelect } from 'eurus-ui';

Vue.createApp().use(ESelect.name, ESelect)
```

::::card select 基础用法

size 分别为  分别为  xs、sm、md、lg 和 xl。

:::code selectBase
<<< ../src/packages/select/demo/Base.vue
:::
::::

::::card select 多选模式

:::code selectMultiple
<<< ../src/packages/select/demo/Multiple.vue
:::
::::
::::card select option 配置

:::code selectOptions
<<< ../src/packages/select/demo/Options.vue
:::
::::

::::
::::card select 可清空

:::code selectClear
<<< ../src/packages/select/demo/Clear.vue
:::
::::
### ESelect Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  ESelect Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
