---
class: 'ERadio-doc'
---

# ERadio 单选框

## 引入

```javascript
import {ERadio} from 'eurus-ui';

Vue.createApp().use(ERadio.name, ERadio)
```

::::card 单选框基本用法

:::code radioRadio
<<< ../src/packages/radio/demo/Radio.vue
:::
::::

::::card 单选框组

单选框组，可以单独禁用和全部禁用
:::code radioRadioGroup
<<< ../src/packages/radio/demo/RadioGroup.vue
:::
::::

### ERadio Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string\|number\|boolean | false | 是否选中 |
| defaultChecked | string\|number\|boolean | false | 是否默认选中 |
| value | string｜number | - | 单选框选中的值 |
| label | string | - | 单选框文本 |
| disabled | boolean | false | 是否禁用 |



###  ERadio Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | -    | 内容 |



###  ERadioGroup Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string\|number\|boolean | undefined |绑定值|
| defaultChecked | string\|number\|boolean | false |默认选中的值|
| disabled | boolean | false |单选框组是否禁用|



###  ERadioGroup Slots

| 名称    | 参数 | 说明  |
| ------- | ---- | ----- |
| default | -    | redio |
