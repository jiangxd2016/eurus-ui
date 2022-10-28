<template>
  <EButton type="primary" :loading="true" size="sx">
    loading...
  </EButton>
  <EButton type="primary" :loading="true" size="sm"> loading...</EButton>
  <EButton type="primary" :loading="true" size="md"> loading...</EButton>
  <EButton type="primary" :loading="true" size="lg"> loading...</EButton>
  <EButton type="primary" :loading="true" size="xl"> loading...</EButton>

  <EButton type="primary" disabled size="sx">
    disabled
  </EButton>
  <EButton type="primary" disabled size="sm">disabled</EButton>
  <EButton type="primary" disabled size="md">disabled</EButton>
  <EButton type="primary" disabled size="lg">disabled</EButton>
  <EButton type="primary" disabled size="xl">disabled</EButton>
</template>

<script  setup lang="ts">
import { EButton } from 'eurus-ui';
</script>
