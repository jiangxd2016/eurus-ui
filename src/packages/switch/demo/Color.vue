<template><ESwitch v-model="switchValue" checked-color="red" unchecked-color="blue" @change="onChange" /></template>

<script setup lang="ts">
import { ref } from 'vue';

const switchValue = ref(false);
const onChange = (value: boolean) => {
  // console.log(value);
};
</script>
