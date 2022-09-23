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

<script lang="ts" setup>
import { EMessage } from 'eurus-ui';
let loading = $ref(false);

setTimeout(() => {
  loading = true;
  setTimeout(() => {
    loading = false;
  }, 1000);
}, 1000);

EMessage.msg({ type: 'info', message: 'this is  message', duration: 2000 });
</script>

