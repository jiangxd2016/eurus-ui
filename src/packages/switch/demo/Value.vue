<template>
  <ESwitch v-model="value" checked-value="check" unchecked-value="uncheck" />
  <ESwitch v-model="value" checked-value="check" checked-label="开" unchecked-label="关" unchecked-value="uncheck" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('uncheck');
</script>
