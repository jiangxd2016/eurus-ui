---
class: 'Icon-doc'
---
# 图标 Icon

## 引入

```javascript
import { EIcon } from 'eurus-ui';

Vue.createApp().use(EIcon.name, EIcon)
```

## type

<CodeDemo
  src="icons/demo/demo0.vue"
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

