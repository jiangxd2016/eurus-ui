---
class: 'button-doc'
---
# Button 按钮

## 引入

```javascript
import { Button } from 'eurus-ui';

Vue.createApp().use(Button.name, Button)
```

## type

<CodeDemo
  src="button/demo/demo0.vue"
/>


## size

<CodeDemo
  src="button/demo/demo1.vue"
/>

## loading

<CodeDemo
  src="button/demo/demo2.vue"
/>


## other

<CodeDemo
  src="button/demo/demo3.vue"
/>

### Button Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| circle | `boolean` | `false` | 按钮是否为圆形 |
| color | `string` | `undefined` | 按钮颜色（支持形如 `#FFF`， `#FFFFFF`， `yellow`，`rgb(0, 0, 0)` 的颜色） |
| dashed | `boolean` | `false` | 按钮边框是否为虚线 |
| disabled | `boolean` | `false` | 按钮是否禁用 |
| ghost | `boolean` | `false` | 按钮是否透明 |
| keyboard | `boolean` | `true` | 是否支持键盘操作 |
| loading | `boolean` | `false` | 按钮是否显示加载状态 |
| round | `boolean` | `false` | 按钮是否显示圆角 |
| size | `'xs' | 'sm' | 'md' | 'lg' | 'xl'` | md |按钮的尺寸 |
| secondary | `boolean` | `false` | 是否是次要按钮 |
| strong | `boolean` | `false` | 按钮文字是否加粗 |
| text | `boolean` | `false` | 是否显示为文本按钮 |
| type | `'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | 按钮的类型 |

### ButtonGroup Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `undefined` | 在组内的按钮的尺寸。如果设定，内部的按钮尺寸将不生效 |
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
