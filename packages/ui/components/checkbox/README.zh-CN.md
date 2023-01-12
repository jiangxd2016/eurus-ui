---
class: 'ECheckbox-doc'
---
# ECheckbox 多选框

## 引入

```javascript
import { ECheckbox } from 'eurus-ui';

Vue.createApp().use(ECheckbox.name, ECheckbox)
```
::::card 多选框

:::code checkboxCheckbox
<<< ../src/packages/checkbox/demo/Checkbox.vue
:::
::::

::::card 多选框组
多选框组可整体禁用或单独禁用某个选项。
:::code checkboxCheckboxGroup
<<< ../src/packages/checkbox/demo/CheckboxGroup.vue
:::
::::
### ECheckbox Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | boolean | false | 是否选中 |
| defaultChecked | boolean | false | 是否默认选中 |
| value | string｜number | - | 多选框选中的值 |
| label | string | - | 多选框文本 |
| disabled | boolean | false | 是否禁用 |



###  ECheckbox Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | -    | 内容 |



###  ECheckboxGroup Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | array | undefined |绑定值|
| defaultChecked | array | [] |默认选中的值|
| disabled | boolean | false |多选框组是否禁用|



###  ECheckboxGroup Slots

| 名称    | 参数 | 说明     |
| ------- | ---- | -------- |
| default | -    | checkbox |
