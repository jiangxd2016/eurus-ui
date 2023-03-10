<template>
  <EInput v-model="inputValue" :max-length="20" />
  <EInput v-model="inputValue" :max-length="20" visible-word-limit />
  <EInput v-model="inputValue1" placeholder="please enter" :max-length="30" clearable />
  <EInput v-model="inputValue1" placeholder="please enter" :max-length="30" clearable visible-word-limit />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const inputValue = ref('KFC');
const inputValue1 = ref('fucking crazy Thursday');
</script>
