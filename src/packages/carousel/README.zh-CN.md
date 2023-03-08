---
class: 'carousel-doc'
---
# ECarousel [WIP]

## 引入

```javascript
import { ECarousel } from 'eurus-ui';

Vue.createApp().use(ECarousel.name, ECarousel)
```
::::card  carousel 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code carouselDemo0
<<< ../src/packages/carousel/demo/Demo0.vue
:::
::::

### carousel Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |



###  carousel Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |
