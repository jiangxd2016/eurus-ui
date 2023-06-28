<template><EBreadcrumb :data="data" /></template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref([{ title: '首页', href: '/' }, { title: '组件演示1', href: '/' }, { title: '组件演示2', href: '/breadcrumb' }, { title: '面包屑' }]);
</script>
