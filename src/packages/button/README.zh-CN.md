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
## props

## event
