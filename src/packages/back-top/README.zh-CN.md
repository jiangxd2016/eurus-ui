---
class: 'EBackTop-doc'
---
# EBackTop 回到顶部

## 引入

```javascript
import { EBackTop } from 'eurus-ui';

Vue.createApp().use(EBackTop.name, EBackTop)
```
::::card

:::code back-topDemo0
<<< ../src/packages/back-top/demo/Demo0.vue
:::
::::

### EBackTop Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| text | string | '返回顶部' | 回到顶部的内容 |
| behavior | "auto" ｜"smooth" | smooth | 滚动行为，`smooth` (平滑滚动)，`auto` (瞬间滚动) |
| height | number | 200 | 滚动多长显示回到顶部 |
| bottom | number | 30 | 回到顶部距离底部的距离 |
| right | number | 30 | 回到顶部距离右侧的距离 |



###  EBackTop Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 回到顶部的内容 |
