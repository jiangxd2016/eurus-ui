---
class: 'EBreadcrumb-doc'
---
# EBreadcrumb [WIP]

## 引入

```javascript
import { EBreadcrumb } from 'eurus-ui';

Vue.createApp().use(EBreadcrumb.name, EBreadcrumb)
```
::::card  EBreadcrumb 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code breadcrumbDemo0
<<< ../src/packages/breadcrumb/demo/Demo0.vue
:::
::::

### EBreadcrumb Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  EBreadcrumb Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
