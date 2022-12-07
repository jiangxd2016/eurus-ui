<template>
  <ECheckbox v-model="checkboxValue" label="checkbox" @change="onchange" />
  <ECheckbox v-model="checkboxValue" disabled @change="onchange">checkbox2</ECheckbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkboxValue = ref(false);
const onchange = (value: boolean) => {
  // console.log(value);
};
</script>