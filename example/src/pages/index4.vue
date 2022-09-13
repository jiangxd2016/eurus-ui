<template>
  <div relative font-sans h-screen p2 text="center gray-700 dark:gray-200">
    <e-breadcrumb :data="data" separator="/" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([
  { title: '首页', href: '/' },
  { title: '组件演示1', href: '/' },
  { title: '组件演示2', href: '/breadcrumb' },
  { title: '面包屑' }
]);
</script>
