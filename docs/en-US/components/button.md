---
class: 'button-doc'
---
# Button

## Use

```javascript
import { EButton } from 'eurus-ui';

Vue.createApp().use(EButton.name, EButton)
```

:::buttonloading
src/packages/button/demo/demo0.vue
:::

### Button Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'purple'`| button type |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | 'md' |button size |
| loading | `boolean` | `false` | determine whether it's loading |
| disabled | `boolean` | `false` | disable the button |
| round | `boolean` | `false` | determine whether it's a round button |
| circle | `boolean` | `false` | determine whether it's a circle button |
| plain | boolean | false |determine whether it's a plain button |
| native | Object | {} |native button attribute |


### ButtonGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| vertical | `boolean` | `false` | arrangement of buttons |

### Button Slots

| Name | Type | Description |
| ------- | ---- | ---------- |
| default | -    | customize default content |
| icon    | -    | customize icon component |

### ButtonGroup Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | -    | customize button group content|
