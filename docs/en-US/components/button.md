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
| circle | `boolean` | `false` | determine whether it's a circle button |
| disabled | `boolean` | `false` | disable the button |
| loading | `boolean` | `false` | determine whether it's loading |
| round | `boolean` | `false` | determine whether it's a round button |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | md |button size |


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
