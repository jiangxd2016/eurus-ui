
# Textarea 文本框

### 基本用法

```vue demo
<template>
  <div>
    <e-textarea v-model="textarea1" placeholder="placeholder" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const textarea1 = ref('');
</script>

```

### 禁用

```vue demo
<template>
  <div>
    <e-textarea
      v-model="textarea1"
      placeholder="placeholder"
      disabled="disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const textarea1 = ref('不能输入');
</script>

```

### 自动高

```vue demo
<template>
  <e-textarea v-model="textarea1" placeholder="placeholder" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const textarea1 = ref('输入些文字回车换行试试');
</script>

```

### 显示输入字数
在使用 `maxlength` 属性限制最大输入长度的同时，可通过设置 `show-word-limit` 属性来展示字数统计
```vue demo
<template>
  <div>
    <e-textarea
      v-model="textarea1"
      placeholder="placeholder"
      :maxlength="10"
      show-word-limit
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const textarea1 = ref('');
</script>

```

## API

### Textarea

| 参数            | 类型            |说明|
|---------------|---------------|-------------|
| v-model       | String        | 绑定的值        |
| autoHeight    | boolean/true  | 自动高         |
| width         | String        | 要带单位px/%    |
| height        | String        | 要带单位px      |
| maxHeight     | String        | 最大高度        |
| showWordLimit | boolena/false | 原生属性，最大输入长度 |
| maxlength     | number        | 是否显示输入字数统计  |
