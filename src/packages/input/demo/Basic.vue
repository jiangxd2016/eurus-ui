<template>
  <EInput v-model="inputValue" />
  <EInput placeholder="please enter" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputValue = ref('KFC');
</script>
