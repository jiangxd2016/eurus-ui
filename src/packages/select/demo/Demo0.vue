<template>
  <ESelect v-model="vals">
    <EOption value="1">基础用法1</EOption>
    <EOption value="2">基础用法2</EOption>
    <EOption value="3">基础用法3</EOption>
    <EOption value="4" disabled>基础用法4</EOption>
    <EOption value="5">基础用法5</EOption>
  </ESelect>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const vals = ref('1');
</script>
