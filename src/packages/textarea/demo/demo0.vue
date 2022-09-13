<template >
  <e-textarea v-model="textarea1" placeholder="placeholder" />
</template>

<script  setup>
import { ETextarea } from 'eurus-ui';
const textarea1 = ref('');
</script>
