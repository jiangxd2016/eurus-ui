<template>
  <ELoading
    v-model="show"
    size="xs"
  />
  <ELoading
    v-model="show"
    size="sm"
  />
  <ELoading
    v-model="show"
    size="md"
  />
  <ELoading
    v-model="show"
    size="lg"
  />
</template>

<script  setup lang="ts">
import { ELoading } from 'eurus-ui';

import { ref } from 'vue';
const show = ref(false);
</script>
