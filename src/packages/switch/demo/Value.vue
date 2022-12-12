<template>
  <ESwitch v-model="value" checked-value="check" unchecked-value="uncheck" />

  <ESwitch v-model="value" checked-value="check" checked-label="check" unchecked-label="uncheck" unchecked-value="uncheck" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref('uncheck');
</script>

