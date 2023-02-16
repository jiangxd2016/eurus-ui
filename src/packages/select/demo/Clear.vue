<template>
  <ESelect v-model="vals" clear multiple  :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const vals = ref(['1', '2']);

const options = [
  {
    value: '1',
    label: '基础用法1',
  },
  {
    value: '2',
    label: '基础用法2',
  },
  {
    value: '3',
    label: '基础用法3',
  },
  {
    value: '4',
    label: '基础用法4',
    disabled: true,
  },
  {
    value: '5',
    label: '基础用法5',
  },
];
</script>
