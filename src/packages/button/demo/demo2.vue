<template>
  <EButton
    type="primary" :loading="true" size="sx"
    :native="{ type: 'submit' }"
  >
    123
  </EButton>
  <EButton type="primary" :loading="true" size="sm">123</EButton>
  <EButton type="primary" :loading="true" size="md">123</EButton>
  <EButton type="primary" :loading="true" size="lg">123</EButton>
  <EButton type="primary" :loading="true" size="xl">123</EButton>
</template>

<script  setup>
import { EButton } from 'eurus-ui';
</script>
