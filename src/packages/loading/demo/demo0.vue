<template>
  <ELoading v-model:show="show" />
</template>

<script  setup>
import { ELoading } from 'eurus-ui';

import { ref } from 'vue';
const show = ref(false);
</script>
