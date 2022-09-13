<template >
<EBreadcrumb></EBreadcrumb>
</template>

<script  setup>
import { EBreadcrumb } from 'eurus-ui';
import { ref } from 'vue'

const data = ref([
  { title: '首页', href: '/' },
  { title: '组件演示1', href: '/' },
  { title: '组件演示2', href: '/breadcrumb' },
  { title: '面包屑' }
])
</script>
