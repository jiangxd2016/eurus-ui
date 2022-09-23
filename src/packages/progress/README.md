
# Progress 进度条

### 基础用法

```vue demo
<template>
  <div>
    <p>
      <e-progress v-model="value" />
    </p>
    <p>
      <e-progress :model-value="30" />
    </p>
    <p>
      <e-progress :model-value="50" status="success" />
    </p>
    <p>
      <e-progress :model-value="60" status="warning" />
    </p>
    <p>
      <e-progress :model-value="70" status="danger" />
    </p>
    <p>
      <e-progress :model-value="100" />
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref();
</script>

```

### 其他用法

```vue demo
<template>
  <div>
    <p>设置宽高</p>
    <p>
      <e-progress :model-value="50" :radius="300" :border="10" />
    </p>
    <p>设置背景和进度颜色</p>
    <p>
      <e-progress :model-value="30" color="#D9E5F1FF" border-color="#9907C1FF" />
    </p>
    <p>进度文字固定位置</p>
    <p>
      <e-progress :model-value="80" :follow-text="false" />
    </p>
  </div>
</template>
```

### 环形进度条

```vue demo
<template>
  <div>
    <e-progress :model-value="0" :radius="50" :border="8" type="circle" />

    <e-progress
      :model-value="30"
      :radius="50"
      :border="8"
      type="circle"
      status="success"
    />

    <e-progress :model-value="50" :radius="50" :border="8" type="circle" />

    <e-progress
      :model-value="80"
      :radius="50"
      :border="8"
      color="#ddd"
      border-color="#f60"
      type="circle"
    />

    <e-progress :model-value="100" :radius="50" :border="8" type="circle" />

    <e-progress
      :model-value="80"
      :radius="50"
      :border="8"
      type="circle"
      :show-text="false"
    >
      自定义显示内容
    </e-progress>
  </div>
</template>

```

## API

### Progress

| 参数          |类型|说明|
|-------------|--------------|--------|
| v-model     | Number         |进度值|
| type        | String         |进度条类型，支持两种line直线、circle圆环|
| radius      | Number         |圆环半径，单位px。line时为宽|
| border      | Number         |进度条宽，单位px。line时为高|
| color       | String         |背景颜色|
| borderColor | String         |进度颜色|
| duration    | Number/1000    |持续时间，单位毫秒|
| showText    | Boolean/true   |显示进度文字|
| followText  | Boolean/true   |进度文字跟随进度的位置,type=line时有效|
| className   | String         |样式类名|
| status      | String         |支持 `primary`、`success`、`warning`、`danger` 类型，默认为 `primary`。|

