---
class: 'button-doc'
sidebarDepth: 2
---
# Button 按钮

## 引入

```javascript
import { Button } from 'my-lib'

Vue.createApp().use(Button.name, Button)
```

::::card button 类型

按钮的 type 分别为 default、tertiary、primary、info、success、warning 和 error。

:::code buttonType
<<< ../src/packages/button/demo/Type.vue
:::

::::

::::card button 加载中和禁用

加载中和禁用的点击都无效果

:::code buttonLoading
<<< ../src/packages/button/demo/Loading.vue
:::

::::


::::card button 自定义图标 圆形按钮 圆角按钮

加载中和禁用的点击都无效果

:::code buttonOther
<<< ../src/packages/button/demo/Other.vue
:::

::::

### Button Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'purple'`| 按钮的类型 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | md | 按钮的尺寸 |
| loading | `boolean` | `false` | 按钮是否处于加载状态 |
| disabled | `boolean` | `false` | 按钮是否禁用 |
| round | `boolean` | `false` | 按钮是否显示更大的圆角 |
| circle | `boolean` | `false` | 按钮是否为圆形 |
| plain | boolean | false | 按钮是否时朴素按钮 |
| native | Object | {} | 原生的button属性 |




### Button Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |

