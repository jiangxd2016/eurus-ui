<template>
  <EInputNumber v-model="value" />
  <EInputNumber v-model="value" :max="10" :min="1" />

  <EInputNumber v-model="value" :max="10" :min="1" :step="10" />
  <EInputNumber v-model="value" :min="1" :step="20" />

  <EInputNumber v-model="value2" :min="1" :step="1.2" :precision="1" />
  <EInputNumber v-model="value3" :min="1" :step="1.23" :precision="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(10);

const value2 = ref(1.2);
const value3 = ref(1.23);
</script>
