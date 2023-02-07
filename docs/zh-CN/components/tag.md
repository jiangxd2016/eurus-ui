---
class: 'ETag-doc'
---

# ETag [WIP]

## 引入

```javascript
import { ETag } from 'eurus-ui';

Vue.createApp().use(ETag.name, ETag)
```

::::card 基本使用

由`type`属性来选择`tag`的类型，支持 `default`、`success`、`warning`、`danger`类型，默认为 `default`。

:::code tagBase
<<< ../src/packages/tag/demo/Base.vue
:::
::::

::::card 不同尺寸

`Tag` 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::code tagSize
<<< ../src/packages/tag/demo/Size.vue
:::
::::

::::card 可移除标签

设置`closable`属性可以定义一个标签是否可移除

:::code tagClosable
<<< ../src/packages/tag/demo/Closable.vue
:::
::::

::::card 动态编辑标签

:::code tagDynamic
<<< ../src/packages/tag/demo/Dynamic.vue
:::
::::

### ETag Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | string | `default`  | `default` \| `primary` \| `positive` \| `warning` \| `danger` \| `info`|
| closable | boolean | false | 是否可关闭 |
| color | string | - | 字体颜色 |
| bgColor | string | - | 背景色 |
| borderColor | string | - | 边框颜色 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | 'md' | 大小 |

### ETag Slots

| 名称      | 参数  | 说明   |
|---------|-----|------|
| default | -   | 默认内容 |
