<template>
  <ELoading
    v-model:show="show"
    size="xs"
  />
  <ELoading
    v-model:show="show"
    size="sm"
  />
  <ELoading
    v-model:show="show"
    size="md"
  />
  <ELoading
    v-model:show="show"
    size="lg"
  />
</template>

<script  setup>
import { ELoading } from 'eurus-ui';

import { ref } from 'vue';
const show = ref(false);
</script>
