<template>
  <EInputNumber v-model="value" />
  <EInputNumber v-model="value" :max="10" :min="1" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>
