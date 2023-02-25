---
class: 'EConfigProvider-doc'
---
# EConfigProvider [WIP]

## 引入

```javascript
import { EConfigProvider } from 'eurus-ui';

Vue.createApp().use(EConfigProvider.name, EConfigProvider)
```
::::card  EConfigProvider 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code config-providerDemo0
<<< ../src/packages/config-provider/demo/Demo0.vue
:::
::::

### EConfigProvider Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  EConfigProvider Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
