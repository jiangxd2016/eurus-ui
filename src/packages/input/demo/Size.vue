<script setup lang="ts">
import { ref } from 'vue';
const inputValue = ref('KFC');
</script>

<template>
  <EInput v-model="inputValue" size="xs" />
  <EInput v-model="inputValue" size="sm" />
  <EInput v-model="inputValue" size="md" />
  <EInput v-model="inputValue" size="lg" />
  <EInput v-model="inputValue" size="xl" />
</template>

<style scoped>
</style>
