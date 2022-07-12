<template>
  <ELoading
    v-model:show="show"
    loadding-text="加载中..."
  />

  <ELoading
    v-model:show="show"
    loadding-text="请等待..."
  />

  <script setup>
    import { ELoading } from 'eurus-ui';

    import { ref } from 'vue';
    const show = ref(false);
  </script>
</template>
