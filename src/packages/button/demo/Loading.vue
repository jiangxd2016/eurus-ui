<template>
  <EButton type="primary" :loading="loading" size="xs">loading...</EButton>
  <EButton type="primary" :loading="loading" size="sm"> loading...</EButton>
  <EButton type="primary" :loading="loading" size="md"> loading...</EButton>
  <EButton type="primary" :loading="loading" size="lg"> loading...</EButton>
  <EButton type="primary" :loading="loading" size="xl"> loading...</EButton>

  <EButton type="primary" disabled size="xs">
    disabled
  </EButton>
  <EButton type="primary" disabled size="sm">disabled</EButton>
  <EButton type="primary" disabled size="md">disabled</EButton>
  <EButton type="primary" disabled size="lg">disabled</EButton>
  <EButton type="primary" disabled size="xl">disabled</EButton>
</template>

<script  setup lang="ts">
import { EButton } from 'eurus-ui';
import { ref } from 'vue';

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 3000);
</script>
