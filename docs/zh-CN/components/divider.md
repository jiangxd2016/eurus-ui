---
class: 'divider-doc'
---
# 分割线 divider

## 引入

```javascript
import { EDivider } from 'eurus-ui';

Vue.createApp().use(EDivider.name, EDivider)
```

## type

<CodeDemo
  src="divider/demo/demo0.vue"
  code="false"
/>

### Icon Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | string \| number | 24 | 图标大小 |
| color | string | - | 图标颜色 |


### Icon Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    |  自定义图标 |

