---
class: 'ESelect-doc'
---
# ESelect [WIP]

## 引入

```javascript
import { ESelect } from 'eurus-ui';

Vue.createApp().use(ESelect.name, ESelect)
```

::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code selectBase
<<< ../src/packages/select/demo/Base.vue
:::
::::

::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code selectMultiple
<<< ../src/packages/select/demo/Multiple.vue
:::
::::
::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code selectOptions
<<< ../src/packages/select/demo/Options.vue
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
