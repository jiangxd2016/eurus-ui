---
class: 'button-doc'
---
# Button 按钮

## 引入

```javascript
import { EButton } from 'eurus-ui';

Vue.createApp().use(EButton.name, EButton)
```

:::buttonloading
src/packages/button/demo/demo0.vue
:::

### Button Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| circle | `boolean` | `false` | 按钮是否为圆形 |
| disabled | `boolean` | `false` | 按钮是否禁用 |
| loading | `boolean` | `false` | 按钮是否显示加载状态 |
| round | `boolean` | `false` | 按钮是否显示圆角 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | md |按钮的尺寸 |
| secondary | `boolean` | `false` | 是否是次要按钮 |
| strong | `boolean` | `false` | 按钮文字是否加粗 |
| text | `boolean` | `false` | 是否显示为文本按钮 |
| type | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'purple'` | 按钮的类型 |

### ButtonGroup Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| vertical | `boolean` | `false` | 组内按钮的排列方式 |

### Button Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | -    | 按钮的内容 |
| icon    | -    | 按钮的图标 |

### ButtonGroup Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | -    | 按钮组的内容 |
