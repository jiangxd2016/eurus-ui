<template >
  <ETextarea v-model="textarea1" placeholder="placeholder" />
</template>

<script  setup lang="ts">
import { ETextarea } from 'eurus-ui';
const textarea1 = ref('');
</script>
