---
class: 'EAvatar-doc'
---
# EAvatar 头像

## 引入

```javascript
import { EAvatar } from 'eurus-ui';

Vue.createApp().use(EAvatar.name, EAvatar)
```
::::card avatar size

像的 size 分别为

:::code avatarDemo0
<<< ../src/packages/avatar/demo/Demo0.vue
:::

### EAvatar Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'xs' \|'sm' \|'md' \|'lg' \|'xl'` | 'md' | 头像大小 |
| color | string | #fff | 头像背景色 |
| offline | boolean | false | 是否是离线 |
| online | boolean | false | 是否是在线 |
| notice |  |  |  |
