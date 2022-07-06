<template>
  <e-button
    type="primary" :loading="true" size="sx"
    :native="{ type: 'submit' }"
  >
    123
  </e-button>
  <e-button type="primary" :loading="true" size="sm">123</e-button>
  <e-button type="primary" :loading="true" size="md">123</e-button>
  <e-button type="primary" :loading="true" size="lg">123</e-button>
  <e-button type="primary" :loading="true" size="xl">123</e-button>
</template>

<script  setup>
 import { EButton } from 'eurus-ui';
</script>
