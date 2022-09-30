<template>
  <ELoading v-model="show" />
</template>

<script  setup lang="ts">
import { ELoading } from 'eurus-ui';

import { ref } from 'vue';
const show = ref(false);
</script>
